import { DataTypes } from "sequelize";
import sequelize from '../db.js';
import Programme from './programme.js';

//Define the Schema
const Student = sequelize.define('Student', {
  student_number: { 
    type: DataTypes.STRING(10), 
    allowNull: false,
    unique: true,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('student_number', value.trim());
      }
    },
    validate: {
      notEmpty: { msg: 'Student number cannot be empty' },
      isNumeric: { msg: 'Student number must contain only numbers' },
      len: { args: [10, 10], msg: 'Student number must be exactly 10 digits' }
    }
  },

  first_name: { 
    type: DataTypes.STRING(150),
    allowNull: false,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('first_name', value.trim().toLowerCase());
      }
    },
    validate: {
      notEmpty: { msg: 'First name cannot be empty' }
    }
  },

  last_name: { 
    type: DataTypes.STRING(150),
    allowNull: false,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('last_name', value.trim().toLowerCase());
      }
    },
    validate: {
      notEmpty: { msg: 'Last name cannot be empty' }
    }
  },

  dob: { 
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: { msg: 'Date of birth must be a valid date' },
      isValidAge(value) {
        const dob = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (age < 16 || age > 100) {
          throw new Error('Student must be between 16 and 100 years old');
        }
      }
    }
  },

programme_id: {
  type: DataTypes.STRING(8),
  allowNull: false,
  set(value) {
    if (typeof value === 'string') this.setDataValue('programme_id', value.trim().toUpperCase());
  },
  validate: {
    notEmpty: { msg: 'Programme ID cannot be empty' },
    isProgrammeExists: async function(value) {
      const Programme = require('./programme.js'); 
      const programme = await Programme.findOne({ where: { programme_id: value } });
      if (!programme) {
        throw new Error('Programme ID does not exist in Programmes table');
      }
    }
  }
},

  enrolled_date: { 
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: { msg: 'Enrolled date must be a valid date' }
    }
  },

  graduation_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Graduation year cannot be empty' },
      min: { args: [1990], msg: 'Graduation year cannot be before 1990' },
      max: { args: [2100], msg: 'Graduation year cannot be after 2100' }
    }
  },

  active_student: { 
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

}, {
  tableName: 'students',
  timestamps: false
});

//Export
export default Student;

// Checks against programme_id in Programme model
Student.belongsTo(Programme, {
  foreignKey: 'programme_id',
  targetKey: 'programme_id',
  onUpdate: 'CASCADE',
  onDelete: 'RESTRICT'
});