import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { homepageQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import { formatDate } from '@/lib/utils'
import { 
  ArrowRight, 
  Star, 
  Users, 
  ShoppingBag, 
  FileText, 
  Briefcase,
  TrendingUp,
  Award,
  Globe,
  Zap
} from 'lucide-react'

export const revalidate = 60 // revalidate every 60 seconds

export default async function HomePage() {
  let data
  try {
    data = await client.fetch(homepageQuery)
  } catch (error) {
    // Fallback data when Sanity is not set up yet
    data = {
      featuredPosts: [],
      featuredProducts: [],
      featuredProjects: [],
      teamMembers: [],
      testimonials: [],
      stats: {
        totalPosts: 0,
        totalProducts: 0,
        totalProjects: 0,
        totalTeamMembers: 0
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Sanity CMS Demo
              <span className="block text-blue-600 dark:text-blue-400 mt-2">
                Headless Content Platform
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10">
              Experience the power of structured content with this comprehensive demo showcasing 
              blogs, e-commerce, portfolios, team management, and more.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/studio"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Access Studio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Explore Content
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {data.stats.totalPosts}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Blog Posts</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {data.stats.totalProducts}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {data.stats.totalProjects}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {data.stats.totalTeamMembers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      {data.featuredPosts?.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Featured Articles
              </h2>
              <Link 
                href="/blog" 
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center"
              >
                View all posts
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {data.featuredPosts.map((post: any) => (
                <article key={post._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  {post.featuredImage && (
                    <img
                      src={urlForImage(post.featuredImage).width(400).height(250).url()}
                      alt={post.featuredImage.alt || post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      <Link 
                        href={`/blog/${post.slug.current}`}
                        className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.author?.name}</span>
                      <time>{formatDate(post.publishedAt)}</time>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {data.featuredProducts?.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Featured Products
              </h2>
              <Link 
                href="/products" 
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center"
              >
                Shop all products
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.featuredProducts.map((product: any) => (
                <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  {product.image && (
                    <img
                      src={urlForImage(product.image).width(300).height(300).url()}
                      alt={product.image.alt || product.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      <Link href={`/products/${product.slug.current}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {product.title}
                      </Link>
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.compareAtPrice && (
                          <span className="text-sm text-gray-500 line-through mr-2">
                            ${product.compareAtPrice}
                          </span>
                        )}
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ${product.price}
                        </span>
                      </div>
                      {product.rating && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                            {product.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {data.featuredProjects?.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Recent Projects
              </h2>
              <Link 
                href="/portfolio" 
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center"
              >
                View portfolio
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {data.featuredProjects.map((project: any) => (
                <div key={project._id} className="group relative overflow-hidden rounded-lg shadow-lg">
                  {project.coverImage && (
                    <img
                      src={urlForImage(project.coverImage).width(400).height(300).url()}
                      alt={project.coverImage.alt || project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm mb-2">{project.client || 'Personal Project'}</p>
                    <h3 className="text-xl font-bold mb-2">
                      <Link href={`/portfolio/${project.slug.current}`} className="hover:text-blue-300">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-sm line-clamp-2">{project.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Explore the full power of Sanity CMS with our comprehensive demo
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/studio"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Zap className="mr-2 h-5 w-5" />
              Launch Studio
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
