
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const AuditLog = sequelize.define('AuditLog', {
  action_type: { 
    type: DataTypes.ENUM('INSERT','UPDATE','DELETE','OVERRIDE'), 
    allowNull: false 
  },
  action_details: { type: DataTypes.TEXT },
  table_name: { type: DataTypes.STRING(50), allowNull: false },
  record_id: { type: DataTypes.INTEGER, allowNull: false },
  changed_by: { type: DataTypes.INTEGER, allowNull: false },
  old_value: { type: DataTypes.TEXT },
  new_value: { type: DataTypes.TEXT },
  changed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'audit_log',
  timestamps: false,
});

export default AuditLog;