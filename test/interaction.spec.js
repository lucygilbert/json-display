describe('Interacting with the displayed JSON', function () {
  var testJson = {
    a: { b: { c: 10 } },
  };
  var clickEvent = document.createEvent("HTMLEvents");
  clickEvent.initEvent("click", true, false);

  it('should close a open container when it\'s title is clicked', function () {
    var result = JSONDisplay(testJson);

    result.firstChild.dispatchEvent(clickEvent);

    expect(result.childNodes[1].style.display).to.equal('none');
  });

  it('should open a closed container when it\'s title is clicked', function () {
    var result = JSONDisplay(testJson, 0);

    result.firstChild.dispatchEvent(clickEvent);

    expect(result.childNodes[1].style.display).to.equal('block');
  });

  it('should rotate the open button when it\'s title is clicked', function () {
    var result = JSONDisplay(testJson, 0);

    result.firstChild.dispatchEvent(clickEvent);

    expect(result.firstChild.firstChild.style.transform).to.equal('rotate(90deg)');

    result.firstChild.dispatchEvent(clickEvent);

    expect(result.firstChild.firstChild.style.transform).to.equal('rotate(0deg)');
  });

  it('should remember the lower containers\' open statuses when a higher container\'s ' +
     'title is clicked', function () {
    var result = JSONDisplay(testJson);

    result.childNodes[1].firstChild.dispatchEvent(clickEvent);
    result.firstChild.dispatchEvent(clickEvent);

    expect(result.childNodes[1].style.display).to.equal('none');
    expect(result.childNodes[1].childNodes[1].style.display).to.equal('none');
    expect(result.childNodes[1].childNodes[1].childNodes[1].style.display).to.equal('block');
  });
});
