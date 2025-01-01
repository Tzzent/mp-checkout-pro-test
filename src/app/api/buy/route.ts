import { Item, api } from "@/api"

import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const data: Omit<Item, "id"> = await req.json()

    if (!data) {
      return NextResponse.json({ error: "Error" }, { status: 400 })
    }

    const url = await api.item.submit({
      ...data
    })

    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    console.error("Error processing the donation:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}