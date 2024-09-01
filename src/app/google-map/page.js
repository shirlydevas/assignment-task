import React from 'react';
import StoreLocator from '../../components/GoogleMaps';

const Page = () => {
  return (
    <div className='bg-[#f0f8ff] flex flex-col gap-10 md:p-20 sm:p-12 p-7'>
      <h1 className='text-center text-3xl font-bold'>Store Locator through Google Maps</h1>
      <StoreLocator />
    </div>
  );
};

export default Page;
