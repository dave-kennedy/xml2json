# xml2json

### Why?

I know there are several of these out there already, but I wasn't very happy
with the other methods I found. Most of them:

1. involved converting the XML to a string and then returning a string
   representation of the JSON object. This method, by contrast, converts the
   XML directly to a JSON object.

2. were incredibly complicated. This method is fairly intuitive.

3. were sloppy. JSLint didn't like them, to say the least. This method
   conforms to JavaScript best practices. It also looks nice.

4. used invalid symbols to identify attributes and text, such as an ampersand
   or a pound sign. This method uses an underscore.

5. were slow, with the exception of
   [Stefan Goessner's](http://www.goessner.net/download/prj/jsonxml/)
   implementation, which was fast but had the annoyances listed above. This
   method is also highly optimized.

I don't mean to suggest that other methods are bad. They just didn't work like
I wanted them to.

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

As mentioned above, the JSON object that is returned is not a string, so you
can start manipulating it right away. You can access text nodes like this:

    json.tests.test.name._text;

... and you can access attributes like this:

    json.tests.test._attr.difficulty;

If you'd rather have it as a string, just stringify it:

    JSON.stringify(json);

Here's how it works on an atypical XML file, with multiple occurences of each
element:

    <tests>
        Hi, I am some text.
        <test difficulty="Easy">
            <name>Test 1</name>
        </test>
        I don't belong here!
        <test>Test 2</test>
        <test name="Test 3" />
    </tests>

Even with unpredictable XML, the JSON is nice and clean:

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

As you can see, when there are multiple occurences of an element, the property
becomes an array of objects. In the case of text nodes, it becomes an array of
strings. Text doesn't get lost, even when it's stuck in random places.

### Demo

Right [here](http://dave-kennedy.github.io/xml2json).

### Thanks

Credit goes to
[Stefan Goessner](http://www.goessner.net/download/prj/jsonxml/), whose code I
thoroughly scoured for good ideas, and to
[Mathias Bynens](http://www.mathiasbynens.be/notes/javascript-identifiers) for
his work with JavaScript variable names.

