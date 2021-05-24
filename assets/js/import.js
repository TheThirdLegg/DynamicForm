var ContactPersonCnt = 1;
var TrophySpecCnt = 1;
var PlaqueSpecCnt = 1;
var MedalSpecCnt = 1;
var UIDcnt = 1;
var currentloadedversion = "0.6";

$(function() {
  var lastsavedversion = $(".currentloadedversion").text();

  $('.Qaunity:first').attr("TrophySpecCnt", "1");
  $(".currentloadedversion").text(currentloadedversion);


  // document.getElementById('filename').setAttribute("download", filename);

  /*
    if (lastsavedversion == "Not Saved") {
      loadTitlebar();
    }

    if (lastsavedversion < currentloadedversion) {

      $("#titleouter").empty();
      loadTitlebar();

      alert("Script Updated to version " + currentloadedversion)

    }
  */
document.title = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1)).replace('.html','');

  $("#Organization-Country-input").change(function() {
    if (($('#Organization-Country-input').val()) === "US") {

      document.getElementById('Organization-State-input').setAttribute("list", "Shipping-US-State-list");
      document.getElementById('Organization-State-input').setAttribute("value", "");

    } else if (($('#Organization-Country-input').val()) === "CA") {

      document.getElementById('Organization-State-input').setAttribute("list", "Shipping-CA-State-list");
      document.getElementById('Organization-State-input').setAttribute("value", "");

    } else if (($('#Organization-Country-input').val()) === "MX") {

      document.getElementById('Organization-State-input').setAttribute("list", "Shipping-MX-State-list");
      document.getElementById('Organization-State-input').setAttribute("value", "");

    } else {

      document.getElementById('Organization-State-input').setAttribute("list", "");
      document.getElementById('Organization-State-input').setAttribute("value", "");
    }

  });


  $("#Shipping-Country-input").change(function() {
    if (($('#Shipping-Country-input').val()) === "US") {

      document.getElementById('Shipping-State-input').setAttribute("list", "Shipping-US-State-list");
      document.getElementById('Shipping-State-input').setAttribute("value", "");

    } else if (($('#Shipping-Country-input').val()) === "CA") {

      document.getElementById('Shipping-State-input').setAttribute("list", "Shipping-CA-State-list");
      document.getElementById('Shipping-State-input').setAttribute("value", "");

    } else if (($('#Shipping-Country-input').val()) === "MX") {

      document.getElementById('Shipping-State-input').setAttribute("list", "Shipping-MX-State-list");
      document.getElementById('Shipping-State-input').setAttribute("value", "");

    } else {

      document.getElementById('Shipping-State-input').setAttribute("list", "");
      document.getElementById('Shipping-State-input').setAttribute("value", "");
    }
  });


  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();


});

jQuery(document).keydown(function(event) {
  if ((event.ctrlKey || event.metakey) && event.which == 83) {
    saveForm();
  }

});

/*
function orgname() {
  var filename;
  if (($("#Organization-name-input").val()) !== "undefined") {
    filename = $("#Organization-name-input").val();
    document.title = filename;
  } else if (($("#Organization-name-input").val()) == "undefined") {
    filename = $("#Organization-name-input").val();
    filename = $("#Contact-Person-first-name-input").val();
    document.title = filename;
  }
}
*/

function updateCost() {
  var OrdersubTotalSum = 0.0;
  var trophyTotalGrandSum = 0.0;
  var OrdergrandTotal = 0.0;

  for (var i = 0; i < ContactPersonCnt; i++) {
    var localQuantity = $(".TrophySpecCntAttributeQaunity:eq(" + i + ")").val();
    var localSubPrice = $(".TrophySpecCntAttributeSubTotal:eq(" + i + ")").val();
    var localTotalPrice = ((localQuantity * localSubPrice).toFixed(2));
    $(".TrophySpecCntAttributeGrandTotal:eq(" + i + ")").val(localTotalPrice);
  }

  $('.SubTotal-Sum').each(function() {
    OrdersubTotalSum += parseFloat(this.value);
  });

  $("#Order-Cost-sub-total-input").val(OrdersubTotalSum);
  $("#Order-Cost-tax-input").val(OrdersubTotalSum * .07);

  $('.trophyTotal-Sum').each(function() {
    trophyTotalGrandSum += parseFloat(this.value);
  });

  $("#Order-Cost-trophies-input").val((trophyTotalGrandSum));

  $('.grandtotal-sum').each(function() {
    OrdergrandTotal += parseFloat(this.value);
  });

  $("#Order-Cost-grand-total-input").val((OrdergrandTotal).toFixed(2));
}

function prePrint() {
  $("#titleBar").hide();
  $("#infobar").hide();
  $("#CloneButton").hide();

}

function postPrint() {
  $("#titleBar").show();
  $("#infobar").show();
  $("#CloneButton").show();
}


function saveForm() {

  var elements = document.querySelectorAll('input');

  for (var i = 0, element; element = elements[i++];) {
    element.defaultValue = element.value;
  }

  $(".lastsavedversion").text(currentloadedversion);

  $(".ContactPersonCnt").text(ContactPersonCnt);
  $(".UIDcnt").text(UIDcnt);
}


function CloneInnerContactPerson() {

  UIDcnt++;
  ContactPersonCnt++;
  $(".ContactcloseButton").show();

  $('#ContactPerson').clone().appendTo('#ContactPersonOuter');

  $(".ContactPersonCnt-Display-Title").last().text(ContactPersonCnt);
  $(".ContactPersonCnt-Display-Notes").last().text(ContactPersonCnt);

  $(".ContactPersonCnt").text(ContactPersonCnt);
  $(".UIDcnt").text(UIDcnt);

  $('.ContactcloseButton:last').attr("Qaunity", UIDcnt);
  $('#ContactPerson.row:last').attr("Qaunity", UIDcnt);

  $('.ContactcloseButton:last').attr("onclick", "deleteContactPerson('" + UIDcnt + "')");
}

