
import { User, UserProgramme, Programme, ProgrammeModule, Student, Result, Module } from '../../seeder/models/index.js';

// Main Dashboard
export const dashboard = async (req, res) => {
  const adminId = req.session.userId;

  try {
    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: adminId, active: true },
      include: {
        model: Programme,
        attributes: ['name', 'programme_code']
      }
    });

    if (!userProgrammes || userProgrammes.length === 0) {
      return res.render('dashboard', { message: 'You are not assigned to any programmes.' });
    }

    res.render('dashboard', {
      programmes: userProgrammes,
      userName: req.session.userName
    });
  } catch (err) {
    console.error(err);
    res.render('dashboard', { message: 'An error occurred while loading your programmes.' });
  }
};

// Programme Dashboard
export const programmeDashboard = async (req, res) => {
  const programmeId = req.params.id; 

  try {
    const programme = await Programme.findByPk(programmeId);

    if (!programme) {
      return res.status(404).send('Programme not found');
    }

    res.render('programmeDashboard', { programme });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while loading programme details');
  }
};

