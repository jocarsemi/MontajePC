// ============================================================
// COMPATIBILIDAD: reglas entre piezas
// Responsable: Claudia
// conflict(part) avisa de choques al elegir; problems() lista errores antes de pasar al montaje; psuNeed() calcula vatios.
//   TODO: tareas de ampliación en js/ampliacion-claudia.js y docs/GUIA_BLOQUES.md
// ============================================================

function conflict(part){
  // devuelve un texto si 'part' choca con lo ya elegido (compatibilidad básica)
  const cpu=get("cpu"),mb=get("mobo"),ram=get("ram");
  if(part.c==="cpu"&&mb&&mb.socket!==part.socket)return "Socket distinto al de la placa";
  if(part.c==="mobo"&&cpu&&cpu.socket!==part.socket)return "Socket distinto al de la CPU";
  if(part.c==="mobo"&&ram&&ram.ram!==part.ram)return "Tipo de RAM distinto";
  if(part.c==="ram"&&mb&&mb.ram!==part.ram)return "RAM incompatible con la placa";
  return "";
}
function psuNeed(){return (get("cpu")?.tdp||0)+(get("gpu")?.tdp||0)+100}
function problems(){
  const out=[],cpu=get("cpu"),mb=get("mobo"),ram=get("ram"),psu=get("psu");
  CATS.forEach(c=>{if(!st.sel[c.id])out.push("Falta elegir: "+c.name)});
  if(cpu&&mb&&cpu.socket!==mb.socket)out.push("CPU y placa tienen sockets distintos");
  if(mb&&ram&&mb.ram!==ram.ram)out.push("La RAM no es compatible con la placa");
  if(psu&&psu.w<psuNeed())out.push("Fuente insuficiente: necesitas al menos "+psuNeed()+" W");
  return out;
}
