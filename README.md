# nest-next-init

Este repositorio es un monorepo que utiliza **Turborepo** para manejar dos aplicaciones principales: un backend con **Nest.js** y un frontend con **Next.js**. El proyecto está administrado con **pnpm** como gestor de paquetes.

---

## 🗂️ Estructura del Proyecto

```
apps/
├── backend/     # Aplicación de backend con Nest.js
└── frontend/    # Aplicación de frontend con Next.js
```

---

## 🚀 Scripts Disponibles

Estos scripts se ejecutan desde la raíz del proyecto:

- `pnpm dev`: Ejecuta ambos servidores (frontend y backend) en paralelo.
- `pnpm build`: Construye todas las aplicaciones y paquetes.
- `pnpm lint`: Ejecuta el linter en todas las aplicaciones.
- `pnpm format`: Formatea el código con Prettier.

---

## ⚙️ Configuración de Archivos


### `.gitignore`

Ignora archivos y carpetas que no deben ser rastreados por Git:

```
.env
node_modules/
Dockerfile
.dockerignore
backend/
frontend/
.turbo/
pnpm-lock.yaml
```



---
# 🛠️ Instalación y Uso

## 1️⃣ Clona el repositorio

```bash
mkdir apps
cd apps
git clone -b frontend <url-del-repo> frontend
git clone -b backend <url-del-repo> backend
```

## 2️⃣ Configura Turbo Repo (opcional, si aún no lo tienes)

Si deseas utilizar Turbo Repo para mejorar la gestión del monorepo:

```bash
pnpm add turbo --workspace-root
```

O, si estás creando un nuevo monorepo desde cero:

```bash
pnpm dlx create-turbo@latest
```

## 3️⃣ Instala las dependencias

```bash
pnpm install
```

## 4️⃣ Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
FRONTEND_PORT=3000
BACKEND_PORT=4000
```

(O ajusta según la configuración de tu backend.)

## 5️⃣ Inicia el proyecto

Ejecuta el frontend y backend en paralelo:

```bash
pnpm dev
```

## 6️⃣ Accede a las aplicaciones

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** Dependerá de la configuración de Nest.js

---

## 📝 Licencia

Este proyecto está licenciado bajo la licencia ISC.

---

## 👨‍💻 Autor

Desarrollado por Mateo.
