import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
export  const ShowroomApi = new Mongo.Collection('showrooms');

Meteor.methods({
  'showroom.insert'(showroom) {  
    return  ShowroomApi.insert({
      showroomTitle:showroom.showroomTitle,
      showroomName:showroom.showroomName,
      showroomEmail:showroom.showroomEmail,
      showroomPassword:showroom.showroomPassword,
      showroomType:showroom.showroomType,
      showroomAddress:showroom.showroomAddress,
      showroomGST:showroom.showroomGST,
      showroomState:showroom.showroomState,
      showroomCity:showroom.showroomCity,
      showroomContact:showroom.showroomContact,
      status:1,
      createdAt: new Date(),
    });
  },
  'showroom.login'(showroomEmail,showroomPassword) {  
    const showroom = ShowroomApi.findOne({showroomEmail}) 
    if (showroom) {
      if(showroom.showroomPassword === showroomPassword){
        showroom.showroomId = showroom._id
        delete showroom.showroomPassword
        return {result:showroom}
      }else{
        throw new Meteor.Error(500,'Invalid Credentials');  
      }
    }else{
      throw new Meteor.Error(500,'User Does not exist'); 
    }
  },
  'showroom.byemail'(showroomEmail) {  
    return  ShowroomApi.find({showroomEmail}).fetch()
  },
})

if (Meteor.isServer) {
  // CustomerApi._ensureIndex({
  //   'customerName': 'text'
  // });
  Meteor.publish('allshowroom', function userPublication() {
    return ShowroomApi.find({})
  });
}
