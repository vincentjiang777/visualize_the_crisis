
 var drag = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

var width = $('.container .left svg').width(),
    height = $('.container .left svg').height(),
    svg = d3.select("svg").on("click", removeall)
    .call(drag)
    .append("g").attr("transform","translate(0,0) scale(1)");


$('body').on('click','.filter .item ul li',function(){
    var text = $(this).text();
    $(this).parents('.item').children('.title').children('span').text(text);
    if($(this).parents('.item').hasClass('year')){
        updateData(text,$('.filter .item.quarter .title span').text().replace('Q',''));
    }else if($(this).parents('.item').hasClass('quarter')){
        
        updateData($('.filter .item.year .title span').text(), text.replace('Q',''));
    }

});

updateData(2007,1);

function updateData(year,quarter){
  svg.selectAll("*").remove();
  
  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.i; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));


  d3.json("data/"+year+"-"+quarter+".json", function(error, graph) {
  if (error) throw error;

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", "1.5")  
        .attr("stroke", strokeColor);

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("stroke",  '#000')    
        .attr("r", function(d) { return (d.count/1000 + 5); })
        .attr("fill", circleColor)
        .on("click", click)
        // .call(d3.drag()
        // .on("start", dragstarted)
        // .on("drag", dragged)
        // .on("end", dragended));

    node.append("title")
        .text(function(d) { return d.lender; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }

    function click(d){
        d3.event.stopPropagation();
        current = []; 
        d3.selectAll('g line').each(function(data) {
            if(data.source.i == d.i){
                current.push(data);
            }
        });
        d3.selectAll('g circle').each(function(data) {
            for(j=0;j<current.length;j++){
                if(current[j].target.i == data.i || current[j].source.i == data.i){
                    d3.select(this).attr('fill-opacity','1');
                    d3.select(this).attr('stroke-width','2');
                    d3.select(this).attr('stroke','#000');    
                    break;
                }else{
                    d3.select(this).attr('fill-opacity','0.5');
                    d3.select(this).attr('stroke-width','0');
                } 
            }
        });

        console.log(current);
        // main selected
        lender = current[0].source.lender;
        channel = current[0].source.channel;
        purpose = current[0].source.purpose;
        loans = current[0].source.count;
        delinquency = current[0].source.dr*100;

        html = '<li class="bullet-item">Lender: <b>'+lender+'</b></li><li class="bullet-item">Channel: <b>'+channel+'</b></li><li class="bullet-item">Purpose: <b>'+purpose+'</b></li><li class="bullet-item">'+loans+' Loans</li><li class="price">'+delinquency.toFixed(2)+'% Delinquent</li>'

        $('.pricing-table').empty();
        $('.pricing-table').append(html);

        //table
        html = '';
        for(k=0;k<current.length;k++){
            similarity = current[k].similarity*100;
            lender = current[k].target.lender;
            channel = current[k].target.channel;
            purpose = current[k].target.purpose;
            loans = current[k].target.count;
            delinquency = current[k].target.dr*100;

            if(current[k].isCrit){ 
              isCrit = "YES";
            }else{  
              isCrit = "";
            }
            html += '<tr><td>'+similarity.toFixed(2)+'%</td><td>'+isCrit+'</td> <td>'+lender+'</td><td>'+channel+'</td><td>'+purpose+'</td><td>'+loans+'</td><td>'+delinquency.toFixed(2)+'%</td></tr>';
        }
        $('table tbody').empty();
        $('table tbody').append(html);
    }
  });






}



function removeall(){
  d3.selectAll('g circle').each(function(data) {
      d3.select(this).transition().duration(500).attr('fill-opacity','1').attr('stroke-width','1').attr('stroke','#000');
  });
}


  function strokeColor(d){
  if(d.isCrit == true){
      color = '#5b5b5b';    
  }else{
      color = '#909090';
  }
  return color;
}

function circleColor(d){
  if(d.dr*100 <= 0){
      color = '#fff';
  }else if(d.dr*100 > 0 && d.dr*100 <= 10){

    var color = d3.scaleLinear()
        .domain([0, 10])
        .range(["#ffffff", "#aab9cd"]);

     color = color(d.dr*100);

  }else if(d.dr*100 > 10 && d.dr*100 <= 15){

      var color = d3.scaleLinear()
        .domain([10, 15])
        .range(["#aab9cd", "#8097b7"]);

     color = color(d.dr*100);

  }else if(d.dr*100 > 15 && d.dr*100 < 25){

      var color = d3.scaleLinear()
        .domain([15, 25])
        .range(["#aab9cd", "#033070"]);

     color = color(d.dr*100);

  }else{
     color = '#033070';
  }
  return color;
}


function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.event.sourceEvent.preventDefault;
  console.log("start")
}

function dragged(e) {
  var t = getTranslation(svg.attr("transform"));
  console.log(t); 
  svg.attr("transform", "translate(" + [t[0] + d3.event.dx, t[1] + d3.event.dy] + ") scale(" + t[2] + ")")
}

function dragended(d) {
  console.log("end")
}

function getTranslation(transform) {
  // Create a dummy g for calculation purposes only. This will never
  // be appended to the DOM and will be discarded once this function 
  // returns.
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  // Set the transform attribute to the provided string value.
  g.setAttributeNS(null, "transform", transform);
  
  // consolidate the SVGTransformList containing all transformations
  // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
  // its SVGMatrix. 
  var matrix = g.transform.baseVal.consolidate().matrix;
  console.log(matrix);
  // As per definition values e and f are the ones for the translation.
  return [matrix.e, matrix.f, matrix.a];
}

