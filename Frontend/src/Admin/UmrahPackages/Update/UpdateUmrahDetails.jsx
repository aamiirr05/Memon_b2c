/* eslint-disable no-unused-vars */
import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import {
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import umrahSchema from '../../schema/UmrahSchema';
import axiosInstance from '../../../lib/axios';
import Loader from '../../../components/Loader';

const UpdateUmrahDetails = () => {
  const { umrahPackage, refreshPackages } = useOutletContext();
  const { updateid } = useParams();

  const [groupDates, setGroupDate] = useState(
    umrahPackage?.group_dates || ['']
  );
  const [inclusion, setInclusion] = useState(['']);
  const [exclusion, setExclusion] = useState(['']);
  const [bookingterms, setBookingTerms] = useState(['']);
  const [cancelpolicy, setCancelPolicy] = useState(['']);
  const [termcondition, setTermCondition] = useState(['']);

  const [meccaItenaries, setMeccaItenaries] = useState([]);
  const [madinaItenaries, setMadinaItenaries] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  // Is active and is featured states & functions
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  // useForm

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(umrahSchema),
    values: {
      groupDates: groupDates,
      isactive: isActive,
      isfeatured: isFeatured,
      meccaitenaries: meccaItenaries,
      madinaitenaries: madinaItenaries,
      cancellationpolicy: cancelpolicy,
      bookingterms: bookingterms,
      termcondition: termcondition,
      inclusion: inclusion,
      exclusion: exclusion,
    },
  });

  useEffect(() => {
    reset({
      groupDates,
      isactive: isActive,
      isfeatured: isFeatured,
      meccaitenaries: meccaItenaries,
      madinaitenaries: madinaItenaries,
      cancellationpolicy: cancelpolicy,
      bookingterms: bookingterms,
      termcondition: termcondition,
      inclusion: inclusion,
      exclusion: exclusion,
    });
  }, [
    groupDates,
    isActive,
    isFeatured,
    meccaItenaries,
    madinaItenaries,
    cancelpolicy,
    bookingterms,
    termcondition,
    inclusion,
    exclusion,
    reset,
  ]);

  useEffect(() => {
    if (umrahPackage?.is_active) setIsActive(umrahPackage.is_active === 'true');
    if (umrahPackage?.featured) setIsFeatured(umrahPackage.featured === 'true');

    if (umrahPackage?.makkah_itinerary) {
      setMeccaItenaries(umrahPackage.makkah_itinerary);
    }

    if (umrahPackage?.medina_itinerary) {
      setMadinaItenaries(umrahPackage.medina_itinerary);
    }

    if (umrahPackage?.group_dates) setGroupDate(umrahPackage?.group_dates);
    if (umrahPackage?.exclusion) {
      setExclusion(umrahPackage?.exclusion);
    }
    if (umrahPackage?.inclusion) {
      setInclusion(umrahPackage?.inclusion);
    }

    if (umrahPackage?.booking_terms)
      setBookingTerms(umrahPackage?.booking_terms);
    if (umrahPackage?.cancellation_policy)
      setCancelPolicy(umrahPackage?.cancellation_policy);

    if (umrahPackage?.term_condition)
      setTermCondition(umrahPackage?.term_condition);
  }, [umrahPackage, setValue]);

  const handleisActive = () => {
    setIsActive(!isActive);
  };
  const handleisFeatured = () => {
    setIsFeatured(!isFeatured);
  };

  // navigate
  const navigate = useNavigate();

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

  const addMeccaItenaries = () => {
    const nextday = `Day ${meccaItenaries.length + 1}`;
    setMeccaItenaries([...meccaItenaries, { day: nextday, activities: '' }]);
  };

  const addMadinaItenaries = () => {
    const nextday = `Day ${madinaItenaries.length + 1}`;
    setMadinaItenaries([...madinaItenaries, { day: nextday, activities: '' }]);
  };

  const handleMeccaItenaries = (val, index) => {
    const updatedItenaries = [...meccaItenaries];
    updatedItenaries[index].activities = val;
    setMeccaItenaries(updatedItenaries);
  };

  const handleMadinaItenaries = (val, index) => {
    const updatedItenaries = [...madinaItenaries];
    updatedItenaries[index].activities = val;
    setMadinaItenaries(updatedItenaries);
  };

  const removeMeccaItenaries = (index) => {
    const updatedItenaries = meccaItenaries.filter((_, i) => i !== index);
    const reassignedItenaries = updatedItenaries.map((itenary, i) => ({
      ...itenary,
      day: `Day ${i + 1}`,
    }));

    setMeccaItenaries(reassignedItenaries);
  };

  const removeMadinaItenaries = (index) => {
    const updatedItenaries = madinaItenaries.filter((_, i) => i !== index);
    const reassignedItenaries = updatedItenaries.map((itenary, i) => ({
      ...itenary,
      day: `Day ${i + 1}`,
    }));

    setMadinaItenaries(reassignedItenaries);
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

  // Functions for form submission
  const onFormSubmit = async (data) => {
    try {
      console.log(data);
      setIsLoading(true);
      const res = await axiosInstance.put(
        `/admin/packages/update-umrah-package/${updateid}`,
        {
          packagename: data.packagename,
          packagetype: data.packagename,
          description: data.packagedesc,
          makkahitinerary: data.meccaitenaries,
          medinaitinerary: data.madinaitenaries,
          inclusion: data.inclusion,
          exclusion: data.exclusion,
          groupdates: data.groupDates,
          bookingdeadline: data.bookingdeadline,
          totaldays: data.totaldays,
          totalnights: data.totalnights,
          makhotelname: data.meccahotelname,
          medhotelname: data.madinahotelname,
          cancellationpolicy: data.cancellationpolicy,
          termcondition: data.termcondition,
          bookingterms: data.bookingterms,
          departurecity: data.departurecity,
          arrivalcity: data.arrivalcity,
          isactive: data.isactive,
          featured: data.isfeatured,
          baseprice: data.baseprice,
          discount: data.discount,
          quintprice: data.quintprice,
          quadprice: data.quadprice,
          tripleprice: data.tripleprice,
          doubleprice: data.doubleprice,
          childwithoutbedprice: data.childwithoutbedprice,
          infantprice: data.infantprice,
          medhotelstar: data.medhotelstar,
          makhotelstar: data.makhotelstar,
          makhotellocation: data.makhotellocation,
          medhotellocation: data.medhotellocation,
        }
      );
      console.log(res);
      toast.success('Package updated successfully!');
      refreshPackages();
      navigate('/admin/umrahpackages');
    } catch (error) {
      console.error(error);
      const errMsg = error?.response?.data.message || 'An error occurred.';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
    reset();
  };

  if (!umrahPackage) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  }

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
              defaultValue={umrahPackage?.package_name}
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
              defaultValue={umrahPackage?.package_type}
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
            defaultValue={umrahPackage?.description}
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
              defaultValue={umrahPackage?.base_price}
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
              defaultValue={umrahPackage?.discount}
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
            defaultValue={umrahPackage?.booking_deadline}
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
              defaultValue={umrahPackage?.total_days}
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
              defaultValue={umrahPackage?.total_nights}
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
              defaultValue={umrahPackage?.arrival_city}
              {...register('arrivalcity')}
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
              defaultValue={umrahPackage?.departure_city}
              {...register('departurecity')}
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
              min="0"
              id="meccahotelname"
              className="custom-input"
              placeholder="Enter Mecca Hotel Name"
              defaultValue={umrahPackage?.mak_hotel_name}
              {...register('meccahotelname')}
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
              min="0"
              id="madinahotelname"
              className="custom-input"
              placeholder="Enter Madina Hotel Name"
              defaultValue={umrahPackage?.med_hotel_name}
              {...register('madinahotelname')}
            />

            <span className="text-sm text-red-600 my-2">
              {errors?.madinahotelname?.message}
            </span>
          </div>
        </div>

        {/* Hotel Star  */}

        <div className="flex flex-col gap-5 md:flex-row items-center w-full">
          {/* Mecca Hotel Name */}
          <div className="w-full relative mt-10 flex flex-col gap-2">
            <label htmlFor="makhotelstar" className="custom-label">
              Makkah Hotel Star
            </label>

            <input
              type="number"
              name="makhotelstar"
              id="makhotelstar"
              className="custom-input"
              min={0}
              max={5}
              placeholder="Enter Mecca Hotel Star"
              {...register('makhotelstar')}
              defaultValue={umrahPackage?.mak_hotel_star}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.makhotelstar?.message}
            </span>
          </div>
          {/* Madina Hotel Name */}
          <div className="w-full relative mt-10 flex flex-col gap-2">
            <label htmlFor="madinahotelname" className="custom-label">
              Madina Hotel Star
            </label>
            <input
              type="number"
              min={0}
              max={5}
              name="medhotelstar"
              id="medhotelstar"
              className="custom-input"
              placeholder="Enter Madina Hotel Star"
              {...register('medhotelstar')}
              defaultValue={umrahPackage?.med_hotel_star}
            />

            <span className="text-sm text-red-600 my-2">
              {errors?.medhotelstar?.message}
            </span>
          </div>
        </div>

        {/*  */}

        <div className="flex flex-col gap-5 md:flex-row items-center w-full">
          {/* Mecca Hotel Name */}
          <div className="w-full relative mt-10 flex flex-col gap-2">
            <label htmlFor="makhotellocation" className="custom-label">
              Makkah Hotel Location
            </label>

            <input
              type="text"
              name="makhotellocation"
              id="makhotellocation"
              className="custom-input"
              placeholder="Enter Mecca Hotel Location"
              {...register('makhotellocation')}
              defaultValue={umrahPackage?.mak_hotel_location}
            />
            <span className="text-sm text-red-600 my-2">
              {errors?.makhotellocation?.message}
            </span>
          </div>
          {/* Madina Hotel Name */}
          <div className="w-full relative mt-10 flex flex-col gap-2">
            <label htmlFor="madinahotellocation" className="custom-label">
              Madina Hotel Location
            </label>
            <input
              type="text"
              name="medhotellocation"
              id="medhotellocation"
              className="custom-input"
              placeholder="Enter Madina Hotel Location"
              {...register('medhotellocation')}
              defaultValue={umrahPackage?.med_hotel_location}
            />

            <span className="text-sm text-red-600 my-2">
              {errors?.medhotellocation?.message}
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
              defaultValue={umrahPackage?.prices[0].double_price}
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
              defaultValue={umrahPackage?.prices[0].triple_price}
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
              defaultValue={umrahPackage?.prices[0].quint_price}
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
              defaultValue={umrahPackage?.prices[0].quad_price}
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
              Child Without Bed
            </label>
            <input
              type="number"
              name="childwithoutbedprice"
              min="0"
              id="packagename"
              className="custom-input"
              placeholder="Enter Child Without Bed Price"
              defaultValue={umrahPackage?.prices[0].child_without_bed_price}
              {...register('childwithoutbedprice')}
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
              defaultValue={umrahPackage?.prices[0].infant_price}
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
          {meccaItenaries.map((val, index) => (
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
                value={val.activities}
                required
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
          {madinaItenaries.map((val, index) => (
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
                value={val.activities}
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
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
        >
          Back
        </NavLink>
        <button
          type="submit"
          className={`  w-full lg:w-1/3 p-2  rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center ${isloading ? 'bg-peach text-darkgreen border border-darkgreen' : 'bg-darkgreen text-peach'}`}
        >
          {isloading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  );
};

export default UpdateUmrahDetails;
