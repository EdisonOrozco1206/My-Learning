import { prisma } from "@/libs/prisma"

async function getCategories() {
  return await prisma.category.findMany()
}

const GetCategories = async ({ children }) => {
  const categories = await getCategories()
  return (
    <>
      {children(categories)}
    </>
  )
}

export default GetCategories