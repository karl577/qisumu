window.DP={};
/*
 Inspired by the lightbox plugin adapted to jquery by Leandro Vieira Pinho (http://leandrovieira.com)
 @author  : Nicolas Turlais : nicolas-at-insipi.de
 @version : V0.3.1 - June 2012
 @license : Licensed under CCAttribution-ShareAlike
 @website : http://chocolat.insipi.de
*/
(function($){images=[];var calls=0;$.fn.Chocolat=function(settings){settings=$.extend({container:$("body"),displayAsALink:false,linkImages:true,linksContainer:"Choco_links_container",overlayOpacity:0.9,overlayColor:"#fff",fadeInOverlayduration:100,fadeInImageduration:100,fadeOutImageduration:100,vache:true,separator1:" | ",separator2:"/",currentImage:0,setIndex:0,setTitle:"",lastImage:0},settings);calls++;settings.setIndex=calls;images[settings.setIndex]=[];this.each(function(index){if(index==0&&settings.linkImages&&settings.setTitle==""){settings.setTitle=isSet($(this).attr("rel")," ")}$(this).each(function(){images[settings.setIndex]["displayAsALink"]=settings.displayAsALink;images[settings.setIndex][index]=[];images[settings.setIndex][index]["adress"]=isSet($(this).attr("href")," ");if(!settings.displayAsALink){$(this).unbind("click").bind("click",{id:settings.setIndex,nom:settings.setTitle,i:index},_initialise)}})});for(var i=0;i<images[settings.setIndex].length;i++){if(images[settings.setIndex]["displayAsALink"]){if($("#"+settings.linksContainer).size()==0){this.filter(":first").before('<ul id="'+settings.linksContainer+'"></ul>')}$("#"+settings.linksContainer).append('<li><a href="#" id="Choco_numsetIndex_'+settings.setIndex+'" class="Choco_link">'+settings.setTitle+"</a></li>");e=this.parent();$(this).remove();if($.trim(e.html())==""){e.remove()}return $("#Choco_numsetIndex_"+settings.setIndex).unbind("click").bind("click",{id:settings.setIndex,nom:settings.setTitle,i:settings.currentImage},_initialise)}}function _initialise(event){settings.currentImage=event.data.i;settings.setIndex=event.data.id;settings.setTitle=event.data.nom;settings.lastImage=images[settings.setIndex].length-1;showChocolat();return false}function _interface(){clear();settings.container.append('<div id="Choco_overlay"></div><div id="Choco_content"><div id="Choco_loading"></div><div id="Choco_container_photo"><img id="Choco_bigImage" src="" /></div><div id="Choco_left_arrow" class="Choco_arrows icon-arrow-left"></div><div id="Choco_right_arrow" class="Choco_arrows icon-arrow-right"></div></div>');if(settings.container.get(0).nodeName.toLowerCase()!=="body"){settings.container.css({"position":"relative","overflow":"hidden","line-height":"normal"});$("#Choco_content").css("position","relative");$("#Choco_overlay").css("position","absolute")}$(document).unbind("keydown").bind("keydown",function(e){switch(e.keyCode){case 37:changePageChocolat(-1);break;case 39:changePageChocolat(1);break;case 27:close();break}});if(settings.vache){$("#Choco_overlay").click(function(){close();return false})}$("#Choco_left_arrow").unbind().bind("click",function(){changePageChocolat(-1);return false});$("#Choco_right_arrow").unbind().bind("click",function(){changePageChocolat(1);return false});$(window).resize(function(){load(settings.currentImage,true)})}function showChocolat(){_interface();load(settings.currentImage,false);$("#Choco_overlay").css({"background-color":settings.overlayColor,"opacity":settings.overlayOpacity}).fadeIn(settings.fadeInOverlayduration);$("#Choco_content").fadeIn(settings.fadeInImageduration,function(){})}function load(image,resize){settings.currentImage=image;$("#Choco_loading").fadeIn(settings.fadeInImageduration);var imgPreloader=new Image();imgPreloader.onload=function(){$("#Choco_bigImage").attr("src",images[settings.setIndex][settings.currentImage]["adress"]);var ajustees=iWantThePerfectImageSize(imgPreloader.height,imgPreloader.width);ChoColat(ajustees["hauteur"],ajustees["largeur"],resize);$("#Choco_loading").stop().fadeOut(settings.fadeOutImageduration)};imgPreloader.src=images[settings.setIndex][settings.currentImage]["adress"];preload()}function changePageChocolat(signe){if(!settings.linkImages||(settings.currentImage==0&&signe==-1)||(settings.currentImage==settings.lastImage&&signe==1)){return false}else{$("#Choco_container_description").css("visibility","hidden");$("#Choco_bigImage").fadeTo(settings.fadeOutImageduration,0,function(){load(settings.currentImage+parseInt(signe),false)})}}function ChoColat(hauteur_image,largeur_image,resize){if(resize){$("#Choco_container_photo, #Choco_content, #Choco_bigImage").stop(true,false).css({"overflow":"visible"});$("#Choco_bigImage").animate({"height":hauteur_image+"px","width":largeur_image+"px"},settings.fadeInImageduration)}$("#Choco_container_photo").animate({"height":hauteur_image,"width":largeur_image},settings.fadeInImageduration);$("#Choco_content").animate({"height":hauteur_image,"width":largeur_image,"marginLeft":-largeur_image/2,"marginTop":-(hauteur_image)/2},settings.fadeInImageduration,"swing",function(){$("#Choco_bigImage").fadeTo(settings.fadeInImageduration,1).height(hauteur_image).width(largeur_image);if(!resize){arrowsManaging();$("#Choco_container_description").css("visibility","visible");$("#Choco_close").fadeIn(settings.fadeInImageduration)}}).css("overflow","visible")}function arrowsManaging(){if(settings.linkImages){var what=["Choco_right_arrow","Choco_left_arrow"];for(var i=0;i<what.length;i++){hide=false;if(what[i]=="Choco_right_arrow"&&settings.currentImage==settings.lastImage){hide=true;$("#"+what[i]).fadeOut(300)}else{if(what[i]=="Choco_left_arrow"&&settings.currentImage==0){hide=true;$("#"+what[i]).fadeOut(300)}}if(!hide){$("#"+what[i]).fadeIn(settings.fadeOutImageduration)}}}}function preload(){if(settings.currentImage!==settings.lastImage){i=new Image;z=settings.currentImage+1;i.src=images[settings.setIndex][z]["adress"]}}function isSet(variable,defaultValue){if(variable===undefined){return defaultValue}else{return variable}}function iWantThePerfectImageSize(himg,limg){var lblock=limg+(limg*28/100);var heightDescAndClose=$("#Choco_container_description").height()+$("#Choco_close").height();var hblock=himg+heightDescAndClose;var k=limg/himg;var kk=himg/limg;if(settings.container.get(0).nodeName.toLowerCase()=="body"){windowHeight=$(window).height();windowWidth=$(window).width()}else{windowHeight=settings.container.height();windowWidth=settings.container.width()}notFitting=true;while(notFitting){var lblock=limg+(limg*28/100);var hblock=himg+heightDescAndClose;if(lblock>windowWidth){limg=windowWidth*100/128;himg=kk*limg}else{if(hblock>windowHeight){himg=(windowHeight-heightDescAndClose);limg=k*himg}else{notFitting=false}}}return{largeur:limg,hauteur:himg}}function clear(){$("#Choco_overlay").remove();$("#Choco_content").remove()}function close(){$("#Choco_overlay").fadeOut(500,function(){$("#Choco_overlay").remove()});$("#Choco_content").fadeOut(300,function(){$("#Choco_content").remove()});settings.currentImage=0}}})(jQuery);

/*!
 * Justified Gallery - v3.5.4
 * http://miromannino.github.io/Justified-Gallery/
 * Copyright (c) 2015 Miro Mannino
 * Licensed under the MIT license.
 */
