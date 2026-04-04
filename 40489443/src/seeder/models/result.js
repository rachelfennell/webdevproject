
import { DataTypes } from 'sequelize';
import sequelize from '../../web/config/db.js';

const Result = sequelize.define('Result', {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Student ID must be an integer' }
    }
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Module ID must be an integer' }
    }
  },
  mark: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
validate: {
  isDecimal: { msg: 'Mark must be a valid number between 0 and 100' },
  min: 0,
  max: 100
}
  },
year_level: {
  type: DataTypes.ENUM('1', '2', '3'),
  allowNull: false,
  validate: {
    notEmpty: { msg: 'Year level cannot be empty' }
  }
},
  is_resit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'results',
  timestamps: false,
  indexes: [
    { unique: true, fields: ['student_id', 'module_id', 'year_level', 'is_resit'] }
  ]
});

export default Result;