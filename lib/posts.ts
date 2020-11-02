import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostData {
  id: string
  title: string
  date: string
  contentHtml: string
}

export async function getAllPostIds(): Promise<{ params: { id: string } }[]> {
  const fileNames = await getPostFiles()

  return fileNames.map(({ id }) => ({ params: { id } }))
}

export async function getSortedPostsData(): Promise<PostData[]> {
  const files = await getPostFiles()

  const allPostsData = await Promise.all(
    files.map((file) => file.id).map(getPostData)
  )

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = await fs.promises.readFile(fullPath, 'utf-8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  return {
    id,
    contentHtml: processedContent.toString(),
    ...matterResult.data,
  } as PostData
}

async function getPostFiles() {
  const fileNames = await fs.promises.readdir(postsDirectory)

  return fileNames.map((fileName) => ({
    fileName,
    id: fileName.replace(/\.md$/, ''),
  }))
}
