CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  author VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 