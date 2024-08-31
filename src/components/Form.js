'use client';

import { useState } from 'react';

export default function Form() {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  console.log(data, 'data');

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value) {
          error = 'This field is required';
        } else if (value.length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'This field is required';
        } else if (!emailRegex.test(value)) {
          error = 'Enter a valid email';
        }
        break;

      case 'phone':
        const phoneRegex = /^\d{10}$/;
        if (!value) {
          error = 'This field is required';
        } else if (!phoneRegex.test(value)) {
          error = 'Enter a valid phone number';
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateForm = () => {
    const tempErrors = {};

    ['name', 'email', 'phone'].forEach((key) => {
      validateField(key, data[key]);
      if (!data[key]) {
        tempErrors[key] = 'This field is required';
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const closeModal = () => {
    setIsSubmitted(false);
    setData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className='md:w-[60%] w-full my-0 mx-auto'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
        <div className='flex flex-col'>
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className='input-field'
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className='input-field'
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="phone">Phone Number*</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={data.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className='input-field'
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            value={data.message}
            onChange={handleChange}
            rows={10}
            cols={10}
            draggable={false}
          />
        </div>
        <div>
          <button type="submit" className='form-button'>Submit</button>
        </div>
      </form>

      {isSubmitted && (
        <div className="flex justify-center items-center fixed inset-0 w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-12 rounded-md">
            <h2 className='text-xl font-bold mb-2'>Submitted Information</h2>
            <p className='mb-1'><strong>Name:</strong> {data.name}</p>
            <p className='mb-1'><strong>Email:</strong> {data.email}</p>
            <p className='mb-1'><strong>Phone Number:</strong> {data.phone}</p>
            {data.message && <p className='mb-1'><strong>Message:</strong> {data.message}</p>}
            <button onClick={closeModal} className='form-button mt-[10px]'>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
