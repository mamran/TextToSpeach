var sounfilesList;
var audio ;
var SoundFileindex;
function initVars ()
{
    sounfilesList = [];
    audio= new Audio();
}
function PlayAudio(WrapperObjID_Name,tagsNames) {
    //console.log(tagsNames);
    initVars();
    
    var ObjToScan = document.getElementById(WrapperObjID_Name);
    var ObjectListByTagNames=[];
    
    var PartiesArray = [];
    var VotesArray = [];
    var TagElementsByName;
    
    
    // var SinglePartyArray = [];
    // var ProtocolArray = [];

    //Scan All Tag Names and add to List by columns order
    for (var i = 0; i < tagsNames.length; i++) {
        TagElementsByName=null;
        queryselector = '[name^="'+tagsNames[i]+'"]';
        TagElementsByName = ObjToScan.querySelectorAll(''+queryselector+'');
        console.log(TagElementsByName);
            for (x = 0; x < TagElementsByName.length; x++) {

                if (TagElementsByName[x].dataset.soundfilename=='NumberOfVotes')
                {
                    //var PartyVotesArray = [];
                    var NumberInWords = convertNumber(TagElementsByName[x].value);
                    var NumberInWordsArray = NumberInWords.split(" ");
                    //PartyVotesArray.push(NumberInWordsArray);
                    VotesArray.push(NumberInWordsArray);
                }
                else
                {
                    PartiesArray.push(TagElementsByName[x].dataset.soundfilename);
                }
            
            }

            

    }
    console.log(PartiesArray);
    console.log(VotesArray);
    debugger;
    var inputObjects = ObjectListByTagNames.querySelectorAll('[data-soundfilename]');
    
    for (var i = 0; i < inputObjects.length; i++) {
        
        if (inputObjects[i].dataset.soundfilename=='NumberOfVotes')
        {
            var NumberInWords = convertNumber(inputObjects[i].value);
            var NumberInWordsArray = NumberInWords.split(" ");
            
            for (var i=0; i<NumberInWordsArray.length; i++) {
                sounfilesList.push(NumberInWordsArray[i]);
              }
  
            //console.log(NumberInWordsArray);
            //sounfilesList.push(NumberInWords.split(" "));
            //convertNumberToWords(inputObjects[i].value);
            //sounfilesList.push('Votes Sound File');
        }
        else{
           // console.log(inputObjects[i].dataset.soundfilename);
            sounfilesList.push(inputObjects[i].dataset.soundfilename);
            sounfilesList.push('Silent');
        }
        
    }
    console.log(sounfilesList);
    SoundFileindex= 0;

    PlaySingleFile();

        audio.addEventListener("ended", function () {
            SoundFileindex++;
            console.log('Current Line '+SoundFileindex);
            if (SoundFileindex < sounfilesList.length) {
                
                audio.src = 'Sounds/' +sounfilesList[SoundFileindex];
                
                if (sounfilesList[SoundFileindex]=='Silent' || sounfilesList[SoundFileindex]=='')
                {
                    sleep(2000);
                    SoundFileindex++;
                    //if (sounfilesList.length>=SoundFileindex)
                        PlaySingleFile();
                }
                else
                {
                    PlaySingleFile();
                }
            }
        }, false);

        
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }



function PlaySingleFile() {

    console.log('Now Playing '+ sounfilesList[SoundFileindex])
    audio.src='Sounds/' + sounfilesList[SoundFileindex];
    audio.play();  

}

