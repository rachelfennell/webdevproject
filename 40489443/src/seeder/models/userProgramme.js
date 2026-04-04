
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const UserProgramme = sequelize.define('UserProgramme', {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  programme_id: { type: DataTypes.INTEGER, allowNull: false },
  assigned_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'user_programmes',
  timestamps: false,
  indexes: [
    { unique: true, fields: ['user_id', 'programme_id'] }
  ],
});

export default UserProgramme;