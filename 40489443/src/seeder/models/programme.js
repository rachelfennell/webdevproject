
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

//Schema for Programme
const Programme = sequelize.define('Programme', {
  name: { 
    type: DataTypes.STRING(400),
    allowNull: false,
    unique: true,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('name', value.trim().toLowerCase());
      }
    },
    validate: {
      notEmpty: { msg: 'Programme name cannot be empty' }
    }
  },

  degree_type: { 
    type: DataTypes.ENUM('BSc','BA','LLB','BEng'),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Degree type cannot be empty' },
      isIn: {
        args: [['BSc','BA','LLB','BEng']],
        msg: 'Degree type must be one of BSc, BA, LLB, BEng'
      }
    }
  },

  school: { 
    type: DataTypes.ENUM('EEECS','Law','Arts'),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'School cannot be empty' },
      isIn: {
        args: [['EEECS','Law','Arts']],
        msg: 'School must be one of EEECS, Law, Arts'
      }
    }
  },

  programme_id: { 
    type: DataTypes.STRING(8),
    allowNull: false,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('programme_id', value.trim().toUpperCase());
      }
    },
    validate: {
      notEmpty: { msg: 'Programme ID cannot be empty' },
      is: {
        args: /^HE\d{6}$/,
        msg: 'Programme ID must be in format HE000000'
      }
    }
  },

  y2_weight: { 
    type: DataTypes.DECIMAL(3,2),
    allowNull: false,
    defaultValue: 0.30,
    validate: {
      notEmpty: { msg: 'Year 2 weight cannot be empty' },
      min: { args: [0.0], msg: 'Year 2 weight cannot be less than 0.0' },
      max: { args: [1.0], msg: 'Year 2 weight cannot be greater than 1.0' }
    }
  },

  y3_weight: { 
    type: DataTypes.DECIMAL(3,2),
    allowNull: false,
    defaultValue: 0.70,
    validate: {
      notEmpty: { msg: 'Year 3 weight cannot be empty' },
      min: { args: [0.0], msg: 'Year 3 weight cannot be less than 0.0' },
      max: { args: [1.0], msg: 'Year 3 weight cannot be greater than 1.0' },
      
      // Validator for sum of weights
      weightsSum(value) {
        const y2 = parseFloat(this.y2_weight);
        const y3 = parseFloat(value);
        if (y2 + y3 !== 1.0) {
          throw new Error('Year 2 and Year 3 weights must sum to 1.0');
        }
      }
    }
  },

  resit_cap: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 40,
    validate: {
      notEmpty: { msg: 'Resit cap cannot be empty' },
      min: { args: [0], msg: 'Resit cap cannot be less than 0' },
      max: { args: [100], msg: 'Resit cap cannot be more than 100' }
    }
  },

  active: { 
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },

  date_created: { 
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    validate: {
      notEmpty: { msg: 'Date created cannot be empty' },
      isDate: { msg: 'Date created must be a valid date' },
      isBeforeOrToday(value) {
        if (new Date(value) > new Date()) {
          throw new Error('Date created cannot be in the future');
        }
      }
    }
  }

}, {
  tableName: 'programmes',
  timestamps: false
});

//Export
export default Programme;

Programme.hasMany(Student, {
  foreignKey: 'programme_id',
  sourceKey: 'programme_id',
});