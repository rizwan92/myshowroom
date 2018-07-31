import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {Meteor} from 'meteor/meteor'
/*global  Bert:true*/


export class CustomerRegistrationForm extends Component {
  constructor(props){
    super(props)  
  }
  state ={
    customerName:'',
    hpd:false,
    customerNumber:'',
    customerEmail:'',
    customerAddress:'',
    vehicleModel:'',
    vehicleColor:'',
    vehicleKeyNumber:'',
    vehicleEngineNumber:'',
    vehicleChassisNumber:'',
    vehicleSoldDealer:'',
  }
  /*jshint esversion: 6 */
  /*global  componentHandler:true */

  onChange =(e)=> this.setState({[e.target.id]:e.target.value})
  componentDidUpdate() {
    componentHandler.upgradeDom();
  }
  componentDidMount = () => {
    this.props.changeTitle('Create Customer')    
    componentHandler.upgradeDom();
    if (this.props.match.params.id) {
      Meteor.call('customer.singleitem',this.props.match.params.id,(err,res)=>{
        if (err) {
          Bert.alert(err, 'danger', 'growl-top-right');
          return
        }
        var divs = document.querySelectorAll('.mdl-textfield');  
        divs.forEach((div,i)=>{ 
          if (i === 0) {
            return
          }                
          let children  = div.children
          let placeholder = children[1].innerHTML 
          children[0].placeholder =placeholder
          children[1].style.display = 'none'
        })        
        this.setState({
          customerName:res.customerName,
          hpd:res.hpd,
          customerNumber:res.customerNumber,
          customerEmail:res.customerEmail,
          customerAddress:res.customerAddress,
          vehicleModel:res.vehicleModel,
          vehicleColor:res.vehicleColor,
          vehicleKeyNumber:res.vehicleKeyNumber,
          vehicleEngineNumber:res.vehicleEngineNumber,
          vehicleChassisNumber:res.vehicleChassisNumber,
          vehicleSoldDealer:res.vehicleSoldDealer,
        })
      })
    }    
  }
  
  
  render() {    
    const id = this.props.match.params.id
    return (
      <div>
        { id  === undefined ?   null 
          :
          <i className="material-icons" style={{fontSize:50}} onClick={()=> this.props.history.goBack()}>keyboard_backspace</i> 
        }
        <center>
          { id  === undefined ?  null : <h6 >Edit Customer</h6>}
          <form id="customerRegistrationForm" className="myform" onSubmit={id === undefined ? (e)=>this.onSubmit(e) : (e)=>this.onUpdate(e)}
            style={{padding:'0.9rem'}}>
            <h6 style={{textAlign:'center',color:'black'}}>Customer Detail</h6> 
            <div className='mysubform'> 
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="text" id="customerName" 
                  onChange={(e)=> this.onChange(e)} value={this.state.customerName}/>
                <label className="mdl-textfield__label" htmlFor="customerName"> Name</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="number" id="customerNumber" 
                  onChange={(e)=> this.onChange(e)}  value={this.state.customerNumber} />
                <label className="mdl-textfield__label" htmlFor="customerNumber">Mobile Number</label>
              </div>
            </div>

            <div className='mysubform'> 
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="email" id="customerEmail" 
                  onChange={(e)=> this.onChange(e)} value={this.state.customerEmail} />
                <label className="mdl-textfield__label" htmlFor="customerEmail">Email</label>
              </div>
  
              <label className="" htmlFor="hpd"
                style={{width:300}}>
                <span className="mdl-checkbox__label">हीरो  पासपोर्ट धारक ?</span>
                <input type="checkbox" id="hpd" className="mdl-checkbox__input mdl-checkbox" 
                  checked={this.state.hpd}  onChange={()=> this.setState({hpd:!this.state.hpd})}/>
              </label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <textarea className="mdl-textfield__input" type="text" rows= "2" 
                onChange={(e)=> this.onChange(e)} value={this.state.customerAddress}  id="customerAddress" ></textarea>
              <label className="mdl-textfield__label" htmlFor="customerAddress">Address</label>
            </div>
            <h6 style={{textAlign:'center',color:'black'}}>Vehicle Detail </h6> 
            <div className='mysubform'> 
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="text" id="vehicleModel" 
                  onChange={(e)=> this.onChange(e)} value={this.state.vehicleModel}/>
              
                <label className="mdl-textfield__label" htmlFor="vehicleModel">Model Number</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="text" id="vehicleColor" 
                  onChange={(e)=> this.onChange(e)} value={this.state.vehicleColor}/>
                <label className="mdl-textfield__label" htmlFor="vehicleColor">Color </label>
              </div>
            </div>

            <div className='mysubform'> 
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="text" id="vehicleKeyNumber" 
                  onChange={(e)=> this.onChange(e)} value={this.state.vehicleKeyNumber}/>
                <label className="mdl-textfield__label" htmlFor="vehicleKeyNumber">Key Number</label>
              </div>

              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="text" id="vehicleEngineNumber" 
                  onChange={(e)=> this.onChange(e)} value={this.state.vehicleEngineNumber}/>
                <label className="mdl-textfield__label" htmlFor="vehicleEngineNumber">Engine Number</label>
              </div>
            </div>

            <div className='mysubform'> 
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="text" id="vehicleChassisNumber" 
                  onChange={(e)=> this.onChange(e)} value={this.state.vehicleChassisNumber}/>
                <label className="mdl-textfield__label" htmlFor="vehicleChassisNumber">Chessis Number</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input myinput" type="text" id="vehicleSoldDealer" 
                  onChange={(e)=> this.onChange(e)} value={this.state.vehicleSoldDealer}/>
                <label className="mdl-textfield__label" htmlFor="vehicleSoldDealer">Sold Dealer</label>
              </div>
            </div>

            <button type="submit"
              style={{marginTop:20,width:300}}
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                  save
            </button>
          </form>
        </center>
      </div>
    )
  }
  onSubmit = (e)=>{
    e.preventDefault();
    let customerName = this.state.customerName.trim()
    let customerNumber = this.state.customerNumber.trim()
    let customerEmail = this.state.customerEmail.trim()
    let customerAddress = this.state.customerAddress.trim()
    let hpd = this.state.hpd
    let vehicleModel = this.state.vehicleModel.trim()
    let vehicleColor = this.state.vehicleColor.trim()
    let vehicleKeyNumber = this.state.vehicleKeyNumber.trim()
    let vehicleEngineNumber = this.state.vehicleEngineNumber.trim()
    let vehicleChassisNumber = this.state.vehicleChassisNumber.trim()
    let vehicleSoldDealer = this.state.vehicleSoldDealer.trim()

    if (customerName===''){ this.showSnackBar('Enter Customer Name'); return false}
    if (customerNumber===''){ this.showSnackBar('Enter Customer Mobile Number'); return false}
    if (customerEmail===''){ this.showSnackBar('Enter Customer Email'); return false}
    if (customerAddress===''){ this.showSnackBar('Enter Customer Address'); return false}
    if (vehicleModel===''){ this.showSnackBar('Enter Model Number'); return false}
    if (vehicleColor===''){ this.showSnackBar('Enter Color'); return false}
    if (vehicleKeyNumber===''){ this.showSnackBar('Enter Key number'); return false}
    if (vehicleEngineNumber===''){ this.showSnackBar('Enter Engine Number'); return false}
    if (vehicleChassisNumber===''){ this.showSnackBar('Enter Chessis Number'); return false}
    if (vehicleSoldDealer===''){ this.showSnackBar('Enter Dealer Name'); return false}


    let customer ={
      showroomId:this.props.credentials.showroomId,
      customerName,customerNumber,customerEmail,
      customerAddress,hpd,
      vehicleModel,vehicleColor,vehicleKeyNumber,
      vehicleEngineNumber,vehicleChassisNumber,
      vehicleSoldDealer
    }

    Meteor.call('customer.insert',customer,(err,res)=>{
      if (err) {
        Bert.alert(err, 'danger', 'growl-top-right');
      }
      Bert.alert('ग्राहक जोड़ा गया ', 'success', 'growl-top-right');
      this.props.history.push('/customer')
    })
    
   
    
  }

