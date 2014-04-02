var xml2json = (function () {
    // ECMAScript 5 strict mode
    'use strict';

    // http://blog.stevenlevithan.com/archives/faster-trim-javascript
    function trim(str) {
        var	str = str.replace(/^\s\s*/, ''),
            ws = /\s/,
            i = str.length;
        while (ws.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }

    var module = {
        toJson: function (node) {
            var i, json, obj;

            if (!node.attributes.length && !node.childNodes.length) {
                return;
            }

            obj = {};

            for (i = 0; i < node.attributes.length; i++) {
                obj._attr = obj._attr || {};
                obj._attr[node.attributes[i].nodeName] = node.attributes[i].nodeValue;
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
                } else if (node.childNodes[i].nodeType === 3 && trim(node.childNodes[i].textContent)) {
                    // Text node
                    if (obj._text instanceof Array) {
                        obj._text.push(trim(node.childNodes[i].textContent));
                    } else if (obj._text) {
                        obj._text = [obj._text];
                        obj._text.push(trim(node.childNodes[i].textContent));
                    } else {
                        obj._text = trim(node.childNodes[i].textContent);
                    }
                }
            }

            return obj;
        },
        parse: function (xml) {
            var dom, json, obj, node, parser;

            parser = new DOMParser();
            dom = parser.parseFromString(xml, 'text/xml');
            node = dom.documentElement;
            obj = {};
            json = this.toJson(node);

            if (json) {
                obj[node.nodeName] = json;
            }

            return obj;
        }
    };

    return module;
}());
