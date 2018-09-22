
var COLORS = {
  done: '#0f0',
  parent: 'lightsteelblue'
}

module.exports = D3Tree

function D3Tree(node, config) {
  config = config || {}
  var margin = config.margin || {top: 20, right: 120, bottom: 20, left: 120},
      width = (config.width || 960) - margin.right - margin.left,
      height = (config.height || 800) - margin.top - margin.bottom;

  if (!config.easing) {
    config.easing = 'cubic-in-out'
  }
  this.posmap = {}
  this.width = width
  this.height = height
  this.duration = config.duration || 750
  this.config = config

  this.tree = d3.layout.tree()
      .children(function (d) {
        if (!d.hidesChildren && d.children && d.collapsed && d.children.length) {
          d.hidesChildren = true
        }
        return d.collapsed ? null : d.children
      })
      .size([height, width]);

  var diagonal = this.diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

  this.svg = d3.select(node).append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  if (config.data) {
    this.update(config.data)
  }
}

D3Tree.prototype = {
  setActive: function (id) {
    this.svg.select('.node.active').classed('active', false)
    if (id) this.svg.select('.node-' + id).classed('active', true)
  },
  setEditing: function (id) {
    this.svg.select('.node.editing').classed('editing', false)
    if (id) this.svg.select('.node-' + id).classed('editing', true)
  },
  setText: function (id, text) {
    this.svg.select('.node-' + id + ' text').text(text)
  },
  update: function (data, active) {
    data.x0 = this.height / 2;
    data.y0 = 0;
    this.posmap[data.id] = {x: data.x0, y: data.y0}
    data.collapsed = false

    var byId = {}
    function crawl(node) {
      byId[node.id] = node
      node.children && node.children.map(crawl)
    }
    crawl(data)


    // Compute the new tree layout.
    var nodes = this.tree.nodes(data).reverse(),
        links = this.tree.links(nodes);

    var classNames = d => {
      var cls = 'node node-' + d.id
      if (d.done) cls += ' done'
      if (d.collapsed && d.hidesChildren) cls += ' collapsed'
      if (active === d.id) cls += ' active'
      return cls
    }

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });

    // Update the nodes…
    var node = this.svg.selectAll("g.node")
        .data(nodes, function(d) {
          return d.id
        })
        .attr("class", classNames)

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", classNames)
        .attr("transform", d => {
          var source = d.parent || d
          while (source.parent && !this.posmap[source.id]) {
            source = source.parent
          }
          var _source = this.posmap[source.id] || d.parent || data
          return "translate(" + (_source.y0 || _source.y) + "," + (_source.x0 || _source.x) + ")";
        })

    nodeEnter.append("circle")
        .attr("r", 1e-6)
        // Toggle children on click.
        .on("click", d => this.config.onCollapse(d.id, !d.collapsed))

    nodeEnter.append("text")
        .attr("x", this.config.circleRad * 1.5)
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return "start"; })
        .text(function(d) { return d.content; })
        .style("fill-opacity", 1e-6)
        .on('click', d => this.config.onClickNode(d.id))

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(this.duration)
        .ease(this.config.easing)
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

    nodeUpdate.select("circle")
        .attr("r", this.config.circleRad || 4.5)

    nodeUpdate.select("text")
        .text(function(d) { return d.content; })
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(this.duration)
        .ease(this.config.easing)
        .attr("transform", function(d) {
          var parent = d.parent
          while (!byId[parent.id] || !byId[parent.id].x) {
            parent = parent.parent
          }
          var source = byId[parent.id]
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = this.svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", d => {
          var source = d.source
          while (source.parent && !this.posmap[source.id]) {
            source = source.parent
          }
          var o = this.posmap[source.id] || {x: source.x0 || source.x, y: source.y0 || source.y};
          return this.diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.transition()
        .duration(this.duration)
        .ease(this.config.easing)
        .attr("d", this.diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(this.duration)
        .ease(this.config.easing)
        .attr("d", d => {
          var parent = d.source
          while (!byId[parent.id] || !byId[parent.id].x) {
            parent = parent.parent
          }
          var source = byId[parent.id]
          var o = {x: source.x, y: source.y};
          return this.diagonal({source: o, target: o});
        })
        .remove();

    this.posmap = {}
    // Stash the old positions for transition.
    nodes.forEach(d => {
      d.x0 = d.x;
      d.y0 = d.y;
      this.posmap[d.id] = {x: d.x, y: d.y}
    });
  },
}

