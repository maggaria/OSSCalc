//Remember any set daemons on refresh
$(document).ready(function() {
  if(sessionStorage.getItem("set-leader") == "true") {
    fillModal("leader");
    if(sessionStorage.getItem("leader-preset") !== "none") {
      printData("leader",sessionStorage.getItem("leader-preset"));
    } else {
      printData("leader","none");
    }
  }
  if(sessionStorage.getItem("set-sub1") == "true") {
    fillModal("sub1");
    if(sessionStorage.getItem("sub1-preset") !== "none") {
      printData("sub1",sessionStorage.getItem("sub1-preset"));
    } else {
      printData("sub1","none");
    }
  }
  if(sessionStorage.getItem("set-sub2") == "true") {
    fillModal("sub2");
    if(sessionStorage.getItem("sub2-preset") !== "none") {
      printData("sub2",sessionStorage.getItem("sub2-preset"));
    } else {
      printData("sub2","none");
    }
  }
  if(sessionStorage.getItem("set-sub3") == "true") {
    fillModal("sub3");
    if(sessionStorage.getItem("sub3-preset") !== "none") {
      printData("sub3",sessionStorage.getItem("sub3-preset"));
    } else {
      printData("sub3","none");
    }
  }
  if(sessionStorage.getItem("set-helper") == "true") {
    fillModal("helper");
    if(sessionStorage.getItem("helper-preset") !== "none") {
      printData("helper",sessionStorage.getItem("helper-preset"));
    } else {
      printData("helper","none");
    }
  }  
})
//Set tooltips.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});

//For daemons already set:
//Populate modal with stored data
//disable add button and enable remove and update buttons
//For new daemons:
//Show add button, and hide remove and update buttons
$(".leader .photo").click(function() {
  $(".position").html("<label>Position</label><p>Leader</p>");
  if(sessionStorage.getItem("set-leader") == "true") {
    $("#add-daemon").hide();
    $("#remove-daemon").show();
    $("#update-daemon").show();
    fillModal("leader");
  } else {
    $("#add-daemon").show();
    $("#remove-daemon").hide();
    $("#update-daemon").hide();
    clearModal();
  }
});
$(".sub1 .photo").click(function() {
  $(".position").html("<label>Position</label><p>Sub 1</p>");
  if(sessionStorage.getItem("set-sub1") == "true") {
    $("#add-daemon").hide();
    $("#remove-daemon").show();
    $("#update-daemon").show();
    fillModal("sub1");
  } else {
    $("#add-daemon").show();
    $("#remove-daemon").hide();
    $("#update-daemon").hide();
    clearModal();
  }  
});
$(".sub2 .photo").click(function() {
  $(".position").html("<label>Position</label><p>Sub 2</p>");
  if(sessionStorage.getItem("set-sub2") == "true") {
    $("#add-daemon").hide();
    $("#remove-daemon").show();
    $("#update-daemon").show();
    fillModal("sub2");
  } else {
    $("#add-daemon").show();
    $("#remove-daemon").hide();
    $("#update-daemon").hide();
    clearModal();
  }    
});
$(".sub3 .photo").click(function() {
  $(".position").html("<label>Position</label><p>Sub 3</p>");
  if(sessionStorage.getItem("set-sub3") == "true") {
    $("#add-daemon").hide();
    $("#remove-daemon").show();
    $("#update-daemon").show();
    fillModal("sub3");
  } else {
    $("#add-daemon").show();
    $("#remove-daemon").hide();
    $("#update-daemon").hide();
    clearModal();
  }    
});
$(".helper .photo").click(function() {
  $(".position").html("<label>Position</label><p>Helper</p>");
  if(sessionStorage.getItem("set-helper") == "true") {
    $("#add-daemon").hide();
    $("#remove-daemon").show();
    $("#update-daemon").show();
    fillModal("helper");
  } else {
    $("#add-daemon").show();
    $("#remove-daemon").hide();
    $("#update-daemon").hide();
    clearModal();
  }    
});

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

