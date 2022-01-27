import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PARKING_ADDRESS } from '../utils/queries';

// import { Link } from 'react-router-dom';

const SpecificReviews = ({selected}) => {


    console.log(selected.address)
    const { loading, error, data } = useQuery(QUERY_PARKING_ADDRESS, {variables: {address: selected.address}});
    console.log('test');

    console.log(data)

    const parking = data?.parkingByAddress || [];

    if (error) {
        console.log(error);
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return(
        <div>
            <h1>
                parking Reviews
            </h1>
                    <div>
                        <h3>Address: {parking.address}</h3>
                         
                        <h5>Coordinates: {parking.coordinates}</h5>

                        <h5>Zipcode: {parking.zipcode}</h5>
                        

                        {/* <h2>Address: {parking.address}</h2>
                        <p>zipcode: {parking.zipcode}</p> */}
                    </div>

            {/* <pre>
                {JSON.stringify(parkings, null, 2)}
            </pre> */}
            
        </div>
    )
}

export default SpecificReviews;