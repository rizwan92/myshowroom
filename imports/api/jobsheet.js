import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment'
import { CounterApi } from './counter';
import  {ReactiveAggregate}  from 'meteor/jcbernack:reactive-aggregate';
export  const JobSheetApi = new Mongo.Collection('jobsheets');

Meteor.methods({
  'jobsheet.insert'(showroomId,jobSheet) {  
    let count = CounterApi.findOne({showroomId})  
    if (count !== undefined) {
      if (parseInt(jobSheet.jobSheetId) === parseInt(count.counter) ) {
        CounterApi.update({showroomId}, {$inc: {counter: 1}});
        return  JobSheetApi.insert({
          showroomId:showroomId,
          oilLabel:jobSheet.oilLabel,
          airFilter:jobSheet.airFilter,
          taped:jobSheet.taped,
          spark:jobSheet.spark,
          corborator:jobSheet.corborator,
          clutch:jobSheet.clutch,
          breake:jobSheet.breake,
          diveChain:jobSheet.diveChain,
          battery:jobSheet.battery,
          fuel:jobSheet.fuel,
          electrical:jobSheet.electrical,
          cabel:jobSheet.cabel,
          nutBolt:jobSheet.nutBolt,
          customerId:jobSheet.customerId,
          jobSheetId:jobSheet.jobSheetId,
          type:jobSheet.type,
          status:1,
          createdAt: new Date(),
        })  
      }else {
        throw new Meteor.Error(500,'this jobsheet ID already exist');  
      }
    }
  },
  'jobsheet.get'() {  
    let jobsheet = JobSheetApi.aggregate([
      {
        $lookup:
          {
            from: 'customers',
            localField: 'customerId',
            foreignField: '_id',
            as: 'customers'
          }
      }
    ]);    
    return jobsheet
  },
});
if (Meteor.isServer) {
  // JobSheetApi._ensureIndex({
  //   'customerName': 'text'
  // });
  Meteor.publish('alljobsheet', function userPublication() {
    return JobSheetApi.find({}  )
  });
  Meteor.publish('thisMonthJobSheet', function userPublication(showroomId) {
    var startOfMonth = moment().startOf ('month').toDate ();
    const pipeline = [
      { $match : { showroomId : showroomId,createdAt:{$gte: startOfMonth } } },
      {
        $lookup:
            {
              from: 'customers',
              localField: 'customerId',
              foreignField: '_id',
              as: 'customers'
            }
      }
    ];
    let something =  ReactiveAggregate(this, JobSheetApi, pipeline,{})
    return something  
    
  });
}
