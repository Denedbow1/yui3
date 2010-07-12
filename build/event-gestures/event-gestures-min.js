YUI.add("event-flick",function(B){var F=("ontouchstart" in B.config.win)?{start:"touchstart",end:"touchend"}:{start:"mousedown",end:"mouseup"},G="start",J="end",A="ownerDocument",H="minVelocity",D="minDistance",C="_fs",E="_fsh",K="_feh",I="nodeType";B.Event.define("flick",{init:function(M,L,O){var N=M.on(F[G],B.bind(this._onStart,this),null,M,L,O);M.setData(E,N);},destroy:function(N,M,P){var O=N.getData(E),L=N.getData(K);if(O){O.detach();N.clearData(E);}if(L){L.detach();N.clearData(K);}},processArgs:function(L){var M=(L[3])?L.splice(3,1):{};if(!(H in M)){M.minVelocity=this.MIN_VELOCITY;}if(!(D in M)){M.minDistance=this.MIN_DISTANCE;}return M;},_onStart:function(Q,N,M,P){var R=true,L,O;if(Q.touches){R=(Q.touches.length===1);Q=Q.touches[0];}if(R){Q.preventDefault();N.setData(C,{time:new Date().getTime(),pageX:Q.pageX,pageY:Q.pageY,clientX:Q.clientX,clientY:Q.clientY,_e:Q});L=N.getData(K);if(!L){O=(N.get(I)===9)?N:N.get(A);L=O.on(F[J],B.bind(this._onEnd,this),null,N,M,P);N.setData(K,L);}}},_onEnd:function(Y,S,Z,P){var X=new Date().getTime(),L=S.getData(C),N=L,a=Y,O,R,U,W,M,V,T,Q;if(L){if(Y.changedTouches){if(Y.changedTouches.length===1&&Y.touches.length===0){a=Y.changedTouches[0];}else{L=false;}}if(L){O=N.time;X=new Date().getTime();R=X-O;U=Z._extra;W=[a.pageX-N.pageX,a.pageY-N.pageY];Q=U.axis||(Math.abs(W[0])>=Math.abs(W[1]))?"x":"y";M=W[(Q==="x")?0:1];V=Math.abs(M);T=V/R;if(isFinite(T)&&T>=U.minVelocity&&V>=U.minDistance){P.fire({distance:M,time:R,velocity:T,axis:Q,button:Y.button,start:N,end:{time:X,clientX:a.clientX,clientY:a.clientY,pageX:a.pageX,pageY:a.pageY,_e:Y}});}S.clearData(C);}}},MIN_VELOCITY:0,MIN_DISTANCE:10});},"@VERSION@",{requires:["node-base","event-touch","event-synthetic"]});YUI.add("event-move",function(B){var F=("ontouchstart" in B.config.win)?{start:"touchstart",move:"touchmove",end:"touchend"}:{start:"mousedown",move:"mousemove",end:"mouseup"},N="start",R="move",E="end",Q="_msh",H="_mh",M="_meh",D="_ms",J="_m",P="minTime",K="minDistance",L="ownerDocument",I="nodeType",O={emitFacade:false},G=function(S){return S[3]?S.splice(3,1)[0]:{};},C=function(T,S){return S._extra.root||(T.get(I)===9)?T:T.get(L);},A=B.Event.define;A("movestart",{init:function(T,S,U){T.setData(Q,T.on(F[N],this._onStart,null,T,S,U));},destroy:function(T,S,V){var U=T.getData(Q);if(U){U.detach();T.clearData(Q);}},processArgs:function(S){var T=G(S);if(!(P in T)){T[P]=this.MIN_TIME;}if(!(K in T)){T[K]=this.MIN_DISTANCE;}return T;},publishConfig:O,_onStart:function(W,T,S,V){W.preventDefault();var X=true,U=W;if(W.touches){X=(W.touches.length===1);W=W.touches[0];W.target=W.target||U.target;W.currentTarget=W.currentTarget||U.currentTarget;}if(X){W.type="movestart";T.setData(D,W);V.fire(W);}},MIN_TIME:0,MIN_DISTANCE:3});A("move",{init:function(U,T,W){var S=C(U,T),V=S.on(F[R],B.bind(this._onMove,this),null,U,T,W);U.setData(H,V);},processArgs:G,destroy:function(T,S,V){var U=T.getData(H);if(U){U.detach();T.clearData(H);}},publishConfig:O,_onMove:function(X,U,T,W){var S=T._extra.standAlone||U.getData(D),V=X;if(S){if(X.touches){S=(X.touches.length===1);X=X.touches[0];X.target=X.target||V.target;X.currentTarget=X.currentTarget||V.currentTarget;}if(S){V.preventDefault();X.type="move";U.setData(J,X);W.fire(X);}}}});A("moveend",{init:function(V,U,W){var T=C(V,U),S=T.on(F[E],B.bind(this._onEnd,this),null,V,U,W);V.setData(M,S);},processArgs:G,destroy:function(U,T,V){var S=U.getData(M);if(S){S.detach();U.clearData(M);}},publishConfig:O,_onEnd:function(X,T,S,W){var V=S._extra.standAlone||T.getData(J)||T.getData(D),U=X;if(V){if(X.changedTouches){if(X.changedTouches.length===1){X=X.changedTouches[0];X.target=X.target||U.target;X.currentTarget=X.currentTarget||U.currentTarget;}else{V=false;}}if(V){U.preventDefault();X.type="moveend";T.clearData(D);T.clearData(J);W.fire(X);}}}});},"@VERSION@",{requires:["node-base","event-touch","event-synthetic"]});YUI.add("event-gestures",function(A){},"@VERSION@",{use:["event-flick","event-move"]});