I know there are several of these out there already, but I wasn't very happy with the other methods I found. Most of the them:

1. involved converting the XML to a string and then returning a string representation of the JSON object. This method, by contrast, converts the XML directly to a JSON object.

2. were incredibly complicated. This method is fairly intuitive.

3. were sloppy. JSLint didn't like them, to say the least. This method conforms to JavaScript best practices. It also looks nice.

4. were slow, with the exception of [Stefan Goessner's](http://www.goessner.net/download/prj/jsonxml/) implementation as well as [Michael Schoeler's](http://www.xn--schler-dya.net/blog/oenskelister/michaels-onskeliste/) (which was based on Goessner's). Those methods were fast but had the annoyances listed above. This method is also highly optimized.

5. used invalid symbols to identify attributes and text, such as an ampersand or a pound sign. This method uses an underscore to identify attributes and text nodes.

I don't mean to suggest that other methods, such as those by Goessner or Schoeler, are bad. They just didn't work like I expected them to, so naturally I created my own. Please feel free to let me know if you find this method helpful, if you find any bugs, or if you have any suggestions in general.