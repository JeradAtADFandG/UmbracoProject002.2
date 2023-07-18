// START High Contrast Cookie
var hcCookie = Cookies.get('highContrast');

if (hcCookie === 'true') {
    currentHcSetting();
} 

function currentHcSetting() {
    hcCookie = Cookies.get('highContrast');
    if(hcCookie === 'true') {
        document.getElementById('highContrast').setAttribute('href', "https://webcontent.alaska.gov/style/oit/2.1/css/build/high-contrast.min.css");
    }
    if (hcCookie === 'false') {
        document.getElementById('highContrast').setAttribute('href', "");
    }
}

function highContrast() {
    hcCookie = Cookies.get('highContrast');
    if(hcCookie === 'true') {
        document.getElementById('highContrast').setAttribute('href', "");
        Cookies.set('highContrast', 'false');
    } else if (hcCookie === 'false') {
        document.getElementById('highContrast').setAttribute('href', "https://webcontent.alaska.gov/style/oit/2.1/css/build/high-contrast.min.css");
        Cookies.set('highContrast', 'true');
    } else {
        Cookies.set('highContrast', 'true');
        document.getElementById('highContrast').setAttribute('href', "https://webcontent.alaska.gov/style/oit/2.1/css/build/high-contrast.min.css");
    }
}
// END High Contrast Cookie