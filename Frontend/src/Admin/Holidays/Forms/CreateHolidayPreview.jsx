import { NavLink, useOutletContext, useParams } from 'react-router-dom';

const CreateHolidayPreview = () => {
  const { getPackages } = useOutletContext();
  const { id } = useParams();
  const singlePackage = getPackages?.data.data.find(
    (item) => item.package_id === id
  );

  const isActive = singlePackage?.is_active;
  const isFeatured = singlePackage?.is_featured;

  const handleNavigation = () => {
    localStorage.clear();
    getPackages.refresh();
  };

  return (
    <form action="" className="w-full h-full">
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
              value={singlePackage?.package_name}
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
              disabled
              id="packagetype"
              className="custom-input"
              placeholder="Enter Package Type"
              value={singlePackage?.package_type}
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
            disabled
            placeholder="Enter Package Description"
            value={singlePackage?.description}
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex mt-5 gap-3 w-full flex-col">
          <label htmlFor="packagetype" className="custom-label">
            Package Category
          </label>
          <ul className="font-jakarta pl-5 flex flex-col gap-3">
            {singlePackage?.category.map((item, index) => (
              <li className="list-disc" key={index}>
                {item}
              </li>
            ))}
          </ul>
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
              disabled
              min={0}
              className="custom-input"
              placeholder="Enter Base Price"
              value={singlePackage?.base_price}
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
              disabled
              id="discount"
              min="0"
              className="custom-input"
              placeholder="Enter  Discount"
              value={singlePackage?.discount}
            />
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
          {singlePackage.group_dates.map((date, index) => {
            return (
              <div className="w-full lg:w-1/3 relative" key={index}>
                <input
                  disabled
                  type="date"
                  name=""
                  value={date}
                  id="packagename"
                  className="w-9/12 mb-5 custom-input"
                  required={index > 0}
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
            className="w-full lg:w-1/4 custom-input"
            disabled
            value={singlePackage?.bookingdeadline}
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
              value={singlePackage?.total_days}
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
              placeholder="Enter Total Nights"
              value={singlePackage?.total_nights}
            />
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
              disabled
              value={singlePackage?.country}
            />
          </div>
          {/*  City */}
          <div className="flex gap-3 w-full flex-col">
            <label htmlFor="city" className="custom-label">
              City
            </label>
            <input
              type="text"
              disabled
              name="city"
              id="city"
              className="custom-input"
              placeholder="Enter City"
              value={singlePackage?.city}
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
              disabled
              id="arrivalcity"
              className="custom-input"
              placeholder="Enter Arrival City"
              value={singlePackage?.arrival_city}
            />
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
              disabled
              className="custom-input"
              placeholder="Enter  Departure City"
              value={singlePackage?.departure_city}
            />
          </div>
        </div>
        {/* Transport Mode and Hotel Name */}
        <div className="flex flex-col mt-5 gap-5 lg:flex-row items-center w-full">
          {/* Hotel Name */}
          <div className="flex gap-3 w-full flex-col">
            <label htmlFor="hotelname" className="custom-label">
              Hotel Name
            </label>
            <input
              type="text"
              name="hotelname"
              disabled
              id="hotelname"
              className="custom-input"
              placeholder="Enter Hotel Name"
              value={singlePackage?.hotel_name}
            />
          </div>
          {/* Hotel Name */}
          <div className="flex gap-3 w-full flex-col">
            <label htmlFor="hotelname" className="custom-label">
              Hotel Star
            </label>
            <input
              type="text"
              name="hotelstar"
              disabled
              id="hotelstar"
              className="custom-input"
              value={singlePackage?.hotel_star}
            />
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
              disabled
              placeholder="Enter Transport Mode"
              value={singlePackage?.transport_mode}
            />
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
          {singlePackage?.itinerary.map((val, index) => (
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

              <input
                type="text"
                className="custom-input w-full md:w-9/12"
                placeholder={`Itinerary for ${val.day}`}
                disabled
                value={val.itenary}
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
        <div className="flex flex-wrap mt-10 md:mt-5 justify-start w-full">
          {singlePackage?.inclusion.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name=""
                  value={val}
                  id="packagename"
                  className="w-10/12 mb-5 custom-input"
                  placeholder={`Inclusion ${index + 1}`}
                  required={index > 0}
                  disabled
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
          {singlePackage?.exclusion.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name="exclusion"
                  value={val}
                  id="packagename"
                  disabled
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
          {singlePackage?.booking_terms.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name="bookingterms"
                  value={val}
                  disabled
                  id="bookingterms"
                  className="w-10/12 mb-5 custom-input"
                  placeholder={`Booking Term ${index + 1}`}
                  required={index > 0}
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
          {singlePackage?.term_condition.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name="termcondition"
                  value={val}
                  id="termcondition"
                  disabled
                  className="w-10/12 mb-5 custom-input"
                  placeholder={`Term & Condition ${index + 1}`}
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
          {singlePackage?.cancellation_policy.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name="cancellationpolicy"
                  value={val}
                  id="bookingterms"
                  className="w-10/12 mb-5 custom-input"
                  disabled
                  placeholder={`Cancellation Policy ${index + 1}`}
                  required={index > 0}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Form Buttons  */}

      <div className="mt-10 w-full lg:w-2/3 mx-auto flex gap-5 lg:gap-60 items-center justify-center">
        <NavLink
          to={`/admin/holidays/update/${id}/details`}
          onClick={() => handleNavigation}
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
        >
          Need to Update ?
        </NavLink>
        <NavLink
          to="/admin/holidays"
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
          onClick={() => handleNavigation}
        >
          Back to Home
        </NavLink>
      </div>
    </form>
  );
};

export default CreateHolidayPreview;
