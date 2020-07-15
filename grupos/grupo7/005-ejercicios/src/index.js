import express from 'express';
import bodyParser from 'body-parser';
import alumnosRoutes from './controllers/alumnos';
import calificacionesRoutes from './controllers/calificaciones';
import materiasRoutes from './controllers/materias';
import profesoresRoutes from './controllers/profesores';
import provinciasRoutes from './controllers/provincias';
import universidadesRoutes from './controllers/universidades';

const PORT = 8080;
const app = express();
app.use(bodyParser.json());

app.use('/alumnos', alumnosRoutes);
app.use('/calificaciones', calificacionesRoutes);
app.use('/materias', materiasRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/provincias', provinciasRoutes);
app.use('/universidades', universidadesRoutes);

const home = `
<h1>API endpoints</h1>
<p>Alumnos: <a href="/alumnos">/alumnos</a></p>
<p>Calificaciones: <a href="/calificaciones">/calificaciones</a></p>
<p>Materias: <a href="/materias">/materias</a></p>
<p>Profesores: <a href="/profesores">/profesores</a></p>
<p>Provincias: <a href="/provincias">/provincias</a></p>
<p>Universidades: <a href="/universidades">/universidades</a></p>
`;

app.get('/', function (req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(home);
  res.end();
});

app.listen(PORT);
console.log(`Express started on port ${PORT}`);
