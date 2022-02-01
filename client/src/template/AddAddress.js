import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useMutation } from "@apollo/client";
import { ADD_ADDRESS, EDIT_ADDRESS } from "../utils/mutations";
import Auth from "../utils/auth";
// eslint-disable-next-line
const AddAddress = ({}) => {
  // eslint-disable-next-line
  const [addAddress, { error }] = useMutation(ADD_ADDRESS);
  const [editAddress] = useMutation(EDIT_ADDRESS);
  const [formState, setFormState] = useState({
    zipcode: "",
    address: "",
    coordinates: "",
    lat: "",
    lng: "",
    keys: "",
    comment: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    const searchParams = window.location.search.substring(1);
    const addressId = searchParams.split("=")[1];
    console.log(addressId);
    const savedParking = JSON.parse(localStorage.getItem("parking")) || [];
    if (savedParking.length) {
      const selectedParking = savedParking.filter(
        (spot) => spot._id === addressId
      );
      console.log(selectedParking);
      if (selectedParking.length) {
        setFormState({ ...formState, ...selectedParking[0] });
      }
    }
  // eslint-disable-next-line
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    if (formState._id) {
      try {
        const { data } = await editAddress({
          variables: { ...formState },
        });
        console.log(data);
        Auth.login(data.editAddress.token);
      } catch (e) {
        console.error(e);
      }
      return;
    }
    try {
      const { data } = await addAddress({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.addAddress.token);
    } catch (e) {
      console.error(e);
    }

    // navigator.geolocation.getCurrentPosition(position => {

    //         const { latitude, longitude } = position.coords
    //         const lng = longitude + '0'
    //         const lat = latitude + '0'
    //          const coordinates = latitude + 'X' + longitude
    //          console.log(lng,lat)
    //          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${env.GOOGLE_MAPS_API_KEY}`).then((response) => {

    //                 response.json().then((data) => {
    //                     const zipcode = data.results[0].address_components[6].long_name

    //                     console.log(data.results[0].formatted_address)
    //                     const address = data.results[0].formatted_address
    //                     try {
    //                         createNewParking({
    //                                 variables: { lat, lng, address, zipcode, coordinates: coordinates, ...formState}
    //                             })
    //                             return history.push('/')
    //                         } catch (e) {
    //                             console.error(e)
    //                             console.log(error)
    //                         }
    //                 });

    //             })

    //     })
  };

  return (
    <>
      <h1> Add Address</h1>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label for="zipcode">Zipcode</Label>
          <Input
            onChange={handleChange}
            value={formState.zipcode}
            type="text"
            name="zipcode"
            id="zipcode"
            placeholder="K1V 8V7"
          />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            onChange={handleChange}
            value={formState.address}
            type="text"
            name="address"
            id="address"
            placeholder="2851 Baycrest Drive, Ottawa, ON"
          />
        </FormGroup>
        <FormGroup>
          <Label for="coordinates">Coordinates</Label>
          <Input
            onChange={handleChange}
            value={formState.coordinates}
            type="text"
            name="coordinates"
            id="coordinates"
            placeholder="45.378100X-75.651400"
          />
        </FormGroup>
        <FormGroup>
          <Label for="lat">Lattitude</Label>
          <Input
            onChange={handleChange}
            value={formState.lat}
            type="text"
            name="lat"
            id="lat"
            placeholder="45.378100"
          />
        </FormGroup>
        <FormGroup>
          <Label for="lng">Longitude</Label>
          <Input
            onChange={handleChange}
            value={formState.lng}
            type="text"
            name="lng"
            id="lng"
            placeholder="-75.651400"
          />
        </FormGroup>

        <FormGroup>
          <Label for="keys">Can you leave your Keys ?</Label>
          <Input
            onChange={handleChange}
            defaultValue={"No"}
            type="select"
            name="keys"
            id="keys"
          >
            <option>Yes</option>
            <option>No</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="comment">comment</Label>
          <Input
            onChange={handleChange}
            type="textarea"
            id="comment"
            name="comment"
            placeholder="Enter a comment"
          ></Input>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </>
  );
};
export default AddAddress;


