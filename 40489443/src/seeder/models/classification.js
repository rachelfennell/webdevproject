
import { DataTypes } from 'sequelize';
import sequelize from '../../web/config/db.js';

const Classification = sequelize.define('Classification', {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Student ID must be an integer' }
    }
  },
  classified_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Classified by must be an integer' }
    }
  },
    classified_at: {
    type: DataTypes.DATE,
defaultValue: DataTypes.NOW,
     allowNull: true,
    validate: {
      isBeforeNow(value) {
        if (value && new Date(value) > new Date()) {
          throw new Error('Classification date cannot be in the future');
        }
      }
    }
  },
  y2_average: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
validate: {
  isDecimal: { msg: 'Year 2 average must be a valid number between 0 and 100' },
  min: 0,
  max: 100
}
  },
  y3_average: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
validate: {
  isDecimal: { msg: 'Y3 average must be a valid number between 0 and 100' },
  min: 0,
  max: 100
}
  },
  final_average: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
validate: {
  isDecimal: { msg: 'Final average must be a valid number between 0 and 100' },
  min: 0,
  max: 100
}
  },
proposed_outcome: {
  type: DataTypes.ENUM(
    'First Class Honours',
    'Upper Second Class (2:1)',
    'Lower Second Class (2:2)',
    'Third Class Honours',
    'Fail',
    'Not Eligible'
  ),
  allowNull: true
},
final_outcome: {
  type: DataTypes.ENUM(
    'First Class Honours',
    'Upper Second Class (2:1)',
    'Lower Second Class (2:2)',
    'Third Class Honours',
    'Fail',
    'Not Eligible'
  ),
  allowNull: true
},
  is_overridden: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  rationale: {
    type: DataTypes.TEXT,
    allowNull: true,
    set(value) {
      if (value) this.setDataValue('rationale', value.trim());
    }
  },
  overridden_at: {
    type: DataTypes.DATE,

     allowNull: true,
    validate: {
      isBeforeNow(value) {
        if (value && new Date(value) > new Date()) {
          throw new Error('Classification date cannot be in the future');
        }
      }
    }
  },
overridden_by: {
  type: DataTypes.INTEGER,
  allowNull: true,
  validate: {
    isInt: { msg: 'Classified by must be an integer' }
  }
},
    is_flagged: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  flag_reason: {
    type: DataTypes.TEXT,
    allowNull: true,
    set(value) {
      if (value) this.setDataValue('flag_reason', value.trim());
    }
  },
  flagged_at: {
    type: DataTypes.DATE,
  
     allowNull: true,
    validate: {
      isBeforeNow(value) {
        if (value && new Date(value) > new Date()) {
          throw new Error('Flagged date cannot be in the future');
        }
      }
    }
  },
  flagged_by: {
  type: DataTypes.INTEGER,
 allowNull: true,
  validate: {
    isInt: { msg: 'Flagged by must be an integer' }
  }
},
}, {
  tableName: 'classifications',
  timestamps: false,
  indexes: [ { unique: true, fields: ['student_id'] }]
});

export default Classification;