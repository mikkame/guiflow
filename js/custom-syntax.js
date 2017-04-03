require('ace-min-noconflict');
ace.define('ace/mode/guiflow', function(require, exports, module) {
    console.log('loaded');
    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var GuiFlowHighlightRules = require("ace/mode/guiflow_rules").GuiFlowHighlightRules;

    var Mode = function() {
        this.HighlightRules = GuiFlowHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    exports.Mode = Mode;
});

ace.define('ace/mode/guiflow_rules', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var GuiFlowHighlightRules = function() {

        var varWordMapper = this.createKeywordMapper({},
            "invalid",
            false,
            " "
        );

        this.$rules = {
            "start": [{
                    token: "string",
                    regex: /^\[.*\]$/,
                    next: "display"
                },
                {
                    caseInsensitive: false,
                    defaultToken: "invalid"
                }
            ],
            "display": [{
                    token: "keyword",
                    regex: /^-+$/,
                    next: "action"
                },
                {
                    token: "text",
                    regex: /((?!-+).*)/,
                    next: "display"
                },
                {
                    caseInsensitive: false,
                    defaultToken: "invalid"
                }

            ],

            "action": [{
                    token: "keyword",
                    regex: /==> /,
                    next: "action"
                },
                {
                    token: "keyword",
                    regex: /^\[.*\]$/,
                    next: "display"
                },
                {
                    token: "text",
                    regex: /.*/,
                    next: "action"
                },

                {
                    caseInsensitive: false,
                    defaultToken: "invalid"
                }

            ],
        }


    }

    oop.inherits(GuiFlowHighlightRules, TextHighlightRules);

    exports.GuiFlowHighlightRules = GuiFlowHighlightRules;
});
