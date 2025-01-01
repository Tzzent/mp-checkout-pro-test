import { Payment } from "mercadopago"
import { revalidatePath } from "next/cache"

import { mercadopago } from "@/api"

type RequestBody = {
  data: {
    id: string
  }
}

export const POST = async (req: Request) => {
  const body: RequestBody = await req.json()

  const payment = await new Payment(mercadopago).get({
    id: body.data.id,
  })

  if (payment.status === "approved") {
    revalidatePath("/")
  }

  return new Response("OK", { status: 200 })
}