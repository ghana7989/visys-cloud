import { Model, DataTypes } from '@sequelize/core';
import sequelize from '../config/database';

class WebAgent extends Model {
  declare web_agent_id: number;
  declare web_agent_name: string;
  declare user_id: string;
  declare password: string;
  declare location: string;
  declare created_date: Date;
  declare active_flag: string;
  declare lock_flag: string;
  declare manager: string;
  declare arg1: string;
  declare arg2: string;
  declare arg3: string;
  declare arg4: string;
  declare arg5: string;

  static async login(userId: string, password: string): Promise<WebAgent | null> {
    try {
      const user = await this.findOne({
        where: {
          user_id: userId,
          password: password,
          // active_flag: 'Y',  // Only allow active users
          // lock_flag: 'N'     // Only allow unlocked users
        }
      });
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}

WebAgent.init(
  {
    web_agent_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'web_agent_id'
    },
    web_agent_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    active_flag: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'N'
    },
    lock_flag: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Y'
    },
    manager: {
      type: DataTypes.STRING,
      allowNull: true
    },
    arg1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    arg2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    arg3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    arg4: {
      type: DataTypes.STRING,
      allowNull: true
    },
    arg5: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 't_visys_web_agents',
    schema: 'vo_admin_portal',
    timestamps: false
  }
);

export default WebAgent; 
