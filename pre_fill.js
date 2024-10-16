  var queryString = window.location.search;
  var lms_course = new URLSearchParams(queryString).get('lms_course');
  var utm_campaign = new URLSearchParams(queryString).get('utm_campaign');
  if (lms_course == null) {
    var lms_course_final = utm_campaign} else {
      var lms_course_final = lms_course}
  
  var original_link = document.getElementsByClassName('btnRound btnRound-orange')[0].href
  var replace_link = original_link.concat('&rfd50524b489f47bfabcf2f8a6e371ab9=', lms_course_final)
  document.getElementsByClassName('btnRound btnRound-orange')[0].href = replace_link