// ============================================================
// PRESUPUESTO: pantalla de perfiles, catálogo y contador
// Responsable: Alejandro
// renderProfiles(), renderCats() y render() pintan la fase 1 y bloquean el botón si se supera el presupuesto.
//   TODO: tareas de ampliación en js/ampliacion-alejandro.js y docs/GUIA_BLOQUES.md
// ============================================================

function renderProfiles(){
  $("profiles").innerHTML=PROFILES.map(p=>`<button class="p ${st.profile?.id===p.id?"on":""}" data-id="${p.id}"><b>${p.icon} ${p.name}</b><span>Presupuesto: ${p.budget} €</span></button>`).join("");
  document.querySelectorAll(".p").forEach(b=>b.onclick=()=>{st.profile=PROFILES.find(x=>x.id===b.dataset.id);st.sel={};$("app").classList.remove("hid");render()});
}
function renderCats(){
  $("cats").innerHTML=CATS.map(c=>`<div class="cat"><h3>${c.name}</h3><div class="opts">`+
    PARTS.filter(p=>p.c===c.id).map(p=>{
      const cf=conflict(p),on=st.sel[c.id]===p.id;
      return `<button class="o ${on?"on":""} ${cf&&!on?"bad":""}" data-id="${p.id}"><span>${p.n}${cf&&!on?`<small class="e">⚠ ${cf}</small>`:""}</span><span class="pr">${p.p} €</span></button>`}).join("")+`</div></div>`).join("");
  document.querySelectorAll(".o").forEach(b=>b.onclick=()=>{
    const p=PARTS.find(x=>x.id===b.dataset.id);
    if(st.sel[p.c]===p.id)delete st.sel[p.c];else st.sel[p.c]=p.id; // clic de nuevo = quitar
    render()});
}
function render(){
  renderProfiles();renderCats();
  const t=total(),lim=st.profile.budget,over=t>lim,pr=problems();
  $("spent").textContent=t;$("limit").textContent=lim;$("left").textContent=lim-t;
  $("fill").style.width=Math.min(100,t/lim*100)+"%";
  $("bar").classList.toggle("over",over);
  $("msg").textContent=over?`⛔ Te pasas ${t-lim} € del presupuesto. Quita o cambia piezas.`:"";
  const blocked=over||pr.length>0;
  $("go").disabled=blocked;
  if(!over&&pr.length)$("msg").textContent="⚠ "+pr[0]+(pr.length>1?` (+${pr.length-1} más)`:"");
  $("done").classList.add("hid");
}
