"use client"

import Image from "next/image"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Item } from "@/api"

interface Props {
  items: Item[]
}

export const ItemList = ({ items }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onBuy = (item: Item) => {
    setLoading(true)

    const promise = fetch("/api/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...item
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Hubo un error al comprar el producto")
      }

      return response.json()
    }).then((data) => {
      router.push(data.url)
    }).finally(() => {
      setLoading(false)
    })

    toast.promise(promise, {
      loading: "Verificando...",
      success: "Verificado.",
      error: "Hubo un error.",
    })
  }

  return (
    <div className="p-8 container mx-auto">
      <h2 className="text-xl font-bold mb-3 text-end">Productos disponibles</h2>
      <ul className="grid grid-cols-4 gap-5">
        {items.map((item) => (
          <li
            key={item.id}
            className="border rounded-md p-4 flex flex-col space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">{item.name}</span>
              <span className="text-sm text-gray-500">${item.price}</span>
            </div>
            <p className="text-sm text-gray-500">{item.description}</p>
            <div className="relative w-52 h-56 mx-auto">
              <Image
                src={item.img}
                alt={`product-${item.name}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <button
              disabled={loading}
              onClick={() => onBuy(item)}
              className="bg-orange-500 text-orange-100 px-2 py-1.5 rounded-md hover:bg-orange-500/80 transition-colors w-fit self-end disabled:bg-opacity-60"
            >
              Comprar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
