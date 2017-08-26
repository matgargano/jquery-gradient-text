/*
 *  gradient-text - v0.0.2
 *  Easily gradientify your text
 *  http://statenweb.com
 *
 *  Made by Mat Gargano
 *  Under MIT License
 */
(function ($, window, document, undefined) {
    "use strict";
    var pluginName = "gradientText",
        defaults = {
            hexMode: true,
            range: null,
            positionOrAngle: "to bottom right",
            percentages: false,
            percentagesArray: false
        };

    function Plugin(element, options) {

        this.element = element;
        this._defaults = defaults;
        this.settings = $.extend({}, defaults, options);
        this._name = pluginName;

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {

        processSettings: function () {
            if (this.settings.percentages) {
                this.settings.percentagesArray = this.settings.percentages.split(",");
            }
        },

        preCheck: function () {

            var required = [

                "positionOrAngle",
                "range"

            ],
                moveOn = true;
            required.forEach(function(required){
                if(!this.settings[required]) {
                    moveOn = false;
                }
            }.bind(this));

            return moveOn;

        },
        init: function () {
            this.extractSettingsFromDataAttributes();
            if ( this.preCheck() ) {
                this.execute();
            }

        },
        extractSettingsFromDataAttributes: function () {

            if ($(this.element).attr("data-gradient-text-range")) {
                this.settings.range = $(this.element).attr("data-gradient-text-range");
            }
            if ($(this.element).attr("data-gradient-text-position")) {
                this.settings.positionOrAngle = $(this.element).attr("data-gradient-text-position");
            }
            if ($(this.element).attr("data-gradient-text-percentages")) {
                this.settings.percentages = $(this.element).attr("data-gradient-text-percentages");
                this.settings.percentagesArray = this.settings.percentages.split(",");
            }

        },
        setUpData: function () {

            this.settings.range = this.settings.range.split(",");
            this.settings.rangeString = this.settings.positionOrAngle + ",";
            this.settings.rangeCount = this.settings.range.length;


            this.settings.interval = parseInt(100 / (this.settings.rangeCount - 1), 10);

            if (!Array.isArray(this.settings.percentagesArray)) {
                this.settings.percentagesArray = [];
                this.settings.range.forEach(function (item, iteration) {
                    this.settings.percentagesArray.push(iteration * this.settings.interval);
                }.bind(this));
            }

            this.settings.percentageCount = this.settings.percentagesArray.length;
        },
        checkIfWeCanRock: function () {
            if (this.settings.percentageCount !== this.settings.rangeCount) {
                throw "You must include " + this.settings.rangeCount + " percentages, you have included " + this.settings.percentageCount;
            }
        },
        execute: function () {


            this.setUpData();
            this.checkIfWeCanRock();

            this.settings.range.forEach(function (item, iteration) {
                var lastIteration = false;
                item = jQuery.trim(item);
                if (iteration + 1 === this.settings.rangeCount) {
                    lastIteration = true;
                }
                if (this.settings.hexMode && item.charAt(0) !== "#") {
                    item = "#" + item;
                }
                this.settings.rangeString += item + " " + this.settings.percentagesArray[iteration] + "%";
                if (!lastIteration) {
                    this.settings.rangeString += ",";
                }
            }.bind(this));
            this.settings.rangeString = "linear-gradient(" + this.settings.rangeString + ")";
            $(this.element).css("background", this.settings.rangeString);
            $(this.element).css("-webkit-background-clip", "text");
            $(this.element).css("-webkit-text-fill-color", "transparent");
        }
    });
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {

                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
    jQuery(document).ready(function ($) {
        $(".gradient-text").gradientText();
    });
}(jQuery, window, document));