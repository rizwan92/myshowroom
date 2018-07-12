import React, { Component } from 'react'
class PrintJobSheet extends Component {

  render() {
    let { jobSheetId,customerName,customerNumber,customerEmail,customerAddress,hpd,
      vehicleModel,vehicleColor,vehicleKeyNumber,vehicleEngineNumber,vehicleChassisNumber,
      vehicleSoldDealer,type} = this.props.detail   
    let { oilLabel,airFilter,taped,spark,corborator,clutch,breake,
      diveChain,battery,fuel,electrical,cabel,nutBolt} = this.props.mycheck
    return (
      <div id="divContents">
        <center>
          <h4 style={{margin:0}}>Star Auto</h4>
          <div style={mediumText}>बस स्टैंड -घटुला तहसील  नगरी जिला-धमतरी</div>
          <div style={mediumText}>{type === 'free' ? 'फ्री' :'पेड'} सर्विस जॉब कार्ड</div>
          <div style={{display:'flex',justifyContent:'space-around'}}>
            <div className="mediumText ">जॉब कार्ड नंबर :-{ '-' +jobSheetId}</div>
            <div className="mediumText ">{type === 'free' ? 'फ्री' :'पेड'} सर्विस :-__________</div>
            <div className="mediumText ">दिनांक :-__________</div>
          </div>

          <div style={grahakDetailsContainer}>

            <div style={{...grahakDetail}}>
              <div style={{...grahakDetailSub,borderRightStyle:'groove'}}>
                <div  style={{...bigText,marginTop:10,textAlign:'left'}}>ग्राहक का विवरण </div>
                <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap'}}> 
                  <div style={mediumText}>ग्राहक का नाम :- {customerName}</div>
                  <div style={mediumText}>हीरो  पासपोर्ट धारक ? {new Boolean(hpd) ? 'हा' : 'ना'}</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap'}}> 
                  <div style={mediumText}>पता  :-{customerAddress} </div>
                  <div style={mediumText}>मोबाइल नम्बर  :- {customerNumber}</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap'}}> 
                  <div style={mediumText}>ग्राहक का ईमेल   :- {customerEmail}</div>
                  <div style={mediumText}></div>
                </div>
                <hr />
                <div  style={{...bigText,marginTop:10,textAlign:'left'}}>मानक कार्य कृपया टिक करे   </div>
                <div>
                  <input id="oilLabel" type="checkbox" style={{...mdlCheckbox}}
                    checked={oilLabel} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">इंजन तेल के स्तर की जांच </span>
                </div>
                <div>
                  <input id="airFilter" type="checkbox" style={{...mdlCheckbox}} 
                    checked={airFilter} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">एयर फ़िल्टर की सफाई </span>
                </div>            
                <div>
                  <input id="taped" type="checkbox" style={{...mdlCheckbox}}
                    checked={taped} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">टैपेड  क्लीयरेन्स जांच एवं गैप एडजस्ट करना</span>
                </div>
                <div>
                  <input id="spark" type="checkbox" style={{...mdlCheckbox}}
                    checked={spark} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">स्पार्क प्लग की सफाई एवं गैप एडजस्ट करना</span>
                </div>
                <div>
                  <input id="corborator" type="checkbox" style={{...mdlCheckbox}}
                    checked={corborator} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">कार्बोरेटर टायनिंग</span>
                </div>
                <div>
                  <input id="clutch" type="checkbox" style={{...mdlCheckbox}}
                    checked={clutch} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">क्लच निरीक्षण / एडजस्ट करना</span>
                </div>
                <div>
                  <input id="breake" type="checkbox" style={{...mdlCheckbox}}
                    checked={breake} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">ब्रेक घिसने का निरिक्षण /एडजस्ट करना</span>
                </div>
                <div>
                  <input id="diveChain" type="checkbox" style={{...mdlCheckbox}}
                    checked={diveChain} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">डाइव चैन की सफाई एवं एडजस्ट करना </span>
                </div>
                <div>
                  <input id="battery" type="checkbox" style={{...mdlCheckbox}}
                    checked={battery} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">बैटरी एलेक्टोलाइट स्तर की जांच /उनकी पूर्ति</span>
                </div>
                <div>
                  <input id="fuel" type="checkbox" style={{...mdlCheckbox}}
                    checked={fuel} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">फ्यूल स्टेवर की सफाई एवं सर्विस छोड़कर</span>
                </div>
                <div>
                  <input id="electrical" type="checkbox" style={{...mdlCheckbox}}
                    checked={electrical} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">इलेक्ट्रिकल जांच </span>
                </div>
                <div>
                  <input id="cabel" type="checkbox" style={{...mdlCheckbox}}
                    checked={cabel} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">केबल की जांच </span>
                </div>
                <div>
                  <input id="nutBolt" type="checkbox" style={{...mdlCheckbox}}
                    checked={nutBolt} onChange={(e)=>this.props.onCheacked(e)}/>
                  <span className="">नट बोल्ट एवं बूड़नारो की जांच </span>
                </div>

              </div>

              <div style={{...grahakDetailSub}}>
                <div  style={{...bigText,marginTop:10,textAlign:'left'}}>मोटरसाईकल का विवरण </div>
                <div style={mediumText}>मोडल नंबर :- {vehicleModel}</div>
                <div style={mediumText}>रंग :- {vehicleColor}</div>
                <div style={mediumText}>चाबी नंबर   :-{vehicleKeyNumber} </div>
                <div style={mediumText}>रजिस्ट्रेशन नंबर    :-___________ </div>
                <div style={mediumText}>कितने किलोमीटर चली है     :-{customerAddress} </div>
                <div style={mediumText}>इंजन नंबर   :- {vehicleEngineNumber}</div>
                <div style={mediumText}>चेसीस /फ्रेम  नंबर    :- {vehicleChassisNumber}</div>
                <div style={mediumText}>खरीदी  दिनांक    :- _________</div>
                <div style={mediumText}>सोल्ड डीलर   :- {vehicleSoldDealer}</div>
                <hr />
                <div  style={{...bigText,marginTop:10,textAlign:'center'}}>सुपरवाइज़र की टिप्पणियां </div>
              </div>
            </div>

            <div  style={{...bigText,marginTop:10,textAlign:'left'}}>तेल बदलाव :- हां /नहीं     तेल की किस्म 4 टी  प्लस /अन्य सन्तुस्ट ब्रांड 10 w30/20w40 </div>

            <div style={{...grahakDetail}}>
              <div style={{...grahakDetailSub,borderRightStyle:'groove'}} >
                <div  style={{...bigText,textAlign:'center'}}> मोटर साइकिल पावती रिपोर्ट </div>
                <div  style={{...smallText,textAlign:'center'}}>(सर्विस सुपरवाइज़र द्वारा भेजा जायेगा)</div>
                <div style={mediumText}>मद :- </div>
                <div style={mediumText}>लाइटे :- </div>
                <div style={mediumText}>ईंधन स्तर :- </div>
                <div style={mediumText}>बैटरी हां / ना :- </div>
                <div style={mediumText}>टूल कीट हां / ना :- </div>
                <div style={mediumText}>रियर व्यू मिरर (L/R) :- </div>
                <div style={mediumText}>डेंट (D) निशान (S):- </div>
                <div style={mediumText}>चोक कैंप : हां /ना :- </div>
                <div style={mediumText}>एसेसरीज़  :- </div>
                <div style={mediumText}>अन्य ( यदि कोई हो ) :- </div> 
                <div style={{display:'flex',justifyContent:'space-around'}}>  
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>टीम सुपरवाइज़र का नाम एवं हस्ताक्षर </div>
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}> ग्राहक के हस्ताक्षर  </div>
                </div>
              </div>

              <div style={{...grahakDetailSub}}>
                <div  style={{...bigText,marginTop:10,textAlign:'left'}}>मरम्मत इतिहास (पिछले दो सर्विस) </div>
                <div style={mediumText}>जाँच शेड्यूल :- _________</div>
                <div style={mediumText}>आने का समय :- _________</div>
                <div style={mediumText}>आबंटित टीम  :- _________</div>
                <div style={mediumText}>मैकेनिक :- _________</div>
                <div style={mediumText}>डिलेवरी तिथि :- _________</div>
                <div style={mediumText}>समय  :- _________</div>
                <div style={mediumText}>अनुमान लागत (एस्टिमेटेड कॉस्ट )  :- _________</div>
                <div  style={{...mediumText,marginTop:10,textAlign:'left'}}>मरम्मत ,जांच व टायल के दौरान मोटरसाईकल की क्षति के लिए जिम्मेदार नहीं होगा </div>

              </div>

            </div>

            <div style={{...grahakDetail,borderTopStyle:'none'}}>
              <div style={{...grahakDetailSub}} >
                <div  style={{...bigText,textAlign:'center'}}>डिलीवरी फीडबैक</div>
                <div style={{display:'flex',justifyContent:'space-around'}}>  
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>डिलीवरी दिनांक :- _________</div>
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}> समय :- __________ </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>  
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>मैंने विधिवत सर्विस /मरम्मत की हुई मोटरसाइक्ल प्राप्त की है और मै इससे पूर्णता संतुस्ट हु और बदले में पुर्ज़े यदि कोई हो मुझे लौटा दिए गए है </div>
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>टीम सुपरवाइज़र के हस्ताक्षर </div>
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}> ग्राहक के हस्ताक्षर</div>
                </div>
              </div>
            </div>

            <div style={{...grahakDetail,borderTopStyle:'none'}} >
              <div style={{...grahakDetailSub}} >
                <div  style={{...bigText,textAlign:'center'}}>(ग्राहक के पास रहेगा और मोटरसाइक्ल डिलीवरी के समय सोपा जायेगा)</div>
                <div style={{display:'flex',justifyContent:'space-between'}}>  
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>जॉब कार्ड नंबर :- _________</div>
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>रजिस्ट्रेशन नंबर :- __________ </div>
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>अनुमानित लागत</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>  
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>सहमत डिलीवरी तिथि :- _________</div>
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>समय :- ____________</div>
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>(एस्टिमेटेड कॉस्ट)</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>  
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>कृपया स्पस्टीकरण के लिए .............................. से संपर्क कीजिये </div>
                  <div style={{...mediumText,marginTop:10,textAlign:'center'}}>डीलर-स्टार ऑटो घटुला जिला-धमतरी छत्तीसगढ़ मोबाइल नम्बर :- 812057-77786, 9009033994</div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    )
  }
}

export default PrintJobSheet

const bigText = {
  fontSize:16,
}
  
const mediumText ={
  fontSize: 14,
}
  
const smallText = {
  fontSize: 13,
}
  
const grahakDetailsContainer = {
  borderLeftStyle: 'groove',
  borderRightStyle: 'groove'
}
const grahakDetail = {
  display: 'flex',
  borderTopStyle: 'groove',
  borderBottomStyle: 'groove'
}
  
const grahakDetailSub = {
  flex: 1,
  paddingLeft: 10,
  textAlign: 'left',
  paddingTop: 5,
  justifyContent: 'center'
}
  
const mdlCheckbox ={
  position: 'relative',
  zIndex: 1,
  verticalAlign: 'middle',
  display: 'inline-block',
  boxSizing: 'border-box',
  width: 16,
  height: 16,
  marginRight: 5,
  padding: 0
}