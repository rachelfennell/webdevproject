
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

// Define the schema
const Student = sequelize.define('Student', {
  student_number: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  first_name: { type: DataTypes.STRING(150), allowNull: false },
  last_name: { type: DataTypes.STRING(150), allowNull: false },
  dob: { type: DataTypes.DATEONLY, allowNull: false },
  programme_id: { type: DataTypes.INTEGER, allowNull: false },
  enrolled_date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  graduation_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 2000, max: 2100 }
  },
  active_student: { type: DataTypes.BOOLEAN, defaultValue: true },
  created_by: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'students',
  timestamps: false,
});

//Export
export default Student;