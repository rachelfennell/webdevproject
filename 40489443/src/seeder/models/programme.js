
import { DataTypes } from 'sequelize';
import sequelize from '../../web/config/db.js';

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
  programme_code: {
    type: DataTypes.STRING(8),
    allowNull: false,
    unique: true,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('programme_code', value.trim().toUpperCase());
      }
    },
    validate: {
      notEmpty: { msg: 'Programme code cannot be empty' },
      is: {
        args: /^HE\d{6}$/,
        msg: 'Programme code must be in format HE000000'
      }
    }
  },
  degree_type: {
    type: DataTypes.ENUM('BSc', 'BA', 'LLB', 'BEng'),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Degree type cannot be empty' }
    }
  },
  school: {
    type: DataTypes.ENUM('EEECS', 'Law', 'Arts'),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'School cannot be empty' }
    }
  },
  y2_weight: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    defaultValue: 0.30,
    validate: {
      min: { args: [0.0], msg: 'Year 2 weight cannot be less than 0' },
      max: { args: [1.0], msg: 'Year 2 weight cannot be greater than 1' }
    }
  },
  y3_weight: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    defaultValue: 0.70,
    validate: {
      min: { args: [0.0], msg: 'Year 3 weight cannot be less than 0' },
      max: { args: [1.0], msg: 'Year 3 weight cannot be greater than 1' },
      weightsSum(value) {
        const y2 = parseFloat(this.y2_weight || 0);
        const y3 = parseFloat(value);
        if (Math.abs(y2 + y3 - 1.0) > 0.001) {
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
      min: { args: [0], msg: 'Resit cap cannot be less than 0' },
      max: { args: [100], msg: 'Resit cap cannot be more than 100' }
    }
  },
  pass_mark: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: 40,
  validate: {
    min: { args: [0], msg: 'Pass mark cannot be less than 0' },
    max: { args: [100], msg: 'Pass mark cannot be more than 100' }
  }
},
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  date_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  tableName: 'programmes',
  timestamps: false
});

export default Programme;