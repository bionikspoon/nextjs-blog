import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostData {
  id: string
  title: string
  date: string
}

export async function getSortedPostsData(): Promise<PostData[]> {
  const fileNames = await fs.promises.readdir(postsDirectory)

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')

      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = await fs.promises.readFile(fullPath, 'utf-8')

      const matterResult = matter(fileContents)
      // TODO toPostData
      return { id, ...matterResult.data } as PostData
    })
  )

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
