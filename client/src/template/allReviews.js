import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PARKINGS } from '../utils/queries';

// import { Link } from 'react-router-dom';

const DisplayReview = () => {
    const { loading, error, data } = useQuery(QUERY_ALL_PARKINGS);
    console.log('test');

    const parkings = data?.parkings || [];

    if (error) {
        console.log(error);
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return(
        <div>
            <h1>
                Parking Reviews
            </h1>

            {parkings.map(parking => {
                return (
                    <div>
                        <h3>Address: {parking.address}</h3>
                         
                        <h5>Coordinates: {parking.coordinates}</h5>

                        <h5>Zipcode: {parking.zipcode}</h5>
                        

                        {/* <h2>Address: {parking.address}</h2>
                        <p>zipcode: {parking.zipcode}</p> */}
                    </div>
                );
            })}

            {/* <pre>
                {JSON.stringify(parkings, null, 2)}
            </pre> */}
            
        </div>
    )
}

export default DisplayReview;