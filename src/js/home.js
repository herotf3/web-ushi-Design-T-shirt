var shirtList=[
    {
        name:'dead',
        src:'../img/shirt/dead.jpg',
        color:['../img/shirt/dead.jpg','../img/shirt/dead1.jpg','../img/shirt/dead2.jpg'],
        colorBack:['../img/shirt/dead_behind.jpg','../img/shirt/dead1_behind.jpg','../img/shirt/dead2_behind.jpg'],
        price:'200000'
    }
];
// Instantiate the Bootstrap carousel
$('.multi-item-carousel').carousel({
    interval: false
});

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
$('.multi-item-carousel .item').each(function () {
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    if (next.next().length > 0) {
        next.next().children(':first-child').clone().appendTo($(this));
    } else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
});
//color selector
$('.product-color-item').click(function(){    
    $('.product-color-item').removeClass('product-color-item-active');
    $(this).addClass('product-color-item-active');
    var shirtId=parseInt($(this).parent().data('shirtid'));
    var colorId=parseInt($(this).data('color'));
    var colors=shirtList[shirtId]["color"];   //ds cac hinh anh tuong ung voi chỉ số màu
    var url=colors[colorId ];
    //dom hinh chinh
    var main=$("#main-img");
    var behind=$("#behind");
    main.removeClass('shirt-7');
    main.css("background-image",'url('+url+')');
    //behind
    behind.removeClass('shirt-7');
    colors=shirtList[shirtId]["colorBack"];   //ds cac hinh anh mat sau tuong ung voi chỉ số màu
    url=colors[colorId];                        //duong dan mat sau voi mau tuong ung
    behind.css("background-image",'url('+url+')')
});
// Nav change color after click