(function (moduleDependency, appData, $) {
    // validate the passed module dependencies
    if (!moduleDependency) {
        throw new Error("The app.validations.moduleDepency dependency is missing!");
    }
    moduleDependency.ajax(appData, $);

    appData.ajax = function () {
        var base = function (type, async, url, ajaxData, isJSON, successCallback, errorCallBack) {
            $.ajax({
                url: url,
                type: type,
                async: async,
                data: isJSON ? JSON.stringify(ajaxData) : ajaxData,
                contentType: isJSON ? "application/json; charset=utf-8" : "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    successCallback(data);
                },
                error: function (data) {
                    errorCallBack(data);
                }
            });
        },
        getSync = function (url, ajaxData, isJSON, successCallback, errorCallBack) {
            base("GET", false, url, ajaxData, isJSON, successCallback, errorCallBack);
        },
        postSync = function (url, ajaxData, isJSON, successCallback, errorCallBack) {
            base("POST", false, url, ajaxData, isJSON, successCallback, errorCallBack);
        },
        getAsync = function (url, ajaxData, isJSON, successCallback, errorCallBack) {
            base("GET", true, url, ajaxData, isJSON, successCallback, errorCallBack);
        },
        postAsync = function (url, ajaxData, isJSON, successCallback, errorCallBack) {
            base("POST", true, url, ajaxData, isJSON, successCallback, errorCallBack);
        };

        return {
            getSync: getSync,
            postSync: postSync,
            getAsync: getAsync,
            postAsync: postAsync
        };
    }();

    // JS depandencies: app.validations.moduleDependency, app.data, jQuery 
}(app.validations.moduleDependency, app.data, jQuery));