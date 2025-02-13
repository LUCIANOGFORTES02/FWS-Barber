import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Header from "../_components/header"
import Search from "./_components/search"
import BookingItem from "../_components/booking-item"
import BarbershopItem from "./_components/barbershop-item"
import { db } from "../_lib/prisma"

export default async function Home() {
  const barbershops = await db.barbershop.findMany()

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-lg font-bold">Olá, Luciano Fortes</h2>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="mt-6 px-5">
        <h2 className="mb-3 text-sm font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <BookingItem />
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
          {barbershops.map((barbershop) => {
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
