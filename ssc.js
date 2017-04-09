//skill sequence calculator

//constants
SELF_TARGET = 0;

//basic ui -- remove
window.onload = function() {
  document.getElementById('preset1').onclick = function() {
    document.getElementById('skill_sequence').value = 'F A3 A3 A2 A2 G G B1';
    input_run(); };

  document.getElementById('preset2').onclick = function() {
    document.getElementById('skill_sequence').value = 'F K F A2 A2 T3 T3 B1';
    input_run(); };
};

//global test daemon_mapping
var daemons = {};
var effect_matrix = {};

function calculate_damage(skill_sequence, seq_daemons) {
  if(skill_sequence.length < 1) {
    return 0;
  } else {
    var last_daemon = daemons[skill_sequence[skill_sequence.length-1]];
    var prev_skills = skill_sequence.slice(0,skill_sequence.length-1);
    var prev_damage = calculate_damage(prev_skills, seq_daemons);
    var current_damage = last_daemon.calculate_current_damage();
    var total_damage = current_damage + prev_damage;
    update_effect_matrix(last_daemon, seq_daemons);
    return total_damage;
  }
}

function calculate_flat_rate_damage() {
  return 0;
}

function update_effect_matrix(daemon, seq_daemons) {
  daemon.skill_effects.forEach(function(effect) {
    //switch on target type
    if(effect.num_targets == SELF_TARGET) {
      //TODO: need an example of this kind of buff
      return;
    } else {
      buff_target_daemons(effect, seq_daemons);
    }
    });
}

function buff_target_daemons(effect, seq_daemons) {
  num_targets = effect.nt;
  sort_tag = effect.sort_order;

  targets = seq_daemons;

  if (sort_tag) {
    sorted = sort_daemons(seq_daemons, sort_tag);
    targets = sorted.slice(0, num_targets);
  }

  targets.forEach( function(daemon) {
    daemons[daemon].add_active_effect(effect);
    });
  return;

  
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

function main() {
  ranged = new DaemonType("ranged", 0.4);
  melee = new DaemonType("melee", 0.2);
  none = new DaemonType("none", 0.1);
  daemons["A1"] = new Daemon(ranged, 0, 0, 3174, new Bonds(0,0,0), [], [new Effect("DMG_DEALT", 0.6, 5, null)]);
  daemons["A3"] = new Daemon(ranged, 0, 0, 3693, new Bonds(0,0,0), [], [new Effect("DMG_DEALT", 0.67, 5, null)]);
  daemons["A2"] = new Daemon(ranged, 11034, 0, 3894, new Bonds(0,0,2), [], [new Effect("DMG_DEALT", 0.74, 5, null)]); 
  daemons["T1"] = new Daemon(ranged, 0, 0, 2813, new Bonds(0,0,2), [], [new Effect("DMG_DEALT", 0.52, 5, null)]);
  daemons["T1.5"] = new Daemon(ranged, 0, 0, 2813, new Bonds(0,0,2), [new Effect("CRIT_RATE", 0.21, 0, null), new Effect("CRIT_DMG", 0.5, 0, null)], [new Effect("DMG_DEALT", 0.52, 5, null)]);
  daemons["T2"] = new Daemon(ranged, 0, 0, 2847, new Bonds(0,0,3), [new Effect("CRIT_RATE", 0.21, 0, null), new Effect("CRIT_DMG", 0.5, 0 , null)], [new Effect("DMG_DEALT", 0.57, 5, null)]);
  daemons["T3"] = new Daemon(ranged, 11221, 0, 3141, new Bonds(0,0,0), [new Effect("CRIT_RATE", 0.21, 0, null), new Effect("CRIT_DMG", 0.5, 0, null)], [new Effect("DMG_DEALT", 0.55, 5, null)]);
  daemons["NYT"] = new Daemon(ranged, 1, 0, 5160, new Bonds(0,0,1), [new Effect("CRIT_RATE", 0.05, 0, null)], []);
  daemons["F"] = new Daemon(ranged, 9246, 0, 0, new Bonds(0,0,1), [], [new Effect("DMG_INCREASE", 0.38, 5, null)]);
  daemons["K"] = new Daemon(ranged, 6800, 0, 0, new Bonds(0,0,0), [], [new Effect("CRIT_RATE", 0.45, 2, "HIGH_ATK")]);
  daemons["B1"] = new Daemon(ranged, 12063, 0, 3374, new Bonds(0,0,0), [], []);
  daemons["G"] = new Daemon(ranged, 12370, 0, 5725, new Bonds(0,0,0), [], []);
  daemons["S"] = new Daemon(ranged, 0, 0, 0, new Bonds(0,0,0), [], [new Effect("CONST_DMG_DEALT", 1020, 5, null)]);
  daemons["test"] = new Daemon(none, 10000, 1, 1, new Bonds(0,0,0), [], []);
}

function run_calc(skill_sequence) {
  main();
  var seq_daemons = array_to_set(skill_sequence);
  var result = calculate_damage(skill_sequence, seq_daemons);
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
function clear_matrix() {
  effect_matrix = {};
}

function input_run() {
  skill_sequence = parse_skill_sequence();
  document.getElementById("response").innerHTML = run_calc(skill_sequence);
  return;
}

function parse_skill_sequence() {
  var stringseq = document.getElementById("skill_sequence").value;
  return stringseq.split(" ");
}
