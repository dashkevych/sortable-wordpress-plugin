!function(){"use strict";var t,e={974:function(){var t=window.wp.blocks,e=window.wp.element,r=window.wp.i18n,n=window.wp.coreData,o=window.wp.date,a=window.wp.data,i=window.wp.blockEditor,s=window.wp.components,c=JSON.parse('{"u2":"sortable/date"}');(0,t.registerBlockType)(c.u2,{edit:function(t){const{context:c,attributes:l,setAttributes:u,clientId:f}=t,m=(0,i.useBlockProps)(),p=(0,o.getSettings)(),{getBlock:d,getBlockParents:w}=(0,a.useSelect)((t=>({getBlockParents:t(i.store).getBlockParents,getBlock:t(i.store).getBlock})),[]),{selectBlock:v}=(0,a.useDispatch)(i.store),[g=p.formats.date]=(0,n.useEntityProp)("root","site","date_format"),[k=p.formats.time]=(0,n.useEntityProp)("root","site","time_format"),b=c["sortable/entryDateTime"],h=(0,e.createElement)("time",{dateTime:(0,o.format)("c",b)},(0,o.format)(l.format||g,b));return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(i.InspectorControls,null,(0,e.createElement)(s.PanelBody,{title:(0,r.__)("Settings")},(0,e.createElement)(i.__experimentalDateFormatPicker,{format:l.format,defaultFormat:g,is12Hour:(y=k,/(?:^|[^\\])[aAgh]/.test(y)),onChange:t=>u({format:t})}),(0,e.createElement)(s.Button,{variant:"secondary",onClick:()=>{const t=w(f)[1];"sortable/entry"===d(t).name&&v(t)}},(0,r.__)("Change date","sortable")))),(0,e.createElement)("div",{...m},h));var y},save:function(){return null}})}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var a=r[t]={exports:{}};return e[t](a,a.exports,n),a.exports}n.m=e,t=[],n.O=function(e,r,o,a){if(!r){var i=1/0;for(u=0;u<t.length;u++){r=t[u][0],o=t[u][1],a=t[u][2];for(var s=!0,c=0;c<r.length;c++)(!1&a||i>=a)&&Object.keys(n.O).every((function(t){return n.O[t](r[c])}))?r.splice(c--,1):(s=!1,a<i&&(i=a));if(s){t.splice(u--,1);var l=o();void 0!==l&&(e=l)}}return e}a=a||0;for(var u=t.length;u>0&&t[u-1][2]>a;u--)t[u]=t[u-1];t[u]=[r,o,a]},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={964:0,966:0};n.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,a,i=r[0],s=r[1],c=r[2],l=0;if(i.some((function(e){return 0!==t[e]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(c)var u=c(n)}for(e&&e(r);l<i.length;l++)a=i[l],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(u)},r=self.webpackChunksortable=self.webpackChunksortable||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var o=n.O(void 0,[966],(function(){return n(974)}));o=n.O(o)}();