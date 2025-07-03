-- CreateTable
CREATE TABLE "Actividad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,
    "cupo" INTEGER NOT NULL,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);
