
import { DataTypes } from 'sequelize';
import sequelize from '../../web/config/db.js';

const Module = sequelize.define('Module', {
  name: {
    type: DataTypes.STRING(400),
    allowNull: false,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('name', value.trim());
      }
    },
    validate: {
      notEmpty: { msg: 'Module name cannot be empty' }
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
  is: {
    args: /^HEM\d{6}$/,
    msg: 'Module code must be in the format HEM000000'
  }
}
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'modules',
  timestamps: false
});

export default Module;