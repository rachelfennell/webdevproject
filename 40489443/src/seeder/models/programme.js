
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Programme = sequelize.define('Programme', {
  name: { type: DataTypes.STRING(400), allowNull: false, unique: true },
  degree_type: { type: DataTypes.ENUM('BSc','BA','LLB','BEng'), allowNull: false },
  school: { type: DataTypes.ENUM('EEECS','Law','Arts'), allowNull: false },
  programme_id: { type: DataTypes.INTEGER, allowNull: false },
  y2_weight: { type: DataTypes.DECIMAL(3,2), allowNull: false, defaultValue: 0.30 },
  y3_weight: { type: DataTypes.DECIMAL(3,2), allowNull: false, defaultValue: 0.70 },
  resit_cap: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 40 },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
  date_created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'programmes',
  timestamps: false,
});

export default Programme;