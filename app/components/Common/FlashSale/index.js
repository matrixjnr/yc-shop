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

const FlashSaleComponent = () => {
  const products = [
    {
      name: "Apple AirPods Max",
      imgSrc: "https://smartworldkenya.com/public/uploads/all/rGihn0qtD5iusXcY5CNcpLWsakzqzQZubuM214A5.webp",
      price: "KSH95,999",
      oldPrice: "KSH96,000",
      link: "https://smartworldkenya.com/product/apple-airpods-max-thrsm"
    },
    {
      name: "Apple iPhone 14 Pro Max",
      imgSrc: "https://smartworldkenya.com/public/uploads/all/P0RW398m38BdFjLffYFnavuLY1W6QUC3o6yYqF3p.webp",
      price: "KSH177,999",
      oldPrice: "KSH178,000",
      link: "https://smartworldkenya.com/product/apple-iphone-14-pro-max"
    },
    {
      name: "Apple AirPods Pro 2",
      imgSrc: "https://smartworldkenya.com/public/uploads/all/eADbyH1gj2ptF7G0rNc1fGTwg5hOkDE0bXI9GN1Z.webp",
      price: "KSH33,598",
      oldPrice: "KSH33,599",
      link: "https://smartworldkenya.com/product/apple-airpods-pro-2"
    },
    {
      name: "Apple AirPods Max",
      imgSrc: "https://smartworldkenya.com/public/uploads/all/rGihn0qtD5iusXcY5CNcpLWsakzqzQZubuM214A5.webp",
      price: "KSH95,999",
      oldPrice: "KSH96,000",
      link: "https://smartworldkenya.com/product/apple-airpods-max-thrsm"
    },
    {
      name: "Apple iPhone 14 Pro Max",
      imgSrc: "https://smartworldkenya.com/public/uploads/all/P0RW398m38BdFjLffYFnavuLY1W6QUC3o6yYqF3p.webp",
      price: "KSH177,999",
      oldPrice: "KSH178,000",
      link: "https://smartworldkenya.com/product/apple-iphone-14-pro-max"
    },
    {
      name: "Apple AirPods Pro 2",
      imgSrc: "https://smartworldkenya.com/public/uploads/all/eADbyH1gj2ptF7G0rNc1fGTwg5hOkDE0bXI9GN1Z.webp",
      price: "KSH33,598",
      oldPrice: "KSH33,599",
      link: "https://smartworldkenya.com/product/apple-airpods-pro-2"
    },
    {
      name: "Apple AirPods Max",
      imgSrc: "https://smartworldkenya.com/public/uploads/all/rGihn0qtD5iusXcY5CNcpLWsakzqzQZubuM214A5.webp",
      price: "KSH95,999",
      oldPrice: "KSH96,000",
      link: "https://smartworldkenya.com/product/apple-airpods-max-thrsm"
    },
    {
      name: "Apple iPhone 14 Pro Max",
      imgSrc: "https://smartworldkenya.com/public/uploads/all/P0RW398m38BdFjLffYFnavuLY1W6QUC3o6yYqF3p.webp",
      price: "KSH177,999",
      oldPrice: "KSH178,000",
      link: "https://smartworldkenya.com/product/apple-iphone-14-pro-max"
    },
    {
      name: "Apple AirPods Pro 2",
      imgSrc: "https://smartworldkenya.com/public/uploads/all/eADbyH1gj2ptF7G0rNc1fGTwg5hOkDE0bXI9GN1Z.webp",
      price: "KSH33,598",
      oldPrice: "KSH33,599",
      link: "https://smartworldkenya.com/product/apple-airpods-pro-2"
    },
    // Add more products here
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200, // XL screen
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 992, // LG screen
        settings: { slidesToShow: 3.7 }
      },
      {
        breakpoint: 768, // MD screen
        settings: { slidesToShow: 2.7 }
      },
      {
        breakpoint: 576, // SM screen
        settings: { slidesToShow: 1.5 }
      }
    ]
  };

  return (
    <div className="fluid-container">
      <div className="px-3 px-md-2rem pb-3 pb-md-4 mb-3 flash-sale-container">
        {/* Top Section */}
        <div className="d-flex flex-wrap align-items-baseline justify-content-center justify-content-sm-between mb-2 mb-md-3 pt-2 pt-md-3 position-relative">
          {/* Title */}
          <h3 className="fs-16 fs-md-20 fw-700 mb-2 mb-sm-0 flash-sale-title">
            <span className="d-inline-block text-white flash-sale-title">
              Flash Sale</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 16 24" className="ml-3">
              <path id="Path_28795" data-name="Path 28795" d="M30.953,13.695a.474.474,0,0,0-.424-.25h-4.9l3.917-7.81a.423.423,0,0,0-.028-.428.477.477,0,0,0-.4-.207H21.588a.473.473,0,0,0-.429.263L15.041,18.151a.423.423,0,0,0,.034.423.478.478,0,0,0,.4.2h4.593l-2.229,9.683a.438.438,0,0,0,.259.5.489.489,0,0,0,.571-.127L30.9,14.164a.425.425,0,0,0,.054-.469Z" transform="translate(-15 -5)" fill="#fcc201" />
            </svg>
          </h3>

          {/* Countdown */}
          <div className="aiz-count-down-box-div text-white flash-sale-countdown">
            <div className="aiz-count-down-box align-items-center mb-2 mb-lg-0">
              <div className="countdown-item">
                <span className="countdown-digit">102</span><span className="countdown-name">DAYS</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-item">
                <span className="countdown-digit">05</span><span className="countdown-name">HRS</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-item">
                <span className="countdown-digit">26</span><span className="countdown-name">MIN</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-item">
                <span className="countdown-digit">57</span><span className="countdown-name">SEC</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="text-white d-flex align-items-center mb-0">
            <a href="https://smartworldkenya.com/flash-deals" className="fs-10 fs-md-12 fw-700 text-reset text-white opacity-60 hov-opacity-100 hov-text-primary mr-3">View All Flash Sale</a>
            <span className="border-left border-soft-light border-width-2 pl-3 text-white">
              <a href="https://smartworldkenya.com/flash-deal/deals-of-the-day-uxvjp" className="fs-10 fs-md-12 fw-700 text-white text-reset opacity-60 hov-opacity-100 hov-text-primary">View All Products from This Flash Sale</a>
            </span>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="row no-gutters align-items-center border" style={{ background: '#ffffff' }}>
          {/* Flash Deals Banner */}
          <div className="col-xxl-2 col-md-3 col-sm-4 col-5 h-150px h-md-200px h-lg-240px">
            <img className="h-100 w-100 w-xl-auto" src="/images/banners/banner-3.jpg" alt="Flash Deals Banner" style={{objectFit: 'cover'}}/>
          </div>

          {/* Flash Deals Products */}
          <div className="col-xxl-10 col-md-9 col-sm-8 col-7">
            <Slider {...settings}>
              {products.map((product, index) => (
                <div key={index} className="carousel-box bg-white">
                  <div className="h-150px h-md-200px h-lg-240px flash-deal-item position-relative text-center has-transition hov-shadow-out z-1">
                    <a href={product.link} className="d-block py-md-2 overflow-hidden hov-scale-img" title={product.name}>
                      <img
                        src={product.imgSrc}
                        className="h-100px h-md-120px h-lg-140px mw-100 mx-auto has-transition"
                        alt={product.name}
                        onError={(e) => (e.target.src = 'https://smartworldkenya.com/public/assets/img/placeholder.jpg')}
                      />
                      <div className="fs-10 fs-md-14 mt-2 text-center h-md-48px has-transition overflow-hidden pt-md-4 flash-deal-price lh-1-5">
                        <span className="d-block text-primary fw-700">{product.price}</span>
                        <del className="d-block fw-400 text-secondary">{product.oldPrice}</del>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleComponent;
