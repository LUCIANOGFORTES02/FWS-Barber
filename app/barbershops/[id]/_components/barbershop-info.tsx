"use client"

import SideMenu from "@/app/_components/side-menu"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet"
import { Barbershop } from "@prisma/client"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface BarbershopInfoProps {
  barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter()

  const handleBackClick = () => {
    router.replace("/")
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Button
          onClick={handleBackClick}
          size="icon"
          variant="outline"
          className="absolute left-4 top-4 z-50"
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4 z-50"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          fill
          alt={barbershop.name}
          style={{
            objectFit: "cover",
          }}
          className="opacity-75"
        />
      </div>

      <div className="border-b border-solid border-secondary px-5 pb-6 pt-3">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="mt-2 flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <StarIcon className="text-primary" size={18} />
          <p className="text-sm">5,0 (899 avaliações)</p>
        </div>
      </div>
    </div>
  )
}

export default BarbershopInfo
