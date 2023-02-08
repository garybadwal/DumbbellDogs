const API_URL = "http://0.0.0.0:5000/";

$(document).ready(function () {
    $(".progress").each(function () {

        var value = $(this).attr('data-value');
        var left = $(this).find('.progress-left .progress-bar');
        var right = $(this).find('.progress-right .progress-bar');

        if (value > 0) {
            if (value <= 50) {
                right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
            } else {
                right.css('transform', 'rotate(180deg)')
                left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
            }
        }

    })

    function percentageToDegrees(percentage) {

        return percentage / 100 * 360

    }
    

    $(document).on("click", "a.add-cart", function(){
        product = $(this).parent().parent().children('input#product_id').val()
        $.ajax({
            type: 'POST',
            url: API_URL + 'api/v1/cart/',
            headers: {'X-CSRFToken': csrfmiddlewaretoken},
            dataType: "json",
            data : {
                product: product
            } , 
            statusCode: {
                403: function(responseObject, textStatus, jqXHR) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: responseObject.responseText,
                    })
                },
                200: function(responseObject, textStatus, jqXHR){
                    Swal.fire({
                        icon: 'success',
                        title: 'Done',
                        text: responseObject,
                        showCancelButton: true,  
                        confirmButtonText: `Go To Cart`,  
                        cancelButtonText: `Close`,
                    }).then((result) => {  
                        /* Read more about isConfirmed, isDenied below */  
                        if (result.isConfirmed) {    
                            window.location.replace("http://0.0.0.0:5000/mycart");
                        }
                    });
                }
    
            },
        });
    });


    $.ajax({
        type: 'GET',
        dataType: "json",
        url: API_URL+'api/v1/product/',
        data: {category},
        success: function(data){
            data['data'].forEach(element => {
                $('.searched-category').html(data['category'])
                $(".dynamic-product-row").append(
                    `<div class="col-12 col-lg-4 mb-4">
                        <div class="container rounded-4 shadow card bg-white border-0 py-5 px-3 p-lg-5">
                            <input type="hidden" id="product_id" value="`+element['id']+`">
                            <span
                                class="position-absolute top-0 start-85 translate-middle badge py-5 px-2 text-bg-success fs-6 shadow price-tag">
                                <p>&#8377 `+element['price']+`</p>
                            </span>
                            <div class="row justify-content-center mb-3">
                                <img src="../../static/DumbbellDogs/Images/product_images/`+element['image']+`" alt="Product-Image"
                                    class="w-60">
                            </div>
                            <div class="row text-center">
                                <p class="fw-bold fs-5">`+element['name']+`</p>
                            </div>
                            <div class="row">
                                <p class="text-muted lh-lg text-center">We are digital agency, a small design agency
                                    based in
                                    paris as i was
                                    groping to remove through language.</p>
                            </div>
                            <div class="row justify-content-center gap-3 px-3 px-lg-0">
                                <a
                                    class="btn bg-current text-white shadow-hover border-0 px-3 py-3 rounded-pill fw-bold fs-6 col-12 col-lg-6 add-cart">Buy
                                    Now</a>
                                <a
                                    class="add-cart btn bg-white text-current shadow-hover border-0 px-2 py-3 rounded-pill fw-bold fs-6 col-12 col-lg-6">Add
                                    to cart</a>
                            </div>
                        </div>
                    </div>`
                );
            });
        }
    });
});