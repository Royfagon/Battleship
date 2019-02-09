if (document.createStyleSheet) {
    document.createStyleSheet('d3dictionary.css');
}
$(document).ready(function () {

    //GetSurveyList();

    ShowView();

    //GetDictionary("demographics", surveyid, waveid, -1, "",0,-1,-1,-1,-1);
});

// globals
var apiroot = "/snapshotapi";
var root = -1;
var HeaderText = "";
var companyIdNumber = getQueryVariable("companyid");
var isType = "";

function ShowView()
{
    GetSurvey();
    /*
    $("#maintable").html("");
    if(viewid != null)
        GetDictionaryTree(viewid, surveyid, waveid, companyIdNumber, "#maintable", "sector", "@@@");
    */
}


function allowDrop(ev) {
    //console.log( ev);
    ev.preventDefault();
}

function drag(ev) {
    //console.log( "drag");
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    console.log( "drop");
    ev.preventDefault();
    console.log(ev);
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    var str = "<b>" + data + "</b><br>";
    $("#roywashere").append(str);

}

function GetSurvey()
{
    d3.json(apiroot + '/api/xsurvey/' + companyIdNumber, 
    //d3.json("flare2.json", 
        function (error, surveys)
        {
            if (error) throw error;

            surveys.x0 = 0;
            surveys.y0 = 0;

            updateSurvey(s_root = surveys);
        })
}

function GetDictionaryTree(view, survey, wave, company, id, is_type, idd)
{
    d3.json(
        apiroot + '/api/xdictionary/'+ survey + '/root', 

        function (error, tree)
        {
            if (error) throw error;
            update(s_root = tree);
        })
}

function updateSurvey(source)
{
    console.log(source);

  // Compute the flattened node list. TODO use d3.layout.hierarchy.
  var nodes = s_tree.nodes(source);

  var height = Math.max(500, nodes.length * s_barHeight + s_margin.top + s_margin.bottom);

      d3.select("svg").transition()
          .duration(s_duration)
          .attr("height", height);

      d3.select(self.frameElement).transition()
          .duration(s_duration)
          .style("height", height + "px");

      // Compute the "layout".
      nodes.forEach(function(n, i) {
        n.x = i * s_barHeight;
      });

      // Update the nodes
      var node = s_svg.selectAll("g.node").data(nodes, function (d)
      {
          return d.id || (d.id = ++s_i);
      });

  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d)
      {
          //console.log(d.y);
          //return "translate(" + d.y + "," + d.x + ")";
          return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .style("opacity", 1e-6)
      .style("fill", "#000000");    //text color

    // Enter any new nodes at the parent's previous position.
    nodeEnter.append("rect")
      .attr("y", -s_barHeight / 2)
      .attr("height", s_barHeight)
      .attr("width", s_barWidth)
      .style("fill", colorS)
      .on("click", s_click);

    nodeEnter.append("text")
      .attr('x', 17)
      .attr("dy", 3.5)
      .attr("dx", 5.5)
      .text(function(d) { return d.name; });

    nodeEnter.append("image")
        .attr('x', 0)
        .attr('y', -9)
        .attr('width', 18)
        .attr('height', 17)
        .attr("xlink:href", function (d) {
        if (d.depth == 0)
            return "images/survey.png";
        else
            return "images/category2.png";

        })
        .style("fill", "#044B94")

    var node = s_svg.selectAll("g.node").data(nodes, function (d)
    {
        return d.id || (d.id = ++s_i);
    });

    // Transition nodes to their new position.
    nodeEnter.transition()
      .duration(s_duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1);

    node.transition()
      .duration(s_duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1)
    .select("rect")
      .style("fill", colorS);

    // Transition exiting nodes to the parent's new position.
    node.exit().transition()
      .duration(s_duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .style("opacity", 1e-6)
      .remove();

    var link = s_svg.selectAll("path.link")
      .data(s_tree.links(nodes), function (d)
      {
          return d.target.id;
      })

    // Update the links
    var link = s_svg.selectAll("path.link")
      .data(s_tree.links(nodes), function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return hv(source, source);
      })
    .transition()
    .duration(s_duration)
    .attr("d", function (d) {return hv(d.source, d.target); })

    // Transition links to their new position.
    link.transition()
      .duration(s_duration)
      .attr("d", function (d) {return hv(d.source, d.target); });

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(s_duration)
      .attr("d", function(d) {
        //var o = {x: source.x, y: source.y};
        return hv(d.source, d.target);
      })
      .remove();


  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });

}

