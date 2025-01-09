import { Model, DataTypes } from '@sequelize/core';
import sequelize from '../config/database';
import CustomerDetails from './CustomerDetails';
import WebAgent from './WebAgent';

class CustomerAdditionalDetails extends Model {
  declare category_id: string;
  declare theme_id: string;
  declare uiux_id: string;
  declare cust_id: string;
  declare cust_working_days: string | null;
  declare cust_working_hrs: string | null;
  declare instagram_flag: string;
  declare whatsapp_flag: string;
  declare facebook_flag: string;
  declare chatbot_flag: string;
  declare youtube_flag: string;
  declare google_analytics: string;
  declare google_map_latitude: string;
  declare google_map_longitude: string;
  declare arg1: string;
  declare web_agent_id: number;
}

CustomerAdditionalDetails.init(
  {
    cust_id: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
      references: {
        model: CustomerDetails,
        key: 'cust_id'
      }
    },
    category_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    theme_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    uiux_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cust_working_days: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cust_working_hrs: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    instagram_flag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'N'
    },
    whatsapp_flag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'N'
    },
    facebook_flag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'N'
    },
    chatbot_flag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'N'
    },
    youtube_flag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'N'
    },
    google_analytics: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    google_map_latitude: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    google_map_longitude: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    arg1: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: 'N'
    },
    web_agent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: WebAgent,
        key: 'web_agent_id'
      }
    }
  },
  {
    sequelize,
    tableName: 't_customer_additional_details',
    schema: 'vo_dashboard',
    timestamps: false
  }
);

// Define associations
CustomerAdditionalDetails.belongsTo(CustomerDetails, {
  foreignKey: 'cust_id'
});

CustomerAdditionalDetails.belongsTo(WebAgent, {
  foreignKey: 'web_agent_id'
});

export default CustomerAdditionalDetails; 
