/* eslint-disable react/prop-types */
import { MessageCircleMore } from 'lucide-react';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Testimonials from './HomePage/Testimonials';

const Homepage = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    function PageOneAnimation() {
      const tl = gsap.timeline();

      tl.from('.section-one-heading h1', {
        duration: 0.9,
        opacity: 0,
        y: 200,
        // stagger: 0.15,
      });

      tl.from('.section-one-heading p', {
        duration: 0.9,
        opacity: 0,
        y: 200,
        // stagger: 0.15,
      });
    }

    PageOneAnimation();

    function PageTwoAnimation() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-two',
          scroller: 'body',
          // markers: true,
          start: 'top 45%',
          end: 'top 5%',
          scrub: 3,
        },
      });

      tl.from(
        '.section-two .heading-wel',
        {
          opacity: 0,
          duration: 0.5,
          x: -200,
        },
        'one'
      );

      tl.from(
        '.section-two .heading-com-one',
        {
          opacity: 0,
          duration: 0.5,
          x: -200,
          delay: 0.2,
        },
        'one'
      );

      tl.from(
        '.section-two .heading-com-two',
        {
          opacity: 0,
          duration: 0.5,
          x: -200,
          delay: 0.4,
        },
        'one'
      );

      tl.from(
        '.section-two .help-box',
        {
          opacity: 0,
          duration: 0.5,
          x: 200,
        },
        'one'
      );

      tl.from('.section-two .para-one', {
        opacity: 0,
        duration: 0.5,
        x: -200,
      });

      tl.from('.section-two .heading-who', {
        opacity: 0,
        duration: 0.5,
        x: -200,
      });

      tl.from('.section-two .para-two', {
        opacity: 0,
        duration: 0.5,
        x: -200,
      });
    }

    PageTwoAnimation();

    // Book Now Section Anim...
    function PageThreeAnimation() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-book-now',
          scroller: 'body',
          // markers: true,
          start: 'top 50%',
          end: 'top 10%',
          scrub: 3,
        },
      });

      tl.from('.section-book-now .heading-one', {
        opacity: 0,
        duration: 0.5,
        x: -200,
      });

      tl.from('.section-book-now .heading-two', {
        opacity: 0,
        duration: 0.5,
        x: -200,
      });

      tl.from(
        '.section-book-now .card-one-big',
        {
          opacity: 0,
          duration: 0.5,
          x: -200,
        },
        'one'
      );

      tl.from(
        '.section-book-now .card-two',
        {
          opacity: 0,
          duration: 0.5,
          x: 200,
        },
        'one'
      );

      tl.from(
        '.section-book-now .card-one',
        {
          opacity: 0,
          duration: 0.5,
          y: 200,
        },
        'one'
      );

      tl.from('.section-book-now .card-three , .section-book-now .card-four', {
        opacity: 0,
        duration: 0.5,
        x: 200,
      });

      tl.from('.section-book-now .para-one', {
        opacity: 0,
        duration: 0.5,
        x: -200,
        delay: 0.6,
      });
    }

    PageThreeAnimation();
  });

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    padding: 60,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative overflow-x-hidden">
      {/* Primary Navbar */}
      <nav className=" bg-darkgreen w-full text-xs md:text-sm font-jakarta">
        <div className="primary-nav-items text-peach flex items-center md:gap-10 justify-between md:justify-end p-4 lg:p-6 font-semibold">
          <div className="link-hover-peach links">Support</div>
          <div className="link-hover-peach links">Contact</div>
          <div className="flex items-center links justify-center gap-1">
            <div className="link-hover-peach">Login</div> /{' '}
            <div className="link-hover-peach">Signup</div>
          </div>
          <div className="link-hover-peach links">B2B Login</div>
        </div>
      </nav>

      {/* Secondary Navbar */}
      <nav className="bg-peach bg-opacity-30 lg:flex items-center justify-between py-3 px-1 lg:px-6 w-full hidden">
        <div className="flex items-center gap-2">
          <div className="logo w-14 h-14">
            <img
              src={`https://s3-alpha-sig.figma.com/img/c029/3f5e/a0f869bd9b509ab0e5a07d2db64fe0ef?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FyHhVHPWHXYnOudBET4nLxatw3g1VCCrVzxYE~oCZ5amjue5uGPcDyzdZ0MSy3jJ8saw38lvetJY8o9ifBBfUQ0uWPZiJEitv4~kfn086J319C~B3EnUeeiFbhzaGR97-jskZCEherdi57TDwC6MiWrsSnafp6pacCcOh8kBnClmvypRJ43ItaccXSJ-va7KM0zFAidXwKrQtHyYKmCqzNg3-8hx8YlKWCPCRiA9He0V0iLjJTVenIf-X~MSeqhmBDUUsvC7zkv6LOOfQyHrUF7lLuLCc1WJ5QbBgj2nKvTepUF0Vqyb2cT9k2RVv6wvs~7eZBX-ZXx0yFDdEDTZQA__`}
              alt=""
            />
          </div>
          <div className="w-24 xl:w-40">
            <img
              src={`https://s3-alpha-sig.figma.com/img/4d76/6344/366db0ad089b2f94a11624fe7be964f2?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d0~tZj-ihtvSfmlibiBb8DIq4pUiNCzeIzG4jP78Dv~ceHYKarwYDv~w2gNocp45gKUNLWhubvm17w96LPm57iVKlEMdT~6yQUoa6yJx8WB9Mwur7fdB54KdFPcbajVQiuyo6FEnzWhOsxkoD0rXKnlSU~zvFicpt99ZBanMN~4qhhr9tQwHsL1X0ovfDhRNB7Jll64BQOSoONs8OeSfIGpfjPZBdL3Bzx221f52HOVrKEaEirMskBAEG7GT7ghtZVgvxDU~pQEZbaxxNtnJFoGQA2l7STo6J5wZoCRVEYxdcMGiGQ3OyoCZ3Fh9zvj2NaYlYLQwakTVne3BnflCEg__`}
              alt=""
            />
          </div>
        </div>
        <div className="relative text-darkgreen flex items-center lg:gap-4 xl:gap-8 font-semibold font-recia">
          <div className="link-hover-green">Home</div>
          <div
            className=""
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Umrah Packages
          </div>
          <div
            className={`absolute left-3 top-6 w-0 h-0 border-l-[120px] border-r-[120px] border-b-[120px] border-l-transparent border-r-transparent border-b-darkgreen transition-all duration-700 ${isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-[100%] pointer-events-none'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          ></div>
          <div
            className={`absolute left-20 dropdown w-[25vw] xl:w-[15vw] h-[20vh] p-4 flex flex-col items-start justify-center gap-4 rounded-lg top-10 z-40 bg-darkgreen text-peach shadow-xl transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0 translate-y-[30%] pointer-events-none'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="">Umrah Packages</div>
            <div className="">Ramadan Packages</div>
            <div className="">Customized Umrah</div>
          </div>
          <div className="link-hover-green">Haj 2025</div>
          <div className="link-hover-green">Ziyarat</div>
          <div className="link-hover-green">Holidays</div>
          <div className="link-hover-green">Hotels</div>
          <div className="link-hover-green">Visa</div>
          <div className="link-hover-green">Forex</div>
          <div className="link-hover-green hidden xl:block">Our Partners</div>
          <div className="link-hover-green hidden xl:block">Nusuk</div>
          <div className="link-hover-green hidden xl:block">Contact Us</div>
          <div
            className="xl:hidden"
            onMouseEnter={() => setIsMore(true)}
            onMouseLeave={() => setIsMore(false)}
          >
            More
          </div>
          <div
            className={`absolute -right-[1.5rem] top-6 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[40px] border-l-transparent border-r-transparent border-b-darkgreen transition-all duration-700 ${isMore ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-[100%] pointer-events-none'}`}
            onMouseEnter={() => setIsMore(true)}
            onMouseLeave={() => setIsMore(false)}
          ></div>
          <div
            className={`absolute -right-5 dropdown w-[25vw] xl:w-[15vw] h-[20vh] p-4 flex flex-col items-start justify-center gap-4 rounded-lg top-10 z-40 bg-darkgreen text-peach shadow-xl transition-all duration-700 ${isMore ? 'opacity-100' : 'opacity-0 translate-y-[30%] pointer-events-none'}`}
            onMouseEnter={() => setIsMore(true)}
            onMouseLeave={() => setIsMore(false)}
          >
            <div className="">Our Partners</div>
            <div className="">Nusuk</div>
            <div className="">Contact Us</div>
          </div>
        </div>
      </nav>
      {/* Logo Section (Hamburger) */}

      <div
        className={`absolute right-0 pr-3 lg:hidden flex justify-center items-center gap-12 mt-2 transition-all ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
      >
        {' '}
        <img
          src={`https://s3-alpha-sig.figma.com/img/4d76/6344/366db0ad089b2f94a11624fe7be964f2?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d0~tZj-ihtvSfmlibiBb8DIq4pUiNCzeIzG4jP78Dv~ceHYKarwYDv~w2gNocp45gKUNLWhubvm17w96LPm57iVKlEMdT~6yQUoa6yJx8WB9Mwur7fdB54KdFPcbajVQiuyo6FEnzWhOsxkoD0rXKnlSU~zvFicpt99ZBanMN~4qhhr9tQwHsL1X0ovfDhRNB7Jll64BQOSoONs8OeSfIGpfjPZBdL3Bzx221f52HOVrKEaEirMskBAEG7GT7ghtZVgvxDU~pQEZbaxxNtnJFoGQA2l7STo6J5wZoCRVEYxdcMGiGQ3OyoCZ3Fh9zvj2NaYlYLQwakTVne3BnflCEg__`}
          alt=""
          className="w-40"
        />
        <img
          src={`https://s3-alpha-sig.figma.com/img/c029/3f5e/a0f869bd9b509ab0e5a07d2db64fe0ef?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FyHhVHPWHXYnOudBET4nLxatw3g1VCCrVzxYE~oCZ5amjue5uGPcDyzdZ0MSy3jJ8saw38lvetJY8o9ifBBfUQ0uWPZiJEitv4~kfn086J319C~B3EnUeeiFbhzaGR97-jskZCEherdi57TDwC6MiWrsSnafp6pacCcOh8kBnClmvypRJ43ItaccXSJ-va7KM0zFAidXwKrQtHyYKmCqzNg3-8hx8YlKWCPCRiA9He0V0iLjJTVenIf-X~MSeqhmBDUUsvC7zkv6LOOfQyHrUF7lLuLCc1WJ5QbBgj2nKvTepUF0Vqyb2cT9k2RVv6wvs~7eZBX-ZXx0yFDdEDTZQA__`}
          alt=""
          className="w-12 h-12"
        />
      </div>

      {/* Hamburger */}
      <div
        className={`absolute z-10 w-[90%] md:w-[50%] h-screen bg-peach lg:hidden ease-in-out ${isMenuOpen ? 'translate-x-0 duration-1000' : 'translate-x-[-100%] duration-1000'}`}
      >
        <div
          className={`absolute top-6 z-20 flex flex-col items-start justify-start gap-1 duration-700 ease-in-out ${isMenuOpen ? 'right-3' : 'right-[-3rem]'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className={`w-6 h-[3.5px] bg-darkgreen flex transition-all ${isMenuOpen ? 'rotate-45 translate-y-[.5rem]' : 'rotate-0 '}`}
          ></span>
          <span
            className={`w-6 h-[2.5px] bg-darkgreen  transition-all ${isMenuOpen ? 'hidden opacity-0' : 'flex'}`}
          ></span>
          <span
            className={`w-6 h-[3.5px] bg-darkgreen flex transition-all ${isMenuOpen ? '-rotate-45 translate-x-[.01rem] translate-y-[.04rem]' : 'rotate-0'}`}
          ></span>
        </div>

        <div className="text-darkgreen flex flex-col justify-center mt-10 p-10 md:px-14 items-start gap-8 font-semibold font-recia">
          <div
            className="cursor-pointer"
            onClick={() => setIsHovered(!isHovered)}
          >
            Umrah Packages
          </div>
          <ul
            className={`flex-col gap-4 transition-all text-mediumgreen ${isHovered ? 'flex' : 'hidden'}`}
          >
            <li className="">Umrah Packages</li>
            <li className="">Ramadan Packages</li>
            <li className="">Customized Umrah</li>
          </ul>
          <div className="cursor-pointer">Haj 2025</div>
          <div className="cursor-pointer">Ziyarat</div>
          <div className="cursor-pointer">Holidays</div>
          <div className="cursor-pointer">Hotels</div>
          <div className="cursor-pointer">Visa</div>
          <div className="cursor-pointer">Forex</div>
          <div className="cursor-pointer hidden xl:block">Our Partners</div>
          <div className="cursor-pointer hidden xl:block">Nusuk</div>
          <div className="cursor-pointer hidden xl:block">Contact Us</div>
        </div>
      </div>

      {/* Main content  */}
      <section
        className={`relative mb-52 w-full h-full flex mt-[4.5rem] lg:mt-0 transition-all ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1729931421786-7bbd6c7d78f6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '80vh',
          width: '100%',
        }}
      >
        <div className="section-one-heading p-5 md:p-0 flex flex-col gap-5 mt-10 text-white md:w-11/12 mx-auto">
          <h1 className="text-5xl font-bold font-zodiak">
            Search, Book and Relax
          </h1>
          <p className="font-jakarta font-semibold">
            No hidden fees or gimmicks, just straight forward and hassle-free
            booking for all your travel needs.
          </p>
        </div>
      </section>

      {/* About Us Section */}

      <section className="section-two my-20 flex flex-col lg:flex-row lg:items-start lg:gap-10 w-11/12 mx-auto">
        <div className="w-full mx-auto flex flex-col gap-3 items-start justify-center">
          <h3 className="heading-wel font-bold font-zodiak text-lightgreen text-3xl md:text-5xl">
            WELCOME TO
          </h3>
          <h1 className="heading-com-one text-3xl md:text-5xl font-zodiak uppercase text-darkgreen">
            memon
          </h1>
          <h1 className="heading-com-two text-2xl md:text-4xl font-zodiak uppercase text-darkgreen">
            Haj Umrah tours & Travels
          </h1>
          <p className="para-one tracking-tight text-left my-6 font-jakarta text-mediumgreen font-medium">
            Memon Makka Madina tour is a journey of a lifetime, offering
            spiritual enrichment, cultural exploration, and a connection to the
            roots of Islam. Pilgrims return with a renewed sense of faith, a
            deeper understanding of Islamic history, and memories that will last
            a lifetime. As the cradle of Islam, Makka and Madina beckon
            believers to embark on this transformative pilgrimage, seeking
            spiritual elevation and closeness to Allah.Makka Madina tour is a
            journey of a lifetime, offering spiritual enrichment, cultural
            exploration, and a connection to the roots of Islam. Pilgrims return
            with a renewed sense of faith, a deeper understanding of Islamic
            history, and memories that will last a lifetime. As the cradle of
            Islam, Makka and Madina beckon believers to embark on this
            transformative pilgrimage, seeking spiritual elevation and closeness
            to Allah.
          </p>

          <h3 className="heading-who text-2xl md:text-4xl font-zodiak uppercase text-darkgreen text-left">
            Who We Are?
          </h3>
          <p className="para-two tracking-tight text-left my-6 font-jakarta text-mediumgreen font-medium">
            Memon Makka Madina tour is a journey of a lifetime, offering
            spiritual enrichment, cultural exploration, and a connection to the
            roots of Islam. Pilgrims return with a renewed sense of faith, a
            deeper understanding of Islamic history, and memories that will last
            a lifetime. As the cradle of Islam, Makka and Madina beckon
            believers to embark on this transformative pilgrimage, seeking
            spiritual elevation and closeness to Allah.Makka Madina tour is a
            journey of a lifetime, offering spiritual enrichment, cultural
            exploration, and a connection to the roots of Islam. Pilgrims return
            with a renewed sense of faith, a deeper understanding of Islamic
            history, and memories that will last a lifetime. As the cradle of
            Islam, Makka and Madina beckon believers to embark on this
            transformative pilgrimage, seeking spiritual elevation and closeness
            to Allah.
          </p>
        </div>
        <div className="help-box bg-mediumgreen lg:w-1/2 p-4 flex flex-col gap-3 text-peach rounded-xl shadow-xl mx-auto my-5 lg:my-0">
          <h1 className="text-3xl font-semibold">Need Help ?</h1>
          <p className="font-semibold">
            We would be mor than happy to help you.our team advisor are 24/7 at
            your service to help you.
          </p>
          <p className="font-semibold">
            Contact us via whatsapp to know us better.
          </p>

          <div className="flex items-center gap-3">
            <MessageCircleMore />
            <div className="">+91 XXXXX XXXXX</div>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircleMore />
            <div className="">+91 XXXXX XXXXX</div>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircleMore />
            <div className="">+91 XXXXX XXXXX</div>
          </div>

          <span className="font-semibold underline">
            memonhajumrah@gmail.com
          </span>
        </div>
      </section>

      {/* Card Section to be added  */}

      {/* Book Now Section  */}

      <section className="section-book-now w-11/12 mx-auto my-20">
        {/* Heading  */}
        <div className="my-5 flex items-start justify-start text-darkgreen flex-col gap-4">
          <h1 className="heading-one text-2xl md:text-4xl font-semibold font-zodiak">
            Book Now - Holiday Packages for this Season.
          </h1>
          <p className="heading-two font-semibold text-mediumgreen">
            Planning a holiday and not sure where to start ? Pick one of our
            recommended holiday&apos;s crafted just for you.
          </p>
        </div>
        {/* Cards */}
        <div className="w-full mx-auto h-full mt-10 flex flex-col md:flex-row gap-10">
          {/* Flex Card 1 full */}
          <div className="w-full lg:w-1/2 h-full">
            <div className="card-one-big bg-white w-full h-full flex flex-col shadow-xl rounded-xl overflow-hidden">
              <div className="w-full">
                <img
                  src={`https://images.unsplash.com/photo-1584186028062-637e3e77318d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt=""
                  className="object-cover"
                />
              </div>
              {/* Card's Description  */}
              <div className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-xl text-darkgreen">
                  Dessert Wonder Riyadh And Jeddah Advanture
                </h1>
                <p className="font-semibold text-mediumgreen">
                  5 Days, 4 Nights Destinations: Madina , Jeddah
                </p>
                <hr className="w-full border border-mediumgreen border-opacity-50 rounded-full" />
                <p className="font-semibold text-lightgreen">
                  Starting from INR 53,207
                </p>
                <button className="bg-mediumgreen mt-5 w-1/2 mx-auto p-2 rounded-xl text-peach font-semibold text-lg shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
            <div className="para-one w-full flex justify-start mt-5 md:mt-32 text-lg font-semibold text-mediumgreen border-l-4 pl-4 border-lightgreen font-jakarta">
              “Umrah is a beautiful chapter in everyone’s life. May you receive
              full benefits and be filled with serenity, love, and divine
              presenece of Allah.”
            </div>
          </div>

          {/* Flex Card 2 (1-1)  */}
          <div className="w-full h-1/2 flex flex-col md:flex-row gap-10 flex-wrap">
            {/* 1 */}
            <div className="card-one bg-white w-full lg:w-[45%] flex flex-col shadow-xl rounded-xl overflow-hidden">
              <div className="w-full">
                <img
                  src={`https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt=""
                  className="object-cover"
                />
              </div>
              {/* Card's Description  */}
              <div className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-xl text-darkgreen">
                  Dessert Wonder Riyadh And Jeddah Advanture
                </h1>
                <p className="font-semibold text-mediumgreen">
                  5 Days, 4 Nights Destinations: Madina , Jeddah
                </p>
                <hr className="w-full border border-mediumgreen border-opacity-50 rounded-full" />
                <p className="font-semibold text-lightgreen">
                  Starting from INR 53,207
                </p>
                <button className="bg-mediumgreen mt-5 w-1/2 mx-auto p-2 rounded-xl text-peach font-semibold text-lg shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
            {/* 2 */}
            <div className="card-two bg-white w-full lg:w-[45%] flex flex-col shadow-xl rounded-xl overflow-hidden">
              <div className="w-full">
                <img
                  src={`https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt=""
                  className="object-cover"
                />
              </div>
              {/* Card's Description  */}
              <div className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-xl text-darkgreen">
                  Dessert Wonder Riyadh And Jeddah Advanture
                </h1>
                <p className="font-semibold text-mediumgreen">
                  5 Days, 4 Nights Destinations: Madina , Jeddah
                </p>
                <hr className="w-full border border-mediumgreen border-opacity-50 rounded-full" />
                <p className="font-semibold text-lightgreen">
                  Starting from INR 53,207
                </p>
                <button className="bg-mediumgreen mt-5 w-1/2 mx-auto p-2 rounded-xl text-peach font-semibold text-lg shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
            {/* 3 */}
            <div className="card-three bg-white hidden lg:flex w-full md:w-2/3 lg:w-[45%] flex-col shadow-xl rounded-xl overflow-hidden">
              <div className="w-full">
                <img
                  src={`https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt=""
                  className="object-cover"
                />
              </div>
              {/* Card's Description  */}
              <div className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-xl text-darkgreen">
                  Dessert Wonder Riyadh And Jeddah Advanture
                </h1>
                <p className="font-semibold text-mediumgreen">
                  5 Days, 4 Nights Destinations: Madina , Jeddah
                </p>
                <hr className="w-full border border-mediumgreen border-opacity-50 rounded-full" />
                <p className="font-semibold text-lightgreen">
                  Starting from INR 53,207
                </p>
                <button className="bg-mediumgreen mt-5 w-1/2 mx-auto p-2 rounded-xl text-peach font-semibold text-lg shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
            {/* 4 */}
            <div className="card-four bg-white hidden lg:flex w-full md:w-2/3 lg:w-[45%] flex-col shadow-xl rounded-xl overflow-hidden">
              <div className="w-full">
                <img
                  src={`https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt=""
                  className="object-cover"
                />
              </div>
              {/* Card's Description  */}
              <div className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-xl text-darkgreen">
                  Dessert Wonder Riyadh And Jeddah Advanture
                </h1>
                <p className="font-semibold text-mediumgreen">
                  5 Days, 4 Nights Destinations: Madina , Jeddah
                </p>
                <hr className="w-full border border-mediumgreen border-opacity-50 rounded-full" />
                <p className="font-semibold text-lightgreen">
                  Starting from INR 53,207
                </p>
                <button className="bg-mediumgreen mt-5 w-1/2 mx-auto p-2 rounded-xl text-peach font-semibold text-lg shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <div className="w-11/12 mx-auto mb-20 slider-container">
        <h1 className="text-3xl font-zodiak text-darkgreen md:text-4xl font-semibold mb-10">
          Our Testimonials
        </h1>
        <Slider {...settings} className="w-full bg-transparent">
          <div className="slides p-3">
            <Testimonials />
          </div>
          <div className="slides p-3">
            <Testimonials />
          </div>
          <div className="slides p-3">
            <Testimonials />
          </div>
          <div className="slides p-3">
            <Testimonials />
          </div>
          <div className="slides p-3">
            <Testimonials />
          </div>
        </Slider>
      </div>

      {/* Footer  */}
    </div>
  );
};

export default Homepage;
