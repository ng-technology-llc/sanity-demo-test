import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import { formatDate } from '@/lib/utils'
import { CalendarIcon, UserIcon, TagIcon, ClockIcon } from 'lucide-react'

export const revalidate = 60

export default async function BlogPage() {
  let posts = []
  
  try {
    posts = await client.fetch(postsQuery)
  } catch (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover insights, tutorials, and updates from our team
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No blog posts yet. Create your first post in Sanity Studio!
            </p>
            <Link
              href="/studio"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Studio
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <article
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {post.featuredImage && post.featuredImage.asset && (
                  <Link href={`/blog/${post.slug.current}`}>
                    <img
                      src={urlForImage(post.featuredImage).width(400).height(250).url()}
                      alt={post.featuredImage.alt || post.title}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>
                )}
                
                <div className="p-6">
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category: any) => (
                        <span
                          key={category._id}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: category.color ? `${category.color}20` : '#e5e7eb',
                            color: category.color || '#6b7280'
                          }}
                        >
                          <TagIcon className="w-3 h-3 mr-1" />
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-2">
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      {post.author && (
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-1" />
                          <span>{post.author.name}</span>
                        </div>
                      )}
                      {post.readingTime && (
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          <span>{post.readingTime} min read</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <time>{formatDate(post.publishedAt)}</time>
                  </div>

                  {/* Featured Badge */}
                  {post.featured && (
                    <span className="inline-flex items-center px-2 py-1 mt-3 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                      Featured
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}