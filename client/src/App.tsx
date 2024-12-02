import { useEffect, useState } from "react"





function App() {
  const [products, setProducts] = useState([
    { name: 'product1', price: '100.00' },
    { name: 'product2', price: '200.00' }
  ]);

  useEffect(() => {
    fetch('http://localhost:5000/E-CommerceSkiStore_API/Products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  function addProducts() {
    setProducts([...products, { name: 'product3', price: '300.00' }])
  }

  return (
    <div>
      <h1 style={{ color: 'blue' }}>Ski Store</h1>
      <ul>
        {products.map(item => (
          <li key={item.name}>{item.name} - {item.price}</li>
        ))}
      </ul>
      <button onClick={addProducts}>Add Product</button>
    </div>
  )
}

export default App
