import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import { ExternalLink, Github, Calendar, Briefcase } from 'lucide-react'

export const revalidate = 60

export default async function PortfolioPage() {
  let projects = []
  
  try {
    projects = await client.fetch(projectsQuery)
  } catch (error) {
    console.error('Error fetching projects:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our latest projects and case studies
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No projects yet. Add your first project in Sanity Studio!
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
            {projects.map((project: any) => (
              <div
                key={project._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                {/* Project Image */}
                {project.coverImage && (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={urlForImage(project.coverImage).width(600).height(400).url()}
                      alt={project.coverImage.alt || project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && (
                      <span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-3 py-1 text-sm font-medium rounded">
                        Featured
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}

                <div className="p-6">
                  {/* Project Type & Status */}
                  <div className="flex items-center justify-between mb-3">
                    {project.projectType && (
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase">
                        {project.projectType}
                      </span>
                    )}
                    {project.status && (
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        project.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : project.status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    <Link
                      href={`/portfolio/${project.slug.current}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  {/* Client */}
                  {project.client && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <Briefcase className="inline w-4 h-4 mr-1" />
                      {project.client}
                    </p>
                  )}

                  {/* Summary */}
                  {project.summary && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {project.summary}
                    </p>
                  )}

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech: any) => (
                        <span
                          key={tech._id}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                        >
                          {tech.icon && (
                            <img
                              src={urlForImage(tech.icon).width(16).height(16).url()}
                              alt={tech.name}
                              className="w-4 h-4 mr-1"
                            />
                          )}
                          {tech.name}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Categories */}
                  {project.categories && project.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.categories.map((category: string) => (
                        <span
                          key={category}
                          className="text-xs text-gray-500 dark:text-gray-400"
                        >
                          #{category}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links and Date */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    {project.endDate && (
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(project.endDate).getFullYear()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}