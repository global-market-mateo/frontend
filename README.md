# nest-next-init

Este repositorio es un monorepo que utiliza **Turborepo** para manejar dos aplicaciones principales: un backend con **Nest.js** y un frontend con **Next.js**. El proyecto está administrado con **pnpm** como gestor de paquetes.

---

## 🗂️ Estructura del Proyecto

```
apps/
├── backend/     # Aplicación de backend con Nest.js
└── frontend/    # Aplicación de frontend con Next.js
.gitignore       # Archivos y carpetas ignorados por Git
.env             # Variables de entorno
pnpm-workspace.yaml  # Configuración del workspace de pnpm
package.json     # Configuración general y scripts del monorepo
turbo.json       # Configuración de Turborepo
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

### `package.json`

Define los scripts principales y las dependencias de desarrollo.

```json
{
  "name": "nest-next-init",
  "version": "1.0.0",
  "packageManager": "pnpm@9.4.0",
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "format": "prettier --write \"*_/**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "turbo": "^2.2.3"
  }
}
```

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

### `pnpm-workspace.yaml`

Define las carpetas incluidas en el workspace de pnpm:

```yaml
packages:
  - "apps/*"
```

### `turbo.json`

Configura las tareas y sus dependencias en Turborepo:

```json
{
  "tasks": {
    "dev": {
      "dependsOn": ["^dev"],
      "outputs": []
    },
    "dev:backend": {
      "outputs": [],
      "cache": false
    },
    "dev:frontend": {
      "dependsOn": ["dev:backend"],
      "outputs": [],
      "cache": false
    }
  },
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"]
}
```

### `.env`

Contiene las variables de entorno. Ejemplo:

```
FRONTEND_PORT=3000
```

---

## 🛠️ Instalación y Uso

1. **Clona el repositorio:**

   ```bash
   git clone <url-del-repo>
   cd nest-next-init
   ```

2. **Instala las dependencias:**

   ```bash
   pnpm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz con el siguiente contenido:

   ```env
   FRONTEND_PORT=3000
   ```

4. **Inicia el proyecto:**

   ```bash
   pnpm dev
   ```

5. **Accede a las aplicaciones:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: Dependerá de la configuración de Nest.js

---

## 📝 Licencia

Este proyecto está licenciado bajo la licencia ISC.

---

## 👨‍💻 Autor

Desarrollado por Mateo.
