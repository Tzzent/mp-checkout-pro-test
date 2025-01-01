import { Payment } from "mercadopago"
import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

import { mercadopago } from "@/api"

export const POST = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl

    const id = searchParams.get("data.id")
    const topic = searchParams.get("topic")

    if (!id || topic !== "payment") {
      console.error("Missing or invalid parameters")
      throw new Error("Missing or invalid parameters")
    }

    const payment = await new Payment(mercadopago).get({
      id: Number(id)
    })

    if (payment.status === "approved") {
      revalidatePath("/")
    }

    return new NextResponse("OK", { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}