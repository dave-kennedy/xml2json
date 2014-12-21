var xml2json = (function () {
    // ECMAScript 5 strict mode
    'use strict';

    var module = {
        toJson: function (node) {
            var i, json, obj;

            if (!node.attributes.length && !node.childNodes.length) {
                return;
            }

            obj = {};

            for (i = 0; i < node.attributes.length; i++) {
                obj._attr = obj._attr || {};
                obj._attr[node.attributes[i].nodeName] = node.attributes[i].value;
            }

            for (i = 0; i < node.childNodes.length; i++) {
                if (node.childNodes[i].nodeType === 1) {
                    // Element node
                    json = this.toJson(node.childNodes[i]);

                    if (json) {
                        if (obj[node.childNodes[i].nodeName] instanceof Array) {
                            obj[node.childNodes[i].nodeName].push(json);
                        } else if (obj[node.childNodes[i].nodeName]) {
                            obj[node.childNodes[i].nodeName] = [obj[node.childNodes[i].nodeName]];
                            obj[node.childNodes[i].nodeName].push(json);
                        } else {
                            obj[node.childNodes[i].nodeName] = json;
                        }
                    }
                } else if (node.childNodes[i].nodeType === 3 && node.childNodes[i].textContent.trim()) {
                    // Text node
                    if (obj._text instanceof Array) {
                        obj._text.push(node.childNodes[i].textContent.trim());
                    } else if (obj._text) {
                        obj._text = [obj._text];
                        obj._text.push(node.childNodes[i].textContent.trim());
                    } else {
                        obj._text = node.childNodes[i].textContent.trim();
                    }
                }
            }

            return obj;
        },
        parse: function (xml) {
            var parser = new DOMParser(),
                dom = parser.parseFromString(xml, 'text/xml'),
                node = dom.documentElement,
                json = this.toJson(node),
                obj = {};

            if (json) {
                obj[node.nodeName] = json;
            }

            return obj;
        }
    };

    return module;
}());
