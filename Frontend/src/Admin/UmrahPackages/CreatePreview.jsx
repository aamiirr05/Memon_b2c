/* eslint-disable no-unused-vars */
import { ChevronDown, Plus, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import DragAndDrop from '../../Utils/DragAndDrop';
import { AuthContext } from '../../context/context';
import axiosInstance from '../../components/axios/AxiosInstance';

const CreatePreview = () => {
  const [previewData, setPreviewData] = useState(() => {
    const packageImage =
      JSON.parse(localStorage.getItem('packageimages')) || {};
    const packageDetails =
      JSON.parse(localStorage.getItem('packagedetails')) || {};
    return { packageImage, packageDetails };
  });
  console.log(previewData);

  // Appending all the data to form Data

  const formData = new FormData();

  formData.append('packagename', previewData?.packageDetails.packagename);
  formData.append('packagetype', previewData?.packageDetails.packagetype);
  formData.append('arrivalcity', previewData?.packageDetails.arrivalcity);
  formData.append('departurecity', previewData?.packageDetails.departurecity);
  formData.append('description', previewData?.packageDetails.packagedesc);
  //
  formData.append('isactive', previewData?.packageDetails.isactive);
  formData.append('isfeatured', previewData?.packageDetails.isfeatured);
  formData.append('baseprice', previewData?.packageDetails.baseprice);
  formData.append('discount', previewData?.packageDetails.discount);
  if (Array.isArray(previewData?.packageDetails.groupDates)) {
    previewData.packageDetails.groupDates.forEach((date, index) => {
      formData.append(`groupdates[${index}]`, date);
    });
  }
  formData.append(
    'bookingdeadline',
    previewData?.packageDetails.bookingdeadline
  );
  //
  formData.append('totaldays', previewData?.packageDetails.totaldays);
  formData.append('totalnights', previewData?.packageDetails.totalnights);
  //
  formData.append('makhotelname', previewData?.packageDetails.meccahotelname);
  formData.append('medhotelname', previewData?.packageDetails.madinahotelname);
  //
  formData.append('quintprice', previewData?.packageDetails.quintprice);
  formData.append('quadprice', previewData?.packageDetails.quadprice);
  formData.append('tripleprice', previewData?.packageDetails.tripleprice);
  formData.append('doubleprice', previewData?.packageDetails.doubleprice);
  formData.append(
    'childwithoutbedprice',
    previewData?.packageDetails.childwithoutbed
  );
  formData.append('infantprice', previewData?.packageDetails.infantprice);
  //
  formData.append(
    'makkahitinerary',
    previewData?.packageDetails.meccaitenaries
  );
  formData.append(
    'medinaitinerary',
    previewData?.packageDetails.madinaitenaries
  );
  formData.append(
    'cancellationpolicy',
    previewData?.packageDetails.cancellationpolicy
  );
  formData.append('inclusion', previewData?.packageDetails.inclusion);
  formData.append('exclusion', previewData?.packageDetails.exclusion);
  formData.append('termcondition', previewData?.packageDetails.termcondition);
  formData.append('bookingterms', previewData?.packageDetails.bookingterms);

  // Package Images

  formData.append('packageimage', previewData?.packageImage.packageImages);
  formData.append(
    'makkahhotelimage',
    previewData.packageImage.meccaHotelImages
  );
  formData.append(
    'medinahotelimage',
    previewData.packageImage.medinaHotelImages
  );

  // for (let [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }

  console.log(formData);
  // navigate
  const navigate = useNavigate();

  // Context States
  const { packageData, setPackageData, updatePackageData } =
    useContext(AuthContext);

  // useForm

  const { handleSubmit } = useForm();

  // Functions for form submission
  const onFormSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axiosInstance.post(
        '/packages/create-umrah-package',
        formData
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // navigate('/admin/umrahpackages');
  };

  return (
    <form
      action=""
      className="w-full h-full"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      {/* Section One */}
      <h1 className="text-3xl font-zodiak p-2 mb-5">Preview</h1>
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
              value={
                previewData?.packageDetails.packagename ||
                "Couldn't fetch the data"
              }
              className="custom-input"
              disabled
            />
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
              disabled
              value={
                previewData?.packageDetails.packagetype ||
                "Couldn't fetch the data"
              }
            />
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
            className="w-full custom-input mb-4"
            disabled
            value={
              previewData?.packageDetails.packagedesc ||
              "Couldn't fetch the data"
            }
          ></textarea>
        </div>
        {/* Boolean Values for package */}
        <div className="flex flex-col md:flex-row items-start gap-5 justify-start w-full">
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
                className={`${previewData?.packageDetails.isactive ? 'bg-darkgreen' : 'bg-peach bg-opacity-50 border-2 border-darkgreen'}`}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    transform: previewData?.packageDetails.isactive
                      ? 'translateX(30px)'
                      : 'translateX(0)',
                    transition: 'transform 0.3s ease',
                  }}
                  className={`rounded-full ${previewData?.packageDetails.isactive ? 'bg-peach' : 'bg-darkgreen'}`}
                ></div>
              </div>
            </div>
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
                className={`${previewData?.packageDetails.isfeatured ? 'bg-darkgreen' : 'bg-peach bg-opacity-50 border-2 border-darkgreen'}`}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    transform: previewData?.packageDetails.isfeatured
                      ? 'translateX(30px)'
                      : 'translateX(0)',
                    transition: 'transform 0.3s ease',
                  }}
                  className={`rounded-full ${previewData?.packageDetails.isfeatured ? 'bg-peach' : 'bg-darkgreen'}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Two for Date and days */}
      <div className="relative w-full mt-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
        <label htmlFor="packagename" className="custom-label">
          Group Dates
        </label>
        <div className="flex flex-wrap mt-5 justify-start w-full">
          {previewData?.packageDetails.groupDates.map((date, index) => {
            return (
              <div className="w-full lg:w-1/3 relative" key={index}>
                <input
                  type="date"
                  name=""
                  value={date}
                  disabled
                  id="packagename"
                  className="w-9/12 mb-5 custom-input"
                  required={index > 0}
                />
              </div>
            );
          }) && "Couln't Fetch Data"}
        </div>

        <div className="flex mt-20 flex-col gap-5 md:flex-row items-center w-full">
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
              disabled
              value={
                previewData?.packageDetails.totaldays || "Couln't Fetch Data"
              }
            />
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
              disabled
              value={
                previewData?.packageDetails.totalnights || "Couln't Fetch Data"
              }
            />
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

            <div className="border w-full font-jakarta cursor-pointer border-darkgreen rounded-xl p-3 gap-1 flex items-center justify-between">
              <div>{previewData.packageDetails.meccahotelname || 'Select'}</div>
            </div>
          </div>
          {/* Madina Hotel Name */}
          <div className="w-full relative mt-10 flex flex-col gap-2">
            <label htmlFor="madinahotelname" className="custom-label">
              Madina Hotel Name
            </label>

            <div className="border w-full font-jakarta cursor-pointer border-darkgreen rounded-xl p-3 gap-1 flex items-center justify-between">
              <div>
                {previewData?.packageDetails.madinahotelname || 'Select'}
              </div>
            </div>
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
              disabled
              value={
                previewData?.packageDetails.doubleprice || "Couln't Fetch Data"
              }
            />
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
              disabled
              value={
                previewData?.packageDetails.tripleprice || "Couln't Fetch Data"
              }
            />
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
              disabled
              value={
                previewData?.packageDetails.quintprice || "Couln't Fetch Data"
              }
            />
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
              disabled
              value={
                previewData?.packageDetails.quadprice || "Couln't Fetch Data"
              }
            />
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
              name="childwithoutbed"
              min="0"
              id="packagename"
              className="custom-input"
              disabled
              value={
                previewData?.packageDetails.childwithoutbed ||
                "Couln't Fetch Data"
              }
            />
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
              disabled
              value={
                previewData?.packageDetails.infantprice || "Couln't Fetch Data"
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-10 w-full lg:w-2/3 mx-auto flex gap-5 lg:gap-60 items-center justify-center">
        <NavLink
          to="/admin/umrahpackages"
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
        >
          Back
        </NavLink>
        <button
          type="submit"
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
        >
          Create Package
        </button>
      </div>
    </form>
  );
};

export default CreatePreview;
