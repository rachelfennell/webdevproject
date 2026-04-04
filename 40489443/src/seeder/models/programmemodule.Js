
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const ProgrammeModule = sequelize.define('ProgrammeModule', {
  programme_id: { type: DataTypes.INTEGER, allowNull: false },
  module_id: { type: DataTypes.INTEGER, allowNull: false },
  year_level: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    validate: { min: 1, max: 3 } 
  },
  mandatory: { type: DataTypes.BOOLEAN, defaultValue: true },
  credits: { type: DataTypes.INTEGER, allowNull: false },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'programme_modules',
  timestamps: false,
  indexes: [
    { unique: true, fields: ['programme_id', 'module_id'] }
  ],
});

export default ProgrammeModule;