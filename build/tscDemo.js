///<reference path="exampleReference.ts" />
var TSCDemo;
(function (TSCDemo) {
    var yScale = new LinearScale();
    var xScale = new LinearScale();
    var left = new YAxis(yScale, "left");
    var data = makeRandomData(1000, 200);
    var lineRenderer = new LineRenderer(data, xScale, yScale);
    var bottomAxis = new XAxis(xScale, "bottom");

    var chart = new Table([
        [left, lineRenderer],
        [null, bottomAxis]]);

    var outerTable = new Table([
        [new TitleLabel("A Chart")],
        [chart]]);

    var svg = d3.select("#table");
    outerTable.anchor(svg);
    outerTable.computeLayout();
    outerTable.render();
})(TSCDemo || (TSCDemo = {}));
//# sourceMappingURL=tscDemo.js.map
