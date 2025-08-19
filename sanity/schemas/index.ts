// Blog schemas
import author from './blog/author'
import category from './blog/category'
import post from './blog/post'

// Product schemas
import product from './products/product'
import productCategory from './products/productCategory'
import review from './products/review'

// Portfolio schemas
import project from './portfolio/project'
import technology from './portfolio/technology'

// Team schemas
import department from './team/department'
import teamMember from './team/teamMember'

// Page schemas
import faq from './pages/faq'
import faqCategory from './pages/faqCategory'
import landingPage from './pages/landingPage'

// Component schemas
import hero from './components/hero'
import features from './components/features'
import testimonials from './components/testimonials'
import ctaSection from './components/cta'

export const schemaTypes = [
  // Blog
  author,
  category,
  post,
  
  // Products
  product,
  productCategory,
  review,
  
  // Portfolio
  project,
  technology,
  
  // Team
  department,
  teamMember,
  
  // Pages
  faq,
  faqCategory,
  landingPage,
  
  // Components (for page builder)
  hero,
  features,
  testimonials,
  ctaSection,
]