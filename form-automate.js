var form = document.getElementById("form_big_five");
form.onsubmit = function (e) {
    
    fetch(form.action, {
        method: "post", 
        body: new FormData(form)
    });
    e.preventDefault();
}
