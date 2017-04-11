//skill sequence calculator

//global test daemon_mapping
var daemons = {};
var effect_matrix = {};

function calculate_damage(skill_sequence, seq_daemons, daemons) {
  if(skill_sequence.length < 1) {
    return 0;
  } else {
    var last_daemon = daemons[skill_sequence[skill_sequence.length-1]];
    var prev_skills = skill_sequence.slice(0,skill_sequence.length-1);
    var prev_damage = calculate_damage(prev_skills, seq_daemons, daemons);
    var current_damage = last_daemon.calculate_current_damage();
    var total_damage = current_damage + prev_damage;
    last_daemon.use_active(daemons);
    return total_damage;
  }
}

function sort_daemons(daemon_set, sort_by) {
  var daemon_array = Array.from(daemon_set);
  if (sort_by == "HIGH_ATK") {
    return deep_sort(daemon_array, "atk", false);
  }
}

function deep_sort(arr, key, ascending) {
  if (ascending) {
    return arr.sort(function(a,b) {
      return daemons[a][key] - daemons[b][key];
    });
  } else {
    return arr.sort(function(a,b) {
      return daemons[b][key] - daemons[a][key];
    });
  } 
}

function load_common_daemons() {
  //Amano, Titanium, NYTitania
  //Katsu, Freyr, Belphegor
  //Socrates, Guillotine, 
  ranged = new DaemonRole("ranged", 0.4);
  melee = new DaemonRole("melee", 0.2);
  none = new DaemonRole("none", 0.1);
  daemons["A1"] = new Daemon(ranged, "P", 0, 0, 3174, new Bonds(0,0,0), [], new Skill(new Effect("DMG_DEALT", 0.6), new Target("sort", null, 5, null)), []);
  daemons["A3"] = new Daemon(ranged, "P", 0, 0, 3693, new Bonds(0,0,0), [], new Skill(new Effect("DMG_DEALT", 0.67), new Target("sort", null, 5, null)), []);
  daemons["A2"] = new Daemon(ranged, "P", 11034, 0, 3894, new Bonds(0,0,2), [], new Skill(new Effect("DMG_DEALT", 0.74), new Target("sort", null, 5, null)), []); 
  daemons["T1"] = new Daemon(ranged, "D", 0, 0, 2813, new Bonds(0,0,2), [], new Skill(new Effect("DMG_DEALT", 0.52), new Target("sort", null, 5, null)), []);
  daemons["T1.5"] = new Daemon(ranged, "D", 0, 0, 2813, new Bonds(0,0,2), 
    [new Effect("CRIT_RATE", 0.21, 0, null), new Effect("CRIT_DMG", 0.5)], 
    new Skill(new Effect("DMG_DEALT", 0.52), new Target("sort", null, 5, null)),[]);
  daemons["T2"] = new Daemon(ranged, "D", 0, 0, 2847, new Bonds(0,0,3), [new Effect("CRIT_RATE", 0.21), new Effect("CRIT_DMG", 0.5)], new Skill(new Effect("DMG_DEALT", 0.57), new Target("sort", null, 5, null)), []);
  daemons["T3"] = new Daemon(ranged, "D", 11221, 0, 3141, new Bonds(0,0,0), [new Effect("CRIT_RATE", 0.21), new Effect("CRIT_DMG", 0.5)], new Skill(new Effect("DMG_DEALT", 0.55), new Target("sort", null, 5, null)), []);
  daemons["NYT"] = new Daemon(ranged, "P", 1, 0, 5160, new Bonds(0,0,1), [new Effect("CRIT_RATE", 0.05)], null, [new Skill(new Effect("CRIT_DMG", 0.2), new Target("type", "P", null, null))]);
  daemons["F"] = new Daemon(ranged, "D", 9246, 0, 0, new Bonds(0,0,1), [], new Skill(new Effect("DMG_INCREASE", 0.38), new Target("sort", null, 5, null)), []);
  daemons["K"] = new Daemon(ranged, "D", 6800, 0, 0, new Bonds(0,0,0), [], new Skill(new Effect("CRIT_RATE", 0.45), new Target("sort", null, 2, "HIGH_ATK")), []);
  daemons["B1"] = new Daemon(ranged, "P", 12063, 0, 3374, new Bonds(0,0,0), [], null, []);
  daemons["G"] = new Daemon(ranged, "A", 12370, 0, 5725, new Bonds(0,0,0), [], null, []);
  daemons["S"] = new Daemon(ranged, "D", 0, 0, 0, new Bonds(0,0,0), [], new Skill(new Effect("CONST_DMG_DEALT", 1020), new Target("sort", null, 5, null)), []);
  daemons["test"] = new Daemon(none, "A", 10000, 1, 1, new Bonds(0,0,0), [], null, []);
}

function run_calc(skill_sequence) {
  load_common_daemons();
  var seq_daemons = array_to_set(skill_sequence);
  var daemon_copies = copy_templates(seq_daemons);
  Object.keys(daemon_copies).forEach(function (daemon) {
    daemon_copies[daemon].apply_passives(daemon_copies);
  });
  var result = calculate_damage(skill_sequence, seq_daemons, daemon_copies);
  clear_matrix();
  return result;
}

function copy_templates(seq_daemons) {
  var copies = {};
  var unique_daemons = Array.from(seq_daemons);
  unique_daemons.forEach(function(daemon) {
    var template = daemons[daemon];
    var copy = clone_daemon(template);
    copies[daemon] = copy;
  });
  return copies;
}

function clone_daemon(daemon) {
  var bonds = daemon.bonds? new Bonds(daemon.bonds.three, daemon.bonds.four, daemon.bonds.five) : null;
  var active_effects = [];
  daemon.active_effects.forEach(function(effect){
    active_effects.push(new Effect(effect.effect_type, effect.value));
  });
  var skill = daemon.skill? new Skill(daemon.skill.effect, daemon.skill.target) : null;
  var passives = [];
  daemon.passives.forEach(function(passive){
    passives.push(new Skill(passive.effect, passive.target));
  });
  return new Daemon(daemon.role, daemon.type, daemon.atk, daemon.hp,
    daemon.skill_atk, bonds, active_effects, skill, passives);
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
function clear_matrix() {
  effect_matrix = {};
}

function input_run() {
  skill_sequence = parse_skill_sequence();
  document.getElementById("response").innerHTML = run_calc(skill_sequence) + " (" + n_shards(skill_sequence) + " shards)";
  return;
}

function parse_skill_sequence() {
  var stringseq = document.getElementById("skill_sequence").value;
  return stringseq.split(" ");
}

function n_shards(skill_sequence) {
  var hash = {};
  var shards = 0;
  skill_sequence.forEach(function(daemon){
    hash[daemon] = hash[daemon]? hash[daemon]+1 : 1;
  });
  Object.keys(hash).forEach(function(daemon){
    if(hash[daemon] < 3) {
      //Gauss summation.
      shards += (hash[daemon]*(hash[daemon]+1))/2;
    } else {
      shards += 6;
      shards += (hash[daemon]-3)*3;
    }
  });
  return shards;
}
