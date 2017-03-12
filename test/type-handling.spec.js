describe('Type handling', function() {
  it('correctly displays integers', function () {
    var result = JSONDisplay(24);

    expect(result.firstChild.innerHTML).to.equal('24');
  });

  it('correctly displays floating point numbers', function () {
    var result = JSONDisplay(65.345);

    expect(result.firstChild.innerHTML).to.equal('65.345');
  });

  it('correctly displays strings', function () {
    var result = JSONDisplay('test');

    expect(result.firstChild.innerHTML).to.equal('"test"');
  });

  it('correctly displays booleans', function () {
    var result = JSONDisplay(true);

    expect(result.firstChild.innerHTML).to.equal('true');
  });

  it('correctly displays null', function () {
    var result = JSONDisplay(null);

    expect(result.firstChild.innerHTML).to.equal('null');
  });

  it('correctly displays undefined', function () {
    var result = JSONDisplay(undefined);

    expect(result.firstChild.innerHTML).to.equal('null');
  });

  it('correctly displays objects', function () {
    var result = JSONDisplay({});

    expect(result.querySelectorAll('[data-test="titleContainer"]')[0]
                 .firstChild.childNodes[1].innerHTML).to.equal('Object');
  });

  it('correctly displays arrays', function () {
    var result = JSONDisplay([]);

    expect(result.querySelectorAll('[data-test="titleContainer"]')[0]
                 .firstChild.childNodes[1].innerHTML).to.equal('Array[0]');
  });

  it('correctly displays dates', function () {
    var result = JSONDisplay(new Date(2017, 0, 1, 12));

    expect(result.firstChild.innerHTML).to.equal('"2017-01-01T12:00:00.000Z"');
  });

  it('correctly displays symbols', function () {
    var result = JSONDisplay(Symbol('foo'));

    expect(result.firstChild.innerHTML).to.equal('Symbol(foo)');
  });

  describe('within an object', function() {
    it('correctly displays integers', function () {
      var result = JSONDisplay({
        number: 74,
      });

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('number: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('74');
    });

    it('correctly displays floating point numbers', function () {
      var result = JSONDisplay({
        float: 5.096,
      });

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('float: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('5.096');
    });

    it('correctly displays strings', function () {
      var result = JSONDisplay({
        string: 'hello',
      });

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('string: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('"hello"');
    });

    it('correctly displays booleans', function () {
      var result = JSONDisplay({
        boolean: true,
      });

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('boolean: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('true');
    });

    it('correctly displays null', function () {
      var result = JSONDisplay({
        null: null,
      });

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('null: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('null');
    });

    it('correctly displays undefined', function () {
      var result = JSONDisplay({
        undefined: undefined,
      });

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('undefined: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('null');
    });

    it('correctly displays objects', function () {
      var result = JSONDisplay({
        object: {},
      });

      expect(result.querySelectorAll('[data-test="titleContainer"]')[1]
                   .firstChild.childNodes[1].firstChild.innerHTML).to.equal(
        'object: ');
      expect(result.querySelectorAll('[data-test="titleContainer"]')[1]
                   .firstChild.childNodes[1].innerHTML).to.contain('>Object');
    });

    it('correctly displays arrays', function () {
      var result = JSONDisplay({
        array: [ 1, 2 ],
      });

      expect(result.querySelectorAll('[data-test="titleContainer"]')[1]
                   .firstChild.childNodes[1].firstChild.innerHTML).to.equal(
        'array: ');
      expect(result.querySelectorAll('[data-test="titleContainer"]')[1]
                   .firstChild.childNodes[1].innerHTML).to.contain('>Array[2]');
    });

    it('correctly displays dates', function () {
      var result = JSONDisplay({
        date: new Date(2017, 0, 1, 12),
      });

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('date: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal(
        '"2017-01-01T12:00:00.000Z"');
    });

    it('correctly displays symbols', function () {
      var result = JSONDisplay({
        symbol: Symbol('foo'),
      });

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('symbol: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('Symbol(foo)');
    });

    it('correctly displays symbol properties', function () {
      var json = {};
      json[Symbol('foo')] = 539;
      var result = JSONDisplay(json);

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('Symbol(foo): ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('539');
    });

    it('skips the check for symbol properties in browsers that don\'t support it', function () {
      var originalSymbolFunction = Object.getOwnPropertySymbols;
      Object.getOwnPropertySymbols = null;
      var json = {};
      json[Symbol('foo')] = 539;
      var result = JSONDisplay(json);

      expect(result.querySelector('[data-test="contentsContainer"]').childNodes.length).to.equal(0);

      Object.getOwnPropertySymbols = originalSymbolFunction;
    });
  });

  describe('within an array', function() {
    it('correctly displays integers', function () {
      var result = JSONDisplay([
        74,
      ]);

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('0: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('74');
    });

    it('correctly displays floating point numbers', function () {
      var result = JSONDisplay([
        5.096,
      ]);

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('0: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('5.096');
    });

    it('correctly displays strings', function () {
      var result = JSONDisplay([
        'hello',
      ]);

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('0: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('"hello"');
    });

    it('correctly displays booleans', function () {
      var result = JSONDisplay([
        true,
      ]);

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('0: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('true');
    });

    it('correctly displays null', function () {
      var result = JSONDisplay([
        null,
      ]);

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('0: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('null');
    });

    it('correctly displays undefined', function () {
      var result = JSONDisplay([
        undefined,
      ]);

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('0: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('null');
    });

    it('correctly displays objects', function () {
      var result = JSONDisplay([
        { a: 12 },
      ]);

      expect(result.querySelectorAll('[data-test="titleContainer"]')[1]
                   .firstChild.childNodes[1].firstChild.innerHTML).to.equal(
        '0: ');
      expect(result.querySelectorAll('[data-test="titleContainer"]')[1]
                   .firstChild.childNodes[1].innerHTML).to.contain('>Object');
    });

    it('correctly displays arrays', function () {
      var result = JSONDisplay([
        [ 1, 2, 3, 4 ],
      ]);

      expect(result.querySelectorAll('[data-test="titleContainer"]')[1]
                   .firstChild.childNodes[1].firstChild.innerHTML).to.equal(
        '0: ');
      expect(result.querySelectorAll('[data-test="titleContainer"]')[1]
                   .firstChild.childNodes[1].innerHTML).to.contain('>Array[4]');
    });

    it('correctly displays dates', function () {
      var result = JSONDisplay([
        new Date(2017, 0, 1, 12),
      ]);

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('0: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal(
        '"2017-01-01T12:00:00.000Z"');
    });

    it('correctly displays symbols', function () {
      var result = JSONDisplay([
        Symbol('foo'),
      ]);

      expect(result.childNodes[1].firstChild.firstChild.innerHTML).to.equal('0: ');
      expect(result.childNodes[1].firstChild.childNodes[1].innerHTML).to.equal('Symbol(foo)');
    });
  });
});
