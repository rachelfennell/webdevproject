
import { DataTypes } from 'sequelize';
import sequelize from '../../web/config/db.js';

const UserProgramme = sequelize.define('UserProgramme', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'User ID must be an integer' }
    }
  },
  programme_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Programme ID must be an integer' }
    }
  },
  assigned_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: { msg: 'Assigned date must be a valid date' },
      notInFuture(value) {
        if (value && new Date(value) > new Date()) {
          throw new Error('Assigned date cannot be in the future');
        }
      }
    }
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'user_programmes',
  timestamps: false,
  indexes: [
    { unique: true, fields: ['user_id', 'programme_id'] }
  ]
});

export default UserProgramme;