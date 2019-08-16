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


    

    if (audioFiles.length>0)
    {
        for (CurrentPartyIndex = 0; CurrentPartyIndex < audioFiles.length; CurrentPartyIndex++) {
            addArrow(audioFiles[CurrentPartyIndex][1]);
            
            play(CurrentPartyIndex);
        }
    }
    else
    {
        alert("אין רשימות להקראה");
        stopAudio();
    }
   
}

}

function play(index) {
    
    var audioURL = audioFiles[index][0];
    console.log("Now playing: "+ audioURL);
    
    player.src = audioURL;
    //player.play();
    player.location.replace('jsplayer.htm?'+audioURL);      
    
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
    console.log(reshimaTLbl);
    var TD_Element = document.getElementsByName(reshimaTLbl)[0];
    console.log(TD_Element);
    if(undefined != undefined)
    {
    TD_Element.appendChild('<img id="arrowImg" border="0" src="images/Arrow.png"  align="left" width="15px" >');
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

   

function CreateAudioFiles(WrapperObjID_Name,tagsNames) {
    
    player = document.getElementById('BGSOUND_ID');
    
    //ChangePlaybtnAction();
    initVars();
    ObjToScan = document.getElementById(WrapperObjID_Name);
    var VotesArray=[];
    

    //Scan All Tag Names and add to List by columns order
    for (var i = 0; i < tagsNames.length; i++) {
        
        var TableColumnsCount  =ObjToScan .rows[1].cells.length;
        //שולף את מס' הטורים בטבלה
        console.log(TableColumnsCount);
        //שולף את מס' השורות בטבלה
        var TableRowsCount = ObjToScan.rows.length;
        console.log(TableRowsCount);
	        //עובר על כל השורות בכל טור וטור
            for (CurrentCol = 0; CurrentCol < TableColumnsCount; CurrentCol++) {

                for (CurrentRow= 2; CurrentRow < TableRowsCount; CurrentRow++)
                { 
                    //שולף את התא בשורה
                    var cellObjects = ObjToScan.rows[CurrentRow].cells[CurrentCol];
                    
                    //עובר על כל האובייקטים בתא
                    for (CurrentCellObj = 0; CurrentCellObj < cellObjects.childNodes.length; CurrentCellObj++) {
                        var elementObj = cellObjects.childNodes[CurrentCellObj];
                        var elementName = elementObj.name;
                        if (typeof (elementName) != 'undefined' && elementName != null) {
                            var elementNameContainSubstr = elementName.indexOf(tagsNames[i]);
                            
                            if (elementNameContainSubstr!== -1)
                            {
                               
                                 if (elementObj.getAttribute('data-soundfilename')=='NumberOfVotes')
                                    {
                        
                                        var NumberInWords = convertNumber(elementObj.value);
                                        var NumberInWordsArray = NumberInWords.split(" ");
                                        VotesArray.push([NumberInWordsArray,elementObj.value]); 
                        
                                    }
                                else
                                {
                                
                                        PartiesArray.push([elementObj.name,elementObj.getAttribute('data-soundfilename')]);
                                } 
                            }
                        }
                        
                    }
                    

                }	
            }
                
	       
    }
    // Add Party Votes To Party Array
     for (y = 0; y < VotesArray.length; y++) {
         PartiesArray[y].splice(2,0,VotesArray[y][0]);
         PartiesArray[y].splice(3,0,VotesArray[y][1]);
     }
//console.log (PartiesArray);
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
   // //console.log(audioFiles);
   
   // PreloadAudioFilesToCache();
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