var PartiesArray;
var PartyIndex;
var player;
var audioFiles;
var ObjToScan;
var CurrentPartyIndex;
var PlaybackStatusBlink;

function initVars ()
{
    PartiesArray = [];   
    audioFiles = [];    
}

function PlayAudio() {
    
   
   
    ChangePlaybtnAction();
    var f = document.getElementById('lblstatusPlayback');
    f.textContent ="בתהליך";
    PlaybackStatusBlink = setInterval(function() {
        f.style.display = (f.style.display == 'none' ? '' : 'none');
    }, 1000);

    init();
 



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
            stopAudio();
            var f = document.getElementById('lblstatusPlayback');
            f.textContent ="בוצעה";
            clearInterval(PlaybackStatusBlink);
            
            var PlayBackDone = document.getElementById('PlayBackDone');
            PlayBackDone.value = "true";
            HideAudioButtons();
            return;
        }

        addArrow(audioFiles[CurrentPartyIndex][1]);
        play(CurrentPartyIndex);
    
    
    };


    // play the first file

    if (audioFiles.length>0)
    {
    addArrow(audioFiles[CurrentPartyIndex][1]);
    play(CurrentPartyIndex);
    }
    else
    {
        alert("אין רשימות להקראה");
        stopAudio();
    }
   
}

}

function play(index) {

        console.log("Now playing: "+ audioFiles[index][0]);
        player.src = audioFiles[index][0];
        player.play();
    
}

function RevealAudioButtons()
{
    var AudioControlDiv = document.getElementById("AudioControls");
    AudioControlDiv.style.display = 'block';
    //disable all form buttons
    ToggleButtonAvailability("PlayBack",true);
    ToggleButtonAvailability("btnShgiot",true);
    ToggleButtonAvailability("btnLog",true);
    ToggleButtonAvailability("btnShmira",true);
    ToggleButtonAvailability("btnBdika",true);
    
}

function HideAudioButtons()
{
    var AudioControlDiv = document.getElementById("AudioControls");
    stopAudio();
    AudioControlDiv.style.display = 'none';
    ToggleVotesTable();
    //enable all form buttons
    ToggleButtonAvailability("PlayBack",true);
    ToggleButtonAvailability("btnShgiot",true);
    ToggleButtonAvailability("btnLog",true);
    ToggleButtonAvailability("btnShmira",true);
    ToggleButtonAvailability("btnBdika",true);
    //Set playback status
    clearInterval(PlaybackStatusBlink);
    var PlayBackDone = document.getElementById('PlayBackDone');
    
    
    var lblstatusPlayback = document.getElementById('lblstatusPlayback');
     if (PlayBackDone.value != "true"){
        
        lblstatusPlayback.textContent ="לא בוצעה";
        lblstatusPlayback.style.display="block";
     }
     else
     {
        lblstatusPlayback.textContent ="בוצעה";
        lblstatusPlayback.style.display="block";
     }

    
}

function ChangePlaybtnAction()
{
    ToggleButtonProperties("playBtn","עצירת הקראה","pauseAudio()","images/pause-button.png");  

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
        ToggleButtonAvailability("rewindBtn",false) ;
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
function ToggleButtonAvailability(btnName,ChangeBtnColors)
{
    var BtnObj = document.getElementsByName(btnName);
    var btn, i=0;
    while(btn=BtnObj[i++]) {
        btn.disabled=!btn.disabled;
        if (ChangeBtnColors){
            if (btn.disabled)
            {
                btn.style.backgroundColor="#d9d9d9";
                btn.style.color="#e6e6e6";
            }
            else
            {
                btn.style.backgroundColor="#80b3e6";
                btn.style.color="darkblue";
            }
        }
    }
   
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
    }
    
    ToggleButtonAvailability("rewindBtn",false) ;
    ToggleButtonAvailability("replayBtn",false) ;
    ToggleButtonProperties("playBtn","התחלת הקראה","PlayAudio()","images/play-button.png");
    
}
function addArrow(reshimaTLbl)
{
    clearArrow();
    var TD_Element = document.querySelector('[name="'+reshimaTLbl+'"]');
    if(typeof(TD_Element) != 'undefined' && TD_Element != null)
    {
    TD_Element.insertAdjacentHTML('afterend', '<img id="arrowImg" border="0" src="images/Arrow.png"  align="left" width="15px" >');
    }
    
}
function clearArrow()
{
    var arrowImg = document.getElementById("arrowImg");
    
    if(typeof(arrowImg) != 'undefined' && arrowImg != null)
    {
        arrowImg.outerHTML = "";
    }
    
}

function IsEmpty(obj) { 
    if (obj.value == null ||  
        obj.value == undefined || 
        obj.value.length == 0) { 
        return true; 
    } else { 
        return false; 
    } 
} 

function CreateAudioFiles(WrapperObjID_Name,tagsNames) {
    
    player = document.getElementById('player');
    
    //ChangePlaybtnAction();
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
                    VotesArray.push([NumberInWordsArray,TagElementsByName[x].value]); 
      
                }
                else
                {
                    
                        PartiesArray.push([TagElementsByName[x].name,TagElementsByName[x].dataset.soundfilename]);
                       

                } 
                          
            }
            
    }
    // Add Party Votes To Party Array
     for (y = 0; y < VotesArray.length; y++) {
         PartiesArray[y].splice(2,0,VotesArray[y][0]);
         PartiesArray[y].splice(3,0,VotesArray[y][1]);
     }

     //Create Audio Files Array To Play
    for (var i=0; i<PartiesArray.length; i++) {
        
        //Only parties != 0
        if (PartiesArray[i][3]!="")
        {
            if (audioFiles.length==0){
                
                audioFiles.push(['Sounds/'+'StartOfProtocolNotify.mp3']);  
            }
                audioFiles.push(['Sounds/' +  PartiesArray[i][1],PartiesArray[i][0]]);
            if (typeof PartiesArray[i][2]!="undefined")
        {
            for (z = 0; z < PartiesArray[i][2].length; z++) {
                audioFiles.push(['Sounds/' + PartiesArray[i][2][z],PartiesArray[i][0]]);
            };
        } 
        
    }
    
  }

    if (audioFiles.length>0)
    {
        audioFiles.push(['Sounds/'+'EndOfProtocolNotify.mp3']);  
    }
    console.log("audioFiles.length "+audioFiles.length);
    PreloadAudioFilesToCache();
}

function PreloadAudioFilesToCache()
{
    ToggleVotesTable();
     // we start preloading all the audio files
    for (var i in audioFiles) {
        console.log("Preload audio file:" + audioFiles[i][0]);
        preloadAudio(audioFiles[i][0]);
    }
      
      function preloadAudio(url) {
        var audio = new Audio();
        // once this file loads, it will call loadedAudio()
        // the file will be kept by the browser as cache
        audio.addEventListener('canplaythrough', loadedAudio, false);
        audio.src = url;
        audio.playbackRate = 0.5;
    }
    var loaded = 0;
    function loadedAudio() {
        // this will be called every time an audio file is loaded
        // we keep track of the loaded files vs the requested files
        
        loaded++;
        
        if (loaded == audioFiles.length){
            // all have loaded
            
            console.log (audioFiles.length+" AudioFiles Loaded");
            
           
        }
       
    }
}

function ToggleVotesTable()
{
   var tbl = document.getElementById('BaaleTafkidimBAkalpitTbl');
   var all=tbl.getElementsByTagName('input');
   var inp, i=0;
   while(inp=all[i++]) {
   inp.disabled=!inp.disabled;
   }


}