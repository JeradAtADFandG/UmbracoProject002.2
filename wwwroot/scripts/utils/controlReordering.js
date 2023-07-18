(function (moduleDependency, utils, $) {
    // validate the passed module dependencies
    if (!moduleDependency) {
        throw new Error("The app.validations.moduleDepency dependency is missing!");
    }
    moduleDependency.controlReordering(utils, $);

    utils.controlReordering = function () {
        
        // internal global module object
        var _gl = {};

        var init = function (config) {
            _gl.config = config;
            _cacheDOM();
            _initSortable();
            _initPrivateHelpers();
            _controlReordering();
            _eventHandlerBinding();
            _renderControls();
        },
        _cacheDOM = function () {
            _gl.$rows = $(_gl.config.rowTarget);
            _gl.$sortable = $(_gl.config.sortableTarget);
            _gl.$sortableOptions = $(_gl.config.sortableOptionTarget);
        },
        _initSortable = function () {
            _gl.$sortable.sortable({
                cursor: "move",
                delay: 150,
                stop: function (event, ui) {
                    _gl.setControlOrder();
                }
            });
        },
        _initPrivateHelpers = function () {
            _gl.setControlOrder = function () {
                var controls = _gl.getControlLabels();
                // store user preference in localStorage
                localStorage.setItem("ControlOrder", controls);
            };

            _gl.getControlLabels = function () {
                var controlLabels = [];

                // jQuery all rows each time a control is re-ordered,
                // so that re-ordering works properly
                // do not use _gl.$rows here
                $(_gl.config.rowTarget).each(function (i, item) {
                    var label = $(item).find(_gl.config.lableTarget).text();
                    controlLabels.push(label);
                });

                return controlLabels;
            };

            _gl.getControlOrder = function () {
                var controls = localStorage.getItem("ControlOrder");

                if (controls) {
                    return controls;
                } else {
                    return _gl.getControlLabels();
                }
            };
        },
        // disable or enable control reording based on user preference
        _controlReordering = function () {
            var userPreference = localStorage.getItem("ControlReordering") || false;

            if (userPreference === "true") {
                _gl.$rows.removeClass("sortable-enabled").addClass("sortable-disabled");
                _gl.$sortable.sortable("disable");

            } else {
                _gl.$rows.removeClass("sortable-disabled").addClass("sortable-enabled");
                _gl.$sortable.sortable("enable");
            }

            _gl.$sortableOptions.each(function (i, item) {
                $(item).prop("checked", userPreference === "true");
            });
        },
        _eventHandlerBinding = function () {
            // allow users to enable and disable the re-ordering of the form controls
            _gl.$sortable.on("click", ".sortable-option", function () {
                if (this.checked) {
                    _gl.$rows.removeClass("sortable-enabled").addClass("sortable-disabled");
                    _gl.$sortable.sortable("disable");
                    checkBox(true);
                } else {
                    _gl.$rows.removeClass("sortable-disabled").addClass("sortable-enabled");
                    _gl.$sortable.sortable("enable");
                    checkBox(false);
                }

                function checkBox(isChecked) {
                    _gl.$sortableOptions.each(function (i, item) {
                        $(item).prop("checked", isChecked);
                    });

                    // save user preference to localStorage
                    localStorage.setItem("ControlReordering", isChecked);
                }
            });
        },
        _renderControls = function () {
            var controls = _gl.getControlOrder(),
                label,
                i = 0;

            _gl.$sortable.empty();

            if (typeof controls === "string") {
                controls = controls.split(",");
            }

            for (; i < controls.length; i += 1) {
                _gl.$rows.each(function (j, item) {
                    label = $(item).find(_gl.config.lableTarget).text();
                    if (controls[i] === label) {
                        _gl.$sortable.append(item);
                    }
                });
            }
        };

        return {
            init: init
        };

    }();

    // JS depandencies: app.validations.moduleDependency, app.utils, jQuery 
}(app.validations.moduleDependency, app.utils, jQuery));