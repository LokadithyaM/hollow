"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import redis from "../lib/redis";

export interface Product {
  position: number;
  title: string;
  price: string;
  extracted_price: number;
  alternative_price: {
    price: string;
    extracted_price: number;
  } | null;
  rating: number | null;
  reviews: number;
  product_id: string;
  product_link: string;
  serpapi_product_api: string;
  immersive_product_page_token: string | null;
  serpapi_immersive_product_api: string | null;
  source: string;
  source_icon: string | null;
  multiple_sources: boolean;
  snippet: string | null;
  extensions: string[];
  thumbnail: string | null;
  thumbnails: string[];
  serpapi_thumbnails: string[];
  tag: string | null;
}


export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/search?q=${query}`);
      setResults(res.data.results || []);

      console.log("Search results:", res.data.results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };


  const handleViewProduct = async (key: number) => {
    const product = results[key];
  
    const res = await fetch("/api/fetchDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: product.serpapi_product_api }),
    });
  
    const detailedData = await res.json();
  
    const combinedProduct = {
      ...product,
      serpapi_data: detailedData,
    };
  
    // Ensure Redis write completes before navigation
    await fetch("/api/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: combinedProduct }),
    });
  
    // Only open the tab once data is definitely stored
    window.open(`/product/${product.product_id}`, "_blank");
  };
  
  
  
  
  
  

  return (
<div className="min-h-screen bg-gray-50 p-6">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
      Smart Shopping Search
    </h1>

    <div className="flex space-x-4 mb-8">
      <input
        className="border border-gray-300 text-black rounded-full p-4 flex-1 shadow-lg focus:ring focus:ring-blue-300 focus:outline-none transition-all"
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {results.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-4 flex flex-col items-center justify-between"
        >
          <div className="w-full aspect-w-1 aspect-h-1 relative mb-4">
            <img
              src={item.thumbnail || "/placeholder-image.png"}
              alt={item.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex-grow text-center">
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{item.source}</p>
            {item.snippet && (
              <p className="text-sm text-gray-700 mt-2">{item.snippet}</p>
            )}
            <p className="text-green-600 font-semibold text-lg mt-4">{item.price}</p>
            {item.alternative_price && (
              <p className="text-sm line-through text-gray-400 mt-1">
                {item.alternative_price.price}
              </p>
            )}
            {item.rating && (
              <p className="text-yellow-600 text-sm mt-1">
                ⭐ {item.rating} ({item.reviews} reviews)
              </p>
            )}
            {item.tag && (
              <p className="inline-block mt-4 text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                {item.tag}
              </p>
            )}
          </div>
          <button
            onClick={() => handleViewProduct(i)} // Pass the index (i)
            className="mt-6 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            View Product
          </button>

        </div>
      ))}
    </div>
  </div>
</div>


  );
}
