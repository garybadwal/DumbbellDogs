function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function isPassword(password) {
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regex.test(password)
}

$(document).ready(function () {
    $(".continue").click(function () {
        parent_wrapper = $(this).parent().parent()
        username = parent_wrapper.children(".form-floating").find('#floatingInputusername');
        email = parent_wrapper.children(".form-floating").find('#floatingInputemail');
        fname = parent_wrapper.children(".form-floating").find('#floatingInputfname');
        lname = parent_wrapper.children(".form-floating").find('#floatingInputlname');
        password1 = parent_wrapper.children(".form-floating").find('#floatingPassword');
        password2 = parent_wrapper.children(".form-floating").find('#floatingPassword2');
        var_html = '';
        message = [];
        //email validation
        if (email.length != 0 && username.length != 0) {
            if (email.val() == "" || username.val == '') {
                message.push('Email should not be empty');
                message.push('username should not be empty');
            } else {
                if (!isEmail(email.val())) {
                    message.push('Please enter a valid email');
                }
            }
        }

        //password validation
        if (password1.length != 0 && password2.length != 0) {
            if (password1.val() == "" || password2.val() == "") {
                message.push('password should not be empty');
                message.push('confirm password should not be empty');
            } else {
                if (!isPassword(password1.val())) {
                    message.push('Password Must Contain');
                    message.push('a capital letter(`A`)');
                    message.push('a small letter(`a`)');
                    message.push('a digit(1)');
                    message.push('a special character(!,@,#,$,%,^,&,*)');
                    message.push('a length of 6-16 characters');
                } else {
                    if (password2.val() != password1.val()) {
                        message.push(`password doesn't matched`);
                    }
                }
            }
        }

        //name validation
        if (fname.length != 0 && lname.length != 0) {
            if (fname.val() == "" || lname.val() == "") {
                message.push('First name should not be empty');
                message.push('Last Name should not be empty');
            }
        }

        if (message.length != 0) {
            message.forEach(element => {
                var_html = var_html + `
                    <li>`+ element + `</li>
                `;
            });
            parent_wrapper.children('.error-message').html('<ul>' + var_html + '</ul>');
            parent_wrapper.children('.error-message').removeClass("d-none")
            parent_wrapper.children('.error-message').addClass("d-block")
        } else {
            if (parent_wrapper.children('.error-message').hasClass("d-block")) {
                parent_wrapper.children('.error-message').removeClass("d-block")
                parent_wrapper.children('.error-message').addClass("d-none")
            }
            $(this).parents(".form-box").removeClass("active");
            $(this).parents(".form-box").next().addClass("active");
        }
    });
    $(".back").click(function () {
        $(this).parents(".form-box").removeClass("active");
        $(this).parents(".form-box").prev().addClass("active");
    });
});

$(document).on('submit', '#userForm', function(event) {
    event.preventDefault();
    $.ajaxSettings.traditional = true;
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5000/api/v1/user/',
        dataType: 'json',
        data: $("#userForm").serialize(),
        statusCode: {
            226: function(responseObject, textStatus, jqXHR) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: responseObject,
                })
            },
            201: function(responseObject, textStatus, jqXHR){
                Swal.fire({
                    icon: 'success',
                    title: 'Done',
                    text: responseObject,
                }).then(function(){
                    window.location.replace("http://0.0.0.0:5000/");
                });
            }

        },
    });
})