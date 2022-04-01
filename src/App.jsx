import React from "react";
import { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import useFetch from "./hooks/useFetch";

export default function App() {
  const [size, setSize] = useState("");

  const {
    data: products,
    loading,
    error,
  } = useFetch("products?category=shoes");

  const filteredProducts = products.filter(
    (p) => size === "" || p.skus.find((s) => s.size === Number(size))
  );

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  if (error) {
    throw error;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            {size && <h2>{filteredProducts.length} items</h2>}
          </section>
          <section id="products">{filteredProducts.map(renderProduct)}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
