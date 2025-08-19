# Sanity CMS Demo Setup Guide

## Quick Setup Instructions

### 1. Create a Sanity Project

You have two options:

**Option A: Use Sanity CLI (Recommended)**
```bash
npx sanity@latest init
```
Follow the prompts to create a new project.

**Option B: Use Sanity.io Dashboard**
1. Go to [sanity.io](https://sanity.io)
2. Sign up/login to your account
3. Create a new project
4. Note down your Project ID

### 2. Update Environment Variables

Update `.env.local` with your actual project details:

```bash
# Replace with your actual Sanity project ID
NEXT_PUBLIC_SANITY_PROJECT_ID="your-actual-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"

# Optional: Add read token for private content
SANITY_API_READ_TOKEN=""
```

### 3. Start the Development Server

```bash
pnpm dev
```

### 4. Access Sanity Studio

Visit: `http://localhost:3000/studio`

### 5. Add Sample Content

Once in the Studio, add some sample content:

- **Authors**: Create a few author profiles
- **Categories**: Add blog categories
- **Posts**: Write some blog posts
- **Products**: Add products with images
- **Projects**: Showcase some portfolio projects
- **Team Members**: Add team member profiles
- **FAQs**: Create helpful FAQ entries

## Features Demonstrated

✅ **Content Types**
- Blog posts with rich text
- E-commerce products with variants
- Portfolio projects
- Team member profiles
- FAQ system
- Flexible page builder

✅ **Advanced Features**
- Content relationships
- Image optimization
- SEO fields
- Real-time preview
- Structured data

✅ **Developer Experience**
- TypeScript integration
- Auto-generated types
- GROQ queries
- Responsive design

## Troubleshooting

**Dataset not found error?**
- Make sure you've created a Sanity project
- Update your environment variables
- Restart your dev server

**Schema errors?**
- All schema files use emoji icons instead of React components
- Schemas are properly structured and imported

**Hydration mismatch?**
- Studio layout has been fixed to prevent conflicts

## Next Steps

1. Explore the Studio interface
2. Add your own content
3. Customize the schemas
4. Build additional pages (blog listing, product catalog, etc.)
5. Deploy to production

Enjoy your Sanity CMS demo! 🚀