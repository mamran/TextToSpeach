var he;
const language =  {
    'baseSeparator': ' ו ',
    'unitSeparator': ' ו ',
    'withAnd': true,
    'base': {
        '0': 'אפס',
        '1': 'אחד',
        '2': 'שניים',
        '3': 'שלושה',
        '4': 'ארבעה',
        '5': 'חמישה',
        '6': 'ששה',
        '7': 'שבעה',
        '8': 'שמונה',
        '9': 'תשעה',
        '10': 'עשרה',
        '11': 'אחד עשר',
        '12': 'שנים עשר',
        '13': 'שלושה עשר',
        '14': 'ארבעה עשר',
        '15': 'חמשה עשר',
        '16': 'ששה עשר',
        '17': 'שבעה עשר',
        '18': 'שמונה עשר',
        '19': 'תשעה עשר',
        '20': 'עשרים',
        '30': 'שלושים',
        '40': 'ארבעים',
        '50': 'חמישים',
        '60': 'ששים',
        '70': 'שבעים',
        '80': 'שמונים',
        '90': 'תשעים',
        '100': 'מאה',
        '200': 'מאתיים',
        '300': 'שלש מאות',
        '400': 'ארבע מאות',
        '500': 'חמש מאות',
        '600': 'שש מאות',
        '700': 'שבע מאות',
        '800': 'שמונה מאות',
        '900': 'תשע מאות',
        '2000': 'אלפיים',
        '3000': 'שלשת אלפים',
        '4000': 'ארבעת אלפים',
        '5000': 'חמשת אלפים',
        '6000': 'ששת אלפים',
        '7000': 'שבעת אלפים',
        '8000': 'שמונת אלפים',
        '9000': 'תשעת אלפים',
        '10000': 'עשרת אלפים',
        '100000': 'מאה אלף'
    },
    'units': [
        {
            'singular': 'מאה',
            'plural': 'מאות',
            'avoidPrefixException': [1],
            'useBaseInstead': true,
            'useBaseException': []
        },
        {
            'singular': 'אלף',
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
        '1': 'אחת',
        '2': 'שתיים',
        '3': 'שלש',
        '4': 'ארבע',
        '5': 'חמש',
        '6': 'שש',
        '7': 'שבע',
        '8': 'שמונה',
        '9': 'תשע',
        '10': 'עשר',
        '11': 'אחת עשרה',
        '12': 'שתים עשרה',
        '13': 'שלש עשרה',
        '14': 'ארבע עשרה',
        '15': 'חמש עשרה',
        '16': 'שש עשרה',
        '17': 'שבע עשרה',
        '18': 'שמונה עשרה',
        '19': 'תשע עשרה'
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
                return baseCardinals[dec] + language.baseSeparator + convert(unit);
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

        return result.reverse().join(' ');
    }
    // start the recursive conversion
    return convert(number);
}
/* eslint-enable no-magic-numbers */
const literalNumbers =  {
    convertNumber: convertNumber,
    defaults: defaults
};


