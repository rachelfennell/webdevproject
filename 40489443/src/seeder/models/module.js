
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Module = sequelize.define('Module', {
  name: { type: DataTypes.STRING(400), allowNull: false },
  module_code: { type: DataTypes.STRING(25), allowNull: false, unique: true },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'modules',
  timestamps: false,
});

export default Module;