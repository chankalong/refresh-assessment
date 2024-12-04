  var queryString = window.location.search;
  //var lms_course = new URLSearchParams(queryString).get('lms_course');
  //var utm_campaign = new URLSearchParams(queryString).get('utm_campaign');
  //if (lms_course == null) {
  //  var referral_var = utm_campaign} else {
  //    var referral_var = lms_course}  

var validator = new JustValidate("#counselling_form", {
  tooltip: {
    position: "bottom",
  },
  validateBeforeSubmitting: true,
});

validator
  .addField("#form_name", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#form_telephone", [
    {
      rule: "required",
      errorMessage: "必填",
    },
    {
      rule: "customRegexp",
      value: /^[0-9]{8}$/,
      errorMessage: "8位數字",
    },
  ])
  .addField("#form_email", [
    {
      rule: "required",
      errorMessage: "必填",
    },
    {
      rule: "customRegexp",
      value: /^[0-9]{8}$/, //need to change the regex for email
      errorMessage: "8位數字",
    },
  ])
  .addField("#form_time_select", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#form_carer_select", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#form_carer_type_select", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#form_iccmw_select", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#form_reason", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#form_first_time_select", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#form_subscribe_select", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#form_source_select", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_1", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_2", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_3", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_4", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_5", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_6", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_7", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_8", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_9", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_10", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_11", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_12", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_13", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_14", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_15", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_16", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_17", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_18", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_19", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_20", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#dass_21", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#isi_1", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#isi_2", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#form_consent", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ]);

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
var referral_textbox = document.getElementById("referrer_page");
var uid_textbox = document.getElementById("uid");
var member_level_textbox = document.getElementById("member_level");
var eap_company_textbox = document.getElementById("eap_company");

if (uid_textbox.value) {
  console.log("input uid value already");
} else {
  uid_textbox.value = Math.random();
}
if (drupalSettings.user.levels === undefined) {
  member_level_textbox.value = 0;
} else {
  member_level_textbox.value = drupalSettings.user.levels[0];
}
if (drupalSettings.user.eap === undefined) {
  eap_company_textbox.value = "0";
} else {
  eap_company_textbox.value = drupalSettings.user.eap.label;
}

referral_textbox.value = queryString;
if (drupalSettings.user.uid > 0) {
  if (localStorage.getItem("member_id") != drupalSettings.user.member_id) {
    var token;
    fetch("https://refresh.bokss.org.hk/jwt/token")
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        return (token = res.token);
      });
    //var member_no_bokss;
    setTimeout(function () {
      fetch("https://refresh.bokss.org.hk/sys/member/api/v1/profile", {
        method: "get",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (res) {
          //return member_no_bokss = res.member_no;
          //return localStorage.setItem('system_id', res.member_no);
          localStorage.setItem("system_id", res.member_no);
          localStorage.setItem("member_id", drupalSettings.user.member_id);
          system_id_textbox.value = localStorage.getItem("system_id");
        });
      //localStorage.setItem('member_id', member_no_bokss);
    }, 2000);
  } else {
    system_id_textbox.value = localStorage.getItem("system_id");
  }
}
if (drupalSettings.user.uid == 0) {
  localStorage.removeItem("system_id");
  localStorage.removeItem("member_id");
}

member_id_textbox.value = drupalSettings.user.member_id;
var form = document.getElementById("counselling_form");
var form_time_select = document.getElementById("form_time_select");
form_time_select.addEventListener("change", function (e) {
  if (form_time_select.selectedOptions[0].innerText == "其他") {
    document.getElementById("form_time_other_wrapper").style.display = "";
    validator.addField("#form_time_other", [
      {
        rule: "required",
        errorMessage: "必填",
      },
    ]);
    validator.revalidate();
  } else {
    document.getElementById("form_time_other_wrapper").style.display = "none";
    validator.removeField("#form_time_other");
    validator.revalidate();
  }
});

var form_carer_type_select = document.getElementById("form_carer_type_select");
form_carer_type_select.addEventListener("change", function (e) {
  if (form_carer_type_select.selectedOptions[0].innerText == "其他") {
    document.getElementById("form_carer_type_other_wrapper").style.display = "";
    validator.addField("#form_carer_type_other", [
      {
        rule: "required",
        errorMessage: "必填",
      },
    ]);
    validator.revalidate();
  } else {
    document.getElementById("form_carer_type_other_wrapper").style.display = "none";
    validator.removeField("#form_carer_type_other");
    validator.revalidate();
  }
});

var form_source_select = document.getElementById("form_source_select");
form_source_select.addEventListener("change", function (e) {
  if (form_source_select.selectedOptions[0].innerText == "其他") {
    document.getElementById("form_source_other_wrapper").style.display = "";
    validator.addField("#form_source_other", [
      {
        rule: "required",
        errorMessage: "必填",
      },
    ]);
    validator.revalidate();
  } else {
    document.getElementById("form_source_other_wrapper").style.display = "none";
    validator.removeField("#form_source_other");
    validator.revalidate();
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var data = new FormData(form);
  if (
    !data.has("form_name") |
    !data.has("form_telephone") |
    !data.has("form_consent") |
    !validator.isValid
  ) {
    return;
  }
  var action = e.target.action;
  fetch(action, {
    method: "POST",
    body: data,
  });
  document.getElementById("counselling_div").style.display = "none";
  document.getElementById("counselling_submit").style.display = "";
  e.preventDefault();
  return false;
});
