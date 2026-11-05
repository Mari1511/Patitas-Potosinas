# Patitas Potosinas

## Propósito

Patitas Potosinas es una plataforma web de adopción de perros en San Luis Potosí, México. Su objetivo es conectar a perritos rescatados de refugios locales con familias responsables, dar visibilidad a los perros rescatados, reducir el abandono y facilitar adopciones responsables.

> **Adopta, no compres.** Ninguna adopción tiene costo económico.

---

## Requisitos

- Un navegador moderno (Chrome, Firefox, Edge o Safari).
- [Node.js](https://nodejs.org/) (para ejecutar las pruebas y levantar el servidor local).
- Opcional: extensión **Live Server** de VS Code.

> El sitio usa módulos ES6, por lo que **no funciona abriendo `index.html` con doble clic**; debe servirse desde un servidor local.

---

## Comandos de ejecución

### Ejecutar el sitio

Desde la carpeta raíz del proyecto:

```bash
npx serve src/public
```

Después abre en el navegador la dirección que aparece en la terminal (normalmente **http://localhost:3000**).

También puedes usar **Live Server** en VS Code: clic derecho en `src/public/index.html` → **"Open with Live Server"**.

### Ejecutar las pruebas

```bash
npm test
```

Verifica que existan los archivos principales y que todos los archivos JavaScript tengan sintaxis válida. Esta misma verificación se ejecuta automáticamente en GitHub Actions con cada `push` o Pull Request a `main`.

---

## Integrantes

- Aguilera Casas Fernando
- Padrón Cruz Mariana
- Roque González Edgar Saúl