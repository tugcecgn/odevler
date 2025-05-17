import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './StarshipDetail.css'

const StarshipDetail = () => {

    const { id } = useParams();


    const [ship, setShip] = useState(null);

   
    const navigate = useNavigate();


    useEffect(() => {
        fetch(id)
            .then(res => res.json())
            .then(data => setShip(data))
            .catch(error => console.error("Hata:", error)); 
    }, [id]);

    return (
        <div className='detail-container'>
            {ship ? (
                <>
                    <h2>{ship.name}</h2>
                    <p>Model: {ship.model}</p>
                    <p>Passengers: {ship.passengers}</p>
                    <p>Speed: {ship.max_atmosphering_speed}</p>
                    <p>Facturuer: {ship.manufacturer}</p>
                    <p>Crew: {ship.crew}</p>
                    <p>Cargo Capacity: {ship.cargo_capacity}</p>
                  
                    <button className='back-btn' onClick={() => navigate(-1)}>Back</button>
                </>
            ) : (
            
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StarshipDetail;
