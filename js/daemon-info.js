//Remember any set daemons on refresh
$(document).ready(function() {
  if(sessionStorage.getItem("set-leader") == "true") {
    setDaemonOnRefresh("leader");
  }
  if(sessionStorage.getItem("set-sub1") == "true") {
    setDaemonOnRefresh("sub1");
  }
  if(sessionStorage.getItem("set-sub2") == "true") {
    setDaemonOnRefresh("sub2");
  }
  if(sessionStorage.getItem("set-sub3") == "true") {
    setDaemonOnRefresh("sub3");
  }
  if(sessionStorage.getItem("set-helper") == "true") {
    setDaemonOnRefresh("helper");
  }  
})

function setDaemonOnRefresh(position) {
  fillModal(position);
  if(sessionStorage.getItem(position+"-preset") !== "none") {
    printData(position,sessionStorage.getItem(position+"-preset"));
  } else {
    printData(position, "none");
  }
}

//Set tooltips.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});

var shortPositionToReadable = {
  "leader":"Leader",
  "sub1":"Sub 1",
  "sub2":"Sub 2",
  "sub3":"Sub 3",
  "helper":"Helper"
};

//For daemons already set:
//Populate modal with stored data
//disable add button and enable remove and update buttons
//For new daemons:
//Show add button, and hide remove and update buttons
$(".leader .photo").click(function() {
  positionClick("leader");
});
$(".sub1 .photo").click(function() {
  positionClick("sub1");
});
$(".sub2 .photo").click(function() {
  positionClick("sub2");  
});
$(".sub3 .photo").click(function() {
  positionClick("sub3");    
});
$(".helper .photo").click(function() {
  positionClick("helper");
});

function positionClick(position) {
  $(".position").html("<label>Position</label><p>" + shortPositionToReadable[position] + "</p>");
  if(sessionStorage.getItem("set-"+position)) {
    populateModalWithDaemonData(position);
  } else {
    setupModalForNewDaemon();
  }
}

function populateModalWithDaemonData(position) {
  $("#add-daemon").hide();
  $("#remove-daemon").show();
  $("#update-daemon").show();
  fillModal(position);
}

function setupModalForNewDaemon() {
  $("#add-daemon").show();
  $("#remove-daemon").hide();
  $("#update-daemon").hide();
  clearModal();
}

//Print inputted data and images at specified position
function printData(position,preset) {
  setPhoto(position,preset);
  $("." + position + " .stats").html("");
  $("." + position + " .stats").html(getDataString);
}

//Clear all inputted data and images
function removeData(position) {
  removePhoto(position);
  $("." + position + " .stats").html("");
}

var presetImageName = {
  "TE":"Titanium_Elf",
  "A":"Amanojaku",
  "F":"Freyr",
  "K":"Katsushika_Hokusai",
  "TNY":"Titania_New_Year",
  "B":"Belphegor",
  "S":"Socrates",
  "G":"Guillotine"
};

//Set photo for added daemon and remove dashed border and + icon
function setPhoto(position,preset) {
  $("." + position + " .photo").removeClass("dashed");
  if(presetImageName[preset]) {
    if($("." + position + " .photo").has("img").length) {
      $("." + position + " .photo img").replaceWith("<img src=\"images/"+presetImageName[preset]+".png\">"); 
      $("." + position + " .photo span").replaceWith("<img src=\"images/"+presetImageName[preset]+".png\">");
    } else {
      $("." + position + " .photo span").replaceWith("<img src=\"images/"+presetImageName[preset]+".png\">");    
    }
  } else {
    if($("." + position + " .photo").has("img").length.length) {
      $("." + position + " .photo img").replaceWith("<img src=\"images/Blank.png\">");
    } else {
      $("." + position + " .photo span").replaceWith("<img src=\"images/Blank.png\">");   
    }
  }
}

//Replace photo with dashed border and + icon
function removePhoto(position) {
  $("." + position + " .photo").addClass("dashed");
  $("." + position + " .photo").html("");
  $("." + position + " .photo").html("<span>+</span>");
}

var readableToShortPosition = {
    "Leader":"leader",
    "Sub 1":"sub1",
    "Sub 2":"sub2",
    "Sub 3":"sub3",
    "Helper":"helper"
  };

