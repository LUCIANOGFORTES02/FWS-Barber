import { PrismaClient } from "@prisma/client"

// Extendendo a interface global para incluir a propriedade cachedPrisma
declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient | undefined // Usando var para compatibilidade com global
}

let prisma: PrismaClient // Variável para armazenar a instância do Prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // Reutiliza instância do prisma
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma
