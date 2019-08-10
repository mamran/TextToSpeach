var PartiesArray;
var PartyIndex;
var player;
var audioFiles;
var ObjToScan;
var CurrentPartyIndex;

function IsEmpty(obj) { 
    if (obj.value == null ||  
        obj.value == undefined || 
        obj.value.length == 0) { 
        
         console.log(obj.name +" Value cannot be empty\n"); 
        return true; 
    } else { 
         console.log(obj.name+" Your response has been recorded\n"); 
        return false; 
    } 
} 

function initVars ()
{
   
    PartiesArray = [];
    audio = new Audio();
    audioFiles = [];
    
}

function PlayAudio(WrapperObjID_Name,tagsNames) {
    //console.log(tagsNames);
    player = document.getElementById('player');
    ChangePlaybtnAction();
    initVars();
    
    ObjToScan = document.getElementById(WrapperObjID_Name);
    var VotesArray=[];
    var TagElementsByName;

    //Scan All Tag Names and add to List by columns order
    for (var i = 0; i < tagsNames.length; i++) {
        TagElementsByName=null;
        queryselector = '[name^="'+tagsNames[i]+'"]';
        TagElementsByName = ObjToScan.querySelectorAll(''+queryselector+'');
        
            for (x = 0; x < TagElementsByName.length; x++) {
                if (TagElementsByName[x].dataset.soundfilename=='NumberOfVotes')
                {
                    
                    var NumberInWords = convertNumber(TagElementsByName[x].value);
                    var NumberInWordsArray = NumberInWords.split(" ");
                    VotesArray.push(NumberInWordsArray);          
                }
                else
                {
                   
                        PartiesArray.push([TagElementsByName[x].name,TagElementsByName[x].dataset.soundfilename,TagElementsByName[x].value]);
                }           
            }
            
    }
    //Add Party Votes To Party Array
     for (y = 0; y < VotesArray.length; y++) {
         PartiesArray[y].splice(2,0,VotesArray[y]);
     }

    console.log(PartiesArray);
    for (var i=0; i<PartiesArray.length; i++) {
        audioFiles.push(['Sounds/' +  PartiesArray[i][1],PartiesArray[i][0]]);
        if (typeof PartiesArray[i][2]!="undefined")
        {
             for (z = 0; z < PartiesArray[i][2].length; z++) {

                    audioFiles.push(['Sounds/' + PartiesArray[i][2][z],PartiesArray[i][0]]);
              };
        }   
        
  }
  
  console.log(audioFiles);
  init();
  
  function preloadAudio(url) {
    var audio = new Audio();
    // once this file loads, it will call loadedAudio()
    // the file will be kept by the browser as cache
    audio.addEventListener('canplaythrough', loadedAudio, false);
    audio.src = url;
}
var loaded = 0;
function loadedAudio() {
    // this will be called every time an audio file is loaded
    // we keep track of the loaded files vs the requested files
    loaded++;
    if (loaded == audioFiles.length){
        // all have loaded
        
        init();
       
    }
   
}


function init() {

    // do your stuff here, audio has been loaded
    // for example, play all files one after the other
    CurrentPartyIndex = 0;
    // once the player ends, play the next one
    player.onended = function() {
        CurrentPartyIndex++;
        
        
            if (CurrentPartyIndex >= audioFiles.length) {
            // end 
            console.log("end");
            return;
        }
        //console.log(audioFiles[1][CurrentPartyIndex]);
        addArrow(audioFiles[CurrentPartyIndex][1]);
        play(CurrentPartyIndex);
    
    
    };


    // play the first file
    console.log(audioFiles[CurrentPartyIndex][1]);
    addArrow(audioFiles[CurrentPartyIndex][1]);
    play(CurrentPartyIndex);
   
}
    
// we start preloading all the audio files
for (var i in audioFiles) {
    preloadAudio(audioFiles[i][0]);
}


}
function play(index) {
    
    //addArrow(PartiesArray[index][0]);
    console.log("Now playing: "+ audioFiles[index][0]);
        player.src = audioFiles[index][0];
        player.play();
    
    
    
}
function RevealAudioButtons()
{
    var AudioControlDiv = document.getElementById("AudioControls");
    AudioControlDiv.style.display = 'block';
    ToggleButtonAvailability("PlayBack");
}

function HideAudioButtons()
{
    var AudioControlDiv = document.getElementById("AudioControls");
    stopAudio();
    AudioControlDiv.style.display = 'none';
    ToggleButtonAvailability("PlayBack");
}

function ChangePlaybtnAction()
{
    ToggleButtonProperties("playBtn","עצירת הקראה","pauseAudio()","images/pause-button.png");  
//ToggleButtonAvailability("replayBtn");
  //  ToggleButtonAvailability("rewindBtn");
}

function pauseAudio()
{
    player.pause();
    ToggleButtonProperties("playBtn","התחלת הקראה","resumeAudio()","images/play-button.png");
}

function resumeAudio()
{
    ChangePlaybtnAction()
    player.play();    
}

function rewindAudio()
{
    pauseAudio();
    CurrentPartyIndex--;
    if (CurrentPartyIndex==0)
    {
        ToggleButtonAvailability("rewindBtn") ;
    }
    addArrow(PartiesArray[CurrentPartyIndex][0][1]);
    
}

function ToggleButtonProperties(btnID,title,onClickFuncName,imgSourceFileName)
{
    var btnPlayObj = document.getElementById(btnID);
    btnPlayObj.title = title;
    btnPlayObj.setAttribute( "onClick", onClickFuncName );
    btnPlayObj.firstChild.src = imgSourceFileName;
}
function ToggleButtonAvailability(btnID)
{
    var BtnObj = document.getElementById(btnID);
    BtnObj.disabled = !BtnObj.disabled;
}

function stopAudio()
{
    clearArrow();
    if(typeof(player) != 'undefined' && player != null)
    {
        player.pause();
        if (!isNaN(player.duration)) {
            player.currentTime = 0;
        }
       // player.currentTime = 0;
    }
    
    ToggleButtonAvailability("rewindBtn") ;
    ToggleButtonAvailability("replayBtn") ;
    ToggleButtonProperties("playBtn","התחלת הקראה","PlayAudio('BaaleTafkidimBAkalpitTbl',['lblOtiyotReshima_','kolotreshima_','lblOtiyotReshima2_','kolotreshima2_'])","images/play-button.png");
    
}
function addArrow(reshimaTLbl)
{
    clearArrow();
    var TD_Element = document.querySelector('[name="'+reshimaTLbl+'"]');
    TD_Element.insertAdjacentHTML('afterend', '<img id="arrowImg" border="0" src="images/Arrow.gif"  align="left" width="15px" >');
    
    
}
function clearArrow()
{
    var arrowImg = document.getElementById("arrowImg");
    
    if(typeof(arrowImg) != 'undefined' && arrowImg != null)
    {
        arrowImg.outerHTML = "";
    }
    
}
