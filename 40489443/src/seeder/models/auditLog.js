import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

//Define the Audit Log Schema
const AuditLog = sequelize.define('AuditLog', {
  action_type: { 
    type: DataTypes.ENUM('INSERT','UPDATE','DELETE','OVERRIDE'), 
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Action type cannot be empty' },
      isIn: {
        args: [['INSERT','UPDATE','DELETE','OVERRIDE']],
        msg: 'Action type must be one of INSERT, UPDATE, DELETE, OVERRIDE'
      }
    }
  },

  action_details: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    set(value) {
      if (value) this.setDataValue('action_details', value.trim().toLowerCase());
    },
    validate: {
      notEmpty: { msg: 'Action details cannot be empty' }
    }
  },

table_name: { 
  type: DataTypes.ENUM(
    'audit_log', 
    'modules', 
    'programmes', 
    'programme_modules', 
    'results', 
    'students', 
    'users', 
    'user_programmes', 
    'classifications'
  ), 
  allowNull: false,
  validate: {
    notEmpty: { msg: 'Table name cannot be empty' }
  }
},

  record_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Record ID cannot be empty' },
      isInt: { msg: 'Record ID must be an integer' }
    }
  },

  changed_by: { 
    type: DataTypes.STRING(50),
    allowNull: false,
    set(value) {
      if (value) this.setDataValue('changed_by', value.trim().toLowerCase());
    },
    validate: {
      notEmpty: { msg: 'Changed by cannot be empty. Must be a valid username' },
      len: { args: [10, 50], msg: 'Changed by must be a valid username between 10 and 50 characters' }
    }
  },

  old_value: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    set(value) {
      if (value) this.setDataValue('old_value', value.trim().toLowerCase());
    },
    validate: {
      notEmpty: { msg: 'Old value cannot be empty' }
    }
  },

  new_value: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    set(value) {
      if (value) this.setDataValue('new_value', value.trim().toLowerCase());
    },
    validate: {
      notEmpty: { msg: 'New value cannot be empty. If deleted, please enter "Deleted"'}
    }
  },

  changed_at: { 
    type: DataTypes.DATE, 
    allowNull: false,
    defaultValue: DataTypes.NOW,
    validate: {
      notEmpty: { msg: 'Changed at date cannot be empty' },
      isBeforeToday(value) {
        if (value && new Date(value) > new Date()) {
          throw new Error('Changed at date cannot be in the future');
        }
      }
    }
  },

}, {
  tableName: 'audit_log',
  timestamps: false,
});

//Export model
export default AuditLog;