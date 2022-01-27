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
import { QUERY_PARKING } from '../utils/queries';
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
    lat: 34.0522,
    lng: -118.2437
}

const Map = ({zipcode, setZipcode, selected, setSelected}) => {

//loading google map using useEffect

//locate parkings

//search a oarking

}