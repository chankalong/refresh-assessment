  var queryString = window.location.search;
  //var lms_course = new URLSearchParams(queryString).get('lms_course');
  //var utm_campaign = new URLSearchParams(queryString).get('utm_campaign');
  //if (lms_course == null) {
  //  var referral_var = utm_campaign} else {
  //    var referral_var = lms_course}  

var validator = new JustValidate("#eap_demo_form", {
  tooltip: {
    position: "bottom",
  },
  //validateBeforeSubmitting: true,
  //submitFormAutomatically: true,
});

validator
  .addField("#form_company_name", [
    {
      rule: "required",
      errorMessage: "必填",
    },
  ])
  .addField("#form_contact_name", [
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
      rule: "email",
      //value: /^[\S]+@([\S]+\.)+[\S]+[^\.]$/, //need to change the regex for email
      errorMessage: "電郵",
    },
  ])
  .addField("#form_company_location", [
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

var complete_time_textbox = document.getElementById("complete_time");

Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};

var d = new Date();
var dformat =
  [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join(
    "-"
  ) +
  " " +
  [
    d.getHours().padLeft(),
    d.getMinutes().padLeft(),
    d.getSeconds().padLeft(),
  ].join(":");

complete_time_textbox.value = dformat;

var form = document.getElementById("eap_demo_form");
var form_company_nature = document.getElementById("form_company_nature");
form_company_nature.addEventListener("change", function (e) {
  if (form_company_nature.selectedOptions[0].innerText == "其他") {
    document.getElementById("form_company_nature_other_wrapper").style.display = "";
    validator.addField("#form_company_nature_other", [
      {
        rule: "required",
        errorMessage: "必填",
      },
    ]);
    //validator.revalidate();
  } else {
    document.getElementById("form_company_nature_other_wrapper").style.display = "none";
    validator.removeField("#form_company_nature_other");
    //validator.revalidate();
  }
});

var form_source_refresh = document.getElementById("form_source_refresh");
form_source_refresh.addEventListener("change", function (e) {
  if (form_source_refresh.checked) {
    document.getElementById("form_source_other_wrapper").style.display = "";
    validator.addField("#form_source_other_detail", [
      {
        rule: "required",
        errorMessage: "必填",
      },
    ]);
    //validator.revalidate();
  } else {
    document.getElementById("form_source_other_wrapper").style.display = "none";
    validator.removeField("#form_source_other_detail");
    //validator.revalidate();
  }
});


form.addEventListener("submit", function (e) {
  e.preventDefault();

  validator.revalidate().then((isValid) => {
    if (isValid) {
      var data = new FormData(form);
      var action = e.target.action;
      fetch(action, {
        method: "POST",
        body: data,
      });
      document.getElementById("counselling_div").style.display = "none";
      document.getElementById("counselling_submit").style.display = "";
      console.log("Submit Form.");
      e.preventDefault();
      return false;

      // Do something with the form data
    } else {
      console.log("Form is not valid.");
    }
  });
  e.preventDefault();
  return false;
});
