var oldColor='#fff';
var productColor=$('#productColor');
function changeColor(){
    var color=$(this).data('color');    //láy màu từ box-color hiện tại
    oldColor=productColor.data('currentcolor');
    //thay đổi màu đổ lên áo
    productColor.css('background-color',color);
    productColor.data('currentcolor',color);
}
function changeColorClick(){
    var color=$(this).data('color');    //láy màu từ box-color hiện tại
    oldColor=color;     //khi hover ra thì vẫn giữ màu này
    //thay đổi màu đổ lên áo
    productColor.css('background-color',color);
}
function undoColor(){
    productColor.css('background-color',oldColor);
    console.log("set background: "+oldColor);
    productColor.data('currentcolor',oldColor);
    console.log("set current color: "+oldColor);
}
$('.color-sample div.box-color').mouseenter(changeColor)
                                .mouseleave(undoColor);
$('.color-sample div.box-color').click(changeColorClick);