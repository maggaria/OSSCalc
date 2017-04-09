//Remember any set daemons on refresh
$(document).ready(function() {
  if(sessionStorage.getItem("set-leader") == "true") {
    fillModal("leader");
    printData("leader");
  }
  if(sessionStorage.getItem("set-sub1") == "true") {
    fillModal("sub1");
    printData("sub1");
  }
  if(sessionStorage.getItem("set-sub2") == "true") {
    fillModal("sub2");
    printData("sub2");
  }
  if(sessionStorage.getItem("set-sub3") == "true") {
    fillModal("sub3");
    printData("sub3");
  }
  if(sessionStorage.getItem("set-helper") == "true") {
    fillModal("helper");
    printData("helper");
  }  
})

//Populate modal for daemons already set
$(".leader .photo").click(function() {
  $(".position").html("<label>Position</label><p>Leader</p>");
  if(sessionStorage.getItem("set-leader") == "true") {
    $("#add-daemon").hide();
    $("#remove-daemon").show();
    $("#edit-daemon").show();
    fillModal("leader");
  } else {
    $("#add-daemon").show();
    $("#remove-daemon").hide();
    $("#edit-daemon").hide();
    clearModal();
  }
});
$(".sub1 .photo").click(function() {
  $(".position").html("<label>Position</label><p>Sub 1</p>");
  if(sessionStorage.getItem("set-sub1") == "true") {
    $("#add-daemon").hide();
    $("#remove-daemon").show();
    $("#edit-daemon").show();
    fillModal("sub1");
  } else {
    $("#add-daemon").show();
    $("#remove-daemon").hide();
    $("#edit-daemon").hide();
    clearModal();
  }  
});
$(".sub2 .photo").click(function() {
  $(".position").html("<label>Position</label><p>Sub 2</p>");
  if(sessionStorage.getItem("set-sub2") == "true") {
    $("#add-daemon").hide();
    $("#remove-daemon").show();
    $("#edit-daemon").show();
    fillModal("sub2");
  } else {
    $("#add-daemon").show();
    $("#remove-daemon").hide();
    $("#edit-daemon").hide();
    clearModal();
  }    
});
$(".sub3 .photo").click(function() {
  $(".position").html("<label>Position</label><p>Sub 3</p>");
  if(sessionStorage.getItem("set-sub3") == "true") {
    $("#add-daemon").hide();
    $("#remove-daemon").show();
    $("#edit-daemon").show();
    fillModal("sub3");
  } else {
    $("#add-daemon").show();
    $("#remove-daemon").hide();
    $("#edit-daemon").hide();
    clearModal();
  }    
});
$(".helper .photo").click(function() {
  $(".position").html("<label>Position</label><p>Helper</p>");
  if(sessionStorage.getItem("set-helper") == "true") {
    $("#add-daemon").hide();
    $("#remove-daemon").show();
    $("#edit-daemon").show();
    fillModal("helper");
  } else {
    $("#add-daemon").show();
    $("#remove-daemon").hide();
    $("#edit-daemon").hide();
    clearModal();
  }    
});

function removeData(position) {
  removePhoto(position);
  $("." + position + " .stats").html("");
}

function printData(position) {
  setPhoto(position);
  $("." + position + " .stats").html("");
  $("." + position + " .stats").html(getDataString);
}

function removePhoto(position) {
  $("." + position + " .photo").addClass("dashed");
  $("." + position + " .photo").html("");
  $("." + position + " .photo").html("<span>+</span>");
}

function setPhoto(position) {
  $("." + position + " .photo").removeClass("dashed");
  $("." + position + " .photo span").replaceWith("<img src=\"images/Blank.png\">");
}

