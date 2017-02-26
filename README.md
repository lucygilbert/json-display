#JSONDisplay

##Installation

To install the package, use the command `npm install json-display`.

##Usage

The function can either be imported with CommonJS, AMD or will be added to the window as `JSONDisplay`.

`JSONDisplay(json, openLevels, styleOptions)`

**Arguments**

`json`: A Javascript object, which will be transformed into the JSON-compliant HTML structure. If you have a JSON string, first parse it with `JSON.parse`, i.e. `JSONDisplay(JSON.parse(jsonString))`

`openLevels`: *(optional)* This is the amount of levels of the JSON structure that will be automatically opened when first rendering the object. 0 or less will cause the entire structure to begin closed. Null, anything not parsable as an integer, or simply not providing an argument will cause every level to begin open.

`styleOptions`: *(optional)* This is an object that provides overrides for the tags and styles used for the HTML structure, it will be deep merged into the default options so you do not have to provide all the options. See the source code to understand the structure you are adding the styles and tags into. 

The default options are:

```
{
  root: { tag: 'pre', style: '' },
  title: { tag: 'span', style: 'display: block;' },
  titleText: { tag: 'span', style: '' },
  openButton: { 
    tag: 'span',
    style: 'display: inline-block; border-top: 5px solid transparent; ' +
           'border-bottom: 5px solid transparent; border-left: 5px solid black; ' +
           'margin-right: 2px;',
  },
  contentsContainer: { tag: 'div', style: 'padding-left: 10px;' },
  keyValuePair: { tag: 'span', style: 'display: block;' },
  key: { tag: 'span', style: 'color: darkblue;' },
  stringValue: { tag: 'span', style: 'color: darkred;' },
  numberValue: { tag: 'span', style: 'color: blue;' },
  booleanValue: { tag: 'span', style: 'color: blue;' },
  nullValue: { tag: 'span', style: 'color: blue;' },
  defaultValue: { tag: 'span', style: 'color: blue;' },
}
```

**Return value**

The return value is a HTMLElement structure

##Contributing

The tests can be run with `npm test`. They will also provide you with information about the currently level of code coverage, in the coverage directory.

Please attempt to keep code coverage high, preferably above 95%, definitely above 90%. Though remember that simply having high code coverage does not necessarily mean that you have fully covered potential scenarios and possibilities for error.

For a number of reasons, it is preferable that this library stay ES5-compliant.
