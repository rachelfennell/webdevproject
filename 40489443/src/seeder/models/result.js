
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Result = sequelize.define('Result', {
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  module_id: { type: DataTypes.INTEGER, allowNull: false },
  mark: { 
    type: DataTypes.DECIMAL(5,2), 
    allowNull: false, 
    validate: { min: 0, max: 100 } 
  },
  year_level: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    validate: { min: 1, max: 3 } 
  },
  is_resit: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'results',
  timestamps: false,
  indexes: [
    { unique: true, fields: ['student_id', 'module_id', 'is_resit'] }
  ],
});

export default Result;