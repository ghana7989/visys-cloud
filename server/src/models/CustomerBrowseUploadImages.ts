import { Model, DataTypes } from '@sequelize/core';
import sequelize from '../config/database';
import CustomerDetails from './CustomerDetails';

class CustomerBrowseUploadImages extends Model {
  declare category_id: string;
  declare theme_id: string;
  declare uiux_id: string;
  declare cust_id: string;
  declare oss_theme_oss_url_1: string | null;
  declare oss_theme_oss_url_2: string | null;
  declare oss_theme_oss_url_3: string | null;
  declare oss_theme_oss_url_4: string | null;
  declare oss_theme_oss_url_5: string | null;
  declare oss_theme_oss_url_6: string | null;
  declare oss_theme_oss_url_7: string | null;
  declare oss_theme_oss_url_8: string | null;
  declare oss_theme_oss_url_9: string | null;
  declare oss_theme_oss_url_10: string | null;
  declare oss_uiux_oss_url_1: string | null;
  declare oss_uiux_oss_url_2: string | null;
  declare oss_uiux_oss_url_3: string | null;
  declare oss_uiux_oss_url_4: string | null;
  declare oss_uiux_oss_url_5: string | null;
  declare oss_uiux_oss_url_6: string | null;
  declare oss_uiux_oss_url_7: string | null;
  declare oss_uiux_oss_url_8: string | null;
  declare oss_uiux_oss_url_9: string | null;
  declare oss_uiux_oss_url_10: string | null;
  declare arg_oss_url_1: string | null;
  declare arg_oss_url_2: string | null;
  declare arg_oss_url_3: string | null;
  declare arg_oss_url_4: string | null;
  declare arg_oss_url_5: string | null;
  declare arg_oss_url_6: string | null;
  declare arg_oss_url_7: string | null;
  declare arg_oss_url_8: string | null;
  declare arg_oss_url_9: string | null;
  declare arg_oss_url_10: string | null;
}

CustomerBrowseUploadImages.init(
  {
    cust_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
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
    oss_theme_oss_url_1: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_theme_oss_url_2: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_theme_oss_url_3: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_theme_oss_url_4: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_theme_oss_url_5: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_theme_oss_url_6: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_theme_oss_url_7: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_theme_oss_url_8: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_theme_oss_url_9: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_theme_oss_url_10: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_uiux_oss_url_1: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_uiux_oss_url_2: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_uiux_oss_url_3: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_uiux_oss_url_4: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_uiux_oss_url_5: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_uiux_oss_url_6: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_uiux_oss_url_7: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_uiux_oss_url_8: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_uiux_oss_url_9: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oss_uiux_oss_url_10: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg_oss_url_1: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg_oss_url_2: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg_oss_url_3: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg_oss_url_4: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg_oss_url_5: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg_oss_url_6: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg_oss_url_7: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg_oss_url_8: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg_oss_url_9: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg_oss_url_10: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 't_customer_browse_upload_images',
    schema: 'vo_dashboard',
    timestamps: false
  }
);

CustomerBrowseUploadImages.belongsTo(CustomerDetails, {
  foreignKey: 'cust_id'
});

export default CustomerBrowseUploadImages; 
