import { useEffect, useState } from "react";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";



export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/E-CommerceSkiStore_API/Products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (

    <>
      <ProductList products={products} />

    </>
  )
}
