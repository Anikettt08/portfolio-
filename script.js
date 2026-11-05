(function(){
  var r=document.documentElement,b=document.getElementById("theme");
  try{var s=localStorage.getItem("theme");if(s)r.setAttribute("data-theme",s)}catch(e){}
  b.addEventListener("click",function(){
    var n=r.getAttribute("data-theme")==="dark"?"light":"dark";
    r.setAttribute("data-theme",n);
    try{localStorage.setItem("theme",n)}catch(e){}
  });
})();


(function(){
var hero=document.querySelector(".hero"),stage=hero.querySelector(".stage"),btn=document.getElementById("replay");
var E={hi:hero.querySelector(".hi"),name:document.getElementById("t-name"),role:document.getElementById("t-role"),pic:document.getElementById("t-pic"),btns:document.getElementById("t-btns"),ghost:hero.querySelector(".ghost")};
var run=0;
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){btn.hidden=true;return}
function wait(ms){return new Promise(function(r){setTimeout(r,ms)})}
function rect(el){var h=hero.getBoundingClientRect(),r=el.getBoundingClientRect();return{x:r.left-h.left,y:r.top-h.top,w:r.width,h:r.height}}
function split(el){el._t=el._t||el.textContent;el.textContent="";return Array.from(el._t).map(function(c){var s=document.createElement("span");s.className="ch";s.textContent=c;el.appendChild(s);return s})}
function restore(){["hi","name","role"].forEach(function(k){if(E[k]._t)E[k].textContent=E[k]._t});E.name.style.background="";E.pic.style.clipPath="";E.btns.style.opacity="";E.ghost.style.opacity=""}
function cursor(color,label,x,y){var c=document.createElement("div");c.className="cur";c.style.setProperty("--c",color);c.innerHTML='<svg width="20" height="22" viewBox="0 0 20 22"><path d="M2 1l15 9-6.5 1.8L7.2 19z" style="fill:var(--c)" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg><span>'+label+"</span>";c.style.setProperty("--t","0s");c.style.transform="translate("+x+"px,"+y+"px)";stage.appendChild(c);c.offsetWidth;return c}
function move(c,x,y,t){c.style.setProperty("--t",t+"s");c.style.transform="translate("+x+"px,"+y+"px)"}
async function pick(c,el,id){
 var r=rect(el),p=8,b=document.createElement("div");
 move(c,r.x-p,r.y-p,.8);await wait(850);if(id!==run)return null;
 b.className="box";b.style.left=r.x-p+"px";b.style.top=r.y-p+"px";b.innerHTML="<i></i><i></i><i></i><i></i>";stage.appendChild(b);b.offsetWidth;
 b.style.width=r.w+2*p+"px";b.style.height=r.h+2*p+"px";move(c,r.x+r.w+p,r.y+r.h+p,.6);await wait(700);
 return id===run?b:null}
async function typeIn(c,chars,id,gap){
 for(var i=0;i<chars.length;i++){if(id!==run)return false;chars[i].classList.add("on");var r=rect(chars[i]);move(c,r.x+r.w,r.y+r.h*.7,.1);await wait(gap)}
 return true}
function drop(b){if(!b)return;b.style.opacity=0;setTimeout(function(){b.remove()},600)}
async function play(){
 var id=++run;stage.innerHTML="";restore();
 var H=split(E.hi),N=split(E.name),R=split(E.role);
 E.name.style.background="transparent";E.pic.style.clipPath="inset(0 0 100% 0)";E.btns.style.opacity="0";E.ghost.style.opacity="0";
 await Promise.race([document.fonts?document.fonts.ready:wait(0),wait(1200)]);