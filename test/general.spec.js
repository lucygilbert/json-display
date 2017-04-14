describe('General:', function() {
  describe('When a browser does not support Object.assign', function() {
    var originalAssign;
    beforeEach(function () {
      originalAssign = Object.assign;
      Object.assign = undefined;
    });
    afterEach(function () {
      Object.assign = originalAssign;
    });

    it('polyfills the function and continues correctly', function () {
      JSONDisplay(1);
      expect(Object.assign.toString()).to.contain('function (target){');
    });

    it('polyfills the function with a working replacement', function () {
      JSONDisplay(1);
      expect(Object.assign).to.throw(TypeError);
      expect(Object.assign({ a: 1 }, { b: 2})).to.deep.equal({ a: 1, b: 2 });
      expect(Object.assign({ a: 1 }, null)).to.deep.equal({ a: 1 });
    });
  });
});