function storeSessionData(position) {
  
  var pos;
  
  switch(position) {
    case "Leader":
      pos = "leader";
      break;
    case "Sub 1":
      pos = "sub1";
      break;
    case "Sub 2":
      pos = "sub2";
      break;
    case "Sub 3":
      pos = "sub3";
      break;
    case "Helper":
      pos = "helper";
      break;
  }

  var role;
  
  switch($("#role").val()) {
    case "melee":
      role = new DaemonRole("melee",0.2);
      break;
    case "ranged":
      role = new DaemonRole("ranged", 0.4);
      break;
  }

  var type;

 switch($("#type").val()) {
  case "Phantasma":
    type = "P";
    break;
  case "Anima":
    type = "A";
    break;
  case "Divina":
    type = "D";
    break;
 }

  sessionStorage.setItem(pos + "-role",$("#role").val());
  sessionStorage.setItem(pos + "-type",$("#type").val());
  sessionStorage.setItem(pos + "-atk",$("#atk").val());
  sessionStorage.setItem(pos + "-hp",$("#hp").val());
  sessionStorage.setItem(pos + "-skill-dmg",$("#skill-dmg").val());
  sessionStorage.setItem(pos + "-targets",$("#targets").val());
  sessionStorage.setItem(pos + "-buff-type",$("#buff-type").val());
  sessionStorage.setItem(pos + "-buff-num-type",$("#buff-num-type").val());
  sessionStorage.setItem(pos + "-buff-val",$("#buff-val").val());
  sessionStorage.setItem(pos + "-debuff-type",$("#debuff-type").val());
  sessionStorage.setItem(pos + "-debuff-val",$("#debuff-val").val());
  sessionStorage.setItem(pos + "-bond-1",$("#bond-1").val());
  sessionStorage.setItem(pos + "-bond-2",$("#bond-2").val());
  sessionStorage.setItem(pos + "-bond-3",$("#bond-3").val());
}

function clearModal() {
  $("#role").val("");
  $("#type").val("");
  $("#atk").val("");
  $("#hp").val("");
  $("#skill-dmg").val("");
  $("#targets").val("");
  $("#buff-type").val("");
  $("#buff-num-type").val("");
  $("#buff-val").val("");
  $("#debuff-type").val("");
  $("#debuff-val").val("");
  $("#bond-1").val("");
  $("#bond-2").val("");
  $("#bond-3").val("");  
}

function fillModal(pos) {
  $("#role").val(sessionStorage.getItem(pos + "-role"));
  $("#type").val(sessionStorage.getItem(pos + "-type"));
  $("#atk").val(sessionStorage.getItem(pos + "-atk"));
  $("#hp").val(sessionStorage.getItem(pos + "-hp"));
  $("#skill-dmg").val(sessionStorage.getItem(pos + "-skill-dmg"));
  $("#targets").val(sessionStorage.getItem(pos + "-targets"));
  $("#buff-type").val(sessionStorage.getItem(pos + "-buff-type"));
  $("#buff-num-type").val(sessionStorage.getItem(pos + "-buff-num-type"));
  $("#buff-val").val(sessionStorage.getItem(pos + "-buff-val"));
  $("#debuff-type").val(sessionStorage.getItem(pos + "-debuff-type"));
  $("#debuff-val").val(sessionStorage.getItem(pos + "-debuff-val"));
  $("#bond-1").val(sessionStorage.getItem(pos + "-bond-1"));
  $("#bond-2").val(sessionStorage.getItem(pos + "-bond-2"));
  $("#bond-3").val(sessionStorage.getItem(pos + "-bond-3"));
}

