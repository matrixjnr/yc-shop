import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Slider from "react-slick";
import actions from "../../actions";

import ProductCard from "../../components/Store/ProductCard";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import CarouselComponent from "../../components/Common/CategorySlider";
import FlashSaleComponent from "../../components/Common/FlashSale";
import FeaturedProductsComponent from "../../components/Common/FeaturedComponent";
import TodayDeals from "../../components/Common/TodayDeals";
import {fetchCategories} from "../Category/actions";

class Homepage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    // this.props.filterProducts(slug);
    this.props.fetchAllProducts();
    this.props.fetchCategories();
  }

  render() {
    const { products, isLoading, authenticated, updateWishlist, brands, allProducts, categories } =
      this.props;

    // Filter the products
    // Safely filter the products by checking if categories exist
    const onOfferProducts = allProducts.filter((product) => product.onOffer);
    const featuredProducts = allProducts.filter((product) => product.featured);

    // all products length
    const allProductsLength = allProducts.length;

    // on offer products length
    const onOfferProductsLength = onOfferProducts.length;

    // featured products length
    const featuredProductsLength = featuredProducts.length;

    // categories is an array of objects[{name: "Today"}, {name: "Best Sell"}]
    const todayTopPicks = allProducts.filter(
      (product) =>
        product.categories &&
        product.categories.some((category) =>
          category.name.trim().toLowerCase().includes("today")
        )
    );

    const categorySlug = todayTopPicks[0]?.categories.find((category) =>
      category.name.trim().toLowerCase().includes("today")
    )?.slug;

    // today top picks length
    const todayTopPicksLength = todayTopPicks.length;

    const flashSaleProducts = allProducts.filter(
      (product) =>
        product.categories &&
        product.categories.some((category) =>
          category.name.trim().toLowerCase().includes("flash")
        )
    );

    const flashSaleSlug = flashSaleProducts[0]?.categories.find((category) =>
      category.name.trim().toLowerCase().includes("flash")
    )?.slug;

    // flash sale products length

    const bestSellers = allProducts.filter(
      (product) =>
        product.categories &&
        product.categories.some((category) =>
          category.name.trim().toLowerCase().includes("best")
        )
    );

    // best sell products length
    const bestSellersLength = bestSellers.length;

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
            dots: true,
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
            dots: false,
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
        <CarouselComponent categories={categories}/>
        <FlashSaleComponent products={flashSaleProducts} flashSaleSlug={flashSaleSlug}/>
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
                  <div key={index} className="product-list home-list w-90">
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
              <FeaturedProductsComponent
                products={featuredProducts}
                title="Featured Products"
                updateWishlist={updateWishlist}
                authenticated={authenticated}
              />
            </Col>
          )}
          {bestSellers.length > 0 && (
            <Col xs="12" className="mb-3 mt-5">
              <FeaturedProductsComponent
                products={featuredProducts}
                title="Best Selling Products"
                updateWishlist={updateWishlist}
                authenticated={authenticated}
              />
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
    allProducts: state.product.allProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,
    brands: state.brand.storeBrands,
    categories: state.category.categories,
  };
};

export default connect(mapStateToProps, actions)(Homepage);
