"use client"
import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Barbershop } from "@prisma/client"
import Image from "next/image"
import { StarIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const router = useRouter()

  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`)
  }
  return (
    <Card className="min-w-full max-w-full rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* IMAGEM */}
        <div className="relative h-[159px] w-full">
          <Image
            alt={barbershop.name}
            fill //Faz a imagem preencher o container pai mantendo as proporções
            className="rounded-2xl object-cover" //object-cover (ajusta a imagem para cobrir toda a área disponível sem distorção)
            src={barbershop.imageUrl}
          />
          <Badge
            className="absolute left-2 top-2 space-x-1 opacity-90"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        <div className="px-1 py-3">
          <h3 className="overflow-hidden truncate text-ellipsis text-nowrap font-semibold">
            {barbershop.name}
          </h3>
          <p className="overflow-hidden truncate text-ellipsis text-nowrap text-sm text-gray-400">
            {barbershop.address}
          </p>
          <Button
            variant="secondary"
            className="mt-3 w-full"
            onClick={handleBookingClick}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
