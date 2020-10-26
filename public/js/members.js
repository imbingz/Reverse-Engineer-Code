//Send a GET request and render the user email on members.html when the app is loaded 

$(document).ready(() => {
    $.get("/api/user_data").then((data) => {
        $(".member-name").text(data.email);
    });
});
