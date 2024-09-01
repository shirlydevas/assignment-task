'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import storeData from '../data/store.json';

const containerStyle = {
  width: '100%',
  height: '650px'
};

const StoreLocator = () => {
  const [selectedState, setSelectedState] = useState('Delhi');
  const [selectedCity, setSelectedCity] = useState('New Delhi');
  const [stores, setStores] = useState([]);
  const [center, setCenter] = useState({ lat: 28.6139, lng: 77.209 });
  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedState && selectedCity) {
      const cityStores = storeData[selectedState][selectedCity];
      setStores(cityStores);
      if (cityStores.length > 0) {
        const { latitude, longitude } = cityStores[0];
        setCenter({ lat: latitude, lng: longitude });
        if (mapRef.current) {
          mapRef.current.panTo({ lat: latitude, lng: longitude });
        }
      }
    }
  }, [selectedState, selectedCity]);

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    const newCity = Object.keys(storeData[newState])[0];
    setSelectedCity(newCity);
    const newCityStores = storeData[newState][newCity];
    if (newCityStores.length > 0) {
      const { latitude, longitude } = newCityStores[0];
      setCenter({ lat: latitude, lng: longitude });
      if (mapRef.current) {
        mapRef.current.panTo({ lat: latitude, lng: longitude });
      }
    }
  };

  const handleCityChange = (event) => {
    const newCity = event.target.value;
    setSelectedCity(newCity);
    const newCityStores = storeData[selectedState][newCity];
    if (newCityStores.length > 0) {
      const { latitude, longitude } = newCityStores[0];
      setCenter({ lat: latitude, lng: longitude });
      if (mapRef.current) {
        mapRef.current.panTo({ lat: latitude, lng: longitude });
      }
    }
  };

  return (
    <div>
      <h2 className='text-center font-bold text-xl mb-6'>Stores in {selectedCity}</h2>
      <div className='flex justify-between gap-5 md:flex-row flex-col'>
        <div className='basis-2/5 mb-6 md:mb-0'>
          <div className='flex justify-start sm:flex-row flex-col md:gap-7 gap-5 mb-5'>
            <div>
              <label htmlFor="state" className='md:text-2xl text-lg font-bold block mb-1'>State</label>
              <select id="state" value={selectedState} onChange={handleStateChange} className='md:py-3 md:px-5 py-1 px-3 bg-black text-white md:text-base text-sm'>
                {Object.keys(storeData).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="city" className='md:text-2xl text-lg font-bold block mb-1'>City</label>
              <select id="city" value={selectedCity} onChange={handleCityChange} className='md:py-3 md:px-5 py-1 px-3 bg-black text-white md:text-base text-sm'>
                {storeData[selectedState] && Object.keys(storeData[selectedState]).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className='mb-3 text-black'>{stores.length} results</p>
          <ul className='bg-zinc-950 py-4 px-3 text-white max-h-[500px] overflow-scroll'>
            {stores.map((store, index) => (
              <li key={index} className='p-4 mb-4 border-zinc-800 bg-zinc-800 border rounded-lg'>
                <h3 className='font-bold mb-2'>{store.name}</h3>
                <p className='text-sm font-sans mb-3'>{store.description}</p>
                <div>
                  <a href='#' className='p-3 my-2 block w-[fit-content] border border-zinc-800 bg-zinc-600 text-yellow-200 uppercase'>Get Directions</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='basis-1/2'>
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={(map) => { mapRef.current = map; }}
            >
              {stores.map((store, index) => (
                <Marker
                  key={index}
                  position={{ lat: store.latitude, lng: store.longitude }}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
