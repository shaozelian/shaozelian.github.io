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
    .attr("height", "500");

const width = $("#tree-svg").width();
const height = $("#tree-svg").height();
// console.log("width", width);
// console.log("height", height);

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
        });

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
    //populateGenearations();
    var group_g = group_container
        .append("g")
        .attr("transform", "translate(50,50)")
        .attr("fill", "#fff");
    let data_g = [
        { "id": 1, "name": "一世", "parentId": "" },
        { "id": 2, "name": "二世", "parentId": 1 },
        { "id": 3, "name": "三世", "parentId": 2 },
        { "id": 4, "name": "四世", "parentId": 3 },
        { "id": 5, "name": "五世", "parentId": 4 },
        { "id": 6, "name": "六世", "parentId": 5 },
        { "id": 7, "name": "七世", "parentId": 6 },
        { "id": 8, "name": "八世", "parentId": 7 },
        { "id": 9, "name": "九世", "parentId": 8 },
        { "id": 10, "name": "一十世", "parentId": 9 },
        { "id": 11, "name": "一十一世", "parentId": 10 },
        { "id": 12, "name": "一十二世", "parentId": 11 },
        { "id": 13, "name": "一十三世", "parentId": 12 },
        { "id": 14, "name": "一十四世", "parentId": 13 },
        { "id": 15, "name": "一十五世", "parentId": 14 },
        { "id": 16, "name": "一十六世", "parentId": 15 },
        { "id": 17, "name": "一十七世", "parentId": 16 },
        { "id": 18, "name": "一十八世", "parentId": 17 },
        { "id": 19, "name": "一十九世", "parentId": 18 },
    ];
    var tree_g = d3.tree()
        .size([10, height]);
    // populateTree(group_g, tree_g, data_g);

    var group = group_container
        .append("g")
        .attr("id", "tree-group")
        .attr("transform", "translate(50,50)")
        .attr("fill", "#fff");
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

    var nodeWidth = 50;
    var nodeHeight = 100;
    var horizontalSeparationBetweenNodes = 16;
    var verticalSeparationBetweenNodes = 300;

    var tree = d3.tree()
        .nodeSize([nodeWidth + horizontalSeparationBetweenNodes, nodeHeight + verticalSeparationBetweenNodes])
        .separation(function (a, b) {
            return a.parent == b.parent ? 1 : 1.25;
        });

    // var tree = d3.tree()
    //     .size([width, height]);
    // .separation(function (a, b) {
    //     var width = a.width + b.width;
    //     distance = width / 2 + 16; // horizontal distance between nodes = 16
    //     return distance;
    // });

    d3.csv("/assets/family-data.csv").then(data => {
        populateTree(group, tree, data);
    });
}

function populateGenearations() {
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

    //#region left tree
    const dataset_g = d3.stratify()
        .id(function (d) { return d.name; })
        .parentId(function (d) { return d.parent; })
        (data_g);
    // Compute the hierarchy with optional value aggregation
    var root_g = d3.hierarchy(dataset_g, function (d) {
        return d.children
    }).sum(d => d.value);

    const tree_g = d3.tree()
        .size([10, height]);

    var treeData_g = tree_g(root_g);
    const nodes_g1 = treeData_g.descendants();
    nodes_g1.forEach(function (d) {
        d.y = d.depth * 80;
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

    //#endregion
}

function populateTree(group, tree, data) {

    //#region right tree
    const dataset = d3.stratify()
        .id(function (d) { return d.id; })
        .parentId(function (d) { return d.parentId; })
        (data);

    // Compute the hierarchy with optional value aggregation
    var root = d3.hierarchy(dataset, function (d) {
        return d.children
    }).sum(d => d.value);
    root.x0 = 0;
    root.y0 = 0;
    var i = 0;
    var duration = 750;

    update(root);
    // console.log("root: ", root);
    function update(source) {

        // 所有节点
        var treeData = tree(root);
        const nodes = treeData.descendants();
        nodes.forEach(function (d) {
            d.y = d.depth * 80;
        });

        var node = group.selectAll("g.node").data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });

        var nodeEnter = node.enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + ", " + d.y + ")";
            }).on("click", click);
        nodeEnter.append("circle")
            .attr("class", "node")
            .attr("r", 0)
            .style("fill", function (d) {
                return d._children ? "blue" : "#fff";
            });
        nodeEnter.append("text")
            .attr("dy", ".35em")
            .text(function (d) {
                // console.log("full-name", d.data.data.full_name)
                return d.data.data.name;
            })
            .attr("x", function (d) {
                return -10;
            }).attr("y", function (d) {
                return -20;
            })
            // .attr("text-anchor", function (d) {
            //    return d.children || d._children ? "end" : "start";
            //})
            ;
        // node udpate
        var nodeUpdate = nodeEnter.merge(node);
        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.x + ", " + d.y + ")";
            });
        nodeUpdate.select("circle.node")
            .attr("r", 10)
            .style("fill", function (d) {
                return d._children ? "blue" : "#fff";
            }).attr("cursor", "pointer");
        // node exit
        var nodeExit = node.exit()
            .transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.x + ", " + source.y + ")";
            }).remove();
        nodeExit.select("circle").attr("r", 0);
        nodeExit.select("text").style("fill-opacity", 0);
        //links
        // function diagonal(s, d) {
        //     path = `M ${s.x} ${s.y}
        //   C ${(s.x + d.x)} ${s.y}
        //     ${(s.x + d.x)} ${d.y}
        //     ${d.x} ${d.y}`;
        //     return path;
        // }
        function diagonal(s, d) {
            path = `M ${s.x} ${s.y} L ${d.x} ${d.y} Z`;
            return path;
        }

        var links = treeData.descendants().slice(1);
        var link = group.selectAll("path.link")
            .data(links, function (d) {
                return d.id;
            });
        var linkEnter = link
            .enter()
            .insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = { x: source.x0, y: source.y0 };
                return diagonal(o, o);
            }).attr("fill", "none")
            .attr("stroke", "#ccc");
        var linkUpdate = linkEnter.merge(link);
        linkUpdate.transition()
            .duration(duration)
            .attr("d", function (d) {
                return diagonal(d, d.parent);
            });
        var linkExit = link
            .exit()
            .transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = { x: source.x0, y: source.y0 };
                return diagonal(o, o);
            }).remove();

        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        function click(event, d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }

    }

    //#endregion

}