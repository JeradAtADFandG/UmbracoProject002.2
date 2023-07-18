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

            gl.dom.$header = $("#header");
            gl.dom.$main = $("#main");
            gl.dom.$footer = $("#footer");
            gl.dom.$serviceCard = $("#serviceCard");
            gl.dom.$subServiceCard = $("#subServiceCard");
            gl.dom.$alertWidget = $("#tabControl_AlertContactUs");

            // Debugger Utility logs current focus as you tab through site
            $(document).keyup(function(){})
            $(":focus").css({"border": "1px solid #06b6de"});

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

            // Default: NoModal
            gl.helper.noModal = function () {
                // Expose non-interactive content from the accessibility API
                gl.dom.$header.attr('aria-hidden', 'false');
                gl.dom.$main.attr('aria-hidden', 'false');
                gl.dom.$footer.attr('aria-hidden', 'false');
                gl.dom.$alertWidget.attr('aria-hidden', 'false');
                // Hide non-interactive content from the accessibility API
                gl.dom.$serviceCard.attr('aria-hidden', 'true');
                gl.dom.$serviceCard.attr('tabindex', -1);
                gl.dom.$serviceCard.find('a').attr('tabindex', -1);
                gl.dom.$serviceCard.find('.focus-loop').attr('tabindex', -1);
                gl.dom.$subServiceCard.attr('aria-hidden', 'true');
                gl.dom.$subServiceCard.attr('tabindex', -1);
                gl.dom.$subServiceCard.find('a').attr('tabindex', -1);
                gl.dom.$subServiceCard.find('.focus-loop').attr('tabindex', -1);
                // Set focus
                if(gl.variable.focusNoModal) { 
                    gl.variable.focusNoModal.focus();
                    gl.variable.focusNoModal = null;
                }
            };

            // Show Service Modal: ModalOne
            gl.helper.modalOne = function () {
                // Capture focus
                if(!gl.variable.focusNoModal) {
                    gl.variable.focusNoModal = $(document.activeElement);
                }

                // Hide non-interactive content from the accessibility API
                gl.dom.$header.attr('aria-hidden', 'true');
                gl.dom.$main.attr('aria-hidden', 'true');
                gl.dom.$footer.attr('aria-hidden', 'true');
                gl.dom.$alertWidget.attr('aria-hidden', 'true');
                gl.dom.$subServiceCard.attr('aria-hidden', 'true');
                // Show non-interactive content from the accessibility API
                gl.dom.$serviceCard.attr('aria-hidden', 'false');
                // Set focus
                if(gl.variable.focusInModalOne) {
                    gl.variable.focusInModalOne.focus();
                    gl.variable.focusInModalOne = null;
                } else {
                    gl.dom.$serviceCard.find('.js-mainServiceTitle').attr('tabindex', 0).focus();
                }
                // Bounce Focus  
                $('a.focusLoop').focusin(function() {
                    // Give Go-Back button focus
                    gl.dom.$serviceCard.find(".js-go-back > a").focus();
                });
            };

            // Show Sub-Service Modal: ModalTwo
            gl.helper.modalTwo = function () {
                // Capture focus modal one
                gl.variable.focusInModalOne = $(document.activeElement);
                // Hide non-interactive content from the accessibility API
                gl.dom.$serviceCard.attr('aria-hidden', 'true');
                // Show non-interactive content from the accessibility API
                gl.dom.$subServiceCard.attr('aria-hidden', 'false');
                // Set focus
                gl.dom.$subServiceCard.find('.js-subServiceTitle').attr('tabindex', 0).focus();
                // Bounce Focus
                $('a.focusLoop').focusin(function() {
                    // Give Go-Back button focus
                    gl.dom.$subServiceCard.find(".js-go-back > a").focus();
                });
            };

        },
        // Initialize any variables
        initVariable = function () {

            gl.variable.focusNoModal = null;
            gl.variable.focusInModalOne = null;

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

        },
        // Public functions
        noModal = function() {
            gl.helper.noModal();
        },
        modalOne = function() {
            gl.helper.modalOne();
        },
        modalTwo = function() {
            gl.helper.modalTwo();
        };


        /*
         * Expose any of the module's methods and/or properties
         */
        return {
            init: init,
            noModal: noModal,
            modalOne: modalOne,
            modalTwo: modalTwo,
        };

    }();

    /*
     * Initiate module(s) on jQuery document ready
     */
    $(function () {

        module.init();
        // Call no modal as this is the default accessibility option
        module.noModal();
        // Expose accessibility module
        app.modules.accessibility = module;

    });

    // JS dependencies: app.data.ajax, app.utils.alerts, app.utils.dialog, app.utils.common, app.utils.templates, jQuery, jQuery Templates
    // Note: Only one jQuery dependency is injected for both jQuery & jQuery Templates since jQuery Templates extends jQuery
    //       In addition to the jQuery dependencies, jquery.form.min.js is loaded as well
}(app.data.ajax, app.utils.alerts, app.utils.dialog, app.utils.common, app.utils.templates, jQuery));