window.onload = function() {
  document.getElementById('preset1').onclick = function() {
    document.getElementById('skill_sequence').value = 'F A3 A3 A2 A2 G G B1';
    input_run(); };

  document.getElementById('preset2').onclick = function() {
    document.getElementById('skill_sequence').value = 'F K F A2 A2 T3 T3 B1';
    input_run(); };
};