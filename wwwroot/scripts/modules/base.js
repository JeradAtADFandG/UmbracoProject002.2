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

            gl.dom.$tabControl = $("#tabControl_AlertContactUs");
            gl.dom.$alert = gl.dom.$tabControl.find("a");
            gl.dom.$tabs = gl.dom.$tabControl.find(".js-tabs");
            gl.dom.$tabsBtn = gl.dom.$tabControl.find(".js-tab-btn");
            gl.dom.$tabBtnAlerts = gl.dom.$tabControl.find("#tabBtnAlerts span");
            gl.dom.$tabsContent = gl.dom.$tabControl.find(".js-tab-content");
            gl.dom.$txtBoxEmailAddress = gl.dom.$tabControl.find("#txtBox_EmailAddress");
            gl.dom.$txtAreaEmailBody = gl.dom.$tabControl.find("#txtArea_EmailBody");
            gl.dom.$btnEmailSend = gl.dom.$tabControl.find("#btn_EmailSend");
            gl.dom.$__RequestVerificationToken = gl.dom.$tabControl.find("input[type=hidden]");

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

            gl.helper.showTab = function (tabId) {
                gl.dom.$tabsBtn.removeClass("active");
                gl.dom.$tabsContent.removeClass("show");
                $("#" + tabId).addClass("show");
            };

            gl.helper.cookieMaintenance = function () {
                // Get existing cookies starting with 'alert_'
                var cookies = document.cookie.match(new RegExp('(alert_[a-z0-9]+)', 'gi'));

                if (cookies && cookies.length > 1) {
                    for (var i = 0; i < cookies.length; i++) {
                        // Delete any cookie with a name different from alertCookie
                        if (gl.variable.alertCookie !== cookies[i]) {
                            document.cookie = cookies[i] + "=; expires=Mon, 01 Jan 1999 00:00:00 UTC; path=/;";
                        }
                    }
                }
            };

            gl.helper.alertPulsate = function () {
                // Read current cookie value for current alert
                var cookieValue = common.getCookieValue(gl.variable.alertCookie);

                // If value is empty or null
                if (!cookieValue) {
                    common.setCookieValue(gl.variable.alertCookie, "not-visited");
                }

                // Add 'pulsate' class to alert if the user has not clicked the alert link
                if (!cookieValue || cookieValue === "not-visited") {
                    gl.dom.$tabBtnAlerts.addClass("pulsate");
                }
            };

            gl.helper.getSendEmailModel = function () {
                return {
                    __RequestVerificationToken: gl.dom.$__RequestVerificationToken.val(),
                    emailFrom: gl.dom.$txtBoxEmailAddress.val(),
                    emailBody: gl.dom.$txtAreaEmailBody.val()
                };
            };

        },
        // Initialize any variables
        initVariable = function () {

            gl.variable.alertCookie = gl.dom.$alert.attr("id");

            gl.variable.sendEmailEndpoint = common.getAjaxBaseUrl() + "Api/SendEmail";

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

            gl.dom.$tabs.on("click", ".js-tab-btn", function () {
                var $this = $(this),
                    tabId = $this.attr("data-tab-id");

                if ($this.hasClass("active")) {
                    $this.removeClass("active");
                    gl.dom.$tabControl.removeClass("show");
                    return;
                }

                gl.helper.showTab(tabId);
                $this.addClass("active");
                gl.dom.$tabControl.addClass("show");
            });

            gl.dom.$alert.on("click", function (e) {
                gl.dom.$tabBtnAlerts.removeClass("pulsate");
                common.setCookieValue(gl.variable.alertCookie, "visited");
            });

            gl.dom.$btnEmailSend.on("click", function (e) {
                e.preventDefault();

                // Call the EmailSend endpoint
                ajax.postAsync(
                    gl.variable.sendEmailEndpoint,
                    gl.helper.getSendEmailModel(),
                    false,
                    function successCallback(data) {
                        if (data === 500 || data === "500") {
                            if (console && console.log) {
                                console.log("500 Error");
                            }
                            return;
                        }

                        gl.dom.$txtBoxEmailAddress.val("");
                        gl.dom.$txtAreaEmailBody.val("");

                        alert("Email has been successfully sent.");
                    },
                    function errorCallBack(data) {
                        if (console && console.log) {
                            console.log(data);
                        }

                        if (data && data.status === 400) {
                            alert(data.responseJSON);

                            $("#tab-contact-us h5").html($.tmpl(templates.validationErrors, data.responseJSON));
                        }
                    }
                );
            });

        },
        // Initialize any delayed functions
        initDelayedCallables = function () {

            gl.helper.cookieMaintenance();

            gl.helper.alertPulsate();

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