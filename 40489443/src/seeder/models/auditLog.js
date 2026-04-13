
import { DataTypes } from 'sequelize';
import sequelize from '../../web/config/db.js';

const AuditLog = sequelize.define('AuditLog', {
  action_type: {
    type: DataTypes.ENUM('INSERT', 'UPDATE', 'DELETE', 'OVERRIDE'),
    allowNull: false,
  },
  action_details: {
    type: DataTypes.TEXT,
    allowNull: true,
    set(value) {
      if (value) this.setDataValue('action_details', value.trim());
    }
  },
  table_name: {
    type: DataTypes.ENUM(
      'users', 'programmes', 'user_programmes', 'students',
      'modules', 'programme_modules', 'results',
      'classifications', 'audit_log'
    ),
    allowNull: false,
  },
  record_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Record ID must be an integer' }
    }
  },
  changed_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Changed by must be a valid user ID' }
    }
  },
  old_value: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  new_value: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  changed_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    validate: {
      isBeforeNow(value) {
        if (value && new Date(value) > new Date()) {
          throw new Error('Changed at date cannot be in the future');
        }
      }
    }
  }
}, {
  tableName: 'audit_log',
  timestamps: false,
  indexes: [{ fields: ['table_name'] }, { fields: ['record_id'] }, { fields: ['changed_by'] }]
});

export default AuditLog;