var sounfilesList;
var audio ;
var SoundFileindex;
function initVars ()
{
    sounfilesList = [];
    audio= new Audio();
}
function PlayAudio(WrapperObjID_Name) {
    initVars();
    var ObjToScan = document.getElementById(WrapperObjID_Name);
    var inputObjects = ObjToScan.querySelectorAll('[data-soundfilename]');
    console.log(inputObjects);
    for (var i = 0; i < inputObjects.length; i++) {
        
        if (inputObjects[i].dataset.soundfilename=='NumberOfVotes')
        {
            console.log (convertNumber(inputObjects[i].value));
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

