// // server/index.js
// const express = require('express');
// const cors = require('cors');
// const pool = require('./db');

// const app = express();

// // Middleware
// app.use(cors());           // Permite peticiones de otros dominios
// app.use(express.json());   // Permite procesar datos en formato JSON

// // Rutas
// app.get('/api/projects', async (req, res) => {
//     try {
//         const allProjects = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
//         res.json(allProjects.rows);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Error del servidor');
//     }
// });

// app.get('/api/skills', async (req, res) => {
//     try {
//         const allSkills = await pool.query('SELECT * FROM skills ORDER BY created_at DESC');
//         res.json(allSkills.rows);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Error del servidor');
//     }
// });

// // Puerto del servidor
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en puerto ${PORT}`);
// });

// // server/index.js
// app.post('/api/contact', async (req, res) => {
//     try {
//       const { name, email, message } = req.body;
//       const newMessage = await pool.query(
//         'INSERT INTO contact_messages (name, email, message) VALUES($1, $2, $3) RETURNING *',
//         [name, email, message]
//       );
//       res.json(newMessage.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ error: 'Error del servidor' });
//     }
//   });

// server/index.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

// Middleware
//app.use(cors());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
  }));
app.use(express.json());

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Rutas existentes
app.get('/api/projects', async (req, res) => {
    try {
        const allProjects = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(allProjects.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

app.get('/api/skills', async (req, res) => {
    try {
        const allSkills = await pool.query('SELECT * FROM skills ORDER BY created_at DESC');
        res.json(allSkills.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = await pool.query(
            'INSERT INTO contact_messages (name, email, message) VALUES($1, $2, $3) RETURNING *',
            [name, email, message]
        );
        res.json(newMessage.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Nuevas rutas para el blog
// Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener posts del blog
app.get('/api/blog', async (req, res) => {
    try {
        const posts = await pool.query(`
            SELECT p.*, u.username as author_name 
            FROM blog_posts p 
            JOIN users u ON p.author_id = u.id 
            ORDER BY p.created_at DESC
        `);
        res.json(posts.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear nuevo post (requiere autenticación)
app.post('/api/blog', authenticateToken, async (req, res) => {
    try {
        const { title, content, image_url } = req.body;
        const newPost = await pool.query(
            'INSERT INTO blog_posts (title, content, image_url, author_id) VALUES($1, $2, $3, $4) RETURNING *',
            [title, content, image_url, req.user.id]
        );
        res.json(newPost.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un post específico
app.get('/api/blog/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const post = await pool.query(`
        SELECT p.*, u.username as author_name 
        FROM blog_posts p 
        JOIN users u ON p.author_id = u.id 
        WHERE p.id = $1
      `, [id]);
  
      if (post.rows.length === 0) {
        return res.status(404).json({ error: 'Post no encontrado' });
      }
  
      res.json(post.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Puerto del servidor
const PORT = process.env.PORT || 5000;
/*app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
*/
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });