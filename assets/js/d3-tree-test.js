var svg_toolbar = d3.select("#svg-container").append("div")
    .attr("class", "svg-toolbar");
var zoomOutButton = svg_toolbar
    .append("button")
    .attr("type", "button")
    .attr("id", "btn-zoom-out")
    .attr("title", "Zoom Out")
    .on("click", zoomOut)
    .append("i")
    .attr("class", "fa fa-plus");
var zoomInButton = svg_toolbar
    .append("button")
    .attr("type", "button")
    .attr("id", "btn-zoom-in")
    .attr("title", "Zoom In")
    .on("click", zoomIn)
    .append("i")
    .attr("class", "fa fa-minus");
var resetButton = svg_toolbar
    .append("button")
    .attr("type", "button")
    .attr("id", "btn-reset")
    .attr("title", "Reset Zoom")
    .on("click", resetZoom)
    .append("i")
    .attr("class", "fa fa-refresh");

const svg = d3
    .select("#svg-container")
    .append("svg")
    .attr("id", "tree-svg")
    .attr("width", "100%")
    .attr("height", 380);

const width = $("#tree-svg").width();
const height = $("#tree-svg").height();
console.log("width", width);
console.log("height", height);

let transform = {
    x: 0,
    y: 0,
    k: 1,
};
let zoom = null;
const zoomMin = 0.3;
const zoomMax = 5;

const group_container = svg.append('g')
    .attr(
        'transform',
        `translate(${transform.x},${transform.y} ) scale(${transform.k})`,
);    
bindZoom();

    function bindZoom() {
        zoom = d3.zoom()
            .scaleExtent([zoomMin, zoomMax])
            .on('zoom', function () {
                transform = d3.zoomTransform(this);
                group_container.attr('transform', transform);
                console.log(transform, 'transform...')
            })

        svg.call(zoom).on('dblclick.zoom', null);
    };

    function zoomIn() {
        svg.transition().call(zoom.scaleBy, 0.7);
    };

    function zoomOut() {
        svg.transition().call(zoom.scaleBy, 1.3);
    };

    function stopZoom() { //解除zoom绑定
        svg.on('mousedown.zoom', null);
        svg.on('mousemove.zoom', null);
        svg.on('dblclick.zoom', null);
        svg.on('touchstart.zoom', null);
    };

    function resetZoom() {
        group_container.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity);
    }


draw();

function draw() {
    
    const group_g = group_container.append("g").attr("transform", "translate(50,50)");

    let data_g = [
        { "name": "一世", "parent": "" },
        { "name": "二世", "parent": "一世" },
        { "name": "三世", "parent": "二世" },
        { "name": "四世", "parent": "三世" },
        // { "name": "5", "parent": "4" },
        // { "name": "6", "parent": "5" },
        // { "name": "7", "parent": "6" },
        // { "name": "8", "parent": "7" },
        // { "name": "9", "parent": "8" },
        // { "name": "10", "parent": "9" },
    ];

    const dataset_g = d3.stratify()
        .id(function (d) { return d.name; })
        .parentId(function (d) { return d.parent; })
        (data_g);

    const tree_g = d3.tree()
        .size([10, height])
        .separation((a, b) => {
            return (a.parent === b.parent ? 1 : 2)/a.depth;
        });

    // 所有节点
    const nodes_g = tree_g(dataset_g);    

    group_g
        .selectAll(".link")
        .data(nodes_g.links())
        .join("path")
        .attr("class", "link")
        .attr(
            "d",
            d3.linkVertical()
            .x((d) => d.x)
            .y((d) => d.y)
        )
        .attr("fill", "none")
        .attr("stroke", "#ccc");

    const nodeGroups_g = group_g
        .selectAll(".node")
        .data(nodes_g.descendants())
        .join("g")
        .attr("calss", (d) => {
            return "node" + (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", (d) => {
            return `translate(${d.x},${d.y})`;
        });

    nodeGroups_g
        .append("circle")
        .attr("r", 10);

    nodeGroups_g
        .append("text")
        .attr("dy", ".33em")
        .attr("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .text((d) => d.data.name);



    const group = group_container.append("g")
        .attr("id", "tree-group")
        .attr("transform", "translate(50,50)");

    // const color = d3.scaleOrdinal(d3.schemeCategory10);
    let data = [
        { "name": "Eve", "parent": "" },
        { "name": "Cain", "parent": "Eve" },
        { "name": "Seth", "parent": "Eve" },
        { "name": "Enos", "parent": "Seth" },
        { "name": "Noam", "parent": "Seth" },
        { "name": "Abel", "parent": "Eve" },
        { "name": "Awan", "parent": "Eve" },
        { "name": "Enoch", "parent": "Awan" },
        { "name": "Azura", "parent": "Eve" },
        { "name": "xxx", "parent": "Enoch" },
    ];

    const dataset = d3.stratify()
        .id(function (d) { return d.name; })
        .parentId(function (d) { return d.parent; })
        (data);


    // 创建树布局
    // const tree = d3.tree().size([300, 300]);
    const tree = d3.tree()
        .size([width, height])
        .separation((a, b) => {
            return (a.parent === b.parent ? 1 : 2)/a.depth;
        });

    // 所有节点
    const nodes = tree(dataset);

    group
        .selectAll(".link")
        .data(nodes.links())
        .join("path")
        .attr("class", "link")
        .attr(
            "d",
            d3.linkVertical()
            .x((d) => d.x)
            .y((d) => d.y)
        )
        .attr("fill", "none")
        .attr("stroke", "#ccc");

    const nodeGroups = group
        .selectAll(".node")
        .data(nodes.descendants())
        .join("g")
        .attr("calss", (d) => {
            return "node" + (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", (d) => {
            return `translate(${d.x},${d.y})`;
        });

    nodeGroups.append("circle")
        .attr("r", 10);

    nodeGroups
    .append("text")
    .attr("dy", ".33em")
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
        .text((d) => d.data.name);
    
}