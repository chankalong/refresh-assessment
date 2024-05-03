var workshop_link_textbox = document.getElementById("workshop_link");
var member_id_textbox = document.getElementById("member_id");
var form_apply_workshop_member_id = document.getElementById(
  "form_apply_workshop_member_id"
);



form_apply_workshop_member_id.addEventListener("submit", function (e) {
  workshop_link_textbox = document.referrer.replace(
  "https://refresh.bokss.org.hk",
  "");
  member_id_textbox = drupalSettings.user.member_id;
  var data = new FormData(form_apply_workshop_member_id);
  var action = e.target.action;
  fetch(action, {
    method: "POST",
    body: data,
  });
  e.preventDefault();
});

document.querySelector("input[value=提交工作坊資料]").click();
