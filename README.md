# xml2json
## by David Kennedy
## http://daveden.wordpress.com

### Why?

I know there are several of these out there already, but I wasn't very happy with the other methods I found. Most of the them:

1. involved converting the XML to a string and then returning a string representation of the JSON object. This method, by contrast, converts the XML directly to a JSON object.

2. were incredibly complicated. This method is fairly intuitive.

3. were sloppy. JSLint didn't like them, to say the least. This method conforms to JavaScript best practices. It also looks nice.

4. were slow, with the exception of [Stefan Goessner's](http://www.goessner.net/download/prj/jsonxml/) implementation as well as [Michael Schoeler's](http://www.xn--schler-dya.net/blog/oenskelister/michaels-onskeliste/) (which was based on Goessner's). Those methods were fast but had the annoyances listed above. This method is also highly optimized.

5. used invalid symbols to identify attributes and text, such as an ampersand or a pound sign. This method uses the feminine ordinal (ª or alt166 on Windows) to identify attributes and the masculine ordinal (º or alt167 on Windows) to identify text, so there's no chance of them conflicting with other scripts.

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
        'tests': {
            'test': {
                'ª': {
                    'difficulty': 'Easy'
                }
                'name': {
                    'º': 'Test 1'
                }
                'description': {
                    'º': 'A test of strength'
                }
            }
        }
    }

As mentioned above, the JSON object that is returned is not a string, so you can start manipulating it right away. Again, text nodes are identified with the masculine ordinal character, so you can access it like this:

    json.tests.test.name.º;

Attributes are identified by the feminine ordinal character, which is an object. You can access attribute text like this:

    json.tests.test.ª.difficulty;

If you'd rather have it as a string, use the browser's built in JSON object's stringify method:

    JSON.stringify(json);

Here's how it works on a typical XML file, with multiples of each element:

    <tests>
        <test difficulty="Easy">
            <name>Test 1</name>
        </test>
        <test>Test 2</test>
        <test name="Test 3" />
    </tests>

Even with an unpredictable XML file, the JSON object is predictable and clean:

    {
        'tests': {
            'test': [
                {
                    'ª': {
                        'difficulty': 'Easy'
                    }
                    'name': {
                        'º': 'Test 1'
                    }
                },
                {
                    'º': 'Test 2'
                },
                {
                    'ª': {
                        'name': 'Test 3'
                    },
                    'º': ''
                }
            ]
        }
    }

As you can see, when there are multiple elements with the same name, the property becomes an array of objects.

### Thanks

Major credit is deserved for [Stefan Goessner's](http://www.goessner.net/download/prj/jsonxml/) as well as [Michael Schoeler's](http://www.xn--schler-dya.net/blog/oenskelister/michaels-onskeliste/), whose code I thoroughly scoured for good ideas. Also, thanks goes to [Steve Levithan](http://blog.stevenlevithan.com/archives/faster-trim-javascript) for his awesome work with regular expressions. Finally, thanks to [Mathias Bynens](http://www.mathiasbynens.be/notes/javascript-identifiers) for his work with JavaScript variable names.

### Etc.

Please feel free to let me know if you find this method helpful, if you find any bugs, or if you have any questions or suggestions in general. Of course, you could always go ahead and fix the bugs yourself :)