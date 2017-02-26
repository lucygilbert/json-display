describe('Open levels setting', function() {
  var testJson = {
    a: { b: { c: { d: { e: 25 } } } },
  };
  NodeList.prototype.map = Array.prototype.map;

  describe('when below zero', function() {
    it('should close all levels', function () {
      var result = JSONDisplay(testJson, -4);

      var divDisplayStatuses = result.querySelectorAll('[data-test="contentsContainer"]')
        .map(function (div) {
        return div.style.display !== 'none';
      });

      expect(divDisplayStatuses).to.deep.equal([false, false, false, false, false]);
    });
  });

  describe('when zero', function() {
    it('should close all levels', function () {
      var result = JSONDisplay(testJson, 0);

      var divDisplayStatuses = result.querySelectorAll('[data-test="contentsContainer"]')
        .map(function (div) {
        return div.style.display !== 'none';
      });

      expect(divDisplayStatuses).to.deep.equal([false, false, false, false, false]);
    });
  });

  describe('when above zero', function() {
    it('should close levels after the level number provided', function () {
      var result = JSONDisplay(testJson, 3);

      var divDisplayStatuses = result.querySelectorAll('[data-test="contentsContainer"]')
        .map(function (div) {
        return div.style.display !== 'none';
      });

      expect(divDisplayStatuses).to.deep.equal([true, true, true, false, false]);
    });
  });

  describe('when not provided', function() {
    it('should open all levels', function () {
      var result = JSONDisplay(testJson);

      expect(result.innerHTML).not.to.contain('display: none');
    });
  });
});
