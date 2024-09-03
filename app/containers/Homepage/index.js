import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import actions from "../../actions";
import banners from "./banners.json";

import CarouselSlider from "../../components/Common/CarouselSlider";
import { responsiveOneItemCarousel } from "../../components/Common/CarouselSlider/utils";
import ProductCard from "../../components/Store/ProductCard";
import LoadingIndicator from "../../components/Common/LoadingIndicator";

class Homepage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts(slug);
  }

  render() {
    const { products, isLoading, authenticated, updateWishlist, brands } =
      this.props;

    // Filter the products
    const onOfferProducts = products.filter((product) => product.onOffer);
    const featuredProducts = products.filter((product) => product.featured);
    const hpLaptops = products.filter((product) => product.brand.name === "HP");
    // categories are optional, check it if present in product
    const newLaptops = products.filter(
      (product) => product.category?.name === "New Laptops"
    );

    console.log("onOfferProducts", onOfferProducts);

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrows: false,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
            arrows: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    };

    return (
      <div className="homepage">
        <Row className="no-gutters mx-1">
          <Col xs="12" lg="9" className="order-lg-2">
            <div className="home-carousel">
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={true}
                slides={banners}
                autoPlaySpeed={5000}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
          <Col xs="12" lg="3" className="order-lg-1">
            <div className="h-100 shadow p-3">
              {brands.slice(0, 10).map((brand, index) => (
                <Link
                  to={`/shop/brand/${brand.slug}`}
                  className="d-block brand-link py-2 fw-bold"
                  key={index}
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </Col>
        </Row>
        {isLoading && <LoadingIndicator />}
        <Row className="flex-row">
          {onOfferProducts.length > 0 && (
            <Col xs="12" className="mb-3 mt-4">
              <h2>On Offer</h2>
              <Slider {...sliderSettings}>
                {onOfferProducts.map((item, index) => (
                  <div key={index} className="product-list home-list">
                    <ProductCard
                      product={item}
                      updateWishlist={updateWishlist}
                      authenticated={authenticated}
                    />
                  </div>
                ))}
              </Slider>
            </Col>
          )}
          {featuredProducts.length > 0 && (
            <Col xs="12" className="mb-3 mt-5">
              <h2>Featured Products</h2>
              <Slider {...sliderSettings}>
                {featuredProducts.map((item, index) => (
                  <div key={index} className="product-list home-list">
                    <ProductCard
                      product={item}
                      updateWishlist={updateWishlist}
                      authenticated={authenticated}
                    />
                  </div>
                ))}
              </Slider>
            </Col>
          )}
          {hpLaptops.length > 0 && (
            <Col xs="12" className="mb-3 mt-5">
              <h2>HP Laptops</h2>
              <Slider {...sliderSettings}>
                {hpLaptops.map((item, index) => (
                  <div key={index} className="product-list home-list">
                    <ProductCard
                      product={item}
                      updateWishlist={updateWishlist}
                      authenticated={authenticated}
                    />
                  </div>
                ))}
              </Slider>
            </Col>
          )}
          {newLaptops.length > 0 && (
            <Col xs="12" className="mb-3">
              <h2>New Laptops</h2>
              <Slider {...sliderSettings}>
                {newLaptops.map((item, index) => (
                  <div key={index} className="product-list home-list">
                    <ProductCard
                      product={item}
                      updateWishlist={updateWishlist}
                      authenticated={authenticated}
                    />
                  </div>
                ))}
              </Slider>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,
    brands: state.brand.storeBrands,
  };
};

export default connect(mapStateToProps, actions)(Homepage);
