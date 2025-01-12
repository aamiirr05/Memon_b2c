/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { Plus, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthContext } from '../../context';
import useFormData from '../../hooks/customhooks';

const schema = yup.object().shape({
  packagename: yup.string().required('Package Name is required'),
  packagetype: yup.string().required('Package Type is required'),
  packagedesc: yup.string().required('Package Description is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  transportmode: yup.string().required('Transport Mode is required'),
  arrivalcity: yup.string().required('Arrival City is required'),
  hotelname: yup.string().required('Hotel Name is required'),
  departurecity: yup.string().required('Departure City is required'),
  bookingdeadline: yup.string().required('Booking Deadline is required.'),
  totaldays: yup
    .number()
    .typeError('Total Days must be a number')
    .required('Total Days is required')
    .min(1, 'Total Days must be at least 1'),
  baseprice: yup
    .number()
    .typeError('Base Price must be a number')
    .required('Base Price is required')
    .min(1, 'Base Price must be at least 1'),
  discount: yup
    .number()
    .typeError('Discount must be a number')
    .required('Discount is required')
    .min(1, 'Discount must be at least 1'),
  totalnights: yup
    .number()
    .typeError('Total Nights must be a number')
    .required('Total Nights is required')
    .min(1, 'Total Nights must be at least 1'),
});

const CreateHolidayForm = () => {
  const [groupDates, setGroupDate] = useState(['']);
  const [inclusion, setInclusion] = useState(['']);
  const [exclusion, setExclusion] = useState(['']);
  const [bookingterms, setBookingTerms] = useState(['']);
  const [cancelpolicy, setCancelPolicy] = useState(['']);
  const [termcondition, setTermCondition] = useState(['']);
  const [Itenaries, setItenaries] = useState([{ day: 'Day 1', itenary: '' }]);

  // Is active and is featured states & functions
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const handleisActive = () => {
    setIsActive(!isActive);
  };
  const handleisFeatured = () => {
    setIsFeatured(!isFeatured);
  };

  // navigate
  const navigate = useNavigate();

  // Context States
  const { packageData, updatePackageData } = useContext(AuthContext);

  // useForm

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      groupDates: groupDates,
      isactive: isActive,
      isfeatured: isFeatured,
      itenaries: Itenaries,
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

  const addItenaries = () => {
    const nextday = `Day ${Itenaries.length + 1}`;
    setItenaries([...Itenaries, { day: nextday, itenary: '' }]);
  };

  const handleItenaries = (val, index) => {
    const updatedItenaries = [...Itenaries];
    updatedItenaries[index].itenary = val;
    setItenaries(updatedItenaries);
  };

  const removeItenaries = (index) => {
    const updatedItenaries = Itenaries.filter((_, i) => i !== index);
    const reassignedItenaries = updatedItenaries.map((itenary, i) => ({
      ...itenary,
      day: `Day ${i + 1}`,
    }));

    setItenaries(reassignedItenaries);
  };
  // Functions for handling inclusions and exclusions

  const addInclusion = () => {
    setInclusion([...inclusion, '']);
  };

  const handleInclusion = (val, index) => {
    const updatedInclusions = [...inclusion];
    updatedInclusions[index] = val;
    setInclusion(updatedInclusions);
  };

  const removeInclusion = (index) => {
    const updatedInclusions = inclusion.filter((_, i) => i !== index);
    setInclusion(updatedInclusions);
  };
  const addExclusion = () => {
    setExclusion([...exclusion, '']);
  };

  const handleExclusion = (val, index) => {
    const updatedExclusions = [...exclusion];
    updatedExclusions[index] = val;
    setExclusion(updatedExclusions);
  };

  const removeExclusion = (index) => {
    const updatedExclusions = exclusion.filter((_, i) => i !== index);
    setExclusion(updatedExclusions);
  };

  //  Functions for booking terms

  const addBookingTerms = () => {
    setBookingTerms([...bookingterms, '']);
  };

  const handleBookingTerms = (val, index) => {
    const updatedTerms = [...bookingterms];
    updatedTerms[index] = val;
    setBookingTerms(updatedTerms);
  };

  const removeBookingTerms = (index) => {
    const updatedTerms = bookingterms.filter((_, i) => i !== index);
    setBookingTerms(updatedTerms);
  };

  // Functions for termcondition and cancellation policy

  const addTermsCondition = () => {
    setTermCondition([...termcondition, '']);
  };
  const addPolicy = () => {
    setCancelPolicy([...cancelpolicy, '']);
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

  const removePolicy = (index) => {
    const updatedPolicy = cancelpolicy.filter((_, i) => i !== index);
    setCancelPolicy(updatedPolicy);
  };

  //

  const { getFormData, resetFormData, updateFormData } = useFormData();

  // Functions for form submission
  const onFormSubmit = (data) => {
    console.log('Form submitted');
    updatePackageData(data);

    // navigate('/admin/umrahpackages/createpackage-images');
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
                  value={date}
                  onChange={(e) => handleDateChange(e.target.value, index)}
                  id="packagename"
                  className="w-9/12 mb-5 custom-input"
                  required={index > 0}
                />
                {index === 0 ? null : (
                  <X
                    className="absolute top-2 right-7 md:right-24 lg:right-8 xl:right-16  cursor-pointer"
                    onClick={() => removeDates(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-0 md:top-3 right-4 md:right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
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
            className="w-full lg:w-1/4 custom-input"
            {...register('bookingdeadline')}
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
              {...register('totalnights')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.totalnights?.message}
            </span>
          </div>
        </div>
        {/* Country and  City */}
        <div className="flex flex-col mt-5 gap-5 md:flex-row items-center w-full">
          {/* Country */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="country" className="custom-label">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              className="custom-input"
              placeholder="Enter Country"
              {...register('country')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.country?.message}
            </span>
          </div>
          {/*  City */}
          <div className="flex gap-3 w-full flex-col">
            <label htmlFor="city" className="custom-label">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="custom-input"
              placeholder="Enter City"
              {...register('city')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.city?.message}
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
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.arrivalcity?.message}
            </span>
          </div>
          {/* Dept City */}
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
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.departurecity?.message}
            </span>
          </div>
        </div>
        {/* Transport Mode and Hotel Name */}
        <div className="flex flex-col mt-5 gap-5 md:flex-row items-center w-full">
          {/* Hotel Name */}
          <div className="flex gap-3 w-full flex-col">
            <label htmlFor="hotelname" className="custom-label">
              Hotel Name
            </label>
            <input
              type="text"
              name="hotelname"
              id="hotelname"
              className="custom-input"
              placeholder="Enter Hotel Name"
              {...register('hotelname')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.hotelname?.message}
            </span>
          </div>
          {/* Transport Mode */}
          <div className="flex gap-3 w-full flex-col">
            <label htmlFor="transportmode" className="custom-label">
              Transport Mode
            </label>
            <input
              type="text"
              name="transportmode"
              id="transportmode"
              className="custom-input"
              placeholder="Enter Transport Mode"
              {...register('transportmode')}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.transportmode?.message}
            </span>
          </div>
        </div>
      </div>

      {/*  */}

      {/* Section four for itenaries ,  */}

      <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <label htmlFor="itenaries" className="custom-label">
          Itenaries
        </label>
        <div className="w-full mt-20 md:mt-10 flex flex-col gap-10">
          {Itenaries.map((val, index) => (
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
                  onClick={() => removeItenaries(index)}
                />
              )}
              <input
                type="text"
                className="custom-input w-full md:w-9/12"
                placeholder={`Itinerary for ${val.day}`}
                value={val.itinerary}
                onChange={(e) => handleItenaries(e.target.value, index)}
              />
            </div>
          ))}
        </div>
        <div
          className="absolute top-0 md:top-2 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
          onClick={addItenaries}
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
        <div className="flex flex-wrap mt-10 md:mt-5 justify-start w-full">
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
                    className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                    onClick={() => removeInclusion(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-0 md:top-3 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
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
                    className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                    onClick={() => removeExclusion(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-0 md:top-3 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
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
                    className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                    onClick={() => removeBookingTerms(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-8 md:top-4 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
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
                    className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                    onClick={() => removeTerms(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-10 md:top-4 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
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
                    className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                    onClick={() => removePolicy(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-10 md:top-4 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
          onClick={addPolicy}
        >
          <Plus />
          Add Cancellation Policy
        </div>
      </div>
      {/* Form Buttons  */}

      <div className="mt-10 w-full lg:w-2/3 mx-auto flex gap-5 lg:gap-60 items-center justify-center">
        <NavLink
          to="/admin/holidays"
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

export default CreateHolidayForm;
