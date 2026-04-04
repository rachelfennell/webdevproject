
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

//Define Classification Schema
const Classification = sequelize.define('Classification', {
  student_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Student ID is required' }
    }
  },
  classified_by: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Classified by is required' }
    }
  },
  y2_average: { 
    type: DataTypes.DECIMAL(5,2),
    validate: {
      min: { args: 0, msg: 'Y2 average cannot be less than 0' },
      max: { args: 100, msg: 'Y2 average cannot be more than 100' }
    }
  },
  y3_average: { 
    type: DataTypes.DECIMAL(5,2),
    validate: {
      min: { args: 0, msg: 'Y3 average cannot be less than 0' },
      max: { args: 100, msg: 'Y3 average cannot be more than 100' }
    }
  },
  final_average: { 
    type: DataTypes.DECIMAL(5,2), 
    validate: {
      min: { args: 0, msg: 'Final average cannot be less than 0' },
      max: { args: 100, msg: 'Final average cannot be more than 100' }
    }
  },
  proposed_outcome: { 
    type: DataTypes.STRING(50),
    validate: {
      notEmpty: { msg: 'Proposed outcome is required' },
      isValid(value) {
        if (Number(value) < 0 || Number(value) > 100) {
          throw new Error('Proposed outcome must be between 0 and 100');
        }
      }
    }
  },
  final_outcome: { 
    type: DataTypes.STRING(50),
    validate: {
      notEmpty: { msg: 'Final outcome is required' },
      isValid(value) {
        if (Number(value) < 0 || Number(value) > 100) {
          throw new Error('Final outcome must be between 0 and 100');
        }
      }
    }
  },
  is_overridden: { type: DataTypes.BOOLEAN, defaultValue: false },
  rationale: { 
    type: DataTypes.TEXT,
    set(value) {
      if (value) this.setDataValue('rationale', value.trim().toLowerCase());
    },
    validate: {
      notEmpty: { msg: 'Rationale is required' }
    }
  },
  classified_at: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW,
    validate: {
      isBeforeNow(value) {
        if (value > new Date()) {
          throw new Error('Classification date cannot be in the future');
        }
      }
    }
  }
}, {
  tableName: 'classifications',
  timestamps: false,
});

//Export Model
export default Classification;