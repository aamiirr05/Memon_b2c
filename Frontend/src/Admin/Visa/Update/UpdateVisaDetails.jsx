/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../../lib/axios';
import VisaSchema from '../../schema/VisaSchema';
import useVisaStore from '../../store/Visa/useVisaStore';
import { useEffect } from 'react';

const UpdateVisaDetails = () => {
  const { extractedPackages } = useOutletContext();
  const { updateid } = useParams();
  const {
    setIsCreating,
    termcondition,
    setTermCondition,
    bookingterms,
    setBookingTerms,
    cancelpolicy,
    setCancelPolicy,
    basicReq,
    setBasicReq,
    docReq,
    setdocReq,
    addBookingTerms,
    removeBookingTerms,
    addTermsCondition,
    removeTermsCondition,
    addPolicy,
    removePolicy,
    addBasicReq,
    removeBasicReq,
    addDocReq,
    removeDocReq,
    updateBasicReq,
    updateDocReq,
    updateCancelPolicy,
    updateBookingTerms,
    updateTermCondition,
  } = useVisaStore();
  const { getPackages } = useOutletContext();

  useEffect(() => {
    if (extractedPackages?.booking_terms)
      updateBookingTerms(extractedPackages.booking_terms);

    if (extractedPackages?.cancellation_policy)
      updateCancelPolicy(extractedPackages.cancellation_policy);

    if (extractedPackages?.term_condition)
      updateTermCondition(extractedPackages.term_condition);

    if (extractedPackages?.document_requirement)
      updateDocReq(extractedPackages?.document_requirement);

    if (extractedPackages?.basic_requirement)
      updateBasicReq(extractedPackages?.basic_requirement);
  }, [
    extractedPackages,
    updateBookingTerms,
    updateDocReq,
    updateTermCondition,
    updateCancelPolicy,
    updateBasicReq,
  ]);

  // navigate
  const navigate = useNavigate();

  // Context States

  // useForm

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VisaSchema),
    values: {
      documentrequirements: docReq,
      basicrequirement: basicReq,
      cancellationpolicy: cancelpolicy,
      bookingterms: bookingterms,
      termcondition: termcondition,
    },
  });

  // Functions for handling inclusions and exclusions

  const handleDocReq = (val, index) => {
    const updatedDocReq = [...docReq];
    updatedDocReq[index] = val;
    setdocReq(updatedDocReq);
  };

  const handleBasicReq = (val, index) => {
    const updatedBasicReq = [...basicReq];
    updatedBasicReq[index] = val;
    setBasicReq(updatedBasicReq);
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

  //
  // Functions for form submission
  const onFormSubmit = async (data) => {
    const formData = new FormData();

    formData.append('visacountry', data.visacountry);
    formData.append('visatype', data.visatype);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('stayperiod', data.stayperiod);
    formData.append('validity', data.validity);
    formData.append('processingtime', data.processingtime);
    formData.append('entry', data.entry);
    docReq.forEach((item, index) => {
      formData.append(`documentrequirement[${index}]`, item);
    }),
      basicReq.forEach((item, index) => {
        formData.append(`basicrequirement[${index}]`, item);
      });

    termcondition.forEach((item, index) => {
      formData.append(`termcondition[${index}]`, item);
    });

    bookingterms.forEach((item, index) => {
      formData.append(`bookingterms[${index}]`, item);
    });

    cancelpolicy.forEach((item, index) => {
      formData.append(`cancellationpolicy[${index}]`, item);
    });

    const loadingToast = toast.loading(
      'Creating package. This may take some time...',
      {
        icon: (
          <div className="relative w-10 h-10">
            <div className="absolute w-5 h-5 border-4 top-0 animate-spin mx-4 border-peach border-l-darkgreen rounded-full"></div>
          </div>
        ),
        className: 'text-center flex item-center',
      }
    );
    try {
      const res = await axiosInstance.put(
        `admin/visa/update-visa-details/${updateid}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      toast.dismiss(loadingToast);
      toast.success('Package updated successfully!');
      getPackages.refresh();
      navigate('/admin/visa');
    } catch (error) {
      const errMsg = error?.response?.data.message || 'An error occurred.';
      toast.dismiss(loadingToast);
      toast.error(errMsg);
    }
    reset();
  };

  return (
    <>
      <form
        action=""
        className="w-full h-full"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <h1 className="text-3xl font-zodiak mb-5 pl-2">Update Visa Form</h1>

        {/* Section One */}
        <div className="w-full bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row items-center w-full">
            {/* Visa Country */}
            <div className="flex gap-3  w-full flex-col">
              <label htmlFor="visacountry" className="custom-label">
                Visa Country
              </label>
              <input
                type="text"
                name="visacountry"
                id="visacountry"
                className="custom-input"
                placeholder="Enter Visa Country"
                defaultValue={extractedPackages?.visa_country}
                {...register('visacountry')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.visacountry?.message}
              </span>
            </div>
            {/* Visa Type */}
            <div className="flex gap-3 w-full flex-col">
              <label htmlFor="visatype" className="custom-label">
                Visa Type
              </label>
              <input
                type="text"
                name="visatype"
                id="visatype"
                className="custom-input"
                placeholder="Enter Visa Type"
                defaultValue={extractedPackages?.visa_type}
                {...register('visatype')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.visatype?.message}
              </span>
            </div>
          </div>
          {/* Textbox for desc */}

          <div className="flex mt-5 gap-3 w-full flex-col">
            <label htmlFor="packagetype" className="custom-label">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              cols="40"
              rows="5"
              className="w-full custom-input"
              placeholder="Enter Description"
              defaultValue={extractedPackages?.description}
              {...register('description')}
            ></textarea>
            <span className="text-sm text-red-600 my-2">
              {errors?.description?.message}
            </span>
          </div>

          {/*  Price and Validity */}
          <div className="flex mt-5 flex-col gap-5 lg:flex-row items-center w-full">
            {/*  Price */}
            <div className="flex gap-3  w-full flex-col">
              <label htmlFor="price" className="custom-label">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                min={0}
                className="custom-input"
                placeholder="Enter Price"
                defaultValue={extractedPackages?.price}
                {...register('price')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.price?.message}
              </span>
            </div>
            {/* Stay Period */}
            <div className="flex gap-3  w-full flex-col">
              <label htmlFor="stayperiod" className="custom-label">
                Stay Period
              </label>
              <input
                type="number"
                name="stayperiod"
                id="stayperiod"
                min={0}
                className="custom-input"
                placeholder="Enter Stay Period"
                defaultValue={extractedPackages?.stay_period}
                {...register('stayperiod')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.stayperiod?.message}
              </span>
            </div>
            {/* Validity */}
            <div className="flex gap-3 w-full flex-col">
              <label htmlFor="validity" className="custom-label">
                Validity
              </label>
              <input
                type="text"
                name="validity"
                id="validity"
                min="0"
                defaultValue={extractedPackages?.validity}
                className="custom-input"
                placeholder="Enter Visa Validity"
                {...register('validity')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.validity?.message}
              </span>
            </div>
          </div>

          {/* Processing Time and Entry */}

          <div className="flex flex-col gap-5 md:flex-row items-center w-full">
            {/* Processing Time */}
            <div className="flex gap-3  w-full flex-col">
              <label htmlFor="visacountry" className="custom-label">
                Processing Time
              </label>
              <input
                type="text"
                name="processingtime"
                id="processingtime"
                className="custom-input"
                placeholder="Enter Processing Time"
                defaultValue={extractedPackages?.processing_time}
                {...register('processingtime')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.processingtime?.message}
              </span>
            </div>
            {/* Entry */}
            <div className="flex gap-3 w-full flex-col">
              <label htmlFor="entry" className="custom-label">
                Entry
              </label>
              <input
                type="text"
                name="entry"
                id="entry"
                className="custom-input"
                placeholder="Enter Entry"
                defaultValue={extractedPackages?.entry}
                {...register('entry')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.entry?.message}
              </span>
            </div>
          </div>
        </div>

        {/* document req  & basic req  , terms , policy , conditions...... */}

        <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
          <label htmlFor="documentrequirement" className="custom-label">
            Document Requirements
          </label>
          <div className="flex flex-wrap mt-10 md:mt-5 justify-start w-full">
            {docReq.map((val, index) => {
              return (
                <div className="w-full relative" key={index}>
                  <input
                    type="text"
                    name=""
                    value={val}
                    onChange={(e) => handleDocReq(e.target.value, index)}
                    id="documentrequirement"
                    className="w-10/12 mb-5 custom-input"
                    placeholder={`Document Requirement ${index + 1}`}
                    required={index > 0}
                  />
                  {index === 0 ? null : (
                    <X
                      className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                      onClick={() => removeDocReq(index)}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            className="absolute top-0 md:top-3 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
            onClick={addDocReq}
          >
            <Plus />
            Add Document Req
          </div>
        </div>

        {/* Basic Req */}
        <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
          <label htmlFor="basicrequirement" className="custom-label">
            Basic Requirements
          </label>
          <div className="flex flex-wrap mt-5 justify-start w-full">
            {basicReq.map((val, index) => {
              return (
                <div className="w-full relative" key={index}>
                  <input
                    type="text"
                    name="basicrequirement"
                    value={val}
                    onChange={(e) => handleBasicReq(e.target.value, index)}
                    id="basicrequirement"
                    className="w-10/12 mb-5 custom-input"
                    placeholder={`Basic Requirement ${index + 1}`}
                    required={index > 0}
                  />
                  {index === 0 ? null : (
                    <X
                      className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                      onClick={() => removeBasicReq(index)}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            className="absolute top-0 md:top-3 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
            onClick={addBasicReq}
          >
            <Plus />
            Add Basic Req
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
                    onChange={(e) =>
                      handleTermsCondition(e.target.value, index)
                    }
                    id="termcondition"
                    className="w-10/12 mb-5 custom-input"
                    placeholder={`Term & Condition ${index + 1}`}
                    required={index > 0}
                  />
                  {index === 0 ? null : (
                    <X
                      className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                      onClick={() => removeTermsCondition(index)}
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

        {/*  */}

        {/* Form Buttons  */}

        <div className="mt-10 w-full lg:w-2/3 mx-auto flex gap-5 lg:gap-60 items-center justify-center">
          <NavLink
            to="/admin/visa"
            className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
          >
            Back
          </NavLink>
          <button
            type="submit"
            className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
          >
            Create Visa
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateVisaDetails;
