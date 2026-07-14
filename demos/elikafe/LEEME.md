# Eli kafea — Web de demostración

Web de una sola página (landing) para la cafetería **Eli kafea** (Hernani).
Hecha con HTML, CSS y JavaScript "a pelo": no necesita instalar nada.
Diseño alineado con la identidad de la marca: negro sobre crema, tipografía
grotesca gruesa y el motivo de estrella (✳).

## Cómo verla
Haz **doble clic en `index.html`** y se abrirá en tu navegador.
(Necesitas conexión a internet para que carguen las fotos, las tipografías y el mapa.)

## Archivos
- `index.html` → el contenido y la estructura (textos, secciones, carta).
- `styles.css` → todos los colores, tipografías y el diseño.
- `script.js` → el menú móvil, las animaciones y el cartel de "Abierto / Cerrado".

## Qué es real y qué es de muestra
- ✅ **Reales:** nombre, dirección, horario, Instagram, reseñas de Google y la **carta**
  (Bebidas y Brunch, tomada de las fotos del menú).
- ⚠️ **Revisar:** los precios de **bebidas calientes** no se leían del todo en la foto
  del menú; conviene confirmarlos.
- 🔧 **De muestra (para cambiar):** las **fotos** (ahora son de banco de imágenes).

## Trastear rápido

### Cambiar textos, precios o platos
Abre `index.html` con cualquier editor (incluso el Bloc de notas) y edita el texto
entre las etiquetas. Por ejemplo, para un precio busca `6,80 €` y cámbialo.

### Cambiar las fotos por las reales
En `styles.css` busca las líneas que ponen `url("https://images.unsplash.com/...")`
y sustituye esa dirección por la de la foto real. Lo más cómodo:
1. Crea una carpeta `img/` junto a los archivos.
2. Mete ahí las fotos (p. ej. `red-velvet.jpg`).
3. Cambia la url por `url("img/red-velvet.jpg")`.

Zonas de fotos: la del inicio (`.hero__media`), las dos de "Nosotros"
(`.about__photo--1` y `--2`) y la galería (`.g1` … `.g5`).

### Cambiar los colores
En `styles.css`, arriba del todo, está la sección `:root` con todos los colores:
- `--paper` → el fondo crema.
- `--ink` → el negro de la marca (textos, botones, líneas).
Cámbialos y se actualiza toda la web.

## Pendiente antes de publicar (ideas de venta)
- Fotos reales del local y los productos (¡y el logo real "Eli kafea."!).
- Confirmar precios de bebidas calientes.
- Número de teléfono / WhatsApp de contacto.
- Dominio propio (p. ej. `elikafea.eus`) y alojamiento.
- Opcional: versión en euskera, aviso de cookies y enlace directo a Google para reseñas.
