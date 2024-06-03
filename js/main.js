var width = 580, height = 400;
var margin = { top: 10, left: 70, right: 100, bottom: 70 }
width = 680 - margin.left - margin.right
height = 400 - margin.top - margin.bottom

var radialScale, ticks
var maindata, onesvg, twosvg
// var states = ["Texas", "California"]
var good_qualData
var radarData = []
var good_qual = ["Housing", "Cost of Living", "Travel Connectivity", "Commute", "Internet Access"]
var bad_qual = ["Venture Capital", "Safety", "Education", "Tolerance", "Startups"]

document.addEventListener('DOMContentLoaded', function () {
    Promise.all([d3.csv('data/uaScoresDataFrame1.csv')])
        .then(function (values) {
            maindata = values[0];
            // let texas = {}
            // let cali = {}
            // for (let i = 0; i < maindata.length; i++) {
            //     texas[maindata[i]["Index"]] = maindata[i]["Texas"]
            //     cali[maindata[i]["Index"]] = maindata[i]["California"]
            // }

            let texas = []
            let cali = []
            for (let i = 0; i < maindata.length; i++) {
                if (good_qual.includes(maindata[i]["Index"])) {

                    texas.push({ axis: maindata[i]["Index"], value: +maindata[i]["Texas"] })
                    cali.push({ axis: maindata[i]["Index"], value: +maindata[i]["California"] })
                }
            }

            radarData.push(texas)
            radarData.push(cali)

            states = maindata.columns.slice(1)
            // drawOneSvg()
            drawTwoSvg()
            drawradar()

        })
})


// function drawOneSvg() {

// onesvg = d3.select("#one_svg")

// radialScale = d3.scaleLinear()
//     .domain([1, 8])
//     .range([0, 180]);
// ticks = [2, 4, 6, 8];

// onesvg.selectAll("circle")
//     .data(ticks)
//     .join(
//         enter => enter.append("circle")
//             .attr("cx", width / 2)
//             .attr("cy", (height + 70) / 2)
//             .attr("fill", "none")
//             .attr("stroke", "gray")
//             .attr("r", d => radialScale(d))
//     );

// onesvg.selectAll(".ticklabel")
//     .data(ticks)
//     .join(
//         enter => enter.append("text")
//             .attr("class", "ticklabel")
//             .attr("x", width / 2 + 5)
//             .attr("y", d => (height + 70) / 2 - radialScale(d))
//             .text(d => d.toString())
//             .attr("font-size", "11")
//     );

// good_qualData = good_qual.map((f, i) => {
//     let angle = (Math.PI / 2) + (2 * Math.PI * i / good_qual.length);
//     return {
//         "name": f,
//         "angle": angle,
//         "line_coord": angleToCoordinate(angle, 8),
//         "label_coord": angleToCoordinateText(angle, 8.5)
//     };
// });

// // draw axis line
// onesvg.selectAll("line")
//     .data(good_qualData)
//     .join(
//         enter => enter.append("line")
//             .attr("x1", width / 2)
//             .attr("y1", (height + 70) / 2)
//             .attr("x2", d => d.line_coord.x)
//             .attr("y2", d => d.line_coord.y)
//             .attr("stroke", "black")
//     );

// // draw axis label
// onesvg.selectAll(".axislabel")
//     .data(good_qualData)
//     .join(
//         enter => enter.append("text")
//             .attr("x", d => d.label_coord.x)
//             .attr("y", d => d.label_coord.y)
//             .text(d => d.name)
//     );


// var line = d3.line()
//     .x(d => d.x)
//     .y(d => d.y);
// var colors = ["darkorange", "navy"];

// function getPathCoordinates(data_point) {
//     let coordinates = [];
//     for (var i = 0; i < good_qual.length; i++) {
//         let ft_name = good_qual[i];
//         let angle = (Math.PI / 2) + (2 * Math.PI * i / good_qual.length);
//         coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
//     }
//     return coordinates;
// }

// onesvg.selectAll("path")
//     .data(radarData)
//     .join(
//         enter => enter.append("path")
//             .datum(d => getPathCoordinates(d))
//             .attr("d", line)
//             .attr("stroke-width", 3)
//             .attr("stroke", (_, i) => colors[i])
//             .attr("fill", (_, i) => colors[i])
//             .attr("stroke-opacity", 1)
//             .attr("opacity", 0.5)
//     );

// }

