var PartiesArray;
var PartyIndex;
var player;
var audioFiles;
var ObjToScan;
var CurrentPartyIndex;
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
                   
                        PartiesArray.push([TagElementsByName[x].name,TagElementsByName[x].dataset.soundfilename]);
                }           
            }
    }
    //Add Party Votes To Party Array
     for (y = 0; y < VotesArray.length; y++) {
         PartiesArray[y].splice(2,0,VotesArray[y]);
     }


    for (var i=0; i<PartiesArray.length; i++) {
        audioFiles.push('Sounds/' +  PartiesArray[i][1]);
        if (typeof PartiesArray[i][2]!="undefined")
        {
             for (z = 0; z < PartiesArray[i][2].length; z++) {

                    audioFiles.push('Sounds/' + PartiesArray[i][2][z]);
              };
        }   
        
  }
  
  //console.log(PartiesArray);
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
        console.log(audioFiles);
        play(CurrentPartyIndex);
    
    
    };


    // play the first file
    play(CurrentPartyIndex);
   
}
    
// we start preloading all the audio files
for (var i in audioFiles) {
    preloadAudio(audioFiles[i]);
}


}
function play(index) {
    
    addArrow(PartiesArray[index][0]);
        player.src = audioFiles[index];
        player.play();
    
    
    
}
function RevealAudioButtons()
{
    var AudioControlDiv = document.getElementById("AudioControls");
    var PlayBackBtn = document.getElementById("PlayBack");
    AudioControlDiv.style.display = 'block';
    PlayBackBtn.disabled = true;
}

function HideAudioButtons()
{
    var AudioControlDiv = document.getElementById("AudioControls");
    var PlayBackBtn = document.getElementById("PlayBack");
   
    stopAudio();
    AudioControlDiv.style.display = 'none';
    PlayBackBtn.disabled = false;
}
function ChangePlaybtnAction()
{

    ToggleButtonProperties("playBtn","עצירת הקראה","pauseAudio()","images/pause-button.png");
    
    ToggleButtonAvailability("replayBtn");
    ToggleButtonAvailability("rewindBtn");
    // var replayBtnObj = document.getElementById("replayBtn");
    // var rewindBtnObj = document.getElementById("rewindBtn");

    // replayBtnObj.disabled = false;
    // rewindBtnObj.disabled = false;

    
    
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
    addArrow(PartiesArray[CurrentPartyIndex][0]);
    
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
    console.log(BtnObj.disabled);
    BtnObj.disabled = !BtnObj.disabled;
    console.log(BtnObj.disabled);
}
function stopAudio()
{
    clearArrow();
    player.pause();
    console.log(player.currentTime);
    player.currentTime = 0;
    var playBtnImg =  document.getElementById("playBtnImg");
    var btnPlayObj = document.getElementById("playBtn");
    ToggleButtonAvailability("rewindBtn") ;
    ToggleButtonAvailability("replayBtn") ;
    playBtnImg.src = "images/play-button.png";
    btnPlayObj.title = "התחלת הקראה"
    btnPlayObj.setAttribute( "onClick", "PlayAudio('BaaleTafkidimBAkalpitTbl',['lblOtiyotReshima_','kolotreshima_','lblOtiyotReshima2_','kolotreshima2_'])" );
    
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
