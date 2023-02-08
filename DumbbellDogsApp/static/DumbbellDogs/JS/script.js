const API_URL = "http://0.0.0.0:5000/";
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

$(document).ready(function () {

    arivals = $('.new-arrivals').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            800: {
                items: 2,
            },
            1200: {
                items: 3,
            }
        }
    });

    $.ajax({
        type: 'GET',
        dataType: "json",
        url: API_URL + 'api/v1/category/',
        success: function (data) {
            data['category'].forEach(element => {
                $(".dynamic-shop").append(
                    `<div class="col-12 col-lg-3 rounded-4 border-0 dynamic-card p-5">
                        <div class="row justify-content-center mb-3">
                            <div class="cirlce mb-3">
                                <i class="fa-thin fa-'+ element["image"] + 'bg-current text-white h-auto p-4 fs-2"></i>
                            </div>
                        </div>
                        <div class="row text-center">
                            <a href="products_page\?category=`+ element["id"] + `" class="text-decoration-none text-current fw-bold fs-5">` + element["name"] + `</a>
                        </div>
                        <div class="row">
                            <p class="text-muted lh-lg text-center">We are digital agency, a small design agency
                                based in
                                paris as i was
                                groping to remove through language.</p>
                        </div>
                    </div>`
                );
            })
            data['prodcuts'].forEach(element => {
                arivals.trigger('add.owl.carousel', [jQuery(
                    `<div class="owl-items text-center">
                        <div class="container rounded-4 shadow card bg-white border-0 py-5 px-3 p-lg-5">
                            <input type="hidden" id="product_id" value="`+element['id']+`">
                            <span
                                class="position-absolute top-0 start-85 translate-middle badge py-5 px-2 text-bg-success fs-6 shadow-lg price-tag">
                                <p>&#8377 `+ element['price'] + `</p>
                            </span>
                            <div class="row justify-content-center mb-3">
                                <img src="../../static/DumbbellDogs/Images/product_images/`+ element['image'] + `" alt="Product-Image"
                                    class="w-60">
                            </div>
                            <div class="row text-center mb-2" style="height: 90px;overflow: hidden;">
                                <p class="fw-bold fs-5">`+ element['name'] + `</p>
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
                                    class="btn bg-white text-current shadow-hover border-0 px-2 py-3 rounded-pill fw-bold fs-6 col-12 col-lg-6 add-cart">Add
                                    to cart</a>
                            </div>
                        </div>
                    </div>`
                )]);
                arivals.trigger('refresh.owl.carousel');
            });
        }
    });

    $('.certified').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            800: {
                items: 3,
            },
            1200: {
                items: 5,
            }
        }
    });
    $('.brands').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            800: {
                items: 2,
            },
            1200: {
                items: 3,
            }
        }
    });
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
});