function drawTwoSvg() {

    twosvg = d3.select("#two_svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform",
            "translate(" + (margin.left) + "," + margin.bottom / 2 + ")");

    twosvg.append("text")
        .attr("text-anchor", "center")
        .attr("id", "x_axis_label")
        .attr("x", width / 2 - 20)
        .attr("y", height + margin.top + 20)
        .style("font-size", 14)
        .text("Categories");

    twosvg.append("text")
        .attr("id", "y_axis_label")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 30)
        .attr("x", -height / 2 + 50)
        .style("font-size", 14)
        .text("Score");


    let s = 20;

    var color = d3.scaleOrdinal()
        .domain(states)
        .range(['#377eb8', '#4daf4a'])

    twosvg.selectAll("my_rect")
        .data(states)
        .join("rect")
        .attr("fill", function (d) {
            return color(d);
        })
        .attr("x", 500)
        .attr("y", (d, i) =>  i * (s + 5))
        .attr("width", 20)
        .attr("height", 20)

    twosvg.selectAll("my_labels")
        .data(states)
        .enter()
        .append("text")
        .attr("x", 500 + s * 1.5)
        .attr("y", (d, i) => 5 + i * (s + 5) + (s / 2))
        .text(d => d)
        .attr("text-anchor", "left")
        .style("fill", "black")
        .style("alignment-baseline", "middle")
        .style("font-size", "15px")
        .style("font-weight", "400");



    var x = d3.scaleBand()
        .range([0, width])
        .domain(bad_qual)
        .padding(0.2);

    twosvg.append("g")
        .attr("transform", "translate(0," + (height - 15) + ")")
        .call(d3.axisBottom(x).tickSize(8))
        .selectAll("text")
        .style("text-anchor", "middle");

    var xSubgroup = d3.scaleBand()
        .domain(states)
        .range([10, x.bandwidth() - 10])
        .padding([0.2])

    var y = d3.scaleLinear()
        .range([height - 15, 0])
        .domain([4, 9]);

    twosvg.append("g")
        .call(d3.axisLeft(y));

    twosvg.append("g")
        .selectAll("g")
        .data(maindata)
        .enter()
        .append("g")
        .attr("transform", function (d) {
            if (bad_qual.includes(d.Index)) {
                return "translate(" + x(d.Index) + ",0)";
            }
        })
        .selectAll("rect")
        .data(function (d) {
            let final_data = [];
            if (bad_qual.includes(d.Index)) {
                final_data.push(states.map(function (key) { return { key: key, value: d[key] }; })[0]);
                final_data.push(states.map(function (key) { return { key: key, value: d[key] }; })[1]);
            }
            return final_data;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return xSubgroup(d.key);
        })
        .attr("y", function (d) {
            return y(4);
        })
        .attr("height", 0)
        .attr("width", xSubgroup.bandwidth())
        .transition()
        .duration(1500)
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("height", function (d) {
            return (height - 15) - y(d.value);
        })
        .attr("stroke", "black")
        .attr("fill", function (d) { return color(d.key); });


}

// function angleToCoordinate(angle, value) {
//     let x = Math.cos(angle) * radialScale(value);
//     let y = Math.sin(angle) * radialScale(value);
//     return { "x": width / 2 + x, "y": (height + 70) / 2 - y };
// }

// function angleToCoordinateText(angle, value) {
//     let x = Math.cos(angle) * radialScale(value);
//     let y = Math.sin(angle) * radialScale(value);
//     return { "x": width / 2 + x, "y": (height + 70) / 2 - y };
// }


function drawradar() {

    let container = d3.select("#one_svg").append('g')
        .attr("width", width)
        .attr("height", height)
        .attr('transform', `translate(${(width / 2) + margin.top + 45}, ${(height / 2) + margin.left  - 15})`);;

    let axesLength = 5
    let formatPercent = d3.format(',.0%')
    let wrapWidth = 60
    let axisLabelFactor = 1.1
    let axisCircles = 2
    let dotRadius = 5
    let radius = 160
    let device = d => states[d]
    let maxValue = 8

    angleSlice = Math.PI * 2 / axesLength


    let rScale = d3.scaleLinear()
        .domain([1, maxValue])
        .range([0, radius])

    var color = d3.scaleOrdinal()
        .domain(states)
        .range(['#377eb8', '#4daf4a']);
let s = 20;
    container.selectAll("my_rect")
        .data(states)
        .join("rect")
        .attr("fill", function (d) {
            return color(d);
        })
        .attr("x", 250)
        .attr("y", (d, i) =>  -195 + i * (s + 5))
        .attr("width", 20)
        .attr("height", 2)

    container.selectAll("my_labels")
        .data(states)
        .enter()
        .append("text")
        .attr("x", 250 + s * 1.5)
        .attr("y", (d, i) => -200 + i * (s + 5) + (s / 2))
        .text(d => d)
        .attr("text-anchor", "left")
        .style("fill", "black")
        .style("alignment-baseline", "middle")
        .style("font-size", "15px")
        .style("font-weight", "400");


    let radarLine = d3.lineRadial()
        .curve(d3["curveCardinalClosed"])
        .radius(d => rScale(d))
        .angle((d, i) => i * angleSlice)


    var axisGrid = container.append("g")
        .attr("class", "axisWrapper");

    axisGrid.selectAll(".levels")
        .data(d3.range(1, (axisCircles + 1)).reverse())
        .enter()
        .append("circle")
        .attr("class", "gridCircle")
        .attr("r", (d, i) => radius / axisCircles * d)
        .style("fill", "#CDCDCD")
        .style("stroke", "#CDCDCD")
        .style("fill-opacity", 0.1);

    const axis = axisGrid.selectAll(".axis")
        .data(good_qual)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("class", "line")
        .style("stroke", "white")
        .style("stroke-width", "2px");

    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("font-family", "monospace")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => rScale(maxValue * axisLabelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y", (d, i) => rScale(maxValue * axisLabelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
        .text(d => d);

    const plots = container.append('g')
        .selectAll('g')
        .data(radarData)
        .join('g')
        .attr("data-name", (d, i) => device(i))
        .attr("fill", "none")
        .attr("stroke", "steelblue");

    plots.append('path')
    .attr("fill", (d, i) => color(i))
    .attr("stroke", (d, i) => color(i))
    .attr("stroke-width", 2)
    .attr("fill-opacity", 0)
    .transition()
    .duration(1500)
    .attr("fill-opacity", 0.2)
    .attr("d", d => radarLine(d.map(v => v.value)));

    plots.selectAll("circle")
        .data(d => d)
        .join("circle")
        .attr("r", dotRadius)
        .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
        .style("fill-opacity", 0.8);
}