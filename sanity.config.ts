import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'default',
  title: 'CMS Demo',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
    codeInput(),
  ],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})