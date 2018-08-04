import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import './jobsheet.css'
import PrintJobSheet from './PrintJobSheet';
import ReactDOMServer from 'react-dom/server';
import { withRouter } from 'react-router-dom'
/*global  Bert:true */
/*jshint esversion: 6 */
/*global  componentHandler:true */
export class JobSheetForm extends Component {
   
  state ={
    oilLabel:false,
    airFilter:false,
    taped:false,
    spark:false,
    corborator:false,
    clutch:false,
    breake:false,
    diveChain:false,
    battery:false,
    fuel:false,
    electrical:false,
    cabel:false,
    nutBolt:false,
    createdAt:new Date(),
    registrationNumber:'',
    hasRun:'',
    customer:null,
  }

  onChange =(e)=> this.setState({[e.target.id]:e.target.value})

  print(){
    var pri = document.getElementById('myiframe').contentWindow;
    pri.document.open();
    let { jobSheetId,customerId,type}  =  this.props.match.params 
    let  {oilLabel,airFilter,taped,spark,corborator,clutch,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,registrationNumber,hasRun} = this.state
    const jobsheetDetail = {oilLabel,airFilter,taped,spark,corborator,clutch,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,registrationNumber,hasRun,jobSheetId,customerId,type}
    let customerDetail = this.state.customer
    pri.document.write(ReactDOMServer.renderToString(<PrintJobSheet customerDetail={customerDetail} jobsheetDetail={jobsheetDetail}/>));
    pri.document.close();
    pri.focus();
    pri.print(); 
  }

  createJobSheet = () => {
    let { jobSheetId,customerId,type}  =  this.props.match.params
    let  {oilLabel,airFilter,taped,spark,corborator,clutch,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,registrationNumber,hasRun} = this.state
    const jobsheetDetail = {oilLabel,airFilter,taped,spark,corborator,clutch,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,registrationNumber,hasRun,jobSheetId,customerId,type}
    Meteor.call('jobsheet.insert',this.props.credentials.showroomId,jobsheetDetail,(err,res)=>{
      if (err) {
        Bert.alert(err, 'danger', 'growl-top-right');
      }
      else {
        this.print()
        Bert.alert('Jobsheet Created', 'success', 'growl-top-right');
        this.props.history.push('/createjobsheet')
      }
    })
        
  }
  componentDidMount = () => {
    componentHandler.upgradeDom();    
    Meteor.call('customer.singleitem',this.props.match.params.customerId,(err,res)=>{
      if (err) {
        Bert.alert(err, 'danger', 'growl-top-right');
        return
      }
      this.setState({customer:res})
    })
  }
  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  
  render() {  
    if (this.state.customer === null) {
      return (
        <div>
          <div className="mdl-spinner mdl-js-spinner is-active myloader"></div>
        </div>
      )
    } 
    let { oilLabel,airFilter,taped,spark,corborator,clutch,breake,
      diveChain,battery,fuel,electrical,cabel,nutBolt} = this.state   
    return (
      <div >
        <i
          className="material-icons"
          style={{ cursor: 'pointer', fontSize: 50,margin:10 }}
          onClick={() => this.props.history.goBack()}
        >
          keyboard_backspace
        </i>

        <form className="myform">
        
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{width:300}} >
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="oilLabel">
                <input id="oilLabel" type="checkbox" className="mdl-checkbox__input" 
                  checked={oilLabel} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">इंजन तेल के स्तर की जांच </span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="airFilter">
                <input id="airFilter" type="checkbox" className="mdl-checkbox__input"  
                  checked={airFilter} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">एयर फ़िल्टर की सफाई </span>
              </label>            
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="taped">
                <input id="taped" type="checkbox" className="mdl-checkbox__input" 
                  checked={taped} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">टैपेड  क्लीयरेन्स जांच एवं गैप एडजस्ट करना</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="spark">
                <input id="spark" type="checkbox" className="mdl-checkbox__input" 
                  checked={spark} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">स्पार्क प्लग की सफाई एवं गैप एडजस्ट करना</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="corborator">
                <input id="corborator" type="checkbox" className="mdl-checkbox__input" 
                  checked={corborator} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">कार्बोरेटर टायनिंग</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="clutch">
                <input id="clutch" type="checkbox" className="mdl-checkbox__input" 
                  checked={clutch} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">क्लच निरीक्षण / एडजस्ट करना</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="breake">
                <input id="breake" type="checkbox" className="mdl-checkbox__input" 
                  checked={breake} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">ब्रेक घिसने का निरिक्षण /एडजस्ट करना</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="diveChain">
                <input id="diveChain" type="checkbox" className="mdl-checkbox__input" 
                  checked={diveChain} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">डाइव चैन की सफाई एवं एडजस्ट करना </span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="battery">
                <input id="battery" type="checkbox" className="mdl-checkbox__input" 
                  checked={battery} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">बैटरी एलेक्टोलाइट स्तर की जांच /उनकी पूर्ति</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="fuel">
                <input id="fuel" type="checkbox" className="mdl-checkbox__input" 
                  checked={fuel} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">फ्यूल स्टेवर की सफाई एवं सर्विस छोड़कर</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="electrical">
                <input id="electrical" type="checkbox" className="mdl-checkbox__input" 
                  checked={electrical} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">इलेक्ट्रिकल जांच </span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="cabel">
                <input id="cabel" type="checkbox" className="mdl-checkbox__input" 
                  checked={cabel} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">केबल की जांच </span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="nutBolt">
                <input id="nutBolt" type="checkbox" className="mdl-checkbox__input" 
                  checked={nutBolt} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">नट बोल्ट एवं बूड़नारो की जांच </span>
              </label>
            </div>
          </div>


          <div >
            <div className='mysubform'> 
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="text" id="registrationNumber" 
                  onChange={(e)=> this.onChange(e)} value={this.state.registrationNumber}/>
                <label className="mdl-textfield__label" htmlFor="registrationNumber"> Registration Number</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="number" id="hasRun" 
                  onChange={(e)=> this.onChange(e)}  value={this.state.hasRun} />
                <label className="mdl-textfield__label" htmlFor="hasRun">Bike has run  in km ?</label>
              </div>
            </div>
          </div>

        </form>

        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button  onClick={()=>this.print()}
            style={{width:200,margin:10}}
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Print
          </button>
          <button  onClick={()=>this.createJobSheet()}
            style={{width:200,margin:10}}
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                  Create Job Sheet
          </button>
        </div>
        
      </div>
    )
  }
  onCheacked=(e)=>{
    if (this.state[[e.target.id]]) {
      this.setState({[e.target.id]:false})  
    }else{
      this.setState({[e.target.id]:true})  
    }
  }
}

export default withRouter(JobSheetForm)
  