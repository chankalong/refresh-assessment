var system_id_textbox = document.getElementById("system_id");
  var member_id_textbox = document.getElementById("member_id");
  var uid_textbox = document.getElementById("uid");
  var member_level_textbox = document.getElementById("member_level");
  var eap_company_textbox = document.getElementById("eap_company");
var referral_textbox = document.getElementById("referrer_page");

  member_id_textbox.value = drupalSettings.user.member_id;
  system_id_textbox.value = drupalSettings.bokss.user_uuid;
  if (uid_textbox.value) {console.log("input uid value already")} else {uid_textbox.value = Math.random();}
  if (drupalSettings.user.levels === undefined) {member_level_textbox.value = 0} else {member_level_textbox.value = drupalSettings.user.levels[0]}
  if (drupalSettings.user.eap === undefined) {eap_company_textbox.value = '0'} else {eap_company_textbox.value = drupalSettings.user.eap.label}
referral_textbox.value = document.referrer;
  
var form = document.getElementById("counselling_form");
form.onsubmit = function (e) {
    
    fetch(form.action, {
        method: "post", 
        body: new FormData(form)
    });
    e.preventDefault();
}
