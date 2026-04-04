
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Classification = sequelize.define('Classification', {
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  classified_by: { type: DataTypes.INTEGER, allowNull: false },
  y2_average: { type: DataTypes.DECIMAL(5,2) },
  y3_average: { type: DataTypes.DECIMAL(5,2) },
  final_average: { 
    type: DataTypes.DECIMAL(5,2), 
    validate: { min: 0, max: 100 } 
  },
  proposed_outcome: { type: DataTypes.STRING(50) },
  final_outcome: { type: DataTypes.STRING(50) },
  is_overridden: { type: DataTypes.BOOLEAN, defaultValue: false },
  rationale: { type: DataTypes.TEXT },
  classified_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'classifications',
  timestamps: false,
});

export default Classification;