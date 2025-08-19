'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'
import { faqsQuery, faqCategoriesQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { ChevronDown, Search, HelpCircle } from 'lucide-react'

export default function FAQPage() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [faqsData, categoriesData] = await Promise.all([
          client.fetch(faqsQuery),
          client.fetch(faqCategoriesQuery)
        ])
        setFaqs(faqsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = !selectedCategory || faq.category?._id === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    const categoryTitle = faq.category?.title || 'General'
    if (!acc[categoryTitle]) {
      acc[categoryTitle] = []
    }
    acc[categoryTitle].push(faq)
    return acc
  }, {} as Record<string, any[]>)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All Categories
            </button>
            {categories.map((category: any) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category._id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.title}
                {category.faqCount > 0 && (
                  <span className="ml-2 text-sm opacity-75">
                    ({category.faqCount})
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* FAQs */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Loading FAQs...</p>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No FAQs found matching your search.' : 'No FAQs available yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedFaqs).map(([categoryTitle, categoryFaqs]) => (
              <div key={categoryTitle}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {categoryTitle}
                </h2>
                <div className="space-y-4">
                  {categoryFaqs.map((faq: any) => (
                    <div
                      key={faq._id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                    >
                      <button
                        onClick={() => toggleExpanded(faq._id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedItems.has(faq._id) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedItems.has(faq._id) && (
                        <div className="px-6 pb-4">
                          <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            <PortableText value={faq.answer} />
                          </div>
                          {faq.tags && faq.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {faq.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {faq.helpful !== undefined && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {faq.helpful} people found this helpful
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}