// models/index.js
import User from './user.js';
import Programme from './programme.js';
import UserProgramme from './userProgramme.js';
import Student from './student.js';
import Module from './module.js';
import ProgrammeModule from './programmeModule.js';
import Result from './result.js';
import Classification from './classification.js';
import AuditLog from './auditLog.js';

// Users and Programmes 
User.belongsToMany(Programme, { through: UserProgramme, foreignKey: 'user_id' });
Programme.belongsToMany(User, { through: UserProgramme, foreignKey: 'programme_id' });
UserProgramme.belongsTo(User, { foreignKey: 'user_id' });
UserProgramme.belongsTo(Programme, { foreignKey: 'programme_id' });

// Programmes and Modules 
Programme.belongsToMany(Module, { through: ProgrammeModule, foreignKey: 'programme_id' });
Module.belongsToMany(Programme, { through: ProgrammeModule, foreignKey: 'module_id' });
ProgrammeModule.belongsTo(Programme, { foreignKey: 'programme_id' });
ProgrammeModule.belongsTo(Module, { foreignKey: 'module_id' });

// Students
Student.belongsTo(Programme, { foreignKey: 'programme_id' });
Student.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Programme.hasMany(Student, { foreignKey: 'programme_id' });
User.hasMany(Student, { foreignKey: 'created_by', as: 'createdStudents' });

// Results
Result.belongsTo(Student, { foreignKey: 'student_id' });
Result.belongsTo(Module, { foreignKey: 'module_id' });
Student.hasMany(Result, { foreignKey: 'student_id' });
Module.hasMany(Result, { foreignKey: 'module_id' });

// Classifications
Classification.belongsTo(Student, { foreignKey: 'student_id' });
Classification.belongsTo(User, { foreignKey: 'classified_by', as: 'classifier' });
Student.hasOne(Classification, { foreignKey: 'student_id' });
User.hasMany(Classification, { foreignKey: 'classified_by', as: 'classifications' });

// AuditLog
AuditLog.belongsTo(User, { foreignKey: 'changed_by' });
User.hasMany(AuditLog, { foreignKey: 'changed_by' });

export { 
  User, Programme, UserProgramme, Student, 
  Module, ProgrammeModule, Result, Classification, AuditLog 
};