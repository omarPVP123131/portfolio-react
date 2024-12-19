import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import testimonials from "../../data/testimonial";
import { Testimonial } from "../../types/index";

// Componente de tarjeta de Testimonio
const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  index?: number;
}> = ({ testimonial, index = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />

      <div className="relative">
        <div className="absolute -top-2 -left-2 text-6xl text-blue-500/20 dark:text-blue-400/20 font-serif">
          "
        </div>

        <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10 pt-4">
          {testimonial.content}
        </p>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {testimonial.name}
            </h4>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {testimonial.position}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-xl"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  );
};

interface TestimonialSectionProps {
    darkMode: boolean;
    handleScroll: (ref: React.RefObject<HTMLElement>) => void;
    testimoniosRef: React.RefObject<HTMLElement>;
  }
  
  export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
    darkMode,
    handleScroll,
    testimoniosRef,
  }) => {
    return (
    <section
      ref={testimoniosRef}
      id="testimonios"
      className="py-16 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Testimonios
        </motion.h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard testimonial={testimonial} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
