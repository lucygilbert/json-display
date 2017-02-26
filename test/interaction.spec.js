describe('Interacting with the displayed JSON', function () {
  var testJson = {
    a: { b: { c: 10 } },
  };
  var clickEvent = document.createEvent("HTMLEvents");
  clickEvent.initEvent("click", true, false);

  it('should close a open container when it\'s title is clicked', function () {
    var result = JSONDisplay(testJson);

    result.querySelectorAll('[data-test="titleContainer"]')[0].firstChild.dispatchEvent(clickEvent);

    expect(result.querySelectorAll('[data-test="contentsContainer"]')[0].style.display)
      .to.equal('none');
  });

  it('should open a closed container when it\'s title is clicked', function () {
    var result = JSONDisplay(testJson, 0);

    result.querySelectorAll('[data-test="titleContainer"]')[0].firstChild.dispatchEvent(clickEvent);

    expect(result.querySelectorAll('[data-test="contentsContainer"]')[0].style.display)
      .to.equal('block');
  });

  it('should rotate the open button when it\'s title is clicked', function () {
    var result = JSONDisplay(testJson, 0);

    result.querySelectorAll('[data-test="titleContainer"]')[0].firstChild.dispatchEvent(clickEvent);

    expect(result.querySelectorAll('[data-test="titleContainer"]')[0]
                 .firstChild.firstChild.style.transform).to.equal('rotate(90deg)');

    result.querySelectorAll('[data-test="titleContainer"]')[0].firstChild.dispatchEvent(clickEvent);

    expect(result.querySelectorAll('[data-test="titleContainer"]')[0]
                 .firstChild.firstChild.style.transform).to.equal('rotate(0deg)');
  });

  it('should remember the lower containers\' open statuses when a higher container\'s ' +
     'title is clicked', function () {
    var result = JSONDisplay(testJson);

    result.querySelectorAll('[data-test="titleContainer"]')[1].firstChild.dispatchEvent(clickEvent);
    result.querySelectorAll('[data-test="titleContainer"]')[0].firstChild.dispatchEvent(clickEvent);

    expect(result.querySelectorAll('[data-test="contentsContainer"]')[0].style.display)
      .to.equal('none');
    expect(result.querySelectorAll('[data-test="contentsContainer"]')[1].style.display)
      .to.equal('none');
    expect(result.querySelectorAll('[data-test="contentsContainer"]')[2].style.display)
      .to.equal('block');
  });
});
