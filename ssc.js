//skill sequence calculator

//global test daemon_mapping
var daemons = {};
var effect_matrix = {};

class Daemon {
  constructor(type, skill_atk, bonds, now_effects, later_effects) {
    this.type = type;
    this.skill_atk = skill_atk;
    this.bonds = bonds;
    this.now_effects = now_effects;
    this.later_effects = later_effects;
    var skill_matrix = {};
    now_effects.forEach(function(effect) {
      skill_matrix[effect.skill_type] = effect.value;
    } );
    this.skill_matrix = skill_matrix;
  }
}

class Bonds {
  constructor(three, four, five) {
    this.three = three;
    this.four = four;
    this.five = five;
  }
  get_multiplier() {
    return (1 + this.three*4.5 + this.four*0.06 + this.five*0.075)
  }
}

class Effect {
  constructor(skill_type, value) {
    this.skill_type = skill_type;
    this.value = value;
  }
}

class DaemonType {
  constructor (type, base_crit_rate) {
    this.type = type;
    this.base_crit_rate = base_crit_rate;
  }
}

function calculate_damage(skill_sequence) {
  if(skill_sequence.length < 1) {
    return 0;
  } else {
    var last_daemon = daemons[skill_sequence[skill_sequence.length-1]];
    var prev_damage = calculate_damage(skill_sequence.slice(0,skill_sequence.length-1));
    var current_damage = last_daemon.skill_atk*last_daemon.bonds.get_multiplier()*calculate_effect_multiplier(last_daemon, effect_matrix) + prev_damage 
      + calculate_flat_rate_damage();
    update_effect_matrix(last_daemon);
    return current_damage;
  }
}

function calculate_flat_rate_damage() {
  return 0;
}

function calculate_effect_multiplier(daemon, effect_matrix) {
  var effect_multiplier = 1;
  var other_crit_buffs = {};
  
  Object.keys(effect_matrix).forEach(function(effect_type) {
    if(effect_type == "CRIT_RATE" || effect_type == "CRIT_DMG") {
      other_crit_buffs[effect_type] = effect_matrix[effect_type];
    } else {
      effect_multiplier *= (1+effect_matrix[effect_type]);
    }
  })

  effect_multiplier *= calculate_crits(daemon, other_crit_buffs);

  return effect_multiplier;
}

function update_effect_matrix(daemon) {
  daemon.later_effects.forEach(function(effect) {
    if(!effect_matrix[effect.skill_type]) {
      effect_matrix[effect.skill_type] = effect.value; 
    } else {
      effect_matrix[effect.skill_type] += effect.value;
    }
    });
}

function calculate_crits(daemon, other_crit_buffs) {
  var crit_multiplier = 1;

  //ex of crit, CR = crit rate increase, CD = crit dmg increase, NCR = normal crit rate, 2 = NCD = normal crit damage
  //X = attack.
  //chance of crit (CC) = (NCR*(1+CR))
  //E(Damage) = CC*(2*(1+CD))*X + (1-CC)*X = X*((2(1+CD))CC+(1-CC)) = X(2CC + 2CDCC + 1 - CC) = X(CC+2CDCC+1)

  crit_rate_buff = daemon.skill_matrix["CRIT_RATE"] ? daemon.skill_matrix["CRIT_RATE"] : 0;
  allies_cr_buff = other_crit_buffs["CRIT_RATE"] ? other_crit_buffs["CRIT_RATE"] : 0;
  crit_chance = daemon.type.base_crit_rate*(1+crit_rate_buff+allies_cr_buff);
  crit_dmg_buff = daemon.skill_matrix["CRIT_DMG"] ? daemon.skill_matrix["CRIT_DMG"] : 0;
  allies_cd_buff = other_crit_buffs["CRIT_DMG"] ? other_crit_buffs["CRIT_DMG"] : 0;

  //total crit dmg boost (tcdb) = (CD+ACD)
  //E(damage) = X(CC+2*(CD+ACD)*CC+1)
  total_crit_dmg_buff = crit_dmg_buff + allies_cd_buff;

  crit_multiplier += crit_chance + (2*total_crit_dmg_buff)*crit_chance;

  return crit_multiplier;
}

