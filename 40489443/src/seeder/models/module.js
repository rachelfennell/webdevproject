import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

//Define Module Schema
const Module = sequelize.define('Module', {
  name: { 
    type: DataTypes.STRING(400), 
    allowNull: false,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('name', value.trim().toLowerCase());
      }
    },
    validate: {
      notEmpty: { msg: 'Module name cannot be empty' },
    }
  },
  module_code: { 
    type: DataTypes.STRING(25), 
    allowNull: false, 
    unique: true,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('module_code', value.trim().toUpperCase());
      }
    },
    validate: {
      notEmpty: { msg: 'Module code cannot be empty' },
      isValidFormat(value) {
        // HEM followed by exactly 6 digits
        if (!/^HEM\d{6}$/.test(value)) {
          throw new Error('Module code must be in the format HEM000000');
        }
      }
    }
  },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'modules',
  timestamps: false,
});

//Export
export default Module;