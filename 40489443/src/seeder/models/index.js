import User from './user.js';
import Programme from './programme.js';
import UserProgramme from './userProgramme.js';
import Student from './student.js';
import Module from './module.js';
import ProgrammeModule from './programmeModule.js';
import Result from './result.js';
import Classification from './classification.js';
import AuditLog from './auditLog.js';

// Users <-> Programmes (many-to-many)
// If a user or programme is deleted, user_programmes table will delete row linking them together
User.belongsToMany(Programme, { through: UserProgramme, foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Programme.belongsToMany(User, { through: UserProgramme, foreignKey: 'programme_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
UserProgramme.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
UserProgramme.belongsTo(Programme, { foreignKey: 'programme_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(UserProgramme, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Programme.hasMany(UserProgramme, { foreignKey: 'programme_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Programmes <-> Modules (many-to-many)
// If a programme or module is deleted, programme_modules table will delete row linking them together
Programme.belongsToMany(Module, { through: ProgrammeModule, foreignKey: 'programme_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Module.belongsToMany(Programme, { through: ProgrammeModule, foreignKey: 'module_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProgrammeModule.belongsTo(Programme, { foreignKey: 'programme_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProgrammeModule.belongsTo(Module, { foreignKey: 'module_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Programme.hasMany(ProgrammeModule, { foreignKey: 'programme_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Module.hasMany(ProgrammeModule, { foreignKey: 'module_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Students <-> Programmes
// RESTRICT - cannot delete a programme that still has students enrolled
Student.belongsTo(Programme, { foreignKey: 'programme_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Programme.hasMany(Student, { foreignKey: 'programme_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

// Results <-> Students & Modules
// RESTRICT - cannot delete a module that has results attached to it if a student is deleted, does not delete their results
Result.belongsTo(Student, { foreignKey: 'student_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Result.belongsTo(Module, { foreignKey: 'module_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Student.hasMany(Result, { foreignKey: 'student_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Module.hasMany(Result, { foreignKey: 'module_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

// Classifications <-> Students & Users
// RESTRICT - cannot delete a user who has classified students and if a student is deleted, does not delete their classification
Classification.belongsTo(Student, { foreignKey: 'student_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Classification.belongsTo(User, { foreignKey: 'classified_by', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Student.hasOne(Classification, { foreignKey: 'student_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
User.hasMany(Classification, { foreignKey: 'classified_by', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

// AuditLog <-> Users
// RESTRICT - cannot delete a user who has audit log entries
AuditLog.belongsTo(User, { foreignKey: 'changed_by', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
User.hasMany(AuditLog, { foreignKey: 'changed_by', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

export {
  User, Programme, UserProgramme, Student,
  Module, ProgrammeModule, Result, Classification, AuditLog
};