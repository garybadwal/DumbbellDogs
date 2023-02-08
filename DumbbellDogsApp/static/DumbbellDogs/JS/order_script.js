const API_URL = "http://0.0.0.0:5000/";
var order_total = 0;
var total_price = 54;
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: API_URL + 'api/v1/order/',
        success: function (data) {
            order_id = 0
            data['order'].forEach(elemet => {
                // if(order_id != elemet[0]){
                //     order_id = elemet[0];
                $(".myorder-lg").children("tbody").append(`
                    <tr>
                        <td class="py-5"></td>
                        <td class="py-5"></td>
                        <td class="py-5"></td>
                        <td class="py-5"></td>
                        <td class="py-5"></td>
                    </tr>
                    <tr class="shadow-hover">
                        <td class="py-3 text-center w-50">
                            <div class="row gap-5">
                                <div class="col-3 d-flex">
                                    <img src="/static/DumbbellDogs/Images/product_images/`+ elemet[0] + `"
                                        alt="" style="height: 150px;">
                                </div>
                                <div class="col-7 d-flex align-content-center flex-wrap">
                                    <div class="row">
                                        <h2 class="fs-6">`+ elemet[1] + `</h2>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="w-25"><input type="text" readonly class="form-control-plaintext border-0 text-center fs-5 fw-bold py-4" name=product_price value="` + elemet[2] + `"></td>
                        <td class="py-3"><span class="badge text-bg-warning">Shipped</span></td>
                        <td class="py-4 fs-5 fw-bold text-center ms-2">`+ elemet[3] + `</td>
                        <td class="py-3 text-center">`+ elemet[4] + `</td>
                    </tr>
                `);
            });
        },
    });
});