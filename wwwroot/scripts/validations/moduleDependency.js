(function (validations) {

    var DependencyError = function () {
        function DependencyError(message) {
            this.name = 'DependencyError';
            this.message = message || 'Dependency is missing!';
            this.stack = (new Error()).stack;
        }
        DependencyError.prototype = Object.create(Error.prototype);
        DependencyError.prototype.constructor = DependencyError;

        return DependencyError;
    }();

    if (!validations) {
        throw new DependencyError("The app.validations dependency is missing!");
    }

    var _validate = function () {
        var data = function (data) {
            if (!data) {
                throw new DependencyError("The app.data dependency is missing!");
            }
        },
        utils = function () {
            if (!utils) {
                throw new DependencyError("The app.utils dependency is missing!");
            }
        },
        jQuery = function () {
            if (!$) {
                throw new DependencyError("The jQuery dependency is missing!");
            }
        },
        moment = function () {
            if (!moment) {
                throw new DependencyError("The moment dependency is missing!");
            }
        };

        return {
            data: data,
            utils: utils,
            jQuery: jQuery,
            moment: moment,
        };
    }();

    app.validations.moduleDependency = function () {
        var ajax = function (data, $) {
            _validate.data(data);
            _validate.jQuery($);
        },
        alerts = function (utils, $) {
            _validate.utils(utils);
            _validate.jQuery($);
        },
        dialog = function (utils, $) {
            _validate.utils(utils);
            _validate.jQuery($);
        },
        common = function (utils, $, moment) {
            _validate.utils(utils);
            _validate.jQuery($);
            _validate.moment(moment);
        },
        controlReordering = function (utils, $) {
            _validate.utils(utils);
            _validate.jQuery($);
        };

        return {
            ajax: ajax,
            alerts: alerts,
            dialog: dialog,
            common: common,
            controlReordering: controlReordering
        };
    }();

    // JS depandencies: app.validations
}(app.validations));