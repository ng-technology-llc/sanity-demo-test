import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { productsQuery, productCategoriesQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import { Star, ShoppingCart, Filter } from 'lucide-react'

export const revalidate = 60

export default async function ProductsPage() {
  let products = []
  let categories = []
  
  try {
    const [productsData, categoriesData] = await Promise.all([
      client.fetch(productsQuery),
      client.fetch(productCategoriesQuery)
    ])
    products = productsData
    categories = categoriesData
  } catch (error) {
    console.error('Error fetching products:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse our collection of premium products
          </p>
        </div>

        {/* Categories Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              All Products
            </button>
            {categories.map((category: any) => (
              <button
                key={category._id}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {category.title}
                {category.productCount > 0 && (
                  <span className="ml-2 text-sm text-gray-500">
                    ({category.productCount})
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No products available yet. Add products in Sanity Studio!
            </p>
            <Link
              href="/studio"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Studio
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                {product.image && (
                  <div className="relative h-64 overflow-hidden group">
                    <img
                      src={urlForImage(product.image).width(400).height(400).url()}
                      alt={product.image.alt || product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.compareAtPrice && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
                        Sale
                      </span>
                    )}
                    {product.featured && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-2 py-1 text-sm rounded">
                        Featured
                      </span>
                    )}
                  </div>
                )}

                <div className="p-4">
                  {/* Categories */}
                  {product.categories && product.categories.length > 0 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {product.categories.map((cat: any) => cat.title).join(', ')}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    <Link
                      href={`/products/${product.slug.current}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {product.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  {product.shortDescription && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  )}

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {product.rating} ({product.reviewCount || 0})
                      </span>
                    </div>
                  )}

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      {product.compareAtPrice && (
                        <span className="text-sm text-gray-500 line-through mr-2">
                          ${product.compareAtPrice}
                        </span>
                      )}
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                      {product.currency && (
                        <span className="text-sm text-gray-500 ml-1">
                          {product.currency}
                        </span>
                      )}
                    </div>
                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Stock Status */}
                  {product.inventory !== undefined && (
                    <div className="mt-2">
                      {product.inventory > 0 ? (
                        <span className="text-sm text-green-600 dark:text-green-400">
                          In Stock ({product.inventory})
                        </span>
                      ) : (
                        <span className="text-sm text-red-600 dark:text-red-400">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}