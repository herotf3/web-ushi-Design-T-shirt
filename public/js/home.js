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
//on select type of shirt
$('#shirtSelector').change(function(){
    var shirtId=this.value;
    console.log(shirtId);
    //show only color container of selected shirt
    $('.product-color-container').removeClass('active');
    var selectedColorContainer=$('.product-color-container.shirtId-'+shirtId);
    selectedColorContainer.addClass('active');
    $(selectedColorContainer).find('li:first-child').click();
});

//color selector
$('.product-color-item').click(function(){    
    //change border effect
    $('.product-color-item').removeClass('product-color-item-active');
    $(this).addClass('product-color-item-active');    
    //show only main-picture with colorId and shirtId
    var colorId=$(this).data('color');
    var shirtId=$(this).data('shirtid');
    console.log('pick color-shirt:',colorId,shirtId);
    $('.img-stack').removeClass('show');
    $('#shirt-'+shirtId+'_color-'+colorId).addClass('show');
});
// Nav change color after click