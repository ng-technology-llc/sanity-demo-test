import { Image, PortableTextBlock, Slug } from 'sanity'

// Blog Types
export interface Author {
  _id: string
  name: string
  slug: Slug
  image?: Image
  bio?: PortableTextBlock[]
  email?: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
    website?: string
  }
}

export interface Category {
  _id: string
  title: string
  slug: Slug
  description?: string
  color?: string
}

export interface Post {
  _id: string
  title: string
  slug: Slug
  author: Author
  featuredImage?: Image
  categories?: Category[]
  tags?: string[]
  publishedAt: string
  excerpt?: string
  body: PortableTextBlock[]
  seo?: SEO
  relatedPosts?: Post[]
  featured?: boolean
  readingTime?: number
}

// Product Types
export interface ProductCategory {
  _id: string
  title: string
  slug: Slug
  description?: string
  image?: Image
  parent?: ProductCategory
  productCount?: number
}

export interface ProductVariant {
  title: string
  sku?: string
  size?: string
  color?: {
    name: string
    hex: string
  }
  price?: number
  inventory?: number
  available?: boolean
}

export interface Product {
  _id: string
  title: string
  slug: Slug
  sku: string
  description?: PortableTextBlock[]
  shortDescription?: string
  images: Image[]
  categories?: ProductCategory[]
  price: number
  compareAtPrice?: number
  currency?: string
  variants?: ProductVariant[]
  inventory?: number
  status: 'active' | 'draft' | 'out_of_stock' | 'discontinued'
  featured?: boolean
  specifications?: Array<{
    label: string
    value: string
  }>
  rating?: number
  reviewCount?: number
  tags?: string[]
  relatedProducts?: Product[]
  seo?: SEO
  reviews?: Review[]
}

export interface Review {
  _id: string
  product: Product
  reviewer: string
  email?: string
  rating: number
  title?: string
  comment: string
  verified?: boolean
  helpful?: number
  images?: Image[]
  publishedAt: string
  approved?: boolean
}

// Portfolio Types
export interface Technology {
  _id: string
  name: string
  slug: Slug
  category?: string
  icon?: Image
  description?: string
  website?: string
  color?: string
}

export interface Project {
  _id: string
  title: string
  slug: Slug
  client?: {
    name?: string
    logo?: Image
    website?: string
  }
  coverImage: Image
  gallery?: Image[]
  projectType?: string
  categories?: string[]
  summary?: string
  description?: PortableTextBlock[]
  technologies?: Technology[]
  challenges?: Array<{
    challenge: string
    solution: string
  }>
  results?: Array<{
    metric: string
    value: string
    description?: string
  }>
  testimonial?: {
    quote: string
    author: string
    role?: string
  }
  startDate?: string
  endDate?: string
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold'
  featured?: boolean
  liveUrl?: string
  githubUrl?: string
  relatedProjects?: Project[]
}

// Team Types
export interface Department {
  _id: string
  name: string
  slug: Slug
  description?: string
  head?: TeamMember
  memberCount?: number
}

export interface TeamMember {
  _id: string
  name: string
  slug: Slug
  email?: string
  phone?: string
  profileImage?: Image
  role: string
  department?: Department
  level?: string
  bio?: PortableTextBlock[]
  shortBio?: string
  skills?: string[]
  certifications?: Array<{
    title: string
    issuer: string
    date?: string
    expiryDate?: string
  }>
  education?: Array<{
    degree: string
    field: string
    institution: string
    year?: number
  }>
  experience?: number
  startDate?: string
  social?: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
  }
  location?: {
    city?: string
    country?: string
    remote?: boolean
  }
  languages?: Array<{
    language: string
    proficiency: string
  }>
  featured?: boolean
  order?: number
  active?: boolean
}

// FAQ Types
export interface FAQCategory {
  _id: string
  title: string
  slug: Slug
  description?: string
  icon?: string
  order?: number
  faqCount?: number
}

export interface FAQ {
  _id: string
  question: string
  answer: PortableTextBlock[]
  category: FAQCategory
  tags?: string[]
  helpful?: number
  notHelpful?: number
  featured?: boolean
  order?: number
  relatedFaqs?: FAQ[]
  publishedAt?: string
  lastUpdated?: string
}

// Landing Page Types
export interface LandingPage {
  _id: string
  title: string
  slug: Slug
  description?: string
  sections: any[] // Complex array of different section types
  seo?: SEO
  publishedAt?: string
  status: 'draft' | 'published' | 'archived'
}

// Shared Types
export interface SEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: Image
}

// Search Result Type
export interface SearchResult {
  _id: string
  _type: string
  title: string
  description?: string
  slug: string
  image?: Image
}