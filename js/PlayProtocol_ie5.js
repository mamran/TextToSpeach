var PartiesArray;
var PartyIndex;
var player;
var audioFiles;
var ObjToScan;
var CurrentPartyIndex;
var PlaybackStatusBlink;
var VotesPlaylist;
var PlayBackDone;

function initVars ()
{
   
    
    VotesPlaylist = new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_1",
        cssSelectorAncestor: "#jp_container_1"
    },
     [
        
        
    ], {
        swfPath: "jplayer",
        supplied: "oga, mp3",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        play: function(e) {
            addArrow(e.jPlayer.status.media.title);
            if (VotesPlaylist.current>1)
            {
            //alert ('play '+VotesPlaylist.current+' '+e.jPlayer.status.media.title);
            ToggleButtonDisabled("rewindBtn",false,true) ;
            ToggleButtonDisabled("replayBtn",false,true) ;
            
            }

        },
        ended: function(e) {
            
            //console.log("end"+VotesPlaylist.playlist.length);
            //console.log("current: "+VotesPlaylist.current);
            //console.log(PlayBackDone.value);
            if (VotesPlaylist.playlist.length==VotesPlaylist.current+1 && e.jPlayer.status.media.title=="EndOfProtocolNotify")
            {
               
                PlayBackDone.value = "true";
                HideAudioButtons();
                //alert ("end of list");
            }
            //console.log(VotesPlaylist.playlistindexOf(e.jPlayer.status.media.title));
            //VotesPlaylist.current=0;   
        },
        pause: function(e){
            //alert ('pause '+VotesPlaylist.current+' '+e.jPlayer.status.media.title);
            if (VotesPlaylist.current>1)
            {
                
                ToggleButtonDisabled("rewindBtn",false,false) ;
                ToggleButtonDisabled("replayBtn",false,false) ;
            }
        }

    });

    PartiesArray = [];   
    audioFiles = []; 
    PlayBackDone = document.getElementById('PlayBackDone'); 
    
}



function RevealAudioButtons()
{
    var AudioControlDiv = document.getElementById("tblSound");
    AudioControlDiv.style.display = 'block';
    //disable all form buttons
    ToggleButtonDisabled("PlayBack",true,true);
    ToggleButtonDisabled("btnShgiot",true,true);
    ToggleButtonDisabled("btnLog",true,true);
    ToggleButtonDisabled("btnShmira",true,true);
    ToggleButtonDisabled("btnBdika",true,true);

    //blink Playback staus
    var f = document.getElementById('lblstatusPlayback');
    f.innerText ="בתהליך";
    PlaybackStatusBlink = setInterval(function() {
        f.style.display = (f.style.display == 'none' ? '' : 'none');
    }, 1000);
    
}

function HideAudioButtons()
{
    var AudioControlDiv = document.getElementById("tblSound");
    AudioControlDiv.style.display = 'none';
    ToggleVotesTable();
    //enable all form buttons
    ToggleButtonDisabled("PlayBack",true,false);
    ToggleButtonDisabled("btnShgiot",true,false);
    ToggleButtonDisabled("btnLog",true,false);
    ToggleButtonDisabled("btnShmira",true,false);
    ToggleButtonDisabled("btnBdika",true,false);
    ToggleButtonDisabled("rewindBtn",false,true) ;
    ToggleButtonDisabled("replayBtn",false,true) ;
    //Set playback status
    clearInterval(PlaybackStatusBlink);
    
    var lblstatusPlayback = document.getElementById('lblstatusPlayback');
    console.log(PlayBackDone.value);
     if (PlayBackDone.value != 'true'){
        
        lblstatusPlayback.innerText ="לא בוצעה";
        lblstatusPlayback.style.display="block";
     }
     else
     {
        lblstatusPlayback.innerText ="בוצעה";
        lblstatusPlayback.style.display="block";
     }
     clearArrow();       
     $("#jquery_jplayer_1").jPlayer("clearMedia");

     
    
}

function replay()
{
    $("#jquery_jplayer_1").jPlayer("stop");
    VotesPlaylist.select(0);
    //VotesPlaylist.play(0);
    addArrow(VotesPlaylist.playlist[1].title);

}


function rewindAudio()
{
    if (VotesPlaylist.current>1)
    {
        $("#jquery_jplayer_1").jPlayer("stop");
        var reshimaIndexTogo;
    
        if (VotesPlaylist.current % 2 >0) 
        {
            reshimaIndexTogo=VotesPlaylist.current-2;
        }
        else
        {
            reshimaIndexTogo=VotesPlaylist.current-1;
        }
        VotesPlaylist.select(reshimaIndexTogo);
        console.log(VotesPlaylist.playlist[reshimaIndexTogo].title);
    
        addArrow(VotesPlaylist.playlist[reshimaIndexTogo].title);
    }
       
}


function ToggleButtonDisabled(btnName,ChangeBtnColors,isDisabled)
{
    var BtnObj = document.getElementsByName(btnName);
    var btn, i=0;
    while(btn=BtnObj[i++]) {
        btn.disabled=isDisabled;
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


function addArrow(reshimaTLbl)
{
    
    clearArrow();   
    var TD_Element = $("a[name="+reshimaTLbl+"]");
    TD_Element.prepend('<img id="arrowImg" border="0" src="images/Arrow.png"  style="position:absolute;width:15px;float:right; margin-right:50px;clear:both;">');
   
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
                
                audioFiles.push(['Sounds/StartOfProtocolNotify.mp3']); 
                VotesPlaylist.add({
                    title: "StartOfProtocolNotify",
                    mp3: "Sounds/StartOfProtocolNotify.mp3"
                   
                }); 
            }
                audioFiles.push(['Sounds/' +  PartiesArray[i][1],PartiesArray[i][0]]);
                VotesPlaylist.add({
                    title: PartiesArray[i][0],
                    mp3: 'Sounds/' +  PartiesArray[i][1]
                   
                }); 
            if (typeof PartiesArray[i][2]!="undefined")
        {
            for (z = 0; z < PartiesArray[i][2].length; z++) {
                audioFiles.push(['Sounds/' + PartiesArray[i][2][z],PartiesArray[i][0]]);
                VotesPlaylist.add({
                    title: PartiesArray[i][0],
                    mp3: 'Sounds/' + PartiesArray[i][2][z]
                   
                }); 
            };
        } 
        
    }
    
  }

    if (audioFiles.length>0)
    {
        audioFiles.push(['Sounds/EndOfProtocolNotify.mp3']);  
        VotesPlaylist.add({
            title: "EndOfProtocolNotify",
            mp3: "Sounds/EndOfProtocolNotify.mp3"
           
        }); 
    }
   //השבתת טבלת קולות לרשימות
   ToggleVotesTable();

   console.log("VotesPlaylist length "+ VotesPlaylist.playlist.length);
   //VotesPlaylist.next();  //פעולה שניתן לבצע על רשימה
   

  
  
   
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