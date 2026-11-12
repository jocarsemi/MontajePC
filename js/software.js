// ============================================================
// SOFTWARE según el tipo de PC
// Responsable: Hossam
// SW lista los programas por perfil [nombre, GB, recomendado, solo Windows]; software() y tog() gestionan la instalación.
//   TODO: tareas de ampliación en js/ampliacion-hossam.js y docs/GUIA_BLOQUES.md
// ============================================================
/* ===== SOFTWARE SEGÚN EL TIPO DE PC: [nombre, GB, recomendado, solo Windows] ===== */
const SW={
 ofi:[["Suite ofimática (LibreOffice)",3,1],["Navegador web",1,1],["Lector de PDF",.5,1],["Antivirus / seguridad",1,1],["Videollamadas (Teams / Meet)",2,1],["Steam + juegos grandes",80,0],["DaVinci Resolve (vídeo)",6,0],["Blender (3D)",4,0]],
 gam:[["Steam (tienda y lanzador)",1,1],["Juego AAA (≈70 GB)",70,1],["Discord / chat de voz",1,1],["Monitor de temperaturas",.1,1],["Navegador web",1,1],["Suite ofimática",3,0],["DaVinci Resolve (vídeo)",6,0],["Antivirus pesado de pago",2,0]],
 vid:[["DaVinci Resolve (edición de vídeo)",6,1],["Blender (3D y animación)",4,1],["GIMP (edición de imagen)",.5,1],["HandBrake (conversor de vídeo)",.2,1],["Navegador web",1,1],["Adobe Photoshop (solo Windows)",3,0,1],["Steam + juegos grandes",80,0],["Suite ofimática",3,0]]};
function disk(){const m=get("ssd").n.match(/(\d+)\s*(TB|GB)/);return m?(m[2]==="TB"?m[1]*1000:+m[1]):500}
const osGB=()=>P.os.startsWith("Win")?30:15;
function swMsg(){
 const L=SW[st.profile.id],ins=P.sw||[],miss=L.filter((a,i)=>a[2]&&!ins.includes(i)).map(a=>a[0]),ex=L.filter((a,i)=>!a[2]&&ins.includes(i)).map(a=>a[0]);
 return miss.length||ex.length?"💿 Software: "+(miss.length?"te falta "+miss.join(", ")+". ":"")+(ex.length?"Sobra "+ex.join(", ")+".":""):"💿 Software perfecto para este tipo de PC ✅";
}
function software(){
 P.sw=P.sw||[];const L=SW[st.profile.id],used=P.sw.reduce((s,i)=>s+L[i][1],0),free=disk()-osGB()-used;
 scr(`<b>${P.os} · Software para «${st.profile.name}»</b><p>Instala lo que necesita este tipo de PC. Espacio libre: <b>${Math.round(free*10)/10} GB</b> de ${disk()} GB (el sistema ocupa ${osGB()} GB).</p>`+(P.m?`<p>${P.m}</p>`:"")+L.map((a,i)=>`<p>${P.sw.includes(i)?"✅":"⬜"} ${a[0]} · ${a[1]} GB</p>`).join(""));
 btns(L.map((a,i)=>[(P.sw.includes(i)?"Quitar: ":"Instalar: ")+a[0],()=>tog(i),"sec"]).concat([["📊 Ejecutar test de rendimiento",bench,""]]));
}
function tog(i){
 const L=SW[st.profile.id],a=L[i];P.m="";
 if(P.sw.includes(i))P.sw=P.sw.filter(x=>x!==i);
 else if(a[3]&&!P.os.startsWith("Win"))P.m="⚠ "+a[0]+" no tiene versión para Linux.";
 else if(a[1]>disk()-osGB()-P.sw.reduce((s,j)=>s+L[j][1],0))P.m="⚠ No hay espacio suficiente en el disco.";
 else P.sw.push(i);
 software();
}
