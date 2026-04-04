import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

//Define schema
const ProgrammeModule = sequelize.define('ProgrammeModule', {
  programme_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Programme ID cannot be empty' },
      isInt: { msg: 'Programme ID must be an integer' }
    }
  },
  module_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Module ID cannot be empty' },
      isInt: { msg: 'Module ID must be an integer' }
    }
  },
  year_level: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Year level cannot be empty' },
      isIn: {
        args: [[1, 2, 3]],
        msg: 'Year level must be 1, 2, or 3'
      }
    }
  },
  mandatory: { type: DataTypes.BOOLEAN, defaultValue: true },
  credits: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Credits cannot be empty' },
      min: {
        args: 0,
        msg: 'Credits cannot be less than 0'
      },
      max: {
        args: 120,
        msg: 'Credits cannot be more than 120'
      },
      isInt: { msg: 'Credits must be an integer' }
    }
  },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'programme_modules',
  timestamps: false,
});

//Export
export default ProgrammeModule;