function main() {
  ranged = new DaemonType("ranged", 0.4);
  melee = new DaemonType("melee", 0.2);
  daemons["A1"] = new Daemon(ranged, 3174, new Bonds(0,0,0), [], [new Effect("DMG_DEALT", 0.6)]);
  daemons["A2"] = new Daemon(ranged, 3894, new Bonds(0,0,2), [], [new Effect("DMG_DEALT", 0.74)]); 
  daemons["T1"] = new Daemon(ranged, 2813, new Bonds(0,0,2), [], [new Effect("DMG_DEALT", 0.52)]);
  daemons["T1.5"] = new Daemon(ranged, 2813, new Bonds(0,0,2), [new Effect("CRIT_RATE", 0.21), new Effect("CRIT_DMG", 0.5)], [new Effect("DMG_DEALT", 0.52)]);
  daemons["T2"] = new Daemon(ranged, 2847, new Bonds(0,0,3), [new Effect("CRIT_RATE", 0.21), new Effect("CRIT_DMG", 0.5)], [new Effect("DMG_DEALT", 0.57)]);
  daemons["T3"] = new Daemon(ranged, 3141, new Bonds(0,0,0), [new Effect("CRIT_RATE", 0.21), new Effect("CRIT_DMG", 0.5)], [new Effect("DMG_DEALT", 0.55)]);
  daemons["NYT"] = new Daemon(ranged, 5160, new Bonds(0,0,1), [new Effect("CRIT_RATE", 0.05)], []);
  daemons["F"] = new Daemon(ranged, 0, new Bonds(0,0,1), [], [new Effect("DMG_INCREASE", 0.38)]);
  daemons["K"] = new Daemon(ranged, 0, new Bonds(0,0,0), [], [new Effect("CRIT_RATE", 0.45)]);
  daemons["B1"] = new Daemon(ranged, 3374, new Bonds(0,0,0), [], []);
}

function run_calc(skill_sequence) {
  main();
  var result = calculate_damage(skill_sequence);
  clear_matrix();
  return result;
}

function find_best(skill_sequences) {
  return skill_sequences[find_best_index(skill_sequences)];
}

function find_best_index(skill_sequences) {
  var max = 0;
  var best;
  for (var i = 0; i < skill_sequences.length; i++) {
    var cur = run_calc(skill_sequences[i]);
    if (cur > max) {
      max = cur;
      best = i;
    }
  }
  return best;
}

function rank(skill_sequences) {
  var scored = {};
  skill_sequences.forEach(function(seq) {
    var value = run_calc(seq);
    scored[value] = seq;
  });
  var ranked = [];
  sorted_scores = Object.keys(scored).sort();
  sorted_scores.reverse().forEach(function(score) {
    ranked.push(scored[score]);
  });
  return ranked;
}

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
     }
   }
 }

 permute(inputArr)

 return result;
}

function onlyUnique(value, index, self) { 
  /*// usage example:
var a = ['a', 1, 'a', 2, '1'];
var unique = a.filter( onlyUnique ); // returns ['a', 1, 2, '1']*/
    return self.indexOf(value) === index;
}

function uniquePermute(input) {
  var all = permutator(input).filter(onlyUnique);
  var hash = {};
  var out = [];
  for (var i = 0, l = all.length; i < l; i++) {
    var key = all[i].join('|');
    if (!hash[key]) {
      out.push(all[i]);
      hash[key] = 'found';
    }
  }
  return out;
}

/*// usage example:
var a = ['a', 1, 'a', 2, '1'];
var unique = a.filter( onlyUnique ); // returns ['a', 1, 2, '1']*/

function clear_matrix() {
  effect_matrix = {};
}
