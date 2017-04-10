class Daemon {
  constructor(role, type, atk, hp, skill_atk, bonds, active_effects, skill, passives) {
    this.role = role;
    this.type = type;
    this.atk = atk;
    this.hp = hp;
    this.skill_atk = skill_atk;
    this.bonds = bonds;
    this.active_effects = active_effects;
    this.skill = skill;
    this.passives = passives;
    this.build_skill_matrix();
  }

  apply_passives(all_daemons) {
    this.passives.forEach(function(passive) {
      use_skill(passive, all_daemons);
    }, this);
    return;
  }

  use_active(daemons) {
    this.use_skill(this.skill, daemons);
  }

  use_skill(skill, daemons) {
    if(skill){
      switch(skill.target.target_type){
        case "self":
          this.add_active_effect(skill.effect);
          break;
        case "name":
          skill.target.target_value.forEach(function(target_name) {
              if(daemons[target_name]) {
                daemons[target_name].add_active_effect(skill.effect);
              }
            });
          break;
        case "role":
        case "type":
          Object.keys(daemons).forEach(function(daemon){
            if(daemons[daemon][skill.target.target_type] == skill.target.target_value) {
              daemons[daemon].add_active_effect(skill.effect);
            }
          });
          break;
        default:
          var num_targets = skill.target.num_targets;
          var sort_tag = skill.sort_order;

          var targets = Object.keys(daemons);

          if (sort_tag) {
            var sorted = sort_daemons(daemons, sort_tag);
            targets = sorted.slice(0, num_targets);
          }

          targets.forEach( function(daemon) {
            daemons[daemon].add_active_effect(skill.effect);
            });
      }
    }
  }

  add_active_effect(effect) {
    this.active_effects.push(effect);
    this.update_skill_matrix(effect);
  }

  update_skill_matrix(effect) {
    this.skill_matrix[effect.effect_type] = this.skill_matrix[effect.effect_type]? this.skill_matrix[effect.effect_type] + effect.value : effect.value;
  }

  build_skill_matrix() {
    this.skill_matrix = {};
    this.active_effects.forEach(function(effect) {
      this.update_skill_matrix(effect);
    }, this);
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
    var crit_chance = this.role.base_crit_rate*(1+crit_rate_buff);
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
      if(effect != "CRIT_RATE" && effect != "CRIT_DMG" && effect != "CONST_DMG_DEALT") {
        multiplier *= (1+this.skill_matrix[effect]);
      }
    }, this);
    return multiplier;
  }

  calculate_current_damage() {
    var dmg = this.skill_atk*this.bonds.get_multiplier()*this.calculate_effect_multiplier()+this.calculate_const_dmg();
    return dmg;
  }

  calculate_const_dmg() {
    return this.skill_matrix["CONST_DMG_DEALT"]? this.skill_matrix["CONST_DMG_DEALT"]:0;
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
  constructor(effect_type, value) {
    //Allowed effect types:
    //CONST_DMG_DEALT (Socrates): debuffs enemy by a fixed amount.
    //CRIT_DMG (Katsu): buffs target allies' crit DMG by a percentage amount.
    //CRIT_RATE (Titanium Elf passive): buffs target allies' crit rate by a percentage amount
    //DMG_INCREASE (Freyr): buffs target allies' damage by a percentage amount.
    //DMG_DEALT (Amanojaku): debuffs enemy by a percentage amount.
    this.effect_type = effect_type;
    this.value = value;
  }
}

class Skill {
  constructor(effect, target) {
    this.effect = effect;
    this.target = target;
  }
}

class Target {
  constructor(target_type, target_value, num_targets, sort_order) {
    //target value is a list of acceptable daemons if target_type is "name",
    //the role if target_type is "role",
    //the type if target_type is "type",
    //unused if the target_type is "sort" or "self"
    this.target_type = target_type;
    this.target_value = target_value;
    this.num_targets = num_targets;
    this.sort_order = sort_order;
  }
}

class DaemonRole {
  constructor (role, base_crit_rate) {
    this.role = role;
    this.base_crit_rate = base_crit_rate;
  }
}