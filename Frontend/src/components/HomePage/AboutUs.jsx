/* eslint-disable react/prop-types */
import { MessageCircleMore } from 'lucide-react';

const AboutUs = ({ isMenuOpen }) => {
  return (
    <>
      <section
        className={`section-two mt-20 mb-52 flex flex-col lg:flex-row lg:items-start lg:gap-10 w-11/12 mx-auto ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
      >
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

          {/* <h3 className="heading-who text-2xl md:text-4xl font-zodiak uppercase text-darkgreen text-left">
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
          </p> */}
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
    </>
  );
};

export default AboutUs;
