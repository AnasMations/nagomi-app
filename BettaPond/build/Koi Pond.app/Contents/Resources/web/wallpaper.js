(()=>{var X7={defaultEnabled:!1,toggleFadeSeconds:0.45,ambient:{source:"audio/ambient-river-v1.m4a",volume:0.3}};function f(E){return{kind:"num",...E}}function qE(E){return{kind:"range",...E}}function HE(E){return{kind:"color",...E}}function NH(E){return{kind:"rgb",...E}}function CJ(E){return{kind:"vec2",...E}}function qJ(E){return{kind:"bool",...E}}function L6(E){return{kind:"choice",...E}}function O8(E){return{kind:"index",...E}}function NJ(E){return{kind:"text",...E}}function n0(E,H={}){return{kind:"group",children:E,...H}}function bH(E,H,W={}){return{kind:"list",item:E,defaults:H,...W}}function o8(E,H,W){return{kind:"collection",item:E,defaults:H,...W}}function G$(E){return E.kind==="group"||E.kind==="list"||E.kind==="collection"}function B8(E,H){let W=E;for(let R of H){if(!W)return;if(W.kind==="group")W=typeof R==="string"?W.children[R]:void 0;else if(W.kind==="list"||W.kind==="collection")W=typeof R==="number"?W.item:void 0;else return}return W}function w8(E){if(E.kind==="group"){let H={};for(let W of Object.keys(E.children))H[W]=w8(E.children[W]);return H}if(E.kind==="list"||E.kind==="collection")return structuredClone(E.defaults);return structuredClone(E.default)}function zW(E,H,W=[]){if(H(E,W),E.kind==="group")for(let R of Object.keys(E.children))zW(E.children[R],H,[...W,R]);else if(E.kind==="list"||E.kind==="collection")for(let R=0;R<E.defaults.length;R+=1)zW(E.item,H,[...W,R])}function FJ(E,H,W=[]){zW(E,(R,J)=>{if(!G$(R))H(R,J)},W)}function Y$(E,H,W){let R=B8(H,E.of);if(R&&(R.kind==="list"||R.kind==="collection")){let J=W;for(let Q of E.of){if(J===null||typeof J!=="object")break;J=J[Q]}if(Array.isArray(J))return J.length;return R.defaults.length}return 1}function AW(E,H,W,R){switch(E.kind){case"num":{if(typeof H!=="number"||!Number.isFinite(H))return;let J=Math.min(E.max,Math.max(E.min,H));if(E.int)J=Math.round(J);return J}case"range":{if(!Array.isArray(H)||H.length!==2)return;let[J,Q]=H;if(typeof J!=="number"||typeof Q!=="number")return;let $=Math.min(E.max,Math.max(E.min,J)),Z=Math.min(E.max,Math.max(E.min,Q));return $<=Z?[$,Z]:[Z,$]}case"color":{if(typeof H!=="number"||!Number.isFinite(H))return;return Math.min(16777215,Math.max(0,Math.round(H)))}case"rgb":{if(!Array.isArray(H)||H.length!==3)return;let J=E.min??0,Q=E.max??2,$=H.map((Z)=>typeof Z==="number"&&Number.isFinite(Z)?Math.min(Q,Math.max(J,Z)):void 0);if($.some((Z)=>Z===void 0))return;return $}case"vec2":{if(!Array.isArray(H)||H.length!==2)return;let J=H.map((Q)=>typeof Q==="number"&&Number.isFinite(Q)?Math.min(E.max,Math.max(E.min,Q)):void 0);if(J.some((Q)=>Q===void 0))return;return J}case"bool":return typeof H==="boolean"?H:void 0;case"choice":return E.options.some((J)=>J.value===H)?H:void 0;case"index":{if(typeof H!=="number"||!Number.isFinite(H))return;let J=Y$(E,W,R??w8(W)),Q=Math.max(0,J-1);return Math.min(Q,Math.max(0,Math.round(H)))}case"text":return typeof H==="string"?H:void 0;default:return}}var EH=Math.PI*2,FH={width:480,height:270};function LJ(){let E=(W,R)=>Math.floor(W+Math.random()*(R-W)),H=E(0,4);if(H===0)return{x:E(16,FH.width-15),y:E(8,43)};if(H===1)return{x:E(FH.width-42,FH.width-7),y:E(16,FH.height-15)};if(H===2)return{x:E(16,FH.width-15),y:E(FH.height-42,FH.height-7)};return{x:E(8,43),y:E(16,FH.height-15)}}function a8(E,H,W=20){return n0({x:f({default:E,min:-W,max:W,step:0.1}),y:f({default:H,min:-W,max:W,step:0.1})})}var M$=n0({name:NJ({default:"",hidden:!0}),base:HE({default:16777215}),accent:HE({default:16777215}),marking:HE({default:16777215}),fin:HE({default:16777215})}),D$=n0({position:f({default:0,min:0,max:1,step:0.005}),length:f({default:0,min:0,max:1,step:0.005}),width:f({default:0,min:0,max:1,step:0.01}),offset:f({default:0,min:-1,max:1,step:0.01}),color:L6({default:"accent",options:[{value:"accent",label:"Accent"},{value:"marking",label:"Marking"}]})}),C$=bH(D$,[]),q$=n0({initialCount:f({default:10,min:1,max:48,step:1,int:!0,label:"Betta count",effect:"koi:count"}),regularLength:qE({default:[28,38],min:5,max:80,step:0.5,effect:"koi:body",keepsFamilyPreview:!0}),tinyEvery:f({default:3,min:2,max:12,step:1,int:!0,effect:"koi:body"}),tinyLength:qE({default:[19,24],min:5,max:60,step:0.5,effect:"koi:body"}),regularWidthRatio:qE({default:[0.19,0.22],min:0.05,max:0.6,step:0.005,effect:"koi:body",keepsFamilyPreview:!0}),tinyWidthRatio:qE({default:[0.18,0.22],min:0.05,max:0.6,step:0.005,effect:"koi:body"}),eyeColor:HE({default:1513493,effect:"koi:appearance",keepsFamilyPreview:!0}),shadow:n0({color:HE({default:729374,effect:"koi:appearance"}),surfaceOpacity:f({default:0.38,min:0,max:1,step:0.01}),deepOpacity:f({default:0.56,min:0,max:1,step:0.01}),offset:a8(4.4,10.4),depthOffset:a8(-3,-7)}),depth:n0({initialRange:qE({default:[0.05,0.18],min:0,max:1,step:0.01}),shallowRange:qE({default:[0.04,0.22],min:0,max:1,step:0.01}),deepRange:qE({default:[0.45,0.75],min:0,max:1,step:0.01}),surfaceDurationSeconds:qE({default:[8,22],min:0,max:60,step:0.05}),deepDurationSeconds:qE({default:[4,10],min:0,max:60,step:0.05}),changeProbability:f({default:0.72,min:0,max:1,step:0.01}),transitionSeconds:qE({default:[2,5],min:0,max:60,step:0.05}),callRiseDepth:f({default:0.035,min:0,max:1,step:0.001}),callRiseSeconds:f({default:2.4,min:0,max:60,step:0.05}),visualStart:f({default:0.1,min:0,max:1,step:0.01}),visualEnd:f({default:0.72,min:0,max:1,step:0.01}),deepBrightness:f({default:0.59,min:0,max:2,step:0.01}),deepSaturation:f({default:0.76,min:0,max:2,step:0.01}),deepWaterTint:NH({default:[0.66,0.84,0.8],min:0,max:2,step:0.01}),localDistortion:n0({strength:f({default:2.3,min:0,max:20,step:0.05}),lengthScale:f({default:0.72,min:0,max:5,step:0.01}),widthScale:f({default:1.85,min:0,max:5,step:0.01}),waveFrequency:f({default:8.5,min:0,max:80,step:0.5}),waveSpeed:f({default:2.4,min:-10,max:10,step:0.05})})}),feeding:n0({intervalSeconds:qE({default:[1,4],min:0,max:60,step:0.05}),retryDelaySeconds:qE({default:[0.55,1.35],min:0,max:60,step:0.05}),eligibleDepth:f({default:0.23,min:0,max:1,step:0.01}),eligibleSpeedFraction:f({default:0.62,min:0,max:2,step:0.01}),mouthForwardOffset:f({default:0.66,min:0,max:3,step:0.01}),animationDurationSeconds:f({default:0.24,min:0,max:10,step:0.01})}),callResponse:n0({minimumDelaySeconds:f({default:0.04,min:0,max:10,step:0.01}),distanceAtMaximumDelay:f({default:360,min:0,max:2000,step:5}),maximumDistanceDelaySeconds:f({default:1.05,min:0,max:10,step:0.01}),distanceExponent:f({default:1.5,min:0,max:5,step:0.05}),randomJitterSeconds:f({default:0.18,min:0,max:5,step:0.01}),temperamentDelaySeconds:f({default:0.22,min:0,max:5,step:0.01}),targetLifetimeSeconds:f({default:4.4,min:0,max:30,step:0.1}),chaseBoostSeconds:f({default:2.6,min:0,max:30,step:0.1}),chaseSpeedMultiplier:f({default:2.3,min:0,max:10,step:0.05}),initialExtraSpeedMultiplier:f({default:0.34,min:0,max:5,step:0.01})})},{label:"Betta"}),N$=bH(M$,[{name:"Royal Blue",base:4153302,accent:12857387,marking:9417983,fin:3425993},{name:"Crimson Veiltail",base:11739178,accent:6163224,marking:15229786,fin:12854832},{name:"Turquoise",base:2334627,accent:2047893,marking:10941160,fin:2919611},{name:"Koi Marble",base:15722458,accent:14239530,marking:2499615,fin:15458252},{name:"Black Orchid",base:2826567,accent:10117088,marking:8153282,fin:3811440},{name:"Mustard Gas",base:3100592,accent:16174423,marking:8824565,fin:14391848}],{label:"Betta palettes",effect:"koi:appearance",keepsFamilyPreview:!0}),F$=bH(C$,[[{position:0.22,length:0.06,width:0.3,offset:0.2,color:"marking"},{position:0.36,length:0.05,width:0.26,offset:-0.18,color:"marking"},{position:0.08,length:0.035,width:0.5,offset:0,color:"accent"}],[{position:0.24,length:0.08,width:0.42,offset:0.08,color:"marking"},{position:0.4,length:0.05,width:0.34,offset:-0.1,color:"marking"}],[{position:0.18,length:0.09,width:0.5,offset:-0.06,color:"marking"},{position:0.38,length:0.07,width:0.42,offset:0.14,color:"marking"}],[{position:0.14,length:0.06,width:0.62,offset:0.06,color:"accent"},{position:0.33,length:0.07,width:0.58,offset:-0.14,color:"accent"},{position:0.25,length:0.04,width:0.3,offset:0.36,color:"marking"},{position:0.46,length:0.035,width:0.28,offset:0.1,color:"marking"}],[{position:0.22,length:0.08,width:0.4,offset:0.12,color:"marking"},{position:0.4,length:0.05,width:0.3,offset:-0.12,color:"accent"}],[{position:0.2,length:0.09,width:0.48,offset:0.06,color:"marking"},{position:0.44,length:0.06,width:0.46,offset:0,color:"accent"}]],{label:"Betta markings",effect:"koi:appearance",keepsFamilyPreview:!0}),L$=n0({body:HE({default:16777215}),light:HE({default:16777215}),accent:HE({default:16777215}),fin:HE({default:16777215}),eye:HE({default:16777215})}),O$=n0({visibleSchoolCount:f({default:3,min:0,max:32,step:1,int:!0,effect:"tiny-fish:respawn"}),bodyLength:qE({default:[5.8,8.2],min:1,max:30,step:0.1,effect:"tiny-fish:respawn"}),bodyWidthRatio:qE({default:[0.1,0.32],min:0.02,max:1,step:0.01,effect:"tiny-fish:respawn"}),tailLengthScale:f({default:0.34,min:0,max:3,step:0.01}),tailWidthScale:f({default:0.92,min:0,max:3,step:0.01}),finReachScale:f({default:1.28,min:0,max:3,step:0.01}),eyeRadius:f({default:0.28,min:0,max:2,step:0.01}),cruiseSpeed:qE({default:[19,27],min:1,max:100,step:0.5,effect:"tiny-fish:respawn"}),speedVariation:f({default:0.46,min:0,max:2,step:0.01}),edgeMargin:f({default:14,min:0,max:100,step:1}),neighbourRadius:f({default:25,min:0,max:200,step:1}),separationRadius:f({default:6.2,min:0,max:100,step:0.1}),cohesionStrength:f({default:0.62,min:0,max:10,step:0.01}),alignmentStrength:f({default:0.56,min:0,max:10,step:0.01}),separationStrength:f({default:2.8,min:0,max:10,step:0.01}),swirlStrength:f({default:0.46,min:0,max:10,step:0.01}),wanderStrength:f({default:0.34,min:0,max:10,step:0.01}),edgeStrength:f({default:4.8,min:0,max:20,step:0.01}),steeringResponse:f({default:4.7,min:0,max:20,step:0.01}),maximumTurnRate:f({default:2.4,min:0,max:20,step:0.01}),flee:n0({reactionRadius:f({default:270,min:0,max:1000,step:1}),propagationSpeed:f({default:180,min:0,max:1000,step:1}),randomDelay:f({default:0.16,min:0,max:5,step:0.01}),duration:qE({default:[1.45,2.35],min:0,max:60,step:0.05}),speed:qE({default:[49,64],min:0,max:200,step:1}),directionStrength:f({default:5.8,min:0,max:20,step:0.01}),schoolingStrength:f({default:0.58,min:0,max:10,step:0.01}),initialImpulse:f({default:13,min:0,max:100,step:0.5})}),shadow:n0({color:HE({default:1193263}),opacity:f({default:0.28,min:0,max:1,step:0.01}),offset:a8(1.5,2.8)},{effect:"tiny-fish:render"}),palettes:bH(L$,[{body:16770669,light:16774048,accent:16747586,fin:16762967,eye:2111032},{body:5693436,light:11727615,accent:3700717,fin:8777215,eye:1522514},{body:16741037,light:16759506,accent:16765022,fin:16751554,eye:5056832},{body:11070792,light:14548876,accent:3718008,fin:12973421,eye:2442549}],{effect:"tiny-fish:render"})},{label:"Tiny fish"}),B$=n0({x:f({default:0,min:-80,max:560,step:1,effect:"tiny-fish:shift"}),y:f({default:0,min:-80,max:350,step:1,effect:"tiny-fish:shift"}),count:f({default:1,min:1,max:80,step:1,int:!0}),heading:f({default:0,min:-EH,max:EH,step:0.01}),spreadX:f({default:20,min:0,max:100,step:1}),spreadY:f({default:12,min:0,max:100,step:1}),palette:O8({default:0,of:["tiny-fish","palettes"]}),sizeScale:f({default:1,min:0.2,max:3,step:0.01}),speedScale:f({default:1,min:0.2,max:3,step:0.01}),swirlDirection:L6({default:1,options:[{value:-1,label:"Left"},{value:1,label:"Right"}]})}),w$=o8(B$,[{x:174,y:82,count:24,heading:0.35,spreadX:32,spreadY:15,palette:0,sizeScale:0.88,speedScale:1.04,swirlDirection:1},{x:343,y:174,count:15,heading:2.75,spreadX:22,spreadY:11,palette:1,sizeScale:1.08,speedScale:0.95,swirlDirection:-1},{x:139,y:204,count:34,heading:-0.72,spreadX:40,spreadY:18,palette:2,sizeScale:0.82,speedScale:1.12,swirlDirection:1},{x:377,y:69,count:19,heading:2.2,spreadX:28,spreadY:13,palette:3,sizeScale:0.94,speedScale:1,swirlDirection:-1}],{label:"Tiny fish schools",countFrom:["tiny-fish","visibleSchoolCount"],max:32,effect:"tiny-fish:respawn",create:(E)=>{let H=E,W=(Q,$)=>Q+Math.random()*($-Q),R=(Q,$)=>Math.floor(W(Q,$)),J=(Q,$)=>Number(W(Q,$).toFixed(2));return{x:R(48,FH.width-47),y:R(38,FH.height-37),count:R(10,19),heading:J(-Math.PI,Math.PI),spreadX:R(18,41),spreadY:R(9,21),palette:R(0,H["tiny-fish"].palettes.length),sizeScale:J(0.8,1.14),speedScale:J(0.88,1.14),swirlDirection:Math.random()<0.5?-1:1}}}),k$=n0({deepColor:NH({default:[0.486,0.718,0.631],min:0,max:1,step:0.001}),shallowColor:NH({default:[0.145,0.395,0.255],min:0,max:1,step:0.001}),speckColor:NH({default:[0.02,0.065,0.04],min:0,max:1,step:0.001}),verticalTone:f({default:0.8,min:0,max:1,step:0.01}),grainScale:f({default:0.54,min:0,max:2,step:0.01}),edgeDarkening:f({default:0.57,min:0,max:1,step:0.01})},{label:"Pond bed",effect:"pond-bed"});function O6(E){return n0({maximumActive:f({default:E.maximumActive,min:0,max:64,step:1,int:!0,description:"Kept under MAX_RIPPLES (64) across all three ripple types combined."}),ripplesPerEvent:f({default:E.ripplesPerEvent,min:1,max:20,step:1,int:!0}),intervalSeconds:f({default:E.intervalSeconds,min:0.005,max:0.5,step:0.001}),initialStrength:f({default:E.initialStrength,min:0,max:5,step:0.01}),strengthFalloff:f({default:E.strengthFalloff,min:0,max:5,step:0.01}),lifetime:f({default:E.lifetime,min:0,max:10,step:0.05}),startRadius:f({default:E.startRadius,min:0,max:20,step:0.1}),expansionSpeed:f({default:E.expansionSpeed,min:0,max:200,step:1}),distortion:f({default:E.distortion,min:0,max:20,step:0.05}),bandSharpness:f({default:E.bandSharpness,min:0,max:2,step:0.01}),fadeStart:f({default:E.fadeStart,min:0,max:1,step:0.01}),strengthDecay:f({default:E.strengthDecay,min:0,max:2,step:0.01})})}var V$=n0({types:n0({touch:O6({maximumActive:16,ripplesPerEvent:5,intervalSeconds:0.023,initialStrength:1,strengthFalloff:0.92,lifetime:2.2,startRadius:4,expansionSpeed:62,distortion:5.55,bandSharpness:0.3,fadeStart:0.58,strengthDecay:0.18}),rain:O6({maximumActive:48,ripplesPerEvent:3,intervalSeconds:0.103,initialStrength:1.55,strengthFalloff:1,lifetime:1.25,startRadius:0.8,expansionSpeed:30,distortion:4.8,bandSharpness:0.62,fadeStart:0.34,strengthDecay:0.18}),mouth:O6({maximumActive:10,ripplesPerEvent:1,intervalSeconds:0.08,initialStrength:0.5,strengthFalloff:0.65,lifetime:0.9,startRadius:1.2,expansionSpeed:17,distortion:10.4,bandSharpness:0.7,fadeStart:0.25,strengthDecay:0.45})}),rainEmitter:n0({dropsPerSecond:f({default:12,min:0,max:200,step:1}),frequencyVariation:f({default:0.35,min:0,max:1,step:0.01}),maximumDropsPerFrame:f({default:40,min:1,max:200,step:1,int:!0}),edgeMargin:f({default:5,min:0,max:100,step:1})})},{label:"Ripples"}),T$=n0({direction:CJ({default:[1,0],min:-1,max:1,step:0.01}),frequency:f({default:20,min:0,max:80,step:0.5}),speed:f({default:1,min:-10,max:10,step:0.05}),strength:f({default:1,min:0,max:5,step:0.01})}),P$=n0({showCurrentEffect:qJ({default:!0}),clarity:f({default:0,min:0,max:1,step:0.01}),colorTint:NH({default:[0.96,1.02,1],min:0,max:2,step:0.001}),largeCurrentColor:NH({default:[0.022,0.068,0.047],min:0,max:1,step:0.0005}),largeCurrentCoreColor:NH({default:[0.052,0.155,0.108],min:0,max:1,step:0.0005}),secondaryLargeCurrentColor:NH({default:[0.022,0.068,0.047],min:0,max:1,step:0.0005}),secondaryLargeCurrentCoreColor:NH({default:[0.052,0.155,0.108],min:0,max:1,step:0.0005}),detailCurrentColor:NH({default:[0.01,0.034,0.023],min:0,max:1,step:0.0005}),detailCurrentCoreColor:NH({default:[0.028,0.09,0.061],min:0,max:1,step:0.0005}),largeCellSize:f({default:908,min:1,max:2000,step:1}),largeCurrentOpacity:f({default:0.99,min:0,max:2,step:0.01}),largeCurrentSpeed:f({default:1,min:-10,max:10,step:0.05}),secondaryLargeCellSize:f({default:10,min:1,max:2000,step:1}),secondaryLargeCurrentOpacity:f({default:0.15,min:0,max:2,step:0.01}),secondaryLargeCurrentSpeed:f({default:1,min:-10,max:10,step:0.05}),detailCellSize:f({default:20,min:1,max:2000,step:1}),detailCurrentOpacity:f({default:0.9,min:0,max:2,step:0.01}),detailCurrentSpeed:f({default:1,min:-10,max:10,step:0.05}),currentDistortion:n0({amplitude:f({default:0.015,min:0,max:1,step:0.001}),waves:bH(T$,[{direction:[0.94,0.34],frequency:22,speed:0.92,strength:1.2},{direction:[-0.38,0.92],frequency:31,speed:0.51,strength:0.55},{direction:[0.71,0.71],frequency:59,speed:-6.38,strength:0.28}])})},{label:"Water",effect:"water"}),z$=n0({base:HE({default:16777215}),light:HE({default:16777215}),shade:HE({default:16777215}),vein:HE({default:16777215}),center:HE({default:16777215})}),A$=n0({outerPetal:HE({default:16777215}),innerPetal:HE({default:16777215}),petalLight:HE({default:16777215}),center:HE({default:16777215}),centerDark:HE({default:16777215})}),OJ=n0({visibleLeafCount:f({default:15,min:0,max:32,step:1,int:!0,effect:"lotus:palette"}),visibleFlowerCount:f({default:4,min:0,max:16,step:1,int:!0,effect:"lotus:palette"}),radiusScale:f({default:1.18,min:0,max:5,step:0.01}),flowerRadiusScale:f({default:2.38,min:0,max:5,step:0.01}),leafSegments:f({default:24,min:3,max:64,step:1,int:!0}),veinCount:f({default:5,min:0,max:20,step:1,int:!0}),notchHalfAngle:f({default:0.3,min:0,max:Math.PI,step:0.01}),verticalScale:f({default:0.92,min:0,max:2,step:0.01}),driftX:f({default:0.7,min:0,max:20,step:0.01}),driftY:f({default:0.55,min:0,max:20,step:0.01}),rotationAmount:f({default:0.055,min:0,max:2,step:0.001}),shadow:n0({color:HE({default:666406}),opacity:f({default:0.5,min:0,max:1,step:0.01}),offset:a8(4.8,10.4)},{effect:"lotus:palette"}),leafPalettes:bH(z$,[{base:6266232,light:7776900,shade:4750438,vein:4157534,center:5211755},{base:5672815,light:7119227,shade:4288347,vein:3696211,center:4816227}],{effect:"lotus:palette"}),flowerPalettes:bH(A$,[{outerPetal:15899306,innerPetal:16762060,petalLight:16769506,center:15908165,centerDark:12152113},{outerPetal:15304108,innerPetal:16431054,petalLight:16768230,center:16107083,centerDark:12415792}],{effect:"lotus:palette"})},{label:"Lotus"}),I$=n0({x:f({default:0,min:-80,max:560,step:1}),y:f({default:0,min:-80,max:350,step:1}),radius:f({default:20,min:1,max:60,step:0.5}),angle:f({default:0,min:-EH,max:EH,step:0.01}),phase:f({default:0,min:-EH,max:EH,step:0.01}),palette:O8({default:0,of:["lotus","leafPalettes"]})}),_$=o8(I$,[{x:-3,y:37,radius:22,angle:0.35,phase:0.2,palette:0},{x:76,y:17,radius:16,angle:2.15,phase:1.4,palette:1},{x:431,y:18,radius:23,angle:2.75,phase:2.2,palette:0},{x:476,y:88,radius:17,angle:4.25,phase:3.3,palette:1},{x:460,y:151,radius:23,angle:0.95,phase:4.6,palette:0},{x:488,y:216,radius:20,angle:3.55,phase:5.4,palette:1},{x:395,y:252,radius:22,angle:5.3,phase:0.9,palette:0},{x:113,y:260,radius:28,angle:4.65,phase:2.8,palette:1},{x:31,y:230,radius:19,angle:1.85,phase:4.1,palette:0},{x:140,y:10,radius:21,angle:0.7,phase:5.9,palette:1},{x:330,y:7,radius:14,angle:3.85,phase:1.8,palette:0},{x:447,y:57,radius:20,angle:5.65,phase:3.8,palette:1},{x:82,y:76,radius:32,angle:1.25,phase:4.9,palette:0},{x:414,y:194,radius:23,angle:4.85,phase:2.5,palette:1},{x:444,y:224,radius:20,angle:2.85,phase:2.5,palette:1},{x:10,y:165,radius:14,angle:2.55,phase:2.5,palette:0},{x:451,y:246,radius:10,angle:0.15,phase:3.1,palette:1},{x:58,y:202,radius:15,angle:5.15,phase:5,palette:0},{x:374,y:31,radius:19,angle:2.25,phase:1.1,palette:1}],{label:"Lotus placements",countFrom:["lotus","visibleLeafCount"],max:32,effect:"lotus:palette",create:()=>{let E=(W,R)=>Math.floor(W+Math.random()*(R-W)),H=(W,R)=>Number((W+Math.random()*(R-W)).toFixed(2));return{...LJ(),radius:E(12,27),angle:H(0,Math.PI*2),phase:H(0,Math.PI*2),palette:E(0,OJ.children.leafPalettes.defaults.length)}}}),S$=n0({leafIndex:O8({default:0,of:["lotus-leaves"]}),radius:f({default:5,min:1,max:15,step:0.1}),offsetX:f({default:0,min:-5,max:5,step:0.05}),offsetY:f({default:0,min:-5,max:5,step:0.05}),rotation:f({default:0,min:-EH,max:EH,step:0.01}),palette:O8({default:0,of:["lotus","flowerPalettes"]})}),j$=o8(S$,[{leafIndex:12,radius:5.4,offsetX:0.5,offsetY:-0.5,rotation:0.25,palette:0},{leafIndex:13,radius:5,offsetX:-0.8,offsetY:0.3,rotation:0.75,palette:1},{leafIndex:7,radius:4.8,offsetX:2,offsetY:-1,rotation:0.45,palette:0},{leafIndex:9,radius:4.5,offsetX:-1,offsetY:0.5,rotation:0.15,palette:1}],{label:"Lotus flowers",countFrom:["lotus","visibleFlowerCount"],max:16,effect:"lotus:palette",create:(E)=>{let H=E,W=($,Z)=>Math.floor($+Math.random()*(Z-$)),R=($,Z)=>Number(($+Math.random()*(Z-$)).toFixed(2)),J=H["lotus-leaves"].length,Q=Math.max(1,Math.min(J,Math.round(H.lotus.visibleLeafCount)));return{leafIndex:W(0,Q),radius:R(4.2,6.2),offsetX:R(-2.2,2.2),offsetY:R(-2.2,2.2),rotation:R(0,Math.PI*2),palette:W(0,H.lotus.flowerPalettes.length)}}}),y$=n0({base:HE({default:16777215}),light:HE({default:16777215}),shade:HE({default:16777215}),center:HE({default:16777215})}),h$=n0({visiblePatchCount:f({default:8,min:0,max:16,step:1,int:!0}),minimumLeafRadius:f({default:1.05,min:0,max:10,step:0.01}),maximumLeafRadius:f({default:3.35,min:0,max:10,step:0.01}),verticalScale:f({default:0.76,min:0,max:2,step:0.01}),pairChance:f({default:0.42,min:0,max:1,step:0.01}),spreadExponent:f({default:0.68,min:0,max:3,step:0.01}),driftX:f({default:5.55,min:0,max:30,step:0.01}),driftY:f({default:5.42,min:0,max:30,step:0.01}),rotationAmount:f({default:0.045,min:0,max:2,step:0.001}),shadow:n0({color:HE({default:1194797}),opacity:f({default:0.24,min:0,max:1,step:0.01}),offset:a8(1.4,5.1)}),palettes:bH(y$,[{base:7326031,light:10217068,shade:4560446,center:12840565},{base:8639323,light:11660662,shade:5545539,center:13693578}])},{label:"Duckweed",effect:"duckweed:rebuild"}),v$=n0({x:f({default:0,min:-80,max:560,step:1}),y:f({default:0,min:-80,max:350,step:1}),radius:f({default:20,min:1,max:100,step:1}),count:f({default:20,min:0,max:250,step:1,int:!0}),phase:f({default:0,min:-EH,max:EH,step:0.01}),palette:O8({default:0,of:["duckweed","palettes"]})}),f$=o8(v$,[{x:28,y:45,radius:30,count:42,phase:0.3,palette:0},{x:102,y:17,radius:22,count:28,phase:1.7,palette:1},{x:447,y:34,radius:77,count:138,phase:2.8,palette:0},{x:470,y:116,radius:25,count:34,phase:4.1,palette:1},{x:451,y:225,radius:31,count:44,phase:5.3,palette:0},{x:378,y:259,radius:22,count:29,phase:0.9,palette:1},{x:71,y:244,radius:29,count:40,phase:3.4,palette:0},{x:13,y:168,radius:64,count:200,phase:4.8,palette:0}],{label:"Duckweed patches",countFrom:["duckweed","visiblePatchCount"],max:32,effect:"duckweed:rebuild",create:(E)=>{let H=E,W=(J,Q)=>Math.floor(J+Math.random()*(Q-J)),R=(J,Q)=>Number((J+Math.random()*(Q-J)).toFixed(2));return{...LJ(),radius:W(18,43),count:W(18,33),phase:R(0,Math.PI*2),palette:W(0,H.duckweed.palettes.length)}}}),b$=n0({wing:HE({default:16777215}),wingLight:HE({default:16777215}),accent:HE({default:16777215}),body:HE({default:16777215})}),x$=n0({visibleCount:f({default:4,min:0,max:12,step:1,int:!0}),edgeMargin:f({default:14,min:0,max:100,step:1}),bodyLength:f({default:3.8,min:0,max:20,step:0.1}),bodyWidth:f({default:0.32,min:0,max:5,step:0.01}),headRadius:f({default:0.72,min:0,max:5,step:0.01}),wingLength:f({default:4.7,min:0,max:20,step:0.1}),wingWidth:f({default:5.4,min:0,max:20,step:0.1}),wingSpotRadius:f({default:0.58,min:0,max:5,step:0.01}),minimumSpeed:f({default:8.5,min:0,max:100,step:0.5}),maximumSpeed:f({default:30.5,min:0,max:100,step:0.5}),flowerApproachSpeed:f({default:18,min:0,max:100,step:0.5}),turnResponsiveness:f({default:3.4,min:0,max:20,step:0.01}),wanderTargetDistance:qE({default:[42,105],min:0,max:300,step:1}),wanderTargetTurnRange:f({default:2.2,min:0,max:EH,step:0.01}),randomTurnInterval:qE({default:[0.32,1.15],min:0,max:30,step:0.01}),randomTurnAngle:f({default:0.72,min:0,max:EH,step:0.01}),sharpTurnChance:f({default:0.18,min:0,max:1,step:0.01}),sharpTurnAngle:f({default:1.45,min:0,max:EH,step:0.01}),turnSmoothing:f({default:3.1,min:0,max:20,step:0.01}),curvedFlightStrength:f({default:0.34,min:0,max:5,step:0.01}),curvedFlightFrequency:qE({default:[0.65,1.35],min:0,max:10,step:0.01}),speedVariation:f({default:0.27,min:0,max:2,step:0.01}),flowerArrivalRadius:f({default:7.5,min:0,max:50,step:0.1}),flowerOrbitRadius:qE({default:[7,12],min:0,max:50,step:0.1}),flowerOrbitSpeed:qE({default:[0.9,1.5],min:0,max:10,step:0.01}),wanderDuration:qE({default:[3.8,7.4],min:0,max:60,step:0.05}),flowerVisitDuration:qE({default:[2.2,4.6],min:0,max:60,step:0.05}),flowerRestDuration:qE({default:[0.8,1.8],min:0,max:60,step:0.05}),flowerVisitChance:f({default:0.92,min:0,max:1,step:0.01}),flapSpeed:qE({default:[17.5,31.5],min:0,max:100,step:0.5}),driftAmount:f({default:1.3,min:0,max:10,step:0.01}),shadow:n0({color:HE({default:1521455}),opacity:f({default:0.2,min:0,max:1,step:0.01}),offset:a8(2.4,3.2),scale:f({default:0.82,min:0,max:3,step:0.01})}),palettes:bH(b$,[{wing:15967820,wingLight:16765803,accent:7685259,body:4074805},{wing:7453928,wingLight:12117237,accent:3234717,body:2701127},{wing:15300765,wingLight:16757957,accent:9388395,body:4796476},{wing:12902232,wingLight:15398538,accent:5278817,body:3359289}])},{label:"Butterflies",effect:"butterflies:keep"}),g$=n0({x:f({default:0,min:-80,max:560,step:1}),y:f({default:0,min:-80,max:350,step:1}),phase:f({default:0,min:-EH,max:EH,step:0.01}),palette:O8({default:0,of:["butterflies","palettes"]})}),p$=o8(g$,[{x:56,y:61,phase:0.2,palette:0},{x:416,y:71,phase:1.9,palette:1},{x:394,y:214,phase:3.6,palette:2},{x:101,y:218,phase:5.2,palette:3},{x:244,y:30,phase:0.9,palette:1},{x:252,y:242,phase:4.4,palette:0}],{label:"Butterfly spawns",countFrom:["butterflies","visibleCount"],max:24,effect:"butterflies:respawn",create:(E)=>{let H=E,W=(J,Q)=>Math.floor(J+Math.random()*(Q-J)),R=(J,Q)=>Number((J+Math.random()*(Q-J)).toFixed(2));return{x:W(24,FH.width-23),y:W(24,FH.height-23),phase:R(0,Math.PI*2),palette:W(0,H.butterflies.palettes.length)}}}),VE=n0({koi:q$,"koi-palettes":N$,"koi-patterns":F$,"tiny-fish":O$,"tiny-fish-schools":w$,"pond-bed":k$,water:P$,ripples:V$,lotus:OJ,"lotus-leaves":_$,"lotus-flowers":j$,duckweed:h$,"duckweed-patches":f$,butterflies:x$,"butterfly-spawns":p$}),p5=Object.keys(VE.children);var B6="sunny",r8=[{id:"sunny",label:"Sunny",tint:[1,1,1],brightness:1,contrast:1,saturation:1,vignette:0,cloudStrength:0,lightColor:[1,0.94,0.72],lightStrength:0,lightDirection:[-0.58,0.82],rainStrength:0,config:{koi:{shadow:{color:729374}},"pond-bed":{deepColor:[0.486,0.718,0.631],shallowColor:[0.145,0.395,0.255],verticalTone:0.8,edgeDarkening:0.57},water:{colorTint:[0.96,1.02,1],largeCurrentColor:[0.022,0.068,0.047],largeCurrentCoreColor:[0.052,0.155,0.108],largeCellSize:908,largeCurrentOpacity:0.99,largeCurrentSpeed:1,secondaryLargeCurrentColor:[0.022,0.068,0.047],secondaryLargeCurrentCoreColor:[0.052,0.155,0.108],secondaryLargeCellSize:10,secondaryLargeCurrentOpacity:0.15,secondaryLargeCurrentSpeed:1,detailCurrentColor:[0.01,0.034,0.023],detailCurrentCoreColor:[0.028,0.09,0.061],detailCellSize:20,detailCurrentOpacity:0.9,detailCurrentSpeed:1}}},{id:"rain",label:"Rain",tint:[0.67,0.86,0.96],brightness:0.72,contrast:0.94,saturation:0.72,vignette:0.28,cloudStrength:0.78,lightColor:[0.54,0.75,0.86],lightStrength:0.045,lightDirection:[0.36,0.93],rainStrength:10,config:{koi:{shadow:{color:729374}},"pond-bed":{deepColor:[0.486,0.718,0.631],shallowColor:[0.145,0.395,0.255],verticalTone:0.8,edgeDarkening:0.57},water:{colorTint:[0.96,1.02,1],largeCurrentColor:[0.01188,0.0612,0.06298],largeCurrentCoreColor:[0.02496,0.1426,0.15552],largeCellSize:908,largeCurrentOpacity:1.1088,largeCurrentSpeed:1.42,secondaryLargeCurrentColor:[0.01056,0.05712,0.06674],secondaryLargeCurrentCoreColor:[0.02288,0.1364,0.16416],secondaryLargeCellSize:10,secondaryLargeCurrentOpacity:0.138,secondaryLargeCurrentSpeed:1.18,detailCurrentColor:[0.0062,0.034,0.02944],detailCurrentCoreColor:[0.01624,0.0936,0.08296],detailCellSize:20,detailCurrentOpacity:1.152,detailCurrentSpeed:1.72}}},{id:"deep-clear",label:"Deep clear",tint:[1,1,1],brightness:1,contrast:1,saturation:1,vignette:0,cloudStrength:0,lightColor:[1,0.94,0.72],lightStrength:0,lightDirection:[-0.58,0.82],rainStrength:0,config:{koi:{shadow:{color:729374}},"pond-bed":{deepColor:[0.09,0.15,0.18],shallowColor:[0.05,0.02,0.02],verticalTone:0.99,edgeDarkening:0.57},water:{colorTint:[0.96,1.02,1],largeCurrentColor:[0.022,0.068,0.047],largeCurrentCoreColor:[0.03744,0.2325,0.135],largeCellSize:908,largeCurrentOpacity:0.59,largeCurrentSpeed:1,secondaryLargeCurrentColor:[0.022,0.068,0.047],secondaryLargeCurrentCoreColor:[0.052,0.155,0.108],secondaryLargeCellSize:10,secondaryLargeCurrentOpacity:0.1,secondaryLargeCurrentSpeed:1,detailCurrentColor:[0.01,0.034,0.023],detailCurrentCoreColor:[0.028,0.09,0.061],detailCellSize:20,detailCurrentOpacity:0.2,detailCurrentSpeed:1}}},{id:"overcast",label:"Overcast",tint:[0.87,0.96,1.02],brightness:0.86,contrast:0.9,saturation:0.78,vignette:0.1,cloudStrength:0.62,lightColor:[0.72,0.84,0.9],lightStrength:0.035,lightDirection:[0.42,0.9],rainStrength:0,config:{koi:{shadow:{color:729374}},"pond-bed":{deepColor:[0.486,0.718,0.631],shallowColor:[0.145,0.395,0.255],verticalTone:0.8,edgeDarkening:0.57},water:{colorTint:[0.96,1.02,1],largeCurrentColor:[0.01452,0.05848,0.04935],largeCurrentCoreColor:[0.03224,0.1364,0.11664],largeCellSize:908,largeCurrentOpacity:0.693,largeCurrentSpeed:0.54,secondaryLargeCurrentColor:[0.01276,0.05576,0.05264],secondaryLargeCurrentCoreColor:[0.02808,0.1333,0.12528],secondaryLargeCellSize:10,secondaryLargeCurrentOpacity:0.087,secondaryLargeCurrentSpeed:0.42,detailCurrentColor:[0.007,0.03128,0.02484],detailCurrentCoreColor:[0.01848,0.0864,0.06832],detailCellSize:20,detailCurrentOpacity:0.495,detailCurrentSpeed:0.7}}},{id:"mist",label:"Mist",tint:[0.76,0.9,0.88],brightness:0.8,contrast:0.86,saturation:0.68,vignette:0.14,cloudStrength:0.82,lightColor:[0.78,0.93,0.88],lightStrength:0.025,lightDirection:[0.32,0.95],rainStrength:0,config:{koi:{shadow:{color:729374}},"pond-bed":{deepColor:[0.486,0.718,0.631],shallowColor:[0.145,0.395,0.255],verticalTone:0.8,edgeDarkening:0.57},water:{colorTint:[0.96,1.02,1],largeCurrentColor:[0.01276,0.06256,0.03666],largeCurrentCoreColor:[0.02912,0.1364,0.081],largeCellSize:1089.6,largeCurrentOpacity:0.4356,largeCurrentSpeed:0.24,secondaryLargeCurrentColor:[0.01144,0.05848,0.03572],secondaryLargeCurrentCoreColor:[0.026,0.1271,0.07776],secondaryLargeCellSize:17,secondaryLargeCurrentOpacity:0.054,secondaryLargeCurrentSpeed:0.18,detailCurrentColor:[0.0062,0.03332,0.01978],detailCurrentCoreColor:[0.0168,0.0846,0.05002],detailCellSize:26,detailCurrentOpacity:0.288,detailCurrentSpeed:0.3}}},{id:"sunset",label:"Sunset",tint:[1.08,0.86,0.7],brightness:0.93,contrast:1.06,saturation:1.1,vignette:0.2,cloudStrength:0.16,lightColor:[1,0.42,0.15],lightStrength:0.2,lightDirection:[-0.7,0.72],rainStrength:0,config:{koi:{shadow:{color:729374}},"pond-bed":{deepColor:[0.486,0.718,0.631],shallowColor:[0.145,0.395,0.255],verticalTone:0.8,edgeDarkening:0.57},water:{colorTint:[0.96,1.02,1],largeCurrentColor:[0.03124,0.05168,0.0235],largeCurrentCoreColor:[0.06968,0.1054,0.0432],largeCellSize:908,largeCurrentOpacity:0.9108,largeCurrentSpeed:0.72,secondaryLargeCurrentColor:[0.0264,0.04216,0.02162],secondaryLargeCurrentCoreColor:[0.06656,0.1023,0.0432],secondaryLargeCellSize:10,secondaryLargeCurrentOpacity:0.099,secondaryLargeCurrentSpeed:0.5,detailCurrentColor:[0.0128,0.02856,0.01334],detailCurrentCoreColor:[0.03808,0.0774,0.0305],detailCellSize:20,detailCurrentOpacity:0.468,detailCurrentSpeed:0.86}}},{id:"moonlight",label:"Moonlight",tint:[0.5,0.7,1.04],brightness:0.6,contrast:1.08,saturation:0.76,vignette:0.42,cloudStrength:0.3,lightColor:[0.46,0.68,1],lightStrength:0.14,lightDirection:[0.68,0.74],rainStrength:0,config:{koi:{shadow:{color:729374}},"pond-bed":{deepColor:[0.486,0.718,0.631],shallowColor:[0.145,0.395,0.255],verticalTone:0.8,edgeDarkening:0.57},water:{colorTint:[0.96,1.02,1],largeCurrentColor:[0.01144,0.05304,0.0705],largeCurrentCoreColor:[0.02496,0.1147,0.17496],largeCellSize:908,largeCurrentOpacity:0.7128,largeCurrentSpeed:0.34,secondaryLargeCurrentColor:[0.01012,0.0476,0.07426],secondaryLargeCurrentCoreColor:[0.02184,0.1054,0.18144],secondaryLargeCellSize:10,secondaryLargeCurrentOpacity:0.075,secondaryLargeCurrentSpeed:0.24,detailCurrentColor:[0.0058,0.02924,0.03266],detailCurrentCoreColor:[0.01512,0.081,0.09272],detailCellSize:20,detailCurrentOpacity:0.702,detailCurrentSpeed:0.44}}}];function k8(E){return r8.find((H)=>H.id===E)??r8[0]}var l$=50,m$=550;function V8(E){return E.join(".")}function xH(E){return E!==null&&typeof E==="object"}function BJ(E,H){let W=E;for(let R of H){if(!xH(W))return;W=W[R]}return W}function wJ(E,H,W){let R=E;for(let J of H.slice(0,-1)){if(!xH(R))return;R=R[J]}if(xH(R))R[H[H.length-1]]=W}function t8(E,H){if(Array.isArray(E)&&Array.isArray(H)){E.length=H.length;for(let W=0;W<H.length;W+=1){let R=H[W],J=E[W];if(xH(J)&&xH(R)&&Array.isArray(J)===Array.isArray(R))t8(J,R);else E[W]=structuredClone(R)}return}if(xH(E)&&xH(H)&&!Array.isArray(E)&&!Array.isArray(H))for(let W of Object.keys(H)){let R=H[W],J=E[W];if(xH(J)&&xH(R)&&Array.isArray(J)===Array.isArray(R))t8(J,R);else E[W]=structuredClone(R)}}function kJ(E,H,W){for(let R=H.length;R>=0;R-=1){let J=B8(E,H.slice(0,R));if(J&&J[W]!==void 0)return J[W]}return}function u$(E,H){let W=E;for(let R=0;R<H.length;R+=1){if(W.kind==="collection")return H.slice(0,R);let J=B8(E,H.slice(0,R+1));if(!J)return;W=J}return}function VJ(E){return k8(E).config}function d$(E){let H=VJ("sunny"),W=[],R=(J,Q)=>{if(xH(J)&&!Array.isArray(J)&&B8(E,Q)?.kind==="group")for(let $ of Object.keys(J))R(J[$],[...Q,$]);else W.push(Q)};for(let J of Object.keys(H))R(H[J],[J]);return W}class TJ{live;overrides=new Map;weatherId="sunny";rain=!1;listeners=new Set;pathListeners=new Map;undoStack=[];redoStack=[];openInteraction=null;weatherOwned;sectionEffectTags=new Map;version=0;metaCache=null;constructor(){this.live=w8(VE),this.weatherOwned=d$(VE);for(let E of Object.keys(VE.children)){let H=new Set;zW(VE.children[E],(W)=>{if(W.effect)H.add(W.effect)}),this.sectionEffectTags.set(E,H)}this.recomputeAll()}get(E){return BJ(this.live,E)}getVersion(){return this.version}meta(){if(this.metaCache?.version===this.version)return this.metaCache.value;let E={weather:this.weatherId,rain:this.rain,canUndo:this.undoStack.length>0,canRedo:this.redoStack.length>0};return this.metaCache={version:this.version,value:E},E}subscribe(E){return this.listeners.add(E),()=>this.listeners.delete(E)}subscribePath(E,H){let W=V8(E),R=this.pathListeners.get(W);if(!R)R=new Set,this.pathListeners.set(W,R);return R.add(H),()=>R?.delete(H)}notify(E){if(E.length===0)return;this.version+=1;let H=new Set(E.map((W)=>V8(W.path)));for(let W of this.listeners)W(E);for(let W of H){let R=this.pathListeners.get(W);if(R)for(let J of R)J()}}recomputeSection(E){let H=BJ(w8(VE),[E]),W=structuredClone(H),J=VJ(this.weatherId)[E];if(J!==void 0)t8(W,J);let Q=`${E}`;for(let[$,Z]of this.overrides){if($!==Q&&!$.startsWith(`${Q}.`))continue;let U=($===Q?[]:$.slice(Q.length+1).split(".")).map((X)=>/^\d+$/.test(X)?Number(X):X);if(U.length===0)t8(W,Z);else wJ(W,U,structuredClone(Z))}t8(this.live[E],W)}recomputeAll(){for(let E of Object.keys(VE.children))this.recomputeSection(E)}set(E,H,W={}){let R=B8(VE,E);if(!R)return;let J=AW(R,H,VE,this.live);if(J===void 0)return;let Q=structuredClone(this.get(E));this.beginOrContinueInteraction(W.interaction);let $=this.get(E);if(Array.isArray($)&&Array.isArray(J))t8($,J);else wJ(this.live,E,structuredClone(J));let Z=u$(VE,E);if(Z)this.overrides.set(V8(Z),structuredClone(this.get(Z)));else this.overrides.set(V8(E),structuredClone(J));let K=[{path:E,prev:Q,next:J,effect:kJ(VE,E,"effect"),keepsFamilyPreview:kJ(VE,E,"keepsFamilyPreview")===!0}];K.push(...this.growCollectionsFor(E,J)),this.redoStack.length=0,this.notify(K),this.schedulePersist()}growCollectionsFor(E,H){let W=[];if(typeof H!=="number")return W;for(let R of Object.keys(VE.children)){let J=VE.children[R];if(J.kind!=="collection")continue;if(V8(J.countFrom)!==V8(E))continue;let Q=this.live[R];if(!Array.isArray(Q))continue;let $=Math.max(0,Math.round(H)),Z=J.max??64,K=Math.min($,Z),U=Q.length;while(Q.length<K)Q.push(J.create(this.live));if(Q.length!==U||this.overrides.has(R))this.overrides.set(R,structuredClone(Q));if(Q.length!==U)W.push({path:[R],prev:U,next:Q.length,keepsFamilyPreview:!1})}return W}beginOrContinueInteraction(E){let H=typeof performance<"u"?performance.now():Date.now(),W=E??Math.random().toString(36),R=this.openInteraction;if(R&&R.key===W&&H-R.at<=m$){this.openInteraction={key:W,at:H};return}this.pushUndoSnapshot(),this.openInteraction={key:W,at:H}}pushUndoSnapshot(){if(this.undoStack.push({overrides:new Map(this.overrides),weather:this.weatherId,rain:this.rain}),this.undoStack.length>l$)this.undoStack.shift()}fullRefresh(E){let H=new Map(E.map((Q)=>[Q,structuredClone(this.live[Q])]));for(let Q of E)this.recomputeSection(Q);let W=new Set;for(let Q of E)for(let $ of this.sectionEffectTags.get(Q)??[]){if($==="tiny-fish:shift")continue;W.add($)}let R=E.every((Q)=>Q==="koi-palettes"||Q==="koi-patterns"),J=[...W].map((Q)=>{let $=E.find((Z)=>this.sectionEffectTags.get(Z)?.has(Q))??E[0];return{path:[$],prev:H.get($),next:this.live[$],effect:Q,keepsFamilyPreview:R}});for(let Q of E){if((this.sectionEffectTags.get(Q)?.size??0)>0)continue;J.push({path:[Q],prev:H.get(Q),next:this.live[Q],keepsFamilyPreview:R})}this.notify(J)}resetSections(E){this.pushUndoSnapshot(),this.openInteraction=null;for(let H of[...this.overrides.keys()]){let W=H.split(".")[0];if(E.includes(W))this.overrides.delete(H)}this.redoStack.length=0,this.fullRefresh(E),this.schedulePersist()}resetAll(){this.pushUndoSnapshot(),this.openInteraction=null,this.overrides.clear(),this.weatherId="sunny",this.rain=!1,this.redoStack.length=0,this.fullRefresh(Object.keys(VE.children)),this.schedulePersist()}setWeather(E){this.pushUndoSnapshot(),this.openInteraction=null;for(let H of this.weatherOwned)this.overrides.delete(V8(H));this.weatherId=E,this.rain=k8(E).rainStrength>0,this.redoStack.length=0,this.fullRefresh(["koi","pond-bed","water"]),this.schedulePersist()}setRain(E){this.pushUndoSnapshot(),this.openInteraction=null,this.rain=E,this.redoStack.length=0,this.notify([{path:["__rain__"],prev:!E,next:E,effect:"rain"}]),this.schedulePersist()}undo(){let E=this.undoStack.pop();if(!E)return;this.redoStack.push({overrides:new Map(this.overrides),weather:this.weatherId,rain:this.rain}),this.openInteraction=null,this.overrides.clear();for(let[H,W]of E.overrides)this.overrides.set(H,W);this.weatherId=E.weather,this.rain=E.rain,this.fullRefresh(Object.keys(VE.children)),this.schedulePersist()}redo(){let E=this.redoStack.pop();if(!E)return;this.undoStack.push({overrides:new Map(this.overrides),weather:this.weatherId,rain:this.rain}),this.openInteraction=null,this.overrides.clear();for(let[H,W]of E.overrides)this.overrides.set(H,W);this.weatherId=E.weather,this.rain=E.rain,this.fullRefresh(Object.keys(VE.children)),this.schedulePersist()}persistHandler=null;persistTimer=0;onPersistRequested(E){this.persistHandler=E}schedulePersist(){if(!this.persistHandler)return;if(this.persistTimer)return;let E=typeof window<"u"?window.setTimeout:setTimeout;this.persistTimer=E(()=>{this.persistTimer=0,this.persistHandler?.()},600)}flushPersist(){if(this.persistTimer)(typeof window<"u"?window.clearTimeout:clearTimeout)(this.persistTimer),this.persistTimer=0;this.persistHandler?.()}exportOverrides(){return Object.fromEntries(this.overrides)}importOverrides(E,H,W){this.overrides.clear();for(let[R,J]of Object.entries(E)){let Q=R.split(".").map((Z)=>/^\d+$/.test(Z)?Number(Z):Z),$=B8(VE,Q);if(!$)continue;if($.kind==="collection"){if(!Array.isArray(J))continue;let Z=$.max??64,K=J.slice(0,Z).map((U)=>U);this.overrides.set(R,K)}else if($.kind==="group"||$.kind==="list")this.overrides.set(R,J);else{let Z=AW($,J,VE,this.live);if(Z!==void 0)this.overrides.set(R,Z)}}this.weatherId=H,this.rain=W,this.recomputeAll()}}var $H=new TJ;var ZH={width:480,height:270},PJ={updatesPerSecond:60,spineNodes:14},HH=$H.live,K0=Object.assign(HH.koi,{maximumCount:48}),v0=HH["tiny-fish"],zJ=HH["tiny-fish-schools"],IW=HH["koi-palettes"],AJ=HH["koi-patterns"],T8=HH["pond-bed"],AH=Object.assign(HH.ripples,{maximumInstances:64}),IE=HH.water,r0=HH.lotus,G7=HH["lotus-leaves"],_W=HH["lotus-flowers"],yE=HH.duckweed,Y7=HH["duckweed-patches"],k0=HH.butterflies,IJ=HH["butterfly-spawns"],b0=ZH.width,x0=ZH.height;function w6(E,H){b0=Math.max(1,Math.round(E)),x0=Math.max(1,Math.round(H))}function sH(E,H){return{x:E/ZH.width*b0,y:H/ZH.height*x0}}var{maximumCount:LH,initialCount:i5}=K0,PE=PJ.spineNodes,e8=AH.maximumInstances,K8=Object.keys(AH.types).length,o5=AH.types.touch.lifetime,SW=1/PJ.updatesPerSecond,_J=Math.PI*2;var E1="186";var H1=0,n6=1,W1=2;var gW=1,R1=2,CW=3,qW=0,UH=1,GE=2,lH=0,pW=1,lW=2,s6=3,i6=4,J1=5;var NW=100,Q1=101,$1=102,Z1=103,K1=104,U1=200,X1=201,G1=202,Y1=203,M1=204,D1=205,C1=206,q1=207,N1=208,F1=209,L1=210,O1=211,B1=212,w1=213,k1=214,V1=0,T1=1,P1=2,o6=3,z1=4,A1=5,I1=6,_1=7,S1=0,j1=1,y1=2,jH=0,a6=1,r6=2,t6=3,e6=4,E9=5,H9=6,W9=7;var FW=301,S8=302,b7=303,x7=304,mW=306,h1=1000,g7=1001,v1=1002,C8=1003,f1=1004;var uW=1005;var _E=1006,p7=1007;var j8=1008;var yH=1009,b1=1010,x1=1011,dW=1012,R9=1013,q8=1014,E8=1015,wH=1016,J9=1017,Q9=1018,LW=1020,g1=35902,p1=35899,l1=1021,m1=1022,kH=1023,y8=1026,h8=1027,u1=1028,$9=1029,v8=1030,Z9=1031;var K9=1033,l7=33776,m7=33777,u7=33778,d7=33779,U9=35840,X9=35841,G9=35842,Y9=35843,M9=36196,D9=37492,C9=37496,q9=37488,N9=37489,c7=37490,F9=37491,L9=37808,O9=37809,B9=37810,w9=37811,k9=37812,V9=37813,T9=37814,P9=37815,z9=37816,A9=37817,I9=37818,_9=37819,S9=37820,j9=37821,y9=36492,h9=36494,v9=36495,f9=36283,b9=36284,n7=36285,x9=36286;var g9=0,d1=1,f8="",s7="srgb",p9="srgb-linear",l9="linear",FE="srgb";var c1=512,n1=513,s1=514,i7=515,i1=516,o1=517,o7=518,a1=519;var VH=35048;var m9="300 es",u9=2000;function c$(E){for(let H=E.length-1;H>=0;--H)if(E[H]>=65535)return!0;return!1}function n$(E){return ArrayBuffer.isView(E)&&!(E instanceof DataView)}function xW(E){return document.createElementNS("http://www.w3.org/1999/xhtml",E)}function r1(){let E=xW("canvas");return E.style.display="block",E}var SJ={},DW=null;function d9(...E){let H="THREE."+E.shift();if(DW)DW("log",H,...E);else console.log(H,...E)}function t1(E){let H=E[0];if(typeof H==="string"&&H.startsWith("TSL:")){let W=E[1];if(W&&W.isStackTrace)E[0]+=" "+W.getLocation();else E[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return E}function h0(...E){E=t1(E);let H="THREE."+E.shift();if(DW)DW("warn",H,...E);else{let W=E[0];if(W&&W.isStackTrace)console.warn(W.getError(H));else console.warn(H,...E)}}function g0(...E){E=t1(E);let H="THREE."+E.shift();if(DW)DW("error",H,...E);else{let W=E[0];if(W&&W.isStackTrace)console.error(W.getError(H));else console.error(H,...E)}}function _8(...E){let H=E.join(" ");if(H in SJ)return;SJ[H]=!0,h0(...E)}function e1(E,H,W){return new Promise(function(R,J){function Q(){switch(E.clientWaitSync(H,E.SYNC_FLUSH_COMMANDS_BIT,0)){case E.WAIT_FAILED:J();break;case E.TIMEOUT_EXPIRED:setTimeout(Q,W);break;default:R()}}setTimeout(Q,W)})}var EQ={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class H8{addEventListener(E,H){if(this._listeners===void 0)this._listeners={};let W=this._listeners;if(W[E]===void 0)W[E]=[];if(W[E].indexOf(H)===-1)W[E].push(H)}hasEventListener(E,H){let W=this._listeners;if(W===void 0)return!1;return W[E]!==void 0&&W[E].indexOf(H)!==-1}removeEventListener(E,H){let W=this._listeners;if(W===void 0)return;let R=W[E];if(R!==void 0){let J=R.indexOf(H);if(J!==-1)R.splice(J,1)}}dispatchEvent(E){let H=this._listeners;if(H===void 0)return;let W=H[E.type];if(W!==void 0){E.target=this;let R=W.slice(0);for(let J=0,Q=R.length;J<Q;J++)R[J].call(this,E);E.target=null}}}var iE=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var k6=Math.PI/180,h7=180/Math.PI;function cW(){let E=Math.random()*4294967295|0,H=Math.random()*4294967295|0,W=Math.random()*4294967295|0,R=Math.random()*4294967295|0;return(iE[E&255]+iE[E>>8&255]+iE[E>>16&255]+iE[E>>24&255]+"-"+iE[H&255]+iE[H>>8&255]+"-"+iE[H>>16&15|64]+iE[H>>24&255]+"-"+iE[W&63|128]+iE[W>>8&255]+"-"+iE[W>>16&255]+iE[W>>24&255]+iE[R&255]+iE[R>>8&255]+iE[R>>16&255]+iE[R>>24&255]).toLowerCase()}function t0(E,H,W){return Math.max(H,Math.min(W,E))}function s$(E,H){return(E%H+H)%H}function V6(E,H,W){return(1-W)*E+W*H}function jW(E,H){switch(H.constructor){case Float32Array:return E;case Uint32Array:return E/4294967295;case Uint16Array:return E/65535;case Uint8Array:case Uint8ClampedArray:return E/255;case Int32Array:return Math.max(E/2147483647,-1);case Int16Array:return Math.max(E/32767,-1);case Int8Array:return Math.max(E/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function KH(E,H){switch(H.constructor){case Float32Array:return E;case Uint32Array:return Math.round(E*4294967295);case Uint16Array:return Math.round(E*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(E*255);case Int32Array:return Math.round(E*2147483647);case Int16Array:return Math.round(E*32767);case Int8Array:return Math.round(E*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class m0{static{m0.prototype.isVector2=!0}constructor(E=0,H=0){this.x=E,this.y=H}get width(){return this.x}set width(E){this.x=E}get height(){return this.y}set height(E){this.y=E}set(E,H){return this.x=E,this.y=H,this}setScalar(E){return this.x=E,this.y=E,this}setX(E){return this.x=E,this}setY(E){return this.y=E,this}setComponent(E,H){switch(E){case 0:this.x=H;break;case 1:this.y=H;break;default:throw Error("THREE.Vector2: index is out of range: "+E)}return this}getComponent(E){switch(E){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+E)}}clone(){return new this.constructor(this.x,this.y)}copy(E){return this.x=E.x,this.y=E.y,this}add(E){return this.x+=E.x,this.y+=E.y,this}addScalar(E){return this.x+=E,this.y+=E,this}addVectors(E,H){return this.x=E.x+H.x,this.y=E.y+H.y,this}addScaledVector(E,H){return this.x+=E.x*H,this.y+=E.y*H,this}sub(E){return this.x-=E.x,this.y-=E.y,this}subScalar(E){return this.x-=E,this.y-=E,this}subVectors(E,H){return this.x=E.x-H.x,this.y=E.y-H.y,this}multiply(E){return this.x*=E.x,this.y*=E.y,this}multiplyScalar(E){return this.x*=E,this.y*=E,this}divide(E){return this.x/=E.x,this.y/=E.y,this}divideScalar(E){return this.multiplyScalar(1/E)}applyMatrix3(E){let H=this.x,W=this.y,R=E.elements;return this.x=R[0]*H+R[3]*W+R[6],this.y=R[1]*H+R[4]*W+R[7],this}min(E){return this.x=Math.min(this.x,E.x),this.y=Math.min(this.y,E.y),this}max(E){return this.x=Math.max(this.x,E.x),this.y=Math.max(this.y,E.y),this}clamp(E,H){return this.x=t0(this.x,E.x,H.x),this.y=t0(this.y,E.y,H.y),this}clampScalar(E,H){return this.x=t0(this.x,E,H),this.y=t0(this.y,E,H),this}clampLength(E,H){let W=this.length();return this.divideScalar(W||1).multiplyScalar(t0(W,E,H))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(E){return this.x*E.x+this.y*E.y}cross(E){return this.x*E.y-this.y*E.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(E){let H=Math.sqrt(this.lengthSq()*E.lengthSq());if(H===0)return Math.PI/2;let W=this.dot(E)/H;return Math.acos(t0(W,-1,1))}distanceTo(E){return Math.sqrt(this.distanceToSquared(E))}distanceToSquared(E){let H=this.x-E.x,W=this.y-E.y;return H*H+W*W}manhattanDistanceTo(E){return Math.abs(this.x-E.x)+Math.abs(this.y-E.y)}setLength(E){return this.normalize().multiplyScalar(E)}lerp(E,H){return this.x+=(E.x-this.x)*H,this.y+=(E.y-this.y)*H,this}lerpVectors(E,H,W){return this.x=E.x+(H.x-E.x)*W,this.y=E.y+(H.y-E.y)*W,this}equals(E){return E.x===this.x&&E.y===this.y}fromArray(E,H=0){return this.x=E[H],this.y=E[H+1],this}toArray(E=[],H=0){return E[H]=this.x,E[H+1]=this.y,E}fromBufferAttribute(E,H){return this.x=E.getX(H),this.y=E.getY(H),this}rotateAround(E,H){let W=Math.cos(H),R=Math.sin(H),J=this.x-E.x,Q=this.y-E.y;return this.x=J*W-Q*R+E.x,this.y=J*R+Q*W+E.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class W8{constructor(E=0,H=0,W=0,R=1){this.isQuaternion=!0,this._x=E,this._y=H,this._z=W,this._w=R}static slerpFlat(E,H,W,R,J,Q,$){let Z=W[R+0],K=W[R+1],U=W[R+2],X=W[R+3],Y=J[Q+0],G=J[Q+1],D=J[Q+2],F=J[Q+3];if(X!==F||Z!==Y||K!==G||U!==D){let w=Z*Y+K*G+U*D+X*F;if(w<0)Y=-Y,G=-G,D=-D,F=-F,w=-w;let C=1-$;if(w<0.9995){let M=Math.acos(w),T=Math.sin(M);C=Math.sin(C*M)/T,$=Math.sin($*M)/T,Z=Z*C+Y*$,K=K*C+G*$,U=U*C+D*$,X=X*C+F*$}else{Z=Z*C+Y*$,K=K*C+G*$,U=U*C+D*$,X=X*C+F*$;let M=1/Math.sqrt(Z*Z+K*K+U*U+X*X);Z*=M,K*=M,U*=M,X*=M}}E[H]=Z,E[H+1]=K,E[H+2]=U,E[H+3]=X}static multiplyQuaternionsFlat(E,H,W,R,J,Q){let $=W[R],Z=W[R+1],K=W[R+2],U=W[R+3],X=J[Q],Y=J[Q+1],G=J[Q+2],D=J[Q+3];return E[H]=$*D+U*X+Z*G-K*Y,E[H+1]=Z*D+U*Y+K*X-$*G,E[H+2]=K*D+U*G+$*Y-Z*X,E[H+3]=U*D-$*X-Z*Y-K*G,E}get x(){return this._x}set x(E){this._x=E,this._onChangeCallback()}get y(){return this._y}set y(E){this._y=E,this._onChangeCallback()}get z(){return this._z}set z(E){this._z=E,this._onChangeCallback()}get w(){return this._w}set w(E){this._w=E,this._onChangeCallback()}set(E,H,W,R){return this._x=E,this._y=H,this._z=W,this._w=R,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(E){return this._x=E.x,this._y=E.y,this._z=E.z,this._w=E.w,this._onChangeCallback(),this}setFromEuler(E,H=!0){let{_x:W,_y:R,_z:J,_order:Q}=E,$=Math.cos,Z=Math.sin,K=$(W/2),U=$(R/2),X=$(J/2),Y=Z(W/2),G=Z(R/2),D=Z(J/2);switch(Q){case"XYZ":this._x=Y*U*X+K*G*D,this._y=K*G*X-Y*U*D,this._z=K*U*D+Y*G*X,this._w=K*U*X-Y*G*D;break;case"YXZ":this._x=Y*U*X+K*G*D,this._y=K*G*X-Y*U*D,this._z=K*U*D-Y*G*X,this._w=K*U*X+Y*G*D;break;case"ZXY":this._x=Y*U*X-K*G*D,this._y=K*G*X+Y*U*D,this._z=K*U*D+Y*G*X,this._w=K*U*X-Y*G*D;break;case"ZYX":this._x=Y*U*X-K*G*D,this._y=K*G*X+Y*U*D,this._z=K*U*D-Y*G*X,this._w=K*U*X+Y*G*D;break;case"YZX":this._x=Y*U*X+K*G*D,this._y=K*G*X+Y*U*D,this._z=K*U*D-Y*G*X,this._w=K*U*X-Y*G*D;break;case"XZY":this._x=Y*U*X-K*G*D,this._y=K*G*X-Y*U*D,this._z=K*U*D+Y*G*X,this._w=K*U*X+Y*G*D;break;default:h0("Quaternion: .setFromEuler() encountered an unknown order: "+Q)}if(H===!0)this._onChangeCallback();return this}setFromAxisAngle(E,H){let W=H/2,R=Math.sin(W);return this._x=E.x*R,this._y=E.y*R,this._z=E.z*R,this._w=Math.cos(W),this._onChangeCallback(),this}setFromRotationMatrix(E){let H=E.elements,W=H[0],R=H[4],J=H[8],Q=H[1],$=H[5],Z=H[9],K=H[2],U=H[6],X=H[10],Y=W+$+X;if(Y>0){let G=0.5/Math.sqrt(Y+1);this._w=0.25/G,this._x=(U-Z)*G,this._y=(J-K)*G,this._z=(Q-R)*G}else if(W>$&&W>X){let G=2*Math.sqrt(1+W-$-X);this._w=(U-Z)/G,this._x=0.25*G,this._y=(R+Q)/G,this._z=(J+K)/G}else if($>X){let G=2*Math.sqrt(1+$-W-X);this._w=(J-K)/G,this._x=(R+Q)/G,this._y=0.25*G,this._z=(Z+U)/G}else{let G=2*Math.sqrt(1+X-W-$);this._w=(Q-R)/G,this._x=(J+K)/G,this._y=(Z+U)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(E,H){let W=E.dot(H)+1;if(W<0.00000001)if(W=0,Math.abs(E.x)>Math.abs(E.z))this._x=-E.y,this._y=E.x,this._z=0,this._w=W;else this._x=0,this._y=-E.z,this._z=E.y,this._w=W;else this._x=E.y*H.z-E.z*H.y,this._y=E.z*H.x-E.x*H.z,this._z=E.x*H.y-E.y*H.x,this._w=W;return this.normalize()}angleTo(E){return 2*Math.acos(Math.abs(t0(this.dot(E),-1,1)))}rotateTowards(E,H){let W=this.angleTo(E);if(W===0)return this;let R=Math.min(1,H/W);return this.slerp(E,R),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(E){return this._x*E._x+this._y*E._y+this._z*E._z+this._w*E._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let E=this.length();if(E===0)this._x=0,this._y=0,this._z=0,this._w=1;else E=1/E,this._x=this._x*E,this._y=this._y*E,this._z=this._z*E,this._w=this._w*E;return this._onChangeCallback(),this}multiply(E){return this.multiplyQuaternions(this,E)}premultiply(E){return this.multiplyQuaternions(E,this)}multiplyQuaternions(E,H){let{_x:W,_y:R,_z:J,_w:Q}=E,$=H._x,Z=H._y,K=H._z,U=H._w;return this._x=W*U+Q*$+R*K-J*Z,this._y=R*U+Q*Z+J*$-W*K,this._z=J*U+Q*K+W*Z-R*$,this._w=Q*U-W*$-R*Z-J*K,this._onChangeCallback(),this}slerp(E,H){let{_x:W,_y:R,_z:J,_w:Q}=E,$=this.dot(E);if($<0)W=-W,R=-R,J=-J,Q=-Q,$=-$;let Z=1-H;if($<0.9995){let K=Math.acos($),U=Math.sin(K);Z=Math.sin(Z*K)/U,H=Math.sin(H*K)/U,this._x=this._x*Z+W*H,this._y=this._y*Z+R*H,this._z=this._z*Z+J*H,this._w=this._w*Z+Q*H,this._onChangeCallback()}else this._x=this._x*Z+W*H,this._y=this._y*Z+R*H,this._z=this._z*Z+J*H,this._w=this._w*Z+Q*H,this.normalize();return this}slerpQuaternions(E,H,W){return this.copy(E).slerp(H,W)}random(){let E=2*Math.PI*Math.random(),H=2*Math.PI*Math.random(),W=Math.random(),R=Math.sqrt(1-W),J=Math.sqrt(W);return this.set(R*Math.sin(E),R*Math.cos(E),J*Math.sin(H),J*Math.cos(H))}equals(E){return E._x===this._x&&E._y===this._y&&E._z===this._z&&E._w===this._w}fromArray(E,H=0){return this._x=E[H],this._y=E[H+1],this._z=E[H+2],this._w=E[H+3],this._onChangeCallback(),this}toArray(E=[],H=0){return E[H]=this._x,E[H+1]=this._y,E[H+2]=this._z,E[H+3]=this._w,E}fromBufferAttribute(E,H){return this._x=E.getX(H),this._y=E.getY(H),this._z=E.getZ(H),this._w=E.getW(H),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(E){return this._onChangeCallback=E,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{static{b.prototype.isVector3=!0}constructor(E=0,H=0,W=0){this.x=E,this.y=H,this.z=W}set(E,H,W){if(W===void 0)W=this.z;return this.x=E,this.y=H,this.z=W,this}setScalar(E){return this.x=E,this.y=E,this.z=E,this}setX(E){return this.x=E,this}setY(E){return this.y=E,this}setZ(E){return this.z=E,this}setComponent(E,H){switch(E){case 0:this.x=H;break;case 1:this.y=H;break;case 2:this.z=H;break;default:throw Error("THREE.Vector3: index is out of range: "+E)}return this}getComponent(E){switch(E){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+E)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(E){return this.x=E.x,this.y=E.y,this.z=E.z,this}add(E){return this.x+=E.x,this.y+=E.y,this.z+=E.z,this}addScalar(E){return this.x+=E,this.y+=E,this.z+=E,this}addVectors(E,H){return this.x=E.x+H.x,this.y=E.y+H.y,this.z=E.z+H.z,this}addScaledVector(E,H){return this.x+=E.x*H,this.y+=E.y*H,this.z+=E.z*H,this}sub(E){return this.x-=E.x,this.y-=E.y,this.z-=E.z,this}subScalar(E){return this.x-=E,this.y-=E,this.z-=E,this}subVectors(E,H){return this.x=E.x-H.x,this.y=E.y-H.y,this.z=E.z-H.z,this}multiply(E){return this.x*=E.x,this.y*=E.y,this.z*=E.z,this}multiplyScalar(E){return this.x*=E,this.y*=E,this.z*=E,this}multiplyVectors(E,H){return this.x=E.x*H.x,this.y=E.y*H.y,this.z=E.z*H.z,this}applyEuler(E){return this.applyQuaternion(jJ.setFromEuler(E))}applyAxisAngle(E,H){return this.applyQuaternion(jJ.setFromAxisAngle(E,H))}applyMatrix3(E){let H=this.x,W=this.y,R=this.z,J=E.elements;return this.x=J[0]*H+J[3]*W+J[6]*R,this.y=J[1]*H+J[4]*W+J[7]*R,this.z=J[2]*H+J[5]*W+J[8]*R,this}applyNormalMatrix(E){return this.applyMatrix3(E).normalize()}applyMatrix4(E){let H=this.x,W=this.y,R=this.z,J=E.elements,Q=1/(J[3]*H+J[7]*W+J[11]*R+J[15]);return this.x=(J[0]*H+J[4]*W+J[8]*R+J[12])*Q,this.y=(J[1]*H+J[5]*W+J[9]*R+J[13])*Q,this.z=(J[2]*H+J[6]*W+J[10]*R+J[14])*Q,this}applyQuaternion(E){let H=this.x,W=this.y,R=this.z,J=E.x,Q=E.y,$=E.z,Z=E.w,K=2*(Q*R-$*W),U=2*($*H-J*R),X=2*(J*W-Q*H);return this.x=H+Z*K+Q*X-$*U,this.y=W+Z*U+$*K-J*X,this.z=R+Z*X+J*U-Q*K,this}project(E){return this.applyMatrix4(E.matrixWorldInverse).applyMatrix4(E.projectionMatrix)}unproject(E){return this.applyMatrix4(E.projectionMatrixInverse).applyMatrix4(E.matrixWorld)}transformDirection(E){let H=this.x,W=this.y,R=this.z,J=E.elements;return this.x=J[0]*H+J[4]*W+J[8]*R,this.y=J[1]*H+J[5]*W+J[9]*R,this.z=J[2]*H+J[6]*W+J[10]*R,this.normalize()}divide(E){return this.x/=E.x,this.y/=E.y,this.z/=E.z,this}divideScalar(E){return this.multiplyScalar(1/E)}min(E){return this.x=Math.min(this.x,E.x),this.y=Math.min(this.y,E.y),this.z=Math.min(this.z,E.z),this}max(E){return this.x=Math.max(this.x,E.x),this.y=Math.max(this.y,E.y),this.z=Math.max(this.z,E.z),this}clamp(E,H){return this.x=t0(this.x,E.x,H.x),this.y=t0(this.y,E.y,H.y),this.z=t0(this.z,E.z,H.z),this}clampScalar(E,H){return this.x=t0(this.x,E,H),this.y=t0(this.y,E,H),this.z=t0(this.z,E,H),this}clampLength(E,H){let W=this.length();return this.divideScalar(W||1).multiplyScalar(t0(W,E,H))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(E){return this.x*E.x+this.y*E.y+this.z*E.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(E){return this.normalize().multiplyScalar(E)}lerp(E,H){return this.x+=(E.x-this.x)*H,this.y+=(E.y-this.y)*H,this.z+=(E.z-this.z)*H,this}lerpVectors(E,H,W){return this.x=E.x+(H.x-E.x)*W,this.y=E.y+(H.y-E.y)*W,this.z=E.z+(H.z-E.z)*W,this}cross(E){return this.crossVectors(this,E)}crossVectors(E,H){let{x:W,y:R,z:J}=E,Q=H.x,$=H.y,Z=H.z;return this.x=R*Z-J*$,this.y=J*Q-W*Z,this.z=W*$-R*Q,this}projectOnVector(E){let H=E.lengthSq();if(H===0)return this.set(0,0,0);let W=E.dot(this)/H;return this.copy(E).multiplyScalar(W)}projectOnPlane(E){return T6.copy(this).projectOnVector(E),this.sub(T6)}reflect(E){return this.sub(T6.copy(E).multiplyScalar(2*this.dot(E)))}angleTo(E){let H=Math.sqrt(this.lengthSq()*E.lengthSq());if(H===0)return Math.PI/2;let W=this.dot(E)/H;return Math.acos(t0(W,-1,1))}distanceTo(E){return Math.sqrt(this.distanceToSquared(E))}distanceToSquared(E){let H=this.x-E.x,W=this.y-E.y,R=this.z-E.z;return H*H+W*W+R*R}manhattanDistanceTo(E){return Math.abs(this.x-E.x)+Math.abs(this.y-E.y)+Math.abs(this.z-E.z)}setFromSpherical(E){return this.setFromSphericalCoords(E.radius,E.phi,E.theta)}setFromSphericalCoords(E,H,W){let R=Math.sin(H)*E;return this.x=R*Math.sin(W),this.y=Math.cos(H)*E,this.z=R*Math.cos(W),this}setFromCylindrical(E){return this.setFromCylindricalCoords(E.radius,E.theta,E.y)}setFromCylindricalCoords(E,H,W){return this.x=E*Math.sin(H),this.y=W,this.z=E*Math.cos(H),this}setFromMatrixPosition(E){let H=E.elements;return this.x=H[12],this.y=H[13],this.z=H[14],this}setFromMatrixScale(E){let H=this.setFromMatrixColumn(E,0).length(),W=this.setFromMatrixColumn(E,1).length(),R=this.setFromMatrixColumn(E,2).length();return this.x=H,this.y=W,this.z=R,this}setFromMatrixColumn(E,H){return this.fromArray(E.elements,H*4)}setFromMatrix3Column(E,H){return this.fromArray(E.elements,H*3)}setFromEuler(E){return this.x=E._x,this.y=E._y,this.z=E._z,this}setFromColor(E){return this.x=E.r,this.y=E.g,this.z=E.b,this}equals(E){return E.x===this.x&&E.y===this.y&&E.z===this.z}fromArray(E,H=0){return this.x=E[H],this.y=E[H+1],this.z=E[H+2],this}toArray(E=[],H=0){return E[H]=this.x,E[H+1]=this.y,E[H+2]=this.z,E}fromBufferAttribute(E,H){return this.x=E.getX(H),this.y=E.getY(H),this.z=E.getZ(H),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let E=Math.random()*Math.PI*2,H=Math.random()*2-1,W=Math.sqrt(1-H*H);return this.x=W*Math.cos(E),this.y=H,this.z=W*Math.sin(E),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var T6=new b,jJ=new W8;class p0{static{p0.prototype.isMatrix3=!0}constructor(E,H,W,R,J,Q,$,Z,K){if(this.elements=[1,0,0,0,1,0,0,0,1],E!==void 0)this.set(E,H,W,R,J,Q,$,Z,K)}set(E,H,W,R,J,Q,$,Z,K){let U=this.elements;return U[0]=E,U[1]=R,U[2]=$,U[3]=H,U[4]=J,U[5]=Z,U[6]=W,U[7]=Q,U[8]=K,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(E){let H=this.elements,W=E.elements;return H[0]=W[0],H[1]=W[1],H[2]=W[2],H[3]=W[3],H[4]=W[4],H[5]=W[5],H[6]=W[6],H[7]=W[7],H[8]=W[8],this}extractBasis(E,H,W){return E.setFromMatrix3Column(this,0),H.setFromMatrix3Column(this,1),W.setFromMatrix3Column(this,2),this}setFromMatrix4(E){let H=E.elements;return this.set(H[0],H[4],H[8],H[1],H[5],H[9],H[2],H[6],H[10]),this}multiply(E){return this.multiplyMatrices(this,E)}premultiply(E){return this.multiplyMatrices(E,this)}multiplyMatrices(E,H){let W=E.elements,R=H.elements,J=this.elements,Q=W[0],$=W[3],Z=W[6],K=W[1],U=W[4],X=W[7],Y=W[2],G=W[5],D=W[8],F=R[0],w=R[3],C=R[6],M=R[1],T=R[4],y=R[7],B=R[2],V=R[5],P=R[8];return J[0]=Q*F+$*M+Z*B,J[3]=Q*w+$*T+Z*V,J[6]=Q*C+$*y+Z*P,J[1]=K*F+U*M+X*B,J[4]=K*w+U*T+X*V,J[7]=K*C+U*y+X*P,J[2]=Y*F+G*M+D*B,J[5]=Y*w+G*T+D*V,J[8]=Y*C+G*y+D*P,this}multiplyScalar(E){let H=this.elements;return H[0]*=E,H[3]*=E,H[6]*=E,H[1]*=E,H[4]*=E,H[7]*=E,H[2]*=E,H[5]*=E,H[8]*=E,this}determinant(){let E=this.elements,H=E[0],W=E[1],R=E[2],J=E[3],Q=E[4],$=E[5],Z=E[6],K=E[7],U=E[8];return H*Q*U-H*$*K-W*J*U+W*$*Z+R*J*K-R*Q*Z}invert(){let E=this.elements,H=E[0],W=E[1],R=E[2],J=E[3],Q=E[4],$=E[5],Z=E[6],K=E[7],U=E[8],X=U*Q-$*K,Y=$*Z-U*J,G=K*J-Q*Z,D=H*X+W*Y+R*G;if(D===0)return this.set(0,0,0,0,0,0,0,0,0);let F=1/D;return E[0]=X*F,E[1]=(R*K-U*W)*F,E[2]=($*W-R*Q)*F,E[3]=Y*F,E[4]=(U*H-R*Z)*F,E[5]=(R*J-$*H)*F,E[6]=G*F,E[7]=(W*Z-K*H)*F,E[8]=(Q*H-W*J)*F,this}transpose(){let E,H=this.elements;return E=H[1],H[1]=H[3],H[3]=E,E=H[2],H[2]=H[6],H[6]=E,E=H[5],H[5]=H[7],H[7]=E,this}getNormalMatrix(E){return this.setFromMatrix4(E).invert().transpose()}transposeIntoArray(E){let H=this.elements;return E[0]=H[0],E[1]=H[3],E[2]=H[6],E[3]=H[1],E[4]=H[4],E[5]=H[7],E[6]=H[2],E[7]=H[5],E[8]=H[8],this}setUvTransform(E,H,W,R,J,Q,$){let Z=Math.cos(J),K=Math.sin(J);return this.set(W*Z,W*K,-W*(Z*Q+K*$)+Q+E,-R*K,R*Z,-R*(-K*Q+Z*$)+$+H,0,0,1),this}scale(E,H){return _8("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(P6.makeScale(E,H)),this}rotate(E){return _8("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(P6.makeRotation(-E)),this}translate(E,H){return _8("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(P6.makeTranslation(E,H)),this}makeTranslation(E,H){if(E.isVector2)this.set(1,0,E.x,0,1,E.y,0,0,1);else this.set(1,0,E,0,1,H,0,0,1);return this}makeRotation(E){let H=Math.cos(E),W=Math.sin(E);return this.set(H,-W,0,W,H,0,0,0,1),this}makeScale(E,H){return this.set(E,0,0,0,H,0,0,0,1),this}equals(E){let H=this.elements,W=E.elements;for(let R=0;R<9;R++)if(H[R]!==W[R])return!1;return!0}fromArray(E,H=0){for(let W=0;W<9;W++)this.elements[W]=E[W+H];return this}toArray(E=[],H=0){let W=this.elements;return E[H]=W[0],E[H+1]=W[1],E[H+2]=W[2],E[H+3]=W[3],E[H+4]=W[4],E[H+5]=W[5],E[H+6]=W[6],E[H+7]=W[7],E[H+8]=W[8],E}clone(){return new this.constructor().fromArray(this.elements)}}var P6=new p0,yJ=new p0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),hJ=new p0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function i$(){let E={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(J,Q,$){if(this.enabled===!1||Q===$||!Q||!$)return J;if(this.spaces[Q].transfer==="srgb")J.r=eH(J.r),J.g=eH(J.g),J.b=eH(J.b);if(this.spaces[Q].primaries!==this.spaces[$].primaries)J.applyMatrix3(this.spaces[Q].toXYZ),J.applyMatrix3(this.spaces[$].fromXYZ);if(this.spaces[$].transfer==="srgb")J.r=MW(J.r),J.g=MW(J.g),J.b=MW(J.b);return J},workingToColorSpace:function(J,Q){return this.convert(J,this.workingColorSpace,Q)},colorSpaceToWorking:function(J,Q){return this.convert(J,Q,this.workingColorSpace)},getPrimaries:function(J){return this.spaces[J].primaries},getTransfer:function(J){if(J==="")return"linear";return this.spaces[J].transfer},getToneMappingMode:function(J){return this.spaces[J].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(J,Q=this.workingColorSpace){return J.fromArray(this.spaces[Q].luminanceCoefficients)},define:function(J){Object.assign(this.spaces,J)},_getMatrix:function(J,Q,$){return J.copy(this.spaces[Q].toXYZ).multiply(this.spaces[$].fromXYZ)},_getDrawingBufferColorSpace:function(J){return this.spaces[J].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(J=this.workingColorSpace){return this.spaces[J].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(J,Q){return _8("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),E.workingToColorSpace(J,Q)},toWorkingColorSpace:function(J,Q){return _8("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),E.colorSpaceToWorking(J,Q)}},H=[0.64,0.33,0.3,0.6,0.15,0.06],W=[0.2126,0.7152,0.0722],R=[0.3127,0.329];return E.define({["srgb-linear"]:{primaries:H,whitePoint:R,transfer:"linear",toXYZ:yJ,fromXYZ:hJ,luminanceCoefficients:W,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:H,whitePoint:R,transfer:"srgb",toXYZ:yJ,fromXYZ:hJ,luminanceCoefficients:W,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),E}var a0=i$();function eH(E){return E<0.04045?E*0.0773993808:Math.pow(E*0.9478672986+0.0521327014,2.4)}function MW(E){return E<0.0031308?E*12.92:1.055*Math.pow(E,0.41666)-0.055}var EW;class c9{static getDataURL(E,H="image/png"){if(/^data:/i.test(E.src))return E.src;if(typeof HTMLCanvasElement>"u")return E.src;let W;if(E instanceof HTMLCanvasElement)W=E;else{if(EW===void 0)EW=xW("canvas");EW.width=E.width,EW.height=E.height;let R=EW.getContext("2d");if(E instanceof ImageData)R.putImageData(E,0,0);else R.drawImage(E,0,0,E.width,E.height);W=EW}return W.toDataURL(H)}static sRGBToLinear(E){if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){let H=xW("canvas");H.width=E.width,H.height=E.height;let W=H.getContext("2d");W.drawImage(E,0,0,E.width,E.height);let R=W.getImageData(0,0,E.width,E.height),J=R.data;for(let Q=0;Q<J.length;Q++)J[Q]=eH(J[Q]/255)*255;return W.putImageData(R,0,0),H}else if(E.data){let H=E.data.slice(0);for(let W=0;W<H.length;W++)if(H instanceof Uint8Array||H instanceof Uint8ClampedArray)H[W]=Math.floor(eH(H[W]/255)*255);else H[W]=eH(H[W]);return{data:H,width:E.width,height:E.height}}else return h0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),E}}var o$=0;class nW{constructor(E=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:o$++}),this.uuid=cW(),this.data=E,this.dataReady=!0,this.version=0}getSize(E){let H=this.data;if(typeof HTMLVideoElement<"u"&&H instanceof HTMLVideoElement)E.set(H.videoWidth,H.videoHeight,0);else if(typeof VideoFrame<"u"&&H instanceof VideoFrame)E.set(H.displayWidth,H.displayHeight,0);else if(H!==null)E.set(H.width,H.height,H.depth||0);else E.set(0,0,0);return E}set needsUpdate(E){if(E===!0)this.version++}toJSON(E){let H=E===void 0||typeof E==="string";if(!H&&E.images[this.uuid]!==void 0)return E.images[this.uuid];let W={uuid:this.uuid,url:""},R=this.data;if(R!==null){let J;if(Array.isArray(R)){J=[];for(let Q=0,$=R.length;Q<$;Q++)if(R[Q].isDataTexture)J.push(z6(R[Q].image));else J.push(z6(R[Q]))}else J=z6(R);W.url=J}if(!H)E.images[this.uuid]=W;return W}}function z6(E){if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap)return c9.getDataURL(E);else if(E.data)return{data:Array.from(E.data),width:E.width,height:E.height,type:E.data.constructor.name};else return h0("Texture: Unable to serialize Texture."),{}}var a$=0,A6=new b;class aE extends H8{constructor(E=aE.DEFAULT_IMAGE,H=aE.DEFAULT_MAPPING,W=1001,R=1001,J=1006,Q=1008,$=1023,Z=1009,K=aE.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:a$++}),this.uuid=cW(),this.name="",this.source=new nW(E),this.mipmaps=[],this.mapping=H,this.channel=0,this.wrapS=W,this.wrapT=R,this.magFilter=J,this.minFilter=Q,this.anisotropy=K,this.format=$,this.internalFormat=null,this.type=Z,this.offset=new m0(0,0),this.repeat=new m0(1,1),this.center=new m0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new p0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=E&&E.depth&&E.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(A6).x}get height(){return this.source.getSize(A6).y}get depth(){return this.source.getSize(A6).z}get image(){return this.source.data}set image(E){this.source.data=E}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(E,H){this.updateRanges.push({start:E,count:H})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(E){return this.name=E.name,this.source=E.source,this.mipmaps=E.mipmaps.slice(0),this.mapping=E.mapping,this.channel=E.channel,this.wrapS=E.wrapS,this.wrapT=E.wrapT,this.magFilter=E.magFilter,this.minFilter=E.minFilter,this.anisotropy=E.anisotropy,this.format=E.format,this.internalFormat=E.internalFormat,this.type=E.type,this.normalized=E.normalized,this.offset.copy(E.offset),this.repeat.copy(E.repeat),this.center.copy(E.center),this.rotation=E.rotation,this.matrixAutoUpdate=E.matrixAutoUpdate,this.matrix.copy(E.matrix),this.generateMipmaps=E.generateMipmaps,this.premultiplyAlpha=E.premultiplyAlpha,this.flipY=E.flipY,this.unpackAlignment=E.unpackAlignment,this.colorSpace=E.colorSpace,this.renderTarget=E.renderTarget,this.isRenderTargetTexture=E.isRenderTargetTexture,this.isArrayTexture=E.isArrayTexture,this.userData=JSON.parse(JSON.stringify(E.userData)),this.needsUpdate=!0,this}setValues(E){for(let H in E){let W=E[H];if(W===void 0){h0(`Texture.setValues(): parameter '${H}' has value of undefined.`);continue}let R=this[H];if(R===void 0){h0(`Texture.setValues(): property '${H}' does not exist.`);continue}if(R&&W&&(R.isVector2&&W.isVector2))R.copy(W);else if(R&&W&&(R.isVector3&&W.isVector3))R.copy(W);else if(R&&W&&(R.isMatrix3&&W.isMatrix3))R.copy(W);else this[H]=W}}toJSON(E){let H=E===void 0||typeof E==="string";if(!H&&E.textures[this.uuid]!==void 0)return E.textures[this.uuid];let W={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(E).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)W.userData=this.userData;if(!H)E.textures[this.uuid]=W;return W}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(E){if(this.mapping!==300)return E;if(E.applyMatrix3(this.matrix),E.x<0||E.x>1)switch(this.wrapS){case 1000:E.x=E.x-Math.floor(E.x);break;case 1001:E.x=E.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(E.x)%2)===1)E.x=Math.ceil(E.x)-E.x;else E.x=E.x-Math.floor(E.x);break}if(E.y<0||E.y>1)switch(this.wrapT){case 1000:E.y=E.y-Math.floor(E.y);break;case 1001:E.y=E.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(E.y)%2)===1)E.y=Math.ceil(E.y)-E.y;else E.y=E.y-Math.floor(E.y);break}if(this.flipY)E.y=1-E.y;return E}set needsUpdate(E){if(E===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(E){if(E===!0)this.pmremVersion++}}aE.DEFAULT_IMAGE=null;aE.DEFAULT_MAPPING=300;aE.DEFAULT_ANISOTROPY=1;class NE{static{NE.prototype.isVector4=!0}constructor(E=0,H=0,W=0,R=1){this.x=E,this.y=H,this.z=W,this.w=R}get width(){return this.z}set width(E){this.z=E}get height(){return this.w}set height(E){this.w=E}set(E,H,W,R){return this.x=E,this.y=H,this.z=W,this.w=R,this}setScalar(E){return this.x=E,this.y=E,this.z=E,this.w=E,this}setX(E){return this.x=E,this}setY(E){return this.y=E,this}setZ(E){return this.z=E,this}setW(E){return this.w=E,this}setComponent(E,H){switch(E){case 0:this.x=H;break;case 1:this.y=H;break;case 2:this.z=H;break;case 3:this.w=H;break;default:throw Error("THREE.Vector4: index is out of range: "+E)}return this}getComponent(E){switch(E){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+E)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(E){return this.x=E.x,this.y=E.y,this.z=E.z,this.w=E.w!==void 0?E.w:1,this}add(E){return this.x+=E.x,this.y+=E.y,this.z+=E.z,this.w+=E.w,this}addScalar(E){return this.x+=E,this.y+=E,this.z+=E,this.w+=E,this}addVectors(E,H){return this.x=E.x+H.x,this.y=E.y+H.y,this.z=E.z+H.z,this.w=E.w+H.w,this}addScaledVector(E,H){return this.x+=E.x*H,this.y+=E.y*H,this.z+=E.z*H,this.w+=E.w*H,this}sub(E){return this.x-=E.x,this.y-=E.y,this.z-=E.z,this.w-=E.w,this}subScalar(E){return this.x-=E,this.y-=E,this.z-=E,this.w-=E,this}subVectors(E,H){return this.x=E.x-H.x,this.y=E.y-H.y,this.z=E.z-H.z,this.w=E.w-H.w,this}multiply(E){return this.x*=E.x,this.y*=E.y,this.z*=E.z,this.w*=E.w,this}multiplyScalar(E){return this.x*=E,this.y*=E,this.z*=E,this.w*=E,this}applyMatrix4(E){let H=this.x,W=this.y,R=this.z,J=this.w,Q=E.elements;return this.x=Q[0]*H+Q[4]*W+Q[8]*R+Q[12]*J,this.y=Q[1]*H+Q[5]*W+Q[9]*R+Q[13]*J,this.z=Q[2]*H+Q[6]*W+Q[10]*R+Q[14]*J,this.w=Q[3]*H+Q[7]*W+Q[11]*R+Q[15]*J,this}divide(E){return this.x/=E.x,this.y/=E.y,this.z/=E.z,this.w/=E.w,this}divideScalar(E){return this.multiplyScalar(1/E)}setAxisAngleFromQuaternion(E){this.w=2*Math.acos(E.w);let H=Math.sqrt(1-E.w*E.w);if(H<0.0001)this.x=1,this.y=0,this.z=0;else this.x=E.x/H,this.y=E.y/H,this.z=E.z/H;return this}setAxisAngleFromRotationMatrix(E){let H,W,R,J,Q=0.01,$=0.1,Z=E.elements,K=Z[0],U=Z[4],X=Z[8],Y=Z[1],G=Z[5],D=Z[9],F=Z[2],w=Z[6],C=Z[10];if(Math.abs(U-Y)<0.01&&Math.abs(X-F)<0.01&&Math.abs(D-w)<0.01){if(Math.abs(U+Y)<0.1&&Math.abs(X+F)<0.1&&Math.abs(D+w)<0.1&&Math.abs(K+G+C-3)<0.1)return this.set(1,0,0,0),this;H=Math.PI;let T=(K+1)/2,y=(G+1)/2,B=(C+1)/2,V=(U+Y)/4,P=(X+F)/4,A=(D+w)/4;if(T>y&&T>B)if(T<0.01)W=0,R=0.707106781,J=0.707106781;else W=Math.sqrt(T),R=V/W,J=P/W;else if(y>B)if(y<0.01)W=0.707106781,R=0,J=0.707106781;else R=Math.sqrt(y),W=V/R,J=A/R;else if(B<0.01)W=0.707106781,R=0.707106781,J=0;else J=Math.sqrt(B),W=P/J,R=A/J;return this.set(W,R,J,H),this}let M=Math.sqrt((w-D)*(w-D)+(X-F)*(X-F)+(Y-U)*(Y-U));if(Math.abs(M)<0.001)M=1;return this.x=(w-D)/M,this.y=(X-F)/M,this.z=(Y-U)/M,this.w=Math.acos((K+G+C-1)/2),this}setFromMatrixPosition(E){let H=E.elements;return this.x=H[12],this.y=H[13],this.z=H[14],this.w=H[15],this}min(E){return this.x=Math.min(this.x,E.x),this.y=Math.min(this.y,E.y),this.z=Math.min(this.z,E.z),this.w=Math.min(this.w,E.w),this}max(E){return this.x=Math.max(this.x,E.x),this.y=Math.max(this.y,E.y),this.z=Math.max(this.z,E.z),this.w=Math.max(this.w,E.w),this}clamp(E,H){return this.x=t0(this.x,E.x,H.x),this.y=t0(this.y,E.y,H.y),this.z=t0(this.z,E.z,H.z),this.w=t0(this.w,E.w,H.w),this}clampScalar(E,H){return this.x=t0(this.x,E,H),this.y=t0(this.y,E,H),this.z=t0(this.z,E,H),this.w=t0(this.w,E,H),this}clampLength(E,H){let W=this.length();return this.divideScalar(W||1).multiplyScalar(t0(W,E,H))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(E){return this.x*E.x+this.y*E.y+this.z*E.z+this.w*E.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(E){return this.normalize().multiplyScalar(E)}lerp(E,H){return this.x+=(E.x-this.x)*H,this.y+=(E.y-this.y)*H,this.z+=(E.z-this.z)*H,this.w+=(E.w-this.w)*H,this}lerpVectors(E,H,W){return this.x=E.x+(H.x-E.x)*W,this.y=E.y+(H.y-E.y)*W,this.z=E.z+(H.z-E.z)*W,this.w=E.w+(H.w-E.w)*W,this}equals(E){return E.x===this.x&&E.y===this.y&&E.z===this.z&&E.w===this.w}fromArray(E,H=0){return this.x=E[H],this.y=E[H+1],this.z=E[H+2],this.w=E[H+3],this}toArray(E=[],H=0){return E[H]=this.x,E[H+1]=this.y,E[H+2]=this.z,E[H+3]=this.w,E}fromBufferAttribute(E,H){return this.x=E.getX(H),this.y=E.getY(H),this.z=E.getZ(H),this.w=E.getW(H),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class n9 extends H8{constructor(E=1,H=1,W={}){super();W=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},W),this.isRenderTarget=!0,this.width=E,this.height=H,this.depth=W.depth,this.scissor=new NE(0,0,E,H),this.scissorTest=!1,this.viewport=new NE(0,0,E,H),this.textures=[];let R={width:E,height:H,depth:W.depth},J=new aE(R),Q=W.count;for(let $=0;$<Q;$++)this.textures[$]=J.clone(),this.textures[$].isRenderTargetTexture=!0,this.textures[$].renderTarget=this;this._setTextureOptions(W),this.depthBuffer=W.depthBuffer,this.stencilBuffer=W.stencilBuffer,this.resolveColorBuffer=W.resolveColorBuffer,this.resolveDepthBuffer=W.resolveDepthBuffer,this.resolveStencilBuffer=W.resolveStencilBuffer,this.storeMultisampledColorBuffer=W.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=W.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=W.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=W.depthTexture,this.samples=W.samples,this.multiview=W.multiview,this.useArrayDepthTexture=W.useArrayDepthTexture}_setTextureOptions(E={}){let H={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(E.mapping!==void 0)H.mapping=E.mapping;if(E.wrapS!==void 0)H.wrapS=E.wrapS;if(E.wrapT!==void 0)H.wrapT=E.wrapT;if(E.wrapR!==void 0)H.wrapR=E.wrapR;if(E.magFilter!==void 0)H.magFilter=E.magFilter;if(E.minFilter!==void 0)H.minFilter=E.minFilter;if(E.format!==void 0)H.format=E.format;if(E.type!==void 0)H.type=E.type;if(E.anisotropy!==void 0)H.anisotropy=E.anisotropy;if(E.colorSpace!==void 0)H.colorSpace=E.colorSpace;if(E.flipY!==void 0)H.flipY=E.flipY;if(E.generateMipmaps!==void 0)H.generateMipmaps=E.generateMipmaps;if(E.internalFormat!==void 0)H.internalFormat=E.internalFormat;for(let W=0;W<this.textures.length;W++)this.textures[W].setValues(H)}get texture(){return this.textures[0]}set texture(E){this.textures[0]=E}set depthTexture(E){if(this._depthTexture!==null&&this._depthTexture.renderTarget===this)this._depthTexture.renderTarget=null;if(E!==null&&E.renderTarget===null)E.renderTarget=this;this._depthTexture=E}get depthTexture(){return this._depthTexture}setSize(E,H,W=1){if(this.width!==E||this.height!==H||this.depth!==W){this.width=E,this.height=H,this.depth=W;for(let R=0,J=this.textures.length;R<J;R++)if(this.textures[R].image.width=E,this.textures[R].image.height=H,this.textures[R].image.depth=W,this.textures[R].isData3DTexture!==!0)this.textures[R].isArrayTexture=this.textures[R].image.depth>1;this.dispose()}this.viewport.set(0,0,E,H),this.scissor.set(0,0,E,H)}clone(){return new this.constructor().copy(this)}copy(E){this.width=E.width,this.height=E.height,this.depth=E.depth,this.scissor.copy(E.scissor),this.scissorTest=E.scissorTest,this.viewport.copy(E.viewport),this.textures.length=0;for(let H=0,W=E.textures.length;H<W;H++){this.textures[H]=E.textures[H].clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;let R=Object.assign({},E.textures[H].image);this.textures[H].source=new nW(R)}if(this.depthBuffer=E.depthBuffer,this.stencilBuffer=E.stencilBuffer,this.resolveColorBuffer=E.resolveColorBuffer,this.resolveDepthBuffer=E.resolveDepthBuffer,this.resolveStencilBuffer=E.resolveStencilBuffer,this.storeMultisampledColorBuffer=E.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=E.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=E.storeMultisampledStencilBuffer,E.depthTexture!==null)if(E.depthTexture.renderTarget===E){let H=E.depthTexture.clone();H.renderTarget=null,this.depthTexture=H}else this.depthTexture=E.depthTexture;return this.samples=E.samples,this.multiview=E.multiview,this.useArrayDepthTexture=E.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cE extends n9{constructor(E=1,H=1,W={}){super(E,H,W);this.isWebGLRenderTarget=!0}}class a7 extends aE{constructor(E=null,H=1,W=1,R=1){super(null);this.isDataArrayTexture=!0,this.image={data:E,width:H,height:W,depth:R},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(E){return super.copy(E),this.wrapR=E.wrapR,this}addLayerUpdate(E){this.layerUpdates.add(E)}clearLayerUpdates(){this.layerUpdates.clear()}}class s9 extends aE{constructor(E=null,H=1,W=1,R=1){super(null);this.isData3DTexture=!0,this.image={data:E,width:H,height:W,depth:R},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(E){return super.copy(E),this.wrapR=E.wrapR,this}}class AE{static{AE.prototype.isMatrix4=!0}constructor(E,H,W,R,J,Q,$,Z,K,U,X,Y,G,D,F,w){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],E!==void 0)this.set(E,H,W,R,J,Q,$,Z,K,U,X,Y,G,D,F,w)}set(E,H,W,R,J,Q,$,Z,K,U,X,Y,G,D,F,w){let C=this.elements;return C[0]=E,C[4]=H,C[8]=W,C[12]=R,C[1]=J,C[5]=Q,C[9]=$,C[13]=Z,C[2]=K,C[6]=U,C[10]=X,C[14]=Y,C[3]=G,C[7]=D,C[11]=F,C[15]=w,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new AE().fromArray(this.elements)}copy(E){let H=this.elements,W=E.elements;return H[0]=W[0],H[1]=W[1],H[2]=W[2],H[3]=W[3],H[4]=W[4],H[5]=W[5],H[6]=W[6],H[7]=W[7],H[8]=W[8],H[9]=W[9],H[10]=W[10],H[11]=W[11],H[12]=W[12],H[13]=W[13],H[14]=W[14],H[15]=W[15],this}copyPosition(E){let H=this.elements,W=E.elements;return H[12]=W[12],H[13]=W[13],H[14]=W[14],this}setFromMatrix3(E){let H=E.elements;return this.set(H[0],H[3],H[6],0,H[1],H[4],H[7],0,H[2],H[5],H[8],0,0,0,0,1),this}extractBasis(E,H,W){if(this.determinantAffine()===0)return E.set(1,0,0),H.set(0,1,0),W.set(0,0,1),this;return E.setFromMatrixColumn(this,0),H.setFromMatrixColumn(this,1),W.setFromMatrixColumn(this,2),this}makeBasis(E,H,W){return this.set(E.x,H.x,W.x,0,E.y,H.y,W.y,0,E.z,H.z,W.z,0,0,0,0,1),this}extractRotation(E){if(E.determinantAffine()===0)return this.identity();let H=this.elements,W=E.elements,R=1/HW.setFromMatrixColumn(E,0).length(),J=1/HW.setFromMatrixColumn(E,1).length(),Q=1/HW.setFromMatrixColumn(E,2).length();return H[0]=W[0]*R,H[1]=W[1]*R,H[2]=W[2]*R,H[3]=0,H[4]=W[4]*J,H[5]=W[5]*J,H[6]=W[6]*J,H[7]=0,H[8]=W[8]*Q,H[9]=W[9]*Q,H[10]=W[10]*Q,H[11]=0,H[12]=0,H[13]=0,H[14]=0,H[15]=1,this}makeRotationFromEuler(E){let H=this.elements,W=E.x,R=E.y,J=E.z,Q=Math.cos(W),$=Math.sin(W),Z=Math.cos(R),K=Math.sin(R),U=Math.cos(J),X=Math.sin(J);if(E.order==="XYZ"){let Y=Q*U,G=Q*X,D=$*U,F=$*X;H[0]=Z*U,H[4]=-Z*X,H[8]=K,H[1]=G+D*K,H[5]=Y-F*K,H[9]=-$*Z,H[2]=F-Y*K,H[6]=D+G*K,H[10]=Q*Z}else if(E.order==="YXZ"){let Y=Z*U,G=Z*X,D=K*U,F=K*X;H[0]=Y+F*$,H[4]=D*$-G,H[8]=Q*K,H[1]=Q*X,H[5]=Q*U,H[9]=-$,H[2]=G*$-D,H[6]=F+Y*$,H[10]=Q*Z}else if(E.order==="ZXY"){let Y=Z*U,G=Z*X,D=K*U,F=K*X;H[0]=Y-F*$,H[4]=-Q*X,H[8]=D+G*$,H[1]=G+D*$,H[5]=Q*U,H[9]=F-Y*$,H[2]=-Q*K,H[6]=$,H[10]=Q*Z}else if(E.order==="ZYX"){let Y=Q*U,G=Q*X,D=$*U,F=$*X;H[0]=Z*U,H[4]=D*K-G,H[8]=Y*K+F,H[1]=Z*X,H[5]=F*K+Y,H[9]=G*K-D,H[2]=-K,H[6]=$*Z,H[10]=Q*Z}else if(E.order==="YZX"){let Y=Q*Z,G=Q*K,D=$*Z,F=$*K;H[0]=Z*U,H[4]=F-Y*X,H[8]=D*X+G,H[1]=X,H[5]=Q*U,H[9]=-$*U,H[2]=-K*U,H[6]=G*X+D,H[10]=Y-F*X}else if(E.order==="XZY"){let Y=Q*Z,G=Q*K,D=$*Z,F=$*K;H[0]=Z*U,H[4]=-X,H[8]=K*U,H[1]=Y*X+F,H[5]=Q*U,H[9]=G*X-D,H[2]=D*X-G,H[6]=$*U,H[10]=F*X+Y}return H[3]=0,H[7]=0,H[11]=0,H[12]=0,H[13]=0,H[14]=0,H[15]=1,this}makeRotationFromQuaternion(E){return this.compose(r$,E,t$)}lookAt(E,H,W){let R=this.elements;if(GH.subVectors(E,H),GH.lengthSq()===0)GH.z=1;if(GH.normalize(),U8.crossVectors(W,GH),U8.lengthSq()===0){if(Math.abs(W.z)===1)GH.x+=0.0001;else GH.z+=0.0001;GH.normalize(),U8.crossVectors(W,GH)}return U8.normalize(),M7.crossVectors(GH,U8),R[0]=U8.x,R[4]=M7.x,R[8]=GH.x,R[1]=U8.y,R[5]=M7.y,R[9]=GH.y,R[2]=U8.z,R[6]=M7.z,R[10]=GH.z,this}multiply(E){return this.multiplyMatrices(this,E)}premultiply(E){return this.multiplyMatrices(E,this)}multiplyMatrices(E,H){let W=E.elements,R=H.elements,J=this.elements,Q=W[0],$=W[4],Z=W[8],K=W[12],U=W[1],X=W[5],Y=W[9],G=W[13],D=W[2],F=W[6],w=W[10],C=W[14],M=W[3],T=W[7],y=W[11],B=W[15],V=R[0],P=R[4],A=R[8],L=R[12],k=R[1],c=R[5],h=R[9],v=R[13],d=R[2],z=R[6],u=R[10],a=R[14],p=R[3],J0=R[7],s=R[11],t=R[15];return J[0]=Q*V+$*k+Z*d+K*p,J[4]=Q*P+$*c+Z*z+K*J0,J[8]=Q*A+$*h+Z*u+K*s,J[12]=Q*L+$*v+Z*a+K*t,J[1]=U*V+X*k+Y*d+G*p,J[5]=U*P+X*c+Y*z+G*J0,J[9]=U*A+X*h+Y*u+G*s,J[13]=U*L+X*v+Y*a+G*t,J[2]=D*V+F*k+w*d+C*p,J[6]=D*P+F*c+w*z+C*J0,J[10]=D*A+F*h+w*u+C*s,J[14]=D*L+F*v+w*a+C*t,J[3]=M*V+T*k+y*d+B*p,J[7]=M*P+T*c+y*z+B*J0,J[11]=M*A+T*h+y*u+B*s,J[15]=M*L+T*v+y*a+B*t,this}multiplyScalar(E){let H=this.elements;return H[0]*=E,H[4]*=E,H[8]*=E,H[12]*=E,H[1]*=E,H[5]*=E,H[9]*=E,H[13]*=E,H[2]*=E,H[6]*=E,H[10]*=E,H[14]*=E,H[3]*=E,H[7]*=E,H[11]*=E,H[15]*=E,this}determinant(){let E=this.elements,H=E[0],W=E[4],R=E[8],J=E[12],Q=E[1],$=E[5],Z=E[9],K=E[13],U=E[2],X=E[6],Y=E[10],G=E[14],D=E[3],F=E[7],w=E[11],C=E[15],M=Z*G-K*Y,T=$*G-K*X,y=$*Y-Z*X,B=Q*G-K*U,V=Q*Y-Z*U,P=Q*X-$*U;return H*(F*M-w*T+C*y)-W*(D*M-w*B+C*V)+R*(D*T-F*B+C*P)-J*(D*y-F*V+w*P)}determinantAffine(){let E=this.elements,H=E[0],W=E[4],R=E[8],J=E[1],Q=E[5],$=E[9],Z=E[2],K=E[6],U=E[10];return H*(Q*U-$*K)-W*(J*U-$*Z)+R*(J*K-Q*Z)}transpose(){let E=this.elements,H;return H=E[1],E[1]=E[4],E[4]=H,H=E[2],E[2]=E[8],E[8]=H,H=E[6],E[6]=E[9],E[9]=H,H=E[3],E[3]=E[12],E[12]=H,H=E[7],E[7]=E[13],E[13]=H,H=E[11],E[11]=E[14],E[14]=H,this}setPosition(E,H,W){let R=this.elements;if(E.isVector3)R[12]=E.x,R[13]=E.y,R[14]=E.z;else R[12]=E,R[13]=H,R[14]=W;return this}invert(){let E=this.elements,H=E[0],W=E[1],R=E[2],J=E[3],Q=E[4],$=E[5],Z=E[6],K=E[7],U=E[8],X=E[9],Y=E[10],G=E[11],D=E[12],F=E[13],w=E[14],C=E[15],M=H*$-W*Q,T=H*Z-R*Q,y=H*K-J*Q,B=W*Z-R*$,V=W*K-J*$,P=R*K-J*Z,A=U*F-X*D,L=U*w-Y*D,k=U*C-G*D,c=X*w-Y*F,h=X*C-G*F,v=Y*C-G*w,d=M*v-T*h+y*c+B*k-V*L+P*A;if(d===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/d;return E[0]=($*v-Z*h+K*c)*z,E[1]=(R*h-W*v-J*c)*z,E[2]=(F*P-w*V+C*B)*z,E[3]=(Y*V-X*P-G*B)*z,E[4]=(Z*k-Q*v-K*L)*z,E[5]=(H*v-R*k+J*L)*z,E[6]=(w*y-D*P-C*T)*z,E[7]=(U*P-Y*y+G*T)*z,E[8]=(Q*h-$*k+K*A)*z,E[9]=(W*k-H*h-J*A)*z,E[10]=(D*V-F*y+C*M)*z,E[11]=(X*y-U*V-G*M)*z,E[12]=($*L-Q*c-Z*A)*z,E[13]=(H*c-W*L+R*A)*z,E[14]=(F*T-D*B-w*M)*z,E[15]=(U*B-X*T+Y*M)*z,this}scale(E){let H=this.elements,W=E.x,R=E.y,J=E.z;return H[0]*=W,H[4]*=R,H[8]*=J,H[1]*=W,H[5]*=R,H[9]*=J,H[2]*=W,H[6]*=R,H[10]*=J,H[3]*=W,H[7]*=R,H[11]*=J,this}getMaxScaleOnAxis(){let E=this.elements,H=E[0]*E[0]+E[1]*E[1]+E[2]*E[2],W=E[4]*E[4]+E[5]*E[5]+E[6]*E[6],R=E[8]*E[8]+E[9]*E[9]+E[10]*E[10];return Math.sqrt(Math.max(H,W,R))}makeTranslation(E,H,W){if(E.isVector3)this.set(1,0,0,E.x,0,1,0,E.y,0,0,1,E.z,0,0,0,1);else this.set(1,0,0,E,0,1,0,H,0,0,1,W,0,0,0,1);return this}makeRotationX(E){let H=Math.cos(E),W=Math.sin(E);return this.set(1,0,0,0,0,H,-W,0,0,W,H,0,0,0,0,1),this}makeRotationY(E){let H=Math.cos(E),W=Math.sin(E);return this.set(H,0,W,0,0,1,0,0,-W,0,H,0,0,0,0,1),this}makeRotationZ(E){let H=Math.cos(E),W=Math.sin(E);return this.set(H,-W,0,0,W,H,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(E,H){let W=Math.cos(H),R=Math.sin(H),J=1-W,Q=E.x,$=E.y,Z=E.z,K=J*Q,U=J*$;return this.set(K*Q+W,K*$-R*Z,K*Z+R*$,0,K*$+R*Z,U*$+W,U*Z-R*Q,0,K*Z-R*$,U*Z+R*Q,J*Z*Z+W,0,0,0,0,1),this}makeScale(E,H,W){return this.set(E,0,0,0,0,H,0,0,0,0,W,0,0,0,0,1),this}makeShear(E,H,W,R,J,Q){return this.set(1,W,J,0,E,1,Q,0,H,R,1,0,0,0,0,1),this}compose(E,H,W){let R=this.elements,J=H._x,Q=H._y,$=H._z,Z=H._w,K=J+J,U=Q+Q,X=$+$,Y=J*K,G=J*U,D=J*X,F=Q*U,w=Q*X,C=$*X,M=Z*K,T=Z*U,y=Z*X,B=W.x,V=W.y,P=W.z;return R[0]=(1-(F+C))*B,R[1]=(G+y)*B,R[2]=(D-T)*B,R[3]=0,R[4]=(G-y)*V,R[5]=(1-(Y+C))*V,R[6]=(w+M)*V,R[7]=0,R[8]=(D+T)*P,R[9]=(w-M)*P,R[10]=(1-(Y+F))*P,R[11]=0,R[12]=E.x,R[13]=E.y,R[14]=E.z,R[15]=1,this}decompose(E,H,W){let R=this.elements;E.x=R[12],E.y=R[13],E.z=R[14];let J=this.determinantAffine();if(J===0)return W.set(1,1,1),H.identity(),this;let Q=HW.set(R[0],R[1],R[2]).length(),$=HW.set(R[4],R[5],R[6]).length(),Z=HW.set(R[8],R[9],R[10]).length();if(J<0)Q=-Q;IH.copy(this);let K=1/Q,U=1/$,X=1/Z;return IH.elements[0]*=K,IH.elements[1]*=K,IH.elements[2]*=K,IH.elements[4]*=U,IH.elements[5]*=U,IH.elements[6]*=U,IH.elements[8]*=X,IH.elements[9]*=X,IH.elements[10]*=X,H.setFromRotationMatrix(IH),W.x=Q,W.y=$,W.z=Z,this}makePerspective(E,H,W,R,J,Q,$=2000,Z=!1){let K=this.elements,U=2*J/(H-E),X=2*J/(W-R),Y=(H+E)/(H-E),G=(W+R)/(W-R),D,F;if(Z)D=J/(Q-J),F=Q*J/(Q-J);else if($===2000)D=-(Q+J)/(Q-J),F=-2*Q*J/(Q-J);else if($===2001)D=-Q/(Q-J),F=-Q*J/(Q-J);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+$);return K[0]=U,K[4]=0,K[8]=Y,K[12]=0,K[1]=0,K[5]=X,K[9]=G,K[13]=0,K[2]=0,K[6]=0,K[10]=D,K[14]=F,K[3]=0,K[7]=0,K[11]=-1,K[15]=0,this}makeOrthographic(E,H,W,R,J,Q,$=2000,Z=!1){let K=this.elements,U=2/(H-E),X=2/(W-R),Y=-(H+E)/(H-E),G=-(W+R)/(W-R),D,F;if(Z)D=1/(Q-J),F=Q/(Q-J);else if($===2000)D=-2/(Q-J),F=-(Q+J)/(Q-J);else if($===2001)D=-1/(Q-J),F=-J/(Q-J);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+$);return K[0]=U,K[4]=0,K[8]=0,K[12]=Y,K[1]=0,K[5]=X,K[9]=0,K[13]=G,K[2]=0,K[6]=0,K[10]=D,K[14]=F,K[3]=0,K[7]=0,K[11]=0,K[15]=1,this}equals(E){let H=this.elements,W=E.elements;for(let R=0;R<16;R++)if(H[R]!==W[R])return!1;return!0}fromArray(E,H=0){for(let W=0;W<16;W++)this.elements[W]=E[W+H];return this}toArray(E=[],H=0){let W=this.elements;return E[H]=W[0],E[H+1]=W[1],E[H+2]=W[2],E[H+3]=W[3],E[H+4]=W[4],E[H+5]=W[5],E[H+6]=W[6],E[H+7]=W[7],E[H+8]=W[8],E[H+9]=W[9],E[H+10]=W[10],E[H+11]=W[11],E[H+12]=W[12],E[H+13]=W[13],E[H+14]=W[14],E[H+15]=W[15],E}}var HW=new b,IH=new AE,r$=new b(0,0,0),t$=new b(1,1,1),U8=new b,M7=new b,GH=new b,vJ=new AE,fJ=new W8;class D8{constructor(E=0,H=0,W=0,R=D8.DEFAULT_ORDER){this.isEuler=!0,this._x=E,this._y=H,this._z=W,this._order=R}get x(){return this._x}set x(E){this._x=E,this._onChangeCallback()}get y(){return this._y}set y(E){this._y=E,this._onChangeCallback()}get z(){return this._z}set z(E){this._z=E,this._onChangeCallback()}get order(){return this._order}set order(E){this._order=E,this._onChangeCallback()}set(E,H,W,R=this._order){return this._x=E,this._y=H,this._z=W,this._order=R,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(E){return this._x=E._x,this._y=E._y,this._z=E._z,this._order=E._order,this._onChangeCallback(),this}setFromRotationMatrix(E,H=this._order,W=!0){let R=E.elements,J=R[0],Q=R[4],$=R[8],Z=R[1],K=R[5],U=R[9],X=R[2],Y=R[6],G=R[10];switch(H){case"XYZ":if(this._y=Math.asin(t0($,-1,1)),Math.abs($)<0.9999999)this._x=Math.atan2(-U,G),this._z=Math.atan2(-Q,J);else this._x=Math.atan2(Y,K),this._z=0;break;case"YXZ":if(this._x=Math.asin(-t0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2($,G),this._z=Math.atan2(Z,K);else this._y=Math.atan2(-X,J),this._z=0;break;case"ZXY":if(this._x=Math.asin(t0(Y,-1,1)),Math.abs(Y)<0.9999999)this._y=Math.atan2(-X,G),this._z=Math.atan2(-Q,K);else this._y=0,this._z=Math.atan2(Z,J);break;case"ZYX":if(this._y=Math.asin(-t0(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(Y,G),this._z=Math.atan2(Z,J);else this._x=0,this._z=Math.atan2(-Q,K);break;case"YZX":if(this._z=Math.asin(t0(Z,-1,1)),Math.abs(Z)<0.9999999)this._x=Math.atan2(-U,K),this._y=Math.atan2(-X,J);else this._x=0,this._y=Math.atan2($,G);break;case"XZY":if(this._z=Math.asin(-t0(Q,-1,1)),Math.abs(Q)<0.9999999)this._x=Math.atan2(Y,K),this._y=Math.atan2($,J);else this._x=Math.atan2(-U,G),this._y=0;break;default:h0("Euler: .setFromRotationMatrix() encountered an unknown order: "+H)}if(this._order=H,W===!0)this._onChangeCallback();return this}setFromQuaternion(E,H,W){return vJ.makeRotationFromQuaternion(E),this.setFromRotationMatrix(vJ,H,W)}setFromVector3(E,H=this._order){return this.set(E.x,E.y,E.z,H)}reorder(E){return fJ.setFromEuler(this),this.setFromQuaternion(fJ,E)}equals(E){return E._x===this._x&&E._y===this._y&&E._z===this._z&&E._order===this._order}fromArray(E){if(this._x=E[0],this._y=E[1],this._z=E[2],E[3]!==void 0)this._order=E[3];return this._onChangeCallback(),this}toArray(E=[],H=0){return E[H]=this._x,E[H+1]=this._y,E[H+2]=this._z,E[H+3]=this._order,E}_onChange(E){return this._onChangeCallback=E,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}D8.DEFAULT_ORDER="XYZ";class r7{constructor(){this.mask=1}set(E){this.mask=(1<<E|0)>>>0}enable(E){this.mask|=1<<E|0}enableAll(){this.mask=-1}toggle(E){this.mask^=1<<E|0}disable(E){this.mask&=~(1<<E|0)}disableAll(){this.mask=0}test(E){return(this.mask&E.mask)!==0}isEnabled(E){return(this.mask&(1<<E|0))!==0}}var e$=0,bJ=new b,WW=new W8,iH=new AE,D7=new b,yW=new b,EZ=new b,HZ=new W8,xJ=new b(1,0,0),gJ=new b(0,1,0),pJ=new b(0,0,1),lJ={type:"added"},WZ={type:"removed"},RW={type:"childadded",child:null},I6={type:"childremoved",child:null};class WH extends H8{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:e$++}),this.uuid=cW(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=WH.DEFAULT_UP.clone();let E=new b,H=new D8,W=new W8,R=new b(1,1,1);function J(){W.setFromEuler(H,!1)}function Q(){H.setFromQuaternion(W,void 0,!1)}H._onChange(J),W._onChange(Q),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:E},rotation:{configurable:!0,enumerable:!0,value:H},quaternion:{configurable:!0,enumerable:!0,value:W},scale:{configurable:!0,enumerable:!0,value:R},modelViewMatrix:{value:new AE},normalMatrix:{value:new p0}}),this.matrix=new AE,this.matrixWorld=new AE,this.matrixAutoUpdate=WH.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=WH.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new r7,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(E){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(E),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(E){return this.quaternion.premultiply(E),this}setRotationFromAxisAngle(E,H){this.quaternion.setFromAxisAngle(E,H)}setRotationFromEuler(E){this.quaternion.setFromEuler(E,!0)}setRotationFromMatrix(E){this.quaternion.setFromRotationMatrix(E)}setRotationFromQuaternion(E){this.quaternion.copy(E)}rotateOnAxis(E,H){return WW.setFromAxisAngle(E,H),this.quaternion.multiply(WW),this}rotateOnWorldAxis(E,H){return WW.setFromAxisAngle(E,H),this.quaternion.premultiply(WW),this}rotateX(E){return this.rotateOnAxis(xJ,E)}rotateY(E){return this.rotateOnAxis(gJ,E)}rotateZ(E){return this.rotateOnAxis(pJ,E)}translateOnAxis(E,H){return bJ.copy(E).applyQuaternion(this.quaternion),this.position.add(bJ.multiplyScalar(H)),this}translateX(E){return this.translateOnAxis(xJ,E)}translateY(E){return this.translateOnAxis(gJ,E)}translateZ(E){return this.translateOnAxis(pJ,E)}localToWorld(E){return this.updateWorldMatrix(!0,!1),E.applyMatrix4(this.matrixWorld)}worldToLocal(E){return this.updateWorldMatrix(!0,!1),E.applyMatrix4(iH.copy(this.matrixWorld).invert())}lookAt(E,H,W){if(E.isVector3)D7.copy(E);else D7.set(E,H,W);let R=this.parent;if(this.updateWorldMatrix(!0,!1),yW.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)iH.lookAt(yW,D7,this.up);else iH.lookAt(D7,yW,this.up);if(this.quaternion.setFromRotationMatrix(iH),R)iH.extractRotation(R.matrixWorld),WW.setFromRotationMatrix(iH),this.quaternion.premultiply(WW.invert())}add(E){if(arguments.length>1){for(let H=0;H<arguments.length;H++)this.add(arguments[H]);return this}if(E===this)return g0("Object3D.add: object can't be added as a child of itself.",E),this;if(E&&E.isObject3D)E.removeFromParent(),E.parent=this,this.children.push(E),E.dispatchEvent(lJ),RW.child=E,this.dispatchEvent(RW),RW.child=null;else g0("Object3D.add: object not an instance of THREE.Object3D.",E);return this}remove(E){if(arguments.length>1){for(let W=0;W<arguments.length;W++)this.remove(arguments[W]);return this}let H=this.children.indexOf(E);if(H!==-1)E.parent=null,this.children.splice(H,1),E.dispatchEvent(WZ),I6.child=E,this.dispatchEvent(I6),I6.child=null;return this}removeFromParent(){let E=this.parent;if(E!==null)E.remove(this);return this}clear(){return this.remove(...this.children)}attach(E){if(this.updateWorldMatrix(!0,!1),iH.copy(this.matrixWorld).invert(),E.parent!==null)E.parent.updateWorldMatrix(!0,!1),iH.multiply(E.parent.matrixWorld);return E.applyMatrix4(iH),E.removeFromParent(),E.parent=this,this.children.push(E),E.updateWorldMatrix(!1,!0),E.dispatchEvent(lJ),RW.child=E,this.dispatchEvent(RW),RW.child=null,this}getObjectById(E){return this.getObjectByProperty("id",E)}getObjectByName(E){return this.getObjectByProperty("name",E)}getObjectByProperty(E,H){if(this[E]===H)return this;for(let W=0,R=this.children.length;W<R;W++){let Q=this.children[W].getObjectByProperty(E,H);if(Q!==void 0)return Q}return}getObjectsByProperty(E,H,W=[]){if(this[E]===H)W.push(this);let R=this.children;for(let J=0,Q=R.length;J<Q;J++)R[J].getObjectsByProperty(E,H,W);return W}getWorldPosition(E){return this.updateWorldMatrix(!0,!1),E.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(E){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yW,E,EZ),E}getWorldScale(E){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yW,HZ,E),E}getWorldDirection(E){this.updateWorldMatrix(!0,!1);let H=this.matrixWorld.elements;return E.set(H[8],H[9],H[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(E){E(this);let H=this.children;for(let W=0,R=H.length;W<R;W++)H[W].traverse(E)}traverseVisible(E){if(this.visible===!1)return;E(this);let H=this.children;for(let W=0,R=H.length;W<R;W++)H[W].traverseVisible(E)}traverseAncestors(E){let H=this.parent;if(H!==null)E(H),H.traverseAncestors(E)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let E=this.pivot;if(E!==null){let{x:H,y:W,z:R}=E,J=this.matrix.elements;J[12]+=H-J[0]*H-J[4]*W-J[8]*R,J[13]+=W-J[1]*H-J[5]*W-J[9]*R,J[14]+=R-J[2]*H-J[6]*W-J[10]*R}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(E){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||E){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,E=!0}let H=this.children;for(let W=0,R=H.length;W<R;W++)H[W].updateMatrixWorld(E)}updateWorldMatrix(E,H,W=!1){let R=this.parent;if(E===!0&&R!==null)R.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||W){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,W=!0}if(H===!0){let J=this.children;for(let Q=0,$=J.length;Q<$;Q++)J[Q].updateWorldMatrix(!1,!0,W)}}toJSON(E){let H=E===void 0||typeof E==="string",W={};if(H)E={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},W.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let R={};if(R.uuid=this.uuid,R.type=this.type,R.name=this.name,R.castShadow=this.castShadow,R.receiveShadow=this.receiveShadow,R.visible=this.visible,R.frustumCulled=this.frustumCulled,R.renderOrder=this.renderOrder,R.static=this.static,R.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)R.userData=this.userData;if(R.layers=this.layers.mask,R.matrix=this.matrix.toArray(),R.up=this.up.toArray(),this.pivot!==null)R.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)R.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)R.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(R.type="InstancedMesh",R.count=this.count,R.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)R.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(R.type="BatchedMesh",R.perObjectFrustumCulled=this.perObjectFrustumCulled,R.sortObjects=this.sortObjects,R.drawRanges=this._drawRanges,R.reservedRanges=this._reservedRanges,R.geometryInfo=this._geometryInfo.map(($)=>({...$,boundingBox:$.boundingBox?$.boundingBox.toJSON():void 0,boundingSphere:$.boundingSphere?$.boundingSphere.toJSON():void 0})),R.instanceInfo=this._instanceInfo.map(($)=>({...$})),R.availableInstanceIds=this._availableInstanceIds.slice(),R.availableGeometryIds=this._availableGeometryIds.slice(),R.nextIndexStart=this._nextIndexStart,R.nextVertexStart=this._nextVertexStart,R.geometryCount=this._geometryCount,R.maxInstanceCount=this._maxInstanceCount,R.maxVertexCount=this._maxVertexCount,R.maxIndexCount=this._maxIndexCount,R.geometryInitialized=this._geometryInitialized,R.matricesTexture=this._matricesTexture.toJSON(E),R.indirectTexture=this._indirectTexture.toJSON(E),this._colorsTexture!==null)R.colorsTexture=this._colorsTexture.toJSON(E);if(this.boundingSphere!==null)R.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)R.boundingBox=this.boundingBox.toJSON()}function J($,Z){if($[Z.uuid]===void 0)$[Z.uuid]=Z.toJSON(E);return Z.uuid}if(this.isScene){if(this.background){if(this.background.isColor)R.background=this.background.toJSON();else if(this.background.isTexture)R.background=this.background.toJSON(E).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)R.environment=this.environment.toJSON(E).uuid}else if(this.isMesh||this.isLine||this.isPoints){R.geometry=J(E.geometries,this.geometry);let $=this.geometry.parameters;if($!==void 0&&$.shapes!==void 0){let Z=$.shapes;if(Array.isArray(Z))for(let K=0,U=Z.length;K<U;K++){let X=Z[K];J(E.shapes,X)}else J(E.shapes,Z)}}if(this.isSkinnedMesh){if(R.bindMode=this.bindMode,R.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)J(E.skeletons,this.skeleton),R.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let $=[];for(let Z=0,K=this.material.length;Z<K;Z++)$.push(J(E.materials,this.material[Z]));R.material=$}else R.material=J(E.materials,this.material);if(this.children.length>0){R.children=[];for(let $=0;$<this.children.length;$++)R.children.push(this.children[$].toJSON(E).object)}if(this.animations.length>0){R.animations=[];for(let $=0;$<this.animations.length;$++){let Z=this.animations[$];R.animations.push(J(E.animations,Z))}}if(H){let $=Q(E.geometries),Z=Q(E.materials),K=Q(E.textures),U=Q(E.images),X=Q(E.shapes),Y=Q(E.skeletons),G=Q(E.animations),D=Q(E.nodes);if($.length>0)W.geometries=$;if(Z.length>0)W.materials=Z;if(K.length>0)W.textures=K;if(U.length>0)W.images=U;if(X.length>0)W.shapes=X;if(Y.length>0)W.skeletons=Y;if(G.length>0)W.animations=G;if(D.length>0)W.nodes=D}return W.object=R,W;function Q($){let Z=[];for(let K in $){let U=$[K];delete U.metadata,Z.push(U)}return Z}}clone(E){return new this.constructor().copy(this,E)}copy(E,H=!0){if(this.name=E.name,this.up.copy(E.up),this.position.copy(E.position),this.rotation.order=E.rotation.order,this.quaternion.copy(E.quaternion),this.scale.copy(E.scale),this.pivot=E.pivot!==null?E.pivot.clone():null,this.matrix.copy(E.matrix),this.matrixWorld.copy(E.matrixWorld),this.matrixAutoUpdate=E.matrixAutoUpdate,this.matrixWorldAutoUpdate=E.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=E.matrixWorldNeedsUpdate,this.layers.mask=E.layers.mask,this.visible=E.visible,this.castShadow=E.castShadow,this.receiveShadow=E.receiveShadow,this.frustumCulled=E.frustumCulled,this.renderOrder=E.renderOrder,this.static=E.static,this.animations=E.animations.slice(),this.userData=JSON.parse(JSON.stringify(E.userData)),H===!0)for(let W=0;W<E.children.length;W++){let R=E.children[W];this.add(R.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}WH.DEFAULT_UP=new b(0,1,0);WH.DEFAULT_MATRIX_AUTO_UPDATE=!0;WH.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class dE extends WH{constructor(){super();this.isGroup=!0,this.type="Group"}}var RZ={type:"move"};class sW{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new dE,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new dE,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new dE,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(E){if(this._targetRay!==null)this._targetRay.dispatchEvent(E);if(this._grip!==null)this._grip.dispatchEvent(E);if(this._hand!==null)this._hand.dispatchEvent(E);return this}connect(E){if(E&&E.hand){let H=this._hand;if(H)for(let W of E.hand.values())this._getHandJoint(H,W)}return this.dispatchEvent({type:"connected",data:E}),this}disconnect(E){if(this.dispatchEvent({type:"disconnected",data:E}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(E,H,W){let R=null,J=null,Q=null,$=this._targetRay,Z=this._grip,K=this._hand;if(E&&H.session.visibilityState!=="visible-blurred"){if(K&&E.hand){Q=!0;for(let F of E.hand.values()){let w=H.getJointPose(F,W),C=this._getHandJoint(K,F);if(w!==null)C.matrix.fromArray(w.transform.matrix),C.matrix.decompose(C.position,C.rotation,C.scale),C.matrixWorldNeedsUpdate=!0,C.jointRadius=w.radius;C.visible=w!==null}let U=K.joints["index-finger-tip"],X=K.joints["thumb-tip"],Y=U.position.distanceTo(X.position),G=0.02,D=0.005;if(K.inputState.pinching&&Y>G+D)K.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:E.handedness,target:this});else if(!K.inputState.pinching&&Y<=G-D)K.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:E.handedness,target:this})}else if(Z!==null&&E.gripSpace){if(J=H.getPose(E.gripSpace,W),J!==null){if(Z.matrix.fromArray(J.transform.matrix),Z.matrix.decompose(Z.position,Z.rotation,Z.scale),Z.matrixWorldNeedsUpdate=!0,J.linearVelocity)Z.hasLinearVelocity=!0,Z.linearVelocity.copy(J.linearVelocity);else Z.hasLinearVelocity=!1;if(J.angularVelocity)Z.hasAngularVelocity=!0,Z.angularVelocity.copy(J.angularVelocity);else Z.hasAngularVelocity=!1;if(Z.eventsEnabled)Z.dispatchEvent({type:"gripUpdated",data:E,target:this})}}if($!==null){if(R=H.getPose(E.targetRaySpace,W),R===null&&J!==null)R=J;if(R!==null){if($.matrix.fromArray(R.transform.matrix),$.matrix.decompose($.position,$.rotation,$.scale),$.matrixWorldNeedsUpdate=!0,R.linearVelocity)$.hasLinearVelocity=!0,$.linearVelocity.copy(R.linearVelocity);else $.hasLinearVelocity=!1;if(R.angularVelocity)$.hasAngularVelocity=!0,$.angularVelocity.copy(R.angularVelocity);else $.hasAngularVelocity=!1;this.dispatchEvent(RZ)}}}if($!==null)$.visible=R!==null;if(Z!==null)Z.visible=J!==null;if(K!==null)K.visible=Q!==null;return this}_getHandJoint(E,H){if(E.joints[H.jointName]===void 0){let W=new dE;W.matrixAutoUpdate=!1,W.visible=!1,E.joints[H.jointName]=W,E.add(W)}return E.joints[H.jointName]}}var HQ={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},X8={h:0,s:0,l:0},C7={h:0,s:0,l:0};function _6(E,H,W){if(W<0)W+=1;if(W>1)W-=1;if(W<0.16666666666666666)return E+(H-E)*6*W;if(W<0.5)return H;if(W<0.6666666666666666)return E+(H-E)*6*(0.6666666666666666-W);return E}class e{constructor(E,H,W){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(E,H,W)}set(E,H,W){if(H===void 0&&W===void 0){let R=E;if(R&&R.isColor)this.copy(R);else if(typeof R==="number")this.setHex(R);else if(typeof R==="string")this.setStyle(R)}else this.setRGB(E,H,W);return this}setScalar(E){return this.r=E,this.g=E,this.b=E,this}setHex(E,H="srgb"){return E=Math.floor(E),this.r=(E>>16&255)/255,this.g=(E>>8&255)/255,this.b=(E&255)/255,a0.colorSpaceToWorking(this,H),this}setRGB(E,H,W,R=a0.workingColorSpace){return this.r=E,this.g=H,this.b=W,a0.colorSpaceToWorking(this,R),this}setHSL(E,H,W,R=a0.workingColorSpace){if(E=s$(E,1),H=t0(H,0,1),W=t0(W,0,1),H===0)this.r=this.g=this.b=W;else{let J=W<=0.5?W*(1+H):W+H-W*H,Q=2*W-J;this.r=_6(Q,J,E+0.3333333333333333),this.g=_6(Q,J,E),this.b=_6(Q,J,E-0.3333333333333333)}return a0.colorSpaceToWorking(this,R),this}setStyle(E,H="srgb"){function W(J){if(J===void 0)return;if(parseFloat(J)<1)h0("Color: Alpha component of "+E+" will be ignored.")}let R;if(R=/^(\w+)\(([^\)]*)\)/.exec(E)){let J,Q=R[1],$=R[2];switch(Q){case"rgb":case"rgba":if(J=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec($))return W(J[4]),this.setRGB(Math.min(255,parseInt(J[1],10))/255,Math.min(255,parseInt(J[2],10))/255,Math.min(255,parseInt(J[3],10))/255,H);if(J=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec($))return W(J[4]),this.setRGB(Math.min(100,parseInt(J[1],10))/100,Math.min(100,parseInt(J[2],10))/100,Math.min(100,parseInt(J[3],10))/100,H);break;case"hsl":case"hsla":if(J=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec($))return W(J[4]),this.setHSL(parseFloat(J[1])/360,parseFloat(J[2])/100,parseFloat(J[3])/100,H);break;default:h0("Color: Unknown color model "+E)}}else if(R=/^\#([A-Fa-f\d]+)$/.exec(E)){let J=R[1],Q=J.length;if(Q===3)return this.setRGB(parseInt(J.charAt(0),16)/15,parseInt(J.charAt(1),16)/15,parseInt(J.charAt(2),16)/15,H);else if(Q===6)return this.setHex(parseInt(J,16),H);else h0("Color: Invalid hex color "+E)}else if(E&&E.length>0)return this.setColorName(E,H);return this}setColorName(E,H="srgb"){let W=HQ[E.toLowerCase()];if(W!==void 0)this.setHex(W,H);else h0("Color: Unknown color "+E);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(E){return this.r=E.r,this.g=E.g,this.b=E.b,this}copySRGBToLinear(E){return this.r=eH(E.r),this.g=eH(E.g),this.b=eH(E.b),this}copyLinearToSRGB(E){return this.r=MW(E.r),this.g=MW(E.g),this.b=MW(E.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(E="srgb"){return a0.workingToColorSpace(oE.copy(this),E),Math.round(t0(oE.r*255,0,255))*65536+Math.round(t0(oE.g*255,0,255))*256+Math.round(t0(oE.b*255,0,255))}getHexString(E="srgb"){return("000000"+this.getHex(E).toString(16)).slice(-6)}getHSL(E,H=a0.workingColorSpace){a0.workingToColorSpace(oE.copy(this),H);let{r:W,g:R,b:J}=oE,Q=Math.max(W,R,J),$=Math.min(W,R,J),Z,K,U=($+Q)/2;if($===Q)Z=0,K=0;else{let X=Q-$;switch(K=U<=0.5?X/(Q+$):X/(2-Q-$),Q){case W:Z=(R-J)/X+(R<J?6:0);break;case R:Z=(J-W)/X+2;break;case J:Z=(W-R)/X+4;break}Z/=6}return E.h=Z,E.s=K,E.l=U,E}getRGB(E,H=a0.workingColorSpace){return a0.workingToColorSpace(oE.copy(this),H),E.r=oE.r,E.g=oE.g,E.b=oE.b,E}getStyle(E="srgb"){a0.workingToColorSpace(oE.copy(this),E);let{r:H,g:W,b:R}=oE;if(E!=="srgb")return`color(${E} ${H.toFixed(3)} ${W.toFixed(3)} ${R.toFixed(3)})`;return`rgb(${Math.round(H*255)},${Math.round(W*255)},${Math.round(R*255)})`}offsetHSL(E,H,W){return this.getHSL(X8),this.setHSL(X8.h+E,X8.s+H,X8.l+W)}add(E){return this.r+=E.r,this.g+=E.g,this.b+=E.b,this}addColors(E,H){return this.r=E.r+H.r,this.g=E.g+H.g,this.b=E.b+H.b,this}addScalar(E){return this.r+=E,this.g+=E,this.b+=E,this}sub(E){return this.r=Math.max(0,this.r-E.r),this.g=Math.max(0,this.g-E.g),this.b=Math.max(0,this.b-E.b),this}multiply(E){return this.r*=E.r,this.g*=E.g,this.b*=E.b,this}multiplyScalar(E){return this.r*=E,this.g*=E,this.b*=E,this}lerp(E,H){return this.r+=(E.r-this.r)*H,this.g+=(E.g-this.g)*H,this.b+=(E.b-this.b)*H,this}lerpColors(E,H,W){return this.r=E.r+(H.r-E.r)*W,this.g=E.g+(H.g-E.g)*W,this.b=E.b+(H.b-E.b)*W,this}lerpHSL(E,H){this.getHSL(X8),E.getHSL(C7);let W=V6(X8.h,C7.h,H),R=V6(X8.s,C7.s,H),J=V6(X8.l,C7.l,H);return this.setHSL(W,R,J),this}setFromVector3(E){return this.r=E.x,this.g=E.y,this.b=E.z,this}applyMatrix3(E){let H=this.r,W=this.g,R=this.b,J=E.elements;return this.r=J[0]*H+J[3]*W+J[6]*R,this.g=J[1]*H+J[4]*W+J[7]*R,this.b=J[2]*H+J[5]*W+J[8]*R,this}equals(E){return E.r===this.r&&E.g===this.g&&E.b===this.b}fromArray(E,H=0){return this.r=E[H],this.g=E[H+1],this.b=E[H+2],this}toArray(E=[],H=0){return E[H]=this.r,E[H+1]=this.g,E[H+2]=this.b,E}fromBufferAttribute(E,H){return this.r=E.getX(H),this.g=E.getY(H),this.b=E.getZ(H),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var oE=new e;e.NAMES=HQ;class DH extends WH{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new D8,this.environmentIntensity=1,this.environmentRotation=new D8,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(E,H){if(super.copy(E,H),E.background!==null)this.background=E.background.clone();if(E.environment!==null)this.environment=E.environment.clone();if(E.fog!==null)this.fog=E.fog.clone();if(this.backgroundBlurriness=E.backgroundBlurriness,this.backgroundIntensity=E.backgroundIntensity,this.backgroundRotation.copy(E.backgroundRotation),this.environmentIntensity=E.environmentIntensity,this.environmentRotation.copy(E.environmentRotation),E.overrideMaterial!==null)this.overrideMaterial=E.overrideMaterial.clone();return this.matrixAutoUpdate=E.matrixAutoUpdate,this}toJSON(E){let H=super.toJSON(E);if(this.fog!==null)H.object.fog=this.fog.toJSON();return H.object.backgroundBlurriness=this.backgroundBlurriness,H.object.backgroundIntensity=this.backgroundIntensity,H.object.backgroundRotation=this.backgroundRotation.toArray(),H.object.environmentIntensity=this.environmentIntensity,H.object.environmentRotation=this.environmentRotation.toArray(),H}}var _H=new b,oH=new b,S6=new b,aH=new b,JW=new b,QW=new b,mJ=new b,j6=new b,y6=new b,h6=new b,v6=new NE,f6=new NE,b6=new NE;class BH{constructor(E=new b,H=new b,W=new b){this.a=E,this.b=H,this.c=W}static getNormal(E,H,W,R){R.subVectors(W,H),_H.subVectors(E,H),R.cross(_H);let J=R.lengthSq();if(J>0)return R.multiplyScalar(1/Math.sqrt(J));return R.set(0,0,0)}static getBarycoord(E,H,W,R,J){_H.subVectors(R,H),oH.subVectors(W,H),S6.subVectors(E,H);let Q=_H.dot(_H),$=_H.dot(oH),Z=_H.dot(S6),K=oH.dot(oH),U=oH.dot(S6),X=Q*K-$*$;if(X===0)return J.set(0,0,0),null;let Y=1/X,G=(K*Z-$*U)*Y,D=(Q*U-$*Z)*Y;return J.set(1-G-D,D,G)}static containsPoint(E,H,W,R){if(this.getBarycoord(E,H,W,R,aH)===null)return!1;return aH.x>=0&&aH.y>=0&&aH.x+aH.y<=1}static getInterpolation(E,H,W,R,J,Q,$,Z){if(this.getBarycoord(E,H,W,R,aH)===null){if(Z.x=0,Z.y=0,"z"in Z)Z.z=0;if("w"in Z)Z.w=0;return null}return Z.setScalar(0),Z.addScaledVector(J,aH.x),Z.addScaledVector(Q,aH.y),Z.addScaledVector($,aH.z),Z}static getInterpolatedAttribute(E,H,W,R,J,Q){return v6.setScalar(0),f6.setScalar(0),b6.setScalar(0),v6.fromBufferAttribute(E,H),f6.fromBufferAttribute(E,W),b6.fromBufferAttribute(E,R),Q.setScalar(0),Q.addScaledVector(v6,J.x),Q.addScaledVector(f6,J.y),Q.addScaledVector(b6,J.z),Q}static isFrontFacing(E,H,W,R){return _H.subVectors(W,H),oH.subVectors(E,H),_H.cross(oH).dot(R)<0}set(E,H,W){return this.a.copy(E),this.b.copy(H),this.c.copy(W),this}setFromPointsAndIndices(E,H,W,R){return this.a.copy(E[H]),this.b.copy(E[W]),this.c.copy(E[R]),this}setFromAttributeAndIndices(E,H,W,R){return this.a.fromBufferAttribute(E,H),this.b.fromBufferAttribute(E,W),this.c.fromBufferAttribute(E,R),this}clone(){return new this.constructor().copy(this)}copy(E){return this.a.copy(E.a),this.b.copy(E.b),this.c.copy(E.c),this}getArea(){return _H.subVectors(this.c,this.b),oH.subVectors(this.a,this.b),_H.cross(oH).length()*0.5}getMidpoint(E){return E.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(E){return BH.getNormal(this.a,this.b,this.c,E)}getPlane(E){return E.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(E,H){return BH.getBarycoord(E,this.a,this.b,this.c,H)}getInterpolation(E,H,W,R,J){return BH.getInterpolation(E,this.a,this.b,this.c,H,W,R,J)}containsPoint(E){return BH.containsPoint(E,this.a,this.b,this.c)}isFrontFacing(E){return BH.isFrontFacing(this.a,this.b,this.c,E)}intersectsBox(E){return E.intersectsTriangle(this)}closestPointToPoint(E,H){let W=this.a,R=this.b,J=this.c,Q,$;JW.subVectors(R,W),QW.subVectors(J,W),j6.subVectors(E,W);let Z=JW.dot(j6),K=QW.dot(j6);if(Z<=0&&K<=0)return H.copy(W);y6.subVectors(E,R);let U=JW.dot(y6),X=QW.dot(y6);if(U>=0&&X<=U)return H.copy(R);let Y=Z*X-U*K;if(Y<=0&&Z>=0&&U<=0)return Q=Z/(Z-U),H.copy(W).addScaledVector(JW,Q);h6.subVectors(E,J);let G=JW.dot(h6),D=QW.dot(h6);if(D>=0&&G<=D)return H.copy(J);let F=G*K-Z*D;if(F<=0&&K>=0&&D<=0)return $=K/(K-D),H.copy(W).addScaledVector(QW,$);let w=U*D-G*X;if(w<=0&&X-U>=0&&G-D>=0)return mJ.subVectors(J,R),$=(X-U)/(X-U+(G-D)),H.copy(R).addScaledVector(mJ,$);let C=1/(w+F+Y);return Q=F*C,$=Y*C,H.copy(W).addScaledVector(JW,Q).addScaledVector(QW,$)}equals(E){return E.a.equals(this.a)&&E.b.equals(this.b)&&E.c.equals(this.c)}}class b8{constructor(E=new b(1/0,1/0,1/0),H=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=E,this.max=H}set(E,H){return this.min.copy(E),this.max.copy(H),this}setFromArray(E){this.makeEmpty();for(let H=0,W=E.length;H<W;H+=3)this.expandByPoint(SH.fromArray(E,H));return this}setFromBufferAttribute(E){this.makeEmpty();for(let H=0,W=E.count;H<W;H++)this.expandByPoint(SH.fromBufferAttribute(E,H));return this}setFromPoints(E){this.makeEmpty();for(let H=0,W=E.length;H<W;H++)this.expandByPoint(E[H]);return this}setFromCenterAndSize(E,H){let W=SH.copy(H).multiplyScalar(0.5);return this.min.copy(E).sub(W),this.max.copy(E).add(W),this}setFromObject(E,H=!1){return this.makeEmpty(),this.expandByObject(E,H)}clone(){return new this.constructor().copy(this)}copy(E){return this.min.copy(E.min),this.max.copy(E.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(E){return this.isEmpty()?E.set(0,0,0):E.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(E){return this.isEmpty()?E.set(0,0,0):E.subVectors(this.max,this.min)}expandByPoint(E){return this.min.min(E),this.max.max(E),this}expandByVector(E){return this.min.sub(E),this.max.add(E),this}expandByScalar(E){return this.min.addScalar(-E),this.max.addScalar(E),this}expandByObject(E,H=!1){E.updateWorldMatrix(!1,!1);let W=E.geometry;if(W!==void 0){let J=W.getAttribute("position");if(H===!0&&J!==void 0&&E.isInstancedMesh!==!0)for(let Q=0,$=J.count;Q<$;Q++){if(E.isMesh===!0)E.getVertexPosition(Q,SH);else SH.fromBufferAttribute(J,Q);SH.applyMatrix4(E.matrixWorld),this.expandByPoint(SH)}else{if(E.boundingBox!==void 0){if(E.boundingBox===null)E.computeBoundingBox();q7.copy(E.boundingBox)}else{if(W.boundingBox===null)W.computeBoundingBox();q7.copy(W.boundingBox)}q7.applyMatrix4(E.matrixWorld),this.union(q7)}}let R=E.children;for(let J=0,Q=R.length;J<Q;J++)this.expandByObject(R[J],H);return this}containsPoint(E){return E.x>=this.min.x&&E.x<=this.max.x&&E.y>=this.min.y&&E.y<=this.max.y&&E.z>=this.min.z&&E.z<=this.max.z}containsBox(E){return this.min.x<=E.min.x&&E.max.x<=this.max.x&&this.min.y<=E.min.y&&E.max.y<=this.max.y&&this.min.z<=E.min.z&&E.max.z<=this.max.z}getParameter(E,H){return H.set((E.x-this.min.x)/(this.max.x-this.min.x),(E.y-this.min.y)/(this.max.y-this.min.y),(E.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(E){return E.max.x>=this.min.x&&E.min.x<=this.max.x&&E.max.y>=this.min.y&&E.min.y<=this.max.y&&E.max.z>=this.min.z&&E.min.z<=this.max.z}intersectsSphere(E){return this.clampPoint(E.center,SH),SH.distanceToSquared(E.center)<=E.radius*E.radius}intersectsPlane(E){let H,W;if(E.normal.x>0)H=E.normal.x*this.min.x,W=E.normal.x*this.max.x;else H=E.normal.x*this.max.x,W=E.normal.x*this.min.x;if(E.normal.y>0)H+=E.normal.y*this.min.y,W+=E.normal.y*this.max.y;else H+=E.normal.y*this.max.y,W+=E.normal.y*this.min.y;if(E.normal.z>0)H+=E.normal.z*this.min.z,W+=E.normal.z*this.max.z;else H+=E.normal.z*this.max.z,W+=E.normal.z*this.min.z;return H<=-E.constant&&W>=-E.constant}intersectsTriangle(E){if(this.isEmpty())return!1;this.getCenter(hW),N7.subVectors(this.max,hW),$W.subVectors(E.a,hW),ZW.subVectors(E.b,hW),KW.subVectors(E.c,hW),G8.subVectors(ZW,$W),Y8.subVectors(KW,ZW),P8.subVectors($W,KW);let H=[0,-G8.z,G8.y,0,-Y8.z,Y8.y,0,-P8.z,P8.y,G8.z,0,-G8.x,Y8.z,0,-Y8.x,P8.z,0,-P8.x,-G8.y,G8.x,0,-Y8.y,Y8.x,0,-P8.y,P8.x,0];if(!x6(H,$W,ZW,KW,N7))return!1;if(H=[1,0,0,0,1,0,0,0,1],!x6(H,$W,ZW,KW,N7))return!1;return F7.crossVectors(G8,Y8),H=[F7.x,F7.y,F7.z],x6(H,$W,ZW,KW,N7)}clampPoint(E,H){return H.copy(E).clamp(this.min,this.max)}distanceToPoint(E){return this.clampPoint(E,SH).distanceTo(E)}getBoundingSphere(E){if(this.isEmpty())E.makeEmpty();else this.getCenter(E.center),E.radius=this.getSize(SH).length()*0.5;return E}intersect(E){if(this.min.max(E.min),this.max.min(E.max),this.isEmpty())this.makeEmpty();return this}union(E){return this.min.min(E.min),this.max.max(E.max),this}applyMatrix4(E){if(this.isEmpty())return this;return rH[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(E),rH[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(E),rH[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(E),rH[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(E),rH[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(E),rH[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(E),rH[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(E),rH[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(E),this.setFromPoints(rH),this}translate(E){return this.min.add(E),this.max.add(E),this}equals(E){return E.min.equals(this.min)&&E.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(E){return this.min.fromArray(E.min),this.max.fromArray(E.max),this}}var rH=[new b,new b,new b,new b,new b,new b,new b,new b],SH=new b,q7=new b8,$W=new b,ZW=new b,KW=new b,G8=new b,Y8=new b,P8=new b,hW=new b,N7=new b,F7=new b,z8=new b;function x6(E,H,W,R,J){for(let Q=0,$=E.length-3;Q<=$;Q+=3){z8.fromArray(E,Q);let Z=J.x*Math.abs(z8.x)+J.y*Math.abs(z8.y)+J.z*Math.abs(z8.z),K=H.dot(z8),U=W.dot(z8),X=R.dot(z8);if(Math.max(-Math.max(K,U,X),Math.min(K,U,X))>Z)return!1}return!0}var fE=new b,L7=new m0,JZ=0;class hE extends H8{constructor(E,H,W=!1){super();if(Array.isArray(E))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:JZ++}),this.name="",this.array=E,this.itemSize=H,this.count=E!==void 0?E.length/H:0,this.normalized=W,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(E){if(E===!0)this.version++}setUsage(E){return this.usage=E,this}addUpdateRange(E,H){this.updateRanges.push({start:E,count:H})}clearUpdateRanges(){this.updateRanges.length=0}copy(E){return this.name=E.name,this.array=new E.array.constructor(E.array),this.itemSize=E.itemSize,this.count=E.count,this.normalized=E.normalized,this.usage=E.usage,this.gpuType=E.gpuType,this}copyAt(E,H,W){E*=this.itemSize,W*=H.itemSize;for(let R=0,J=this.itemSize;R<J;R++)this.array[E+R]=H.array[W+R];return this}copyArray(E){return this.array.set(E),this}applyMatrix3(E){if(this.itemSize===2)for(let H=0,W=this.count;H<W;H++)L7.fromBufferAttribute(this,H),L7.applyMatrix3(E),this.setXY(H,L7.x,L7.y);else if(this.itemSize===3)for(let H=0,W=this.count;H<W;H++)fE.fromBufferAttribute(this,H),fE.applyMatrix3(E),this.setXYZ(H,fE.x,fE.y,fE.z);return this}applyMatrix4(E){for(let H=0,W=this.count;H<W;H++)fE.fromBufferAttribute(this,H),fE.applyMatrix4(E),this.setXYZ(H,fE.x,fE.y,fE.z);return this}applyNormalMatrix(E){for(let H=0,W=this.count;H<W;H++)fE.fromBufferAttribute(this,H),fE.applyNormalMatrix(E),this.setXYZ(H,fE.x,fE.y,fE.z);return this}transformDirection(E){for(let H=0,W=this.count;H<W;H++)fE.fromBufferAttribute(this,H),fE.transformDirection(E),this.setXYZ(H,fE.x,fE.y,fE.z);return this}set(E,H=0){return this.array.set(E,H),this}getComponent(E,H){let W=this.array[E*this.itemSize+H];if(this.normalized)W=jW(W,this.array);return W}setComponent(E,H,W){if(this.normalized)W=KH(W,this.array);return this.array[E*this.itemSize+H]=W,this}getX(E){let H=this.array[E*this.itemSize];if(this.normalized)H=jW(H,this.array);return H}setX(E,H){if(this.normalized)H=KH(H,this.array);return this.array[E*this.itemSize]=H,this}getY(E){let H=this.array[E*this.itemSize+1];if(this.normalized)H=jW(H,this.array);return H}setY(E,H){if(this.normalized)H=KH(H,this.array);return this.array[E*this.itemSize+1]=H,this}getZ(E){let H=this.array[E*this.itemSize+2];if(this.normalized)H=jW(H,this.array);return H}setZ(E,H){if(this.normalized)H=KH(H,this.array);return this.array[E*this.itemSize+2]=H,this}getW(E){let H=this.array[E*this.itemSize+3];if(this.normalized)H=jW(H,this.array);return H}setW(E,H){if(this.normalized)H=KH(H,this.array);return this.array[E*this.itemSize+3]=H,this}setXY(E,H,W){if(E*=this.itemSize,this.normalized)H=KH(H,this.array),W=KH(W,this.array);return this.array[E+0]=H,this.array[E+1]=W,this}setXYZ(E,H,W,R){if(E*=this.itemSize,this.normalized)H=KH(H,this.array),W=KH(W,this.array),R=KH(R,this.array);return this.array[E+0]=H,this.array[E+1]=W,this.array[E+2]=R,this}setXYZW(E,H,W,R,J){if(E*=this.itemSize,this.normalized)H=KH(H,this.array),W=KH(W,this.array),R=KH(R,this.array),J=KH(J,this.array);return this.array[E+0]=H,this.array[E+1]=W,this.array[E+2]=R,this.array[E+3]=J,this}onUpload(E){return this.onUploadCallback=E,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let E={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return E.name=this.name,E.usage=this.usage,E.gpuType=this.gpuType,E}dispose(){this.dispatchEvent({type:"dispose"})}}class t7 extends hE{constructor(E,H,W){super(new Uint16Array(E),H,W)}}class e7 extends hE{constructor(E,H,W){super(new Uint32Array(E),H,W)}}class RH extends hE{constructor(E,H,W){super(new Float32Array(E),H,W)}}var QZ=new b8,vW=new b,g6=new b;class TH{constructor(E=new b,H=-1){this.isSphere=!0,this.center=E,this.radius=H}set(E,H){return this.center.copy(E),this.radius=H,this}setFromPoints(E,H){let W=this.center;if(H!==void 0)W.copy(H);else QZ.setFromPoints(E).getCenter(W);let R=0;for(let J=0,Q=E.length;J<Q;J++)R=Math.max(R,W.distanceToSquared(E[J]));return this.radius=Math.sqrt(R),this}copy(E){return this.center.copy(E.center),this.radius=E.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(E){return E.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(E){return E.distanceTo(this.center)-this.radius}intersectsSphere(E){let H=this.radius+E.radius;return E.center.distanceToSquared(this.center)<=H*H}intersectsBox(E){return E.intersectsSphere(this)}intersectsPlane(E){return Math.abs(E.distanceToPoint(this.center))<=this.radius}clampPoint(E,H){let W=this.center.distanceToSquared(E);if(H.copy(E),W>this.radius*this.radius)H.sub(this.center).normalize(),H.multiplyScalar(this.radius).add(this.center);return H}getBoundingBox(E){if(this.isEmpty())return E.makeEmpty(),E;return E.set(this.center,this.center),E.expandByScalar(this.radius),E}applyMatrix4(E){return this.center.applyMatrix4(E),this.radius=this.radius*E.getMaxScaleOnAxis(),this}translate(E){return this.center.add(E),this}expandByPoint(E){if(this.isEmpty())return this.center.copy(E),this.radius=0,this;vW.subVectors(E,this.center);let H=vW.lengthSq();if(H>this.radius*this.radius){let W=Math.sqrt(H),R=(W-this.radius)*0.5;this.center.addScaledVector(vW,R/W),this.radius+=R}return this}union(E){if(E.isEmpty())return this;if(this.isEmpty())return this.copy(E),this;if(this.center.equals(E.center)===!0)this.radius=Math.max(this.radius,E.radius);else g6.subVectors(E.center,this.center).setLength(E.radius),this.expandByPoint(vW.copy(E.center).add(g6)),this.expandByPoint(vW.copy(E.center).sub(g6));return this}equals(E){return E.center.equals(this.center)&&E.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(E){return this.radius=E.radius,this.center.fromArray(E.center),this}}var $Z=0,OH=new AE,p6=new WH,UW=new b,YH=new b8,fW=new b8,uE=new b;class WE extends H8{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$Z++}),this.uuid=cW(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(E){if(Array.isArray(E))this.index=new((c$(E))?e7:t7)(E,1);else this.index=E;return this}setIndirect(E,H=0){return this.indirect=E,this.indirectOffset=H,this}getIndirect(){return this.indirect}getAttribute(E){return this.attributes[E]}setAttribute(E,H){return this.attributes[E]=H,this}deleteAttribute(E){return delete this.attributes[E],this}hasAttribute(E){return this.attributes[E]!==void 0}addGroup(E,H,W=0){this.groups.push({start:E,count:H,materialIndex:W})}clearGroups(){this.groups=[]}setDrawRange(E,H){this.drawRange.start=E,this.drawRange.count=H}applyMatrix4(E){let H=this.attributes.position;if(H!==void 0)H.applyMatrix4(E),H.needsUpdate=!0;let W=this.attributes.normal;if(W!==void 0){let J=new p0().getNormalMatrix(E);W.applyNormalMatrix(J),W.needsUpdate=!0}let R=this.attributes.tangent;if(R!==void 0)R.transformDirection(E),R.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(E){return OH.makeRotationFromQuaternion(E),this.applyMatrix4(OH),this}rotateX(E){return OH.makeRotationX(E),this.applyMatrix4(OH),this}rotateY(E){return OH.makeRotationY(E),this.applyMatrix4(OH),this}rotateZ(E){return OH.makeRotationZ(E),this.applyMatrix4(OH),this}translate(E,H,W){return OH.makeTranslation(E,H,W),this.applyMatrix4(OH),this}scale(E,H,W){return OH.makeScale(E,H,W),this.applyMatrix4(OH),this}lookAt(E){return p6.lookAt(E),p6.updateMatrix(),this.applyMatrix4(p6.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(UW).negate(),this.translate(UW.x,UW.y,UW.z),this}setFromPoints(E){let H=this.getAttribute("position");if(H===void 0){let W=[];for(let R=0,J=E.length;R<J;R++){let Q=E[R];W.push(Q.x,Q.y,Q.z||0)}this.setAttribute("position",new RH(W,3))}else{let W=Math.min(E.length,H.count);for(let R=0;R<W;R++){let J=E[R];H.setXYZ(R,J.x,J.y,J.z||0)}if(E.length>H.count)h0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");H.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new b8;let E=this.attributes.position,H=this.morphAttributes.position;if(E&&E.isGLBufferAttribute){g0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(E!==void 0){if(this.boundingBox.setFromBufferAttribute(E),H)for(let W=0,R=H.length;W<R;W++){let J=H[W];if(YH.setFromBufferAttribute(J),this.morphTargetsRelative)uE.addVectors(this.boundingBox.min,YH.min),this.boundingBox.expandByPoint(uE),uE.addVectors(this.boundingBox.max,YH.max),this.boundingBox.expandByPoint(uE);else this.boundingBox.expandByPoint(YH.min),this.boundingBox.expandByPoint(YH.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))g0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new TH;let E=this.attributes.position,H=this.morphAttributes.position;if(E&&E.isGLBufferAttribute){g0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(E){let W=this.boundingSphere.center;if(YH.setFromBufferAttribute(E),H)for(let J=0,Q=H.length;J<Q;J++){let $=H[J];if(fW.setFromBufferAttribute($),this.morphTargetsRelative)uE.addVectors(YH.min,fW.min),YH.expandByPoint(uE),uE.addVectors(YH.max,fW.max),YH.expandByPoint(uE);else YH.expandByPoint(fW.min),YH.expandByPoint(fW.max)}YH.getCenter(W);let R=0;for(let J=0,Q=E.count;J<Q;J++)uE.fromBufferAttribute(E,J),R=Math.max(R,W.distanceToSquared(uE));if(H)for(let J=0,Q=H.length;J<Q;J++){let $=H[J],Z=this.morphTargetsRelative;for(let K=0,U=$.count;K<U;K++){if(uE.fromBufferAttribute($,K),Z)UW.fromBufferAttribute(E,K),uE.add(UW);R=Math.max(R,W.distanceToSquared(uE))}}if(this.boundingSphere.radius=Math.sqrt(R),isNaN(this.boundingSphere.radius))g0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let E=this.index,H=this.attributes;if(E===null||H.position===void 0||H.normal===void 0||H.uv===void 0){g0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:W,normal:R,uv:J}=H,Q=this.getAttribute("tangent");if(Q===void 0||Q.count!==W.count)Q=new hE(new Float32Array(4*W.count),4),this.setAttribute("tangent",Q);let $=[],Z=[];for(let A=0;A<W.count;A++)$[A]=new b,Z[A]=new b;let K=new b,U=new b,X=new b,Y=new m0,G=new m0,D=new m0,F=new b,w=new b;function C(A,L,k){K.fromBufferAttribute(W,A),U.fromBufferAttribute(W,L),X.fromBufferAttribute(W,k),Y.fromBufferAttribute(J,A),G.fromBufferAttribute(J,L),D.fromBufferAttribute(J,k),U.sub(K),X.sub(K),G.sub(Y),D.sub(Y);let c=1/(G.x*D.y-D.x*G.y);if(!isFinite(c))return;F.copy(U).multiplyScalar(D.y).addScaledVector(X,-G.y).multiplyScalar(c),w.copy(X).multiplyScalar(G.x).addScaledVector(U,-D.x).multiplyScalar(c),$[A].add(F),$[L].add(F),$[k].add(F),Z[A].add(w),Z[L].add(w),Z[k].add(w)}let M=this.groups;if(M.length===0)M=[{start:0,count:E.count}];for(let A=0,L=M.length;A<L;++A){let k=M[A],c=k.start,h=k.count;for(let v=c,d=c+h;v<d;v+=3)C(E.getX(v+0),E.getX(v+1),E.getX(v+2))}let T=new b,y=new b,B=new b,V=new b;function P(A){B.fromBufferAttribute(R,A),V.copy(B);let L=$[A];T.copy(L),T.sub(B.multiplyScalar(B.dot(L))).normalize(),y.crossVectors(V,L);let c=y.dot(Z[A])<0?-1:1;Q.setXYZW(A,T.x,T.y,T.z,c)}for(let A=0,L=M.length;A<L;++A){let k=M[A],c=k.start,h=k.count;for(let v=c,d=c+h;v<d;v+=3)P(E.getX(v+0)),P(E.getX(v+1)),P(E.getX(v+2))}this._transformed=!0}computeVertexNormals(){let E=this.index,H=this.getAttribute("position");if(H!==void 0){let W=this.getAttribute("normal");if(W===void 0||W.count!==H.count)W=new hE(new Float32Array(H.count*3),3),this.setAttribute("normal",W);else for(let Y=0,G=W.count;Y<G;Y++)W.setXYZ(Y,0,0,0);let R=new b,J=new b,Q=new b,$=new b,Z=new b,K=new b,U=new b,X=new b;if(E)for(let Y=0,G=E.count;Y<G;Y+=3){let D=E.getX(Y+0),F=E.getX(Y+1),w=E.getX(Y+2);R.fromBufferAttribute(H,D),J.fromBufferAttribute(H,F),Q.fromBufferAttribute(H,w),U.subVectors(Q,J),X.subVectors(R,J),U.cross(X),$.fromBufferAttribute(W,D),Z.fromBufferAttribute(W,F),K.fromBufferAttribute(W,w),$.add(U),Z.add(U),K.add(U),W.setXYZ(D,$.x,$.y,$.z),W.setXYZ(F,Z.x,Z.y,Z.z),W.setXYZ(w,K.x,K.y,K.z)}else for(let Y=0,G=H.count;Y<G;Y+=3)R.fromBufferAttribute(H,Y+0),J.fromBufferAttribute(H,Y+1),Q.fromBufferAttribute(H,Y+2),U.subVectors(Q,J),X.subVectors(R,J),U.cross(X),W.setXYZ(Y+0,U.x,U.y,U.z),W.setXYZ(Y+1,U.x,U.y,U.z),W.setXYZ(Y+2,U.x,U.y,U.z);this.normalizeNormals(),W.needsUpdate=!0}}normalizeNormals(){let E=this.attributes.normal;for(let H=0,W=E.count;H<W;H++)uE.fromBufferAttribute(E,H),uE.normalize(),E.setXYZ(H,uE.x,uE.y,uE.z)}toNonIndexed(){function E($,Z){let{array:K,itemSize:U,normalized:X}=$,Y=new K.constructor(Z.length*U),G=0,D=0;for(let F=0,w=Z.length;F<w;F++){if($.isInterleavedBufferAttribute)G=Z[F]*$.data.stride+$.offset;else G=Z[F]*U;for(let C=0;C<U;C++)Y[D++]=K[G++]}return new hE(Y,U,X)}if(this.index===null)return h0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let H=new WE,W=this.index.array,R=this.attributes;for(let $ in R){let Z=R[$],K=E(Z,W);H.setAttribute($,K)}let J=this.morphAttributes;for(let $ in J){let Z=[],K=J[$];for(let U=0,X=K.length;U<X;U++){let Y=K[U],G=E(Y,W);Z.push(G)}H.morphAttributes[$]=Z}H.morphTargetsRelative=this.morphTargetsRelative;let Q=this.groups;for(let $=0,Z=Q.length;$<Z;$++){let K=Q[$];H.addGroup(K.start,K.count,K.materialIndex)}return H}toJSON(){let E={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(E.uuid=this.uuid,E.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,E.name=this.name,Object.keys(this.userData).length>0)E.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Z=this.parameters;for(let K in Z)if(Z[K]!==void 0)E[K]=Z[K];return E}E.data={attributes:{}};let H=this.index;if(H!==null)E.data.index={type:H.array.constructor.name,array:Array.prototype.slice.call(H.array)};let W=this.attributes;for(let Z in W){let K=W[Z];E.data.attributes[Z]=K.toJSON(E.data)}let R={},J=!1;for(let Z in this.morphAttributes){let K=this.morphAttributes[Z],U=[];for(let X=0,Y=K.length;X<Y;X++){let G=K[X];U.push(G.toJSON(E.data))}if(U.length>0)R[Z]=U,J=!0}if(J)E.data.morphAttributes=R,E.data.morphTargetsRelative=this.morphTargetsRelative;let Q=this.groups;if(Q.length>0)E.data.groups=JSON.parse(JSON.stringify(Q));let $=this.boundingSphere;if($!==null)E.data.boundingSphere=$.toJSON();return E}clone(){return new this.constructor().copy(this)}copy(E){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let H={};this.name=E.name;let W=E.index;if(W!==null)this.setIndex(W.clone());let R=E.attributes;for(let K in R){let U=R[K];this.setAttribute(K,U.clone(H))}let J=E.morphAttributes;for(let K in J){let U=[],X=J[K];for(let Y=0,G=X.length;Y<G;Y++)U.push(X[Y].clone(H));this.morphAttributes[K]=U}this.morphTargetsRelative=E.morphTargetsRelative;let Q=E.groups;for(let K=0,U=Q.length;K<U;K++){let X=Q[K];this.addGroup(X.start,X.count,X.materialIndex)}let $=E.boundingBox;if($!==null)this.boundingBox=$.clone();let Z=E.boundingSphere;if(Z!==null)this.boundingSphere=Z.clone();return this.drawRange.start=E.drawRange.start,this.drawRange.count=E.drawRange.count,this.userData=E.userData,this._transformed=E._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}var l6=new b,ZZ=new b,KZ=new p0;class pH{constructor(E=new b(1,0,0),H=0){this.isPlane=!0,this.normal=E,this.constant=H}set(E,H){return this.normal.copy(E),this.constant=H,this}setComponents(E,H,W,R){return this.normal.set(E,H,W),this.constant=R,this}setFromNormalAndCoplanarPoint(E,H){return this.normal.copy(E),this.constant=-H.dot(this.normal),this}setFromCoplanarPoints(E,H,W){let R=l6.subVectors(W,H).cross(ZZ.subVectors(E,H)).normalize();return this.setFromNormalAndCoplanarPoint(R,E),this}copy(E){return this.normal.copy(E.normal),this.constant=E.constant,this}normalize(){let E=1/this.normal.length();return this.normal.multiplyScalar(E),this.constant*=E,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(E){return this.normal.dot(E)+this.constant}distanceToSphere(E){return this.distanceToPoint(E.center)-E.radius}projectPoint(E,H){return H.copy(E).addScaledVector(this.normal,-this.distanceToPoint(E))}intersectLine(E,H,W=!0){let R=E.delta(l6),J=this.normal.dot(R);if(J===0){if(this.distanceToPoint(E.start)===0)return H.copy(E.start);return null}let Q=-(E.start.dot(this.normal)+this.constant)/J;if(W===!0&&(Q<0||Q>1))return null;return H.copy(E.start).addScaledVector(R,Q)}intersectsLine(E){let H=this.distanceToPoint(E.start),W=this.distanceToPoint(E.end);return H<0&&W>0||W<0&&H>0}intersectsBox(E){return E.intersectsPlane(this)}intersectsSphere(E){return E.intersectsPlane(this)}coplanarPoint(E){return E.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(E,H){let W=H||KZ.getNormalMatrix(E),R=this.coplanarPoint(l6).applyMatrix4(E),J=this.normal.applyMatrix3(W).normalize();return this.constant=-R.dot(J),this}translate(E){return this.constant-=E.dot(this.normal),this}equals(E){return E.normal.equals(this.normal)&&E.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(E){return this.normal.fromArray(E.normal),this.constant=E.constant,this}}var UZ=0;class x8 extends H8{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:UZ++}),this.uuid=cW(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new e(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(E){if(this._alphaTest>0!==E>0)this.version++;this._alphaTest=E}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(E){if(E===void 0)return;for(let H in E){let W=E[H];if(W===void 0){h0(`Material: parameter '${H}' has value of undefined.`);continue}let R=this[H];if(R===void 0){h0(`Material: '${H}' is not a property of THREE.${this.type}.`);continue}if(R&&R.isColor)R.set(W);else if(R&&R.isVector2&&(W&&W.isVector2)||R&&R.isEuler&&(W&&W.isEuler)||R&&R.isVector3&&(W&&W.isVector3))R.copy(W);else this[H]=W}}toJSON(E){let H=E===void 0||typeof E==="string";if(H)E={textures:{},images:{}};let W={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if(W.uuid=this.uuid,W.type=this.type,W.blending=this.blending,W.side=this.side,W.shadowSide=this.shadowSide,W.vertexColors=this.vertexColors,W.opacity=this.opacity,W.transparent=this.transparent,W.blendSrc=this.blendSrc,W.blendDst=this.blendDst,W.blendEquation=this.blendEquation,W.blendSrcAlpha=this.blendSrcAlpha,W.blendDstAlpha=this.blendDstAlpha,W.blendEquationAlpha=this.blendEquationAlpha,W.blendColor=this.blendColor.getHex(),W.blendAlpha=this.blendAlpha,W.depthFunc=this.depthFunc,W.depthTest=this.depthTest,W.depthWrite=this.depthWrite,W.colorWrite=this.colorWrite,W.clipIntersection=this.clipIntersection,W.clipShadows=this.clipShadows,W.stencilWriteMask=this.stencilWriteMask,W.stencilFunc=this.stencilFunc,W.stencilRef=this.stencilRef,W.stencilFuncMask=this.stencilFuncMask,W.stencilFail=this.stencilFail,W.stencilZFail=this.stencilZFail,W.stencilZPass=this.stencilZPass,W.stencilWrite=this.stencilWrite,W.polygonOffset=this.polygonOffset,W.polygonOffsetFactor=this.polygonOffsetFactor,W.polygonOffsetUnits=this.polygonOffsetUnits,W.dithering=this.dithering,W.alphaTest=this.alphaTest,W.alphaHash=this.alphaHash,W.alphaToCoverage=this.alphaToCoverage,W.premultipliedAlpha=this.premultipliedAlpha,W.forceSinglePass=this.forceSinglePass,W.allowOverride=this.allowOverride,W.visible=this.visible,W.toneMapped=this.toneMapped,W.name=this.name,this.color&&this.color.isColor)W.color=this.color.getHex();if(this.roughness!==void 0)W.roughness=this.roughness;if(this.metalness!==void 0)W.metalness=this.metalness;if(this.sheen!==void 0)W.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)W.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)W.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)W.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)W.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)W.specular=this.specular.getHex();if(this.specularIntensity!==void 0)W.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)W.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)W.shininess=this.shininess;if(this.clearcoat!==void 0)W.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)W.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)W.clearcoatMap=this.clearcoatMap.toJSON(E).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)W.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(E).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)W.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(E).uuid,W.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)W.sheenColorMap=this.sheenColorMap.toJSON(E).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)W.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(E).uuid;if(this.dispersion!==void 0)W.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)W.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)W.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)W.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)W.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)W.iridescenceMap=this.iridescenceMap.toJSON(E).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)W.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(E).uuid;if(this.anisotropy!==void 0)W.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)W.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)W.anisotropyMap=this.anisotropyMap.toJSON(E).uuid;if(this.map&&this.map.isTexture)W.map=this.map.toJSON(E).uuid;if(this.matcap&&this.matcap.isTexture)W.matcap=this.matcap.toJSON(E).uuid;if(this.alphaMap&&this.alphaMap.isTexture)W.alphaMap=this.alphaMap.toJSON(E).uuid;if(this.lightMap&&this.lightMap.isTexture)W.lightMap=this.lightMap.toJSON(E).uuid,W.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)W.aoMap=this.aoMap.toJSON(E).uuid,W.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)W.bumpMap=this.bumpMap.toJSON(E).uuid,W.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)W.normalMap=this.normalMap.toJSON(E).uuid,W.normalMapType=this.normalMapType,W.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)W.displacementMap=this.displacementMap.toJSON(E).uuid,W.displacementScale=this.displacementScale,W.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)W.roughnessMap=this.roughnessMap.toJSON(E).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)W.metalnessMap=this.metalnessMap.toJSON(E).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)W.emissiveMap=this.emissiveMap.toJSON(E).uuid;if(this.specularMap&&this.specularMap.isTexture)W.specularMap=this.specularMap.toJSON(E).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)W.specularIntensityMap=this.specularIntensityMap.toJSON(E).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)W.specularColorMap=this.specularColorMap.toJSON(E).uuid;if(this.envMap&&this.envMap.isTexture){if(W.envMap=this.envMap.toJSON(E).uuid,this.combine!==void 0)W.combine=this.combine}if(this.envMapRotation!==void 0)W.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)W.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)W.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)W.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)W.gradientMap=this.gradientMap.toJSON(E).uuid;if(this.transmission!==void 0)W.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)W.transmissionMap=this.transmissionMap.toJSON(E).uuid;if(this.thickness!==void 0)W.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)W.thicknessMap=this.thicknessMap.toJSON(E).uuid;if(this.attenuationDistance!==void 0)W.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)W.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)W.size=this.size;if(this.sizeAttenuation!==void 0)W.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)W.clippingPlanes=this.clippingPlanes.map((J)=>J.toJSON());if(this.rotation!==void 0)W.rotation=this.rotation;if(this.depthPacking!==void 0)W.depthPacking=this.depthPacking;if(this.linewidth!==void 0)W.linewidth=this.linewidth;if(this.linecap!==void 0)W.linecap=this.linecap;if(this.linejoin!==void 0)W.linejoin=this.linejoin;if(this.dashSize!==void 0)W.dashSize=this.dashSize;if(this.gapSize!==void 0)W.gapSize=this.gapSize;if(this.scale!==void 0)W.scale=this.scale;if(this.wireframe!==void 0)W.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)W.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)W.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)W.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)W.flatShading=this.flatShading;if(this.fog!==void 0)W.fog=this.fog;if(Object.keys(this.userData).length>0)W.userData=this.userData;function R(J){let Q=[];for(let $ in J){let Z=J[$];delete Z.metadata,Q.push(Z)}return Q}if(H){let J=R(E.textures),Q=R(E.images);if(J.length>0)W.textures=J;if(Q.length>0)W.images=Q}return W}fromJSON(E,H){if(E.uuid!==void 0)this.uuid=E.uuid;if(E.name!==void 0)this.name=E.name;if(E.color!==void 0&&this.color!==void 0)this.color.setHex(E.color);if(E.roughness!==void 0)this.roughness=E.roughness;if(E.metalness!==void 0)this.metalness=E.metalness;if(E.sheen!==void 0)this.sheen=E.sheen;if(E.sheenColor!==void 0)this.sheenColor=new e().setHex(E.sheenColor);if(E.sheenRoughness!==void 0)this.sheenRoughness=E.sheenRoughness;if(E.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(E.emissive);if(E.specular!==void 0&&this.specular!==void 0)this.specular.setHex(E.specular);if(E.specularIntensity!==void 0)this.specularIntensity=E.specularIntensity;if(E.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(E.specularColor);if(E.shininess!==void 0)this.shininess=E.shininess;if(E.clearcoat!==void 0)this.clearcoat=E.clearcoat;if(E.clearcoatRoughness!==void 0)this.clearcoatRoughness=E.clearcoatRoughness;if(E.dispersion!==void 0)this.dispersion=E.dispersion;if(E.retroreflectivity!==void 0)this.retroreflectivity=E.retroreflectivity;if(E.iridescence!==void 0)this.iridescence=E.iridescence;if(E.iridescenceIOR!==void 0)this.iridescenceIOR=E.iridescenceIOR;if(E.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=E.iridescenceThicknessRange;if(E.transmission!==void 0)this.transmission=E.transmission;if(E.thickness!==void 0)this.thickness=E.thickness;if(E.attenuationDistance!==void 0)this.attenuationDistance=E.attenuationDistance;if(E.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(E.attenuationColor);if(E.anisotropy!==void 0)this.anisotropy=E.anisotropy;if(E.anisotropyRotation!==void 0)this.anisotropyRotation=E.anisotropyRotation;if(E.fog!==void 0)this.fog=E.fog;if(E.flatShading!==void 0)this.flatShading=E.flatShading;if(E.blending!==void 0)this.blending=E.blending;if(E.combine!==void 0)this.combine=E.combine;if(E.side!==void 0)this.side=E.side;if(E.shadowSide!==void 0)this.shadowSide=E.shadowSide;if(E.opacity!==void 0)this.opacity=E.opacity;if(E.transparent!==void 0)this.transparent=E.transparent;if(E.alphaTest!==void 0)this.alphaTest=E.alphaTest;if(E.alphaHash!==void 0)this.alphaHash=E.alphaHash;if(E.depthFunc!==void 0)this.depthFunc=E.depthFunc;if(E.depthTest!==void 0)this.depthTest=E.depthTest;if(E.depthWrite!==void 0)this.depthWrite=E.depthWrite;if(E.colorWrite!==void 0)this.colorWrite=E.colorWrite;if(E.clippingPlanes!==void 0)this.clippingPlanes=E.clippingPlanes.map((W)=>new pH().fromJSON(W));if(E.clipIntersection!==void 0)this.clipIntersection=E.clipIntersection;if(E.clipShadows!==void 0)this.clipShadows=E.clipShadows;if(E.depthPacking!==void 0)this.depthPacking=E.depthPacking;if(E.blendSrc!==void 0)this.blendSrc=E.blendSrc;if(E.blendDst!==void 0)this.blendDst=E.blendDst;if(E.blendEquation!==void 0)this.blendEquation=E.blendEquation;if(E.blendSrcAlpha!==void 0)this.blendSrcAlpha=E.blendSrcAlpha;if(E.blendDstAlpha!==void 0)this.blendDstAlpha=E.blendDstAlpha;if(E.blendEquationAlpha!==void 0)this.blendEquationAlpha=E.blendEquationAlpha;if(E.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(E.blendColor);if(E.blendAlpha!==void 0)this.blendAlpha=E.blendAlpha;if(E.stencilWriteMask!==void 0)this.stencilWriteMask=E.stencilWriteMask;if(E.stencilFunc!==void 0)this.stencilFunc=E.stencilFunc;if(E.stencilRef!==void 0)this.stencilRef=E.stencilRef;if(E.stencilFuncMask!==void 0)this.stencilFuncMask=E.stencilFuncMask;if(E.stencilFail!==void 0)this.stencilFail=E.stencilFail;if(E.stencilZFail!==void 0)this.stencilZFail=E.stencilZFail;if(E.stencilZPass!==void 0)this.stencilZPass=E.stencilZPass;if(E.stencilWrite!==void 0)this.stencilWrite=E.stencilWrite;if(E.wireframe!==void 0)this.wireframe=E.wireframe;if(E.wireframeLinewidth!==void 0)this.wireframeLinewidth=E.wireframeLinewidth;if(E.wireframeLinecap!==void 0)this.wireframeLinecap=E.wireframeLinecap;if(E.wireframeLinejoin!==void 0)this.wireframeLinejoin=E.wireframeLinejoin;if(E.rotation!==void 0)this.rotation=E.rotation;if(E.linewidth!==void 0)this.linewidth=E.linewidth;if(E.linecap!==void 0)this.linecap=E.linecap;if(E.linejoin!==void 0)this.linejoin=E.linejoin;if(E.dashSize!==void 0)this.dashSize=E.dashSize;if(E.gapSize!==void 0)this.gapSize=E.gapSize;if(E.scale!==void 0)this.scale=E.scale;if(E.polygonOffset!==void 0)this.polygonOffset=E.polygonOffset;if(E.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=E.polygonOffsetFactor;if(E.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=E.polygonOffsetUnits;if(E.dithering!==void 0)this.dithering=E.dithering;if(E.alphaToCoverage!==void 0)this.alphaToCoverage=E.alphaToCoverage;if(E.premultipliedAlpha!==void 0)this.premultipliedAlpha=E.premultipliedAlpha;if(E.forceSinglePass!==void 0)this.forceSinglePass=E.forceSinglePass;if(E.allowOverride!==void 0)this.allowOverride=E.allowOverride;if(E.visible!==void 0)this.visible=E.visible;if(E.toneMapped!==void 0)this.toneMapped=E.toneMapped;if(E.userData!==void 0)this.userData=E.userData;if(E.vertexColors!==void 0)if(typeof E.vertexColors==="number")this.vertexColors=E.vertexColors>0;else this.vertexColors=E.vertexColors;if(E.size!==void 0)this.size=E.size;if(E.sizeAttenuation!==void 0)this.sizeAttenuation=E.sizeAttenuation;if(E.map!==void 0)this.map=H[E.map]||null;if(E.matcap!==void 0)this.matcap=H[E.matcap]||null;if(E.alphaMap!==void 0)this.alphaMap=H[E.alphaMap]||null;if(E.bumpMap!==void 0)this.bumpMap=H[E.bumpMap]||null;if(E.bumpScale!==void 0)this.bumpScale=E.bumpScale;if(E.normalMap!==void 0)this.normalMap=H[E.normalMap]||null;if(E.normalMapType!==void 0)this.normalMapType=E.normalMapType;if(E.normalScale!==void 0){let W=E.normalScale;if(Array.isArray(W)===!1)W=[W,W];this.normalScale=new m0().fromArray(W)}if(E.displacementMap!==void 0)this.displacementMap=H[E.displacementMap]||null;if(E.displacementScale!==void 0)this.displacementScale=E.displacementScale;if(E.displacementBias!==void 0)this.displacementBias=E.displacementBias;if(E.roughnessMap!==void 0)this.roughnessMap=H[E.roughnessMap]||null;if(E.metalnessMap!==void 0)this.metalnessMap=H[E.metalnessMap]||null;if(E.emissiveMap!==void 0)this.emissiveMap=H[E.emissiveMap]||null;if(E.emissiveIntensity!==void 0)this.emissiveIntensity=E.emissiveIntensity;if(E.specularMap!==void 0)this.specularMap=H[E.specularMap]||null;if(E.specularIntensityMap!==void 0)this.specularIntensityMap=H[E.specularIntensityMap]||null;if(E.specularColorMap!==void 0)this.specularColorMap=H[E.specularColorMap]||null;if(E.envMap!==void 0)this.envMap=H[E.envMap]||null;if(E.envMapRotation!==void 0)this.envMapRotation.fromArray(E.envMapRotation);if(E.envMapIntensity!==void 0)this.envMapIntensity=E.envMapIntensity;if(E.reflectivity!==void 0)this.reflectivity=E.reflectivity;if(E.refractionRatio!==void 0)this.refractionRatio=E.refractionRatio;if(E.lightMap!==void 0)this.lightMap=H[E.lightMap]||null;if(E.lightMapIntensity!==void 0)this.lightMapIntensity=E.lightMapIntensity;if(E.aoMap!==void 0)this.aoMap=H[E.aoMap]||null;if(E.aoMapIntensity!==void 0)this.aoMapIntensity=E.aoMapIntensity;if(E.gradientMap!==void 0)this.gradientMap=H[E.gradientMap]||null;if(E.clearcoatMap!==void 0)this.clearcoatMap=H[E.clearcoatMap]||null;if(E.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=H[E.clearcoatRoughnessMap]||null;if(E.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=H[E.clearcoatNormalMap]||null;if(E.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new m0().fromArray(E.clearcoatNormalScale);if(E.iridescenceMap!==void 0)this.iridescenceMap=H[E.iridescenceMap]||null;if(E.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=H[E.iridescenceThicknessMap]||null;if(E.transmissionMap!==void 0)this.transmissionMap=H[E.transmissionMap]||null;if(E.thicknessMap!==void 0)this.thicknessMap=H[E.thicknessMap]||null;if(E.anisotropyMap!==void 0)this.anisotropyMap=H[E.anisotropyMap]||null;if(E.sheenColorMap!==void 0)this.sheenColorMap=H[E.sheenColorMap]||null;if(E.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=H[E.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(E){this.name=E.name,this.blending=E.blending,this.side=E.side,this.vertexColors=E.vertexColors,this.opacity=E.opacity,this.transparent=E.transparent,this.blendSrc=E.blendSrc,this.blendDst=E.blendDst,this.blendEquation=E.blendEquation,this.blendSrcAlpha=E.blendSrcAlpha,this.blendDstAlpha=E.blendDstAlpha,this.blendEquationAlpha=E.blendEquationAlpha,this.blendColor.copy(E.blendColor),this.blendAlpha=E.blendAlpha,this.depthFunc=E.depthFunc,this.depthTest=E.depthTest,this.depthWrite=E.depthWrite,this.stencilWriteMask=E.stencilWriteMask,this.stencilFunc=E.stencilFunc,this.stencilRef=E.stencilRef,this.stencilFuncMask=E.stencilFuncMask,this.stencilFail=E.stencilFail,this.stencilZFail=E.stencilZFail,this.stencilZPass=E.stencilZPass,this.stencilWrite=E.stencilWrite;let H=E.clippingPlanes,W=null;if(H!==null){let R=H.length;W=Array(R);for(let J=0;J!==R;++J)W[J]=H[J].clone()}return this.clippingPlanes=W,this.clipIntersection=E.clipIntersection,this.clipShadows=E.clipShadows,this.shadowSide=E.shadowSide,this.colorWrite=E.colorWrite,this.precision=E.precision,this.polygonOffset=E.polygonOffset,this.polygonOffsetFactor=E.polygonOffsetFactor,this.polygonOffsetUnits=E.polygonOffsetUnits,this.dithering=E.dithering,this.alphaTest=E.alphaTest,this.alphaHash=E.alphaHash,this.alphaToCoverage=E.alphaToCoverage,this.premultipliedAlpha=E.premultipliedAlpha,this.forceSinglePass=E.forceSinglePass,this.allowOverride=E.allowOverride,this.visible=E.visible,this.toneMapped=E.toneMapped,this.userData=JSON.parse(JSON.stringify(E.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(E){if(E===!0)this.version++}}var tH=new b,m6=new b,O7=new b,B7=new b;class E6{constructor(E=new b,H=new b(0,0,-1)){this.origin=E,this.direction=H}set(E,H){return this.origin.copy(E),this.direction.copy(H),this}copy(E){return this.origin.copy(E.origin),this.direction.copy(E.direction),this}at(E,H){return H.copy(this.origin).addScaledVector(this.direction,E)}lookAt(E){return this.direction.copy(E).sub(this.origin).normalize(),this}recast(E){return this.origin.copy(this.at(E,tH)),this}closestPointToPoint(E,H){H.subVectors(E,this.origin);let W=H.dot(this.direction);if(W<0)return H.copy(this.origin);return H.copy(this.origin).addScaledVector(this.direction,W)}distanceToPoint(E){return Math.sqrt(this.distanceSqToPoint(E))}distanceSqToPoint(E){let H=tH.subVectors(E,this.origin).dot(this.direction);if(H<0)return this.origin.distanceToSquared(E);return tH.copy(this.origin).addScaledVector(this.direction,H),tH.distanceToSquared(E)}distanceSqToSegment(E,H,W,R){m6.copy(E).add(H).multiplyScalar(0.5),O7.copy(H).sub(E).normalize(),B7.copy(this.origin).sub(m6);let J=E.distanceTo(H)*0.5,Q=-this.direction.dot(O7),$=B7.dot(this.direction),Z=-B7.dot(O7),K=B7.lengthSq(),U=Math.abs(1-Q*Q),X,Y,G,D;if(U>0)if(X=Q*Z-$,Y=Q*$-Z,D=J*U,X>=0)if(Y>=-D)if(Y<=D){let F=1/U;X*=F,Y*=F,G=X*(X+Q*Y+2*$)+Y*(Q*X+Y+2*Z)+K}else Y=J,X=Math.max(0,-(Q*Y+$)),G=-X*X+Y*(Y+2*Z)+K;else Y=-J,X=Math.max(0,-(Q*Y+$)),G=-X*X+Y*(Y+2*Z)+K;else if(Y<=-D)X=Math.max(0,-(-Q*J+$)),Y=X>0?-J:Math.min(Math.max(-J,-Z),J),G=-X*X+Y*(Y+2*Z)+K;else if(Y<=D)X=0,Y=Math.min(Math.max(-J,-Z),J),G=Y*(Y+2*Z)+K;else X=Math.max(0,-(Q*J+$)),Y=X>0?J:Math.min(Math.max(-J,-Z),J),G=-X*X+Y*(Y+2*Z)+K;else Y=Q>0?-J:J,X=Math.max(0,-(Q*Y+$)),G=-X*X+Y*(Y+2*Z)+K;if(W)W.copy(this.origin).addScaledVector(this.direction,X);if(R)R.copy(m6).addScaledVector(O7,Y);return G}intersectSphere(E,H){if(E.radius<0)return null;tH.subVectors(E.center,this.origin);let W=tH.dot(this.direction),R=tH.dot(tH)-W*W,J=E.radius*E.radius;if(R>J)return null;let Q=Math.sqrt(J-R),$=W-Q,Z=W+Q;if(Z<0)return null;if($<0)return this.at(Z,H);return this.at($,H)}intersectsSphere(E){if(E.radius<0)return!1;return this.distanceSqToPoint(E.center)<=E.radius*E.radius}distanceToPlane(E){let H=E.normal.dot(this.direction);if(H===0){if(E.distanceToPoint(this.origin)===0)return 0;return null}let W=-(this.origin.dot(E.normal)+E.constant)/H;return W>=0?W:null}intersectPlane(E,H){let W=this.distanceToPlane(E);if(W===null)return null;return this.at(W,H)}intersectsPlane(E){let H=E.distanceToPoint(this.origin);if(H===0)return!0;if(E.normal.dot(this.direction)*H<0)return!0;return!1}intersectBox(E,H){let W,R,J,Q,$,Z,K=1/this.direction.x,U=1/this.direction.y,X=1/this.direction.z,Y=this.origin;if(K>=0)W=(E.min.x-Y.x)*K,R=(E.max.x-Y.x)*K;else W=(E.max.x-Y.x)*K,R=(E.min.x-Y.x)*K;if(U>=0)J=(E.min.y-Y.y)*U,Q=(E.max.y-Y.y)*U;else J=(E.max.y-Y.y)*U,Q=(E.min.y-Y.y)*U;if(W>Q||J>R)return null;if(J>W||isNaN(W))W=J;if(Q<R||isNaN(R))R=Q;if(X>=0)$=(E.min.z-Y.z)*X,Z=(E.max.z-Y.z)*X;else $=(E.max.z-Y.z)*X,Z=(E.min.z-Y.z)*X;if(W>Z||$>R)return null;if($>W||W!==W)W=$;if(Z<R||R!==R)R=Z;if(R<0)return null;return this.at(W>=0?W:R,H)}intersectsBox(E){return this.intersectBox(E,tH)!==null}intersectTriangle(E,H,W,R,J){let Q=this.origin,$=this.direction,Z=$.x,K=$.y,U=$.z,X=E.x-Q.x,Y=E.y-Q.y,G=E.z-Q.z,D=H.x-Q.x,F=H.y-Q.y,w=H.z-Q.z,C=W.x-Q.x,M=W.y-Q.y,T=W.z-Q.z,y=Math.abs(Z),B=Math.abs(K),V=Math.abs(U),P,A,L,k,c,h,v,d,z,u,a,p;if(y>=B&&y>=V)if(L=Z,h=X,z=D,p=C,Z>=0)P=K,A=U,k=Y,c=G,v=F,d=w,u=M,a=T;else P=U,A=K,k=G,c=Y,v=w,d=F,u=T,a=M;else if(B>=V)if(L=K,h=Y,z=F,p=M,K>=0)P=U,A=Z,k=G,c=X,v=w,d=D,u=T,a=C;else P=Z,A=U,k=X,c=G,v=D,d=w,u=C,a=T;else if(L=U,h=G,z=w,p=T,U>=0)P=Z,A=K,k=X,c=Y,v=D,d=F,u=C,a=M;else P=K,A=Z,k=Y,c=X,v=F,d=D,u=M,a=C;if(L===0)return null;let J0=P/L,s=A/L,t=1/L,R0=k-J0*h,S0=c-s*h,A0=v-J0*z,YE=d-s*z,u0=u-J0*p,i=a-s*p,$0=u0*YE-i*A0,U0=R0*i-S0*u0,j0=A0*S0-YE*R0;if(R){if($0<0||U0<0||j0<0)return null}else if(($0<0||U0<0||j0<0)&&($0>0||U0>0||j0>0))return null;let f0=$0+U0+j0;if(f0===0)return null;let I0=t*($0*h+U0*z+j0*p);if(f0>0?I0<0:I0>0)return null;return this.at(I0/f0,J)}applyMatrix4(E){return this.origin.applyMatrix4(E),this.direction.transformDirection(E),this}equals(E){return E.origin.equals(this.origin)&&E.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bE extends x8{constructor(E){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new D8,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(E)}copy(E){return super.copy(E),this.color.copy(E.color),this.map=E.map,this.lightMap=E.lightMap,this.lightMapIntensity=E.lightMapIntensity,this.aoMap=E.aoMap,this.aoMapIntensity=E.aoMapIntensity,this.specularMap=E.specularMap,this.alphaMap=E.alphaMap,this.envMap=E.envMap,this.envMapRotation.copy(E.envMapRotation),this.combine=E.combine,this.reflectivity=E.reflectivity,this.refractionRatio=E.refractionRatio,this.wireframe=E.wireframe,this.wireframeLinewidth=E.wireframeLinewidth,this.wireframeLinecap=E.wireframeLinecap,this.wireframeLinejoin=E.wireframeLinejoin,this.fog=E.fog,this}}var uJ=new AE,A8=new E6,w7=new TH,dJ=new b,k7=new b,V7=new b,T7=new b,u6=new b,P7=new b,cJ=new b,z7=new b;class s0 extends WH{constructor(E=new WE,H=new bE){super();this.isMesh=!0,this.type="Mesh",this.geometry=E,this.material=H,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(E,H){if(super.copy(E,H),E.morphTargetInfluences!==void 0)this.morphTargetInfluences=E.morphTargetInfluences.slice();if(E.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},E.morphTargetDictionary);return this.material=Array.isArray(E.material)?E.material.slice():E.material,this.geometry=E.geometry,this}updateMorphTargets(){let H=this.geometry.morphAttributes,W=Object.keys(H);if(W.length>0){let R=H[W[0]];if(R!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let J=0,Q=R.length;J<Q;J++){let $=R[J].name||String(J);this.morphTargetInfluences.push(0),this.morphTargetDictionary[$]=J}}}}getVertexPosition(E,H){let W=this.geometry,R=W.attributes.position,J=W.morphAttributes.position,Q=W.morphTargetsRelative;H.fromBufferAttribute(R,E);let $=this.morphTargetInfluences;if(J&&$){P7.set(0,0,0);for(let Z=0,K=J.length;Z<K;Z++){let U=$[Z],X=J[Z];if(U===0)continue;if(u6.fromBufferAttribute(X,E),Q)P7.addScaledVector(u6,U);else P7.addScaledVector(u6.sub(H),U)}H.add(P7)}return H}intersectsFrustum(E){return E.intersectsObject(this)}raycast(E,H){let W=this.geometry,R=this.material,J=this.matrixWorld;if(R===void 0)return;if(W.boundingSphere===null)W.computeBoundingSphere();if(w7.copy(W.boundingSphere),w7.applyMatrix4(J),A8.copy(E.ray).recast(E.near),w7.containsPoint(A8.origin)===!1){if(A8.intersectSphere(w7,dJ)===null)return;if(A8.origin.distanceToSquared(dJ)>(E.far-E.near)**2)return}if(uJ.copy(J).invert(),A8.copy(E.ray).applyMatrix4(uJ),W.boundingBox!==null){if(A8.intersectsBox(W.boundingBox)===!1)return}this._computeIntersections(E,H,A8)}_computeIntersections(E,H,W){let R,J=this.geometry,Q=this.material,$=J.index,Z=J.attributes.position,K=J.attributes.uv,U=J.attributes.uv1,X=J.attributes.normal,Y=J.groups,G=J.drawRange;if($!==null)if(Array.isArray(Q))for(let D=0,F=Y.length;D<F;D++){let w=Y[D],C=Q[w.materialIndex],M=Math.max(w.start,G.start),T=Math.min($.count,Math.min(w.start+w.count,G.start+G.count));for(let y=M,B=T;y<B;y+=3){let V=$.getX(y),P=$.getX(y+1),A=$.getX(y+2);if(R=A7(this,C,E,W,K,U,X,V,P,A),R)R.faceIndex=Math.floor(y/3),R.face.materialIndex=w.materialIndex,H.push(R)}}else{let D=Math.max(0,G.start),F=Math.min($.count,G.start+G.count);for(let w=D,C=F;w<C;w+=3){let M=$.getX(w),T=$.getX(w+1),y=$.getX(w+2);if(R=A7(this,Q,E,W,K,U,X,M,T,y),R)R.faceIndex=Math.floor(w/3),H.push(R)}}else if(Z!==void 0)if(Array.isArray(Q))for(let D=0,F=Y.length;D<F;D++){let w=Y[D],C=Q[w.materialIndex],M=Math.max(w.start,G.start),T=Math.min(Z.count,Math.min(w.start+w.count,G.start+G.count));for(let y=M,B=T;y<B;y+=3){let V=y,P=y+1,A=y+2;if(R=A7(this,C,E,W,K,U,X,V,P,A),R)R.faceIndex=Math.floor(y/3),R.face.materialIndex=w.materialIndex,H.push(R)}}else{let D=Math.max(0,G.start),F=Math.min(Z.count,G.start+G.count);for(let w=D,C=F;w<C;w+=3){let M=w,T=w+1,y=w+2;if(R=A7(this,Q,E,W,K,U,X,M,T,y),R)R.faceIndex=Math.floor(w/3),H.push(R)}}}}function XZ(E,H,W,R,J,Q,$,Z){let K;if(H.side===1)K=R.intersectTriangle($,Q,J,!0,Z);else K=R.intersectTriangle(J,Q,$,H.side===0,Z);if(K===null)return null;z7.copy(Z),z7.applyMatrix4(E.matrixWorld);let U=W.ray.origin.distanceTo(z7);if(U<W.near||U>W.far)return null;return{distance:U,point:z7.clone(),object:E}}function A7(E,H,W,R,J,Q,$,Z,K,U){E.getVertexPosition(Z,k7),E.getVertexPosition(K,V7),E.getVertexPosition(U,T7);let X=XZ(E,H,W,R,k7,V7,T7,cJ);if(X){let Y=new b;if(BH.getBarycoord(cJ,k7,V7,T7,Y),J)X.uv=BH.getInterpolatedAttribute(J,Z,K,U,Y,new m0);if(Q)X.uv1=BH.getInterpolatedAttribute(Q,Z,K,U,Y,new m0);if($){if(X.normal=BH.getInterpolatedAttribute($,Z,K,U,Y,new b),X.normal.dot(R.direction)>0)X.normal.multiplyScalar(-1)}let G={a:Z,b:K,c:U,normal:new b,materialIndex:0};BH.getNormal(k7,V7,T7,G.normal),X.face=G,X.barycoord=Y}return X}class i9 extends aE{constructor(E=null,H=1,W=1,R,J,Q,$,Z,K=1003,U=1003,X,Y){super(null,Q,$,Z,K,U,R,J,X,Y);this.isDataTexture=!0,this.image={data:E,width:H,height:W},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class H6 extends hE{constructor(E,H,W,R=1){super(E,H,W);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=R}copy(E){return super.copy(E),this.meshPerAttribute=E.meshPerAttribute,this}toJSON(){let E=super.toJSON();return E.meshPerAttribute=this.meshPerAttribute,E.isInstancedBufferAttribute=!0,E}}var I8=new TH,GZ=new m0(0.5,0.5),I7=new b;class W6{constructor(E=new pH,H=new pH,W=new pH,R=new pH,J=new pH,Q=new pH){this.planes=[E,H,W,R,J,Q]}set(E,H,W,R,J,Q){let $=this.planes;return $[0].copy(E),$[1].copy(H),$[2].copy(W),$[3].copy(R),$[4].copy(J),$[5].copy(Q),this}copy(E){let H=this.planes;for(let W=0;W<6;W++)H[W].copy(E.planes[W]);return this}setFromProjectionMatrix(E,H=2000,W=!1){let R=this.planes,J=E.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],U=J[4],X=J[5],Y=J[6],G=J[7],D=J[8],F=J[9],w=J[10],C=J[11],M=J[12],T=J[13],y=J[14],B=J[15];if(R[0].setComponents(K-Q,G-U,C-D,B-M).normalize(),R[1].setComponents(K+Q,G+U,C+D,B+M).normalize(),R[2].setComponents(K+$,G+X,C+F,B+T).normalize(),R[3].setComponents(K-$,G-X,C-F,B-T).normalize(),W)R[4].setComponents(Z,Y,w,y).normalize(),R[5].setComponents(K-Z,G-Y,C-w,B-y).normalize();else if(R[4].setComponents(K-Z,G-Y,C-w,B-y).normalize(),H===2000)R[5].setComponents(K+Z,G+Y,C+w,B+y).normalize();else if(H===2001)R[5].setComponents(Z,Y,w,y).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+H);return this}intersectsObject(E){if(E.boundingSphere!==void 0){if(E.boundingSphere===null)E.computeBoundingSphere();I8.copy(E.boundingSphere).applyMatrix4(E.matrixWorld)}else{let H=E.geometry;if(H.boundingSphere===null)H.computeBoundingSphere();I8.copy(H.boundingSphere).applyMatrix4(E.matrixWorld)}return this.intersectsSphere(I8)}intersectsSprite(E){I8.center.set(0,0,0);let H=GZ.distanceTo(E.center);return I8.radius=0.7071067811865476+H,I8.applyMatrix4(E.matrixWorld),this.intersectsSphere(I8)}intersectsSphere(E){let H=this.planes,W=E.center,R=-E.radius;for(let J=0;J<6;J++)if(H[J].distanceToPoint(W)<R)return!1;return!0}intersectsBox(E){let H=this.planes;for(let W=0;W<6;W++){let R=H[W];if(I7.x=R.normal.x>0?E.max.x:E.min.x,I7.y=R.normal.y>0?E.max.y:E.min.y,I7.z=R.normal.z>0?E.max.z:E.min.z,R.distanceToPoint(I7)<0)return!1}return!0}containsPoint(E){let H=this.planes;for(let W=0;W<6;W++)if(H[W].distanceToPoint(E)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class R8 extends x8{constructor(E){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(E)}copy(E){return super.copy(E),this.color.copy(E.color),this.map=E.map,this.linewidth=E.linewidth,this.linecap=E.linecap,this.linejoin=E.linejoin,this.fog=E.fog,this}}var v7=new b,f7=new b,nJ=new AE,bW=new E6,_7=new TH,d6=new b,sJ=new b;class o9 extends WH{constructor(E=new WE,H=new R8){super();this.isLine=!0,this.type="Line",this.geometry=E,this.material=H,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(E,H){return super.copy(E,H),this.material=Array.isArray(E.material)?E.material.slice():E.material,this.geometry=E.geometry,this}computeLineDistances(){let E=this.geometry;if(E.index===null){let H=E.attributes.position,W=[0];for(let R=1,J=H.count;R<J;R++)v7.fromBufferAttribute(H,R-1),f7.fromBufferAttribute(H,R),W[R]=W[R-1],W[R]+=v7.distanceTo(f7);E.setAttribute("lineDistance",new RH(W,1))}else h0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(E){return E.intersectsObject(this)}raycast(E,H){let W=this.geometry,R=this.matrixWorld,J=E.params.Line.threshold,Q=W.drawRange;if(W.boundingSphere===null)W.computeBoundingSphere();if(_7.copy(W.boundingSphere),_7.applyMatrix4(R),_7.radius+=J,E.ray.intersectsSphere(_7)===!1)return;nJ.copy(R).invert(),bW.copy(E.ray).applyMatrix4(nJ);let $=J/((this.scale.x+this.scale.y+this.scale.z)/3),Z=$*$,K=this.isLineSegments?2:1,U=W.index,Y=W.attributes.position;if(U!==null){let G=Math.max(0,Q.start),D=Math.min(U.count,Q.start+Q.count);for(let F=G,w=D-1;F<w;F+=K){let C=U.getX(F),M=U.getX(F+1),T=S7(this,E,bW,Z,C,M,F);if(T)H.push(T)}if(this.isLineLoop){let F=U.getX(D-1),w=U.getX(G),C=S7(this,E,bW,Z,F,w,D-1);if(C)H.push(C)}}else{let G=Math.max(0,Q.start),D=Math.min(Y.count,Q.start+Q.count);for(let F=G,w=D-1;F<w;F+=K){let C=S7(this,E,bW,Z,F,F+1,F);if(C)H.push(C)}if(this.isLineLoop){let F=S7(this,E,bW,Z,D-1,G,D-1);if(F)H.push(F)}}}updateMorphTargets(){let H=this.geometry.morphAttributes,W=Object.keys(H);if(W.length>0){let R=H[W[0]];if(R!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let J=0,Q=R.length;J<Q;J++){let $=R[J].name||String(J);this.morphTargetInfluences.push(0),this.morphTargetDictionary[$]=J}}}}}function S7(E,H,W,R,J,Q,$){let Z=E.geometry.attributes.position;if(v7.fromBufferAttribute(Z,J),f7.fromBufferAttribute(Z,Q),W.distanceSqToSegment(v7,f7,d6,sJ)>R)return;d6.applyMatrix4(E.matrixWorld);let U=H.ray.origin.distanceTo(d6);if(U<H.near||U>H.far)return;return{distance:U,point:sJ.clone().applyMatrix4(E.matrixWorld),index:$,face:null,faceIndex:null,barycoord:null,object:E}}var iJ=new b,oJ=new b;class N8 extends o9{constructor(E,H){super(E,H);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let E=this.geometry;if(E.index===null){let H=E.attributes.position,W=[];for(let R=0,J=H.count;R<J;R+=2)iJ.fromBufferAttribute(H,R),oJ.fromBufferAttribute(H,R+1),W[R]=R===0?0:W[R-1],W[R+1]=W[R]+iJ.distanceTo(oJ);E.setAttribute("lineDistance",new RH(W,1))}else h0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class R6 extends aE{constructor(E=[],H=301,W,R,J,Q,$,Z,K,U){super(E,H,W,R,J,Q,$,Z,K,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(E){this.image=E}}class g8 extends aE{constructor(E,H,W=1014,R,J,Q,$=1003,Z=1003,K,U=1026,X=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let Y={width:E,height:H,depth:X};super(Y,R,J,Q,$,Z,U,W,K);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(E){return super.copy(E),this.source=new nW(Object.assign({},E.image)),this.compareFunction=E.compareFunction,this}toJSON(E){let H=super.toJSON(E);return H.compareFunction=this.compareFunction,H}}class a9 extends g8{constructor(E,H=1014,W=301,R,J,Q=1003,$=1003,Z,K=1026){let U={width:E,height:E,depth:1},X=[U,U,U,U,U,U];super(E,E,H,W,R,J,Q,$,Z,K);this.image=X,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(E){this.image=E}}class J6 extends aE{constructor(E=null){super();this.sourceTexture=E,this.isExternalTexture=!0}copy(E){return super.copy(E),this.sourceTexture=E.sourceTexture,this}}class OW extends WE{constructor(E=1,H=1,W=1,R=1,J=1,Q=1){super();this.type="BoxGeometry",this.parameters={width:E,height:H,depth:W,widthSegments:R,heightSegments:J,depthSegments:Q};let $=this;R=Math.floor(R),J=Math.floor(J),Q=Math.floor(Q);let Z=[],K=[],U=[],X=[],Y=0,G=0;D("z","y","x",-1,-1,W,H,E,Q,J,0),D("z","y","x",1,-1,W,H,-E,Q,J,1),D("x","z","y",1,1,E,W,H,R,Q,2),D("x","z","y",1,-1,E,W,-H,R,Q,3),D("x","y","z",1,-1,E,H,W,R,J,4),D("x","y","z",-1,-1,E,H,-W,R,J,5),this.setIndex(Z),this.setAttribute("position",new RH(K,3)),this.setAttribute("normal",new RH(U,3)),this.setAttribute("uv",new RH(X,2));function D(F,w,C,M,T,y,B,V,P,A,L){let k=y/P,c=B/A,h=y/2,v=B/2,d=V/2,z=P+1,u=A+1,a=0,p=0,J0=new b;for(let s=0;s<u;s++){let t=s*c-v;for(let R0=0;R0<z;R0++){let S0=R0*k-h;J0[F]=S0*M,J0[w]=t*T,J0[C]=d,K.push(J0.x,J0.y,J0.z),J0[F]=0,J0[w]=0,J0[C]=V>0?1:-1,U.push(J0.x,J0.y,J0.z),X.push(R0/P),X.push(1-s/A),a+=1}}for(let s=0;s<A;s++)for(let t=0;t<P;t++){let R0=Y+t+z*s,S0=Y+t+z*(s+1),A0=Y+(t+1)+z*(s+1),YE=Y+(t+1)+z*s;Z.push(R0,S0,YE),Z.push(S0,A0,YE),p+=6}$.addGroup(G,p,L),G+=p,Y+=a}}copy(E){return super.copy(E),this.parameters=Object.assign({},E.parameters),this}static fromJSON(E){return new OW(E.width,E.height,E.depth,E.widthSegments,E.heightSegments,E.depthSegments)}}class PH extends WE{constructor(E=1,H=1,W=1,R=1){super();this.type="PlaneGeometry",this.parameters={width:E,height:H,widthSegments:W,heightSegments:R};let J=E/2,Q=H/2,$=Math.floor(W),Z=Math.floor(R),K=$+1,U=Z+1,X=E/$,Y=H/Z,G=[],D=[],F=[],w=[];for(let C=0;C<U;C++){let M=C*Y-Q;for(let T=0;T<K;T++){let y=T*X-J;D.push(y,-M,0),F.push(0,0,1),w.push(T/$),w.push(1-C/Z)}}for(let C=0;C<Z;C++)for(let M=0;M<$;M++){let T=M+K*C,y=M+K*(C+1),B=M+1+K*(C+1),V=M+1+K*C;G.push(T,y,V),G.push(y,B,V)}this.setIndex(G),this.setAttribute("position",new RH(D,3)),this.setAttribute("normal",new RH(F,3)),this.setAttribute("uv",new RH(w,2))}copy(E){return super.copy(E),this.parameters=Object.assign({},E.parameters),this}static fromJSON(E){return new PH(E.width,E.height,E.widthSegments,E.heightSegments)}}function p8(E){let H={};for(let W in E){H[W]={};for(let R in E[W]){let J=E[W][R];if(aJ(J))if(J.isRenderTargetTexture)h0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),H[W][R]=null;else H[W][R]=J.clone();else if(Array.isArray(J))if(aJ(J[0])){let Q=[];for(let $=0,Z=J.length;$<Z;$++)Q[$]=J[$].clone();H[W][R]=Q}else H[W][R]=J.slice();else H[W][R]=J}}return H}function rE(E){let H={};for(let W=0;W<E.length;W++){let R=p8(E[W]);for(let J in R)H[J]=R[J]}return H}function aJ(E){return E&&(E.isColor||E.isMatrix3||E.isMatrix4||E.isVector2||E.isVector3||E.isVector4||E.isTexture||E.isQuaternion)}function YZ(E){let H=[];for(let W=0;W<E.length;W++)H.push(E[W].clone());return H}function r9(E){let H=E.getRenderTarget();if(H===null)return E.outputColorSpace;if(H.isXRRenderTarget===!0)return H.texture.colorSpace;return a0.workingColorSpace}var WQ={clone:p8,merge:rE},MZ=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,DZ=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class SE extends x8{constructor(E){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=MZ,this.fragmentShader=DZ,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,E!==void 0)this.setValues(E)}copy(E){return super.copy(E),this.fragmentShader=E.fragmentShader,this.vertexShader=E.vertexShader,this.uniforms=p8(E.uniforms),this.uniformsGroups=YZ(E.uniformsGroups),this.defines=Object.assign({},E.defines),this.wireframe=E.wireframe,this.wireframeLinewidth=E.wireframeLinewidth,this.fog=E.fog,this.lights=E.lights,this.clipping=E.clipping,this.extensions=Object.assign({},E.extensions),this.glslVersion=E.glslVersion,this.defaultAttributeValues=Object.assign({},E.defaultAttributeValues),this.index0AttributeName=E.index0AttributeName,this.uniformsNeedUpdate=E.uniformsNeedUpdate,this}toJSON(E){let H=super.toJSON(E);H.glslVersion=this.glslVersion,H.uniforms={};for(let R in this.uniforms){let Q=this.uniforms[R].value;if(Q&&Q.isTexture)H.uniforms[R]={type:"t",value:Q.toJSON(E).uuid};else if(Q&&Q.isColor)H.uniforms[R]={type:"c",value:Q.getHex()};else if(Q&&Q.isVector2)H.uniforms[R]={type:"v2",value:Q.toArray()};else if(Q&&Q.isVector3)H.uniforms[R]={type:"v3",value:Q.toArray()};else if(Q&&Q.isVector4)H.uniforms[R]={type:"v4",value:Q.toArray()};else if(Q&&Q.isMatrix3)H.uniforms[R]={type:"m3",value:Q.toArray()};else if(Q&&Q.isMatrix4)H.uniforms[R]={type:"m4",value:Q.toArray()};else H.uniforms[R]={value:Q}}if(Object.keys(this.defines).length>0)H.defines=this.defines;H.vertexShader=this.vertexShader,H.fragmentShader=this.fragmentShader,H.lights=this.lights,H.clipping=this.clipping;let W={};for(let R in this.extensions)if(this.extensions[R]===!0)W[R]=!0;if(Object.keys(W).length>0)H.extensions=W;return H}fromJSON(E,H){if(super.fromJSON(E,H),E.uniforms!==void 0)for(let W in E.uniforms){let R=E.uniforms[W];switch(this.uniforms[W]={},R.type){case"t":this.uniforms[W].value=H[R.value]||null;break;case"c":this.uniforms[W].value=new e().setHex(R.value);break;case"v2":this.uniforms[W].value=new m0().fromArray(R.value);break;case"v3":this.uniforms[W].value=new b().fromArray(R.value);break;case"v4":this.uniforms[W].value=new NE().fromArray(R.value);break;case"m3":this.uniforms[W].value=new p0().fromArray(R.value);break;case"m4":this.uniforms[W].value=new AE().fromArray(R.value);break;default:this.uniforms[W].value=R.value}}if(E.defines!==void 0)this.defines=E.defines;if(E.vertexShader!==void 0)this.vertexShader=E.vertexShader;if(E.fragmentShader!==void 0)this.fragmentShader=E.fragmentShader;if(E.glslVersion!==void 0)this.glslVersion=E.glslVersion;if(E.extensions!==void 0)for(let W in E.extensions)this.extensions[W]=E.extensions[W];if(E.lights!==void 0)this.lights=E.lights;if(E.clipping!==void 0)this.clipping=E.clipping;return this}}class t9 extends SE{constructor(E){super(E);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class e9 extends x8{constructor(E){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(E)}copy(E){return super.copy(E),this.depthPacking=E.depthPacking,this.map=E.map,this.alphaMap=E.alphaMap,this.displacementMap=E.displacementMap,this.displacementScale=E.displacementScale,this.displacementBias=E.displacementBias,this.wireframe=E.wireframe,this.wireframeLinewidth=E.wireframeLinewidth,this}}class ER extends x8{constructor(E){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(E)}copy(E){return super.copy(E),this.map=E.map,this.alphaMap=E.alphaMap,this.displacementMap=E.displacementMap,this.displacementScale=E.displacementScale,this.displacementBias=E.displacementBias,this}}function XW(E,H){if(!E||E.constructor===H)return E;if(typeof H.BYTES_PER_ELEMENT==="number")return new H(E);return Array.prototype.slice.call(E)}function c6(E){return E!==void 0&&E.inTangents!==void 0&&E.outTangents!==void 0}class l8{constructor(E,H,W,R){this.parameterPositions=E,this._cachedIndex=0,this.resultBuffer=R!==void 0?R:new H.constructor(W),this.sampleValues=H,this.valueSize=W,this.settings=null,this.DefaultSettings_={}}evaluate(E){let H=this.parameterPositions,W=this._cachedIndex,R=H[W],J=H[W-1];W:{E:{let Q;H:{R:if(!(E<R)){for(let $=W+2;;){if(R===void 0){if(E<J)break R;return W=H.length,this._cachedIndex=W,this.copySampleValue_(W-1)}if(W===$)break;if(J=R,R=H[++W],E<R)break E}Q=H.length;break H}if(!(E>=J)){let $=H[1];if(E<$)W=2,J=$;for(let Z=W-2;;){if(J===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(W===Z)break;if(R=J,J=H[--W-1],E>=J)break E}Q=W,W=0;break H}break W}while(W<Q){let $=W+Q>>>1;if(E<H[$])Q=$;else W=$+1}if(R=H[W],J=H[W-1],J===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(R===void 0)return W=H.length,this._cachedIndex=W,this.copySampleValue_(W-1)}this._cachedIndex=W,this.intervalChanged_(W,J,R)}return this.interpolate_(W,J,E,R)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(E){let H=this.resultBuffer,W=this.sampleValues,R=this.valueSize,J=E*R;for(let Q=0;Q!==R;++Q)H[Q]=W[J+Q];return H}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class HR extends l8{constructor(E,H,W,R){super(E,H,W,R);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(E,H,W){let R=this.parameterPositions,J=E-2,Q=E+1,$=R[J],Z=R[Q];if($===void 0)switch(this.getSettings_().endingStart){case 2401:J=E,$=2*H-W;break;case 2402:J=R.length-2,$=H+R[J]-R[J+1];break;default:J=E,$=W}if(Z===void 0)switch(this.getSettings_().endingEnd){case 2401:Q=E,Z=2*W-H;break;case 2402:Q=1,Z=W+R[1]-R[0];break;default:Q=E-1,Z=H}let K=(W-H)*0.5,U=this.valueSize;this._weightPrev=K/(H-$),this._weightNext=K/(Z-W),this._offsetPrev=J*U,this._offsetNext=Q*U}interpolate_(E,H,W,R){let J=this.resultBuffer,Q=this.sampleValues,$=this.valueSize,Z=E*$,K=Z-$,U=this._offsetPrev,X=this._offsetNext,Y=this._weightPrev,G=this._weightNext,D=(W-H)/(R-H),F=D*D,w=F*D,C=-Y*w+2*Y*F-Y*D,M=(1+Y)*w+(-1.5-2*Y)*F+(-0.5+Y)*D+1,T=(-1-G)*w+(1.5+G)*F+0.5*D,y=G*w-G*F;for(let B=0;B!==$;++B)J[B]=C*Q[U+B]+M*Q[K+B]+T*Q[Z+B]+y*Q[X+B];return J}}class WR extends l8{constructor(E,H,W,R){super(E,H,W,R)}interpolate_(E,H,W,R){let J=this.resultBuffer,Q=this.sampleValues,$=this.valueSize,Z=E*$,K=Z-$,U=(W-H)/(R-H),X=1-U;for(let Y=0;Y!==$;++Y)J[Y]=Q[K+Y]*X+Q[Z+Y]*U;return J}}class RR extends l8{constructor(E,H,W,R){super(E,H,W,R)}interpolate_(E){return this.copySampleValue_(E-1)}}class JR extends l8{interpolate_(E,H,W,R){let J=this.resultBuffer,Q=this.sampleValues,$=this.valueSize,Z=E*$,K=Z-$,U=this.inTangents,X=this.outTangents;if(!U||!X){let D=(W-H)/(R-H),F=1-D;for(let w=0;w!==$;++w)J[w]=Q[K+w]*F+Q[Z+w]*D;return J}let Y=$*2,G=E-1;for(let D=0;D!==$;++D){let F=Q[K+D],w=Q[Z+D],C=G*Y+D*2,M=X[C],T=X[C+1],y=E*Y+D*2,B=U[y],V=U[y+1],P=qZ(W,H,M,B,R);J[D]=RQ(P,F,T,V,w)}return J}}function RQ(E,H,W,R,J){let Q=1-E;return Q*Q*Q*H+3*Q*Q*E*W+3*Q*E*E*R+E*E*E*J}function CZ(E,H,W,R,J){let Q=1-E;return 3*Q*Q*(W-H)+6*Q*E*(R-W)+3*E*E*(J-R)}function qZ(E,H,W,R,J){let Q=(E-H)/(J-H);for(let $=0;$<8;$++){let Z=RQ(Q,H,W,R,J)-E;if(Math.abs(Z)<0.0000000001)break;let K=CZ(Q,H,W,R,J);if(Math.abs(K)<0.0000000001)break;Q=Math.max(0,Math.min(1,Q-Z/K))}return Q}class zH{constructor(E,H,W,R){if(E===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(H===void 0||H.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+E);this.name=E,this.times=XW(H,this.TimeBufferType),this.values=XW(W,this.ValueBufferType),this.setInterpolation(R||this.DefaultInterpolation)}static toJSON(E){let H=E.constructor,W;if(H.toJSON!==this.toJSON)W=H.toJSON(E);else{W={name:E.name,times:XW(E.times,Array),values:XW(E.values,Array)};let R=E.getInterpolation();if(R!==E.DefaultInterpolation)W.interpolation=R;if(c6(E.settings))W.settings={inTangents:XW(E.settings.inTangents,Array),outTangents:XW(E.settings.outTangents,Array)}}return W.type=E.ValueTypeName,W}InterpolantFactoryMethodDiscrete(E){return new RR(this.times,this.values,this.getValueSize(),E)}InterpolantFactoryMethodLinear(E){return new WR(this.times,this.values,this.getValueSize(),E)}InterpolantFactoryMethodSmooth(E){return new HR(this.times,this.values,this.getValueSize(),E)}InterpolantFactoryMethodBezier(E){let H=new JR(this.times,this.values,this.getValueSize(),E);if(this.settings)H.inTangents=this.settings.inTangents,H.outTangents=this.settings.outTangents;return H}setInterpolation(E){let H;switch(E){case 2300:H=this.InterpolantFactoryMethodDiscrete;break;case 2301:H=this.InterpolantFactoryMethodLinear;break;case 2302:H=this.InterpolantFactoryMethodSmooth;break;case 2303:H=this.InterpolantFactoryMethodBezier;break}if(H===void 0){let W="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(E!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(W);return h0("KeyframeTrack:",W),this}return this.createInterpolant=H,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(E){if(E!==0){let H=this.times;for(let W=0,R=H.length;W!==R;++W)H[W]+=E}return this}scale(E){if(E!==1){let H=this.times;for(let W=0,R=H.length;W!==R;++W)H[W]*=E;if(c6(this.settings))rJ(this.settings.inTangents,E),rJ(this.settings.outTangents,E)}return this}trim(E,H){let W=this.times,R=W.length,J=0,Q=R-1;while(J!==R&&W[J]<E)++J;while(Q!==-1&&W[Q]>H)--Q;if(++Q,J!==0||Q!==R){if(J>=Q)Q=Math.max(Q,1),J=Q-1;let $=this.getValueSize();this.times=W.slice(J,Q),this.values=this.values.slice(J*$,Q*$)}return this}validate(){let E=!0,H=this.getValueSize();if(H-Math.floor(H)!==0)g0("KeyframeTrack: Invalid value size in track.",this),E=!1;let W=this.times,R=this.values,J=W.length;if(J===0)g0("KeyframeTrack: Track is empty.",this),E=!1;let Q=null;for(let $=0;$!==J;$++){let Z=W[$];if(typeof Z==="number"&&isNaN(Z)){g0("KeyframeTrack: Time is not a valid number.",this,$,Z),E=!1;break}if(Q!==null&&Q>Z){g0("KeyframeTrack: Out of order keys.",this,$,Z,Q),E=!1;break}Q=Z}if(R!==void 0){if(n$(R))for(let $=0,Z=R.length;$!==Z;++$){let K=R[$];if(isNaN(K)){g0("KeyframeTrack: Value is not a valid number.",this,$,K),E=!1;break}}}return E}optimize(){let E=this.times.slice(),H=this.values.slice(),W=this.getValueSize(),R=this.getInterpolation()===2302,J=E.length-1,Q=1;for(let $=1;$<J;++$){let Z=!1,K=E[$],U=E[$+1];if(K!==U&&($!==1||K!==E[0]))if(!R){let X=$*W,Y=X-W,G=X+W;for(let D=0;D!==W;++D){let F=H[X+D];if(F!==H[Y+D]||F!==H[G+D]){Z=!0;break}}}else Z=!0;if(Z){if($!==Q){E[Q]=E[$];let X=$*W,Y=Q*W;for(let G=0;G!==W;++G)H[Y+G]=H[X+G]}++Q}}if(J>0){E[Q]=E[J];for(let $=J*W,Z=Q*W,K=0;K!==W;++K)H[Z+K]=H[$+K];++Q}if(Q!==E.length)this.times=E.slice(0,Q),this.values=H.slice(0,Q*W);else this.times=E,this.values=H;return this}clone(){let E=this.times.slice(),H=this.values.slice(),R=new this.constructor(this.name,E,H);if(R.createInterpolant=this.createInterpolant,c6(this.settings))R.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return R}}function rJ(E,H){for(let W=0,R=E.length;W!==R;W+=2)E[W]*=H}zH.prototype.ValueTypeName="";zH.prototype.TimeBufferType=Float32Array;zH.prototype.ValueBufferType=Float32Array;zH.prototype.DefaultInterpolation=2301;class m8 extends zH{constructor(E,H,W){super(E,H,W)}}m8.prototype.ValueTypeName="bool";m8.prototype.ValueBufferType=Array;m8.prototype.DefaultInterpolation=2300;m8.prototype.InterpolantFactoryMethodLinear=void 0;m8.prototype.InterpolantFactoryMethodSmooth=void 0;class QR extends zH{constructor(E,H,W,R){super(E,H,W,R)}}QR.prototype.ValueTypeName="color";class $R extends zH{constructor(E,H,W,R){super(E,H,W,R)}}$R.prototype.ValueTypeName="number";class ZR extends l8{constructor(E,H,W,R){super(E,H,W,R)}interpolate_(E,H,W,R){let J=this.resultBuffer,Q=this.sampleValues,$=this.valueSize,Z=(W-H)/(R-H),K=E*$;for(let U=K+$;K!==U;K+=4)W8.slerpFlat(J,0,Q,K-$,Q,K,Z);return J}}class Q6 extends zH{constructor(E,H,W,R){super(E,H,W,R)}InterpolantFactoryMethodLinear(E){return new ZR(this.times,this.values,this.getValueSize(),E)}}Q6.prototype.ValueTypeName="quaternion";Q6.prototype.InterpolantFactoryMethodSmooth=void 0;class u8 extends zH{constructor(E,H,W){super(E,H,W)}}u8.prototype.ValueTypeName="string";u8.prototype.ValueBufferType=Array;u8.prototype.DefaultInterpolation=2300;u8.prototype.InterpolantFactoryMethodLinear=void 0;u8.prototype.InterpolantFactoryMethodSmooth=void 0;class KR extends zH{constructor(E,H,W,R){super(E,H,W,R)}}KR.prototype.ValueTypeName="vector";class UR{constructor(E,H,W){let R=this,J=!1,Q=0,$=0,Z=void 0,K=[];this.onStart=void 0,this.onLoad=E,this.onProgress=H,this.onError=W,this._abortController=null,this.itemStart=function(U){if($++,J===!1){if(R.onStart!==void 0)R.onStart(U,Q,$)}J=!0},this.itemEnd=function(U){if(Q++,R.onProgress!==void 0)R.onProgress(U,Q,$);if(Q===$){if(J=!1,R.onLoad!==void 0)R.onLoad()}},this.itemError=function(U){if(R.onError!==void 0)R.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Z)return Z(U);return U},this.setURLModifier=function(U){return Z=U,this},this.addHandler=function(U,X){return K.push(U,X),this},this.removeHandler=function(U){let X=K.indexOf(U);if(X!==-1)K.splice(X,2);return this},this.getHandler=function(U){for(let X=0,Y=K.length;X<Y;X+=2){let G=K[X],D=K[X+1];if(G.global)G.lastIndex=0;if(G.test(U))return D}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var JQ=new UR;class XR{constructor(E){if(this.manager=E!==void 0?E:JQ,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(E,H){let W=this;return new Promise(function(R,J){W.load(E,R,H,J)})}parse(){}setCrossOrigin(E){return this.crossOrigin=E,this}setWithCredentials(E){return this.withCredentials=E,this}setPath(E){return this.path=E,this}setResourcePath(E){return this.resourcePath=E,this}setRequestHeader(E){return this.requestHeader=E,this}abort(){return this}}XR.DEFAULT_MATERIAL_NAME="__DEFAULT";var j7=new b,y7=new W8,gH=new b;class F8 extends WH{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new AE,this.projectionMatrix=new AE,this.projectionMatrixInverse=new AE,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(E,H){return super.copy(E,H),this.matrixWorldInverse.copy(E.matrixWorldInverse),this.projectionMatrix.copy(E.projectionMatrix),this.projectionMatrixInverse.copy(E.projectionMatrixInverse),this.coordinateSystem=E.coordinateSystem,this}getWorldDirection(E){return super.getWorldDirection(E).negate()}updateMatrixWorld(E){if(super.updateMatrixWorld(E),this.matrixWorld.decompose(j7,y7,gH),gH.x===1&&gH.y===1&&gH.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(j7,y7,gH.set(1,1,1)).invert()}updateWorldMatrix(E,H,W=!1){if(super.updateWorldMatrix(E,H,W),this.matrixWorld.decompose(j7,y7,gH),gH.x===1&&gH.y===1&&gH.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(j7,y7,gH.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var M8=new b,tJ=new m0,eJ=new m0;class MH extends F8{constructor(E=50,H=1,W=0.1,R=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=E,this.zoom=1,this.near=W,this.far=R,this.focus=10,this.aspect=H,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(E,H){return super.copy(E,H),this.fov=E.fov,this.zoom=E.zoom,this.near=E.near,this.far=E.far,this.focus=E.focus,this.aspect=E.aspect,this.view=E.view===null?null:Object.assign({},E.view),this.filmGauge=E.filmGauge,this.filmOffset=E.filmOffset,this}setFocalLength(E){let H=0.5*this.getFilmHeight()/E;this.fov=h7*2*Math.atan(H),this.updateProjectionMatrix()}getFocalLength(){let E=Math.tan(k6*0.5*this.fov);return 0.5*this.getFilmHeight()/E}getEffectiveFOV(){return h7*2*Math.atan(Math.tan(k6*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(E,H,W){M8.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),H.set(M8.x,M8.y).multiplyScalar(-E/M8.z),M8.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),W.set(M8.x,M8.y).multiplyScalar(-E/M8.z)}getViewSize(E,H){return this.getViewBounds(E,tJ,eJ),H.subVectors(eJ,tJ)}setViewOffset(E,H,W,R,J,Q){if(this.aspect=E/H,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=E,this.view.fullHeight=H,this.view.offsetX=W,this.view.offsetY=R,this.view.width=J,this.view.height=Q,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let E=this.near,H=E*Math.tan(k6*0.5*this.fov)/this.zoom,W=2*H,R=this.aspect*W,J=-0.5*R,Q=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Z,fullHeight:K}=Q;J+=Q.offsetX*R/Z,H-=Q.offsetY*W/K,R*=Q.width/Z,W*=Q.height/K}let $=this.filmOffset;if($!==0)J+=E*$/this.getFilmWidth();this.projectionMatrix.makePerspective(J,J+R,H,H-W,E,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(E){let H=super.toJSON(E);if(H.object.fov=this.fov,H.object.zoom=this.zoom,H.object.near=this.near,H.object.far=this.far,H.object.focus=this.focus,H.object.aspect=this.aspect,this.view!==null)H.object.view=Object.assign({},this.view);return H.object.filmGauge=this.filmGauge,H.object.filmOffset=this.filmOffset,H}}class BW extends F8{constructor(E=-1,H=1,W=1,R=-1,J=0.1,Q=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=E,this.right=H,this.top=W,this.bottom=R,this.near=J,this.far=Q,this.updateProjectionMatrix()}copy(E,H){return super.copy(E,H),this.left=E.left,this.right=E.right,this.top=E.top,this.bottom=E.bottom,this.near=E.near,this.far=E.far,this.zoom=E.zoom,this.view=E.view===null?null:Object.assign({},E.view),this}setViewOffset(E,H,W,R,J,Q){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=E,this.view.fullHeight=H,this.view.offsetX=W,this.view.offsetY=R,this.view.width=J,this.view.height=Q,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let E=(this.right-this.left)/(2*this.zoom),H=(this.top-this.bottom)/(2*this.zoom),W=(this.right+this.left)/2,R=(this.top+this.bottom)/2,J=W-E,Q=W+E,$=R+H,Z=R-H;if(this.view!==null&&this.view.enabled){let K=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;J+=K*this.view.offsetX,Q=J+K*this.view.width,$-=U*this.view.offsetY,Z=$-U*this.view.height}this.projectionMatrix.makeOrthographic(J,Q,$,Z,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(E){let H=super.toJSON(E);if(H.object.zoom=this.zoom,H.object.left=this.left,H.object.right=this.right,H.object.top=this.top,H.object.bottom=this.bottom,H.object.near=this.near,H.object.far=this.far,this.view!==null)H.object.view=Object.assign({},this.view);return H}}class $6 extends WE{constructor(){super();this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(E){return super.copy(E),this.instanceCount=E.instanceCount,this}toJSON(){let E=super.toJSON();return E.instanceCount=this.instanceCount,E.isInstancedBufferGeometry=!0,E}}var GW=-90,YW=1;class GR extends WH{constructor(E,H,W){super();this.type="CubeCamera",this.renderTarget=W,this.coordinateSystem=null,this.activeMipmapLevel=0;let R=new MH(GW,YW,E,H);R.layers=this.layers,this.add(R);let J=new MH(GW,YW,E,H);J.layers=this.layers,this.add(J);let Q=new MH(GW,YW,E,H);Q.layers=this.layers,this.add(Q);let $=new MH(GW,YW,E,H);$.layers=this.layers,this.add($);let Z=new MH(GW,YW,E,H);Z.layers=this.layers,this.add(Z);let K=new MH(GW,YW,E,H);K.layers=this.layers,this.add(K)}updateCoordinateSystem(){let E=this.coordinateSystem,H=this.children.concat(),[W,R,J,Q,$,Z]=H;for(let K of H)this.remove(K);if(E===2000)W.up.set(0,1,0),W.lookAt(1,0,0),R.up.set(0,1,0),R.lookAt(-1,0,0),J.up.set(0,0,-1),J.lookAt(0,1,0),Q.up.set(0,0,1),Q.lookAt(0,-1,0),$.up.set(0,1,0),$.lookAt(0,0,1),Z.up.set(0,1,0),Z.lookAt(0,0,-1);else if(E===2001)W.up.set(0,-1,0),W.lookAt(-1,0,0),R.up.set(0,-1,0),R.lookAt(1,0,0),J.up.set(0,0,1),J.lookAt(0,1,0),Q.up.set(0,0,-1),Q.lookAt(0,-1,0),$.up.set(0,-1,0),$.lookAt(0,0,1),Z.up.set(0,-1,0),Z.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+E);for(let K of H)this.add(K),K.updateMatrixWorld()}update(E,H){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:W,activeMipmapLevel:R}=this;if(this.coordinateSystem!==E.coordinateSystem)this.coordinateSystem=E.coordinateSystem,this.updateCoordinateSystem();let[J,Q,$,Z,K,U]=this.children,X=E.getRenderTarget(),Y=E.getActiveCubeFace(),G=E.getActiveMipmapLevel(),D=E.xr.enabled;E.xr.enabled=!1;let F=W.texture.generateMipmaps;W.texture.generateMipmaps=!1;let w=!1;if(E.isWebGLRenderer===!0)w=E.state.buffers.depth.getReversed();else w=E.reversedDepthBuffer;if(E.setRenderTarget(W,0,R),w&&E.autoClear===!1)E.clearDepth();if(E.render(H,J),E.setRenderTarget(W,1,R),w&&E.autoClear===!1)E.clearDepth();if(E.render(H,Q),E.setRenderTarget(W,2,R),w&&E.autoClear===!1)E.clearDepth();if(E.render(H,$),E.setRenderTarget(W,3,R),w&&E.autoClear===!1)E.clearDepth();if(E.render(H,Z),E.setRenderTarget(W,4,R),w&&E.autoClear===!1)E.clearDepth();if(E.render(H,K),W.texture.generateMipmaps=F,E.setRenderTarget(W,5,R),w&&E.autoClear===!1)E.clearDepth();E.render(H,U),E.setRenderTarget(X,Y,G),E.xr.enabled=D,W.texture.needsPMREMUpdate=!0}}class YR extends MH{constructor(E=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=E}}var MR="\\[\\]\\.:\\/",NZ=new RegExp("["+MR+"]","g"),DR="[^"+MR+"]",FZ="[^"+MR.replace("\\.","")+"]",LZ=/((?:WC+[\/:])*)/.source.replace("WC",DR),OZ=/(WCOD+)?/.source.replace("WCOD",FZ),BZ=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",DR),wZ=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",DR),kZ=new RegExp("^"+LZ+OZ+BZ+wZ+"$"),VZ=["material","materials","bones","map"];class QQ{constructor(E,H,W){let R=W||XE.parseTrackName(H);this._targetGroup=E,this._bindings=E.subscribe_(H,R)}getValue(E,H){this.bind();let W=this._targetGroup.nCachedObjects_,R=this._bindings[W];if(R!==void 0)R.getValue(E,H)}setValue(E,H){let W=this._bindings;for(let R=this._targetGroup.nCachedObjects_,J=W.length;R!==J;++R)W[R].setValue(E,H)}bind(){let E=this._bindings;for(let H=this._targetGroup.nCachedObjects_,W=E.length;H!==W;++H)E[H].bind()}unbind(){let E=this._bindings;for(let H=this._targetGroup.nCachedObjects_,W=E.length;H!==W;++H)E[H].unbind()}}class XE{constructor(E,H,W){this.path=H,this.parsedPath=W||XE.parseTrackName(H),this.node=XE.findNode(E,this.parsedPath.nodeName),this.rootNode=E,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(E,H,W){if(!(E&&E.isAnimationObjectGroup))return new XE(E,H,W);else return new XE.Composite(E,H,W)}static sanitizeNodeName(E){return E.replace(/\s/g,"_").replace(NZ,"")}static parseTrackName(E){let H=kZ.exec(E);if(H===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+E);let W={nodeName:H[2],objectName:H[3],objectIndex:H[4],propertyName:H[5],propertyIndex:H[6]},R=W.nodeName&&W.nodeName.lastIndexOf(".");if(R!==void 0&&R!==-1){let J=W.nodeName.substring(R+1);if(VZ.indexOf(J)!==-1)W.nodeName=W.nodeName.substring(0,R),W.objectName=J}if(W.propertyName===null||W.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+E);return W}static findNode(E,H){if(H===void 0||H===""||H==="."||H===-1||H===E.name||H===E.uuid)return E;if(E.skeleton){let W=E.skeleton.getBoneByName(H);if(W!==void 0)return W}if(E.children){let W=function(J){for(let Q=0;Q<J.length;Q++){let $=J[Q];if($.name===H||$.uuid===H)return $;let Z=W($.children);if(Z)return Z}return null},R=W(E.children);if(R)return R}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(E,H){E[H]=this.targetObject[this.propertyName]}_getValue_array(E,H){let W=this.resolvedProperty;for(let R=0,J=W.length;R!==J;++R)E[H++]=W[R]}_getValue_arrayElement(E,H){E[H]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(E,H){this.resolvedProperty.toArray(E,H)}_setValue_direct(E,H){this.targetObject[this.propertyName]=E[H]}_setValue_direct_setNeedsUpdate(E,H){this.targetObject[this.propertyName]=E[H],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(E,H){this.targetObject[this.propertyName]=E[H],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(E,H){let W=this.resolvedProperty;for(let R=0,J=W.length;R!==J;++R)W[R]=E[H++]}_setValue_array_setNeedsUpdate(E,H){let W=this.resolvedProperty;for(let R=0,J=W.length;R!==J;++R)W[R]=E[H++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(E,H){let W=this.resolvedProperty;for(let R=0,J=W.length;R!==J;++R)W[R]=E[H++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(E,H){this.resolvedProperty[this.propertyIndex]=E[H]}_setValue_arrayElement_setNeedsUpdate(E,H){this.resolvedProperty[this.propertyIndex]=E[H],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(E,H){this.resolvedProperty[this.propertyIndex]=E[H],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(E,H){this.resolvedProperty.fromArray(E,H)}_setValue_fromArray_setNeedsUpdate(E,H){this.resolvedProperty.fromArray(E,H),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(E,H){this.resolvedProperty.fromArray(E,H),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(E,H){this.bind(),this.getValue(E,H)}_setValue_unbound(E,H){this.bind(),this.setValue(E,H)}bind(){let E=this.node,H=this.parsedPath,W=H.objectName,R=H.propertyName,J=H.propertyIndex;if(!E)E=XE.findNode(this.rootNode,H.nodeName),this.node=E;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!E){h0("PropertyBinding: No target node found for track: "+this.path+".");return}if(W){let K=H.objectIndex;switch(W){case"materials":if(!E.material){g0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!E.material.materials){g0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}E=E.material.materials;break;case"bones":if(!E.skeleton){g0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}E=E.skeleton.bones;for(let U=0;U<E.length;U++)if(E[U].name===K){K=U;break}break;case"map":if("map"in E){E=E.map;break}if(!E.material){g0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!E.material.map){g0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}E=E.material.map;break;default:if(E[W]===void 0){g0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}E=E[W]}if(K!==void 0){if(E[K]===void 0){g0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,E);return}E=E[K]}}let Q=E[R];if(Q===void 0){let K=H.nodeName;g0("PropertyBinding: Trying to update property for track: "+K+"."+R+" but it wasn't found.",E);return}let $=this.Versioning.None;if(this.targetObject=E,E.isMaterial===!0)$=this.Versioning.NeedsUpdate;else if(E.isObject3D===!0)$=this.Versioning.MatrixWorldNeedsUpdate;let Z=this.BindingType.Direct;if(J!==void 0){if(R==="morphTargetInfluences"){if(!E.geometry){g0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!E.geometry.morphAttributes){g0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(E.morphTargetDictionary[J]!==void 0)J=E.morphTargetDictionary[J]}Z=this.BindingType.ArrayElement,this.resolvedProperty=Q,this.propertyIndex=J}else if(Q.fromArray!==void 0&&Q.toArray!==void 0)Z=this.BindingType.HasFromToArray,this.resolvedProperty=Q;else if(Array.isArray(Q))Z=this.BindingType.EntireArray,this.resolvedProperty=Q;else this.propertyName=R;this.getValue=this.GetterByBindingType[Z],this.setValue=this.SetterByBindingTypeAndVersioning[Z][$]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}XE.Composite=QQ;XE.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};XE.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};XE.prototype.GetterByBindingType=[XE.prototype._getValue_direct,XE.prototype._getValue_array,XE.prototype._getValue_arrayElement,XE.prototype._getValue_toArray];XE.prototype.SetterByBindingTypeAndVersioning=[[XE.prototype._setValue_direct,XE.prototype._setValue_direct_setNeedsUpdate,XE.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[XE.prototype._setValue_array,XE.prototype._setValue_array_setNeedsUpdate,XE.prototype._setValue_array_setMatrixWorldNeedsUpdate],[XE.prototype._setValue_arrayElement,XE.prototype._setValue_arrayElement_setNeedsUpdate,XE.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[XE.prototype._setValue_fromArray,XE.prototype._setValue_fromArray_setNeedsUpdate,XE.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var r5=new Float32Array(1);class CR{static{CR.prototype.isMatrix2=!0}constructor(E,H,W,R){if(this.elements=[1,0,0,1],E!==void 0)this.set(E,H,W,R)}identity(){return this.set(1,0,0,1),this}fromArray(E,H=0){for(let W=0;W<4;W++)this.elements[W]=E[W+H];return this}set(E,H,W,R){let J=this.elements;return J[0]=E,J[2]=H,J[1]=W,J[3]=R,this}}function qR(E,H,W,R){let J=TZ(R);switch(W){case 1021:return E*H;case 1028:return E*H/J.components*J.byteLength;case 1029:return E*H/J.components*J.byteLength;case 1030:return E*H*2/J.components*J.byteLength;case 1031:return E*H*2/J.components*J.byteLength;case 1022:return E*H*3/J.components*J.byteLength;case 1023:return E*H*4/J.components*J.byteLength;case 1033:return E*H*4/J.components*J.byteLength;case 33776:case 33777:return Math.floor((E+3)/4)*Math.floor((H+3)/4)*8;case 33778:case 33779:return Math.floor((E+3)/4)*Math.floor((H+3)/4)*16;case 35841:case 35843:return Math.max(E,16)*Math.max(H,8)/4;case 35840:case 35842:return Math.max(E,8)*Math.max(H,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((E+3)/4)*Math.floor((H+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((E+3)/4)*Math.floor((H+3)/4)*16;case 37808:return Math.floor((E+3)/4)*Math.floor((H+3)/4)*16;case 37809:return Math.floor((E+4)/5)*Math.floor((H+3)/4)*16;case 37810:return Math.floor((E+4)/5)*Math.floor((H+4)/5)*16;case 37811:return Math.floor((E+5)/6)*Math.floor((H+4)/5)*16;case 37812:return Math.floor((E+5)/6)*Math.floor((H+5)/6)*16;case 37813:return Math.floor((E+7)/8)*Math.floor((H+4)/5)*16;case 37814:return Math.floor((E+7)/8)*Math.floor((H+5)/6)*16;case 37815:return Math.floor((E+7)/8)*Math.floor((H+7)/8)*16;case 37816:return Math.floor((E+9)/10)*Math.floor((H+4)/5)*16;case 37817:return Math.floor((E+9)/10)*Math.floor((H+5)/6)*16;case 37818:return Math.floor((E+9)/10)*Math.floor((H+7)/8)*16;case 37819:return Math.floor((E+9)/10)*Math.floor((H+9)/10)*16;case 37820:return Math.floor((E+11)/12)*Math.floor((H+9)/10)*16;case 37821:return Math.floor((E+11)/12)*Math.floor((H+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(E/4)*Math.ceil(H/4)*16;case 36283:case 36284:return Math.ceil(E/4)*Math.ceil(H/4)*8;case 36285:case 36286:return Math.ceil(E/4)*Math.ceil(H/4)*16}throw Error(`Unable to determine texture byte length for ${W} format.`)}function TZ(E){switch(E){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${E}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)h0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";function zQ(){let E=null,H=!1,W=null,R=null;function J(Q,$){R=E.requestAnimationFrame(J),W(Q,$)}return{start:function(){if(H===!0)return;if(W===null)return;if(E===null)return;R=E.requestAnimationFrame(J),H=!0},stop:function(){if(E!==null)E.cancelAnimationFrame(R);H=!1},setAnimationLoop:function(Q){W=Q},setContext:function(Q){E=Q}}}function PZ(E){let H=new WeakMap;function W(Z,K){let{array:U,usage:X}=Z,Y=U.byteLength,G=E.createBuffer();E.bindBuffer(K,G),E.bufferData(K,U,X),Z.onUploadCallback();let D;if(U instanceof Float32Array)D=E.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)D=E.HALF_FLOAT;else if(U instanceof Uint16Array)if(Z.isFloat16BufferAttribute)D=E.HALF_FLOAT;else D=E.UNSIGNED_SHORT;else if(U instanceof Int16Array)D=E.SHORT;else if(U instanceof Uint32Array)D=E.UNSIGNED_INT;else if(U instanceof Int32Array)D=E.INT;else if(U instanceof Int8Array)D=E.BYTE;else if(U instanceof Uint8Array)D=E.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)D=E.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:G,type:D,bytesPerElement:U.BYTES_PER_ELEMENT,version:Z.version,size:Y}}function R(Z,K,U){let{array:X,updateRanges:Y}=K;if(E.bindBuffer(U,Z),Y.length===0)E.bufferSubData(U,0,X);else{Y.sort((D,F)=>D.start-F.start);let G=0;for(let D=1;D<Y.length;D++){let F=Y[G],w=Y[D];if(w.start<=F.start+F.count+1)F.count=Math.max(F.count,w.start+w.count-F.start);else++G,Y[G]=w}Y.length=G+1;for(let D=0,F=Y.length;D<F;D++){let w=Y[D];E.bufferSubData(U,w.start*X.BYTES_PER_ELEMENT,X,w.start,w.count)}K.clearUpdateRanges()}K.onUploadCallback()}function J(Z){if(Z.isInterleavedBufferAttribute)Z=Z.data;return H.get(Z)}function Q(Z){if(Z.isInterleavedBufferAttribute)Z=Z.data;let K=H.get(Z);if(K)E.deleteBuffer(K.buffer),H.delete(Z)}function $(Z,K){if(Z.isInterleavedBufferAttribute)Z=Z.data;if(Z.isGLBufferAttribute){let X=H.get(Z);if(!X||X.version<Z.version)H.set(Z,{buffer:Z.buffer,type:Z.type,bytesPerElement:Z.elementSize,version:Z.version});return}let U=H.get(Z);if(U===void 0)H.set(Z,W(Z,K));else if(U.version<Z.version){if(U.size!==Z.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");R(U.buffer,Z,K),U.version=Z.version}}return{get:J,remove:Q,update:$}}var zZ=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,AZ=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,IZ=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_Z=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,SZ=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jZ=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yZ=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hZ=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vZ=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,fZ=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bZ=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xZ=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gZ=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pZ=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lZ=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mZ=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,uZ=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dZ=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cZ=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nZ=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sZ=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,iZ=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,oZ=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,aZ=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rZ=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,tZ=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,eZ=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,EK=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,HK=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,WK=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,RK="gl_FragColor = linearToOutputTexel( gl_FragColor );",JK=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,QK=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,$K=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ZK=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,KK=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,UK=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,XK=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,GK=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,YK=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,MK=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,DK=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,CK=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qK=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,NK=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,FK=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,LK=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,OK=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,BK=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wK=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kK=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,VK=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,TK=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,PK=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,zK=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,AK=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,IK=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,_K=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,SK=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jK=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yK=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hK=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vK=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fK=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,bK=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xK=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gK=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pK=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lK=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mK=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uK=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dK=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cK=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nK=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sK=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iK=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oK=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,aK=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rK=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tK=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,eK=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,EU=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,HU=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,WU=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,RU=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,JU=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,QU=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$U=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ZU=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,KU=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,UU=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,XU=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,GU=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,YU=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,MU=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,DU=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,CU=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qU=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,NU=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,FU=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,LU=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,OU=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,BU=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wU=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,VU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,TU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,PU=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,zU=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,AU=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,IU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_U=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jU=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yU=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hU=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,vU=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fU=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,bU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xU=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gU=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pU=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lU=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mU=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uU=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dU=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cU=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nU=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sU=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iU=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,oU=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aU=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rU=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tU=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eU=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,EX=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HX=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,WX=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,RX=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,JX=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,QX=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$X=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,c0={alphahash_fragment:zZ,alphahash_pars_fragment:AZ,alphamap_fragment:IZ,alphamap_pars_fragment:_Z,alphatest_fragment:SZ,alphatest_pars_fragment:jZ,aomap_fragment:yZ,aomap_pars_fragment:hZ,batching_pars_vertex:vZ,batching_vertex:fZ,begin_vertex:bZ,beginnormal_vertex:xZ,bsdfs:gZ,iridescence_fragment:pZ,bumpmap_pars_fragment:lZ,clipping_planes_fragment:mZ,clipping_planes_pars_fragment:uZ,clipping_planes_pars_vertex:dZ,clipping_planes_vertex:cZ,color_fragment:nZ,color_pars_fragment:sZ,color_pars_vertex:iZ,color_vertex:oZ,common:aZ,cube_uv_reflection_fragment:rZ,defaultnormal_vertex:tZ,displacementmap_pars_vertex:eZ,displacementmap_vertex:EK,emissivemap_fragment:HK,emissivemap_pars_fragment:WK,colorspace_fragment:RK,colorspace_pars_fragment:JK,envmap_fragment:QK,envmap_common_pars_fragment:$K,envmap_pars_fragment:ZK,envmap_pars_vertex:KK,envmap_physical_pars_fragment:LK,envmap_vertex:UK,fog_vertex:XK,fog_pars_vertex:GK,fog_fragment:YK,fog_pars_fragment:MK,gradientmap_pars_fragment:DK,lightmap_pars_fragment:CK,lights_lambert_fragment:qK,lights_lambert_pars_fragment:NK,lights_pars_begin:FK,lights_toon_fragment:OK,lights_toon_pars_fragment:BK,lights_phong_fragment:wK,lights_phong_pars_fragment:kK,lights_physical_fragment:VK,lights_physical_pars_fragment:TK,lights_fragment_begin:PK,lights_fragment_maps:zK,lights_fragment_end:AK,lightprobes_pars_fragment:IK,logdepthbuf_fragment:_K,logdepthbuf_pars_fragment:SK,logdepthbuf_pars_vertex:jK,logdepthbuf_vertex:yK,map_fragment:hK,map_pars_fragment:vK,map_particle_fragment:fK,map_particle_pars_fragment:bK,metalnessmap_fragment:xK,metalnessmap_pars_fragment:gK,morphinstance_vertex:pK,morphcolor_vertex:lK,morphnormal_vertex:mK,morphtarget_pars_vertex:uK,morphtarget_vertex:dK,normal_fragment_begin:cK,normal_fragment_maps:nK,normal_pars_fragment:sK,normal_pars_vertex:iK,normal_vertex:oK,normalmap_pars_fragment:aK,clearcoat_normal_fragment_begin:rK,clearcoat_normal_fragment_maps:tK,clearcoat_pars_fragment:eK,iridescence_pars_fragment:EU,opaque_fragment:HU,packing:WU,premultiplied_alpha_fragment:RU,project_vertex:JU,dithering_fragment:QU,dithering_pars_fragment:$U,roughnessmap_fragment:ZU,roughnessmap_pars_fragment:KU,shadowmap_pars_fragment:UU,shadowmap_pars_vertex:XU,shadowmap_vertex:GU,shadowmask_pars_fragment:YU,skinbase_vertex:MU,skinning_pars_vertex:DU,skinning_vertex:CU,skinnormal_vertex:qU,specularmap_fragment:NU,specularmap_pars_fragment:FU,tonemapping_fragment:LU,tonemapping_pars_fragment:OU,transmission_fragment:BU,transmission_pars_fragment:wU,uv_pars_fragment:kU,uv_pars_vertex:VU,uv_vertex:TU,worldpos_vertex:PU,background_vert:zU,background_frag:AU,backgroundCube_vert:IU,backgroundCube_frag:_U,cube_vert:SU,cube_frag:jU,depth_vert:yU,depth_frag:hU,distance_vert:vU,distance_frag:fU,equirect_vert:bU,equirect_frag:xU,linedashed_vert:gU,linedashed_frag:pU,meshbasic_vert:lU,meshbasic_frag:mU,meshlambert_vert:uU,meshlambert_frag:dU,meshmatcap_vert:cU,meshmatcap_frag:nU,meshnormal_vert:sU,meshnormal_frag:iU,meshphong_vert:oU,meshphong_frag:aU,meshphysical_vert:rU,meshphysical_frag:tU,meshtoon_vert:eU,meshtoon_frag:EX,points_vert:HX,points_frag:WX,shadow_vert:RX,shadow_frag:JX,sprite_vert:QX,sprite_frag:$X},C0={common:{diffuse:{value:new e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new p0},alphaMap:{value:null},alphaMapTransform:{value:new p0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new p0}},envmap:{envMap:{value:null},envMapRotation:{value:new p0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new p0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new p0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new p0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new p0},normalScale:{value:new m0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new p0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new p0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new p0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new p0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new b},probesMax:{value:new b},probesResolution:{value:new b}},points:{diffuse:{value:new e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new p0},alphaTest:{value:0},uvTransform:{value:new p0}},sprite:{diffuse:{value:new e(16777215)},opacity:{value:1},center:{value:new m0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new p0},alphaMap:{value:null},alphaMapTransform:{value:new p0},alphaTest:{value:0}}},uH={basic:{uniforms:rE([C0.common,C0.specularmap,C0.envmap,C0.aomap,C0.lightmap,C0.fog]),vertexShader:c0.meshbasic_vert,fragmentShader:c0.meshbasic_frag},lambert:{uniforms:rE([C0.common,C0.specularmap,C0.envmap,C0.aomap,C0.lightmap,C0.emissivemap,C0.bumpmap,C0.normalmap,C0.displacementmap,C0.fog,C0.lights,{emissive:{value:new e(0)},envMapIntensity:{value:1}}]),vertexShader:c0.meshlambert_vert,fragmentShader:c0.meshlambert_frag},phong:{uniforms:rE([C0.common,C0.specularmap,C0.envmap,C0.aomap,C0.lightmap,C0.emissivemap,C0.bumpmap,C0.normalmap,C0.displacementmap,C0.fog,C0.lights,{emissive:{value:new e(0)},specular:{value:new e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:c0.meshphong_vert,fragmentShader:c0.meshphong_frag},standard:{uniforms:rE([C0.common,C0.envmap,C0.aomap,C0.lightmap,C0.emissivemap,C0.bumpmap,C0.normalmap,C0.displacementmap,C0.roughnessmap,C0.metalnessmap,C0.fog,C0.lights,{emissive:{value:new e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:c0.meshphysical_vert,fragmentShader:c0.meshphysical_frag},toon:{uniforms:rE([C0.common,C0.aomap,C0.lightmap,C0.emissivemap,C0.bumpmap,C0.normalmap,C0.displacementmap,C0.gradientmap,C0.fog,C0.lights,{emissive:{value:new e(0)}}]),vertexShader:c0.meshtoon_vert,fragmentShader:c0.meshtoon_frag},matcap:{uniforms:rE([C0.common,C0.bumpmap,C0.normalmap,C0.displacementmap,C0.fog,{matcap:{value:null}}]),vertexShader:c0.meshmatcap_vert,fragmentShader:c0.meshmatcap_frag},points:{uniforms:rE([C0.points,C0.fog]),vertexShader:c0.points_vert,fragmentShader:c0.points_frag},dashed:{uniforms:rE([C0.common,C0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:c0.linedashed_vert,fragmentShader:c0.linedashed_frag},depth:{uniforms:rE([C0.common,C0.displacementmap]),vertexShader:c0.depth_vert,fragmentShader:c0.depth_frag},normal:{uniforms:rE([C0.common,C0.bumpmap,C0.normalmap,C0.displacementmap,{opacity:{value:1}}]),vertexShader:c0.meshnormal_vert,fragmentShader:c0.meshnormal_frag},sprite:{uniforms:rE([C0.sprite,C0.fog]),vertexShader:c0.sprite_vert,fragmentShader:c0.sprite_frag},background:{uniforms:{uvTransform:{value:new p0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:c0.background_vert,fragmentShader:c0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new p0}},vertexShader:c0.backgroundCube_vert,fragmentShader:c0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:c0.cube_vert,fragmentShader:c0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:c0.equirect_vert,fragmentShader:c0.equirect_frag},distance:{uniforms:rE([C0.common,C0.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:c0.distance_vert,fragmentShader:c0.distance_frag},shadow:{uniforms:rE([C0.lights,C0.fog,{color:{value:new e(0)},opacity:{value:1}}]),vertexShader:c0.shadow_vert,fragmentShader:c0.shadow_frag}};uH.physical={uniforms:rE([uH.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new p0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new p0},clearcoatNormalScale:{value:new m0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new p0},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new p0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new p0},sheen:{value:0},sheenColor:{value:new e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new p0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new p0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new p0},transmissionSamplerSize:{value:new m0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new p0},attenuationDistance:{value:0},attenuationColor:{value:new e(0)},specularColor:{value:new e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new p0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new p0},anisotropyVector:{value:new m0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new p0}}]),vertexShader:c0.meshphysical_vert,fragmentShader:c0.meshphysical_frag};var Z6={r:0,b:0,g:0},ZX=new AE,AQ=new p0;AQ.set(-1,0,0,0,1,0,0,0,1);function KX(E,H,W,R,J,Q){let $=new e(0),Z=J===!0?0:1,K,U,X=null,Y=0,G=null;function D(T){let y=T.isScene===!0?T.background:null;if(y&&y.isTexture){let B=T.backgroundBlurriness>0;y=H.get(y,B)}return y}function F(T){let y=!1,B=D(T);if(B===null)C($,Z);else if(B&&B.isColor)C(B,1),y=!0;let V=E.xr.getEnvironmentBlendMode();if(V==="additive")W.buffers.color.setClear(0,0,0,1,Q);else if(V==="alpha-blend")W.buffers.color.setClear(0,0,0,0,Q);if(E.autoClear||y)W.buffers.depth.setTest(!0),W.buffers.depth.setMask(!0),W.buffers.color.setMask(!0),E.clear(E.autoClearColor,E.autoClearDepth,E.autoClearStencil)}function w(T,y){let B=D(y);if(B&&(B.isCubeTexture||B.mapping===mW)){if(U===void 0)U=new s0(new OW(1,1,1),new SE({name:"BackgroundCubeMaterial",uniforms:p8(uH.backgroundCube.uniforms),vertexShader:uH.backgroundCube.vertexShader,fragmentShader:uH.backgroundCube.fragmentShader,side:UH,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(V,P,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),R.update(U);if(U.material.uniforms.envMap.value=B,U.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(ZX.makeRotationFromEuler(y.backgroundRotation)).transpose(),B.isCubeTexture&&B.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(AQ);if(U.material.toneMapped=a0.getTransfer(B.colorSpace)!==FE,X!==B||Y!==B.version||G!==E.toneMapping)U.material.needsUpdate=!0,X=B,Y=B.version,G=E.toneMapping;U.layers.enableAll(),T.unshift(U,U.geometry,U.material,0,0,null)}else if(B&&B.isTexture){if(K===void 0)K=new s0(new PH(2,2),new SE({name:"BackgroundMaterial",uniforms:p8(uH.background.uniforms),vertexShader:uH.background.vertexShader,fragmentShader:uH.background.fragmentShader,side:qW,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),K.geometry.deleteAttribute("normal"),Object.defineProperty(K.material,"map",{get:function(){return this.uniforms.t2D.value}}),R.update(K);if(K.material.uniforms.t2D.value=B,K.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,K.material.toneMapped=a0.getTransfer(B.colorSpace)!==FE,B.matrixAutoUpdate===!0)B.updateMatrix();if(K.material.uniforms.uvTransform.value.copy(B.matrix),X!==B||Y!==B.version||G!==E.toneMapping)K.material.needsUpdate=!0,X=B,Y=B.version,G=E.toneMapping;K.layers.enableAll(),T.unshift(K,K.geometry,K.material,0,0,null)}}function C(T,y){T.getRGB(Z6,r9(E)),W.buffers.color.setClear(Z6.r,Z6.g,Z6.b,y,Q)}function M(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(K!==void 0)K.geometry.dispose(),K.material.dispose(),K=void 0}return{getClearColor:function(){return $},setClearColor:function(T,y=1){$.set(T),Z=y,C($,Z)},getClearAlpha:function(){return Z},setClearAlpha:function(T){Z=T,C($,Z)},render:F,addToRenderList:w,dispose:M}}function UX(E,H){let W=E.getParameter(E.MAX_VERTEX_ATTRIBS),R={},J=G(null),Q=J,$=!1;function Z(h,v,d,z,u){let a=!1,p=Y(h,z,d,v);if(Q!==p)Q=p,U(Q.object);if(a=D(h,z,d,u),a)F(h,z,d,u);if(u!==null)H.update(u,E.ELEMENT_ARRAY_BUFFER);if(a||$){if($=!1,B(h,v,d,z),u!==null)E.bindBuffer(E.ELEMENT_ARRAY_BUFFER,H.get(u).buffer)}}function K(){return E.createVertexArray()}function U(h){return E.bindVertexArray(h)}function X(h){return E.deleteVertexArray(h)}function Y(h,v,d,z){let u=z.wireframe===!0,a=R[v.id];if(a===void 0)a={},R[v.id]=a;let p=h.isInstancedMesh===!0?h.id:0,J0=a[p];if(J0===void 0)J0={},a[p]=J0;let s=J0[d.id];if(s===void 0)s={},J0[d.id]=s;let t=s[u];if(t===void 0)t=G(K()),s[u]=t;return t}function G(h){let v=[],d=[],z=[];for(let u=0;u<W;u++)v[u]=0,d[u]=0,z[u]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:d,attributeDivisors:z,object:h,attributes:{},index:null}}function D(h,v,d,z){let u=Q.attributes,a=v.attributes,p=0,J0=d.getAttributes();for(let s in J0)if(J0[s].location>=0){let R0=u[s],S0=a[s];if(S0===void 0){if(s==="instanceMatrix"&&h.instanceMatrix)S0=h.instanceMatrix;if(s==="instanceColor"&&h.instanceColor)S0=h.instanceColor}if(R0===void 0)return!0;if(R0.attribute!==S0)return!0;if(S0&&R0.data!==S0.data)return!0;p++}if(Q.attributesNum!==p)return!0;if(Q.index!==z)return!0;return!1}function F(h,v,d,z){let u={},a=v.attributes,p=0,J0=d.getAttributes();for(let s in J0)if(J0[s].location>=0){let R0=a[s];if(R0===void 0){if(s==="instanceMatrix"&&h.instanceMatrix)R0=h.instanceMatrix;if(s==="instanceColor"&&h.instanceColor)R0=h.instanceColor}let S0={};if(S0.attribute=R0,R0&&R0.data)S0.data=R0.data;u[s]=S0,p++}Q.attributes=u,Q.attributesNum=p,Q.index=z}function w(){let h=Q.newAttributes;for(let v=0,d=h.length;v<d;v++)h[v]=0}function C(h){M(h,0)}function M(h,v){let{newAttributes:d,enabledAttributes:z,attributeDivisors:u}=Q;if(d[h]=1,z[h]===0)E.enableVertexAttribArray(h),z[h]=1;if(u[h]!==v)E.vertexAttribDivisor(h,v),u[h]=v}function T(){let{newAttributes:h,enabledAttributes:v}=Q;for(let d=0,z=v.length;d<z;d++)if(v[d]!==h[d])E.disableVertexAttribArray(d),v[d]=0}function y(h,v,d,z,u,a,p){if(p===!0)E.vertexAttribIPointer(h,v,d,u,a);else E.vertexAttribPointer(h,v,d,z,u,a)}function B(h,v,d,z){w();let u=z.attributes,a=d.getAttributes(),p=v.defaultAttributeValues;for(let J0 in a){let s=a[J0];if(s.location>=0){let t=u[J0];if(t===void 0){if(J0==="instanceMatrix"&&h.instanceMatrix)t=h.instanceMatrix;if(J0==="instanceColor"&&h.instanceColor)t=h.instanceColor}if(t!==void 0){let{normalized:R0,itemSize:S0}=t,A0=H.get(t);if(A0===void 0)continue;let{buffer:YE,type:u0,bytesPerElement:i}=A0,$0=u0===E.INT||u0===E.UNSIGNED_INT||t.gpuType===R9;if(t.isInterleavedBufferAttribute){let U0=t.data,j0=U0.stride,f0=t.offset;if(U0.isInstancedInterleavedBuffer){for(let I0=0;I0<s.locationSize;I0++)M(s.location+I0,U0.meshPerAttribute);if(h.isInstancedMesh!==!0&&z._maxInstanceCount===void 0)z._maxInstanceCount=U0.meshPerAttribute*U0.count}else for(let I0=0;I0<s.locationSize;I0++)C(s.location+I0);E.bindBuffer(E.ARRAY_BUFFER,YE);for(let I0=0;I0<s.locationSize;I0++)y(s.location+I0,S0/s.locationSize,u0,R0,j0*i,(f0+S0/s.locationSize*I0)*i,$0)}else{if(t.isInstancedBufferAttribute){for(let U0=0;U0<s.locationSize;U0++)M(s.location+U0,t.meshPerAttribute);if(h.isInstancedMesh!==!0&&z._maxInstanceCount===void 0)z._maxInstanceCount=t.meshPerAttribute*t.count}else for(let U0=0;U0<s.locationSize;U0++)C(s.location+U0);E.bindBuffer(E.ARRAY_BUFFER,YE);for(let U0=0;U0<s.locationSize;U0++)y(s.location+U0,S0/s.locationSize,u0,R0,S0*i,S0/s.locationSize*U0*i,$0)}}else if(p!==void 0){let R0=p[J0];if(R0!==void 0)switch(R0.length){case 2:E.vertexAttrib2fv(s.location,R0);break;case 3:E.vertexAttrib3fv(s.location,R0);break;case 4:E.vertexAttrib4fv(s.location,R0);break;default:E.vertexAttrib1fv(s.location,R0)}}}}T()}function V(){k();for(let h in R){let v=R[h];for(let d in v){let z=v[d];for(let u in z){let a=z[u];for(let p in a)X(a[p].object),delete a[p];delete z[u]}}delete R[h]}}function P(h){if(R[h.id]===void 0)return;let v=R[h.id];for(let d in v){let z=v[d];for(let u in z){let a=z[u];for(let p in a)X(a[p].object),delete a[p];delete z[u]}}delete R[h.id]}function A(h){for(let v in R){let d=R[v];for(let z in d){let u=d[z];if(u[h.id]===void 0)continue;let a=u[h.id];for(let p in a)X(a[p].object),delete a[p];delete u[h.id]}}}function L(h){for(let v in R){let d=R[v],z=h.isInstancedMesh===!0?h.id:0,u=d[z];if(u===void 0)continue;for(let a in u){let p=u[a];for(let J0 in p)X(p[J0].object),delete p[J0];delete u[a]}if(delete d[z],Object.keys(d).length===0)delete R[v]}}function k(){if(c(),$=!0,Q===J)return;Q=J,U(Q.object)}function c(){J.geometry=null,J.program=null,J.wireframe=!1}return{setup:Z,reset:k,resetDefaultState:c,dispose:V,releaseStatesOfGeometry:P,releaseStatesOfObject:L,releaseStatesOfProgram:A,initAttributes:w,enableAttribute:C,disableUnusedAttributes:T}}function XX(E,H,W){let R;function J(K){R=K}function Q(K,U){E.drawArrays(R,K,U),W.update(U,R,1)}function $(K,U,X){if(X===0)return;E.drawArraysInstanced(R,K,U,X),W.update(U,R,X)}function Z(K,U,X){if(X===0)return;H.get("WEBGL_multi_draw").multiDrawArraysWEBGL(R,K,0,U,0,X);let G=0;for(let D=0;D<X;D++)G+=U[D];W.update(G,R,1)}this.setMode=J,this.render=Q,this.renderInstances=$,this.renderMultiDraw=Z}function GX(E,H,W,R){let J;function Q(){if(J!==void 0)return J;if(H.has("EXT_texture_filter_anisotropic")===!0){let A=H.get("EXT_texture_filter_anisotropic");J=E.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else J=0;return J}function $(A){if(A!==kH&&R.convert(A)!==E.getParameter(E.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Z(A){let L=A===wH&&(H.has("EXT_color_buffer_half_float")||H.has("EXT_color_buffer_float"));if(A!==yH&&A!==E8&&!L&&R.convert(A)!==E.getParameter(E.IMPLEMENTATION_COLOR_READ_TYPE))return!1;return!0}function K(A){if(A==="highp"){if(E.getShaderPrecisionFormat(E.VERTEX_SHADER,E.HIGH_FLOAT).precision>0&&E.getShaderPrecisionFormat(E.FRAGMENT_SHADER,E.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(E.getShaderPrecisionFormat(E.VERTEX_SHADER,E.MEDIUM_FLOAT).precision>0&&E.getShaderPrecisionFormat(E.FRAGMENT_SHADER,E.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=W.precision!==void 0?W.precision:"highp",X=K(U);if(X!==U)h0("WebGLRenderer:",U,"not supported, using",X,"instead."),U=X;let Y=W.logarithmicDepthBuffer===!0,G=W.reversedDepthBuffer===!0&&H.has("EXT_clip_control");if(W.reversedDepthBuffer===!0&&G===!1)h0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let D=E.getParameter(E.MAX_TEXTURE_IMAGE_UNITS),F=E.getParameter(E.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=E.getParameter(E.MAX_TEXTURE_SIZE),C=E.getParameter(E.MAX_CUBE_MAP_TEXTURE_SIZE),M=E.getParameter(E.MAX_VERTEX_ATTRIBS),T=E.getParameter(E.MAX_VERTEX_UNIFORM_VECTORS),y=E.getParameter(E.MAX_VARYING_VECTORS),B=E.getParameter(E.MAX_FRAGMENT_UNIFORM_VECTORS),V=E.getParameter(E.MAX_SAMPLES),P=E.getParameter(E.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:Q,getMaxPrecision:K,textureFormatReadable:$,textureTypeReadable:Z,precision:U,logarithmicDepthBuffer:Y,reversedDepthBuffer:G,maxTextures:D,maxVertexTextures:F,maxTextureSize:w,maxCubemapSize:C,maxAttributes:M,maxVertexUniforms:T,maxVaryings:y,maxFragmentUniforms:B,maxSamples:V,samples:P}}function YX(E){let H=this,W=null,R=0,J=!1,Q=!1,$=new pH,Z=new p0,K={value:null,needsUpdate:!1};this.uniform=K,this.numPlanes=0,this.numIntersection=0,this.init=function(Y,G){let D=Y.length!==0||G||R!==0||J;return J=G,R=Y.length,D},this.beginShadows=function(){Q=!0,X(null)},this.endShadows=function(){Q=!1},this.setGlobalState=function(Y,G){W=X(Y,G,0)},this.setState=function(Y,G,D){let{clippingPlanes:F,clipIntersection:w,clipShadows:C}=Y,M=E.get(Y);if(!J||F===null||F.length===0||Q&&!C)if(Q)X(null);else U();else{let T=Q?0:R,y=T*4,B=M.clippingState||null;K.value=B,B=X(F,G,y,D);for(let V=0;V!==y;++V)B[V]=W[V];M.clippingState=B,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=T}};function U(){if(K.value!==W)K.value=W,K.needsUpdate=R>0;H.numPlanes=R,H.numIntersection=0}function X(Y,G,D,F){let w=Y!==null?Y.length:0,C=null;if(w!==0){if(C=K.value,F!==!0||C===null){let M=D+w*4,T=G.matrixWorldInverse;if(Z.getNormalMatrix(T),C===null||C.length<M)C=new Float32Array(M);for(let y=0,B=D;y!==w;++y,B+=4)$.copy(Y[y]).applyMatrix4(T,Z),$.normal.toArray(C,B),C[B+3]=$.constant}K.value=C,K.needsUpdate=!0}return H.numPlanes=w,H.numIntersection=0,C}}var kW=4,MX=6,DX=20,CX=256,iW=new BW,$Q=new e,NR=null,FR=0,LR=0,OR=!1,qX=new b,d8=new b;class kR{constructor(E){this._renderer=E,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(E,H=0,W=0.1,R=100,J={}){let{size:Q=256,position:$=qX}=J;NR=this._renderer.getRenderTarget(),FR=this._renderer.getActiveCubeFace(),LR=this._renderer.getActiveMipmapLevel(),OR=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(Q);let Z=this._allocateTargets();if(Z.depthBuffer=!0,this._sceneToCubeUV(E,W,R,Z,$),H>0)this._blur(Z,0,0,H);return this._applyPMREM(Z),this._cleanup(Z),Z}fromEquirectangular(E,H=null){return this._fromTexture(E,H)}fromCubemap(E,H=null){return this._fromTexture(E,H)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=UQ(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=KQ(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(E){this._lodMax=Math.floor(Math.log2(E)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let E=0;E<this._lodMeshes.length;E++)this._lodMeshes[E].geometry.dispose()}_cleanup(E){this._renderer.setRenderTarget(NR,FR,LR),this._renderer.xr.enabled=OR,E.scissorTest=!1,wW(E,0,0,E.width,E.height)}_fromTexture(E,H){if(E.mapping===FW||E.mapping===S8)this._setSize(E.image.length===0?16:E.image[0].width||E.image[0].image.width);else this._setSize(E.image.width/4);NR=this._renderer.getRenderTarget(),FR=this._renderer.getActiveCubeFace(),LR=this._renderer.getActiveMipmapLevel(),OR=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let W=H||this._allocateTargets();return this._textureToCubeUV(E,W),this._applyPMREM(W),this._cleanup(W),W}_allocateTargets(){let E=3*Math.max(this._cubeSize,112),H=4*this._cubeSize,W={magFilter:_E,minFilter:_E,generateMipmaps:!1,type:wH,format:kH,colorSpace:p9,depthBuffer:!1},R=ZQ(E,H,W);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==E||this._pingPongRenderTarget.height!==H){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=ZQ(E,H,W);let{_lodMax:J}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=NX(J)),this._blurMaterial=LX(J,E,H),this._ggxMaterial=FX(J,E,H)}return R}_compileMaterial(E){let H=new s0(new WE,E);this._renderer.compile(H,iW)}_sceneToCubeUV(E,H,W,R,J){let Z=new MH(90,1,H,W),K=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],X=this._renderer,Y=X.autoClear,G=X.toneMapping;if(X.getClearColor($Q),X.toneMapping=jH,X.autoClear=!1,X.state.buffers.depth.getReversed())X.setRenderTarget(R),X.clearDepth(),X.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new s0(new OW,new bE({name:"PMREM.Background",side:UH,depthWrite:!1,depthTest:!1}));let F=this._backgroundBox,w=F.material,C=!1,M=E.background;if(M){if(M.isColor)w.color.copy(M),E.background=null,C=!0}else w.color.copy($Q),C=!0;for(let T=0;T<6;T++){let y=T%3;if(y===0)Z.up.set(0,K[T],0),Z.position.set(J.x,J.y,J.z),Z.lookAt(J.x+U[T],J.y,J.z);else if(y===1)Z.up.set(0,0,K[T]),Z.position.set(J.x,J.y,J.z),Z.lookAt(J.x,J.y+U[T],J.z);else Z.up.set(0,K[T],0),Z.position.set(J.x,J.y,J.z),Z.lookAt(J.x,J.y,J.z+U[T]);let B=this._cubeSize;if(wW(R,y*B,T>2?B:0,B,B),X.setRenderTarget(R),C)X.render(F,Z);X.render(E,Z)}X.toneMapping=G,X.autoClear=Y,E.background=M}_textureToCubeUV(E,H){let W=this._renderer,R=E.mapping===FW||E.mapping===S8;if(R){if(this._cubemapMaterial===null)this._cubemapMaterial=UQ();this._cubemapMaterial.uniforms.flipEnvMap.value=E.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=KQ();let J=R?this._cubemapMaterial:this._equirectMaterial,Q=this._lodMeshes[0];Q.material=J;let $=J.uniforms;$.envMap.value=E;let Z=this._cubeSize;wW(H,0,0,3*Z,2*Z),W.setRenderTarget(H),W.render(Q,iW)}_applyPMREM(E){let H=this._renderer,W=H.autoClear;H.autoClear=!1;let R=this._lodMeshes.length;for(let J=1;J<R;J++)this._applyGGXFilter(E,J-1,J);H.autoClear=W}_applyGGXFilter(E,H,W){let R=this._renderer,J=this._pingPongRenderTarget,Q=this._ggxMaterial,$=this._lodMeshes[W];$.material=Q;let Z=Q.uniforms,K=W/(this._lodMeshes.length-1),U=H/(this._lodMeshes.length-1),X=Math.sqrt(K*K-U*U),Y=K*1.25,G=X*Y,{_lodMax:D}=this,F=this._sizeLods[W],w=3*F*(W>D-kW?W-D+kW:0),C=4*(this._cubeSize-F);Z.envMap.value=E.texture,Z.roughness.value=G,Z.mipInt.value=D-H,wW(J,w,C,3*F,2*F),R.setRenderTarget(J),R.render($,iW),Z.envMap.value=J.texture,Z.roughness.value=0,Z.mipInt.value=D-W,wW(E,w,C,3*F,2*F),R.setRenderTarget(E),R.render($,iW)}_blur(E,H,W,R){let J=this._pingPongRenderTarget,Q=Math.min(R,Math.PI)/Math.SQRT2;this._blurPass(E,J,H,W,Q),this._blurPass(J,E,W,W,Q)}_blurPass(E,H,W,R,J){let Q=this._renderer,$=this._blurMaterial,Z=this._lodMeshes[R];Z.material=$;let K=$.uniforms;K.envMap.value=E.texture,K.sigma.value=J,K.mipInt.value=this._lodMax-W;let U=this._sizeLods[R],X=3*U*(R>this._lodMax-kW?R-this._lodMax+kW:0),Y=4*(this._cubeSize-U);wW(H,X,Y,3*U,2*U),Q.setRenderTarget(H),Q.render(Z,iW)}}function NX(E){let H=[],W=[],R=E,J=E-kW+1+MX;for(let Q=0;Q<J;Q++){let $=Math.pow(2,R);H.push($);let Z=1/($-2),K=-Z,U=1+Z,X=[K,K,U,K,U,U,K,K,U,U,K,U],Y=6,G=6,D=3,F=new Float32Array(D*G*Y),w=new Float32Array(D*G*Y);for(let M=0;M<Y;M++){let T=M%3*2/3-1,y=M>2?0:-1,B=[T,y,0,T+0.6666666666666666,y,0,T+0.6666666666666666,y+1,0,T,y,0,T+0.6666666666666666,y+1,0,T,y+1,0];F.set(B,D*G*M);for(let V=0;V<G;V++){let P=X[V*2]*2-1,A=X[V*2+1]*2-1;if(M===0)d8.set(1,A,P);else if(M===1)d8.set(-P,1,-A);else if(M===2)d8.set(-P,A,1);else if(M===3)d8.set(-1,A,-P);else if(M===4)d8.set(-P,-1,A);else d8.set(P,A,-1);d8.toArray(w,(M*G+V)*D)}}let C=new WE;if(C.setAttribute("position",new hE(F,D)),C.setAttribute("outputDirection",new hE(w,D)),W.push(new s0(C,null)),R>kW)R--}return{lodMeshes:W,sizeLods:H}}function ZQ(E,H,W){let R=new cE(E,H,W);return R.texture.mapping=mW,R.texture.name="PMREM.cubeUv",R.scissorTest=!0,R}function wW(E,H,W,R,J){E.viewport.set(H,W,R,J),E.scissor.set(H,W,R,J)}function FX(E,H,W){return new SE({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:CX,CUBEUV_TEXEL_WIDTH:1/H,CUBEUV_TEXEL_HEIGHT:1/W,CUBEUV_MAX_MIP:`${E}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:U6(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:lH,depthTest:!1,depthWrite:!1})}function LX(E,H,W){return new SE({name:"SphericalGaussianBlur",defines:{SAMPLES:DX,CUBEUV_TEXEL_WIDTH:1/H,CUBEUV_TEXEL_HEIGHT:1/W,CUBEUV_MAX_MIP:`${E}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:U6(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:lH,depthTest:!1,depthWrite:!1})}function KQ(){return new SE({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:U6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:lH,depthTest:!1,depthWrite:!1})}function UQ(){return new SE({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:U6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:lH,depthTest:!1,depthWrite:!1})}function U6(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class PR extends cE{constructor(E=1,H={}){super(E,E,H);this.isWebGLCubeRenderTarget=!0;let W={width:E,height:E,depth:1},R=[W,W,W,W,W,W];this.texture=new R6(R),this._setTextureOptions(H),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(E,H){this.texture.type=H.type,this.texture.colorSpace=H.colorSpace,this.texture.generateMipmaps=H.generateMipmaps,this.texture.minFilter=H.minFilter,this.texture.magFilter=H.magFilter;let W={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},R=new OW(5,5,5),J=new SE({name:"CubemapFromEquirect",uniforms:p8(W.uniforms),vertexShader:W.vertexShader,fragmentShader:W.fragmentShader,side:UH,blending:lH});J.uniforms.tEquirect.value=H;let Q=new s0(R,J),$=H.minFilter;if(H.minFilter===j8)H.minFilter=_E;return new GR(1,10,this).update(E,Q),H.minFilter=$,Q.geometry.dispose(),Q.material.dispose(),this}clear(E,H=!0,W=!0,R=!0){let J=E.getRenderTarget();for(let Q=0;Q<6;Q++)E.setRenderTarget(this,Q),E.clear(H,W,R);E.setRenderTarget(J)}}function OX(E){let H=new WeakMap,W=new WeakMap,R=null;function J(G,D=!1){if(G===null||G===void 0)return null;if(D)return $(G);return Q(G)}function Q(G){if(G&&G.isTexture){let D=G.mapping;if(D===b7||D===x7)if(H.has(G)){let F=H.get(G).texture;return Z(F,G.mapping)}else{let F=G.image;if(F&&F.height>0){let w=new PR(F.height);return w.fromEquirectangularTexture(E,G),H.set(G,w),G.addEventListener("dispose",U),Z(w.texture,G.mapping)}else return null}}return G}function $(G){if(G&&G.isTexture){let D=G.mapping,F=D===b7||D===x7,w=D===FW||D===S8;if(F||w){let C=W.get(G),M=C!==void 0?C.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==M){if(R===null)R=new kR(E);return C=F?R.fromEquirectangular(G,C):R.fromCubemap(G,C),C.texture.pmremVersion=G.pmremVersion,W.set(G,C),C.texture}else if(C!==void 0)return C.texture;else{let T=G.image;if(F&&T&&T.height>0||w&&T&&K(T)){if(R===null)R=new kR(E);return C=F?R.fromEquirectangular(G):R.fromCubemap(G),C.texture.pmremVersion=G.pmremVersion,W.set(G,C),G.addEventListener("dispose",X),C.texture}else return null}}}return G}function Z(G,D){if(D===b7)G.mapping=FW;else if(D===x7)G.mapping=S8;return G}function K(G){let D=0,F=6;for(let w=0;w<F;w++)if(G[w]!==void 0)D++;return D===F}function U(G){let D=G.target;D.removeEventListener("dispose",U);let F=H.get(D);if(F!==void 0)H.delete(D),F.dispose()}function X(G){let D=G.target;D.removeEventListener("dispose",X);let F=W.get(D);if(F!==void 0)W.delete(D),F.dispose()}function Y(){if(H=new WeakMap,W=new WeakMap,R!==null)R.dispose(),R=null}return{get:J,dispose:Y}}function BX(E){let H={};function W(R){if(H[R]!==void 0)return H[R];let J=E.getExtension(R);return H[R]=J,J}return{has:function(R){return W(R)!==null},init:function(){W("EXT_color_buffer_float"),W("WEBGL_clip_cull_distance"),W("OES_texture_float_linear"),W("EXT_color_buffer_half_float"),W("WEBGL_multisampled_render_to_texture"),W("WEBGL_render_shared_exponent")},get:function(R){let J=W(R);if(J===null)_8("WebGLRenderer: "+R+" extension not supported.");return J}}}function wX(E,H,W,R){let J={},Q=new WeakMap;function $(Y){let G=Y.target;if(G.index!==null)H.remove(G.index);for(let F in G.attributes)H.remove(G.attributes[F]);G.removeEventListener("dispose",$),delete J[G.id];let D=Q.get(G);if(D)H.remove(D),Q.delete(G);if(R.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;W.memory.geometries--}function Z(Y,G){if(J[G.id]===!0)return G;return G.addEventListener("dispose",$),J[G.id]=!0,W.memory.geometries++,G}function K(Y){let G=Y.attributes;for(let D in G)H.update(G[D],E.ARRAY_BUFFER)}function U(Y){let G=[],D=Y.index,F=Y.attributes.position,w=0;if(F===void 0)return;if(D!==null){let T=D.array;w=D.version;for(let y=0,B=T.length;y<B;y+=3){let V=T[y+0],P=T[y+1],A=T[y+2];G.push(V,P,P,A,A,V)}}else{let T=F.array;w=F.version;for(let y=0,B=T.length/3-1;y<B;y+=3){let V=y+0,P=y+1,A=y+2;G.push(V,P,P,A,A,V)}}let C=new(F.count>=65535?e7:t7)(G,1);C.version=w;let M=Q.get(Y);if(M)H.remove(M);Q.set(Y,C)}function X(Y){let G=Q.get(Y);if(G){let D=Y.index;if(D!==null){if(G.version<D.version)U(Y)}}else U(Y);return Q.get(Y)}return{get:Z,update:K,getWireframeAttribute:X}}function kX(E,H,W){let R;function J(Y){R=Y}let Q,$;function Z(Y){Q=Y.type,$=Y.bytesPerElement}function K(Y,G){E.drawElements(R,G,Q,Y*$),W.update(G,R,1)}function U(Y,G,D){if(D===0)return;E.drawElementsInstanced(R,G,Q,Y*$,D),W.update(G,R,D)}function X(Y,G,D){if(D===0)return;H.get("WEBGL_multi_draw").multiDrawElementsWEBGL(R,G,0,Q,Y,0,D);let w=0;for(let C=0;C<D;C++)w+=G[C];W.update(w,R,1)}this.setMode=J,this.setIndex=Z,this.render=K,this.renderInstances=U,this.renderMultiDraw=X}function VX(E){let H={geometries:0,textures:0},W={frame:0,calls:0,triangles:0,points:0,lines:0};function R(Q,$,Z){switch(W.calls++,$){case E.TRIANGLES:W.triangles+=Z*(Q/3);break;case E.LINES:W.lines+=Z*(Q/2);break;case E.LINE_STRIP:W.lines+=Z*(Q-1);break;case E.LINE_LOOP:W.lines+=Z*Q;break;case E.POINTS:W.points+=Z*Q;break;default:g0("WebGLInfo: Unknown draw mode:",$);break}}function J(){W.calls=0,W.triangles=0,W.points=0,W.lines=0}return{memory:H,render:W,programs:null,autoReset:!0,reset:J,update:R}}function TX(E,H,W){let R=new WeakMap,J=new NE;function Q($,Z,K){let U=$.morphTargetInfluences,X=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Y=X!==void 0?X.length:0,G=R.get(Z);if(G===void 0||G.count!==Y){let k=function(){A.dispose(),R.delete(Z),Z.removeEventListener("dispose",k)};if(G!==void 0)G.texture.dispose();let D=Z.morphAttributes.position!==void 0,F=Z.morphAttributes.normal!==void 0,w=Z.morphAttributes.color!==void 0,C=Z.morphAttributes.position||[],M=Z.morphAttributes.normal||[],T=Z.morphAttributes.color||[],y=0;if(D===!0)y=1;if(F===!0)y=2;if(w===!0)y=3;let B=Z.attributes.position.count*y,V=1;if(B>H.maxTextureSize)V=Math.ceil(B/H.maxTextureSize),B=H.maxTextureSize;let P=new Float32Array(B*V*4*Y),A=new a7(P,B,V,Y);A.type=E8,A.needsUpdate=!0;let L=y*4;for(let c=0;c<Y;c++){let h=C[c],v=M[c],d=T[c],z=B*V*4*c;for(let u=0;u<h.count;u++){let a=u*L;if(D===!0)J.fromBufferAttribute(h,u),P[z+a+0]=J.x,P[z+a+1]=J.y,P[z+a+2]=J.z,P[z+a+3]=0;if(F===!0)J.fromBufferAttribute(v,u),P[z+a+4]=J.x,P[z+a+5]=J.y,P[z+a+6]=J.z,P[z+a+7]=0;if(w===!0)J.fromBufferAttribute(d,u),P[z+a+8]=J.x,P[z+a+9]=J.y,P[z+a+10]=J.z,P[z+a+11]=d.itemSize===4?J.w:1}}G={count:Y,texture:A,size:new m0(B,V)},R.set(Z,G),Z.addEventListener("dispose",k)}if($.isInstancedMesh===!0&&$.morphTexture!==null)K.getUniforms().setValue(E,"morphTexture",$.morphTexture,W);else{let D=0;for(let w=0;w<U.length;w++)D+=U[w];let F=Z.morphTargetsRelative?1:1-D;K.getUniforms().setValue(E,"morphTargetBaseInfluence",F),K.getUniforms().setValue(E,"morphTargetInfluences",U)}K.getUniforms().setValue(E,"morphTargetsTexture",G.texture,W),K.getUniforms().setValue(E,"morphTargetsTextureSize",G.size)}return{update:Q}}function PX(E,H,W,R,J){let Q=new WeakMap;function $(U){let X=J.render.frame,Y=U.geometry,G=H.get(U,Y);if(Q.get(G)!==X)H.update(G),Q.set(G,X);if(U.isInstancedMesh){if(U.hasEventListener("dispose",K)===!1)U.addEventListener("dispose",K);if(Q.get(U)!==X){if(W.update(U.instanceMatrix,E.ARRAY_BUFFER),U.instanceColor!==null)W.update(U.instanceColor,E.ARRAY_BUFFER);Q.set(U,X)}}if(U.isSkinnedMesh){let D=U.skeleton;if(Q.get(D)!==X)D.update(),Q.set(D,X)}return G}function Z(){Q=new WeakMap}function K(U){let X=U.target;if(X.removeEventListener("dispose",K),R.releaseStatesOfObject(X),W.remove(X.instanceMatrix),X.instanceColor!==null)W.remove(X.instanceColor)}return{update:$,dispose:Z}}var zX={[a6]:"LINEAR_TONE_MAPPING",[r6]:"REINHARD_TONE_MAPPING",[t6]:"CINEON_TONE_MAPPING",[e6]:"ACES_FILMIC_TONE_MAPPING",[H9]:"AGX_TONE_MAPPING",[W9]:"NEUTRAL_TONE_MAPPING",[E9]:"CUSTOM_TONE_MAPPING"};function AX(E,H,W,R,J,Q){let $=new cE(H,W,{type:E,depthBuffer:J,stencilBuffer:Q,samples:R?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),Z=null,K=null,U=new WE;U.setAttribute("position",new RH([-1,3,0,-1,-1,0,3,-1,0],3)),U.setAttribute("uv",new RH([0,2,0,0,2,0],2));let X=new t9({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),Y=new s0(U,X),G=new BW(-1,1,1,-1,0,1),D=null,F=null,w=!1,C,M=null,T=[],y=!1;this.setSize=function(B,V){if($.setSize(B,V),Z!==null)Z.setSize(B,V);if(K!==null)K.setSize(B,V);for(let P=0;P<T.length;P++){let A=T[P];if(A.setSize)A.setSize(B,V)}},this.setEffects=function(B){T=B,y=T.length>0&&T[0].isRenderPass===!0;let{width:V,height:P}=$;if(T.length>0&&Z===null)Z=new cE(V,P,{type:wH,depthBuffer:!1,stencilBuffer:!1}),K=new cE(V,P,{type:wH,depthBuffer:!1,stencilBuffer:!1});for(let A=0;A<T.length;A++){let L=T[A];if(L.setSize)L.setSize(V,P)}},this.begin=function(B,V){if(w)return!1;if(B.toneMapping===jH&&T.length===0)return!1;if(M=V,V!==null){let{width:P,height:A}=V;if($.width!==P||$.height!==A)this.setSize(P,A)}if(y===!1)B.setRenderTarget($);return C=B.toneMapping,B.toneMapping=jH,!0},this.hasRenderPass=function(){return y},this.end=function(B,V){B.toneMapping=C,w=!0;let P=$,A=Z;for(let L=0;L<T.length;L++){let k=T[L];if(k.enabled===!1)continue;if(k.render(B,A,P,V),k.needsSwap!==!1)P=A,A=A===Z?K:Z}if(D!==B.outputColorSpace||F!==B.toneMapping){if(D=B.outputColorSpace,F=B.toneMapping,X.defines={},a0.getTransfer(D)===FE)X.defines.SRGB_TRANSFER="";let L=zX[F];if(L)X.defines[L]="";X.needsUpdate=!0}X.uniforms.tDiffuse.value=P.texture,B.setRenderTarget(M),B.render(Y,G),M=null,w=!1},this.isCompositing=function(){return w},this.dispose=function(){if($.dispose(),Z!==null)Z.dispose();if(K!==null)K.dispose();U.dispose(),X.dispose()}}var IQ=new aE,VR=new g8(1,1),_Q=new a7,SQ=new s9,jQ=new R6,XQ=[],GQ=[],YQ=new Float32Array(16),MQ=new Float32Array(9),DQ=new Float32Array(4);function VW(E,H,W){let R=E[0];if(R<=0||R>0)return E;let J=H*W,Q=XQ[J];if(Q===void 0)Q=new Float32Array(J),XQ[J]=Q;if(H!==0){R.toArray(Q,0);for(let $=1,Z=0;$!==H;++$)Z+=W,E[$].toArray(Q,Z)}return Q}function lE(E,H){if(E.length!==H.length)return!1;for(let W=0,R=E.length;W<R;W++)if(E[W]!==H[W])return!1;return!0}function mE(E,H){for(let W=0,R=H.length;W<R;W++)E[W]=H[W]}function X6(E,H){let W=GQ[H];if(W===void 0)W=new Int32Array(H),GQ[H]=W;for(let R=0;R!==H;++R)W[R]=E.allocateTextureUnit();return W}function IX(E,H){let W=this.cache;if(W[0]===H)return;E.uniform1f(this.addr,H),W[0]=H}function _X(E,H){let W=this.cache;if(H.x!==void 0){if(W[0]!==H.x||W[1]!==H.y)E.uniform2f(this.addr,H.x,H.y),W[0]=H.x,W[1]=H.y}else{if(lE(W,H))return;E.uniform2fv(this.addr,H),mE(W,H)}}function SX(E,H){let W=this.cache;if(H.x!==void 0){if(W[0]!==H.x||W[1]!==H.y||W[2]!==H.z)E.uniform3f(this.addr,H.x,H.y,H.z),W[0]=H.x,W[1]=H.y,W[2]=H.z}else if(H.r!==void 0){if(W[0]!==H.r||W[1]!==H.g||W[2]!==H.b)E.uniform3f(this.addr,H.r,H.g,H.b),W[0]=H.r,W[1]=H.g,W[2]=H.b}else{if(lE(W,H))return;E.uniform3fv(this.addr,H),mE(W,H)}}function jX(E,H){let W=this.cache;if(H.x!==void 0){if(W[0]!==H.x||W[1]!==H.y||W[2]!==H.z||W[3]!==H.w)E.uniform4f(this.addr,H.x,H.y,H.z,H.w),W[0]=H.x,W[1]=H.y,W[2]=H.z,W[3]=H.w}else{if(lE(W,H))return;E.uniform4fv(this.addr,H),mE(W,H)}}function yX(E,H){let W=this.cache,R=H.elements;if(R===void 0){if(lE(W,H))return;E.uniformMatrix2fv(this.addr,!1,H),mE(W,H)}else{if(lE(W,R))return;DQ.set(R),E.uniformMatrix2fv(this.addr,!1,DQ),mE(W,R)}}function hX(E,H){let W=this.cache,R=H.elements;if(R===void 0){if(lE(W,H))return;E.uniformMatrix3fv(this.addr,!1,H),mE(W,H)}else{if(lE(W,R))return;MQ.set(R),E.uniformMatrix3fv(this.addr,!1,MQ),mE(W,R)}}function vX(E,H){let W=this.cache,R=H.elements;if(R===void 0){if(lE(W,H))return;E.uniformMatrix4fv(this.addr,!1,H),mE(W,H)}else{if(lE(W,R))return;YQ.set(R),E.uniformMatrix4fv(this.addr,!1,YQ),mE(W,R)}}function fX(E,H){let W=this.cache;if(W[0]===H)return;E.uniform1i(this.addr,H),W[0]=H}function bX(E,H){let W=this.cache;if(H.x!==void 0){if(W[0]!==H.x||W[1]!==H.y)E.uniform2i(this.addr,H.x,H.y),W[0]=H.x,W[1]=H.y}else{if(lE(W,H))return;E.uniform2iv(this.addr,H),mE(W,H)}}function xX(E,H){let W=this.cache;if(H.x!==void 0){if(W[0]!==H.x||W[1]!==H.y||W[2]!==H.z)E.uniform3i(this.addr,H.x,H.y,H.z),W[0]=H.x,W[1]=H.y,W[2]=H.z}else{if(lE(W,H))return;E.uniform3iv(this.addr,H),mE(W,H)}}function gX(E,H){let W=this.cache;if(H.x!==void 0){if(W[0]!==H.x||W[1]!==H.y||W[2]!==H.z||W[3]!==H.w)E.uniform4i(this.addr,H.x,H.y,H.z,H.w),W[0]=H.x,W[1]=H.y,W[2]=H.z,W[3]=H.w}else{if(lE(W,H))return;E.uniform4iv(this.addr,H),mE(W,H)}}function pX(E,H){let W=this.cache;if(W[0]===H)return;E.uniform1ui(this.addr,H),W[0]=H}function lX(E,H){let W=this.cache;if(H.x!==void 0){if(W[0]!==H.x||W[1]!==H.y)E.uniform2ui(this.addr,H.x,H.y),W[0]=H.x,W[1]=H.y}else{if(lE(W,H))return;E.uniform2uiv(this.addr,H),mE(W,H)}}function mX(E,H){let W=this.cache;if(H.x!==void 0){if(W[0]!==H.x||W[1]!==H.y||W[2]!==H.z)E.uniform3ui(this.addr,H.x,H.y,H.z),W[0]=H.x,W[1]=H.y,W[2]=H.z}else{if(lE(W,H))return;E.uniform3uiv(this.addr,H),mE(W,H)}}function uX(E,H){let W=this.cache;if(H.x!==void 0){if(W[0]!==H.x||W[1]!==H.y||W[2]!==H.z||W[3]!==H.w)E.uniform4ui(this.addr,H.x,H.y,H.z,H.w),W[0]=H.x,W[1]=H.y,W[2]=H.z,W[3]=H.w}else{if(lE(W,H))return;E.uniform4uiv(this.addr,H),mE(W,H)}}function dX(E,H,W){let R=this.cache,J=W.allocateTextureUnit();if(R[0]!==J)E.uniform1i(this.addr,J),R[0]=J;let Q;if(this.type===E.SAMPLER_2D_SHADOW)VR.compareFunction=W.isReversedDepthBuffer()?o7:i7,Q=VR;else Q=IQ;W.setTexture2D(H||Q,J)}function cX(E,H,W){let R=this.cache,J=W.allocateTextureUnit();if(R[0]!==J)E.uniform1i(this.addr,J),R[0]=J;W.setTexture3D(H||SQ,J)}function nX(E,H,W){let R=this.cache,J=W.allocateTextureUnit();if(R[0]!==J)E.uniform1i(this.addr,J),R[0]=J;W.setTextureCube(H||jQ,J)}function sX(E,H,W){let R=this.cache,J=W.allocateTextureUnit();if(R[0]!==J)E.uniform1i(this.addr,J),R[0]=J;W.setTexture2DArray(H||_Q,J)}function iX(E){switch(E){case 5126:return IX;case 35664:return _X;case 35665:return SX;case 35666:return jX;case 35674:return yX;case 35675:return hX;case 35676:return vX;case 5124:case 35670:return fX;case 35667:case 35671:return bX;case 35668:case 35672:return xX;case 35669:case 35673:return gX;case 5125:return pX;case 36294:return lX;case 36295:return mX;case 36296:return uX;case 35678:case 36198:case 36298:case 36306:case 35682:return dX;case 35679:case 36299:case 36307:return cX;case 35680:case 36300:case 36308:case 36293:return nX;case 36289:case 36303:case 36311:case 36292:return sX}}function oX(E,H){E.uniform1fv(this.addr,H)}function aX(E,H){let W=VW(H,this.size,2);E.uniform2fv(this.addr,W)}function rX(E,H){let W=VW(H,this.size,3);E.uniform3fv(this.addr,W)}function tX(E,H){let W=VW(H,this.size,4);E.uniform4fv(this.addr,W)}function eX(E,H){let W=VW(H,this.size,4);E.uniformMatrix2fv(this.addr,!1,W)}function EG(E,H){let W=VW(H,this.size,9);E.uniformMatrix3fv(this.addr,!1,W)}function HG(E,H){let W=VW(H,this.size,16);E.uniformMatrix4fv(this.addr,!1,W)}function WG(E,H){E.uniform1iv(this.addr,H)}function RG(E,H){E.uniform2iv(this.addr,H)}function JG(E,H){E.uniform3iv(this.addr,H)}function QG(E,H){E.uniform4iv(this.addr,H)}function $G(E,H){E.uniform1uiv(this.addr,H)}function ZG(E,H){E.uniform2uiv(this.addr,H)}function KG(E,H){E.uniform3uiv(this.addr,H)}function UG(E,H){E.uniform4uiv(this.addr,H)}function XG(E,H,W){let R=this.cache,J=H.length,Q=X6(W,J);if(!lE(R,Q))E.uniform1iv(this.addr,Q),mE(R,Q);let $;if(this.type===E.SAMPLER_2D_SHADOW)$=VR;else $=IQ;for(let Z=0;Z!==J;++Z)W.setTexture2D(H[Z]||$,Q[Z])}function GG(E,H,W){let R=this.cache,J=H.length,Q=X6(W,J);if(!lE(R,Q))E.uniform1iv(this.addr,Q),mE(R,Q);for(let $=0;$!==J;++$)W.setTexture3D(H[$]||SQ,Q[$])}function YG(E,H,W){let R=this.cache,J=H.length,Q=X6(W,J);if(!lE(R,Q))E.uniform1iv(this.addr,Q),mE(R,Q);for(let $=0;$!==J;++$)W.setTextureCube(H[$]||jQ,Q[$])}function MG(E,H,W){let R=this.cache,J=H.length,Q=X6(W,J);if(!lE(R,Q))E.uniform1iv(this.addr,Q),mE(R,Q);for(let $=0;$!==J;++$)W.setTexture2DArray(H[$]||_Q,Q[$])}function DG(E){switch(E){case 5126:return oX;case 35664:return aX;case 35665:return rX;case 35666:return tX;case 35674:return eX;case 35675:return EG;case 35676:return HG;case 5124:case 35670:return WG;case 35667:case 35671:return RG;case 35668:case 35672:return JG;case 35669:case 35673:return QG;case 5125:return $G;case 36294:return ZG;case 36295:return KG;case 36296:return UG;case 35678:case 36198:case 36298:case 36306:case 35682:return XG;case 35679:case 36299:case 36307:return GG;case 35680:case 36300:case 36308:case 36293:return YG;case 36289:case 36303:case 36311:case 36292:return MG}}class yQ{constructor(E,H,W){this.id=E,this.addr=W,this.cache=[],this.type=H.type,this.setValue=iX(H.type)}}class hQ{constructor(E,H,W){this.id=E,this.addr=W,this.cache=[],this.type=H.type,this.size=H.size,this.setValue=DG(H.type)}}class vQ{constructor(E){this.id=E,this.seq=[],this.map={}}setValue(E,H,W){let R=this.seq;for(let J=0,Q=R.length;J!==Q;++J){let $=R[J];$.setValue(E,H[$.id],W)}}}var BR=/(\w+)(\])?(\[|\.)?/g;function CQ(E,H){E.seq.push(H),E.map[H.id]=H}function CG(E,H,W){let R=E.name,J=R.length;BR.lastIndex=0;while(!0){let Q=BR.exec(R),$=BR.lastIndex,Z=Q[1],K=Q[2]==="]",U=Q[3];if(K)Z=Z|0;if(U===void 0||U==="["&&$+2===J){CQ(W,U===void 0?new yQ(Z,E,H):new hQ(Z,E,H));break}else{let Y=W.map[Z];if(Y===void 0)Y=new vQ(Z),CQ(W,Y);W=Y}}}class rW{constructor(E,H){this.seq=[],this.map={};let W=E.getProgramParameter(H,E.ACTIVE_UNIFORMS);for(let Q=0;Q<W;++Q){let $=E.getActiveUniform(H,Q),Z=E.getUniformLocation(H,$.name);CG($,Z,this)}let R=[],J=[];for(let Q of this.seq)if(Q.type===E.SAMPLER_2D_SHADOW||Q.type===E.SAMPLER_CUBE_SHADOW||Q.type===E.SAMPLER_2D_ARRAY_SHADOW)R.push(Q);else J.push(Q);if(R.length>0)this.seq=R.concat(J)}setValue(E,H,W,R){let J=this.map[H];if(J!==void 0)J.setValue(E,W,R)}setOptional(E,H,W){let R=H[W];if(R!==void 0)this.setValue(E,W,R)}static upload(E,H,W,R){for(let J=0,Q=H.length;J!==Q;++J){let $=H[J],Z=W[$.id];if(Z.needsUpdate!==!1)$.setValue(E,Z.value,R)}}static seqWithValue(E,H){let W=[];for(let R=0,J=E.length;R!==J;++R){let Q=E[R];if(Q.id in H)W.push(Q)}return W}}function qQ(E,H,W){let R=E.createShader(H);return E.shaderSource(R,W),E.compileShader(R),R}var qG=37297,NG=0;function FG(E,H){let W=E.split(`
`),R=[],J=Math.max(H-6,0),Q=Math.min(H+6,W.length);for(let $=J;$<Q;$++){let Z=$+1;R.push(`${Z===H?">":" "} ${Z}: ${W[$]}`)}return R.join(`
`)}var NQ=new p0;function LG(E){a0._getMatrix(NQ,a0.workingColorSpace,E);let H=`mat3( ${NQ.elements.map((W)=>W.toFixed(4))} )`;switch(a0.getTransfer(E)){case l9:return[H,"LinearTransferOETF"];case FE:return[H,"sRGBTransferOETF"];default:return h0("WebGLProgram: Unsupported color space: ",E),[H,"LinearTransferOETF"]}}function FQ(E,H,W){let R=E.getShaderParameter(H,E.COMPILE_STATUS),Q=(E.getShaderInfoLog(H)||"").trim();if(R&&Q==="")return"";let $=/ERROR: 0:(\d+)/.exec(Q);if($){let Z=parseInt($[1]);return W.toUpperCase()+`

`+Q+`

`+FG(E.getShaderSource(H),Z)}else return Q}function OG(E,H){let W=LG(H);return[`vec4 ${E}( vec4 value ) {`,`	return ${W[1]}( vec4( value.rgb * ${W[0]}, value.a ) );`,"}"].join(`
`)}var BG={[a6]:"Linear",[r6]:"Reinhard",[t6]:"Cineon",[e6]:"ACESFilmic",[H9]:"AgX",[W9]:"Neutral",[E9]:"Custom"};function wG(E,H){let W=BG[H];if(W===void 0)return h0("WebGLProgram: Unsupported toneMapping:",H),"vec3 "+E+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+E+"( vec3 color ) { return "+W+"ToneMapping( color ); }"}var K6=new b;function kG(){a0.getLuminanceCoefficients(K6);let E=K6.x.toFixed(4),H=K6.y.toFixed(4),W=K6.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${E}, ${H}, ${W} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function VG(E){return[E.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",E.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(aW).join(`
`)}function TG(E){let H=[];for(let W in E){let R=E[W];if(R===!1)continue;H.push("#define "+W+" "+R)}return H.join(`
`)}function PG(E,H){let W={},R=E.getProgramParameter(H,E.ACTIVE_ATTRIBUTES);for(let J=0;J<R;J++){let Q=E.getActiveAttrib(H,J),$=Q.name,Z=1;if(Q.type===E.FLOAT_MAT2)Z=2;if(Q.type===E.FLOAT_MAT3)Z=3;if(Q.type===E.FLOAT_MAT4)Z=4;W[$]={type:Q.type,location:E.getAttribLocation(H,$),locationSize:Z}}return W}function aW(E){return E!==""}function LQ(E,H){let W=H.numSpotLightShadows+H.numSpotLightMaps-H.numSpotLightShadowsWithMaps;return E.replace(/NUM_SUN_LIGHTS/g,H.numSunLights).replace(/NUM_DIR_LIGHTS/g,H.numDirLights).replace(/NUM_SPOT_LIGHTS/g,H.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,H.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,W).replace(/NUM_RECT_AREA_LIGHTS/g,H.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,H.numPointLights).replace(/NUM_HEMI_LIGHTS/g,H.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,H.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,H.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,H.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,H.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,H.numPointLightShadows)}function OQ(E,H){return E.replace(/NUM_CLIPPING_PLANES/g,H.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,H.numClippingPlanes-H.numClipIntersection)}var zG=/^[ \t]*#include +<([\w\d./]+)>/gm;function TR(E){return E.replace(zG,IG)}var AG=new Map;function IG(E,H){let W=c0[H];if(W===void 0){let R=AG.get(H);if(R!==void 0)W=c0[R],h0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',H,R);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+H+">")}return TR(W)}var _G=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function BQ(E){return E.replace(_G,SG)}function SG(E,H,W,R){let J="";for(let Q=parseInt(H);Q<parseInt(W);Q++)J+=R.replace(/\[\s*i\s*\]/g,"[ "+Q+" ]").replace(/UNROLLED_LOOP_INDEX/g,Q);return J}function wQ(E){let H=`precision ${E.precision} float;
	precision ${E.precision} int;
	precision ${E.precision} sampler2D;
	precision ${E.precision} samplerCube;
	precision ${E.precision} sampler3D;
	precision ${E.precision} sampler2DArray;
	precision ${E.precision} sampler2DShadow;
	precision ${E.precision} samplerCubeShadow;
	precision ${E.precision} sampler2DArrayShadow;
	precision ${E.precision} isampler2D;
	precision ${E.precision} isampler3D;
	precision ${E.precision} isamplerCube;
	precision ${E.precision} isampler2DArray;
	precision ${E.precision} usampler2D;
	precision ${E.precision} usampler3D;
	precision ${E.precision} usamplerCube;
	precision ${E.precision} usampler2DArray;
	`;if(E.precision==="highp")H+=`
#define HIGH_PRECISION`;else if(E.precision==="mediump")H+=`
#define MEDIUM_PRECISION`;else if(E.precision==="lowp")H+=`
#define LOW_PRECISION`;return H}var jG={[gW]:"SHADOWMAP_TYPE_PCF",[CW]:"SHADOWMAP_TYPE_VSM"};function yG(E){return jG[E.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var hG={[FW]:"ENVMAP_TYPE_CUBE",[S8]:"ENVMAP_TYPE_CUBE",[mW]:"ENVMAP_TYPE_CUBE_UV"};function vG(E){if(E.envMap===!1)return"ENVMAP_TYPE_CUBE";return hG[E.envMapMode]||"ENVMAP_TYPE_CUBE"}var fG={[S8]:"ENVMAP_MODE_REFRACTION"};function bG(E){if(E.envMap===!1)return"ENVMAP_MODE_REFLECTION";return fG[E.envMapMode]||"ENVMAP_MODE_REFLECTION"}var xG={[S1]:"ENVMAP_BLENDING_MULTIPLY",[j1]:"ENVMAP_BLENDING_MIX",[y1]:"ENVMAP_BLENDING_ADD"};function gG(E){if(E.envMap===!1)return"ENVMAP_BLENDING_NONE";return xG[E.combine]||"ENVMAP_BLENDING_NONE"}function pG(E){let H=E.envMapCubeUVHeight;if(H===null)return null;let W=Math.log2(H)-2,R=1/H;return{texelWidth:1/(3*Math.max(Math.pow(2,W),112)),texelHeight:R,maxMip:W}}function lG(E,H,W,R){let J=E.getContext(),Q=W.defines,$=W.vertexShader,Z=W.fragmentShader,K=yG(W),U=vG(W),X=bG(W),Y=gG(W),G=pG(W),D=VG(W),F=TG(Q),w=J.createProgram(),C,M,T=W.glslVersion?"#version "+W.glslVersion+`
`:"";if(W.isRawShaderMaterial){if(C=["#define SHADER_TYPE "+W.shaderType,"#define SHADER_NAME "+W.shaderName,F].filter(aW).join(`
`),C.length>0)C+=`
`;if(M=["#define SHADER_TYPE "+W.shaderType,"#define SHADER_NAME "+W.shaderName,F].filter(aW).join(`
`),M.length>0)M+=`
`}else C=[wQ(W),"#define SHADER_TYPE "+W.shaderType,"#define SHADER_NAME "+W.shaderName,F,W.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",W.batching?"#define USE_BATCHING":"",W.batchingColor?"#define USE_BATCHING_COLOR":"",W.instancing?"#define USE_INSTANCING":"",W.instancingColor?"#define USE_INSTANCING_COLOR":"",W.instancingMorph?"#define USE_INSTANCING_MORPH":"",W.useFog&&W.fog?"#define USE_FOG":"",W.useFog&&W.fogExp2?"#define FOG_EXP2":"",W.map?"#define USE_MAP":"",W.envMap?"#define USE_ENVMAP":"",W.envMap?"#define "+X:"",W.lightMap?"#define USE_LIGHTMAP":"",W.aoMap?"#define USE_AOMAP":"",W.bumpMap?"#define USE_BUMPMAP":"",W.normalMap?"#define USE_NORMALMAP":"",W.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",W.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",W.displacementMap?"#define USE_DISPLACEMENTMAP":"",W.emissiveMap?"#define USE_EMISSIVEMAP":"",W.anisotropy?"#define USE_ANISOTROPY":"",W.anisotropyMap?"#define USE_ANISOTROPYMAP":"",W.clearcoatMap?"#define USE_CLEARCOATMAP":"",W.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",W.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",W.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",W.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",W.specularMap?"#define USE_SPECULARMAP":"",W.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",W.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",W.roughnessMap?"#define USE_ROUGHNESSMAP":"",W.metalnessMap?"#define USE_METALNESSMAP":"",W.alphaMap?"#define USE_ALPHAMAP":"",W.alphaHash?"#define USE_ALPHAHASH":"",W.transmission?"#define USE_TRANSMISSION":"",W.transmissionMap?"#define USE_TRANSMISSIONMAP":"",W.thicknessMap?"#define USE_THICKNESSMAP":"",W.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",W.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",W.mapUv?"#define MAP_UV "+W.mapUv:"",W.alphaMapUv?"#define ALPHAMAP_UV "+W.alphaMapUv:"",W.lightMapUv?"#define LIGHTMAP_UV "+W.lightMapUv:"",W.aoMapUv?"#define AOMAP_UV "+W.aoMapUv:"",W.emissiveMapUv?"#define EMISSIVEMAP_UV "+W.emissiveMapUv:"",W.bumpMapUv?"#define BUMPMAP_UV "+W.bumpMapUv:"",W.normalMapUv?"#define NORMALMAP_UV "+W.normalMapUv:"",W.displacementMapUv?"#define DISPLACEMENTMAP_UV "+W.displacementMapUv:"",W.metalnessMapUv?"#define METALNESSMAP_UV "+W.metalnessMapUv:"",W.roughnessMapUv?"#define ROUGHNESSMAP_UV "+W.roughnessMapUv:"",W.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+W.anisotropyMapUv:"",W.clearcoatMapUv?"#define CLEARCOATMAP_UV "+W.clearcoatMapUv:"",W.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+W.clearcoatNormalMapUv:"",W.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+W.clearcoatRoughnessMapUv:"",W.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+W.iridescenceMapUv:"",W.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+W.iridescenceThicknessMapUv:"",W.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+W.sheenColorMapUv:"",W.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+W.sheenRoughnessMapUv:"",W.specularMapUv?"#define SPECULARMAP_UV "+W.specularMapUv:"",W.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+W.specularColorMapUv:"",W.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+W.specularIntensityMapUv:"",W.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+W.transmissionMapUv:"",W.thicknessMapUv?"#define THICKNESSMAP_UV "+W.thicknessMapUv:"",W.vertexTangents&&W.flatShading===!1?"#define USE_TANGENT":"",W.vertexNormals?"#define HAS_NORMAL":"",W.vertexColors?"#define USE_COLOR":"",W.vertexAlphas?"#define USE_COLOR_ALPHA":"",W.vertexUv1s?"#define USE_UV1":"",W.vertexUv2s?"#define USE_UV2":"",W.vertexUv3s?"#define USE_UV3":"",W.pointsUvs?"#define USE_POINTS_UV":"",W.flatShading?"#define FLAT_SHADED":"",W.skinning?"#define USE_SKINNING":"",W.morphTargets?"#define USE_MORPHTARGETS":"",W.morphNormals&&W.flatShading===!1?"#define USE_MORPHNORMALS":"",W.morphColors?"#define USE_MORPHCOLORS":"",W.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+W.morphTextureStride:"",W.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+W.morphTargetsCount:"",W.doubleSided?"#define DOUBLE_SIDED":"",W.flipSided?"#define FLIP_SIDED":"",W.shadowMapEnabled?"#define USE_SHADOWMAP":"",W.shadowMapEnabled?"#define "+K:"",W.sizeAttenuation?"#define USE_SIZEATTENUATION":"",W.numLightProbes>0?"#define USE_LIGHT_PROBES":"",W.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",W.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(aW).join(`
`),M=[wQ(W),"#define SHADER_TYPE "+W.shaderType,"#define SHADER_NAME "+W.shaderName,F,W.useFog&&W.fog?"#define USE_FOG":"",W.useFog&&W.fogExp2?"#define FOG_EXP2":"",W.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",W.map?"#define USE_MAP":"",W.matcap?"#define USE_MATCAP":"",W.envMap?"#define USE_ENVMAP":"",W.envMap?"#define "+U:"",W.envMap?"#define "+X:"",W.envMap?"#define "+Y:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",W.lightMap?"#define USE_LIGHTMAP":"",W.aoMap?"#define USE_AOMAP":"",W.bumpMap?"#define USE_BUMPMAP":"",W.normalMap?"#define USE_NORMALMAP":"",W.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",W.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",W.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",W.emissiveMap?"#define USE_EMISSIVEMAP":"",W.anisotropy?"#define USE_ANISOTROPY":"",W.anisotropyMap?"#define USE_ANISOTROPYMAP":"",W.clearcoat?"#define USE_CLEARCOAT":"",W.clearcoatMap?"#define USE_CLEARCOATMAP":"",W.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",W.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",W.dispersion?"#define USE_DISPERSION":"",W.retroreflection?"#define USE_RETROREFLECTION":"",W.iridescence?"#define USE_IRIDESCENCE":"",W.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",W.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",W.specularMap?"#define USE_SPECULARMAP":"",W.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",W.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",W.roughnessMap?"#define USE_ROUGHNESSMAP":"",W.metalnessMap?"#define USE_METALNESSMAP":"",W.alphaMap?"#define USE_ALPHAMAP":"",W.alphaTest?"#define USE_ALPHATEST":"",W.alphaHash?"#define USE_ALPHAHASH":"",W.sheen?"#define USE_SHEEN":"",W.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",W.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",W.transmission?"#define USE_TRANSMISSION":"",W.transmissionMap?"#define USE_TRANSMISSIONMAP":"",W.thicknessMap?"#define USE_THICKNESSMAP":"",W.vertexTangents&&W.flatShading===!1?"#define USE_TANGENT":"",W.vertexColors||W.instancingColor?"#define USE_COLOR":"",W.vertexAlphas||W.batchingColor?"#define USE_COLOR_ALPHA":"",W.vertexUv1s?"#define USE_UV1":"",W.vertexUv2s?"#define USE_UV2":"",W.vertexUv3s?"#define USE_UV3":"",W.pointsUvs?"#define USE_POINTS_UV":"",W.gradientMap?"#define USE_GRADIENTMAP":"",W.flatShading?"#define FLAT_SHADED":"",W.doubleSided?"#define DOUBLE_SIDED":"",W.flipSided?"#define FLIP_SIDED":"",W.shadowMapEnabled?"#define USE_SHADOWMAP":"",W.shadowMapEnabled?"#define "+K:"",W.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",W.numLightProbes>0?"#define USE_LIGHT_PROBES":"",W.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",W.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",W.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",W.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",W.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",W.toneMapping!==jH?"#define TONE_MAPPING":"",W.toneMapping!==jH?c0.tonemapping_pars_fragment:"",W.toneMapping!==jH?wG("toneMapping",W.toneMapping):"",W.dithering?"#define DITHERING":"",W.opaque?"#define OPAQUE":"",c0.colorspace_pars_fragment,OG("linearToOutputTexel",W.outputColorSpace),kG(),W.useDepthPacking?"#define DEPTH_PACKING "+W.depthPacking:"",`
`].filter(aW).join(`
`);if($=TR($),$=LQ($,W),$=OQ($,W),Z=TR(Z),Z=LQ(Z,W),Z=OQ(Z,W),$=BQ($),Z=BQ(Z),W.isRawShaderMaterial!==!0)T=`#version 300 es
`,C=[D,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+C,M=["#define varying in",W.glslVersion===m9?"":"layout(location = 0) out highp vec4 pc_fragColor;",W.glslVersion===m9?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M;let y=T+C+$,B=T+M+Z,V=qQ(J,J.VERTEX_SHADER,y),P=qQ(J,J.FRAGMENT_SHADER,B);if(J.attachShader(w,V),J.attachShader(w,P),W.index0AttributeName!==void 0)J.bindAttribLocation(w,0,W.index0AttributeName);else if(W.hasPositionAttribute===!0)J.bindAttribLocation(w,0,"position");J.linkProgram(w);function A(h){if(E.debug.checkShaderErrors){let v=J.getProgramInfoLog(w)||"",d=J.getShaderInfoLog(V)||"",z=J.getShaderInfoLog(P)||"",u=v.trim(),a=d.trim(),p=z.trim(),J0=!0,s=!0;if(J.getProgramParameter(w,J.LINK_STATUS)===!1)if(J0=!1,typeof E.debug.onShaderError==="function")E.debug.onShaderError(J,w,V,P);else{let t=FQ(J,V,"vertex"),R0=FQ(J,P,"fragment");g0("WebGLProgram: Shader Error "+J.getError()+" - VALIDATE_STATUS "+J.getProgramParameter(w,J.VALIDATE_STATUS)+`

Material Name: `+h.name+`
Material Type: `+h.type+`

Program Info Log: `+u+`
`+t+`
`+R0)}else if(u!=="")h0("WebGLProgram: Program Info Log:",u);else if(a===""||p==="")s=!1;if(s)h.diagnostics={runnable:J0,programLog:u,vertexShader:{log:a,prefix:C},fragmentShader:{log:p,prefix:M}}}J.deleteShader(V),J.deleteShader(P),L=new rW(J,w),k=PG(J,w)}let L;this.getUniforms=function(){if(L===void 0)A(this);return L};let k;this.getAttributes=function(){if(k===void 0)A(this);return k};let c=W.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(c===!1)c=J.getProgramParameter(w,qG);return c},this.destroy=function(){R.releaseStatesOfProgram(this),J.deleteProgram(w),this.program=void 0},this.type=W.shaderType,this.name=W.shaderName,this.id=NG++,this.cacheKey=H,this.usedTimes=1,this.program=w,this.vertexShader=V,this.fragmentShader=P,this}var mG=0;class fQ{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(E,H,W){let R=this._getShaderCacheForMaterial(E);if(R.has(H)===!1)R.add(H),H.usedTimes++;if(R.has(W)===!1)R.add(W),W.usedTimes++;return this}remove(E){let H=this.materialCache.get(E);for(let W of H)if(W.usedTimes--,W.usedTimes===0)this.shaderCache.delete(W.code);return this.materialCache.delete(E),this}getVertexShaderStage(E){return this._getShaderStage(E.vertexShader)}getFragmentShaderStage(E){return this._getShaderStage(E.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(E){let H=this.materialCache,W=H.get(E);if(W===void 0)W=new Set,H.set(E,W);return W}_getShaderStage(E){let H=this.shaderCache,W=H.get(E);if(W===void 0)W=new bQ(E),H.set(E,W);return W}}class bQ{constructor(E){this.id=mG++,this.code=E,this.usedTimes=0}}function uG(E){return E===v8||E===c7||E===n7}function dG(E,H,W,R,J,Q){let $=new r7,Z=new fQ,K=new Set,U=[],X=new Map,Y=R.logarithmicDepthBuffer,G=R.precision,D={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function F(L){if(K.add(L),L===0)return"uv";return`uv${L}`}function w(L,k,c,h,v,d){let z=h.fog,u=v.geometry,a=L.isMeshStandardMaterial||L.isMeshLambertMaterial||L.isMeshPhongMaterial?h.environment:null,p=L.isMeshStandardMaterial||L.isMeshLambertMaterial&&!L.envMap||L.isMeshPhongMaterial&&!L.envMap,J0=H.get(L.envMap||a,p),s=!!J0&&J0.mapping===mW?J0.image.height:null,t=D[L.type];if(L.precision!==null){if(G=R.getMaxPrecision(L.precision),G!==L.precision)h0("WebGLProgram.getParameters:",L.precision,"not supported, using",G,"instead.")}let R0=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,S0=R0!==void 0?R0.length:0,A0=0;if(u.morphAttributes.position!==void 0)A0=1;if(u.morphAttributes.normal!==void 0)A0=2;if(u.morphAttributes.color!==void 0)A0=3;let YE,u0,i,$0;if(t){let LE=uH[t];YE=LE.vertexShader,u0=LE.fragmentShader}else{YE=L.vertexShader,u0=L.fragmentShader;let LE=Z.getVertexShaderStage(L),ZE=Z.getFragmentShaderStage(L);Z.update(L,LE,ZE),i=LE.id,$0=ZE.id}let U0=E.getRenderTarget(),j0=E.state.buffers.depth.getReversed(),f0=v.isInstancedMesh===!0,I0=v.isBatchedMesh===!0,xE=!!L.map,o0=!!L.matcap,e0=!!J0,UE=!!L.aoMap,EE=!!L.lightMap,nE=!!L.bumpMap&&L.wireframe===!1,wE=!!L.normalMap,JH=!!L.displacementMap,gE=!!L.emissiveMap,pE=!!L.metalnessMap,_=!!L.roughnessMap,QH=L.anisotropy>0,$E=L.clearcoat>0,zE=L.dispersion>0,O=L.retroreflectivity>0,q=L.iridescence>0,I=L.sheen>0,l=L.transmission>0,H0=QH&&!!L.anisotropyMap,X0=$E&&!!L.clearcoatMap,M0=$E&&!!L.clearcoatNormalMap,n=$E&&!!L.clearcoatRoughnessMap,r=q&&!!L.iridescenceMap,L0=q&&!!L.iridescenceThicknessMap,z0=I&&!!L.sheenColorMap,D0=I&&!!L.sheenRoughnessMap,Z0=!!L.specularMap,_0=!!L.specularColorMap,y0=!!L.specularIntensityMap,QE=l&&!!L.transmissionMap,j=l&&!!L.thicknessMap,G0=!!L.gradientMap,o=!!L.alphaMap,Y0=L.alphaTest>0,O0=!!L.alphaHash,E0=!!L.extensions,q0=jH;if(L.toneMapped){if(U0===null||U0.isXRRenderTarget===!0)q0=E.toneMapping}let l0={shaderID:t,shaderType:L.type,shaderName:L.name,vertexShader:YE,fragmentShader:u0,defines:L.defines,customVertexShaderID:i,customFragmentShaderID:$0,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:G,batching:I0,batchingColor:I0&&v._colorsTexture!==null,instancing:f0,instancingColor:f0&&v.instanceColor!==null,instancingMorph:f0&&v.morphTexture!==null,outputColorSpace:U0===null?E.outputColorSpace:U0.isXRRenderTarget===!0?U0.texture.colorSpace:a0.workingColorSpace,alphaToCoverage:!!L.alphaToCoverage,map:xE,matcap:o0,envMap:e0,envMapMode:e0&&J0.mapping,envMapCubeUVHeight:s,aoMap:UE,lightMap:EE,bumpMap:nE,normalMap:wE,displacementMap:JH,emissiveMap:gE,normalMapObjectSpace:wE&&L.normalMapType===d1,normalMapTangentSpace:wE&&L.normalMapType===g9,packedNormalMap:wE&&L.normalMapType===g9&&uG(L.normalMap.format),metalnessMap:pE,roughnessMap:_,anisotropy:QH,anisotropyMap:H0,clearcoat:$E,clearcoatMap:X0,clearcoatNormalMap:M0,clearcoatRoughnessMap:n,dispersion:zE,retroreflection:O,iridescence:q,iridescenceMap:r,iridescenceThicknessMap:L0,sheen:I,sheenColorMap:z0,sheenRoughnessMap:D0,specularMap:Z0,specularColorMap:_0,specularIntensityMap:y0,transmission:l,transmissionMap:QE,thicknessMap:j,gradientMap:G0,opaque:L.transparent===!1&&L.blending===pW&&L.alphaToCoverage===!1,alphaMap:o,alphaTest:Y0,alphaHash:O0,combine:L.combine,mapUv:xE&&F(L.map.channel),aoMapUv:UE&&F(L.aoMap.channel),lightMapUv:EE&&F(L.lightMap.channel),bumpMapUv:nE&&F(L.bumpMap.channel),normalMapUv:wE&&F(L.normalMap.channel),displacementMapUv:JH&&F(L.displacementMap.channel),emissiveMapUv:gE&&F(L.emissiveMap.channel),metalnessMapUv:pE&&F(L.metalnessMap.channel),roughnessMapUv:_&&F(L.roughnessMap.channel),anisotropyMapUv:H0&&F(L.anisotropyMap.channel),clearcoatMapUv:X0&&F(L.clearcoatMap.channel),clearcoatNormalMapUv:M0&&F(L.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:n&&F(L.clearcoatRoughnessMap.channel),iridescenceMapUv:r&&F(L.iridescenceMap.channel),iridescenceThicknessMapUv:L0&&F(L.iridescenceThicknessMap.channel),sheenColorMapUv:z0&&F(L.sheenColorMap.channel),sheenRoughnessMapUv:D0&&F(L.sheenRoughnessMap.channel),specularMapUv:Z0&&F(L.specularMap.channel),specularColorMapUv:_0&&F(L.specularColorMap.channel),specularIntensityMapUv:y0&&F(L.specularIntensityMap.channel),transmissionMapUv:QE&&F(L.transmissionMap.channel),thicknessMapUv:j&&F(L.thicknessMap.channel),alphaMapUv:o&&F(L.alphaMap.channel),vertexTangents:!!u.attributes.tangent&&(wE||QH),vertexNormals:!!u.attributes.normal,vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!u.attributes.color&&u.attributes.color.itemSize===4,pointsUvs:v.isPoints===!0&&!!u.attributes.uv&&(xE||o),fog:!!z,useFog:L.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:L.wireframe===!1&&(L.flatShading===!0||u.attributes.normal===void 0&&wE===!1&&(L.isMeshLambertMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isMeshPhysicalMaterial)),sizeAttenuation:L.sizeAttenuation===!0,logarithmicDepthBuffer:Y,reversedDepthBuffer:j0,skinning:v.isSkinnedMesh===!0,hasPositionAttribute:u.attributes.position!==void 0,morphTargets:u.morphAttributes.position!==void 0,morphNormals:u.morphAttributes.normal!==void 0,morphColors:u.morphAttributes.color!==void 0,morphTargetsCount:S0,morphTextureStride:A0,numSunLights:k.sun.length,numDirLights:k.directional.length,numPointLights:k.point.length,numSpotLights:k.spot.length,numSpotLightMaps:k.spotLightMap.length,numRectAreaLights:k.rectArea.length,numHemiLights:k.hemi.length,numSunLightShadows:k.sunShadowMap.length,numDirLightShadows:k.directionalShadowMap.length,numPointLightShadows:k.pointShadowMap.length,numSpotLightShadows:k.spotShadowMap.length,numSpotLightShadowsWithMaps:k.numSpotLightShadowsWithMaps,numLightProbes:k.numLightProbes,numLightProbeGrids:d.length,numClippingPlanes:Q.numPlanes,numClipIntersection:Q.numIntersection,dithering:L.dithering,shadowMapEnabled:E.shadowMap.enabled&&c.length>0,shadowMapType:E.shadowMap.type,toneMapping:q0,decodeVideoTexture:xE&&L.map.isVideoTexture===!0&&a0.getTransfer(L.map.colorSpace)===FE,decodeVideoTextureEmissive:gE&&L.emissiveMap.isVideoTexture===!0&&a0.getTransfer(L.emissiveMap.colorSpace)===FE,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===GE,flipSided:L.side===UH,useDepthPacking:L.depthPacking>=0,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionClipCullDistance:E0&&L.extensions.clipCullDistance===!0&&W.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(E0&&L.extensions.multiDraw===!0||I0)&&W.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:W.has("KHR_parallel_shader_compile"),customProgramCacheKey:L.customProgramCacheKey()};return l0.vertexUv1s=K.has(1),l0.vertexUv2s=K.has(2),l0.vertexUv3s=K.has(3),K.clear(),l0}function C(L){let k=[];if(L.shaderID)k.push(L.shaderID);else k.push(L.customVertexShaderID),k.push(L.customFragmentShaderID);if(L.defines!==void 0)for(let c in L.defines)k.push(c),k.push(L.defines[c]);if(L.isRawShaderMaterial===!1)M(k,L),T(k,L),k.push(E.outputColorSpace);return k.push(L.customProgramCacheKey),k.join()}function M(L,k){L.push(k.precision),L.push(k.outputColorSpace),L.push(k.envMapMode),L.push(k.envMapCubeUVHeight),L.push(k.mapUv),L.push(k.alphaMapUv),L.push(k.lightMapUv),L.push(k.aoMapUv),L.push(k.bumpMapUv),L.push(k.normalMapUv),L.push(k.displacementMapUv),L.push(k.emissiveMapUv),L.push(k.metalnessMapUv),L.push(k.roughnessMapUv),L.push(k.anisotropyMapUv),L.push(k.clearcoatMapUv),L.push(k.clearcoatNormalMapUv),L.push(k.clearcoatRoughnessMapUv),L.push(k.iridescenceMapUv),L.push(k.iridescenceThicknessMapUv),L.push(k.sheenColorMapUv),L.push(k.sheenRoughnessMapUv),L.push(k.specularMapUv),L.push(k.specularColorMapUv),L.push(k.specularIntensityMapUv),L.push(k.transmissionMapUv),L.push(k.thicknessMapUv),L.push(k.combine),L.push(k.fogExp2),L.push(k.sizeAttenuation),L.push(k.morphTargetsCount),L.push(k.morphAttributeCount),L.push(k.numSunLights),L.push(k.numDirLights),L.push(k.numPointLights),L.push(k.numSpotLights),L.push(k.numSpotLightMaps),L.push(k.numHemiLights),L.push(k.numRectAreaLights),L.push(k.numSunLightShadows),L.push(k.numDirLightShadows),L.push(k.numPointLightShadows),L.push(k.numSpotLightShadows),L.push(k.numSpotLightShadowsWithMaps),L.push(k.numLightProbes),L.push(k.shadowMapType),L.push(k.toneMapping),L.push(k.numClippingPlanes),L.push(k.numClipIntersection),L.push(k.depthPacking)}function T(L,k){if($.disableAll(),k.instancing)$.enable(0);if(k.instancingColor)$.enable(1);if(k.instancingMorph)$.enable(2);if(k.matcap)$.enable(3);if(k.envMap)$.enable(4);if(k.normalMapObjectSpace)$.enable(5);if(k.normalMapTangentSpace)$.enable(6);if(k.clearcoat)$.enable(7);if(k.iridescence)$.enable(8);if(k.alphaTest)$.enable(9);if(k.vertexColors)$.enable(10);if(k.vertexAlphas)$.enable(11);if(k.vertexUv1s)$.enable(12);if(k.vertexUv2s)$.enable(13);if(k.vertexUv3s)$.enable(14);if(k.vertexTangents)$.enable(15);if(k.anisotropy)$.enable(16);if(k.alphaHash)$.enable(17);if(k.batching)$.enable(18);if(k.dispersion)$.enable(19);if(k.retroreflection)$.enable(24);if(k.batchingColor)$.enable(20);if(k.gradientMap)$.enable(21);if(k.packedNormalMap)$.enable(22);if(k.vertexNormals)$.enable(23);if(L.push($.mask),$.disableAll(),k.fog)$.enable(0);if(k.useFog)$.enable(1);if(k.flatShading)$.enable(2);if(k.logarithmicDepthBuffer)$.enable(3);if(k.reversedDepthBuffer)$.enable(4);if(k.skinning)$.enable(5);if(k.morphTargets)$.enable(6);if(k.morphNormals)$.enable(7);if(k.morphColors)$.enable(8);if(k.premultipliedAlpha)$.enable(9);if(k.shadowMapEnabled)$.enable(10);if(k.doubleSided)$.enable(11);if(k.flipSided)$.enable(12);if(k.useDepthPacking)$.enable(13);if(k.dithering)$.enable(14);if(k.transmission)$.enable(15);if(k.sheen)$.enable(16);if(k.opaque)$.enable(17);if(k.pointsUvs)$.enable(18);if(k.decodeVideoTexture)$.enable(19);if(k.decodeVideoTextureEmissive)$.enable(20);if(k.alphaToCoverage)$.enable(21);if(k.numLightProbeGrids>0)$.enable(22);if(k.hasPositionAttribute)$.enable(23);L.push($.mask)}function y(L){let k=D[L.type],c;if(k){let h=uH[k];c=WQ.clone(h.uniforms)}else c=L.uniforms;return c}function B(L,k){let c=X.get(k);if(c!==void 0)++c.usedTimes;else c=new lG(E,k,L,J),U.push(c),X.set(k,c);return c}function V(L){if(--L.usedTimes===0){let k=U.indexOf(L);U[k]=U[U.length-1],U.pop(),X.delete(L.cacheKey),L.destroy()}}function P(L){Z.remove(L)}function A(){Z.dispose()}return{getParameters:w,getProgramCacheKey:C,getUniforms:y,acquireProgram:B,releaseProgram:V,releaseShaderCache:P,programs:U,dispose:A}}function cG(){let E=new WeakMap;function H($){return E.has($)}function W($){let Z=E.get($);if(Z===void 0)Z={},E.set($,Z);return Z}function R($){E.delete($)}function J($,Z,K){E.get($)[Z]=K}function Q(){E=new WeakMap}return{has:H,get:W,remove:R,update:J,dispose:Q}}function nG(E,H){if(E.groupOrder!==H.groupOrder)return E.groupOrder-H.groupOrder;else if(E.renderOrder!==H.renderOrder)return E.renderOrder-H.renderOrder;else if(E.material.id!==H.material.id)return E.material.id-H.material.id;else if(E.materialVariant!==H.materialVariant)return E.materialVariant-H.materialVariant;else if(E.z!==H.z)return E.z-H.z;else return E.id-H.id}function kQ(E,H){if(E.groupOrder!==H.groupOrder)return E.groupOrder-H.groupOrder;else if(E.renderOrder!==H.renderOrder)return E.renderOrder-H.renderOrder;else if(E.z!==H.z)return H.z-E.z;else return E.id-H.id}function VQ(){let E=[],H=0,W=[],R=[],J=[];function Q(){H=0,W.length=0,R.length=0,J.length=0}function $(G){let D=0;if(G.isInstancedMesh)D+=2;if(G.isSkinnedMesh)D+=1;return D}function Z(G,D,F,w,C,M){let T=E[H];if(T===void 0)T={id:G.id,object:G,geometry:D,material:F,materialVariant:$(G),groupOrder:w,renderOrder:G.renderOrder,z:C,group:M},E[H]=T;else T.id=G.id,T.object=G,T.geometry=D,T.material=F,T.materialVariant=$(G),T.groupOrder=w,T.renderOrder=G.renderOrder,T.z=C,T.group=M;return H++,T}function K(G,D,F,w,C,M,T){if(T.reversedDepth===!0)C=-C;let y=Z(G,D,F,w,C,M);if(F.transmission>0)R.push(y);else if(F.transparent===!0)J.push(y);else W.push(y)}function U(G,D,F,w,C,M){let T=Z(G,D,F,w,C,M);if(F.transmission>0)R.unshift(T);else if(F.transparent===!0)J.unshift(T);else W.unshift(T)}function X(G,D){if(W.length>1)W.sort(G||nG);if(R.length>1)R.sort(D||kQ);if(J.length>1)J.sort(D||kQ)}function Y(){for(let G=H,D=E.length;G<D;G++){let F=E[G];if(F.id===null)break;F.id=null,F.object=null,F.geometry=null,F.material=null,F.group=null}}return{opaque:W,transmissive:R,transparent:J,init:Q,push:K,unshift:U,finish:Y,sort:X}}function sG(){let E=new WeakMap;function H(R,J){let Q=E.get(R),$;if(Q===void 0)$=new VQ,E.set(R,[$]);else if(J>=Q.length)$=new VQ,Q.push($);else $=Q[J];return $}function W(){E=new WeakMap}return{get:H,dispose:W}}function iG(){let E={};return{get:function(H){if(E[H.id]!==void 0)return E[H.id];let W;switch(H.type){case"SunLight":case"DirectionalLight":W={direction:new b,color:new e};break;case"SpotLight":W={position:new b,direction:new b,color:new e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":W={position:new b,color:new e,distance:0,decay:0};break;case"HemisphereLight":W={direction:new b,skyColor:new e,groundColor:new e};break;case"RectAreaLight":W={color:new e,position:new b,halfWidth:new b,halfHeight:new b};break}return E[H.id]=W,W}}}function oG(){let E={};return{get:function(H){if(E[H.id]!==void 0)return E[H.id];let W;switch(H.type){case"SunLight":case"DirectionalLight":W={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new m0};break;case"SpotLight":W={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new m0};break;case"PointLight":W={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new m0,shadowCameraNear:1,shadowCameraFar:1000};break}return E[H.id]=W,W}}}var aG=0;function rG(E,H){return(H.castShadow?2:0)-(E.castShadow?2:0)+(H.map?1:0)-(E.map?1:0)}function tG(E){let H=new iG,W=oG(),R={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)R.probe.push(new b);let J=new b,Q=new AE,$=new AE;function Z(U){let X=0,Y=0,G=0;for(let v=0;v<9;v++)R.probe[v].set(0,0,0);let D=0,F=0,w=0,C=0,M=0,T=0,y=0,B=0,V=0,P=0,A=0,L=0,k=0,c=0;U.sort(rG);for(let v=0,d=U.length;v<d;v++){let z=U[v],u=z.color,a=z.intensity,p=z.distance,J0=null;if(z.shadow&&z.shadow.map)if(z.shadow.map.texture.format===v8)J0=z.shadow.map.texture;else J0=z.shadow.map.depthTexture||z.shadow.map.texture;if(z.isAmbientLight)X+=u.r*a,Y+=u.g*a,G+=u.b*a;else if(z.isLightProbe){for(let s=0;s<9;s++)R.probe[s].addScaledVector(z.sh.coefficients[s],a);c++}else if(z.isSunLight){let s=H.get(z);if(s.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){let t=z.shadow,R0=W.get(z);R0.shadowIntensity=t.intensity,R0.shadowBias=t.bias,R0.shadowNormalBias=t.normalBias,R0.shadowRadius=t.radius,R0.shadowMapSize.copy(t.mapSize).multiply(t.getFrameExtents()),R.sunShadow[F]=R0,R.sunShadowMap[F]=J0;let S0=t.getViewportCount();for(let A0=0;A0<S0;A0++)R.sunShadowMatrix[w+A0]=t.getMatrix(A0),R.sunShadowCascade[w+A0]=t._cascadeData[A0];w+=S0,F++}R.sun[D]=s,D++}else if(z.isDirectionalLight){let s=H.get(z);if(s.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){let t=z.shadow,R0=W.get(z);R0.shadowIntensity=t.intensity,R0.shadowBias=t.bias,R0.shadowNormalBias=t.normalBias,R0.shadowRadius=t.radius,R0.shadowMapSize=t.mapSize,R.directionalShadow[C]=R0,R.directionalShadowMap[C]=J0,R.directionalShadowMatrix[C]=z.shadow.matrix,V++}R.directional[C]=s,C++}else if(z.isSpotLight){let s=H.get(z);s.position.setFromMatrixPosition(z.matrixWorld),s.color.copy(u).multiplyScalar(a),s.distance=p,s.coneCos=Math.cos(z.angle),s.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),s.decay=z.decay,R.spot[T]=s;let t=z.shadow;if(z.map){if(R.spotLightMap[L]=z.map,L++,t.updateMatrices(z),z.castShadow)k++}if(R.spotLightMatrix[T]=t.matrix,z.castShadow){let R0=W.get(z);R0.shadowIntensity=t.intensity,R0.shadowBias=t.bias,R0.shadowNormalBias=t.normalBias,R0.shadowRadius=t.radius,R0.shadowMapSize=t.mapSize,R.spotShadow[T]=R0,R.spotShadowMap[T]=J0,A++}T++}else if(z.isRectAreaLight){let s=H.get(z);s.color.copy(u).multiplyScalar(a),s.halfWidth.set(z.width*0.5,0,0),s.halfHeight.set(0,z.height*0.5,0),R.rectArea[y]=s,y++}else if(z.isPointLight){let s=H.get(z);if(s.color.copy(z.color).multiplyScalar(z.intensity),s.distance=z.distance,s.decay=z.decay,z.castShadow){let t=z.shadow,R0=W.get(z);R0.shadowIntensity=t.intensity,R0.shadowBias=t.bias,R0.shadowNormalBias=t.normalBias,R0.shadowRadius=t.radius,R0.shadowMapSize=t.mapSize,R0.shadowCameraNear=t.camera.near,R0.shadowCameraFar=t.camera.far,R.pointShadow[M]=R0,R.pointShadowMap[M]=J0,R.pointShadowMatrix[M]=z.shadow.matrix,P++}R.point[M]=s,M++}else if(z.isHemisphereLight){let s=H.get(z);s.skyColor.copy(z.color).multiplyScalar(a),s.groundColor.copy(z.groundColor).multiplyScalar(a),R.hemi[B]=s,B++}}if(y>0)if(E.has("OES_texture_float_linear")===!0)R.rectAreaLTC1=C0.LTC_FLOAT_1,R.rectAreaLTC2=C0.LTC_FLOAT_2;else R.rectAreaLTC1=C0.LTC_HALF_1,R.rectAreaLTC2=C0.LTC_HALF_2;R.ambient[0]=X,R.ambient[1]=Y,R.ambient[2]=G;let h=R.hash;if(h.sunLength!==D||h.directionalLength!==C||h.pointLength!==M||h.spotLength!==T||h.rectAreaLength!==y||h.hemiLength!==B||h.numSunShadows!==F||h.numDirectionalShadows!==V||h.numPointShadows!==P||h.numSpotShadows!==A||h.numSpotMaps!==L||h.numLightProbes!==c)R.sun.length=D,R.directional.length=C,R.spot.length=T,R.rectArea.length=y,R.point.length=M,R.hemi.length=B,R.sunShadow.length=F,R.sunShadowMap.length=F,R.sunShadowMatrix.length=w,R.sunShadowCascade.length=w,R.directionalShadow.length=V,R.directionalShadowMap.length=V,R.directionalShadowMatrix.length=V,R.pointShadow.length=P,R.pointShadowMap.length=P,R.pointShadowMatrix.length=P,R.spotShadow.length=A,R.spotShadowMap.length=A,R.spotLightMatrix.length=A+L-k,R.spotLightMap.length=L,R.numSpotLightShadowsWithMaps=k,R.numLightProbes=c,h.sunLength=D,h.directionalLength=C,h.pointLength=M,h.spotLength=T,h.rectAreaLength=y,h.hemiLength=B,h.numSunShadows=F,h.numDirectionalShadows=V,h.numPointShadows=P,h.numSpotShadows=A,h.numSpotMaps=L,h.numLightProbes=c,R.version=aG++}function K(U,X){let Y=0,G=0,D=0,F=0,w=0,C=0,M=X.matrixWorldInverse;for(let T=0,y=U.length;T<y;T++){let B=U[T];if(B.isSunLight){let V=R.sun[Y];V.direction.setFromMatrixPosition(B.matrixWorld),V.direction.transformDirection(M),Y++}else if(B.isDirectionalLight){let V=R.directional[G];V.direction.setFromMatrixPosition(B.matrixWorld),J.setFromMatrixPosition(B.target.matrixWorld),V.direction.sub(J),V.direction.transformDirection(M),G++}else if(B.isSpotLight){let V=R.spot[F];V.position.setFromMatrixPosition(B.matrixWorld),V.position.applyMatrix4(M),V.direction.setFromMatrixPosition(B.matrixWorld),J.setFromMatrixPosition(B.target.matrixWorld),V.direction.sub(J),V.direction.transformDirection(M),F++}else if(B.isRectAreaLight){let V=R.rectArea[w];V.position.setFromMatrixPosition(B.matrixWorld),V.position.applyMatrix4(M),$.identity(),Q.copy(B.matrixWorld),Q.premultiply(M),$.extractRotation(Q),V.halfWidth.set(B.width*0.5,0,0),V.halfHeight.set(0,B.height*0.5,0),V.halfWidth.applyMatrix4($),V.halfHeight.applyMatrix4($),w++}else if(B.isPointLight){let V=R.point[D];V.position.setFromMatrixPosition(B.matrixWorld),V.position.applyMatrix4(M),D++}else if(B.isHemisphereLight){let V=R.hemi[C];V.direction.setFromMatrixPosition(B.matrixWorld),V.direction.transformDirection(M),C++}}}return{setup:Z,setupView:K,state:R}}function TQ(E){let H=new tG(E),W=[],R=[],J=[];function Q(G){Y.camera=G,W.length=0,R.length=0,J.length=0}function $(G){W.push(G)}function Z(G){R.push(G)}function K(G){J.push(G)}function U(){H.setup(W)}function X(G){H.setupView(W,G)}let Y={lightsArray:W,shadowsArray:R,lightProbeGridArray:J,camera:null,lights:H,transmissionRenderTarget:{},textureUnits:0};return{init:Q,state:Y,setupLights:U,setupLightsView:X,pushLight:$,pushShadow:Z,pushLightProbeGrid:K}}function eG(E){let H=new WeakMap;function W(J,Q=0){let $=H.get(J),Z;if($===void 0)Z=new TQ(E),H.set(J,[Z]);else if(Q>=$.length)Z=new TQ(E),$.push(Z);else Z=$[Q];return Z}function R(){H=new WeakMap}return{get:W,dispose:R}}var E5=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,H5=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,W5=[new b(1,0,0),new b(-1,0,0),new b(0,1,0),new b(0,-1,0),new b(0,0,1),new b(0,0,-1)],R5=[new b(0,-1,0),new b(0,-1,0),new b(0,0,1),new b(0,0,-1),new b(0,-1,0),new b(0,-1,0)],PQ=new AE,oW=new b,wR=new b;function J5(E,H,W){let R=new W6,J=new m0,Q=new m0,$=new NE,Z=new e9,K=new ER,U={},X=W.maxTextureSize,Y={[qW]:UH,[UH]:qW,[GE]:GE},G=new SE({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new m0},radius:{value:4}},vertexShader:E5,fragmentShader:H5}),D=G.clone();D.defines.HORIZONTAL_PASS=1;let F=new WE;F.setAttribute("position",new hE(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let w=new s0(F,G),C=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gW;let M=this.type;this.render=function(P,A,L){if(C.enabled===!1)return;if(C.autoUpdate===!1&&C.needsUpdate===!1)return;if(P.length===0)return;if(this.type===R1)h0("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=gW;let k=E.getRenderTarget(),c=E.getActiveCubeFace(),h=E.getActiveMipmapLevel(),v=E.state;if(v.setBlending(lH),v.buffers.depth.getReversed()===!0)v.buffers.color.setClear(0,0,0,0);else v.buffers.color.setClear(1,1,1,1);v.buffers.depth.setTest(!0),v.setScissorTest(!1);let d=M!==this.type;if(d)A.traverse(function(z){if(z.material)if(Array.isArray(z.material))z.material.forEach((u)=>u.needsUpdate=!0);else z.material.needsUpdate=!0});for(let z=0,u=P.length;z<u;z++){let a=P[z],p=a.shadow;if(p===void 0){h0("WebGLShadowMap:",a,"has no shadow.");continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;J.copy(p.mapSize);let J0=p.getFrameExtents();if(J.multiply(J0),Q.copy(p.mapSize),J.x>X||J.y>X){if(J.x>X)Q.x=Math.floor(X/J0.x),J.x=Q.x*J0.x,p.mapSize.x=Q.x;if(J.y>X)Q.y=Math.floor(X/J0.y),J.y=Q.y*J0.y,p.mapSize.y=Q.y}let s=E.state.buffers.depth.getReversed();if(p.camera._reversedDepth=s,p.map===null||d===!0){if(p.map!==null){if(p.map.depthTexture!==null)p.map.depthTexture.dispose(),p.map.depthTexture=null;p.map.dispose()}if(this.type===CW){if(a.isPointLight){h0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}p.map=new cE(J.x,J.y,{format:v8,type:wH,minFilter:_E,magFilter:_E,generateMipmaps:!1}),p.map.texture.name=a.name+".shadowMap",p.map.depthTexture=new g8(J.x,J.y,E8),p.map.depthTexture.name=a.name+".shadowMapDepth",p.map.depthTexture.format=y8,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=C8,p.map.depthTexture.magFilter=C8}else{if(a.isPointLight)p.map=new PR(J.x),p.map.depthTexture=new a9(J.x,q8);else p.map=new cE(J.x,J.y),p.map.depthTexture=new g8(J.x,J.y,q8);if(p.map.depthTexture.name=a.name+".shadowMap",p.map.depthTexture.format=y8,this.type===gW)p.map.depthTexture.compareFunction=s?o7:i7,p.map.depthTexture.minFilter=_E,p.map.depthTexture.magFilter=_E;else p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=C8,p.map.depthTexture.magFilter=C8}p.camera.updateProjectionMatrix()}if(p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==J.x||p.map.height!==J.y))p.map.setSize(J.x,J.y);let t=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();if(a.isPointLight!==!0)p.updateMatrices(a,L);for(let R0=0;R0<t;R0++){let S0=p.getCamera(R0);if(a.isPointLight){let{camera:A0,matrix:YE}=p,u0=a.distance||A0.far;if(u0!==A0.far)A0.far=u0,A0.updateProjectionMatrix();oW.setFromMatrixPosition(a.matrixWorld),A0.position.copy(oW),wR.copy(A0.position),wR.add(W5[R0]),A0.up.copy(R5[R0]),A0.lookAt(wR),A0.updateMatrixWorld(),YE.makeTranslation(-oW.x,-oW.y,-oW.z),PQ.multiplyMatrices(A0.projectionMatrix,A0.matrixWorldInverse),p._frustum.setFromProjectionMatrix(PQ,A0.coordinateSystem,A0.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)E.setRenderTarget(p.map,R0),E.clear();else{if(R0===0)E.setRenderTarget(p.map),E.clear();let A0=p.getViewport(R0);$.set(Q.x*A0.x,Q.y*A0.y,Q.x*A0.z,Q.y*A0.w),v.viewport($)}R=p.getFrustum(R0),B(A,L,S0,a,this.type)}if(p.isPointLightShadow!==!0&&this.type===CW)T(p,L);p.needsUpdate=!1}M=this.type,C.needsUpdate=!1,E.setRenderTarget(k,c,h)};function T(P,A){let L=H.update(w);if(G.defines.VSM_SAMPLES!==P.blurSamples)G.defines.VSM_SAMPLES=P.blurSamples,D.defines.VSM_SAMPLES=P.blurSamples,G.needsUpdate=!0,D.needsUpdate=!0;if(P.mapPass===null)P.mapPass=new cE(J.x,J.y,{format:v8,type:wH});else if(P.mapPass.width!==P.map.width||P.mapPass.height!==P.map.height)P.mapPass.setSize(P.map.width,P.map.height);G.uniforms.shadow_pass.value=P.map.depthTexture,G.uniforms.resolution.value.set(P.map.width,P.map.height),G.uniforms.radius.value=P.radius,E.setRenderTarget(P.mapPass),E.clear(),E.renderBufferDirect(A,null,L,G,w,null),D.uniforms.shadow_pass.value=P.mapPass.texture,D.uniforms.resolution.value.set(P.map.width,P.map.height),D.uniforms.radius.value=P.radius,E.setRenderTarget(P.map),E.clear(),E.renderBufferDirect(A,null,L,D,w,null)}function y(P,A,L,k){let c=null,h=L.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(h!==void 0)c=h;else if(c=L.isPointLight===!0?K:Z,E.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let v=c.uuid,d=A.uuid,z=U[v];if(z===void 0)z={},U[v]=z;let u=z[d];if(u===void 0)u=c.clone(),z[d]=u,A.addEventListener("dispose",V);c=u}if(c.visible=A.visible,c.wireframe=A.wireframe,k===CW)c.side=A.shadowSide!==null?A.shadowSide:A.side;else c.side=A.shadowSide!==null?A.shadowSide:Y[A.side];if(c.alphaMap=A.alphaMap,c.alphaTest=A.alphaToCoverage===!0?0.5:A.alphaTest,c.map=A.map,c.clipShadows=A.clipShadows,c.clippingPlanes=A.clippingPlanes,c.clipIntersection=A.clipIntersection,c.displacementMap=A.displacementMap,c.displacementScale=A.displacementScale,c.displacementBias=A.displacementBias,c.wireframeLinewidth=A.wireframeLinewidth,c.linewidth=A.linewidth,L.isPointLight===!0&&c.isMeshDistanceMaterial===!0){let v=E.properties.get(c);v.light=L}return c}function B(P,A,L,k,c){if(P.visible===!1)return;if(P.layers.test(A.layers)&&(P.isMesh||P.isLine||P.isPoints)){if((P.castShadow||P.receiveShadow&&c===CW)&&(!P.frustumCulled||P.intersectsFrustum(R))){P.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,P.matrixWorld);let d=H.update(P),z=P.material;if(Array.isArray(z)){let u=d.groups;for(let a=0,p=u.length;a<p;a++){let J0=u[a],s=z[J0.materialIndex];if(s&&s.visible){let t=y(P,s,k,c);P.onBeforeShadow(E,P,A,L,d,t,J0),E.renderBufferDirect(L,null,d,t,P,J0),P.onAfterShadow(E,P,A,L,d,t,J0)}}}else if(z.visible){let u=y(P,z,k,c);P.onBeforeShadow(E,P,A,L,d,u,null),E.renderBufferDirect(L,null,d,u,P,null),P.onAfterShadow(E,P,A,L,d,u,null)}}}let v=P.children;for(let d=0,z=v.length;d<z;d++)B(v[d],A,L,k,c)}function V(P){P.target.removeEventListener("dispose",V);for(let L in U){let k=U[L],c=P.target.uuid;if(c in k)k[c].dispose(),delete k[c]}}}function Q5(E,H){function W(){let j=!1,G0=new NE,o=null,Y0=new NE(0,0,0,0);return{setMask:function(O0){if(o!==O0&&!j)E.colorMask(O0,O0,O0,O0),o=O0},setLocked:function(O0){j=O0},setClear:function(O0,E0,q0,l0,LE){if(LE===!0)O0*=l0,E0*=l0,q0*=l0;if(G0.set(O0,E0,q0,l0),Y0.equals(G0)===!1)E.clearColor(O0,E0,q0,l0),Y0.copy(G0)},reset:function(){j=!1,o=null,Y0.set(-1,0,0,0)}}}function R(){let j=!1,G0=!1,o=null,Y0=null,O0=null;return{setReversed:function(E0){if(G0!==E0){let q0=H.get("EXT_clip_control");if(E0)q0.clipControlEXT(q0.LOWER_LEFT_EXT,q0.ZERO_TO_ONE_EXT);else q0.clipControlEXT(q0.LOWER_LEFT_EXT,q0.NEGATIVE_ONE_TO_ONE_EXT);G0=E0;let l0=O0;O0=null,this.setClear(l0)}},getReversed:function(){return G0},setTest:function(E0){if(E0)U0(E.DEPTH_TEST);else j0(E.DEPTH_TEST)},setMask:function(E0){if(o!==E0&&!j)E.depthMask(E0),o=E0},setFunc:function(E0){if(G0)E0=EQ[E0];if(Y0!==E0){switch(E0){case V1:E.depthFunc(E.NEVER);break;case T1:E.depthFunc(E.ALWAYS);break;case P1:E.depthFunc(E.LESS);break;case o6:E.depthFunc(E.LEQUAL);break;case z1:E.depthFunc(E.EQUAL);break;case A1:E.depthFunc(E.GEQUAL);break;case I1:E.depthFunc(E.GREATER);break;case _1:E.depthFunc(E.NOTEQUAL);break;default:E.depthFunc(E.LEQUAL)}Y0=E0}},setLocked:function(E0){j=E0},setClear:function(E0){if(O0!==E0){if(O0=E0,G0)E0=1-E0;E.clearDepth(E0)}},reset:function(){j=!1,o=null,Y0=null,O0=null,G0=!1}}}function J(){let j=!1,G0=null,o=null,Y0=null,O0=null,E0=null,q0=null,l0=null,LE=null;return{setTest:function(ZE){if(!j)if(ZE)U0(E.STENCIL_TEST);else j0(E.STENCIL_TEST)},setMask:function(ZE){if(G0!==ZE&&!j)E.stencilMask(ZE),G0=ZE},setFunc:function(ZE,vH,nH){if(o!==ZE||Y0!==vH||O0!==nH)E.stencilFunc(ZE,vH,nH),o=ZE,Y0=vH,O0=nH},setOp:function(ZE,vH,nH){if(E0!==ZE||q0!==vH||l0!==nH)E.stencilOp(ZE,vH,nH),E0=ZE,q0=vH,l0=nH},setLocked:function(ZE){j=ZE},setClear:function(ZE){if(LE!==ZE)E.clearStencil(ZE),LE=ZE},reset:function(){j=!1,G0=null,o=null,Y0=null,O0=null,E0=null,q0=null,l0=null,LE=null}}}let Q=new W,$=new R,Z=new J,K=new WeakMap,U=new WeakMap,X={},Y={},G={},D=new WeakMap,F=[],w=null,C=!1,M=null,T=null,y=null,B=null,V=null,P=null,A=null,L=new e(0,0,0),k=0,c=!1,h=null,v=null,d=null,z=null,u=null,a=E.getParameter(E.MAX_COMBINED_TEXTURE_IMAGE_UNITS),p=!1,J0=0,s=E.getParameter(E.VERSION);if(s.indexOf("WebGL")!==-1)J0=parseFloat(/^WebGL (\d)/.exec(s)[1]),p=J0>=1;else if(s.indexOf("OpenGL ES")!==-1)J0=parseFloat(/^OpenGL ES (\d)/.exec(s)[1]),p=J0>=2;let t=null,R0={},S0=E.getParameter(E.SCISSOR_BOX),A0=E.getParameter(E.VIEWPORT),YE=new NE().fromArray(S0),u0=new NE().fromArray(A0);function i(j,G0,o,Y0){let O0=new Uint8Array(4),E0=E.createTexture();E.bindTexture(j,E0),E.texParameteri(j,E.TEXTURE_MIN_FILTER,E.NEAREST),E.texParameteri(j,E.TEXTURE_MAG_FILTER,E.NEAREST);for(let q0=0;q0<o;q0++)if(j===E.TEXTURE_3D||j===E.TEXTURE_2D_ARRAY)E.texImage3D(G0,0,E.RGBA,1,1,Y0,0,E.RGBA,E.UNSIGNED_BYTE,O0);else E.texImage2D(G0+q0,0,E.RGBA,1,1,0,E.RGBA,E.UNSIGNED_BYTE,O0);return E0}let $0={};$0[E.TEXTURE_2D]=i(E.TEXTURE_2D,E.TEXTURE_2D,1),$0[E.TEXTURE_CUBE_MAP]=i(E.TEXTURE_CUBE_MAP,E.TEXTURE_CUBE_MAP_POSITIVE_X,6),$0[E.TEXTURE_2D_ARRAY]=i(E.TEXTURE_2D_ARRAY,E.TEXTURE_2D_ARRAY,1,1),$0[E.TEXTURE_3D]=i(E.TEXTURE_3D,E.TEXTURE_3D,1,1),Q.setClear(0,0,0,1),$.setClear(1),Z.setClear(0),U0(E.DEPTH_TEST),$.setFunc(o6),nE(!1),wE(n6),U0(E.CULL_FACE),UE(lH);function U0(j){if(X[j]!==!0)E.enable(j),X[j]=!0}function j0(j){if(X[j]!==!1)E.disable(j),X[j]=!1}function f0(j,G0){if(G[j]!==G0){if(E.bindFramebuffer(j,G0),G[j]=G0,j===E.DRAW_FRAMEBUFFER)G[E.FRAMEBUFFER]=G0;if(j===E.FRAMEBUFFER)G[E.DRAW_FRAMEBUFFER]=G0;return!0}return!1}function I0(j,G0){let o=F,Y0=!1;if(j){if(o=D.get(G0),o===void 0)o=[],D.set(G0,o);let O0=j.textures;if(o.length!==O0.length||o[0]!==E.COLOR_ATTACHMENT0){for(let E0=0,q0=O0.length;E0<q0;E0++)o[E0]=E.COLOR_ATTACHMENT0+E0;o.length=O0.length,Y0=!0}}else if(o[0]!==E.BACK)o[0]=E.BACK,Y0=!0;if(Y0)E.drawBuffers(o)}function xE(j){if(w!==j)return E.useProgram(j),w=j,!0;return!1}let o0={[NW]:E.FUNC_ADD,[Q1]:E.FUNC_SUBTRACT,[$1]:E.FUNC_REVERSE_SUBTRACT};o0[Z1]=E.MIN,o0[K1]=E.MAX;let e0={[U1]:E.ZERO,[X1]:E.ONE,[G1]:E.SRC_COLOR,[M1]:E.SRC_ALPHA,[L1]:E.SRC_ALPHA_SATURATE,[N1]:E.DST_COLOR,[C1]:E.DST_ALPHA,[Y1]:E.ONE_MINUS_SRC_COLOR,[D1]:E.ONE_MINUS_SRC_ALPHA,[F1]:E.ONE_MINUS_DST_COLOR,[q1]:E.ONE_MINUS_DST_ALPHA,[O1]:E.CONSTANT_COLOR,[B1]:E.ONE_MINUS_CONSTANT_COLOR,[w1]:E.CONSTANT_ALPHA,[k1]:E.ONE_MINUS_CONSTANT_ALPHA};function UE(j,G0,o,Y0,O0,E0,q0,l0,LE,ZE){if(j===lH){if(C===!0)j0(E.BLEND),C=!1;return}if(C===!1)U0(E.BLEND),C=!0;if(j!==J1){if(j!==M||ZE!==c){if(T!==NW||V!==NW)E.blendEquation(E.FUNC_ADD),T=NW,V=NW;if(ZE)switch(j){case pW:E.blendFuncSeparate(E.ONE,E.ONE_MINUS_SRC_ALPHA,E.ONE,E.ONE_MINUS_SRC_ALPHA);break;case lW:E.blendFunc(E.ONE,E.ONE);break;case s6:E.blendFuncSeparate(E.ZERO,E.ONE_MINUS_SRC_COLOR,E.ZERO,E.ONE);break;case i6:E.blendFuncSeparate(E.DST_COLOR,E.ONE_MINUS_SRC_ALPHA,E.ZERO,E.ONE);break;default:g0("WebGLState: Invalid blending: ",j);break}else switch(j){case pW:E.blendFuncSeparate(E.SRC_ALPHA,E.ONE_MINUS_SRC_ALPHA,E.ONE,E.ONE_MINUS_SRC_ALPHA);break;case lW:E.blendFuncSeparate(E.SRC_ALPHA,E.ONE,E.ONE,E.ONE);break;case s6:g0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case i6:g0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:g0("WebGLState: Invalid blending: ",j);break}y=null,B=null,P=null,A=null,L.set(0,0,0),k=0,M=j,c=ZE}return}if(O0=O0||G0,E0=E0||o,q0=q0||Y0,G0!==T||O0!==V)E.blendEquationSeparate(o0[G0],o0[O0]),T=G0,V=O0;if(o!==y||Y0!==B||E0!==P||q0!==A)E.blendFuncSeparate(e0[o],e0[Y0],e0[E0],e0[q0]),y=o,B=Y0,P=E0,A=q0;if(l0.equals(L)===!1||LE!==k)E.blendColor(l0.r,l0.g,l0.b,LE),L.copy(l0),k=LE;M=j,c=!1}function EE(j,G0){j.side===GE?j0(E.CULL_FACE):U0(E.CULL_FACE);let o=j.side===UH;if(G0)o=!o;nE(o),j.blending===pW&&j.transparent===!1?UE(lH):UE(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),$.setFunc(j.depthFunc),$.setTest(j.depthTest),$.setMask(j.depthWrite),Q.setMask(j.colorWrite);let Y0=j.stencilWrite;if(Z.setTest(Y0),Y0)Z.setMask(j.stencilWriteMask),Z.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),Z.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass);gE(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?U0(E.SAMPLE_ALPHA_TO_COVERAGE):j0(E.SAMPLE_ALPHA_TO_COVERAGE)}function nE(j){if(h!==j){if(j)E.frontFace(E.CW);else E.frontFace(E.CCW);h=j}}function wE(j){if(j!==H1){if(U0(E.CULL_FACE),j!==v)if(j===n6)E.cullFace(E.BACK);else if(j===W1)E.cullFace(E.FRONT);else E.cullFace(E.FRONT_AND_BACK)}else j0(E.CULL_FACE);v=j}function JH(j){if(j!==d){if(p)E.lineWidth(j);d=j}}function gE(j,G0,o){if(j){if(U0(E.POLYGON_OFFSET_FILL),z!==G0||u!==o){if(z=G0,u=o,$.getReversed())G0=-G0;E.polygonOffset(G0,o)}}else j0(E.POLYGON_OFFSET_FILL)}function pE(j){if(j)U0(E.SCISSOR_TEST);else j0(E.SCISSOR_TEST)}function _(j){if(j===void 0)j=E.TEXTURE0+a-1;if(t!==j)E.activeTexture(j),t=j}function QH(j,G0,o){if(o===void 0)if(t===null)o=E.TEXTURE0+a-1;else o=t;let Y0=R0[o];if(Y0===void 0)Y0={type:void 0,texture:void 0},R0[o]=Y0;if(Y0.type!==j||Y0.texture!==G0){if(t!==o)E.activeTexture(o),t=o;E.bindTexture(j,G0||$0[j]),Y0.type=j,Y0.texture=G0}}function $E(){let j=R0[t];if(j!==void 0&&j.type!==void 0)E.bindTexture(j.type,null),j.type=void 0,j.texture=void 0}function zE(){try{E.compressedTexImage2D(...arguments)}catch(j){g0("WebGLState:",j)}}function O(){try{E.compressedTexImage3D(...arguments)}catch(j){g0("WebGLState:",j)}}function q(){try{E.texSubImage2D(...arguments)}catch(j){g0("WebGLState:",j)}}function I(){try{E.texSubImage3D(...arguments)}catch(j){g0("WebGLState:",j)}}function l(){try{E.compressedTexSubImage2D(...arguments)}catch(j){g0("WebGLState:",j)}}function H0(){try{E.compressedTexSubImage3D(...arguments)}catch(j){g0("WebGLState:",j)}}function X0(){try{E.texStorage2D(...arguments)}catch(j){g0("WebGLState:",j)}}function M0(){try{E.texStorage3D(...arguments)}catch(j){g0("WebGLState:",j)}}function n(){try{E.texImage2D(...arguments)}catch(j){g0("WebGLState:",j)}}function r(){try{E.texImage3D(...arguments)}catch(j){g0("WebGLState:",j)}}function L0(j){if(Y[j]!==void 0)return Y[j];else return E.getParameter(j)}function z0(j,G0){if(Y[j]!==G0)E.pixelStorei(j,G0),Y[j]=G0}function D0(j){if(YE.equals(j)===!1)E.scissor(j.x,j.y,j.z,j.w),YE.copy(j)}function Z0(j){if(u0.equals(j)===!1)E.viewport(j.x,j.y,j.z,j.w),u0.copy(j)}function _0(j,G0){let o=U.get(G0);if(o===void 0)o=new WeakMap,U.set(G0,o);let Y0=o.get(j);if(Y0===void 0)Y0=E.getUniformBlockIndex(G0,j.name),o.set(j,Y0)}function y0(j,G0){let Y0=U.get(G0).get(j);if(K.get(G0)!==Y0)E.uniformBlockBinding(G0,Y0,j.__bindingPointIndex),K.set(G0,Y0)}function QE(){E.disable(E.BLEND),E.disable(E.CULL_FACE),E.disable(E.DEPTH_TEST),E.disable(E.POLYGON_OFFSET_FILL),E.disable(E.SCISSOR_TEST),E.disable(E.STENCIL_TEST),E.disable(E.SAMPLE_ALPHA_TO_COVERAGE),E.blendEquation(E.FUNC_ADD),E.blendFunc(E.ONE,E.ZERO),E.blendFuncSeparate(E.ONE,E.ZERO,E.ONE,E.ZERO),E.blendColor(0,0,0,0),E.colorMask(!0,!0,!0,!0),E.clearColor(0,0,0,0),E.depthMask(!0),E.depthFunc(E.LESS),$.setReversed(!1),E.clearDepth(1),E.stencilMask(4294967295),E.stencilFunc(E.ALWAYS,0,4294967295),E.stencilOp(E.KEEP,E.KEEP,E.KEEP),E.clearStencil(0),E.cullFace(E.BACK),E.frontFace(E.CCW),E.polygonOffset(0,0),E.activeTexture(E.TEXTURE0),E.bindFramebuffer(E.FRAMEBUFFER,null),E.bindFramebuffer(E.DRAW_FRAMEBUFFER,null),E.bindFramebuffer(E.READ_FRAMEBUFFER,null),E.useProgram(null),E.lineWidth(1),E.scissor(0,0,E.canvas.width,E.canvas.height),E.viewport(0,0,E.canvas.width,E.canvas.height),E.pixelStorei(E.PACK_ALIGNMENT,4),E.pixelStorei(E.UNPACK_ALIGNMENT,4),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,!1),E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),E.pixelStorei(E.UNPACK_COLORSPACE_CONVERSION_WEBGL,E.BROWSER_DEFAULT_WEBGL),E.pixelStorei(E.PACK_ROW_LENGTH,0),E.pixelStorei(E.PACK_SKIP_PIXELS,0),E.pixelStorei(E.PACK_SKIP_ROWS,0),E.pixelStorei(E.UNPACK_ROW_LENGTH,0),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,0),E.pixelStorei(E.UNPACK_SKIP_PIXELS,0),E.pixelStorei(E.UNPACK_SKIP_ROWS,0),E.pixelStorei(E.UNPACK_SKIP_IMAGES,0),X={},Y={},t=null,R0={},G={},D=new WeakMap,F=[],w=null,C=!1,M=null,T=null,y=null,B=null,V=null,P=null,A=null,L=new e(0,0,0),k=0,c=!1,h=null,v=null,d=null,z=null,u=null,YE.set(0,0,E.canvas.width,E.canvas.height),u0.set(0,0,E.canvas.width,E.canvas.height),Q.reset(),$.reset(),Z.reset()}return{buffers:{color:Q,depth:$,stencil:Z},enable:U0,disable:j0,bindFramebuffer:f0,drawBuffers:I0,useProgram:xE,setBlending:UE,setMaterial:EE,setFlipSided:nE,setCullFace:wE,setLineWidth:JH,setPolygonOffset:gE,setScissorTest:pE,activeTexture:_,bindTexture:QH,unbindTexture:$E,compressedTexImage2D:zE,compressedTexImage3D:O,texImage2D:n,texImage3D:r,pixelStorei:z0,getParameter:L0,updateUBOMapping:_0,uniformBlockBinding:y0,texStorage2D:X0,texStorage3D:M0,texSubImage2D:q,texSubImage3D:I,compressedTexSubImage2D:l,compressedTexSubImage3D:H0,scissor:D0,viewport:Z0,reset:QE}}function $5(E,H,W,R,J,Q,$){let Z=H.has("WEBGL_multisampled_render_to_texture")?H.get("WEBGL_multisampled_render_to_texture"):null,K=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new m0,X=new WeakMap,Y=new Set,G,D=new WeakMap,F=!1;try{F=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(O){}function w(O,q){return F?new OffscreenCanvas(O,q):xW("canvas")}function C(O,q,I){let l=1,H0=zE(O);if(H0.width>I||H0.height>I)l=I/Math.max(H0.width,H0.height);if(l<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){let X0=Math.floor(l*H0.width),M0=Math.floor(l*H0.height);if(G===void 0)G=w(X0,M0);let n=q?w(X0,M0):G;return n.width=X0,n.height=M0,n.getContext("2d").drawImage(O,0,0,X0,M0),h0("WebGLRenderer: Texture has been resized from ("+H0.width+"x"+H0.height+") to ("+X0+"x"+M0+")."),n}else{if("data"in O)h0("WebGLRenderer: Image in DataTexture is too big ("+H0.width+"x"+H0.height+").");return O}return O}function M(O){return O.generateMipmaps}function T(O){E.generateMipmap(O)}function y(O){if(O.isWebGLCubeRenderTarget)return E.TEXTURE_CUBE_MAP;if(O.isWebGL3DRenderTarget)return E.TEXTURE_3D;if(O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture)return E.TEXTURE_2D_ARRAY;return E.TEXTURE_2D}function B(O,q,I,l,H0,X0=!1){if(O!==null){if(E[O]!==void 0)return E[O];h0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let M0;if(l){if(M0=H.get("EXT_texture_norm16"),!M0)h0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let n=q;if(q===E.RED){if(I===E.FLOAT)n=E.R32F;if(I===E.HALF_FLOAT)n=E.R16F;if(I===E.UNSIGNED_BYTE)n=E.R8;if(I===E.UNSIGNED_SHORT&&M0)n=M0.R16_EXT;if(I===E.SHORT&&M0)n=M0.R16_SNORM_EXT}if(q===E.RED_INTEGER){if(I===E.UNSIGNED_BYTE)n=E.R8UI;if(I===E.UNSIGNED_SHORT)n=E.R16UI;if(I===E.UNSIGNED_INT)n=E.R32UI;if(I===E.BYTE)n=E.R8I;if(I===E.SHORT)n=E.R16I;if(I===E.INT)n=E.R32I}if(q===E.RG){if(I===E.FLOAT)n=E.RG32F;if(I===E.HALF_FLOAT)n=E.RG16F;if(I===E.UNSIGNED_BYTE)n=E.RG8;if(I===E.UNSIGNED_SHORT&&M0)n=M0.RG16_EXT;if(I===E.SHORT&&M0)n=M0.RG16_SNORM_EXT}if(q===E.RG_INTEGER){if(I===E.UNSIGNED_BYTE)n=E.RG8UI;if(I===E.UNSIGNED_SHORT)n=E.RG16UI;if(I===E.UNSIGNED_INT)n=E.RG32UI;if(I===E.BYTE)n=E.RG8I;if(I===E.SHORT)n=E.RG16I;if(I===E.INT)n=E.RG32I}if(q===E.RGB_INTEGER){if(I===E.UNSIGNED_BYTE)n=E.RGB8UI;if(I===E.UNSIGNED_SHORT)n=E.RGB16UI;if(I===E.UNSIGNED_INT)n=E.RGB32UI;if(I===E.BYTE)n=E.RGB8I;if(I===E.SHORT)n=E.RGB16I;if(I===E.INT)n=E.RGB32I}if(q===E.RGBA_INTEGER){if(I===E.UNSIGNED_BYTE)n=E.RGBA8UI;if(I===E.UNSIGNED_SHORT)n=E.RGBA16UI;if(I===E.UNSIGNED_INT)n=E.RGBA32UI;if(I===E.BYTE)n=E.RGBA8I;if(I===E.SHORT)n=E.RGBA16I;if(I===E.INT)n=E.RGBA32I}if(q===E.RGB){if(I===E.UNSIGNED_SHORT&&M0)n=M0.RGB16_EXT;if(I===E.SHORT&&M0)n=M0.RGB16_SNORM_EXT;if(I===E.UNSIGNED_INT_5_9_9_9_REV)n=E.RGB9_E5;if(I===E.UNSIGNED_INT_10F_11F_11F_REV)n=E.R11F_G11F_B10F}if(q===E.RGBA){let r=X0?l9:a0.getTransfer(H0);if(I===E.FLOAT)n=E.RGBA32F;if(I===E.HALF_FLOAT)n=E.RGBA16F;if(I===E.UNSIGNED_BYTE)n=r===FE?E.SRGB8_ALPHA8:E.RGBA8;if(I===E.UNSIGNED_SHORT&&M0)n=M0.RGBA16_EXT;if(I===E.SHORT&&M0)n=M0.RGBA16_SNORM_EXT;if(I===E.UNSIGNED_SHORT_4_4_4_4)n=E.RGBA4;if(I===E.UNSIGNED_SHORT_5_5_5_1)n=E.RGB5_A1}if(n===E.R16F||n===E.R32F||n===E.RG16F||n===E.RG32F||n===E.RGBA16F||n===E.RGBA32F)H.get("EXT_color_buffer_float");return n}function V(O,q){let I;if(O){if(q===null||q===q8||q===LW)I=E.DEPTH24_STENCIL8;else if(q===E8)I=E.DEPTH32F_STENCIL8;else if(q===dW)I=E.DEPTH24_STENCIL8,h0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(q===null||q===q8||q===LW)I=E.DEPTH_COMPONENT24;else if(q===E8)I=E.DEPTH_COMPONENT32F;else if(q===dW)I=E.DEPTH_COMPONENT16;return I}function P(O,q){if(M(O)===!0||O.isFramebufferTexture&&O.minFilter!==C8&&O.minFilter!==_E)return Math.log2(Math.max(q.width,q.height))+1;else if(O.mipmaps!==void 0&&O.mipmaps.length>0)return O.mipmaps.length;else if(O.isCompressedTexture&&Array.isArray(O.image))return q.mipmaps.length;else return 1}function A(O){let q=O.target;if(q.removeEventListener("dispose",A),k(q),q.isVideoTexture)X.delete(q);if(q.isHTMLTexture)Y.delete(q)}function L(O){let q=O.target;q.removeEventListener("dispose",L),h(q)}function k(O){let q=R.get(O);if(q.__webglInit===void 0)return;let I=O.source,l=D.get(I);if(l){let H0=l[q.__cacheKey];if(H0.usedTimes--,H0.usedTimes===0)c(O);if(Object.keys(l).length===0)D.delete(I)}R.remove(O)}function c(O){let q=R.get(O);E.deleteTexture(q.__webglTexture);let I=O.source,l=D.get(I);delete l[q.__cacheKey],$.memory.textures--}function h(O){let q=R.get(O);if(O.depthTexture)O.depthTexture.dispose(),R.remove(O.depthTexture);if(O.isWebGLCubeRenderTarget)for(let l=0;l<6;l++){if(Array.isArray(q.__webglFramebuffer[l]))for(let H0=0;H0<q.__webglFramebuffer[l].length;H0++)E.deleteFramebuffer(q.__webglFramebuffer[l][H0]);else E.deleteFramebuffer(q.__webglFramebuffer[l]);if(q.__webglDepthbuffer)E.deleteRenderbuffer(q.__webglDepthbuffer[l])}else{if(Array.isArray(q.__webglFramebuffer))for(let l=0;l<q.__webglFramebuffer.length;l++)E.deleteFramebuffer(q.__webglFramebuffer[l]);else E.deleteFramebuffer(q.__webglFramebuffer);if(q.__webglDepthbuffer)E.deleteRenderbuffer(q.__webglDepthbuffer);if(q.__webglMultisampledFramebuffer)E.deleteFramebuffer(q.__webglMultisampledFramebuffer);if(q.__webglColorRenderbuffer){for(let l=0;l<q.__webglColorRenderbuffer.length;l++)if(q.__webglColorRenderbuffer[l])E.deleteRenderbuffer(q.__webglColorRenderbuffer[l])}if(q.__webglDepthRenderbuffer)E.deleteRenderbuffer(q.__webglDepthRenderbuffer)}let I=O.textures;for(let l=0,H0=I.length;l<H0;l++){let X0=R.get(I[l]);if(X0.__webglTexture)E.deleteTexture(X0.__webglTexture),$.memory.textures--;R.remove(I[l])}R.remove(O)}let v=0;function d(){v=0}function z(){return v}function u(O){v=O}function a(){let O=v;if(O>=J.maxTextures)h0("WebGLTextures: Trying to use "+(O+1)+" texture units while this GPU supports only "+J.maxTextures);return v+=1,O}function p(O){let q=[];return q.push(O.wrapS),q.push(O.wrapT),q.push(O.wrapR||0),q.push(O.magFilter),q.push(O.minFilter),q.push(O.anisotropy),q.push(O.internalFormat),q.push(O.format),q.push(O.type),q.push(O.generateMipmaps),q.push(O.premultiplyAlpha),q.push(O.flipY),q.push(O.unpackAlignment),q.push(O.colorSpace),q.join()}function J0(O,q){let I=R.get(O);if(O.isVideoTexture)QH(O);if(O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&I.__version!==O.version){let l=O.image;if(l===null)h0("WebGLRenderer: Texture marked for update but no image data found.");else if(l.complete===!1)h0("WebGLRenderer: Texture marked for update but image is incomplete");else{j0(I,O,q);return}}else if(O.isExternalTexture)I.__webglTexture=O.sourceTexture?O.sourceTexture:null;W.bindTexture(E.TEXTURE_2D,I.__webglTexture,E.TEXTURE0+q)}function s(O,q){let I=R.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&I.__version!==O.version){j0(I,O,q);return}else if(O.isExternalTexture)I.__webglTexture=O.sourceTexture?O.sourceTexture:null;W.bindTexture(E.TEXTURE_2D_ARRAY,I.__webglTexture,E.TEXTURE0+q)}function t(O,q){let I=R.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&I.__version!==O.version){j0(I,O,q);return}W.bindTexture(E.TEXTURE_3D,I.__webglTexture,E.TEXTURE0+q)}function R0(O,q){let I=R.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&I.__version!==O.version){f0(I,O,q);return}W.bindTexture(E.TEXTURE_CUBE_MAP,I.__webglTexture,E.TEXTURE0+q)}let S0={[h1]:E.REPEAT,[g7]:E.CLAMP_TO_EDGE,[v1]:E.MIRRORED_REPEAT},A0={[C8]:E.NEAREST,[f1]:E.NEAREST_MIPMAP_NEAREST,[uW]:E.NEAREST_MIPMAP_LINEAR,[_E]:E.LINEAR,[p7]:E.LINEAR_MIPMAP_NEAREST,[j8]:E.LINEAR_MIPMAP_LINEAR},YE={[c1]:E.NEVER,[a1]:E.ALWAYS,[n1]:E.LESS,[i7]:E.LEQUAL,[s1]:E.EQUAL,[o7]:E.GEQUAL,[i1]:E.GREATER,[o1]:E.NOTEQUAL};function u0(O,q){if(q.type===E8&&H.has("OES_texture_float_linear")===!1&&(q.magFilter===_E||q.magFilter===p7||q.magFilter===uW||q.magFilter===j8||q.minFilter===_E||q.minFilter===p7||q.minFilter===uW||q.minFilter===j8))h0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(E.texParameteri(O,E.TEXTURE_WRAP_S,S0[q.wrapS]),E.texParameteri(O,E.TEXTURE_WRAP_T,S0[q.wrapT]),O===E.TEXTURE_3D||O===E.TEXTURE_2D_ARRAY)E.texParameteri(O,E.TEXTURE_WRAP_R,S0[q.wrapR]);if(E.texParameteri(O,E.TEXTURE_MAG_FILTER,A0[q.magFilter]),E.texParameteri(O,E.TEXTURE_MIN_FILTER,A0[q.minFilter]),q.compareFunction)E.texParameteri(O,E.TEXTURE_COMPARE_MODE,E.COMPARE_REF_TO_TEXTURE),E.texParameteri(O,E.TEXTURE_COMPARE_FUNC,YE[q.compareFunction]);if(H.has("EXT_texture_filter_anisotropic")===!0){if(q.magFilter===C8)return;if(q.minFilter!==uW&&q.minFilter!==j8)return;if(q.type===E8&&H.has("OES_texture_float_linear")===!1)return;if(q.anisotropy>1||R.get(q).__currentAnisotropy){let I=H.get("EXT_texture_filter_anisotropic");E.texParameterf(O,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(q.anisotropy,J.getMaxAnisotropy())),R.get(q).__currentAnisotropy=q.anisotropy}}}function i(O,q){let I=!1;if(O.__webglInit===void 0)O.__webglInit=!0,q.addEventListener("dispose",A);let l=q.source,H0=D.get(l);if(H0===void 0)H0={},D.set(l,H0);let X0=p(q);if(X0!==O.__cacheKey){if(H0[X0]===void 0)H0[X0]={texture:E.createTexture(),usedTimes:0},$.memory.textures++,I=!0;H0[X0].usedTimes++;let M0=H0[O.__cacheKey];if(M0!==void 0){if(H0[O.__cacheKey].usedTimes--,M0.usedTimes===0)c(q)}O.__cacheKey=X0,O.__webglTexture=H0[X0].texture}return I}function $0(O,q,I){return Math.floor(Math.floor(O/I)/q)}function U0(O,q,I,l){let X0=O.updateRanges;if(X0.length===0)W.texSubImage2D(E.TEXTURE_2D,0,0,0,q.width,q.height,I,l,q.data);else{X0.sort((z0,D0)=>z0.start-D0.start);let M0=0;for(let z0=1;z0<X0.length;z0++){let D0=X0[M0],Z0=X0[z0],_0=D0.start+D0.count,y0=$0(Z0.start,q.width,4),QE=$0(D0.start,q.width,4);if(Z0.start<=_0+1&&y0===QE&&$0(Z0.start+Z0.count-1,q.width,4)===y0)D0.count=Math.max(D0.count,Z0.start+Z0.count-D0.start);else++M0,X0[M0]=Z0}X0.length=M0+1;let n=W.getParameter(E.UNPACK_ROW_LENGTH),r=W.getParameter(E.UNPACK_SKIP_PIXELS),L0=W.getParameter(E.UNPACK_SKIP_ROWS);W.pixelStorei(E.UNPACK_ROW_LENGTH,q.width);for(let z0=0,D0=X0.length;z0<D0;z0++){let Z0=X0[z0],_0=Math.floor(Z0.start/4),y0=Math.ceil(Z0.count/4),QE=_0%q.width,j=Math.floor(_0/q.width),G0=y0,o=1;W.pixelStorei(E.UNPACK_SKIP_PIXELS,QE),W.pixelStorei(E.UNPACK_SKIP_ROWS,j),W.texSubImage2D(E.TEXTURE_2D,0,QE,j,G0,1,I,l,q.data)}O.clearUpdateRanges(),W.pixelStorei(E.UNPACK_ROW_LENGTH,n),W.pixelStorei(E.UNPACK_SKIP_PIXELS,r),W.pixelStorei(E.UNPACK_SKIP_ROWS,L0)}}function j0(O,q,I){let l=E.TEXTURE_2D;if(q.isDataArrayTexture||q.isCompressedArrayTexture)l=E.TEXTURE_2D_ARRAY;if(q.isData3DTexture)l=E.TEXTURE_3D;let H0=i(O,q),X0=q.source;W.bindTexture(l,O.__webglTexture,E.TEXTURE0+I);let M0=R.get(X0);if(X0.version!==M0.__version||H0===!0){if(W.activeTexture(E.TEXTURE0+I),(typeof ImageBitmap<"u"&&q.image instanceof ImageBitmap)===!1){let o=a0.getPrimaries(a0.workingColorSpace),Y0=q.colorSpace===f8?null:a0.getPrimaries(q.colorSpace),O0=q.colorSpace===f8||o===Y0?E.NONE:E.BROWSER_DEFAULT_WEBGL;W.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,q.flipY),W.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),W.pixelStorei(E.UNPACK_COLORSPACE_CONVERSION_WEBGL,O0)}W.pixelStorei(E.UNPACK_ALIGNMENT,q.unpackAlignment);let r=C(q.image,!1,J.maxTextureSize);r=$E(q,r);let L0=Q.convert(q.format,q.colorSpace),z0=Q.convert(q.type),D0=B(q.internalFormat,L0,z0,q.normalized,q.colorSpace,q.isVideoTexture);u0(l,q);let Z0,_0=q.mipmaps,y0=q.isVideoTexture!==!0,QE=M0.__version===void 0||H0===!0,j=X0.dataReady,G0=P(q,r);if(q.isDepthTexture){if(D0=V(q.format===h8,q.type),QE)if(y0)W.texStorage2D(E.TEXTURE_2D,1,D0,r.width,r.height);else W.texImage2D(E.TEXTURE_2D,0,D0,r.width,r.height,0,L0,z0,null)}else if(q.isDataTexture)if(_0.length>0){if(y0&&QE)W.texStorage2D(E.TEXTURE_2D,G0,D0,_0[0].width,_0[0].height);for(let o=0,Y0=_0.length;o<Y0;o++)if(Z0=_0[o],y0){if(j)W.texSubImage2D(E.TEXTURE_2D,o,0,0,Z0.width,Z0.height,L0,z0,Z0.data)}else W.texImage2D(E.TEXTURE_2D,o,D0,Z0.width,Z0.height,0,L0,z0,Z0.data);q.generateMipmaps=!1}else if(y0){if(QE)W.texStorage2D(E.TEXTURE_2D,G0,D0,r.width,r.height);if(j)U0(q,r,L0,z0)}else W.texImage2D(E.TEXTURE_2D,0,D0,r.width,r.height,0,L0,z0,r.data);else if(q.isCompressedTexture)if(q.isCompressedArrayTexture){if(y0&&QE)W.texStorage3D(E.TEXTURE_2D_ARRAY,G0,D0,_0[0].width,_0[0].height,r.depth);for(let o=0,Y0=_0.length;o<Y0;o++)if(Z0=_0[o],q.format!==kH)if(L0!==null)if(y0){if(j)if(q.layerUpdates.size>0){let O0=qR(Z0.width,Z0.height,q.format,q.type);for(let E0 of q.layerUpdates){let q0=Z0.data.subarray(E0*O0/Z0.data.BYTES_PER_ELEMENT,(E0+1)*O0/Z0.data.BYTES_PER_ELEMENT);W.compressedTexSubImage3D(E.TEXTURE_2D_ARRAY,o,0,0,E0,Z0.width,Z0.height,1,L0,q0)}}else W.compressedTexSubImage3D(E.TEXTURE_2D_ARRAY,o,0,0,0,Z0.width,Z0.height,r.depth,L0,Z0.data)}else W.compressedTexImage3D(E.TEXTURE_2D_ARRAY,o,D0,Z0.width,Z0.height,r.depth,0,Z0.data,0,0);else h0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(y0){if(j)W.texSubImage3D(E.TEXTURE_2D_ARRAY,o,0,0,0,Z0.width,Z0.height,r.depth,L0,z0,Z0.data)}else W.texImage3D(E.TEXTURE_2D_ARRAY,o,D0,Z0.width,Z0.height,r.depth,0,L0,z0,Z0.data);if(q.layerUpdates.size>0)q.clearLayerUpdates()}else{if(y0&&QE)W.texStorage2D(E.TEXTURE_2D,G0,D0,_0[0].width,_0[0].height);for(let o=0,Y0=_0.length;o<Y0;o++)if(Z0=_0[o],q.format!==kH)if(L0!==null)if(y0){if(j)W.compressedTexSubImage2D(E.TEXTURE_2D,o,0,0,Z0.width,Z0.height,L0,Z0.data)}else W.compressedTexImage2D(E.TEXTURE_2D,o,D0,Z0.width,Z0.height,0,Z0.data);else h0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(y0){if(j)W.texSubImage2D(E.TEXTURE_2D,o,0,0,Z0.width,Z0.height,L0,z0,Z0.data)}else W.texImage2D(E.TEXTURE_2D,o,D0,Z0.width,Z0.height,0,L0,z0,Z0.data)}else if(q.isDataArrayTexture)if(y0){if(QE)W.texStorage3D(E.TEXTURE_2D_ARRAY,G0,D0,r.width,r.height,r.depth);if(j)if(q.layerUpdates.size>0){let o=qR(r.width,r.height,q.format,q.type);for(let Y0 of q.layerUpdates){let O0=r.data.subarray(Y0*o/r.data.BYTES_PER_ELEMENT,(Y0+1)*o/r.data.BYTES_PER_ELEMENT);W.texSubImage3D(E.TEXTURE_2D_ARRAY,0,0,0,Y0,r.width,r.height,1,L0,z0,O0)}q.clearLayerUpdates()}else W.texSubImage3D(E.TEXTURE_2D_ARRAY,0,0,0,0,r.width,r.height,r.depth,L0,z0,r.data)}else W.texImage3D(E.TEXTURE_2D_ARRAY,0,D0,r.width,r.height,r.depth,0,L0,z0,r.data);else if(q.isData3DTexture)if(y0){if(QE)W.texStorage3D(E.TEXTURE_3D,G0,D0,r.width,r.height,r.depth);if(j)W.texSubImage3D(E.TEXTURE_3D,0,0,0,0,r.width,r.height,r.depth,L0,z0,r.data)}else W.texImage3D(E.TEXTURE_3D,0,D0,r.width,r.height,r.depth,0,L0,z0,r.data);else if(q.isFramebufferTexture){if(QE)if(y0)W.texStorage2D(E.TEXTURE_2D,G0,D0,r.width,r.height);else{let{width:o,height:Y0}=r;for(let O0=0;O0<G0;O0++)W.texImage2D(E.TEXTURE_2D,O0,D0,o,Y0,0,L0,z0,null),o>>=1,Y0>>=1}}else if(q.isHTMLTexture){if("texElementImage2D"in E){let o=E.canvas;if(!o.hasAttribute("layoutsubtree"))o.setAttribute("layoutsubtree","true");if(r.parentNode!==o){o.appendChild(r),Y.add(q),o.onpaint=(Y0)=>{let O0=Y0.changedElements;for(let E0 of Y)if(O0.includes(E0.image))E0.needsUpdate=!0},o.requestPaint();return}if(E.texElementImage2D.length===3)E.texElementImage2D(E.TEXTURE_2D,E.RGBA8,r);else{let{RGBA:O0,RGBA:E0,UNSIGNED_BYTE:q0}=E;E.texElementImage2D(E.TEXTURE_2D,0,O0,E0,q0,r)}E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MIN_FILTER,E.LINEAR),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_S,E.CLAMP_TO_EDGE),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_T,E.CLAMP_TO_EDGE)}}else if(_0.length>0){if(y0&&QE){let o=zE(_0[0]);W.texStorage2D(E.TEXTURE_2D,G0,D0,o.width,o.height)}for(let o=0,Y0=_0.length;o<Y0;o++)if(Z0=_0[o],y0){if(j)W.texSubImage2D(E.TEXTURE_2D,o,0,0,L0,z0,Z0)}else W.texImage2D(E.TEXTURE_2D,o,D0,L0,z0,Z0);q.generateMipmaps=!1}else if(y0){if(QE){let o=zE(r);W.texStorage2D(E.TEXTURE_2D,G0,D0,o.width,o.height)}if(j)W.texSubImage2D(E.TEXTURE_2D,0,0,0,L0,z0,r)}else W.texImage2D(E.TEXTURE_2D,0,D0,L0,z0,r);if(M(q))T(l);if(M0.__version=X0.version,q.onUpdate)q.onUpdate(q)}O.__version=q.version}function f0(O,q,I){if(q.image.length!==6)return;let l=i(O,q),H0=q.source;W.bindTexture(E.TEXTURE_CUBE_MAP,O.__webglTexture,E.TEXTURE0+I);let X0=R.get(H0);if(H0.version!==X0.__version||l===!0){W.activeTexture(E.TEXTURE0+I);let M0=a0.getPrimaries(a0.workingColorSpace),n=q.colorSpace===f8?null:a0.getPrimaries(q.colorSpace),r=q.colorSpace===f8||M0===n?E.NONE:E.BROWSER_DEFAULT_WEBGL;W.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,q.flipY),W.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),W.pixelStorei(E.UNPACK_ALIGNMENT,q.unpackAlignment),W.pixelStorei(E.UNPACK_COLORSPACE_CONVERSION_WEBGL,r);let L0=q.isCompressedTexture||q.image[0].isCompressedTexture,z0=q.image[0]&&q.image[0].isDataTexture,D0=[];for(let E0=0;E0<6;E0++){if(!L0&&!z0)D0[E0]=C(q.image[E0],!0,J.maxCubemapSize);else D0[E0]=z0?q.image[E0].image:q.image[E0];D0[E0]=$E(q,D0[E0])}let Z0=D0[0],_0=Q.convert(q.format,q.colorSpace),y0=Q.convert(q.type),QE=B(q.internalFormat,_0,y0,q.normalized,q.colorSpace),j=q.isVideoTexture!==!0,G0=X0.__version===void 0||l===!0,o=H0.dataReady,Y0=P(q,Z0);u0(E.TEXTURE_CUBE_MAP,q);let O0;if(L0){if(j&&G0)W.texStorage2D(E.TEXTURE_CUBE_MAP,Y0,QE,Z0.width,Z0.height);for(let E0=0;E0<6;E0++){O0=D0[E0].mipmaps;for(let q0=0;q0<O0.length;q0++){let l0=O0[q0];if(q.format!==kH)if(_0!==null)if(j){if(o)W.compressedTexSubImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,q0,0,0,l0.width,l0.height,_0,l0.data)}else W.compressedTexImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,q0,QE,l0.width,l0.height,0,l0.data);else h0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(j){if(o)W.texSubImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,q0,0,0,l0.width,l0.height,_0,y0,l0.data)}else W.texImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,q0,QE,l0.width,l0.height,0,_0,y0,l0.data)}}}else{if(O0=q.mipmaps,j&&G0){if(O0.length>0)Y0++;let E0=zE(D0[0]);W.texStorage2D(E.TEXTURE_CUBE_MAP,Y0,QE,E0.width,E0.height)}for(let E0=0;E0<6;E0++)if(z0){if(j){if(o)W.texSubImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,0,0,0,D0[E0].width,D0[E0].height,_0,y0,D0[E0].data)}else W.texImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,0,QE,D0[E0].width,D0[E0].height,0,_0,y0,D0[E0].data);for(let q0=0;q0<O0.length;q0++){let LE=O0[q0].image[E0].image;if(j){if(o)W.texSubImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,q0+1,0,0,LE.width,LE.height,_0,y0,LE.data)}else W.texImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,q0+1,QE,LE.width,LE.height,0,_0,y0,LE.data)}}else{if(j){if(o)W.texSubImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,0,0,0,_0,y0,D0[E0])}else W.texImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,0,QE,_0,y0,D0[E0]);for(let q0=0;q0<O0.length;q0++){let l0=O0[q0];if(j){if(o)W.texSubImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,q0+1,0,0,_0,y0,l0.image[E0])}else W.texImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+E0,q0+1,QE,_0,y0,l0.image[E0])}}}if(M(q))T(E.TEXTURE_CUBE_MAP);if(X0.__version=H0.version,q.onUpdate)q.onUpdate(q)}O.__version=q.version}function I0(O,q,I,l,H0,X0){let M0=Q.convert(I.format,I.colorSpace),n=Q.convert(I.type),r=B(I.internalFormat,M0,n,I.normalized,I.colorSpace),L0=R.get(q),z0=R.get(I);if(z0.__renderTarget=q,!L0.__hasExternalTextures){let D0=Math.max(1,q.width>>X0),Z0=Math.max(1,q.height>>X0);if(H0===E.TEXTURE_3D||H0===E.TEXTURE_2D_ARRAY)W.texImage3D(H0,X0,r,D0,Z0,q.depth,0,M0,n,null);else W.texImage2D(H0,X0,r,D0,Z0,0,M0,n,null)}if(W.bindFramebuffer(E.FRAMEBUFFER,O),_(q))Z.framebufferTexture2DMultisampleEXT(E.FRAMEBUFFER,l,H0,z0.__webglTexture,0,pE(q));else if(H0===E.TEXTURE_2D||H0>=E.TEXTURE_CUBE_MAP_POSITIVE_X&&H0<=E.TEXTURE_CUBE_MAP_NEGATIVE_Z)E.framebufferTexture2D(E.FRAMEBUFFER,l,H0,z0.__webglTexture,X0);W.bindFramebuffer(E.FRAMEBUFFER,null)}function xE(O,q,I){if(E.bindRenderbuffer(E.RENDERBUFFER,O),q.depthBuffer){let l=q.depthTexture,H0=l&&l.isDepthTexture?l.type:null,X0=V(q.stencilBuffer,H0),M0=q.stencilBuffer?E.DEPTH_STENCIL_ATTACHMENT:E.DEPTH_ATTACHMENT;if(_(q))Z.renderbufferStorageMultisampleEXT(E.RENDERBUFFER,pE(q),X0,q.width,q.height);else if(I)E.renderbufferStorageMultisample(E.RENDERBUFFER,pE(q),X0,q.width,q.height);else E.renderbufferStorage(E.RENDERBUFFER,X0,q.width,q.height);E.framebufferRenderbuffer(E.FRAMEBUFFER,M0,E.RENDERBUFFER,O)}else{let l=q.textures;for(let H0=0;H0<l.length;H0++){let X0=l[H0],M0=Q.convert(X0.format,X0.colorSpace),n=Q.convert(X0.type),r=B(X0.internalFormat,M0,n,X0.normalized,X0.colorSpace);if(_(q))Z.renderbufferStorageMultisampleEXT(E.RENDERBUFFER,pE(q),r,q.width,q.height);else if(I)E.renderbufferStorageMultisample(E.RENDERBUFFER,pE(q),r,q.width,q.height);else E.renderbufferStorage(E.RENDERBUFFER,r,q.width,q.height)}}E.bindRenderbuffer(E.RENDERBUFFER,null)}function o0(O,q,I){let l=q.isWebGLCubeRenderTarget===!0;if(W.bindFramebuffer(E.FRAMEBUFFER,O),!(q.depthTexture&&q.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let H0=R.get(q.depthTexture);if(H0.__renderTarget=q,!H0.__webglTexture||q.depthTexture.image.width!==q.width||q.depthTexture.image.height!==q.height)q.depthTexture.image.width=q.width,q.depthTexture.image.height=q.height,q.depthTexture.needsUpdate=!0;if(l){if(H0.__webglInit===void 0)H0.__webglInit=!0,q.depthTexture.addEventListener("dispose",A);if(H0.__webglTexture===void 0){H0.__webglTexture=E.createTexture(),W.bindTexture(E.TEXTURE_CUBE_MAP,H0.__webglTexture),u0(E.TEXTURE_CUBE_MAP,q.depthTexture);let L0=Q.convert(q.depthTexture.format),z0=Q.convert(q.depthTexture.type),D0;if(q.depthTexture.format===y8)D0=E.DEPTH_COMPONENT24;else if(q.depthTexture.format===h8)D0=E.DEPTH24_STENCIL8;for(let Z0=0;Z0<6;Z0++)E.texImage2D(E.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,0,D0,q.width,q.height,0,L0,z0,null)}}else J0(q.depthTexture,0);let X0=H0.__webglTexture,M0=pE(q),n=l?E.TEXTURE_CUBE_MAP_POSITIVE_X+I:E.TEXTURE_2D,r=q.depthTexture.format===h8?E.DEPTH_STENCIL_ATTACHMENT:E.DEPTH_ATTACHMENT;if(q.depthTexture.format===y8)if(_(q))Z.framebufferTexture2DMultisampleEXT(E.FRAMEBUFFER,r,n,X0,0,M0);else E.framebufferTexture2D(E.FRAMEBUFFER,r,n,X0,0);else if(q.depthTexture.format===h8)if(_(q))Z.framebufferTexture2DMultisampleEXT(E.FRAMEBUFFER,r,n,X0,0,M0);else E.framebufferTexture2D(E.FRAMEBUFFER,r,n,X0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function e0(O){let q=R.get(O),I=O.isWebGLCubeRenderTarget===!0;if(q.__boundDepthTexture!==O.depthTexture){let l=O.depthTexture;if(q.__depthDisposeCallback)q.__depthDisposeCallback();if(l){let H0=()=>{delete q.__boundDepthTexture,delete q.__depthDisposeCallback,l.removeEventListener("dispose",H0)};l.addEventListener("dispose",H0),q.__depthDisposeCallback=H0}q.__boundDepthTexture=l}if(O.depthTexture&&!q.__autoAllocateDepthBuffer)if(I)for(let l=0;l<6;l++)o0(q.__webglFramebuffer[l],O,l);else{let l=O.texture.mipmaps;if(l&&l.length>0)o0(q.__webglFramebuffer[0],O,0);else o0(q.__webglFramebuffer,O,0)}else if(I){q.__webglDepthbuffer=[];for(let l=0;l<6;l++)if(W.bindFramebuffer(E.FRAMEBUFFER,q.__webglFramebuffer[l]),q.__webglDepthbuffer[l]===void 0)q.__webglDepthbuffer[l]=E.createRenderbuffer(),xE(q.__webglDepthbuffer[l],O,!1);else{let H0=O.stencilBuffer?E.DEPTH_STENCIL_ATTACHMENT:E.DEPTH_ATTACHMENT,X0=q.__webglDepthbuffer[l];E.bindRenderbuffer(E.RENDERBUFFER,X0),E.framebufferRenderbuffer(E.FRAMEBUFFER,H0,E.RENDERBUFFER,X0)}}else{let l=O.texture.mipmaps;if(l&&l.length>0)W.bindFramebuffer(E.FRAMEBUFFER,q.__webglFramebuffer[0]);else W.bindFramebuffer(E.FRAMEBUFFER,q.__webglFramebuffer);if(q.__webglDepthbuffer===void 0)q.__webglDepthbuffer=E.createRenderbuffer(),xE(q.__webglDepthbuffer,O,!1);else{let H0=O.stencilBuffer?E.DEPTH_STENCIL_ATTACHMENT:E.DEPTH_ATTACHMENT,X0=q.__webglDepthbuffer;E.bindRenderbuffer(E.RENDERBUFFER,X0),E.framebufferRenderbuffer(E.FRAMEBUFFER,H0,E.RENDERBUFFER,X0)}}W.bindFramebuffer(E.FRAMEBUFFER,null)}function UE(O,q,I){let l=R.get(O);if(q!==void 0)I0(l.__webglFramebuffer,O,O.texture,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,0);if(I!==void 0)e0(O)}function EE(O){let q=O.texture,I=R.get(O),l=R.get(q);O.addEventListener("dispose",L);let H0=O.textures,X0=O.isWebGLCubeRenderTarget===!0,M0=H0.length>1;if(!M0){if(l.__webglTexture===void 0)l.__webglTexture=E.createTexture();l.__version=q.version,$.memory.textures++}if(X0){I.__webglFramebuffer=[];for(let n=0;n<6;n++)if(q.mipmaps&&q.mipmaps.length>0){I.__webglFramebuffer[n]=[];for(let r=0;r<q.mipmaps.length;r++)I.__webglFramebuffer[n][r]=E.createFramebuffer()}else I.__webglFramebuffer[n]=E.createFramebuffer()}else{if(q.mipmaps&&q.mipmaps.length>0){I.__webglFramebuffer=[];for(let n=0;n<q.mipmaps.length;n++)I.__webglFramebuffer[n]=E.createFramebuffer()}else I.__webglFramebuffer=E.createFramebuffer();if(M0)for(let n=0,r=H0.length;n<r;n++){let L0=R.get(H0[n]);if(L0.__webglTexture===void 0)L0.__webglTexture=E.createTexture(),$.memory.textures++}if(O.samples>0&&_(O)===!1){I.__webglMultisampledFramebuffer=E.createFramebuffer(),I.__webglColorRenderbuffer=[],W.bindFramebuffer(E.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let n=0;n<H0.length;n++){let r=H0[n];I.__webglColorRenderbuffer[n]=E.createRenderbuffer(),E.bindRenderbuffer(E.RENDERBUFFER,I.__webglColorRenderbuffer[n]);let L0=Q.convert(r.format,r.colorSpace),z0=Q.convert(r.type),D0=B(r.internalFormat,L0,z0,r.normalized,r.colorSpace,O.isXRRenderTarget===!0),Z0=pE(O);E.renderbufferStorageMultisample(E.RENDERBUFFER,Z0,D0,O.width,O.height),E.framebufferRenderbuffer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0+n,E.RENDERBUFFER,I.__webglColorRenderbuffer[n])}if(E.bindRenderbuffer(E.RENDERBUFFER,null),O.depthBuffer)I.__webglDepthRenderbuffer=E.createRenderbuffer(),xE(I.__webglDepthRenderbuffer,O,!0);W.bindFramebuffer(E.FRAMEBUFFER,null)}}if(X0){W.bindTexture(E.TEXTURE_CUBE_MAP,l.__webglTexture),u0(E.TEXTURE_CUBE_MAP,q);for(let n=0;n<6;n++)if(q.mipmaps&&q.mipmaps.length>0)for(let r=0;r<q.mipmaps.length;r++)I0(I.__webglFramebuffer[n][r],O,q,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else I0(I.__webglFramebuffer[n],O,q,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);if(M(q))T(E.TEXTURE_CUBE_MAP);W.unbindTexture()}else if(M0){for(let n=0,r=H0.length;n<r;n++){let L0=H0[n],z0=R.get(L0),D0=E.TEXTURE_2D;if(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)D0=O.isWebGL3DRenderTarget?E.TEXTURE_3D:E.TEXTURE_2D_ARRAY;if(W.bindTexture(D0,z0.__webglTexture),u0(D0,L0),I0(I.__webglFramebuffer,O,L0,E.COLOR_ATTACHMENT0+n,D0,0),M(L0))T(D0)}W.unbindTexture()}else{let n=E.TEXTURE_2D;if(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)n=O.isWebGL3DRenderTarget?E.TEXTURE_3D:E.TEXTURE_2D_ARRAY;if(W.bindTexture(n,l.__webglTexture),u0(n,q),q.mipmaps&&q.mipmaps.length>0)for(let r=0;r<q.mipmaps.length;r++)I0(I.__webglFramebuffer[r],O,q,E.COLOR_ATTACHMENT0,n,r);else I0(I.__webglFramebuffer,O,q,E.COLOR_ATTACHMENT0,n,0);if(M(q))T(n);W.unbindTexture()}if(O.depthBuffer)e0(O)}function nE(O){let q=O.textures;for(let I=0,l=q.length;I<l;I++){let H0=q[I];if(M(H0)){let X0=y(O),M0=R.get(H0).__webglTexture;W.bindTexture(X0,M0),T(X0),W.unbindTexture()}}}let wE=[],JH=[];function gE(O){if(O.samples>0){if(_(O)===!1){let{textures:q,width:I,height:l}=O,H0=E.COLOR_BUFFER_BIT,X0=O.stencilBuffer?E.DEPTH_STENCIL_ATTACHMENT:E.DEPTH_ATTACHMENT,M0=R.get(O),n=q.length>1;if(n)for(let L0=0;L0<q.length;L0++)W.bindFramebuffer(E.FRAMEBUFFER,M0.__webglMultisampledFramebuffer),E.framebufferRenderbuffer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0+L0,E.RENDERBUFFER,null),W.bindFramebuffer(E.FRAMEBUFFER,M0.__webglFramebuffer),E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0+L0,E.TEXTURE_2D,null,0);W.bindFramebuffer(E.READ_FRAMEBUFFER,M0.__webglMultisampledFramebuffer);let r=O.texture.mipmaps;if(r&&r.length>0)W.bindFramebuffer(E.DRAW_FRAMEBUFFER,M0.__webglFramebuffer[0]);else W.bindFramebuffer(E.DRAW_FRAMEBUFFER,M0.__webglFramebuffer);for(let L0=0;L0<q.length;L0++){if(O.resolveDepthBuffer){if(O.depthBuffer)H0|=E.DEPTH_BUFFER_BIT;if(O.stencilBuffer&&O.resolveStencilBuffer)H0|=E.STENCIL_BUFFER_BIT}if(n){E.framebufferRenderbuffer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.RENDERBUFFER,M0.__webglColorRenderbuffer[L0]);let z0=R.get(q[L0]).__webglTexture;E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,z0,0)}if(E.blitFramebuffer(0,0,I,l,0,0,I,l,H0,E.NEAREST),K===!0){if(wE.length=0,JH.length=0,wE.push(E.COLOR_ATTACHMENT0+L0),O.depthBuffer&&O.storeMultisampledDepthBuffer===!1)wE.push(X0),JH.push(X0),E.invalidateFramebuffer(E.DRAW_FRAMEBUFFER,JH);E.invalidateFramebuffer(E.READ_FRAMEBUFFER,wE)}}if(W.bindFramebuffer(E.READ_FRAMEBUFFER,null),W.bindFramebuffer(E.DRAW_FRAMEBUFFER,null),n)for(let L0=0;L0<q.length;L0++){W.bindFramebuffer(E.FRAMEBUFFER,M0.__webglMultisampledFramebuffer),E.framebufferRenderbuffer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0+L0,E.RENDERBUFFER,M0.__webglColorRenderbuffer[L0]);let z0=R.get(q[L0]).__webglTexture;W.bindFramebuffer(E.FRAMEBUFFER,M0.__webglFramebuffer),E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0+L0,E.TEXTURE_2D,z0,0)}W.bindFramebuffer(E.DRAW_FRAMEBUFFER,M0.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.storeMultisampledDepthBuffer===!1&&K){let q=O.stencilBuffer?E.DEPTH_STENCIL_ATTACHMENT:E.DEPTH_ATTACHMENT;E.invalidateFramebuffer(E.DRAW_FRAMEBUFFER,[q])}}}function pE(O){return Math.min(J.maxSamples,O.samples)}function _(O){let q=R.get(O);return O.samples>0&&H.has("WEBGL_multisampled_render_to_texture")===!0&&q.__useRenderToTexture!==!1}function QH(O){let q=$.render.frame;if(X.get(O)!==q)X.set(O,q),O.update()}function $E(O,q){let{colorSpace:I,format:l,type:H0}=O;if(O.isCompressedTexture===!0||O.isVideoTexture===!0)return q;if(I!==p9&&I!==f8)if(a0.getTransfer(I)===FE){if(l!==kH||H0!==yH)h0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else g0("WebGLTextures: Unsupported texture color space:",I);return q}function zE(O){if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement)U.width=O.naturalWidth||O.width,U.height=O.naturalHeight||O.height;else if(typeof VideoFrame<"u"&&O instanceof VideoFrame)U.width=O.displayWidth,U.height=O.displayHeight;else U.width=O.width,U.height=O.height;return U}this.allocateTextureUnit=a,this.resetTextureUnits=d,this.getTextureUnits=z,this.setTextureUnits=u,this.setTexture2D=J0,this.setTexture2DArray=s,this.setTexture3D=t,this.setTextureCube=R0,this.rebindTextures=UE,this.setupRenderTarget=EE,this.updateRenderTargetMipmap=nE,this.updateMultisampleRenderTarget=gE,this.setupDepthRenderbuffer=e0,this.setupFrameBufferTexture=I0,this.useMultisampledRTT=_,this.isReversedDepthBuffer=function(){return W.buffers.depth.getReversed()}}function Z5(E,H){function W(R,J=f8){let Q,$=a0.getTransfer(J);if(R===yH)return E.UNSIGNED_BYTE;if(R===J9)return E.UNSIGNED_SHORT_4_4_4_4;if(R===Q9)return E.UNSIGNED_SHORT_5_5_5_1;if(R===g1)return E.UNSIGNED_INT_5_9_9_9_REV;if(R===p1)return E.UNSIGNED_INT_10F_11F_11F_REV;if(R===b1)return E.BYTE;if(R===x1)return E.SHORT;if(R===dW)return E.UNSIGNED_SHORT;if(R===R9)return E.INT;if(R===q8)return E.UNSIGNED_INT;if(R===E8)return E.FLOAT;if(R===wH)return E.HALF_FLOAT;if(R===l1)return E.ALPHA;if(R===m1)return E.RGB;if(R===kH)return E.RGBA;if(R===y8)return E.DEPTH_COMPONENT;if(R===h8)return E.DEPTH_STENCIL;if(R===u1)return E.RED;if(R===$9)return E.RED_INTEGER;if(R===v8)return E.RG;if(R===Z9)return E.RG_INTEGER;if(R===K9)return E.RGBA_INTEGER;if(R===l7||R===m7||R===u7||R===d7)if($===FE)if(Q=H.get("WEBGL_compressed_texture_s3tc_srgb"),Q!==null){if(R===l7)return Q.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(R===m7)return Q.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(R===u7)return Q.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(R===d7)return Q.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(Q=H.get("WEBGL_compressed_texture_s3tc"),Q!==null){if(R===l7)return Q.COMPRESSED_RGB_S3TC_DXT1_EXT;if(R===m7)return Q.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(R===u7)return Q.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(R===d7)return Q.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(R===U9||R===X9||R===G9||R===Y9)if(Q=H.get("WEBGL_compressed_texture_pvrtc"),Q!==null){if(R===U9)return Q.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(R===X9)return Q.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(R===G9)return Q.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(R===Y9)return Q.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(R===M9||R===D9||R===C9||R===q9||R===N9||R===c7||R===F9)if(Q=H.get("WEBGL_compressed_texture_etc"),Q!==null){if(R===M9||R===D9)return $===FE?Q.COMPRESSED_SRGB8_ETC2:Q.COMPRESSED_RGB8_ETC2;if(R===C9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:Q.COMPRESSED_RGBA8_ETC2_EAC;if(R===q9)return Q.COMPRESSED_R11_EAC;if(R===N9)return Q.COMPRESSED_SIGNED_R11_EAC;if(R===c7)return Q.COMPRESSED_RG11_EAC;if(R===F9)return Q.COMPRESSED_SIGNED_RG11_EAC}else return null;if(R===L9||R===O9||R===B9||R===w9||R===k9||R===V9||R===T9||R===P9||R===z9||R===A9||R===I9||R===_9||R===S9||R===j9)if(Q=H.get("WEBGL_compressed_texture_astc"),Q!==null){if(R===L9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:Q.COMPRESSED_RGBA_ASTC_4x4_KHR;if(R===O9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:Q.COMPRESSED_RGBA_ASTC_5x4_KHR;if(R===B9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:Q.COMPRESSED_RGBA_ASTC_5x5_KHR;if(R===w9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:Q.COMPRESSED_RGBA_ASTC_6x5_KHR;if(R===k9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:Q.COMPRESSED_RGBA_ASTC_6x6_KHR;if(R===V9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:Q.COMPRESSED_RGBA_ASTC_8x5_KHR;if(R===T9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:Q.COMPRESSED_RGBA_ASTC_8x6_KHR;if(R===P9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:Q.COMPRESSED_RGBA_ASTC_8x8_KHR;if(R===z9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:Q.COMPRESSED_RGBA_ASTC_10x5_KHR;if(R===A9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:Q.COMPRESSED_RGBA_ASTC_10x6_KHR;if(R===I9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:Q.COMPRESSED_RGBA_ASTC_10x8_KHR;if(R===_9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:Q.COMPRESSED_RGBA_ASTC_10x10_KHR;if(R===S9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:Q.COMPRESSED_RGBA_ASTC_12x10_KHR;if(R===j9)return $===FE?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:Q.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(R===y9||R===h9||R===v9)if(Q=H.get("EXT_texture_compression_bptc"),Q!==null){if(R===y9)return $===FE?Q.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:Q.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(R===h9)return Q.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(R===v9)return Q.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(R===f9||R===b9||R===n7||R===x9)if(Q=H.get("EXT_texture_compression_rgtc"),Q!==null){if(R===f9)return Q.COMPRESSED_RED_RGTC1_EXT;if(R===b9)return Q.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(R===n7)return Q.COMPRESSED_RED_GREEN_RGTC2_EXT;if(R===x9)return Q.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(R===LW)return E.UNSIGNED_INT_24_8;return E[R]!==void 0?E[R]:null}return{convert:W}}var K5=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,U5=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class xQ{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(E,H){if(this.texture===null){let W=new J6(E.texture);if(E.depthNear!==H.depthNear||E.depthFar!==H.depthFar)this.depthNear=E.depthNear,this.depthFar=E.depthFar;this.texture=W}}getMesh(E){if(this.texture!==null){if(this.mesh===null){let H=E.cameras[0].viewport,W=new SE({vertexShader:K5,fragmentShader:U5,uniforms:{depthColor:{value:this.texture},depthWidth:{value:H.z},depthHeight:{value:H.w}}});this.mesh=new s0(new PH(20,20),W)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class gQ extends H8{constructor(E,H){super();let W=this,R=null,J=1,Q=null,$="local-floor",Z=1,K=null,U=null,X=null,Y=null,G=null,D=null,F=typeof XRWebGLBinding<"u",w=new xQ,C={},M=H.getContextAttributes(),T=null,y=null,B=[],V=[],P=new m0,A=null,L=null,k=new MH;k.viewport=new NE;let c=new MH;c.viewport=new NE;let h=[k,c],v=new YR,d=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(i){let $0=B[i];if($0===void 0)$0=new sW,B[i]=$0;return $0.getTargetRaySpace()},this.getControllerGrip=function(i){let $0=B[i];if($0===void 0)$0=new sW,B[i]=$0;return $0.getGripSpace()},this.getHand=function(i){let $0=B[i];if($0===void 0)$0=new sW,B[i]=$0;return $0.getHandSpace()};function u(i){let $0=V.indexOf(i.inputSource);if($0===-1)return;let U0=B[$0];if(U0!==void 0)U0.update(i.inputSource,i.frame,K||Q),U0.dispatchEvent({type:i.type,data:i.inputSource})}function a(){R.removeEventListener("select",u),R.removeEventListener("selectstart",u),R.removeEventListener("selectend",u),R.removeEventListener("squeeze",u),R.removeEventListener("squeezestart",u),R.removeEventListener("squeezeend",u),R.removeEventListener("end",a),R.removeEventListener("inputsourceschange",p);for(let i=0;i<B.length;i++){let $0=V[i];if($0===null)continue;V[i]=null,B[i].disconnect($0)}d=null,z=null,w.reset();for(let i in C)delete C[i];if(E.setRenderTarget(T),G=null,Y=null,X=null,R=null,y=null,u0.stop(),W.isPresenting=!1,E.setPixelRatio(A),E.setSize(P.width,P.height,!1),L!==null){let i=L.camera;i.fov=L.fov,i.zoom=L.zoom,i.updateProjectionMatrix(),L=null}W.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(i){if(J=i,W.isPresenting===!0)h0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(i){if($=i,W.isPresenting===!0)h0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return K||Q},this.setReferenceSpace=function(i){K=i},this.getBaseLayer=function(){return Y!==null?Y:G},this.getBinding=function(){if(X===null&&F)X=new XRWebGLBinding(R,H);return X},this.getFrame=function(){return D},this.getSession=function(){return R},this.setSession=async function(i){if(R=i,R!==null){if(T=E.getRenderTarget(),R.addEventListener("select",u),R.addEventListener("selectstart",u),R.addEventListener("selectend",u),R.addEventListener("squeeze",u),R.addEventListener("squeezestart",u),R.addEventListener("squeezeend",u),R.addEventListener("end",a),R.addEventListener("inputsourceschange",p),M.xrCompatible!==!0)await H.makeXRCompatible();if(A=E.getPixelRatio(),E.getSize(P),!(F&&("createProjectionLayer"in XRWebGLBinding.prototype))){let U0={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:J};G=new XRWebGLLayer(R,H,U0),R.updateRenderState({baseLayer:G}),E.setPixelRatio(1),E.setSize(G.framebufferWidth,G.framebufferHeight,!1),y=new cE(G.framebufferWidth,G.framebufferHeight,{format:kH,type:yH,colorSpace:E.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1,storeMultisampledDepthBuffer:G.ignoreDepthValues===!1,storeMultisampledStencilBuffer:G.ignoreDepthValues===!1})}else{let U0=null,j0=null,f0=null;if(M.depth)f0=M.stencil?H.DEPTH24_STENCIL8:H.DEPTH_COMPONENT24,U0=M.stencil?h8:y8,j0=M.stencil?LW:q8;let I0={colorFormat:H.RGBA8,depthFormat:f0,scaleFactor:J};X=this.getBinding(),Y=X.createProjectionLayer(I0),R.updateRenderState({layers:[Y]}),E.setPixelRatio(1),E.setSize(Y.textureWidth,Y.textureHeight,!1),y=new cE(Y.textureWidth,Y.textureHeight,{format:kH,type:yH,depthTexture:new g8(Y.textureWidth,Y.textureHeight,j0,void 0,void 0,void 0,void 0,void 0,void 0,U0),stencilBuffer:M.stencil,colorSpace:E.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:Y.ignoreDepthValues===!1,resolveStencilBuffer:Y.ignoreDepthValues===!1,storeMultisampledDepthBuffer:Y.ignoreDepthValues===!1,storeMultisampledStencilBuffer:Y.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(Z),K=null,Q=await R.requestReferenceSpace($),u0.setContext(R),u0.start(),W.isPresenting=!0,W.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(R!==null)return R.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function p(i){for(let $0=0;$0<i.removed.length;$0++){let U0=i.removed[$0],j0=V.indexOf(U0);if(j0>=0)V[j0]=null,B[j0].disconnect(U0)}for(let $0=0;$0<i.added.length;$0++){let U0=i.added[$0],j0=V.indexOf(U0);if(j0===-1){for(let I0=0;I0<B.length;I0++)if(I0>=V.length){V.push(U0),j0=I0;break}else if(V[I0]===null){V[I0]=U0,j0=I0;break}if(j0===-1)break}let f0=B[j0];if(f0)f0.connect(U0)}}let J0=new b,s=new b;function t(i,$0,U0){J0.setFromMatrixPosition($0.matrixWorld),s.setFromMatrixPosition(U0.matrixWorld);let j0=J0.distanceTo(s),f0=$0.projectionMatrix.elements,I0=U0.projectionMatrix.elements,xE=f0[14]/(f0[10]-1),o0=f0[14]/(f0[10]+1),e0=(f0[9]+1)/f0[5],UE=(f0[9]-1)/f0[5],EE=(f0[8]-1)/f0[0],nE=(I0[8]+1)/I0[0],wE=xE*EE,JH=xE*nE,gE=j0/(-EE+nE),pE=gE*-EE;if($0.matrixWorld.decompose(i.position,i.quaternion,i.scale),i.translateX(pE),i.translateZ(gE),i.matrixWorld.compose(i.position,i.quaternion,i.scale),i.matrixWorldInverse.copy(i.matrixWorld).invert(),f0[10]===-1)i.projectionMatrix.copy($0.projectionMatrix),i.projectionMatrixInverse.copy($0.projectionMatrixInverse);else{let _=xE+gE,QH=o0+gE,$E=wE-pE,zE=JH+(j0-pE),O=e0*o0/QH*_,q=UE*o0/QH*_;i.projectionMatrix.makePerspective($E,zE,O,q,_,QH),i.projectionMatrixInverse.copy(i.projectionMatrix).invert()}}function R0(i,$0){if($0===null)i.matrixWorld.copy(i.matrix);else i.matrixWorld.multiplyMatrices($0.matrixWorld,i.matrix);i.matrixWorldInverse.copy(i.matrixWorld).invert()}this.updateCamera=function(i){if(R===null)return;let{near:$0,far:U0}=i;if(w.texture!==null){if(w.depthNear>0)$0=w.depthNear;if(w.depthFar>0)U0=w.depthFar}if(v.near=c.near=k.near=$0,v.far=c.far=k.far=U0,d!==v.near||z!==v.far)R.updateRenderState({depthNear:v.near,depthFar:v.far}),d=v.near,z=v.far;v.layers.mask=i.layers.mask|6,k.layers.mask=v.layers.mask&-5,c.layers.mask=v.layers.mask&-3;let j0=i.parent,f0=v.cameras;R0(v,j0);for(let I0=0;I0<f0.length;I0++)R0(f0[I0],j0);if(f0.length===2)t(v,k,c);else v.projectionMatrix.copy(k.projectionMatrix);if(L===null&&i.isPerspectiveCamera)L={camera:i,fov:i.fov,zoom:i.zoom};S0(i,v,j0)};function S0(i,$0,U0){if(U0===null)i.matrix.copy($0.matrixWorld);else i.matrix.copy(U0.matrixWorld),i.matrix.invert(),i.matrix.multiply($0.matrixWorld);if(i.matrix.decompose(i.position,i.quaternion,i.scale),i.updateMatrixWorld(!0),i.projectionMatrix.copy($0.projectionMatrix),i.projectionMatrixInverse.copy($0.projectionMatrixInverse),i.isPerspectiveCamera)i.fov=h7*2*Math.atan(1/i.projectionMatrix.elements[5]),i.zoom=1}this.getCamera=function(){return v},this.getFoveation=function(){if(Y===null&&G===null)return;return Z},this.setFoveation=function(i){if(Z=i,Y!==null)Y.fixedFoveation=i;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=i},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(v)},this.getCameraTexture=function(i){return C[i]};let A0=null;function YE(i,$0){if(U=$0.getViewerPose(K||Q),D=$0,U!==null){let U0=U.views;if(G!==null)E.setRenderTargetFramebuffer(y,G.framebuffer),E.setRenderTarget(y);let j0=!1;if(U0.length!==v.cameras.length)v.cameras.length=0,j0=!0;for(let o0=0;o0<U0.length;o0++){let e0=U0[o0],UE=null;if(G!==null)UE=G.getViewport(e0);else{let nE=X.getViewSubImage(Y,e0);if(UE=nE.viewport,o0===0)E.setRenderTargetTextures(y,nE.colorTexture,nE.depthStencilTexture),E.setRenderTarget(y)}let EE=h[o0];if(EE===void 0)EE=new MH,EE.layers.enable(o0),EE.viewport=new NE,h[o0]=EE;if(EE.matrix.fromArray(e0.transform.matrix),EE.matrix.decompose(EE.position,EE.quaternion,EE.scale),EE.projectionMatrix.fromArray(e0.projectionMatrix),EE.projectionMatrixInverse.copy(EE.projectionMatrix).invert(),EE.viewport.set(UE.x,UE.y,UE.width,UE.height),o0===0)v.matrix.copy(EE.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale);if(j0===!0)v.cameras.push(EE)}let f0=R.enabledFeatures;if(f0&&f0.includes("depth-sensing")&&R.depthUsage=="gpu-optimized"&&F){X=W.getBinding();let o0=X.getDepthInformation(U0[0]);if(o0&&o0.isValid&&o0.texture)w.init(o0,R.renderState)}if(f0&&f0.includes("camera-access")&&F){E.state.unbindTexture(),X=W.getBinding();for(let o0=0;o0<U0.length;o0++){let e0=U0[o0].camera;if(e0){let UE=C[e0];if(!UE)UE=new J6,C[e0]=UE;let EE=X.getCameraImage(e0);UE.sourceTexture=EE}}}}for(let U0=0;U0<B.length;U0++){let j0=V[U0],f0=B[U0];if(j0!==null&&f0!==void 0)f0.update(j0,$0,K||Q)}if(A0)A0(i,$0);if($0.detectedPlanes)W.dispatchEvent({type:"planesdetected",data:$0});D=null}let u0=new zQ;u0.setAnimationLoop(YE),this.setAnimationLoop=function(i){A0=i},this.dispose=function(){}}}var X5=new AE,pQ=new p0;pQ.set(-1,0,0,0,1,0,0,0,1);function G5(E,H){function W(C,M){if(C.matrixAutoUpdate===!0)C.updateMatrix();M.value.copy(C.matrix)}function R(C,M){if(M.color.getRGB(C.fogColor.value,r9(E)),M.isFog)C.fogNear.value=M.near,C.fogFar.value=M.far;else if(M.isFogExp2)C.fogDensity.value=M.density}function J(C,M,T,y,B){if(M.isNodeMaterial)M.uniformsNeedUpdate=!1;else if(M.isMeshBasicMaterial)Q(C,M);else if(M.isMeshLambertMaterial){if(Q(C,M),M.envMap)C.envMapIntensity.value=M.envMapIntensity}else if(M.isMeshToonMaterial)Q(C,M),Y(C,M);else if(M.isMeshPhongMaterial){if(Q(C,M),X(C,M),M.envMap)C.envMapIntensity.value=M.envMapIntensity}else if(M.isMeshStandardMaterial){if(Q(C,M),G(C,M),M.isMeshPhysicalMaterial)D(C,M,B)}else if(M.isMeshMatcapMaterial)Q(C,M),F(C,M);else if(M.isMeshDepthMaterial)Q(C,M);else if(M.isMeshDistanceMaterial)Q(C,M),w(C,M);else if(M.isMeshNormalMaterial)Q(C,M);else if(M.isLineBasicMaterial){if($(C,M),M.isLineDashedMaterial)Z(C,M)}else if(M.isPointsMaterial)K(C,M,T,y);else if(M.isSpriteMaterial)U(C,M);else if(M.isShadowMaterial)C.color.value.copy(M.color),C.opacity.value=M.opacity;else if(M.isShaderMaterial)M.uniformsNeedUpdate=!1}function Q(C,M){if(C.opacity.value=M.opacity,M.color)C.diffuse.value.copy(M.color);if(M.emissive)C.emissive.value.copy(M.emissive).multiplyScalar(M.emissiveIntensity);if(M.map)C.map.value=M.map,W(M.map,C.mapTransform);if(M.alphaMap)C.alphaMap.value=M.alphaMap,W(M.alphaMap,C.alphaMapTransform);if(M.bumpMap){if(C.bumpMap.value=M.bumpMap,W(M.bumpMap,C.bumpMapTransform),C.bumpScale.value=M.bumpScale,M.side===UH)C.bumpScale.value*=-1}if(M.normalMap){if(C.normalMap.value=M.normalMap,W(M.normalMap,C.normalMapTransform),C.normalScale.value.copy(M.normalScale),M.side===UH)C.normalScale.value.negate()}if(M.displacementMap)C.displacementMap.value=M.displacementMap,W(M.displacementMap,C.displacementMapTransform),C.displacementScale.value=M.displacementScale,C.displacementBias.value=M.displacementBias;if(M.emissiveMap)C.emissiveMap.value=M.emissiveMap,W(M.emissiveMap,C.emissiveMapTransform);if(M.specularMap)C.specularMap.value=M.specularMap,W(M.specularMap,C.specularMapTransform);if(M.alphaTest>0)C.alphaTest.value=M.alphaTest;let T=H.get(M),y=T.envMap,B=T.envMapRotation;if(y){if(C.envMap.value=y,C.envMapRotation.value.setFromMatrix4(X5.makeRotationFromEuler(B)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1)C.envMapRotation.value.premultiply(pQ);C.reflectivity.value=M.reflectivity,C.ior.value=M.ior,C.refractionRatio.value=M.refractionRatio}if(M.lightMap)C.lightMap.value=M.lightMap,C.lightMapIntensity.value=M.lightMapIntensity,W(M.lightMap,C.lightMapTransform);if(M.aoMap)C.aoMap.value=M.aoMap,C.aoMapIntensity.value=M.aoMapIntensity,W(M.aoMap,C.aoMapTransform)}function $(C,M){if(C.diffuse.value.copy(M.color),C.opacity.value=M.opacity,M.map)C.map.value=M.map,W(M.map,C.mapTransform)}function Z(C,M){C.dashSize.value=M.dashSize,C.totalSize.value=M.dashSize+M.gapSize,C.scale.value=M.scale}function K(C,M,T,y){if(C.diffuse.value.copy(M.color),C.opacity.value=M.opacity,C.size.value=M.size*T,C.scale.value=y*0.5,M.map)C.map.value=M.map,W(M.map,C.uvTransform);if(M.alphaMap)C.alphaMap.value=M.alphaMap,W(M.alphaMap,C.alphaMapTransform);if(M.alphaTest>0)C.alphaTest.value=M.alphaTest}function U(C,M){if(C.diffuse.value.copy(M.color),C.opacity.value=M.opacity,C.rotation.value=M.rotation,M.map)C.map.value=M.map,W(M.map,C.mapTransform);if(M.alphaMap)C.alphaMap.value=M.alphaMap,W(M.alphaMap,C.alphaMapTransform);if(M.alphaTest>0)C.alphaTest.value=M.alphaTest}function X(C,M){C.specular.value.copy(M.specular),C.shininess.value=Math.max(M.shininess,0.0001)}function Y(C,M){if(M.gradientMap)C.gradientMap.value=M.gradientMap}function G(C,M){if(C.metalness.value=M.metalness,M.metalnessMap)C.metalnessMap.value=M.metalnessMap,W(M.metalnessMap,C.metalnessMapTransform);if(C.roughness.value=M.roughness,M.roughnessMap)C.roughnessMap.value=M.roughnessMap,W(M.roughnessMap,C.roughnessMapTransform);if(M.envMap)C.envMapIntensity.value=M.envMapIntensity}function D(C,M,T){if(C.ior.value=M.ior,M.sheen>0){if(C.sheenColor.value.copy(M.sheenColor).multiplyScalar(M.sheen),C.sheenRoughness.value=M.sheenRoughness,M.sheenColorMap)C.sheenColorMap.value=M.sheenColorMap,W(M.sheenColorMap,C.sheenColorMapTransform);if(M.sheenRoughnessMap)C.sheenRoughnessMap.value=M.sheenRoughnessMap,W(M.sheenRoughnessMap,C.sheenRoughnessMapTransform)}if(M.clearcoat>0){if(C.clearcoat.value=M.clearcoat,C.clearcoatRoughness.value=M.clearcoatRoughness,M.clearcoatMap)C.clearcoatMap.value=M.clearcoatMap,W(M.clearcoatMap,C.clearcoatMapTransform);if(M.clearcoatRoughnessMap)C.clearcoatRoughnessMap.value=M.clearcoatRoughnessMap,W(M.clearcoatRoughnessMap,C.clearcoatRoughnessMapTransform);if(M.clearcoatNormalMap){if(C.clearcoatNormalMap.value=M.clearcoatNormalMap,W(M.clearcoatNormalMap,C.clearcoatNormalMapTransform),C.clearcoatNormalScale.value.copy(M.clearcoatNormalScale),M.side===UH)C.clearcoatNormalScale.value.negate()}}if(M.dispersion>0)C.dispersion.value=M.dispersion;if(M.retroreflectivity>0)C.retroreflectivity.value=M.retroreflectivity;if(M.iridescence>0){if(C.iridescence.value=M.iridescence,C.iridescenceIOR.value=M.iridescenceIOR,C.iridescenceThicknessMinimum.value=M.iridescenceThicknessRange[0],C.iridescenceThicknessMaximum.value=M.iridescenceThicknessRange[1],M.iridescenceMap)C.iridescenceMap.value=M.iridescenceMap,W(M.iridescenceMap,C.iridescenceMapTransform);if(M.iridescenceThicknessMap)C.iridescenceThicknessMap.value=M.iridescenceThicknessMap,W(M.iridescenceThicknessMap,C.iridescenceThicknessMapTransform)}if(M.transmission>0){if(C.transmission.value=M.transmission,C.transmissionSamplerMap.value=T.texture,C.transmissionSamplerSize.value.set(T.width,T.height),M.transmissionMap)C.transmissionMap.value=M.transmissionMap,W(M.transmissionMap,C.transmissionMapTransform);if(C.thickness.value=M.thickness,M.thicknessMap)C.thicknessMap.value=M.thicknessMap,W(M.thicknessMap,C.thicknessMapTransform);C.attenuationDistance.value=M.attenuationDistance,C.attenuationColor.value.copy(M.attenuationColor)}if(M.anisotropy>0){if(C.anisotropyVector.value.set(M.anisotropy*Math.cos(M.anisotropyRotation),M.anisotropy*Math.sin(M.anisotropyRotation)),M.anisotropyMap)C.anisotropyMap.value=M.anisotropyMap,W(M.anisotropyMap,C.anisotropyMapTransform)}if(C.specularIntensity.value=M.specularIntensity,C.specularColor.value.copy(M.specularColor),M.specularColorMap)C.specularColorMap.value=M.specularColorMap,W(M.specularColorMap,C.specularColorMapTransform);if(M.specularIntensityMap)C.specularIntensityMap.value=M.specularIntensityMap,W(M.specularIntensityMap,C.specularIntensityMapTransform)}function F(C,M){if(M.matcap)C.matcap.value=M.matcap}function w(C,M){let T=H.get(M).light;C.referencePosition.value.setFromMatrixPosition(T.matrixWorld),C.nearDistance.value=T.shadow.camera.near,C.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:R,refreshMaterialUniforms:J}}function Y5(E,H,W,R){let J={},Q={},$=[],Z=E.getParameter(E.MAX_UNIFORM_BUFFER_BINDINGS);function K(B,V){let P=V.program;R.uniformBlockBinding(B,P)}function U(B,V){let P=J[B.id];if(P===void 0)C(B),P=X(B),J[B.id]=P,B.addEventListener("dispose",T);let A=V.program;R.updateUBOMapping(B,A);let L=H.render.frame;if(Q[B.id]!==L)G(B),Q[B.id]=L}function X(B){let V=Y();B.__bindingPointIndex=V;let P=E.createBuffer(),A=B.__size,L=B.usage;return E.bindBuffer(E.UNIFORM_BUFFER,P),E.bufferData(E.UNIFORM_BUFFER,A,L),E.bindBuffer(E.UNIFORM_BUFFER,null),E.bindBufferBase(E.UNIFORM_BUFFER,V,P),P}function Y(){for(let B=0;B<Z;B++)if($.indexOf(B)===-1)return $.push(B),B;return g0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(B){let V=J[B.id],P=B.uniforms,A=B.__cache;E.bindBuffer(E.UNIFORM_BUFFER,V);for(let L=0,k=P.length;L<k;L++){let c=P[L];if(Array.isArray(c))for(let h=0,v=c.length;h<v;h++)D(c[h],L,h,A);else D(c,L,0,A)}E.bindBuffer(E.UNIFORM_BUFFER,null)}function D(B,V,P,A){if(w(B,V,P,A)===!0){let{__offset:L,value:k}=B;if(Array.isArray(k)){let c=0;for(let h=0;h<k.length;h++){let v=k[h],d=M(v);if(F(v,B.__data,c),typeof v!=="number"&&typeof v!=="boolean"&&!v.isMatrix3&&!ArrayBuffer.isView(v))c+=d.storage/Float32Array.BYTES_PER_ELEMENT}}else F(k,B.__data,0);E.bufferSubData(E.UNIFORM_BUFFER,L,B.__data)}}function F(B,V,P){if(typeof B==="number"||typeof B==="boolean")V[0]=B;else if(B.isMatrix3)V[0]=B.elements[0],V[1]=B.elements[1],V[2]=B.elements[2],V[3]=0,V[4]=B.elements[3],V[5]=B.elements[4],V[6]=B.elements[5],V[7]=0,V[8]=B.elements[6],V[9]=B.elements[7],V[10]=B.elements[8],V[11]=0;else if(ArrayBuffer.isView(B))V.set(new B.constructor(B.buffer,B.byteOffset,V.length));else B.toArray(V,P)}function w(B,V,P,A){let L=B.value,k=V+"_"+P;if(A[k]===void 0){if(typeof L==="number"||typeof L==="boolean")A[k]=L;else if(ArrayBuffer.isView(L))A[k]=L.slice();else A[k]=L.clone();return!0}else{let c=A[k];if(typeof L==="number"||typeof L==="boolean"){if(c!==L)return A[k]=L,!0}else if(ArrayBuffer.isView(L))return!0;else if(c.equals(L)===!1)return c.copy(L),!0}return!1}function C(B){let V=B.uniforms,P=0,A=16;for(let k=0,c=V.length;k<c;k++){let h=Array.isArray(V[k])?V[k]:[V[k]];for(let v=0,d=h.length;v<d;v++){let z=h[v],u=Array.isArray(z.value)?z.value:[z.value];for(let a=0,p=u.length;a<p;a++){let J0=u[a],s=M(J0),t=P%A,R0=t%s.boundary,S0=t+R0;if(P+=R0,S0!==0&&A-S0<s.storage)P+=A-S0;z.__data=new Float32Array(s.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=P,P+=s.storage}}}let L=P%A;if(L>0)P+=A-L;return B.__size=P,B.__cache={},this}function M(B){let V={boundary:0,storage:0};if(typeof B==="number"||typeof B==="boolean")V.boundary=4,V.storage=4;else if(B.isVector2)V.boundary=8,V.storage=8;else if(B.isVector3||B.isColor)V.boundary=16,V.storage=12;else if(B.isVector4)V.boundary=16,V.storage=16;else if(B.isMatrix3)V.boundary=48,V.storage=48;else if(B.isMatrix4)V.boundary=64,V.storage=64;else if(B.isTexture)h0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(B))V.boundary=16,V.storage=B.byteLength;else h0("WebGLRenderer: Unsupported uniform value type.",B);return V}function T(B){let V=B.target;V.removeEventListener("dispose",T);let P=$.indexOf(V.__bindingPointIndex);$.splice(P,1),E.deleteBuffer(J[V.id]),delete J[V.id],delete Q[V.id]}function y(){for(let B in J)E.deleteBuffer(J[B]);$=[],J={},Q={}}return{bind:K,update:U,dispose:y}}var M5=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),mH=null;function D5(){if(mH===null)mH=new i9(M5,16,16,v8,wH),mH.name="DFG_LUT",mH.minFilter=_E,mH.magFilter=_E,mH.wrapS=g7,mH.wrapT=g7,mH.generateMipmaps=!1,mH.needsUpdate=!0;return mH}class zR{constructor(E={}){let{canvas:H=r1(),context:W=null,depth:R=!0,stencil:J=!1,alpha:Q=!1,antialias:$=!1,premultipliedAlpha:Z=!0,preserveDrawingBuffer:K=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:X=!1,reversedDepthBuffer:Y=!1,outputBufferType:G=yH}=E;this.isWebGLRenderer=!0;let D;if(W!==null){if(typeof WebGLRenderingContext<"u"&&W instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");D=W.getContextAttributes().alpha}else D=Q;let F=G,w=new Set([K9,Z9,$9]),C=new Set([yH,q8,dW,LW,J9,Q9]),M=new Uint32Array(4),T=new Int32Array(4),y=new b,B=null,V=null,P=[],A=[],L=null;this.domElement=H,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=jH,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,c=!1,h=null,v=null,d=null,z=null;this._outputColorSpace=s7;let u=0,a=0,p=null,J0=-1,s=null,t=new NE,R0=new NE,S0=null,A0=new e(0),YE=0,u0=H.width,i=H.height,$0=1,U0=null,j0=null,f0=new NE(0,0,u0,i),I0=new NE(0,0,u0,i),xE=!1,o0=new W6,e0=!1,UE=!1,EE=new AE,nE=new b,wE=new NE,JH={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},gE=!1;function pE(){return p===null?$0:1}let _=W;function QH(N,S){return H.getContext(N,S)}let $E,zE,O,q,I,l,H0,X0,M0,n,r,L0,z0,D0,Z0,_0,y0,QE,j,G0,o,Y0,O0;try{let N={alpha:!0,depth:R,stencil:J,antialias:$,premultipliedAlpha:Z,preserveDrawingBuffer:K,powerPreference:U,failIfMajorPerformanceCaveat:X};if("setAttribute"in H)H.setAttribute("data-engine",`three.js r${E1}`);if(H.addEventListener("webglcontextlost",l0,!1),H.addEventListener("webglcontextrestored",LE,!1),H.addEventListener("webglcontextcreationerror",ZE,!1),_===null){if(_=QH("webgl2",N),_===null)if(QH("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}E0()}catch(N){throw H.removeEventListener("webglcontextlost",l0,!1),H.removeEventListener("webglcontextrestored",LE,!1),H.removeEventListener("webglcontextcreationerror",ZE,!1),g0("WebGLRenderer: "+N.message),N}function E0(){if($E=new BX(_),$E.init(),o=new Z5(_,$E),zE=new GX(_,$E,E,o),O=new Q5(_,$E),zE.reversedDepthBuffer&&Y)O.buffers.depth.setReversed(!0);v=_.createFramebuffer(),d=_.createFramebuffer(),z=_.createFramebuffer(),q=new VX(_),I=new cG,l=new $5(_,$E,O,I,zE,o,q),H0=new OX(k),X0=new PZ(_),Y0=new UX(_,X0),M0=new wX(_,X0,q,Y0),n=new PX(_,M0,X0,Y0,q),QE=new TX(_,zE,l),Z0=new YX(I),r=new dG(k,H0,$E,zE,Y0,Z0),L0=new G5(k,I),z0=new sG,D0=new eG($E),y0=new KX(k,H0,O,n,D,Z),_0=new J5(k,n,zE),O0=new Y5(_,q,zE,O),j=new XX(_,$E,q),G0=new kX(_,$E,q),q.programs=r.programs,k.capabilities=zE,k.extensions=$E,k.properties=I,k.renderLists=z0,k.shadowMap=_0,k.state=O,k.info=q}if(F!==yH)L=new AX(F,H.width,H.height,$,R,J);let q0=new gQ(k,_);this.xr=q0,this.getContext=function(){return _},this.getContextAttributes=function(){return _.getContextAttributes()},this.forceContextLoss=function(){let N=$E.get("WEBGL_lose_context");if(N)N.loseContext()},this.forceContextRestore=function(){let N=$E.get("WEBGL_lose_context");if(N)N.restoreContext()},this.getPixelRatio=function(){return $0},this.setPixelRatio=function(N){if(N===void 0)return;$0=N,this.setSize(u0,i,!1)},this.getSize=function(N){return N.set(u0,i)},this.setSize=function(N,S,m=!0){if(q0.isPresenting){h0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(u0=N,i=S,H.width=Math.floor(N*$0),H.height=Math.floor(S*$0),m===!0)H.style.width=N+"px",H.style.height=S+"px";if(L!==null)L.setSize(H.width,H.height);this.setViewport(0,0,N,S)},this.getDrawingBufferSize=function(N){return N.set(u0*$0,i*$0).floor()},this.setDrawingBufferSize=function(N,S,m){u0=N,i=S,$0=m,H.width=Math.floor(N*m),H.height=Math.floor(S*m),this.setViewport(0,0,N,S)},this.setEffects=function(N){if(F===yH){g0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(N){for(let S=0;S<N.length;S++)if(N[S].isOutputPass===!0){h0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(N||[])},this.getCurrentViewport=function(N){return N.copy(t)},this.getViewport=function(N){return N.copy(f0)},this.setViewport=function(N,S,m,x){if(N.isVector4)f0.set(N.x,N.y,N.z,N.w);else f0.set(N,S,m,x);O.viewport(t.copy(f0).multiplyScalar($0).round())},this.getScissor=function(N){return N.copy(I0)},this.setScissor=function(N,S,m,x){if(N.isVector4)I0.set(N.x,N.y,N.z,N.w);else I0.set(N,S,m,x);O.scissor(R0.copy(I0).multiplyScalar($0).round())},this.getScissorTest=function(){return xE},this.setScissorTest=function(N){O.setScissorTest(xE=N)},this.setOpaqueSort=function(N){U0=N},this.setTransparentSort=function(N){j0=N},this.getClearColor=function(N){return N.copy(y0.getClearColor())},this.setClearColor=function(){y0.setClearColor(...arguments)},this.getClearAlpha=function(){return y0.getClearAlpha()},this.setClearAlpha=function(){y0.setClearAlpha(...arguments)},this.clear=function(N=!0,S=!0,m=!0){let x=0;if(N){let g=!1;if(p!==null){let F0=p.texture.format;g=w.has(F0)}if(g){let F0=p.texture.type,w0=C.has(F0),N0=y0.getClearColor(),V0=y0.getClearAlpha(),P0=N0.r,d0=N0.g,i0=N0.b;if(w0)M[0]=P0,M[1]=d0,M[2]=i0,M[3]=V0,_.clearBufferuiv(_.COLOR,0,M);else T[0]=P0,T[1]=d0,T[2]=i0,T[3]=V0,_.clearBufferiv(_.COLOR,0,T)}else x|=_.COLOR_BUFFER_BIT}if(S)x|=_.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(m)x|=_.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(x!==0)_.clear(x)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(N){N.setRenderer(this),h=N},this.dispose=function(){H.removeEventListener("webglcontextlost",l0,!1),H.removeEventListener("webglcontextrestored",LE,!1),H.removeEventListener("webglcontextcreationerror",ZE,!1),y0.dispose(),z0.dispose(),D0.dispose(),I.dispose(),H0.dispose(),n.dispose(),Y0.dispose(),O0.dispose(),r.dispose(),q0.dispose(),q0.removeEventListener("sessionstart",$J),q0.removeEventListener("sessionend",ZJ),L8.stop()};function l0(N){N.preventDefault(),d9("WebGLRenderer: Context Lost."),c=!0}function LE(){d9("WebGLRenderer: Context Restored."),c=!1;let N=q.autoReset,S=_0.enabled,m=_0.autoUpdate,x=_0.needsUpdate,g=_0.type;E0(),q.autoReset=N,_0.enabled=S,_0.autoUpdate=m,_0.needsUpdate=x,_0.type=g}function ZE(N){g0("WebGLRenderer: A WebGL context could not be created. Reason: ",N.statusMessage)}function vH(N){let S=N.target;S.removeEventListener("dispose",vH),nH(S)}function nH(N){Q$(N),I.remove(N)}function Q$(N){let S=I.get(N).programs;if(S!==void 0){if(S.forEach(function(m){r.releaseProgram(m)}),N.isShaderMaterial)r.releaseShaderCache(N)}}this.renderBufferDirect=function(N,S,m,x,g,F0){if(S===null)S=JH;let w0=g.isMesh&&g.matrixWorld.determinantAffine()<0,N0=K$(N,S,m,x,g);O.setMaterial(x,w0);let V0=m.index,P0=1;if(x.wireframe===!0){if(V0=M0.getWireframeAttribute(m),V0===void 0)return;P0=2}let d0=m.drawRange,i0=m.attributes.position,T0=d0.start*P0,KE=(d0.start+d0.count)*P0;if(F0!==null)T0=Math.max(T0,F0.start*P0),KE=Math.min(KE,(F0.start+F0.count)*P0);if(V0!==null)T0=Math.max(T0,0),KE=Math.min(KE,V0.count);else if(i0!==void 0&&i0!==null)T0=Math.max(T0,0),KE=Math.min(KE,i0.count);let vE=KE-T0;if(vE<0||vE===1/0)return;Y0.setup(g,x,N0,m,V0);let kE,CE=j;if(V0!==null)kE=X0.get(V0),CE=G0,CE.setIndex(kE);if(g.isMesh)if(x.wireframe===!0)O.setLineWidth(x.wireframeLinewidth*pE()),CE.setMode(_.LINES);else CE.setMode(_.TRIANGLES);else if(g.isLine){let sE=x.linewidth;if(sE===void 0)sE=1;if(O.setLineWidth(sE*pE()),g.isLineSegments)CE.setMode(_.LINES);else if(g.isLineLoop)CE.setMode(_.LINE_LOOP);else CE.setMode(_.LINE_STRIP)}else if(g.isPoints)CE.setMode(_.POINTS);else if(g.isSprite)CE.setMode(_.TRIANGLES);if(g.isBatchedMesh)if(!$E.get("WEBGL_multi_draw")){let{_multiDrawStarts:sE,_multiDrawCounts:B0,_multiDrawCount:eE}=g,RE=V0?X0.get(V0).bytesPerElement:1,qH=I.get(x).currentProgram.getUniforms();for(let fH=0;fH<eE;fH++)qH.setValue(_,"_gl_DrawID",fH),CE.render(sE[fH]/RE,B0[fH])}else CE.renderMultiDraw(g._multiDrawStarts,g._multiDrawCounts,g._multiDrawCount);else if(g.isInstancedMesh)CE.renderInstances(T0,vE,g.count);else if(m.isInstancedBufferGeometry){let sE=m._maxInstanceCount!==void 0?m._maxInstanceCount:1/0,B0=Math.min(m.instanceCount,sE);CE.renderInstances(T0,vE,B0)}else CE.render(T0,vE)};function QJ(N,S,m,x){if(h!==null&&N.isNodeMaterial)h.setObject(x,N);if(e0===!0)Z0.setState(N,m,!1);if(N.transparent===!0&&N.side===GE&&N.forceSinglePass===!1)N.side=UH,N.needsUpdate=!0,U7(N,S,x),N.side=qW,N.needsUpdate=!0,U7(N,S,x),N.side=GE;else U7(N,S,x)}this.compile=function(N,S,m=null){if(m===null)m=N;if(h!==null)h.renderStart(N,S,m);if(V=D0.get(m),V.init(S),A.push(V),m.traverseVisible(function(g){if(g.isLight&&g.layers.test(S.layers)){if(V.pushLight(g),g.castShadow)V.pushShadow(g)}}),N!==m)N.traverseVisible(function(g){if(g.isLight&&g.layers.test(S.layers)){if(V.pushLight(g),g.castShadow)V.pushShadow(g)}});if(V.setupLights(),h!==null)h.updateLights(V.state.lightsArray);if(UE=this.localClippingEnabled,e0=Z0.init(this.clippingPlanes,UE),e0===!0)Z0.setGlobalState(this.clippingPlanes,S);if(h!==null)_0.render(V.state.shadowsArray,m,S);let x=new Set;if(N.traverse(function(g){if(!(g.isMesh||g.isPoints||g.isLine||g.isSprite))return;let F0=g.material;if(F0)if(Array.isArray(F0))for(let w0=0;w0<F0.length;w0++){let N0=F0[w0];QJ(N0,m,S,g),x.add(N0)}else QJ(F0,m,S,g),x.add(F0)}),V=A.pop(),h!==null)h.renderEnd();return x},this.compileAsync=function(N,S,m=null){let x=this.compile(N,S,m);return new Promise((g)=>{function F0(){if(x.forEach(function(w0){let V0=I.get(w0).currentProgram;if(V0===void 0||V0.isReady())x.delete(w0)}),x.size===0){g(N);return}setTimeout(F0,10)}if($E.get("KHR_parallel_shader_compile")!==null)F0();else setTimeout(F0,10)})};let N6=null;function $$(N){if(N6)N6(N)}function $J(){L8.stop()}function ZJ(){L8.start()}let L8=new zQ;if(L8.setAnimationLoop($$),typeof self<"u")L8.setContext(self);this.setAnimationLoop=function(N){N6=N,q0.setAnimationLoop(N),N===null?L8.stop():L8.start()},q0.addEventListener("sessionstart",$J),q0.addEventListener("sessionend",ZJ),this.render=function(N,S){if(S!==void 0&&S.isCamera!==!0){g0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(c===!0)return;if(h!==null)h.renderStart(N,S);let m=q0.enabled===!0&&q0.isPresenting===!0,x=L!==null&&(p===null||m)&&L.begin(k,p);if(N.matrixWorldAutoUpdate===!0)N.updateMatrixWorld();if(S.parent===null&&S.matrixWorldAutoUpdate===!0)S.updateMatrixWorld();if(q0.enabled===!0&&q0.isPresenting===!0&&(L===null||L.isCompositing()===!1)){if(q0.cameraAutoUpdate===!0)q0.updateCamera(S);S=q0.getCamera()}if(N.isScene===!0)N.onBeforeRender(k,N,S,p);if(V=D0.get(N,A.length),V.init(S),V.state.textureUnits=l.getTextureUnits(),A.push(V),EE.multiplyMatrices(S.projectionMatrix,S.matrixWorldInverse),o0.setFromProjectionMatrix(EE,u9,S.reversedDepth),UE=this.localClippingEnabled,e0=Z0.init(this.clippingPlanes,UE),B=z0.get(N,P.length),B.init(),P.push(B),q0.enabled===!0&&q0.isPresenting===!0){let w0=k.xr.getDepthSensingMesh();if(w0!==null)F6(w0,S,-1/0,k.sortObjects)}if(F6(N,S,0,k.sortObjects),B.finish(),h!==null)h.updateLights(V.state.lightsArray);if(k.sortObjects===!0)B.sort(U0,j0);if(gE=q0.enabled===!1||q0.isPresenting===!1||q0.hasDepthSensing()===!1,gE)y0.addToRenderList(B,N);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(e0===!0)Z0.beginShadows();let g=V.state.shadowsArray;if(_0.render(g,N,S),e0===!0)Z0.endShadows();if((x&&L.hasRenderPass())===!1){let{opaque:w0,transmissive:N0}=B;if(V.setupLights(),S.isArrayCamera){let V0=S.cameras;if(N0.length>0)for(let P0=0,d0=V0.length;P0<d0;P0++){let i0=V0[P0];UJ(w0,N0,N,i0)}if(gE)y0.render(N);for(let P0=0,d0=V0.length;P0<d0;P0++){let i0=V0[P0];KJ(B,N,i0,i0.viewport)}}else{if(N0.length>0)UJ(w0,N0,N,S);if(gE)y0.render(N);KJ(B,N,S)}}if(p!==null&&a===0)l.updateMultisampleRenderTarget(p),l.updateRenderTargetMipmap(p);if(x)L.end(k);if(N.isScene===!0)N.onAfterRender(k,N,S);if(Y0.resetDefaultState(),J0=-1,s=null,A.pop(),A.length>0){if(V=A[A.length-1],l.setTextureUnits(V.state.textureUnits),e0===!0)Z0.setGlobalState(k.clippingPlanes,V.state.camera)}else V=null;if(P.pop(),P.length>0)B=P[P.length-1];else B=null;if(h!==null)h.renderEnd()};function F6(N,S,m,x){if(N.visible===!1)return;if(N.layers.test(S.layers)){if(N.isGroup)m=N.renderOrder;else if(N.isLOD){if(N.autoUpdate===!0)N.update(S)}else if(N.isLightProbeGrid)V.pushLightProbeGrid(N);else if(N.isLight){if(V.pushLight(N),N.castShadow)V.pushShadow(N)}else if(N.isSprite){if(!N.frustumCulled||N.intersectsFrustum(o0)){if(x)wE.setFromMatrixPosition(N.matrixWorld).applyMatrix4(EE);let w0=n.update(N),N0=N.material;if(N0.visible)B.push(N,w0,N0,m,wE.z,null,S)}}else if(N.isMesh||N.isLine||N.isPoints){if(!N.frustumCulled||N.intersectsFrustum(o0)){let w0=n.update(N),N0=N.material;if(x){if(N.boundingSphere!==void 0){if(N.boundingSphere===null)N.computeBoundingSphere();wE.copy(N.boundingSphere.center)}else{if(w0.boundingSphere===null)w0.computeBoundingSphere();wE.copy(w0.boundingSphere.center)}wE.applyMatrix4(N.matrixWorld).applyMatrix4(EE)}if(Array.isArray(N0)){let V0=w0.groups;for(let P0=0,d0=V0.length;P0<d0;P0++){let i0=V0[P0],T0=N0[i0.materialIndex];if(T0&&T0.visible)B.push(N,w0,T0,m,wE.z,i0,S)}}else if(N0.visible)B.push(N,w0,N0,m,wE.z,null,S)}}}let F0=N.children;for(let w0=0,N0=F0.length;w0<N0;w0++)F6(F0[w0],S,m,x)}function KJ(N,S,m,x){let{opaque:g,transmissive:F0,transparent:w0}=N;if(V.setupLightsView(m),e0===!0)Z0.setGlobalState(k.clippingPlanes,m);if(x)O.viewport(t.copy(x));if(g.length>0)K7(g,S,m);if(F0.length>0)K7(F0,S,m);if(w0.length>0)K7(w0,S,m);O.buffers.depth.setTest(!0),O.buffers.depth.setMask(!0),O.buffers.color.setMask(!0),O.setPolygonOffset(!1)}function UJ(N,S,m,x){if((m.isScene===!0?m.overrideMaterial:null)!==null)return;if(V.state.transmissionRenderTarget[x.id]===void 0){let T0=$E.has("EXT_color_buffer_half_float")||$E.has("EXT_color_buffer_float");V.state.transmissionRenderTarget[x.id]=new cE(1,1,{generateMipmaps:!0,type:T0?wH:yH,minFilter:j8,samples:Math.max(4,zE.samples),stencilBuffer:J,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:a0.workingColorSpace})}let F0=V.state.transmissionRenderTarget[x.id],w0=x.viewport||t;F0.setSize(w0.z*k.transmissionResolutionScale,w0.w*k.transmissionResolutionScale);let N0=k.getRenderTarget(),V0=k.getActiveCubeFace(),P0=k.getActiveMipmapLevel();if(k.setRenderTarget(F0),k.getClearColor(A0),YE=k.getClearAlpha(),YE<1)k.setClearColor(16777215,0.5);if(k.clear(),gE)y0.render(m);let d0=k.toneMapping;k.toneMapping=jH;let i0=x.viewport;if(x.viewport!==void 0)x.viewport=void 0;if(V.setupLightsView(x),e0===!0)Z0.setGlobalState(k.clippingPlanes,x);if(K7(N,m,x),l.updateMultisampleRenderTarget(F0),l.updateRenderTargetMipmap(F0),$E.has("WEBGL_multisampled_render_to_texture")===!1){let T0=!1;for(let KE=0,vE=S.length;KE<vE;KE++){let kE=S[KE],{object:CE,geometry:sE,material:B0,group:eE}=kE;if(B0.side===GE&&CE.layers.test(x.layers)){let RE=B0.side;B0.side=UH,B0.needsUpdate=!0,XJ(CE,m,x,sE,B0,eE),B0.side=RE,B0.needsUpdate=!0,T0=!0}}if(T0===!0)l.updateMultisampleRenderTarget(F0),l.updateRenderTargetMipmap(F0)}if(k.setRenderTarget(N0,V0,P0),k.setClearColor(A0,YE),i0!==void 0)x.viewport=i0;k.toneMapping=d0}function K7(N,S,m){let x=S.isScene===!0?S.overrideMaterial:null;for(let g=0,F0=N.length;g<F0;g++){let w0=N[g],{object:N0,geometry:V0,group:P0}=w0,d0=w0.material;if(d0.allowOverride===!0&&x!==null)d0=x;if(N0.layers.test(m.layers))XJ(N0,S,m,V0,d0,P0)}}function XJ(N,S,m,x,g,F0){if(h!==null&&g.isNodeMaterial)h.setObject(N,g);if(N.onBeforeRender(k,S,m,x,g,F0),N.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,N.matrixWorld),N.normalMatrix.getNormalMatrix(N.modelViewMatrix),g.onBeforeRender(k,S,m,x,N,F0),g.transparent===!0&&g.side===GE&&g.forceSinglePass===!1)g.side=UH,g.needsUpdate=!0,k.renderBufferDirect(m,S,x,g,N,F0),g.side=qW,g.needsUpdate=!0,k.renderBufferDirect(m,S,x,g,N,F0),g.side=GE;else k.renderBufferDirect(m,S,x,g,N,F0);N.onAfterRender(k,S,m,x,g,F0)}function U7(N,S,m){if(S.isScene!==!0)S=JH;let x=I.get(N),g=V.state.lights,F0=V.state.shadowsArray,w0=g.state.version,N0=r.getParameters(N,g.state,F0,S,m,V.state.lightProbeGridArray),V0=r.getProgramCacheKey(N0),P0=x.programs;x.environment=N.isMeshStandardMaterial||N.isMeshLambertMaterial||N.isMeshPhongMaterial?S.environment:null,x.fog=S.fog;let d0=N.isMeshStandardMaterial||N.isMeshLambertMaterial&&!N.envMap||N.isMeshPhongMaterial&&!N.envMap;if(x.envMap=H0.get(N.envMap||x.environment,d0),x.envMapRotation=x.environment!==null&&N.envMap===null?S.environmentRotation:N.envMapRotation,P0===void 0)N.addEventListener("dispose",vH),P0=new Map,x.programs=P0;let i0=P0.get(V0);if(i0!==void 0){if(x.currentProgram===i0&&x.lightsStateVersion===w0)return YJ(N,N0),i0}else{if(N0.uniforms=r.getUniforms(N),h!==null&&N.isNodeMaterial)h.build(N,m,N0);N.onBeforeCompile(N0,k),i0=r.acquireProgram(N0,V0),P0.set(V0,i0),x.uniforms=N0.uniforms}let T0=x.uniforms;if(!N.isShaderMaterial&&!N.isRawShaderMaterial||N.clipping===!0)T0.clippingPlanes=Z0.uniform;if(YJ(N,N0),x.needsLights=X$(N),x.lightsStateVersion=w0,x.needsLights)T0.ambientLightColor.value=g.state.ambient,T0.lightProbe.value=g.state.probe,T0.sunLights.value=g.state.sun,T0.sunLightShadows.value=g.state.sunShadow,T0.directionalLights.value=g.state.directional,T0.directionalLightShadows.value=g.state.directionalShadow,T0.spotLights.value=g.state.spot,T0.spotLightShadows.value=g.state.spotShadow,T0.rectAreaLights.value=g.state.rectArea,T0.ltc_1.value=g.state.rectAreaLTC1,T0.ltc_2.value=g.state.rectAreaLTC2,T0.pointLights.value=g.state.point,T0.pointLightShadows.value=g.state.pointShadow,T0.hemisphereLights.value=g.state.hemi,T0.sunShadowMatrix.value=g.state.sunShadowMatrix,T0.sunShadowCascade.value=g.state.sunShadowCascade,T0.directionalShadowMatrix.value=g.state.directionalShadowMatrix,T0.spotLightMatrix.value=g.state.spotLightMatrix,T0.spotLightMap.value=g.state.spotLightMap,T0.pointShadowMatrix.value=g.state.pointShadowMatrix;return x.lightProbeGrid=V.state.lightProbeGridArray.length>0,x.currentProgram=i0,x.uniformsList=null,i0}function GJ(N){if(N.uniformsList===null){let S=N.currentProgram.getUniforms();N.uniformsList=rW.seqWithValue(S.seq,N.uniforms)}return N.uniformsList}function YJ(N,S){let m=I.get(N);m.outputColorSpace=S.outputColorSpace,m.batching=S.batching,m.batchingColor=S.batchingColor,m.instancing=S.instancing,m.instancingColor=S.instancingColor,m.instancingMorph=S.instancingMorph,m.skinning=S.skinning,m.morphTargets=S.morphTargets,m.morphNormals=S.morphNormals,m.morphColors=S.morphColors,m.morphTargetsCount=S.morphTargetsCount,m.numClippingPlanes=S.numClippingPlanes,m.numIntersection=S.numClipIntersection,m.vertexAlphas=S.vertexAlphas,m.vertexTangents=S.vertexTangents,m.toneMapping=S.toneMapping}function Z$(N,S){if(N.length===0)return null;if(N.length===1)return N[0].texture!==null?N[0]:null;y.setFromMatrixPosition(S.matrixWorld);for(let m=0,x=N.length;m<x;m++){let g=N[m];if(g.texture!==null&&g.boundingBox.containsPoint(y))return g}return null}function K$(N,S,m,x,g){if(S.isScene!==!0)S=JH;l.resetTextureUnits();let F0=S.fog,w0=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?S.environment:null,N0=p===null?k.outputColorSpace:p.isXRRenderTarget===!0?p.texture.colorSpace:a0.workingColorSpace,V0=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,P0=H0.get(x.envMap||w0,V0),d0=x.vertexColors===!0&&!!m.attributes.color&&m.attributes.color.itemSize===4,i0=!!m.attributes.tangent&&(!!x.normalMap||x.anisotropy>0),T0=!!m.morphAttributes.position,KE=!!m.morphAttributes.normal,vE=!!m.morphAttributes.color,kE=jH;if(x.toneMapped){if(p===null||p.isXRRenderTarget===!0)kE=k.toneMapping}let CE=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,sE=CE!==void 0?CE.length:0,B0=I.get(x),eE=V.state.lights;if(e0===!0){if(UE===!0||N!==s){let OE=N===s&&x.id===J0;Z0.setState(x,N,OE)}}let RE=!1;if(x.version===B0.__version){if(B0.needsLights&&B0.lightsStateVersion!==eE.state.version)RE=!0;else if(B0.outputColorSpace!==N0)RE=!0;else if(g.isBatchedMesh&&B0.batching===!1)RE=!0;else if(!g.isBatchedMesh&&B0.batching===!0)RE=!0;else if(g.isBatchedMesh&&B0.batchingColor===!0&&g._colorsTexture===null)RE=!0;else if(g.isBatchedMesh&&B0.batchingColor===!1&&g._colorsTexture!==null)RE=!0;else if(g.isInstancedMesh&&B0.instancing===!1)RE=!0;else if(!g.isInstancedMesh&&B0.instancing===!0)RE=!0;else if(g.isSkinnedMesh&&B0.skinning===!1)RE=!0;else if(!g.isSkinnedMesh&&B0.skinning===!0)RE=!0;else if(g.isInstancedMesh&&B0.instancingColor===!0&&g.instanceColor===null)RE=!0;else if(g.isInstancedMesh&&B0.instancingColor===!1&&g.instanceColor!==null)RE=!0;else if(g.isInstancedMesh&&B0.instancingMorph===!0&&g.morphTexture===null)RE=!0;else if(g.isInstancedMesh&&B0.instancingMorph===!1&&g.morphTexture!==null)RE=!0;else if(B0.envMap!==P0)RE=!0;else if(x.fog===!0&&B0.fog!==F0)RE=!0;else if(B0.numClippingPlanes!==void 0&&(B0.numClippingPlanes!==Z0.numPlanes||B0.numIntersection!==Z0.numIntersection))RE=!0;else if(B0.vertexAlphas!==d0)RE=!0;else if(B0.vertexTangents!==i0)RE=!0;else if(B0.morphTargets!==T0)RE=!0;else if(B0.morphNormals!==KE)RE=!0;else if(B0.morphColors!==vE)RE=!0;else if(B0.toneMapping!==kE)RE=!0;else if(B0.morphTargetsCount!==sE)RE=!0;else if(!!B0.lightProbeGrid!==V.state.lightProbeGridArray.length>0)RE=!0}else RE=!0,B0.__version=x.version;let qH=B0.currentProgram;if(RE===!0){if(qH=U7(x,S,g),h&&x.isNodeMaterial)h.onUpdateProgram(x,qH,B0)}let fH=!1,Q8=!1,s8=!1,ME=qH.getUniforms(),jE=B0.uniforms;if(O.useProgram(qH.program))fH=!0,Q8=!0,s8=!0;if(x.id!==J0)J0=x.id,Q8=!0;if(B0.needsLights){let OE=Z$(V.state.lightProbeGridArray,g);if(B0.lightProbeGrid!==OE)B0.lightProbeGrid=OE,Q8=!0}if(fH||s!==N){if(O.buffers.depth.getReversed()&&N.reversedDepth!==!0)N._reversedDepth=!0,N.updateProjectionMatrix();ME.setValue(_,"projectionMatrix",N.projectionMatrix),ME.setValue(_,"viewMatrix",N.matrixWorldInverse);let Z8=ME.map.cameraPosition;if(Z8!==void 0)Z8.setValue(_,nE.setFromMatrixPosition(N.matrixWorld));if(zE.logarithmicDepthBuffer)ME.setValue(_,"logDepthBufFC",2/(Math.log(N.far+1)/Math.LN2));if(x.isMeshPhongMaterial||x.isMeshToonMaterial||x.isMeshLambertMaterial||x.isMeshBasicMaterial||x.isMeshStandardMaterial||x.isShaderMaterial)ME.setValue(_,"isOrthographic",N.isOrthographicCamera===!0);if(s!==N)s=N,Q8=!0,s8=!0}if(B0.needsLights){if(eE.state.sunShadowMap.length>0)ME.setValue(_,"sunShadowMap",eE.state.sunShadowMap,l);if(eE.state.directionalShadowMap.length>0)ME.setValue(_,"directionalShadowMap",eE.state.directionalShadowMap,l);if(eE.state.spotShadowMap.length>0)ME.setValue(_,"spotShadowMap",eE.state.spotShadowMap,l);if(eE.state.pointShadowMap.length>0)ME.setValue(_,"pointShadowMap",eE.state.pointShadowMap,l)}if(g.isSkinnedMesh){ME.setOptional(_,g,"bindMatrix"),ME.setOptional(_,g,"bindMatrixInverse");let OE=g.skeleton;if(OE){if(OE.boneTexture===null)OE.computeBoneTexture();ME.setValue(_,"boneTexture",OE.boneTexture,l)}}if(g.isBatchedMesh){if(ME.setOptional(_,g,"batchingTexture"),ME.setValue(_,"batchingTexture",g._matricesTexture,l),ME.setOptional(_,g,"batchingIdTexture"),ME.setValue(_,"batchingIdTexture",g._indirectTexture,l),ME.setOptional(_,g,"batchingColorTexture"),g._colorsTexture!==null)ME.setValue(_,"batchingColorTexture",g._colorsTexture,l)}let $8=m.morphAttributes;if($8.position!==void 0||$8.normal!==void 0||$8.color!==void 0)QE.update(g,m,qH);if(Q8||B0.receiveShadow!==g.receiveShadow)B0.receiveShadow=g.receiveShadow,ME.setValue(_,"receiveShadow",g.receiveShadow);if((x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial)&&x.envMap===null&&S.environment!==null)jE.envMapIntensity.value=S.environmentIntensity;if(jE.dfgLUT!==void 0)jE.dfgLUT.value=D5();if(Q8){if(ME.setValue(_,"toneMappingExposure",k.toneMappingExposure),B0.needsLights)U$(jE,s8);if(F0&&x.fog===!0)L0.refreshFogUniforms(jE,F0);if(L0.refreshMaterialUniforms(jE,x,$0,i,V.state.transmissionRenderTarget[N.id]),B0.needsLights&&B0.lightProbeGrid){let OE=B0.lightProbeGrid;jE.probesSH.value=OE.texture,jE.probesMin.value.copy(OE.boundingBox.min),jE.probesMax.value.copy(OE.boundingBox.max),jE.probesResolution.value.copy(OE.resolution)}rW.upload(_,GJ(B0),jE,l)}if(x.isShaderMaterial&&x.uniformsNeedUpdate===!0)rW.upload(_,GJ(B0),jE,l),x.uniformsNeedUpdate=!1;if(x.isSpriteMaterial)ME.setValue(_,"center",g.center);if(ME.setValue(_,"modelViewMatrix",g.modelViewMatrix),ME.setValue(_,"normalMatrix",g.normalMatrix),ME.setValue(_,"modelMatrix",g.matrixWorld),x.uniformsGroups!==void 0){let OE=x.uniformsGroups;for(let Z8=0,i8=OE.length;Z8<i8;Z8++){let DJ=OE[Z8];O0.update(DJ,qH),O0.bind(DJ,qH)}}return qH}function U$(N,S){N.ambientLightColor.needsUpdate=S,N.lightProbe.needsUpdate=S,N.sunLights.needsUpdate=S,N.sunLightShadows.needsUpdate=S,N.directionalLights.needsUpdate=S,N.directionalLightShadows.needsUpdate=S,N.pointLights.needsUpdate=S,N.pointLightShadows.needsUpdate=S,N.spotLights.needsUpdate=S,N.spotLightShadows.needsUpdate=S,N.rectAreaLights.needsUpdate=S,N.hemisphereLights.needsUpdate=S}function X$(N){return N.isMeshLambertMaterial||N.isMeshToonMaterial||N.isMeshPhongMaterial||N.isMeshStandardMaterial||N.isShadowMaterial||N.isShaderMaterial&&N.lights===!0}this.getActiveCubeFace=function(){return u},this.getActiveMipmapLevel=function(){return a},this.getRenderTarget=function(){return p},this.setRenderTargetTextures=function(N,S,m){let x=I.get(N);if(x.__autoAllocateDepthBuffer=N.resolveDepthBuffer===!1,x.__autoAllocateDepthBuffer===!1)x.__useRenderToTexture=!1;I.get(N.texture).__webglTexture=S,I.get(N.depthTexture).__webglTexture=x.__autoAllocateDepthBuffer?void 0:m,x.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(N,S){let m=I.get(N);m.__webglFramebuffer=S,m.__useDefaultFramebuffer=S===void 0},this.setRenderTarget=function(N,S=0,m=0){p=N,u=S,a=m;let x=null,g=!1,F0=!1;if(N){let N0=I.get(N);if(N0.__useDefaultFramebuffer!==void 0){O.bindFramebuffer(_.FRAMEBUFFER,N0.__webglFramebuffer),t.copy(N.viewport),R0.copy(N.scissor),S0=N.scissorTest,O.viewport(t),O.scissor(R0),O.setScissorTest(S0),J0=-1;return}else if(N0.__webglFramebuffer===void 0)l.setupRenderTarget(N);else if(N0.__hasExternalTextures)l.rebindTextures(N,I.get(N.texture).__webglTexture,I.get(N.depthTexture).__webglTexture);else if(N.depthBuffer){let d0=N.depthTexture;if(N0.__boundDepthTexture!==d0){if(d0!==null&&I.has(d0)&&(N.width!==d0.image.width||N.height!==d0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");l.setupDepthRenderbuffer(N)}}let V0=N.texture;if(V0.isData3DTexture||V0.isDataArrayTexture||V0.isCompressedArrayTexture)F0=!0;let P0=I.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget){if(Array.isArray(P0[S]))x=P0[S][m];else x=P0[S];g=!0}else if(N.samples>0&&l.useMultisampledRTT(N)===!1)x=I.get(N).__webglMultisampledFramebuffer;else if(Array.isArray(P0))x=P0[m];else x=P0;t.copy(N.viewport),R0.copy(N.scissor),S0=N.scissorTest}else t.copy(f0).multiplyScalar($0).floor(),R0.copy(I0).multiplyScalar($0).floor(),S0=xE;if(m!==0)x=v;if(O.bindFramebuffer(_.FRAMEBUFFER,x))O.drawBuffers(N,x);if(O.viewport(t),O.scissor(R0),O.setScissorTest(S0),g){let N0=I.get(N.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_CUBE_MAP_POSITIVE_X+S,N0.__webglTexture,m)}else if(F0){let N0=S;for(let V0=0;V0<N.textures.length;V0++){let P0=I.get(N.textures[V0]);_.framebufferTextureLayer(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0+V0,P0.__webglTexture,m,N0)}}else if(N!==null&&m!==0){let N0=I.get(N.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,N0.__webglTexture,m)}J0=-1};function MJ(N){let S=I.get(N);if(S.__readFormat!==N.format||S.__readType!==N.type)S.__readFormat=N.format,S.__readType=N.type,S.__formatReadable=zE.textureFormatReadable(N.format),S.__typeReadable=zE.textureTypeReadable(N.type);return S}if(this.readRenderTargetPixels=function(N,S,m,x,g,F0,w0,N0=0){if(!(N&&N.isWebGLRenderTarget)){g0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let V0=I.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&w0!==void 0)V0=V0[w0];if(V0){O.bindFramebuffer(_.FRAMEBUFFER,V0);try{let P0=N.textures[N0],d0=P0.format,i0=P0.type;if(N.textures.length>1)_.readBuffer(_.COLOR_ATTACHMENT0+N0);let T0=MJ(P0);if(T0.__formatReadable===!1){g0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(T0.__typeReadable===!1){g0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(S>=0&&S<=N.width-x&&(m>=0&&m<=N.height-g))_.readPixels(S,m,x,g,o.convert(d0),o.convert(i0),F0)}finally{let P0=p!==null?I.get(p).__webglFramebuffer:null;O.bindFramebuffer(_.FRAMEBUFFER,P0)}}},this.readRenderTargetPixelsAsync=async function(N,S,m,x,g,F0,w0,N0=0){if(!(N&&N.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let V0=I.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&w0!==void 0)V0=V0[w0];if(V0)if(S>=0&&S<=N.width-x&&(m>=0&&m<=N.height-g)){O.bindFramebuffer(_.FRAMEBUFFER,V0);let P0=N.textures[N0],d0=P0.format,i0=P0.type;if(N.textures.length>1)_.readBuffer(_.COLOR_ATTACHMENT0+N0);let T0=MJ(P0);if(T0.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(T0.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let KE=_.createBuffer();_.bindBuffer(_.PIXEL_PACK_BUFFER,KE),_.bufferData(_.PIXEL_PACK_BUFFER,F0.byteLength,_.STREAM_READ),_.readPixels(S,m,x,g,o.convert(d0),o.convert(i0),0),_.bindBuffer(_.PIXEL_PACK_BUFFER,null);let vE=p!==null?I.get(p).__webglFramebuffer:null;O.bindFramebuffer(_.FRAMEBUFFER,vE);let kE=_.fenceSync(_.SYNC_GPU_COMMANDS_COMPLETE,0);return _.flush(),await e1(_,kE,4),_.bindBuffer(_.PIXEL_PACK_BUFFER,KE),_.getBufferSubData(_.PIXEL_PACK_BUFFER,0,F0),_.bindBuffer(_.PIXEL_PACK_BUFFER,null),_.deleteBuffer(KE),_.deleteSync(kE),F0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(N,S=null,m=0){let x=Math.pow(2,-m),g=Math.floor(N.image.width*x),F0=Math.floor(N.image.height*x),w0=S!==null?S.x:0,N0=S!==null?S.y:0;l.setTexture2D(N,0),_.copyTexSubImage2D(_.TEXTURE_2D,m,0,0,w0,N0,g,F0),O.unbindTexture()},this.copyTextureToTexture=function(N,S,m=null,x=null,g=0,F0=0){let w0,N0,V0,P0,d0,i0,T0,KE,vE,kE=N.isCompressedTexture?N.mipmaps[F0]:N.image;if(m!==null)w0=m.max.x-m.min.x,N0=m.max.y-m.min.y,V0=m.isBox3?m.max.z-m.min.z:1,P0=m.min.x,d0=m.min.y,i0=m.isBox3?m.min.z:0;else{let jE=Math.pow(2,-g);if(w0=Math.floor(kE.width*jE),N0=Math.floor(kE.height*jE),N.isDataArrayTexture)V0=kE.depth;else if(N.isData3DTexture)V0=Math.floor(kE.depth*jE);else V0=1;P0=0,d0=0,i0=0}if(x!==null)T0=x.x,KE=x.y,vE=x.z;else T0=0,KE=0,vE=0;let CE=o.convert(S.format),sE=o.convert(S.type),B0;if(S.isData3DTexture)l.setTexture3D(S,0),B0=_.TEXTURE_3D;else if(S.isDataArrayTexture||S.isCompressedArrayTexture)l.setTexture2DArray(S,0),B0=_.TEXTURE_2D_ARRAY;else l.setTexture2D(S,0),B0=_.TEXTURE_2D;O.activeTexture(_.TEXTURE0),O.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,S.flipY),O.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),O.pixelStorei(_.UNPACK_ALIGNMENT,S.unpackAlignment);let eE=O.getParameter(_.UNPACK_ROW_LENGTH),RE=O.getParameter(_.UNPACK_IMAGE_HEIGHT),qH=O.getParameter(_.UNPACK_SKIP_PIXELS),fH=O.getParameter(_.UNPACK_SKIP_ROWS),Q8=O.getParameter(_.UNPACK_SKIP_IMAGES);O.pixelStorei(_.UNPACK_ROW_LENGTH,kE.width),O.pixelStorei(_.UNPACK_IMAGE_HEIGHT,kE.height),O.pixelStorei(_.UNPACK_SKIP_PIXELS,P0),O.pixelStorei(_.UNPACK_SKIP_ROWS,d0),O.pixelStorei(_.UNPACK_SKIP_IMAGES,i0);let s8=N.isDataArrayTexture||N.isData3DTexture,ME=S.isDataArrayTexture||S.isData3DTexture;if(N.isDepthTexture){let jE=I.get(N),$8=I.get(S),OE=I.get(jE.__renderTarget),Z8=I.get($8.__renderTarget);O.bindFramebuffer(_.READ_FRAMEBUFFER,OE.__webglFramebuffer),O.bindFramebuffer(_.DRAW_FRAMEBUFFER,Z8.__webglFramebuffer);for(let i8=0;i8<V0;i8++){if(s8)_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,I.get(N).__webglTexture,g,i0+i8),_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,I.get(S).__webglTexture,F0,vE+i8);_.blitFramebuffer(P0,d0,w0,N0,T0,KE,w0,N0,_.DEPTH_BUFFER_BIT,_.NEAREST)}O.bindFramebuffer(_.READ_FRAMEBUFFER,null),O.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else if(g!==0||N.isRenderTargetTexture||I.has(N)){let jE=I.get(N),$8=I.get(S);O.bindFramebuffer(_.READ_FRAMEBUFFER,d),O.bindFramebuffer(_.DRAW_FRAMEBUFFER,z);for(let OE=0;OE<V0;OE++){if(s8)_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,jE.__webglTexture,g,i0+OE);else _.framebufferTexture2D(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,jE.__webglTexture,g);if(ME)_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,$8.__webglTexture,F0,vE+OE);else _.framebufferTexture2D(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,$8.__webglTexture,F0);if(g!==0)_.blitFramebuffer(P0,d0,w0,N0,T0,KE,w0,N0,_.COLOR_BUFFER_BIT,_.NEAREST);else if(ME)_.copyTexSubImage3D(B0,F0,T0,KE,vE+OE,P0,d0,w0,N0);else _.copyTexSubImage2D(B0,F0,T0,KE,P0,d0,w0,N0)}O.bindFramebuffer(_.READ_FRAMEBUFFER,null),O.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else if(ME)if(N.isDataTexture||N.isData3DTexture)_.texSubImage3D(B0,F0,T0,KE,vE,w0,N0,V0,CE,sE,kE.data);else if(S.isCompressedArrayTexture)_.compressedTexSubImage3D(B0,F0,T0,KE,vE,w0,N0,V0,CE,kE.data);else _.texSubImage3D(B0,F0,T0,KE,vE,w0,N0,V0,CE,sE,kE);else if(N.isDataTexture)_.texSubImage2D(_.TEXTURE_2D,F0,T0,KE,w0,N0,CE,sE,kE.data);else if(N.isCompressedTexture)_.compressedTexSubImage2D(_.TEXTURE_2D,F0,T0,KE,kE.width,kE.height,CE,kE.data);else _.texSubImage2D(_.TEXTURE_2D,F0,T0,KE,w0,N0,CE,sE,kE);if(O.pixelStorei(_.UNPACK_ROW_LENGTH,eE),O.pixelStorei(_.UNPACK_IMAGE_HEIGHT,RE),O.pixelStorei(_.UNPACK_SKIP_PIXELS,qH),O.pixelStorei(_.UNPACK_SKIP_ROWS,fH),O.pixelStorei(_.UNPACK_SKIP_IMAGES,Q8),F0===0&&S.generateMipmaps)_.generateMipmap(B0);O.unbindTexture()},this.initRenderTarget=function(N){if(I.get(N).__webglFramebuffer===void 0)l.setupRenderTarget(N)},this.initTexture=function(N){if(N.isCubeTexture)l.setTextureCube(N,0);else if(N.isData3DTexture)l.setTexture3D(N,0);else if(N.isDataArrayTexture||N.isCompressedArrayTexture)l.setTexture2DArray(N,0);else l.setTexture2D(N,0);O.unbindTexture()},this.resetState=function(){u=0,a=0,p=null,O.reset(),Y0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return u9}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(E){this._outputColorSpace=E;let H=this.getContext();H.drawingBufferColorSpace=a0._getDrawingBufferColorSpace(E),H.unpackColorSpace=a0._getUnpackColorSpace()}}var G6=new e(16777215);class CH{geometry;positions;positionAttribute;colors;colorAttribute;cursor=0;constructor(E,H,W=!1){this.geometry=E;if(this.positions=new Float32Array(H),this.positionAttribute=new hE(this.positions,3),this.positionAttribute.setUsage(VH),this.geometry.setAttribute("position",this.positionAttribute),this.geometry.boundingSphere=new TH(new b(b0*0.5,x0*0.5,0),Math.hypot(b0,x0)),W)this.colors=new Float32Array(H),this.colorAttribute=new hE(this.colors,3),this.colorAttribute.setUsage(VH),this.geometry.setAttribute("color",this.colorAttribute)}reset(){this.cursor=0}point(E,H=G6){if(this.cursor+3>this.positions.length)return;if(this.positions[this.cursor]=E.x,this.positions[this.cursor+1]=E.y,this.positions[this.cursor+2]=0,this.colors)this.colors[this.cursor]=H.r,this.colors[this.cursor+1]=H.g,this.colors[this.cursor+2]=H.b;this.cursor+=3}triangle(E,H,W,R=G6){this.point(E,R),this.point(H,R),this.point(W,R)}line(E,H,W=G6){this.point(E,W),this.point(H,W)}circle(E,H,W=G6,R=8){for(let J=0;J<R;J+=1){let Q=J/R*Math.PI*2,$=(J+1)/R*Math.PI*2;this.triangle(E,{x:E.x+Math.cos(Q)*H,y:E.y+Math.sin(Q)*H},{x:E.x+Math.cos($)*H,y:E.y+Math.sin($)*H},W)}}commit(){if(this.geometry.setDrawRange(0,this.cursor/3),this.positionAttribute.clearUpdateRanges(),this.positionAttribute.addUpdateRange(0,this.cursor),this.positionAttribute.needsUpdate=!0,this.colorAttribute)this.colorAttribute.clearUpdateRanges(),this.colorAttribute.addUpdateRange(0,this.cursor),this.colorAttribute.needsUpdate=!0}}var AR=k0.palettes.map((E)=>({wing:new e(E.wing),wingLight:new e(E.wingLight),accent:new e(E.accent),body:new e(E.body)})),IR=new e(k0.shadow.color);function C5(E){return Math.hypot(E.x,E.y)}function _R(E,H){let W=C5(E);return W>0.0001?{x:E.x/W,y:E.y/W}:H}class SR{shadowGroup=new dE;group=new dE;shadowGeometry=new WE;shapeGeometry=new WE;lineGeometry=new WE;shadowBatch=new CH(this.shadowGeometry,4096);shapeBatch=new CH(this.shapeGeometry,8192,!0);lineBatch=new CH(this.lineGeometry,1024,!0);shadowMaterial=new bE({color:k0.shadow.color,opacity:k0.shadow.opacity,transparent:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1});butterflies=[];lastTime=-1;constructor(){this.butterflies=this.createButterflies(),this.shadowGeometry.name="butterfly shadows",this.shapeGeometry.name="butterflies",this.lineGeometry.name="butterfly antennae";let E=new bE({vertexColors:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1}),H=new R8({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),W=new s0(this.shadowGeometry,this.shadowMaterial),R=new s0(this.shapeGeometry,E),J=new N8(this.lineGeometry,H);W.frustumCulled=!1,R.frustumCulled=!1,J.frustumCulled=!1,W.renderOrder=4,R.renderOrder=10,J.renderOrder=11,this.shadowGroup.add(W),this.group.add(R,J),this.refreshConfig()}refreshConfig(E=!1){this.shadowMaterial.color.setHex(k0.shadow.color),this.shadowMaterial.opacity=k0.shadow.opacity,IR.setHex(k0.shadow.color);for(let[W,R]of k0.palettes.entries()){let J=AR[W];if(!J)continue;J.wing.setHex(R.wing),J.wingLight.setHex(R.wingLight),J.accent.setHex(R.accent),J.body.setHex(R.body)}let H=this.butterflies;if(this.butterflies=this.createButterflies(),E)for(let[W,R]of this.butterflies.entries()){let J=H[W];if(J)Object.assign(R,J)}else this.lastTime=-1}resize(E,H){for(let W of this.butterflies)W.position.x*=E,W.position.y*=H,W.wanderTarget.x*=E,W.wanderTarget.y*=H}createButterflies(){return IJ.map((E,H)=>{let W=(2654435769^(H+1)*2246822507)>>>0,R=sH(E.x,E.y),J={position:{...R},velocity:{x:Math.cos(E.phase)*k0.minimumSpeed,y:Math.sin(E.phase)*k0.minimumSpeed},wanderTarget:{...R},restOffset:{x:0,y:0},state:"wander",stateAge:0,stateDuration:0,flowerIndex:0,orbitAngle:E.phase,orbitRadius:k0.flowerOrbitRadius[0],orbitSpeed:k0.flowerOrbitSpeed[0],orbitDirection:H%2===0?1:-1,cruiseSpeed:k0.minimumSpeed,flapSpeed:k0.flapSpeed[0],turnAngle:0,turnTarget:0,turnTimer:0,curveFrequency:k0.curvedFlightFrequency[0],speedPhase:E.phase*1.73,phase:E.phase,palette:E.palette,randomState:W};return this.beginWander(J),J.stateAge=this.random(J)*J.stateDuration,J})}update(E){let H=this.lastTime<0?0:Math.min(0.05,Math.max(0,E-this.lastTime));this.lastTime=E,this.shadowBatch.reset(),this.shapeBatch.reset(),this.lineBatch.reset();let W=Math.min(k0.visibleCount,this.butterflies.length);for(let R=0;R<W;R+=1){let J=this.butterflies[R];this.moveButterfly(J,E,H),this.drawButterfly(J,E)}this.shadowBatch.commit(),this.shapeBatch.commit(),this.lineBatch.commit()}moveButterfly(E,H,W){if(E.stateAge+=W,E.stateAge>=E.stateDuration)this.advanceState(E);if(E.turnTimer-=W,E.turnTimer<=0)this.chooseTurn(E);let{wanderTarget:R,cruiseSpeed:J}=E;if(E.state==="approach"){if(R=this.flowerPosition(E.flowerIndex,H),J=k0.flowerApproachSpeed,this.distance(E.position,R)<k0.flowerArrivalRadius)this.beginOrbit(E)}else if(E.state==="orbit"){E.orbitAngle+=E.orbitSpeed*E.orbitDirection*W;let T=this.flowerPosition(E.flowerIndex,H);R={x:T.x+Math.cos(E.orbitAngle)*E.orbitRadius,y:T.y+Math.sin(E.orbitAngle)*E.orbitRadius},J=E.cruiseSpeed*0.72}else if(E.state==="rest"){let T=this.flowerPosition(E.flowerIndex,H);R={x:T.x+E.restOffset.x,y:T.y+E.restOffset.y},J=E.cruiseSpeed*0.12}else if(this.distance(E.position,R)<12)this.chooseWanderTarget(E),R=E.wanderTarget;let Q=_R({x:R.x-E.position.x,y:R.y-E.position.y},_R(E.velocity,{x:1,y:0})),$=E.state==="wander"?1:E.state==="approach"?0.32:E.state==="orbit"?0.12:0,Z=Math.min(1,k0.turnSmoothing*W);E.turnAngle+=(E.turnTarget-E.turnAngle)*Z;let K=(Math.sin(H*E.curveFrequency+E.phase)+Math.sin(H*E.curveFrequency*2.17+E.phase*2.3)*0.38)*k0.curvedFlightStrength*$,U=E.turnAngle*$+K,X=Math.cos(U),Y=Math.sin(U),G={x:Q.x*X-Q.y*Y,y:Q.x*Y+Q.y*X},D=Math.sin(H*1.45+E.phase)*k0.driftAmount*$,F=E.state==="rest"?1:1+k0.speedVariation*(Math.sin(H*0.73+E.speedPhase)*0.68+Math.sin(H*1.91+E.speedPhase*1.4)*0.32);J*=F;let w={x:G.x*J-G.y*D,y:G.y*J+G.x*D},C=Math.min(1,k0.turnResponsiveness*W);E.velocity.x+=(w.x-E.velocity.x)*C,E.velocity.y+=(w.y-E.velocity.y)*C,E.position.x+=E.velocity.x*W,E.position.y+=E.velocity.y*W;let M=k0.edgeMargin;if(E.position.x<M||E.position.x>b0-M)E.position.x=Math.max(M,Math.min(b0-M,E.position.x)),E.velocity.x*=-0.6,this.chooseWanderTarget(E);if(E.position.y<M||E.position.y>x0-M)E.position.y=Math.max(M,Math.min(x0-M,E.position.y)),E.velocity.y*=-0.6,this.chooseWanderTarget(E)}advanceState(E){if(E.state==="wander")if(this.visibleFlowerCount()>0&&this.random(E)<k0.flowerVisitChance)this.beginApproach(E);else this.beginWander(E);else if(E.state==="approach")this.beginWander(E);else if(E.state==="orbit")this.beginRest(E);else this.beginWander(E)}beginWander(E){E.state="wander",E.stateAge=0,E.stateDuration=this.randomRange(E,k0.wanderDuration),E.cruiseSpeed=this.randomRange(E,[k0.minimumSpeed,k0.maximumSpeed]),E.flapSpeed=this.randomRange(E,k0.flapSpeed),E.curveFrequency=this.randomRange(E,k0.curvedFlightFrequency),this.chooseWanderTarget(E)}beginApproach(E){E.state="approach",E.stateAge=0,E.stateDuration=8,E.flowerIndex=Math.floor(this.random(E)*this.visibleFlowerCount())}beginOrbit(E){E.state="orbit",E.stateAge=0,E.stateDuration=this.randomRange(E,k0.flowerVisitDuration),E.orbitRadius=this.randomRange(E,k0.flowerOrbitRadius),E.orbitSpeed=this.randomRange(E,k0.flowerOrbitSpeed),E.orbitDirection=this.random(E)<0.5?-1:1}beginRest(E){E.state="rest",E.stateAge=0,E.stateDuration=this.randomRange(E,k0.flowerRestDuration);let H=this.random(E)*Math.PI*2,W=this.random(E)*2.4;E.restOffset={x:Math.cos(H)*W,y:Math.sin(H)*W}}chooseWanderTarget(E){let H=k0.edgeMargin,R=Math.atan2(E.velocity.y,E.velocity.x)+(this.random(E)-0.5)*k0.wanderTargetTurnRange,J=this.randomRange(E,k0.wanderTargetDistance);E.wanderTarget={x:Math.max(H,Math.min(b0-H,E.position.x+Math.cos(R)*J)),y:Math.max(H,Math.min(x0-H,E.position.y+Math.sin(R)*J))}}chooseTurn(E){E.turnTimer=this.randomRange(E,k0.randomTurnInterval);let W=this.random(E)<k0.sharpTurnChance?k0.sharpTurnAngle:k0.randomTurnAngle;E.turnTarget=(this.random(E)*2-1)*W}visibleFlowerCount(){return _W.slice(0,r0.visibleFlowerCount).filter((E)=>E.leafIndex<r0.visibleLeafCount).length}flowerPosition(E,H){let W=_W.slice(0,r0.visibleFlowerCount).filter(($)=>$.leafIndex<r0.visibleLeafCount),R=W[Math.min(E,W.length-1)];if(!R)return{x:b0*0.5,y:x0*0.5};let J=G7[R.leafIndex],Q=sH(J.x,J.y);return{x:Q.x+Math.sin(H*0.12+J.phase)*r0.driftX+R.offsetX,y:Q.y+Math.cos(H*0.15+J.phase*1.3)*r0.driftY+R.offsetY}}drawButterfly(E,H){let W=AR[E.palette%AR.length],R=_R(E.velocity,{x:Math.cos(E.phase),y:Math.sin(E.phase)}),J={x:-R.y,y:R.x},$=E.state==="rest"?0.2:0.3+Math.abs(Math.sin(H*E.flapSpeed+E.phase))*0.7,Z=k0.wingWidth*(0.28+$*0.72);this.drawWings(this.shadowBatch,{x:E.position.x+k0.shadow.offset.x,y:E.position.y+k0.shadow.offset.y},R,J,k0.wingLength*k0.shadow.scale,Z*k0.shadow.scale,IR,IR),this.drawWings(this.shapeBatch,E.position,R,J,k0.wingLength,Z,W.wing,W.wingLight);let K={x:E.position.x+R.x*k0.bodyLength*0.58,y:E.position.y+R.y*k0.bodyLength*0.58},U={x:E.position.x-R.x*k0.bodyLength*0.58,y:E.position.y-R.y*k0.bodyLength*0.58},X={x:J.x*k0.bodyWidth,y:J.y*k0.bodyWidth};this.shapeBatch.triangle({x:K.x+X.x,y:K.y+X.y},{x:K.x-X.x,y:K.y-X.y},{x:U.x-X.x,y:U.y-X.y},W.body),this.shapeBatch.triangle({x:K.x+X.x,y:K.y+X.y},{x:U.x-X.x,y:U.y-X.y},{x:U.x+X.x,y:U.y+X.y},W.body),this.shapeBatch.circle(K,k0.headRadius,W.body,6);let Y=Z*0.68;for(let D of[-1,1])this.shapeBatch.circle({x:E.position.x+J.x*Y*D-R.x*k0.wingLength*0.08,y:E.position.y+J.y*Y*D-R.y*k0.wingLength*0.08},k0.wingSpotRadius,W.accent,5);let G={x:K.x+R.x*k0.headRadius*0.4,y:K.y+R.y*k0.headRadius*0.4};for(let D of[-1,1])this.lineBatch.line(G,{x:G.x+R.x*2+J.x*D*0.95,y:G.y+R.y*2+J.y*D*0.95},W.body)}drawWings(E,H,W,R,J,Q,$,Z){for(let K of[-1,1]){let U={x:H.x+W.x*J*0.2,y:H.y+W.y*J*0.2},X={x:H.x+R.x*Q*K+W.x*J*0.42,y:H.y+R.y*Q*K+W.y*J*0.42},Y={x:H.x+R.x*Q*0.82*K-W.x*J*0.48,y:H.y+R.y*Q*0.82*K-W.y*J*0.48},G={x:H.x-W.x*J*0.68,y:H.y-W.y*J*0.68};E.triangle(U,X,Y,Z),E.triangle(U,Y,G,$)}}distance(E,H){return Math.hypot(E.x-H.x,E.y-H.y)}random(E){return E.randomState=Math.imul(E.randomState,1664525)+1013904223>>>0,E.randomState/4294967296}randomRange(E,H){return H[0]+this.random(E)*(H[1]-H[0])}}var jR=yE.palettes.map((E)=>({base:new e(E.base),light:new e(E.light),shade:new e(E.shade),center:new e(E.center)}));function c8(E){let H=Math.sin(E*12.9898+78.233)*43758.5453;return H-Math.floor(H)}class yR{shadowGroup=new dE;group=new dE;shadowGeometry=new WE;leafGeometry=new WE;detailGeometry=new WE;shadowMaterial=new bE({color:yE.shadow.color,opacity:yE.shadow.opacity,transparent:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1});shadowBatch=new CH(this.shadowGeometry,120000);leafBatch=new CH(this.leafGeometry,120000,!0);detailBatch=new CH(this.detailGeometry,32000,!0);leaves;constructor(){this.leaves=this.createLeaves(),this.shadowGeometry.name="duckweed shadows",this.leafGeometry.name="duckweed leaves",this.detailGeometry.name="duckweed highlights";let E=new bE({vertexColors:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1}),H=new s0(this.shadowGeometry,this.shadowMaterial),W=new s0(this.leafGeometry,E),R=new s0(this.detailGeometry,E);H.frustumCulled=!1,W.frustumCulled=!1,R.frustumCulled=!1,H.renderOrder=0,W.renderOrder=0,R.renderOrder=1,this.shadowGroup.add(H),this.group.add(W,R),this.refreshConfig()}refreshConfig(){this.shadowMaterial.color.setHex(yE.shadow.color),this.shadowMaterial.opacity=yE.shadow.opacity;for(let[E,H]of yE.palettes.entries()){let W=jR[E];if(!W)continue;W.base.setHex(H.base),W.light.setHex(H.light),W.shade.setHex(H.shade),W.center.setHex(H.center)}this.leaves=this.createLeaves()}update(E){this.shadowBatch.reset(),this.leafBatch.reset(),this.detailBatch.reset();let H=Math.min(yE.visiblePatchCount,Y7.length);for(let W of this.leaves){if(W.patchIndex>=H)continue;let R=Y7[W.patchIndex],J=Math.sin(E*0.1+R.phase)*yE.driftX,Q=Math.cos(E*0.13+R.phase*1.4)*yE.driftY,$=Math.sin(E*0.075+R.phase)*yE.rotationAmount,Z=Math.cos($),K=Math.sin($),U=sH(R.x,R.y),X={x:U.x+W.offsetX*Z-W.offsetY*K+J,y:U.y+W.offsetX*K+W.offsetY*Z+Q},Y=W.angle+$,G=1+Math.sin(E*0.16+W.phase)*0.018,D=W.radius*G,F=jR[R.palette%jR.length],w=W.tone<0.24?F.light:W.tone>0.82?F.shade:F.base;if(this.drawLeaf(this.shadowBatch,{x:X.x+yE.shadow.offset.x,y:X.y+yE.shadow.offset.y},D,Y,void 0),this.drawLeaf(this.leafBatch,X,D,Y,w),D>1.55){let C={x:X.x-Math.cos(Y)*D*0.18,y:X.y-Math.sin(Y)*D*0.18};this.detailBatch.circle(C,Math.max(0.22,D*0.14),F.center,5)}if(W.paired){let C={x:X.x+Math.cos(Y+0.8)*D*0.92,y:X.y+Math.sin(Y+0.8)*D*0.92},M=D*0.72;this.drawLeaf(this.shadowBatch,{x:C.x+yE.shadow.offset.x,y:C.y+yE.shadow.offset.y},M,Y+1.15,void 0),this.drawLeaf(this.leafBatch,C,M,Y+1.15,F.light)}}this.shadowBatch.commit(),this.leafBatch.commit(),this.detailBatch.commit()}createLeaves(){let E=[];for(let[H,W]of Y7.entries())for(let R=0;R<W.count;R+=1){let J=H*1013+R*37+11,Q=Math.pow(c8(J+1),yE.spreadExponent),$=W.radius*Q,Z=c8(J+2)*Math.PI*2;E.push({patchIndex:H,offsetX:Math.cos(Z)*$,offsetY:Math.sin(Z)*$*0.74,radius:yE.minimumLeafRadius+c8(J+3)*(yE.maximumLeafRadius-yE.minimumLeafRadius),angle:c8(J+4)*Math.PI*2,phase:c8(J+5)*Math.PI*2,tone:c8(J+6),paired:c8(J+7)<yE.pairChance})}return E}drawLeaf(E,H,W,R,J){for(let $=0;$<7;$+=1){let Z=$/7*Math.PI*2,K=($+1)/7*Math.PI*2;E.triangle(H,this.ellipsePoint(H,W,R,Z),this.ellipsePoint(H,W,R,K),J)}}ellipsePoint(E,H,W,R){let J=Math.cos(R)*H,Q=Math.sin(R)*H*yE.verticalScale,$=Math.cos(W),Z=Math.sin(W);return{x:E.x+J*$-Q*Z,y:E.y+J*Z+Q*$}}}var tW=(E)=>{let H=E%IW.length,W=IW[H];return{pattern:H,base:new e(W.base),accent:new e(W.accent),marking:new e(W.marking),fin:new e(W.fin),eye:new e(K0.eyeColor)}},lQ=(E)=>AJ[E.pattern];var W7=Math.PI*2,hR=new e(16777215),eW=r0.leafPalettes.map((E)=>({base:new e(E.base),light:new e(E.light),shade:new e(E.shade),vein:new e(E.vein),center:new e(E.center)})),E7=r0.flowerPalettes.map((E)=>({outerPetal:new e(E.outerPetal),innerPetal:new e(E.innerPetal),petalLight:new e(E.petalLight),center:new e(E.center),centerDark:new e(E.centerDark)}));class H7{positions;positionAttribute;colors;colorAttribute;cursor=0;constructor(E,H,W){if(this.positions=new Float32Array(H),this.positionAttribute=new hE(this.positions,3),this.positionAttribute.setUsage(VH),E.setAttribute("position",this.positionAttribute),E.boundingSphere=new TH(new b(b0*0.5,x0*0.5,0),Math.hypot(b0,x0)),W)this.colors=new Float32Array(H),this.colorAttribute=new hE(this.colors,3),this.colorAttribute.setUsage(VH),E.setAttribute("color",this.colorAttribute)}reset(){this.cursor=0}point(E,H=hR){if(this.cursor+3>this.positions.length)return;if(this.positions[this.cursor]=E.x,this.positions[this.cursor+1]=E.y,this.positions[this.cursor+2]=0,this.colors)this.colors[this.cursor]=H.r,this.colors[this.cursor+1]=H.g,this.colors[this.cursor+2]=H.b;this.cursor+=3}triangle(E,H,W,R=hR){this.point(E,R),this.point(H,R),this.point(W,R)}triangleColors(E,H,W,R,J,Q){this.point(E,R),this.point(H,J),this.point(W,Q)}line(E,H,W){this.point(E,W),this.point(H,W)}circle(E,H,W){for(let R=0;R<8;R+=1){let J=R/8*W7,Q=(R+1)/8*W7;this.triangle(E,{x:E.x+Math.cos(J)*H,y:E.y+Math.sin(J)*H},{x:E.x+Math.cos(Q)*H,y:E.y+Math.sin(Q)*H},W)}}commit(E){if(E.setDrawRange(0,this.cursor/3),this.positionAttribute.clearUpdateRanges(),this.positionAttribute.addUpdateRange(0,this.cursor),this.positionAttribute.needsUpdate=!0,this.colorAttribute)this.colorAttribute.clearUpdateRanges(),this.colorAttribute.addUpdateRange(0,this.cursor),this.colorAttribute.needsUpdate=!0}}class vR{shadowGroup=new dE;group=new dE;shadowGeometry=new WE;leafGeometry=new WE;veinGeometry=new WE;flowerGeometry=new WE;leafCenterColor=new e;leafEdgeColorA=new e;leafEdgeColorB=new e;shadowMaterial=new bE({color:r0.shadow.color,opacity:r0.shadow.opacity,transparent:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1});shadowBatch=new H7(this.shadowGeometry,20000,!1);leafBatch=new H7(this.leafGeometry,20000,!0);veinBatch=new H7(this.veinGeometry,8000,!0);flowerBatch=new H7(this.flowerGeometry,1e4,!0);constructor(){this.shadowGeometry.name="lotus shadows",this.leafGeometry.name="lotus leaves",this.veinGeometry.name="lotus veins",this.flowerGeometry.name="lotus flowers";let E=new bE({vertexColors:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1}),H=new R8({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),W=new bE({vertexColors:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1}),R=new s0(this.shadowGeometry,this.shadowMaterial),J=new s0(this.leafGeometry,E),Q=new N8(this.veinGeometry,H),$=new s0(this.flowerGeometry,W);R.frustumCulled=!1,J.frustumCulled=!1,Q.frustumCulled=!1,$.frustumCulled=!1,J.renderOrder=1,Q.renderOrder=2,$.renderOrder=3,this.shadowGroup.add(R),this.group.add(J,Q,$),this.refreshConfig()}refreshConfig(){this.shadowMaterial.color.setHex(r0.shadow.color),this.shadowMaterial.opacity=r0.shadow.opacity;for(let[E,H]of r0.leafPalettes.entries()){let W=eW[E];if(!W)continue;W.base.setHex(H.base),W.light.setHex(H.light),W.shade.setHex(H.shade),W.vein.setHex(H.vein),W.center.setHex(H.center)}for(let[E,H]of r0.flowerPalettes.entries()){let W=E7[E];if(!W)continue;W.outerPetal.setHex(H.outerPetal),W.innerPetal.setHex(H.innerPetal),W.petalLight.setHex(H.petalLight),W.center.setHex(H.center),W.centerDark.setHex(H.centerDark)}}update(E){this.shadowBatch.reset(),this.leafBatch.reset(),this.veinBatch.reset(),this.flowerBatch.reset();let H=G7.slice(0,r0.visibleLeafCount),W=_W.slice(0,r0.visibleFlowerCount);for(let[R,J]of H.entries()){let Q=sH(J.x,J.y),$={x:Q.x+Math.sin(E*0.12+J.phase)*r0.driftX,y:Q.y+Math.cos(E*0.15+J.phase*1.3)*r0.driftY},Z=J.angle+Math.sin(E*0.085+J.phase)*r0.rotationAmount,K=J.radius*r0.radiusScale*(1+Math.sin(E*0.11+J.phase)*0.012),U=eW[(J.palette%eW.length+eW.length)%eW.length];this.drawLeaf(this.shadowBatch,{x:$.x+r0.shadow.offset.x,y:$.y+r0.shadow.offset.y},K*1.02,Z,J.phase),this.drawLeaf(this.leafBatch,$,K,Z,J.phase,U),this.drawVeins($,K,Z,J.phase,U);for(let X of W){if(X.leafIndex!==R)continue;this.drawFlower({x:$.x+X.offsetX,y:$.y+X.offsetY},X.radius*r0.flowerRadiusScale,X.rotation+Math.sin(E*0.12+J.phase)*0.04,E7[(X.palette%E7.length+E7.length)%E7.length])}}this.shadowBatch.commit(this.shadowGeometry),this.leafBatch.commit(this.leafGeometry),this.veinBatch.commit(this.veinGeometry),this.flowerBatch.commit(this.flowerGeometry)}edgePoint(E,H,W,R){let J=1+Math.sin(W*3+R)*0.035+Math.cos(W*5-R)*0.025;return{x:E.x+Math.cos(W)*H*J,y:E.y+Math.sin(W)*H*r0.verticalScale*J}}drawLeaf(E,H,W,R,J,Q){let $=R+r0.notchHalfAngle,Z=W7-r0.notchHalfAngle*2;if(Q)this.leafCenterColor.copy(Q.center);for(let K=0;K<r0.leafSegments;K+=1){let U=$+K/r0.leafSegments*Z,X=$+(K+1)/r0.leafSegments*Z;if(Q){this.leafColorAt(this.leafEdgeColorA,Q,U,J),this.leafColorAt(this.leafEdgeColorB,Q,X,J),E.triangleColors(H,this.edgePoint(H,W,U,J),this.edgePoint(H,W,X,J),this.leafCenterColor,this.leafEdgeColorA,this.leafEdgeColorB);continue}E.triangle(H,this.edgePoint(H,W,U,J),this.edgePoint(H,W,X,J),hR)}}leafColorAt(E,H,W,R){let J=0.5+Math.cos(W+2.2)*0.42,Q=Math.sin(W*3+R*0.7)*0.045,$=Math.max(0,Math.min(1,J+Q));if($<0.5){E.copy(H.shade).lerp(H.base,$*2);return}E.copy(H.base).lerp(H.light,($-0.5)*2)}drawVeins(E,H,W,R,J){let Q=W+r0.notchHalfAngle,$=W7-r0.notchHalfAngle*2;for(let Z=1;Z<=r0.veinCount;Z+=1){let K=Q+Z/(r0.veinCount+1)*$;this.veinBatch.line(E,this.edgePoint(E,H*0.68,K,R),J.vein)}this.leafBatch.circle(E,Math.max(1,H*0.075),J.center)}drawFlower(E,H,W,R){let J=(Q,$,Z,K,U,X)=>{for(let Y=0;Y<Q;Y+=1){let G=W+K+Y/Q*W7,D={x:Math.cos(G),y:Math.sin(G)},F={x:-D.y,y:D.x},w={x:E.x+D.x*H*0.12,y:E.y+D.y*H*0.12},C={x:E.x+D.x*H*$,y:E.y+D.y*H*$},M=H*Z,T=Y%3===0?X:U;this.flowerBatch.triangle({x:w.x+F.x*M,y:w.y+F.y*M},C,{x:w.x-F.x*M,y:w.y-F.y*M},T)}};J(8,1,0.22,0,R.outerPetal,R.petalLight),J(6,0.66,0.19,Math.PI/6,R.innerPetal,R.petalLight),this.flowerBatch.circle(E,H*0.28,R.centerDark),this.flowerBatch.circle(E,H*0.18,R.center)}}var DE=(E=0,H=0)=>({x:E,y:H}),Q0=(E,H)=>({x:E.x+H.x,y:E.y+H.y}),BE=(E,H)=>({x:E.x-H.x,y:E.y-H.y}),W0=(E,H)=>({x:E.x*H,y:E.y*H}),R7=(E,H,W)=>Q0(E,W0(BE(H,E),W)),dH=(E)=>Math.hypot(E.x,E.y),JE=(E,H=DE(1,0))=>{let W=dH(E);return W>0.0001?W0(E,1/W):{...H}},TE=(E)=>DE(Math.cos(E),Math.sin(E)),XH=(E)=>DE(-E.y,E.x),tE=(E,H,W)=>Math.max(H,Math.min(E,W)),TW=(E)=>Math.atan2(Math.sin(E),Math.cos(E));class n8{state;constructor(E=12648430){this.state=E>>>0}next(){let E=this.state;return E^=E<<13,E^=E>>>17,E^=E<<5,this.state=E>>>0,this.state}unit(){return(this.next()&16777215)/16777216}range(E,H){return E+(H-E)*this.unit()}}var q5=`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,N5=`
  precision highp float;

  uniform vec2 uResolution;
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform vec3 uSpeckColor;
  uniform float uVerticalTone;
  uniform float uGrainScale;
  uniform float uEdgeDarkening;
  varying vec2 vUv;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  void main() {
    float verticalTone = smoothstep(0.0, 1.0, vUv.y) * uVerticalTone;
    vec3 color = mix(uDeepColor, uShallowColor, verticalTone);

    vec2 grainCell = floor(
      vUv * uResolution * uGrainScale
    );
    float grain = hash21(grainCell);
    float darkSpeck = smoothstep(0.975, 0.998, grain);
    color -= darkSpeck * uSpeckColor;

    float edgeDepth = smoothstep(0.48, 0.82, length((vUv - 0.5) * vec2(1.0, 1.25)));
    color *= 1.0 - edgeDepth * uEdgeDarkening;

    gl_FragColor = vec4(color, 1.0);
  }
`;function fR(){return{deepColor:new e().setRGB(...T8.deepColor),shallowColor:new e().setRGB(...T8.shallowColor),speckColor:new e().setRGB(...T8.speckColor),verticalTone:T8.verticalTone,grainScale:T8.grainScale,edgeDarkening:T8.edgeDarkening}}class bR{mesh;material;currentAppearance=fR();targetAppearance=fR();previousTime=-1;constructor(){this.material=new SE({uniforms:{uResolution:{value:new m0(b0,x0)},uDeepColor:{value:new e},uShallowColor:{value:new e},uSpeckColor:{value:new e},uVerticalTone:{value:0},uGrainScale:{value:0},uEdgeDarkening:{value:0}},vertexShader:q5,fragmentShader:N5,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1}),this.mesh=new s0(new PH(b0,x0),this.material),this.mesh.position.set(b0*0.5,x0*0.5,-1),this.mesh.renderOrder=0,this.mesh.frustumCulled=!1,this.applyUniforms()}refreshConfig(){this.targetAppearance=fR()}resize(E,H){this.mesh.geometry.dispose(),this.mesh.geometry=new PH(E,H),this.mesh.position.set(E*0.5,H*0.5,-1),this.material.uniforms.uResolution.value.set(E,H)}update(E){if(this.previousTime>=0){let H=Math.min(0.1,Math.max(0,E-this.previousTime)),W=1-Math.exp(-H*2.25),R=this.currentAppearance,J=this.targetAppearance;R.deepColor.lerp(J.deepColor,W),R.shallowColor.lerp(J.shallowColor,W),R.speckColor.lerp(J.speckColor,W),R.verticalTone+=(J.verticalTone-R.verticalTone)*W,R.grainScale+=(J.grainScale-R.grainScale)*W,R.edgeDarkening+=(J.edgeDarkening-R.edgeDarkening)*W}this.previousTime=E,this.applyUniforms()}applyUniforms(){let E=this.currentAppearance;this.material.uniforms.uDeepColor.value.copy(E.deepColor),this.material.uniforms.uShallowColor.value.copy(E.shallowColor),this.material.uniforms.uSpeckColor.value.copy(E.speckColor),this.material.uniforms.uVerticalTone.value=E.verticalTone,this.material.uniforms.uGrainScale.value=E.grainScale,this.material.uniforms.uEdgeDarkening.value=E.edgeDarkening}}var F5=`
  precision highp float;
  uniform vec2 uResolution;

  vec4 pondPosition(vec2 point) {
    vec2 clip = vec2(
      point.x / uResolution.x * 2.0 - 1.0,
      1.0 - point.y / uResolution.y * 2.0
    );
    return vec4(clip, 0.0, 1.0);
  }
`,L5=`
  ${F5}
  attribute vec2 aCenter;
  attribute vec2 aDirection;
  attribute vec2 aSize;
  attribute vec2 aDepth;
  varying vec2 vLocal;
  varying vec2 vForward;
  varying vec2 vDepth;

  void main() {
    vec2 normal = vec2(-aDirection.y, aDirection.x);
    vec2 point =
      aCenter
      + aDirection * position.x * aSize.x
      + normal * position.y * aSize.y;
    vLocal = position.xy;
    vForward = aDirection;
    vDepth = aDepth;
    gl_Position = pondPosition(point);
  }
`,O5=`
  precision highp float;
  uniform float uTime;
  uniform float uStrength;
  uniform float uWaveFrequency;
  uniform float uWaveSpeed;
  varying vec2 vLocal;
  varying vec2 vForward;
  varying vec2 vDepth;

  void main() {
    float radiusSquared = dot(vLocal, vLocal);
    float mask =
      exp(-radiusSquared * 2.35)
      * (1.0 - smoothstep(0.82, 1.06, radiusSquared));
    vec2 normal = vec2(-vForward.y, vForward.x);
    float phase = vDepth.y + uTime * uWaveSpeed;
    float waveA = sin(
      (vLocal.x * 0.82 + vLocal.y * 0.31) * uWaveFrequency + phase
    );
    float waveB = cos(
      (vLocal.y * 0.91 - vLocal.x * 0.24) * (uWaveFrequency * 0.73)
      - phase * 1.17
    );
    vec2 displacement =
      (normal * waveA + vForward * waveB * 0.62)
      * mask
      * vDepth.x
      * uStrength;
    gl_FragColor = vec4(displacement, 0.0, 1.0);
  }
`;function B5(){let E=new $6;return E.setAttribute("position",new RH([-1,-1,0,1,-1,0,1,1,0,-1,-1,0,1,1,0,-1,1,0],3)),E.instanceCount=0,E}function Y6(E,H,W,R){let J=new H6(W,R);return J.setUsage(VH),E.setAttribute(H,J),J}function w5(E,H,W){return new SE({uniforms:W,vertexShader:E,fragmentShader:H,transparent:!0,blending:lW,depthTest:!1,depthWrite:!1,toneMapped:!1})}class xR{texture;target=new cE(Math.ceil(b0*0.5),Math.ceil(x0*0.5),{minFilter:_E,magFilter:_E,type:wH,format:kH,depthBuffer:!1,stencilBuffer:!1});scene=new DH;camera=new F8;depthGeometry=B5();depthCenters=new Float32Array(LH*2);depthDirections=new Float32Array(LH*2);depthSizes=new Float32Array(LH*2);depthValues=new Float32Array(LH*2);depthAttributes;depthMaterial;clearColor=new e;constructor(){this.texture=this.target.texture,this.texture.generateMipmaps=!1,this.texture.name="koi surface disturbances",this.depthAttributes=[Y6(this.depthGeometry,"aCenter",this.depthCenters,2),Y6(this.depthGeometry,"aDirection",this.depthDirections,2),Y6(this.depthGeometry,"aSize",this.depthSizes,2),Y6(this.depthGeometry,"aDepth",this.depthValues,2)],this.depthMaterial=w5(L5,O5,{uResolution:{value:new m0(b0,x0)},uTime:{value:0},uStrength:{value:0},uWaveFrequency:{value:0},uWaveSpeed:{value:0}});let E=new s0(this.depthGeometry,this.depthMaterial);E.frustumCulled=!1,this.scene.add(E)}render(E,H,W,R=null){this.updateDepthInstances(H,R),this.depthMaterial.uniforms.uTime.value=W,this.depthMaterial.uniforms.uStrength.value=K0.depth.localDistortion.strength,this.depthMaterial.uniforms.uWaveFrequency.value=K0.depth.localDistortion.waveFrequency,this.depthMaterial.uniforms.uWaveSpeed.value=K0.depth.localDistortion.waveSpeed,E.getClearColor(this.clearColor);let J=E.getClearAlpha();E.setRenderTarget(this.target),E.setClearColor(0,0),E.clear(),E.render(this.scene,this.camera),E.setClearColor(this.clearColor,J)}resize(E,H){this.target.setSize(Math.ceil(E*0.5),Math.ceil(H*0.5)),this.depthMaterial.uniforms.uResolution.value.set(E,H)}dispose(){this.target.dispose(),this.depthGeometry.dispose(),this.depthMaterial.dispose()}updateDepthInstances(E,H){let W=0,R=Math.max(K0.depth.visualEnd-K0.depth.visualStart,0.001);for(let J=0;J<E.count&&W<LH;J+=1){if(H!==null&&J!==H)continue;let Q=E.fish[J],$=tE((Q.depth-K0.depth.visualStart)/R,0,1),Z=$*$*(3-2*$);if(Z<=0.005)continue;let K=W*2;this.depthCenters[K]=H===null?Q.position.x:b0*0.5,this.depthCenters[K+1]=H===null?Q.position.y:x0*0.5,this.depthDirections[K]=Math.cos(Q.heading),this.depthDirections[K+1]=Math.sin(Q.heading),this.depthSizes[K]=Q.bodyLength*K0.depth.localDistortion.lengthScale*(H===null?1:1.6),this.depthSizes[K+1]=Q.bodyWidth*K0.depth.localDistortion.widthScale*(H===null?1:1.6),this.depthValues[K]=Z,this.depthValues[K+1]=Q.phaseOffset,W+=1}this.depthGeometry.instanceCount=W;for(let J of this.depthAttributes)J.needsUpdate=!0}}var gR=v0.palettes.map((E)=>({body:new e(E.body),light:new e(E.light),accent:new e(E.accent),fin:new e(E.fin),eye:new e(E.eye)}));class pR{shadowGroup=new dE;group=new dE;shadowGeometry=new WE;shapeGeometry=new WE;detailGeometry=new WE;shadowMaterial=new bE({color:v0.shadow.color,opacity:v0.shadow.opacity,transparent:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1});shadowBatch=new CH(this.shadowGeometry,16384);shapeBatch=new CH(this.shapeGeometry,32768,!0);detailBatch=new CH(this.detailGeometry,24576,!0);constructor(){this.shadowGeometry.name="tiny fish shadows",this.shapeGeometry.name="tiny fish silhouettes",this.detailGeometry.name="tiny fish markings";let E=new bE({vertexColors:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1}),H=new s0(this.shadowGeometry,this.shadowMaterial),W=new s0(this.shapeGeometry,E),R=new s0(this.detailGeometry,E);H.frustumCulled=!1,W.frustumCulled=!1,R.frustumCulled=!1,H.renderOrder=1,W.renderOrder=4,R.renderOrder=5,this.shadowGroup.add(H),this.group.add(W,R),this.refreshConfig()}refreshConfig(){this.shadowMaterial.color.setHex(v0.shadow.color),this.shadowMaterial.opacity=v0.shadow.opacity;for(let[E,H]of v0.palettes.entries()){let W=gR[E];if(!W)continue;W.body.setHex(H.body),W.light.setHex(H.light),W.accent.setHex(H.accent),W.fin.setHex(H.fin),W.eye.setHex(H.eye)}}update(E){this.shadowBatch.reset(),this.shapeBatch.reset(),this.detailBatch.reset();for(let H of E.fish){if(H.schoolIndex>=v0.visibleSchoolCount)continue;this.drawFish(H)}this.shadowBatch.commit(),this.shapeBatch.commit(),this.detailBatch.commit()}drawFish(E){let H=gR[E.palette%gR.length],W=JE(E.velocity),R=XH(W),J=Q0(E.position,v0.shadow.offset);this.drawBody(this.shadowBatch,J,W,R,E),this.drawBody(this.shapeBatch,E.position,W,R,E,H);let Q=Q0(E.position,W0(W,E.bodyLength*0.02)),$=Q0(E.position,W0(W,-E.bodyLength*0.18));for(let Y of[-1,1]){let G=Q0(Q,W0(R,E.bodyWidth*v0.finReachScale*Y));this.shapeBatch.triangle(Q,G,$,H.fin)}let Z=Q0(E.position,W0(W,E.bodyLength*0.08)),K=Q0(E.position,W0(W,-E.bodyLength*0.09)),U=E.bodyWidth*0.78;this.detailBatch.triangle(Q0(Z,W0(R,U)),Q0(Z,W0(R,-U)),Q0(K,W0(R,-U)),H.accent),this.detailBatch.triangle(Q0(Z,W0(R,U)),Q0(K,W0(R,-U)),Q0(K,W0(R,U)),H.accent);let X=Q0(E.position,W0(W,E.bodyLength*0.31));for(let Y of[-1,1])this.detailBatch.circle(Q0(X,W0(R,E.bodyWidth*0.58*Y)),v0.eyeRadius,H.eye,5)}drawBody(E,H,W,R,J,Q){let $=Q0(H,W0(W,J.bodyLength*0.5)),Z=Q0(Q0(H,W0(W,J.bodyLength*0.16)),W0(R,J.bodyWidth)),K=Q0(Q0(H,W0(W,J.bodyLength*0.16)),W0(R,-J.bodyWidth)),U=Q0(Q0(H,W0(W,-J.bodyLength*0.34)),W0(R,J.bodyWidth*0.58)),X=Q0(Q0(H,W0(W,-J.bodyLength*0.34)),W0(R,-J.bodyWidth*0.58)),Y=Q0(H,W0(W,-J.bodyLength*0.44)),G=Q?.body,D=Q?.light;E.triangle($,Z,H,D),E.triangle($,H,K,D),E.triangle(Z,U,H,G),E.triangle(H,U,X,G),E.triangle(H,X,K,G),E.triangle(U,Y,X,G);let F=J.bodyLength*v0.tailLengthScale,w=Math.sin(J.tailPhase)*J.bodyWidth*0.44,C=Q0(Q0(Y,W0(W,-F)),W0(R,w)),M=J.bodyWidth*v0.tailWidthScale,T=Q0(C,W0(R,M)),y=Q0(C,W0(R,-M)),B=Q0(Q0(Y,W0(W,-F*0.62)),W0(R,w*0.44)),V=Q?.fin;E.triangle(Y,T,B,V),E.triangle(Y,B,y,V)}}var M6=Object.keys(AH.types),mQ={rain:0,mouth:1,touch:2};class lR{instances=Array.from({length:e8},()=>({center:DE(),age:0,strength:0,type:"touch",alive:!1}));random=new n8(2047998481);rainIntensity=0;rainCountdown=0;trigger(E,H){let W=AH.types[E],R=Math.min(W.ripplesPerEvent,W.maximumActive);for(let J=0;J<R;J+=1){let Q=this.allocate(E);if(!Q)break;Q.center={...H},Q.age=-J*W.intervalSeconds,Q.strength=W.initialStrength*Math.pow(W.strengthFalloff,J),Q.type=E,Q.alive=!0}}setRainIntensity(E){if(this.rainIntensity=tE(E,0,1),this.rainIntensity<=0)this.rainCountdown=0}update(E){for(let R of this.instances){if(!R.alive)continue;if(R.age+=E,R.age>AH.types[R.type].lifetime)R.alive=!1}if(this.rainIntensity<=0)return;let H=AH.rainEmitter;this.rainCountdown-=E;let W=0;while(this.rainCountdown<=0&&W<H.maximumDropsPerFrame){this.trigger("rain",{x:this.random.range(H.edgeMargin,b0-H.edgeMargin),y:this.random.range(H.edgeMargin,x0-H.edgeMargin)});let R=1/Math.max(H.dropsPerSecond,0.1),J=Math.max(0,H.frequencyVariation),Q=this.random.range(Math.max(0.05,1-J),1+J);this.rainCountdown+=R*Q/Math.max(this.rainIntensity,0.12),W+=1}}reset(){for(let E of this.instances)E.alive=!1;this.random.state=2047998481,this.rainCountdown=0}allocate(E){let H=AH.types[E].maximumActive,W=0,R,J;for(let Z of this.instances){if(!Z.alive){J??=Z;continue}if(Z.type!==E)continue;if(W+=1,!R||Z.age>R.age)R=Z}if(W>=H)return R;if(J)return J;let Q,$=Number.POSITIVE_INFINITY;for(let Z of this.instances){let K=mQ[Z.type];if(K>mQ[E])continue;if(K<$||K===$&&(!Q||Z.age>Q.age))Q=Z,$=K}return Q}}var k5=`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;function uQ(E){return Array.from({length:Math.max(0,K8-1)},(H,W)=>{let R=W+1;return`if (typeIndex > ${R-0.5}) profile = ${E}[${R}];`}).join(`
    `)}var V5=`
  precision highp float;

  #define MAX_RIPPLES ${e8}
  #define MAX_RIPPLE_TYPES ${K8}

  uniform sampler2D uUnderwater;
  uniform sampler2D uDisturbance;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform int uRippleCount;
  uniform vec4 uRipples[MAX_RIPPLES];
  uniform vec4 uRipplePhysics[MAX_RIPPLE_TYPES];
  uniform vec4 uRippleCurves[MAX_RIPPLE_TYPES];
  uniform vec3 uColorTint;
  uniform float uClarity;
  uniform float uShowCurrentEffect;
  uniform float uLargeCellSize;
  uniform float uLargeCurrentOpacity;
  uniform float uSecondaryLargeCellSize;
  uniform float uSecondaryLargeCurrentOpacity;
  uniform float uDetailCellSize;
  uniform float uDetailCurrentOpacity;
  uniform vec3 uLargeCurrentColor;
  uniform vec3 uLargeCurrentCoreColor;
  uniform vec3 uSecondaryLargeCurrentColor;
  uniform vec3 uSecondaryLargeCurrentCoreColor;
  uniform vec3 uDetailCurrentColor;
  uniform vec3 uDetailCurrentCoreColor;
  uniform float uCurrentAmplitude;
  uniform vec2 uWaveDirectionA;
  uniform vec2 uWaveDirectionB;
  uniform vec2 uWaveDirectionC;
  uniform vec3 uWaveFrequency;
  uniform vec3 uWaveSpeed;
  uniform vec3 uWaveStrength;
  uniform float uLargeCurrentTime;
  uniform float uSecondaryLargeCurrentTime;
  uniform float uDetailCurrentTime;
  varying vec2 vUv;

  vec4 ripplePhysics(float typeIndex) {
    vec4 profile = uRipplePhysics[0];
    ${uQ("uRipplePhysics")}
    return profile;
  }

  vec4 rippleCurves(float typeIndex) {
    vec4 profile = uRippleCurves[0];
    ${uQ("uRippleCurves")}
    return profile;
  }

  vec2 hash22(vec2 point) {
    vec2 value = vec2(
      dot(point, vec2(127.1, 311.7)),
      dot(point, vec2(269.5, 183.3))
    );
    return fract(sin(value) * 43758.5453);
  }

  float valueNoise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);

    float bottomLeft = hash22(cell).x;
    float bottomRight = hash22(cell + vec2(1.0, 0.0)).x;
    float topLeft = hash22(cell + vec2(0.0, 1.0)).x;
    float topRight = hash22(cell + vec2(1.0, 1.0)).x;
    return mix(
      mix(bottomLeft, bottomRight, local.x),
      mix(topLeft, topRight, local.x),
      local.y
    );
  }

  vec2 warpWater(vec2 pixel) {
    float warpX = valueNoise(pixel * 0.010);
    float warpY = valueNoise(pixel * 0.012 + vec2(19.4, 7.8));
    float smallWarpX = valueNoise(
      pixel * 0.022 + vec2(31.8, -12.1)
    );
    float smallWarpY = valueNoise(
      pixel * 0.019 + vec2(-8.2, 26.6)
    );

    vec2 broadBend = vec2(
      sin(pixel.y * 0.025 + warpY * 5.2),
      cos(pixel.x * 0.022 + warpX * 5.6)
    );
    vec2 smallBend = vec2(
      sin((pixel.x + pixel.y) * 0.034 + smallWarpY * 4.8),
      cos((pixel.x - pixel.y) * 0.030 + smallWarpX * 5.1)
    );
    return pixel
      + (vec2(warpX, warpY) - 0.5) * 48.0
      + (vec2(smallWarpX, smallWarpY) - 0.5) * 18.0
      + broadBend * 11.0
      + smallBend * 4.5;
  }

  float cellularBorderDistance(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    float nearest = 10.0;
    float secondNearest = 10.0;

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbour = vec2(float(x), float(y));
        vec2 seed = hash22(cell + neighbour);
        vec2 animatedPoint = 0.5 + 0.32 * sin(6.2831853 * seed);
        vec2 pointDelta = neighbour + animatedPoint - local;
        float influence = mix(
          0.68,
          1.38,
          hash22(cell + neighbour + vec2(41.7, 13.2)).x
        );
        float distanceToPoint = length(pointDelta) / influence;
        if (distanceToPoint < nearest) {
          secondNearest = nearest;
          nearest = distanceToPoint;
        } else if (distanceToPoint < secondNearest) {
          secondNearest = distanceToPoint;
        }
      }
    }

    return secondNearest - nearest;
  }

  vec2 directionalWavePixel(vec2 pixel, vec2 resolution, float time) {
    float aspect = resolution.x / resolution.y;
    vec2 centered = (pixel / resolution - 0.5) * vec2(aspect, 1.0);

    float phaseA =
      dot(centered, uWaveDirectionA)
      * uWaveFrequency.x
      - time * uWaveSpeed.x;
    float phaseB =
      dot(centered, uWaveDirectionB)
      * uWaveFrequency.y
      - time * uWaveSpeed.y;
    float phaseC =
      dot(centered, uWaveDirectionC)
      * uWaveFrequency.z
      - time * uWaveSpeed.z;

    vec2 slope =
      uWaveDirectionA
      * sin(phaseA)
      * uWaveStrength.x
      + uWaveDirectionB
      * sin(phaseB)
      * uWaveStrength.y
      + uWaveDirectionC
      * sin(phaseC)
      * uWaveStrength.z;
    vec2 uvOffset =
      slope
      * vec2(1.0 / aspect, 1.0)
      * uCurrentAmplitude;
    return pixel + uvOffset * resolution;
  }

  void main() {
    vec2 pixel = vec2(vUv.x * uResolution.x, (1.0 - vUv.y) * uResolution.y);
    vec2 displacement = vec2(
      sin(pixel.y * 0.051 + uTime * 0.31) + sin(pixel.y * 0.017 - uTime * 0.19),
      cos(pixel.x * 0.043 - uTime * 0.23) + sin(pixel.x * 0.014 + uTime * 0.16)
    ) * 0.13 / uResolution;

    for (int index = 0; index < MAX_RIPPLES; index++) {
      if (index >= uRippleCount) break;

      vec4 ripple = uRipples[index];
      float typeIndex = floor(ripple.w * 0.5);
      float strength = mod(ripple.w, 2.0);
      vec4 physics = ripplePhysics(typeIndex);
      vec4 curves = rippleCurves(typeIndex);
      vec2 delta = pixel - ripple.xy;
      float distanceToCenter = length(delta);
      vec2 radial = delta / max(distanceToCenter, 0.001);
      float radius =
        physics.y
        + ripple.z * physics.z;
      float signedDistance = distanceToCenter - radius;
      float fade = 1.0 - smoothstep(
        physics.x * curves.y,
        physics.x,
        ripple.z
      );
      float life = clamp(ripple.z / max(physics.x, 0.001), 0.0, 1.0);
      float distortionBand =
        exp(-abs(signedDistance) * curves.x)
        * fade
        * strength
        * (1.0 - life * curves.z);
      float direction = signedDistance < 0.0 ? -1.0 : 1.0;

      displacement +=
        vec2(radial.x, -radial.y)
        * direction
        * distortionBand
        * physics.w
        / uResolution;
    }

    vec2 localDisturbance = texture2D(uDisturbance, vUv).xy;
    displacement +=
      vec2(localDisturbance.x, -localDisturbance.y) / uResolution;

    vec2 sampleUv = clamp(vUv + displacement, vec2(0.002), vec2(0.998));
    vec3 color = texture2D(uUnderwater, sampleUv).rgb;

    vec2 distortedPixel = vec2(
      sampleUv.x * uResolution.x,
      (1.0 - sampleUv.y) * uResolution.y
    );

    color *= uColorTint;

    if (uShowCurrentEffect > 0.5) {
      vec2 largeWavePixel = directionalWavePixel(
        distortedPixel,
        uResolution,
        uLargeCurrentTime
      );
      vec2 warpedPixel = warpWater(largeWavePixel);
      vec2 secondaryLargeWavePixel = directionalWavePixel(
        distortedPixel,
        uResolution,
        uSecondaryLargeCurrentTime
      );
      vec2 detailWavePixel = directionalWavePixel(
        distortedPixel,
        uResolution,
        uDetailCurrentTime
      );
      vec2 secondaryLargePixel =
        warpedPixel + secondaryLargeWavePixel - largeWavePixel;
      vec2 detailPixel = warpedPixel + detailWavePixel - largeWavePixel;

      float largeBorder = cellularBorderDistance(
        warpedPixel / max(uLargeCellSize, 0.001)
      );
      float largeWidthNoise = valueNoise(warpedPixel * 0.018 + vec2(3.7, 11.2));
      float largeVein = 1.0 - smoothstep(
        0.032 + largeWidthNoise * 0.010,
        0.125 + largeWidthNoise * 0.022,
        largeBorder
      );
      float largeCore = 1.0 - smoothstep(0.010, 0.052, largeBorder);

      float secondaryLargeBorder = cellularBorderDistance(
        secondaryLargePixel / max(uSecondaryLargeCellSize, 0.001)
        + vec2(5.2, 8.4)
      );
      float secondaryLargeWidthNoise = valueNoise(
        secondaryLargePixel * 0.015 + vec2(17.6, -6.8)
      );
      float secondaryLargeVein = 1.0 - smoothstep(
        0.032 + secondaryLargeWidthNoise * 0.010,
        0.125 + secondaryLargeWidthNoise * 0.022,
        secondaryLargeBorder
      );
      float secondaryLargeCore =
        1.0 - smoothstep(0.010, 0.052, secondaryLargeBorder);

      float detailBorder = cellularBorderDistance(
        detailPixel / max(uDetailCellSize, 0.001) + vec2(9.6, 4.3)
      );
      float detailRegion = smoothstep(
        0.48,
        0.75,
        valueNoise(detailPixel * 0.008 + vec2(-5.1, 17.8))
      );
      float detailVein =
        (1.0 - smoothstep(0.030, 0.105, detailBorder)) * detailRegion;
      float detailCore =
        (1.0 - smoothstep(0.008, 0.043, detailBorder)) * detailRegion;

      color +=
        (largeVein * uLargeCurrentColor + largeCore * uLargeCurrentCoreColor)
        * uLargeCurrentOpacity * (1.0 - uClarity);
      color +=
        (
          secondaryLargeVein * uSecondaryLargeCurrentColor
          + secondaryLargeCore * uSecondaryLargeCurrentCoreColor
        ) * uSecondaryLargeCurrentOpacity * (1.0 - uClarity);
      color +=
        (detailVein * uDetailCurrentColor + detailCore * uDetailCurrentCoreColor)
        * uDetailCurrentOpacity * (1.0 - uClarity);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`,T5=["large","secondaryLarge","detail"];function mR(){return{colorTint:new e().setRGB(...IE.colorTint),clarity:IE.clarity,largeCurrentColor:new e().setRGB(...IE.largeCurrentColor),largeCurrentCoreColor:new e().setRGB(...IE.largeCurrentCoreColor),largeCellSize:IE.largeCellSize,largeCurrentOpacity:IE.largeCurrentOpacity,largeCurrentSpeed:IE.largeCurrentSpeed,secondaryLargeCurrentColor:new e().setRGB(...IE.secondaryLargeCurrentColor),secondaryLargeCurrentCoreColor:new e().setRGB(...IE.secondaryLargeCurrentCoreColor),secondaryLargeCellSize:IE.secondaryLargeCellSize,secondaryLargeCurrentOpacity:IE.secondaryLargeCurrentOpacity,secondaryLargeCurrentSpeed:IE.secondaryLargeCurrentSpeed,detailCurrentColor:new e().setRGB(...IE.detailCurrentColor),detailCurrentCoreColor:new e().setRGB(...IE.detailCurrentCoreColor),detailCellSize:IE.detailCellSize,detailCurrentOpacity:IE.detailCurrentOpacity,detailCurrentSpeed:IE.detailCurrentSpeed}}class uR{mesh;material;rippleData=Array.from({length:e8},()=>new NE);ripplePhysics=Array.from({length:K8},()=>new NE(1,0,0,0));rippleCurves=Array.from({length:K8},()=>new NE(1,0,0,0));currentAppearance=mR();targetAppearance=mR();currentTimes={large:0,secondaryLarge:0,detail:0};previousTime=-1;constructor(E,H){this.material=new SE({uniforms:{uUnderwater:{value:E},uDisturbance:{value:H},uResolution:{value:new m0(b0,x0)},uTime:{value:0},uRippleCount:{value:0},uRipples:{value:this.rippleData},uRipplePhysics:{value:this.ripplePhysics},uRippleCurves:{value:this.rippleCurves},uColorTint:{value:new e},uClarity:{value:IE.clarity},uShowCurrentEffect:{value:0},uLargeCellSize:{value:0},uLargeCurrentOpacity:{value:0},uSecondaryLargeCellSize:{value:0},uSecondaryLargeCurrentOpacity:{value:0},uDetailCellSize:{value:0},uDetailCurrentOpacity:{value:0},uLargeCurrentColor:{value:new e},uLargeCurrentCoreColor:{value:new e},uSecondaryLargeCurrentColor:{value:new e},uSecondaryLargeCurrentCoreColor:{value:new e},uDetailCurrentColor:{value:new e},uDetailCurrentCoreColor:{value:new e},uCurrentAmplitude:{value:0},uWaveDirectionA:{value:new m0},uWaveDirectionB:{value:new m0},uWaveDirectionC:{value:new m0},uWaveFrequency:{value:new b},uWaveSpeed:{value:new b},uWaveStrength:{value:new b},uLargeCurrentTime:{value:0},uSecondaryLargeCurrentTime:{value:0},uDetailCurrentTime:{value:0}},vertexShader:k5,fragmentShader:V5,depthTest:!1,depthWrite:!1,toneMapped:!1}),this.mesh=new s0(new PH(2,2),this.material),this.mesh.frustumCulled=!1}resize(E,H){this.material.uniforms.uResolution.value.set(E,H)}refreshConfig(){this.targetAppearance=mR()}update(E,H){this.updateCurrentAppearance(H);for(let $=0;$<K8;$+=1)this.ripplePhysics[$].set(1,0,0,0),this.rippleCurves[$].set(1,0,0,0);for(let $=0;$<Math.min(M6.length,K8);$+=1){let Z=AH.types[M6[$]];this.ripplePhysics[$].set(Math.max(Z.lifetime,0.001),Z.startRadius,Z.expansionSpeed,Z.distortion),this.rippleCurves[$].set(Z.bandSharpness,Z.fadeStart,Z.strengthDecay,0)}let W=0;for(let $ of E.ripples.instances){if(!$.alive||$.age<0||W>=e8)continue;let Z=M6.indexOf($.type);if(Z<0||Z>=K8)continue;let K=Z*2+Math.min(1.999,Math.max(0,$.strength));this.rippleData[W].set($.center.x,$.center.y,$.age,K),W+=1}this.material.uniforms.uTime.value=H,this.material.uniforms.uRippleCount.value=W,this.material.uniforms.uColorTint.value.copy(this.currentAppearance.colorTint),this.material.uniforms.uClarity.value=this.currentAppearance.clarity,this.material.uniforms.uShowCurrentEffect.value=IE.showCurrentEffect?1:0,this.material.uniforms.uLargeCellSize.value=this.currentAppearance.largeCellSize,this.material.uniforms.uLargeCurrentOpacity.value=this.currentAppearance.largeCurrentOpacity,this.material.uniforms.uSecondaryLargeCellSize.value=this.currentAppearance.secondaryLargeCellSize,this.material.uniforms.uSecondaryLargeCurrentOpacity.value=this.currentAppearance.secondaryLargeCurrentOpacity,this.material.uniforms.uDetailCellSize.value=this.currentAppearance.detailCellSize,this.material.uniforms.uDetailCurrentOpacity.value=this.currentAppearance.detailCurrentOpacity,this.material.uniforms.uLargeCurrentColor.value.copy(this.currentAppearance.largeCurrentColor),this.material.uniforms.uLargeCurrentCoreColor.value.copy(this.currentAppearance.largeCurrentCoreColor),this.material.uniforms.uSecondaryLargeCurrentColor.value.copy(this.currentAppearance.secondaryLargeCurrentColor),this.material.uniforms.uSecondaryLargeCurrentCoreColor.value.copy(this.currentAppearance.secondaryLargeCurrentCoreColor),this.material.uniforms.uDetailCurrentColor.value.copy(this.currentAppearance.detailCurrentColor),this.material.uniforms.uDetailCurrentCoreColor.value.copy(this.currentAppearance.detailCurrentCoreColor);let[R,J,Q]=IE.currentDistortion.waves;this.material.uniforms.uCurrentAmplitude.value=IE.currentDistortion.amplitude,this.material.uniforms.uWaveDirectionA.value.set(...R.direction),this.material.uniforms.uWaveDirectionB.value.set(...J.direction),this.material.uniforms.uWaveDirectionC.value.set(...Q.direction),this.material.uniforms.uWaveFrequency.value.set(R.frequency,J.frequency,Q.frequency),this.material.uniforms.uWaveSpeed.value.set(R.speed,J.speed,Q.speed),this.material.uniforms.uWaveStrength.value.set(R.strength,J.strength,Q.strength),this.material.uniforms.uLargeCurrentTime.value=this.currentTimes.large,this.material.uniforms.uSecondaryLargeCurrentTime.value=this.currentTimes.secondaryLarge,this.material.uniforms.uDetailCurrentTime.value=this.currentTimes.detail}updateCurrentAppearance(E){if(this.previousTime<0){for(let Q of T5)this.currentTimes[Q]=E;this.previousTime=E;return}let H=Math.min(0.1,Math.max(0,E-this.previousTime));this.previousTime=E;let W=1-Math.exp(-H*2.25),R=this.currentAppearance,J=this.targetAppearance;R.colorTint.lerp(J.colorTint,W),R.clarity+=(J.clarity-R.clarity)*W,R.largeCurrentColor.lerp(J.largeCurrentColor,W),R.largeCurrentCoreColor.lerp(J.largeCurrentCoreColor,W),R.secondaryLargeCurrentColor.lerp(J.secondaryLargeCurrentColor,W),R.secondaryLargeCurrentCoreColor.lerp(J.secondaryLargeCurrentCoreColor,W),R.detailCurrentColor.lerp(J.detailCurrentColor,W),R.detailCurrentCoreColor.lerp(J.detailCurrentCoreColor,W),R.largeCellSize+=(J.largeCellSize-R.largeCellSize)*W,R.largeCurrentOpacity+=(J.largeCurrentOpacity-R.largeCurrentOpacity)*W,R.largeCurrentSpeed+=(J.largeCurrentSpeed-R.largeCurrentSpeed)*W,R.secondaryLargeCellSize+=(J.secondaryLargeCellSize-R.secondaryLargeCellSize)*W,R.secondaryLargeCurrentOpacity+=(J.secondaryLargeCurrentOpacity-R.secondaryLargeCurrentOpacity)*W,R.secondaryLargeCurrentSpeed+=(J.secondaryLargeCurrentSpeed-R.secondaryLargeCurrentSpeed)*W,R.detailCellSize+=(J.detailCellSize-R.detailCellSize)*W,R.detailCurrentOpacity+=(J.detailCurrentOpacity-R.detailCurrentOpacity)*W,R.detailCurrentSpeed+=(J.detailCurrentSpeed-R.detailCurrentSpeed)*W,this.currentTimes.large+=H*R.largeCurrentSpeed,this.currentTimes.secondaryLarge+=H*R.secondaryLargeCurrentSpeed,this.currentTimes.detail+=H*R.detailCurrentSpeed}}var P5=`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,z5=`
  precision highp float;

  uniform sampler2D uScene;
  uniform float uTime;
  uniform vec3 uTint;
  uniform float uBrightness;
  uniform float uContrast;
  uniform float uSaturation;
  uniform float uVignette;
  uniform float uCloudStrength;
  uniform vec3 uLightColor;
  uniform float uLightStrength;
  uniform vec2 uLightDirection;
  varying vec2 vUv;

  void main() {
    vec3 color = texture2D(uScene, vUv).rgb;

    float cloudWave =
      sin(vUv.x * 5.2 + vUv.y * 2.1 + uTime * 0.035)
      + sin(vUv.x * 2.3 - vUv.y * 4.7 - uTime * 0.022)
      + sin((vUv.x + vUv.y) * 8.1 + uTime * 0.016);
    cloudWave = cloudWave / 6.0 + 0.5;
    color *= 1.0 - uCloudStrength * (0.055 + cloudWave * 0.075);

    color *= uTint * uBrightness;
    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
    color = mix(vec3(luminance), color, uSaturation);
    color = (color - 0.5) * uContrast + 0.5;

    vec2 centered = vUv - 0.5;
    float directionalLight = dot(centered, normalize(uLightDirection)) + 0.5;
    directionalLight = smoothstep(0.05, 0.95, directionalLight);
    color += uLightColor * directionalLight * uLightStrength;

    float edge = smoothstep(0.36, 0.76, length(centered * vec2(1.0, 1.3)));
    color *= 1.0 - edge * uVignette;
    gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
  }
`,A5=["brightness","contrast","saturation","vignette","cloudStrength","lightStrength"];function dR(E){return{tint:new e().setRGB(...E.tint),lightColor:new e().setRGB(...E.lightColor),lightDirection:new m0(...E.lightDirection),brightness:E.brightness,contrast:E.contrast,saturation:E.saturation,vignette:E.vignette,cloudStrength:E.cloudStrength,lightStrength:E.lightStrength}}class cR{mesh;material;current=dR(k8(B6));target=dR(k8(B6));previousTime=-1;constructor(E){this.material=new SE({uniforms:{uScene:{value:E},uTime:{value:0},uTint:{value:this.current.tint},uBrightness:{value:this.current.brightness},uContrast:{value:this.current.contrast},uSaturation:{value:this.current.saturation},uVignette:{value:this.current.vignette},uCloudStrength:{value:this.current.cloudStrength},uLightColor:{value:this.current.lightColor},uLightStrength:{value:this.current.lightStrength},uLightDirection:{value:this.current.lightDirection}},vertexShader:P5,fragmentShader:z5,depthTest:!1,depthWrite:!1,toneMapped:!1}),this.mesh=new s0(new PH(2,2),this.material),this.mesh.frustumCulled=!1}setPreset(E){this.target=dR(k8(E))}update(E){let H=this.previousTime<0?0:Math.min(0.1,E-this.previousTime);this.previousTime=E;let W=1-Math.exp(-H*2.25);this.current.tint.lerp(this.target.tint,W),this.current.lightColor.lerp(this.target.lightColor,W),this.current.lightDirection.lerp(this.target.lightDirection,W);for(let R of A5)this.current[R]+=(this.target[R]-this.current[R])*W;this.material.uniforms.uTime.value=E,this.material.uniforms.uBrightness.value=this.current.brightness,this.material.uniforms.uContrast.value=this.current.contrast,this.material.uniforms.uSaturation.value=this.current.saturation,this.material.uniforms.uVignette.value=this.current.vignette,this.material.uniforms.uCloudStrength.value=this.current.cloudStrength,this.material.uniforms.uLightStrength.value=this.current.lightStrength}dispose(){this.mesh.geometry.dispose(),this.material.dispose()}}var nR=72000,I5=18000,D6=new e(16777215),J8=7,sR=4,_5=`
  varying float vStrength;
  void main() {
    vStrength = color.r;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,S5=`
  precision highp float;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vStrength;
  void main() {
    gl_FragColor = vec4(uColor, uOpacity * vStrength);
  }
`;function j5(E){return new SE({uniforms:{uColor:{value:new e(K0.shadow.color)},uOpacity:{value:E}},vertexShader:_5,fragmentShader:S5,vertexColors:!0,transparent:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1})}class J7{geometry;values;attribute;colorValues;colorAttribute;cursor=0;previewOrigin=null;previewScale=1;constructor(E,H,W=!1){this.geometry=E;if(this.values=new Float32Array(H),this.attribute=new hE(this.values,3),this.attribute.setUsage(VH),this.geometry.setAttribute("position",this.attribute),this.geometry.boundingSphere=new TH(new b(b0*0.5,x0*0.5,0),Math.hypot(b0,x0)),W)this.colorValues=new Float32Array(H),this.colorAttribute=new hE(this.colorValues,3),this.colorAttribute.setUsage(VH),this.geometry.setAttribute("color",this.colorAttribute)}reset(){this.cursor=0}setPreviewTransform(E,H=1){this.previewOrigin=E,this.previewScale=H}point(E,H=D6){if(this.cursor+3>this.values.length)return;if(this.values[this.cursor]=this.previewOrigin?b0*0.5+(E.x-this.previewOrigin.x)*this.previewScale:E.x,this.values[this.cursor+1]=this.previewOrigin?x0*0.5+(E.y-this.previewOrigin.y)*this.previewScale:E.y,this.values[this.cursor+2]=0,this.colorValues)this.colorValues[this.cursor]=H.r,this.colorValues[this.cursor+1]=H.g,this.colorValues[this.cursor+2]=H.b;this.cursor+=3}triangle(E,H,W,R=D6){this.point(E,R),this.point(H,R),this.point(W,R)}line(E,H,W=D6){this.point(E,W),this.point(H,W)}circle(E,H,W=D6,R=12){for(let J=0;J<R;J+=1){let Q=J/R*Math.PI*2,$=(J+1)/R*Math.PI*2;this.triangle(E,Q0(E,W0(TE(Q),H)),Q0(E,W0(TE($),H)),W)}}ellipse(E,H,W,R,J,Q,$,Z=10){let K=(U)=>{let X=1+Math.sin(U*3+$)*0.08+Math.cos(U*2-$*0.7)*0.045;return Q0(Q0(E,W0(H,Math.cos(U)*R*X)),W0(W,Math.sin(U)*J*X))};for(let U=0;U<Z;U+=1){let X=U/Z*Math.PI*2,Y=(U+1)/Z*Math.PI*2;this.triangle(E,K(X),K(Y),Q)}}commit(){if(this.geometry.setDrawRange(0,this.cursor/3),this.attribute.clearUpdateRanges(),this.attribute.addUpdateRange(0,this.cursor),this.attribute.needsUpdate=!0,this.colorAttribute)this.colorAttribute.clearUpdateRanges(),this.colorAttribute.addUpdateRange(0,this.cursor),this.colorAttribute.needsUpdate=!0}}class iR{canvas;renderer;bedScene=new DH;shadowScene=new DH;fishShadowScene=new DH;fishScene=new DH;surfaceScene=new DH;surfaceShadowScene=new DH;surfaceObjectScene=new DH;weatherScene=new DH;camera=new BW(0,b0,0,x0,-10,10);surfaceCamera=new F8;underwaterTarget;compositeTarget;pondBed;surfaceDisturbance=new xR;waterSurface;weather;tinyFishRenderer=new pR;duckweed=new yR;lotusLeaves=new vR;butterflies=new SR;fishShadowMaterial=j5(1);shadowTriangles;outerTriangles;bodyTriangles;outlineLines;appearances=Array.from({length:LH},(E,H)=>tW(H));depthAppearances=Array.from({length:LH},(E,H)=>tW(H));shadowStrengthColor=new e;targetFishShadowColor=new e(K0.shadow.color);previousAppearanceTime=-1;currentVisualDepth=0;previewFamilyIndex=null;bettaFinShade=new e;bettaEdgeShade=new e;bettaBlend=new e;bettaBlendShade=new e;constructor(E){this.canvas=E,this.renderer=new zR({canvas:E,antialias:!1,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(1),this.renderer.setSize(b0,x0,!1),this.renderer.setClearColor(0,1),this.renderer.outputColorSpace=s7,this.underwaterTarget=new cE(b0,x0,{minFilter:_E,magFilter:_E,depthBuffer:!1,stencilBuffer:!1}),this.underwaterTarget.texture.generateMipmaps=!1,this.compositeTarget=new cE(b0,x0,{minFilter:_E,magFilter:_E,depthBuffer:!1,stencilBuffer:!1}),this.compositeTarget.texture.generateMipmaps=!1,this.pondBed=new bR,this.waterSurface=new uR(this.underwaterTarget.texture,this.surfaceDisturbance.texture),this.weather=new cR(this.compositeTarget.texture),this.bedScene.add(this.pondBed.mesh),this.shadowScene.add(this.lotusLeaves.shadowGroup,this.tinyFishRenderer.shadowGroup),this.fishScene.add(this.tinyFishRenderer.group),this.surfaceScene.add(this.waterSurface.mesh),this.surfaceShadowScene.add(this.duckweed.shadowGroup,this.butterflies.shadowGroup),this.surfaceObjectScene.add(this.duckweed.group,this.lotusLeaves.group,this.butterflies.group),this.weatherScene.add(this.weather.mesh);let H=new WE,W=new WE,R=new WE,J=new WE;H.name="fish shadows",W.name="fish silhouettes",R.name="fish markings",J.name="fish debug lines",this.shadowTriangles=new J7(H,nR,!0),this.outerTriangles=new J7(W,nR,!0),this.bodyTriangles=new J7(R,nR,!0),this.outlineLines=new J7(J,I5,!0);let Q=new bE({vertexColors:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1}),$=new bE({vertexColors:!0,side:GE,depthTest:!1,depthWrite:!1,toneMapped:!1}),Z=new R8({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),K=new s0(H,this.fishShadowMaterial),U=new s0(W,Q),X=new s0(R,$),Y=new N8(J,Z);K.frustumCulled=!1,U.frustumCulled=!1,X.frustumCulled=!1,Y.frustumCulled=!1,U.renderOrder=1,X.renderOrder=2,Y.renderOrder=3,this.fishShadowScene.add(K),this.fishScene.add(U,X,Y)}refreshConfig(){for(let E of["koi","koi-palettes","tiny-fish","pond-bed","water","lotus","duckweed","butterflies"])this.refreshSection(E)}refreshSection(E){switch(E){case"koi":this.targetFishShadowColor.setHex(K0.shadow.color),this.refreshFishAppearances();break;case"koi-palettes":case"koi-patterns":this.refreshFishAppearances();break;case"tiny-fish":this.tinyFishRenderer.refreshConfig();break;case"pond-bed":this.pondBed.refreshConfig();break;case"water":this.waterSurface.refreshConfig();break;case"lotus":this.lotusLeaves.refreshConfig();break;case"duckweed":case"duckweed-patches":this.duckweed.refreshConfig();break;case"butterflies":this.butterflies.refreshConfig(!0);break;case"butterfly-spawns":this.butterflies.refreshConfig();break;default:break}}refreshFishAppearances(){for(let E=0;E<this.appearances.length;E+=1)this.appearances[E]=tW(E),this.depthAppearances[E]=tW(E)}resize(E,H,W,R){this.renderer.setSize(E,H,!1),this.underwaterTarget.setSize(E,H),this.compositeTarget.setSize(E,H),this.camera.right=E,this.camera.bottom=H,this.camera.updateProjectionMatrix(),this.pondBed.resize(E,H),this.surfaceDisturbance.resize(E,H),this.waterSurface.resize(E,H),this.butterflies.resize(E/W,H/R)}dispose(){this.underwaterTarget.dispose(),this.compositeTarget.dispose(),this.surfaceDisturbance.dispose(),this.fishShadowMaterial.dispose(),this.weather.dispose(),this.renderer.dispose()}setWeatherPreset(E){this.weather.setPreset(E)}setPreviewFamily(E){this.previewFamilyIndex=E}draw(E,H,W){if(this.previousAppearanceTime>=0){let $=Math.min(0.1,Math.max(0,H-this.previousAppearanceTime)),Z=1-Math.exp(-$*2.25);this.fishShadowMaterial.uniforms.uColor.value.lerp(this.targetFishShadowColor,Z)}this.previousAppearanceTime=H,this.shadowTriangles.reset(),this.outerTriangles.reset(),this.bodyTriangles.reset(),this.outlineLines.reset();let R=this.previewFamilyIndex,J=0;if(R!==null){for(let $=0;$<E.count;$+=1)if($%IW.length===R&&($+1)%K0.tinyEvery!==0){J=$;break}}let Q=R===null?null:E.fish[J].position;for(let $ of[this.shadowTriangles,this.outerTriangles,this.bodyTriangles,this.outlineLines])$.setPreviewTransform(Q,R===null?1:1.6);for(let $=0;$<E.count;$+=1){if(R!==null&&$!==J)continue;let Z=E.fish[$];this.buildRenderSpine(Z);let K=R??$,U=this.depthAppearances[K];if(this.updateDepthAppearance(Z,this.appearances[K],U),this.drawKoi(Z,U),W)this.drawDebug(Z,U)}if(this.shadowTriangles.commit(),this.outerTriangles.commit(),this.bodyTriangles.commit(),this.outlineLines.commit(),this.tinyFishRenderer.group.visible=R===null,this.tinyFishRenderer.shadowGroup.visible=R===null,R===null)this.tinyFishRenderer.update(E.tinyFish);this.pondBed.update(H),this.surfaceDisturbance.render(this.renderer,E,H,R===null?null:J),this.waterSurface.update(E,H),this.duckweed.update(H),this.lotusLeaves.update(H),this.butterflies.update(H),this.renderer.setRenderTarget(this.underwaterTarget),this.renderer.clear(),this.renderer.autoClear=!1,this.renderer.render(this.bedScene,this.camera),this.renderer.render(this.shadowScene,this.camera),this.renderer.render(this.fishShadowScene,this.camera),this.renderer.render(this.fishScene,this.camera),this.renderer.autoClear=!0,this.renderer.setRenderTarget(this.compositeTarget),this.renderer.clear(),this.renderer.render(this.surfaceScene,this.surfaceCamera),this.renderer.autoClear=!1,this.renderer.render(this.surfaceShadowScene,this.camera),this.renderer.render(this.surfaceObjectScene,this.camera),this.renderer.autoClear=!0,this.weather.update(H),this.renderer.setRenderTarget(null),this.renderer.clear(),this.renderer.render(this.weatherScene,this.surfaceCamera)}buildRenderSpine(E){E.renderSpine[0]={...E.spine[0]};for(let H=1;H<PE;H+=1){let W=H/(PE-1),R=Math.max(0,H-1),J=Math.min(PE-1,H+1),Q=JE(BE(E.spine[R],E.spine[J]),TE(E.heading)),$=XH(Q),Z=Math.pow(W,1.72),K=Math.sin(E.swimPhase-W*6.1)*E.bodyWidth*1.15*Z*(0.08+E.tailEffort*0.92);E.renderSpine[H]=Q0(E.spine[H],W0($,K))}}widthAt(E,H){let W=H/(PE-1),R=J8/(PE-1),J=W<0.12?0.8+W/0.12*0.2:W<R?1-0.58*Math.pow((W-0.12)/(R-0.12),1.25):0.42;return Math.max(0.7,E.bodyWidth*J)}visualDepth(E){let H=Math.max(K0.depth.visualEnd-K0.depth.visualStart,0.001),W=Math.max(0,Math.min(1,(E-K0.depth.visualStart)/H));return W*W*(3-2*W)}updateDepthAppearance(E,H,W){let R=this.visualDepth(E.depth);this.applyDepthColor(H.base,W.base,R),this.applyDepthColor(H.accent,W.accent,R),this.applyDepthColor(H.marking,W.marking,R),this.applyDepthColor(H.fin,W.fin,R),this.applyDepthColor(H.eye,W.eye,R)}applyDepthColor(E,H,W){let R=1+(K0.depth.deepBrightness-1)*W,J=1+(K0.depth.deepSaturation-1)*W,Q=E.r*0.2126+E.g*0.7152+E.b*0.0722,[$,Z,K]=K0.depth.deepWaterTint;H.setRGB((Q+(E.r-Q)*J)*R*(1+($-1)*W),(Q+(E.g-Q)*J)*R*(1+(Z-1)*W),(Q+(E.b-Q)*J)*R*(1+(K-1)*W))}addShadowTriangle(E,H,W){let R={x:K0.shadow.offset.x+K0.shadow.depthOffset.x*this.currentVisualDepth,y:K0.shadow.offset.y+K0.shadow.depthOffset.y*this.currentVisualDepth},J=K0.shadow.surfaceOpacity+(K0.shadow.deepOpacity-K0.shadow.surfaceOpacity)*this.currentVisualDepth;this.shadowStrengthColor.setRGB(J,J,J),this.shadowTriangles.triangle(Q0(E,R),Q0(H,R),Q0(W,R),this.shadowStrengthColor)}addShadowCircle(E,H){let W={x:K0.shadow.offset.x+K0.shadow.depthOffset.x*this.currentVisualDepth,y:K0.shadow.offset.y+K0.shadow.depthOffset.y*this.currentVisualDepth},R=K0.shadow.surfaceOpacity+(K0.shadow.deepOpacity-K0.shadow.surfaceOpacity)*this.currentVisualDepth;this.shadowStrengthColor.setRGB(R,R,R),this.shadowTriangles.circle(Q0(E,W),H,this.shadowStrengthColor)}silhouetteTriangle(E,H,W,R){this.addShadowTriangle(E,H,W),this.outerTriangles.triangle(E,H,W,R)}silhouetteCircle(E,H,W){this.addShadowCircle(E,H),this.outerTriangles.circle(E,H,W)}finScale(E){return E.bodyLength<25?0.62:1}veilSpan(E,H,W){let R=(H-sR)/(PE-1-sR),J=R<=0?0:Math.pow(Math.min(1,R),1.1),Q=1+0.13*Math.sin(E.swimPhase*0.55+E.phaseOffset-R*4.6+(W>0?0:1.9)),$=W>0?0.92:1.06;return this.widthAt(E,J8)*0.9+E.bodyWidth*1.6*this.finScale(E)*J*Q*$}veilOutline(E,H,W){let R=[],J=[];for(let F=sR;F<PE;F+=1){let{center:w,normal:C}=W[F],M=F<=J8?this.widthAt(E,F)*0.6:0;R.push(Q0(w,W0(C,M+(this.veilSpan(E,F,1)-M)*H))),J.push(Q0(w,W0(C,-(M+(this.veilSpan(E,F,-1)-M)*H))))}let Q=PE-1,$=E.renderSpine[Q],Z=JE(BE(E.renderSpine[Q],E.renderSpine[Q-1]),TE(E.heading+Math.PI)),K=XH(Z),U=R[R.length-1],X=J[J.length-1],Y=E.bodyWidth*1.3*this.finScale(E)*H,G=[],D=9;for(let F=1;F<D;F+=1){let w=F/D,C=Math.PI*(0.5-w),M=R7(U,X,w),T=1+0.14*Math.sin(w*23+E.phaseOffset*3)+0.09*Math.sin(E.swimPhase*0.8-w*7+E.phaseOffset),y=Math.cos(C)*Y*T,B=Math.sin(E.swimPhase*0.5-w*3)*E.bodyWidth*0.25*H;G.push(Q0(Q0(M,W0(Z,y)),W0(K,B*Math.cos(C))))}return{left:R,right:J,cap:G,hub:$}}fillVeil(E,H,W,R){let J=(X,Y,G,D)=>{if(R)this.addShadowTriangle(X,Y,G);this.outerTriangles.triangle(X,Y,G,D)},{left:Q,right:$,cap:Z,hub:K}=E;for(let X=0;X<Q.length-1;X+=1){let Y=X%2===0?H:W;J(Q[X],$[X],$[X+1],Y),J(Q[X],$[X+1],Q[X+1],Y)}let U=[Q[Q.length-1],...Z,$[$.length-1]];for(let X=0;X<U.length-1;X+=1)J(K,U[X],U[X+1],X%2===0?H:W)}drawKoi(E,H){this.currentVisualDepth=this.visualDepth(E.depth);let W=[],R=[],J=[];for(let d=0;d<PE;d+=1){let z=Math.max(0,d-1),u=Math.min(PE-1,d+1),a=JE(BE(E.renderSpine[z],E.renderSpine[u]),TE(E.heading)),p=XH(a),J0=this.widthAt(E,d);J[d]={center:E.renderSpine[d],normal:p},W[d]=Q0(E.renderSpine[d],W0(p,J0)),R[d]=Q0(E.renderSpine[d],W0(p,-J0))}let Q=this.bettaFinShade.copy(H.fin).multiplyScalar(0.88),$=this.bettaEdgeShade.copy(H.accent).multiplyScalar(0.9);this.fillVeil(this.veilOutline(E,1,J),H.accent,$,!0);let Z=this.bettaBlend.copy(H.fin).lerp(H.accent,0.45),K=this.bettaBlendShade.copy(Z).multiplyScalar(0.9);this.fillVeil(this.veilOutline(E,0.88,J),Z,K,!1),this.fillVeil(this.veilOutline(E,0.7,J),H.fin,Q,!1);let U=3,X=JE(BE(E.renderSpine[U+1],E.renderSpine[U-1]),TE(E.heading+Math.PI)),Y=XH(W0(X,-1)),G=E.bodyWidth*2.1*this.finScale(E);for(let d of[1,-1]){let z=d>0?W[U]:R[U],u=Math.sin(E.swimPhase*0.7+E.phaseOffset+d)*0.35,a=Q0(Q0(z,W0(X,G)),W0(Y,d*E.bodyWidth*(0.55+u))),p=Q0(z,W0(X,E.bodyWidth*0.55));this.silhouetteTriangle(z,a,p,H.accent)}let D=2,F=JE(BE(E.renderSpine[D-1],E.renderSpine[D+1]),TE(E.heading)),w=XH(F),C=E.gulpAnimation/Math.max(K0.feeding.animationDurationSeconds,0.001),M=0.75+0.35*Math.sin(E.swimPhase*1.9+E.phaseOffset)+Math.sin(Math.PI*C)*0.4,T=E.bodyWidth*0.45*M;for(let d of[1,-1]){let z=d>0?W:R,u=Q0(Q0(z[D+1],W0(w,d*T)),W0(F,-E.bodyWidth*0.6));this.silhouetteTriangle(z[D],u,z[D+2],H.fin)}for(let d=J8-1;d>=0;d-=1)this.silhouetteTriangle(W[d],R[d],R[d+1],H.base),this.silhouetteTriangle(W[d],R[d+1],W[d+1],H.base);let y=Q0(E.renderSpine[J8],W0(JE(BE(E.renderSpine[J8+1],E.renderSpine[J8]),TE(E.heading+Math.PI)),E.bodyWidth*0.9));this.silhouetteTriangle(W[J8],R[J8],y,H.base);let B=JE(BE(E.renderSpine[0],E.renderSpine[1]),TE(E.heading)),V=XH(B),P=Q0(E.renderSpine[0],W0(B,E.bodyWidth*0.3)),A=this.widthAt(E,0)*0.78,L=Q0(P,W0(V,A)),k=Q0(P,W0(V,-A));this.silhouetteTriangle(W[0],L,k,H.base),this.silhouetteTriangle(W[0],k,R[0],H.base),this.silhouetteCircle(P,Math.max(1,A*0.8),H.base);for(let[d,z]of lQ(H).entries()){let u=z.position*(PE-1),a=Math.min(PE-2,Math.floor(u)),p=u-a,J0=R7(E.renderSpine[a],E.renderSpine[a+1],p),s=Math.max(0,a-1),t=Math.min(PE-1,a+2),R0=JE(BE(E.renderSpine[s],E.renderSpine[t]),TE(E.heading)),S0=XH(R0),A0=this.widthAt(E,a)*(1-p)+this.widthAt(E,a+1)*p,YE=Q0(J0,W0(S0,A0*z.offset)),u0=z.color==="accent"?H.accent:H.marking;this.bodyTriangles.ellipse(YE,R0,S0,E.bodyLength*z.length,A0*z.width,u0,d*1.73+z.position*5.1+E.swimPhase*0.05)}let c=Q0(E.renderSpine[0],W0(B,E.bodyWidth*0.12)),h=this.widthAt(E,0)*0.66,v=Math.max(0.7,E.bodyWidth*0.15);this.bodyTriangles.circle(Q0(c,W0(V,h)),v,H.eye,6),this.bodyTriangles.circle(Q0(c,W0(V,-h)),v,H.eye,6)}drawDebug(E,H){for(let W=0;W<PE-1;W+=1)this.outlineLines.line(E.renderSpine[W],E.renderSpine[W+1],H.eye)}}class oR{position=DE();velocity=DE();spine=Array.from({length:PE},()=>DE());renderSpine=Array.from({length:PE},()=>DE());heading=0;angularVelocity=0;speed=0;cruiseSpeed=20;maximumSpeed=34;turnStrength=5;bodyLength=24;bodyWidth=4;swimPhase=0;phaseOffset=0;wanderSeed=0;stateAge=0;stateDuration=2;pivotHeading=0;reactivity=0.7;callDelay=0;respondedToCall=!1;callResponseAge=0;tailEffort=0.6;depth=0.08;targetDepth=0.08;depthTransitionRate=1;depthStateAge=0;depthStateDuration=10;inDeepPeriod=!1;gulpCountdown=8;gulpAnimation=0;behaviorRng=1;state=0;reset(E,H){this.position=DE(H.range(45,b0-45),H.range(32,x0-32)),this.heading=H.range(-Math.PI,Math.PI),this.cruiseSpeed=H.range(13,21),this.maximumSpeed=this.cruiseSpeed*H.range(1.55,1.9),this.speed=this.cruiseSpeed*H.range(0.72,1.05),this.turnStrength=H.range(4.4,6.8);let W=E%K0.tinyEvery===K0.tinyEvery-1,R=W?K0.tinyLength:K0.regularLength,J=W?K0.tinyWidthRatio:K0.regularWidthRatio;this.bodyLength=H.range(R[0],R[1]),this.bodyWidth=this.bodyLength*H.range(J[0],J[1]),this.phaseOffset=H.range(0,_J),this.swimPhase=this.phaseOffset,this.wanderSeed=H.range(0,100),this.reactivity=H.range(0.35,1),this.callDelay=0,this.respondedToCall=!1,this.callResponseAge=0,this.behaviorRng=(2654435769^Math.imul(E+1,2246822507))>>>0,this.depth=H.range(K0.depth.initialRange[0],K0.depth.initialRange[1]),this.targetDepth=this.depth,this.depthTransitionRate=3/H.range(K0.depth.transitionSeconds[0],K0.depth.transitionSeconds[1]),this.depthStateDuration=H.range(K0.depth.surfaceDurationSeconds[0],K0.depth.surfaceDurationSeconds[1]),this.depthStateAge=H.range(0,this.depthStateDuration*0.7),this.inDeepPeriod=!1,this.gulpCountdown=H.range(K0.feeding.intervalSeconds[0],K0.feeding.intervalSeconds[1]),this.gulpAnimation=0,this.state=E%5;let Q=[[1.7,4.8],[0.8,2],[0.7,2.9],[0.35,0.9],[0.35,0.8]],[$,Z]=Q[this.state];this.stateDuration=H.range($,Z),this.stateAge=H.range(0,this.stateDuration*0.8),this.pivotHeading=this.heading,this.tailEffort=0.6,this.angularVelocity=0,this.velocity=W0(TE(this.heading),this.speed);let K=W0(TE(this.heading),-this.bodyLength/(PE-1));for(let U=0;U<PE;U+=1)this.spine[U]=Q0(this.position,W0(K,U)),this.renderSpine[U]={...this.spine[U]}}}class aR{fish=[];ranges=[];random=new n8(1369960796);callPoint=DE();constructor(){this.reset()}reset(){this.fish.length=0,this.ranges.length=0,this.random.state=1369960796;for(let[E,H]of zJ.entries()){let W=this.fish.length,R=sH(H.x,H.y);for(let J=0;J<H.count;J+=1){let Q=this.random.range(0,Math.PI*2),$=Math.sqrt(this.random.unit()),Z=DE(R.x+Math.cos(Q)*H.spreadX*$,R.y+Math.sin(Q)*H.spreadY*$),K=H.heading+this.random.range(-0.34,0.34),U=this.random.range(v0.bodyLength[0],v0.bodyLength[1])*H.sizeScale,X=this.random.range(v0.cruiseSpeed[0],v0.cruiseSpeed[1])*H.speedScale;this.fish.push({position:Z,velocity:W0(TE(K),X),bodyLength:U,bodyWidth:U*this.random.range(v0.bodyWidthRatio[0],v0.bodyWidthRatio[1]),tailPhase:this.random.range(0,Math.PI*2),phase:this.random.range(0,Math.PI*2),palette:H.palette,schoolIndex:E,cruiseSpeed:X,fleeDelay:-1,fleeTime:0,fleeDuration:v0.flee.duration[0]})}this.ranges.push({start:W,count:H.count,phase:this.random.range(0,Math.PI*2),setting:H})}}refreshConfig(){let E=new Map;for(let[H,W]of this.ranges.entries())for(let R=0;R<W.count;R+=1)E.set(`${H}:${R}`,this.fish[W.start+R]);this.reset();for(let H of this.ranges)for(let W=0;W<H.count;W+=1){let R=this.fish[H.start+W],J=E.get(`${R.schoolIndex}:${W}`);if(!J)continue;R.position={...J.position},R.velocity={...J.velocity},R.tailPhase=J.tailPhase,R.phase=J.phase,R.fleeDelay=J.fleeDelay,R.fleeTime=J.fleeTime,R.fleeDuration=J.fleeDuration}}resize(E,H){for(let W of this.fish)W.position.x*=E,W.position.y*=H;this.callPoint.x*=E,this.callPoint.y*=H}shiftSchool(E,H,W){for(let R of this.fish){if(R.schoolIndex!==E)continue;R.position.x+=H,R.position.y+=W}}fleeFrom(E){this.callPoint={...E};let H=Math.min(v0.visibleSchoolCount,this.ranges.length);for(let W of this.fish){if(W.schoolIndex>=H)continue;let R=dH(BE(W.position,E));if(R>v0.flee.reactionRadius)continue;W.fleeDelay=R/v0.flee.propagationSpeed+this.random.range(0,v0.flee.randomDelay),W.fleeTime=0,W.fleeDuration=this.random.range(v0.flee.duration[0],v0.flee.duration[1])}}update(E,H){let W=Math.min(v0.visibleSchoolCount,this.ranges.length);for(let R=0;R<W;R+=1)this.updateSchool(this.ranges[R],E,H)}updateSchool(E,H,W){let R=DE(),J=DE();for(let $=E.start;$<E.start+E.count;$+=1)R=Q0(R,this.fish[$].position),J=Q0(J,this.fish[$].velocity);R=W0(R,1/E.count),J=W0(J,1/E.count);let Q=JE(J,TE(E.setting.heading));for(let $=E.start;$<E.start+E.count;$+=1){let Z=this.fish[$];if(Z.fleeDelay>=0){if(Z.fleeDelay-=H,Z.fleeDelay<=0){Z.fleeDelay=-1,Z.fleeTime=Z.fleeDuration;let v=JE(BE(Z.position,this.callPoint),Q);Z.velocity=Q0(Z.velocity,W0(v,v0.flee.initialImpulse))}}let K=DE(),U=DE(),X=DE(),Y=0;for(let v=E.start;v<E.start+E.count;v+=1){if(v===$)continue;let d=BE(Z.position,this.fish[v].position),z=dH(d);if(z<=0.001||z>=v0.neighbourRadius)continue;if(Y+=1,X=Q0(X,this.fish[v].position),U=Q0(U,JE(this.fish[v].velocity)),z<v0.separationRadius)K=Q0(K,W0(JE(d),(v0.separationRadius-z)/v0.separationRadius))}let G=JE(Z.velocity,Q);if(Y>0)X=JE(BE(W0(X,1/Y),Z.position),Q),U=JE(U,Q);else X=JE(BE(R,Z.position),Q),U=Q;let D=JE(BE(Z.position,R),G),F=W0(XH(D),E.setting.swirlDirection),w=Math.atan2(G.y,G.x)+Math.sin(W*0.62+Z.phase+E.phase)*0.58+Math.sin(W*0.19+Z.phase*1.7)*0.31,C=Q0(W0(G,0.82),W0(TE(w),v0.wanderStrength));C=Q0(C,W0(X,v0.cohesionStrength)),C=Q0(C,W0(U,v0.alignmentStrength)),C=Q0(C,W0(K,v0.separationStrength)),C=Q0(C,W0(F,v0.swirlStrength));let M=DE(),T=v0.edgeMargin;if(Z.position.x<T)M.x+=(T-Z.position.x)/T;if(Z.position.x>b0-T)M.x-=(Z.position.x-(b0-T))/T;if(Z.position.y<T)M.y+=(T-Z.position.y)/T;if(Z.position.y>x0-T)M.y-=(Z.position.y-(x0-T))/T;let y=Z.cruiseSpeed*(1+Math.sin(W*0.83+Z.phase)*v0.speedVariation);if(Z.fleeTime>0){Z.fleeTime=Math.max(0,Z.fleeTime-H);let v=JE(BE(Z.position,this.callPoint),G),d=JE(BE(R,this.callPoint),v);C=Q0(W0(v,v0.flee.directionStrength),W0(d,v0.flee.schoolingStrength)),C=Q0(C,W0(U,v0.flee.schoolingStrength)),C=Q0(C,W0(K,v0.separationStrength)),y=this.random.range(v0.flee.speed[0],v0.flee.speed[1])}C=Q0(C,W0(M,v0.edgeStrength));let B=JE(C,G),V=Math.atan2(Z.velocity.y,Z.velocity.x),P=Math.atan2(B.y,B.x),A=tE(TW(P-V),-v0.maximumTurnRate*H,v0.maximumTurnRate*H),L=TE(V+A),k=1-Math.exp(-v0.steeringResponse*H),c=dH(Z.velocity),h=c+(y-c)*k;Z.velocity=W0(L,h),Z.position=Q0(Z.position,W0(Z.velocity,H)),Z.tailPhase+=(4.4+h*0.16)*H}}}var rR=30;class tR{fish=Array.from({length:LH},()=>new oR);ripples=new lR;tinyFish=new aR;count=K0.initialCount;targetActive=!1;random=new n8;target=DE(b0*0.5,x0*0.5);targetAge=0;constructor(){this.fish.forEach((E,H)=>E.reset(H,this.random))}setCount(E){this.count=tE(Math.round(E),1,LH)}updateBodyProportions(E){let H=(W)=>(W[0]+W[1])*0.5;for(let[W,R]of this.fish.entries()){let J=W%E.tinyEvery===E.tinyEvery-1,Q=W%K0.tinyEvery===K0.tinyEvery-1,$=H(J?E.tinyLength:E.regularLength),Z=H(Q?K0.tinyLength:K0.regularLength),K=H(J?E.tinyWidthRatio:E.regularWidthRatio),U=H(Q?K0.tinyWidthRatio:K0.regularWidthRatio),X=Z/Math.max($,0.001);R.bodyLength*=X,R.bodyWidth*=X*U/Math.max(K,0.001)}}resize(E,H){for(let W of this.fish){let R=W.position.x*E,J=W.position.y*H,Q=R-W.position.x,$=J-W.position.y;W.position.x=R,W.position.y=J;for(let Z of W.spine)Z.x+=Q,Z.y+=$;for(let Z of W.renderSpine)Z.x+=Q,Z.y+=$}this.target.x*=E,this.target.y*=H,this.tinyFish.resize(E,H);for(let W of this.ripples.instances)W.center.x*=E,W.center.y*=H}reset(){this.random.state=12648430,this.fish.forEach((E,H)=>E.reset(H,this.random)),this.tinyFish.reset(),this.ripples.reset(),this.targetActive=!1}setRainIntensity(E){this.ripples.setRainIntensity(E)}callTo(E){this.target={...E},this.targetActive=!0,this.targetAge=0;for(let H=0;H<this.count;H+=1){let W=this.fish[H],R=K0.callResponse,J=dH(BE(W.position,E)),Q=Math.pow(tE(J/R.distanceAtMaximumDelay,0,1),R.distanceExponent);W.callDelay=R.minimumDelaySeconds+Q*R.maximumDistanceDelaySeconds+this.random.range(0,R.randomJitterSeconds)+(1-W.reactivity)*R.temperamentDelaySeconds,W.respondedToCall=!1,W.callResponseAge=0}this.tinyFish.fleeFrom(E),this.ripples.trigger("touch",E)}scatter(){for(let E=0;E<this.count;E+=1){let H=this.fish[E];H.heading+=this.random.range(-1.35,1.35),H.speed=H.maximumSpeed,H.angularVelocity+=this.random.range(-2,2),this.enterState(H,3)}this.targetActive=!1}update(E,H){if(this.targetAge+=E,this.targetActive&&this.targetAge>K0.callResponse.targetLifetimeSeconds)this.targetActive=!1;let W=[],R=[];for(let J=0;J<this.count;J+=1){let Q=this.fish[J];if(Q.callDelay=Math.max(0,Q.callDelay-E),this.targetActive&&Q.respondedToCall)Q.callResponseAge+=E;if(this.targetActive&&Q.callDelay<=0&&!Q.respondedToCall)Q.respondedToCall=!0,Q.callResponseAge=0,Q.targetDepth=K0.depth.callRiseDepth,Q.depthTransitionRate=3/Math.max(K0.depth.callRiseSeconds,0.1),this.enterState(Q,3);this.updateNaturalState(Q,E),this.updateDepth(Q,E),this.updateFeeding(Q,E),W[J]=this.steeringFor(J,H),R[J]=this.desiredSpeedFor(J)}for(let J=0;J<this.count;J+=1){let Q=this.fish[J];this.integrate(Q,W[J],R[J],E)}this.tinyFish.update(E,H),this.ripples.update(E)}updateDepth(E,H){if(E.depthStateAge+=H,!(this.targetActive&&E.respondedToCall)&&E.depthStateAge>=E.depthStateDuration){if(E.depthStateAge=0,this.behaviorUnit(E)<K0.depth.changeProbability)E.inDeepPeriod=!E.inDeepPeriod;let R=E.inDeepPeriod?K0.depth.deepRange:K0.depth.shallowRange,J=E.inDeepPeriod?K0.depth.deepDurationSeconds:K0.depth.surfaceDurationSeconds;E.targetDepth=this.behaviorRange(E,R[0],R[1]),E.depthStateDuration=this.behaviorRange(E,J[0],J[1]);let Q=this.behaviorRange(E,K0.depth.transitionSeconds[0],K0.depth.transitionSeconds[1]);E.depthTransitionRate=3/Math.max(Q,0.1)}E.depth+=(E.targetDepth-E.depth)*(1-Math.exp(-E.depthTransitionRate*H))}updateFeeding(E,H){if(E.gulpAnimation=Math.max(0,E.gulpAnimation-H),E.gulpCountdown-=H,E.gulpCountdown>0)return;let W=E.state===2||E.state===1||E.state===0,R=this.targetActive&&E.respondedToCall;if(!(W&&!R&&E.depth<=K0.feeding.eligibleDepth&&E.speed<=E.cruiseSpeed*K0.feeding.eligibleSpeedFraction)){E.gulpCountdown=this.behaviorRange(E,K0.feeding.retryDelaySeconds[0],K0.feeding.retryDelaySeconds[1]);return}let Q=Math.cos(E.heading),$=Math.sin(E.heading),Z=E.bodyWidth*K0.feeding.mouthForwardOffset;this.ripples.trigger("mouth",{x:E.position.x+Q*Z,y:E.position.y+$*Z}),E.gulpAnimation=K0.feeding.animationDurationSeconds,E.gulpCountdown=this.behaviorRange(E,K0.feeding.intervalSeconds[0],K0.feeding.intervalSeconds[1])}behaviorUnit(E){let H=E.behaviorRng>>>0;return H^=H<<13,H^=H>>>17,H^=H<<5,E.behaviorRng=H>>>0,(E.behaviorRng&16777215)/16777216}behaviorRange(E,H,W){return H+(W-H)*this.behaviorUnit(E)}enterState(E,H){switch(E.state=H,E.stateAge=0,H){case 0:E.stateDuration=this.behaviorRange(E,1.7,5.2);break;case 1:E.stateDuration=this.behaviorRange(E,0.7,2.1);break;case 2:E.stateDuration=this.behaviorRange(E,0.65,3.1);break;case 3:E.stateDuration=this.behaviorRange(E,0.32,0.92);break;case 4:{E.stateDuration=this.behaviorRange(E,0.3,0.78);let W=this.behaviorUnit(E)<0.5?-1:1;E.pivotHeading=TW(E.heading+W*this.behaviorRange(E,0.85,2.35));break}}}updateNaturalState(E,H){if(E.stateAge+=H,E.stateAge<E.stateDuration)return;let W=this.behaviorUnit(E);switch(E.state){case 0:if(W<0.25)this.enterState(E,1);else if(W<0.43)this.enterState(E,2);else if(W<0.61)this.enterState(E,4);else if(W<0.72)this.enterState(E,3);else this.enterState(E,0);break;case 1:if(W<0.38)this.enterState(E,2);else if(W<0.72)this.enterState(E,0);else if(W<0.9)this.enterState(E,4);else this.enterState(E,3);break;case 2:if(W<0.34)this.enterState(E,4);else if(W<0.55)this.enterState(E,3);else this.enterState(E,0);break;case 3:this.enterState(E,1);break;case 4:this.enterState(E,W<0.38?3:0);break}}steeringFor(E,H){let W=this.fish[E],R=TE(W.heading),J=W0(R,0.95);if(W.state===4)J=W0(TE(W.pivotHeading),4.7);else if(W.state!==2){let Y=Math.sin(H*0.29+W.wanderSeed)*0.7+Math.sin(H*0.113+W.wanderSeed*1.73)*0.45;J=Q0(J,W0(TE(W.heading+Y),0.62))}let Q=DE(),$=DE(),Z=DE(),K=0;for(let Y=0;Y<this.count;Y+=1){if(Y===E)continue;let G=BE(W.position,this.fish[Y].position),D=dH(G);if(D>0.001&&D<37){if(K+=1,Z=Q0(Z,this.fish[Y].position),$=Q0($,JE(this.fish[Y].velocity)),D<rR)Q=Q0(Q,W0(JE(G),(rR-D)/rR))}}if(K>0)Z=JE(BE(W0(Z,1/K),W.position),R),$=JE($,R),J=Q0(J,W0(Z,0)),J=Q0(J,W0($,0.1)),J=Q0(J,W0(Q,2.4));let U=32,X=DE();if(W.position.x<U)X.x+=(U-W.position.x)/U;if(W.position.x>b0-U)X.x-=(W.position.x-(b0-U))/U;if(W.position.y<U)X.y+=(U-W.position.y)/U;if(W.position.y>x0-U)X.y-=(W.position.y-(x0-U))/U;if(J=Q0(J,W0(X,4.8)),this.targetActive&&W.callDelay<=0){let Y=BE(this.target,W.position);if(dH(Y)>13){let D=W.callResponseAge<K0.callResponse.chaseBoostSeconds?3.35:2.45;J=Q0(J,W0(JE(Y),D))}else{let D=JE(Y,R);J=Q0(J,W0(XH(D),2.2)),J=Q0(J,W0(D,-0.5))}}return JE(J,R)}desiredSpeedFor(E){let H=this.fish[E],W=K0.callResponse.chaseBoostSeconds;if(this.targetActive&&H.respondedToCall&&H.callResponseAge<W){let Q=1-tE(H.callResponseAge/W,0,1);return H.maximumSpeed*(K0.callResponse.chaseSpeedMultiplier+Q*K0.callResponse.initialExtraSpeedMultiplier)}let J=H.cruiseSpeed;if(this.targetActive&&H.callDelay<=0){let Q=dH(BE(this.target,H.position)),$=tE(Q/105,0.2,1);J=H.cruiseSpeed+(H.maximumSpeed-H.cruiseSpeed)*$}switch(H.state){case 0:return J;case 1:return J*0.28;case 2:return 0;case 3:return H.maximumSpeed*1.08;case 4:return H.cruiseSpeed*0.16}}integrate(E,H,W,R){let J=Math.atan2(H.y,H.x),Q=TW(J-E.heading),$=E.state===4,Z=$?2.65:1,K=$?2.15:3.8,U=Q*E.turnStrength*Z-E.angularVelocity*K;E.angularVelocity+=U*R;let X=$?4.35:2.25;E.angularVelocity=tE(E.angularVelocity,-X,X),E.heading=TW(E.heading+E.angularVelocity*R);let Y=1.65,G=0.62;switch(E.state){case 0:break;case 1:Y=1.05,G=0.16;break;case 2:Y=3.6,G=0.05;break;case 3:Y=6.4,G=1.22;break;case 4:Y=4.2,G=1;break}E.speed+=(W-E.speed)*(1-Math.exp(-Y*R)),E.tailEffort+=(G-E.tailEffort)*(1-Math.exp(-4.5*R)),E.velocity=W0(TE(E.heading),E.speed),E.position=Q0(E.position,W0(E.velocity,R));let D=0.45+E.speed/E.maximumSpeed*4.6+E.tailEffort*0.9;E.swimPhase+=D*R,E.spine[0]={...E.position};let F=E.bodyLength/(PE-1);for(let w=1;w<PE;w+=1){let C=W0(TE(E.heading),-1),M=JE(BE(E.spine[w],E.spine[w-1]),C),T=Q0(E.spine[w-1],W0(M,F)),B=0.94-w/(PE-1)*0.17;E.spine[w]=R7(E.spine[w],T,B)}}}var dQ={"koi:count":{run:(E,H)=>E.school.setCount(H.live.koi.initialCount)},"koi:body":{run:(E,H,W)=>{let R=H.live.koi,Q=W.find((Z)=>Z.path.length===1&&Z.path[0]==="koi")?.prev,$=(Z)=>{if(Q)return Q[Z]??R[Z];let K=W.find((U)=>U.path[0]==="koi"&&U.path[1]===Z);return K?K.prev:R[Z]};E.school.updateBodyProportions({regularLength:$("regularLength"),tinyLength:$("tinyLength"),regularWidthRatio:$("regularWidthRatio"),tinyWidthRatio:$("tinyWidthRatio"),tinyEvery:$("tinyEvery")})}},"koi:appearance":{run:(E)=>E.renderer.refreshSection("koi")},"tiny-fish:render":{run:(E)=>E.renderer.refreshSection("tiny-fish")},"tiny-fish:respawn":{heavy:!0,run:(E)=>E.school.tinyFish.refreshConfig()},"tiny-fish:shift":{run:(E,H,W)=>{for(let R of W){if(R.effect!=="tiny-fish:shift")continue;let J=R.path[1],Q=R.path[2];if(typeof J!=="number"||Q!=="x"&&Q!=="y")continue;if(typeof R.prev!=="number"||typeof R.next!=="number")continue;let $=R.next-R.prev,Z=b0/ZH.width,K=x0/ZH.height;E.school.tinyFish.shiftSchool(J,Q==="x"?$*Z:0,Q==="y"?$*K:0)}}},"pond-bed":{run:(E)=>E.renderer.refreshSection("pond-bed")},water:{run:(E)=>E.renderer.refreshSection("water")},"lotus:palette":{run:(E)=>E.renderer.refreshSection("lotus")},"duckweed:rebuild":{heavy:!0,run:(E)=>E.renderer.refreshSection("duckweed")},"butterflies:keep":{run:(E)=>E.renderer.refreshSection("butterflies")},"butterflies:respawn":{run:(E)=>E.renderer.refreshSection("butterfly-spawns")}};function cQ(E,H){let W=[],R=[],J=0,Q=0,$=(X)=>{let Y=new Map;for(let G of X){if(!G.effect)continue;let D=Y.get(G.effect)??[];D.push(G),Y.set(G.effect,D)}for(let[G,D]of Y)dQ[G]?.run(H,E,D)},Z=()=>{J=0;let X=W;W=[],$(X)},K=()=>{Q=0;let X=R;R=[],$(X)},U=E.subscribe((X)=>{for(let Y of X){if(!Y.effect)continue;if(dQ[Y.effect]?.heavy)R.push(Y);else W.push(Y)}if(W.length>0&&!J)J=requestAnimationFrame(Z);if(R.length>0&&!Q)Q=window.setTimeout(K,100)});return()=>{if(U(),J)cancelAnimationFrame(J);if(Q)window.clearTimeout(Q)}}var oQ="nagomi:pond-settings:v2",nQ="nagomi:pond-settings:v1";function sQ(E){return r8.some((H)=>H.id===E)}function iQ(E){if(typeof localStorage>"u")return null;try{let H=localStorage.getItem(E);return H?JSON.parse(H):null}catch{return null}}function y5(E,H){if(typeof localStorage>"u")return;try{localStorage.setItem(E,JSON.stringify(H))}catch{}}function h5(E){if(typeof localStorage>"u")return;try{localStorage.removeItem(E)}catch{}}function v5(E){let H={},W=w8(VE),R=new Set(["tiny-fish-schools","lotus-leaves","lotus-flowers","duckweed-patches","butterfly-spawns"]);for(let J of Object.keys(VE.children)){let Q=VE.children[J],$=E[J];if($===void 0)continue;if(Q.kind==="list"||Q.kind==="collection"){if(!Array.isArray($))continue;let Z=W[J];if(JSON.stringify($)!==JSON.stringify(Z)&&(R.has(J)||$.length===Z.length))H[J]=$;continue}FJ(Q,(Z,K)=>{let U=[J,...K],X=K.reduce((D,F)=>D&&typeof D==="object"?D[F]:void 0,$);if(X===void 0)return;let Y=K.reduce((D,F)=>D&&typeof D==="object"?D[F]:void 0,W[J]);if(JSON.stringify(X)===JSON.stringify(Y))return;let G=AW(Z,X,VE);if(G!==void 0)H[U.join(".")]=G})}return H}function aQ(E){let H=iQ(oQ);if(H&&H.version===2&&sQ(H.weather)){E.importOverrides(H.overrides??{},H.weather,H.rain===!0);return}let W=iQ(nQ);if(W&&W.version===1&&sQ(W.weather)&&W.config&&typeof W.config==="object"){let R=v5(W.config);E.importOverrides(R,W.weather,W.rain===!0),rQ(E),h5(nQ)}}function rQ(E){let H=E.meta(),W={version:2,overrides:E.exportOverrides(),weather:H.weather,rain:H.rain};y5(oQ,W)}function tQ(E){E.onPersistRequested(()=>rQ(E));let H=()=>E.flushPersist();if(typeof window<"u")window.addEventListener("pagehide",H);return()=>{if(typeof window<"u")window.removeEventListener("pagehide",H)}}aQ($H);tQ($H);function H$(){let E=Math.max(1,window.innerWidth),H=Math.max(1,window.innerHeight),W=E/H,R=ZH.width/ZH.height;if(W>=R)return{width:Math.round(ZH.height*W),height:ZH.height};return{width:ZH.width,height:Math.round(ZH.width/W)}}var W$=document.querySelector("#pond");if(!W$)throw Error("Missing #pond canvas");var eQ=H$();w6(eQ.width,eQ.height);var cH=new tR,Z7=new iR(W$);Z7.setWeatherPreset($H.meta().weather);cH.setRainIntensity($H.meta().rain?1:0);cQ($H,{school:cH,renderer:Z7});$H.subscribe(()=>{let E=$H.meta();Z7.setWeatherPreset(E.weather),cH.setRainIntensity(E.rain?1:0)});window.addEventListener("resize",()=>{let E=H$();if(E.width===b0&&E.height===x0)return;let H=b0,W=x0;w6(E.width,E.height),cH.resize(E.width/H,E.height/W),Z7.resize(E.width,E.height,H,W)});var C6=!1,WJ=0,eR=0,EJ=0,RJ=performance.now(),E$=0,q6=0,JJ=(E)=>{if(q6=requestAnimationFrame(JJ),WJ>0&&E-E$<WJ-1)return;E$=E,eR+=Math.min((E-RJ)/1000,0.1),RJ=E;while(eR>=SW)EJ+=SW,cH.update(SW,EJ),eR-=SW;Z7.draw(cH,EJ,!1)};q6=requestAnimationFrame(JJ);var $7=null,PW=null,Q7=null,R$=!1;async function f5(){if($7){await $7.resume();return}if(Q7)return Q7;Q7=(async()=>{let E=new AudioContext,H=E.createGain();H.gain.value=0,H.connect(E.destination);let W=await fetch(`/${X7.ambient.source}`),R=await E.decodeAudioData(await W.arrayBuffer()),J=E.createBufferSource();J.buffer=R,J.loop=!0,J.connect(H),J.start(),$7=E,PW=H,await E.resume()})();try{await Q7}finally{Q7=null}}function HJ(){if(!$7||!PW)return;let E=$7.currentTime;PW.gain.cancelScheduledValues(E),PW.gain.setValueAtTime(PW.gain.value,E),PW.gain.linearRampToValueAtTime(R$&&!C6?X7.ambient.volume:0,E+X7.toggleFadeSeconds)}var J$={callTo(E,H){cH.callTo(DE(tE(E,0,1)*b0,tE(H,0,1)*x0))},scatter(){cH.scatter()},reset(){cH.reset()},setPaused(E){if(C6===E)return;if(C6=E,C6)cancelAnimationFrame(q6);else RJ=performance.now(),q6=requestAnimationFrame(JJ);HJ()},setFrameCap(E){WJ=E>0?1000/E:0},setWeather(E){if(r8.some((H)=>H.id===E))$H.setWeather(E)},setRain(E){$H.setRain(E)},setKoiCount(E){$H.set(["koi","initialCount"],tE(Math.round(E),1,48))},setSound(E){if(R$=E,E)f5().then(HJ).catch(()=>{return});else HJ()},state(){let E=$H.meta();return{weather:E.weather,rain:E.rain,koi:cH.count}}};window.koipond=J$;window.webkit?.messageHandlers?.koipond?.postMessage({ready:!0,...J$.state()});})();
