---
name: iconografia-premium
description: Selección e implementación de íconos profesionales con profundidad, color y textura para páginas web. Evita iconografía lineal genérica y exige coherencia, accesibilidad y licencias.
---
# Skill: Iconografía premium para UX/UI

## Objetivo
Elevar la calidad visual de íconos en sitios web sin sacrificar velocidad, consistencia, accesibilidad ni claridad. No usar automáticamente Lucide, emojis, íconos genéricos de líneas finas ni el primer resultado de una biblioteca. Los íconos deben adecuarse al uso y a la identidad visual.

## Regla estricta de selección
- **Fuentes obligatorias en primer lugar: 1. Iconify (familias Fluent Color, multicolor y duotono), 2. Icons8 (Fluency y 3D).** Antes de usar otra biblioteca, justificar por qué estas no sirven.
- **Prohibido usar como primera opción los íconos lineales genéricos que los LLM suelen insertar automáticamente** (Lucide, Heroicons, emojis, caracteres Unicode, placeholders y pictogramas sin dirección artística). No se permiten en tarjetas comerciales, beneficios ni puntos destacados salvo indicación expresa del usuario. Excepción funcional razonable: controles de interfaz muy pequeños donde la claridad y accesibilidad exigen simplicidad, siempre diseñados con criterio.
- Priorizar íconos con color, capas, volumen sutil, degradados, iluminación coherente y sombras cuidadas, sin mezclar estilos ni afectar rendimiento.

## Fuentes priorizadas y verificadas
1. Iconify https://icon-sets.iconify.design/ : buscar Fluent Color, IconPark, multicolor y duotono. Cada colección puede tener una licencia diferente: verificarla antes de incorporar.
2. Icons8 https://icons8.com/icons : revisar Fluency y estilos 3D. El uso gratuito puede requerir atribución y limita formatos/tamaño. https://intercom.help/icons8-7fb7577e8170/en/articles/4732904-how-and-where-can-i-use-your-icons
3. IconScout https://iconscout.com/3d : para recursos ilustrativos 3D, texturas, materiales y piezas destacadas. Revisar la licencia concreta de cada activo. https://iconscout.com/licenses
4. IconStash https://iconstash.com/ : búsqueda y exportación de packs, con licencia por pack.
5. Iconify API https://iconify.design/docs/api/ : solo si el proyecto admite dependencia de servidor externo. Preferir SVG local para componentes definitivos.

## Prioridad explícita de iconos 3D
- En tarjetas de beneficios, servicios, procesos y bloques comerciales destacados, **evaluar primero iconos 3D premium**. Usar preferentemente Icons8 Fluency 3D, o IconScout 3D si el recurso y su licencia son adecuados; comparar con Iconify Fluent Color como alternativa.
- Buscar volumen real, texturas y materiales creíbles, sombras ambientales, reflejos moderados, iluminación coherente y perspectiva uniforme.
- Evitar iconos 3D de aspecto plástico o infantil, con estilos mezclados y archivos pesados. Optimizar recursos transparentes en WebP/PNG/AVIF y dimensiones explícitas.
- No reemplazar un 3D adecuado por un icono lineal genérico por conveniencia. En controles diminutos conservar claridad y accesibilidad.

## Selección por función
- Navegación, botones pequeños, formularios y controles: SVG nítido, estilísticamente coherente, generalmente monocromo o duotono, sin sombra exagerada.
- Tarjetas de beneficios, diferenciales y funcionalidades: SVG multicolor o iconografía 2.5D con dos o tres tonos, profundidad moderada y sombra suave.
- Secciones hero, conceptos de alto impacto, educación y marketing: 3D de calidad con materiales e iluminación consistentes, si aporta significado.
- Datos, cifras, diagramas: pictogramas simples y legibles. No sustituir claridad por decoración.

## Diseño y calidad
- Definir una única familia principal por sección y máximo dos familias complementarias por página.
- Establecer tamaño óptico homogéneo, volumen, ángulo de iluminación y fuerza de sombra consistentes.
- Adaptar la paleta del proyecto. Para Lore, usar ciruela oscuro, rosa/fucsia y verde lima como acento, no como saturación permanente. No introducir marcas descartadas.
- Fondos transparentes, evitar recuadros innecesarios, halos plásticos, exceso de brillos o emojis como reemplazo.
- El ícono no debe confundirse con una acción si es decorativo. Si es botón, ofrecer estados hover, focus-visible y etiqueta accesible.
- No aplicar texturas, sombras o animaciones que reduzcan contraste, legibilidad o rendimiento.
- Preferir SVG optimizado para UI; WebP/PNG con transparencia para piezas 3D; definir width/height y alt adecuados; lazy-load fuera de la primera pantalla.
- Animaciones discretas, con prefers-reduced-motion y sin movimiento perpetuo sin propósito.

## Proceso obligatorio para agentes
1. Auditar íconos actuales y señalar repeticiones genéricas, inconsistencias y ausencia de jerarquía.
2. Identificar el rol semántico de cada ícono y seleccionar un lenguaje visual común.
3. Buscar al menos tres candidatos apropiados cuando sea un elemento destacado; verificar origen y licencia.
4. Seleccionar recursos reales; no inventar enlaces de descarga ni asumir que cualquier archivo es libre de uso comercial.
5. Implementar activos locales optimizados cuando sea posible.
6. Verificar resultado en móvil, tablet y escritorio, incluidos contraste y navegación con teclado.
7. Documentar familia, origen, licencia, tamaños, colores y créditos requeridos.
8. Mantener el contenido textual, enlaces y funcionamiento existentes salvo instrucción expresa.

## Regla de calidad
El criterio no es 'más 3D = mejor'. Un ícono premium debe dar una impresión integrada y ayudar a comprender. Si aumenta la fricción, distrae del CTA o parece una ilustración de otro sitio, elegir una alternativa más simple pero mejor trabajada.

## Ejemplos de búsqueda
- 'fluent color fitness calendar'
- 'iconpark two tone program'
- 'icons8 fluency dumbbell'
- 'iconscout 3d wellness routine'
- 'premium duotone habit progress'

## Condiciones legales
Iconify reúne bibliotecas con licencias distintas. Icons8 ofrece un régimen gratuito con atribución y limitaciones. IconScout opera con licencias según recurso y tipo de producto. Revisar condiciones vigentes en cada descarga y no tratar una licencia de la plataforma como licencia uniforme de todos sus recursos.
