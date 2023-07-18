(function (moduleDependency, utils, $) {
    // validate the passed module dependencies
    if (!moduleDependency) {
        throw new Error("The app.validations.moduleDepency dependency is missing!");
    }
    moduleDependency.alerts(utils, $);

    utils.alerts = function () {
        // cache DOM vars
        // note: since they're wrapped in a module,
        // they act as singleton variables
        var _$container,
            _containerId = "__empty";

        var _base = function (id, message, type, iconHtml) {
            var tmpl = "<div class='message ${type}'>" +
                            "<div class='text'>{{html iconHtml}} &nbsp;${message}</div>" +
                            "<div class='close'><i class='fa fa-close'></i></div>" +
                        "</div>";

            // cache the new alert container
            if (!_$container || _containerId !== id) {
                _containerId = id;
                _$container = $(id);
                _$container.on("click", ".close", function () {
                    $(this).parent().remove();
                });
            }

            // empty $container before the alert is appended to it
            //_$container.empty();

            if (type === "danger") {
                return _$container.append($($.tmpl(tmpl, { message: message, type: type, iconHtml: iconHtml })).fadeIn(500));
            }

            return _$container.append($($.tmpl(tmpl, { message: message, type: type, iconHtml: iconHtml })).fadeIn(500).delay(4000).fadeOut(500, function() {
                $(this).remove();
            }));
        },
        info = function (id, message) {
            _base(id, message, "info", "<i class='fa fa-info-circle'></i>");
        },
        danger = function (id, message) {
            _base(id, message, "danger", "<i class='fa fa-bug'></i>");
        },
        warning = function (id, message) {
            _base(id, message, "warning", "<i class='fa fa-warning'></i>");
        },
        success = function (id, message) {
            _base(id, message, "success", "<i class='fa fa-check-circle'></i>");
        },
        clear = function (id) {
            // empty the current container if the id passed
            // matches the _containerId, otherwise jQuery 
            // the container and empty it
            if (id === _containerId) {
                $container.empty();
            } else {
                $(id).empty();
            }
        };

        return {
            info: info,
            danger: danger,
            warning: warning,
            success: success,
            clear: clear
        };
    }();

    // JS depandencies: app.validations.moduleDependency, app.utils, jQuery, jQuery UI, jQuery Template
}(app.validations.moduleDependency, app.utils, jQuery));