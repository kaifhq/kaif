var C=Symbol();function L(i,m,...f){return i===C?f:typeof i=="function"?i({...m,children:f}):{...m,elem:i,children:f}}var x=(i,m)=>{let f={$e:i,elem:i.nodeName.toLowerCase()},o,l="toLowerCase",a=()=>{o=g(f,m(),i),r(f),f=o},r=t=>{(t.children??[]).map(r),t.R||(t=t.$e.remove())},g=(t,e,p)=>{Array.isArray(e)&&(e={children:e}),(typeof e=="string"||typeof e=="number")&&(e={innerText:e.toString()}),e.elem=e.elem||"span",!t||(o=t.elem!==e.elem)?(t&&o&&r(t),e.$e=document.createElement(e.elem),p.append(e.$e)):(t.R=!0,e.$e=t.$e,e.C=t.C);let{$e:s,elem:E,children:b,C:h,...d}=e;if(h)for(let n in h)s.removeEventListener(n.substring(2)[l](),e.C[n]);e.C={};for(let n in d)typeof(o=d[n])>"u"||(n.indexOf("on")!=0?typeof o=="object"?Object.assign(s[n],o):s[n]=o:s.addEventListener(n.substring(2)[l](),e.C[n]=y=>{d[n](y),n[2][l]()===n[2]&&a()}));return b?{...e,children:b.map((n,y)=>g(t&&t.children&&t.children[y],n,s))}:e};return a(),a},j={init:x,h:L,Fragment:C};export{j as default};
