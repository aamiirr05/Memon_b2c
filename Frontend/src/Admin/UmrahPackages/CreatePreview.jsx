/* eslint-disable no-unused-vars */
import { ChevronDown } from 'lucide-react';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
const CreatePreview = () => {
  const [previewData] = useState(() => {
    const packageImage =
      JSON.parse(localStorage.getItem('packageimages')) || {};
    const packageDetails =
      JSON.parse(localStorage.getItem('packagedetails')) || {};
    return { packageImage, packageDetails };
  });
  console.log(previewData);

  const { refreshPackages } = useOutletContext();
  const { id } = useParams();
  console.log(id);

  const { handleSubmit, control } = useForm();
  const [groupDates] = useState(previewData?.packageDetails.groupDates);
  const [inclusion] = useState(previewData?.packageDetails.inclusion);
  const [exclusion] = useState(previewData?.packageDetails.exclusion);
  const [bookingterms] = useState(previewData?.packageDetails.bookingterms);
  const [cancelpolicy] = useState(
    previewData?.packageDetails.cancellationpolicy
  );
  const [termcondition] = useState(previewData?.packageDetails.termcondition);
  const [meccahotel, setMeccaHotel] = useState(false);
  const [madinahotel, setMadinaHotel] = useState(false);
  const [meccaItenaries] = useState(previewData?.packageDetails.meccaitenaries);
  const [madinaItenaries, setMadinaItenaries] = useState(
    previewData?.packageDetails.madinaitenaries
  );

  // Is active and is featured states & functions
  const [isActive] = useState(previewData?.packageDetails.isactive);
  const [isFeatured] = useState(previewData?.packageDetails.isfeatured);

  // navigate
  const navigate = useNavigate();

  // Functions for form submission
  const onFormSubmit = (data) => {
    console.log('Form submitted');
    console.log(data);
    navigate('/admin/umrahpackages/createpackage-images');
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
              disabled
              defaultValue={previewData?.packageDetails.packagename}
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
              placeholder="Enter Package Type"
              disabled
              defaultValue={previewData?.packageDetails.packagetype}
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
            className="w-full custom-input"
            placeholder="Enter Package Description"
            disabled
            defaultValue={previewData?.packageDetails.packagedesc}
          ></textarea>
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
              disabled
              defaultValue={previewData?.packageDetails.baseprice}
            />
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
              disabled
              defaultValue={previewData?.packageDetails.discount}
            />
          </div>
        </div>
        {/* Boolean defaultValues for package */}
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
                  disabled
                  id="packagename"
                  className="w-9/12 mb-5 custom-input"
                />
              </div>
            );
          })}
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
            disabled
            defaultValue={previewData?.packageDetails.bookingdeadline}
          />
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
              disabled
              defaultValue={previewData?.packageDetails.totaldays}
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
              placeholder="Enter Total Nights"
              disabled
              defaultValue={previewData?.packageDetails.totalnights}
            />
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
              disabled
              defaultValue={previewData?.packageDetails.arrivalcity}
            />
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
              disabled
              defaultValue={previewData?.packageDetails.departurecity}
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

            <input
              type="text"
              name="meccahotelname"
              min="0"
              id="meccahotelname"
              className="custom-input"
              disabled
              defaultValue={previewData?.packageDetails.meccahotelname}
            />
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
              disabled
              defaultValue={previewData?.packageDetails.madinahotelname}
            />
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
              disabled
              defaultValue={previewData?.packageDetails.doubleprice}
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
              placeholder="Enter Triple Price"
              disabled
              defaultValue={previewData?.packageDetails.tripleprice}
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
              placeholder="Enter Quint Price"
              disabled
              defaultValue={previewData?.packageDetails.quintprice}
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
              placeholder="Enter Quad Price"
              disabled
              defaultValue={previewData?.packageDetails.quadprice}
            />
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
              disabled
              defaultValue={previewData?.packageDetails.childwithoutbedprice}
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
              placeholder="Enter Infant Price"
              disabled
              defaultValue={previewData?.packageDetails.infantprice}
            />
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
                defaultValue={val.day}
                style={{ backgroundColor: '#386641', color: '#f2e8cf' }}
                disabled
                className="custom-input w-9/12 md:w-[15%] font-semibold text-center"
              />

              <input
                type="text"
                className="custom-input w-full md:w-9/12"
                disabled
                defaultValue={val.itenary}
              />
            </div>
          ))}
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
                defaultValue={val.day}
                disabled
                style={{ backgroundColor: '#386641', color: '#f2e8cf' }}
                className="custom-input w-9/12 md:w-[15%] font-semibold text-center"
              />

              <input
                type="text"
                className="custom-input w-full md:w-9/12"
                disabled
                defaultValue={val.itenary}
              />
            </div>
          ))}
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
                  defaultValue={val}
                  id="packagename"
                  className="w-10/12 mb-5 custom-input"
                />
              </div>
            );
          })}
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
                  defaultValue={val}
                  id="packagename"
                  className="w-10/12 mb-5 custom-input"
                  placeholder={`Exclusion ${index + 1}`}
                  required={index > 0}
                />
              </div>
            );
          })}
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
                  defaultValue={val}
                  id="bookingterms"
                  className="w-10/12 mb-5 custom-input"
                />
              </div>
            );
          })}
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
                  defaultValue={val}
                  id="termcondition"
                  className="w-10/12 mb-5 custom-input"
                  required={index > 0}
                />
              </div>
            );
          })}
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
                  defaultValue={val}
                  id="bookingterms"
                  className="w-10/12 mb-5 custom-input"
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Form Buttons  */}

      <div className="mt-10 w-full lg:w-2/3 mx-auto flex gap-5 lg:gap-60 items-center justify-center">
        <NavLink
          to={`/admin/umrahpackages/update/${id}/details`}
          onClick={() => {
            localStorage.removeItem('packagedetails');
            localStorage.removeItem('packageimage');
          }}
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
        >
          Need to Update ?
        </NavLink>
        <NavLink
          to="/admin/umrahpackages"
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
          onClick={() => {
            refreshPackages();
            localStorage.removeItem('packagedetails');
            localStorage.removeItem('packageimage');
          }}
        >
          Back to Home
        </NavLink>
      </div>
    </form>
  );
};

export default CreatePreview;
