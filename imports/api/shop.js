import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
export  const ShopApi = new Mongo.Collection('shops');

Meteor.methods({
  'shop.insert'(shop) {
    return  ShopApi.insert({
      shopName:shop.shopName,
      shopType:shop.shopType,
      shopGST:shop.shopGST,
      shopState:shop.shopState,
      shopCity:shop.shopCity,
      shopContact:shop.shopContact,
      shopAddress:shop.shopAddress,
      shopEmail:shop.shopEmail,
      shopPassword:shop.shopPassword,
      status:1,
      createdAt: new Date(),
    });
  },
  'shop.login'(shopEmail,shopPassword) {
    const shop = ShopApi.findOne({shopEmail})
    if (shop) {
      if(shop.shopPassword === shopPassword){
        shop.shopId = shop._id
        delete shop.shopPassword
        return {result:shop}
      }else{
        throw new Meteor.Error(500,'Invalid Credentials');
      }
    }else{
      throw new Meteor.Error(500,'User Does not exist');
    }
  },
  'shop.byemail'(shopEmail) {
    return  ShopApi.find({shopEmail}).fetch()
  },
})

if (Meteor.isServer) {
  // CustomerApi._ensureIndex({
  //   'customerName': 'text'
  // });
  Meteor.publish('allshop', function userPublication() {
    return ShopApi.find({})
  });
}
