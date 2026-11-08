// Cambia estos dos textos antes de enviar la página
var PARA = "Danii";
var DE = "Tu ingeniero de sistemas que te quiere y quiere que lo perdones";

document.getElementById("hola").textContent = "Hola, " + PARA;
document.getElementById("cartaHola").textContent = "Hola, " + PARA;
document.getElementById("cartaFirma").textContent = DE;
document.getElementById("firma1").textContent = "Hecho con cuidado por tu ingeniero de sistemas";
document.getElementById("firma2").textContent = "— " + DE;

var NS = "http://www.w3.org/2000/svg";
function flor(svg, x, y, r, d){
  var g = document.createElementNS(NS, "g");
  var cx = 200 + (x - 200) * 0.25;
  var curva = "M200 260 C " + cx + " 230, " + (x + (x < 200 ? 16 : -16)) + " " + (y + 60) + ", " + x + " " + y;
  var p = "";
  for(var i = 0; i < 12; i++){
    p += '<ellipse cx="0" cy="' + (-r * 0.95) + '" rx="' + (r * 0.34) + '" ry="' + (r * 0.95) + '" fill="' + (i % 2 ? "#ffd23f" : "#f0a90a") + '" transform="rotate(' + (i * 30) + ')"/>';
  }
  var lx = x < 200 ? -1 : 1, ly = y + 90;
  g.innerHTML =
    '<path class="stem" pathLength="1" style="--d:' + d + 's" d="' + curva + '"/>' +
    '<path class="leaf" style="--d:' + d + 's" d="M' + (x + lx * 2) + ' ' + ly + ' q ' + (lx * 34) + ' -24 ' + (lx * 48) + ' -4 q ' + (lx * -24) + ' 26 ' + (lx * -48) + ' 4z"/>' +
    '<g transform="translate(' + x + ' ' + y + ')"><g class="bloom" style="--d:' + d + 's">' + p + '<circle r="' + (r * 0.4) + '" fill="#5a3416"/></g></g>';
  svg.appendChild(g);
}
function ramo(svg){
  svg.innerHTML = "";
  flor(svg, 200, 80, 28, 0); flor(svg, 125, 115, 23, 0.3); flor(svg, 275, 120, 23, 0.6);
  flor(svg, 70, 160, 19, 0.9); flor(svg, 330, 165, 19, 1.2);
}

var vistas = document.querySelectorAll(".vista");
function ir(id){
  vistas.forEach(function(v){ v.classList.toggle("on", v.id === id); });
  window.scrollTo(0, 0);
  if(id === "flores") ramo(document.getElementById("ramoA"));
}
document.querySelectorAll("[data-ir]").forEach(function(b){
  b.addEventListener("click", function(){ ir(b.getAttribute("data-ir")); });
});

document.getElementById("sobre").addEventListener("click", function(){
  this.style.display = "none";
  document.getElementById("texto").classList.add("on");
});

var frases = ["No","¿Segura?","Piénsalo bien…","Mira que me esforcé","Hasta el gato está triste","Última oportunidad","¿De verdad, de verdad?","Ya no tienes opción","El botón del Sí te llama","Anda, dale clic al Sí"];
var n = 0, si = document.getElementById("si"), no = document.getElementById("no");
no.addEventListener("click", function(){
  n++;
  no.textContent = frases[Math.min(n, frases.length - 1)];
  document.getElementById("tristeGif").hidden = (n !== 4);
  si.style.fontSize = Math.min(1.1 + n * 0.7, 9) + "rem";
  no.style.fontSize = Math.max(1 - n * 0.06, 0.55) + "rem";
});
si.addEventListener("click", function(){
  document.getElementById("pregunta").style.display = "none";
  document.getElementById("ganas").classList.add("on");
  ramo(document.getElementById("ramoB"));
  for(var i = 0; i < 40; i++){ setTimeout(caer, i * 90); }
});

var quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function caer(){
  if(quieto) return;
  var s = document.createElement("span");
  s.className = "caer";
  s.textContent = "✿";
  s.style.left = Math.random() * 100 + "vw";
  s.style.fontSize = (14 + Math.random() * 18) + "px";
  s.style.animationDuration = (5 + Math.random() * 5) + "s";
  document.body.appendChild(s);
  s.addEventListener("animationend", function(){ s.remove(); });
}
setInterval(caer, 900);
