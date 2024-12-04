var counselling_apply_button = document.getElementById('counselling_apply_button')
var original_link = counselling_apply_button.href

if (window.location.pathname.includes('consultation')) {
  var queryString = window.location.search;
} else if (window.location.pathname.includes('workshop-contact-later')) {
  var queryString = '?referral_utm=' + document.referrer
} else {console.log('error')}
var replace_link = original_link.concat(queryString)
counselling_apply_button.href = replace_link
