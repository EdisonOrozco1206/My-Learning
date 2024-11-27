import GetCategories from "@/components/category/GetCategories"
import ShowCategories from "@/components/category/ShowCategories"

const Category = () => {
  
  return (
    <GetCategories>
      {(categories) => <ShowCategories categories={categories} />}
    </GetCategories>
  )
}

export default Category