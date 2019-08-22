var he;
var language =  {
    'baseSeparator': 've.mp3',
    'unitSeparator': 've.mp3',
    'withAnd': true,
    'base': {
        '0': '0.mp3',  //אפס
        '1': '1.mp3',
        '2': '2.mp3',
        '3': '3.mp3',
        '4': '4.mp3',
        '5': '5.mp3',
        '6': '6.mp3',
        '7': '7.mp3',
        '8': '8.mp3',
        '9': '9.mp3',
        '10': '10.mp3',
        '11': '11.mp3',
        '12': '12.mp3',
        '13': '13.mp3',
        '14': '14.mp3',
        '15': '15.mp3',
        '16': '16.mp3',
        '17': '17.mp3',
        '18': '18.mp3',
        '19': '19.mp3',
        '20': '20.mp3',
        '30': '30.mp3',
        '40': '40.mp3',
        '50': '50.mp3',
        '60': '60.mp3',
        '70': '70.mp3',
        '80': '80.mp3',
        '90': '90.mp3',
        '100': '100.mp3',
        '200': '200.mp3',
        '300': '300.mp3',
        '400': '400.mp3',
        '500': '500.mp3',
        '600': '600.mp3',
        '700': '700.mp3',
        '800': '800.mp3',
        '900': '900.mp3',
        '2000': '2000.mp3',
        '3000': '3000.mp3',
        '4000': '4000.mp3',
        '5000': '5000.mp3',
        '6000': '6000.mp3',
        '7000': '7000.mp3',
        '8000': '8000.mp3',
        '9000': '9000.mp3',
        '10000': '10000.mp3',
        '100000': '100000.mp3'
    },
    'units': [
        {
            'singular': 'מאה',
            'plural': 'מאות',
            'avoidPrefixException': [1],
            'useBaseInstead': false,
            'useBaseException': []
        },
        {
            'singular': '1000.mp3',
            'useBaseUnits': [2, 3, 4, 5, 6, 7, 8, 9, 10],
            'avoidPrefixException': [1]
        },
        {
            'singular': 'מיליון',
            'avoidPrefixException': [1],
            'replacePrefixException': { '2': 'שני' }
        },
        {
            'singular': 'מיליארד',
            'avoidPrefixException': [1],
            'replacePrefixException': { '2': 'שני' }
        },
        {
            'singular': 'טריליון',
            'avoidPrefixException': [1],
            'replacePrefixException': { '2': 'שני' }
        }
    ],
    'unitExceptions': {
    },
    'grammticGenderExceptions': {
        '1': '1.mp3',
        '2': '2.mp3',
        '3': '3.mp3',
        '4': '4.mp3',
        '5': '5.mp3',
        '6': '6.mp3',
        '7': '7.mp3',
        '8': '8.mp3',
        '9': '9.mp3',
        '10': '10.mp3',
        '11': '11.mp3',
        '12': '12.mp3',
        '13': '13.mp3',
        '14': '14.mp3',
        '15': '15.mp3',
        '16': '16.mp3',
        '17': '17.mp3',
        '18': '18.mp3',
        '19': '19.mp3'
    }
};

var i18n = {
    
    he: he
};

//Only short scale is supported. For more details about short vs long scales
// See https://en.wikipedia.org/wiki/Long_and_short_scales 
var scale = [100];
for (var i = 1; i <= 6; i++) {
    scale.push(Math.pow(10, i * 3));
}

var defaults = {
    noAnd: false,
    lang: 'he'
};

/**
 * Converts numbers to their literal form. supports english and hebrew   
 * @method convertNumber    
 * @param {Number} number The number to convert
 * @param {Object} [options] An object representation of the options
 * options.lang - the language to wich the number should be translated.
 * possible values: 'he' - Hebrew (default) 
 *                  'en' - English
 * @returns {String} the number in words (its literal representation)
 * @example Example usage. 
 * literalNumbers.convertNumber(4323); //  '����� ����� ��� ���� ������ ������' 
 * literalNumbers.convertNumber(4323,{lang:'en'}); //   'four thousand three hundred and twenty-three'
 */

