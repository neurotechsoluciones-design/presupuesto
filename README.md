# NeuroTech Presupuestos — Site Repo (PÚBLICO)

> **Solo HTML + assets para GitHub Pages**. Se actualiza automáticamente desde `neurotech-presupuestos-source` (privado).

---

## Estructura

```
neurotech-presupuestos-site/
├── .github/workflows/deploy-pages.yml  # Deploy a GitHub Pages
├── cabanas-del-sur/
│   └── index.html
├── gestion-aumentada/
│   └── index.html
├── el-viejo-bodegon/
│   └── index.html
├── el-gran-baratillo/
│   └── index.html
└── sitios/
    └── gestion-aumentada/
        ├── index.html
        └── assets/
```

---

## Deploy

**Automático**: Push a `main` → GitHub Actions → GitHub Pages

**Manual**: Actions → `Deploy to GitHub Pages` → Run workflow

---

## URLs

| Tipo | URL |
|------|-----|
| Propuesta | `https://neurotechsoluciones-design.github.io/neurotech-presupuestos-site/gestion-aumentada/` |
| Propuesta | `https://neurotechsoluciones-design.github.io/neurotech-presupuestos-site/cabanas-del-sur/` |
| Sitio original | `https://neurotechsoluciones-design.github.io/neurotech-presupuestos-site/sitios/gestion-aumentada/` |
| Sitio legacy | `https://neurotechsoluciones-design.github.io/neurotech-presupuestos-site/el-gran-baratillo/` |

---

## Configuración Pages

Settings → Pages → Source: **GitHub Actions**

Custom domain (opcional): `propuestas.neurotechsoluciones.com`