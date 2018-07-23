import { Meteor } from 'meteor/meteor';
import '../imports/api/customer';
import '../imports/api/counter';
import '../imports/api/jobsheet';
// import Sender from 'aws-sms-send';

// var config = {
//   AWS: {
//     accessKeyId: 'AKIAJ4LFYVKVKPB7CLUQ',
//     secretAccessKey: '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',
//     region: 'us-east-1',
//   },
//   topicArn: 'arn:aws:sns:us-east-1:515047389730:myshowroom-sms',
// };
// var sender = new Sender(config);

// /* Create subscribe */
// sender.createSubscribe('+918770564800')
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err)
//   });

// /* Send topic sms */
// sender.sendSms('Sms body topic', 'Topic sms', true)
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err)
//   });
Meteor.startup(() => {  
  // code to run on server at startup
});
