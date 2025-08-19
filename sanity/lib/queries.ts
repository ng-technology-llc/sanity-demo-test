import { groq } from 'next-sanity'

// Blog Queries
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featured,
    "author": author->{
      name,
      slug,
      image
    },
    "categories": categories[]->{
      title,
      slug,
      color
    },
    featuredImage,
    "readingTime": round(length(pt::text(body)) / 5 / 200)
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featured,
    body,
    tags,
    "author": author->{
      name,
      slug,
      image,
      bio,
      social
    },
    "categories": categories[]->{
      title,
      slug,
      color
    },
    featuredImage,
    seo,
    "relatedPosts": relatedPosts[]->{
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt
    },
    "readingTime": round(length(pt::text(body)) / 5 / 200)
  }
`

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    "author": author->{
      name,
      slug
    }
  }
`

// Product Queries
export const productsQuery = groq`
  *[_type == "product" && status == "active"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    sku,
    shortDescription,
    price,
    compareAtPrice,
    currency,
    "image": images[0],
    status,
    featured,
    inventory,
    rating,
    reviewCount,
    "categories": categories[]->{
      title,
      slug
    }
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    sku,
    description,
    shortDescription,
    images,
    price,
    compareAtPrice,
    currency,
    variants,
    inventory,
    status,
    featured,
    specifications,
    rating,
    reviewCount,
    tags,
    seo,
    "categories": categories[]->{
      title,
      slug,
      description
    },
    "relatedProducts": relatedProducts[]->{
      _id,
      title,
      slug,
      price,
      "image": images[0]
    },
    "reviews": *[_type == "review" && product._ref == ^._id && approved == true] | order(publishedAt desc) {
      _id,
      reviewer,
      rating,
      title,
      comment,
      verified,
      helpful,
      images,
      publishedAt
    }
  }
`

export const productCategoriesQuery = groq`
  *[_type == "productCategory"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image,
    "parent": parent->{
      title,
      slug
    },
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`

// Portfolio Queries
export const projectsQuery = groq`
  *[_type == "project"] | order(featured desc, endDate desc) {
    _id,
    title,
    slug,
    summary,
    coverImage,
    projectType,
    categories,
    featured,
    status,
    "client": client.name,
    "technologies": technologies[]->{
      name,
      slug,
      icon,
      category
    },
    startDate,
    endDate,
    liveUrl
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    coverImage,
    gallery,
    projectType,
    categories,
    summary,
    description,
    challenges,
    results,
    testimonial,
    startDate,
    endDate,
    status,
    featured,
    liveUrl,
    githubUrl,
    "technologies": technologies[]->{
      name,
      slug,
      icon,
      category,
      description,
      website
    },
    "relatedProjects": relatedProjects[]->{
      _id,
      title,
      slug,
      coverImage,
      summary,
      "client": client.name
    }
  }
`

// Team Queries
export const teamMembersQuery = groq`
  *[_type == "teamMember" && active == true] | order(order asc, name asc) {
    _id,
    name,
    slug,
    email,
    profileImage,
    role,
    shortBio,
    featured,
    social,
    "department": department->{
      name,
      slug
    }
  }
`

export const teamMemberBySlugQuery = groq`
  *[_type == "teamMember" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    email,
    phone,
    profileImage,
    role,
    level,
    bio,
    shortBio,
    skills,
    certifications,
    education,
    experience,
    startDate,
    social,
    location,
    languages,
    "department": department->{
      name,
      slug,
      description
    }
  }
`

export const departmentsQuery = groq`
  *[_type == "department"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    "head": head->{
      name,
      slug,
      profileImage,
      role
    },
    "memberCount": count(*[_type == "teamMember" && department._ref == ^._id])
  }
`

// FAQ Queries
export const faqsQuery = groq`
  *[_type == "faq"] | order(category.order asc, order asc) {
    _id,
    question,
    answer,
    featured,
    helpful,
    notHelpful,
    tags,
    publishedAt,
    lastUpdated,
    "category": category->{
      title,
      slug,
      icon
    }
  }
`

export const faqCategoriesQuery = groq`
  *[_type == "faqCategory"] | order(order asc, title asc) {
    _id,
    title,
    slug,
    description,
    icon,
    "faqCount": count(*[_type == "faq" && category._ref == ^._id])
  }
`

export const featuredFaqsQuery = groq`
  *[_type == "faq" && featured == true] | order(helpful desc)[0...6] {
    _id,
    question,
    answer,
    "category": category->{
      title,
      slug
    }
  }
`

// Landing Page Queries
export const landingPageBySlugQuery = groq`
  *[_type == "landingPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    sections,
    seo,
    publishedAt,
    status
  }
`

export const publishedLandingPagesQuery = groq`
  *[_type == "landingPage" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    publishedAt
  }
`

// Homepage Query (combines multiple content types)
export const homepageQuery = groq`{
  "featuredPosts": *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    "author": author->{name}
  },
  "featuredProducts": *[_type == "product" && featured == true && status == "active"] | order(_createdAt desc)[0...4] {
    _id,
    title,
    slug,
    price,
    compareAtPrice,
    "image": images[0],
    rating
  },
  "featuredProjects": *[_type == "project" && featured == true] | order(endDate desc)[0...3] {
    _id,
    title,
    slug,
    coverImage,
    summary,
    "client": client.name
  },
  "teamMembers": *[_type == "teamMember" && featured == true && active == true] | order(order asc)[0...4] {
    _id,
    name,
    role,
    profileImage,
    shortBio
  },
  "testimonials": *[_type == "landingPage"][0].sections[_type == "testimonials"][0].testimonials,
  "stats": {
    "totalPosts": count(*[_type == "post"]),
    "totalProducts": count(*[_type == "product" && status == "active"]),
    "totalProjects": count(*[_type == "project" && status == "completed"]),
    "totalTeamMembers": count(*[_type == "teamMember" && active == true])
  }
}`

// Search Query
export const searchQuery = groq`
  *[
    _type in ["post", "product", "project", "faq", "teamMember"] &&
    (
      title match $query ||
      name match $query ||
      question match $query ||
      excerpt match $query ||
      shortDescription match $query ||
      summary match $query ||
      pt::text(body) match $query ||
      pt::text(description) match $query ||
      pt::text(answer) match $query
    )
  ][0...20] {
    _id,
    _type,
    "title": coalesce(title, name, question),
    "description": coalesce(excerpt, shortDescription, summary, pt::text(answer)[0...200]),
    "slug": slug.current,
    "image": coalesce(featuredImage, images[0], coverImage, profileImage)
  }
`