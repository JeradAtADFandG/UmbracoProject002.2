// Encapsulate module(s) code in IIFE
(function (ajax, alerts, dialog, common, templates, $) {
    "use strict";

    /*
     * Beginning of IIFE module
     */
    var module = function () {

        /*
         * Define a global object to which methods and variables will be attached,
         * so that they are easily shared within the module
         */
        var gl = {
            dom: {},
            config: {},
            mapping: {},
            variable: {},
            control: {},
            helper: {}
        };

        /*
         * Logical structure of the module
         */

        // Cache any jQuery DOM elements
        var initDom = function () {

            //gl.dom.$htmlTagIdName = $("#htmlTagIdName");

        },
        // Initialize any configurations
        initConfig = function () {

            //gl.config.nameOfControl = {
            //};

        },
        // Initialize any mappings
        initMapping = function () {

            //gl.mapping.nameOfModel = function (model) {
            //};

        },
        // Initialize any helper methods
        initHelper = function () {

            //gl.helper.nameOfHelperFunction = function () {
            //};

        },
        // Initialize any variables
        initVariable = function () {

            //gl.variable.nameOfVariable = {
            //};

        },
        // Initialize any custom controls
        initControls = function () {

            //gl.control.nameOfControl = (function () {
            //    // IIFE specific pattern for jQuery extension controls
            //    return gl.dom.$htmlTagIdName.nameOfControl(gl.config.nameOfControl);
            //}());

        },
        // Initialize any jQuery event handlers
        initEventHandler = function () {

            //gl.dom.$htmlTagIdName.on("click", function () {
            //});

        },
        // Initialize any delayed functions
        initDelayedCallables = function () {

            //gl.helper.nameOfHelperFunction();

        },
        init = function () {

            initDom();
            initConfig();
            initMapping();
            initHelper();
            initVariable();
            initControls();
            initEventHandler();
            initDelayedCallables();

        };

        /*
         * Expose any of the module's methods and/or properties
         */
        return {
            init: init
        };

    }();

    /*
     * Initiate module(s) on jQuery document ready
     */
    $(function () {

        module.init();

    });

    // JS dependencies: app.data.ajax, app.utils.alerts, app.utils.dialog, app.utils.common, app.utils.templates, jQuery, jQuery Templates
    // Note: Only one jQuery dependency is injected for both jQuery & jQuery Templates since jQuery Templates extends jQuery
    //       In addition to the jQuery dependencies, jquery.form.min.js is loaded as well
}(app.data.ajax, app.utils.alerts, app.utils.dialog, app.utils.common, app.utils.templates, jQuery));