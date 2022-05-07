video ="";
status ="";
objects = [];

function preload(){

    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(480,300);
    canvas.center();
}


function draw(){
    image(video,0,0,480,300);
    if(status !=""){
      objectDetector.detect(video , gotResult);
    }
for(i=0; i < objects.length; i++){
    document.getElementById("status").innerHTML ="Objects Detected";
    document.getElementById("number_of_objects_detected").innerHTML = "Number of objects detected ="+ objects.length;

    fill(255,99,71);
    percent = Math.floor(objects[i].confidence * 100);
    text(objects[i].label + "" + percent + "%" , objects[i].x , objects[i].y);
    noFill();
    stroke(255,99,71);
    rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height );

}
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = " Status: Detecting objects ";  
}

function modelLoaded(){
    console.log(" The model is initialized!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
if(error){
    console.error(error);
}
console.log(results);
objects = results;
}