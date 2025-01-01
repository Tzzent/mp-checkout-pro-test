import { MercadoPagoConfig, Preference } from "mercadopago"

import items from "@/db/items.json"

export interface Item {
  id: string,
  img: string,
  name: string,
  description: string,
  price: number,
  unit: number
}

const baseUrl = "https://mp-checkout-pro-test.vercel.app"

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: {
    integratorId: "dev_24c65fb163bf11ea96500242ac130004",
  }
})

const api = {
  item: {
    list: async (): Promise<Item[]> => {
      return items
    },
    submit: async (item: Omit<Item, "id">) => {
      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: "item",
              title: `Compra del producto ${item.name}`,
              description: item.description,
              category_id: "electronics",
              picture_url: item.img,
              unit_price: item.price,
              quantity: item.unit,
              currency_id: "USD",
            }
          ],
          payer: {
            // This is a hard-coded value
            name: "Lalo",
            surname: "Landa",
            email: "test_user_81131286@testuser.com",
            phone: {
              area_code: "51",
              number: "900899785"
            },
            address: {
              street_name: "Calle Fantasma",
              street_number: "123",
              zip_code: "321"
            }
          },
          back_urls: {
            success: `${baseUrl}/status/success`,
            failure: `${baseUrl}/status/failure`,
            pending: `${baseUrl}/status/pending`,
          },
          notification_url: `${baseUrl}/api/webhook`,
          payment_methods: {
            excluded_payment_methods: [
              {
                id: "visa",
              }
            ],
            // Max quotas = 6
            installments: 6,
          },
          auto_return: "approved",
          external_reference: process.env.EMAIL,
        }
      })

      // This is the url that will be used to pay
      return preference.init_point!
    }
  }
}

export { api }