import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './LoginRight.css';

const LoginRight = () => {
  return (
    <div className="login-right">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="login-swiper">
        {[
          {
            img: '/illustrations/illustration-1.jpeg',
            title: 'Keep Track, Stay Connected',
            desc: 'Vigilo helps you manage attendance with ease and accuracy.',
          },
          {
            img: '/illustrations/illustration-2.jpeg',
            title: 'Get Instant Updates',
            desc: 'Receive real-time notifications on class changes and attendance.',
          },
        ].map(({ img, title, desc }, index) => (
          <SwiperSlide key={index}>
            <div className="illustration">
              <img
                src={img}
                alt={title}
              />
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LoginRight;

// Inside your return statement