function CloneInnerTrophySpec() {

  UIDcnt++;
  TrophySpecCnt++;
  $(".TrophycloseButton").show();

  $('#TrophySpec').clone().appendTo('#TrophySpecOuter');

  $(".TrophySpecCnt-Display-Title").last().text(TrophySpecCnt);
  $(".Trophy-Spec-Cnt-Display-Notes").last().text(TrophySpecCnt);

  $(".TrophySpecCnt").text(TrophySpecCnt);
  $(".UIDcnt").text(UIDcnt);

  $('.TrophySpecCntAttributeQaunity:last').attr("Qaunity", UIDcnt);
  $('.TrophySpecCntAttributeSubTotal:last').attr("Qaunity", UIDcnt);
  $('.TrophySpecCntAttributeGrandTotal:last').attr("Qaunity", UIDcnt);

  $('.TrophycloseButton:last').attr("Qaunity", UIDcnt);
  $('#TrophySpec.row:last').attr("Qaunity", UIDcnt);

  $('.TrophycloseButton:last').attr("onclick", "DeleteTrophySpec('" + UIDcnt + "')");
}

function CloneInnerMedalSpec() {

  UIDcnt++;
  MedalSpecCnt++;
  $(".MedalCloseButton").show();

  $('#MedalSpec').clone().appendTo('#MedalSpecOuter');

  $(".MedalSpecCnt-Display-Title").last().text(MedalSpecCnt);
  $(".Medal-Spec-Cnt-Display-Notes").last().text(MedalSpecCnt);

  $(".MedalSpecCnt").text(MedalSpecCnt);
  $(".UIDcnt").text(UIDcnt);

  $('.MedalSpecCntAttributeQaunity:last').attr("Qaunity", UIDcnt);
  $('.MedalSpecCntAttributeSubTotal:last').attr("Qaunity", UIDcnt);
  $('.MedalSpecCntAttributeGrandTotal:last').attr("Qaunity", UIDcnt);

  $('.MedalCloseButton:last').attr("Qaunity", UIDcnt);
  $('#MedalSpec.row:last').attr("Qaunity", UIDcnt);

  $('.MedalCloseButton:last').attr("onclick", "DeleteMedalSpec('" + UIDcnt + "')");
}



function deleteContactPerson(ContactPersonDelete) {
  if (ContactPersonCnt > 1) {
    $('#ContactPerson[Qaunity="' + ContactPersonDelete + '"]').remove();
    ContactPersonCnt--;

    $(".ContactPersonCnt").text(ContactPersonCnt);
    $(".UIDcnt").text(UIDcnt);


    for (var i = 0; i < ContactPersonCnt; i++) {

      var j = i + 1;

      $(".ContactPersonCnt-Display-Title:eq(" + i + ")").text(j);
      $(".ContactPersonCnt-Display-Notes:eq(" + i + ")").text(j);

      $(".ContactPersonCnt").text(ContactPersonCnt);
      $(".UIDcnt").text(UIDcnt);

      if (ContactPersonCnt <= 1) {
        $(".ContactcloseButton").hide();
      }
    }

  }
}

function DeleteTrophySpec(TrophySpecDelete) {
  if (TrophySpecCnt > 1) {
    $('#TrophySpec[Qaunity="' + TrophySpecDelete + '"]').remove();
    TrophySpecCnt--;

    $(".TrophySpecCnt").text(TrophySpecCnt);
    $(".UIDcnt").text(UIDcnt);

    for (var i = 0; i < TrophySpecCnt; i++) {

      var j = i + 1;

      $(".TrophySpecCnt-Display-Title:eq(" + i + ")").text(j);
      $(".Trophy-Spec-Cnt-Display-Notes:eq(" + i + ")").text(j);

      $(".TrophySpecCnt").text(TrophySpecCnt);
      $(".UIDcnt").text(UIDcnt);

      if (TrophySpecCnt <= 1) {
        $(".TrophycloseButton").hide();
      }
    }

  }
}

function DeleteMedalSpec(MedalSpecDelete) {
  if (MedalSpecCnt > 1) {
    $('#MedalSpec[Qaunity="' + MedalSpecDelete + '"]').remove();
    MedalSpecCnt--;

    $(".MedalSpecCnt").text(MedalSpecCnt);
    $(".UIDcnt").text(UIDcnt);

    for (var i = 0; i < MedalSpecCnt; i++) {

      var j = i + 1;

      $(".MedalSpecCnt-Display-Title:eq(" + i + ")").text(j);
      $(".Medal-Spec-Cnt-Display-Notes:eq(" + i + ")").text(j);

      $(".MedalSpecCnt").text(MedalSpecCnt);
      $(".UIDcnt").text(UIDcnt);

      if (MedalSpecCnt <= 1) {
        $(".MedalCloseButton").hide();
      }
    }

  }
}

function open_tab(evt, tab_Name) {
  var i, tab_content, tab_links;
  tab_content = document.getElementsByClassName("tab_content");
  for (i = 0; i < tab_content.length; i++) {
    tab_content[i].style.display = "none";
  }
  tab_links = document.getElementsByClassName("tab_links");
  for (i = 0; i < tab_links.length; i++) {
    tab_links[i].className = tab_links[i].class_Name.replace(" active", "");
  }
  document.getElementById(city_Name).style.display = "block";
  evt.currentTarget.className += " active";
}
