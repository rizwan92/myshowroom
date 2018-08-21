import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import './jobsheet.css'
import PrintJobSheet from './PrintJobSheet';
import { withRouter } from 'react-router-dom';
import  JobSheetTable  from './JobSheetTable';
import ReactDOMServer from 'react-dom/server';
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
    mad:false,
    light:false,
    isbattery:false,
    toolkit:false,
    rml:false,
    rmr:false,
    dent:false,
    scratch:false,
    cc:false,
    accessories:false,
    fuellevel:0,
    anya:'',
    oil:false,
    serviceNumber:0,
    freeJobsheetNumber:'',
    paidJobsheetNumber:'',
    typeofoil:'4T',
    customer:null,
  }

  onChange =(e)=> this.setState({[e.target.id]:e.target.value})

  print(){
    var pri = document.getElementById('myiframe').contentWindow;
    pri.document.open();
    let { jobSheetId,customerId,type}  =  this.props.match.params 
    let  {oilLabel,airFilter,taped,spark,corborator,clutch,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,registrationNumber,hasRun,mad,light,isbattery,toolkit,rml,rmr,dent,scratch,cc,accessories,fuellevel,anya,serviceNumber,oil,typeofoil} = this.state
    const jobsheetDetail = {oilLabel,airFilter,taped,spark,corborator,clutch,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,registrationNumber,hasRun,mad,light,isbattery,toolkit,rml,rmr,dent,scratch,cc,accessories,fuellevel,anya,serviceNumber,oil,typeofoil,jobSheetId,customerId,type}
    let customerDetail = this.state.customer
    pri.document.write(ReactDOMServer.renderToString(<PrintJobSheet  credentials={this.props.credentials} customerDetail={customerDetail} jobsheetDetail={jobsheetDetail}/>));
    pri.document.close();
    pri.focus();
    pri.print(); 
  }

  createJobSheet = () => {
    let { jobSheetId,customerId,type}  =  this.props.match.params
    let  {oilLabel,airFilter,taped,spark,corborator,clutch,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,registrationNumber,hasRun,mad,light,isbattery,toolkit,rml,rmr,dent,scratch,cc,accessories,fuellevel,anya,serviceNumber,oil,typeofoil} = this.state
    const jobsheetDetail = {oilLabel,airFilter,taped,spark,corborator,clutch,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,registrationNumber,hasRun,mad,light,isbattery,toolkit,rml,rmr,dent,scratch,cc,accessories,fuellevel,anya,serviceNumber,oil,typeofoil,jobSheetId,customerId,type}
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
      let freeJobsheetNumber = 0;
      let paidJobsheetNumber = 0;
      res[0].jobsheets.reduce((sum,job)=>{
        if (job.type === 'free') freeJobsheetNumber = freeJobsheetNumber + 1;
        else paidJobsheetNumber = paidJobsheetNumber + 1;
      },0)
      if (this.props.match.params.type === 'free')
        this.setState({customer:res[0],serviceNumber:freeJobsheetNumber+1,freeJobsheetNumber,paidJobsheetNumber})
      else 
        this.setState({customer:res[0],serviceNumber:paidJobsheetNumber+1,freeJobsheetNumber,paidJobsheetNumber})
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
    let jobsheets = []
    if (this.state.customer !== null) {
      let thisCustomer = JSON.parse(JSON.stringify(this.state.customer))
      delete thisCustomer.jobsheets; 
      let thisCustomerJobsheets = this.state.customer.jobsheets
      jobsheets = thisCustomerJobsheets.map((job)=>{
        job['customer'] = thisCustomer
        return job
      })             
    } 
    let { oilLabel,airFilter,taped,spark,corborator,clutch,breake,
      diveChain,battery,fuel,electrical,cabel,nutBolt,mad,light,isbattery,toolkit,rml,rmr,dent,scratch,cc,accessories,fuellevel,oil,typeofoil} = this.state   
    return (
      <div style={{backgroundColor:'#fff',minHeight:'93vh'}} >
        <i
          className="material-icons"
          style={{ cursor: 'pointer', fontSize: 50,margin:10}}
          onClick={() => this.props.history.goBack()}
        >
          keyboard_backspace
        </i>

        <h4 style={{textAlign:'center',margin:0}}>{this.state.customer.customerName}</h4>
        <div className='mysubform'> 
          <div  style={{textAlign:'left',flex:1,paddingLeft:10}}>
            <div> Number:- {this.state.customer.customerNumber}</div>
            <div> Free Servicing:- {this.state.freeJobsheetNumber}</div>
            <div> Paid Servicing:- {this.state.paidJobsheetNumber}</div>
            <div> Address:- {this.state.customer.customerAddress}</div>
            <a style={{cursor:'pointer'}} onClick={()=>this.props.history.push(`/customeredit/${this.state.customer._id}`)}> Edit ?</a>
          </div>
          <div  style={{textAlign:'right',flex:1,paddingRight:10}}>
            <div> Model Number:-  {this.state.customer.vehicleModel}</div>
            <div> Color:-  {this.state.customer.vehicleColor}</div>
            <div> Key Number:-  {this.state.customer.vehicleKeyNumber}</div>
            <div> Engine Number:-  {this.state.customer.vehicleEngineNumber}</div>
            <div> Chessis Number:-  {this.state.customer.vehicleChassisNumber}</div>
          </div>
        </div>

        <hr />
        <JobSheetTable jobsheets={jobsheets} delete={false} />
        <hr />
        <form className="myform">
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
          <div >
            <div className='mysubform'> 
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="text" id="anya" 
                  onChange={(e)=> this.onChange(e)} value={this.state.anya}/>
                <label className="mdl-textfield__label" htmlFor="anya"> Other noticeable  things about bike</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="number" id="hasRun" 
                  onChange={(e)=> this.onChange(e)}  value={this.state.hasRun} />
                <label className="mdl-textfield__label" htmlFor="hasRun">Bike has run  in km ?</label>
              </div>
            </div>
          </div>
        
          <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
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

            <div style={{width:300}} >
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="mad">
                <input id="mad" type="checkbox" className="mdl-checkbox__input" 
                  checked={mad} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">मद</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="light">
                <input id="light" type="checkbox" className="mdl-checkbox__input"  
                  checked={light} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">लाइटे</span>
              </label>            
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="isbattery">
                <input id="isbattery" type="checkbox" className="mdl-checkbox__input" 
                  checked={isbattery} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">बैटरी</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="toolkit">
                <input id="toolkit" type="checkbox" className="mdl-checkbox__input" 
                  checked={toolkit} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">टूल कीट</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="rml">
                <input id="rml" type="checkbox" className="mdl-checkbox__input" 
                  checked={rml} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">रियर व्यू मिरर (L)</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="rmr">
                <input id="rmr" type="checkbox" className="mdl-checkbox__input" 
                  checked={rmr} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">रियर व्यू मिरर (R)</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="dent">
                <input id="dent" type="checkbox" className="mdl-checkbox__input" 
                  checked={dent} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">डेंट (D)</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="scratch">
                <input id="scratch" type="checkbox" className="mdl-checkbox__input" 
                  checked={scratch} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">निशान (S):</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="cc">
                <input id="cc" type="checkbox" className="mdl-checkbox__input" 
                  checked={cc} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">चोक कैंप</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="accessories">
                <input id="accessories" type="checkbox" className="mdl-checkbox__input" 
                  checked={accessories} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">एसेसरीज़</span>
              </label>
              <label style={{margin:5}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="oil">
                <input id="oil" type="checkbox" className="mdl-checkbox__input" 
                  checked={oil} onChange={(e)=>this.onCheacked(e)}/>
                <span  className="mdl-checkbox__label">तेल बदलाव </span>
              </label>
              <select className="mdl-textfield__input" style={{margin:5}} value={typeofoil} onChange={(e)=>this.setState({typeofoil:e.target.value})}>
                <option> तेल की किस्म</option>
                <option value="4T">4T</option>
                <option value="10w30">10w30</option>
                <option value="10w40">10w40</option>
                <option value="15w50">15w50</option>
              </select>
              <select className="mdl-textfield__input" style={{margin:5}} value={fuellevel} onChange={(e)=>this.setState({fuellevel:e.target.value})}>
                <option>ईंधन स्तर</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>

          </div>

        </form>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button  onClick={()=>this.print()}
            style={{margin:10}}
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Print
          </button>
          <button  onClick={()=>this.createJobSheet()}
            style={{margin:10}}
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
  