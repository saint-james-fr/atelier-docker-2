import { faker } from '@faker-js/faker'
import { pool } from './db'

const generateRandomPost = () => ({
  author: faker.person.fullName(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(3),
})

const insertRandomPost = async () => {
  const post = generateRandomPost()
  try {
    await pool.query(
      'INSERT INTO posts (author, title, content) VALUES ($1, $2, $3)',
      [post.author, post.title, post.content]
    )
    console.log('New post created:', post.title)
  } catch (err) {
    console.error('Error creating post:', err)
  }
}

export const startSeeding = () => {
  // Insert one post immediately
  insertRandomPost()
  
  // Then insert a new post every 30 seconds
  setInterval(insertRandomPost, 60000)
} 