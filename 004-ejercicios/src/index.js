import express from 'express';
const app = express();
import postsRoutes from './controllers/posts';
import albumRoutes from './controllers/albums';

const PORT = 8080;

app.use('/posts', postsRoutes);
app.use('/albums', albumRoutes);

// Implementar el endpoint de stats aca. GET "/"
app.get('/', function (req, res) {
  res.json({ mensaje: 'Hello world!' });
});

app.listen(PORT);
console.log(`Express started on port ${PORT}`);
