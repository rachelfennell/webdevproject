
import { User } from '../../seeder/models/index.js';

export const getLogin = (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('login', { error: null });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username, active: true } });
    if (!user) {
      return res.render('login', { error: 'Invalid username or password' });
    }
    const valid = await user.validatePassword(password);
    if (!valid) {
      return res.render('login', { error: 'Invalid username or password' });
    }
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name
    };
    if (user.role === 'institutional_admin') {
      return res.redirect('/admin/dashboard');
    }
    return res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Something went wrong, please try again' });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};