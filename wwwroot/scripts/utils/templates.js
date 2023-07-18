(function (moduleDependency, utils, $) {
    // validate the passed module dependencies
    if (!moduleDependency) {
        throw new Error("The app.validations.moduleDepency dependency is missing!");
    }
    moduleDependency.dialog(utils, $);

    var ajaxBaseUrl = utils.common.getAjaxBaseUrl();
    console.log("templates ajaxBaseUrl:", ajaxBaseUrl);

    var url = ajaxBaseUrl + "scripts/templates/";

    var getTemplate = function (template) {
        var htmlTemplate;
        $.ajax({
            url: url + template,
            type: 'get',
            dataType: 'html',
            async: false,
            success: function (data) {
                htmlTemplate = data;
            }
        });

        return htmlTemplate;
    };

    utils.templates = function () {

        var mainService = getTemplate("main-service.html"),
            subService = getTemplate("sub-service.html");

        return {
            mainService: mainService,
            subService: subService
        };
    }();

    // JS depandencies: app.validations.moduleDependency, app.utils, jQuery, jQuery Template
}(app.validations.moduleDependency, app.utils, jQuery));
