describe('Style overrides', function() {
  var defaultStyleOptions = {
    root: { tag: 'pre', style: 'padding: 5px; font-size: 1rem;' },
    titleContainer: { tag: 'div', style: 'margin-bottom: 3px;' },
    title: { tag: 'span', style: 'cursor: pointer;' },
    titleText: { tag: 'span', style: '' },
    openButton: { 
      tag: 'span',
      style: 'display: inline-block; border-top: 5px solid transparent; ' +
             'border-bottom: 5px solid transparent; border-left: 5px solid black; ' +
             'margin-right: 7px;',
    },
    contentsContainer: { tag: 'div', style: 'padding-left: 12px;' },
    keyValuePair: { tag: 'span', style: 'display: block; margin-bottom: 2px;' },
    key: { tag: 'span', style: 'color: darkblue;' },
    stringValue: { tag: 'span', style: 'color: crimson;' },
    numberValue: { tag: 'span', style: 'color: blue;' },
    booleanValue: { tag: 'span', style: 'color: blue;' },
    nullValue: { tag: 'span', style: 'color: blue;' },
    defaultValue: { tag: 'span', style: 'color: blue;' },
  };
  var testJson = {
    array: [1, 2, 3],
    number: 54,
    string: 'data',
    boolean: false,
    null: null,
    date: new Date(),
  };
  var body = document.body;

  function checkStyleResults(htmlTree, expectedOptions) {
    expect(htmlTree.style.cssText).to.equal(expectedOptions.root.style);
    expect(htmlTree.querySelectorAll('[data-test="titleContainer"]')[0].style.cssText)
      .to.equal(expectedOptions.titleContainer.style);
    expect(htmlTree.querySelectorAll('[data-test="titleContainer"]')[0]
                   .firstChild.style.cssText).to.equal(expectedOptions.title.style);
    expect(htmlTree.querySelectorAll('[data-test="titleContainer"]')[0]
                   .firstChild.firstChild.style.cssText)
      .to.contain(expectedOptions.openButton.style);
    expect(htmlTree.querySelectorAll('[data-test="titleContainer"]')[0]
                   .firstChild.childNodes[1].style.cssText)
      .to.equal(expectedOptions.titleText.style);
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0].style.cssText)
      .to.contain(expectedOptions.contentsContainer.style);
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[2].style.cssText).to.equal(expectedOptions.keyValuePair.style);
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[2].firstChild.style.cssText).to.equal(expectedOptions.key.style);
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[3].childNodes[1].style.cssText)
      .to.equal(expectedOptions.stringValue.style);
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[2].childNodes[1].style.cssText)
      .to.equal(expectedOptions.numberValue.style);
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[4].childNodes[1].style.cssText)
      .to.equal(expectedOptions.booleanValue.style);
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[5].childNodes[1].style.cssText)
      .to.equal(expectedOptions.nullValue.style);
  }


  function checkTagResults(htmlTree, expectedOptions) {
    expect(htmlTree.tagName).to.equal(expectedOptions.root.tag.toUpperCase());
    expect(htmlTree.querySelectorAll('[data-test="titleContainer"]')[0].tagName)
      .to.equal(expectedOptions.titleContainer.tag.toUpperCase());
    expect(htmlTree.querySelectorAll('[data-test="titleContainer"]')[0]
                   .firstChild.tagName).to.equal(expectedOptions.title.tag.toUpperCase());
    expect(htmlTree.querySelectorAll('[data-test="titleContainer"]')[0]
                   .firstChild.firstChild.tagName)
      .to.contain(expectedOptions.openButton.tag.toUpperCase());
    expect(htmlTree.querySelectorAll('[data-test="titleContainer"]')[0]
                   .firstChild.childNodes[1].tagName)
      .to.equal(expectedOptions.titleText.tag.toUpperCase());
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0].tagName)
      .to.contain(expectedOptions.contentsContainer.tag.toUpperCase());
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[2].tagName).to.equal(expectedOptions.keyValuePair.tag.toUpperCase());
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[2].firstChild.tagName).to.equal(expectedOptions.key.tag.toUpperCase());
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[3].childNodes[1].tagName)
      .to.equal(expectedOptions.stringValue.tag.toUpperCase());
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[2].childNodes[1].tagName)
      .to.equal(expectedOptions.numberValue.tag.toUpperCase());
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[4].childNodes[1].tagName)
      .to.equal(expectedOptions.booleanValue.tag.toUpperCase());
    expect(htmlTree.querySelectorAll('[data-test="contentsContainer"]')[0]
                   .childNodes[5].childNodes[1].tagName)
      .to.equal(expectedOptions.nullValue.tag.toUpperCase());
  }

  describe('when no overrides are provided', function() {
    it('should use default styles', function () {
      var htmlTree = JSONDisplay(testJson);

      checkStyleResults(htmlTree, defaultStyleOptions);
    });

    it('should use default tags', function () {
      var htmlTree = JSONDisplay(testJson);

      checkTagResults(htmlTree, defaultStyleOptions);
    });
  });

  describe('when tag overrides are provided', function() {
    var overrides = {
      root: { tag: 'main' },
      titleContainer: { tag: 'a' },
      title: { tag: 'section' },
      titleText: { tag: 'a' },
      openButton: { tag: 'td' },
      contentsContainer: { tag: 'tr' },
      keyValuePair: { tag: 'aside' },
      key: { tag: 'table' },
      stringValue: { tag: 'p' },
      numberValue: { tag: 'pre' },
      booleanValue: { tag: 'main' },
      nullValue: { tag: 'a' },
      defaultValue: { tag: 'p' },
    };

    it('should use default styles', function () {
      var htmlTree = JSONDisplay(testJson, overrides);

      checkStyleResults(htmlTree, defaultStyleOptions);
    });

    it('should use provided tags', function () {
      var htmlTree = JSONDisplay(testJson, null, overrides);

      checkTagResults(htmlTree, overrides);
    });
  });

  describe('when style overrides are provided', function() {
    var overrides = {
      root: { style: 'color: blue;' },
      titleContainer: { style: 'margin-top: 3px;' },
      title: { style: 'width: 10px;' },
      titleText: { style: 'height: 20px;' },
      openButton: { style: 'font-size: 3rem;' },
      contentsContainer: { style: 'border: 1px solid black;' },
      keyValuePair: { style: 'display: inline-block;' },
      key: { style: 'background-color: green;' },
      stringValue: { style: 'height: 10%;' },
      numberValue: { style: 'position: relative; top: 10%;' },
      booleanValue: { style: 'color: red;' },
      nullValue: { style: 'border-radius: 25px;' },
      defaultValue: { style: 'font-family: serif;' },
    };

    it('should use provided styles', function () {
      var htmlTree = JSONDisplay(testJson, null, overrides);

      checkStyleResults(htmlTree, overrides);
    });

    it('should use default tags', function () {
      var htmlTree = JSONDisplay(testJson, null, overrides);

      checkTagResults(htmlTree, defaultStyleOptions);
    });
  });

  describe('when some sets of overrides are provided', function() {
    var overrides = {
      root: { tag: 'main' },
      title: { style: 'height: 100%;' },
      titleText: { tag: 'a', style: 'color: green;' },
      openButton: { tag: 'td', style: 'color: red;' },
      contentsContainer: { tag: 'tr', style: 'font-size: 2rem;' },
      numberValue: { style: 'color: blue;' },
      booleanValue: { tag: 'main', style: 'color: red;' },
      nullValue: { tag: 'a' },
      defaultValue: { tag: 'p', style: 'color: red;' },
    };
    var expected = {
      root: { tag: 'main', style: 'padding: 5px; font-size: 1rem;' },
      titleContainer: { tag: 'div', style: 'margin-bottom: 3px;' },
      title: { tag: 'span', style: 'height: 100%;' },
      titleText: { tag: 'a', style: 'color: green;' },
      openButton: { tag: 'td', style: 'color: red;' },
      contentsContainer: { tag: 'tr', style: 'font-size: 2rem;' },
      keyValuePair: { tag: 'span', style: 'display: block; margin-bottom: 2px;' },
      key: { tag: 'span', style: 'color: darkblue;' },
      stringValue: { tag: 'span', style: 'color: crimson;' },
      numberValue: { tag: 'span', style: 'color: blue;' },
      booleanValue: { tag: 'main', style: 'color: red;' },
      nullValue: { tag: 'a', style: 'color: blue;' },
      defaultValue: { tag: 'p', style: 'color: red;' },
    };


    it('should use provided styles when available', function () {
      var htmlTree = JSONDisplay(testJson, null, overrides);

      checkStyleResults(htmlTree, expected);
    });

    it('should use provided tags when available', function () {
      var htmlTree = JSONDisplay(testJson, null, overrides);

      checkTagResults(htmlTree, expected);
    });
  });

  describe('when a full set of overrides are provided', function() {
    var overrides = {
      root: { tag: 'main', style: 'width: 10px;' },
      titleContainer: { tag: 'a', style: 'margin-left: 3px;' },
      title: { tag: 'td', style: 'height: 100%;' },
      titleText: { tag: 'a', style: 'color: green;' },
      openButton: { tag: 'td', style: 'color: red;' },
      contentsContainer: { tag: 'tr', style: 'font-size: 2rem;' },
      keyValuePair: { tag: 'main', style: 'display: inline-block;' },
      key: { tag: 'main', style: 'color: darkred;' },
      stringValue: { tag: 'main', style: 'color: gray;' },
      numberValue: { tag: 'main', style: 'color: black;' },
      booleanValue: { tag: 'main', style: 'color: red;' },
      nullValue: { tag: 'a', style: 'color: pink;' },
      defaultValue: { tag: 'p', style: 'color: red;' },
    };

    it('should use provided styles', function () {
      var htmlTree = JSONDisplay(testJson, null, overrides);

      checkStyleResults(htmlTree, overrides);
    });

    it('should use provided tags', function () {
      var htmlTree = JSONDisplay(testJson, null, overrides);

      checkStyleResults(htmlTree, overrides);
    });
  });
});
