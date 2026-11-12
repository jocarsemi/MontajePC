// ============================================================
// MONTAJE: simulador paso a paso
// Responsable: Bauty
// STEPS define los pasos; drawAsm() dibuja el SVG; tapI()/tapT() gestionan los toques.
//   TODO: tareas de ampliación en js/ampliacion-bauty.js y docs/GUIA_BLOQUES.md
// ============================================================
/* ===== FASE 2: MONTAJE (toca pieza → toca zona resaltada) ===== */
const STEPS=[
 {id:"cpu",it:"cpu",tg:"socket",t:"Coloca la CPU en el socket",w:"Se alinea el triángulo dorado de la CPU con el de la placa."},
 {id:"lever",tg:"socket",t:"Toca el socket para bajar la palanca",w:"La palanca fija la CPU; sin ella no hace buen contacto."},
 {id:"paste",it:"paste",tg:"socket",t:"Aplica pasta térmica sobre la CPU",w:"Una gota pequeña ayuda a pasar el calor de la CPU al disipador."},
 {id:"cooler",it:"cooler",tg:"socket",t:"Monta el disipador sobre la pasta",w:"Sin disipador la CPU se sobrecalienta en segundos."},
 {id:"ram1",it:"ram",tg:"slot",t:"Inserta el 1.er módulo de RAM (ranura 2)",w:"En 4 ranuras, usa la 2 y la 4 para activar Dual Channel."},
 {id:"ram2",it:"ram",tg:"slot",t:"Inserta el 2.º módulo de RAM (ranura 4)",w:"Dos módulos iguales en canales distintos = más ancho de banda."},
 {id:"mobo",it:"mobo",tg:"case",t:"Instala la placa base dentro de la caja",w:"Es más fácil montar CPU, RAM y disipador con la placa fuera de la caja."},
 {id:"psu",it:"psu",tg:"psu",t:"Monta la fuente en su hueco de la caja",w:"La fuente reparte la electricidad a todas las piezas."},
 {id:"atx",it:"atx",tg:"atx",t:"Conecta el cable ATX de 24 pines",w:"Es la alimentación principal de la placa base."},
 {id:"cpu8",it:"cpu8",tg:"cpu8",t:"Conecta el cable CPU de 8 pines",w:"Alimenta el procesador de forma independiente."},
 {id:"gpu",it:"gpu",tg:"gpu",t:"Inserta la tarjeta gráfica en el slot PCIe",w:"Va en el slot PCIe x16, el más largo."},
 {id:"pcie",it:"pcie",tg:"gpu",t:"Conecta el cable PCIe a la gráfica",w:"Las gráficas potentes necesitan alimentación extra de la fuente."},
 {id:"ssd",it:"ssd",tg:"ssd",t:"Instala el almacenamiento en su bahía",w:"Aquí se guardarán el sistema operativo y tus archivos."}];
