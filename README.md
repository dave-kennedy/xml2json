# xml2json
## by David Kennedy
## http://daveden.wordpress.com

### Why?

I know there are several of these out there already, but I wasn't very happy with the other methods I found. Most of the them:

1. involved converting the XML to a string and then returning a string representation of the JSON object. This method, by contrast, converts the XML directly to a JSON object.

2. were incredibly complicated. This method is fairly intuitive.

3. were sloppy. JSLint didn't like them, to say the least. This method conforms to JavaScript best practices. It also looks nice.

4. used invalid symbols to identify attributes and text, such as an ampersand or a pound sign. This method uses and underscore to identify attributes and text.

5. were slow, with the exception of [Stefan Goessner's](http://www.goessner.net/download/prj/jsonxml/) implementation as well as [Michael Schoeler's](http://www.xn--schler-dya.net/blog/oenskelister/michaels-onskeliste/) (which was based on Goessner's). Those methods were fast but had the annoyances listed above. This method is also highly optimized.

I don't mean to suggest that other methods, such as those by Goessner or Schoeler, are bad. They just didn't work like I expected them to, so I created my own.

### How?

Here's how it works with a very simple XML file:

    <tests>
        <test difficulty="Easy">
            <name>Test 1</name>
            <description>A test of strength</description>
        </test>
    </tests>

After including the JS file, pass the raw XML (as a string) to the parser:

    var xml = '<tests>...</tests>',
        json = xml2json.parse(xml);

... which returns:

    {
        "tests": {
            "test": {
                "_attr": {
                    "difficulty": "Easy"
                },
                "name": {
                    "_text": "Test 1"
                },
                "description": {
                    "_text": "A test of strength"
                }
            }
        }
    }

As mentioned above, the JSON object that is returned is not a string, so you can start manipulating it right away. You can access text nodes like this:

    json.tests.test.name._text;

... and you can access attributes like this:

    json.tests.test._attr.difficulty;

If you'd rather have it as a string, use the browser's built in JSON object's stringify method:

    JSON.stringify(json);

Here's how it works on a typical XML file, with multiples of each element:

    <tests>
        Hi, I am some text.
        <test difficulty="Easy">
            <name>Test 1</name>
        </test>
        I don't belong here!
        <test>Test 2</test>
        <test name="Test 3" />
    </tests>

Even with an unpredictable XML file, the JSON object is predictable and clean:

    {
        "tests": {
            "_text": ["Hi, I am some text.", "I don't belong here!"],
            "test": [{
                "_attr": {
                    "difficulty": "Easy"
                },
                "name": {
                    "_text": "Test 1"
                }
            }, {
                "_text": "Test 2"
            }, {
                "_attr": {
                    "name": "Test 3"
                }
            }]
        }
    }

As you can see, when there are multiple elements with the same name, the property becomes an array of objects. In the case of text nodes, it becomes an array of strings. Text doesn't get lost, even when it's stuck in random places.

### Thanks

Major credit is deserved for [Stefan Goessner's](http://www.goessner.net/download/prj/jsonxml/) as well as [Michael Schoeler's](http://www.xn--schler-dya.net/blog/oenskelister/michaels-onskeliste/), whose code I thoroughly scoured for good ideas. Also, thanks goes to [Steve Levithan](http://blog.stevenlevithan.com/archives/faster-trim-javascript) for his awesome work with regular expressions. Finally, thanks to [Mathias Bynens](http://www.mathiasbynens.be/notes/javascript-identifiers) for his work with JavaScript variable names.

### Etc.

Please feel free to let me know if you find this method helpful, if you find any bugs, or if you have any questions or suggestions in general. Of course, you could always go ahead and fix the bugs yourself :)