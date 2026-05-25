import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post, CaseStudy } from '@/types'

const contentDir = path.join(process.cwd(), 'src/content')

export function getAllPosts(): Post[] {
  const dir = path.join(contentDir, 'blog')
  if (!fs.existsSync(dir)) return []
  const folders = fs.readdirSync(dir).filter((file) => {
    return fs.statSync(path.join(dir, file)).isDirectory()
  })
  return folders.map((slug) => {
    const file = fs.readFileSync(path.join(dir, slug, 'index.md'), 'utf-8')
    const { data } = matter(file)
    return { slug, ...data } as Post
  })
}

export function getPost(slug: string): { meta: Post; content: string } {
  const file = fs.readFileSync(path.join(contentDir, 'blog', slug, 'index.md'), 'utf-8')
  const { data, content } = matter(file)
  return { meta: { slug, ...data } as Post, content }
}

export function getAllCaseStudies(): CaseStudy[] {
  const dir = path.join(contentDir, 'case-studies')
  if (!fs.existsSync(dir)) return []
  const folders = fs.readdirSync(dir).filter((file) => {
    return fs.statSync(path.join(dir, file)).isDirectory()
  })
  return folders.map((slug) => {
    const file = fs.readFileSync(path.join(dir, slug, 'index.md'), 'utf-8')
    const { data } = matter(file)
    return { slug, ...data } as CaseStudy
  })
}

export function getCaseStudy(slug: string): { meta: CaseStudy; content: string } {
  const file = fs.readFileSync(path.join(contentDir, 'case-studies', slug, 'index.md'), 'utf-8')
  const { data, content } = matter(file)
  return { meta: { slug, ...data } as CaseStudy, content }
}
