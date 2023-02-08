const API_URL = "http://0.0.0.0:5000/";
var order_total = 0;
var total_price = 54;
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: API_URL + 'api/v1/cart/',
        success: function (data) {
            data['products'].forEach(element => {
                $(".mycart-lg").children("tbody").append(`
                <tr class="spacer">
                    <td class="py-3 text-center"></td>
                    <td class="w-50"></td>
                    <td class="py-3"></td>
                    <td class="py-4 fs-5 fw-bold text-center ms-2"></td>
                    <td class="py-3 text-center"></td>
                </tr>
                <tr>
                    <td class="py-3 text-center">
                        <div class="form-check">
                            <input class="form-check-input bg-current" type="checkbox" value="`+ element['id'] + `" id="product_` + element['id'] + `" checked>
                        </div>
                    </td>
                    <td class="w-50">
                        <div class="row gap-5">
                            <div class="col-3 d-flex">
                                <img src="/static/DumbbellDogs/Images/product_images/`+ element['image'] + `"
                                    alt="" style="height: 150px;">
                            </div>
                            <div class="col-7 d-flex align-content-center flex-wrap">
                                <div class="row">
                                    <h2 class="fs-6">`+ element['name'] + `</h2>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="py-3">
                        <!-- <div class="row">
                            <ul class="list-unstyled list-inline">
                                <li class="list-inline-item"><a class="btn bg-white border-0"><i
                                            class="bi bi-plus fw-bold fs-4"></i></a></li>
                                <li class="list-inline-item"> -->
                                    <p class="bg-light p-2 text-center fs-6"> 1 </p>
                                <!-- </li>
                                <li class="list-inline-item"><a class="btn bg-white border-0"><i
                                            class="bi bi-dash fs-4 fw-bold"></i></a></li>
                            </ul>
                        </div> -->
                    </td>
                    <td class="ms-2 px-3"><input type="text" readonly class="form-control-plaintext border-0 text-center fs-5 fw-bold py-4" name=product_price id="product_`+ element['id'] + `_price" value="` + element['price'] + `"></td>
                    <td class="py-3 text-center">
                        <input type="hidden" id="product_id" value="`+ element['id'] + `">
                        <a class="ms-2 btn bg-light text-current border-0"><i
                                class="bi bi-trash fs-6 remove-product"></i></a>
                    </td>
                </tr>`);
                $('.mycart-sm').append(`
                <div class="row mb-5 justify-content-center">
                    <input type="hidden" id="product_id" value="`+ element['id'] + `">
                    <div class="row mb-2 justify-content-center">
                        <img src="/static/DumbbellDogs/Images/product_images/`+ element['image'] + `" alt=""
                            style="width: 150px;">
                    </div>
                    <div class="row mb-2 justify-content-center">
                        <h2 class="fs-6">`+ element['name'] + `</h2>
                    </div>
                    <div class="row mb-2 justify-content-center">
                        <h4 class="fs-6">&#8377 `+ element['price'] + `</h4>
                    </div>
                    <div class="row mb-2 justify-content-center">
                        <div class="col-12 py-2">
                            <div class="row">
                                <!-- <div class="row">
                                <ul class="list-unstyled list-inline">
                                    <li class="list-inline-item"><a class="btn bg-white border-0"><i
                                                class="bi bi-plus fw-bold fs-4"></i></a></li>
                                    <li class="list-inline-item"> -->
                                        <p class="bg-light p-2 text-center fs-6"> 1 </p>
                                    <!-- </li>
                                    <li class="list-inline-item"><a class="btn bg-white border-0"><i
                                                class="bi bi-dash fs-4 fw-bold"></i></a></li>
                                </ul>
                            </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2 justify-content-center">
                        <button
                            class="text-white bg-current border-0 shadow-hover rounded-3 px-4 py-2 fw-bold remove-product">Remove</button>
                    </div>
                </div>`
                );
            });
        },
        complete: function (data) {
            $('input[name="product_price"]').map(function () { return $(this).val(); }).get().forEach(e => { order_total += parseFloat(e.replace(/[^0-9.-]+/g, "")) });
            $('.order-total').html(new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'INR',
            }).format(order_total));
            if (order_total != 0) {
                $('.total-price').html(new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: 'INR',
                }).format(order_total + 54));
            } else {
                $('.total-price').html(new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: 'INR',
                }).format(0));
            }
        }
    });

    $.ajax({
        type: 'GET',
        dataType: "json",
        url: API_URL + 'api/v1/user/address/',
        success: function (data) {
            data.forEach(element => {
                if (element['address_type'] == "Home") {
                    $(".dynamic-address-row").append(`
                        <div class="col-lg-4 col-12">
                            <div class="address-card shadow-hover d-flex gap-3 p-2 px-lg-5 py-lg-5">
                                <i class="bi bi-house fw-bolder text-current fs-4"></i>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="address" id="address-id`+ element['id'] + `" value="` + element['id'] + `">
                                    <label class="form-check-label" for="address-id`+ element['id'] + `">
                                        <h6 class="fs-4">`+ element['address_type'] + `</h6><br>
                                        `+ element['street_address'] + `<br>
                                        `+ element['city'] + `<br>
                                        `+ element['state'] + `<br>
                                        `+ element['postal_code'] + `
                                    </label>
                                </div>
                            </div>
                        </div>
                    `);
                } else {
                    $(".dynamic-address-row").append(`
                        <div class="col-lg-4 col-12">
                            <div class="address-card shadow-hover d-flex gap-3 p-2 px-lg-5 py-lg-5">
                                <i class="bi bi-building fw-bolder text-current fs-4"></i>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="address" id="address-id`+ element['id'] + `" value="` + element['id'] + `">
                                    <label class="form-check-label" for="address-id`+ element['id'] + `">
                                        <h6 class="fs-4">`+ element['address_type'] + `</h6><br>
                                        `+ element['street_address'] + `<br>
                                        `+ element['city'] + `<br>
                                        `+ element['state'] + `<br>
                                        `+ element['postal_code'] + `
                                    </label>
                                </div>
                            </div>
                        </div>
                    `);
                }
            });
        },
    });

    $(document).on("change", 'input[type="checkbox"]', function () {
        if (this.checked) {
            order_total += parseFloat($(this).parents('tr').children('td').children('input[name="product_price"]').val().replace(/[^0-9.-]+/g, ""));
            $('.order-total').html(new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'INR',
            }).format(order_total));
            if (order_total != 0) {
                $('.total-price').html(new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: 'INR',
                }).format(order_total + 54));
            } else {
                $('.total-price').html(new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: 'INR',
                }).format(0));
            }
        } else {
            order_total -= parseFloat($(this).parents('tr').children('td').children('input[name="product_price"]').val().replace(/[^0-9.-]+/g, ""));
            $('.order-total').html(new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'INR',
            }).format(order_total));
            if (order_total != 0) {
                $('.total-price').html(new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: 'INR',
                }).format(order_total + 54));
            } else {
                $('.total-price').html(new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: 'INR',
                }).format(0));
            }
        }
    });

    $(document).on("click", ".remove-product", function () {
        product = $(this).parent().parent().children('input#product_id').val()
        $.ajax({
            type: 'DELETE',
            url: API_URL + 'api/v1/cart/',
            headers: { 'X-CSRFToken': csrfmiddlewaretoken },
            dataType: "json",
            data: {
                product: product
            },
            statusCode: {
                403: function (responseObject, textStatus, jqXHR) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: responseObject,
                    })
                },
                200: function (responseObject, textStatus, jqXHR) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Done',
                        text: responseObject,
                    }).then((result) => {
                        location.reload();
                    });
                }

            },
        });
    });

    $('.next').click(function () {
        moved = 0
        if ($(this).parents(".checkout-step").find("input[type=checkbox]").length != 0 && moved == 0) {
            if ($(this).parents(".checkout-step").find("input[type=checkbox]:checked").length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Please select one Item to proceed",
                })
            } else {
                moved += 1
                $(this).parents(".checkout-step").removeClass("active");
                $(this).parents(".checkout-step").next().addClass("active");

            }
        }
        if ($(this).parents(".checkout-step").find("input[type=radio]").length != 0 && $(this).parents(".checkout-step").prev().find("input[type=checkbox]:checked").length > 0) {
            if ($(this).parents(".checkout-step").find("input[type=radio]:checked").length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Please select one option to proceed",
                })
            } else {
                $(this).parents(".checkout-step").removeClass("active");
                $(this).parents(".checkout-step").next().addClass("active");
            }
        } else {
            if (moved == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Please select one Item to proceed",
                })
            }
        }
    });
    $('.back').click(function () {
        $(this).parents(".checkout-step").removeClass("active")
        $(this).parents(".checkout-step").prev().addClass("active")
    });

    $(".submit").click(function () {
        if ($("input[name='address']:checked").length && $("input[name='paymentRadio']:checked").length && $("input[type='checkbox']:checked").length > 0) {
            products = $("input[type='checkbox']:checked").map(function () { return $(this).val(); }).get();
            address = $("input[name='address']:checked").val();
            payment_mode = $("input[name='paymentRadio']:checked").val();
            $.ajax({
                type: 'POST',
                url: API_URL + 'api/v1/order/',
                headers: { 'X-CSRFToken': csrfmiddlewaretoken },
                dataType: "json",
                data: {
                    'products': products,
                    'address': address,
                    'payment_mode': payment_mode
                },
                statusCode: {
                    403: function (responseObject, textStatus, jqXHR) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: responseObject,
                        })
                    },
                    200: function (responseObject, textStatus, jqXHR) {
                        debugger
                        Swal.fire({
                            icon: 'success',
                            title: 'Done',
                            text: responseObject,
                            showCancelButton: true,
                            confirmButtonText: `Go To Orders`,
                            cancelButtonText: `Close`,
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                window.location.replace("http://0.0.0.0:5000/myorders");
                            }
                        });
                    }
                },
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please Select Product, Address and Payment method",
            })
        }
    });
});