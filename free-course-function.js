    document.getElementById("applyButtonSport").addEventListener("click", function(event) {
        if (drupalSettings.user.uid == 0) {
            const currentPath = window.location.href; // Get the current URL
            // Redirect to the login page with the current path as a query parameter
            window.location.href = `https://refresh.bokss.org.hk/login-protected?kh_destination=${currentPath}`;
            event.preventDefault(); // Prevent form submission
        }
    });
