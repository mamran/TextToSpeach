var sounfilesList = [];
function PlayAudio() {
    
    var inputObjects = document.querySelectorAll('input[id^="mif"]');
    console.log(inputObjects);
    for (var i = 0; i < inputObjects.length; i++) {
        console.log(inputObjects[i].dataset.soundfilename);
        sounfilesList.push(inputObjects[i].dataset.soundfilename);
    }
    console.log(sounfilesList);

    sounfilesList.push('X.mp3');
    for (var i = 0; i < sounfilesList.length; i++) {
        (function (i) {
            setTimeout(function () {
                var SoundFileNameToPlay = sounfilesList[i];
                console.log(SoundFileNameToPlay);
                PlaySingleFile(SoundFileNameToPlay);
            }, 3000 * i);
        })(i);

    }
    
}
function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = 'Alarm3.wav' //אפס;
    words[1] = 'אחד';
    words[2] = 'שתיים';
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
        if (number == 0) {
            words_string = words[0];
        };

        value = "";
        for (var i = 0; i < 9; i++) {
            console.log('i=' + i);
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            console.log('value=' + value);

            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "אלפים ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "מאות ו ";
            } else if (i == 6 && value != 0) {
                words_string += "מאות ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}


// document.getElementById('number1').onkeyup = function () {
//     document.getElementById('words').innerHTML = convertNumberToWords(document.getElementById('number1').value);
// }; 



function PlaySingleFile(_fileName) {

    var audio = new Audio('http://5.102.252.8/texttospeach/sounds/' + _fileName);
    audio.play();

}
