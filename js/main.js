// ============================================================
// MAIN: conexión de botones y arranque
// Responsable: Profesor (avisar antes de tocar)
// Se carga el último. Conecta los botones con las funciones de cada módulo.
//   TODO Si añadís pantallas nuevas, enlazad sus botones aquí.
// ============================================================
$("go").onclick=startAsm;
$("redo").onclick=startAsm;
$("back").onclick=()=>{$("asm").classList.add("hid");$("app").classList.remove("hid");scrollTo(0,0)};
$("next").onclick=startPC;
renderProfiles();
