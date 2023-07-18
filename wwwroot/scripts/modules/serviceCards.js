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
        var initDom = function (serviceCard) {

            gl.dom.$body = $("body");
            gl.dom.$serviceCards = $("#serviceCards");
            gl.dom.$serviceCard = $("#" + (serviceCard || "serviceCard"));
            gl.dom.$subServiceCard = $("#subServiceCard");

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

            gl.helper.retrieveServiceCardModal = function (id, requestUrl, caller) {
                ajax.getAsync(requestUrl, { 'id': id }, false, 
                    function (serviceCategories) {
                        gl.dom.$body.addClass("scroll-off");
                        gl.dom.$serviceCard.html(serviceCategories);

                        setTimeout(function() { gl.dom.$serviceCard.find("#mainService").addClass("show"); }, 500);
                        
                        gl.variable.modalsOpened++;
                        // Set accessibility to modal one
                        app.modules.accessibility.modalOne();
                        // Clear loader timeout
                        clearTimeout(gl.variable.loaderTimeout);
                        if(gl.variable.loaderTimeoutFlag) {
                            caller.removeClass("loader");
                        }
                    }, 
                    function () {
                        alert("Retrieving service card information failed.");
                    }
                );

            };

            gl.helper.retrieveSubServiceCardModal = function (id, requestUrl) {
    ajax.getAsync(requestUrl, { 'id': id }, false, 
        function (data) {
            gl.dom.$body.addClass("scroll-off");
            gl.dom.$subServiceCard.html(data);
            setTimeout(function() { 
                gl.dom.$subServiceCard.find("#subService").addClass("show"); 
                // Call the function again after new content has been added
                //gl.helper.retrieveSubServiceCardModal(id, requestUrl);
            }, 500);
            gl.variable.modalsOpened++;
            // Set accessibility to modal two
            app.modules.accessibility.modalTwo();
        }, 
        function () {
            alert("Retrieving sub-service card information failed.");
        }
    );
};


        },
        // Initialize any variables
        initVariable = function () {

            gl.variable.modalsOpened = 0;
            gl.variable.loaderTimeout = null;
            gl.variable.loaderTimeoutFlag = false;

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

            // Event handler cleanup because "Service Cards (Section Item)" template
            // calls the init function of the module as well, which happens to be a second call of init
            gl.dom.$serviceCards.off("click");
            gl.dom.$serviceCard.off("click");
            gl.dom.$subServiceCard.off("click");

            gl.dom.$serviceCards.on("click", ".btn", function (e) {
                e.preventDefault();
                
                var id = $(e.target).attr('id');
                var requestUrl = $(e.target).data('request-url');
                var $this = $(this);

                // Display loader if retrieving service card modal takes longer than .5 sec,
                // otherwise don't show it at all
                gl.variable.loaderTimeout = setTimeout(function() {
                    $this.addClass("loader");
                    gl.variable.loaderTimeoutFlag = true;
                }, 500);

                gl.helper.retrieveServiceCardModal(id, requestUrl, $this);
            });

            gl.dom.$serviceCard.on("click", ".js-go-back > a", function (e) {
                e.preventDefault();
                
                gl.dom.$serviceCard.find("#mainService").removeClass("show");
                gl.variable.modalsOpened--;
                gl.dom.$body.removeClass("scroll-off");
                // Set accessibility to no modal
                app.modules.accessibility.noModal();
                
                return false;
            });

            gl.dom.$serviceCard.on("click", ".js-sub-service-link > a", function (e) {
                e.preventDefault();
                
                var id = $(e.target).attr('id');
                var requestUrl = $(e.target).data('request-url');
                
                gl.helper.retrieveSubServiceCardModal(id, requestUrl);

                return false;
            });

            gl.dom.$subServiceCard.on("click", ".js-go-back > a", function (e) {
                e.preventDefault();
                
                gl.dom.$subServiceCard.find("#subService").removeClass("show");
                gl.variable.modalsOpened--;
                if(!gl.variable.modalsOpened > 0) {
                    gl.dom.$body.removeClass("scroll-off");
                }
                // Set accessibility to modal one
                app.modules.accessibility.modalOne();

                return false;
            });

        },
        // Initialize any delayed functions
        initDelayedCallables = function () {

            //gl.helper.nameOfHelperFunction();

        },
        init = function (serviceCard) {

            initDom(serviceCard);
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
        // Expose service cards module
        app.modules.serviceCards = module;

    });

    // JS dependencies: app.data.ajax, app.utils.alerts, app.utils.dialog, app.utils.common, app.utils.templates, jQuery, jQuery Templates
    // Note: Only one jQuery dependency is injected for both jQuery & jQuery Templates since jQuery Templates extends jQuery
    //       In addition to the jQuery dependencies, jquery.form.min.js is loaded as well
}(app.data.ajax, app.utils.alerts, app.utils.dialog, app.utils.common, app.utils.templates, jQuery));