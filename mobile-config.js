// This section sets up some basic app metadata, the entire section is optional.
App.info({
  id: 'com.myshowroom',
  name: 'myshowroom',
  description: 'helps to scale showrooms business',
  author: 'rizwan92',
  email: 'chouhan.rizwan@gmail.com',
  website: 'github.com/rizwan92'
});
  

  
// Set PhoneGap/Cordova preferences.
// App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
  

  
// Add custom tags for a particular PhoneGap/Cordova plugin to the end of the
// generated config.xml. 'Universal Links' is shown as an example here.
App.appendToConfig(`
    <universal-links>
      <host name="192.168.43.165:3000" />
    </universal-links>
  `);