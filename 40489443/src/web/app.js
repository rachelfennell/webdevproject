// Imports
import express from 'express';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';

// Models
import '../seeder/models/index.js';
import './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session — must be before routes
app.use(session({
  secret: 'webdev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}));

// Routes — must be after session
app.use('/', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//cd C:\Users\rache\hedclass\40489443\src\web
//npx nodemon app.js