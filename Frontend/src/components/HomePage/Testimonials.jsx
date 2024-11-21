import { Star } from 'lucide-react';

const Testimonials = () => {
  return (
    <>
      <div className="review-card bg-peach rounded-lg p-4 w-full flex flex-col gap-5 shadow-lg">
        <span className="flex items-center gap-2 text-mediumgreen">
          <Star className="fill-mediumgreen" />
          <Star className="fill-mediumgreen" />
          <Star className="fill-mediumgreen" />
          <Star className="fill-mediumgreen" />
          <Star className="fill-mediumgreen" />
        </span>
        <p className="font-semibold text-mediumgreen">
          &quot;Thanks to Memon Tours, we didn’t have to worry about a single
          detail and could fully enjoy our trip. We’re already planning our next
          adventure with them! &quot;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-50"></div>
          <div className="font-bold text-mediumgreen">Zaid Achhwa</div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
