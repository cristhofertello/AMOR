# Para Nicole ❤️ — GitHub Pages

Proyecto web estático hecho para Cristhofer y Nicole.

## Estructura

```text
para-nicole-github-pages/
├── index.html
├── .nojekyll
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── assets/
    ├── images/
    │   ├── favicon.svg
    │   ├── snoopy-portada.svg
    │   ├── snoopy-carta.svg
    │   └── snoopy-final.svg
    ├── photos/
    │   ├── foto-1.svg
    │   ├── foto-2.svg
    │   ├── foto-3.svg
    │   ├── foto-4.svg
    │   ├── foto-5.svg
    │   └── foto-6.svg
    └── music/
        └── README.txt
```

## 1. Abrir en VS Code

Descomprime el ZIP y abre la carpeta completa en VS Code.

No necesitas instalar Node, npm, React, Vite ni ningún servidor.

La web es HTML + CSS + JavaScript puro.

## 2. Personalizar la fecha

Abre:

`js/app.js`

Busca:

```js
const FECHA_INICIO = new Date(2025, 1, 14, 0, 0, 0);
```

JavaScript cuenta los meses desde 0:

- enero = 0
- febrero = 1
- marzo = 2
- ...
- diciembre = 11

## 3. Poner imágenes de Snoopy

Los archivos incluidos son PLACEHOLDERS para que el proyecto funcione inmediatamente.

Si tienes imágenes de Snoopy que quieras usar, reemplaza:

- `assets/images/snoopy-portada.svg`
- `assets/images/snoopy-carta.svg`
- `assets/images/snoopy-final.svg`

Puedes usar PNG/JPG/WebP, pero si cambias la extensión debes actualizar también las rutas en `index.html`.

Ejemplo:

```html
<img src="./assets/images/snoopy-portada.png" ...>
```

Para mejor resultado usa PNG/WebP con fondo transparente.

## 4. Poner sus fotos

Puedes reemplazar los seis SVG de `assets/photos/`.

La forma más fácil es guardar sus fotos con nombres:

- `foto-1.jpg`
- `foto-2.jpg`
- ...
- `foto-6.jpg`

y luego cambiar `.svg` por `.jpg` en las seis rutas de `index.html`.

## 5. Poner la canción

Guarda tu MP3 exactamente como:

`assets/music/nuestra-cancion.mp3`

El reproductor está preparado para ese nombre.

## 6. Publicarlo con GitHub Pages

Este proyecto está preparado específicamente para GitHub Pages:

- no usa backend
- no usa rutas absolutas
- no necesita build
- no necesita npm
- incluye `.nojekyll`
- todos los recursos usan rutas relativas (`./...`)

### Si el repositorio ya está conectado a GitHub

En la terminal de VS Code:

```bash
git add .
git commit -m "Pagina romantica para Nicole"
git push
```

Después en GitHub:

1. Abre tu repositorio.
2. `Settings`.
3. `Pages`.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Branch: `main`.
6. Folder: `/ (root)`.
7. Guarda.

GitHub te mostrará una URL parecida a:

`https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`

## Muy importante

No cambies rutas como:

`./assets/photos/foto-1.svg`

por:

`/assets/photos/foto-1.svg`

El slash inicial puede romper los recursos cuando GitHub Pages publica el sitio dentro de una ruta de repositorio.

## Probar antes de subir

Puedes abrir `index.html` directamente.

Para una vista más parecida a GitHub Pages, puedes usar la extensión **Live Server** en VS Code, pero no es obligatoria.

## Dónde editar los textos

Todo el contenido está directamente en `index.html`.

Busca palabras como:

- `Mi lugar favorito`
- `10 cosas que amo de ti`
- `Una carta para Nicole`
- `¿Quieres seguir creando recuerdos conmigo?`

y reemplaza el texto por sus propias frases.
