class Daemon {
  constructor(type, atk, hp, skill_atk, bonds, active_effects, skill_effects) {
    this.type = type;
    this.atk = atk;
    this.hp = hp;
    this.skill_atk = skill_atk;
    this.bonds = bonds;
    this.active_effects = active_effects;
    this.skill_effects = skill_effects;
    this.skill_matrix = {};
  }

  build_skill_matrix() {
    var skill_matrix = {};
    this.active_effects.forEach(function(effect) {
      skill_matrix[effect.skill_type] = skill_matrix[effect.skill_type]? skill_matrix[effect.skill_type] + effect.value : effect.value;
      } );
    this.skill_matrix = skill_matrix;
  }

  calculate_effect_multiplier() {
    var effect_multiplier = 1;
    effect_multiplier = this.add_noncrit_multipliers(effect_multiplier);
    effect_multiplier *= this.calculate_crits();

    return effect_multiplier;
  }

  calculate_crits() {
    var crit_multiplier = 1;

    //ex of crit, CR = crit rate increase, CD = crit dmg increase, NCR = normal crit rate, 2 = NCD = normal crit damage
    //X = attack.
    //chance of crit (CC) = (NCR*(1+CR))
    //E(Damage) = CC*(2*(1+CD))*X + (1-CC)*X = X*((2(1+CD))CC+(1-CC)) = X(2CC + 2CDCC + 1 - CC) = X(CC+2CDCC+1)

    var crit_rate_buff = this.skill_matrix["CRIT_RATE"] ? this.skill_matrix["CRIT_RATE"] : 0;
    var crit_chance = this.type.base_crit_rate*(1+crit_rate_buff);
    var crit_dmg_buff = this.skill_matrix["CRIT_DMG"] ? this.skill_matrix["CRIT_DMG"] : 0;

    //allies crit dmg buff
    //total crit dmg boost (tcdb) = (CD+ACD)
    //E(damage) = X(CC+2*(CD+ACD)*CC+1)
    var total_crit_dmg_buff = crit_dmg_buff;

    crit_multiplier += crit_chance + (2*total_crit_dmg_buff)*crit_chance;

    return crit_multiplier;
  }

  add_noncrit_multipliers(multiplier) {
    Object.keys(this.skill_matrix).forEach(function(effect) {
      if(effect != "CRIT_RATE" && effect != "CRIT_DMG") {
        multiplier *= (1+this.skill_matrix[effect]);
      }
    }, this);
    return multiplier;
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
  constructor(skill_type, value, num_targets, sort_order) {
    this.skill_type = skill_type;
    this.value = value;
    this.nt = num_targets;
    this.sort_order = sort_order;
  }
}

class DaemonType {
  constructor (type, base_crit_rate) {
    this.type = type;
    this.base_crit_rate = base_crit_rate;
  }
}