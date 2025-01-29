/* eslint-disable no-unused-vars */
import {
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import Loader from '../../../components/Loader';

const CreateHotelPreview = () => {
  const { getHotels, refreshPackages } = useOutletContext();

  const handleNavigation = () => {
    localStorage.clear();
    refreshPackages();
  };

  const { id } = useParams();

  const getHotel = getHotels?.data.data.find((hotel) => hotel.hotel_id == id);
  console.log(getHotel);

  const isActive = getHotel?.is_active === 'true';
  const isFeatured = getHotel?.featured === 'true';

  const amenities = getHotel?.amenities;
  const bookingterms = getHotel?.booking_terms;
  const cancelpolicy = getHotel?.cancellation_policy;
  const termcondition = getHotel?.term_condition;

  // navigate
  const navigate = useNavigate();

  if (!getHotel) {
    return (
      <div className="flex items-center font-jakarta text-lg font-semibold justify-center w-full h-full">
        <p>Loading preview data...</p>
      </div>
    );
  }

  return (
    <form action="" className="w-full h-full">
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
              disabled
              defaultValue={getHotel?.hotel_name}
            />
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
              disabled
              defaultValue={getHotel?.hotel_city}
            />
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
              placeholder="Enter Hotel Country"
              disabled
              defaultValue={getHotel?.hotel_country}
            />
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
            disabled
            defaultValue={getHotel?.hotel_description}
          ></textarea>
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
            defaultValue={getHotel?.hotel_location}
          />
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
              disabled
              defaultValue={getHotel?.hotel_category}
            />
          </div>
          {/* Meal Basis */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="hotelstar" className="custom-label">
              Meal Basis
            </label>

            <input
              disabled
              defaultValue={getHotel?.meal_basis}
              name="mealbasis"
              id="mealbasis"
              className="custom-input"
            ></input>
          </div>
        </div>
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
              disabled
              defaultValue={getHotel?.hotel_distance}
            />
          </div>
          {/* Star */}
          <div className="flex gap-3  w-full flex-col">
            <label htmlFor="star" className="custom-label">
              Star
            </label>
            <input
              type="text"
              name="star"
              id="star"
              className="custom-input"
              disabled
              defaultValue={getHotel?.hotel_star}
            />
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
              disabled
              defaultValue={getHotel?.rooms[0].double_price}
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
              defaultValue={getHotel?.rooms[0].triple_price}
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
              defaultValue={getHotel?.rooms[0].quint_price}
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
              defaultValue={getHotel?.rooms[0].quad_price}
            />
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
                  defaultValue={val}
                  disabled
                  id="amenities"
                  className="w-10/12 mb-5 custom-input"
                  placeholder={`Amenity ${index + 1}`}
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
          {termcondition.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name="termcondition"
                  defaultValue={val}
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
          {cancelpolicy.map((val, index) => {
            return (
              <div className="w-full relative" key={index}>
                <input
                  type="text"
                  name="cancellationpolicy"
                  defaultValue={val}
                  disabled
                  id="bookingterms"
                  className="w-10/12 mb-5 custom-input"
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
          to={`/admin/hotel/update/${id}/details`}
          onClick={() => handleNavigation()}
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
        >
          Need to Update ?
        </NavLink>

        <NavLink
          to="/admin/hotel"
          type="submit"
          onClick={() => handleNavigation()}
          className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
        >
          Back
        </NavLink>
      </div>
    </form>
  );
};

export default CreateHotelPreview;
