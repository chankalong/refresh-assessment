var uid =  drupalSettings.user.uid;
if (uid != 0) {
  var imhs_non_login_div = document.getElementById('imhs_non_login');
  var imhs_member_content_parent_div = document.getElementById('imhs_member_content_parent');
  imhs_non_login_div.style.display = 'none';
  imhs_member_content_parent_div.style.display = '';
  var password = prompt("Please enter your password:");
  if (password === "IMHStraining20240423") {
    alert("Password correct!");
  } else {
    alert("Incorrect password. Redirecting to the homepage.");
    window.location.href = "https://refresh.bokss.org.hk/"; // Replace with your homepage URL
  }
}