//Store inputted daemon data
function storeSessionData(position) {
  sessionStorage.setItem(readableToShortPosition[position] + "-role",$("#role").val());
  sessionStorage.setItem(readableToShortPosition[position] + "-type",$("#type").val());
  sessionStorage.setItem(readableToShortPosition[position] + "-atk",$("#atk").val());
  sessionStorage.setItem(readableToShortPosition[position] + "-hp",$("#hp").val());
  sessionStorage.setItem(readableToShortPosition[position] + "-skill-dmg",$("#skill-dmg").val());
  sessionStorage.setItem(readableToShortPosition[position] + "-targets",$("#targets").val());
  sessionStorage.setItem(readableToShortPosition[position] + "-skill-effect",$("#skill-effect").val());
  sessionStorage.setItem(readableToShortPosition[position] + "-effect-num-format",$("#effect-num-format").val());
  sessionStorage.setItem(readableToShortPosition[position] + "-effect-val",$("#effect-val").val());
  sessionStorage.setItem(readableToShortPosition[position] + "-bond-1",$("#bond-1").val());
  sessionStorage.setItem(readableToShortPosition[position] + "-bond-2",$("#bond-2").val());
  sessionStorage.setItem(readableToShortPosition[position] + "-bond-3",$("#bond-3").val());
}

//Populate modal with stored input values for daemons already added
function fillModal(pos) {
  $("#role").val(sessionStorage.getItem(pos + "-role"));
  $("#type").val(sessionStorage.getItem(pos + "-type"));
  $("#atk").val(sessionStorage.getItem(pos + "-atk"));
  $("#hp").val(sessionStorage.getItem(pos + "-hp"));
  $("#skill-dmg").val(sessionStorage.getItem(pos + "-skill-dmg"));
  $("#targets").val(sessionStorage.getItem(pos + "-targets"));
  $("#skill-effect").val(sessionStorage.getItem(pos + "-skill-effect"));
  $("#effect-num-format").val(sessionStorage.getItem(pos + "-effect-num-format"));
  $("#effect-val").val(sessionStorage.getItem(pos + "-effect-val"));
  $("#bond-1").val(sessionStorage.getItem(pos + "-bond-1"));
  $("#bond-2").val(sessionStorage.getItem(pos + "-bond-2"));
  $("#bond-3").val(sessionStorage.getItem(pos + "-bond-3"));
}

//Reset all form fields in modal
function clearModal() {
  $("#role").val("");
  $("#type").val("");
  $("#atk").val("");
  $("#hp").val("");
  $("#skill-dmg").val("");
  $("#targets").val("");
  $("#skill-effect").val("");
  $("#effect-num-format").val("");
  $("#effect-val").val("");
  $("#bond-1").val("");
  $("#bond-2").val("");
  $("#bond-3").val("");  
}

//Parse form inputs and return html for printing data
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
  
  var skillEffect = $("#skill-effect").val();
  var effectNumFormat = $("#effect-num-format").val();
  var effectVal;
  
  if(effectNumFormat !== "") {
    if(effectNumFormat == "int") {
      effectVal = $("#effect-val").val();
    } else {
      effectVal = parseInt($("#effect-val").val())/100;
    }
  } else {
    effectVal = 0;
  }
  
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
  
  return buildDaemonInformationDisplay(role[0].toUpperCase() + role.slice(1), type, atk, hp, skillDmg, targets, sortOrder, skillEffect, effectVal, bond1, bond2, bond3);
}

function buildDaemonInformationDisplay(role,type,atk,hp,skillDmg,targets,sortOrder,skillEffect, effectVal, bond1, bond2, bond3) {
  var daemonInformationDisplay = "";
  daemonInformationDisplay += addIconString("images/roles/" + role + ".png", role, "left");
  daemonInformationDisplay += addIconString("images/types/" + type + ".png", type, "right");
  daemonInformationDisplay += "<h5>" + atk + " <b>ATK</b>/" + hp + " <b>HP</b></h5>";
  daemonInformationDisplay += "<div class=\"hidden\">";
  daemonInformationDisplay += skillDmg? "<h5>Skill DMG: " + skillDmg + "</h5>" : "";
  daemonInformationDisplay += targets? "<h5>Targets: " + targets + "</h5>" : "";
  daemonInformationDisplay += sortOrder? "<h5>Sort Order: " + sortOrder + "</h5>" : "";
  daemonInformationDisplay += skillEffect? "<h5>Skill Effect: " + skillEffect + "</h5>" : "";
  daemonInformationDisplay += effectVal? "<h5>Effect Value: " + effectVal + "</h5>": "";
  daemonInformationDisplay += bond1? "<h5>Bonds: " + bond1 + "&#x2606;" : "";
  daemonInformationDisplay += bond2? ", " + bond2 + "&#x2606;" : "";
  daemonInformationDisplay += bond3? ", " + bond3 + "&#x2606;" : "";
  daemonInformationDisplay += bond1? "</h5>" : "";
  daemonInformationDisplay += "</div>";
  return daemonInformationDisplay;
}

function addIconString(src, tooltip, direction) {
  return "<a href=\"javascript: void(0);\" data-toggle=\"tooltip\" data-placement=\"" + direction + "\" title=\"" + tooltip + "\"><img class=\"icon\" src=\"" + src + "\"></a>";
}

