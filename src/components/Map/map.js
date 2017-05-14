import React, {Component} from 'react';
import { withGoogleMap, GoogleMap, Marker,OverlayView} from 'react-google-maps';

class Map extends Component {

	constructor(){
		super();
	}

	render() {

		//const markers = this.props.markers || [];//[{position: {lng: 144.687034,lat: 13.416907}, title:"Hello World!"}];//[];//
		//const markers = [{position: {lng: 144.687034,lat: 13.416907}, title:"Hello World!"}];
		
		return (
			<GoogleMap
				ref={this.props.mapLoaded}
				onDragEnd={this.props.mapMoved}
				onZoomChanged={this.props.onZoomChanged}
			    defaultZoom={this.props.zoom}
			    defaultCenter={this.props.center}
				markers={this.props.markers}>
			    {this.props.markers.map((marker, index)=>(<Marker {...marker}/>))}			    
			</GoogleMap>
			);	
	}
}

export default withGoogleMap(Map);

