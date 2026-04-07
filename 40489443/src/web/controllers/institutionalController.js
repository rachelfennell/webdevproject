
import { User, Programme, UserProgramme } from '../../seeder/models/index.js';

// Dashboard
export const dashboard = async (req, res) => {
  try {
    const adminCount = await User.count({ where: { role: 'academic_admin' } });
    const programmeCount = await Programme.count();

    res.render('institutional/dashboard', {
      user: req.session.user,
      adminCount,
      programmeCount
    });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load dashboard' });
  }
};

// Admin Dashboard
export const manageAdmins = async (req, res) => {
  try {
    const admins = await User.findAll({ where: { role: 'academic_admin' } });
    res.render('institutional/manageAdmins', { user: req.session.user, admins });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load ' });
  }
};

// View All Academic Admins Page
export const viewAllAdminsPage = async (req, res) => {
  try {
    //Find all academic admins from users db
    const admins = await User.findAll({ where: { role: 'academic_admin' } });
    res.render('institutional/viewAdmins', { user: req.session.user, admins });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load ' });
  }
};


  // Academic Admin Profile Page
  export const viewAdminProfile = async (req, res) => {
    try {
      const adminId = req.params.id;
      const admin = await User.findByPk(adminId, {
        where: { role: 'academic_admin' },
        include: {
          model: Programme,
          through: { attributes: ['assigned_date', 'active'] },
        }
      });

      res.render('institutional/adminProfile', {
        user: req.session.user,
        admin,
        programmes: admin.programmes
      });

    } catch (err) {
      console.error(err);
      res.render('error', { message: 'Unable to load Admin Profile' });
    }
  };

// Edit Existing Academic Admin Page
export const getEditAdminPage = async (req, res) => {
  try {
    const adminId = req.params.id;
   
    const admin = await User.findByPk(adminId, {
      include: {
        model: Programme,
        through: { attributes: ['assigned_date', 'active'] }
      } });

    if (!admin) {
      return res.render('error', { message: 'Admin not found' }); }

      res.render('institutional/editAdmin', {
        user: req.session.user,
        admin,
        programmes: admin.programmes
      });
    
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load edit admin details page' });
  }
};


export const postAdminPage = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { username, first_name, last_name, active } = req.body;

    const admin = await User.findByPk(adminId);
     
    if (!admin) {
      return res.render('error', { message: 'Admin not found' }); }

    
    admin.username = username;
    admin.first_name = first_name;
    admin.last_name = last_name;
    admin.active = active === 'on'; 

    await admin.save();

   return res.redirect(`/institutional/adminProfile/${adminId}`);

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to update admin' });
  }
};
































// Add New Academic Admin Page
export const createAdminPage = async (req, res) => {
  try {
    const admins = await User.findAll({ where: { role: 'academic_admin' } });
    res.render('institutional/createAdmin', { user: req.session.user, admins });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load ' });
  }
};



  // Add Academic Admin 
  export const addAdminForm = async (req, res) => {
    res.render('institutional/addAdmin', { user: req.session.user, error: null });
  };

  export const addAdmin = async (req, res) => {
    const { username, first_name, last_name, password } = req.body;
    try {
      await User.create({
        username,
        first_name,
        last_name,
        password,
        role: 'academic_admin',
        active: true
      });
      res.redirect('/institutional/admins');
    } catch (err) {
      console.error(err);
      res.render('institutional/addAdmin', { user: req.session.user, error: 'Error creating admin' });
    }
  };




  // Assign Programme
  export const assignProgrammesForm = async (req, res) => {
    try {
      const admin = await User.findByPk(req.params.adminId);
      const programmes = await Programme.findAll();
      if (!admin) return res.render('error', { message: 'Admin not found' });


      res.render('institutional/assignProgrammes', { user: req.session.user, admin, programmes, error: null });
    } catch (err) {
      console.error(err);
      res.render('error', { message: 'Unable to load assignment form' });
    }
  };

  export const assignProgrammes = async (req, res) => {
    try {
      const admin = await User.findByPk(req.params.adminId);
      if (!admin) return res.render('error', { message: 'Admin not found' });

      const { programmeIds } = req.body; // array of programme IDs
      // TODO: Save assignments to DB (e.g., through a junction table AdminProgramme)
      // Example: await admin.setProgrammes(programmeIds);

      res.redirect('/institutional/admins');
    } catch (err) {
      console.error(err);
      res.render('error', { message: 'Unable to assign programmes' });
    }
  };

  // View Programmes
  export const viewProgrammes = async (req, res) => {
    try {
      const programmes = await Programme.findAll();
      res.render('institutional/manageProgrammes', { user: req.session.user, programmes });
    } catch (err) {
      console.error(err);
      res.render('error', { message: 'Unable to load programmes' });
    }
  };

  // Create Programme
  export const createProgrammeForm = (req, res) => {
    res.render('institutional/createProgramme', { user: req.session.user, error: null });
  };

  export const createProgramme = async (req, res) => {
    const { name, code, level } = req.body;
    try {
      await Programme.create({ name, code, level });
      res.redirect('/institutional/programmes');
    } catch (err) {
      console.error(err);
      res.render('institutional/createProgramme', { user: req.session.user, error: 'Error creating programme' });
    }
  };

  // Edit Programme
  export const editProgrammeForm = async (req, res) => {
    try {
      const programme = await Programme.findByPk(req.params.id);
      if (!programme) return res.render('error', { message: 'Programme not found' });
      res.render('institutional/editProgramme', { user: req.session.user, programme, error: null });
    } catch (err) {
      console.error(err);
      res.render('error', { message: 'Unable to load programme' });
    }
  };

  export const editProgramme = async (req, res) => {
    const { name, code, level } = req.body;
    try {
      const programme = await Programme.findByPk(req.params.id);
      if (!programme) return res.render('error', { message: 'Programme not found' });

      programme.name = name;
      programme.code = code;
      programme.level = level;
      await programme.save();

      res.redirect('/institutional/programmes');
    } catch (err) {
      console.error(err);
      const programme = await Programme.findByPk(req.params.id);
      res.render('institutional/editProgramme', { user: req.session.user, programme, error: 'Error updating programme' });
    }
  };