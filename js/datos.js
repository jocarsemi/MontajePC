// ============================================================
// DATOS: perfiles, categorías y catálogo de piezas
// Responsable: Claudia
// Aquí vive TODO el catálogo. Cada pieza: {id,c(categoría),n(nombre),p(precio €)} + campos de compatibilidad (socket, ram, tdp, w).
//   TODO: tareas de ampliación en js/ampliacion-claudia.js y docs/GUIA_BLOQUES.md
// ============================================================
const PROFILES=[
 {id:"ofi",name:"Ofimática / Estudio",budget:600,icon:"📚"},
 {id:"gam",name:"Gaming básico",budget:900,icon:"🎮"},
 {id:"vid",name:"Edición de vídeo",budget:1200,icon:"🎬"}];
const CATS=[
 {id:"cpu",name:"Procesador (CPU)"},{id:"cooler",name:"Refrigeración"},{id:"mobo",name:"Placa base"},
 {id:"ram",name:"Memoria RAM"},{id:"ssd",name:"Almacenamiento"},{id:"gpu",name:"Tarjeta gráfica"},
 {id:"psu",name:"Fuente de alimentación"},{id:"case",name:"Caja"}];
const PARTS=[
 {id:"cpu1",c:"cpu",n:"Ryzen 5 5600",p:120,socket:"AM4",tdp:65},
 {id:"cpu2",c:"cpu",n:"Ryzen 5 7600",p:200,socket:"AM5",tdp:65},
 {id:"cpu3",c:"cpu",n:"Core i5-12400F",p:150,socket:"LGA1700",tdp:65},
 {id:"co1",c:"cooler",n:"Disipador básico",p:15},{id:"co2",c:"cooler",n:"Torre doble ventilador",p:35},{id:"co3",c:"cooler",n:"Líquida 240 mm",p:90},
 {id:"mb1",c:"mobo",n:"B550 (AM4, DDR4)",p:110,socket:"AM4",ram:"DDR4"},
 {id:"mb2",c:"mobo",n:"B650 (AM5, DDR5)",p:170,socket:"AM5",ram:"DDR5"},
 {id:"mb3",c:"mobo",n:"B660 (LGA1700, DDR4)",p:130,socket:"LGA1700",ram:"DDR4"},
 {id:"r1",c:"ram",n:"16 GB DDR4",p:40,ram:"DDR4"},{id:"r2",c:"ram",n:"32 GB DDR4",p:75,ram:"DDR4"},
 {id:"r3",c:"ram",n:"16 GB DDR5",p:65,ram:"DDR5"},{id:"r4",c:"ram",n:"32 GB DDR5",p:110,ram:"DDR5"},
 {id:"s1",c:"ssd",n:"SSD 500 GB",p:35},{id:"s2",c:"ssd",n:"SSD 1 TB",p:60},{id:"s3",c:"ssd",n:"SSD 2 TB",p:110},
 {id:"g0",c:"gpu",n:"Gráfica integrada (sin tarjeta)",p:0,tdp:0},
 {id:"g1",c:"gpu",n:"RTX 3050 6 GB",p:200,tdp:130},{id:"g2",c:"gpu",n:"RX 7600 8 GB",p:270,tdp:165},{id:"g3",c:"gpu",n:"RTX 4070 12 GB",p:550,tdp:200},
 {id:"p1",c:"psu",n:"Fuente 450 W",p:40,w:450},{id:"p2",c:"psu",n:"Fuente 550 W",p:55,w:550},
 {id:"p3",c:"psu",n:"Fuente 650 W",p:75,w:650},{id:"p4",c:"psu",n:"Fuente 750 W",p:100,w:750},
 {id:"k1",c:"case",n:"Caja básica",p:40},{id:"k2",c:"case",n:"Caja media",p:70},{id:"k3",c:"case",n:"Caja premium",p:120}];
