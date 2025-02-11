import { db } from "@/app/_lib/prisma"
import BarbershopInfo from "./_components/barbershop_info"

interface BarbershopDetailsProps {
  params: {
    id?: string
  }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsProps) => {
  if (!params.id) {
    //TODO:   redirecionar  para a home page
    return null
  }
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!barbershop) {
    //Redirecionar para home page
    return null
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />
    </div>
  )
}

export default BarbershopDetailsPage
