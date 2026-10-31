# Lore Hernando / Lorena Fit · Imágenes del presupuesto

Esta carpeta es la **fuente local de fotografías**. El HTML ya no utiliza fotos de Unsplash ni Base64.

**Cómo funciona:** cada lugar de la web tiene una reserva visual. Cuando subís el WebP con el **nombre exacto** a esta carpeta, la foto aparecerá automáticamente en el lugar correspondiente. Mientras el archivo no exista, se ve una composición de espera con iluminación fucsia/índigo y una etiqueta que identifica qué falta.

## Archivos que reconoce automáticamente el presupuesto

| Archivo exacto | Destino |
| --- | --- |
| `hero-lore-hernando.webp` | Portada principal del presupuesto |
| `experiencia-alumna.webp` | Bloque que explica el recorrido comercial de la alumna |
| `equipamiento-lore.webp` | Sección de accesorios y complementos |
| `cierre-lore.webp` | Imagen editorial del cierre |
| `programa-reto-21-dias.webp` | Tarjeta y ficha de reto 21 días |
| `programa-fuerza-4-semanas.webp` | Tarjeta y ficha de Fuerza +40 |
| `programa-reset.webp` | Tarjeta y ficha de campaña Reset |
| `programa-movimiento-6-semanas.webp` | Tarjeta y ficha de movimiento, seis semanas |
| `programa-mes-de-la-madre.webp` | Tarjeta y ficha de campaña Mes de la Madre |
| `programa-reto-verano.webp` | Tarjeta y ficha de reto de verano |
| `portada-web-lore.webp` | Imagen principal dentro de la demo de la futura web |
| `metodo-lore.webp` | Imagen de «Mi enfoque» en la demo |
| `entrenamiento-clase.webp` | Vista del video de una clase en la demo |

## Subida manual a GitHub
1. Abrí la carpeta `lorena-fit/assets/images/` en GitHub.
2. Seleccioná **Add file → Upload files**.
3. Arrastrá los archivos ya exportados a WebP con los nombres exactos de esta tabla.
4. Confirmá los cambios en la rama `main`.
5. Abrí la página, actualizá y verificá los encuadres en computadora y celular.

## Recomendaciones
- Resolución sugerida para portada: al menos 1600 px de ancho; tarjetas: 800–1200 px.
- Preferí WebP; evitá logos y letras insertados en fotografías que pueden recortarse.
- Usá imágenes propias o con autorización, en particular si muestran alumnas reales.
- Mantén proporciones adecuadas: portada 16:9, tarjetas 3:4, lección 16:9.
- No uses Base64 para fotografías: aumenta el tamaño del código y dificulta mantenimiento.
- La subida de fotos no crea automáticamente precios, descripciones ni productos en WooCommerce: solamente reemplaza los recursos visuales de la propuesta.

## Archivos de soporte
- `../../image-slots.css`: diseño de las áreas reservadas.
- `../../script.js`: carga las fotos locales cuando existen.
- `../../index.html`: referencia de las áreas principales.

**Estado:** las posiciones están configuradas, pero las fotografías definitivas deben subirse a esta carpeta. Ninguna foto de stock está incrustada en el proyecto.
