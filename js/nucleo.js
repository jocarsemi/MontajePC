// ============================================================
// NÚCLEO: estado y utilidades compartidas
// Responsable: Profesor (avisar antes de tocar)
// Estado global st, helpers $, get, total, y utilidades de la fase de software (P, scr, btns).
//   TODO No modificar sin avisar: lo usan todos los módulos.
// ============================================================
const st={profile:null,sel:{}};
const $=id=>document.getElementById(id);
const get=c=>PARTS.find(x=>x.id===st.sel[c]);
function total(){return Object.values(st.sel).reduce((s,id)=>s+PARTS.find(x=>x.id===id).p,0)}
let P={},H=[],run=0;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function scr(h,c=""){$("scr").className="scr "+c;$("scr").innerHTML=h}
function btns(a){H=a.map(x=>x[1]);$("pcbtn").innerHTML=a.map((x,i)=>`<button class="go ${x[2]||""}" onclick="H[${i}]()">${x[0]}</button>`).join("")}
