var workshop_link_textbox = document.getElementById("workshop_link");
var member_id_workshop_textbox = document.getElementById("member_id_workshop");
var form_apply_workshop_member_id = document.getElementById(
  "form_apply_workshop_member_id"
);

workshop_link_textbox.value = document.referrer.replace("https://refresh.bokss.org.hk", "").replace("?utm_source=Refresh", "");
member_id_workshop_textbox.value = drupalSettings.user.member_id;

form_apply_workshop_member_id.addEventListener("submit", function (e) {
  var data = new FormData(form_apply_workshop_member_id);
  var action = e.target.action;
  fetch(action, {
    method: "POST",
    body: data,
  });
  e.preventDefault();
});
document.querySelector("input[value=提交工作坊資料]").click();