function getDataString() {
  
  var role = $("#role").val();
  var type = $("#type").val();
  var atk = $("#atk").val();
  var hp = $("#hp").val();
  var skillDmg = $("#skill-dmg").val();  
  
  if(skillDmg == "") {
    skillDmg = 0;
  } 
  
  var targets;

  switch($("#targets").val()) {
    case "target-1":
      targets = 1;
      break;
    case "target-2":
      targets = 2;
      break;
    case "target-3":
      targets = 3;
      break;
    case "target-all":
      targets = 5;
  }
  
  var sortOrder = $("#sort-order").val();
  var buffType = $("#buff-type").val();
  var buffVal = parseInt($("#buff-val").val())/100;
  var bond1 = parseInt($("#bond-1").val());
  var bond2 = parseInt($("#bond-2").val());
  var bond3 = parseInt($("#bond-3").val());
  
  if(isNaN(bond1)) {
    bond1 = 0;
  }
  if(isNaN(bond2)) {
    bond2 = 0;
  }
  if(isNaN(bond3)) {
    bond3 = 0;
  }
  
  return "<h5>Role: " + role + "</h5>"
        +"<h5>Type: " + type + "</h5>"
        +"<h5>ATK: " + atk + "</h5>"
        +"<h5>HP: " + hp + "</h5>"
        +"<h5>Skill DMG: " + skillDmg + "</h5>"
        +"<h5>Targets: " + targets + "</h5>"
        +"<h5>Sort Order: " + sortOrder + "</h5>"
        +"<h5>Buff Type: " + buffType + "</h5>"
        +"<h5>Buff Value: " + buffVal + "</h5>"
        +"<h5>First Bond: " + bond1 + "</h5>"
        +"<h5>Second Bond: " + bond2 + "</h5>"
        +"<h5>Third Bond: " + bond3 + "</h5>"
}

function removeDaemon(position) {
  sessionStorage.setItem("set-" + position, "false");
  removeData(position);
}

function addDaemon(position) {

  var role;
  
  switch($("#role").val()) {
    case "melee":
      role = new DaemonRole("melee",0.2);
      break;
    case "ranged":
      role = new DaemonRole("ranged", 0.4);
      break;
  }
  
  var type;

   switch($("#type").val()) {
    case "Phantasma":
      type = "P";
      break;
    case "Anima":
      type = "A";
      break;
    case "Divina":
      type = "D";
      break;
  }  
  
  var skillDmg = $("#skill-dmg").val();
  
  if(skillDmg == "") { skillDmg = 0; }
  
  var bond1 = parseInt($("#bond-1").val());
  var bond2 = parseInt($("#bond-2").val());
  var bond3 = parseInt($("#bond-3").val());
  
  if(isNaN(bond1)) {
    bond1 = 0;
  }
  if(isNaN(bond2)) {
    bond2 = 0;
  }
  if(isNaN(bond3)) {
    bond3 = 0;
  }  
  
  var buffType = $("#buff-type").val();
  var buffVal;
  
  if(buffType !== "") {
    buffVal = parseInt($("#buff-val").val())/100;
  }    
  
  var targets;

  switch($("#targets").val()) {
    case "target-1":
      targets = 1;
      break;
    case "target-2":
      targets = 2;
      break;
    case "target-3":
      targets = 3;
      break;
    case "target-all":
      targets = 5;
  }  
  
  var sortOrder = $("#sort-order").val();
  
  if(sortOrder !== "HIGH_ATK") {
    sortOrder = null;
  }  
  
  if(buffType == "") {
    daemons[position] = new Daemon(role, type, $("#atk").val(), $("#hp").val(), skillDmg, new Bonds(bond1,bond2,bond3), [], []);
  } else {
    daemons[position] = new Daemon(role, type, $("#atk").val(), $("#hp").val(), skillDmg, new Bonds(bond1,bond2,bond3), [], [new Effect(buffType,buffVal, targets, sortOrder)]);
  }
}

$("#remove-daemon").click(function(event) {
  event.preventDefault();
  
  var position = $(".position p").text();
  
  if(position == "Leader") {
    removeDaemon("leader");
  } else if(position == "Sub 1") {
    removeDaemon("sub1");
  } else if(position == "Sub 2") {
    removeDaemon("sub2");
  } else if(position == "Sub 3") {
    removeDaemon("sub3");
  } else {
    removeDaemon("helper");
  }

  $(".modal").modal('hide');
  $('#daemon-form').find('input,select').val('');    
})

