import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { dataset, projectId } from './client'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlForImage(source: Image | any) {
  // Check if source has an asset reference
  if (!source || !source.asset) {
    // Return a placeholder image URL or empty builder
    return {
      url: () => '/placeholder.svg',
      width: () => ({ url: () => '/placeholder.svg', height: () => ({ url: () => '/placeholder.svg' }) }),
      height: () => ({ url: () => '/placeholder.svg' }),
    }
  }
  
  return builder.image(source)
}