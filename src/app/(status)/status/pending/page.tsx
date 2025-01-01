"use client"

import { useSearchParams } from "next/navigation"
import { Loader } from "lucide-react"

import { QueryParam } from "../../types"

const PendingPage = () => {
  const sp = useSearchParams()

  const qp: Partial<QueryParam> = {}

  sp.forEach((value, key) => {
    qp[key as keyof QueryParam] = value
  })

  return (
    <div className="w-full max-w-md bg-white shadow rounded-md p-8 space-y-3 flex flex-col">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-amber-600">
          <Loader className="size-5 animate-spin" />
          <h1 className="font-bold text-xl">
            Procesando...
          </h1>
        </div>
        <p className="text-gray-600">
          Los datos se estan procesando, por favor espere.
        </p>
      </div>

      <pre className="bg-gray-100 p-2">
        {Object.entries(qp).map(([key, value]) => (
          <p key={key} className="text-gray-600 text-sm text-wrap">
            {key}: {value}
          </p>
        ))}
      </pre>
    </div>
  )
}

export default PendingPage