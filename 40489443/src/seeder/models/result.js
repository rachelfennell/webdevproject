import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

//Define result schema
const Result = sequelize.define('Result', {
  student_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Student ID cannot be empty' },
      isInt: { msg: 'Student ID must be an integer' }
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
  mark: { 
    type: DataTypes.DECIMAL(5,2), 
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Mark cannot be empty' },
      min: { args: [0], msg: 'Mark cannot be less than 0' },
      max: { args: [100], msg: 'Mark cannot be greater than 100' }
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
  is_resit: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'results',
  timestamps: false,
  indexes: [
    { unique: true, fields: ['student_id', 'module_id', 'is_resit'] }
  ],
});

//Export
export default Result;