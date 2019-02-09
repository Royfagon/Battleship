
if (document.createStyleSheet) {
    document.createStyleSheet('bs.css');
}


$(document).ready(function () {
        var url = window.location.href;

        aud1 = document.getElementById("sound-effects-1");
        aud2 = document.getElementById("sound-effects-2");
        aud3 = document.getElementById("sound-effects-3");
        aud4 = document.getElementById("sound-effects-4");
        aud1.src = "audio/ping.mp3";
        aud2.src = "audio/exp1.mp3";
        aud3.src = "audio/exp2.mp3";
        aud4.src = "audio/splash.mp3";

        var results = new RegExp('[\\?&]siteid=([^&#]*)').exec(url);
        if (!results) { 
            siteid = "ops";
        }
        else
            siteid = results[1];

    bIsLoading = true;

    if (typeof window.orientation !== 'undefined')
        device_mode = "MOB";
    else
        device_mode = "PC";
    
            
    window.mobilecheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      if(check);
        device_mode = "MOB";
    };

    window.mobileAndTabletcheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      if(check);
        device_mode = "TAB";
    };

    console.log("SITE-LOAD", device_mode);
    if(device_mode !== "PC")
        OFFSET_FLT = 0;

    //var bsd = document.getElementById('page-title');
    //if(device_mode === "TAB")bsd.style.color = "#FF0000";   //RED
    //if(device_mode === "MOB")bsd.style.color = "#00FF00";   //GREEN
    //if(device_mode === "PC")bsd.style.color = "#0000FF";    //BLUE

    gUser = localStorage.getItem("game_user");
    gPswd = localStorage.getItem("game_pswd");
    console.log("game_user", gUser);

    $('#id_local').addClass("active");

    if(gUser === null)
    {
        pauseClock = true;

        //btn.style.visibility = "visible";

        var modal = document.getElementById('loginModal');
        var modalFrm = document.getElementById('loginForm');
        
        modalFrm.onclick = function(event) {
            //modal.style.display = "none";
            //modalFrm.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        modal.onclick = function(event) {
            //modal.style.display = "none";
        }

        modal.style.display = "block";    
    }
    else
    {
        $("#hdr-cfg-local").html(gUser);
        $("#hdr-cfg-remote").html(gRemoteUser);


        getStatus();

        $('#btn-reset').addClass('disable')
        $('#btn-request').addClass('disable')
        $('#btn-play-again').addClass('disable')
        $('#btn-end-game').addClass('disable')        
    }
});

var myApp = angular.module('myApp', ['ngRoute','ngResource']);

//D STUFF
var root = -1;
var HeaderText = "";
var bSV = false;
var bIsLoading = false;
var lastTab = "local";
var device_mode = "XX";
// globals
var myVar;
var angRefresh;
var processing = true;
var gUser = "";
var gPswd = "";
var gRemoteUser = "";
var apiroot = "http://localhost/battleshipapi/api/";
var imgroot = "http://localhost/battleship/images";
//var apiroot = "http://stiletto.ddns.net/battleshipapi/api/";
//var imgroot = "http://stiletto.ddns.net/battleship/images";
var pauseClock = false;
var username =  getQueryVariable("username");
var root = -1;
var dragging = 0;
var siteid = "";
var isType = "";
var barwidth = 400;
var barheight = 20;
var defaultGuid = "";
var cfg = null;
var myVar;
var sptcfg = null;
var s_profile = "";
var views_data = [];
var fadein_duration = 500;
var fadeout_duration = 500;
var strokew = 0.1;
var cell_strokew = 1;
var cell_stroke_opacity = 1;
var cell_stroke_colour = "#eee";
var svyid = "";
var idx = 0;
var offsetX = 10;
var offsetY = 0;
var s_barHeight = 20;
var cell_size = 40;
var rows = 13;
var columns = 14;
var game_id = "royfagon|caitlan";
var PLAY_MODE = false;
var PENDING_REQUEST = true;
var REQUEST_MODE = false;
var TURN_CHANGE = false;
var YOURTURN = false;
var ENDGAME = false;
var PING = 1;
var isRequested = false;
var myStatus = "";
var isIssuer = "";
var hitcount = 0;
var localHitcount = 0;
var percentage = 0;
var sunk = 0;
var lastHit = 0;
var current_status = null;
var OFFSET_FLT = 600;
var OFFSET_HIT = 0;
var last_data = null;

var aud1 = null;
var aud2 = null;
var aud3 = null;
var aud4 = null;

function SetSelect()
{
    var e = document.getElementById("company-item");
    var q = e.options[e.selectedIndex].value;
    var idd = "#company-item-button";
    $(idd).find('span').html(q);
}

function ClearCookies() {
    if (ctrlKey == 1)
    {
        localStorage.clear();
    }
}

function showLabel(txt){
  var retval = txt;
  return retval;
}

function SelectView(view){
    var idd = "";

    //reset all highlighted buttons
    for (var i=0;i<views_data.length;i++) {
        idd = "btn-" + views_data[i];
        var e = document.getElementById(idd); 
        e.style.backgroundColor = "#2B6077" 
        e.style.color = "#FFFFFF";
    }

    idd = "btn-" + view;
    var e = document.getElementById(idd);   
    e.style.backgroundColor = "white" 
    e.style.color = "#2B6077";
    ShowView(view);
}

