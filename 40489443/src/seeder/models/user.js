
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import bcrypt from 'bcrypt';

// Define the schema
const User = sequelize.define('User', {
username: { 
  type: DataTypes.STRING(50), 
  allowNull: false, 
  unique: true,
  validate: {
    notEmpty: { msg: 'Username cannot be empty' },
    len: [10, 50]
  },
  set(value) {
    if (typeof value === 'string') {
      this.setDataValue('username', value.trim().toLowerCase());
    }
  }
},
// Hashed Password for BCrypt
password_hash: { 
  type: DataTypes.STRING(255), 
  allowNull: false,
  validate: {
    notEmpty: { msg: 'Password cannot be empty' }
  }
},
role: { 
  type: DataTypes.ENUM('academic_admin','institutional_admin'), 
  allowNull: false,
  validate: {
    notEmpty: { msg: 'Role cannot be empty' }
  }
},
first_name: { 
  type: DataTypes.STRING(150), 
  allowNull: false,
  validate: {
    notEmpty: { msg: 'First name cannot be empty' }
  },
  set(value) {
    if (typeof value === 'string') {
      this.setDataValue('first_name', value.trim().toLowerCase());
    }
  }
},
last_name: { 
  type: DataTypes.STRING(150), 
  allowNull: false,
  validate: {
    notEmpty: { msg: 'Last name cannot be empty' }
  },
  set(value) {
    if (typeof value === 'string') {
      this.setDataValue('last_name', value.trim().toLowerCase());
    }
  }
},
email: {
  type: DataTypes.STRING(160),
  allowNull: false,
  unique: true,
  set(value) {
    this.setDataValue('email', value.toLowerCase().trim());
  },
  validate: {
    notEmpty: { msg: 'Email cannot be empty' },
    len: [5, 160],
    isEmail: true,
    is: {
      args: /^[^\s@]+@hedemo\.co\.uk$/,
      msg: 'Email must be a valid @hedemo.co.uk address'
    }
  }
},
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
  date_created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'users',
  timestamps: false, 
});

//Set Password (creates bcrypt and length validation)
User.prototype.setPassword = async function (plainPassword) {

  if (!plainPassword || plainPassword.trim().length < 10) {
    throw new Error('Password must be at least 10 characters long');
  }
  this.password_hash = await bcrypt.hash(plainPassword, 10);
};

//Validate Password
User.prototype.validatePassword = async function (attempt) {
  return await bcrypt.compare(attempt, this.password_hash);
};

//Export
export default User;