$("#edit-daemon").click(function(event) {
  event.preventDefault();
  
  var position = $(".position p").text();
  
  if(position == "Leader") {
    storeSessionData(position);
    printData("leader");
  } else if(position == "Sub 1") {
    storeSessionData(position);
    printData("sub1");
  } else if(position == "Sub 2") {
    storeSessionData(position);
    printData("sub2");
  } else if(position == "Sub 3") {
    storeSessionData(position);
    printData("sub3");
  } else {
    storeSessionData(position);
    printData("helper");
  }
  
  $(".modal").modal('hide');
  $('#daemon-form').find('input,select').val('');  
});

$("#add-daemon").click(function(event) {
  event.preventDefault();
  
  var position = $(".position p").text();
  
  storeSessionData(position);
  
  if(position == "Leader") {
    printData("leader");
    sessionStorage.setItem("set-leader","true");
  } else if(position == "Sub 1") {
    printData("sub1");
    sessionStorage.setItem("set-sub1","true");
  } else if(position == "Sub 2") {
    printData("sub2");
    sessionStorage.setItem("set-sub2","true");
  } else if(position == "Sub 3") {
    printData("sub3");
    sessionStorage.setItem("set-sub3","true");
  } else {
    printData("helper");
    sessionStorage.setItem("set-helper","true");
  } 
  
  $(".modal").modal('hide');
  $('#daemon-form').find('input,select').val('');
});



$("#submit-seq").click(function(event) {
  event.preventDefault();
  
  if(sessionStorage.getItem("set-leader") == "true") {
    fillModal("leader");
    addDaemon("L");
    clearModal();
  }
  if(sessionStorage.getItem("set-sub1") == "true") {
    fillModal("sub1");
    addDaemon("S1");
    clearModal();    
  }
  if(sessionStorage.getItem("set-sub2") == "true") {
    fillModal("sub2");
    addDaemon("S2");
    clearModal();    
  }
  if(sessionStorage.getItem("set-sub3") == "true") {
    fillModal("sub3");
    addDaemon("S3");
    clearModal();    
  }
  if(sessionStorage.getItem("set-helper") == "true") {
    fillModal("helper");
    addDaemon("H");
    clearModal();     
  }  
  
  var seqInput = $("#skill-sequence").val().split(',');
  
  var result = run_calc(seqInput);
  var shards = n_shards(seqInput);

  var shardstring = "";
  for (var i = 0; i < shards; i++) {
    shardstring += "&#9679;";
  }
  
  $(".result").html("Result: " + result + " (<span style='color:#55AEFE;'>" + shardstring + "</span>)");
});

$("#optimize-seq").click(function() {
  event.preventDefault();

  if(sessionStorage.getItem("set-leader") == "true") {
    fillModal("leader");
    addDaemon("L");
    clearModal();
  }
  if(sessionStorage.getItem("set-sub1") == "true") {
    fillModal("sub1");
    addDaemon("S1");
    clearModal();    
  }
  if(sessionStorage.getItem("set-sub2") == "true") {
    fillModal("sub2");
    addDaemon("S2");
    clearModal();    
  }
  if(sessionStorage.getItem("set-sub3") == "true") {
    fillModal("sub3");
    addDaemon("S3");
    clearModal();    
  }
  if(sessionStorage.getItem("set-helper") == "true") {
    fillModal("helper");
    addDaemon("H");
    clearModal();     
  }    
  
  var seqInput = $("#skill-sequence").val().split(',');
  var origDmg = run_calc(seqInput);

  var result = find_best(uniquePermute(seqInput));
  var resultDmg = run_calc(result);

  var dmgDiff = resultDmg - origDmg;
  var dmgDiffString = (dmgDiff > 0)? "<span style='color:green'>+" + (dmgDiff|0).toString() + "</span>" : "<span style='color:red'>" + (dmgDiff|0).toString() + "</span>";

  $(".result").html("Best Sequence: " + result.join(" ") + " <br>Expected Damage: " + (resultDmg|0) + " (" + dmgDiffString + ")");
})