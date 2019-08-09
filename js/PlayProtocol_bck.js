var sounfilesList;
var PartiesArray;
var audio ;
var PartyIndex;
var player;
function initVars ()
{
    sounfilesList = [];
    PartiesArray = [];
    audio = new Audio();
    
}

function PlayAudio(WrapperObjID_Name,tagsNames) {
    //console.log(tagsNames);
    player = document.getElementById('player');
    ChangePlaybtnAction();
    initVars();
    
    var ObjToScan = document.getElementById(WrapperObjID_Name);
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
                //else if (typeof TagElementsByName[x].dataset.soundfilename!="undefined")
                else
                {
                    //console.log(TagElementsByName[x].name);
                    //console.log(TagElementsByName[x].dataset.soundfilename);
                    PartiesArray.push([TagElementsByName[x].name,TagElementsByName[x].dataset.soundfilename]);
                }
            
            }

            

    }
    //Add Party Votes To Party Array
     for (y = 0; y < VotesArray.length; y++) {
         PartiesArray[y].splice(2,0,VotesArray[y]);
     }

    
    // console.log(PartiesArray);
    // debugger;
    // var inputObjects = ObjectListByTagNames.querySelectorAll('[data-soundfilename]');
    
    // for (var i = 0; i < inputObjects.length; i++) {
        
    //     if (inputObjects[i].dataset.soundfilename=='NumberOfVotes')
    //     {
    //         var NumberInWords = convertNumber(inputObjects[i].value);
    //         var NumberInWordsArray = NumberInWords.split(" ");
            
    //         for (var i=0; i<NumberInWordsArray.length; i++) {
    //             sounfilesList.push(NumberInWordsArray[i]);
    //           }
  
    //         //console.log(NumberInWordsArray);
    //         //sounfilesList.push(NumberInWords.split(" "));
    //         //convertNumberToWords(inputObjects[i].value);
    //         //sounfilesList.push('Votes Sound File');
    //     }
    //     else{
    //        // console.log(inputObjects[i].dataset.soundfilename);
    //         sounfilesList.push(inputObjects[i].dataset.soundfilename);
    //         sounfilesList.push('Silent');
    //     }
        
    // }
    // console.log(sounfilesList);
    var audioFiles = [];
    for (var i=0; i<PartiesArray.length; i++) {
        console.log('Current Tag '+PartiesArray[i][0]);
        audioFiles.push('Sounds/' +  PartiesArray[i][1]);
        console.log(PartiesArray[i][2]);
        if (typeof PartiesArray[i][2]!="undefined")
        {
        for (z = 0; z < PartiesArray[i][2].length; z++) {

            audioFiles.push('Sounds/' + PartiesArray[i][2][z]);
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

function play(index) {
    player.src = audioFiles[index];
    player.play();
}
function init() {
    // do your stuff here, audio has been loaded
    // for example, play all files one after the other
    var i = 0;
    // once the player ends, play the next one
    player.onended = function() {
    	i++;
        if (i >= audioFiles.length) {
            // end 
            return;
        }
    	play(i);
    };
    // play the first file
    play(i);
    //stopAudio();
}
    
// we start preloading all the audio files
for (var i in audioFiles) {
    preloadAudio(audioFiles[i]);
}
    // PartyIndex= 0;
    // var FileNameToPlay;
    // console.log('Current Tag '+PartiesArray[PartyIndex][0]);
    // FileNameToPlay = PartiesArray[PartyIndex][1];
    // PlaySingleFile(FileNameToPlay);
    
        // audio.addEventListener("ended", function () {
            
        //     PartyIndex++;
        //     console.log("ended");
        //     PlayParty();

        //     function PlayParty() {
        //         console.log('Current Tag ' + PartiesArray[PartyIndex][0]);
        //         if (PartyIndex < PartiesArray.length) {

        //             FileNameToPlay = PartiesArray[PartyIndex][1];
        //             PlaySingleFile(FileNameToPlay);
        //             PlayNumbers();

        //         }
        //     }
        //     function PlayNumbers() {

        //         for (z = 0; z < PartiesArray[PartyIndex][2].length; z++) {
        //             FileNameToPlay = PartiesArray[PartyIndex][2][z];
        //             PlaySingleFile(FileNameToPlay);

        //         };
        //     }

        // }, false);

        
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }



function PlaySingleFile(_FileNameToPlay) {

    console.log('Now Playing '+ _FileNameToPlay)
    audio.src='Sounds/' + _FileNameToPlay;
    audio.play();  

}

function ChangePlaybtnAction()
{
    var btnPlayObj = document.getElementById("btnPlay");
    btnPlayObj.value = "עצור";
    btnPlayObj.setAttribute( "onClick", "stopAudio()" );
    
    
}
function stopAudio()
{
    audio.pause();
    var btnPlayObj = document.getElementById("btnPlay");
    btnPlayObj.value = "השמעה";
    btnPlayObj.setAttribute( "onClick", "PlayAudio('BaaleTafkidimBAkalpitTbl',['lblOtiyotReshima_','kolotreshima_','lblOtiyotReshima2_','kolotreshima2_'])" );
    
}
