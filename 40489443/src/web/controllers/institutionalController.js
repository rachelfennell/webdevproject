
import { User, Programme, UserProgramme, Module, ProgrammeModule } from '../../seeder/models/index.js';
import sequelize from '../config/db.js';
import { Op } from 'sequelize';

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
          where: { active: true }
        }
      }
    });

    if (!admin) {
      return res.render('error', { message: 'Admin not found' });
    }

     const activeProgrammes = await Programme.findAll({
      where: { active: true },
      include: {
        model: User,
        where: { id: {[Op.ne]: adminId} }, //Search and exclude for programmes that don't have adminId
required: false
      }
    });

    res.render('institutional/editAdmin', {
      user: req.session.user,
      admin,
      activeProgrammes
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load edit admin page' });
  }
};

export const postAdminPage = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { username, email, first_name, last_name, active } = req.body;

    const admin = await User.findByPk(adminId);

    if (!admin) {
      return res.render('error', { message: 'Admin not found' });
    }


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


// Assign programme to user
export const assignProgramme = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { programmeId } = req.body;

const admin = await User.findByPk(adminId);
 if (!admin) {
      return res.status(404).render('error', { message: 'Admin not found.' });
    }

    const programme = await Programme.findByPk(programmeId);
 if (!programme) {
      return res.status(404).render('error', { message: 'Programme not found.' });
    }

    await UserProgramme.create({
      user_id: adminId,
      programme_id: programmeId,
      assigned_date: new Date(),
      active: true
    });

    return res.redirect(`/institutional/editAdmin/${adminId}`);
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Error assigning programme to admin' });
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
        programme_id: programmeId
      }
    });

    if (!userProgramme) {
      return res.status(404).render('error', { message: 'Programme not found for this admin.' });
    }

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
    res.render('institutional/createAdmin', { user: req.session.user });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load ' });
  }
};

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

    const moduleId = req.params.id;
    const module = await Module.findByPk(moduleId);

    if (!module) {
      return res.render('error', { message: 'Module not found' });
    }

    res.render('institutional/programmeProfile', {
      user: req.session.user,
      programme,
      module
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load Programme Profile' });
  }
};

// Edit Existing Programme Page
export const getEditProgrammePage = async (req, res) => {
  try {
    const programmeId = req.params.id;
    const programme = await Programme.findByPk(programmeId, {
      include: {
        model: Module,
        through: {
          attributes: ['year_level', 'mandatory', 'credits', 'active'],
          where: { active: true }
        }
      }
    });

    if (!programme) return res.render('error', { message: 'Programme not found' });

const activeModules = await Module.findAll({
  where : {active: true},
  include: {
    model: Programme,
    where: {id: {[Op.ne]: programmeId}},
    required: false
  }
})

    res.render('institutional/editProgramme', {
      user: req.session.user,
      programme,
      activeModules
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load edit programme page' });
  }
};

export const postEditProgrammePage = async (req, res) => {
  try {
    const programmeId = req.params.id;
    const { name, programme_code, degree_type, school, y2_weight, y3_weight, resit_cap, active } = req.body;

    const programme = await Programme.findByPk(programmeId);

    if (!programme) { return res.render('error', { message: 'Programme not found' }); }

    programme.name = name;
    programme.programme_code = programme_code;
    programme.degree_type = degree_type;
    programme.school = school;
    programme.y2_weight = y2_weight;
    programme.y3_weight = y3_weight;
    programme.resit_cap = resit_cap;
    programme.active = active === 'on';

    await programme.save();

    return res.redirect(`/institutional/programmeProfile/${programmeId}`);
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to update programme' });
  }
};

// Assign Module to Programme
export const assignModule = async (req, res) => {
  try {
    const programmeId = req.params.id;
    const { moduleId, year_level, mandatory, credits  } = req.body;

const programme = await Programme.findByPk(programmeId);
 if (!programme) {
      return res.status(404).render('error', { message: 'Programme not found.' });
    }

    const module = await Module.findByPk(moduleId);
 if (!module) {
      return res.status(404).render('error', { message: 'Module not found.' });
    }

    await ProgrammeModule.create({
      programme_id: programmeId,
      module_id: moduleId,
      year_level,
      mandatory,
      credits,
      active: true
    });

    return res.redirect(`/institutional/editProgramme/${programmeId}`);
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Error assigning module to programme' });
  }
};





























// Remove Assigned module from programme 
export const removeModule = async (req, res) => {
  try {
    const programmeId = req.params.id;
    const { moduleId } = req.body;

    const programmeModule = await ProgrammeModule.findOne({
      where: {
        programme_id: programmeId,
        module_id: moduleId
      }
    });

    if (!programmeModule) {
      return res.status(404).render('error', { message: 'Module not found for this programme.' });
    }

    programmeModule.active = false;
    await programmeModule.save();

    res.redirect(`/institutional/programmeProfile/${programmeId}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Error removing module from programme' });
  }
};

// Create New Programme Page
export const getCreateProgrammePage = async (req, res) => {
  try {
    res.render('institutional/createProgramme', { user: req.session.user });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load ' });
  }
};

export const postCreateProgrammePage = async (req, res) => {

  const { name, programme_code, degree_type, school, y2_weight, y3_weight, resit_cap }  = req.body;

  try {
    const newProgramme = Programme.build({
      name,
      programme_code,
      degree_type,
      school,
      y2_weight,
      y3_weight,
      resit_cap,
      active: true
    });

    await newProgramme.save();

    res.redirect('/institutional/manageProgrammes');

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load ' });
  }
};
