
// getting DOM elements :
const redbtn = document.getElementById("red");
const bluebtn = document.getElementById("blue");
const greenbtn = document.getElementById("green");
const yellowbtn = document.getElementById("yellow");


// getting Canvas
const canvas = document.getElementById("main_board");
const context = canvas.getContext("2d");

canvas.height = 580;
canvas.width = window.innerWidth;


// Variables
let draw_color = "black";
let draw_width = 5;
let is_drawing = false;
let draw_img = [];
let index = -1;


// drawing event listners
canvas.addEventListener('mousedown' , start);
canvas.addEventListener('mouseup' , finish);
canvas.addEventListener('mousemove' , draw);



// color picker listners
redbtn.addEventListener('click',() => {
    draw_color = "red";
});
greenbtn.addEventListener('click',() => {
    draw_color = "green";
});
yellowbtn.addEventListener('click',() => {
    draw_color = "yellow";
});
bluebtn.addEventListener('click',() => {
    draw_color = "blue";
});


// functions defined
function start(){
    context.beginPath();
    is_drawing = true;
}

function finish() {
    context.closePath();
    is_drawing = false;
    draw_img.push(context.getImageData(0,0,canvas.width,canvas.height));
    index++;
    console.log(draw_img);
}

function draw(event) {
    if(is_drawing){
        context.lineWidth = draw_width;
        context.strokeStyle = draw_color;
        context.lineCap = 'round';
        context.lineTo(event.clientX , event.clientY - canvas.offsetTop);
        context.stroke();
    }
}

function clearCanvas(){
    context.clearRect(0,0,canvas.width,canvas.height);
}

function undoLast(){
    if(index >= 0){
        draw_img.pop();
        index--;
        context.putImageData(draw_img[index],0,0);
    }
    else{
        clearCanvas();
        draw_img = [];
    }
}


// saving canva
function downloadtable() {

    var node = document.getElementById('main_board');

    domtoimage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            downloadURI(dataUrl, "records.png")
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

