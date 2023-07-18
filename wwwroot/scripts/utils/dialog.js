(function (moduleDependency, utils, $) {
    // validate the passed module dependencies
    if (!moduleDependency) {
        throw new Error("The app.validations.moduleDepency dependency is missing!");
    }
    moduleDependency.dialog(utils, $);

    utils.dialog = function () {
        // cache DOM vars
        // note: since they're wrapped in a module,
        // they act as singleton variables
        var _$container,
            _containerId = "__empty",
            _callBack;

        var _base = function (id, title, message, callBack) {
            var tmpl = "<div class='dialog'>" +
		                    "<div class='dialog-content'>" +
			                    "<div class='dialog-header'>${title}</div>" +
			                    "<div class='dialog-body'>${message}</div>" +
                                "<div class='dialog-footer'>" +
                                    "<button class='btn btn-success btn-xs btn-yes'><i class='cms-fa fa  fa-check-circle'></i> Yes</button> " +
                                    "<button class='btn btn-danger btn-xs btn-cancel'><i class='cms-fa fa fa-times-circle'></i> No</button>" +
                                "</div>" +
		                    "</div>" +
	                    "</div>";

            _callBack = callBack;

            // cache the dialog container and bind the event handlers
            if (!_$container || _containerId !== id) {
                _containerId = id;
                _$container = $(id);
                _$container.on("click", ".dialog .dialog-footer .btn-cancel", function () {
                    // This creates an interesting squeeze effect
                    //$(_containerId + " .dialog").hide(500);
                    //$(_containerId + " .dialog .dialog-content").animate({ top: -100 });

                    $(_containerId + " .dialog").animate({ height: 0 }, 600);
                    $(_containerId + " .dialog .dialog-content").animate({ top: -100 });
                });
                _$container.on("click", ".dialog .dialog-footer .btn-yes", function () {
                    if (typeof callBack === "function") {
                        _callBack();
                        $(_containerId + " .dialog").animate({ height: 0 }, 600);
                        $(_containerId + " .dialog .dialog-content").animate({ top: -100 });
                    }
                });
            }

            // empty $container before the dialog is appended to it
            _$container.empty();
            var $dialog = $.tmpl(tmpl, { title: title, message: message }),
                $dialogContent = $dialog.find(".dialog-content");

            $dialog.animate({ height: "100%" }, 900);
            $dialogContent.animate({ top: 250 }, 600);

            return _$container.append($dialog);
        },
        show = function (id, title, message, callBack) {
            _base(id, title, message, callBack);
        };

        return {
            show: show
        };
    }();

    // JS depandencies: app.validations.moduleDependency, app.utils, jQuery, jQuery Template
}(app.validations.moduleDependency, app.utils, jQuery));