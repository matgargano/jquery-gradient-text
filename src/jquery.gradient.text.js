;(function ($, window, document, undefined) {

    "use strict";

    var pluginName = "gradientText",
        defaults = {
            hexMode: true,
            range: null,
            degrees: '330',
            percentages: false,

        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {


            this.execute();

        },
        setSettings: function () {
            if ($(this.element).attr('data-range')) {
                this.settings.range = $(this.element).attr('data-range');

            }

            if ($(this.element).attr('data-degrees')) {
                this.settings.degrees = $(this.element).attr('data-degrees');
            }

            if ($(this.element).attr('data-percentages')) {
                this.settings.percentages = $(this.element).attr('data-percentages');
            }

            this.settings.degrees = this.settings.degrees.toString().replace('deg', '');
        },

        setUpData: function () {

            this.settings.range = this.settings.range.split(",");
            this.settings.rangeString = this.settings.degrees + 'deg,';
            this.settings.rangeCount = this.settings.range.length;

            if (!this.settings.percentages) {
                this.settings.interval = parseInt(100 / (this.settings.rangeCount - 1), 10);
                this.settings.percentages = [];
                this.settings.range.forEach(function (item, iteration) {
                    this.settings.percentages.push(iteration * this.settings.interval);
                }.bind(this));
            } else {

                this.settings.percentages = this.settings.percentages.split(",");

            }

            this.settings.percentageCount = this.settings.percentages.length;


        },
        checkIfWeCanRock: function () {

            if (this.settings.percentageCount !== this.settings.rangeCount) {
                throw 'You must include ' + this.settings.rangeCount + ' percentages, you have included ' + this.settings.percentageCount;
            }


        },
        execute: function () {
            this.setSettings();
            this.setUpData();
            this.checkIfWeCanRock();

            this.settings.range.forEach(function (item, iteration) {
                var lastIteration = false;
                if (iteration + 1 === this.settings.rangeCount) {
                    lastIteration = true;
                }

                if (this.settings.hexMode && item.charAt(0) !== "#") {
                    item = "#" + item;
                }

                this.settings.rangeString += item + " " + this.settings.percentages[iteration] + "%";
                if (!lastIteration) {
                    this.settings.rangeString += ",";
                }
            }.bind(this));
            this.settings.rangeString = "linear-gradient(" + this.settings.rangeString + ")";
            $(this.element).css("background", this.settings.rangeString);
            $(this.element).css("-webkit-background-clip", 'text');
            $(this.element).css("-webkit-text-fill-color", 'transparent');

        }
    });


    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