!function(a){a.fn.justifiedGallery=function(b){function c(a,b,c){var d;return d=a>b?a:b,100>=d?c.settings.sizeRangeSuffixes.lt100:240>=d?c.settings.sizeRangeSuffixes.lt240:320>=d?c.settings.sizeRangeSuffixes.lt320:500>=d?c.settings.sizeRangeSuffixes.lt500:640>=d?c.settings.sizeRangeSuffixes.lt640:c.settings.sizeRangeSuffixes.lt1024}function d(a,b){return-1!==a.indexOf(b,a.length-b.length)}function e(a,b){return a.substring(0,a.length-b.length)}function f(a,b){var c=!1;for(var e in b.settings.sizeRangeSuffixes)if(0!==b.settings.sizeRangeSuffixes[e].length){if(d(a,b.settings.sizeRangeSuffixes[e]))return b.settings.sizeRangeSuffixes[e]}else c=!0;if(c)return"";throw"unknown suffix for "+a}function g(a,b,d,g){var h=a.match(g.settings.extension),i=null!=h?h[0]:"",j=a.replace(g.settings.extension,"");return j=e(j,f(j,g)),j+=c(b,d,g)+i}function h(b){var c=a(b.currentTarget).find(".caption");b.data.settings.cssAnimation?c.addClass("caption-visible").removeClass("caption-hidden"):c.stop().fadeTo(b.data.settings.captionSettings.animationDuration,b.data.settings.captionSettings.visibleOpacity)}function i(b){var c=a(b.currentTarget).find(".caption");b.data.settings.cssAnimation?c.removeClass("caption-visible").removeClass("caption-hidden"):c.stop().fadeTo(b.data.settings.captionSettings.animationDuration,b.data.settings.captionSettings.nonVisibleOpacity)}function j(a,b,c){c.settings.cssAnimation?(a.addClass("entry-visible"),b()):a.stop().fadeTo(c.settings.imagesAnimationDuration,1,b)}function k(a,b){b.settings.cssAnimation?a.removeClass("entry-visible"):a.stop().fadeTo(0,0)}function l(a){var b=a.find("> img");return 0===b.length&&(b=a.find("> a > img")),b}function m(b,c,d,e,f,k,m){function n(){p!==q&&o.attr("src",q)}var o=l(b);o.css("width",e),o.css("height",f),o.css("margin-left",-e/2),o.css("margin-top",-f/2),b.width(e),b.height(k),b.css("top",d),b.css("left",c);var p=o.attr("src"),q=g(p,e,f,m);o.one("error",function(){o.attr("src",o.data("jg.originalSrc"))}),"skipped"===o.data("jg.loaded")?x(p,function(){j(b,n,m),o.data("jg.loaded",!0)}):j(b,n,m);var r=b.data("jg.captionMouseEvents");if(m.settings.captions===!0){var s=b.find(".caption");if(0===s.length){var t=o.attr("alt");"undefined"==typeof t&&(t=b.attr("title")),"undefined"!=typeof t&&(s=a('<div class="caption">'+t+"</div>"),b.append(s))}0!==s.length&&(m.settings.cssAnimation||s.stop().fadeTo(m.settings.imagesAnimationDuration,m.settings.captionSettings.nonVisibleOpacity),"undefined"==typeof r&&(r={mouseenter:h,mouseleave:i},b.on("mouseenter",void 0,m,r.mouseenter),b.on("mouseleave",void 0,m,r.mouseleave),b.data("jg.captionMouseEvents",r)))}else"undefined"!=typeof r&&(b.off("mouseenter",void 0,m,r.mouseenter),b.off("mouseleave",void 0,m,r.mouseleave),b.removeData("jg.captionMouseEvents"))}function n(a,b){var c,d,e,f,g,h,i=a.settings,j=!0,k=0,m=a.galleryWidth-2*a.border-(a.buildingRow.entriesBuff.length-1)*i.margins,n=m/a.buildingRow.aspectRatio,o=a.buildingRow.width/m>i.justifyThreshold;if(b&&"hide"===i.lastRow&&!o){for(c=0;c<a.buildingRow.entriesBuff.length;c++)d=a.buildingRow.entriesBuff[c],i.cssAnimation?d.removeClass("entry-visible"):d.stop().fadeTo(0,0);return-1}for(b&&!o&&"nojustify"===i.lastRow&&(j=!1),c=0;c<a.buildingRow.entriesBuff.length;c++)e=l(a.buildingRow.entriesBuff[c]),f=e.data("jg.imgw")/e.data("jg.imgh"),j?(g=c===a.buildingRow.entriesBuff.length-1?m:n*f,h=n):(g=i.rowHeight*f,h=i.rowHeight),m-=Math.round(g),e.data("jg.jimgw",Math.round(g)),e.data("jg.jimgh",Math.ceil(h)),(0===c||k>h)&&(k=h);return i.fixedHeight&&k>i.rowHeight&&(k=i.rowHeight),{minHeight:k,justify:j}}function o(a){a.lastAnalyzedIndex=-1,a.buildingRow.entriesBuff=[],a.buildingRow.aspectRatio=0,a.buildingRow.width=0,a.offY=a.border}function p(a,b){var c,d,e,f,g=a.settings,h=a.border;if(f=n(a,b),e=f.minHeight,b&&"hide"===g.lastRow&&-1===e)return a.buildingRow.entriesBuff=[],a.buildingRow.aspectRatio=0,void(a.buildingRow.width=0);g.maxRowHeight>0&&g.maxRowHeight<e?e=g.maxRowHeight:0===g.maxRowHeight&&1.5*g.rowHeight<e&&(e=1.5*g.rowHeight);for(var i=0;i<a.buildingRow.entriesBuff.length;i++)c=a.buildingRow.entriesBuff[i],d=l(c),m(c,h,a.offY,d.data("jg.jimgw"),d.data("jg.jimgh"),e,a),h+=d.data("jg.jimgw")+g.margins;a.$gallery.height(a.offY+e+a.border+(a.spinner.active?a.spinner.$el.innerHeight():0)),(!b||e<=a.settings.rowHeight&&f.justify)&&(a.offY+=e+a.settings.margins,a.buildingRow.entriesBuff=[],a.buildingRow.aspectRatio=0,a.buildingRow.width=0,a.$gallery.trigger("jg.rowflush"))}function q(a){a.checkWidthIntervalId=setInterval(function(){var b=parseInt(a.$gallery.width(),10);a.galleryWidth!==b&&(a.galleryWidth=b,o(a),u(a,!0))},a.settings.refreshTime)}function r(a){clearInterval(a.intervalId),a.intervalId=setInterval(function(){a.phase<a.$points.length?a.$points.eq(a.phase).fadeTo(a.timeslot,1):a.$points.eq(a.phase-a.$points.length).fadeTo(a.timeslot,0),a.phase=(a.phase+1)%(2*a.$points.length)},a.timeslot)}function s(a){clearInterval(a.intervalId),a.intervalId=null}function t(a){a.yield.flushed=0,null!==a.imgAnalyzerTimeout&&clearTimeout(a.imgAnalyzerTimeout)}function u(a,b){t(a),a.imgAnalyzerTimeout=setTimeout(function(){v(a,b)},.001),v(a,b)}function v(b,c){for(var d,e=b.settings,f=b.lastAnalyzedIndex+1;f<b.entries.length;f++){var g=a(b.entries[f]),h=l(g);if(h.data("jg.loaded")===!0||"skipped"===h.data("jg.loaded")){d=f>=b.entries.length-1;var i=b.galleryWidth-2*b.border-(b.buildingRow.entriesBuff.length-1)*e.margins,j=h.data("jg.imgw")/h.data("jg.imgh");if(i/(b.buildingRow.aspectRatio+j)<e.rowHeight&&(p(b,d),++b.yield.flushed>=b.yield.every))return void u(b,c);b.buildingRow.entriesBuff.push(g),b.buildingRow.aspectRatio+=j,b.buildingRow.width+=j*e.rowHeight,b.lastAnalyzedIndex=f}else if("error"!==h.data("jg.loaded"))return}b.buildingRow.entriesBuff.length>0&&p(b,!0),b.spinner.active&&(b.spinner.active=!1,b.$gallery.height(b.$gallery.height()-b.spinner.$el.innerHeight()),b.spinner.$el.detach(),s(b.spinner)),t(b),b.$gallery.trigger(c?"jg.resize":"jg.complete")}function w(a){function b(a){if("string"!=typeof d.sizeRangeSuffixes[a])throw"sizeRangeSuffixes."+a+" must be a string"}function c(a,b){if("string"==typeof a[b]){if(a[b]=parseFloat(a[b],10),isNaN(a[b]))throw"invalid number for "+b}else{if("number"!=typeof a[b])throw b+" must be a number";if(isNaN(a[b]))throw"invalid number for "+b}}var d=a.settings;if("object"!=typeof d.sizeRangeSuffixes)throw"sizeRangeSuffixes must be defined and must be an object";if(b("lt100"),b("lt240"),b("lt320"),b("lt500"),b("lt640"),b("lt1024"),c(d,"rowHeight"),c(d,"maxRowHeight"),d.maxRowHeight>0&&d.maxRowHeight<d.rowHeight&&(d.maxRowHeight=d.rowHeight),c(d,"margins"),c(d,"border"),"nojustify"!==d.lastRow&&"justify"!==d.lastRow&&"hide"!==d.lastRow)throw'lastRow must be "nojustify", "justify" or "hide"';if(c(d,"justifyThreshold"),d.justifyThreshold<0||d.justifyThreshold>1)throw"justifyThreshold must be in the interval [0,1]";if("boolean"!=typeof d.cssAnimation)throw"cssAnimation must be a boolean";if(c(d.captionSettings,"animationDuration"),c(d,"imagesAnimationDuration"),c(d.captionSettings,"visibleOpacity"),d.captionSettings.visibleOpacity<0||d.captionSettings.visibleOpacity>1)throw"captionSettings.visibleOpacity must be in the interval [0, 1]";if(c(d.captionSettings,"nonVisibleOpacity"),d.captionSettings.visibleOpacity<0||d.captionSettings.visibleOpacity>1)throw"captionSettings.nonVisibleOpacity must be in the interval [0, 1]";if("boolean"!=typeof d.fixedHeight)throw"fixedHeight must be a boolean";if("boolean"!=typeof d.captions)throw"captions must be a boolean";if(c(d,"refreshTime"),"boolean"!=typeof d.randomize)throw"randomize must be a boolean"}function x(b,c,d){if(c||d){var e=new Image,f=a(e);c&&f.one("load",function(){f.off("load error"),c(e)}),d&&f.one("error",function(){f.off("load error"),d(e)}),e.src=b}}var y={sizeRangeSuffixes:{lt100:"",lt240:"",lt320:"",lt500:"",lt640:"",lt1024:""},rowHeight:120,maxRowHeight:0,margins:1,border:-1,lastRow:"nojustify",justifyThreshold:.75,fixedHeight:!1,waitThumbnailsLoad:!0,captions:!0,cssAnimation:!1,imagesAnimationDuration:500,captionSettings:{animationDuration:500,visibleOpacity:.7,nonVisibleOpacity:0},rel:null,target:null,extension:/\.[^.\\/]+$/,refreshTime:100,randomize:!1};return this.each(function(c,d){var e=a(d);e.addClass("justified-gallery");var f=e.data("jg.context");if("undefined"==typeof f){if("undefined"!=typeof b&&null!==b&&"object"!=typeof b)throw"The argument must be an object";var g=a('<div class="spinner"><span></span><span></span><span></span></div>'),h=a.extend({},y,b),i=h.border>=0?h.border:h.margins;f={settings:h,imgAnalyzerTimeout:null,entries:null,buildingRow:{entriesBuff:[],width:0,aspectRatio:0},lastAnalyzedIndex:-1,"yield":{every:2,flushed:0},border:i,offY:i,spinner:{active:!1,phase:0,timeslot:150,$el:g,$points:g.find("span"),intervalId:null},checkWidthIntervalId:null,galleryWidth:e.width(),$gallery:e},e.data("jg.context",f)}else if("norewind"===b)for(var j=0;j<f.buildingRow.entriesBuff.length;j++)k(f.buildingRow.entriesBuff[j],f);else f.settings=a.extend({},f.settings,b),f.border=f.settings.border>=0?f.settings.border:f.settings.margins,o(f);if(w(f),f.entries=e.find("> a, > div:not(.spinner)").toArray(),0!==f.entries.length){f.settings.randomize&&(f.entries.sort(function(){return 2*Math.random()-1}),a.each(f.entries,function(){a(this).appendTo(e)}));var m=!1,n=!1;a.each(f.entries,function(b,c){var d=a(c),g=l(d);if(d.addClass("jg-entry"),g.data("jg.loaded")!==!0&&"skipped"!==g.data("jg.loaded")){null!==f.settings.rel&&d.attr("rel",f.settings.rel),null!==f.settings.target&&d.attr("target",f.settings.target);var h="undefined"!=typeof g.data("safe-src")?g.data("safe-src"):g.attr("src");g.data("jg.originalSrc",h),g.attr("src",h);var i=parseInt(g.attr("width"),10),j=parseInt(g.attr("height"),10);if(f.settings.waitThumbnailsLoad!==!0&&!isNaN(i)&&!isNaN(j))return g.data("jg.imgw",i),g.data("jg.imgh",j),g.data("jg.loaded","skipped"),n=!0,u(f,!1),!0;g.data("jg.loaded",!1),m=!0,f.spinner.active===!1&&(f.spinner.active=!0,e.append(f.spinner.$el),e.height(f.offY+f.spinner.$el.innerHeight()),r(f.spinner)),x(h,function(a){g.data("jg.imgw",a.width),g.data("jg.imgh",a.height),g.data("jg.loaded",!0),u(f,!1)},function(){g.data("jg.loaded","error"),u(f,!1)})}}),m||n||u(f,!1),q(f)}})}}(jQuery);
//============================================================
//
// The MIT License
//
// Copyright (C) 2014 Matthew Wagerfield - @wagerfield
//
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the
// Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
//
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions
// of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY
// OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
// EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
// AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
// OR OTHER DEALINGS IN THE SOFTWARE.
//
//============================================================

