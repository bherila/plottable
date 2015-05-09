///<reference path="../testReference.ts" />

var assert = chai.assert;

describe("TimeScale tests", () => {
  it("parses reasonable formats for dates", () => {
    var scale = new Plottable.Scales.Time();
    var firstDate = new Date(2014, 9, 1, 0, 0, 0, 0).valueOf();
    var secondDate = new Date(2014, 10, 1, 0, 0, 0).valueOf();

    function checkDomain(domain: any[]) {
      scale.domain(domain);
      var time1 = scale.domain()[0].valueOf();
      assert.strictEqual(time1, firstDate, "first value of domain set correctly");
      var time2 = scale.domain()[1].valueOf();
      assert.strictEqual(time2, secondDate, "first value of domain set correctly");
    }
    checkDomain([new Date("10/1/2014"), new Date("11/1/2014")]);
    checkDomain([new Date("October 1, 2014"), new Date("November 1, 2014")]);
    checkDomain([new Date("Oct 1, 2014"), new Date("Nov 1, 2014")]);
  });

  it("can't set reversed domain", () => {
    var scale = new Plottable.Scales.Time();
    assert.throws(() => scale.domain([new Date("1985-10-26"), new Date("1955-11-05")]), "chronological");
  });

  it("tickInterval produces correct number of ticks", () => {
    var scale = new Plottable.Scales.Time();
    // 100 year span
    scale.domain([new Date(2000, 0, 1, 0, 0, 0, 0), new Date(2100, 0, 1, 0, 0, 0, 0)]);
    var ticks = scale.tickInterval(d3.time.year);
    assert.strictEqual(ticks.length, 101, "generated correct number of ticks");
    // 1 year span
    scale.domain([new Date(2000, 0, 1, 0, 0, 0, 0), new Date(2000, 11, 31, 0, 0, 0, 0)]);
    ticks = scale.tickInterval(d3.time.month);
    assert.strictEqual(ticks.length, 12, "generated correct number of ticks");
    ticks = scale.tickInterval(d3.time.month, 3);
    assert.strictEqual(ticks.length, 4, "generated correct number of ticks");
    // 1 month span
    scale.domain([new Date(2000, 0, 1, 0, 0, 0, 0), new Date(2000, 1, 1, 0, 0, 0, 0)]);
    ticks = scale.tickInterval(d3.time.day);
    assert.strictEqual(ticks.length, 32, "generated correct number of ticks");
    // 1 day span
    scale.domain([new Date(2000, 0, 1, 0, 0, 0, 0), new Date(2000, 0, 1, 23, 0, 0, 0)]);
    ticks = scale.tickInterval(d3.time.hour);
    assert.strictEqual(ticks.length, 24, "generated correct number of ticks");
    // 1 hour span
    scale.domain([new Date(2000, 0, 1, 0, 0, 0, 0), new Date(2000, 0, 1, 1, 0, 0, 0)]);
    ticks = scale.tickInterval(d3.time.minute);
    assert.strictEqual(ticks.length, 61, "generated correct number of ticks");
    ticks = scale.tickInterval(d3.time.minute, 10);
    assert.strictEqual(ticks.length, 7, "generated correct number of ticks");
    // 1 minute span
    scale.domain([new Date(2000, 0, 1, 0, 0, 0, 0), new Date(2000, 0, 1, 0, 1, 0, 0)]);
    ticks = scale.tickInterval(d3.time.second);
    assert.strictEqual(ticks.length, 61, "generated correct number of ticks");
  });
});
