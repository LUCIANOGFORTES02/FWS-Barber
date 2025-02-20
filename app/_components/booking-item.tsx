"use client"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import { Button } from "./ui/button"
import { cancelBooking } from "../_actions/cancel-booking"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const isBookingConfirmed = isFuture(booking.date)

  const handleCancelClick = async () => {
    setIsDeleteLoading(true)

    try {
      await cancelBooking(booking.id)

      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="flex px-0 py-0">
            <div className="flex flex-[3] flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isBookingConfirmed ? "default" : "secondary"}
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={booking.barbershop.imageUrl}
                    alt={booking.barbershop.name}
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary">
              <p className="text-sm">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="border-b border-solid border-secondary px-5 pb-6 text-left">
          <SheetTitle>Informações de Reserva</SheetTitle>
        </SheetHeader>
        <div className="px-5">
          <div className="relative mt-6 h-[180px] w-full">
            <Image
              src="/barbershop-map.png"
              fill
              alt={booking.barbershop.name}
            />

            <div className="absolute bottom-4 left-0 w-full px-5">
              <Card>
                <CardContent className="flex gap-2 p-3">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="overflow-hidden text-ellipsis text-nowrap text-xs">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Badge
            className="my-3 w-fit"
            variant={isBookingConfirmed ? "default" : "secondary"}
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card>
            <CardContent className="flex flex-col gap-2 p-3">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Data</h3>
                <h4 className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Horário</h3>
                <h4 className="text-sm">{format(booking.date, "hh:mm")}</h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Barbearia</h3>
                <h4 className="text-sm">{booking.barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>
          <SheetFooter className="mt-6 flex-row gap-3">
            <SheetClose asChild>
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </SheetClose>
            <Button
              onClick={handleCancelClick}
              disabled={!isBookingConfirmed || isDeleteLoading}
              className="w-full"
              variant="destructive"
            >
              {isDeleteLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Cancelar Reserva
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