/**
 * jQuery || Zepto Parallax Plugin
 * @author Matthew Wagerfield - @wagerfield
 * @description Creates a parallax effect between an array of layers,
 *              driving the motion from the gyroscope output of a smartdevice.
 *              If no gyroscope is available, the cursor position is used.
 */
;(function($, window, document, undefined) {

  // Strict Mode
  'use strict';

  // Constants
  var NAME = 'parallax';
  var MAGIC_NUMBER = 30;
  var DEFAULTS = {
    relativeInput: false,
    clipRelativeInput: false,
    calibrationThreshold: 100,
    calibrationDelay: 500,
    supportDelay: 1000,
    calibrateX: false,
    calibrateY: true,
    invertX: true,
    invertY: true,
    limitX: false,
    limitY: false,
    scalarX: 10.0,
    scalarY: 10.0,
    frictionX: 0.1,
    frictionY: 0.1,
    originX: 0.5,
    originY: 0.5
  };

  function Plugin(element, options) {

    // DOM Context
    this.element = element;

    // Selections
    this.$context = $(element).data('api', this);
    this.$layers = this.$context.find('.layer');

    // Data Extraction
    var data = {
      calibrateX: this.$context.data('calibrate-x') || null,
      calibrateY: this.$context.data('calibrate-y') || null,
      invertX: this.$context.data('invert-x') || null,
      invertY: this.$context.data('invert-y') || null,
      limitX: parseFloat(this.$context.data('limit-x')) || null,
      limitY: parseFloat(this.$context.data('limit-y')) || null,
      scalarX: parseFloat(this.$context.data('scalar-x')) || null,
      scalarY: parseFloat(this.$context.data('scalar-y')) || null,
      frictionX: parseFloat(this.$context.data('friction-x')) || null,
      frictionY: parseFloat(this.$context.data('friction-y')) || null,
      originX: parseFloat(this.$context.data('origin-x')) || null,
      originY: parseFloat(this.$context.data('origin-y')) || null
    };

    // Delete Null Data Values
    for (var key in data) {
      if (data[key] === null) delete data[key];
    }

    // Compose Settings Object
    $.extend(this, DEFAULTS, options, data);

    // States
    this.calibrationTimer = null;
    this.calibrationFlag = true;
    this.enabled = false;
    this.depths = [];
    this.raf = null;

    // Element Bounds
    this.bounds = null;
    this.ex = 0;
    this.ey = 0;
    this.ew = 0;
    this.eh = 0;

    // Element Center
    this.ecx = 0;
    this.ecy = 0;

    // Element Range
    this.erx = 0;
    this.ery = 0;

    // Calibration
    this.cx = 0;
    this.cy = 0;

    // Input
    this.ix = 0;
    this.iy = 0;

    // Motion
    this.mx = 0;
    this.my = 0;

    // Velocity
    this.vx = 0;
    this.vy = 0;

    // Callbacks
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
    this.onOrientationTimer = this.onOrientationTimer.bind(this);
    this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    // Initialise
    this.initialise();
  }

  Plugin.prototype.transformSupport = function(value) {
    var element = document.createElement('div');
    var propertySupport = false;
    var propertyValue = null;
    var featureSupport = false;
    var cssProperty = null;
    var jsProperty = null;
    for (var i = 0, l = this.vendors.length; i < l; i++) {
      if (this.vendors[i] !== null) {
        cssProperty = this.vendors[i][0] + 'transform';
        jsProperty = this.vendors[i][1] + 'Transform';
      } else {
        cssProperty = 'transform';
        jsProperty = 'transform';
      }
      if (element.style[jsProperty] !== undefined) {
        propertySupport = true;
        break;
      }
    }
    switch(value) {
      case '2D':
        featureSupport = propertySupport;
        break;
      case '3D':
        if (propertySupport) {
          var body = document.body || document.createElement('body');
          var documentElement = document.documentElement;
          var documentOverflow = documentElement.style.overflow;
          var isCreatedBody = false;
          if (!document.body) {
            isCreatedBody = true;
            documentElement.style.overflow = 'hidden';
            documentElement.appendChild(body);
            body.style.overflow = 'hidden';
            body.style.background = '';
          }
          body.appendChild(element);
          element.style[jsProperty] = 'translate3d(1px,1px,1px)';
          propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
          featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
          documentElement.style.overflow = documentOverflow;
          body.removeChild(element);
          if ( isCreatedBody ) {
            body.removeAttribute('style');
            body.parentNode.removeChild(body);
          }
        }
        break;
    }
    return featureSupport;
  };

  Plugin.prototype.ww = null;
  Plugin.prototype.wh = null;
  Plugin.prototype.wcx = null;
  Plugin.prototype.wcy = null;
  Plugin.prototype.wrx = null;
  Plugin.prototype.wry = null;
  Plugin.prototype.portrait = null;
  Plugin.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
  Plugin.prototype.vendors = [null,['-webkit-','webkit'],['-moz-','Moz'],['-o-','O'],['-ms-','ms']];
  Plugin.prototype.motionSupport = !!window.DeviceMotionEvent;
  Plugin.prototype.orientationSupport = !!window.DeviceOrientationEvent;
  Plugin.prototype.orientationStatus = 0;
  Plugin.prototype.transform2DSupport = Plugin.prototype.transformSupport('2D');
  Plugin.prototype.transform3DSupport = Plugin.prototype.transformSupport('3D');
  Plugin.prototype.propertyCache = {};

  Plugin.prototype.initialise = function() {

    // Configure Styles
    if (this.$context.css('position') === 'static') {
      this.$context.css({
        position:'relative'
      });
    }

    // Hardware Accelerate Context
    this.accelerate(this.$context);

    // Setup
    this.updateLayers();
    this.updateDimensions();
    this.enable();
    this.queueCalibration(this.calibrationDelay);
  };

  Plugin.prototype.updateLayers = function() {

    // Cache Layer Elements
    this.$layers = this.$context.find('.layer');
    this.depths = [];

    // Configure Layer Styles
    this.$layers.css({
      position:'absolute',
      display:'block',
      left: 0,
      top: 0
    });
    this.$layers.first().css({
      position:'relative'
    });

    // Hardware Accelerate Layers
    this.accelerate(this.$layers);

    // Cache Depths
    this.$layers.each($.proxy(function(index, element) {
      this.depths.push($(element).data('depth') || 0);
    }, this));
  };

  Plugin.prototype.updateDimensions = function() {
    this.ww = window.innerWidth;
    this.wh = window.innerHeight;
    this.wcx = this.ww * this.originX;
    this.wcy = this.wh * this.originY;
    this.wrx = Math.max(this.wcx, this.ww - this.wcx);
    this.wry = Math.max(this.wcy, this.wh - this.wcy);
  };

  Plugin.prototype.updateBounds = function() {
    this.bounds = this.element.getBoundingClientRect();
    this.ex = this.bounds.left;
    this.ey = this.bounds.top;
    this.ew = this.bounds.width;
    this.eh = this.bounds.height;
    this.ecx = this.ew * this.originX;
    this.ecy = this.eh * this.originY;
    this.erx = Math.max(this.ecx, this.ew - this.ecx);
    this.ery = Math.max(this.ecy, this.eh - this.ecy);
  };

  Plugin.prototype.queueCalibration = function(delay) {
    clearTimeout(this.calibrationTimer);
    this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
  };

  Plugin.prototype.enable = function() {
    if (!this.enabled) {
      this.enabled = true;
      if (this.orientationSupport) {
        this.portrait = null;
        window.addEventListener('deviceorientation', this.onDeviceOrientation);
        setTimeout(this.onOrientationTimer, this.supportDelay);
      } else {
        this.cx = 0;
        this.cy = 0;
        this.portrait = false;
        window.addEventListener('mousemove', this.onMouseMove);
      }
      window.addEventListener('resize', this.onWindowResize);
      this.raf = requestAnimationFrame(this.onAnimationFrame);
    }
  };

  Plugin.prototype.disable = function() {
    if (this.enabled) {
      this.enabled = false;
      if (this.orientationSupport) {
        window.removeEventListener('deviceorientation', this.onDeviceOrientation);
      } else {
        window.removeEventListener('mousemove', this.onMouseMove);
      }
      window.removeEventListener('resize', this.onWindowResize);
      cancelAnimationFrame(this.raf);
    }
  };

  Plugin.prototype.calibrate = function(x, y) {
    this.calibrateX = x === undefined ? this.calibrateX : x;
    this.calibrateY = y === undefined ? this.calibrateY : y;
  };

  Plugin.prototype.invert = function(x, y) {
    this.invertX = x === undefined ? this.invertX : x;
    this.invertY = y === undefined ? this.invertY : y;
  };

  Plugin.prototype.friction = function(x, y) {
    this.frictionX = x === undefined ? this.frictionX : x;
    this.frictionY = y === undefined ? this.frictionY : y;
  };

  Plugin.prototype.scalar = function(x, y) {
    this.scalarX = x === undefined ? this.scalarX : x;
    this.scalarY = y === undefined ? this.scalarY : y;
  };

  Plugin.prototype.limit = function(x, y) {
    this.limitX = x === undefined ? this.limitX : x;
    this.limitY = y === undefined ? this.limitY : y;
  };

  Plugin.prototype.origin = function(x, y) {
    this.originX = x === undefined ? this.originX : x;
    this.originY = y === undefined ? this.originY : y;
  };

  Plugin.prototype.clamp = function(value, min, max) {
    value = Math.max(value, min);
    value = Math.min(value, max);
    return value;
  };

  Plugin.prototype.css = function(element, property, value) {
    var jsProperty = this.propertyCache[property];
    if (!jsProperty) {
      for (var i = 0, l = this.vendors.length; i < l; i++) {
        if (this.vendors[i] !== null) {
          jsProperty = $.camelCase(this.vendors[i][1] + '-' + property);
        } else {
          jsProperty = property;
        }
        if (element.style[jsProperty] !== undefined) {
          this.propertyCache[property] = jsProperty;
          break;
        }
      }
    }
    element.style[jsProperty] = value;
  };

  Plugin.prototype.accelerate = function($element) {
    for (var i = 0, l = $element.length; i < l; i++) {
      var element = $element[i];
      this.css(element, 'transform', 'translate3d(0,0,0)');
      this.css(element, 'transform-style', 'preserve-3d');
      this.css(element, 'backface-visibility', 'hidden');
    }
  };

  Plugin.prototype.setPosition = function(element, x, y) {
    x += 'px';
    y += 'px';
    if (this.transform3DSupport) {
      this.css(element, 'transform', 'translate3d('+x+','+y+',0)');
    } else if (this.transform2DSupport) {
      this.css(element, 'transform', 'translate('+x+','+y+')');
    } else {
      element.style.left = x;
      element.style.top = y;
    }
  };

  Plugin.prototype.onOrientationTimer = function(event) {
    if (this.orientationSupport && this.orientationStatus === 0) {
      this.disable();
      this.orientationSupport = false;
      this.enable();
    }
  };

  Plugin.prototype.onCalibrationTimer = function(event) {
    this.calibrationFlag = true;
  };

  Plugin.prototype.onWindowResize = function(event) {
    this.updateDimensions();
  };

  Plugin.prototype.onAnimationFrame = function() {
    this.updateBounds();
    var dx = this.ix - this.cx;
    var dy = this.iy - this.cy;
    if ((Math.abs(dx) > this.calibrationThreshold) || (Math.abs(dy) > this.calibrationThreshold)) {
      this.queueCalibration(0);
    }
    if (this.portrait) {
      this.mx = this.calibrateX ? dy : this.iy;
      this.my = this.calibrateY ? dx : this.ix;
    } else {
      this.mx = this.calibrateX ? dx : this.ix;
      this.my = this.calibrateY ? dy : this.iy;
    }
    this.mx *= this.ew * (this.scalarX / 100);
    this.my *= this.eh * (this.scalarY / 100);
    if (!isNaN(parseFloat(this.limitX))) {
      this.mx = this.clamp(this.mx, -this.limitX, this.limitX);
    }
    if (!isNaN(parseFloat(this.limitY))) {
      this.my = this.clamp(this.my, -this.limitY, this.limitY);
    }
    this.vx += (this.mx - this.vx) * this.frictionX;
    this.vy += (this.my - this.vy) * this.frictionY;
    for (var i = 0, l = this.$layers.length; i < l; i++) {
      var depth = this.depths[i];
      var layer = this.$layers[i];
      var xOffset = this.vx * depth * (this.invertX ? -1 : 1);
      var yOffset = this.vy * depth * (this.invertY ? -1 : 1);
      this.setPosition(layer, xOffset, yOffset);
    }
    this.raf = requestAnimationFrame(this.onAnimationFrame);
  };

  Plugin.prototype.onDeviceOrientation = function(event) {

    // Validate environment and event properties.
    if (!this.desktop && event.beta !== null && event.gamma !== null) {

      // Set orientation status.
      this.orientationStatus = 1;

      // Extract Rotation
      var x = (event.beta  || 0) / MAGIC_NUMBER; //  -90 :: 90
      var y = (event.gamma || 0) / MAGIC_NUMBER; // -180 :: 180

      // Detect Orientation Change
      var portrait = window.innerHeight > window.innerWidth;
      if (this.portrait !== portrait) {
        this.portrait = portrait;
        this.calibrationFlag = true;
      }

      // Set Calibration
      if (this.calibrationFlag) {
        this.calibrationFlag = false;
        this.cx = x;
        this.cy = y;
      }

      // Set Input
      this.ix = x;
      this.iy = y;
    }
  };

  Plugin.prototype.onMouseMove = function(event) {

    // Cache mouse coordinates.
    var clientX = event.clientX;
    var clientY = event.clientY;

    // Calculate Mouse Input
    if (!this.orientationSupport && this.relativeInput) {

      // Clip mouse coordinates inside element bounds.
      if (this.clipRelativeInput) {
        clientX = Math.max(clientX, this.ex);
        clientX = Math.min(clientX, this.ex + this.ew);
        clientY = Math.max(clientY, this.ey);
        clientY = Math.min(clientY, this.ey + this.eh);
      }

      // Calculate input relative to the element.
      this.ix = (clientX - this.ex - this.ecx) / this.erx;
      this.iy = (clientY - this.ey - this.ecy) / this.ery;

    } else {

      // Calculate input relative to the window.
      this.ix = (clientX - this.wcx) / this.wrx;
      this.iy = (clientY - this.wcy) / this.wry;
    }
  };

  var API = {
    enable: Plugin.prototype.enable,
    disable: Plugin.prototype.disable,
    updateLayers: Plugin.prototype.updateLayers,
    calibrate: Plugin.prototype.calibrate,
    friction: Plugin.prototype.friction,
    invert: Plugin.prototype.invert,
    scalar: Plugin.prototype.scalar,
    limit: Plugin.prototype.limit,
    origin: Plugin.prototype.origin
  };

  $.fn[NAME] = function (value) {
    var args = arguments;
    return this.each(function () {
      var $this = $(this);
      var plugin = $this.data(NAME);
      if (!plugin) {
        plugin = new Plugin(this, value);
        $this.data(NAME, plugin);
      }
      if (API[value]) {
        plugin[value].apply(plugin, Array.prototype.slice.call(args, 1));
      }
    });
  };

})(window.jQuery || window.Zepto, window, document);

