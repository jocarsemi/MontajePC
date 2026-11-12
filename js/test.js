// ============================================================
// TEST DE RENDIMIENTO y veredicto final
// Responsable: Alejandro
// bench() calcula las puntuaciones y compara con lo que pide el perfil; again() reinicia.
//   TODO: tareas de ampliación en js/ampliacion-alejandro.js y docs/GUIA_BLOQUES.md
// ============================================================
async function bench(){
 const id=++run;btns([]);
 const ram=parseInt(get("ram").n),cb={cpu1:78,cpu2:90,cpu3:80}[st.sel.cpu],gb={g0:15,g1:45,g2:62,g3:90}[st.sel.gpu];
 const c=Math.min(100,cb+(ram>=32?8:0)),g=Math.round(gb*(P.dr.gfx?1:.6)),tot=Math.round((c+g)/2);
 const need={ofi:[60,10,16],gam:[70,50,16],vid:[85,55,32]}[st.profile.id],bad=[];
 if(c<need[0])bad.push("CPU");if(g<need[1])bad.push(P.dr.gfx?"gráfica":"gráfica (¡falta su driver!)");if(ram<need[2])bad.push("RAM");
 const bar=(n,v,col)=>`<p>${n}: <b>${v}</b></p><div class="track"><div class="fill" style="background:${col};width:0;transition:width 1.2s" data-w="${v}"></div></div>`;
 scr(`<b>📊 Test de rendimiento · ${P.os}</b>`+bar("CPU",c,"#22c55e")+bar("Gráficos",g,"#a855f7")+bar("Total",tot,"#2563eb"));
 await sleep(80);document.querySelectorAll("#scr [data-w]").forEach(e=>e.style.width=e.dataset.w+"%");
 await sleep(1400);if(id!==run)return;
 const t=total();
 $("scr").insertAdjacentHTML("beforeend",`<p>${bad.length?"❌ No llega para «"+st.profile.name+"»: mejora "+bad.join(", ")+".":"✅ ¡Perfecto para «"+st.profile.name+"»!"}</p><p>💶 Has gastado ${t} € de ${st.profile.budget} € (te sobran ${st.profile.budget-t} €).</p><p>${swMsg()}</p>`);
 btns([["🔁 Jugar de nuevo",again],["← Volver a los drivers",drivers,"sec"]]);
}
function again(){run++;$("pc").classList.add("hid");$("app").classList.remove("hid");st.sel={};render();scrollTo(0,0)}
