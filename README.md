# MontaPC · Simulador para montar un PC (proyecto de 2.º de Bachillerato)

Aplicación web educativa para alumnos de la ESO: elegir las piezas de un ordenador dentro de un presupuesto,
montarlo paso a paso, encenderlo (POST/BIOS), instalar sistema operativo, drivers y software, y pasar un test de rendimiento.

Cada alumno de 2.º trabaja **en sus propios archivos** para no pisarse con los demás.

## Cómo probarlo
Abre `index.html` con doble clic en el navegador. No hace falta instalar nada.

## Quién trabaja en qué
| Nombre | Archivos | Qué debe hacer |
|---|---|---|
| Claudia | `js/datos.js`, `js/compatibilidad.js`, `js/ampliacion-claudia.js` | Catálogo de piezas con precios reales y reglas de compatibilidad |
| Bauty | `js/montaje.js`, `js/ampliacion-bauty.js` | Simulador de montaje paso a paso |
| Alejandro | `js/presupuesto.js`, `js/test.js`, `js/ampliacion-alejandro.js` | Selector de presupuesto, potencia de la fuente y test de rendimiento |
| Hossam | `js/bios-so.js`, `js/software.js`, `js/ampliacion-hossam.js` | POST/BIOS, sistema operativo, drivers y software |
| Profesor | `js/nucleo.js`, `js/main.js`, `index.html`, `css/` | Núcleo común y arranque (avisar antes de tocar) |

**La ampliación de cada alumno se centra en su bloque** (ver `docs/GUIA_BLOQUES.md`): cada punto que investiga debe acabar como algo visible en la app (un dato, una regla, una ficha, una pantalla o un mini-juego). En tu archivo `js/ampliacion-<tunombre>.js` tienes una propuesta por punto. Ese archivo es tuyo y es donde escribes el código nuevo.

## Reglas de oro
1. **Edita solo tus archivos.** Si necesitas un cambio en el archivo de un compañero, habla con él o abre un *Issue* en GitHub.
2. **No cambies los nombres** de funciones y variables que usan otros módulos (lista abajo). Puedes añadir las tuyas.
3. **Prueba siempre** abriendo `index.html` antes de subir cambios. La consola del navegador (F12) te muestra los errores.
4. **Commits pequeños y frecuentes**, con mensajes claros (por ejemplo: `Añade 6 procesadores nuevos al catálogo`).
5. **Registra tus prompts** si usas IA, en `docs/REGISTRO_PROMPTS.md` (qué pediste, qué respondió, qué errores corregiste).

## Contrato entre módulos (lo que todos pueden usar)
- `st.profile`: perfil elegido `{id, name, budget, icon}`. `st.sel`: piezas elegidas `{categoría: id de pieza}`.
- `get("cpu")` devuelve la pieza elegida de esa categoría (o `undefined`). `total()` suma el precio.
- Cada pieza de `PARTS`: `{id, c, n, p}` + campos opcionales (`socket`, `ram`, `tdp`, `w`). Categorías: `cpu, cooler, mobo, ram, ssd, gpu, psu, case`.
- Fase 3: `P` guarda el estado (`P.os`, `P.dr`, `P.sw`, `P.boot`); `scr(html, clase)` pinta el monitor y `btns([[texto, función, clase]])` pinta los botones.
- Orden de carga (en `index.html`): `datos, nucleo, compatibilidad, presupuesto, montaje, bios-so, test, software, ampliacion-claudia, ampliacion-bauty, ampliacion-alejandro, ampliacion-hossam, main`.

## Flujo de trabajo con Git
1. Clona el repositorio y cambia a tu rama (`claudia-procesador-memoria`, `bauty-almacenamiento-placa`, `alejandro-grafica-alimentacion`, `hossam-perifericos-bios-so`).
2. Trabaja, prueba y haz *commit* con frecuencia.
3. Sube tu rama (*push*) y abre un **Pull Request** hacia `main`.
4. El profesor revisa y fusiona. Antes de empezar una sesión, actualiza tu rama con los cambios de `main`.

## Publicar en GitHub Pages
*Settings → Pages → Deploy from a branch → `main` / `(root)`*. El enlace aparece en esa misma pantalla.
