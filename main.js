cocossdModel = "";
objectName = "";
ObjectStatus = "";
objects = [];
label = "";
function setup()
{
    canvas = createCanvas(650,370);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(650,370);
    video.hide();
}
function start()
{
    cocossdModel = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    objectName = document.getElementById("object_name_input").value;
    if(label == objectName)
    {
        video.stop();
        cocossdModel.detect(gotResult);
        document.getElementById("object_status").innerHTML = "Object mentioned found";
        synth = window.speechSynthesis;
        utterThis = new SpeechSynthesisUtterance("object mentioned found");
        synth.speak(utterThis);
    }
    else
    {
        document.getElementById("object_status").innerHTML = "Object mentioned not found";
        synth = window.speechSynthesis;
        utterThis = new SpeechSynthesisUtterance("object mentioned not found");
        synth.speak(utterThis);
    }
}
function modelLoaded()
{
    console.log("M o d e l  L o a d e d  ! ! ! ! ! !");
    ObjectStatus = "true";
    cocossdModel.detect(video,gotResult);
}
function draw()
{
    image(video,0,0,650,370);
    if(ObjectStatus == "true")
    {
        for(i=0;i<objects.length;i++)
        {
            percent = floor(objects[i].length*100);
            label = objects[i].label;
            x = objects[i].x;
            y = objects[i].y;
            width = objects[i].width;
            height = objects[i].height;
        }  
    }   
}
function gotResult(error,results)
{
    if(error)
    {
        console.error();
    }
    else
    {  
        objects = results;
        console.log(results);
    }
}