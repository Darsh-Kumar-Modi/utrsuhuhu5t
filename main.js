video="";
objects=[];
objn="";
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas=createCanvas(475,380);
    canvas.center();
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Loading";

}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw(){
    image(video,0,0,475,380);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for( i=0 ; i<objects.length ;i++){
            document.getElementById("status").innerHTML="Status : Loaded";
            document.getElementById("objs").innerHTML="No. of objects = "+objects.length;
            fill("blue");
    
            stroke("black");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label +" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }

    }
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