/**
 * Request Animation Frame Polyfill.
 * @author Tino Zijdel
 * @author Paul Irish
 * @see https://gist.github.com/paulirish/1579671
 */
;(function() {

  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

}());

(function(r){r.fn.qrcode=function(h){var s;function u(a){this.mode=s;this.data=a}function o(a,c){this.typeNumber=a;this.errorCorrectLevel=c;this.modules=null;this.moduleCount=0;this.dataCache=null;this.dataList=[]}function q(a,c){if(void 0==a.length)throw Error(a.length+"/"+c);for(var d=0;d<a.length&&0==a[d];)d++;this.num=Array(a.length-d+c);for(var b=0;b<a.length-d;b++)this.num[b]=a[b+d]}function p(a,c){this.totalCount=a;this.dataCount=c}function t(){this.buffer=[];this.length=0}u.prototype={getLength:function(){return this.data.length},
write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}};o.prototype={addData:function(a){this.dataList.push(new u(a));this.dataCache=null},isDark:function(a,c){if(0>a||this.moduleCount<=a||0>c||this.moduleCount<=c)throw Error(a+","+c);return this.modules[a][c]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){for(var a=1,a=1;40>a;a++){for(var c=p.getRSBlocks(a,this.errorCorrectLevel),d=new t,b=0,e=0;e<c.length;e++)b+=c[e].dataCount;
for(e=0;e<this.dataList.length;e++)c=this.dataList[e],d.put(c.mode,4),d.put(c.getLength(),j.getLengthInBits(c.mode,a)),c.write(d);if(d.getLengthInBits()<=8*b)break}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17;this.modules=Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=Array(this.moduleCount);for(var b=0;b<this.moduleCount;b++)this.modules[d][b]=null}this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-
7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(a,c);7<=this.typeNumber&&this.setupTypeNumber(a);null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList));this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,c){for(var d=-1;7>=d;d++)if(!(-1>=a+d||this.moduleCount<=a+d))for(var b=-1;7>=b;b++)-1>=c+b||this.moduleCount<=c+b||(this.modules[a+d][c+b]=
0<=d&&6>=d&&(0==b||6==b)||0<=b&&6>=b&&(0==d||6==d)||2<=d&&4>=d&&2<=b&&4>=b?!0:!1)},getBestMaskPattern:function(){for(var a=0,c=0,d=0;8>d;d++){this.makeImpl(!0,d);var b=j.getLostPoint(this);if(0==d||a>b)a=b,c=d}return c},createMovieClip:function(a,c,d){a=a.createEmptyMovieClip(c,d);this.make();for(c=0;c<this.modules.length;c++)for(var d=1*c,b=0;b<this.modules[c].length;b++){var e=1*b;this.modules[c][b]&&(a.beginFill(0,100),a.moveTo(e,d),a.lineTo(e+1,d),a.lineTo(e+1,d+1),a.lineTo(e,d+1),a.endFill())}return a},
setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(a=8;a<this.moduleCount-8;a++)null==this.modules[6][a]&&(this.modules[6][a]=0==a%2)},setupPositionAdjustPattern:function(){for(var a=j.getPatternPosition(this.typeNumber),c=0;c<a.length;c++)for(var d=0;d<a.length;d++){var b=a[c],e=a[d];if(null==this.modules[b][e])for(var f=-2;2>=f;f++)for(var i=-2;2>=i;i++)this.modules[b+f][e+i]=-2==f||2==f||-2==i||2==i||0==f&&0==i?!0:!1}},setupTypeNumber:function(a){for(var c=
j.getBCHTypeNumber(this.typeNumber),d=0;18>d;d++){var b=!a&&1==(c>>d&1);this.modules[Math.floor(d/3)][d%3+this.moduleCount-8-3]=b}for(d=0;18>d;d++)b=!a&&1==(c>>d&1),this.modules[d%3+this.moduleCount-8-3][Math.floor(d/3)]=b},setupTypeInfo:function(a,c){for(var d=j.getBCHTypeInfo(this.errorCorrectLevel<<3|c),b=0;15>b;b++){var e=!a&&1==(d>>b&1);6>b?this.modules[b][8]=e:8>b?this.modules[b+1][8]=e:this.modules[this.moduleCount-15+b][8]=e}for(b=0;15>b;b++)e=!a&&1==(d>>b&1),8>b?this.modules[8][this.moduleCount-
b-1]=e:9>b?this.modules[8][15-b-1+1]=e:this.modules[8][15-b-1]=e;this.modules[this.moduleCount-8][8]=!a},mapData:function(a,c){for(var d=-1,b=this.moduleCount-1,e=7,f=0,i=this.moduleCount-1;0<i;i-=2)for(6==i&&i--;;){for(var g=0;2>g;g++)if(null==this.modules[b][i-g]){var n=!1;f<a.length&&(n=1==(a[f]>>>e&1));j.getMask(c,b,i-g)&&(n=!n);this.modules[b][i-g]=n;e--; -1==e&&(f++,e=7)}b+=d;if(0>b||this.moduleCount<=b){b-=d;d=-d;break}}}};o.PAD0=236;o.PAD1=17;o.createData=function(a,c,d){for(var c=p.getRSBlocks(a,
c),b=new t,e=0;e<d.length;e++){var f=d[e];b.put(f.mode,4);b.put(f.getLength(),j.getLengthInBits(f.mode,a));f.write(b)}for(e=a=0;e<c.length;e++)a+=c[e].dataCount;if(b.getLengthInBits()>8*a)throw Error("code length overflow. ("+b.getLengthInBits()+">"+8*a+")");for(b.getLengthInBits()+4<=8*a&&b.put(0,4);0!=b.getLengthInBits()%8;)b.putBit(!1);for(;!(b.getLengthInBits()>=8*a);){b.put(o.PAD0,8);if(b.getLengthInBits()>=8*a)break;b.put(o.PAD1,8)}return o.createBytes(b,c)};o.createBytes=function(a,c){for(var d=
0,b=0,e=0,f=Array(c.length),i=Array(c.length),g=0;g<c.length;g++){var n=c[g].dataCount,h=c[g].totalCount-n,b=Math.max(b,n),e=Math.max(e,h);f[g]=Array(n);for(var k=0;k<f[g].length;k++)f[g][k]=255&a.buffer[k+d];d+=n;k=j.getErrorCorrectPolynomial(h);n=(new q(f[g],k.getLength()-1)).mod(k);i[g]=Array(k.getLength()-1);for(k=0;k<i[g].length;k++)h=k+n.getLength()-i[g].length,i[g][k]=0<=h?n.get(h):0}for(k=g=0;k<c.length;k++)g+=c[k].totalCount;d=Array(g);for(k=n=0;k<b;k++)for(g=0;g<c.length;g++)k<f[g].length&&
(d[n++]=f[g][k]);for(k=0;k<e;k++)for(g=0;g<c.length;g++)k<i[g].length&&(d[n++]=i[g][k]);return d};s=4;for(var j={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,
78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var c=a<<10;0<=j.getBCHDigit(c)-j.getBCHDigit(j.G15);)c^=j.G15<<j.getBCHDigit(c)-j.getBCHDigit(j.G15);return(a<<10|c)^j.G15_MASK},getBCHTypeNumber:function(a){for(var c=a<<12;0<=j.getBCHDigit(c)-
j.getBCHDigit(j.G18);)c^=j.G18<<j.getBCHDigit(c)-j.getBCHDigit(j.G18);return a<<12|c},getBCHDigit:function(a){for(var c=0;0!=a;)c++,a>>>=1;return c},getPatternPosition:function(a){return j.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,c,d){switch(a){case 0:return 0==(c+d)%2;case 1:return 0==c%2;case 2:return 0==d%3;case 3:return 0==(c+d)%3;case 4:return 0==(Math.floor(c/2)+Math.floor(d/3))%2;case 5:return 0==c*d%2+c*d%3;case 6:return 0==(c*d%2+c*d%3)%2;case 7:return 0==(c*d%3+(c+d)%2)%2;default:throw Error("bad maskPattern:"+
a);}},getErrorCorrectPolynomial:function(a){for(var c=new q([1],0),d=0;d<a;d++)c=c.multiply(new q([1,l.gexp(d)],0));return c},getLengthInBits:function(a,c){if(1<=c&&10>c)switch(a){case 1:return 10;case 2:return 9;case s:return 8;case 8:return 8;default:throw Error("mode:"+a);}else if(27>c)switch(a){case 1:return 12;case 2:return 11;case s:return 16;case 8:return 10;default:throw Error("mode:"+a);}else if(41>c)switch(a){case 1:return 14;case 2:return 13;case s:return 16;case 8:return 12;default:throw Error("mode:"+
a);}else throw Error("type:"+c);},getLostPoint:function(a){for(var c=a.getModuleCount(),d=0,b=0;b<c;b++)for(var e=0;e<c;e++){for(var f=0,i=a.isDark(b,e),g=-1;1>=g;g++)if(!(0>b+g||c<=b+g))for(var h=-1;1>=h;h++)0>e+h||c<=e+h||0==g&&0==h||i==a.isDark(b+g,e+h)&&f++;5<f&&(d+=3+f-5)}for(b=0;b<c-1;b++)for(e=0;e<c-1;e++)if(f=0,a.isDark(b,e)&&f++,a.isDark(b+1,e)&&f++,a.isDark(b,e+1)&&f++,a.isDark(b+1,e+1)&&f++,0==f||4==f)d+=3;for(b=0;b<c;b++)for(e=0;e<c-6;e++)a.isDark(b,e)&&!a.isDark(b,e+1)&&a.isDark(b,e+
2)&&a.isDark(b,e+3)&&a.isDark(b,e+4)&&!a.isDark(b,e+5)&&a.isDark(b,e+6)&&(d+=40);for(e=0;e<c;e++)for(b=0;b<c-6;b++)a.isDark(b,e)&&!a.isDark(b+1,e)&&a.isDark(b+2,e)&&a.isDark(b+3,e)&&a.isDark(b+4,e)&&!a.isDark(b+5,e)&&a.isDark(b+6,e)&&(d+=40);for(e=f=0;e<c;e++)for(b=0;b<c;b++)a.isDark(b,e)&&f++;a=Math.abs(100*f/c/c-50)/5;return d+10*a}},l={glog:function(a){if(1>a)throw Error("glog("+a+")");return l.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;256<=a;)a-=255;return l.EXP_TABLE[a]},EXP_TABLE:Array(256),
LOG_TABLE:Array(256)},m=0;8>m;m++)l.EXP_TABLE[m]=1<<m;for(m=8;256>m;m++)l.EXP_TABLE[m]=l.EXP_TABLE[m-4]^l.EXP_TABLE[m-5]^l.EXP_TABLE[m-6]^l.EXP_TABLE[m-8];for(m=0;255>m;m++)l.LOG_TABLE[l.EXP_TABLE[m]]=m;q.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=Array(this.getLength()+a.getLength()-1),d=0;d<this.getLength();d++)for(var b=0;b<a.getLength();b++)c[d+b]^=l.gexp(l.glog(this.get(d))+l.glog(a.get(b)));return new q(c,0)},mod:function(a){if(0>
this.getLength()-a.getLength())return this;for(var c=l.glog(this.get(0))-l.glog(a.get(0)),d=Array(this.getLength()),b=0;b<this.getLength();b++)d[b]=this.get(b);for(b=0;b<a.getLength();b++)d[b]^=l.gexp(l.glog(a.get(b))+c);return(new q(d,0)).mod(a)}};p.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],
[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,
116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,
43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,
3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,
55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,
45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];p.getRSBlocks=function(a,c){var d=p.getRsBlockTable(a,c);if(void 0==d)throw Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var b=d.length/3,e=[],f=0;f<b;f++)for(var h=d[3*f+0],g=d[3*f+1],j=d[3*f+2],l=0;l<h;l++)e.push(new p(g,j));return e};p.getRsBlockTable=function(a,c){switch(c){case 1:return p.RS_BLOCK_TABLE[4*(a-1)+0];case 0:return p.RS_BLOCK_TABLE[4*(a-1)+1];case 3:return p.RS_BLOCK_TABLE[4*
(a-1)+2];case 2:return p.RS_BLOCK_TABLE[4*(a-1)+3]}};t.prototype={get:function(a){return 1==(this.buffer[Math.floor(a/8)]>>>7-a%8&1)},put:function(a,c){for(var d=0;d<c;d++)this.putBit(1==(a>>>c-d-1&1))},getLengthInBits:function(){return this.length},putBit:function(a){var c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0);a&&(this.buffer[c]|=128>>>this.length%8);this.length++}};"string"===typeof h&&(h={text:h});h=r.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,
correctLevel:2,background:"#ffffff",foreground:"#000000"},h);return this.each(function(){var a;if("canvas"==h.render){a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();var c=document.createElement("canvas");c.width=h.width;c.height=h.height;for(var d=c.getContext("2d"),b=h.width/a.getModuleCount(),e=h.height/a.getModuleCount(),f=0;f<a.getModuleCount();f++)for(var i=0;i<a.getModuleCount();i++){d.fillStyle=a.isDark(f,i)?h.foreground:h.background;var g=Math.ceil((i+1)*b)-Math.floor(i*b),
j=Math.ceil((f+1)*b)-Math.floor(f*b);d.fillRect(Math.round(i*b),Math.round(f*e),g,j)}}else{a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();c=r("<table></table>").css("width",h.width+"px").css("height",h.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",h.background);d=h.width/a.getModuleCount();b=h.height/a.getModuleCount();for(e=0;e<a.getModuleCount();e++){f=r("<tr></tr>").css("height",b+"px").appendTo(c);for(i=0;i<a.getModuleCount();i++)r("<td></td>").css("width",
d+"px").css("background-color",a.isDark(e,i)?h.foreground:h.background).appendTo(f)}}a=c;jQuery(a).appendTo(this)})}})(jQuery);

