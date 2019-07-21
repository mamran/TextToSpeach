var sounfilesList;
var audio ;
var SoundFileindex;

function PlayAudio(WrapperObjID_Name) {
    sounfilesList = [];
    audio= new Audio();
    var ObjToScan = document.getElementById(WrapperObjID_Name);
    var inputObjects = ObjToScan.querySelectorAll("input[name^='kolotreshima'], a[name^='lblOtiyotReshima']");
    console.log(inputObjects);
    for (var i = 0; i < inputObjects.length; i++) {
        
        if (inputObjects[i].dataset.soundfilename=='NumberOfVotes')
        {
            convertNumberToWords(inputObjects[i].value);
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
            if (SoundFileindex < sounfilesList.length) {
                
                audio.src = 'sounds/' +sounfilesList[SoundFileindex];
                
                if (sounfilesList[SoundFileindex]=='Silent' || sounfilesList[SoundFileindex]=='')
                {
                   
                sleep(2000);
                SoundFileindex++;
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
function convertNumberToWords(amount) {
    
    var words = new Array();
    words[0] = 'msn.mp3' //אפס;
    words[1] = 'Alarm3.mp3'; //אחד
    words[2] = 'Alarm4.mp3'; //שתיים
    words[3] = 'שלוש';
    words[4] = 'ארבע';
    words[5] = 'חמש';
    words[6] = 'שש';
    words[7] = 'שבע';
    words[8] = 'שמונה';
    words[9] = 'תשע';
    words[10] = 'עשר';
    words[11] = 'אחת עשרה';
    words[12] = 'שתים עשרה';
    words[13] = 'שלוש עשרה';
    words[14] = 'ארבע עשרה';
    words[15] = 'חמש עשרה';
    words[16] = 'שש עשרה';
    words[17] = 'שבע עשרה';
    words[18] = 'שמונה עשרה';
    words[19] = 'תשע עשרה';
    words[20] = 'עשרים';
    words[30] = 'שלושים';
    words[40] = 'ארבעים';
    words[50] = 'חמישים';
    words[60] = 'שישים';
    words[70] = 'שבעים';
    words[80] = 'שמונים';
    words[90] = 'תשעים';
    words[100] = 'מאה';
    words[200] = 'מאתיים';
    words[1000] = 'אלף';
    words[2000] = 'אלפיים';
    words[3000] = 'שלושת אלפים';
    amount = amount.toString();
    
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++ , j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++ , j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        //טיפול באפס
        // if (number == 0) {
        //     words_string = words[0];
            
        // };

        value = "";
        for (var i = 0; i < 9; i++) {
            //console.log('i=' + i);
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            //console.log('value=' + value);

            if (value != 0) {
                words_string += words[value] + " ";
                
                console.log('1');
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
                console.log('2');
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
                console.log('3');
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "אלפים ";
                console.log('4');
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "מאות ו ";
                console.log('5');
            } else if (i == 6 && value != 0) {
                words_string += "מאות ";
                console.log('6');
            }
        }
        words_string = words_string.split("  ").join(" ");
        console.log("words "+words_string.split("  "));
        sounfilesList.push(words_string);
    }
    return words_string;
}


// document.getElementById('number1').onkeyup = function () {
//     document.getElementById('words').innerHTML = convertNumberToWords(document.getElementById('number1').value);
// }; 



function PlaySingleFile() {

    audio.src='sounds/' + sounfilesList[SoundFileindex];
    audio.play();  

}

