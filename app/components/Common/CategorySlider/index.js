import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";

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

const CarouselComponent = ({categories}) => {

  // Helper function to map category name to an image
  const getCategoryImage = (categoryName) => {
    const lowerCaseName = categoryName.toLowerCase();

    // Laptops
    if (lowerCaseName.includes("laptop")) {
      if (lowerCaseName.includes("new")) {
        return "https://previews.123rf.com/images/jossdiim/jossdiim1111/jossdiim111100014/11514259-vector-illustration-of-laptop-on-white-background.jpg"; // New laptop image URL
      } else if (lowerCaseName.includes("ex-uk")) {
        return "https://t3.ftcdn.net/jpg/02/14/42/34/360_F_214423416_23GmDsRGwDTWD66ypD5Wy0MLFBbwELd6.jpg"; // Ex-UK laptop image URL
      }
      return "https://png.pngtree.com/thumb_back/fh260/background/20220314/pngtree-laptop-on-white-background-image_1048271.jpg"; // General laptop image URL
    }

    // Desktops
    if (lowerCaseName.includes("desktop")) {
      if (lowerCaseName.includes("new")) {
        return "https://www.kindpng.com/picc/m/357-3573039_desktop-computer-pc-clipart-hd-png-download.png"; // New desktop image URL
      } else if (lowerCaseName.includes("ex-uk")) {
        return "https://images.all-free-download.com/images/thumbjpg/computer_311799.jpg"; // Ex-UK desktop image URL
      }
      return "https://image.similarpng.com/very-thumbnail/2021/09/Desktop-computer-on-transparent-background-PNG.png"; // General desktop image URL
    }

    // Printers
    if (lowerCaseName.includes("printer")) {
      if (lowerCaseName.includes("new")) {
        return "https://img.freepik.com/premium-vector/realistic-inkjet-printer-isoalted-white-background_208593-71.jpg?w=360"; // New printer image URL
      } else if (lowerCaseName.includes("ex-uk")) {
        return "https://as2.ftcdn.net/v2/jpg/02/32/86/47/1000_F_232864756_6jNA6V3LzVQBH79gXvPcRzctDn9JWUnS.jpg"; // Ex-UK printer image URL
      }
      return "https://img.freepik.com/premium-vector/realistic-inkjet-printer-isoalted-white-background_208593-71.jpg?w=360"; // General printer image URL
    }

    // Monitors
    if (lowerCaseName.includes("monitor")) {
      if (lowerCaseName.includes("new")) {
        return "https://t3.ftcdn.net/jpg/03/25/48/12/360_F_325481234_IjwaylSbln8rEq2UNXjV9mb3GMWirDT0.jpg"; // New monitor image URL
      } else if (lowerCaseName.includes("ex-uk")) {
        return "https://img.freepik.com/premium-photo/alienware-white-background_971991-9185.jpg"; // Ex-UK monitor image URL
      }
      return "https://t3.ftcdn.net/jpg/03/25/48/12/360_F_325481234_IjwaylSbln8rEq2UNXjV9mb3GMWirDT0.jpg"; // General monitor image URL
    }

    // Tablets
    if (lowerCaseName.includes("tablet")) {
      if (lowerCaseName.includes("new")) {
        return "https://media.istockphoto.com/id/473112078/vector/modern-tablet-illustration.jpg?s=612x612&w=0&k=20&c=BuNWBJvdCv0aGuLsQNm6VvzKgIz1KXYDzp8_Zfxqhhg="; // New tablet image URL
      } else if (lowerCaseName.includes("ex-uk")) {
        return "https://geekland.co/wp-content/uploads/2023/08/SM08Pfront.png"; // Ex-UK tablet image URL
      }
      return "https://media.istockphoto.com/id/473112078/vector/modern-tablet-illustration.jpg?s=612x612&w=0&k=20&c=BuNWBJvdCv0aGuLsQNm6VvzKgIz1KXYDzp8_Zfxqhhg="; // General tablet image URL
    }

    // Special categories
    if (lowerCaseName.includes("today")) {
      return "https://png.pngtree.com/png-clipart/20220922/ourlarge/pngtree-today-promotion-red-message-box-sticker-for-products-png-image_6211078.png"; // Today deals image URL
    }

    if (lowerCaseName.includes("flash")) {
      return "https://i.pinimg.com/1200x/77/26/4b/77264b382db84c7e45236281a70a961e.jpg"; // Flash sale image URL
    }

    if (lowerCaseName.includes("best")) {
      return "https://png.pngtree.com/background/20230729/original/pngtree-best-seller-in-red-star-banner-first-rate-product-commodity-photo-picture-image_4337284.jpg"; // Best seller image URL
    }

    // Accessories
    if (lowerCaseName.includes("accessory")) {
      return "https://img.lovepik.com/png/20231022/Red-black-color-stereo-headset-red-and-black-red-headphones_298734_wh1200.png"; // Accessory image URL
    }

    // Default image for any other category
    return "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg"; // Default image URL
  };

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
                  <Link className="d-block" to={`/shop/category/${category.slug}`}>
                    <img
                      src={getCategoryImage(category.name)}
                      className="img-fit h-100 mx-auto has-transition"
                      alt={category.name}
                    />
                  </Link>
                </div>
                <div className="text-center h-35px text-truncate-2 mt-2">
                  <a href={`/shop/category/${category.slug}`} className="fs-13 fw-500 text-center text-reset hov-text-primary">
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
