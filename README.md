# NeuroTech | Presupuestos | SITIO PÚBLICO

Repositorio de publicación de las propuestas web aprobadas de NeuroTech Soluciones.

**Importante:** aquí solo deben existir HTML, CSS, JavaScript, imágenes y recursos web destinados al público. Este repositorio es público: **nunca agregar** \`datos-negocio.md\`, \`propuesta.md\`, cálculos internos, claves, secretos ni manifiestos de aprobación.

## Arquitectura
- **Fuente editable PRIVADA:** \`neurotechsoluciones-design/neurotech-presupuestos-source\`.
- **Destino web PÚBLICO:** \`neurotechsoluciones-design/presupuesto\`.
- Una carpeta por cliente: \`<slug>/index.html\` y \`<slug>/assets/\`.
- Logo compartido: \`assets/shared/logo-neurotech.png\`; desde páginas de clientes referenciar \`../assets/shared/logo-neurotech.png\`.

## Publicación
Los cambios aprobados se sincronizan desde la fuente mediante \`.github/workflows/deploy-site.yml\` con doble revisión humana, autorización y hash. La publicación Pages se gestiona en este repositorio con \`.github/workflows/deploy-pages.yml\`.

URL habitual: \`https://neurotechsoluciones-design.github.io/presupuesto/<slug>/\`

Las páginas anteriores se conservan. No sobrescribir otra carpeta ni crear repositorios adicionales.

## Calidad visual
No usar imágenes codificadas Base64 o \`data:image\`. Guardar fotografías y otros recursos con calidad suficiente como archivos locales reales JPG/PNG/WebP/AVIF. Verificar rutas, diseño móvil, CTA, contenido comercial y despliegue.

El éxito de un push o commit no confirma que la página esté publicada. Comprobar el workflow de Pages y abrir la URL real.