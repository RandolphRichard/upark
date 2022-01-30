import React, { useState, useEffect } from 'react';
import env from 'react-dotenv';
import mapStyles from '../mapStyles';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'
import { Link } from 'react-router-dom';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
    getZipCode
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";
import {  useQuery } from '@apollo/client';
import { QUERY_ALL_PARKINGS } from '../utils/queries';
import '@reach/combobox/styles.css'

const libraries = ['places']
const mapContainerStyle = {
    width: "100%",
    height: "500px",
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const center = {
    lat: 45.424721,
    lng: -75.695000
}

const Map = ({zipcode, setZipcode, selected, setSelected}) => {

//loading google map using useEffect


const [markers, setMarkers] = useState([]);


const [inputAddress, setInputAdress] = useState();
    

const {loading, data, refetch} = useQuery(QUERY_ALL_PARKINGS, {variables: {zipcode}})

const parkings = data?.parkings || [];

    useEffect(() => {
        
   
        if (data) {
            setMarkers([])
            // const {parkingsByZip} = data
            // console.log(parkings)
            // eslint-disable-next-line
            parkings.map((datum) => {
              const lng = parseFloat(datum.lng)
                const lat = parseFloat(datum.lat)
                setMarkers((current) => [
                    ...current,
                    {
                    lng,
                    lat,
                    address: datum.address
                }
                ])
            })
        } 
        // eslint-disable-next-line
    }, [data, loading])
 

    const { isLoaded, loadError } = useLoadScript({
        id: process.env.GOOGLE_MAPS_ID || env.GOOGLE_MAPS_ID,
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || env.GOOGLE_MAPS_API_KEY,
        libraries
    });
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(12);
        
    }, [])


    if (loadError) return 'Error Loading maps';
    if (!isLoaded) return "Loading Maps";

    return (
        <div>
            <Search panTo={panTo} />
            <SearchButton panTo={panTo} />
            <Locate panTo={panTo}/>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} options={options} onLoad={onMapLoad}>

                {markers.map((marker) => (
                    <Marker
                        key={marker.address}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={
                            {
                                url: "/parking.svg",
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15)
                            }
                        }
                        onClick={() => {
                            setSelected(marker)
                        }}
                    />
                ))}

                {selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => { setSelected(null) }}>
                    <div>
                        <h2>Parking</h2>
                        <h3>{selected.address}</h3>
                        <div>
                        <Link to="/specificReviews">View Reviews!</Link>
                        </div>
                        <div>
                        <Link to="/add">Leave A Review!</Link>
                        </div>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    )

//locate parkings

function Locate({ panTo }) {
    return <button className="locate" onClick={() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${env.GOOGLE_MAPS_API_KEY}`).then((response) => {
                
            if (response.ok) {
                response.json().then((data) => {
                    const zip = data.results[0].address_components[6].long_name
                    setZipcode(zip);
                    refetch({zipcode: zip})
                });

                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            }
            
            
            })
        }, () => null)
    }} 
    >
        <img src="/location.svg" width={42} alt="compass - locate me"/>
    </button>
    
}

function SearchButton({ panTo }) {
    return <button className="locate" onClick={() => {
        // navigator.geolocation.getCurrentPosition(
        //     (position) => {
// 40.7128° N, 74.0060° W
        // let position  = {
        //     coords: {
        //         latitude : -45.378712,
        //         longitude :  -75.650355
        //     }
        //     // -X
        // }

    //    1355 Bank Street, Ottawa, ON
            
            // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${env.GOOGLE_MAPS_API_KEY}`).then((response) => {
                // http://maps.google.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
            // fetch(`http://open.mapquestapi.com/geocoding/v1/${addressInput}`).then((response) => {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputAddress}&key=${env.GOOGLE_MAPS_API_KEY}`).then((response) => {
                
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data)
                    const zip = data.results[0].address_components[6].long_name
                    setZipcode(zip);
                    refetch({zipcode: zip})


                panTo({
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng
                });
                });

                
            }
            
            
            })
        // }, () => null)
    }} 
    >
        <img src="/arrow.svg" width={30} alt="compass - locate me"/>
        {/* Search */}
    </button>
    
}


//search a parking

function Search({ panTo }) {
    
    const { ready, 
        // eslint-disable-next-line
            value, 
            suggestions: { status, data }, 
            setValue, 
            clearSuggestions 
        } = usePlacesAutocomplete({
        requestOptions: {
            location: {
                lat: () => 34.0522,
                lng: () => -118.2437
            },
            radius: 200 * 1000,
        },
    });

    return (
    
    <Combobox onSelect={async (address) => {


        setValue(address, false)


        clearSuggestions();

        try {
            const results = await getGeocode({address});
            const zip = await getZipCode(results[0], false)
            if (zip) {
         
            setZipcode(zip)
            refetch({zipcode: zip})
            const { lat, lng } = await getLatLng(results[0])
           
            panTo({lat, lng})
            }

           
        } catch(error) {
            console.log('Error!')
        }

        }}>
        <ComboboxInput 
            value={inputAddress} 
            className="form-control form-control-lg"
            onChange={(e) => {
                setInputAdress(e.target.value)
                }}
            disabled={!ready}
            placeholder="Please enter an address."
        >

        </ComboboxInput>
        <ComboboxPopover>
            <ComboboxList>
            {status === "OK" && data.map(({id, description}) => 
            <ComboboxOption key={id} value={description}/> )}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>

    )
}

}

export default Map;