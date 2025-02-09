/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import imgOne from '../../assets/img/lp-1.avif';

const AboutUsCard = ({
  title,
  cardRef,
  index,
  activeIndex,
  cardWidth,
  setCardWidth,
}) => {
  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [cardRef, setCardWidth]);
  return (
    <div
      className="w-full md:w-[48%] flex flex-col flex-shrink-0 gap-5 border-[1.5px] border-opacity-40 shadow-sm border-darkgreen p-3 rounded-xl transition-all ease-in-out duration-700"
      ref={index === 0 ? cardRef : null}
      style={{
        transform: `translateX(-${activeIndex * (cardWidth + 20)}px)`,
        transition: 'transform 0.5s ease-in-out',
      }}
    >
      <div className="w-full flex items-start justify-between">
        <div className="h-[150px] w-2/3 lg:w-[40%] rounded-lg overflow-hidden">
          <img src={imgOne} alt="" className="w-full h-full" />
        </div>
        <span className="text-xl md:text-2xl font-jakarta text-darkgreen font-semibold">
          {title}
        </span>
      </div>
      <div className="w-full md:text-sm font-jakarta p-1 text-mediumgreen font-medium">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
        reprehenderit laboriosam veniam cum obcaecati tempore quo suscipit
        ducimus molestiae at?
      </div>
    </div>
  );
};

export default AboutUsCard;
