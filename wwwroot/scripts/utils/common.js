(function (moduleDependency, utils, $, moment) {
    // validate the passed module dependencies
    if (!moduleDependency) {
        throw new Error("The app.validations.moduleDepency dependency is missing!");
    }
    moduleDependency.common(utils, $, moment);

    // Exposed common helpers
    utils.common = function () {
        // parse asp.net json date
        var formatDate = function (date) {
            return moment(date).format("MM/DD/YYYY");
        },
            formatMoney = function (number, places) {
                return "$" + number.toFixed(places || 2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            },
            removeFileExtension = function (file) {
                return file.substr(0, file.lastIndexOf("."));
            },
            // gets the parent row of an html tag that's inside a table row
            getParentRow = function (caller) {
                return $(caller).parents("tr:first");
            },
            download = function (docUrl) {
                window.open(docUrl);
            },
            isNumber = function (value) {
                return !isNaN(value);
            },
            checkMaxDecimalPlaces = function (input, maxPlaces) {
                if (!input && input !== 0) {
                    throw new Error("The checkMaxDecimalPlaces's input cannot be null or undefined!");
                }
                if (isNaN(input)) {
                    throw new Error("The checkMaxDecimalPlaces's input must be a number!");
                }

                var index = -1;

                maxPlaces = maxPlaces || 2;

                if (input > 0) {
                    input = input.toString();
                    index = input.indexOf(".");

                    if (index !== "-1") {
                        input = input.substr(index + 1);
                        if (input.length > maxPlaces) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            },
            objSize = function (obj) {
                var size = 0,
                    key;

                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }

                return size;
            },
            getObjProps = function (obj) {
                var key,
                    props = [];

                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        props.push(key);
                    }
                }

                return props;
            },
            getBaseURL = function () {
                var baseUrl = window.location.href + "/";

                return baseUrl;
            },
            getAjaxBaseUrl = function () {
                //var regex = new RegExp(/^.*\//);
                //var ajaxBaseUrl = regex.exec(window.location.host)[0];
                var ajaxBaseUrl = window.location.origin + "/";
                console.log("common ajaxBaseUrl: ", ajaxBaseUrl);
                return ajaxBaseUrl;
            },
            hasScrollbar = function () {
                // The Modern solution
                if (typeof window.innerWidth === 'number')
                    return window.innerWidth > document.documentElement.clientWidth;

                // rootElem for quirksmode
                var rootElem = document.documentElement || document.body;

                // Check overflow style property on body for fauxscrollbars
                var overflowStyle;

                if (typeof rootElem.currentStyle !== 'undefined')
                    overflowStyle = rootElem.currentStyle.overflow;

                overflowStyle = overflowStyle || window.getComputedStyle(rootElem, '').overflow;

                // Also need to check the Y axis overflow
                var overflowYStyle;

                if (typeof rootElem.currentStyle !== 'undefined')
                    overflowYStyle = rootElem.currentStyle.overflowY;

                overflowYStyle = overflowYStyle || window.getComputedStyle(rootElem, '').overflowY;

                var contentOverflows = rootElem.scrollHeight > rootElem.clientHeight;
                var overflowShown = /^(visible|auto)$/.test(overflowStyle) || /^(visible|auto)$/.test(overflowYStyle);
                var alwaysShowScroll = overflowStyle === 'scroll' || overflowYStyle === 'scroll';

                return (contentOverflows && overflowShown) || alwaysShowScroll;
            },
            getCookieValue = function (cookieName) {
                var pattern = new RegExp('[; ]' + cookieName + '=([^\\s;]*)');
                var match = (' ' + document.cookie).match(pattern);

                if (cookieName && match) {
                    return unescape(match[1]);
                }

                return '';
            },
            setCookieValue = function (cookieName, cookieValue) {
                document.cookie = cookieName + "=" + cookieValue + "; expires=Mon, 01 Jan 2099 12:00:00 UTC; path=/;";
            };

        return {
            formatDate: formatDate,
            formatMoney: formatMoney,
            removeFileExtension: removeFileExtension,
            getParentRow: getParentRow,
            download: download,
            isNumber: isNumber,
            checkMaxDecimalPlaces: checkMaxDecimalPlaces,
            objSize: objSize,
            getObjProps: getObjProps,
            getBaseURL: getBaseURL,
            getAjaxBaseUrl: getAjaxBaseUrl,
            hasScrollbar: hasScrollbar,
            getCookieValue: getCookieValue,
            setCookieValue: setCookieValue
        };

    }();

    // JS depandencies: app.validations.moduleDependency, app.common, jQuery, moment
}(app.validations.moduleDependency, app.utils, jQuery, moment));