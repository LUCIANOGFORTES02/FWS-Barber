"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const cancelBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })
  revalidatePath("/") //Invalida o cache de uma rota e força a sua revalidação
  revalidatePath("/bookings")
}
