"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Minus, Loader } from "lucide-react"

export const DonationForm = () => {
  const router = useRouter()

  const [amount, setAmount] = useState(5)
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(ev.target.value))
  }

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const formData = new FormData(ev.currentTarget)

    const { amt, name } = Object.fromEntries(formData.entries())

    if (!amt || !name) {
      return setError("Debes completar todos los campos.")
    }

    try {
      setLoading(true)

      const response = await fetch("/api/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amt),
          name,
        }),
      })

      if (!response.ok) {
        const { error } = await response.json()
        return setError(error)
      }

      const { url } = await response.json()
      router.push(url)
    } catch (error) {
      console.error("Error: ", error)
      setError("Ocurrió un error al enviar la donación.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {
        error && (
          <div className="bg-rose-200/80 text-rose-800 w-full max-w-md px-2 py-1 rounded-md shadow-lg text-sm">
            ❗{error}
          </div>
        )
      }
      {
        loading && (
          <div className="flex items-center gap-2 text-green-400">
            <Loader className="size-4 animate-spin" />
            <p>Cargando...</p>
          </div>
        )
      }
      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <h1 className="font-bold text-xl">Mercado Pago (Checkout Pro)</h1>

        <div className="flex flex-col items-center">
          <span className="font-semibold text-2xl mb-3">S/.{amount}</span>
          <div className="flex items-center gap-4">
            <Minus className="size-8" />
            <input
              name="amt"
              type="range"
              min={1}
              max={10}
              value={amount}
              disabled={loading}
              onChange={onChange}
            />
            <Plus className="size-8" />
          </div>
          <p className="font-light text-green-300">¿Cuanto dinero quieres donar?</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            disabled={loading}
            name="name"
            type="text"
            defaultValue="John Doe"
            placeholder="Nombre del donador..."
            className="p-2 rounded-md w-full text-black outline-none focus:border focus:border-green-500 transition-all"
          />
          <button
            disabled={loading}
            type="submit"
            className="rounded-lg border p-2 hover:bg-green-900 transition-colors shrink-0 disabled:bg-gray-400 disabled:text-gray-600"
          >
            Donar 🤑
          </button>
        </div>
      </form>
    </>
  )
}
