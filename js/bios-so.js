// ============================================================
// BIOS Y SISTEMA OPERATIVO: POST, BIOS, instalación y drivers
// Responsable: Hossam
// startPC() arranca la fase 3; post(), bios(), osPick(), install() y drivers() muestran las pantallas del monitor.
//   TODO: tareas de ampliación en js/ampliacion-hossam.js y docs/GUIA_BLOQUES.md
// ============================================================
function startPC(){run++;$("asm").classList.add("hid");$("pc").classList.remove("hid");scrollTo(0,0);P={dr:{},boot:"HDD",os:""};post()}
async function post(){
 const id=++run;
 const L=["MontaPC BIOS v1.0","Comprobando CPU: "+get("cpu").n+" ... OK","Comprobando RAM: "+get("ram").n+" · Dual Channel ... OK","Detectando GPU: "+get("gpu").n+" ... OK","Detectando almacenamiento: "+get("ssd").n+" ... OK","","POST completado ✔ (1 pitido corto = todo bien)"];
 scr("<pre id='pre'></pre>");btns([]);
 for(const l of L){if(id!==run)return;$("pre").textContent+=l+"\n";await sleep(500)}
 btns([["Entrar en la BIOS (Supr)",bios]]);
}
function bios(){
 scr(`<b>⚙ BIOS · Ajustes básicos</b><pre>CPU ........ ${get("cpu").n}\nRAM ........ ${get("ram").n} (Dual Channel)\nAlmacén .... ${get("ssd").n}\nGráfica .... ${get("gpu").n}</pre>Orden de arranque: <select id="bt" onchange="P.boot=this.value"><option value="HDD">HDD / SSD</option><option value="USB">USB (instalador del SO)</option><option value="Red">Red</option></select><p>El instalador del sistema está en un USB. ¿Desde qué dispositivo debe arrancar el equipo?</p>`,"bl");
 $("bt").value=P.boot;
 btns([["Guardar y salir (F10)",()=>P.boot==="USB"?osPick():noos()]]);
}
function noos(){scr("<pre>No se encontró ningún sistema operativo.\nInserta un disco de arranque y pulsa una tecla.</pre><p>💡 Pista: cambia el orden de arranque en la BIOS.</p>");btns([["Volver a la BIOS",bios]])}
function osPick(){
 scr("<b>Instalador · Elige el sistema operativo</b><p>🪟 Windows 11: de pago (licencia), muy compatible con juegos.</p><p>🐧 Ubuntu 24.04: libre y gratuito, ligero y seguro.</p>");
 btns([["🪟 Instalar Windows 11",()=>install("Windows 11")],["🐧 Instalar Ubuntu 24.04",()=>install("Ubuntu 24.04")]]);
}
async function install(os){
 const id=++run;P.os=os;btns([]);
 const S=["Preparando el disco (particiones)…","Copiando archivos del sistema…","Instalando funciones…","Configurando usuario y red…"];
 scr(`<b>Instalando ${os}</b><p id="ps"></p><div class="track"><div class="fill" id="pf" style="background:var(--ac);transition:width .8s linear"></div></div>`);
 for(let i=0;i<S.length;i++){if(id!==run)return;$("ps").textContent=S[i];await sleep(60);$("pf").style.width=(i+1)*25+"%";await sleep(900)}
 if(id!==run)return;scr(`<b>✔ ${os} instalado</b><p>Reiniciando… escritorio cargado.</p>`);await sleep(900);if(id!==run)return;drivers();
}
const DR={gfx:["🎮 Gráficos",()=>get("gpu").n],net:["🌐 Red","Wi-Fi / Ethernet"],aud:["🔊 Audio","Chip de sonido de la placa"]};
function drivers(){
 const k=Object.keys(DR),pend=k.filter(x=>!P.dr[x]);
 scr(`<b>${P.os} · Drivers</b><p>${P.os.startsWith("Win")?"Windows Update instala algunos, pero conviene el del fabricante.":"Ubuntu detecta muchos solos; los gráficos propietarios van en «Controladores adicionales»."}</p>`+k.map(x=>`<p>${P.dr[x]?"✅":"⬜"} ${DR[x][0]} — ${typeof DR[x][1]==="function"?DR[x][1]():DR[x][1]}</p>`).join("")+`<p>${pend.length?"Sin los drivers, el rendimiento baja.":"Todos los drivers instalados."}</p>`);
 btns(pend.map(x=>["Instalar driver: "+DR[x][0],()=>{P.dr[x]=1;drivers()},"sec"]).concat([["💿 Siguiente: instalar software",software,""]]));
}
