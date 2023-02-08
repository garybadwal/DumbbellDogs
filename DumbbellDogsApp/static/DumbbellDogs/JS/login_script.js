$(document).on('submit', '#loginform', function(event) {
    event.preventDefault();
    $.ajaxSettings.traditional = true;
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5000/api/v1/user/login/',
        dataType: 'json',
        data: $("#loginform").serialize(),
        statusCode: {
            401: function(responseObject, textStatus, jqXHR) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... Something went wrong!',
                    text: responseObject.responseText,
                });
            },
            200: function(responseObject, textStatus, jqXHR){
                window.location.replace("http://0.0.0.0:5000/"+responseObject)
            }
        },
    });
})