import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


import { Button, Modal } from "flowbite-react";

export default function Brands() {
  const [Brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState(null); // Track selected brand
  const [openModal, setOpenModal] = useState(false); // Modal visibility

  async function getBrands() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    setBrands(data.data);

  }



  useEffect(() => {
    getBrands()
  }, [])

  function handleBrandClick(Brand) {
    setSelectedBrand(Brand);
    setOpenModal(true); 
  }

  return (
    <>
      <h2 className="text-5xl mt-10 text-green-400 m-auto text-center">All Brands</h2>
      <div className="grid grid-cols-12 gap-4 mb-5 m-auto">
        {Brands.map((Brand) => (
          <div
            key={Brand._id}
            onClick={() => handleBrandClick(Brand)}
            className="col-span-3 cursor-pointer hover:shadow-2xl border border-spacing-2 p-5 mt-5"
          >
            <img src={Brand.image} alt={Brand.name} />
            <h3 className="text-lg text-green-700 font-bold m-auto text-center">{Brand.name}</h3>
          </div>
        ))}
      </div>

     
      <Modal className=' relative w-[50%] flex-col flex items-center justify-center' show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className=' bg-white' > </Modal.Header>
        <Modal.Body>
          <div className="container border-y-2 py-4 flex-grow shrink basis-3">
            {selectedBrand?.image && (
              <div className='flex justify-center items-center'>
                <h2 className='text-4xl text-green-600 font-bold w-[50%] mb-6'>{selectedBrand?.name}</h2>
                <img
                  src={selectedBrand.image}
             
                  className="bg-cover  h-40 "
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='bg-gray-700 ms-96' onClick={() => setOpenModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}