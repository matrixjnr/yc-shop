import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom next arrow
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", right: "0px" }}
      onClick={onClick}
    >
      <i className="las la-arrow-right" style={{ fontSize: "24px" }}></i>
    </div>
  );
};

// Custom previous arrow
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", left: "0px", zIndex: 1 }}
      onClick={onClick}
    >
      <i className="las la-arrow-left" style={{ fontSize: "24px" }}></i>
    </div>
  );
};

const CarouselComponent = () => {
  const categories = [
    {
      name: "Desktop Mini Tower",
      imgSrc: "https://smartworldkenya.com/public/assets/img/placeholder.jpg",
      link: "https://smartworldkenya.com/category/desktop-mini-tower-d9poq"
    },
    {
      name: "Desktop Tower",
      imgSrc: "https://smartworldkenya.com/public/assets/img/placeholder.jpg",
      link: "https://smartworldkenya.com/category/desktop-tower-g2iwh"
    },
    {
      name: "Galaxy Buds",
      imgSrc: "https://smartworldkenya.com/public/assets/img/placeholder.jpg",
      link: "https://smartworldkenya.com/category/galaxy-buds-xjaso"
    },
    {
      name: "Desktop Mini Tower",
      imgSrc: "https://smartworldkenya.com/public/assets/img/placeholder.jpg",
      link: "https://smartworldkenya.com/category/desktop-mini-tower-d9poq"
    },
    {
      name: "Desktop Tower",
      imgSrc: "https://smartworldkenya.com/public/assets/img/placeholder.jpg",
      link: "https://smartworldkenya.com/category/desktop-tower-g2iwh"
    },
    {
      name: "Galaxy Buds",
      imgSrc: "https://smartworldkenya.com/public/assets/img/placeholder.jpg",
      link: "https://smartworldkenya.com/category/galaxy-buds-xjaso"
    },
    {
      name: "Desktop Mini Tower",
      imgSrc: "https://smartworldkenya.com/public/assets/img/placeholder.jpg",
      link: "https://smartworldkenya.com/category/desktop-mini-tower-d9poq"
    },
    {
      name: "Desktop Tower",
      imgSrc: "https://smartworldkenya.com/public/assets/img/placeholder.jpg",
      link: "https://smartworldkenya.com/category/desktop-tower-g2iwh"
    },
    {
      name: "Galaxy Buds",
      imgSrc: "https://smartworldkenya.com/public/assets/img/placeholder.jpg",
      link: "https://smartworldkenya.com/category/galaxy-buds-xjaso"
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200, // XL screen
        settings: { slidesToShow: 6 }
      },
      {
        breakpoint: 992, // LG screen
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 768, // MD screen
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 576, // SM screen
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <section className="mb-3 mb-md-4 pt-3 pt-md-2rem">
      <div className="container">
        <div className="bg-white px-sm-0">
          <Slider {...settings}>
            {categories.map((category, index) => (
              <div key={index} className="carousel-box px-4 d-flex flex-column align-items-center">
                <div className="size-80px overflow-hidden hov-scale-img">
                  <a className="d-block" href={category.link}>
                    <img
                      src={category.imgSrc}
                      className="img-fit h-100 mx-auto has-transition"
                      alt={category.name}
                      onError={(e) => (e.target.src = 'https://smartworldkenya.com/public/assets/img/placeholder.jpg')}
                    />
                  </a>
                </div>
                <div className="text-center h-35px text-truncate-2 mt-2">
                  <a href={category.link} className="fs-13 fw-500 text-center text-reset hov-text-primary">
                    {category.name}
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default CarouselComponent;
