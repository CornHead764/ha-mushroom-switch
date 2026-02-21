function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:g,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,_=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...g(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,f?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,x=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,O=`<${P}>`,z=document,T=()=>z.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,I="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,R=/>/g,H=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,D=/"/g,B=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),F=new WeakMap,G=z.createTreeWalker(z,129);function Z(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=j;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===j?"!--"===c[1]?n=N:void 0!==c[1]?n=R:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=H):void 0!==c[3]&&(n=H):n===H?">"===c[0]?(n=o??j,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?H:'"'===c[3]?D:L):n===D||n===L?n=H:n===N||n===R?n=j:(n=H,o=void 0);const d=n===H&&t[e+1].startsWith("/>")?" ":"";r+=n===j?i+O:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+k+d):i+k+(-2===l?e:d)}return[Z(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=K.createElement(c,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[r++],i=s.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),G.nextNode(),a.push({type:2,index:++o});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=M(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);G.currentNode=s;let o=G.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Y(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=G.nextNode(),r++)}return G.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),M(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new K(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Y(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=X(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=X(this,s[i+n],e,n),a===W&&(a=this._$AH[n]),r||=!M(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(K,Y),(A.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let at=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Y(e.insertBefore(T(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},dt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return gt({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut=1,mt=t=>(...e)=>({_$litDirective$:t,values:e});let _t=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft=mt(class extends _t{constructor(t){if(super(t),t.type!==ut||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return W}}),bt="important",yt=" !"+bt,vt=mt(class extends _t{constructor(t){if(super(t),t.type!==ut||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(yt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?bt:""):i[t]=s}}return W}});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $t(t){const e=window;e.customCards=e.customCards||[],e.customCards.push({...t,preview:!0})}const wt="mushroom-switch-toggle-card",At=`${wt}-editor`,xt=["switch","input_boolean"];$t({type:wt,name:"Mushroom Switch Toggle Card",description:"Mushroom-style card with inline toggle switch for switch entities"});let Et=class extends at{static getStubConfig(t){const e=Object.keys(t.states).filter(t=>xt.includes(t.split(".")[0]));return{type:`custom:${wt}`,entity:e[0]}}static async getConfigElement(){return await Promise.resolve().then(function(){return Tt}),document.createElement(At)}setConfig(t){this._config={tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}getCardSize(){return 1}getLayoutOptions(){return{grid_columns:2,grid_rows:1}}getGridOptions(){return{columns:6,rows:1,min_columns:4,min_rows:1}}get _stateObj(){if(this._config&&this.hass&&this._config.entity)return this.hass.states[this._config.entity]}_isActive(t){return"unavailable"!==t.state&&"unknown"!==t.state&&"off"!==t.state}_isAvailable(t){return"unavailable"!==t.state}_handleAction(){if(!this.hass||!this._config)return;const t=this._config.tap_action?.action||"more-info";"more-info"===t?this._fireMoreInfo():"toggle"===t&&this._toggleEntity()}_fireMoreInfo(){this.dispatchEvent(new CustomEvent("hass-more-info",{composed:!0,bubbles:!0,detail:{entityId:this._config?.entity}}))}_toggleEntity(){this.hass&&this._config?.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this._config.entity})}_handleToggleClick(t){t.stopPropagation(),this._toggleEntity()}render(){if(!this._config||!this.hass||!this._config.entity)return q;const t=this._stateObj;if(!t)return this._renderNotFound();const e=this._config.name||t.attributes.friendly_name||"",i=this._config.icon,s=this._isActive(t),o=this._isAvailable(t),r="on"===t.state,n=this._config.fill_container||!1,a=this._config.icon_type||"icon",c=this._config.primary_info||"name",l=this._config.secondary_info||"state",h=this._config.icon_color,d={};if(h&&s){const t=this._computeRgbColor(h);d["--icon-color"]=`rgb(${t})`,d["--shape-color"]=`rgba(${t}, 0.2)`}const g=this.hass.formatEntityState?this.hass.formatEntityState(t):t.state,p=this._computeInfoDisplay(c,e,g,t),u=this._computeInfoDisplay(l,e,g,t),m="entity-picture"===a?t.attributes.entity_picture:void 0;return V`
      <ha-card class=${ft({"fill-container":n})}>
        <div class="container">
          <div class="main-row" @click=${this._handleAction}>
            ${"none"!==a?V`
                  <div class="icon-container">
                    ${m?V`
                          <mushroom-shape-avatar
                            .picture_url=${this.hass.hassUrl?this.hass.hassUrl(m):m}
                          ></mushroom-shape-avatar>
                        `:V`
                          <mushroom-shape-icon .disabled=${!s} style=${vt(d)}>
                            <ha-state-icon .hass=${this.hass} .stateObj=${t} .icon=${i}></ha-state-icon>
                          </mushroom-shape-icon>
                        `}
                    ${o?q:V`<mushroom-badge-icon class="unavailable" icon="mdi:help"></mushroom-badge-icon>`}
                  </div>
                `:q}
            ${"none"!==c||"none"!==l?V`
                  <mushroom-state-info
                    .primary=${p}
                    .secondary=${u}
                  ></mushroom-state-info>
                `:q}
            <div class="toggle-wrapper" @click=${this._handleToggleClick}>
              <div
                class=${ft({toggle:!0,"toggle--on":r,"toggle--off":!r,"toggle--disabled":!o})}
              >
                <div class="toggle-track">
                  <div class="toggle-knob"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `}_renderNotFound(){return V`
      <ha-card>
        <div class="container">
          <div class="main-row">
            <div class="icon-container">
              <mushroom-shape-icon disabled>
                <ha-icon icon="mdi:help"></ha-icon>
              </mushroom-shape-icon>
              <mushroom-badge-icon class="not-found" icon="mdi:exclamation-thick"></mushroom-badge-icon>
            </div>
            <mushroom-state-info
              .primary=${this._config?.entity}
              .secondary=${"Not found"}
            ></mushroom-state-info>
          </div>
        </div>
      </ha-card>
    `}_computeRgbColor(t){if("primary"===t||"accent"===t)return`var(--rgb-${t}-color)`;if(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white","disabled"].includes(t))return`var(--rgb-${t})`;if(t.startsWith("#")){return`${parseInt(t.slice(1,3),16)}, ${parseInt(t.slice(3,5),16)}, ${parseInt(t.slice(5,7),16)}`}return t}_computeInfoDisplay(t,e,i,s){switch(t){case"name":default:return e;case"state":return i;case"last-changed":return s.last_changed;case"last-updated":return s.last_updated;case"none":return}}static get styles(){return n`
      :host {
        --spacing: var(--mush-spacing, 10px);
        --icon-size: var(--mush-icon-size, 36px);
        --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
        --icon-border-radius: var(--mush-icon-border-radius, 50%);
        --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
        --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
        --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
        --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
        --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
        --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
        --card-primary-color: var(--mush-card-primary-color, var(--primary-text-color));
        --card-secondary-color: var(--mush-card-secondary-color, var(--primary-text-color));
        --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
        --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);
        --control-spacing: var(--mush-control-spacing, 12px);
        --control-height: var(--mush-control-height, 42px);
        --control-border-radius: var(--mush-control-border-radius, 12px);
        --badge-size: var(--mush-badge-size, 16px);
        --badge-icon-size: var(--mush-badge-icon-size, 0.75em);
        --badge-border-radius: var(--mush-badge-border-radius, 50%);
        --layout-align: var(--mush-layout-align, center);
      }
      ha-card {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: var(--layout-align);
        height: auto;
      }
      ha-card.fill-container {
        height: 100%;
      }
      :host([layout="grid"]) ha-card {
        height: 100%;
      }
      .container {
        display: flex;
        flex-direction: column;
      }
      .main-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: var(--spacing);
        gap: var(--spacing);
        cursor: pointer;
        box-sizing: border-box;
        height: 100%;
      }
      .icon-container {
        position: relative;
        flex-shrink: 0;
      }
      .icon-container mushroom-badge-icon {
        position: absolute;
        top: -3px;
        right: -3px;
      }
      mushroom-shape-icon {
        --icon-color: rgb(var(--rgb-state-entity, var(--rgb-blue, 33, 150, 243)));
        --shape-color: rgba(var(--rgb-state-entity, var(--rgb-blue, 33, 150, 243)), 0.2);
      }
      mushroom-state-info {
        min-width: 0;
        flex: 1;
      }
      .unavailable {
        --main-color: rgb(var(--rgb-warning, var(--rgb-orange, 255, 152, 0)));
      }
      .not-found {
        --main-color: rgb(var(--rgb-danger, var(--rgb-red, 244, 67, 54)));
      }

      /* Toggle switch - inline, right-aligned */
      .toggle-wrapper {
        flex-shrink: 0;
        cursor: pointer;
        padding: 4px;
        -webkit-tap-highlight-color: transparent;
      }
      .toggle {
        position: relative;
        display: inline-flex;
        align-items: center;
      }
      .toggle-track {
        width: 46px;
        height: 26px;
        border-radius: 13px;
        background-color: rgba(var(--rgb-disabled, 189, 189, 189), 0.4);
        transition: background-color 280ms ease-in-out;
        position: relative;
        display: flex;
        align-items: center;
      }
      .toggle--on .toggle-track {
        background-color: rgba(var(--rgb-state-entity, var(--rgb-blue, 33, 150, 243)), 0.4);
      }
      .toggle-knob {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgb(var(--rgb-disabled, 189, 189, 189));
        position: absolute;
        left: 3px;
        transition: transform 280ms ease-in-out, background-color 280ms ease-in-out;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .toggle--on .toggle-knob {
        transform: translateX(20px);
        background-color: rgb(var(--rgb-state-entity, var(--rgb-blue, 33, 150, 243)));
      }
      .toggle--disabled .toggle-track {
        opacity: 0.5;
      }
      .toggle--disabled {
        cursor: not-allowed;
      }
    `}};t([gt({attribute:!1})],Et.prototype,"hass",void 0),t([pt()],Et.prototype,"_config",void 0),t([gt({reflect:!0,type:String})],Et.prototype,"layout",void 0),Et=t([lt(wt)],Et);const St="mushroom-light-toggle-card",Ct=`${St}-editor`,kt=["light"];$t({type:St,name:"Mushroom Light Toggle Card",description:"Mushroom-style light card with inline toggle switch and brightness slider"});let Pt=class extends at{static getStubConfig(t){const e=Object.keys(t.states).filter(t=>kt.includes(t.split(".")[0]));return{type:`custom:${St}`,entity:e[0],show_brightness_control:!0}}static async getConfigElement(){return await Promise.resolve().then(function(){return It}),document.createElement(Ct)}setConfig(t){this._config={tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}getCardSize(){return this._config?.show_brightness_control?2:1}getLayoutOptions(){return{grid_columns:2,grid_rows:this._config?.show_brightness_control?2:1}}getGridOptions(){return{columns:6,rows:this._config?.show_brightness_control?2:1,min_columns:4,min_rows:1}}get _stateObj(){if(this._config&&this.hass&&this._config.entity)return this.hass.states[this._config.entity]}_isActive(t){return"unavailable"!==t.state&&"unknown"!==t.state&&"off"!==t.state}_isAvailable(t){return"unavailable"!==t.state}updated(t){super.updated(t),this.hass&&t.has("hass")&&this._updateBrightness()}_updateBrightness(){const t=this._stateObj;t&&this._isActive(t)?this._brightness=t.attributes.brightness:this._brightness=void 0}_handleAction(){if(!this.hass||!this._config)return;const t=this._config.tap_action?.action||"more-info";"more-info"===t?this._fireMoreInfo():"toggle"===t&&this._toggleEntity()}_fireMoreInfo(){this.dispatchEvent(new CustomEvent("hass-more-info",{composed:!0,bubbles:!0,detail:{entityId:this._config?.entity}}))}_toggleEntity(){this.hass&&this._config?.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this._config.entity})}_handleToggleClick(t){t.stopPropagation(),this._toggleEntity()}_handleSliderInput(t){const e=t.target;this._sliderValue=parseInt(e.value,10)}_handleSliderChange(t){const e=t.target,i=parseInt(e.value,10);this._sliderValue=void 0,this.hass&&this._config?.entity&&this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:i})}_getRGBColor(t){const e=t.attributes.rgb_color||t.attributes.rgbw_color||t.attributes.rgbww_color;return e?e.slice(0,3):void 0}render(){if(!this._config||!this.hass||!this._config.entity)return q;const t=this._stateObj;if(!t)return this._renderNotFound();const e=this._config.name||t.attributes.friendly_name||"",i=this._config.icon,s=this._isActive(t),o=this._isAvailable(t),r="on"===t.state,n=this._config.fill_container||!1,a=this._config.icon_type||"icon",c=this._config.primary_info||"name",l=this._config.secondary_info||"state",h=this._getRGBColor(t),d=this._config.icon_color,g=this._config.use_light_color,p={};if(h&&g&&s){const t=h.join(",");p["--icon-color"]=`rgb(${t})`,p["--shape-color"]=`rgba(${t}, 0.25)`}else if(d&&s){const t=this._computeRgbColor(d);p["--icon-color"]=`rgb(${t})`,p["--shape-color"]=`rgba(${t}, 0.2)`}let u=this.hass.formatEntityState?this.hass.formatEntityState(t):t.state;null!=this._brightness&&this.hass.formatEntityAttributeValue&&(u=this.hass.formatEntityAttributeValue(t,"brightness",this._brightness));const m=this._computeInfoDisplay(c,e,u,t),_=this._computeInfoDisplay(l,e,u,t),f="entity-picture"===a?t.attributes.entity_picture:void 0,b=this._sliderValue??(null!=this._brightness?Math.round(this._brightness/255*100):0),y=this._config.show_brightness_control&&s&&o,v=this._config.collapsible_controls,$=y&&(!v||s),w={};if(h&&g&&s){const t=h.join(",");w["--slider-color"]=`rgb(${t})`,w["--slider-bg-color"]=`rgba(${t}, 0.2)`}else if(d&&s){const t=this._computeRgbColor(d);w["--slider-color"]=`rgb(${t})`,w["--slider-bg-color"]=`rgba(${t}, 0.2)`}const A={};if(h&&g&&s){const t=h.join(",");A["--toggle-active-color"]=`${t}`}return V`
      <ha-card class=${ft({"fill-container":n})}>
        <div class="container">
          <div class="main-row" @click=${this._handleAction}>
            ${"none"!==a?V`
                  <div class="icon-container">
                    ${f?V`
                          <mushroom-shape-avatar
                            .picture_url=${this.hass.hassUrl?this.hass.hassUrl(f):f}
                          ></mushroom-shape-avatar>
                        `:V`
                          <mushroom-shape-icon .disabled=${!s} style=${vt(p)}>
                            <ha-state-icon .hass=${this.hass} .stateObj=${t} .icon=${i}></ha-state-icon>
                          </mushroom-shape-icon>
                        `}
                    ${o?q:V`<mushroom-badge-icon class="unavailable" icon="mdi:help"></mushroom-badge-icon>`}
                  </div>
                `:q}
            ${"none"!==c||"none"!==l?V`
                  <mushroom-state-info
                    .primary=${m}
                    .secondary=${_}
                  ></mushroom-state-info>
                `:q}
            <div
              class="toggle-wrapper"
              style=${vt(A)}
              @click=${this._handleToggleClick}
            >
              <div
                class=${ft({toggle:!0,"toggle--on":r,"toggle--off":!r,"toggle--disabled":!o})}
              >
                <div class="toggle-track">
                  <div class="toggle-knob"></div>
                </div>
              </div>
            </div>
          </div>
          ${$?V`
                <div class="controls" style=${vt(w)}>
                  <div class="brightness-slider-container">
                    <input
                      type="range"
                      class="brightness-slider"
                      min="1"
                      max="100"
                      .value=${String(b)}
                      @input=${this._handleSliderInput}
                      @change=${this._handleSliderChange}
                    />
                    <div
                      class="brightness-slider-track"
                      style=${vt({width:`${b}%`})}
                    ></div>
                  </div>
                </div>
              `:q}
        </div>
      </ha-card>
    `}_renderNotFound(){return V`
      <ha-card>
        <div class="container">
          <div class="main-row">
            <div class="icon-container">
              <mushroom-shape-icon disabled>
                <ha-icon icon="mdi:help"></ha-icon>
              </mushroom-shape-icon>
              <mushroom-badge-icon class="not-found" icon="mdi:exclamation-thick"></mushroom-badge-icon>
            </div>
            <mushroom-state-info
              .primary=${this._config?.entity}
              .secondary=${"Not found"}
            ></mushroom-state-info>
          </div>
        </div>
      </ha-card>
    `}_computeRgbColor(t){if("primary"===t||"accent"===t)return`var(--rgb-${t}-color)`;if(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white","disabled"].includes(t))return`var(--rgb-${t})`;if(t.startsWith("#")){return`${parseInt(t.slice(1,3),16)}, ${parseInt(t.slice(3,5),16)}, ${parseInt(t.slice(5,7),16)}`}return t}_computeInfoDisplay(t,e,i,s){switch(t){case"name":default:return e;case"state":return i;case"last-changed":return s.last_changed;case"last-updated":return s.last_updated;case"none":return}}static get styles(){return n`
      :host {
        --spacing: var(--mush-spacing, 10px);
        --icon-size: var(--mush-icon-size, 36px);
        --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
        --icon-border-radius: var(--mush-icon-border-radius, 50%);
        --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
        --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
        --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
        --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
        --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
        --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
        --card-primary-color: var(--mush-card-primary-color, var(--primary-text-color));
        --card-secondary-color: var(--mush-card-secondary-color, var(--primary-text-color));
        --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
        --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);
        --control-spacing: var(--mush-control-spacing, 12px);
        --control-height: var(--mush-control-height, 42px);
        --control-border-radius: var(--mush-control-border-radius, 12px);
        --badge-size: var(--mush-badge-size, 16px);
        --badge-icon-size: var(--mush-badge-icon-size, 0.75em);
        --badge-border-radius: var(--mush-badge-border-radius, 50%);
        --layout-align: var(--mush-layout-align, center);
      }
      ha-card {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: var(--layout-align);
        height: auto;
      }
      ha-card.fill-container {
        height: 100%;
      }
      :host([layout="grid"]) ha-card {
        height: 100%;
      }
      .container {
        display: flex;
        flex-direction: column;
      }
      .main-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: var(--spacing);
        gap: var(--spacing);
        cursor: pointer;
        box-sizing: border-box;
        height: 100%;
      }
      .icon-container {
        position: relative;
        flex-shrink: 0;
      }
      .icon-container mushroom-badge-icon {
        position: absolute;
        top: -3px;
        right: -3px;
      }
      mushroom-shape-icon {
        --icon-color: rgb(var(--rgb-state-light, var(--rgb-orange, 255, 152, 0)));
        --shape-color: rgba(var(--rgb-state-light, var(--rgb-orange, 255, 152, 0)), 0.2);
      }
      mushroom-state-info {
        min-width: 0;
        flex: 1;
      }
      .unavailable {
        --main-color: rgb(var(--rgb-warning, var(--rgb-orange, 255, 152, 0)));
      }
      .not-found {
        --main-color: rgb(var(--rgb-danger, var(--rgb-red, 244, 67, 54)));
      }

      /* Toggle switch - inline with entity info, right-aligned */
      .toggle-wrapper {
        --toggle-active-color: var(--rgb-state-light, var(--rgb-orange, 255, 152, 0));
        flex-shrink: 0;
        cursor: pointer;
        padding: 4px;
        -webkit-tap-highlight-color: transparent;
      }
      .toggle {
        position: relative;
        display: inline-flex;
        align-items: center;
      }
      .toggle-track {
        width: 46px;
        height: 26px;
        border-radius: 13px;
        background-color: rgba(var(--rgb-disabled, 189, 189, 189), 0.4);
        transition: background-color 280ms ease-in-out;
        position: relative;
        display: flex;
        align-items: center;
      }
      .toggle--on .toggle-track {
        background-color: rgba(var(--toggle-active-color), 0.4);
      }
      .toggle-knob {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgb(var(--rgb-disabled, 189, 189, 189));
        position: absolute;
        left: 3px;
        transition: transform 280ms ease-in-out, background-color 280ms ease-in-out;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .toggle--on .toggle-knob {
        transform: translateX(20px);
        background-color: rgb(var(--toggle-active-color));
      }
      .toggle--disabled .toggle-track {
        opacity: 0.5;
      }
      .toggle--disabled {
        cursor: not-allowed;
      }

      /* Brightness slider - below the main row, full width */
      .controls {
        --slider-color: rgb(var(--rgb-state-light, var(--rgb-orange, 255, 152, 0)));
        --slider-bg-color: rgba(var(--rgb-state-light, var(--rgb-orange, 255, 152, 0)), 0.2);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: var(--control-spacing);
        padding-top: 0;
        box-sizing: border-box;
        gap: var(--control-spacing);
      }
      .brightness-slider-container {
        flex: 1;
        height: var(--control-height);
        border-radius: var(--control-border-radius);
        background-color: var(--slider-bg-color);
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }
      .brightness-slider {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        opacity: 0;
        cursor: pointer;
        z-index: 2;
        -webkit-appearance: none;
        appearance: none;
      }
      .brightness-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 0;
        height: 0;
      }
      .brightness-slider::-moz-range-thumb {
        width: 0;
        height: 0;
        border: none;
      }
      .brightness-slider-track {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: var(--slider-color);
        border-radius: var(--control-border-radius);
        transition: width 100ms ease-in-out;
        pointer-events: none;
      }
    `}};t([gt({attribute:!1})],Pt.prototype,"hass",void 0),t([pt()],Pt.prototype,"_config",void 0),t([pt()],Pt.prototype,"_brightness",void 0),t([pt()],Pt.prototype,"_sliderValue",void 0),t([gt({reflect:!0,type:String})],Pt.prototype,"layout",void 0),Pt=t([lt(St)],Pt);console.info("%c🍄 Mushroom Switch Cards 🍄 - 1.0.0","color: #ef5350; font-weight: 700;");const Ot=[{name:"entity",selector:{entity:{domain:["switch","input_boolean"]}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{type:"grid",name:"",schema:[{name:"layout",selector:{select:{options:["default","horizontal","vertical"],mode:"dropdown"}}},{name:"fill_container",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"primary_info",selector:{select:{options:["name","state","last-changed","last-updated","none"],mode:"dropdown"}}},{name:"secondary_info",selector:{select:{options:["name","state","last-changed","last-updated","none"],mode:"dropdown"}}},{name:"icon_type",selector:{select:{options:["icon","entity-picture","none"],mode:"dropdown"}}}]},{name:"icon_color",selector:{select:{options:["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","grey","disabled"],mode:"dropdown",custom_value:!0}}},{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}];let zt=class extends at{setConfig(t){this._config=t}_computeLabel(t){if(this.hass)switch(t.name){case"entity":return"Entity";case"name":return"Name";case"icon":return"Icon";case"icon_color":return"Icon Color";case"layout":return"Layout";case"fill_container":return"Fill Container";case"primary_info":return"Primary Info";case"secondary_info":return"Secondary Info";case"icon_type":return"Icon Type";case"tap_action":return"Tap Action";case"hold_action":return"Hold Action";case"double_tap_action":return"Double Tap Action"}return t.name}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ot}
        .computeLabel=${this._computeLabel.bind(this)}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:q}_valueChanged(t){const e=t.detail.value,i=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(i)}static get styles(){return n`
      :host {
        display: block;
      }
    `}};t([gt({attribute:!1})],zt.prototype,"hass",void 0),t([pt()],zt.prototype,"_config",void 0),zt=t([lt("mushroom-switch-toggle-card-editor")],zt);var Tt=Object.freeze({__proto__:null,get MushroomSwitchToggleCardEditor(){return zt}});const Mt=[{name:"entity",selector:{entity:{domain:["light"]}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{type:"grid",name:"",schema:[{name:"layout",selector:{select:{options:["default","horizontal","vertical"],mode:"dropdown"}}},{name:"fill_container",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"primary_info",selector:{select:{options:["name","state","last-changed","last-updated","none"],mode:"dropdown"}}},{name:"secondary_info",selector:{select:{options:["name","state","last-changed","last-updated","none"],mode:"dropdown"}}},{name:"icon_type",selector:{select:{options:["icon","entity-picture","none"],mode:"dropdown"}}}]},{name:"icon_color",selector:{select:{options:["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","grey","disabled"],mode:"dropdown",custom_value:!0}}},{type:"grid",name:"",schema:[{name:"use_light_color",selector:{boolean:{}}},{name:"show_brightness_control",selector:{boolean:{}}},{name:"collapsible_controls",selector:{boolean:{}}}]},{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}];let Ut=class extends at{setConfig(t){this._config=t}_computeLabel(t){return{entity:"Entity",name:"Name",icon:"Icon",icon_color:"Icon Color",layout:"Layout",fill_container:"Fill Container",primary_info:"Primary Info",secondary_info:"Secondary Info",icon_type:"Icon Type",use_light_color:"Use Light Color",show_brightness_control:"Show Brightness Control",collapsible_controls:"Collapsible Controls",tap_action:"Tap Action",hold_action:"Hold Action",double_tap_action:"Double Tap Action"}[t.name]||t.name}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Mt}
        .computeLabel=${this._computeLabel.bind(this)}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:q}_valueChanged(t){const e=t.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}static get styles(){return n`
      :host {
        display: block;
      }
    `}};t([gt({attribute:!1})],Ut.prototype,"hass",void 0),t([pt()],Ut.prototype,"_config",void 0),Ut=t([lt("mushroom-light-toggle-card-editor")],Ut);var It=Object.freeze({__proto__:null,get MushroomLightToggleCardEditor(){return Ut}});
