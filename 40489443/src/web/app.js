// Imports
import express from 'express';
import path from 'path';
import session, { Cookie } from 'express-session';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import institutionalRoutes from './routes/institutionalRoutes.js';
import academicRoutes from './routes/academicRoutes.js';
import rateLimit from 'express-rate-limit';

// DB Models
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
  cookie: { maxAge: 600000 } //10 minutes of inactivity
}));

// Rate Limiter on login routes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,    // 15 minutes 
  max: 10, // max 5 attempts per window
  message: 'Too many login attempts, please try again in 15 minutes'
});

app.use('/login', loginLimiter);

// Routes — must be after session
app.use('/', authRoutes);
app.use('/', institutionalRoutes);
app.use('/', academicRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//cd C:\Users\rache\hedclass\40489443\src\web
//npx nodemon app.js
//http://localhost:3000/login

//Bootstrap -  before head
//<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
//Bootstrap - before body
//<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>