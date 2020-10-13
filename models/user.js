'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.user, {
        as: "follower",
        through: "follow"
      })
      user.hasMany(models.product);
      user.hasMany(models.order);
    }
  };
  user.init({
    email: { 
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    nickname: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    profile_image: DataTypes.STRING,
    live_status: { 
      type:DataTypes.BOOLEAN,
      defaultValue: 0
    },
    is_seller: { 
      type:DataTypes.BOOLEAN,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'user',
  });

  user.addHook('afterValidate', (data, options) => {
    if (data.password) {
      data.password = crypto.createHmac('sha256', '4bproject')
        .update(data.password)
        .digest("base64")
    }
  })

  /* select 쿼리를 날릴 때, where 조건문에 있는 password를 자동으로 hash해주는 hooks를 추가했습니다. */
  user.addHook('beforeFind', (data, options) => {
    console.log(data.where)
    if (data.where.password) {
      data.where.password = crypto.createHmac('sha256', '4bproject')
        .update(data.where.password)
        .digest("base64")
    }
  })

  return user;
};