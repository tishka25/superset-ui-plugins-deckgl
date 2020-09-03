(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1034:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var o={};n.r(o),n.d(o,"default",(function(){return h})),n.d(o,"DEFAULT_NAMESPACE",(function(){return g})),n.d(o,"getNamespace",(function(){return m})),n.d(o,"getColor",(function(){return v})),n.d(o,"getScale",(function(){return _}));var i=n(132),r=n(884);function a(e){return String(e).trim()}function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class l extends r.a{constructor(e,t){super(e=>this.getColor(e)),c(this,"colors",void 0),c(this,"scale",void 0),c(this,"parentForcedColors",void 0),c(this,"forcedColors",void 0),this.colors=e,this.scale=Object(i.a)(),this.scale.range(e),this.parentForcedColors=t,this.forcedColors={}}getColor(e){const t=a(e),n=this.parentForcedColors&&this.parentForcedColors[t];if(n)return n;const o=this.forcedColors[t];return o||this.scale(t)}setColor(e,t){return this.forcedColors[a(e)]=t,this}getColorMap(){const e={};return this.scale.domain().forEach(t=>{e[t.toString()]=this.scale(t)}),s({},e,{},this.forcedColors,{},this.parentForcedColors)}copy(){const e=new l(this.scale.range(),this.parentForcedColors);return e.forcedColors=s({},this.forcedColors),e.domain(this.domain()),e.unknown(this.unknown()),e}domain(e){return void 0===e?this.scale.domain():(this.scale.domain(e),this)}range(e){return void 0===e?this.scale.range():(this.colors=e,this.scale.range(e),this)}unknown(e){return void 0===e?this.scale.unknown():(this.scale.unknown(e),this)}}var u=l,p=n(438);function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class h{constructor(e){d(this,"name",void 0),d(this,"forcedItems",void 0),d(this,"scales",void 0),this.name=e,this.scales={},this.forcedItems={}}getScale(e){var t,n;const o=null!=(t=null!=e?e:Object(p.a)().getDefaultKey())?t:"",i=this.scales[o];if(i)return i;const r=Object(p.a)().get(o),a=new u(null!=(n=null==r?void 0:r.colors)?n:[],this.forcedItems);return this.scales[o]=a,a}setColor(e,t){return this.forcedItems[a(e)]=t,this}}const f={},g="GLOBAL";function m(e=g){const t=f[e];if(t)return t;const n=new h(e);return f[e]=n,n}function v(e,t,n){return m(n).getScale(t).getColor(e)}function _(e,t){return m(t).getScale(e)}},1098:function(e,t,n){"use strict";n.r(t),n.d(t,"getLayer",(function(){return P}));var o=n(894),i=n(895),r=n(897),a=n(896),s=n(909),c=n(898),l=n(983),u=n(960),p=n(1250),d=n(1093),h=n(1026),f="#define SHADER_NAME arc-layer-fragment-shader\n\nprecision highp float;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  gl_FragColor = vColor;\n  gl_FragColor = picking_filterHighlightColor(gl_FragColor);\n  gl_FragColor = picking_filterPickingColor(gl_FragColor);\n}\n",g=p.a.fp64LowPart,m=[0,0,0,255],v={fp64:!1,getSourcePosition:{type:"accessor",value:function(e){return e.sourcePosition}},getTargetPosition:{type:"accessor",value:function(e){return e.targetPosition}},getSourceColor:{type:"accessor",value:m},getTargetColor:{type:"accessor",value:m},getWidth:{type:"accessor",value:1},getHeight:{type:"accessor",value:1},getTilt:{type:"accessor",value:0},widthUnits:"pixels",widthScale:{type:"number",value:1,min:0},widthMinPixels:{type:"number",value:0,min:0},widthMaxPixels:{type:"number",value:Number.MAX_SAFE_INTEGER,min:0},getStrokeWidth:{deprecatedFor:"getWidth"}},_=function(e){function t(){return Object(o.a)(this,t),Object(r.a)(this,Object(a.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(i.a)(t,[{key:"getShaders",value:function(){return this.use64bitProjection()?{vs:"#define SHADER_NAME arc-layer-vertex-shader-64\n\nattribute vec3 positions;\nattribute vec4 instanceSourceColors;\nattribute vec4 instanceTargetColors;\n\nattribute vec4 instancePositions;\nattribute vec4 instancePositions64Low;\n\nattribute vec3 instancePickingColors;\nattribute float instanceWidths;\n\nuniform float numSegments;\nuniform float opacity;\nuniform float widthScale;\nuniform float widthMinPixels;\nuniform float widthMaxPixels;\n\nvarying vec4 vColor;\n\nvec2 paraboloid_fp64(vec2 source[2], vec2 target[2], float ratio) {\n\n  vec2 x[2];\n  vec2_mix_fp64(source, target, ratio, x);\n  vec2 center[2];\n  vec2_mix_fp64(source, target, 0.5, center);\n\n  vec2 dSourceCenter = vec2_distance_fp64(source, center);\n  vec2 dXCenter = vec2_distance_fp64(x, center);\n  return mul_fp64(sum_fp64(dSourceCenter, dXCenter), sub_fp64(dSourceCenter, dXCenter));\n}\nvec2 getExtrusionOffset(vec2 line_clipspace, float offset_direction, float width) {\n  vec2 dir_screenspace = normalize(line_clipspace * project_uViewportSize);\n  dir_screenspace = vec2(-dir_screenspace.y, dir_screenspace.x);\n\n  vec2 offset_screenspace = dir_screenspace * offset_direction * width / 2.0;\n  vec2 offset_clipspace = project_pixel_size_to_clipspace(offset_screenspace);\n\n  return offset_clipspace;\n}\n\nfloat getSegmentRatio(float index) {\n  return smoothstep(0.0, 1.0, index / (numSegments - 1.0));\n}\n\nvoid get_pos_fp64(vec2 source[2], vec2 target[2], float segmentRatio, out vec2 position[4]) {\n\n  vec2 vertex_height = paraboloid_fp64(source, target, segmentRatio);\n\n  vec2 position_temp[2];\n\n  vec2_mix_fp64(source, target, segmentRatio, position_temp);\n\n  position[0] = position_temp[0];\n  position[1] = position_temp[1];\n\n  if (vertex_height.x < 0.0 || (vertex_height.x == 0.0 && vertex_height.y <= 0.0)) {\n    vertex_height = vec2(0.0, 0.0);\n  }\n\n  position[2] = sqrt_fp64(vertex_height);\n  position[3] = vec2(1.0, 0.0);\n}\n\nvoid main(void) {\n  vec2 projected_source_coord[2];\n  vec2 projected_target_coord[2];\n\n  project_position_fp64(instancePositions.xy, instancePositions64Low.xy, projected_source_coord);\n  project_position_fp64(instancePositions.zw, instancePositions64Low.zw, projected_target_coord);\n\n  float segmentIndex = positions.x;\n  float segmentRatio = getSegmentRatio(segmentIndex);\n  float indexDir = mix(-1.0, 1.0, step(segmentIndex, 0.0));\n  float nextSegmentRatio = getSegmentRatio(segmentIndex + indexDir);\n\n  vec2 curr_pos_modelspace[4];\n\n  get_pos_fp64(projected_source_coord, projected_target_coord, segmentRatio,\n    curr_pos_modelspace);\n\n  vec2 next_pos_modelspace[4];\n\n  get_pos_fp64(projected_source_coord, projected_target_coord, nextSegmentRatio,\n    next_pos_modelspace);\n\n  vec4 curr_pos_clipspace = project_common_position_to_clipspace_fp64(curr_pos_modelspace);\n  vec4 next_pos_clipspace = project_common_position_to_clipspace_fp64(next_pos_modelspace);\n  float widthPixels = clamp(\n    project_size_to_pixel(instanceWidths * widthScale),\n    widthMinPixels, widthMaxPixels\n  );\n\n  vec2 offset = getExtrusionOffset(next_pos_clipspace.xy - curr_pos_clipspace.xy, positions.y, widthPixels);\n\n  gl_Position = curr_pos_clipspace + vec4(offset, 0.0, 0.0);\n\n  vec4 color = mix(instanceSourceColors, instanceTargetColors, segmentRatio) / 255.;\n  vColor = vec4(color.rgb, color.a * opacity);\n  picking_setPickingColor(instancePickingColors);\n}\n",fs:f,modules:["project64","picking"]}:{vs:"#define SHADER_NAME arc-layer-vertex-shader\n\nattribute vec3 positions;\nattribute vec4 instanceSourceColors;\nattribute vec4 instanceTargetColors;\nattribute vec4 instancePositions;\nattribute vec4 instancePositions64Low;\nattribute vec3 instancePickingColors;\nattribute float instanceWidths;\nattribute float instanceHeights;\nattribute float instanceTilts;\n\nuniform float numSegments;\nuniform float opacity;\nuniform float widthScale;\nuniform float widthMinPixels;\nuniform float widthMaxPixels;\n\nvarying vec4 vColor;\n\nfloat paraboloid(vec2 source, vec2 target, float ratio) {\n\n  vec2 x = mix(source, target, ratio);\n  vec2 center = mix(source, target, 0.5);\n\n  float dSourceCenter = distance(source, center);\n  float dXCenter = distance(x, center);\n  return (dSourceCenter + dXCenter) * (dSourceCenter - dXCenter);\n}\nvec2 getExtrusionOffset(vec2 line_clipspace, float offset_direction, float width) {\n  vec2 dir_screenspace = normalize(line_clipspace * project_uViewportSize);\n  dir_screenspace = vec2(-dir_screenspace.y, dir_screenspace.x);\n\n  vec2 offset_screenspace = dir_screenspace * offset_direction * width / 2.0;\n  vec2 offset_clipspace = project_pixel_size_to_clipspace(offset_screenspace);\n\n  return offset_clipspace;\n}\n\nfloat getSegmentRatio(float index) {\n  return smoothstep(0.0, 1.0, index / (numSegments - 1.0));\n}\n\nvec3 getPos(vec2 source, vec2 target, float segmentRatio) {\n  float vertexHeight = sqrt(max(0.0, paraboloid(source, target, segmentRatio))) * instanceHeights;\n\n  float tiltAngle = radians(instanceTilts);\n  vec2 tiltDirection = normalize(target - source);\n  vec2 tilt = vec2(-tiltDirection.y, tiltDirection.x) * vertexHeight * sin(tiltAngle);\n\n  return vec3(\n    mix(source, target, segmentRatio) + tilt,\n    vertexHeight * cos(tiltAngle)\n  );\n}\n\nvoid main(void) {\n  vec2 source = project_position(vec3(instancePositions.xy, 0.0), instancePositions64Low.xy).xy;\n  vec2 target = project_position(vec3(instancePositions.zw, 0.0), instancePositions64Low.zw).xy;\n\n  float segmentIndex = positions.x;\n  float segmentRatio = getSegmentRatio(segmentIndex);\n  float indexDir = mix(-1.0, 1.0, step(segmentIndex, 0.0));\n  float nextSegmentRatio = getSegmentRatio(segmentIndex + indexDir);\n\n  vec3 currPos = getPos(source, target, segmentRatio);\n  vec3 nextPos = getPos(source, target, nextSegmentRatio);\n  vec4 curr = project_common_position_to_clipspace(vec4(currPos, 1.0));\n  vec4 next = project_common_position_to_clipspace(vec4(nextPos, 1.0));\n  float widthPixels = clamp(\n    project_size_to_pixel(instanceWidths * widthScale),\n    widthMinPixels, widthMaxPixels\n  );\n  vec2 offset = getExtrusionOffset((next.xy - curr.xy) * indexDir, positions.y, widthPixels);\n  gl_Position = curr + vec4(offset, 0.0, 0.0);\n\n  vec4 color = mix(instanceSourceColors, instanceTargetColors, segmentRatio) / 255.;\n  vColor = vec4(color.rgb, color.a * opacity);\n  picking_setPickingColor(instancePickingColors);\n}\n",fs:f,modules:["picking"]}}},{key:"initializeState",value:function(){this.getAttributeManager().addInstanced({instancePositions:{size:4,transition:!0,accessor:["getSourcePosition","getTargetPosition"],update:this.calculateInstancePositions},instancePositions64Low:{size:4,accessor:["getSourcePosition","getTargetPosition"],update:this.calculateInstancePositions64Low},instanceSourceColors:{size:4,type:5121,transition:!0,accessor:"getSourceColor",defaultValue:m},instanceTargetColors:{size:4,type:5121,transition:!0,accessor:"getTargetColor",defaultValue:m},instanceWidths:{size:1,transition:!0,accessor:"getWidth",defaultValue:1},instanceHeights:{size:1,transition:!0,accessor:"getHeight",defaultValue:1},instanceTilts:{size:1,transition:!0,accessor:"getTilt",defaultValue:0}})}},{key:"updateState",value:function(e){var n=e.props,o=e.oldProps,i=e.changeFlags;if(Object(s.a)(Object(a.a)(t.prototype),"updateState",this).call(this,{props:n,oldProps:o,changeFlags:i}),n.fp64!==o.fp64){var r=this.context.gl;this.state.model&&this.state.model.delete(),this.setState({model:this._getModel(r)}),this.getAttributeManager().invalidateAll()}}},{key:"draw",value:function(e){var t=e.uniforms,n=this.context.viewport,o=this.props,i=o.widthUnits,r=o.widthScale,a=o.widthMinPixels,s=o.widthMaxPixels,c="pixels"===i?n.distanceScales.metersPerPixel[2]:1;this.state.model.setUniforms(Object.assign({},t,{widthScale:r*c,widthMinPixels:a,widthMaxPixels:s})).draw()}},{key:"_getModel",value:function(e){for(var t=[],n=0;n<50;n++)t=t.concat([n,-1,0,n,1,0]);var o=new d.a(e,Object.assign({},this.getShaders(),{id:this.props.id,geometry:new h.a({drawMode:5,attributes:{positions:new Float32Array(t)}}),isInstanced:!0,shaderCache:this.context.shaderCache}));return o.setUniforms({numSegments:50}),o}},{key:"calculateInstancePositions",value:function(e,t){var n=t.startRow,o=t.endRow,i=this.props,r=i.data,a=i.getSourcePosition,s=i.getTargetPosition,c=e.value,u=n*e.size,p=Object(l.a)(r,n,o),d=p.iterable,h=p.objectInfo,f=!0,g=!1,m=void 0;try{for(var v,_=d[Symbol.iterator]();!(f=(v=_.next()).done);f=!0){var b=v.value;h.index++;var y=a(b,h);c[u++]=y[0],c[u++]=y[1];var x=s(b,h);c[u++]=x[0],c[u++]=x[1]}}catch(e){g=!0,m=e}finally{try{f||null==_.return||_.return()}finally{if(g)throw m}}}},{key:"calculateInstancePositions64Low",value:function(e,t){var n=t.startRow,o=t.endRow,i=this.use64bitPositions();if(e.constant=!i,i){var r=this.props,a=r.data,s=r.getSourcePosition,c=r.getTargetPosition,u=e.value,p=n*e.size,d=Object(l.a)(a,n,o),h=d.iterable,f=d.objectInfo,m=!0,v=!1,_=void 0;try{for(var b,y=h[Symbol.iterator]();!(m=(b=y.next()).done);m=!0){var x=b.value;f.index++;var w=s(x,f);u[p++]=g(w[0]),u[p++]=g(w[1]);var S=c(x,f);u[p++]=g(S[0]),u[p++]=g(S[1])}}catch(e){v=!0,_=e}finally{try{m||null==y.return||y.return()}finally{if(v)throw _}}}else e.value=new Float32Array(4)}}]),t}(u.a);_.layerName="ArcLayer",_.defaultProps=v;var b=n(1),y=n.n(b),x=n(874),w=n(913),S=n(923),C=n(915);function P(e,t,n,o){const i=t.data.features,r=e.color_picker,a=e.target_color_picker;return new _({data:i,getSourceColor:e=>e.sourceColor||e.color||[r.r,r.g,r.b,255*r.a],getTargetColor:e=>e.targetColor||e.color||[a.r,a.g,a.b,255*a.a],id:"path-layer-"+e.slice_id,strokeWidth:e.stroke_width?e.stroke_width:3,...Object(w.a)(e,o,(s=e,e=>y.a.createElement("div",{className:"deckgl-tooltip"},y.a.createElement(C.a,{label:Object(x.b)("Start (Longitude, Latitude)")+": ",value:e.object.sourcePosition[0]+", "+e.object.sourcePosition[1]}),y.a.createElement(C.a,{label:Object(x.b)("End (Longitude, Latitude)")+": ",value:e.object.targetPosition[0]+", "+e.object.targetPosition[1]}),s.dimension&&y.a.createElement(C.a,{label:s.dimension+": ",value:""+e.object.cat_color}))))});var s}t.default=Object(S.a)(P,(function(e){const t=[];return e.forEach(e=>{t.push(e.sourcePosition),t.push(e.targetPosition)}),t}))},910:function(e,t,n){"use strict";function o(e,t){if((n=(e=t?e.toExponential(t-1):e.toExponential()).indexOf("e"))<0)return null;var n,o=e.slice(0,n);return[o.length>1?o[0]+o.slice(2):o,+e.slice(n+1)]}n.d(t,"b",(function(){return o})),t.a=function(e){return Math.abs(e=Math.round(e))>=1e21?e.toLocaleString("en").replace(/,/g,""):e.toString(10)}},922:function(e,t,n){"use strict";var o=n(910);t.a=function(e){return(e=Object(o.b)(Math.abs(e)))?e[1]:NaN}},923:function(e,t,n){"use strict";n.d(t,"b",(function(){return S})),n.d(t,"a",(function(){return C}));var o=n(1),i=n.n(o),r=n(0),a=n.n(r),s=n(271),c=n(921),l=n(1034),u=n(930),p=n(924),d=n(916),h=n(928),f=n(905),g=n(919);function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const{getScale:v}=l.a;const _={formData:a.a.object.isRequired,mapboxApiKey:a.a.string.isRequired,setControlValue:a.a.func.isRequired,viewport:a.a.object.isRequired,getLayer:a.a.func.isRequired,getPoints:a.a.func.isRequired,payload:a.a.object.isRequired,onAddFilter:a.a.func,width:a.a.number.isRequired,height:a.a.number.isRequired};class b extends i.a.PureComponent{constructor(e){super(e),m(this,"containerRef",i.a.createRef()),m(this,"setTooltip",e=>{const{current:t}=this.containerRef;t&&t.setTooltip(e)}),this.state=this.getStateFromProps(e),this.getLayers=this.getLayers.bind(this),this.onValuesChange=this.onValuesChange.bind(this),this.toggleCategory=this.toggleCategory.bind(this),this.showSingleCategory=this.showSingleCategory.bind(this)}UNSAFE_componentWillReceiveProps(e){e.payload.form_data!==this.state.formData&&this.setState({...this.getStateFromProps(e)})}onValuesChange(e){this.setState({values:Array.isArray(e)?e:[e,e+this.state.getStep(e)]})}getStateFromProps(e,t){const n=e.payload.data.features||[],o=n.map(e=>e.__timestamp),i=function(e,t){const n=e.color_picker||{r:0,g:0,b:0,a:1},o=[n.r,n.g,n.b,255*n.a],i=v(e.color_scheme),r={};return t.forEach(t=>{if(null!=t.cat_color&&!r.hasOwnProperty(t.cat_color)){let a;a=e.dimension?Object(d.hexToRGB)(i(t.cat_color),255*n.a):o,r[t.cat_color]={color:a,enabled:!0}}}),r}(e.formData,n);if(t&&e.payload.form_data===t.formData)return{...t,categories:i};const r=e.payload.form_data.time_grain_sqla||e.payload.form_data.granularity||"P1D",{start:a,end:s,getStep:c,values:l,disabled:u}=Object(h.a)(o,r),{width:p,height:f,formData:m}=e;let{viewport:_}=e;return m.autozoom&&(_=Object(g.a)(_,{width:p,height:f,points:e.getPoints(n)})),{start:a,end:s,getStep:c,values:l,disabled:u,viewport:_,selected:[],lastClick:0,formData:e.payload.form_data,categories:i}}getLayers(e){const{getLayer:t,payload:n,formData:o,onAddFilter:i}=this.props;let r=n.data.features?[...n.data.features]:[];if(r=this.addColor(r,o),o.js_data_mutator){r=Object(f.a)(o.js_data_mutator)(r)}r=e[0]===e[1]||e[1]===this.end?r.filter(t=>t.__timestamp>=e[0]&&t.__timestamp<=e[1]):r.filter(t=>t.__timestamp>=e[0]&&t.__timestamp<e[1]);const a=this.state.categories;o.dimension&&(r=r.filter(e=>a[e.cat_color]&&a[e.cat_color].enabled));return[t(o,{...n,data:{...n.data,features:r}},i,this.setTooltip)]}addColor(e,t){const n=t.color_picker||{r:0,g:0,b:0,a:1},o=v(t.color_scheme);return e.map(e=>{let i;return t.dimension?(i=Object(d.hexToRGB)(o(e.cat_color),255*n.a),{...e,color:i}):e})}toggleCategory(e){const t=this.state.categories[e],n={...this.state.categories,[e]:{...t,enabled:!t.enabled}};Object.values(n).every(e=>!e.enabled)&&Object.values(n).forEach(e=>{e.enabled=!0}),this.setState({categories:n})}showSingleCategory(e){const t={...this.state.categories};Object.values(t).forEach(e=>{e.enabled=!1}),t[e].enabled=!0,this.setState({categories:t})}render(){return i.a.createElement("div",{style:{position:"relative"}},i.a.createElement(u.a,{ref:this.containerRef,getLayers:this.getLayers,start:this.state.start,end:this.state.end,getStep:this.state.getStep,values:this.state.values,disabled:this.state.disabled,viewport:this.state.viewport,mapboxApiAccessToken:this.props.mapboxApiKey,mapStyle:this.props.formData.mapbox_style,setControlValue:this.props.setControlValue,width:this.props.width,height:this.props.height},i.a.createElement(p.a,{categories:this.state.categories,toggleCategory:this.toggleCategory,showSingleCategory:this.showSingleCategory,position:this.props.formData.legend_position,format:this.props.formData.legend_format})))}}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}b.propTypes=_;const x={formData:a.a.object.isRequired,payload:a.a.object.isRequired,setControlValue:a.a.func.isRequired,viewport:a.a.object.isRequired,onAddFilter:a.a.func,width:a.a.number.isRequired,height:a.a.number.isRequired},w={onAddFilter(){}};function S(e,t){class n extends i.a.PureComponent{constructor(e){super(e),y(this,"containerRef",i.a.createRef()),y(this,"setTooltip",e=>{const{current:t}=this.containerRef;t&&t.setTooltip(e)});const{width:n,height:o,formData:r}=e;let{viewport:a}=e;r.autozoom&&(a=Object(g.a)(a,{width:n,height:o,points:t(e.payload.data.features)})),this.state={viewport:a,layer:this.computeLayer(e)},this.onViewportChange=this.onViewportChange.bind(this)}UNSAFE_componentWillReceiveProps(e){const t={...e.formData,viewport:null},n={...this.props.formData,viewport:null};Object(s.isEqual)(t,n)&&e.payload===this.props.payload||this.setState({layer:this.computeLayer(e)})}onViewportChange(e){this.setState({viewport:e})}computeLayer(t){const{formData:n,payload:o,onAddFilter:i}=t;return e(n,o,i,this.setTooltip)}render(){const{formData:e,payload:t,setControlValue:n,height:o,width:r}=this.props,{layer:a,viewport:s}=this.state;return i.a.createElement(c.a,{ref:this.containerRef,mapboxApiAccessToken:t.data.mapboxApiKey,viewport:s,layers:[a],mapStyle:e.mapbox_style,setControlValue:n,width:r,height:o,onViewportChange:this.onViewportChange})}}return n.propTypes=x,n.defaultProps=w,n}function C(e,t){function n(n){const{formData:o,payload:r,setControlValue:a,viewport:s,width:c,height:l}=n;return i.a.createElement(b,{formData:o,mapboxApiKey:r.data.mapboxApiKey,setControlValue:a,viewport:s,getLayer:e,payload:r,getPoints:t,width:c,height:l})}return n.propTypes=x,n.defaultProps=w,n}},924:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var o=n(1),i=n.n(o),r=n(0),a=n.n(r),s=n(999);n(926);const c={categories:a.a.object,toggleCategory:a.a.func,showSingleCategory:a.a.func,format:a.a.string,position:a.a.oneOf([null,"tl","tr","bl","br"])};class l extends i.a.PureComponent{format(e){if(!this.props.format)return e;const t=parseFloat(e);return Object(s.a)(this.props.format,t)}formatCategoryLabel(e){if(!this.props.format)return e;if(e.includes(" - ")){const t=e.split(" - ");return this.format(t[0])+" - "+this.format(t[1])}return this.format(e)}render(){if(0===Object.keys(this.props.categories).length||null===this.props.position)return null;const e=Object.entries(this.props.categories).map(([e,t])=>{const n={color:"rgba("+t.color.join(", ")+")"},o=t.enabled?"◼":"◻";return i.a.createElement("li",{key:e},i.a.createElement("a",{href:"#",onClick:()=>this.props.toggleCategory(e),onDoubleClick:()=>this.props.showSingleCategory(e)},i.a.createElement("span",{style:n},o)," ",this.formatCategoryLabel(e)))}),t={position:"absolute",["t"===this.props.position.charAt(0)?"top":"bottom"]:"0px",["r"===this.props.position.charAt(1)?"right":"left"]:"10px"};return i.a.createElement("div",{className:"legend",style:t},i.a.createElement("ul",{className:"categories"},e))}}l.propTypes=c,l.defaultProps={categories:{},toggleCategory:()=>{},showSingleCategory:()=>{},format:null,position:"tr"}},926:function(e,t,n){var o=n(436),i=n(927);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var r={insert:"head",singleton:!1};o(i,r);e.exports=i.locals||{}},927:function(e,t,n){(t=n(437)(!1)).push([e.i,'/**\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * "License"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\ndiv.legend {\n  font-size: 90%;\n  position: absolute;\n  background: #fff;\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);\n  margin: 24px;\n  padding: 12px 20px;\n  outline: none;\n  overflow-y: scroll;\n  max-height: 200px;\n}\n\nul.categories {\n  list-style: none;\n  padding-left: 0;\n  margin: 0;\n}\n\nul.categories li a {\n  color: rgb(51, 51, 51);\n  text-decoration: none;\n}\n\nul.categories li a span {\n  margin-right: 10px;\n}\n',""]),e.exports=t},940:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var o=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function i(e){if(!(t=o.exec(e)))throw new Error("invalid format: "+e);var t;return new r({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}function r(e){this.fill=void 0===e.fill?" ":e.fill+"",this.align=void 0===e.align?">":e.align+"",this.sign=void 0===e.sign?"-":e.sign+"",this.symbol=void 0===e.symbol?"":e.symbol+"",this.zero=!!e.zero,this.width=void 0===e.width?void 0:+e.width,this.comma=!!e.comma,this.precision=void 0===e.precision?void 0:+e.precision,this.trim=!!e.trim,this.type=void 0===e.type?"":e.type+""}i.prototype=r.prototype,r.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(void 0===this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(void 0===this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type}},941:function(e,t,n){"use strict";var o,i=n(922),r=n(940),a=n(910),s=function(e,t){var n=Object(a.b)(e,t);if(!n)return e+"";var o=n[0],i=n[1];return i<0?"0."+new Array(-i).join("0")+o:o.length>i+1?o.slice(0,i+1)+"."+o.slice(i+1):o+new Array(i-o.length+2).join("0")},c={"%":function(e,t){return(100*e).toFixed(t)},b:function(e){return Math.round(e).toString(2)},c:function(e){return e+""},d:a.a,e:function(e,t){return e.toExponential(t)},f:function(e,t){return e.toFixed(t)},g:function(e,t){return e.toPrecision(t)},o:function(e){return Math.round(e).toString(8)},p:function(e,t){return s(100*e,t)},r:s,s:function(e,t){var n=Object(a.b)(e,t);if(!n)return e+"";var i=n[0],r=n[1],s=r-(o=3*Math.max(-8,Math.min(8,Math.floor(r/3))))+1,c=i.length;return s===c?i:s>c?i+new Array(s-c+1).join("0"):s>0?i.slice(0,s)+"."+i.slice(s):"0."+new Array(1-s).join("0")+Object(a.b)(e,Math.max(0,t+s-1))[0]},X:function(e){return Math.round(e).toString(16).toUpperCase()},x:function(e){return Math.round(e).toString(16)}},l=function(e){return e},u=Array.prototype.map,p=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];t.a=function(e){var t,n,a=void 0===e.grouping||void 0===e.thousands?l:(t=u.call(e.grouping,Number),n=e.thousands+"",function(e,o){for(var i=e.length,r=[],a=0,s=t[0],c=0;i>0&&s>0&&(c+s+1>o&&(s=Math.max(1,o-c)),r.push(e.substring(i-=s,i+s)),!((c+=s+1)>o));)s=t[a=(a+1)%t.length];return r.reverse().join(n)}),s=void 0===e.currency?"":e.currency[0]+"",d=void 0===e.currency?"":e.currency[1]+"",h=void 0===e.decimal?".":e.decimal+"",f=void 0===e.numerals?l:function(e){return function(t){return t.replace(/[0-9]/g,(function(t){return e[+t]}))}}(u.call(e.numerals,String)),g=void 0===e.percent?"%":e.percent+"",m=void 0===e.minus?"-":e.minus+"",v=void 0===e.nan?"NaN":e.nan+"";function _(e){var t=(e=Object(r.a)(e)).fill,n=e.align,i=e.sign,l=e.symbol,u=e.zero,_=e.width,b=e.comma,y=e.precision,x=e.trim,w=e.type;"n"===w?(b=!0,w="g"):c[w]||(void 0===y&&(y=12),x=!0,w="g"),(u||"0"===t&&"="===n)&&(u=!0,t="0",n="=");var S="$"===l?s:"#"===l&&/[boxX]/.test(w)?"0"+w.toLowerCase():"",C="$"===l?d:/[%p]/.test(w)?g:"",P=c[w],j=/[defgprs%]/.test(w);function O(e){var r,s,c,l=S,d=C;if("c"===w)d=P(e)+d,e="";else{var g=(e=+e)<0||1/e<0;if(e=isNaN(e)?v:P(Math.abs(e),y),x&&(e=function(e){e:for(var t,n=e.length,o=1,i=-1;o<n;++o)switch(e[o]){case".":i=t=o;break;case"0":0===i&&(i=o),t=o;break;default:if(!+e[o])break e;i>0&&(i=0)}return i>0?e.slice(0,i)+e.slice(t+1):e}(e)),g&&0==+e&&"+"!==i&&(g=!1),l=(g?"("===i?i:m:"-"===i||"("===i?"":i)+l,d=("s"===w?p[8+o/3]:"")+d+(g&&"("===i?")":""),j)for(r=-1,s=e.length;++r<s;)if(48>(c=e.charCodeAt(r))||c>57){d=(46===c?h+e.slice(r+1):e.slice(r))+d,e=e.slice(0,r);break}}b&&!u&&(e=a(e,1/0));var O=l.length+e.length+d.length,E=O<_?new Array(_-O+1).join(t):"";switch(b&&u&&(e=a(E+e,E.length?_-d.length:1/0),E=""),n){case"<":e=l+e+d+E;break;case"=":e=l+E+e+d;break;case"^":e=E.slice(0,O=E.length>>1)+l+e+d+E.slice(O);break;default:e=E+l+e+d}return f(e)}return y=void 0===y?6:/[gprs]/.test(w)?Math.max(1,Math.min(21,y)):Math.max(0,Math.min(20,y)),O.toString=function(){return e+""},O}return{format:_,formatPrefix:function(e,t){var n=_(((e=Object(r.a)(e)).type="f",e)),o=3*Math.max(-8,Math.min(8,Math.floor(Object(i.a)(t)/3))),a=Math.pow(10,-o),s=p[8+o/3];return function(e){return n(a*e)+s}}}}},993:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return r}));var o,i,r,a,s=n(941);a={decimal:".",thousands:",",grouping:[3],currency:["$",""],minus:"-"},o=Object(s.a)(a),i=o.format,r=o.formatPrefix},999:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var o=n(105),i=n(872),r=n(36),a=n(993),s=n(941),c=n(882),l=n(884);function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class p extends l.a{constructor(e){super(e=>this.format(e)),u(this,"id",void 0),u(this,"label",void 0),u(this,"description",void 0),u(this,"formatFunc",void 0),u(this,"isInvalid",void 0);const{id:t=Object(c.a)("config.id"),label:n,description:o="",formatFunc:i=Object(c.a)("config.formatFunc"),isInvalid:r=!1}=e;this.id=t,this.label=null!=n?n:t,this.description=o,this.formatFunc=i,this.isInvalid=r}format(e){return null==e||Number.isNaN(e)?""+e:e===Number.POSITIVE_INFINITY?"∞":e===Number.NEGATIVE_INFINITY?"-∞":this.formatFunc(e)}preview(e=12345.432){return e+" => "+this.format(e)}}var d=p;var h={DOLLAR:"$,.2f",DOLLAR_ROUND:"$,d",DOLLAR_ROUND_SIGNED:"+$,d",DOLLAR_SIGNED:"+$,.2f",FLOAT:",.2f",FLOAT_1_POINT:",.1f",FLOAT_2_POINT:",.2f",FLOAT_3_POINT:",.3f",FLOAT_SIGNED:"+,.2f",FLOAT_SIGNED_1_POINT:"+,.1f",FLOAT_SIGNED_2_POINT:"+,.2f",FLOAT_SIGNED_3_POINT:"+,.3f",INTEGER:",d",INTEGER_SIGNED:"+,d",PERCENT:",.2%",PERCENT_1_POINT:",.1%",PERCENT_2_POINT:",.2%",PERCENT_3_POINT:",.3%",PERCENT_SIGNED:"+,.2%",PERCENT_SIGNED_1_POINT:"+,.1%",PERCENT_SIGNED_2_POINT:"+,.2%",PERCENT_SIGNED_3_POINT:"+,.3%",SI:".3s",SI_1_DIGIT:".1s",SI_2_DIGIT:".2s",SI_3_DIGIT:".3s",SMART_NUMBER:"SMART_NUMBER",SMART_NUMBER_SIGNED:"SMART_NUMBER_SIGNED"};const f=Object(a.a)(".3~s"),g=Object(a.a)(".2~f"),m=Object(a.a)(".4~f");function v(e={}){const{description:t,signed:n=!1,id:o,label:i}=e,r=n?e=>e>0?"+":"":()=>"";return new d({description:t,formatFunc:e=>""+r(e)+function(e){if(0===e)return"0";const t=Math.abs(e);return t>=1e3?f(e).replace("G","B"):t>=1?g(e):t>=.001?m(e):t>1e-6?f(1e6*e)+"µ":f(e)}(e),id:o||n?h.SMART_NUMBER_SIGNED:h.SMART_NUMBER,label:null!=i?i:"Adaptive formatter"})}class _ extends i.a{constructor(){super({name:"NumberFormatter",overwritePolicy:r.a.WARN}),this.registerValue(h.SMART_NUMBER,v()),this.registerValue(h.SMART_NUMBER_SIGNED,v({signed:!0})),this.setDefaultKey(h.SMART_NUMBER)}get(e){const t=(""+(null==e||""===e?this.defaultKey:e)).trim();if(this.has(t))return super.get(t);const n=function(e){const{description:t,formatString:n=Object(c.a)("config.formatString"),label:o,locale:i}=e;let r,l=!1;try{r=void 0===i?Object(a.a)(n):Object(s.a)(i).format(n)}catch(e){r=e=>e+" (Invalid format: "+n+")",l=!0}return new d({description:t,formatFunc:r,id:n,isInvalid:l,label:o})}({formatString:t});return this.registerValue(t,n),n}format(e,t){return this.get(e)(t)}}const b=Object(o.a)(_);function y(e,t){return b().format(e,t)}}}]);