  onUpdate = (e)=>{
    e.preventDefault();
    let customerName = this.state.customerName.trim()
    let customerNumber = this.state.customerNumber.trim()
    let customerEmail = this.state.customerEmail.trim()
    let customerAddress = this.state.customerAddress.trim()
    let hpd = this.state.hpd
    let vehicleModel = this.state.vehicleModel.trim()
    let vehicleColor = this.state.vehicleColor.trim()
    let vehicleKeyNumber = this.state.vehicleKeyNumber.trim()
    let vehicleEngineNumber = this.state.vehicleEngineNumber.trim()
    let vehicleChassisNumber = this.state.vehicleChassisNumber.trim()
    let vehicleSoldDealer = this.state.vehicleSoldDealer.trim()

    if (customerName===''){ this.showSnackBar('ग्राहक का नाम लिखे '); return false}
    if (customerNumber===''){ this.showSnackBar('ग्राहक का मोबाइल नम्बर लिखे '); return false}
    if (customerEmail===''){ this.showSnackBar('ग्राहक का ईमेल लिखे'); return false}
    if (customerAddress===''){ this.showSnackBar('ग्राहक का पता लिखे'); return false}
    if (vehicleModel===''){ this.showSnackBar('मोडल नंबर लिखे'); return false}
    if (vehicleColor===''){ this.showSnackBar('रंग लिखे'); return false}
    if (vehicleKeyNumber===''){ this.showSnackBar('चाबी नंबर लिखे'); return false}
    if (vehicleEngineNumber===''){ this.showSnackBar('इंजन नंबर लिखे'); return false}
    if (vehicleChassisNumber===''){ this.showSnackBar('चेसीस  नंबर लिखे'); return false}
    if (vehicleSoldDealer===''){ this.showSnackBar('सोल्ड डीलर लिखे'); return false}

    let customer ={
      showroomId:this.props.credentials.showroomId,
      customerName,customerNumber,customerEmail,
      customerAddress,hpd,
      vehicleModel,vehicleColor,vehicleKeyNumber,
      vehicleEngineNumber,vehicleChassisNumber,
      vehicleSoldDealer
    }

    let customerId  = this.props.match.params.id
    
    Meteor.call('customer.update',customerId,customer,(err,res)=>{
      if (err) {
        Bert.alert(err, 'danger', 'growl-top-right');
        return
      }
      Bert.alert('ग्राहक अपडेट किया गया ', 'success', 'growl-top-right');
      // this.props.history.push('/customer')
    })
    
  }

  showSnackBar(msg){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }

}

export default  withRouter(CustomerRegistrationForm)