//Add or replace daemon for a specified position in the daemons array
function addDaemon(position) {

  var role;
  
  switch($("#role").val()) {
    case "melee":
      role = new DaemonRole("melee",0.2);
      break;
    case "ranged":
      role = new DaemonRole("ranged", 0.4);
      break;
    case "healer":
      role = new DaemonRole("healer", 0.4);
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
  
  var skillEffect = $("#skill-effect").val();
  var effectNumFormat = $("#effect-num-format").val();
  var effectVal;
  
  if(effectNumFormat !== "") {
    if(effectNumFormat == "int") {
      effectVal = $("#effect-val").val();
    } else {
      effectVal = parseInt($("#effect-val").val())/100;
    }
  } else {
    effectVal = 0;
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
  
  if(skillEffect == "") {
    daemons[position] = new Daemon(role, type, $("#atk").val(), $("#hp").val(), skillDmg, new Bonds(bond1,bond2,bond3), [], null, []);
  } else {
    daemons[position] = new Daemon(role, type, $("#atk").val(), $("#hp").val(), skillDmg, new Bonds(bond1,bond2,bond3), [], new Skill(new Effect(skillEffect,effectVal), new Target("sort", null, targets, sortOrder)), []);
  }
}

//Remove data for daemon at specified position and indicate that position is empty
function removeDaemon(position) {
  sessionStorage.setItem("set-" + position, "false");
  removeData(position);
}

function addPreset(preset) {
  
  if(preset == "TE") {
    $("#role").val("ranged");
    $("#type").val("Divina");
    $("#atk").val(11694);
    $("#hp").val(9546);
    $("#skill-dmg").val(2847);
    $("#targets").val("target-1");
    $("#sort-order").val("");
    $("#skill-effect").val("DMG_DEALT");
    $("#effect-num-format").val("percent");
    $("#effect-val").val(57);
    $("#bond-1").val("");
    $("#bond-2").val("");
    $("#bond-3").val("");
  }
  if(preset == "A") {
    $("#role").val("ranged");
    $("#type").val("Phantasma");
    $("#atk").val(11034);
    $("#hp").val(6866);
    $("#skill-dmg").val(3894);
    $("#targets").val("target-1");
    $("#sort-order").val("HIGH_HP");
    $("#skill-effect").val("DMG_DEALT");
    $("#effect-num-format").val("percent");
    $("#effect-val").val(74);
    $("#bond-1").val("");
    $("#bond-2").val("");
    $("#bond-3").val("");    
  }
  if(preset == "F") {
    $("#role").val("healer");
    $("#type").val("Divina");
    $("#atk").val(10023);
    $("#hp").val(9546);
    $("#skill-dmg").val("");
    $("#targets").val("target-all");
    $("#sort-order").val("");
    $("#skill-effect").val("DMG_INCREASE");
    $("#effect-num-format").val("percent");
    $("#effect-val").val(43);
    $("#bond-1").val("");
    $("#bond-2").val("");
    $("#bond-3").val("");    
  }  
  if(preset == "K") {
    $("#role").val("ranged");
    $("#type").val("Divina");
    $("#atk").val(8337);
    $("#hp").val(6376);
    $("#skill-dmg").val("");
    $("#targets").val("target-2");
    $("#sort-order").val("HIGH_ATK");
    $("#skill-effect").val("CRIT_RATE");
    $("#effect-num-format").val("percent");
    $("#effect-val").val(55);
    $("#bond-1").val("");
    $("#bond-2").val("");
    $("#bond-3").val("");     
  }
  if(preset == "TNY") {
    $("#role").val("ranged");
    $("#type").val("Phantasma");
    $("#atk").val(14081);
    $("#hp").val(9188);
    $("#skill-dmg").val(6160);
    $("#targets").val("target-1");
    $("#sort-order").val("HIGH_HP");
    $("#skill-effect").val("");
    $("#effect-num-format").val("");
    $("#effect-val").val("");
    $("#bond-1").val("");
    $("#bond-2").val("");
    $("#bond-3").val("");     
  } 
  if(preset == "B") {
    $("#role").val("ranged");
    $("#type").val("Phantasma");
    $("#atk").val(13126);
    $("#hp").val(8533);
    $("#skill-dmg").val(3294);
    $("#targets").val("target-3");
    $("#sort-order").val("HIGH_ATK");
    $("#skill-effect").val("");
    $("#effect-num-format").val("");
    $("#effect-val").val("");
    $("#bond-1").val("");
    $("#bond-2").val("");
    $("#bond-3").val("");     
  }   
  if(preset == "S") {
    $("#role").val("ranged");
    $("#type").val("Divina");
    $("#atk").val(11336);
    $("#hp").val(9546);
    $("#skill-dmg").val("");
    $("#targets").val("target-all");
    $("#sort-order").val("");
    $("#skill-effect").val("CONST_DMG_DEALT");
    $("#effect-num-format").val("int");
    $("#effect-val").val(1220);
    $("#bond-1").val("");
    $("#bond-2").val("");
    $("#bond-3").val("");     
  }     
  if(preset == "G") {
    $("#role").val("ranged");
    $("#type").val("Anima");
    $("#atk").val(14081);
    $("#hp").val(9188);
    $("#skill-dmg").val(6061);
    $("#targets").val("target-1");
    $("#sort-order").val("HIGH_HP");
    $("#skill-effect").val("");
    $("#effect-num-format").val("");
    $("#effect-val").val("");
    $("#bond-1").val("");
    $("#bond-2").val("");
    $("#bond-3").val("");     
  }       
  
  var position = $(".position p").text();
  var pos = readableToShortPosition[position];

  storeSessionData(position);
  printData(pos,preset);
  sessionStorage.setItem(pos + "-preset",preset);
  sessionStorage.setItem("set-" + pos,"true");
  
  closeModal();
}

$("#select-preset").click(function(event) {
  event.preventDefault();
  
  var preset = $("#presets").val();
  
  addPreset(preset);
})

//Actions for clicking the Remove Daemon button
//Removes daemon at specified position
$("#remove-daemon").click(function(event) {
  event.preventDefault();
  
  var position = $(".position p").text();
  var pos = readableToShortPosition[position];

  removeDaemon(pos);

  closeModal();    
})

//Re-parse modal form and reprints daemon data
$("#update-daemon").click(function(event) {
  event.preventDefault();
  
  var position = $(".position p").text();
  var pos = readableToShortPosition[position];

  storeSessionData(position);
  if(sessionStorage.getItem(pos+"-preset") !== "none") {
    printData(pos,sessionStorage.getItem(pos+"-preset"));
  } else {
    printData(pos,"none");
  }
  
  closeModal();  
});

//Stores data for newly added daemon and prints daemon's data to screen
$("#add-daemon").click(function(event) {
  event.preventDefault();
  
  var position = $(".position p").text();
  var pos = readableToShortPosition[position];
  
  storeSessionData(pos);

  printData(pos,"none");
  sessionStorage.setItem("set-"+pos,"true");
  sessionStorage.setItem(pos+"-preset","none");
  
  closeModal();
});

function closeModal() {
  $(".modal").modal('hide');
  $('#daemon-form').find('input,select').val('');
}

//Run calculations on the daemons submitted
$("#submit-seq").click(function(event) {
  event.preventDefault();  
  
  var constraints = prepareDaemons();
  
  if(constraints.numDaemons > 1 && constraints.hasLeader && constraints.hasHelper) {
    var seqInput = $("#skill-sequence").val().split(',');

    var result = run_calc(seqInput);
    var shards = n_shards(seqInput);

    var shardstring = "";
    for (var i = 0; i < shards; i++) {
      shardstring += "&#9679;";
    }

    $(".result").html("Result: " + result + " (<span style='color:#55AEFE;'>" + shardstring + "</span>)");
  } else {
    $(".result").html("Error: Invalid Team. Team must have a leader and a helper.");
  }
});

$("#optimize-seq").click(function(event) {
  event.preventDefault();
  
  var constraints = prepareDaemons();
  
  if(constraints.numDaemons > 1 && constraints.hasLeader && constraints.hasHelper) {
    var seqInput = $("#skill-sequence").val().split(',');
    var origDmg = run_calc(seqInput);

    var result = find_best(uniquePermute(seqInput));
    var resultDmg = run_calc(result);

    var dmgDiff = resultDmg - origDmg;
    var dmgDiffString = (dmgDiff > 0)? "<span style='color:green'>+" + (dmgDiff|0).toString() + "</span>" : "<span style='color:red'>" + (dmgDiff|0).toString() + "</span>";

    $(".result").html("Best Sequence: " + result.join(" ") + " <br>Expected Damage: " + (resultDmg|0) + " (" + dmgDiffString + ")");
  } else {
    $(".result").html("Error: Invalid Team. Team must have a leader and a helper.");
  }
})

var shortPositionToInitial = {
  "leader":"L",
  "sub1":"S1",
  "sub2":"S2",
  "sub3":"S3",
  "helper":"H"
};

function prepareDaemons(){
  var constraints = {
    numDaemons: 0,
    hasLeader: false,
    hasHelper: false
  }

  Object.keys(shortPositionToReadable).forEach(function(position) {
    if(sessionStorage.getItem("set-"+position)) {
      fillModal(position);
      addDaemon(shortPositionToInitial[position]);
      clearModal();
      constraints.numDaemons++;
      if(position == "leader") {
        constraints.hasLeader = true;
      }
      if(position == "helper") {
        constraints.hasHelper = true;
      }
    } 
  });

  return constraints;
}