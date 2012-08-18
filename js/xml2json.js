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
        addNode: function (node, obj) {
            var i, obj = obj || {};

            if (node.attributes.length) {
                obj['ª'] = {};

                for (i = 0; i < node.attributes.length; i++) {
                    obj['ª'][node.attributes[i].nodeName] = node.attributes[i].nodeValue;
                }
            }

            if (node.children.length) {
                for (i = 0; i < node.children.length; i++) {
                    obj = this.domToObj(node.children[i], obj);
                }
            } else {
                obj['º'] = trim(node.textContent);
            }

            return obj;
        },
        domToObj: function (node, obj) {
            var j;

            if (obj[node.nodeName] instanceof Array) {
                j = obj[node.nodeName].length;

                obj[node.nodeName][j] = this.addNode(node, obj[node.nodeName][j]);
            } else if (obj[node.nodeName]) {
                obj[node.nodeName] = [obj[node.nodeName]];

                obj[node.nodeName][1] = this.addNode(node, obj[node.nodeName][1]);
            } else {
                obj[node.nodeName] = this.addNode(node, obj[node.nodeName]);
            }

            return obj;
        },
        parse: function (xml) {
            var json = {},
                parser = new DOMParser(),
                dom = parser.parseFromString(xml, 'text/xml');

            if (dom.nodeType === 9) {
                dom = dom.documentElement;
            }

            json = this.domToObj(dom, json);

            return json;
        }
    };

    return module;
}());