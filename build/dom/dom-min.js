YUI.add("dom",function(q){var N="nodeType",AA="ownerDocument",R="documentElement",y="defaultView",AG="parentWindow",AS="tagName",C="parentNode",l="firstChild",o="lastChild",v="previousSibling",AX="nextSibling",AJ="contains",AI="compareDocumentPosition",k="innerText",K="textContent",w="length",x=undefined;var W=/<([a-z]+)/i;var AK={};q.DOM={byId:function(Ab,Y){return q.DOM._getDoc(Y).getElementById(Ab);},getText:function(Y){var Ab=Y?Y[K]:"";if(Ab===x&&k in Y){Ab=Y[k];}return Ab||"";},firstChild:function(Y,Ab){return q.DOM._childBy(Y,null,Ab);},firstChildByTag:function(Ab,Y,Ac){return q.DOM._childBy(Ab,Y,Ac);},lastChild:function(Y,Ab){return q.DOM._childBy(Y,null,Ab,true);},lastChildByTag:function(Ab,Y,Ac){return q.DOM._childBy(Ab,Y,Ac,true);},childrenByTag:function(){if(document[R].children){return function(Ac,Y,Ad,Ab){Y=(Y&&Y!=="*")?Y:null;var Ae=[];if(Ac){Ae=(Y)?Ac.children.tags(Y):Ac.children;if(Ad||Ab){Ae=q.DOM.filterElementsBy(Ae,Ad);}}return Ae;};}else{return function(Ac,Ab,Ad){Ab=(Ab&&Ab!=="*")?Ab.toUpperCase():null;var Ae=[],Y=Ad;if(Ac){Ae=Ac.childNodes;if(Ab){Y=function(Af){return Af[AS].toUpperCase()===Ab&&(!Ad||Ad(Af));};}Ae=q.DOM.filterElementsBy(Ae,Y);}return Ae;};}}(),children:function(Y,Ab){return q.DOM.childrenByTag(Y,null,Ab);},previous:function(Y,Ab){return q.DOM.elementByAxis(Y,v,Ab);},next:function(Y,Ab){return q.DOM.elementByAxis(Y,AX,Ab);},ancestor:function(Y,Ab){return q.DOM.elementByAxis(Y,C,Ab);},elementByAxis:function(Y,Ad,Ac,Ab){while(Y&&(Y=Y[Ad])){if((Ab||Y[AS])&&(!Ac||Ac(Y))){return Y;}}return null;},byTag:function(Ab,Ac,Af){Ac=Ac||q.config.doc;var Ag=Ac.getElementsByTagName(Ab),Ae=[];for(var Ad=0,Y=Ag[w];Ad<Y;++Ad){if(!Af||Af(Ag[Ad])){Ae[Ae[w]]=Ag[Ad];}}return Ae;},firstByTag:function(Ab,Ac,Af){Ac=Ac||q.config.doc;var Ag=Ac.getElementsByTagName(Ab),Ad=null;for(var Ae=0,Y=Ag[w];Ae<Y;++Ae){if(!Af||Af(Ag[Ae])){Ad=Ag[Ae];break;}}return Ad;},filterElementsBy:function(Af,Ae,Ad){var Ab=(Ad)?null:[];for(var Ac=0,Y=Af[w];Ac<Y;++Ac){if(Af[Ac][AS]&&(!Ae||Ae(Af[Ac]))){if(Ad){Ab=Af[Ac];break;}else{Ab[Ab[w]]=Af[Ac];}}}return Ab;},contains:function(Ab,Ac){var Y=false;if(!Ac||!Ab){Y=false;}else{if(Ab[AJ]){if(q.UA.opera||Ac[N]===1){Y=Ab[AJ](Ac);}else{Y=q.DOM._bruteContains(Ab,Ac);}}else{if(Ab[AI]){if(Ab===Ac||!!(Ab[AI](Ac)&16)){Y=true;}}}}return Y;},create:function(Ae,Ag){Ag=Ag||q.config.doc;var Ab=W.exec(Ae);var Ad=q.DOM._create,Af=q.DOM.creators,Y,Ac;if(Ab&&Af[Ab[1]]){if(typeof Af[Ab[1]]==="function"){Ad=Af[Ab[1]];}else{Y=Af[Ab[1]];}}Ac=Ad(Ae,Ag,Y);return(Ac.childNodes.length>1)?Ac.childNodes:Ac.childNodes[0];},_create:function(Ab,Ac,Y){Y=Y||"div";var Ad=AK[Y]||Ac.createElement(Y);Ad.innerHTML=Ab;return Ad;},_bruteContains:function(Y,Ab){while(Ab){if(Y===Ab){return true;}Ab=Ab.parentNode;}return false;},_getRegExp:function(Ab,Y){Y=Y||"";q.DOM._regexCache=q.DOM._regexCache||{};if(!q.DOM._regexCache[Ab+Y]){q.DOM._regexCache[Ab+Y]=new RegExp(Ab,Y);}return q.DOM._regexCache[Ab+Y];},_getDoc:function(Y){Y=Y||{};return(Y[N]===9)?Y:Y[AA]||q.config.doc;},_getWin:function(Y){var Ab=q.DOM._getDoc(Y);return(Y.document)?Y:Ab[y]||Ab[AG]||q.config.win;},_childBy:function(Ae,Y,Ag,Ac){var Ad=null,Ab,Af;if(Ae){if(Ac){Ab=Ae[o];Af=v;}else{Ab=Ae[l];Af=AX;}if(q.DOM._testElement(Ab,Y,Ag)){Ad=Ab;}else{Ad=q.DOM.elementByAxis(Ab,Af,Ag);}}return Ad;},_testElement:function(Ab,Y,Ac){Y=(Y&&Y!=="*")?Y.toUpperCase():null;return(Ab&&Ab[AS]&&(!Y||Ab[AS].toUpperCase()===Y)&&(!Ac||Ac(Ab)));},creators:{},_IESimpleCreate:function(Y,Ab){Ab=Ab||q.config.doc;return Ab.createElement(Y);}};(function(){var Ae=q.DOM.creators,Y=q.DOM.create,Ad=/(?:\/(?:thead|tfoot|tbody|caption|col|colgroup)>)+\s*<tbody/;var Ac="<table>",Ab="</table>";if(q.UA.gecko||q.UA.ie){q.mix(Ae,{option:function(Af,Ag){var Ah=Y("<select>"+Af+"</select>");return Ah;},tr:function(Af,Ag){var Ah=Ae.tbody("<tbody>"+Af+"</tbody>",Ag);return Ah.firstChild;},td:function(Af,Ag){var Ah=Ae.tr("<tr>"+Af+"</tr>",Ag);return Ah.firstChild;},tbody:function(Af,Ag){var Ah=Y(Ac+Af+Ab,Ag);return Ah;},legend:"fieldset"});Ae.col=Ae.tbody;}if(q.UA.ie){Ae.col=Ae.script=Ae.link=q.DOM._IESimpleCreate;Ae.tbody=function(Ag,Ah){var Ai=Y(Ac+Ag+Ab,Ah);var Af=Ai.children.tags("tbody")[0];if(Ai.children.length>1&&Af&&!Ad.test(Ag)){Af.parentNode.removeChild(Af);}return Ai;};}if(q.UA.gecko||q.UA.ie){q.mix(Ae,{th:Ae.td,thead:Ae.tbody,tfoot:Ae.tbody,caption:Ae.tbody,colgroup:Ae.tbody,col:Ae.tbody,optgroup:Ae.option});}})();var AH="className";q.mix(q.DOM,{hasClass:function(Ac,Ab){var Y=q.DOM._getRegExp("(?:^|\\s+)"+Ab+"(?:\\s+|$)");return Y.test(Ac[AH]);},addClass:function(Ab,Y){if(!q.DOM.hasClass(Ab,Y)){Ab[AH]=q.Lang.trim([Ab[AH],Y].join(" "));}},removeClass:function(Ab,Y){if(Y&&q.DOM.hasClass(Ab,Y)){Ab[AH]=q.Lang.trim(Ab[AH].replace(q.DOM._getRegExp("(?:^|\\s+)"+Y+"(?:\\s+|$)")," "));if(q.DOM.hasClass(Ab,Y)){q.DOM.removeClass(Ab,Y);}}},replaceClass:function(Ab,Y,Ac){q.DOM.addClass(Ab,Ac);q.DOM.removeClass(Ab,Y);},toggleClass:function(Ab,Y){if(q.DOM.hasClass(Ab,Y)){q.DOM.removeClass(Ab,Y);}else{q.DOM.addClass(Ab,Y);}}});var R="documentElement",y="defaultView",AA="ownerDocument",E="style",X="float",n="cssFloat",L="styleFloat",AC="transparent",t="visible",c="width",AN="height",U="borderTopWidth",S="borderRightWidth",B="borderBottomWidth",f="borderLeftWidth",AF="getComputedStyle",AR=q.config.doc,x=undefined,P=/color$/i;q.mix(q.DOM,{CUSTOM_STYLES:{},setStyle:function(Ad,Y,Ae){var Ac=Ad[E],Ab=q.DOM.CUSTOM_STYLES;if(Ac){if(Y in Ab){if(Ab[Y].set){Ab[Y].set(Ad,Ae,Ac);return ;}else{if(typeof Ab[Y]==="string"){Y=Ab[Y];}}}Ac[Y]=Ae;}},getStyle:function(Ad,Y){var Ac=Ad[E],Ab=q.DOM.CUSTOM_STYLES,Ae="";if(Ac){if(Y in Ab){if(Ab[Y].get){return Ab[Y].get(Ad,Y,Ac);}else{if(typeof Ab[Y]==="string"){Y=Ab[Y];}}}Ae=Ac[Y];if(Ae===""){Ae=q.DOM[AF](Ad,Y);}}return Ae;},"setStyles":function(Y,Ab){q.each(Ab,function(Ac,Ad){q.DOM.setStyle(Y,Ad,Ac);},q.DOM);},getComputedStyle:function(Ab,Y){var Ad="",Ac=Ab[AA];if(Ab[E]){Ad=Ac[y][AF](Ab,"")[Y];}return Ad;}});if(AR[R][E][n]!==x){q.DOM.CUSTOM_STYLES[X]=n;}else{if(AR[R][E][L]!==x){q.DOM.CUSTOM_STYLES[X]=L;
}}if(q.UA.opera){q.DOM[AF]=function(Ac,Ab){var Y=Ac[AA][y],Ad=Y[AF](Ac,"")[Ab];if(P.test(Ab)){Ad=q.Color.toRGB(Ad);}return Ad;};}if(q.UA.webkit){q.DOM[AF]=function(Ac,Ab){var Y=Ac[AA][y],Ad=Y[AF](Ac,"")[Ab];if(Ad==="rgba(0, 0, 0, 0)"){Ad=AC;}return Ad;};}var D="offsetTop",R="documentElement",i="compatMode",AE="offsetLeft",AD="offsetParent",J="position",e="fixed",I="relative",A="left",H="top",Aa="scrollLeft",u="scrollTop",AB="BackCompat",Q="medium",AN="height",c="width",f="borderLeftWidth",U="borderTopWidth",V="getBoundingClientRect",AF="getComputedStyle",AQ=/^t(?:able|d|h)$/i;q.mix(q.DOM,{winHeight:function(Ab){var Y=q.DOM._getWinSize(Ab)[AN];return Y;},winWidth:function(Ab){var Y=q.DOM._getWinSize(Ab)[c];return Y;},docHeight:function(Ab){var Y=q.DOM._getDocSize(Ab)[AN];return Math.max(Y,q.DOM._getWinSize(Ab)[AN]);},docWidth:function(Ab){var Y=q.DOM._getDocSize(Ab)[c];return Math.max(Y,q.DOM._getWinSize(Ab)[c]);},docScrollX:function(Y){var Ab=q.DOM._getDoc();return Math.max(Ab[R][Aa],Ab.body[Aa]);},docScrollY:function(Y){var Ab=q.DOM._getDoc();return Math.max(Ab[R][u],Ab.body[u]);},getXY:function(){if(document[R][V]){return function(Ad){if(!Ad){return false;}var Ae=q.DOM.docScrollX(Ad),Ab=q.DOM.docScrollY(Ad),Af=Ad[V](),Aj=q.DOM._getDoc(Ad),Ak=[Math.floor(Af[A]),Math.floor(Af[H])];if(q.UA.ie){var Ai=2,Ah=2,Ag=Aj[i],Y=q.DOM[AF](Aj[R],f),Ac=q.DOM[AF](Aj[R],U);if(q.UA.ie===6){if(Ag!==AB){Ai=0;Ah=0;}}if((Ag==AB)){if(Y!==Q){Ai=parseInt(Y,10);}if(Ac!==Q){Ah=parseInt(Ac,10);}}Ak[0]-=Ai;Ak[1]-=Ah;}if((Ab||Ae)){Ak[0]+=Ae;Ak[1]+=Ab;}Ak[0]=Math.floor(Ak[0]);Ak[1]=Math.floor(Ak[1]);return Ak;};}else{return function(Ab){var Ad=[Ab[AE],Ab[D]],Y=Ab,Af=((q.UA.gecko||(q.UA.webkit>519))?true:false);while((Y=Y[AD])){Ad[0]+=Y[AE];Ad[1]+=Y[D];if(Af){Ad=q.DOM._calcBorders(Y,Ad);}}if(q.DOM.getStyle(Ab,J)!=e){Y=Ab;var Ac,Ae;while((Y=Y.parentNode)){Ac=Y[u];Ae=Y[Aa];if(q.UA.gecko&&(q.DOM.getStyle(Y,"overflow")!=="visible")){Ad=q.DOM._calcBorders(Y,Ad);}if(Ac||Ae){Ad[0]-=Ae;Ad[1]-=Ac;}}Ad[0]+=q.DOM.docScrollX(Ab);Ad[1]+=q.DOM.docScrollY(Ab);}else{if(q.UA.opera){Ad[0]-=q.DOM.docScrollX(Ab);Ad[1]-=q.DOM.docScrollY(Ab);}else{if(q.UA.webkit||q.UA.gecko){Ad[0]+=q.DOM.docScrollX(Ab);Ad[1]+=q.DOM.docScrollY(Ab);}}}Ad[0]=Math.floor(Ad[0]);Ad[1]=Math.floor(Ad[1]);return Ad;};}}(),getX:function(Y){return q.DOM.getXY(Y)[0];},getY:function(Y){return q.DOM.getXY(Y)[1];},setXY:function(Ab,Ae,Ah){var Ag=q.DOM.getStyle(Ab,J),Ac=q.DOM.setStyle,Af=[parseInt(q.DOM[AF](Ab,A),10),parseInt(q.DOM[AF](Ab,H),10)];if(Ag=="static"){Ag=I;Ac(Ab,J,Ag);}var Ad=q.DOM.getXY(Ab);if(Ad===false){return false;}if(isNaN(Af[0])){Af[0]=(Ag==I)?0:Ab[AE];}if(isNaN(Af[1])){Af[1]=(Ag==I)?0:Ab[D];}if(Ae[0]!==null){Ac(Ab,A,Ae[0]-Ad[0]+Af[0]+"px");}if(Ae[1]!==null){Ac(Ab,H,Ae[1]-Ad[1]+Af[1]+"px");}if(!Ah){var Y=q.DOM.getXY(Ab);if((Ae[0]!==null&&Y[0]!=Ae[0])||(Ae[1]!==null&&Y[1]!=Ae[1])){q.DOM.setXY(Ab,Ae,true);}}},setX:function(Ab,Y){return q.DOM.setXY(Ab,[Y,null]);},setY:function(Y,Ab){return q.DOM.setXY(Y,[null,Ab]);},_calcBorders:function(Ac,Ad){var Ab=parseInt(q.DOM[AF](Ac,U),10)||0,Y=parseInt(q.DOM[AF](Ac,f),10)||0;if(q.UA.gecko){if(AQ.test(Ac.tagName)){Ab=0;Y=0;}}Ad[0]+=Y;Ad[1]+=Ab;return Ad;},_getWinSize:function(Ad){var Af=q.DOM._getDoc(),Ae=Af.defaultView||Af.parentWindow,Ag=Af[i],Ac=Ae.innerHeight,Ab=Ae.innerWidth,Y=Af[R];if(Ag&&!q.UA.opera){if(Ag!="CSS1Compat"){Y=Af.body;}Ac=Y.clientHeight;Ab=Y.clientWidth;}return{height:Ac,width:Ab};},_getDocSize:function(Ab){var Ac=q.DOM._getDoc(),Y=Ac[R];if(Ac[i]!="CSS1Compat"){Y=Ac.body;}return{height:Y.scrollHeight,width:Y.scrollWidth};}});var AU="offsetWidth",b="offsetHeight",AS="tagName";var AY=function(Ad,Ac){var Ae=Math.max(Ad.top,Ac.top),Af=Math.min(Ad.right,Ac.right),Y=Math.min(Ad.bottom,Ac.bottom),Ab=Math.max(Ad.left,Ac.left);return{top:Ae,bottom:Y,left:Ab,right:Af};};q.mix(q.DOM,{region:function(Ac){var Y=q.DOM.getXY(Ac),Ab=false;if(Y){Ab={"0":Y[0],"1":Y[1],top:Y[1],right:Y[0]+Ac[AU],bottom:Y[1]+Ac[b],left:Y[0],height:Ac[b],width:Ac[AU]};}return Ab;},intersect:function(Ac,Y,Ae){var Ab=Ae||q.DOM.region(Ac),Ad={};var Ag=Y;if(Ag[AS]){Ad=q.DOM.region(Ag);}else{if(q.Lang.isObject(Y)){Ad=Y;}else{return false;}}var Af=AY(Ad,Ab);return{top:Af.top,right:Af.right,bottom:Af.bottom,left:Af.left,area:((Af.bottom-Af.top)*(Af.right-Af.left)),yoff:((Af.bottom-Af.top)),xoff:(Af.right-Af.left),inRegion:q.DOM.inRegion(Ac,Y,false,Ae)};},inRegion:function(Ad,Y,Ab,Af){var Ae={},Ac=Af||q.DOM.region(Ad);var Ah=Y;if(Ah[AS]){Ae=q.DOM.region(Ah);}else{if(q.Lang.isObject(Y)){Ae=Y;}else{return false;}}if(Ab){return(Ac.left>=Ae.left&&Ac.right<=Ae.right&&Ac.top>=Ae.top&&Ac.bottom<=Ae.bottom);}else{var Ag=AY(Ae,Ac);if(Ag.bottom>=Ag.top&&Ag.right>=Ag.left){return true;}else{return false;}}},inViewportRegion:function(Ab,Y,Ac){return q.DOM.inRegion(Ab,q.DOM.viewportRegion(Ab),Y,Ac);},viewportRegion:function(Ab){Ab=Ab||q.config.doc.documentElement;var Y={top:q.DOM.docScrollY(Ab),right:q.DOM.winWidth(Ab)+q.DOM.docScrollX(Ab),bottom:(q.DOM.docScrollY(Ab)+q.DOM.winHeight(Ab)),left:q.DOM.docScrollX(Ab)};return Y;}});var AL="clientTop",g="clientLeft",C="parentNode",G="right",r="hasLayout",s="px",AW="filter",AV="filters",p="opacity",AZ="auto",d="currentStyle";if(document[R][E][p]===x&&document[R][AV]){q.DOM.CUSTOM_STYLES[p]={get:function(Ab){var Ad=100;try{Ad=Ab[AV]["DXImageTransform.Microsoft.Alpha"][p];}catch(Ac){try{Ad=Ab[AV]("alpha")[p];}catch(Y){}}return Ad/100;},set:function(Ab,Ac,Y){if(typeof Y[AW]=="string"){Y[AW]="alpha("+p+"="+Ac*100+")";if(!Ab[d]||!Ab[d][r]){Y.zoom=1;}}}};}var AT=/^width|height$/,j=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i;var z={CUSTOM_STYLES:{},get:function(Y,Ac){var Ab="",Ad=Y[d][Ac];if(Ac===p){Ab=q.DOM.CUSTOM_STYLES[p].get(Y);}else{if(!Ad||Ad.indexOf(s)>-1){Ab=Ad;}else{if(q.DOM.IE.COMPUTED[Ac]){Ab=q.DOM.IE.COMPUTED[Ac](Y,Ac);}else{if(j.test(Ad)){Ab=q.DOM.IE.ComputedStyle.getPixel(Y,Ac);}else{Ab=Ad;}}}}return Ab;},getOffset:function(Ac,Ah){var Ae=Ac[d][Ah],Y=Ah.charAt(0).toUpperCase()+Ah.substr(1),Af="offset"+Y,Ab="pixel"+Y,Ad="";
if(Ae==AZ){var Ag=Ac[Af];if(Ag===x){Ad=0;}Ad=Ag;if(AT.test(Ah)){Ac[E][Ah]=Ag;if(Ac[Af]>Ag){Ad=Ag-(Ac[Af]-Ag);}Ac[E][Ah]=AZ;}}else{if(!Ac[E][Ab]&&!Ac[E][Ah]){Ac[E][Ah]=Ae;}Ad=Ac[E][Ab];}return Ad+s;},getBorderWidth:function(Y,Ac){var Ab=null;if(!Y[d][r]){Y[E].zoom=1;}switch(Ac){case U:Ab=Y[AL];break;case B:Ab=Y.offsetHeight-Y.clientHeight-Y[AL];break;case f:Ab=Y[g];break;case S:Ab=Y.offsetWidth-Y.clientWidth-Y[g];break;}return Ab+s;},getPixel:function(Ab,Y){var Ad=null,Ae=Ab[d][G],Ac=Ab[d][Y];Ab[E][G]=Ac;Ad=Ab[E].pixelRight;Ab[E][G]=Ae;return Ad+s;},getMargin:function(Ab,Y){var Ac;if(Ab[d][Y]==AZ){Ac=0+s;}else{Ac=q.DOM.IE.ComputedStyle.getPixel(Ab,Y);}return Ac;},getVisibility:function(Ab,Y){var Ac;while((Ac=Ab[d])&&Ac[Y]=="inherit"){Ab=Ab[C];}return(Ac)?Ac[Y]:t;},getColor:function(Ab,Y){var Ac=Ab[d][Y];if(!Ac||Ac===AC){q.DOM.elementByAxis(Ab,C,null,function(Ad){Ac=Ad[d][Y];if(Ac&&Ac!==AC){Ab=Ad;return true;}});}return q.Color.toRGB(Ac);},getBorderColor:function(Ab,Y){var Ac=Ab[d];var Ad=Ac[Y]||Ac.color;return q.Color.toRGB(q.Color.toHex(Ad));}};var AO={};AO[c]=AO[AN]=z.getOffset;AO.color=AO.backgroundColor=z.getColor;AO[U]=AO[S]=AO[B]=AO[f]=z.getBorderWidth;AO.marginTop=AO.marginRight=AO.marginBottom=AO.marginLeft=z.getMargin;AO.visibility=z.getVisibility;AO.borderTopColor=AO.borderRightColor=AO.borderBottomColor=AO.borderLeftColor=z.getBorderColor;if(!q.config.win[AF]){q.DOM[AF]=z.get;}q.namespace("DOM.IE");q.DOM.IE.COMPUTED=AO;q.DOM.IE.ComputedStyle=z;var h="tag",C="parentNode",v="previousSibling",w="length",N="nodeType",AS="tagName",M="attributes",m="pseudos",F="combinator";var a=/^(?:([\-]?\d*)(n){1}|(odd|even)$)*([\-+]?\d*)$/;var AM={tag:/^((?:-?[_a-z]+[\w\-]*)|\*)/i,attributes:/^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,pseudos:/^:([\-\w]+)(?:\(['"]?(.+)['"]?\))*/i,combinator:/^\s*([>+~]|\s)\s*/};var AP={document:q.config.doc,attrAliases:{},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[class~=$1]"},operators:{"=":function(Y,Ab){return Y===Ab;},"!=":function(Y,Ab){return Y!==Ab;},"~=":function(Y,Ac){var Ab=" ";return(Ab+Y+Ab).indexOf((Ab+Ac+Ab))>-1;},"|=":function(Y,Ab){return q.DOM._getRegExp("^"+Ab+"[-]?").test(Y);},"^=":function(Y,Ab){return Y.indexOf(Ab)===0;},"$=":function(Y,Ab){return Y.lastIndexOf(Ab)===Y[w]-Ab[w];},"*=":function(Y,Ab){return Y.indexOf(Ab)>-1;},"":function(Y,Ab){return Y;}},pseudos:{"root":function(Y){return Y===Y.ownerDocument.documentElement;},"nth-child":function(Y,Ab){return AP.getNth(Y,Ab);},"nth-last-child":function(Y,Ab){return AP.getNth(Y,Ab,null,true);},"nth-of-type":function(Y,Ab){return AP.getNth(Y,Ab,Y[AS]);},"nth-last-of-type":function(Y,Ab){return AP.getNth(Y,Ab,Y[AS],true);},"first-child":function(Y){return q.DOM.firstChild(Y[C])===Y;},"last-child":function(Y){return q.DOM.lastChild(Y[C])===Y;},"first-of-type":function(Y,Ab){return q.DOM.firstChildByTag(Y[C],Y[AS])===Y;},"last-of-type":function(Y,Ab){return q.DOM.lastChildByTag(Y[C],Y[AS])===Y;},"only-child":function(Ab){var Y=q.DOM.children(Ab[C]);return Y[w]===1&&Y[0]===Ab;},"only-of-type":function(Y){return q.DOM.childrenByTag(Y[C],Y[AS])[w]===1;},"empty":function(Y){return Y.childNodes[w]===0;},"not":function(Y,Ab){return !AP.test(Y,Ab);},"contains":function(Y,Ac){var Ab=Y.innerText||Y.textContent||"";return Ab.indexOf(Ac)>-1;},"checked":function(Y){return Y.checked===true;}},test:function(Ae,Ac){if(!Ae){return false;}var Ab=Ac?Ac.split(","):[];if(Ab[w]){for(var Ad=0,Y=Ab[w];Ad<Y;++Ad){if(AP._testNode(Ae,Ab[Ad])){return true;}}return false;}return AP._testNode(Ae,Ac);},filter:function(Ac,Ab){Ac=Ac||[];var Y=AP._filter(Ac,AP._tokenize(Ab)[0]);return Y;},query:function(Ab,Ac,Ad){var Y=AP._query(Ab,Ac,Ad);return Y;},_query:function(Ag,Al,Am,Ae){var Ao=(Am)?null:[];if(!Ag){return Ao;}Al=Al||AP.document;var Ac=Ag.split(",");if(Ac[w]>1){var An;for(var Ah=0,Ai=Ac[w];Ah<Ai;++Ah){An=arguments.callee(Ac[Ah],Al,Am,true);Ao=Am?An:Ao.concat(An);}AP._clearFoundCache();return Ao;}var Ak=AP._tokenize(Ag);var Aj=Ak[AP._getIdTokenIndex(Ak)],Y=[],Ad,Ab,Af=Ak.pop()||{};if(Aj){Ab=AP._getId(Aj[M]);}if(Ab){Ad=AP.document.getElementById(Ab);if(Ad&&(Al[N]===9||q.DOM.contains(Al,Ad))){if(AP._testNode(Ad,null,Aj)){if(Aj===Af){Y=[Ad];}else{Al=Ad;}}}else{return Ao;}}if(Al&&!Y[w]){Y=Al.getElementsByTagName(Af[h]);}if(Y[w]){Ao=AP._filter(Y,Af,Am,Ae);}return Ao;},_filter:function(Ac,Ad,Ae,Ab){var Y=Ae?null:[];Y=q.DOM.filterElementsBy(Ac,function(Af){if(!AP._testNode(Af,"",Ad,Ab)){return false;}if(Ab){if(Af._found){return false;}Af._found=true;AP._foundCache[AP._foundCache[w]]=Af;}return true;},Ae);return Y;},_testNode:function(Ac,Ag,Af,Ad){Af=Af||AP._tokenize(Ag).pop()||{};var Ab=AP.operators,Aj=AP.pseudos,Ae=Af.previous,Ah,Ai;if(!Ac[AS]||(Af[h]!=="*"&&Ac[AS].toUpperCase()!==Af[h])||(Ad&&Ac._found)){return false;}if(Af[M][w]){var Y;for(Ah=0,Ai=Af[M][w];Ah<Ai;++Ah){Y=Ac.getAttribute(Af[M][Ah][0],2);if(Y===undefined){return false;}if(Ab[Af[M][Ah][1]]&&!Ab[Af[M][Ah][1]](Y,Af[M][Ah][2])){return false;}}}if(Af[m][w]){for(Ah=0,Ai=Af[m][w];Ah<Ai;++Ah){if(Aj[Af[m][Ah][0]]&&!Aj[Af[m][Ah][0]](Ac,Af[m][Ah][1])){return false;}}}return(Ae&&Ae[F]!==",")?AP.combinators[Ae[F]](Ac,Af):true;},_foundCache:[],_regexCache:{},_clearFoundCache:function(){for(var Ab=0,Y=AP._foundCache[w];Ab<Y;++Ab){try{delete AP._foundCache[Ab]._found;}catch(Ac){AP._foundCache[Ab].removeAttribute("_found");}}AP._foundCache=[];},combinators:{" ":function(Ab,Y){while((Ab=Ab[C])){if(AP._testNode(Ab,"",Y.previous)){return true;}}return false;},">":function(Ab,Y){return AP._testNode(Ab[C],null,Y.previous);},"+":function(Ac,Ab){var Y=Ac[v];while(Y&&Y[N]!==1){Y=Y[v];}if(Y&&AP._testNode(Y,null,Ab.previous)){return true;}return false;},"~":function(Ac,Ab){var Y=Ac[v];while(Y){if(Y[N]===1&&AP._testNode(Y,null,Ab.previous)){return true;}Y=Y[v];}return false;}},getNth:function(Ab,Ak,Al,Af){a.test(Ak);var Aj=parseInt(RegExp.$1,10),Y=RegExp.$2,Ag=RegExp.$3,Ah=parseInt(RegExp.$4,10)||0,Ad,Ac,Ae,Ai;if(Al){Ai=q.DOM.childrenByTag(Ab[C],Al);}else{Ai=q.DOM.children(Ab[C]);
}if(Ag){Aj=2;Ad="+";Y="n";Ah=(Ag==="odd")?1:0;}else{if(isNaN(Aj)){Aj=(Y)?1:0;}}if(Aj===0){if(Af){Ah=Ai[w]-Ah+1;}if(Ai[Ah-1]===Ab){return true;}else{return false;}}else{if(Aj<0){Af=!!Af;Aj=Math.abs(Aj);}}if(!Af){for(Ac=Ah-1,Ae=Ai[w];Ac<Ae;Ac+=Aj){if(Ac>=0&&Ai[Ac]===Ab){return true;}}}else{for(Ac=Ai[w]-Ah,Ae=Ai[w];Ac>=0;Ac-=Aj){if(Ac<Ae&&Ai[Ac]===Ab){return true;}}}return false;},_getId:function(Ab){for(var Ac=0,Y=Ab[w];Ac<Y;++Ac){if(Ab[Ac][0]=="id"&&Ab[Ac][1]==="="){return Ab[Ac][2];}}},_getIdTokenIndex:function(Ac){for(var Ab=0,Y=Ac[w];Ab<Y;++Ab){if(AP._getId(Ac[Ab][M])){return Ab;}}return -1;},_tokenize:function(Y){var Ac={},Af=[],Ae=false,Ab;Y=AP._replaceShorthand(Y);do{Ae=false;for(var Ad in AM){if(AM.hasOwnProperty(Ad)){if(Ad!=h&&Ad!=F){Ac[Ad]=Ac[Ad]||[];}if((Ab=AM[Ad].exec(Y))){Ae=true;if(Ad!=h&&Ad!=F){if(Ad===M&&Ab[1]==="id"){Ac.id=Ab[3];}Ac[Ad].push(Ab.slice(1));}else{Ac[Ad]=Ab[1];}Y=Y.replace(Ab[0],"");if(Ad===F||!Y[w]){Ac[M]=AP._fixAttributes(Ac[M]);Ac[m]=Ac[m]||[];Ac[h]=Ac[h]?Ac[h].toUpperCase():"*";Af.push(Ac);Ac={previous:Ac};}}}}}while(Ae);return Af;},_fixAttributes:function(Ab){var Ac=AP.attrAliases;Ab=Ab||[];for(var Ad=0,Y=Ab[w];Ad<Y;++Ad){if(Ac[Ab[Ad][0]]){Ab[Ad][0]=Ac[Ab[Ad][0]];}if(!Ab[Ad][1]){Ab[Ad][1]="";}}return Ab;},_replaceShorthand:function(Ab){var Ac=AP.shorthand;var Ad=Ab.match(AM[M]);if(Ad){Ab=Ab.replace(AM[M],"REPLACED_ATTRIBUTE");}for(var Af in Ac){if(Ac.hasOwnProperty(Af)){Ab=Ab.replace(q.DOM._getRegExp(Af,"gi"),Ac[Af]);}}if(Ad){for(var Ae=0,Y=Ad[w];Ae<Y;++Ae){Ab=Ab.replace("REPLACED_ATTRIBUTE",Ad[Ae]);}}return Ab;}};if(q.UA.ie){AP.attrAliases["class"]="className";AP.attrAliases["for"]="htmlFor";}q.Selector=AP;q.Selector.patterns=AM;var T="toString",O="parseInt",Z=RegExp;q.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(Y){if(!q.Color.re_RGB.test(Y)){Y=q.Color.toHex(Y);}if(q.Color.re_hex.exec(Y)){Y="rgb("+[O(Z.$1,16),O(Z.$2,16),O(Z.$3,16)].join(", ")+")";}return Y;},toHex:function(Ad){Ad=q.Color.KEYWORDS[Ad]||Ad;if(q.Color.re_RGB.exec(Ad)){var Ac=(Z.$1.length===1)?"0"+Z.$1:Number(Z.$1),Ab=(Z.$2.length===1)?"0"+Z.$2:Number(Z.$2),Y=(Z.$3.length===1)?"0"+Z.$3:Number(Z.$3);Ad=[Ac[T](16),Ab[T](16),Y[T](16)].join("");}if(Ad.length<6){Ad=Ad.replace(q.Color.re_hex3,"$1$1");}return(Ad.indexOf("#")<0?Ad="#"+Ad:Ad).toLowerCase();}};},"@VERSION@",{skinnable:false});