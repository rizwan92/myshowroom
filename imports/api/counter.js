import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export  const CounterApi = new Mongo.Collection('counter');

Meteor.methods({
  'counter.plus'(showroomId) {
    let counter = CounterApi.findOne({showroomId}); 
    if (counter) {
      CounterApi.update({showroomId}, {$inc: {counter: 1}});
      counter.counter = counter.counter +1
      return counter
    }else{
      throw 'no id available'
    }
  },
  'counter.remove'(counterId) {
    check(counterId, String);
    CounterApi.remove(counterId);
  },
  'counter.get'(showroomId) {
    let count = CounterApi.findOne({showroomId})
    if (count === undefined) {
      CounterApi.insert({
        showroomId,
        counter:1,
        year:new Date().getFullYear()
      });
      return {showroomId,counter:1, year:new Date().getFullYear()};
    }else{
      if (count.year !== new Date().getFullYear() ) {
        CounterApi.insert({
          showroomId,
          counter:1,
          year:new Date().getFullYear()
        });
        return {showroomId,counter:1, year:new Date().getFullYear()}
      }else {
        return count;
      }
    }
  }
});
if (Meteor.isServer) {
  // CounterApi._ensureIndex({
  //   'counterName': 'text'
  // });
  // Meteor.publish('counter', function userPublication(userid) {
  //   return CounterApi.find({_id:userid});
  // });
  // Meteor.publish('allcounter', function userPublication() {
  //   return CounterApi.find({},{sort: {createdAt: -1},limit:20})
  // });
  // Meteor.publish('thisMonthcounter', function userPublication() {
  //   var startOfMonth = moment().startOf ('month').toDate ();
  //   return CounterApi.find({ createdAt: {$gte: startOfMonth}},{sort: {createdAt: -1}})      
  // });
  Meteor.publish('allcounter', function() {    
    return CounterApi.find({});
  });
}