const TR={cpu:[56,40,50,50],slot0:[122,12,9,84],slot1:[135,12,9,84],slot2:[148,12,9,84],slot3:[161,12,9,84],atx:[160,104,14,40],cpu8:[40,6,50,9],gpu:[10,146,150,24]};
const RT={case:[10,240,340,270],psu:[230,440,110,60],ssd:[236,262,96,44]};
let A=null;
function startAsm(){
 const gi=st.sel.gpu==="g0";
 A={steps:STEPS.filter(s=>!(gi&&(s.id==="gpu"||s.id==="pcie"))),i:0,done:[],ram:[],sel:null,msg:"Elige una pieza de la bandeja y toca la zona que parpadea."};
 $("app").classList.add("hid");$("asm").classList.remove("hid");scrollTo(0,0);drawAsm();
}
const cur=()=>A.steps[A.i];
function validT(){const s=cur();if(!s)return[];if(s.tg==="slot")return["slot1","slot3"].filter(x=>!A.ram.includes(x));return[s.tg]}
function label(k){
 const n=c=>get(c).n;
 return {cpu:"🧩 "+n("cpu"),paste:"🧴 Pasta térmica",cooler:"🌀 "+n("cooler"),ram:"📏 "+n("ram"),mobo:"🟩 "+n("mobo"),psu:"🔌 "+n("psu"),atx:"🟡 Cable ATX 24 pines",cpu8:"🔴 Cable CPU 8 pines",gpu:"🎮 "+n("gpu"),pcie:"🔵 Cable PCIe",ssd:"💾 "+n("ssd")}[k];
}
function tapI(k){
 const s=cur();if(!s)return;A.sel=k;
 A.msg=k===s.it?"👍 Pieza correcta. Toca la zona que parpadea.":"❌ Aún no toca esa pieza. Paso "+(A.i+1)+": "+s.t+".";
 drawAsm();
}
function tapT(id){
 const s=cur();if(!s)return;
 if(!validT().includes(id)){
  A.msg=(s.tg==="slot"&&id.startsWith("slot"))?"⚠ Para Dual Channel usa las ranuras 2 y 4 (alternas).":"⚠ Ahí no. "+s.t+".";return drawAsm();
 }
 if(s.it&&A.sel!==s.it){A.msg="👆 Primero elige la pieza correcta en la bandeja.";return drawAsm();}
 A.done.push(s.id);if(s.tg==="slot")A.ram.push(id);
 A.i++;A.sel=null;A.msg="✅ "+s.w;drawAsm();
}
function drawAsm(){
 const d=A.done,has=x=>d.includes(x),inCase=has("mobo"),B=inCase?[30,255]:[90,20];
 const V=A.i<A.steps.length?validT():[],fin=A.i>=A.steps.length;
 const hit=(id,r)=>`<rect class="${V.includes(id)?"tg":"dim"}" x="${r[0]-4}" y="${r[1]-4}" width="${r[2]+8}" height="${r[3]+8}" rx="6" onclick="tapT('${id}')"/>`;
 const R=(r,f,x=0)=>`<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="${x}" fill="${f}"/>`;
 let s=`<rect x="10" y="240" width="340" height="270" rx="12" fill="none" stroke="#64748b" stroke-width="3"/><text style="fill:var(--mut)" x="18" y="256">CAJA</text>`;
 s+=`<rect x="230" y="440" width="110" height="60" rx="6" fill="none" stroke="#64748b" stroke-dasharray="4 3"/><rect x="236" y="262" width="96" height="44" rx="6" fill="none" stroke="#64748b" stroke-dasharray="4 3"/>`;
 s+=`<text style="fill:var(--mut)" x="258" y="474">Fuente</text><text style="fill:var(--mut)" x="262" y="288">Bahía SSD</text>`;
 if(has("psu"))s+=R(RT.psu,"#475569",6)+`<text x="268" y="474">PSU</text>`;
 if(has("ssd"))s+=R(RT.ssd,"#0891b2",6)+`<text x="272" y="288">SSD</text>`;
 s+=`<g style="transform:translate(${B[0]}px,${B[1]}px);transition:transform .7s">`+R([0,0,180,180],"#166534",8);
 s+=`<rect x="56" y="40" width="50" height="50" fill="#14532d" stroke="#fbbf24"/>`;
 [0,1,2,3].forEach(i=>s+=`<rect x="${TR["slot"+i][0]}" y="12" width="9" height="84" fill="#0b3b1e"/>`);
 s+=R(TR.atx,"#fde68a")+R(TR.cpu8,"#fecaca")+R([16,150,130,12],"#0b3b1e");
 s+=`<text x="122" y="110" style="font-size:8px">1 2 3 4</text>`;
 if(has("cpu"))s+=R([62,46,38,38],"#64748b",3)+`<path d="M62 46h8l-8 8z" fill="#fbbf24"/>`;
 if(has("lever"))s+=R([106,42,5,46],"#f59e0b",2);
 if(has("paste")&&!has("cooler"))s+=`<circle cx="81" cy="65" r="8" fill="#cbd5e1"/>`;
 if(has("cooler"))s+=R([46,30,70,70],"#0ea5e9",8)+`<circle cx="81" cy="65" r="22" fill="#0369a1"/><text x="68" y="68">FAN</text>`;
 A.ram.forEach(k=>s+=R(TR[k],"#22c55e",2));
 if(has("gpu"))s+=R(TR.gpu,"#7c3aed",5)+`<circle cx="50" cy="158" r="9" fill="#4c1d95"/><circle cx="110" cy="158" r="9" fill="#4c1d95"/>`;
 s+=hit("socket",TR.cpu)+["slot0","slot1","slot2","slot3","atx","cpu8","gpu"].map(k=>hit(k,TR[k])).join("")+`</g>`;
 if(has("atx"))s+=`<path d="M285 470Q240 400 197 379" stroke="#eab308" stroke-width="5" fill="none"/>`;
 if(has("cpu8"))s+=`<path d="M255 445Q110 340 95 270" stroke="#ef4444" stroke-width="5" fill="none"/>`;
 if(has("pcie"))s+=`<path d="M240 455Q200 440 176 411" stroke="#3b82f6" stroke-width="5" fill="none"/>`;
 s+=hit("case",RT.case).replace(/class="[a-z]+"/,V.includes("case")?'class="tg" style="pointer-events:none"':'class="dim" style="pointer-events:none"');
 s+=(V.includes("case")?`<rect class="tg" x="6" y="236" width="348" height="278" rx="12" onclick="tapT('case')"/>`:"")+hit("psu",RT.psu)+hit("ssd",RT.ssd);
 $("svg").innerHTML=s;
 $("astep").textContent=fin?"¡Completado!":`Paso ${A.i+1} de ${A.steps.length}: ${cur().t}`;
 $("amsg").textContent=fin?"🎉 ¡Montaje terminado! Todas las piezas están en su sitio.":A.msg;
 $("tray").innerHTML=fin?"":["ssd","gpu","cpu8","paste","mobo","ram","cooler","atx","cpu","psu","pcie"].filter(k=>A.steps.slice(A.i).some(x=>x.it===k)).map(k=>`<button class="o ${A.sel===k?"on":""}" onclick="tapI('${k}')"><span>${label(k)}</span></button>`).join("");
 $("trayh").classList.toggle("hid",fin);$("next").classList.toggle("hid",!fin);
}