function ShowView(view)
{
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

function DragEnd(){
  dragging = 0;
}

function getStyle(style, node)
{
  if(style != null)
  {
      //console.log("getStyle --->", style.toString());
      var arr = style.split(";"); 
      $.each(arr, function (i, obj)  //loop through all the nodes held in vectAxis0
      {
        var prop = obj.split(":"); 
        //console.log(prop);
        if(prop[0] == "fill")node.style("fill", prop[1]);
        if(prop[0] == "stroke")node.style("stroke", prop[1]);
        if(prop[0] == "stroke-opacity")node.style("stroke-opacity", prop[1]);
        if(prop[0] == "stroke-width")node.style("stroke-width", prop[1]);
      });
      
  }
}

function HideHitList(b_hide)
{
    //console.log("HideHitList", b_hide);
    
    var ctl = document.getElementById('data');
    var local = "", remote = "", request = "";

    //$("#request-tab").hide();
    

    if(b_hide)
    {
        local = "hidden";
        remote = "visible";
        $("#data").addClass("remote");
        $("#data").removeClass("local");
    }
    else
    {
        local = "visible";
        remote = "hidden";
        $("#data").addClass("local");
        $("#data").removeClass("remote");
    }
    if(device_mode !== "PC")
    {
        svg.selectAll("image.hdr").attr("visibility", "visible");
        svg.selectAll("text.txt").attr("visibility", "visible");
        svg.selectAll("image.sea").attr("visibility", local);
        svg.selectAll("image.hit").attr("visibility", remote);
    }
} 

function HideAll()
{
    //$("#request-tab").show();

    var ctl = document.getElementById('data');
    var local = "", remote = "", request = "";
    if(device_mode !== "PC")
    {
        svg.selectAll("image.hdr").attr("visibility", "hidden");
        svg.selectAll("image.sea").attr("visibility", "hidden");
        svg.selectAll("image.hit").attr("visibility", "hidden");
        svg.selectAll("text.txt").attr("visibility", "hidden");
    }
} 


function OnSelectedTab(tabView){
    
    //console.log("OnSelectedTab", tabView);

    lastTab = tabView;

    if(tabView==="remote")
    {
        $("#data").show();
        $('.header-btn').show();
        
        $("#request-tab").hide();
        $("#game-tab").hide();
        $("#users-tab").hide();
        HideHitList(true);
    }
    if(tabView==="local")
    {
        $("#data").show();
        $('.header-btn').show();
        
        $("#request-tab").hide();
        $("#users-tab").hide();
        $("#game-tab").hide();
        HideHitList(false);
    }
    if(tabView==="request")
    {
        $('.header-btn').hide();
        $("#data").hide();
        $("#request-tab").show();
        $("#users-tab").hide();
        $("#game-tab").hide();
        HideAll();
    }
    if(tabView==="active_game")
    {
        $("#data").hide();
        $('.header-btn').hide();
        $("#users-tab").hide();
        $("#request-tab").hide();
        $("#game-tab").show();
        HideAll();
    }    
    if(tabView==="users")
    {
        $('.header-btn').hide();
        $("#users-tab").show();
        $("#active-tab").hide();
        $("#request-tab").hide();
        $("#game-tab").show();
        $("#data").hide();
        HideAll();
    }    

    if(tabView==="help")
    {
        $('.header-btn').hide();
        $("#users-tab").hide();
        $("#active-tab").hide();
        $("#request-tab").hide();
        $("#game-tab").hide();
        $("#data").hide();
        HideAll();
    }    

}

function objKeydown()
{
    console.log("objKeydown ");
    
}


function buildHitZones(mode) {
    //console.log("buildHitZones");

    var nodes = tree.nodes(root);
    var height = Math.max(850, nodes.length * barHeight + margin.top + margin.bottom);

    for(x =0; x<columns; x++)
    {
        for(y =0; y<rows; y++)
        {
            createSVGObject(x, y, 0);
        }
    }
    svg.selectAll("circle").remove();
    createSVGExplosion();
}


function createSVGObject(x, y, cell_color) {
    //console.log("createSVGObject");

    var origY = y;
    var line = "";
    var clr = "#fff";

    if (cell_color === 0)
        clr = "#3299CC";
    else if (cell_color === 1)
        clr = "#cfcfcf";
    else if (cell_color === 2)
        clr = "#e0dfe3";
    else if (cell_color === 3)
        clr = "#fff";

    if(x === 0 || y === 0)
        clr = "#3299CC";
    else
        clr = "#03B4C8";

    var hdrClr = "";
    var img = "";
    var cls = "sea ";
    var hdrRC = false;
    var hdr_offset = 0;

    if(x > 0 && y > 0)
    {
        hdr_offset = OFFSET_FLT;
        hdrRC = false;
        cls = "sea ";
        hdrClr = "cell_"+x+"_"+y;
        img = imgroot+"/bs_sea.png";
    }
    else
    {
        hdr_offset = OFFSET_FLT;
        hdrRC = true;
        cls = "hdr ";
        img = imgroot+"/bs_hdr.png";
    }

    var xx = (x * (cell_size + 1)) + offsetX;
    var yy = (y * (cell_size + 1)) + offsetY;

    current_obj = svg.insert("image", "img.battleship")
        .attr("xlink:href", img)
        .attr("class", cls + hdrClr)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr('x', xx+OFFSET_FLT)
        .attr('y', yy)
        .attr("idx", "cell_"+x+"_"+y)
        .attr('width', cell_size)
        .attr('height', cell_size)
        .attr("visibility", "visible")
        .attr("hit", "X")
        .attr("isship", "0")
        .style("fill", clr)
        .on('keypress', objKeydown)
        .on("click", OnGameboardClick)   
        .style("stroke", cell_stroke_colour)
        .style("stroke-opacity", cell_stroke_opacity)
        .style("stroke-width", cell_strokew);
        //current_idx = idx;

    if(x > 0 && y > 0)
    {
        hdr_offset = OFFSET_HIT;
        hdrRC = false;
        cls = "hit ";
        hdrClr = "cell_"+x+"_"+y;
        img = imgroot+"/bs_bak.png";
    }
    else
    {
        hdr_offset = OFFSET_HIT;
        hdrRC = true;
        cls = "hdr ";
        img = imgroot+"/bs_hdr.png";
    }

     current_obj = svg.insert("image", "img.battleship")
            .attr("xlink:href", img)
            .attr("latent_img", img)
            .attr("class", cls + hdrClr)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr('x', xx+OFFSET_HIT)
            .attr('y', yy)
            .attr("idx", "hit_"+x+"_"+y)
            .attr('width', cell_size)
            .attr('height', cell_size)
            .attr("visibility", "visible")
            .attr("hit", "X")
            .attr("isship", "0")
            .style("fill", clr)
            .on('keypress', objKeydown)
            .on("click", OnGameboardClick)   
            .style("stroke", cell_stroke_colour)
            .style("stroke-opacity", cell_stroke_opacity)
            .style("stroke-width", cell_strokew);

   // }
   
    var title = "";
    if(x === 0)
        title = String.fromCharCode(64+y);
    if(y === 0)
        title = x;
    if(x === 0 && y === 0)
        title = "";

    var txTop = svg.insert("text")
        .attr("class", "txt ")
        .attr('font-family', 'Arial Unicode MS')
        .attr('font-size', 20)
        .attr('x', xx+12+OFFSET_HIT)
        .attr('y', yy+25)
        .attr('xx', x)
        .attr('yy', y)
        .attr("idx", "txt0_" + x + "_" + y)
        .style("fill", "black") 
        .attr("visibility", "visible")
        .text(title);

    var txTop = svg.insert("text")
        .attr("class", "txt ")
        .attr('font-family', 'Arial Unicode MS')
        .attr('font-size', 20)
        .attr('x', xx+12+OFFSET_FLT)
        .attr('y', yy+25)
        .attr('xx', x)
        .attr('yy', y)
        .attr("idx", "txt1_" + x + "_" + y)
        .style("fill", "black") 
        .attr("visibility", "visible")
        .text(title);
}

function createSVGExplosion() {
    current_obj = svg.append("circle")
        .attr("class", "explosion")
        .attr("cx", 0)
        .attr("cy", 0)    
        .attr("r", 0)        
        .style("fill", "#0000ff")
        .style("opacity", .5)
        .style("stroke-width", "5px")
        .attr("idx", "cell_exp")
        .style("stroke", "#cc0")
        .on("mouseover", mouseOverCell)
        .attr("visibility", "visible");
    return current_obj;
}

function mouseOverCell()
{
}

function setCenter() {
    var node = svg.selectAll(".explosion");
    var x = Number(node[0][0].getAttribute("x"));
    var y = Number(node[0][0].getAttribute("y"));
    var wd = 40;
    var ht = 40;
    var cx = x + wd/2;
    var cy = y + ht/2;
    console.log(cx,cy, );
    return {"x" : cx, "y" : cy };
}  

function object_click(){

    $('.nav-tabs a[href="#remote"]').tab('show')    

    let idd = this.getAttribute("idd");

}

function put_Horizontally(quietly, parts, index)
{
    var img = imgroot+"/bs_red.png";

    //Get random ship size from 3 to 5
    let bOK = true;
    while(bOK)
    {
        var initialRandomColumn = Math.floor((Math.random() * (columns-1)) + 1);
        var initialRandomRow = Math.floor((Math.random() * (rows-1)) + 1);
        
        let bDone = true;
        var ship_len = 0;

        while(bDone)
        {
            ship_len = Math.floor((Math.random() * 5) + 1);
            if(ship_len === parts)
                bDone = false;
        }

        //Random cell selection withing range
        var idd = ".cell_"+initialRandomColumn+"_"+initialRandomRow;
        var node = svg.selectAll(idd);

        bDone = true;
        var pos = 0;
        while(bDone)
        {
            pos = initialRandomColumn + ship_len;
            if(pos < columns)
                bDone = false;
            else
            {
                initialRandomColumn = Math.floor((Math.random() * (columns-1)) + 1);
            }
        }
        idd = ".cell_"+initialRandomColumn+"_"+initialRandomRow;
 
        bOK = false;    //turned off for collision test
        for ( i = 0; i < ship_len; i++)
        {
            var idd = ".cell_"+(initialRandomColumn + i)+"_"+initialRandomRow;
            var node = svg.selectAll(idd);
            if(node[0][0].getAttribute("isship") === "1")
            {
                bOK = true; //Try again
                break;
            }
        }

        if(!bOK)
        {
            for ( i = 0; i < ship_len; i++)
            {
                var idd = ".cell_"+(initialRandomColumn + i)+"_"+initialRandomRow;
                var node = svg.selectAll(idd);

                if(ship_len === 3)
                {
                    if(i==0)img = imgroot+"/bs_5_0_h.png";
                    if(i==1)img = imgroot+"/bs_5_1_h.png";
                    if(i==2)img = imgroot+"/bs_5_4_h.png";
                }
                if(ship_len === 4)
                {
                    if(i==0)img = imgroot+"/bs_5_0_h.png";
                    if(i==1)img = imgroot+"/bs_5_1_h.png";
                    if(i==2)img = imgroot+"/bs_5_2_h.png";
                    if(i==3)img = imgroot+"/bs_5_4_h.png";
                }
                if(ship_len === 5)
                {
                    if(i==0)img = imgroot+"/bs_5_0_h.png";
                    if(i==1)img = imgroot+"/bs_5_1_h.png";
                    if(i==2)img = imgroot+"/bs_5_2_h.png";
                    if(i==3)img = imgroot+"/bs_5_3_h.png";
                    if(i==4)img = imgroot+"/bs_5_4_h.png";
                }

                node[0][0].setAttribute("ship_part", index+"_"+i+"_"+ship_len);
                node[0][0].setAttribute("href", img);
                node[0][0].setAttribute("isship", "1");
                node[0][0].setAttribute("style", "fill: rgb(196,196,196)");
            }
        }
    }   
}

function put_Vertically(quietly, parts, index)
{
    var img = imgroot+"/bs_red.png";

    let bOK = true;
    while(bOK)
    {
        var initialRandomColumn = Math.floor((Math.random() * (columns-1)) + 1);
        var initialRandomRow = Math.floor((Math.random() * (rows-1)) + 1);

        //Get random ship size from 3 to 5
        let bDone = true;
        var ship_len = 0;

        while(bDone)
        {
            ship_len = Math.floor((Math.random() * 5) + 1);
            if(ship_len === parts)
                bDone = false;
        }

        bDone = true;
        var pos = 0;
        while(bDone)
        {
            pos = initialRandomRow + ship_len;
            if(pos < rows)
                bDone = false;
            else
            {
                initialRandomRow = Math.floor((Math.random() * (rows-1)) + 1);
            }
        }
        idd = ".cell_"+initialRandomColumn+"_"+initialRandomRow;

        bOK = false;    //turned off for collision test
        for ( i = 0; i < ship_len; i++)
        {
            var idd = ".cell_"+initialRandomColumn+"_"+(initialRandomRow+i);
            var node = svg.selectAll(idd);
            if(node[0][0].getAttribute("isship") === "1")
            {
                bOK = true; //Try again
                break;
            }
        }

        if(!bOK)
        {
            for ( i = 0; i < ship_len; i++)
            {
                var idd = ".cell_"+initialRandomColumn+"_"+(initialRandomRow+i);
                var node = svg.selectAll(idd);

                if(ship_len === 3)
                {
                    if(i==0)img = imgroot+"/bs_5_4_v.png";
                    if(i==1)img = imgroot+"/bs_5_1_v.png";
                    if(i==2)img = imgroot+"/bs_5_0_v.png";
                }
                if(ship_len === 4)
                {
                    if(i==0)img = imgroot+"/bs_5_4_v.png";
                    if(i==1)img = imgroot+"/bs_5_2_v.png";
                    if(i==2)img = imgroot+"/bs_5_1_v.png";
                    if(i==3)img = imgroot+"/bs_5_0_v.png";
                }
                if(ship_len === 5)
                {
                    if(i==0)img = imgroot+"/bs_5_4_v.png";
                    if(i==1)img = imgroot+"/bs_5_3_v.png";
                    if(i==2)img = imgroot+"/bs_5_2_v.png";
                    if(i==3)img = imgroot+"/bs_5_1_v.png";
                    if(i==4)img = imgroot+"/bs_5_0_v.png";
                }

                node[0][0].setAttribute("ship_part", index+"_"+i+"_"+ship_len);
                node[0][0].setAttribute("href", img);
                node[0][0].setAttribute("isship", "1");
                node[0][0].setAttribute("style", "fill: rgb(196,196,196)");
            }
        }
    }
}

function generateAircraftCarrier(quietly, parts, index) // 5 = Aircraft Carrier
{
    var choice = Math.floor((Math.random() * 2) );

    if (choice === 0)
        put_Horizontally(quietly, parts, index);
    else
        put_Vertically(quietly, parts, index);
}

function BuildTheFleet(quietly) // 
{
    //console.log("BuildTheFleet", REQUEST_MODE);

    if(REQUEST_MODE)
        return;

    svg.selectAll("image").remove();
    svg.selectAll("text").remove();   
 
    for(x =0; x<columns; x++)
    {
        for(y =0; y<rows; y++)
        {
            createSVGObject(x, y, 0);
        }
    }

    createSVGExplosion();

    //Generate 4 5
    generateAircraftCarrier(quietly, 5, 0);
    generateAircraftCarrier(quietly, 5, 1);
    generateAircraftCarrier(quietly, 5, 2);
    generateAircraftCarrier(quietly, 5, 3);

    //Generate 1 4
    generateAircraftCarrier(quietly, 4, 4);

    //Generate 2 3
    generateAircraftCarrier(quietly, 3, 5);
    generateAircraftCarrier(quietly, 3, 6);
    generateAircraftCarrier(quietly, 3, 7);
 
}

function btnRequest(mode, userid) // 
{
    console.log("btnRequest", mode, userid, REQUEST_MODE, PLAY_MODE);
    if(REQUEST_MODE)
        return;
    
    if(PLAY_MODE)
    {
        //console.log("GAME-IN-PLAY");
        return;
    }

    console.log("selected:",userid);

    gRemoteUser = userid;
    localStorage.setItem("remote_user", gRemoteUser);    
    
    $("#hdr-cfg-local").html(gUser);
    $("#hdr-cfg-remote").html(gRemoteUser);    
    console.log("Building LOCAL fleet");

    var hasShips = false;
    var nodes = svg.selectAll(".sea");
    $.each(nodes[0], function (i, obj)
    {
        if( obj.getAttribute("isship") === "1")
            hasShips = true;
    });  

    var jx = buildFleetJSON();
    
    if(!hasShips)
    {
        console.log("NO SHIPS SELECTED!");
        BuildTheFleet();
        btnRequest(mode, userid); //Run again
        return;
    }
    else
        console.log("SHIPS SELECTED!");

    var status = "";
    
    $.when( $.ajax({
        'url': apiroot + 'submit',
        'data': jx,
        'type' : "POST",
        'success': function (data)
        {   
            //console.log("data", data);
        },
        'error': function (jqXHRX, textStatus, errorThrown)
        {
            console.log('An error occurred in btnRequest(): '+ textStatus, errorThrown);
        },
        'dataType': 'json',
        }
    )).then(function (dataz)   //ensures this bit runs after the view list is completed
    {
        console.log('COMPLETED', dataz);
        postApiAction("FETCHGAMEBOARD");
        
        gotoGameboard();
    });
    
}

function btnPlayGame() // 
{
    if(PLAY_MODE)
    {
        console.log("GAME-IN-PLAY");
        return;
    }
}

function btnEndGame() // 
{
    if(isIssuer===gUser || ENDGAME)
    {
        PLAY_MODE = false;
        REQUEST_MODE = false;
        //console.log("END-THE-GAME");
        postApiAction("ENDGAME");
        
    }
}

function validateLogin(type){
    console.log( "validateLogin", $("#login_username").val() );
    var validatedUser = false;
    var validatedPswd = false;
    $("#login_username").each(function () {
        validatedUser =  true;
        if(this.value.length < 8)
            validatedUser = false;
        if(/\s/.test(this.value))
            validatedUser = false;
    }); 

    $("#login_password").each(function () {
        validatedPswd =  true;
        if(this.value.length < 8)
            validatedPswd = false;
        if(!/\d/.test(this.value))
            validatedPswd = false;
        if(!/[a-z]/.test(this.value))
            validatedPswd = false;
        if(!/[A-Z]/.test(this.value))
            validatedPswd = false;
        if(/[^0-9a-zA-Z]/.test(this.value))
            validatedPswd = false;
    });     

    if(!validatedUser || !validatedPswd)
    {
        if(!validatedUser)$("#messageid").html("Invalid Username");
        if(!validatedPswd)$("#messageid").html("Invalid Password");
    }
    else
    {
        var json = "{ \"user\" : \"" + $("#login_username").val() + "\", \"password\" : \"" + $("#login_password").val() + "\", \"type\" : \"" + type + "\"}";
            
        var status = "";

        $.when( $.ajax({
            'url': apiroot + 'validate',
            'data': json,
            'type' : "POST",
            'success': function (data)
            {   
                 status = data.response;
            },
            'error': function (jqXHRX, textStatus, errorThrown)
            {
                console.log('An error occurred in the validateLogin: '+ textStatus, json);
            },
            'dataType': 'json',
            }
        )).then(function (dataz)   //ensures this bit runs after the view list is completed
        {
            console.log('VALIDATED', status, dataz);

            if(status === "OK" || status === "PRESENT")
            {
                localStorage.setItem("game_user", $("#login_username").val());           
                localStorage.setItem("game_pswd", $("#login_password").val());           
                
                gUser = $("#login_username").val();

                var modal = document.getElementById('loginModal');
                var modalFrm = document.getElementById('loginForm');

                //console.log('STYLES:', modal.style.display);

                modal.style.display = "none";
                modalFrm.style.display = "none";

                //Need to check if we have a game-in-progress (GIP)
                buildHitZones(0);

                $("#hdr-cfg-local").html(gUser);
                $("#hdr-cfg-remote").html(gRemoteUser);
                console.log("PAUSE OFF");
                pauseClock = false;        
            }
            else
            {
                console.log('STATUS:', status);
                if(status=="USEREXISTS")$("#messageid").html("That username already exists");
                if(status=="PSWDFAIL")$("#messageid").html("Incorrect password");
            }

            $("#hdr-cfg-profile").html($("#login_username").val());

        });
    }    
}


function playGame(user){
    console.log("playGame", user);
    
    gRemoteUser = user;

    var json = '{\"user1\":\"'+gRemoteUser+'\",\"user2\":\"'+gUser+'\"}';
    $.when( $.ajax({
        'url': apiroot + 'startgame',
        'data': json,
        'type' : "POST",
        'success': function (data)
        {   
            console.log("Game started for", data);  //SET ACTION TO PLAY
        },
        'error': function (jqXHRX, textStatus, errorThrown)
        {
            console.log('An error occurred in the startGame: '+ textStatus);
        },
        'dataType': 'json',
        }
    )).then(function (dataz)   //ensures this bit runs after process has completed
    {
        $("#hdr-cfg-remote").html(gRemoteUser);
        postApiAction("ISPLAYING");
    });       
}

function continueGame(user){
    //console.log("playGame", user);
    
    gRemoteUser = user;

    selectRemoteUser(user);
}


function startGame(user1, user2){
    console.log("startGame", user1, user2);
}

function postApiAction(cmd, info=""){
    $("#wait").show(); 
    //See if you're playing with that user. If you are then load the gameboard for that session
    var json = '{\"command\":\"'+cmd+'\",\"user1\":\"'+gUser+'\",\"user2\":\"'+gRemoteUser+'\"}';
    if(ENDGAME)
    {
        if(isIssuer === gUser)
            json = '{\"command\":\"'+cmd+'\",\"user1\":\"'+gUser+'\",\"user2\":\"'+gRemoteUser+'\"}';
        else
            json = '{\"command\":\"'+cmd+'\",\"user1\":\"'+gRemoteUser+'\",\"user2\":\"'+gUser+'\"}';
        ENDGAME = false;
    }

    if(info.length>0)
        json = '{\"command\":\"'+cmd+'\",\"user1\":\"'+gUser+'\",\"user2\":\"'+gRemoteUser+'\", '+info+'}';

    //console.log("postApiAction", json);

    var retValue;

    $.when( $.ajax({
        'url': apiroot + 'action',
        'data': json,
        'type' : "POST",
        'success': function (data)
        {
            retValue = data;
        },
        'error': function (jqXHRX, textStatus, errorThrown)
        {
            console.log('An error occurred in the postApiAction: '+ textStatus, errorThrown);
        },
        'dataType': 'json',
        }
    )).then(function (dataz)   //ensures this bit runs after the view list is completed
    {
        //PLAY_MODE = false;
        if(dataz.action === "ISPLAYING" && dataz.response === "YES")
        {//If no fleet deployed then deploy it
            //console.log("postApiAction-XXXX", retValue.details);
            
            if( retValue.details.ships_remote.length === 0 )
            {
                //console.log("postApiAction-ZZZZ");
                
                clearGameboard();
                //REQUEST_MODE = false;

                BuildTheFleet();   
                
                hasShips = true;

                var jx = buildFleetJSON(false);
                postApiAction("UPDATEGAMEBOARD", jx);
                //console.log("postApiAction-FETCHGAMEBOARD-1");
                hitcount = 0;
                localHitcount = 0;
            }
            else
            {
                //console.log("postApiAction-FETCHGAMEBOARD-2");
                //Get the ships data and load into gameboard
                //postApiAction("FETCHGAMEBOARD");
                //PLAY_MODE = true;
                gotoGameboard();
            }
        }
        else
        {
            //Clear the gameboard
            //console.log("Clear the board @1128 with action/command:", dataz.action, cmd);

            if(dataz.action != "REQ" && 
                dataz.action != "WAIT" && 
                dataz.action != "PLAY" && 
                cmd != "UPDATEHITLIST" && 
                cmd != "GETREMOTEGAMEBOARD")
            {
                //clearGameboard();
            }
        }

        if(cmd === "ENDGAME")
        {
            clearGameboard();
        }

        if(cmd === "UPDATEGAMEBOARD")
        {
            //console.log("postApiAction-FETCHGAMEBOARD-3", dataz.ships);
            
            getuserinfo();
            //getuserinfo(true);

            var idd = "#id_"+lastTab;
            //console.log("remove active from", idd);
            
            $(idd).removeClass("active");
            $('#id_local').addClass("active");

            OnSelectedTab("local");

            //Populate the gameboard
            
            if(isIssuer === gUser)
            {
                //console.log("postApiAction-ISSUER", dataz);
                $.each(dataz.ships, function (i, obj)
                {
                    var node = svg.selectAll((".sea."+obj.cell));
                    node[0][0].setAttribute("href", obj.img);
                });           

                //Populate the gameboard
                $.each(dataz.ships, function (i, obj)
                {
                    var node = svg.selectAll((".hit."+obj.cell));
                    node[0][0].setAttribute("latent_img", obj.img);
                    node[0][0].setAttribute("isship", obj.isship);
                });    

            }
            else
            {
                //console.log("postApiAction-REQUESTED", dataz);
                $.each(dataz.ships_remote, function (i, obj)
                {
                    var node = svg.selectAll((".sea."+obj.cell));
                    node[0][0].setAttribute("href", obj.img);
                });           

                //Populate the gameboard
                $.each(dataz.ships_remote, function (i, obj)
                {
                    var node = svg.selectAll((".hit."+obj.cell));
                    node[0][0].setAttribute("latent_img", obj.img);
                    node[0][0].setAttribute("isship", obj.isship);
                });                 
            }
        }
        $("#wait").hide(); 
    });    
}

function buildFleetJSON(HASBRACKETS=true){
    //console.log("buildFleetJSON", HASBRACKETS);

    var jx = "";
    var ship = "\"ships\" : [";
    var hits = "\"hits\" : [";
    var json = "";

    if(HASBRACKETS)
        json = json + "{";    

    json = json + "\"action\":\"REQ\",";        
    json = json + "\"local_user\":\""+gUser+"\",";
    json = json + "\"remote_user\":\""+gRemoteUser+"\",";
    json = json + "\"game_id\":\""+gUser+"|"+gRemoteUser+"\",";
    json = json + "\"columns\" : " + columns+",";
    json = json + "\"rows\" : " + rows+",";

    var nodes = svg.selectAll(".sea");
    $.each(nodes[0], function (i, obj)
    {
        var sunk_img = obj.getAttribute("href").replace(".png", "_h.png");
        if( obj.getAttribute("isship") === "1")
            ship = ship + "{ \"cell\" : \"" +  obj.getAttribute("idx") + "\", \"isship\" : \"" + obj.getAttribute("isship") + "\", \"img\" : \"" + obj.getAttribute("href") + "\",\"sunk_img\" : \"" + sunk_img + "\",\"ship_part\" : \"" + obj.getAttribute("ship_part") + "\",\"hit\" : \"N\",\"sunk\" : \"N\"}";

        if( obj.getAttribute("hit") === "H" || obj.getAttribute("hit") === "M"  )
            hits = hits + "{ \"cell\" : \"" +  obj.getAttribute("idx") + "\", \"hit\" : \"" + obj.getAttribute("hit") + "\"},";
    });  

    ship = ship + "]";
    hits = hits + "]";

    json = json +  ship;
    json = json + ",";
    json = json + hits;

    var jx = ""
    if(HASBRACKETS)
        json = json = json + "}";    

    jx = json.replace("},]","}] ");    
    //console.log(json);
    return jx;
}

function UpdateHitlistJSON(cell){
    //console.log("UpdateHitlistJSON");

    var json = "{";    
    json = json + "\"command\":\"HIT\",";        
    json = json + "\"user1\":\""+gUser+"\",";
    json = json + "\"user2\":\""+gRemoteUser+"\",";
    json = json + "\"columns\" : " + columns+",";
    json = json + "\"rows\" : " + rows +",";
    json = json + "\"cell\" : \"" + cell + "\"}";

    //console.log("JX:", json);

    $.when( $.ajax({
        'url': apiroot + 'hitlist',
        'data': json,
        'type' : "POST",
        'success': function (data)
        {
            retValue = data;
        },
        'error': function (jqXHRX, textStatus, errorThrown)
        {
            console.log('An error occurred in the postApiAction: '+ textStatus, errorThrown);
        },
        'dataType': 'json',
        }
    )).then(function (dataz)   //ensures this bit runs after the view list is completed
    {
        //console.log("Update done", dataz);
        TURN_CHANGE = true;

        getStatus();
        //Reconcile the gameboard from the hitlist
        pauseClock = false;

    });
    
}

function clearGameboard(){
    //Clear the gameboard
    //console.log("Clear the board");

    buildHitZones(0);
    
    var img = imgroot+"/bs_sea.png";
    var imgh = imgroot+"/bs_bak.png";

    sunk = 0;

    svg.selectAll(".sea").attr("isship", "0").attr("hit", "X").attr("sunk", "N").attr("href", img); 
    svg.selectAll(".hit").attr("isship", "0").attr("hit", "X").attr("sunk", "N").attr("href", imgh); 

    var btn = document.getElementById('btn-status');
    btn.style.color = "#009900";
    $("#userturn")[0].innerHTML = "Not Playing";

    PLAY_MODE = false;
    REQUEST_MODE = false;

    $("#percid").removeClass("win");
    $("#percid").removeClass("lose");
    $("#percid")[0].innerHTML = 0;

    $("#hdr-cfg-local").html(gUser);
    $("#hdr-cfg-remote").html(gRemoteUser);            

}
function gotoHitlist(){
    var idd = "#id_"+lastTab;
    $(idd).removeClass("active");
    $('#id_remote').addClass("active");
    OnSelectedTab("remote");
}

function gotoGameboard(){
    var idd = "#id_"+lastTab;
    $(idd).removeClass("active");
    $('#id_local').addClass("active");
    OnSelectedTab("local");
}

function selectRemoteUser(user="")
{
    //console.log('selectRemoteUser');

    if(user.length==0)
    {
        var e = document.getElementById("gamer-item");
        gRemoteUser = e.options[e.selectedIndex].value;
    }
    localStorage.setItem("remote_user", gRemoteUser);    
    
    clearGameboard();

    $("#hdr-cfg-local").html(gUser);
    $("#hdr-cfg-remote").html(gRemoteUser);

    //See if you're playing with that user. If you are then load the gameboard for that session
    postApiAction("ISPLAYING");
}

function getStatus(){

    isRequested = false;
    
    //console.log('getStatus');
    var json = '{';
    if(isIssuer !== gUser)
        json = json + "\"game_id\":\""+gUser+"|"+gRemoteUser+"\",\"user_id\":\""+gUser+"\",\"type\":\"status\"";
    else
        json = json + "\"game_id\":\""+gRemoteUser+"|"+gUser+"\",\"user_id\":\""+gUser+"\",\"type\":\"status\"";
    json = json + "}";

    
    $.when( $.ajax({
        'url': apiroot + 'status',
        'data': json,
        'type' : "POST",
        'success': function (data)
        {   
            var q = 0;
            var k = 0;
            $("#request-tab").html("");
            $("#game-tab").html("");
            
            //console.log("getStatus", data.requests.length);
            if(data.requests != undefined)
            {
                if(data.requests.length === 0)  //Clear the board
                {
                    //console.log("No gameboard activity detected");

                    $("#requestX")[0].innerHTML = "Requests";
                    $("#activeX")[0].innerHTML = "Active Games";
                    clearGameboard();
                    $('#action_wait').hide();
                    return;
                }
                else
                {
                    //console.log("getStatus", data.requests[0].action);
                    var btn = document.getElementById('btn-status');


                    if(last_data===null)
                        last_data = data;

                    //DO COMAPRE
                    //Previous status check
                    if(current_status != null && PLAY_MODE )
                    {
                        
                        //var shiplen = 0;
                        if(isIssuer === gUser)
                        {
                            //console.log("YOU ARE THE ISSUER");
                            pHit = data.requests[0].hits_remote;
                            pShp = data.requests[0].ships_remote;
                            vHit = data.requests[0].hits;
                            vShp = data.requests[0].ships;

                            prvpHit = last_data.requests[0].hits_remote;
                            prvpShp = last_data.requests[0].ships_remote;
                            prvHit = last_data.requests[0].hits;
                            prvShp = last_data.requests[0].ships;
                        }
                        else
                        {
                            //console.log("YOU ARE NOT THE ISSUER");
                            pHit = data.requests[0].hits;   
                            pShp = data.requests[0].ships;   
                            vHit = data.requests[0].hits_remote;   
                            vShp = data.requests[0].ships_remote;   
                            
                            prvpHit = last_data.requests[0].hits;
                            prvpShp = last_data.requests[0].ships;
                            prvHit = last_data.requests[0].hits_remote;
                            prvShp = last_data.requests[0].ships_remote;
                        }

                        //AUDIO NOTIFICATION CONTROL FOR OPPOSITION
                        //console.log("AUDIO NOTIFY");
                        $.each(pShp, function (i, obj) //search my hits against opponent and update the hitboard
                        {
                            var prvObj = prvpShp[i];
                            if(obj.hit==="Y")
                            {
                                //console.log("HIT:", obj.cell, prvObj.cell);
                                if(prvObj.hit==="N")
                                {
                                    console.log("**HIT**");
                                    hit();
                                }
                                var imgMiss = imgroot+"/bs_hit.png";
                                let idd = obj.cell;
                                var nodeLocal = svg.selectAll(".hit."+ idd);
                                nodeLocal.attr("xlink:href", imgMiss );              
                            }
                        });

                        if(pHit.length>prvpHit.length)
                            splash();

                        if(vHit.length>prvHit.length)
                            splash();

                        last_data = data;
                    }

                    ////////////////////// GET USER INFO //////////////////
                    getuserinfo();
                    ///////////////////////////////////////////////////////

                    if(TURN_CHANGE)
                    {
                        TURN_CHANGE = false;

                        if(PING === 0)
                            PING = 1;
                        //console.log("TURN_CHANGE");
                    }
                }
            }
            else
            {
                if(data.user==="NOTFOUND");
                {
                    pauseClock = true;

                    localStorage.setItem("game_user", "");
                    localStorage.setItem("game_pswd", "");
                    gUser = "";
                    gRemoteUser = "";

                    $("#span-submit-1").html("Apply");
                    //var btn = document.getElementById('btn-submit-2');
                    //btn.style.visibility = "hidden";

                    $("#hdr-cfg-local").html(gUser);
                    $("#hdr-cfg-remote").html(gRemoteUser);

                    $('#id_local').addClass("active");

                    var modal = document.getElementById('loginModal');
                    var modalFrm = document.getElementById('loginForm');
                    
                        modalFrm.onclick = function(event) {
                        //modal.style.display = "none";
                        //modalFrm.style.display = "none";
                    }
                    // When the user clicks anywhere outside of the modal, close it
                    modal.onclick = function(event) {
                        //modal.style.display = "none";
                    }

                    modal.style.display = "block";    
                }
                return;
            }

            $.each(data.requests, function (i, obj)
            {
                //console.log(obj);
                
                if(obj.user_2 === gUser && obj.action==="REQ")
                {
                    q++;
                    var tddata = '<div id="btn-' + obj.user_2 + '" class="block publish_request_btn"  onclick="javascript:playGame(\''+ obj.user_1 + '\');"><span class="publish_span_btn" >' + obj.user_1 + '</span></div>';
                    $("#request-tab").append(tddata);
                    
                }
                
                //console.log(obj.user_1, "===", gUser,"|", obj.user_2, "===", gUser);
                if( (obj.user_1 === gUser || obj.user_2 === gUser ) && ( obj.action==="PLAY" || obj.action==="WAIT"))
                {
                    k++;
                    var tddata = "";

                    if(gUser === obj.user_1)
                        tddata = '<div id="btn-' + obj.user_2 + '" class="block publish_playing_btn"  onclick="javascript:continueGame(\''+ obj.user_2 + '\');"><span class="publish_span_btn" >' + obj.user_2 + '</span></div>';
                    else
                        tddata = '<div id="btn-' + obj.user_1 + '" class="block publish_playing_btn"  onclick="javascript:continueGame(\''+ obj.user_1 + '\');"><span class="publish_span_btn" >' + obj.user_1 + '</span></div>';

                    $("#game-tab").append(tddata);
                }
                
                //console.log(gUser+" status is "+obj.action, PLAY_MODE, obj.issuer);
                //console.log("ACTION: ", obj.issuer);

                isIssuer = obj.issuer;

                myStatus = obj.action;

                if(obj.action==="REQ")
                {
                    if(isIssuer === gUser)
                        REQUEST_MODE = true;
                    else
                        REQUEST_MODE = false;
                }

                if(obj.next_player!==gUser)
                {
                    REQUEST_MODE = false;
                    PLAY_MODE = true;
                    YOURTURN = false;
                    $("#userturn")[0].innerHTML = "THEIR TURN";
                    $("#userturn").addClass("disable");
                }
                
                if(obj.next_player===gUser && gRemoteUser !== "")
                {
                    REQUEST_MODE = false;
                    PLAY_MODE = true;
                    YOURTURN = true;
                    $("#userturn").removeClass("disable");
                    $("#userturn")[0].innerHTML = "YOUR TURN";
                    
                    if(PING)
                    {
                        ping();
                        PING = 0;
                    }                    
                }
            });

            if(q>0)
                $("#requestX")[0].innerHTML = "Requests ("+q+")";
            else
                $("#requestX")[0].innerHTML = "Requests";

            if(k>0)
                $("#activeX")[0].innerHTML = "Active Games ("+k+")";
            else
                $("#activeX")[0].innerHTML = "Active Games";

            //console.log("getStatus-isIssuer", isIssuer, );
        },
        'error': function (jqXHRX, textStatus, errorThrown)
        {
            console.log('An error occurred in the getStatus: '+ textStatus);
        },
        'dataType': 'json',
        }
    )).then(function (dataz)   //ensures this bit runs after the view list is completed
    {
        if(REQUEST_MODE)    //Disable buttons
        {
            $('#btn-reset').addClass('disable')
            $('#btn-request').addClass('disable')
            $('#btn-play-again').addClass('disable')
            if(myStatus !== "REQ")
                if(isIssuer!==gUser)
                    $('#btn-end-game').addClass('disable')
        }
        else if(PLAY_MODE)    //Disable buttons
        {
            $('#btn-reset').addClass('disable')
            $('#btn-request').addClass('disable')
            $('#btn-play-again').addClass('disable')
            if(myStatus !== "WAIT" || myStatus !== "PLAY")
            {
                if(isIssuer!==gUser)
                    $('#btn-end-game').addClass('disable')
                else
                    $('#btn-end-game').removeClass('disable')
            }
        }
        else
        {
            //console.log("** ENABLE BUTTONS **")
            $('#btn-reset').removeClass('disable')
            $('#btn-request').removeClass('disable')
            $('#btn-play-again').addClass('disable')

            if(isIssuer !== "")
                if(isIssuer!==gUser)
                    $('#btn-end-game').removeClass('disable')
        }

    });
    
}

function getuserinfo(fromRemote=false){
    //console.log("getuserinfo");

    if(gRemoteUser.length===0)
        return;

    var json = "{";
    json = json + "\"command\":\"GETUSERINFO\",";     
    if(isIssuer !== gUser)
        json = json + "\"game_id\":\""+gRemoteUser+"|"+gUser+"\",\"user_id\":\""+gUser+"\",\"type\":\"info\"";
    else
        json = json + "\"game_id\":\""+gUser+"|"+gRemoteUser+"\",\"user_id\":\""+gUser+"\",\"type\":\"info\"";
    json = json + "}";

    $.when( $.ajax({
        'url': apiroot + 'getuserinfo',
        'data': json,
        'type' : "POST",
        'success': function (data)
        {
            retValue = data;
        },
        'error': function (jqXHRX, textStatus, errorThrown)
        {
            console.log('An error occurred in the postApiAction: '+ textStatus, errorThrown);
        },
        'dataType': 'json',
        }
    )).then(function (dataz)   //ensures this bit runs after the view list is completed
    {
        //console.log("GOT OPPOSITION INFO", dataz.requests);

        if(dataz.requests.length===0)
            return;

        var ship_arr = new Array;
        var pHit = new Array;
        var pShp = new Array;
        var pHitOp = new Array;
        var pShpOp = new Array;
        var prvHit = new Array;
        var prvShp = new Array;
        var prvpHit = new Array;
        var prvpShp = new Array;

        var vHit = new Array;
        var vShp = new Array;
        var vHitOp = new Array;
        var vShpOp = new Array;
        
        //Previous status check
        if(current_status != null && PLAY_MODE)
        {
            
            //var shiplen = 0;
            if(isIssuer === gUser)
            {
                //console.log("YOU ARE THE ISSUER");
                pHit = dataz.requests[0].hits_remote;
                pShp = dataz.requests[0].ships_remote;
                vHit = dataz.requests[0].hits;
                vShp = dataz.requests[0].ships;
                prvShp = current_status.requests[0].ships;
                prvHit = current_status.requests[0].hits;
                prvpShp = current_status.requests[0].ships_remote;
                prvpHit = current_status.requests[0].hits_remote;
            }
            else
            {
                //console.log("YOU ARE NOT THE ISSUER");
                pHit = dataz.requests[0].hits;   
                pShp = dataz.requests[0].ships;   
                vHit = dataz.requests[0].hits_remote;   
                vShp = dataz.requests[0].ships_remote;   
                prvShp = current_status.requests[0].ships_remote;
                prvHit = current_status.requests[0].hits_remote;
                prvpShp = current_status.requests[0].ships;
                prvpHit = current_status.requests[0].hits;
            }
        }

        sunk = 0;

        //SHOW YOUR FLEET
        $.each(vShp, function (i, obj)
        {
            let idd = obj.cell;
            var nodeLocal = svg.selectAll(".sea."+ idd);
            if(obj.isship==="1")
            {
                if(obj.hit==="N" )
                    nodeLocal.attr("xlink:href", obj.img );    
                else if(obj.sunk==="Y" )
                    nodeLocal.attr("xlink:href", imgroot+"/bs_sea.png" );    
                else
                    nodeLocal.attr("xlink:href", obj.sunk_img );    
            }
            else
                nodeLocal.attr("xlink:href", imgSea );    
        });

        //Clear hits
        svg.selectAll(".hit").attr("xlink:href", imgroot+"/bs_bak.png" )

        //OVERLAY HITS
        $.each(vHit, function (i, obj) //search my hits against opponent and update the hitboard
        {
            var imgMiss = imgroot+"/bs_miss.png";
            let idd = obj.cell;
            var nodeLocal = svg.selectAll(".sea."+ idd);
            nodeLocal.attr("xlink:href", imgMiss );              
        });
        
        //OVERLAY YOUR MISSES ON YOUR BOARD
        $.each(pHit, function (i, obj) //search my hits against opponent and update the hitboard
        {
            var imgMiss = imgroot+"/bs_miss.png";
            let idd = obj.cell;
            var nodeLocal = svg.selectAll(".hit."+ idd);
            nodeLocal.attr("xlink:href", imgMiss );              
        });
        
        //OVERLAY YOUR HITS ON YOUR BOARD
        $.each(pShp, function (i, obj) //search my hits against opponent and update the hitboard
        {
            if(obj.hit==="Y")
            {
                sunk = sunk + 1;
                var imgMiss = imgroot+"/bs_hit.png";

                let idd = obj.cell;
                var nodeLocal = svg.selectAll(".hit."+ idd);

                if(obj.sunk==="Y")
                {
                    nodeLocal.attr("xlink:href", obj.sunk_img ).attr("opacity", .15);
                }
                else
                    nodeLocal.attr("xlink:href", imgMiss );              
            }
        });

        /*
        if(vHit.length>prvHit.length)
            splash();
        */
        current_status = dataz;
        /////////////////////////////////
        
        $("#percid").removeClass("win");
        $("#percid").removeClass("lose");
        $("#percid")[0].innerHTML = (sunk + " of " + vShp.length);        

        if(sunk === vShp.length)
        {

        }

        if(dataz.requests[0].winner === gUser )
        {
            if(dataz.requests[0].ship_down_for === "@@CLEARBOARD@@")
            {
                UpdateField("ship_down_for", "@@@@", "string");
                UpdateField("winner", "@@@@", "string");
                clearGameboard();
            }            

            $("#percid").addClass("win");
            $("#percid")[0].innerHTML = "YOU WIN";
            PLAY_MODE = false;
            $('#btn-play-again').removeClass('disable')
            if(gUser === isIssuer)
                $('#btn-end-game').removeClass('disable')            
        }
        else
        {
            if(dataz.requests[0].winner != "@@@@")
            {
                $("#percid").addClass("lose");
                $("#percid")[0].innerHTML = "YOU LOSE";
                PLAY_MODE = false;
                if(gUser === isIssuer)
                    $('#btn-end-game').removeClass('disable')

                if(dataz.requests[0].ship_down_for === "@@PLAYAGAIN@@")
                {
                    //console.log("@@PLAYAGAIN@@");
                    pauseClock = true;

                    var modal = document.getElementById('playAgainModal');
                    var modalFrm = document.getElementById('playAgainForm');
                    
                    modalFrm.onclick = function(event) {
                        //modal.style.display = "none";
                        //modalFrm.style.display = "none";
                    }
                    // When the user clicks anywhere outside of the modal, close it
                    modal.onclick = function(event) {
                        //modal.style.display = "none";
                    }

                    modal.style.display = "block";    
                    modalFrm.style.display = "block";

                }
            }
        }

        if(dataz.requests[0].ship_down_for !== "@@@@")
        {
            boom();
        }

        if(dataz.requests[0].ship_down_for === gUser)
        {
            var cell = dataz.requests[0].ship_cell;
            var nodeLocal = svg.selectAll(".sea."+ cell);
            var x = Number(nodeLocal.attr("x"))+20;
            var y = Number(nodeLocal.attr("y"))+20;

            svg.selectAll("circle").remove();
            var ex = createSVGExplosion();
            ex.attr("cx", x).attr("cy", y).transition().duration(1000).attr("r", "100").transition().duration(1000).attr("r", "0");

            boom();
            BattleshipDown(true);
            SinkTheShip(cell);
        }        
        
    });    
}

function hitCount(hits){
    let h = 0;
    $.each(hits, function (i, obj)
    {
        if(obj.hit==="H")
            h = h + 1;
    });
    return h;
}


function OnGameboardClick(){
    //console.log("OnGameboardClick", this);
    if(this.getAttribute("class").indexOf("sea") != -1)
    {
        btnTest(this);
        return;
    }

    if(device_mode !== "PC")
      if(lastTab != "remote")
        return;

    if(!PLAY_MODE || !YOURTURN || gRemoteUser==="")
        return;
    
    if(pauseClock)
        return;

    pauseClock = true;

    let idd = this.getAttribute("idx").replace("hit_", "cell_");;
    console.log("idd:", idd );  

    UpdateHitlistJSON(idd);
}

function BattleshipDown(reset){
    //console.log("BattleshipDown");

    var json = "{";    
    json = json + "\"user_1\":\""+isIssuer+"\",";
    if(isIssuer !== gUser)
        json = json + "\"user_2\":\""+gUser+"\",";
    else
        json = json + "\"user_2\":\""+gRemoteUser+"\",";
    if(reset)
        json = json + "\"user_down\":\"@@@@\"";
    else
        json = json + "\"user_down\":\""+gRemoteUser+"\"";
    json = json + "}";

    $.when( $.ajax({
        'url': apiroot + 'battleshipdown',
        'data': json,
        'type' : "POST",
        'success': function (data)
        {
            retValue = data;
        },
        'error': function (jqXHRX, textStatus, errorThrown)
        {
            console.log('An error occurred in the postApiAction: '+ textStatus, errorThrown);
        },
        'dataType': 'json',
        }
    )).then(function (dataz)   //ensures this bit runs after the view list is completed
    {
    });

}

function ping(){
    var playPromise = aud1.play(); 
    if (playPromise !== undefined) {
      playPromise.then(function() {
        // Automatic playback started!
      }).catch(function(error) {
        console.log("play-error-ping", error);
      });
    }
}
function hit(){
    var playPromise = aud2.play(); 
    if (playPromise !== undefined) {
      playPromise.then(function() {
        // Automatic playback started!
      }).catch(function(error) {
        console.log("play-error-hit", error);
      });
    }
}

function boom(){
    var playPromise = aud3.play(); 
    if (playPromise !== undefined) {
      playPromise.then(function() {
        // Automatic playback started!
      }).catch(function(error) {
        console.log("play-error-boom", error);
      });
    }
}

function splash(){
    var playPromise = aud4.play(); 
    if (playPromise !== undefined) {
      playPromise.then(function() {
        // Automatic playback started!
      }).catch(function(error) {
        console.log("play-error-splash", error);
      });
    }
}

function btnPlayAgain(reset){

    if(current_status.requests[0].winner === gUser )
    {
        var json = "{";    
        json = json + "\"user_1\":\""+isIssuer+"\",";
        if(isIssuer !== gUser)
            json = json + "\"user_2\":\""+gUser+"\",";
        else
            json = json + "\"user_2\":\""+gRemoteUser+"\",";
        if(reset)
            json = json + "\"user_down\":\"@@@@@\"";
        else
            json = json + "\"user_down\":\"@@PLAYAGAIN@@\"";
        json = json + "}";

        $.when( $.ajax({
            'url': apiroot + 'playagain',
            'data': json,
            'type' : "POST",
            'success': function (data)
            {
                retValue = data;
            },
            'error': function (jqXHRX, textStatus, errorThrown)
            {
                console.log('An error occurred in the postApiAction: '+ textStatus, errorThrown);
            },
            'dataType': 'json',
            }
        )).then(function (dataz)   //ensures this bit runs after the view list is completed
        {
        });    
    }
}

function deepSixIt(){

    var json = "{";    
    json = json + "\"userid\" : \""+gUser+"\",";
    if(isIssuer === gUser)
    {
        json = json + "\"issuer\" : \"Y\",";
        json = json + "\"game_id\" : \""+gUser+"|"+gRemoteUser+"\"";
    }
    else
    {
        json = json + "\"issuer\" : \"N\",";
        json = json + "\"game_id\" : \""+gRemoteUser+"|"+gUser+"\"";
    }
    json = json + "}";

    $.when( $.ajax({
        'url': apiroot + 'deepsixit',
        'data': json,
        'type' : "POST",
        'success': function (data)
        {
            retValue = data;
        },
        'error': function (jqXHRX, textStatus, errorThrown)
        {
            console.log('An error occurred in the postApiAction: '+ textStatus, errorThrown);
        },
        'dataType': 'json',
        }
    )).then(function (dataz)   //ensures this bit runs after the view list is completed
    {
        pauseClock = false;
    });  
}

function confirm(answer){
    //console.log("confirm", answer);

    if(answer==="YES")
        PlayAgain();
    else
    {
        ENDGAME = true;
        btnEndGame();
    }

    var modal = document.getElementById('playAgainModal');
    var modalFrm = document.getElementById('playAgainForm');
    modal.style.display = "none";
    modalFrm.style.display = "none";    

    pauseClock = false;
}

function PlayAgain(){
    //console.log("PlayAgain", current_status);

    clearGameboard();

    BuildTheFleet(true);
    var jx_them = buildFleetJSON();

    BuildTheFleet();
    var jx_you = buildFleetJSON();

    var json_them = JSON.stringify( JSON.parse(jx_them).ships);
    var json_you = JSON.stringify(  JSON.parse(jx_you).ships);

    
    var json = "{";    
    json = json + "\"user\": \""+gUser+"\",";
    json = json + "\"game_id\":\""+current_status.requests[0].game_id+"\",";
    if(isIssuer !== gUser)  //Not issuer
    {
        json = json + "\"ships_remote\": "+json_you+",";
        json = json + "\"ships\": "+json_them;
    }
    else
    {
        json = json + "\"ships\": "+json_you+",";
        json = json + "\"ships_remote\": "+json_them;
    }
    json = json + "}";

    //console.log(json);

    $.when( $.ajax({
        'url': apiroot + 'restartgame',
        'data': json,
        'type' : "POST",
        'success': function (data)
        {
            retValue = data;
        },
        'error': function (jqXHRX, textStatus, errorThrown)
        {
            console.log('An error occurred in the postApiAction: '+ textStatus, errorThrown);
        },
        'dataType': 'json',
        }
    )).then(function (dataz)   //ensures this bit runs after the view list is completed
    {
    });    
    

}

function UpdateField(fieldname, value, value_type)
{
    console.log("UpdateField", fieldname, value, value_type);

    clearGameboard();

    BuildTheFleet(true);
    var jx_them = buildFleetJSON();

    BuildTheFleet();
    var jx_you = buildFleetJSON();

    var json_them = JSON.stringify( JSON.parse(jx_them).ships);
    var json_you = JSON.stringify(  JSON.parse(jx_you).ships);

    
    var json = "{";    
    json = json + "\"game_id\":\""+current_status.requests[0].game_id+"\",";
        json = json + "\"field\": \""+fieldname+"\",";
        json = json + "\"value\": \""+value+"\",";
        json = json + "\"value_type\": \""+value_type+"\"";
    json = json + "}";

    $.when( $.ajax({
        'url': apiroot + 'updatefield',
        'data': json,
        'type' : "POST",
        'success': function (data)
        {
            retValue = data;
        },
        'error': function (jqXHRX, textStatus, errorThrown)
        {
            console.log('An error occurred in the postApiAction: '+ textStatus, errorThrown);
        },
        'dataType': 'json',
        }
    )).then(function (dataz)   //ensures this bit runs after the view list is completed
    {
    });    
}


myApp.controller('MainCtrl', ['$rootScope', 'Server', function ($rootScope,Server)  {

    var norefresh = false;

    console.log("Controller");

    Angular_loadUserList();
    //Angular_refreshUserList();

    function Angular_loadUserList(){
        //console.log("Angular_loadUserList");
        var jsonGet = apiroot+'gamers';
        var jsonPost = apiroot+'gamers';
        
        gUser = localStorage.getItem("game_user");
        
        var jx = "{\"userid\" : \""+gUser+"\",\"remoteid\" : \""+gRemoteUser+"\"}";
        //console.log("myApp:", jx);
        //Server.get(jsonGet).then(successCallback, errorCallback);
        Server.post(jsonPost, jx).then(successCallback, errorCallback);    
    }

    function successCallback(data){
        //console.log("successCallback", data);
        $rootScope.categories = data.data.gamers;

        if(norefresh)
            return;

        $("#wait").hide();   
        buildHitZones(0);
        myVar = setInterval(myTimer, 5000);
        Angular_refreshUserList();
    }

    function errorCallback(err){
        console.log("errorCallback:", err);
    }

    function myTimer()
    {
        if (!processing)
            console.log('Polling Stopped');
        else
            if(!pauseClock)
                getStatus();
    }          

    function userTimer()
    {
        norefresh = true;
        Angular_loadUserList();
    }

    function Angular_refreshUserList(){
        angRefresh = setInterval(userTimer, 10000);
    }

    $rootScope.requestUser = function (index, status) {
        if(status==='INPLAY')return;
        console.log("requestUser", index, status);
        btnRequest('REQ', $rootScope.categories[index].game_id);
        $rootScope.categories.splice(index, 1)
    };    

    $rootScope.listArtists = function (valx="") {
        return function (input) {
            if(input.game_id.indexOf(valx) != -1 )
                return input;
    }
  }
}]);


myApp.factory('Server', ['$http', function ($http) {
  return {

    get: function(url) {

      return $http.get(url);
    },
    
    post: function(url, pdata) {
      return $http.post(url, pdata);
    },


  };

}]);


function btnTest(thx){
    //pauseClock = true;
    //BuildTheFleet(false);
    /*
    console.log(thx);
    let idd = thx.getAttribute("idx");
    var nodeLocal = svg.selectAll(".sea."+ idd);

    svg.selectAll("circle").remove();
    createSVGExplosion();
    var explode = svg.select(".explosion");

    var x = Number(nodeLocal.attr("x"))+20;
    var y = Number(nodeLocal.attr("y"))+20;
    explode.attr("cx", x).attr("cy", y).transition().duration(1000).attr("r", "100").transition().duration(1000).attr("r", "0");
    
     SinkTheShip(idd);
    //boom();
    */
}


function SinkTheShip(){
    pauseClock = true;
    //var ship_list = current_status.requests[0].ships.sort(function(a, b){return b.ship_part > a.ship_part;});
    var ship_list = current_status.requests[0].ship_hits;
    //filter the ship from the fleet
    
    if(ship_list != undefined)
    {
        $.each(ship_list, function (i, obj) 
        {
            var nodeLocal = svg.selectAll(".sea."+ obj);
            var img = nodeLocal.attr("xlink:href");
            var img_sea = imgroot+"/bs_sea.png";
            nodeLocal.attr("xlink:href", img_sea);
        });
    }
    
    deepSixIt();
}