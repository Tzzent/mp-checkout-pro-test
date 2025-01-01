import { api } from "@/api"
import { ItemList } from "@/components/item-list"

const HomePage = async () => {
  const items = await api.item.list()

  return (
    <>
      <ItemList items={items} />
    </>
  )
}

export default HomePage