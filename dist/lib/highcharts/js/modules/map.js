/*
 Highmaps JS v5.0.14 (2017-07-28)
 Highmaps as a plugin for Highcharts 4.1.x or Highstock 2.1.x (x being the patch version of this file)

 (c) 2011-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(x){"object"===typeof module&&module.exports?module.exports=x:x(Highcharts)})(function(x){(function(a){var l=a.Axis,n=a.each,g=a.pick;a=a.wrap;a(l.prototype,"getSeriesExtremes",function(a){var f=this.isXAxis,p,v,l=[],m;f&&n(this.series,function(a,b){a.useMapGeometry&&(l[b]=a.xData,a.xData=[])});a.call(this);f&&(p=g(this.dataMin,Number.MAX_VALUE),v=g(this.dataMax,-Number.MAX_VALUE),n(this.series,function(a,b){a.useMapGeometry&&(p=Math.min(p,g(a.minX,p)),v=Math.max(v,g(a.maxX,v)),a.xData=l[b],
m=!0)}),m&&(this.dataMin=p,this.dataMax=v))});a(l.prototype,"setAxisTranslation",function(a){var f=this.chart,p=f.plotWidth/f.plotHeight,f=f.xAxis[0],g;a.call(this);"yAxis"===this.coll&&void 0!==f.transA&&n(this.series,function(a){a.preserveAspectRatio&&(g=!0)});if(g&&(this.transA=f.transA=Math.min(this.transA,f.transA),a=p/((f.max-f.min)/(this.max-this.min)),a=1>a?this:f,p=(a.max-a.min)*a.transA,a.pixelPadding=a.len-p,a.minPixelPadding=a.pixelPadding/2,p=a.fixTo)){p=p[1]-a.toValue(p[0],!0);p*=a.transA;
if(Math.abs(p)>a.minPixelPadding||a.min===a.dataMin&&a.max===a.dataMax)p=0;a.minPixelPadding-=p}});a(l.prototype,"render",function(a){a.call(this);this.fixTo=null})})(x);(function(a){var l=a.Axis,n=a.Chart,g=a.color,f,t=a.each,p=a.extend,v=a.isNumber,u=a.Legend,m=a.LegendSymbolMixin,c=a.noop,b=a.merge,e=a.pick,k=a.wrap;f=a.ColorAxis=function(){this.init.apply(this,arguments)};p(f.prototype,l.prototype);p(f.prototype,{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,
startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(l.prototype.keepProps),init:function(a,h){var d="vertical"!==a.options.legend.layout,r;this.coll="colorAxis";r=b(this.defaultColorAxisOptions,{side:d?2:1,reversed:!d},h,{opposite:!d,showEmpty:!1,title:null});l.prototype.init.call(this,
a,r);h.dataClasses&&this.initDataClasses(h);this.initStops();this.horiz=d;this.zoomEnabled=!1;this.defaultLegendLength=200},initDataClasses:function(a){var r,d=0,q=this.chart.options.chart.colorCount,w=this.options,e=a.dataClasses.length;this.dataClasses=r=[];this.legendItems=[];t(a.dataClasses,function(a,h){a=b(a);r.push(a);"category"===w.dataClassColor?(a.colorIndex=d,d++,d===q&&(d=0)):a.color=g(w.minColor).tweenTo(g(w.maxColor),2>e?.5:h/(e-1))})},setTickPositions:function(){if(!this.dataClasses)return l.prototype.setTickPositions.call(this)},
initStops:function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];t(this.stops,function(a){a.color=g(a[1])})},setOptions:function(a){l.prototype.setOptions.call(this,a);this.options.crosshair=this.options.marker},setAxisSize:function(){var a=this.legendSymbol,h=this.chart,d=h.options.legend||{},q,b;a?(this.left=d=a.attr("x"),this.top=q=a.attr("y"),this.width=b=a.attr("width"),this.height=a=a.attr("height"),this.right=h.chartWidth-d-b,this.bottom=h.chartHeight-
q-a,this.len=this.horiz?b:a,this.pos=this.horiz?d:q):this.len=(this.horiz?d.symbolWidth:d.symbolHeight)||this.defaultLegendLength},normalizedValue:function(a){this.isLog&&(a=this.val2lin(a));return 1-(this.max-a)/(this.max-this.min||1)},toColor:function(a,h){var d=this.stops,q,b,r=this.dataClasses,e,c;if(r)for(c=r.length;c--;){if(e=r[c],q=e.from,d=e.to,(void 0===q||a>=q)&&(void 0===d||a<=d)){h&&(h.dataClass=c,h.colorIndex=e.colorIndex);break}}else{a=this.normalizedValue(a);for(c=d.length;c--&&!(a>
d[c][0]););q=d[c]||d[c+1];d=d[c+1]||q;a=1-(d[0]-a)/(d[0]-q[0]||1);b=q.color.tweenTo(d.color,a)}return b},getOffset:function(){var a=this.legendGroup,h=this.chart.axisOffset[this.side];a&&(this.axisParent=a,l.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=h)},setLegendColor:function(){var a,h=this.reversed;a=h?1:0;h=h?0:1;a=this.horiz?[a,0,h,0]:[0,h,0,a];this.legendColor={linearGradient:{x1:a[0],y1:a[1],x2:a[2],
y2:a[3]},stops:this.stops}},drawLegendSymbol:function(a,h){var d=a.padding,q=a.options,b=this.horiz,r=e(q.symbolWidth,b?this.defaultLegendLength:12),c=e(q.symbolHeight,b?12:this.defaultLegendLength),k=e(q.labelPadding,b?16:30),q=e(q.itemDistance,10);this.setLegendColor();h.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,r,c).attr({zIndex:1}).add(h.legendGroup);this.legendItemWidth=r+d+(b?q:k);this.legendItemHeight=c+d+(b?k:0)},setState:c,visible:!0,setVisible:c,getSeriesExtremes:function(){var a=
this.series,b=a.length;this.dataMin=Infinity;for(this.dataMax=-Infinity;b--;)void 0!==a[b].valueMin&&(this.dataMin=Math.min(this.dataMin,a[b].valueMin),this.dataMax=Math.max(this.dataMax,a[b].valueMax))},drawCrosshair:function(a,b){var d=b&&b.plotX,q=b&&b.plotY,h,e=this.pos,c=this.len;b&&(h=this.toPixels(b[b.series.colorKey]),h<e?h=e-2:h>e+c&&(h=e+c+2),b.plotX=h,b.plotY=this.len-h,l.prototype.drawCrosshair.call(this,a,b),b.plotX=d,b.plotY=q,this.cross&&this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup))},
getPlotLinePath:function(a,b,d,q,e){return v(e)?this.horiz?["M",e-4,this.top-6,"L",e+4,this.top-6,e,this.top,"Z"]:["M",this.left,e,"L",this.left-6,e+6,this.left-6,e-6,"Z"]:l.prototype.getPlotLinePath.call(this,a,b,d,q)},update:function(a,e){var d=this.chart,q=d.legend;t(this.series,function(a){a.isDirtyData=!0});a.dataClasses&&q.allItems&&(t(q.allItems,function(a){a.isDataClass&&a.legendGroup&&a.legendGroup.destroy()}),d.isDirtyLegend=!0);d.options[this.coll]=b(this.userOptions,a);l.prototype.update.call(this,
a,e);this.legendItem&&(this.setLegendColor(),q.colorizeItem(this,!0))},remove:function(){this.legendItem&&this.chart.legend.destroyItem(this);l.prototype.remove.call(this)},getDataClassLegendSymbols:function(){var b=this,e=this.chart,d=this.legendItems,q=e.options.legend,k=q.valueDecimals,f=q.valueSuffix||"",g;d.length||t(this.dataClasses,function(q,h){var r=!0,w=q.from,l=q.to;g="";void 0===w?g="\x3c ":void 0===l&&(g="\x3e ");void 0!==w&&(g+=a.numberFormat(w,k)+f);void 0!==w&&void 0!==l&&(g+=" - ");
void 0!==l&&(g+=a.numberFormat(l,k)+f);d.push(p({chart:e,name:g,options:{},drawLegendSymbol:m.drawRectangle,visible:!0,setState:c,isDataClass:!0,setVisible:function(){r=this.visible=!r;t(b.series,function(a){t(a.points,function(a){a.dataClass===h&&a.setVisible(r)})});e.legend.colorizeItem(this,r)}},q))});return d},name:""});t(["fill","stroke"],function(b){a.Fx.prototype[b+"Setter"]=function(){this.elem.attr(b,g(this.start).tweenTo(g(this.end),this.pos),null,!0)}});k(n.prototype,"getAxes",function(a){var b=
this.options.colorAxis;a.call(this);this.colorAxis=[];b&&new f(this,b)});k(u.prototype,"getAllItems",function(a){var b=[],d=this.chart.colorAxis[0];d&&d.options&&(d.options.showInLegend&&(d.options.dataClasses?b=b.concat(d.getDataClassLegendSymbols()):b.push(d)),t(d.series,function(a){a.options.showInLegend=!1}));return b.concat(a.call(this))});k(u.prototype,"colorizeItem",function(a,b,d){a.call(this,b,d);d&&b.legendColor&&b.legendSymbol.attr({fill:b.legendColor})});k(u.prototype,"update",function(a){a.apply(this,
[].slice.call(arguments,1));this.chart.colorAxis[0]&&this.chart.colorAxis[0].update({},arguments[2])})})(x);(function(a){var l=a.defined,n=a.each,g=a.noop;a.colorPointMixin={isValid:function(){return null!==this.value},setVisible:function(a){var f=this,g=a?"show":"hide";n(["graphic","dataLabel"],function(a){if(f[a])f[a][g]()})},setState:function(f){a.Point.prototype.setState.call(this,f);this.graphic&&this.graphic.attr({zIndex:"hover"===f?1:0})}};a.colorSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis",
"yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:g,parallelArrays:["x","y","value"],colorKey:"value",translateColors:function(){var a=this,t=this.options.nullColor,g=this.colorAxis,l=this.colorKey;n(this.data,function(f){var m=f[l];if(m=f.options.color||(f.isNull?t:g&&void 0!==m?g.toColor(m,f):f.color||a.color))f.color=m})},colorAttribs:function(a){var f={};l(a.color)&&(f[this.colorProp||"fill"]=a.color);return f}}})(x);(function(a){function l(a){a&&
(a.preventDefault&&a.preventDefault(),a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)}function n(a){this.init(a)}var g=a.addEvent,f=a.Chart,t=a.doc,p=a.each,v=a.extend,u=a.merge,m=a.pick,c=a.wrap;n.prototype.init=function(a){this.chart=a;a.mapNavButtons=[]};n.prototype.update=function(b){var e=this.chart,c=e.options.mapNavigation,r,h=function(a){this.handler.call(e,a);l(a)},d=e.mapNavButtons;b&&(c=e.options.mapNavigation=u(e.options.mapNavigation,b));for(;d.length;)d.pop().destroy();m(c.enableButtons,
c.enabled)&&!e.renderer.forExport&&a.objectEach(c.buttons,function(a,b){r=u(c.buttonOptions,a);a=e.renderer.button(r.text,0,0,h,void 0,void 0,void 0,0,"zoomIn"===b?"topbutton":"bottombutton").addClass("highcharts-map-navigation").attr({width:r.width,height:r.height,title:e.options.lang[b],padding:r.padding,zIndex:5}).add();a.handler=r.onclick;a.align(v(r,{width:a.width,height:2*a.height}),null,r.alignTo);g(a.element,"dblclick",l);d.push(a)});this.updateEvents(c)};n.prototype.updateEvents=function(a){var b=
this.chart;m(a.enableDoubleClickZoom,a.enabled)||a.enableDoubleClickZoomTo?this.unbindDblClick=this.unbindDblClick||g(b.container,"dblclick",function(a){b.pointer.onContainerDblClick(a)}):this.unbindDblClick&&(this.unbindDblClick=this.unbindDblClick());m(a.enableMouseWheelZoom,a.enabled)?this.unbindMouseWheel=this.unbindMouseWheel||g(b.container,void 0===t.onmousewheel?"DOMMouseScroll":"mousewheel",function(a){b.pointer.onContainerMouseWheel(a);l(a);return!1}):this.unbindMouseWheel&&(this.unbindMouseWheel=
this.unbindMouseWheel())};v(f.prototype,{fitToBox:function(a,e){p([["x","width"],["y","height"]],function(b){var c=b[0];b=b[1];a[c]+a[b]>e[c]+e[b]&&(a[b]>e[b]?(a[b]=e[b],a[c]=e[c]):a[c]=e[c]+e[b]-a[b]);a[b]>e[b]&&(a[b]=e[b]);a[c]<e[c]&&(a[c]=e[c])});return a},mapZoom:function(a,c,f,r,h){var d=this.xAxis[0],b=d.max-d.min,e=m(c,d.min+b/2),k=b*a,b=this.yAxis[0],g=b.max-b.min,t=m(f,b.min+g/2),g=g*a,e=this.fitToBox({x:e-k*(r?(r-d.pos)/d.len:.5),y:t-g*(h?(h-b.pos)/b.len:.5),width:k,height:g},{x:d.dataMin,
y:b.dataMin,width:d.dataMax-d.dataMin,height:b.dataMax-b.dataMin}),k=e.x<=d.dataMin&&e.width>=d.dataMax-d.dataMin&&e.y<=b.dataMin&&e.height>=b.dataMax-b.dataMin;r&&(d.fixTo=[r-d.pos,c]);h&&(b.fixTo=[h-b.pos,f]);void 0===a||k?(d.setExtremes(void 0,void 0,!1),b.setExtremes(void 0,void 0,!1)):(d.setExtremes(e.x,e.x+e.width,!1),b.setExtremes(e.y,e.y+e.height,!1));this.redraw()}});c(f.prototype,"render",function(a){this.mapNavigation=new n(this);this.mapNavigation.update();a.call(this)})})(x);(function(a){var l=
a.extend,n=a.pick,g=a.Pointer;a=a.wrap;l(g.prototype,{onContainerDblClick:function(a){var f=this.chart;a=this.normalize(a);f.options.mapNavigation.enableDoubleClickZoomTo?f.pointer.inClass(a.target,"highcharts-tracker")&&f.hoverPoint&&f.hoverPoint.zoomTo():f.isInsidePlot(a.chartX-f.plotLeft,a.chartY-f.plotTop)&&f.mapZoom(.5,f.xAxis[0].toValue(a.chartX),f.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)},onContainerMouseWheel:function(a){var f=this.chart,g;a=this.normalize(a);g=a.detail||-(a.wheelDelta/
120);f.isInsidePlot(a.chartX-f.plotLeft,a.chartY-f.plotTop)&&f.mapZoom(Math.pow(f.options.mapNavigation.mouseWheelSensitivity,g),f.xAxis[0].toValue(a.chartX),f.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)}});a(g.prototype,"zoomOption",function(a){var f=this.chart.options.mapNavigation;n(f.enableTouchZoom,f.enabled)&&(this.chart.options.chart.pinchType="xy");a.apply(this,[].slice.call(arguments,1))});a(g.prototype,"pinchTranslate",function(a,g,l,n,u,m,c){a.call(this,g,l,n,u,m,c);"map"===this.chart.options.chart.type&&
this.hasZoom&&(a=n.scaleX>n.scaleY,this.pinchTranslateDirection(!a,g,l,n,u,m,c,a?n.scaleX:n.scaleY))})})(x);(function(a){var l=a.colorPointMixin,n=a.each,g=a.extend,f=a.isNumber,t=a.map,p=a.merge,v=a.noop,u=a.pick,m=a.isArray,c=a.Point,b=a.Series,e=a.seriesType,k=a.seriesTypes,r=a.splat,h=void 0!==a.doc.documentElement.style.vectorEffect;e("map","scatter",{allAreas:!0,animation:!1,nullColor:"#f7f7f7",borderColor:"#cccccc",borderWidth:1,marker:null,stickyTracking:!1,joinBy:"hc-key",dataLabels:{formatter:function(){return this.point.value},
inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},turboThreshold:0,tooltip:{followPointer:!0,pointFormat:"{point.name}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{brightness:.2,halo:null},select:{color:"#cccccc"}}},p(a.colorSeriesMixin,{type:"map",getExtremesFromAll:!0,useMapGeometry:!0,forceDL:!0,searchPoint:v,directTouch:!0,preserveAspectRatio:!0,pointArrayMap:["value"],getBox:function(d){var b=Number.MAX_VALUE,e=-b,c=b,h=-b,r=b,m=b,k=this.xAxis,g=this.yAxis,l;
n(d||[],function(d){if(d.path){"string"===typeof d.path&&(d.path=a.splitPath(d.path));var q=d.path||[],k=q.length,g=!1,w=-b,n=b,z=-b,p=b,t=d.properties;if(!d._foundBox){for(;k--;)f(q[k])&&(g?(w=Math.max(w,q[k]),n=Math.min(n,q[k])):(z=Math.max(z,q[k]),p=Math.min(p,q[k])),g=!g);d._midX=n+(w-n)*u(d.middleX,t&&t["hc-middle-x"],.5);d._midY=p+(z-p)*u(d.middleY,t&&t["hc-middle-y"],.5);d._maxX=w;d._minX=n;d._maxY=z;d._minY=p;d.labelrank=u(d.labelrank,(w-n)*(z-p));d._foundBox=!0}e=Math.max(e,d._maxX);c=Math.min(c,
d._minX);h=Math.max(h,d._maxY);r=Math.min(r,d._minY);m=Math.min(d._maxX-d._minX,d._maxY-d._minY,m);l=!0}});l&&(this.minY=Math.min(r,u(this.minY,b)),this.maxY=Math.max(h,u(this.maxY,-b)),this.minX=Math.min(c,u(this.minX,b)),this.maxX=Math.max(e,u(this.maxX,-b)),k&&void 0===k.options.minRange&&(k.minRange=Math.min(5*m,(this.maxX-this.minX)/5,k.minRange||b)),g&&void 0===g.options.minRange&&(g.minRange=Math.min(5*m,(this.maxY-this.minY)/5,g.minRange||b)))},getExtremes:function(){b.prototype.getExtremes.call(this,
this.valueData);this.chart.hasRendered&&this.isDirtyData&&this.getBox(this.options.data);this.valueMin=this.dataMin;this.valueMax=this.dataMax;this.dataMin=this.minY;this.dataMax=this.maxY},translatePath:function(a){var d=!1,b=this.xAxis,e=this.yAxis,c=b.min,h=b.transA,b=b.minPixelPadding,r=e.min,m=e.transA,e=e.minPixelPadding,k,g=[];if(a)for(k=a.length;k--;)f(a[k])?(g[k]=d?(a[k]-c)*h+b:(a[k]-r)*m+e,d=!d):g[k]=a[k];return g},setData:function(d,e,c,h){var q=this.options,k=this.chart.options.chart,
g=k&&k.map,w=q.mapData,l=q.joinBy,v=null===l,u=q.keys||this.pointArrayMap,y=[],B={},A=this.chart.mapTransforms;!w&&g&&(w="string"===typeof g?a.maps[g]:g);v&&(l="_i");l=this.joinBy=r(l);l[1]||(l[1]=l[0]);d&&n(d,function(a,b){var e=0;if(f(a))d[b]={value:a};else if(m(a)){d[b]={};!q.keys&&a.length>u.length&&"string"===typeof a[0]&&(d[b]["hc-key"]=a[0],++e);for(var c=0;c<u.length;++c,++e)u[c]&&(d[b][u[c]]=a[e])}v&&(d[b]._i=b)});this.getBox(d);(this.chart.mapTransforms=A=k&&k.mapTransforms||w&&w["hc-transform"]||
A)&&a.objectEach(A,function(a){a.rotation&&(a.cosAngle=Math.cos(a.rotation),a.sinAngle=Math.sin(a.rotation))});if(w){"FeatureCollection"===w.type&&(this.mapTitle=w.title,w=a.geojson(w,this.type,this));this.mapData=w;this.mapMap={};for(A=0;A<w.length;A++)k=w[A],g=k.properties,k._i=A,l[0]&&g&&g[l[0]]&&(k[l[0]]=g[l[0]]),B[k[l[0]]]=k;this.mapMap=B;d&&l[1]&&n(d,function(a){B[a[l[1]]]&&y.push(B[a[l[1]]])});q.allAreas?(this.getBox(w),d=d||[],l[1]&&n(d,function(a){y.push(a[l[1]])}),y="|"+t(y,function(a){return a&&
a[l[0]]}).join("|")+"|",n(w,function(a){l[0]&&-1!==y.indexOf("|"+a[l[0]]+"|")||(d.push(p(a,{value:null})),h=!1)})):this.getBox(y)}b.prototype.setData.call(this,d,e,c,h)},drawGraph:v,drawDataLabels:v,doFullTranslate:function(){return this.isDirtyData||this.chart.isResizing||this.chart.renderer.isVML||!this.baseTrans},translate:function(){var a=this,b=a.xAxis,e=a.yAxis,c=a.doFullTranslate();a.generatePoints();n(a.data,function(d){d.plotX=b.toPixels(d._midX,!0);d.plotY=e.toPixels(d._midY,!0);c&&(d.shapeType=
"path",d.shapeArgs={d:a.translatePath(d.path)})});a.translateColors()},pointAttribs:function(a,b){a=this.colorAttribs(a);h?a["vector-effect"]="non-scaling-stroke":a["stroke-width"]="inherit";return a},drawPoints:function(){var a=this,b=a.xAxis,e=a.yAxis,c=a.group,g=a.chart,r=g.renderer,m,f,l,p,t=this.baseTrans,y,u,v,x,G;a.transformGroup||(a.transformGroup=r.g().attr({scaleX:1,scaleY:1}).add(c),a.transformGroup.survive=!0);a.doFullTranslate()?(a.group=a.transformGroup,k.column.prototype.drawPoints.apply(a),
a.group=c,n(a.points,function(b){b.graphic&&(b.name&&b.graphic.addClass("highcharts-name-"+b.name.replace(/ /g,"-").toLowerCase()),b.properties&&b.properties["hc-key"]&&b.graphic.addClass("highcharts-key-"+b.properties["hc-key"].toLowerCase()),b.graphic.css(a.pointAttribs(b,b.selected&&"select")))}),this.baseTrans={originX:b.min-b.minPixelPadding/b.transA,originY:e.min-e.minPixelPadding/e.transA+(e.reversed?0:e.len/e.transA),transAX:b.transA,transAY:e.transA},this.transformGroup.animate({translateX:0,
translateY:0,scaleX:1,scaleY:1})):(m=b.transA/t.transAX,f=e.transA/t.transAY,l=b.toPixels(t.originX,!0),p=e.toPixels(t.originY,!0),.99<m&&1.01>m&&.99<f&&1.01>f&&(f=m=1,l=Math.round(l),p=Math.round(p)),y=this.transformGroup,g.renderer.globalAnimation?(u=y.attr("translateX"),v=y.attr("translateY"),x=y.attr("scaleX"),G=y.attr("scaleY"),y.attr({animator:0}).animate({animator:1},{step:function(a,b){y.attr({translateX:u+(l-u)*b.pos,translateY:v+(p-v)*b.pos,scaleX:x+(m-x)*b.pos,scaleY:G+(f-G)*b.pos})}})):
y.attr({translateX:l,translateY:p,scaleX:m,scaleY:f}));h||a.group.element.setAttribute("stroke-width",a.options[a.pointAttrToOptions&&a.pointAttrToOptions["stroke-width"]||"borderWidth"]/(m||1));this.drawMapDataLabels()},drawMapDataLabels:function(){b.prototype.drawDataLabels.call(this);this.dataLabelsGroup&&this.dataLabelsGroup.clip(this.chart.clipRect)},render:function(){var a=this,e=b.prototype.render;a.chart.renderer.isVML&&3E3<a.data.length?setTimeout(function(){e.call(a)}):e.call(a)},animate:function(a){var b=
this.options.animation,d=this.group,e=this.xAxis,c=this.yAxis,h=e.pos,k=c.pos;this.chart.renderer.isSVG&&(!0===b&&(b={duration:1E3}),a?d.attr({translateX:h+e.len/2,translateY:k+c.len/2,scaleX:.001,scaleY:.001}):(d.animate({translateX:h,translateY:k,scaleX:1,scaleY:1},b),this.animate=null))},animateDrilldown:function(a){var b=this.chart.plotBox,d=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],e=d.bBox,c=this.chart.options.drilldown.animation;a||(a=Math.min(e.width/b.width,e.height/
b.height),d.shapeArgs={scaleX:a,scaleY:a,translateX:e.x,translateY:e.y},n(this.points,function(a){a.graphic&&a.graphic.attr(d.shapeArgs).animate({scaleX:1,scaleY:1,translateX:0,translateY:0},c)}),this.animate=null)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,animateDrillupFrom:function(a){k.column.prototype.animateDrillupFrom.call(this,a)},animateDrillupTo:function(a){k.column.prototype.animateDrillupTo.call(this,a)}}),g({applyOptions:function(a,b){a=c.prototype.applyOptions.call(this,a,b);
b=this.series;var d=b.joinBy;b.mapData&&((d=void 0!==a[d[1]]&&b.mapMap[a[d[1]]])?(b.xyFromShape&&(a.x=d._midX,a.y=d._midY),g(a,d)):a.value=a.value||null);return a},onMouseOver:function(a){clearTimeout(this.colorInterval);if(null!==this.value||this.series.options.nullInteraction)c.prototype.onMouseOver.call(this,a);else this.series.onMouseOut(a)},zoomTo:function(){var a=this.series;a.xAxis.setExtremes(this._minX,this._maxX,!1);a.yAxis.setExtremes(this._minY,this._maxY,!1);a.chart.redraw()}},l))})(x);
(function(a){var l=a.seriesType;l("mapline","map",{},{type:"mapline",colorProp:"stroke",drawLegendSymbol:a.seriesTypes.line.prototype.drawLegendSymbol})})(x);(function(a){var l=a.merge,n=a.Point;a=a.seriesType;a("mappoint","scatter",{dataLabels:{enabled:!0,formatter:function(){return this.point.name},crop:!1,defer:!1,overflow:!1,style:{color:"#000000"}}},{type:"mappoint",forceDL:!0},{applyOptions:function(a,f){a=void 0!==a.lat&&void 0!==a.lon?l(a,this.series.chart.fromLatLonToPoint(a)):a;return n.prototype.applyOptions.call(this,
a,f)}})})(x);(function(a){var l=a.arrayMax,n=a.arrayMin,g=a.Axis,f=a.each,t=a.isNumber,p=a.noop,v=a.pick,u=a.pInt,m=a.Point,c=a.seriesType,b=a.seriesTypes;c("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},
{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,getRadii:function(a,b,c,h){var d,e,k,m=this.zData,f=[],r=this.options,g="width"!==r.sizeBy,l=r.zThreshold,n=b-a;e=0;for(d=m.length;e<d;e++)k=m[e],r.sizeByAbsoluteValue&&null!==k&&(k=Math.abs(k-l),b=Math.max(b-l,Math.abs(a-l)),a=0),null===k?k=null:k<a?k=c/2-1:(k=0<n?(k-a)/n:.5,g&&0<=k&&(k=Math.sqrt(k)),k=Math.ceil(c+k*(h-c))/2),f.push(k);
this.radii=f},animate:function(a){var b=this.options.animation;a||(f(this.points,function(a){var e=a.graphic,d;e&&e.width&&(d={x:e.x,y:e.y,width:e.width,height:e.height},e.attr({x:a.plotX,y:a.plotY,width:1,height:1}),e.animate(d,b))}),this.animate=null)},translate:function(){var e,c=this.data,m,h,d=this.radii;b.scatter.prototype.translate.call(this);for(e=c.length;e--;)m=c[e],h=d?d[e]:0,t(h)&&h>=this.minPxSize/2?(m.marker=a.extend(m.marker,{radius:h,width:2*h,height:2*h}),m.dlBox={x:m.plotX-h,y:m.plotY-
h,width:2*h,height:2*h}):m.shapeArgs=m.plotY=m.dlBox=void 0},alignDataLabel:b.column.prototype.alignDataLabel,buildKDTree:p,applyZones:p},{haloPath:function(a){return m.prototype.haloPath.call(this,0===a?0:(this.marker?this.marker.radius||0:0)+a)},ttBelow:!1});g.prototype.beforePadding=function(){var a=this,b=this.len,c=this.chart,h=0,d=b,m=this.isXAxis,g=m?"xData":"yData",p=this.min,x={},H=Math.min(c.plotWidth,c.plotHeight),D=Number.MAX_VALUE,E=-Number.MAX_VALUE,z=this.max-p,C=b/z,F=[];f(this.series,
function(b){var d=b.options;!b.bubblePadding||!b.visible&&c.options.chart.ignoreHiddenSeries||(a.allowZoomOutside=!0,F.push(b),m&&(f(["minSize","maxSize"],function(a){var b=d[a],e=/%$/.test(b),b=u(b);x[a]=e?H*b/100:b}),b.minPxSize=x.minSize,b.maxPxSize=Math.max(x.maxSize,x.minSize),b=b.zData,b.length&&(D=v(d.zMin,Math.min(D,Math.max(n(b),!1===d.displayNegative?d.zThreshold:-Number.MAX_VALUE))),E=v(d.zMax,Math.max(E,l(b))))))});f(F,function(b){var e=b[g],c=e.length,k;m&&b.getRadii(D,E,b.minPxSize,
b.maxPxSize);if(0<z)for(;c--;)t(e[c])&&a.dataMin<=e[c]&&e[c]<=a.dataMax&&(k=b.radii[c],h=Math.min((e[c]-p)*C-k,h),d=Math.max((e[c]-p)*C+k,d))});F.length&&0<z&&!this.isLog&&(d-=b,C*=(b+h-d)/b,f([["min","userMin",h],["max","userMax",d]],function(b){void 0===v(a.options[b[0]],a[b[1]])&&(a[b[0]]+=b[2]/C)}))}})(x);(function(a){var l=a.merge,n=a.Point,g=a.seriesType,f=a.seriesTypes;f.bubble&&g("mapbubble","bubble",{animationLimit:500,tooltip:{pointFormat:"{point.name}: {point.z}"}},{xyFromShape:!0,type:"mapbubble",
pointArrayMap:["z"],getMapData:f.map.prototype.getMapData,getBox:f.map.prototype.getBox,setData:f.map.prototype.setData},{applyOptions:function(a,g){return a&&void 0!==a.lat&&void 0!==a.lon?n.prototype.applyOptions.call(this,l(a,this.series.chart.fromLatLonToPoint(a)),g):f.map.prototype.pointClass.prototype.applyOptions.call(this,a,g)},ttBelow:!1})})(x);(function(a){var l=a.colorPointMixin,n=a.each,g=a.merge,f=a.noop,t=a.pick,p=a.Series,v=a.seriesType,u=a.seriesTypes;v("heatmap","scatter",{animation:!1,
borderWidth:0,dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{halo:!1,brightness:.2}}},g(a.colorSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,directTouch:!0,init:function(){var a;u.scatter.prototype.init.apply(this,arguments);a=this.options;a.pointRange=
t(a.pointRange,a.colsize||1);this.yAxis.axisPointRange=a.rowsize||1},translate:function(){var a=this.options,c=this.xAxis,b=this.yAxis,e=function(a,b,e){return Math.min(Math.max(b,a),e)};this.generatePoints();n(this.points,function(k){var m=(a.colsize||1)/2,h=(a.rowsize||1)/2,d=e(Math.round(c.len-c.translate(k.x-m,0,1,0,1)),-c.len,2*c.len),m=e(Math.round(c.len-c.translate(k.x+m,0,1,0,1)),-c.len,2*c.len),f=e(Math.round(b.translate(k.y-h,0,1,0,1)),-b.len,2*b.len),h=e(Math.round(b.translate(k.y+h,0,
1,0,1)),-b.len,2*b.len);k.plotX=k.clientX=(d+m)/2;k.plotY=(f+h)/2;k.shapeType="rect";k.shapeArgs={x:Math.min(d,m),y:Math.min(f,h),width:Math.abs(m-d),height:Math.abs(h-f)}});this.translateColors()},drawPoints:function(){u.column.prototype.drawPoints.call(this);n(this.points,function(a){a.graphic.css(this.colorAttribs(a))},this)},animate:f,getBox:f,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,alignDataLabel:u.column.prototype.alignDataLabel,getExtremes:function(){p.prototype.getExtremes.call(this,
this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;p.prototype.getExtremes.call(this)}}),l)})(x);(function(a){function l(a,c){var b,e,k,f=!1,h=a.x,d=a.y;a=0;for(b=c.length-1;a<c.length;b=a++)e=c[a][1]>d,k=c[b][1]>d,e!==k&&h<(c[b][0]-c[a][0])*(d-c[a][1])/(c[b][1]-c[a][1])+c[a][0]&&(f=!f);return f}var n=a.Chart,g=a.each,f=a.extend,t=a.format,p=a.merge,v=a.win,u=a.wrap;n.prototype.transformFromLatLon=function(f,c){if(void 0===v.proj4)return a.error(21),{x:0,y:null};f=v.proj4(c.crs,
[f.lon,f.lat]);var b=c.cosAngle||c.rotation&&Math.cos(c.rotation),e=c.sinAngle||c.rotation&&Math.sin(c.rotation);f=c.rotation?[f[0]*b+f[1]*e,-f[0]*e+f[1]*b]:f;return{x:((f[0]-(c.xoffset||0))*(c.scale||1)+(c.xpan||0))*(c.jsonres||1)+(c.jsonmarginX||0),y:(((c.yoffset||0)-f[1])*(c.scale||1)+(c.ypan||0))*(c.jsonres||1)-(c.jsonmarginY||0)}};n.prototype.transformToLatLon=function(f,c){if(void 0===v.proj4)a.error(21);else{f={x:((f.x-(c.jsonmarginX||0))/(c.jsonres||1)-(c.xpan||0))/(c.scale||1)+(c.xoffset||
0),y:((-f.y-(c.jsonmarginY||0))/(c.jsonres||1)+(c.ypan||0))/(c.scale||1)+(c.yoffset||0)};var b=c.cosAngle||c.rotation&&Math.cos(c.rotation),e=c.sinAngle||c.rotation&&Math.sin(c.rotation);c=v.proj4(c.crs,"WGS84",c.rotation?{x:f.x*b+f.y*-e,y:f.x*e+f.y*b}:f);return{lat:c.y,lon:c.x}}};n.prototype.fromPointToLatLon=function(f){var c=this.mapTransforms,b;if(c){for(b in c)if(c.hasOwnProperty(b)&&c[b].hitZone&&l({x:f.x,y:-f.y},c[b].hitZone.coordinates[0]))return this.transformToLatLon(f,c[b]);return this.transformToLatLon(f,
c["default"])}a.error(22)};n.prototype.fromLatLonToPoint=function(f){var c=this.mapTransforms,b,e;if(!c)return a.error(22),{x:0,y:null};for(b in c)if(c.hasOwnProperty(b)&&c[b].hitZone&&(e=this.transformFromLatLon(f,c[b]),l({x:e.x,y:-e.y},c[b].hitZone.coordinates[0])))return e;return this.transformFromLatLon(f,c["default"])};a.geojson=function(a,c,b){var e=[],k=[],l=function(a){var b,e=a.length;k.push("M");for(b=0;b<e;b++)1===b&&k.push("L"),k.push(a[b][0],-a[b][1])};c=c||"map";g(a.features,function(a){var b=
a.geometry,h=b.type,b=b.coordinates;a=a.properties;var m;k=[];"map"===c||"mapbubble"===c?("Polygon"===h?(g(b,l),k.push("Z")):"MultiPolygon"===h&&(g(b,function(a){g(a,l)}),k.push("Z")),k.length&&(m={path:k})):"mapline"===c?("LineString"===h?l(b):"MultiLineString"===h&&g(b,l),k.length&&(m={path:k})):"mappoint"===c&&"Point"===h&&(m={x:b[0],y:-b[1]});m&&e.push(f(m,{name:a.name||a.NAME,properties:a}))});b&&a.copyrightShort&&(b.chart.mapCredits=t(b.chart.options.credits.mapText,{geojson:a}),b.chart.mapCreditsFull=
t(b.chart.options.credits.mapTextFull,{geojson:a}));return e};u(n.prototype,"addCredits",function(a,c){c=p(!0,this.options.credits,c);this.mapCredits&&(c.href=null);a.call(this,c);this.credits&&this.mapCreditsFull&&this.credits.attr({title:this.mapCreditsFull})})})(x);(function(a){function l(a,e,c,f,h,d,g,l){return["M",a+h,e,"L",a+c-d,e,"C",a+c-d/2,e,a+c,e+d/2,a+c,e+d,"L",a+c,e+f-g,"C",a+c,e+f-g/2,a+c-g/2,e+f,a+c-g,e+f,"L",a+l,e+f,"C",a+l/2,e+f,a,e+f-l/2,a,e+f-l,"L",a,e+h,"C",a,e+h/2,a+h/2,e,a+h,
e,"Z"]}var n=a.Chart,g=a.defaultOptions,f=a.each,t=a.extend,p=a.merge,v=a.pick,u=a.Renderer,m=a.SVGRenderer,c=a.VMLRenderer;t(g.lang,{zoomIn:"Zoom in",zoomOut:"Zoom out"});g.mapNavigation={buttonOptions:{alignTo:"plotBox",align:"left",verticalAlign:"top",x:0,width:18,height:18,padding:5},buttons:{zoomIn:{onclick:function(){this.mapZoom(.5)},text:"+",y:0},zoomOut:{onclick:function(){this.mapZoom(2)},text:"-",y:28}},mouseWheelSensitivity:1.1};a.splitPath=function(a){var b;a=a.replace(/([A-Za-z])/g,
" $1 ");a=a.replace(/^\s*/,"").replace(/\s*$/,"");a=a.split(/[ ,]+/);for(b=0;b<a.length;b++)/[a-zA-Z]/.test(a[b])||(a[b]=parseFloat(a[b]));return a};a.maps={};m.prototype.symbols.topbutton=function(a,c,f,g,h){return l(a-1,c-1,f,g,h.r,h.r,0,0)};m.prototype.symbols.bottombutton=function(a,c,f,g,h){return l(a-1,c-1,f,g,0,0,h.r,h.r)};u===c&&f(["topbutton","bottombutton"],function(a){c.prototype.symbols[a]=m.prototype.symbols[a]});a.Map=a.mapChart=function(b,c,f){var e="string"===typeof b||b.nodeName,
h=arguments[e?1:0],d={endOnTick:!1,visible:!1,minPadding:0,maxPadding:0,startOnTick:!1},g,k=a.getOptions().credits;g=h.series;h.series=null;h=p({chart:{panning:"xy",type:"map"},credits:{mapText:v(k.mapText,' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),mapTextFull:v(k.mapTextFull,"{geojson.copyright}")},tooltip:{followTouchMove:!1},xAxis:d,yAxis:p(d,{reversed:!0})},h,{chart:{inverted:!1,alignTicks:!1}});h.series=g;return e?new n(b,h,f):new n(h,c)}})(x)});