(function e$$0(x,z,l){function h(p,b){if(!z[p]){if(!x[p]){var a="function"==typeof require&&require;if(!b&&a)return a(p,!0);if(g)return g(p,!0);a=Error("Cannot find module '"+p+"'");throw a.code="MODULE_NOT_FOUND",a;}a=z[p]={exports:{}};x[p][0].call(a.exports,function(a){var b=x[p][1][a];return h(b?b:a)},a,a.exports,e$$0,x,z,l)}return z[p].exports}for(var g="function"==typeof require&&require,w=0;w<l.length;w++)h(l[w]);return h})({1:[function(A,x,z){if(!l)var l={map:function(h,g){var l={};return g?
h.map(function(h,b){l.index=b;return g.call(l,h)}):h.slice()},naturalOrder:function(h,g){return h<g?-1:h>g?1:0},sum:function(h,g){var l={};return h.reduce(g?function(h,b,a){l.index=a;return h+g.call(l,b)}:function(h,b){return h+b},0)},max:function(h,g){return Math.max.apply(null,g?l.map(h,g):h)}};A=function(){function h(f,c,a){return(f<<2*d)+(c<<d)+a}function g(f){function c(){a.sort(f);b=!0}var a=[],b=!1;return{push:function(c){a.push(c);b=!1},peek:function(f){b||c();void 0===f&&(f=a.length-1);return a[f]},
pop:function(){b||c();return a.pop()},size:function(){return a.length},map:function(c){return a.map(c)},debug:function(){b||c();return a}}}function w(f,c,a,b,m,e,q){this.r1=f;this.r2=c;this.g1=a;this.g2=b;this.b1=m;this.b2=e;this.histo=q}function p(){this.vboxes=new g(function(f,c){return l.naturalOrder(f.vbox.count()*f.vbox.volume(),c.vbox.count()*c.vbox.volume())})}function b(f){var c=Array(1<<3*d),a,b,m,r;f.forEach(function(f){b=f[0]>>e;m=f[1]>>e;r=f[2]>>e;a=h(b,m,r);c[a]=(c[a]||0)+1});return c}
function a(f,c){var a=1E6,b=0,m=1E6,d=0,q=1E6,n=0,h,k,l;f.forEach(function(c){h=c[0]>>e;k=c[1]>>e;l=c[2]>>e;h<a?a=h:h>b&&(b=h);k<m?m=k:k>d&&(d=k);l<q?q=l:l>n&&(n=l)});return new w(a,b,m,d,q,n,c)}function n(a,c){function b(a){var f=a+"1";a+="2";var v,d,m,e;d=0;for(k=c[f];k<=c[a];k++)if(y[k]>n/2){m=c.copy();e=c.copy();v=k-c[f];d=c[a]-k;for(v=v<=d?Math.min(c[a]-1,~~(k+d/2)):Math.max(c[f],~~(k-1-v/2));!y[v];)v++;for(d=s[v];!d&&y[v-1];)d=s[--v];m[a]=v;e[f]=m[a]+1;return[m,e]}}if(c.count()){var d=c.r2-
c.r1+1,m=c.g2-c.g1+1,e=l.max([d,m,c.b2-c.b1+1]);if(1==c.count())return[c.copy()];var n=0,y=[],s=[],k,g,t,u,p;if(e==d)for(k=c.r1;k<=c.r2;k++){u=0;for(g=c.g1;g<=c.g2;g++)for(t=c.b1;t<=c.b2;t++)p=h(k,g,t),u+=a[p]||0;n+=u;y[k]=n}else if(e==m)for(k=c.g1;k<=c.g2;k++){u=0;for(g=c.r1;g<=c.r2;g++)for(t=c.b1;t<=c.b2;t++)p=h(g,k,t),u+=a[p]||0;n+=u;y[k]=n}else for(k=c.b1;k<=c.b2;k++){u=0;for(g=c.r1;g<=c.r2;g++)for(t=c.g1;t<=c.g2;t++)p=h(g,t,k),u+=a[p]||0;n+=u;y[k]=n}y.forEach(function(a,c){s[c]=n-a});return e==
d?b("r"):e==m?b("g"):b("b")}}var d=5,e=8-d;w.prototype={volume:function(a){if(!this._volume||a)this._volume=(this.r2-this.r1+1)*(this.g2-this.g1+1)*(this.b2-this.b1+1);return this._volume},count:function(a){var c=this.histo;if(!this._count_set||a){a=0;var b,d,n;for(b=this.r1;b<=this.r2;b++)for(d=this.g1;d<=this.g2;d++)for(n=this.b1;n<=this.b2;n++)index=h(b,d,n),a+=c[index]||0;this._count=a;this._count_set=!0}return this._count},copy:function(){return new w(this.r1,this.r2,this.g1,this.g2,this.b1,
this.b2,this.histo)},avg:function(a){var c=this.histo;if(!this._avg||a){a=0;var b=1<<8-d,n=0,e=0,g=0,q,l,s,k;for(l=this.r1;l<=this.r2;l++)for(s=this.g1;s<=this.g2;s++)for(k=this.b1;k<=this.b2;k++)q=h(l,s,k),q=c[q]||0,a+=q,n+=q*(l+0.5)*b,e+=q*(s+0.5)*b,g+=q*(k+0.5)*b;this._avg=a?[~~(n/a),~~(e/a),~~(g/a)]:[~~(b*(this.r1+this.r2+1)/2),~~(b*(this.g1+this.g2+1)/2),~~(b*(this.b1+this.b2+1)/2)]}return this._avg},contains:function(a){var c=a[0]>>e;gval=a[1]>>e;bval=a[2]>>e;return c>=this.r1&&c<=this.r2&&
gval>=this.g1&&gval<=this.g2&&bval>=this.b1&&bval<=this.b2}};p.prototype={push:function(a){this.vboxes.push({vbox:a,color:a.avg()})},palette:function(){return this.vboxes.map(function(a){return a.color})},size:function(){return this.vboxes.size()},map:function(a){for(var c=this.vboxes,b=0;b<c.size();b++)if(c.peek(b).vbox.contains(a))return c.peek(b).color;return this.nearest(a)},nearest:function(a){for(var c=this.vboxes,b,n,d,e=0;e<c.size();e++)if(n=Math.sqrt(Math.pow(a[0]-c.peek(e).color[0],2)+Math.pow(a[1]-
c.peek(e).color[1],2)+Math.pow(a[2]-c.peek(e).color[2],2)),n<b||void 0===b)b=n,d=c.peek(e).color;return d},forcebw:function(){var a=this.vboxes;a.sort(function(a,b){return l.naturalOrder(l.sum(a.color),l.sum(b.color))});var b=a[0].color;5>b[0]&&5>b[1]&&5>b[2]&&(a[0].color=[0,0,0]);var b=a.length-1,n=a[b].color;251<n[0]&&251<n[1]&&251<n[2]&&(a[b].color=[255,255,255])}};return{quantize:function(d,c){function e(a,b){for(var c=1,d=0,f;1E3>d;)if(f=a.pop(),f.count()){var m=n(h,f);f=m[0];m=m[1];if(!f)break;
a.push(f);m&&(a.push(m),c++);if(c>=b)break;if(1E3<d++)break}else a.push(f),d++}if(!d.length||2>c||256<c)return!1;var h=b(d),m=0;h.forEach(function(){m++});var r=a(d,h),q=new g(function(a,b){return l.naturalOrder(a.count(),b.count())});q.push(r);e(q,0.75*c);for(r=new g(function(a,b){return l.naturalOrder(a.count()*a.volume(),b.count()*b.volume())});q.size();)r.push(q.pop());e(r,c-r.size());for(q=new p;r.size();)q.push(r.pop());return q}}}();x.exports=A.quantize},{}],2:[function(A,x,z){(function(){var l,
h,g,w=function(b,a){return function(){return b.apply(a,arguments)}},p=[].slice;window.Swatch=h=function(){function b(a,b){this.rgb=a;this.population=b}b.prototype.hsl=void 0;b.prototype.rgb=void 0;b.prototype.population=1;b.yiq=0;b.prototype.getHsl=function(){return this.hsl?this.hsl:this.hsl=g.rgbToHsl(this.rgb[0],this.rgb[1],this.rgb[2])};b.prototype.getPopulation=function(){return this.population};b.prototype.getRgb=function(){return this.rgb};b.prototype.getHex=function(){return"#"+(16777216+
(this.rgb[0]<<16)+(this.rgb[1]<<8)+this.rgb[2]).toString(16).slice(1,7)};b.prototype.getTitleTextColor=function(){this._ensureTextColors();return 200>this.yiq?"#fff":"#000"};b.prototype.getBodyTextColor=function(){this._ensureTextColors();return 150>this.yiq?"#fff":"#000"};b.prototype._ensureTextColors=function(){if(!this.yiq)return this.yiq=(299*this.rgb[0]+587*this.rgb[1]+114*this.rgb[2])/1E3};return b}();window.Vibrant=g=function(){function b(a,b,d){this.swatches=w(this.swatches,this);var e,f,
c,g,p,m,r,q;"undefined"===typeof b&&(b=64);"undefined"===typeof d&&(d=5);p=new l(a);r=p.getImageData().data;m=p.getPixelCount();a=[];for(g=0;g<m;)e=4*g,q=r[e+0],c=r[e+1],f=r[e+2],e=r[e+3],125<=e&&(250<q&&250<c&&250<f||a.push([q,c,f])),g+=d;this._swatches=this.quantize(a,b).vboxes.map(function(a){return function(a){return new h(a.color,a.vbox.count())}}(this));this.maxPopulation=this.findMaxPopulation;this.generateVarationColors();this.generateEmptySwatches();p.removeCanvas()}b.prototype.quantize=
A("quantize");b.prototype._swatches=[];b.prototype.TARGET_DARK_LUMA=0.26;b.prototype.MAX_DARK_LUMA=0.45;b.prototype.MIN_LIGHT_LUMA=0.55;b.prototype.TARGET_LIGHT_LUMA=0.74;b.prototype.MIN_NORMAL_LUMA=0.3;b.prototype.TARGET_NORMAL_LUMA=0.5;b.prototype.MAX_NORMAL_LUMA=0.7;b.prototype.TARGET_MUTED_SATURATION=0.3;b.prototype.MAX_MUTED_SATURATION=0.4;b.prototype.TARGET_VIBRANT_SATURATION=1;b.prototype.MIN_VIBRANT_SATURATION=0.35;b.prototype.WEIGHT_SATURATION=3;b.prototype.WEIGHT_LUMA=6;b.prototype.WEIGHT_POPULATION=
1;b.prototype.VibrantSwatch=void 0;b.prototype.MutedSwatch=void 0;b.prototype.DarkVibrantSwatch=void 0;b.prototype.DarkMutedSwatch=void 0;b.prototype.LightVibrantSwatch=void 0;b.prototype.LightMutedSwatch=void 0;b.prototype.HighestPopulation=0;b.prototype.generateVarationColors=function(){this.VibrantSwatch=this.findColorVariation(this.TARGET_NORMAL_LUMA,this.MIN_NORMAL_LUMA,this.MAX_NORMAL_LUMA,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1);this.LightVibrantSwatch=this.findColorVariation(this.TARGET_LIGHT_LUMA,
this.MIN_LIGHT_LUMA,1,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1);this.DarkVibrantSwatch=this.findColorVariation(this.TARGET_DARK_LUMA,0,this.MAX_DARK_LUMA,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1);this.MutedSwatch=this.findColorVariation(this.TARGET_NORMAL_LUMA,this.MIN_NORMAL_LUMA,this.MAX_NORMAL_LUMA,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION);this.LightMutedSwatch=this.findColorVariation(this.TARGET_LIGHT_LUMA,this.MIN_LIGHT_LUMA,1,this.TARGET_MUTED_SATURATION,
0,this.MAX_MUTED_SATURATION);return this.DarkMutedSwatch=this.findColorVariation(this.TARGET_DARK_LUMA,0,this.MAX_DARK_LUMA,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION)};b.prototype.generateEmptySwatches=function(){var a;void 0===this.VibrantSwatch&&void 0!==this.DarkVibrantSwatch&&(a=this.DarkVibrantSwatch.getHsl(),a[2]=this.TARGET_NORMAL_LUMA,this.VibrantSwatch=new h(b.hslToRgb(a[0],a[1],a[2]),0));if(void 0===this.DarkVibrantSwatch&&void 0!==this.VibrantSwatch)return a=this.VibrantSwatch.getHsl(),
a[2]=this.TARGET_DARK_LUMA,this.DarkVibrantSwatch=new h(b.hslToRgb(a[0],a[1],a[2]),0)};b.prototype.findMaxPopulation=function(){var a,b,d,e,f;d=0;e=this._swatches;a=0;for(b=e.length;a<b;a++)f=e[a],d=Math.max(d,f.getPopulation());return d};b.prototype.findColorVariation=function(a,b,d,e,f,c){var g,h,m,l,q,p,s,k;l=void 0;q=0;p=this._swatches;g=0;for(h=p.length;g<h;g++)if(k=p[g],s=k.getHsl()[1],m=k.getHsl()[2],s>=f&&s<=c&&m>=b&&m<=d&&!this.isAlreadySelected(k)&&(m=this.createComparisonValue(s,e,m,a,
k.getPopulation(),this.HighestPopulation),void 0===l||m>q))l=k,q=m;return l};b.prototype.createComparisonValue=function(a,b,d,e,f,c){return this.weightedMean(this.invertDiff(a,b),this.WEIGHT_SATURATION,this.invertDiff(d,e),this.WEIGHT_LUMA,f/c,this.WEIGHT_POPULATION)};b.prototype.invertDiff=function(a,b){return 1-Math.abs(a-b)};b.prototype.weightedMean=function(){var a,b,d,e,f,c;f=1<=arguments.length?p.call(arguments,0):[];for(a=d=b=0;a<f.length;)e=f[a],c=f[a+1],b+=e*c,d+=c,a+=2;return b/d};b.prototype.swatches=
function(){return{Vibrant:this.VibrantSwatch,Muted:this.MutedSwatch,DarkVibrant:this.DarkVibrantSwatch,DarkMuted:this.DarkMutedSwatch,LightVibrant:this.LightVibrantSwatch,LightMuted:this.LightMuted}};b.prototype.isAlreadySelected=function(a){return this.VibrantSwatch===a||this.DarkVibrantSwatch===a||this.LightVibrantSwatch===a||this.MutedSwatch===a||this.DarkMutedSwatch===a||this.LightMutedSwatch===a};b.rgbToHsl=function(a,b,d){var e,f,c,g,h;a/=255;b/=255;d/=255;g=Math.max(a,b,d);h=Math.min(a,b,d);
f=void 0;c=(g+h)/2;if(g===h)f=h=0;else{e=g-h;h=0.5<c?e/(2-g-h):e/(g+h);switch(g){case a:f=(b-d)/e+(b<d?6:0);break;case b:f=(d-a)/e+2;break;case d:f=(a-b)/e+4}f/=6}return[f,h,c]};b.hslToRgb=function(a,b,d){var e,f,c;e=f=c=void 0;e=function(a,b,c){0>c&&(c+=1);1<c&&(c-=1);return c<1/6?a+6*(b-a)*c:0.5>c?b:c<2/3?a+(b-a)*(2/3-c)*6:a};0===b?c=f=e=d:(b=0.5>d?d*(1+b):d+b-d*b,d=2*d-b,c=e(d,b,a+1/3),f=e(d,b,a),e=e(d,b,a-1/3));return[255*c,255*f,255*e]};return b}();window.CanvasImage=l=function(){function b(a){this.canvas=
document.createElement("canvas");this.context=this.canvas.getContext("2d");document.body.appendChild(this.canvas);this.width=this.canvas.width=a.width;this.height=this.canvas.height=a.height;this.context.drawImage(a,0,0,this.width,this.height)}b.prototype.clear=function(){return this.context.clearRect(0,0,this.width,this.height)};b.prototype.update=function(a){return this.context.putImageData(a,0,0)};b.prototype.getPixelCount=function(){return this.width*this.height};b.prototype.getImageData=function(){return this.context.getImageData(0,
0,this.width,this.height)};b.prototype.removeCanvas=function(){return this.canvas.parentNode.removeChild(this.canvas)};return b}()}).call(this)},{quantize:1}]},{},[2]);
