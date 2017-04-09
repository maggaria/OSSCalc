$(".leader").click(function() {
  $(".position").html("<label>Position</label><p>Leader</p>");
});
$(".sub1").click(function() {
  $(".position").html("<label>Position</label><p>Sub 1</p>");
});
$(".sub2").click(function() {
  $(".position").html("<label>Position</label><p>Sub 2</p>");
});
$(".sub3").click(function() {
  $(".position").html("<label>Position</label><p>Sub 3</p>");
});
$(".helper").click(function() {
  $(".position").html("<label>Position</label><p>Helper</p>");
});


$("#add-daemon").click(function() {
  event.preventDefault();
  var dataString = "";
  
  var position = $(".position p").text();

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
  
  var atk = $("#atk").val();
  var hp = $("#hp").val();
  
  var skillDmg = $("#daemon-form #skill-dmg").val();
  
  if(skillDmg == "") {
    skillDmg = 0;
  }
  
  dataString += "<h5>Role: " + $("#role").val() + "</h5>"
              + "<h5>Type: " + $("#type").val() + "</h5>"
              + "<h5> Attack: " + atk + "</h5>"
              + "<h5> HP: " + hp + "</h5>"
              + "<h5>Skill Dmg: " + skillDmg + "</h5>";  
  
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
  
  var buffType = $("#buff-type").val();
  var buffVal;
  
  if(buffType !== "") {
    buffVal = parseInt($("#buff-val").val())/100;
    dataString += "<h5>Buff Type: " + buffType + "</h5>"
                + "<h5>Buff Val: " + buffVal + "</h5>";
  }  

  var bond1 = parseInt($("#bond-1").val());
  var bond2 = parseInt($("#bond-2").val());
  var bond3 = parseInt($("#bond-3").val());
  
  if(!isNaN(bond1)) {
    dataString += "<h5>First Bond: " + bond1 + "</h5>";
  } else {
    bond1 = 0;
  }
  if(!isNaN(bond2)) {
    dataString += "<h5>Second Bond: " + bond2 + "</h5>";
  } else {
    bond2 = 0;
  }
  if(!isNaN(bond3)) {
    dataString += "<h5>Third Bond: " + bond3 + "</h5>";
  } else {
    bond3 = 0;
  }
  
  if(position == "Leader") {
    $(".leader .photo span").replaceWith("<img src=\"images/Blank.png\">");
    $(".leader .photo").removeClass("dashed");
    $(".leader .stats").html("");
    $(".leader .stats").html(dataString);
    if(buffType !== "") {
      daemons["L"] = new Daemon(role, type, atk, hp, skillDmg, new Bonds(bond1,bond2,bond3), [], [new Effect(buffType,buffVal, targets, sortOrder)]);
    } else {
      daemons["L"] = new Daemon(role, type, atk, hp, skillDmg, new Bonds(bond1,bond2,bond3), [], []);
    }
  } else if(position == "Sub 1") {
    $(".sub1 .photo span").replaceWith("<img src=\"images/Blank.png\">");
    $(".sub1 .photo").removeClass("dashed");
    $(".sub1 .stats").html("");
    $(".sub1 .stats").html(dataString);  
    if(buffType !== "") {
      daemons["S1"] = new Daemon(role, type, atk, hp, skillDmg, new Bonds(bond1,bond2,bond3), [], [new Effect(buffType,buffVal, targets, sortOrder)]);
    } else {
      daemons["S1"] = new Daemon(role, type, atk, hp, skillDmg, new Bonds(bond1,bond2,bond3), [], []);
    }
  } else if(position == "Sub 2") {
    $(".sub2 .photo span").replaceWith("<img src=\"images/Blank.png\">");
    $(".sub2 .photo").removeClass("dashed");
    $(".sub2 .stats").html("");
    $(".sub2 .stats").html(dataString);
    if(buffType !== "") {
      daemons["S2"] = new Daemon(role, type, atk, hp, skillDmg, new Bonds(bond1,bond2,bond3), [], [new Effect(buffType,buffVal, targets, sortOrder)]);
    } else {
      daemons["S2"] = new Daemon(role, type, atk, hp, skillDmg, new Bonds(bond1,bond2,bond3), [], []);
    }
  } else if(position == "Sub 3") {
    $(".sub3 .photo span").replaceWith("<img src=\"images/Blank.png\">");
    $(".sub3 .photo").removeClass("dashed");
    $(".sub3 .stats").html("");
    $(".sub3 .stats").html(dataString);  
    if(buffType !== "") {
      daemons["S3"] = new Daemon(role, type, atk, hp, skillDmg, new Bonds(bond1,bond2,bond3), [], [new Effect(buffType,buffVal, targets, sortOrder)]);
    } else {
      daemons["S3"] = new Daemon(role, type, atk, hp, skillDmg, new Bonds(bond1,bond2,bond3), [], []);
    }
  } else {
    $(".helper .photo span").replaceWith("<img src=\"images/Blank.png\">");
    $(".helper .photo").removeClass("dashed");
    $(".helper .stats").html("");
    $(".helper .stats").html(dataString);    
    if(buffType !== "") {
      daemons["H"] = new Daemon(role, type, atk, hp, skillDmg, new Bonds(bond1,bond2,bond3), [], [new Effect(buffType,buffVal, targets, sortOrder)]);
    } else {
      daemons["H"] = new Daemon(role, type, atk, hp, skillDmg, new Bonds(bond1,bond2,bond3), [], []);
    }
  }
  
  $(".modal").modal('hide');
  $('#daemon-form').find('input,select').val('');
});

$("#submit-seq").click(function() {
  event.preventDefault();
  
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
  var seqInput = $("#skill-sequence").val().split(',');
  var origDmg = run_calc(seqInput);

  var result = find_best(uniquePermute(seqInput));
  var resultDmg = run_calc(result);

  var dmgDiff = resultDmg - origDmg;
  var dmgDiffString = (dmgDiff > 0)? "<span style='color:green'>+" + (dmgDiff|0).toString() + "</span>" : "<span style='color:red'>" + (dmgDiff|0).toString() + "</span>";

  $(".result").html("Best Sequence: " + result.join(" ") + " <br>Expected Damage: " + (resultDmg|0) + " (" + dmgDiffString + ")");
})