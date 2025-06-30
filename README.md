# ComputerScienceCongress

# Sistema de Registro y Control de Asistencia - Semana de Congresos UAA

Este proyecto tiene como objetivo desarrollar un sistema web para gestionar el registro de estudiantes durante la semana de congresos de la Universidad Autónoma de Aguascalientes. El sistema permitirá la inscripción a actividades académicas y recreativas, así como el control de asistencia mediante códigos QR.

## Objetivo

Automatizar el proceso de inscripción y control de asistencia en los congresos y conferencias universitarias, reduciendo el uso de papel y facilitando la gestión por parte de los organizadores.

## Características principales

- Inscripción de estudiantes con correo institucional (Microsoft 365)
- Restricción a dos actividades por alumno: una académica y una extracurricular
- Registro obligatorio a todos los congresos y conferencias del programa
- Generación de códigos QR por sesión con expiración automática
- Panel de administración para control de asistencia y generación de reportes
- Estadísticas y exportación en PDF/Excel
- Notificaciones por correo y alertas internas

## Tecnologías utilizadas

### Frontend

- React.js
- Vite
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Microsoft Graph API (autenticación y correo)

### Despliegue

- Vercel (Frontend)
- Railway o Render (Backend + DB)
- Azure (opcional, especialmente para integración con cuentas Microsoft)

## Estructura del proyecto (propuesta)
/frontend
└── src/
├── components/
├── pages/
├── services/
└── App.tsx

/backend
└── src/
├── controllers/
├── routes/
├── services/
├── middlewares/
├── prisma/
└── index.ts

/prisma
└── schema.Prisma

README.md
tsconfig.json
package.json



## Estado del proyecto

Documentación en desarrollo. La implementación comenzará una vez definidos los modelos de datos y casos de uso.

## Licencia

Uso académico y educativo. Puede adaptarse con fines personales o de aprendizaje.

