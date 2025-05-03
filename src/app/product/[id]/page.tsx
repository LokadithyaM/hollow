
import redis from "@/app/lib/redis";
import { notFound } from "next/navigation";
import Image from "next/image";
import InteractiveBox from "./InteractiveBox";
import Link from "next/link";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const raw = await redis.get(`product:dummy`);
  if (!raw) return notFound();

  const product = JSON.parse(raw);
  const imageUrl = product.thumbnail || "/placeholder-image.png";

  const sellers = product?.serpapi_data?.sellers_results?.online_sellers || [];
  const related = product?.serpapi_data?.related_products?.different_brand || [];
  const specs = product?.serpapi_data?.specs_results?.details || [];
  const ratings = product?.serpapi_data?.reviews_results?.ratings || [];
  const filters = product?.serpapi_data?.reviews_results?.filters || [];
  const reviews = product?.serpapi_data?.reviews_results?.reviews || [];

  console.log(sellers, related, specs, ratings, filters, reviews);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="h-full w-full p-8 bg-white">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Image */}
          <div className="flex-1 relative w-full max-w-md h-[400px] rounded-xl border bg-white">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4"
              unoptimized
              style={{ backgroundColor: "#fff" }}
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-start space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

            {product.source && (
              <p className="text-sm text-gray-500">Sold by: {product.source}</p>
            )}

            {product.rating && (
              <p className="text-yellow-600 text-sm">
                ⭐ {product.rating} ({product.reviews} reviews)
              </p>
            )}

            {product.snippet && (
              <p className="text-base text-gray-700">{product.snippet}</p>
            )}

            <div className="space-y-1">
              <p className="text-2xl font-semibold text-green-600">{product.price}</p>
              {product.alternative_price && (
                <p className="text-sm line-through text-gray-400">
                  {product.alternative_price.price}
                </p>
              )}
            </div>

            {product.tag && (
              <p className="inline-block text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full w-fit">
                {product.tag}
              </p>
            )}

            <a
              href={product.product_link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              View on Source
            </a>
          </div>
        </div>

        {/* Specs Section */}
        {specs.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <ul className="list-disc pl-5 space-y-1">
              {specs.map((spec: any, idx: number) => (
                <li key={idx}>{spec}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Online Sellers */}
        {sellers.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Online Sellers</h2>
            <ul className="space-y-2">
              {sellers.map((seller: any, idx: number) => (
                <li key={idx} className="text-sm text-gray-700">
                  {seller.name} - {seller.price?.extracted || "N/A"} - <a href={seller.link} className="text-blue-600 underline" target="_blank">Visit</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((item: any, idx: number) => (
                <div key={idx} className="border rounded p-4 bg-gray-50">
                  <p className="font-medium">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Filters & Ratings */}
        {(filters.length > 0 || ratings.length > 0) && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Ratings & Filters</h2>
            {ratings.map((rate: any, idx: number) => (
              <p key={idx} className="text-sm">{rate.rating} stars: {rate.count}</p>
            ))}
            <div className="flex gap-2 flex-wrap mt-2">
              {filters.map((f: any, idx: number) => (
                <span key={idx} className="text-xs border px-2 py-1 rounded bg-white">
                  {f.name} ({f.count})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
            <ul className="space-y-3">
              {reviews.map((review: any, idx: number) => (
                <li key={idx} className="border rounded p-3 bg-white">
                  <p className="font-semibold">{review.title}</p>
                  <p className="text-sm text-gray-600">{review.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
        <InteractiveBox
        sellers={sellers}
        related={related}
        specs={specs}
        ratings={ratings}
        filters={filters}
        reviews={reviews}
      />
    </div>
  );
}

// This is a standalone page. Do not export this if used in routing manually with dynamic setup.
