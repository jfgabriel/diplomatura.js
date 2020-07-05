import express from 'express';
const app = express();
import postsRoutes from './controllers/posts';
import albumRoutes from './controllers/albums';
import userRoutes from './controllers/userInfo';

const PORT = 8080;

app.use('/posts', postsRoutes);
app.use('/albums', albumRoutes);
app.use('/userInfo', userRoutes);

//Implementar el endpoint de stats aca. GET "/"
app.get('/', function (req, res) {
  res.json({ mensaje: 'Hello world!' });
});




app.listen(PORT);
console.log(`Express started on port ${PORT}`);

