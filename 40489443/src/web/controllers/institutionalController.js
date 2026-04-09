
import { User, Programme, UserProgramme } from '../../seeder/models/index.js';

// Main Dashboard
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

// Manage Admins Dashboard
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
        through: { 
          attributes: ['assigned_date', 'active'],
        where: {active: true}}
      } });

    if (!admin) {
      return res.render('error', { message: 'Admin not found' }); }

      res.render('institutional/editAdmin', {
        user: req.session.user,
        admin
      });
    
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load edit admin details page' });
  }
};

export const postAdminPage = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { username, email, first_name, last_name, active } = req.body;

    const admin = await User.findByPk(adminId);
     
    if (!admin) {
      return res.render('error', { message: 'Admin not found' }); }

    
    admin.username = username;
    admin.email = email;
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

// Remove Assigned Programme from Admin 
export const removeProgramme = async (req, res) => {
  try {
    const adminId = req.params.id;  
    const { programmeId } = req.body;  

    const userProgramme = await UserProgramme.findOne({
      where: {
        user_id: adminId,
        programme_id: programmeId }});

    if (!userProgramme) {
      return res.status(404).render('error', { message: 'Programme not found for this admin.' });}

    userProgramme.active = false;
    await userProgramme.save();

    res.redirect(`/institutional/adminProfile/${adminId}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Error removing programme from admin' });
  }
};


// Add New Academic Admin Page
export const getCreateAdminPage = async (req, res) => {
  try {
    res.render('institutional/createAdmin', { user: req.session.user});

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load ' });
  }
};


  // Add Academic Admin 
  export const postCreateAdminPage = async (req, res) => {

  const { username, first_name, last_name, password, email } = req.body;

  try {
    const newAdmin = User.build({
      username,
      first_name,
      last_name,
      email,
      role: 'academic_admin',
      active: true
    });

    await newAdmin.setPassword(password); // hash password
    await newAdmin.save();

    res.redirect('/institutional/manageAdmins');

  } catch (err) {
    console.error(err);
   res.render('error', { message: 'Unable to load ' });
  }
};

  // View Programmes Dashboard
  export const manageProgrammes = async (req, res) => {
    try {
      const programmes = await Programme.findAll();
      res.render('institutional/manageProgrammes', { user: req.session.user, programmes });
    } catch (err) {
      console.error(err);
      res.render('error', { message: 'Unable to load programmes' });
    }
  };

// View All Programmes
  export const viewProgrammes = async (req, res) => {
    try {
      const programmes = await Programme.findAll();
      res.render('institutional/viewProgrammes', { user: req.session.user, programmes });
    } catch (err) {
      console.error(err);
      res.render('error', { message: 'Unable to load programmes' });
    }
  };

// View Programme Profiles Page
export const viewProgrammeProfile = async (req, res) => {
  try {
    const programmeId = req.params.id;
    const programme = await Programme.findByPk(programmeId, {
      include: {
        model: Module,
        through: { 
          attributes: ['year_level', 'mandatory', 'credits', 'active'] 
        }
      }
    });

    if (!programme) {
      return res.render('error', { message: 'Programme not found' });
    }

    res.render('institutional/programmeProfile', {
      user: req.session.user,
      programme
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load Programme Profile' });
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