import { MercadoPagoConfig, Preference } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: "YAT"
})

const preference = new Preference(client)

preference.create({
  body: {
    items: [
      {
        id: "P1",
        title: "Product 1",
        quantity: 1,
        currency_id: "PE",
        unit_price: 100.0
      }
    ],
  }
})