
import { User, Programme, UserProgramme, Module, ProgrammeModule, Student } from '../../seeder/models/index.js';
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
    const admins = await User.findAll({
  where: { role: 'academic_admin' },
  order: [['first_name', 'ASC']]
});
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
        through: { attributes: ['assigned_date', 'active', 'unassigned_date'] },
        order: [['programme_code', 'ASC']]
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
          attributes: ['assigned_date', 'active', 'unassigned_date'],
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

// Check if admin has any active assigned programmes
if(active!= 'on'){
const assignedProgrammes = await UserProgramme.findOne({
  where: {
    user_id: adminId,
    active: true
  }
});

if (assignedProgrammes) {
  return res.render('error', {
    message: 'This admin cannot be deactivated as they have active programmes assigned. Please unassign all programmes first.'
  });
}
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

   // Check if programme is already assigned to another active user
    const existingAssignment = await UserProgramme.findOne({
      where: {
        programme_id: programmeId,
        user_id: { [Op.ne]: adminId },
        active: true
      }, include: { model: User, attributes: ['first_name', 'last_name', 'username'] }
    });

    if (existingAssignment) {
      return res.render('error', { 
    message: `This programme is already assigned to ${existingAssignment.User.first_name} ${existingAssignment.User.last_name} (${existingAssignment.User.username})` });
    }

const existingUserAssignment = await UserProgramme.findOne({
      where: {
        programme_id: programmeId,
        user_id: adminId,
        active: true
      }
    });

  if (existingUserAssignment) {
      return res.render('error', { message: 'This programme is already assigned to this officer.' });
    }

    // Check if this admin already has an inactive assignment for this programme
    const previousAssignment = await UserProgramme.findOne({
      where: {
        user_id: adminId,
        programme_id: programmeId
      }
    });

    if (previousAssignment) {
      // Reactivate existing record
      previousAssignment.active = true;
      previousAssignment.assigned_date = new Date();
      await previousAssignment.save();
    } else {

      // Create new assignment
      await UserProgramme.create({
        user_id: adminId,
        programme_id: programmeId,
        assigned_date: new Date(),
        active: true
      });
    }

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

    // Check if programme has active students
    const activeStudents = await Student.findOne({
      where: {
        programme_id: programmeId,
        active_student: true
      }
    });

    if (activeStudents) {
      return res.render('error', { 
        message: 'This programme cannot be unassigned as it has active students enrolled. Please deactivate all students first.' 
      });
    }

   userProgramme.active = false;
userProgramme.unassigned_date = new Date();
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
    res.render('institutional/createAdmin', { user: req.session.user, error: null });

  } catch (err) {
    console.error(err);
    res.render('institutional/createAdmin', {
      user: req.session.user,
      error: 'Unable to load page'
    });
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

let errorMessage = 'Something went wrong';

    if (err.name === 'SequelizeValidationError') {
      errorMessage = err.errors[0].message;
    }
    else if (err.name === 'SequelizeUniqueConstraintError') {
      errorMessage = err.errors[0].message;
    }
    else if (err.message) {
      errorMessage = err.message;
    }

    return res.status(400).render('institutional/createAdmin', {
      user: req.session.user,
      error: errorMessage
    });
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
    const programmes = await Programme.findAll(
 {
  order: [['programme_code', 'ASC']]
  });


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
          attributes: ['year_level', 'mandatory', 'credits', 'active'],
          order: [['module_code', 'ASC']]
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
    const { name, programme_code, degree_type, school, y2_weight, y3_weight, resit_cap, pass_mark, active } = req.body;

    const programme = await Programme.findByPk(programmeId);
    if (!programme) return res.render('error', { message: 'Programme not found' });

    // Programme code must be unique
    const existingCode = await Programme.findOne({
      where: {
        programme_code,
        id: { [Op.ne]: programmeId }
      }
    });

if (existingCode) {
      return res.render('error', { message: 'This programme code is already in use by another programme' });
    }

    // Weights together must equal 1
    const y2 = parseFloat(y2_weight);
    const y3 = parseFloat(y3_weight);

    if (Math.abs(y2 + y3 - 1.0) > 0.001) {
      return res.render('error', { message: 'Year 2 and Year 3 weights must add up to 1.0 (e.g. 0.30 and 0.70)' });
    }

    // Cannot inactivate if has active students
    if (active !== 'on') {
      const activeStudents = await Student.findOne({
        where: { programme_id: programmeId, active_student: true }
      });

      if (activeStudents) {
        return res.render('error', { message: 'This programme cannot be deactivated as it has active students enrolled. Please deactivate all students first.' });
      }
    }

    programme.name = name;
    programme.programme_code = programme_code;
    programme.degree_type = degree_type;
    programme.school = school;
    programme.y2_weight = y2_weight;
    programme.y3_weight = y3_weight;
    programme.resit_cap = resit_cap;
    programme.pass_mark = pass_mark;
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
    const { moduleId, year_level, mandatory, credits } = req.body;

    const programme = await Programme.findByPk(programmeId);
    if (!programme) return res.render('error', { message: 'Programme not found.' });

    const module = await Module.findByPk(moduleId);
    if (!module) return res.render('error', { message: 'Module not found.' });

    // Cannot assign a module already assigned to this programme
    const existingModule = await ProgrammeModule.findOne({
      where: {
        programme_id: programmeId,
        module_id: moduleId
      }
    });

    if (existingModule) {
      if (existingModule.active) {
        return res.render('error', { message: 'This module is already assigned to this programme.' });
      } else {
        // Reactivate if previously removed
        existingModule.active = true;
        existingModule.year_level = year_level;
        existingModule.mandatory = mandatory;
        existingModule.credits = credits;
        await existingModule.save();
        return res.redirect(`/institutional/editProgramme/${programmeId}`);
      }
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
    res.render('institutional/createProgramme', { user: req.session.user,error: null });

  } catch (err) {
    console.error(err);
    res.render('institutional/createProgramme', {
      user: req.session.user,
      error: 'Unable to load page'
    });
  }
};

export const postCreateProgrammePage = async (req, res) => {
  const { name, programme_code, degree_type, school, y2_weight, y3_weight, resit_cap, pass_mark } = req.body;

  try {
    // Check weights equal 1
    const y2 = parseFloat(y2_weight);
    const y3 = parseFloat(y3_weight);

    if (Math.abs(y2 + y3 - 1.0) > 0.001) {
      return res.render('institutional/createProgramme', {
        user: req.session.user,
        error: 'Year 2 and Year 3 weights must add up to 1.0 (e.g. 0.30 and 0.70)'
      });
    }

    const newProgramme = Programme.build({
      name,
      programme_code,
      degree_type,
      school,
      y2_weight,
      y3_weight,
      resit_cap,
      pass_mark,
      active: true
    });

    await newProgramme.save();

    res.redirect('/institutional/manageProgrammes');

  } catch (err) {
    console.error(err);
    

let errorMessage = 'Something went wrong';

    if (err.name === 'SequelizeValidationError') {
      errorMessage = err.errors[0].message;
    }
    else if (err.name === 'SequelizeUniqueConstraintError') {
      errorMessage = err.errors[0].message;
    }
    else if (err.message) {
      errorMessage = err.message;
    }

    return res.status(400).render('institutional/createProgramme', {
      user: req.session.user,
      error: errorMessage
    });
  }
};

