(this.webpackJsonppokemons=this.webpackJsonppokemons||[]).push([[0],{34:function(e,t,n){},55:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(25),s=n.n(r),o=n(57),i=n(27),l=(n(34),n(5)),u=window.speechSynthesis,j=u?u.getVoices().filter((function(e){return"en-US"===e.lang})).sort((function(e,t){var n=e.name.toUpperCase(),c=t.name.toUpperCase();return n<c?-1:n===c?0:1})):[];j.map((function(e){return e.name}));var d=j.length>0?function(){var e=j.findIndex((function(e){return e.name.indexOf("David")>=0}));return e<0?0:e}():-1;var f=n(16),b=n.n(f),m=n(26),p=n(12),g=n.n(p),O=n(56);function h(e,t){var n=Object(c.useState)(null),a=Object(l.a)(n,2),r=a[0],s=a[1],o=Object(c.useState)(""),i=Object(l.a)(o,2),u=i[0],j=i[1],d=Object(c.useState)(!1),f=Object(l.a)(d,2),b=f[0],m=f[1];return Object(c.useEffect)((function(){var n,c=e[t];if(c)return s(c),j(""),void m(!1);var a=new g.a.CancelToken((function(e){return n=e}));return m(!0),g.a.get(t,{cancelToken:a}).then((function(n){var c=n.data;e[t]=c,s(c),m(!1)})).catch((function(e){g.a.isCancel(e)||(j(e),m(!1))})),function(){return n()}}),[e,t]),[r,u,b]}function x(e){return e[0].toUpperCase()+e.slice(1)}function v(e){var t=(e=x(e)).match(/([a-z]+)-([-a-z]+)$/i);if(t){var n=t[1],c=t[2];switch(c){case"f":case"female":return"Female ".concat(n);case"m":case"male":return"Male ".concat(n);case"jr":return"".concat(n," Junior");case"mime":case"rime":return"".concat(n," ").concat(c);case"red-meteor":return"Red meteor ".concat(n);case"red-striped":return"Red striped ".concat(n);case"single-strike":return"Single strike ".concat(n);case"rapid-strike":return"Rapid strike ".concat(n);case"oh":case"o":case"fini":case"koko":case"bulu":case"lele":return"".concat(n,"-").concat(c);case"amped-gmax":return"Amped gmax ".concat(n);case"low-key":return"Low key ".concat(n);case"low-key-gmax":return"Low key gmax ".concat(n);case"single-strike-gmax":return"Single strike gmax ".concat(n);case"rapid-strike-gmax":return"Rapid strike gmax ".concat(n);case"normal":case"crowned":case"totem":case"totem-busted":case"original":case"amped":case"ordinary":case"average":case"standard":case"disguised":case"altered":case"eternal":case"primal":case"core":case"small":case"large":case"hero":case"galar":case"mega":case"gmax":case"super":case"eternamax":return"".concat(x(c)," ").concat(n);case"mega-x":return"Mega X ".concat(n);case"mega-y":return"Mega Y ".concat(n);case"incarnate":return"".concat(n," ").concat(c);case"null":return"Type: Null";default:return"Porygon"===n?n+" "+c.toUpperCase():"Oricorio"===n?"".concat(n," (").concat(x(c)," style)"):"".concat(n," (").concat(x(c)," form)")}}return e}var A="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURQAAAP///wAAAHPGg3EAAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACoSURBVGhD7dJLCoRAEATRmb7/oedXIrOKyoYChYiNrYt8iD7WcAKYACaACWACmAAmgAlgApgAlgDPqm57tYEa/1XPOnWBWj6qp40S4DwFQh+ow7tIaAN1/TYB/CWATQPJ/g7w2Z8Esv0cCPdjIN1PgXg/BPL9DaCO3SJg4wVyoI7tBLBrfeSdBLCLAbf/Te8PjH+DnQQwAUwAE8AEMAFMABPABDABaK0XovlHYv9vwRMAAAAASUVORK5CYII=";function k(e,t){return t?A:e.sprites[1]||e.sprites[0]||A}var w={};var y={};function N(e){var t=Object(c.useState)(null),n=Object(l.a)(t,2),a=n[0],r=n[1],s=h(y,e.slice(0,-1)),o=Object(l.a)(s,3),i=o[0],u=o[1],j=o[2];return Object(c.useEffect)((function(){i&&r(function(e){var t=e.name;return{id:e.id,nameId:t,name:v(t),species:e.species,sprites:[e.sprites.front_default,e.sprites.back_default],types:e.types.sort((function(e,t){return Math.sign(t.slot-e.slot)})).map((function(e){return e.type.name}))}}(i))}),[i]),[a,u,j]}function C(){}var S=n(0);function E(e){var t=e.name,n=e.sprites,a=Object(c.useState)(!1),r=Object(l.a)(a,2),s=r[0],o=r[1],i=Object(c.useState)(!1),u=Object(l.a)(i,2),j=u[0],d=u[1],f=Object(c.useCallback)((function(){d(!0)}),[]);Object(c.useEffect)((function(){o(!1),d(!1)}),[t]);var b=Object(c.useCallback)((function(){o(!s),d(!1)}),[s]),m=n[0]||A,p=n[1]||A,g=s?p:m,O=g===A;return Object(S.jsxs)("figure",{onClick:b,className:"pokemon-image",title:"Click to flip",children:[j||Object(S.jsx)("div",{className:"loading",children:Object(S.jsx)("i",{className:"gg-spinner"})}),Object(S.jsx)("img",{hidden:!j,onLoad:f,src:g,alt:"".concat(s?"Back":"Front"," view of ").concat(t,".")}),Object(S.jsx)("figcaption",{children:O?"No ".concat(t," ").concat(s?"back":"front"," view was found."):"".concat(s?"Back":"Front"," view of ").concat(t,".")})]})}function P(e){var t=e.types;return Object(S.jsx)("div",{className:"pokemon-types",children:t.map((function(e){return Object(S.jsx)(U,{type:e},e)}))})}function U(e){var t=e.type;return Object(S.jsx)("div",{className:"pokemon-type pokemon-type-".concat(t),children:t.toUpperCase()})}function R(e){var t=e.selected,n=e.unselect;return Object(S.jsx)(S.Fragment,{children:t?Object(S.jsx)(I,{selected:t,unselect:n}):Object(S.jsx)("article",{className:"pokemon-details closed",children:"Select a pokemon from the right panel."})})}function I(e){var t=e.selected,n=e.unselect,c=N(t.url),a=Object(l.a)(c,3),r=a[0],s=a[1],o=a[2],i=[];return o&&i.push("loading"),s&&i.push("error"),Object(S.jsx)("article",{className:"pokemon-details open ".concat(i.join(" ")),children:r?Object(S.jsxs)(S.Fragment,{children:[Object(S.jsxs)(B,{unselect:n,children:[r.name,Object(S.jsxs)("code",{children:["#",r.id]})]}),Object(S.jsxs)("main",{children:[Object(S.jsx)("aside",{children:Object(S.jsx)(E,{name:r.name,sprites:r.sprites})}),Object(S.jsxs)("section",{children:[Object(S.jsx)(P,{types:r.types}),Object(S.jsx)(F,{pokemon:r})]})]})]}):o?Object(S.jsx)("i",{className:"gg-spinner"}):Object(S.jsxs)(S.Fragment,{children:[Object(S.jsxs)(B,{unselect:n,children:["Error loading data ",v(t.name)]}),Object(S.jsx)("main",{children:s})]})})}function B(e){var t=e.unselect,n=e.children;return Object(S.jsxs)("header",{children:[Object(S.jsx)("button",{onClick:t,children:Object(S.jsx)("i",{className:"gg-chevron-left"})}),Object(S.jsx)("h1",{children:n})]})}function F(e){var t,n=e.pokemon,a=Object(c.useState)(""),r=Object(l.a)(a,2),s=r[0],o=r[1],i=function(e){var t=Object(c.useState)(null),n=Object(l.a)(t,2),a=n[0],r=n[1],s=h(w,e.slice(0,-1)),o=Object(l.a)(s,3),i=o[0],u=o[1],j=o[2];return Object(c.useEffect)((function(){i&&r(function(e){var t,n;return{generationId:e.generation.name,flavorText:(null!==(t=null===(n=e.flavor_text_entries.find((function(e){return"en"===e.language.name})))||void 0===n?void 0:n.flavor_text)&&void 0!==t?t:"").replace(/\n|\f/g," ").trim()}}(i))}),[i]),[a,u,j]}(n.species.url),f=Object(l.a)(i,3),b=f[0],m=f[2],p=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1.25,a=Object(c.useCallback)((function(){u&&(null===u||void 0===u||u.cancel())}),[]);return Object(c.useEffect)((function(){e||null===u||void 0===u||u.cancel()}),[e]),[Object(c.useCallback)((function(c){if(u&&(null===u||void 0===u||u.cancel(),e)){var a=new SpeechSynthesisUtterance(c);d>=0&&(a.voice=j[d]),a.pitch=t,a.lang="en-US",a.rate=n,u.speak(a)}}),[e,t,n]),a]}(),g=Object(l.a)(p,2),O=g[0],x=g[1];return Object(c.useEffect)((function(){return x()}),[x,n]),Object(c.useEffect)((function(){return s&&!m&&O(s),x}),[x,O,m,s]),Object(c.useEffect)((function(){b&&o(function(e,t,n,c,a){return"Pokemon number ".concat(e,", ").concat(t,". ").concat(t," ").concat(function(e,t,n){var c="";switch(t.length){case 0:break;case 1:c=t[0];break;case 2:c=t[0]+" and "+t[1];break;default:c=t.slice(-1).join(", ")+", and "+t[t.length-1]}return"".concat(e," ").concat(c," ").concat(n)}("is a ".concat(D[c]),n,"pokemon"),".\n").concat(a).toLowerCase()}(n.id,n.name,n.types,b.generationId,b.flavorText))}),[n.id,n.name,n.types,b]),Object(S.jsx)(S.Fragment,{children:m?Object(S.jsx)("div",{className:"pokemon-flavor-text",style:{textAlign:"center"},children:Object(S.jsx)("i",{className:"gg-spinner"})}):b?Object(S.jsxs)(S.Fragment,{children:[Object(S.jsxs)("div",{className:"pokemon-generation",children:["Generation"," ",Object(S.jsx)("code",{children:(t=b.generationId,t.slice(11).toUpperCase())})]}),Object(S.jsx)("div",{className:"pokemon-flavor-text",children:b.flavorText})]}):Object(S.jsx)("div",{className:"pokemon-flavor-text",style:{color:"crimson"},children:"Failed to load text for this pokemon."})})}var D={"generation-i":"first generation","generation-ii":"second generation","generation-iii":"third generation","generation-iv":"fourth generation","generation-v":"fifth generation","generation-vi":"sixth generation","generation-vii":"seventh generation","generation-viii":"eighth generation"};var Y=n(28);function L(e){var t=e.pokemon,n=Object(c.useState)(!1),a=Object(l.a)(n,2),r=a[0],s=a[1],o=Object(c.useState)(!1),i=Object(l.a)(o,2),u=i[0],j=i[1],d=Object(c.useCallback)((function(){s(!0)}),[]),f=Object(c.useCallback)((function(){s(!0),j(!0)}),[]);return Object(S.jsxs)(S.Fragment,{children:[t?Object(S.jsx)("img",{hidden:!r,className:"unknown-pokemon-image",src:k(t,u),onLoad:d,onError:f,alt:""}):null,r?null:Object(S.jsx)("div",{className:"unknown-pokemon-image",children:Object(S.jsx)("div",{className:"gg-spinner"})})]})}function M(e){var t=e.pokemon,n=N(t.url),c=Object(l.a)(n,1)[0];return Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)(L,{pokemon:c}),Object(S.jsx)("div",{className:"pokemon-name",children:c?c.name:v(t.name)}),Object(S.jsxs)("div",{className:"pokemon-id",children:["#",c?c.id:T(t)]})]})}function T(e){var t=e.url;return t.slice(t.lastIndexOf("/",t.length-2)+1,-1)}function J(e){var t=e.selected,n=e.setSelected,a=function(){var e=Object(c.useState)([]),t=Object(l.a)(e,2),n=t[0],a=t[1],r=Object(O.a)("pokemons",function(){var e=Object(m.a)(b.a.mark((function e(t){var n,c,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=void 0===(n=t.pageParam)?0:n,c="".concat("https://pokeapi.co/api/v2/pokemon/","?limit=").concat(50,"&offset=").concat(50*r),e.next=4,g.a.get(c,{});case 4:return a=e.sent,e.abrupt("return",a.data.results);case 6:case"end":return e.stop()}var r}),e)})));return function(t){return e.apply(this,arguments)}}(),{getNextPageParam:function(e,t){return!!e.length&&t.length}}),s=r.isFetchingNextPage,o=r.hasNextPage,i=r.fetchNextPage,u=r.status,j=r.error,d=r.data;return Object(c.useEffect)((function(){d&&a(d.pages.flat(1))}),[d]),[n,!o,i,s,j,u]}(),r=Object(l.a)(a,4),s=r[0],o=r[1],i=r[2],u=r[3],j=Object(c.useRef)(null),d=Object(Y.a)({parentRef:j,size:o?s.length:s.length+1,estimateSize:Object(c.useCallback)((function(){return 40}),[])}),f=d.virtualItems,p=d.totalSize;return Object(c.useEffect)((function(){var e=f[f.length-1];if(e){var t=!o&&!u,n=e.index>=s.length-1;t&&n&&i()}}),[s.length,f,u,o,i]),Object(S.jsx)("nav",{ref:j,className:"pokemon-navigation",children:Object(S.jsx)("ul",{style:{height:p},children:f.map((function(e){var c=e.index>s.length-1,a=c&&!o,r=s[e.index];return Object(S.jsx)("li",{className:a?"loading":!t||t!==r&&t.name!==r.name?"":"active",tabIndex:e.index+1,ref:e.measureRef,style:{transform:"translateY(".concat(e.start,"px)")},onClick:c?C:function(){return n(r)},onKeyDown:c?C:function(e){"Return"!==e.key&&" "!==e.key||(e.preventDefault(),n(r))},children:a?Object(S.jsx)("div",{className:"unknown-pokemon-image",children:Object(S.jsx)("div",{className:"gg-spinner"})}):c?null:Object(S.jsx)(M,{pokemon:r})},e.index)}))})})}function Q(){var e=Object(c.useState)(null),t=Object(l.a)(e,2),n=t[0],a=t[1],r=Object(c.useCallback)((function(){return a(null)}),[]);return Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)(K,{}),Object(S.jsx)(J,{selected:n,setSelected:a}),Object(S.jsx)(R,{selected:n,unselect:r}),Object(S.jsx)(G,{})]})}function K(){return Object(S.jsx)("header",{children:Object(S.jsx)("h1",{children:"Pokedex"})})}function G(){return Object(S.jsxs)("footer",{children:[Object(S.jsx)("p",{children:"All right rights reserved to their respective owners."}),Object(S.jsxs)("p",{children:["Website made using ",Object(S.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://pokeapi.co/docs/v2",children:"PokeAPI"})," backend. Source available on ",Object(S.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/blfunex/pokemons/",children:"GitHub"}),"."]}),Object(S.jsx)("p",{children:"Pokemons are a \xa9 intellectual property of Nintendo."})]})}var W=new o.a;s.a.render(Object(S.jsx)(a.a.StrictMode,{children:Object(S.jsx)(i.a,{client:W,children:Object(S.jsx)(Q,{})})}),document.getElementById("root")),"https:"===location.protocol||location.host.startsWith("localhost")||(location.href=location.href.replace("http://","https://"))}},[[55,1,2]]]);
//# sourceMappingURL=main.69ab8e26.chunk.js.map