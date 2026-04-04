
import { DataTypes } from 'sequelize';
import sequelize from '../../web/config/db.js';

const ProgrammeModule = sequelize.define('ProgrammeModule', {
  programme_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Programme ID must be an integer' }
    }
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Module ID must be an integer' }
    }
  },
year_level: {
  type: DataTypes.ENUM('1', '2', '3'),
  allowNull: false,
  validate: {
    notEmpty: { msg: 'Year level cannot be empty' }
  }
},
  mandatory: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Credits must be an integer' },
      min: { args: [0], msg: 'Credits cannot be less than 0' },
      max: { args: [120], msg: 'Credits cannot be more than 120' }
    }
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'programme_modules',
  timestamps: false,
  indexes: [{ unique: true, fields: ['programme_id', 'module_id'] }]
});

export default ProgrammeModule;