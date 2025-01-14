/* eslint-disable no-unused-vars */
import { ChevronDown, Plus, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/context';
import umrahSchema from '../schema/UmrahSchema';
import useCreateUmrahStore from '../store/Umrah/useCreateUmrahStore';

const CreatePackagesForm = () => {
  const [previewData] = useState(() => {
    const packageImage =
      JSON.parse(localStorage.getItem('packageimages')) || {};
    const packageDetails =
      JSON.parse(localStorage.getItem('packagedetails')) || {};
    return { packageImage, packageDetails };
  });
  const [groupDates, setGroupDate] = useState(
    previewData?.packageDetails.groupDates || ['']
  );

  const {
    inclusion,
    setInclusion,
    addInclusion,
    removeInclusion,
    exclusion,
    setExclusion,
    addExclusion,
    removeExclusion,
    bookingterms,
    setBookingTerms,
    removeBookingTerms,
    addBookingTerms,
    cancelpolicy,
    setCancelPolicy,
    addPolicy,
    removePolicy,
    termcondition,
    setTermCondition,
    addTermsCondition,
    removeTermsCondition,
    meccaitenaries,
    setMeccaItenaries,
    addMeccaItenaries,
    removeMeccaItenaries,
    madinaitenaries,
    setMadinaItenaries,
    removeMadinaItenaries,
    addMadinaItenaries,
  } = useCreateUmrahStore();

  // Is active and is featured states & functions
  const [isActive, setIsActive] = useState(
    previewData?.packageDetails.isactive || true
  );
  const [isFeatured, setIsFeatured] = useState(
    previewData?.packageDetails.isfeatured || false
  );

  const handleisActive = () => {
    setIsActive(!isActive);
  };
  const handleisFeatured = () => {
    setIsFeatured(!isFeatured);
  };

  // navigate
  const navigate = useNavigate();

  // Context States
  const { updatePackageData } = useContext(AuthContext);

  // useForm

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(umrahSchema),
    values: {
      groupDates: groupDates,
      isactive: isActive,
      isfeatured: isFeatured,
      meccaitenaries: meccaitenaries,
      madinaitenaries: madinaitenaries,
      cancellationpolicy: cancelpolicy,
      bookingterms: bookingterms,
      termcondition: termcondition,
      inclusion: inclusion,
      exclusion: exclusion,
    },
  });

  // Functions for handling dates
  const addDates = () => {
    setGroupDate([...groupDates, '']);
  };

  const handleDateChange = (val, index) => {
    const updatedDates = [...groupDates];
    updatedDates[index] = val;
    setGroupDate(updatedDates);
  };

  const removeDates = (index) => {
    const updatedDates = groupDates.filter((_, i) => i !== index);
    setGroupDate(updatedDates);
  };

  // Functions for handling itenaries

  const handleMeccaItenaries = (val, index) => {
    const updatedItenaries = [...meccaitenaries];
    updatedItenaries[index].itenary = val;
    setMeccaItenaries(updatedItenaries);
  };

  const handleMadinaItenaries = (val, index) => {
    const updatedItenaries = [...madinaitenaries];
    updatedItenaries[index].itenary = val;
    setMadinaItenaries(updatedItenaries);
  };

  // Functions for handling inclusions and exclusions

  const handleInclusion = (val, index) => {
    const updatedInclusions = [...inclusion];
    updatedInclusions[index] = val;
    setInclusion(updatedInclusions);
  };

  const handleExclusion = (val, index) => {
    const updatedExclusions = [...exclusion];
    updatedExclusions[index] = val;
    setExclusion(updatedExclusions);
  };

  //  Functions for booking terms

  const handleBookingTerms = (val, index) => {
    const updatedTerms = [...bookingterms];
    updatedTerms[index] = val;
    setBookingTerms(updatedTerms);
  };

  // Functions for termcondition and cancellation policy

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

  // Functions for form submission
  const onFormSubmit = (data) => {
    updatePackageData(data);
    navigate('/admin/umrahpackages/createpackage-images');
    reset();
  };

  return (
    <form
      action=""
      className="w-full h-full"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      {/* Section One */}
      <div className="w-full bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <div className="flex flex-col gap-5 md:flex-row items-center w-full">
          {/* Package Name */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="packagename" className="custom-label">
              Package Name
            </label>
            <input
              type="text"
              name="packagename"
              id="packagename"
              className="custom-input"
              placeholder="Enter Package Name"
              defaultValue={previewData?.packageDetails.packagename}
              {...register('packagename')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.packagename?.message}
            </span>
          </div>
          {/* Package Type */}
          <div className="flex gap-3 w-full flex-col">
            <label htmlFor="packagetype" className="custom-label">
              Package Type
            </label>
            <input
              type="text"
              name="packagetype"
              id="packagetype"
              className="custom-input"
              placeholder="Enter Package Type"
              defaultValue={previewData?.packageDetails.packagetype}
              {...register('packagetype')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.packagetype?.message}
            </span>
          </div>
        </div>
        {/* Textbox for desc */}

        <div className="flex mt-5 gap-3 w-full flex-col">
          <label htmlFor="packagetype" className="custom-label">
            Package Description
          </label>
          <textarea
            name="packagedesc"
            id=""
            cols="40"
            rows="5"
            className="w-full custom-input"
            placeholder="Enter Package Description"
            {...register('packagedesc')}
            defaultValue={previewData?.packageDetails.packagedesc}
          ></textarea>
          <span className="text-sm text-red-600 my-2">
            {errors?.packagedesc?.message}
          </span>
        </div>

        {/* Base Price and Discount */}
        <div className="flex mt-5 flex-col gap-5 md:flex-row items-center w-full">
          {/* Base Price */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="baseprice" className="custom-label">
              Base Price
            </label>
            <input
              type="number"
              name="baseprice"
              id="baseprice"
              min={0}
              className="custom-input"
              placeholder="Enter Base Price"
              {...register('baseprice')}
              defaultValue={previewData?.packageDetails.baseprice}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.baseprice?.message}
            </span>
          </div>
          {/* Discount */}
          <div className="flex gap-3 w-full flex-col">
            <label htmlFor="discount" className="custom-label">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              min="0"
              className="custom-input"
              placeholder="Enter  Discount"
              defaultValue={previewData?.packageDetails.discount}
              {...register('discount')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.discount?.message}
            </span>
          </div>
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

      {/* Section Two for Date and days */}
      <div className="relative w-full mt-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <label htmlFor="groupdates" className="custom-label">
          Group Dates
        </label>
        <div className="flex flex-wrap mt-10 md:mt-5 justify-start w-full">
          {groupDates.map((date, index) => {
            return (
              <div className="w-full lg:w-1/3 relative" key={index}>
                <input
                  type="date"
                  name=""
                  defaultValue={date}
                  onChange={(e) => handleDateChange(e.target.value, index)}
                  id="packagename"
                  className="w-9/12 mb-5 custom-input"
                  required={index > 0}
                />
                {index === 0 ? null : (
                  <X
                    className="absolute top-[10px] right-7 md:right-0 lg:right-6 xl:right-8 cursor-pointer"
                    onClick={() => removeDates(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-0 md:top-2 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
          onClick={addDates}
        >
          <Plus />
          Add Dates
        </div>

        <div className="mt-10 w-full flex flex-col gap-3">
          <label htmlFor="booking-deadline" className="custom-label">
            Booking Deadline
          </label>
          <input
            type="date"
            name="bookingdeadline"
            id="bookingdeadline"
            className="w-full lg:w-1/3 custom-input"
            {...register('bookingdeadline')}
            defaultValue={previewData?.packageDetails.bookingdeadline}
          />
          <span className="text-sm text-red-600 my-2">
            {errors?.bookingdeadline?.message}
          </span>
        </div>

        {/* Total Days and Nights  */}
        <div className="flex mt-5 flex-col gap-5 md:flex-row items-center w-full">
          {/* Total days */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="totaldays" className="custom-label">
              Total Days
            </label>
            <input
              type="number"
              name="totaldays"
              min="0"
              id="totaldays"
              className="custom-input"
              placeholder="Enter Total Days"
              {...register('totaldays')}
              defaultValue={previewData?.packageDetails.totaldays}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.totaldays?.message}
            </span>
          </div>
          {/* Total nights */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="totalnights" className="custom-label">
              Total Nights
            </label>
            <input
              type="number"
              name="totalnights"
              min="0"
              id="totalnights"
              className="custom-input"
              placeholder="Enter Total Nights"
              defaultValue={previewData?.packageDetails.totalnights}
              {...register('totalnights')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.totalnights?.message}
            </span>
          </div>
        </div>
        {/* Arrival City and Dept City */}
        <div className="flex flex-col mt-5 gap-5 md:flex-row items-center w-full">
          {/* Arrival City */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="packagename" className="custom-label">
              Arrival City
            </label>
            <input
              type="text"
              name="arrivalcity"
              id="arrivalcity"
              className="custom-input"
              placeholder="Enter Arrival City"
              {...register('arrivalcity')}
              defaultValue={previewData?.packageDetails.arrivalcity}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.packagename?.message}
            </span>
          </div>
          {/* Package Type */}
          <div className="flex gap-3 w-full flex-col">
            <label htmlFor="packagetype" className="custom-label">
              Departure City
            </label>
            <input
              type="text"
              name="departurecity"
              id="departurecity"
              className="custom-input"
              placeholder="Enter  Departure City"
              {...register('departurecity')}
              defaultValue={previewData?.packageDetails.departurecity}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.packagetype?.message}
            </span>
          </div>
        </div>
      </div>

      {/*  */}

      {/* Section Three For Hotels */}
      <div className="w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <div className="flex flex-col gap-5 md:flex-row items-center w-full">
          {/* Mecca Hotel Name */}
          <div className="w-full relative mt-10 flex flex-col gap-2">
            <label htmlFor="meccahotelname" className="custom-label">
              Makkah Hotel Name
            </label>

            <input
              type="text"
              name="meccahotelname"
              id="meccahotelname"
              className="custom-input"
              placeholder="Enter Mecca Hotel"
              {...register('meccahotelname')}
              defaultValue={previewData?.packageDetails.meccahotelname}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.meccahotelname?.message}
            </span>
          </div>
          {/* Madina Hotel Name */}
          <div className="w-full relative mt-10 flex flex-col gap-2">
            <label htmlFor="madinahotelname" className="custom-label">
              Madina Hotel Name
            </label>
            <input
              type="text"
              name="madinahotelname"
              id="madinahotelname"
              className="custom-input"
              placeholder="Enter Madina Hotel"
              {...register('madinahotelname')}
              defaultValue={previewData?.packageDetails.madinahotelname}
            />

            <span className="text-sm text-red-600 my-2">
              {errors?.madinahotelname?.message}
            </span>
          </div>
        </div>
        {/* Price Section for hotels*/}

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
              defaultValue={previewData?.packageDetails.doubleprice}
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
              defaultValue={previewData?.packageDetails.tripleprice}
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
              defaultValue={previewData?.packageDetails.quintprice}
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
              defaultValue={previewData?.packageDetails.quadprice}
              {...register('quadprice')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.quadprice?.message}
            </span>
          </div>
        </div>

        <div className="flex mt-10 flex-col gap-5 md:flex-row items-center w-full">
          {/* Child Without Bed Price */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="quintprice" className="custom-label">
              Child Without Bed Price
            </label>
            <input
              type="number"
              name="childwithoutbedprice"
              min="0"
              id="packagename"
              className="custom-input"
              placeholder="Enter Child Without Bed Price"
              {...register('childwithoutbedprice')}
              defaultValue={previewData?.packageDetails.childwithoutbedprice}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.childwithoutbedprice?.message}
            </span>
          </div>
          {/* Infant Price */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="quadprice" className="custom-label">
              Infant Price
            </label>
            <input
              type="number"
              name="infantprice"
              min="0"
              id="infantprice"
              className="custom-input"
              placeholder="Enter Infant Price"
              defaultValue={previewData?.packageDetails.infantprice}
              {...register('infantprice')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.infantprice?.message}
            </span>
          </div>
        </div>
      </div>

      {/* Section four for itenaries ,  */}

      <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <label htmlFor="meccaitenaries" className="custom-label">
          Makkah Itenaries
        </label>
        <div className="w-full mt-16 md:mt-10 flex flex-col gap-10">
          {meccaitenaries.map((val, index) => (
            <div
              className="relative flex flex-col md:flex-row gap-5 w-full"
              key={index}
            >
              <input
                type="text"
                name="days"
                value={val.day}
                style={{ backgroundColor: '#386641', color: '#f2e8cf' }}
                disabled
                className="custom-input w-9/12 md:w-[15%] font-semibold text-center"
              />
              {!(index === 0) && (
                <X
                  className="absolute top-[10px] right-7 md:right-0 lg:right-6 xl:right-8 cursor-pointer"
                  onClick={() => removeMeccaItenaries(index)}
                />
              )}
              <input
                type="text"
                className="custom-input w-full md:w-9/12"
                placeholder={`Itinerary for ${val.day}`}
                value={val.itenary}
                onChange={(e) => handleMeccaItenaries(e.target.value, index)}
              />
            </div>
          ))}
        </div>
        <div
          className="absolute  top-10 md:top-4 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
          onClick={addMeccaItenaries}
        >
          <Plus />
          Add Itinerary
        </div>
      </div>

      {/* Madina Itenaries */}
      <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <label htmlFor="meccaitenaries" className="custom-label">
          Madina Itenaries
        </label>
        <div className="w-full mt-16 md:mt-10 flex flex-col gap-10">
          {madinaitenaries.map((val, index) => (
            <div
              className="relative flex flex-col md:flex-row gap-5 w-full"
              key={index}
            >
              <input
                type="text"
                name="days"
                value={val.day}
                disabled
                style={{ backgroundColor: '#386641', color: '#f2e8cf' }}
                className="custom-input w-9/12 md:w-[15%] font-semibold text-center"
              />
              {!(index === 0) && (
                <X
                  className="absolute top-[10px] right-7 md:right-0 lg:right-6 xl:right-8 cursor-pointer"
                  onClick={() => removeMadinaItenaries(index)}
                />
              )}
              <input
                type="text"
                className="custom-input w-full md:w-9/12"
                placeholder={`Itinerary for ${val.day}`}
                value={val.itenary}
                onChange={(e) => handleMadinaItenaries(e.target.value, index)}
              />
            </div>
          ))}
        </div>
        <div
          className="absolute  top-10 md:top-4 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
          onClick={addMadinaItenaries}
        >
          <Plus />
          Add Itinerary
        </div>
      </div>

      {/* inclusions & exclusions , terms , policy , conditions...... */}

      <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <label htmlFor="inclusion" className="custom-label">
          Inclusion
        </label>
        <div className="flex flex-wrap mt-5 justify-start w-full">
          {inclusion.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name=""
                  value={val}
                  onChange={(e) => handleInclusion(e.target.value, index)}
                  id="packagename"
                  className="w-10/12 mb-5 custom-input"
                  placeholder={`Inclusion ${index + 1}`}
                  required={index > 0}
                />
                {index === 0 ? null : (
                  <X
                    className="absolute top-[10px] right-7 md:right-0 lg:right-6 xl:right-8 cursor-pointer"
                    onClick={() => removeInclusion(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-0 md:top-2 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
          onClick={addInclusion}
        >
          <Plus />
          Add Inclusions
        </div>
      </div>

      {/* Exclusion */}
      <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <label htmlFor="exclusion" className="custom-label">
          Exclusion
        </label>
        <div className="flex flex-wrap mt-5 justify-start w-full">
          {exclusion.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name="exclusion"
                  value={val}
                  onChange={(e) => handleExclusion(e.target.value, index)}
                  id="packagename"
                  className="w-10/12 mb-5 custom-input"
                  placeholder={`Exclusion ${index + 1}`}
                  required={index > 0}
                />
                {index === 0 ? null : (
                  <X
                    className="absolute top-[10px] right-7 md:right-0 lg:right-6 xl:right-8 cursor-pointer"
                    onClick={() => removeExclusion(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-0 md:top-2 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
          onClick={addExclusion}
        >
          <Plus />
          Add Exclusions
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
                    onClick={() => removeTermsCondition(index)}
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
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
          onClick={() => {
            localStorage.removeItem('packagedetails');
            localStorage.removeItem('packageimages');
          }}
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

export default CreatePackagesForm;
