
import { DataTypes } from 'sequelize';
import sequelize from '../../web/config/db.js';
import bcrypt from 'bcrypt';

//Define Schema
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('username', value.trim().toLowerCase());
      }
    },
    validate: {
      notEmpty: { msg: 'Username cannot be empty' },
      len: { args: [3, 50], msg: 'Username must be between 3 and 50 characters' }
    }
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Password cannot be empty' }
    }
  },
  role: {
    type: DataTypes.ENUM('academic_admin', 'institutional_admin'),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Role cannot be empty' }
    }
  },
  first_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('first_name', value.trim());
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
        this.setDataValue('last_name', value.trim());
      }
    },
    validate: {
      notEmpty: { msg: 'Last name cannot be empty' }
    }
  },
  email: {
    type: DataTypes.STRING(160),
    allowNull: false,
    unique: true,
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('email', value.trim().toLowerCase());
      }
    },
    validate: {
      notEmpty: { msg: 'Email cannot be empty' },
      isEmail: { msg: 'Email must be a valid email address' },
      is: {
        args: /^[^\s@]+@hedemo\.co\.uk$/,
        msg: 'Email must be a valid @hedemo.co.uk address'
      }
    }
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  date_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: false
});

User.prototype.setPassword = async function (plainPassword) {
  if (!plainPassword || plainPassword.trim().length < 10) {
    throw new Error('Password must be at least 10 characters long');
  }
  this.password_hash = await bcrypt.hash(plainPassword, 10);
};

User.prototype.validatePassword = async function (attempt) {
  return await bcrypt.compare(attempt, this.password_hash);
};

//Export
export default User;