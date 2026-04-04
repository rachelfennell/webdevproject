// Imports
import express from 'express';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';

// Models must be imported first so Sequelize knows about them before syncing
import '../seeder/models/index.js';
import './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App set up
const app = express();
const PORT = 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: 'webdev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge : 600000 }
}));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});