function convertNumber(number) {
    
   
   
    var baseCardinals = language.base;

    function convert(currentNumber) {

        function handleSmallerThan100(currentNumber, unit, baseCardinals) {
            var dec = Math.floor(currentNumber / 10) * 10;
            unit = currentNumber - dec;
            if (unit) {
                return baseCardinals[dec] +" "+ language.baseSeparator +" "+ convert(unit);
            }
            return baseCardinals[dec];
        }

        function tryGetBaseCardinal(number) {
            if (language.grammticGenderExceptions && language.grammticGenderExceptions[number]) {
                return language.grammticGenderExceptions[number];
            }

            if (language.unitExceptions[number]) {
                return language.unitExceptions[number];
            }

            if (baseCardinals[number]) {
                return baseCardinals[number];
            }

            return undefined;
        }

        currentNumber = Math.round(Number(currentNumber));
        var unit;

        var baseCardinal = tryGetBaseCardinal(currentNumber);

        if (baseCardinal) {
            return baseCardinal;
        }

        if (currentNumber < 100) {
            return handleSmallerThan100(currentNumber, unit, baseCardinals);
        }

        var result = [];

        function handleGreaterThan1000() {

            function handleLeastSignificantNumbers(leastSignificantNumbers) {                
                if (leastSignificantNumbers) {
                    if (!(language.andException && language.andException[10])
                    ) {
                        result.push(convert(leastSignificantNumbers));
                    } else {
                        result.push(language.unitSeparator + convert(leastSignificantNumbers));
                    }
                    //continue without the lease significant numbers
                    currentNumber -= leastSignificantNumbers;
                }
            }

            function shouldUseUnitBase(unit, number) {
                return number && ((unit.useBaseInstead && !unit.useBaseException.indexOf(number) > -1) ||
                    (unit.useBaseUnits && unit.useBaseUnits.indexOf(number) > -1));
            }

            function calculateReminder(scaleIndex) {
                var reminder = Math.floor(currentNumber / scale[scaleIndex]);
                if (scaleIndex === 0) {
                    return reminder % 10;
                } else {
                    return reminder % 1000;
                }
            }

            function getUnitName(unit, reminder) {
                if (typeof unit === 'string') {
                    return unit;
                }
                else {
                    return reminder > 1 && unit.plural && (!unit.avoidInNumberPlural) ? unit.plural : unit.singular;
                }
            }

            function convertUnit(unit, unitNumber, currentScale) {

                function getUnitLiteralNumber() {
                    var exception = language.unitExceptions[unitNumber];
                    return exception || convert(unitNumber, Object.assign({
                        // Languages with and exceptions need to set `noAnd` to false
                        noAnd: !language.withAnd
                    }));
                }

                function convertByUnitName(unit, unitNumber, result) {

                    var unitName = getUnitName(unit, unitNumber);

                    if (unit.avoidPrefixException && unit.avoidPrefixException.indexOf(unitNumber) > -1) {
                        result.push(unitName);
                    }
                    else if (unit.replacePrefixException && unit.replacePrefixException.hasOwnProperty(unitNumber)) {
                        result.push(unit.replacePrefixException[unitNumber] + ' ' + unitName);
                    }
                    else {
                        var unitLiteralNumber = getUnitLiteralNumber(unitNumber);
                        result.push(unitLiteralNumber + ' ' + unitName);
                    }
                }

                if (!unitNumber) {
                    return;
                }

                if (shouldUseUnitBase(unit, unitNumber)) {
                    result.push(baseCardinals[unitNumber * currentScale]);
                }
                else {
                    convertByUnitName(unit, unitNumber, result);
                }
            }

            var leastSignificantNumbers = currentNumber % 100;

            handleLeastSignificantNumbers(leastSignificantNumbers);

            for (var i = 0, len = language.units.length; i < len; i++) {
                var reminder = calculateReminder(i);
                convertUnit(language.units[i], reminder, scale[i]);
            }
        }

        handleGreaterThan1000();
        var a= result.reverse().join(' ').toString();
        
        return result.join(' ').toString();
    }
    // start the recursive conversion
    return convert(number);
}
/* eslint-enable no-magic-numbers */
var literalNumbers =  {
    convertNumber: convertNumber,
    defaults: defaults
};