function updateDictionary(source)
{
  // Compute the flattened node list. TODO use d3.layout.hierarchy.
  var nodes =s_tree.nodes(s_root);

  var height = Math.max(500, nodes.length *s_barHeight +s_margin.top +s_margin.bottom);

  d3.select("svg").transition()
      .duration(s_duration)
      .attr("height", height);

  d3.select(self.frameElement).transition()
      .duration(s_duration)
      .style("height", height + "px");

  // Compute the "layout".
  nodes.forEach(function(n, i) {
    n.x = i *s_barHeight;
  });

  // Update the nodes

  var node = s_svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++s_i); });

  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .style("opacity", 1e-6)
      .style("fill", "#000000");    //text color

    // Enter any new nodes at the parent's previous position.
    nodeEnter.append("rect")
      .attr("y", -s_barHeight / 2)
      .attr("height",s_barHeight)
      .attr("width",s_barWidth)
      .style("fill", colorD)
      .on("click", s_click);

    nodeEnter.append("text")
      .attr('x', 17)
      .attr("dy", 3.5)
      .attr("dx", 5.5)
      .text(function(d) { return d.name; });

    nodeEnter.append("image")
        .attr('x', 0)
        .attr('y', -9)
        .attr('width', 18)
        .attr('height', 17)
        .attr("xlink:href", function(d){
        if(d.nodetype == "C")
            return "images/category.png";
        else if(d.nodetype == "T")
            return "images/topic.png";
        else if(d.nodetype == "S")
            return "images/subject.png";
        else if (d.nodetype == "Q")
            return "images/question.png";
        else 
            return "images/answer.png";
        })
        .style("fill", "#044B94")

    // Transition nodes to their new position.
    nodeEnter.transition()
      .duration(s_duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1);

    node.transition()
      .duration(s_duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1)
    .select("rect")
      .style("fill", colorD);

    // Transition exiting nodes to the parent's new position.
    node.exit().transition()
      .duration(s_duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .style("opacity", 1e-6)
      .remove();

    var link =s_svg.selectAll("path.link")
      .data(s_tree.links(nodes), function (d)
      {
          return d.target.id;
      })

    // Update the links

    var link =s_svg.selectAll("path.link")
      .data(s_tree.links(nodes), function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return hv(source, source);
      })
    .transition()
    .duration(s_duration)
    .attr("d", function (d) {
        return hv(d.source, d.target);
    })
    .style("fill", "#000000");    //text color

    // Transition links to their new position.
    link.transition()
      .duration(s_duration)
      .attr("d", function (d) {
        return hv(d.source, d.target);
    });

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(s_duration)
      .attr("d", function(d) {
        //var o = {x: source.x, y: source.y};
        return function (d) {
        return hv(d.source, d.target); }
      })
      .remove();


  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });

}

function colorS(d)
{
    if (d.depth == 0) return "#C1CDCD";
    if (d.depth == 1) return "#F0FFFF";
}

function colorD(d)
{
    //console.log(d);
    if (d.depth > 1)
    {
        if (d.nodetype == "C") return "#EBC79E";
        if (d.nodetype == "S") return "#F5DEB3";
        if (d.nodetype == "T") return "#FFEBCD";
        if (d.nodetype == "Q") return "#E0EEEE";
    }
    else
    {
        if (d.depth == 0) return "#CDAA7D";
        if (d.depth == 1) return "#F5F5DC";
    }
    return "#ffffff";

  //return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
}

// Toggle children on click.
function s_click(cur)
{
    console.log(cur.depth);

    if (cur.depth < 1)
    {
        //Surveys
        if (cur.children)
        {
            cur._children = cur.children;
            cur.children = null;
        }
        else
        {
            cur.children = cur._children;
            cur._children = null;
        }
        updateSurvey(cur);
    }
    else
    {
        //Dictionary
        
        //if (cur.type == "answer")
        //    return;

        var nodes = s_tree.nodes(s_root);

        var bNew = false;
        if (cur.children)
        {
            cur._children = cur.children;
            cur.children = null;
            updateDictionary(cur);
        }
        else
        {
            if (cur._children)
            {
                cur.children = cur._children;
                cur._children = null;
                updateDictionary(cur);
            }
            else
            {
                bNew = true;
                console.log("New Dictionary")
            }
        }
    
        
        if(bNew)
        {
            var vCollection = new Array;

            var urlx = "";
            if (cur.depth == 1)
                urlx = apiroot + '/api/xdictionary/' + cur.sname + '/root';
            else
            {
                if(cur.nodetype == "Q")
                    urlx = apiroot + '/api/xdictionary/questions/'+cur.questionid;
                else
                    urlx = apiroot + '/api/xdictionary/hierarchy/'+cur.idd;
            }
            $.when( $.ajax(
                {
                    'url': urlx,
                    'data': {},
                    'success': function (data)
                    {
                        $.each(data, function (i, obj)
                        {
                            console.log(obj);
                            vCollection.push(obj);
                        });
                    },
                    'error': function (jqXHR, textStatus, errorThrown)
                    {
                        alert('An error occurred when loading click-json: ' + textStatus);
                    },
                    'dataType': 'json',
              }
              )).then(function (data)   //ensures this bit runs after eveything is completed
              {
                    cur.children = vCollection;
                    console.log(vCollection.length);
                    for(var i=0; i<vCollection.length; i++)
                    {
                        var obj = vCollection[i];
                        //console.log(obj.name);
                        var nextId = s_nodes.length + i + 1;
                        var n = { id: nextId, name: obj.name};
                    
                        s_nodes.push(n);

                        // Recompute the layout and data join.
                        s_node = s_node.data(s_tree.nodes(s_root), function(d) { return d.id; });
                        s_link = s_link.data(s_tree.links(nodes), function(d) { return d.source.id + "-" + d.target.id; });
        
                        // Add entering links in the parents old position.
                        s_link.enter().insert("path", ".node")
                            .attr("class", "link")
                            .attr("d", function (d)
                            {
                                var o = { x: d.source.px, y: d.source.py };

                                return diagonal(
                                    {
                                        source: o,
                                        target: o
                                    } );
                            });

                    
                        // Transition nodes and links to their new positions.
                        var t = s_svg.transition();
    
                        //t.selectAll(".link").attr("d", diagonal);

                        t.selectAll(".node")
                                .attr("x", function(d) { return d.px = d.x; })
                                .attr("y", function (d) { return d.py = d.y; });

                        updateDictionary(cur);
                    }
                
              });

        }
        
    }
}


function x(d) { console.log(d); return d.y * Math.cos((d.x - 90) / 180 * Math.PI); }

function y(d) { return d.y * Math.sin((d.x - 90) / 180 * Math.PI); }

function hv(src, trg)
{

    var str = "M" + (src.y+10) + "," + (src.x+10) + " L " + (src.y+10) + "," + trg.x;
    str = str + "L" + trg.y + "," + trg.x;
    return str;
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}