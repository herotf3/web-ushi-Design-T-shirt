$("#price-filter").slider({
    tooltip: 'always'
});

$("#price-filter").slider();
$("#price-filter").on("slide", function(slideEvt) {
    var range=slideEvt.value;    
    $("#price-range span:first-child").text(range[0]+"đ");
    $("#price-range span:last-child").text(range[1]+"đ");
    console.log(range);
    filterPrice(range[0],range[1]);
});
$("#price-filter").on("click", function(slideEvt) {
    var range=slideEvt.value;    
    $("#price-range span:first-child").text(range[0]+"đ");
    $("#price-range span:last-child").text(range[1]+"đ");
    console.log(range);
    filterPrice(range[0],range[1]);
});


function filterPrice(minPrice, maxPrice) {
    $(".items div.item").hide().filter(function () {
        var price = parseInt($(this).data("price"), 10);
        return price >= minPrice && price <= maxPrice;
    }).show();
}