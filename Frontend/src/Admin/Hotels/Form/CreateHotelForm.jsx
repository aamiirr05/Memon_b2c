/* eslint-disable no-unused-vars */
import { Plus, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context';
import HotelSchema from '../../schema/HotelSchema';
import useHotelStore from '../../store/Hotels/useHotelStore';

const CreateHotelForm = () => {
  const {
    bookingterms,
    setBookingTerms,
    cancelpolicy,
    amenities,
    setCancelPolicy,
    termcondition,
    setTermCondition,

    isActive,
    isFeatured,
    addBookingTerms,

    addPolicy,
    addTermsCondition,
    removeBookingTerms,

    removePolicy,
    handleisActive,
    handleisFeatured,

    removeAmenities,
    addAmenities,
    setAmenities,
  } = useHotelStore();

  console.log(amenities,bookingterms,cancelpolicy,termcondition)

  // navigate
  const navigate = useNavigate();

  // Context States
  const { updatePackageData } = useContext(AuthContext);

  // useForm

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(HotelSchema),
    values: {
      isactive: isActive,
      isfeatured: isFeatured,
      cancellationpolicy: cancelpolicy,
      bookingterms: bookingterms,
      termcondition: termcondition,
      amenities: amenities,
    },
  });

  const handleAmenities = (val, index) => {
    const updatedAmenities = [...amenities];
    updatedAmenities[index] = val;
    setAmenities(updatedAmenities);
  };

  //  Functions for booking terms

  const handleBookingTerms = (val, index) => {
    const updatedTerms = [...bookingterms];
    updatedTerms[index] = val;
    setBookingTerms(updatedTerms);
  };

  const handleTermsCondition = (val, index) => {
    const updatedTerms = [...termcondition];
    updatedTerms[index] = val;
    setTermCondition(updatedTerms);
  };

  const handlePolicy = (val, index) => {
    const updatedPolicy = [...cancelpolicy];
    updatedPolicy[index] = val;
    setCancelPolicy(updatedPolicy);
  };

  const removeTerms = (index) => {
    const updatedTerms = termcondition.filter((_, i) => i !== index);
    setTermCondition(updatedTerms);
  };

  // Functions for form submission
  const onFormSubmit = (data) => {
    updatePackageData(data);
    navigate('/admin/hotel/createhotel-package');
    reset();
  };

  const previewData = JSON.parse(localStorage.getItem('packagedetails'));

  console.log(previewData);

  return (
    <form
      action=""
      className="w-full h-full"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      {/* Section One */}
      <div className="w-full bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <div className="flex flex-col gap-5 lg:flex-row items-center w-full">
          {/* Hotel Name */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="packagename" className="custom-label">
              Hotel Name
            </label>
            <input
              type="text"
              name="hotelname"
              id="hotelname"
              className="custom-input"
              placeholder="Enter Hotel Name"
              defaultValue={previewData?.hotelname}
              {...register('hotelname')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.hotelname?.message}
            </span>
          </div>
          {/* Hotel City */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="hotelcity" className="custom-label">
              Hotel City
            </label>
            <input
              type="text"
              name="hotelcity"
              id="hotelcity"
              className="custom-input"
              placeholder="Enter Hotel City"
              defaultValue={previewData?.hotelcity}
              {...register('hotelcity')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.hotelcity?.message}
            </span>
          </div>
          {/* Hotel Country */}
          <div className="flex gap-3 w-full flex-col">
            <label htmlFor="hotelcountry" className="custom-label">
              Hotel Country
            </label>
            <input
              type="text"
              name="hotelcountry"
              id="hotelcountry"
              className="custom-input"
              defaultValue={previewData?.hotelcountry}
              placeholder="Enter Hotel Country"
              {...register('hotelcountry')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.hotelcountry?.message}
            </span>
          </div>
        </div>
        {/* Textbox for desc */}

        <div className="flex mt-5 gap-3 w-full flex-col">
          <label htmlFor="hoteldescription" className="custom-label">
            Hotel Description
          </label>
          <textarea
            name="hoteldescription"
            id="hoteldescription"
            cols="40"
            rows="5"
            className="w-full custom-input"
            placeholder="Enter Hotel Description"
            defaultValue={previewData?.hoteldescription}
            {...register('hoteldescription')}
          ></textarea>
          <span className="text-sm text-red-600 my-2">
            {errors?.hoteldescription?.message}
          </span>
        </div>

        {/* Hotel Location */}
        <div className="flex mt-5 gap-3 w-full flex-col">
          <label htmlFor="hoteldescription" className="custom-label">
            Hotel Location
          </label>
          <input
            type="text"
            name="hotelcountry"
            id="hotelcountry"
            className="custom-input"
            placeholder="Enter Hotel Location"
            defaultValue={previewData?.hotellocation}
            {...register('hotellocation')}
          />
          <span className="text-sm text-red-600 my-2">
            {errors?.hotellocation?.message}
          </span>
        </div>

        {/* Boolean Values for package */}
        <div className="flex mt-5 flex-col md:flex-row items-start gap-5 justify-start w-full">
          {/* Is Active */}
          <div className="flex gap-3 items-center justify-start">
            <label htmlFor="packagename" className="custom-label">
              Is Active
            </label>

            <div
              style={{
                textAlign: 'center',
              }}
            >
              <div
                onClick={handleisActive}
                style={{
                  width: '60px',
                  height: '30px',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                className={`${isActive ? 'bg-darkgreen' : 'bg-peach bg-opacity-50 border-2 border-darkgreen'}`}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    transform: isActive ? 'translateX(30px)' : 'translateX(0)',
                    transition: 'transform 0.3s ease',
                  }}
                  className={`rounded-full ${isActive ? 'bg-peach' : 'bg-darkgreen'}`}
                ></div>
              </div>
            </div>

            <span className="text-sm text-red-600 my-2">
              {errors?.isactive?.message}
            </span>
          </div>
          {/* Is Featured */}
          <div className="flex gap-3 items-center justify-start">
            <label htmlFor="isfeatured" className="custom-label">
              Is Featured
            </label>

            <div
              style={{
                textAlign: 'center',
              }}
            >
              <div
                onClick={handleisFeatured}
                style={{
                  width: '60px',
                  height: '30px',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                className={`${isFeatured ? 'bg-darkgreen' : 'bg-peach bg-opacity-50 border-2 border-darkgreen'}`}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    transform: isFeatured
                      ? 'translateX(30px)'
                      : 'translateX(0)',
                    transition: 'transform 0.3s ease',
                  }}
                  className={`rounded-full ${isFeatured ? 'bg-peach' : 'bg-darkgreen'}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Three For Hotels */}
      <div className="w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        {/* Price Section for hotels*/}

        <div className="flex mt-10 flex-col gap-5 md:flex-row items-center w-full">
          {/* Hotel Category  */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="hotelcategory" className="custom-label">
              Hotel Category
            </label>
            <input
              type="text"
              name="hotelcategory"
              id="hotelcategory"
              className="custom-input"
              defaultValue={previewData?.hotelcategory}
              placeholder="Enter Hotel Category"
              {...register('hotelcategory')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.hotelcategory?.message}
            </span>
          </div>
          {/* Meal Basis */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="hotelstar" className="custom-label">
              Meal Basis
            </label>

            <select
              name="mealbasis"
              id="mealbasis"
              className="custom-input"
              {...register('mealbasis')}
            >
              {[
                {
                  value: '',
                  label: 'Select Meal Basis',
                  disabled: true,
                },
                { value: 'Room Only', label: 'Room Only' },
                { value: 'BreakFast Only', label: 'Breakfast Only' },
                { value: 'Half Board', label: 'Half Board' },
                { value: 'Full Board', label: 'Full Board' },
              ].map((i, index) => {
                return (
                  <option
                    key={index}
                    value={i.value}
                    className={` ${i.disabled ? 'pointer-events-none hidden' : 'bg-peach/50'}`}
                  >
                    {i.label}
                  </option>
                );
              })}
            </select>

            <span className="text-sm text-red-600 my-2">
              {errors?.mealbasis?.message}
            </span>
          </div>
        </div>

        {/*  */}
        <div className="flex mt-10 flex-col gap-5 md:flex-row items-center w-full">
          {/* Hotel Distance */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="hoteldistance" className="custom-label">
              Hotel Distance
            </label>
            <input
              type="text"
              name="hoteldistance"
              id="hoteldistance"
              className="custom-input"
              placeholder="Enter Hotel Distance"
              {...register('hoteldistance')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.hoteldistance?.message}
            </span>
          </div>
          {/* Star */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="hotelstar" className="custom-label">
              Star
            </label>
            <input
              type="number"
              min={0}
              max={5}
              name="star"
              id="star"
              className="custom-input"
              placeholder="Enter Star"
              {...register('star')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.star?.message}
            </span>
          </div>
        </div>

        <div className="flex mt-10 flex-col gap-5 md:flex-row items-center w-full">
          {/* Double Price */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="doubleprice" className="custom-label">
              Double Price
            </label>
            <input
              type="number"
              name="doubleprice"
              min="0"
              id="doubleprice"
              className="custom-input"
              placeholder="Enter Double Price"
              {...register('doubleprice')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.doubleprice?.message}
            </span>
          </div>
          {/* Triple Price */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="tripleprice" className="custom-label">
              Triple Price
            </label>
            <input
              type="number"
              name="tripleprice"
              min="0"
              id="tripleprice"
              className="custom-input"
              placeholder="Enter Triple Price"
              {...register('tripleprice')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.tripleprice?.message}
            </span>
          </div>
        </div>

        <div className="flex mt-10 flex-col gap-5 md:flex-row items-center w-full">
          {/* Quint Price */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="quintprice" className="custom-label">
              Quint Price
            </label>
            <input
              type="number"
              name="quintprice"
              min="0"
              id="packagename"
              className="custom-input"
              placeholder="Enter Quint Price"
              {...register('quintprice')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.quintprice?.message}
            </span>
          </div>
          {/* Quad Price */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="quadprice" className="custom-label">
              Quad Price
            </label>
            <input
              type="number"
              name="quadprice"
              min="0"
              id="quadprice"
              className="custom-input"
              placeholder="Enter Quad Price"
              {...register('quadprice')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.quadprice?.message}
            </span>
          </div>
        </div>
      </div>

      {/* inclusions & exclusions , terms , policy , conditions...... */}

      <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <label htmlFor="amenities" className="custom-label">
          Amenities
        </label>
        <div className="flex flex-wrap mt-5 justify-start w-full">
          {amenities.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name=""
                  value={val}
                  onChange={(e) => handleAmenities(e.target.value, index)}
                  id="amenities"
                  className="w-10/12 mb-5 custom-input"
                  placeholder={`Amenity ${index + 1}`}
                  required={index > 0}
                />
                {index === 0 ? null : (
                  <X
                    className="absolute top-[10px] right-7 md:right-0 lg:right-6 xl:right-8 cursor-pointer"
                    onClick={() => removeAmenities(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-0 md:top-2 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
          onClick={addAmenities}
        >
          <Plus />
          Add Amenities
        </div>
      </div>

      {/* Booking Terms  */}
      <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <label htmlFor="bookingterms" className="custom-label">
          Booking Terms
        </label>
        <div className="flex flex-wrap mt-16 md:mt-5 justify-start w-full">
          {bookingterms.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name="bookingterms"
                  value={val}
                  onChange={(e) => handleBookingTerms(e.target.value, index)}
                  id="bookingterms"
                  className="w-10/12 mb-5 custom-input"
                  placeholder={`Booking Term ${index + 1}`}
                  required={index > 0}
                />
                {index === 0 ? null : (
                  <X
                    className="absolute top-[10px] right-7 md:right-0 lg:right-6 xl:right-8 cursor-pointer"
                    onClick={() => removeBookingTerms(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-10 md:top-4 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
          onClick={addBookingTerms}
        >
          <Plus />
          Add Booking Terms
        </div>
      </div>

      {/* Terms & Condition  */}
      <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <label htmlFor="termcondition" className="custom-label">
          Terms & Condition
        </label>
        <div className="flex flex-wrap mt-16 md:mt-5 justify-start w-full">
          {termcondition.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name="termcondition"
                  value={val}
                  onChange={(e) => handleTermsCondition(e.target.value, index)}
                  id="termcondition"
                  className="w-10/12 mb-5 custom-input"
                  placeholder={`Term & Condition ${index + 1}`}
                  required={index > 0}
                />
                {index === 0 ? null : (
                  <X
                    className="absolute top-[10px] right-7 md:right-0 lg:right-6 xl:right-8 cursor-pointer"
                    onClick={() => removeTerms(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute  top-10 md:top-4 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
          onClick={addTermsCondition}
        >
          <Plus />
          Add Terms & Condition
        </div>
      </div>

      {/* Cancellation Policy  */}
      <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <label htmlFor="cancellationpolicy" className="custom-label">
          Cancellation Policy
        </label>
        <div className="flex flex-wrap mt-16 md:mt-5 justify-start w-full">
          {cancelpolicy.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name="cancellationpolicy"
                  value={val}
                  onChange={(e) => handlePolicy(e.target.value, index)}
                  id="bookingterms"
                  className="w-10/12 mb-5 custom-input"
                  placeholder={`Cancellation Policy ${index + 1}`}
                  required={index > 0}
                />
                {index === 0 ? null : (
                  <X
                    className="absolute top-[10px] right-7 md:right-0 lg:right-6 xl:right-8 cursor-pointer"
                    onClick={() => removePolicy(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute  top-10 md:top-4 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
          onClick={addPolicy}
        >
          <Plus />
          Add Cancellation Policy
        </div>
      </div>
      {/* Form Buttons  */}

      <div className="mt-10 w-full lg:w-2/3 mx-auto flex gap-5 lg:gap-60 items-center justify-center">
        <NavLink
          to="/admin/umrahpackages"
          onClick={() => localStorage.clear()}
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
        >
          Back
        </NavLink>
        <button
          type="submit"
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default CreateHotelForm;
