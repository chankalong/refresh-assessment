let form = document.getElementById("form_big_five");
form.onsubmit = function (e) {
    e.preventDefault();
    fetch(form.action, {
        method: "post", 
        body: new FormData(form)
    });
}
