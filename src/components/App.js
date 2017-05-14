import React,{PropTypes,Component} from 'react';
//import Header from '../components/common/Header';
import Map from '../components/Map/map';
import svgLocation  from '../../images/location.svg';
//import svgClose from '../../images/close.svg';

//https://anaheim-proj-production.appspot-preview.com/service/location/search
//{"lat" : -33.870775,"lng" : 151.199025,"radius":5000, "limit":100, "address":"california","apiKey":"3ff49cd1-8340-4b2d-889b-6d9bcd6a5a9c"}
class App extends React.Component {    

        handleAddressChange(event) {
            this.setState({address: event.target.value});
        }
        handleLngChange(event) {
            this.setState({lng: event.target.value});
        }
        handleLatChange(event) {
            this.setState({lat: event.target.value});
        }
        handleRadiusChange(event) {
            this.setState({radius: event.target.value});
        }
        handleLimitChange(event) {
            this.setState({limit: event.target.value});
        }
        handleApiKeyChange(event) {
            this.setState({apiKey: event.target.value});
        }

        constructor(){
            super();
 
            this.state = {
                map:null, 
                markers:[], 
                address:"",
                lng:-73.935242,
                lat: 40.730610,
                radius:5,
                limit:3,
                apiKey:"3ff49cd1-8340-4b2d-889b-6d9bcd6a5a9c",
                requestCount: 0
            };

                this.handleAddressChange = this.handleAddressChange.bind(this);
                this.handleLngChange = this.handleLngChange.bind(this);
                this.handleLatChange = this.handleLatChange.bind(this);
                this.handleRadiusChange = this.handleRadiusChange.bind(this);
                this.handleLimitChange = this.handleLimitChange.bind(this);
                this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
                this.Search= this.Search.bind(this);
        }

        mapMoved()
        {
            var nlatlng = {};
             nlatlng.lat = JSON.stringify(this.state.map.getCenter().lat());
             nlatlng.lng = JSON.stringify(this.state.map.getCenter().lng());
             this.setState(nlatlng);
             this.Search();
        }

        mapLoaded(map){
           
            
           if(this.state.map != null)
                return ;
             console.log(JSON.stringify(map.getCenter()));
            this.setState({map:map});
        }

        onZoomChanged(){ 
            var nlatlng = {};
            nlatlng.radius = (23 - JSON.stringify(this.state.map.getZoom())) * 2; 
            
             this.setState(nlatlng);
               this.Search();
        } 
      
        Search(){
            console.log("Search");
             const thiz = this;
            
            var ireq = {};
            ireq.lat = this.state.lat;
            ireq.lng = this.state.lng;
            ireq.radius = this.state.radius;
            ireq.limit = this.state.limit;
            ireq.address = this.state.address;
            ireq.apiKey = this.state.apiKey;
            
            var request =  {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json' ,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(ireq)
                };
                this.setState({requestCount : this.state.requestCount + 1});
                console.log("fetch");
               fetch('https://anaheim-proj-production.appspot-preview.com/service/location/search', request
              ).then((resp) => resp.json()).then((function(data) {
                    //debugger;
                    this.setState({requestCount : this.state.requestCount - 1});
                    console.log(JSON.stringify(data.locations));
                    var addMarkers = [];
                 

                    //alert(data.locations.length);
                       

                    for(var i=0;i < data.locations.length;i++)
                    {
                        //check the duplication
                        if(this.state.markers.filter((e) => e.locationId === data.locations[i].locationId).length == 0)                       
                            addMarkers[i] = {position: {lng: data.locations[i].lng,lat: data.locations[i].lat}, title:data.locations[i].name , locationId: data.locations[i].locationId};
                        else
                            console.log("exist");
                    }
                    this.setState({ markers:this.state.markers.concat(addMarkers) });
                    console.log("End");

                    // Create and append the li's to the ul
                    }).bind(thiz));
        }
   

        render(){
            const location = {lat:40.7575285,lng:-73.9884469};  
            
            return (
                <div>
                    <header >
                        <div className="search">                            
                            <div style={{"flex-direction":"column ","justify-content":"flex-end"}}>
                                
                               <div className="row"> 
                                    <div><span>Address</span></div>
                                    <div><input onChange={this.handleAddressChange} value={this.state.address} /></div>
                                </div>
                                 <div className="row"> 
                                    <div><span>Longitude</span></div>
                                    <div><input onChange={this.handleLngChange} value={this.state.lng} /></div>
                                </div>

                                 <div className="row"> 
                                    <div><span>Latitude</span></div>
                                    <div><input onChange={this.handleLatChange} value={this.state.lat} /></div>
                                </div>

                                 <div className="row"> 
                                    <div><span>Radius</span></div>
                                    <div><input onChange={this.handleRadiusChange} value={this.state.radius} /></div>
                                </div>

                                 <div className="row"> 
                                    <div><span>Limit</span></div>
                                    <div><input onChange={this.handleLimitChange} value={this.state.limit} /></div>
                                </div>

                                 <div className="row"> 
                                    <div><span>Api</span></div>
                                    <div><input onChange={this.handleApiKeyChange} value={this.state.apiKey} /></div>
                                </div>   

                                 <div className="row">                                  
                                    <div><button style={{"margin-top":"10px","width":"100%"}}  onClick={this.Search} value={this.state.apiKey}  value="Search" >Search</button></div>
                                </div>   

                            </div>

                        </div>      
                    </header>

                    <div className="summary">
                        { this.state.address != "" ? <div >{this.state.address}</div> : null}
                        { this.state.lat != "" ? <div> {this.state.lat} , {this.state.lng}</div> : null}
                        { this.state.limit != "" || this.state.radius != ""  ? <div> {this.state.limit} / {this.state.radius}</div> : null}
                        { this.state.apiKey != "" ? <div>{this.state.apiKey}</div> : null}
                    </div>

                     { this.state.requestCount > 0  ?
                    <div className="loading" >
                        <div ><img src={svgLocation} style={{"width":"50px"}}/></div>
                    </div> : null}
                     <div className="footer">
                        <div > {this.state.markers.length}  {this.state.requestCount > 0  ? <span> / {this.state.requestCount} </span> : null}</div>
                     </div>

                    <div style={{"height":100 + "%","width":100 + "%","position":"absolute"}}>
                    
                     <Map 
                        center={{lat:this.state.lat,lng:this.state.lng}} 
                        zoom={12}
                        containerElement={<div style={{ height: 100 + '%' }} />} 
                        ref={this.mapLoaded.bind(this)}
                        mapElement={<div style={{ height: 100 + '%' }} />} 
                        onZoomChanged={this.onZoomChanged.bind(this)}
                        markers={this.state.markers}
                        mapMoved={this.mapMoved.bind(this)}
                        mapLoaded={this.mapLoaded.bind(this)}                        
                        />

                    </div>
                </div>
            );            
        }
}

App.propTypes = {children: PropTypes.object.isRequired};
export default App;

