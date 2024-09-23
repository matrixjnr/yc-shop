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
import CarouselComponent from "../../components/Common/CategorySlider";
import FlashSaleComponent from "../../components/Common/FlashSale";
import FeaturedProductsComponent from "../../components/Common/FeaturedComponent";
import TodayDeals from "../../components/Common/TodayDeals";

class Homepage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts(slug);
  }

  render() {
    const { products, isLoading, authenticated, updateWishlist, brands } =
      this.props;

    // Filter the products
    // Safely filter the products by checking if categories exist
    const onOfferProducts = products.filter((product) => product.onOffer);
    const featuredProducts = products.filter((product) => product.featured);

    // categories is an array of objects[{name: "Today"}, {name: "Best Sell"}]
    const todayTopPicks = products.filter(
      (product) =>
        product.categories &&
        product.categories.some((category) => category.name.toLowerCase().includes("today"))
    );

    // today category slug from the first product but the category should match today
    // const categorySlug = todayTopPicks[0]?.categories.find((category) =>
    //   category.name.toLowerCase().includes("today")
    // )?.slug;

    const categorySlug = todayTopPicks.length;

    const bestSellers = products.filter(
      (product) =>
        product.categories &&
        product.categories.some((category) => category.name.toLowerCase().includes("best sell"))
    );


    // const onOfferProducts = [];
    // const featuredProducts = [];
    // const todayTopPicks = [];
    // const bestSellers = [];

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
        <CarouselComponent />
        <FlashSaleComponent />
        {isLoading && <LoadingIndicator />}
        <Row className="flex-row">
          {todayTopPicks.length > 0 && (
            <Col xs="12" className="mb-3 mt-5 p-0">
              <TodayDeals products={todayTopPicks} categorySlug={categorySlug} />
            </Col>
          )}
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
              <FeaturedProductsComponent products={featuredProducts} title="Featured Products" />
            </Col>
          )}
          {bestSellers.length > 0 && (
            <Col xs="12" className="mb-3 mt-5">
              <FeaturedProductsComponent products={featuredProducts} title="Best Selling Products" />
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
