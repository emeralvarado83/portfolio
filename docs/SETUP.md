# Portfolio — Guía de configuración

## Stack

- **Next.js 15** (App Router)
- **PostgreSQL 16** (Docker)
- **Prisma** (ORM)
- **Auth**: JWT con cookies httpOnly (jose + bcryptjs)
- **Deploy**: VPS con `output: 'standalone'`

## 1. Requisitos previos

- Node.js 18+
- Docker y Docker Compose

## 2. Instalar dependencias

```bash
npm install
```

## 3. Levantar PostgreSQL con Docker

```bash
docker compose up -d
```

Esto crea un contenedor PostgreSQL en el puerto `5432` con:
- Usuario: `portfolio`
- Contraseña: `portfolio_dev`
- Base de datos: `portfolio`

## 4. Configurar variables de entorno

El archivo `.env.local` ya está creado con valores de desarrollo. Para producción, edita estos valores:

```env
DATABASE_URL="postgresql://portfolio:portfolio_dev@localhost:5432/portfolio"
JWT_SECRET="cambia-esto-por-un-secreto-seguro-en-produccion"
ADMIN_EMAIL="admin@emersonalvarado.dev"
ADMIN_PASSWORD="tu-password-seguro"
MAINTENANCE_MODE="false"
```

> En producción, usa un `ADMIN_PASSWORD` hasheado con bcrypt. El sistema detecta automáticamente si es texto plano o hash bcrypt.

## 5. Crear las tablas en la BD

```bash
npx prisma db push
```

Esto crea las 3 tablas: `projects`, `testimonials`, `contact_messages`.

## 6. (Opcional) Seed de datos iniciales

```bash
npm run db:seed
```

Crea un proyecto de ejemplo en la BD.

## 7. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 8. Panel de admin

Accede a [http://localhost:3000/admin](http://localhost:3000/admin) con las credenciales definidas en `.env.local`.

## 9. Explorar la BD visualmente

```bash
npm run db:studio
```

Abre Prisma Studio en [http://localhost:5555](http://localhost:5555).

---

## Deploy en VPS (producción)

### Build

```bash
npm run build
```

Genera la carpeta `.next/standalone/` gracias a `output: 'standalone'` en `next.config.mjs`.

### Ejecutar en producción

```bash
# Copiar archivos estáticos al standalone
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# Ejecutar
cd .next/standalone
PORT=3000 node server.js
```

### Con Docker (producción completa)

Puedes crear un `Dockerfile` para el deploy:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env.production portfolio
```

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Ejecutar build de producción |
| `npm run db:generate` | Regenerar Prisma Client |
| `npm run db:push` | Sincronizar schema con la BD |
| `npm run db:seed` | Insertar datos iniciales |
| `npm run db:studio` | Abrir Prisma Studio |

## Estructura del proyecto

```
portfolio/
├── docker-compose.yml        # PostgreSQL local
├── prisma/
│   ├── schema.prisma          # Modelos de BD
│   └── seed.mjs               # Datos iniciales
├── public/                    # Archivos estáticos
├── src/
│   ├── app/
│   │   ├── layout.jsx         # Layout raíz (metadata, HTML)
│   │   ├── page.jsx           # Página principal
│   │   ├── globals.css        # Estilos globales
│   │   ├── admin/
│   │   │   ├── page.jsx       # Panel de administración
│   │   │   └── admin.css
│   │   └── api/
│   │       ├── auth/          # Login, logout, session
│   │       ├── projects/      # CRUD proyectos
│   │       ├── testimonials/  # CRUD testimonios
│   │       └── contact/       # Mensajes de contacto
│   ├── components/            # Componentes React (client)
│   ├── context/               # LanguageContext (i18n)
│   ├── i18n/                  # Traducciones ES/EN/IT
│   └── lib/
│       ├── prisma.js          # Singleton Prisma Client
│       └── auth.js            # JWT y verificación
└── docs/
    └── SETUP.md               # Esta guía
```
