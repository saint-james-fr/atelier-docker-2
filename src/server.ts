import fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { pool, initializeDatabase } from './db'
import { startSeeding } from './seeder'

// Create Fastify instance with TypeBox for better type safety
const server = fastify().withTypeProvider<TypeBoxTypeProvider>()

// Define the posts route
server.get('/posts', async (request, reply) => {
  try {
    const result = await pool.query(
      'SELECT id, author, title, content, created_at FROM posts ORDER BY created_at DESC'
    )
    return result.rows
  } catch (err) {
    console.error('Error fetching posts:', err)
    throw err
  }
})

// Start the server
const start = async () => {
  try {
    // Initialize database schema
    await initializeDatabase()
    
    // Start the seeder
    startSeeding()
    
    // Start the server
    await server.listen({ port: 3000 })
    console.log('Server is running on http://localhost:3000')
  } catch (err) {
    console.error('Error starting server:', err)
    process.exit(1)
  }
}

start() 