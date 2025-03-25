import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Header from "../_components/header"
import Search from "./_components/search"
import BarbershopItem from "./_components/barbershop-item"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import BookingItem from "../_components/booking-item"
import { authOptions } from "../_lib/auth"

interface User {
  id: string
  name?: string
  email?: string
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, recommendedBarbershops, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          id: "asc",
        },
      }),
      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as User).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ])

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-lg font-bold">
          {session?.user
            ? `Olá, ${session?.user?.name?.split(" ")[0]}!`
            : "Olá! vamos agendar um corte de cabelo hoje?"}
        </h2>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="mt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 pl-5 text-sm font-bold uppercase text-gray-400">
              {" "}
              Agendamentos
            </h2>
            <div className="flex gap-3 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-6">
        <h2 className="mb-3 px-5 text-sm font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => {
            return (
              <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
                <BarbershopItem barbershop={barbershop}></BarbershopItem>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mb-[4.5rem] mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map((barbershop) => {
            return (
              <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
                <BarbershopItem barbershop={barbershop}></BarbershopItem>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
