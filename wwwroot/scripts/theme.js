$(function () {

    $("#dd_Theme").on('change', function() {
        var theme = $(this).val();
        Cookies.set('theme', theme);
        document.getElementById('theme').setAttribute('href', "./css/" + theme + ".css");
    });
    var themeCookie = Cookies.get('theme');
    if(themeCookie) {
        if(themeCookie !== $("#dd_Theme").val()) {
            $("#dd_Theme").val(themeCookie).change();
        }
    }

}());