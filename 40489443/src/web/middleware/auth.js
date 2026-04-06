
export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) return next();
  res.redirect('/login');
};

export const isInstitutionalAdmin = (req, res, next) => {
  if (req.session?.user?.role === 'institutional_admin') return next();
  res.status(403).render('error', { message: 'Access denied' });
};

export const isAcademicAdmin = (req, res, next) => {
  if (req.session?.user?.role === 'academic_admin') return next();
  res.status(403).render('error', { message: 'Access denied' });
};