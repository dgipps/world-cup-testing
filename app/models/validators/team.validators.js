QUALIFIED_COUNTRIES = [
    'Russia',
    'France',
    'Portugal',
    'Germany',
    'Serbia',
    'Poland',
    'England',
    'Spain',
    'Belgium',
    'Iceland',
    'Brazil',
    'Uruguay',
    'Argentina',
    'Colombia',
    'Nigeria',
    'Senegal',
    'Egypt',
    'Mexico',
    'Costa Rica',
    'Panama',
    'Iran',
    'Japan',
    'South Korea',
    'Saudi Arabia',
    'Switzerland',
    'Italy',
    'Denmark',
    'Croatia',
    'Sweden',
    'Northern Ireland',
    'Greece',
    'Australia',
    'Peru',
    'Morocco',
]

var validateFifaCode = function(val) {
    if (val.length == 3) {
        return true;
    }
    return false;
}

var validateQualifiedCountry = function(val) {
    // stub

    return true;
}

module.exports = {}
module.exports.validateFifaCode = validateFifaCode
module.exports.validateQualifiedCountry = validateQualifiedCountry
