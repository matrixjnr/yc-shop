import React from "react";
import Slider from "react-slick";
import NewProductCard from "../../Store/NewProductCard";

// Custom next arrow
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", right: "10px" }}
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
      style={{ ...style, display: "flex", left: "10px", zIndex: 1 }}
      onClick={onClick}
    >
      <i className="las la-arrow-left" style={{ fontSize: "24px" }}></i>
    </div>
  );
};

const FeaturedProductsComponent = ({ products, title }) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="mb-2 mb-md-3 mt-2 mt-md-3">
      <div className="container">
        <div className="row gutters-15">
          <div className="col" id="section_featured_div">
            <div className="border">
              <div className="d-flex px-4 py-3 align-items-baseline justify-content-between">
                <h3 className="fs-16 fs-md-20 fw-700 mb-2 mb-sm-0">
                  <span>{title}</span>
                </h3>
                <div className="d-flex">
                  <button className="arrow-prev text-secondary mr-2">
                    <i className="las la-angle-left fs-20 fw-600"></i>
                  </button>
                  <button className="arrow-next text-secondary ml-2">
                    <i className="las la-angle-right fs-20 fw-600"></i>
                  </button>
                </div>
              </div>
              <div className="px-xl-1">
                <Slider {...sliderSettings}>
                  {products.map((product) => (
                    <NewProductCard key={product.id} product={product} />
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsComponent;