//Set photo for added daemon and remove dashed border and + icon
function setPhoto(position,preset) {
  $("." + position + " .photo").removeClass("dashed");
  if(preset == "TE") {
    if($("." + position + " .photo").has("img").length) {
      $("." + position + " .photo img").replaceWith("<img src=\"images/Titanium_Elf.png\">"); 
      $("." + position + " .photo span").replaceWith("<img src=\"images/Titanium_Elf.png\">");
    } else {
      $("." + position + " .photo span").replaceWith("<img src=\"images/Titanium_Elf.png\">");    
    }
  } else if(preset == "A") {
    if($("." + position + " .photo").has("img").length) {
      $("." + position + " .photo img").replaceWith("<img src=\"images/Amanojaku.png\">");   
    } else {
      $("." + position + " .photo span").replaceWith("<img src=\"images/Amanojaku.png\">");         
    }
  } else if(preset == "F") {
    if($("." + position + " .photo").has("img").length) {
      $("." + position + " .photo img").replaceWith("<img src=\"images/Freyr.png\">");
    } else {
      $("." + position + " .photo span").replaceWith("<img src=\"images/Freyr.png\">");   
    }
  } else if(preset == "K") {
    if($("." + position + " .photo").has("img").length) {
      $("." + position + " .photo img").replaceWith("<img src=\"images/Katsushika_Hokusai.png\">");
    } else {
      $("." + position + " .photo span").replaceWith("<img src=\"images/Katsushika_Hokusai.png\">");   
    }
  } else if(preset == "TNY") {
    if($("." + position + " .photo").has("img").length) {
      $("." + position + " .photo img").replaceWith("<img src=\"images/Titania_New_Year.png\">");
    } else {
      $("." + position + " .photo span").replaceWith("<img src=\"images/Titania_New_Year.png\">");   
    }
  } else if(preset == "B") {
    if($("." + position + " .photo").has("img").length) {
      $("." + position + " .photo img").replaceWith("<img src=\"images/Belphegor.png\">");
    } else {
      $("." + position + " .photo span").replaceWith("<img src=\"images/Belphegor.png\">");   
    }
  } else if(preset == "S") {
    if($("." + position + " .photo").has("img").length) {
      $("." + position + " .photo img").replaceWith("<img src=\"images/Socrates.png\">");
    } else {
      $("." + position + " .photo span").replaceWith("<img src=\"images/Socrates.png\">");   
    }
  } else if(preset == "G") {
    if($("." + position + " .photo").has("img").length) {
      $("." + position + " .photo img").replaceWith("<img src=\"images/Guillotine.png\">");
    } else {
      $("." + position + " .photo span").replaceWith("<img src=\"images/Guillotine.png\">");   
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

//Store inputted daemon data
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

  sessionStorage.setItem(pos + "-role",$("#role").val());
  sessionStorage.setItem(pos + "-type",$("#type").val());
  sessionStorage.setItem(pos + "-atk",$("#atk").val());
  sessionStorage.setItem(pos + "-hp",$("#hp").val());
  sessionStorage.setItem(pos + "-skill-dmg",$("#skill-dmg").val());
  sessionStorage.setItem(pos + "-targets",$("#targets").val());
  sessionStorage.setItem(pos + "-skill-effect",$("#skill-effect").val());
  sessionStorage.setItem(pos + "-effect-num-format",$("#effect-num-format").val());
  sessionStorage.setItem(pos + "-effect-val",$("#effect-val").val());
  sessionStorage.setItem(pos + "-bond-1",$("#bond-1").val());
  sessionStorage.setItem(pos + "-bond-2",$("#bond-2").val());
  sessionStorage.setItem(pos + "-bond-3",$("#bond-3").val());
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
    $("#role").val("ranged");
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
  
  if(position == "Leader") {
    storeSessionData(position);
    printData("leader",preset);
    sessionStorage.setItem("leader-preset",preset);
    sessionStorage.setItem("set-leader","true");
  } else if(position == "Sub 1") {
    storeSessionData(position);
    printData("sub1",preset);
    sessionStorage.setItem("sub1-preset",preset);
    sessionStorage.setItem("set-sub1","true");
  } else if(position == "Sub 2") {
    storeSessionData(position);
    printData("sub2",preset);
    sessionStorage.setItem("sub2-preset",preset);
    sessionStorage.setItem("set-sub2","true");
  } else if(position == "Sub 3") {
    storeSessionData(position);
    printData("sub3",preset);
    sessionStorage.setItem("sub3-preset",preset);
    sessionStorage.setItem("set-sub3","true");
  } else {
    storeSessionData(position);
    printData("helper",preset);
    sessionStorage.setItem("helper-preset",preset);
    sessionStorage.setItem("set-helper","true");
  }
  
  $(".modal").modal('hide');
  $('#daemon-form').find('input,select').val('');
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

//Re-parse modal form and reprints daemon data
$("#update-daemon").click(function(event) {
  event.preventDefault();
  
  var position = $(".position p").text();
  
  if(position == "Leader") {
    storeSessionData(position);
    if(sessionStorage.getItem("leader-preset") !== "none") {
      printData("leader",sessionStorage.getItem("leader-preset"));
    } else {
      printData("leader","none");
    }
  } else if(position == "Sub 1") {
    storeSessionData(position);
    if(sessionStorage.getItem("sub1-preset") !== "none") {
      printData("sub1",sessionStorage.getItem("sub1-preset"));
    } else {
      printData("sub1","none");
    }
  } else if(position == "Sub 2") {
    storeSessionData(position);
    if(sessionStorage.getItem("sub2-preset") !== "none") {
      printData("sub2",sessionStorage.getItem("sub2-preset"));
    } else {
      printData("sub2","none");
    }
  } else if(position == "Sub 3") {
    storeSessionData(position);
    if(sessionStorage.getItem("sub3-preset") !== "none") {
      printData("sub3",sessionStorage.getItem("sub3-preset"));
    } else {
      printData("sub3","none");
    }
  } else {
    storeSessionData(position);
    if(sessionStorage.getItem("helper-preset") !== "none") {
      printData("helper",sessionStorage.getItem("helper-preset"));
    } else {
      printData("helper","none");
    }
  }
  
  $(".modal").modal('hide');
  $('#daemon-form').find('input,select').val('');  
});

//Stores data for newly added daemon and prints daemon's data to screen
$("#add-daemon").click(function(event) {
  event.preventDefault();
  
  var position = $(".position p").text();
  
  storeSessionData(position);
  
  if(position == "Leader") {
    printData("leader","none");
    sessionStorage.setItem("set-leader","true");
    sessionStorage.setItem("leader-preset","none");
  } else if(position == "Sub 1") {
    printData("sub1","none");
    sessionStorage.setItem("set-sub1","true");
    sessionStorage.setItem("sub1-preset","none");
  } else if(position == "Sub 2") {
    printData("sub2","none");
    sessionStorage.setItem("set-sub2","true");
    sessionStorage.setItem("sub2-preset","none");
  } else if(position == "Sub 3") {
    printData("sub3","none");
    sessionStorage.setItem("set-sub3","true");
    sessionStorage.setItem("sub3-preset","none");
  } else {
    printData("helper","none");
    sessionStorage.setItem("set-helper","true");
    sessionStorage.setItem("helper-preset","none");
  } 
  
  $(".modal").modal('hide');
  $('#daemon-form').find('input,select').val('');
});

//Run calculations on the daemons submitted
$("#submit-seq").click(function(event) {
  event.preventDefault();
  
  var numDaemons = 0;
  var hasLeader = false;
  var hasHelper = false;  
  
  if(sessionStorage.getItem("set-leader") == "true") {
    fillModal("leader");
    addDaemon("L");
    clearModal();
    numDaemons++;
    hasLeader = true;
  }
  if(sessionStorage.getItem("set-sub1") == "true") {
    fillModal("sub1");
    addDaemon("S1");
    clearModal();    
    numDaemons++;
  }
  if(sessionStorage.getItem("set-sub2") == "true") {
    fillModal("sub2");
    addDaemon("S2");
    clearModal();   
    numDaemons++;
  }
  if(sessionStorage.getItem("set-sub3") == "true") {
    fillModal("sub3");
    addDaemon("S3");
    clearModal();   
    numDaemons++;
  }
  if(sessionStorage.getItem("set-helper") == "true") {
    fillModal("helper");
    addDaemon("H");
    clearModal();  
    numDaemons++;
    hasHelper = true;
  }  
  
  if(numDaemons > 1 && hasLeader && hasHelper) {
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

  var numDaemons = 0;
  var hasLeader = false;
  var hasHelper = false;
  
  if(sessionStorage.getItem("set-leader") == "true") {
    fillModal("leader");
    addDaemon("L");
    clearModal();
    numDaemons++;
    hasLeader = true;
  }
  if(sessionStorage.getItem("set-sub1") == "true") {
    fillModal("sub1");
    addDaemon("S1");
    clearModal();    
    numDaemons++;
  }
  if(sessionStorage.getItem("set-sub2") == "true") {
    fillModal("sub2");
    addDaemon("S2");
    clearModal();    
    numDaemons++;
  }
  if(sessionStorage.getItem("set-sub3") == "true") {
    fillModal("sub3");
    addDaemon("S3");
    clearModal();    
    numDaemons++;
  }
  if(sessionStorage.getItem("set-helper") == "true") {
    fillModal("helper");
    addDaemon("H");
    clearModal();     
    numDaemons++;
    hasHelper = true;
  }    
  
  if(numDaemons > 1 && hasLeader && hasHelper) {
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