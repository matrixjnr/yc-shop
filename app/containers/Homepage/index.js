import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Slider from "react-slick";
import actions from "../../actions";
import ProductCard from "../../components/Store/ProductCard";
import CarouselComponent from "../../components/Common/CategorySlider";
import FlashSaleComponent from "../../components/Common/FlashSale";
import FeaturedProductsComponent from "../../components/Common/FeaturedComponent";
import TodayDeals from "../../components/Common/TodayDeals";
import ShimmerContainer from "../../components/Common/Shimmer";


class Homepage extends React.PureComponent {
  componentDidMount() {
    const { fetchAllProducts, fetchCategories } = this.props;

    // Fetch all necessary data at once to reduce separate requests
    Promise.all([fetchAllProducts(), fetchCategories()])
      .then(() => {
        console.log("All data loaded successfully.");
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }

  render() {
    const {
      isLoading,
      authenticated,
      updateWishlist,
      allProducts,
      categories,
    } = this.props;

    const onOfferProducts = allProducts.filter((product) => product.onOffer);
    const featuredProducts = allProducts.filter((product) => product.featured);
    const todayTopPicks = allProducts.filter(
      (product) =>
        product.categories &&
        product.categories.some((category) =>
          category.name.trim().toLowerCase().includes("today")
        )
    );
    const flashSaleProducts = allProducts.filter(
      (product) =>
        product.categories &&
        product.categories.some((category) =>
          category.name.trim().toLowerCase().includes("flash")
        )
    );
    const bestSellers = allProducts.filter(
      (product) =>
        product.categories &&
        product.categories.some((category) =>
          category.name.trim().toLowerCase().includes("best")
        )
    );

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
        {/* Carousel Component */}
        {isLoading ? (
          <ShimmerContainer height={300} width="100%" /> // Shimmer placeholder
        ) : (
          <CarouselComponent categories={categories} />
        )}

        {/* Hero Image Section */}
        <div
          className="hero-banner"
          style={{
            width: "100%",
            height: "400px",
            backgroundImage: "url('/images/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            color: "white",
            paddingLeft: "50px",
          }}
        >
          <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "10px" }}>
            <h1 style={{ fontSize: "2.5rem", lineHeight: "1.5" }}>
              Welcome to <br />
              Young Computer Systems <br />
              Your one stop for all things computing
            </h1>
          </div>
        </div>
          
        {/* Flash Sale Component */}
        {isLoading ? (
          <ShimmerContainer height={400} width="100%" /> // Shimmer placeholder for flash sale
        ) : (
          <FlashSaleComponent products={flashSaleProducts} />
        )}

        <Row className="flex-row">
          {/* Today Top Picks */}
          {isLoading ? (
            <Col xs="12" className="mb-3 mt-5 p-0">
              <ShimmerContainer height={300} width="100%" /> {/* Shimmer for today deals */}
            </Col>
          ) : (
            todayTopPicks.length > 0 && (
              <Col xs="12" className="mb-3 mt-5 p-0">
                <TodayDeals products={todayTopPicks} />
              </Col>
            )
          )}

          {/* On Offer Products */}
          {isLoading ? (
            <Col xs="12" className="mb-3 mt-4">
              <ShimmerContainer height={300} width="100%" /> {/* Shimmer for on offer */}
            </Col>
          ) : (
            onOfferProducts.length > 0 && (
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
            )
          )}

          {/* Featured Products */}
          {isLoading ? (
            <Col xs="12" className="mb-3 mt-5">
              <ShimmerContainer height={300} width="100%" /> {/* Shimmer for featured products */}
            </Col>
          ) : (
            featuredProducts.length > 0 && (
              <Col xs="12" className="mb-3 mt-5">
                <FeaturedProductsComponent
                  products={featuredProducts}
                  title="Featured Products"
                  updateWishlist={updateWishlist}
                  authenticated={authenticated}
                />
              </Col>
            )
          )}

          {/* Best Sellers */}
          {isLoading ? (
            <Col xs="12" className="mb-3 mt-5">
              <ShimmerContainer height={300} width="100%" /> {/* Shimmer for best sellers */}
            </Col>
          ) : (
            bestSellers.length > 0 && (
              <Col xs="12" className="mb-3 mt-5">
                <FeaturedProductsComponent
                  products={bestSellers} // Use `bestSellers` instead of `featuredProducts`
                  title="Best Selling Products"
                  updateWishlist={updateWishlist}
                  authenticated={authenticated}
                />
              </Col>
            )
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allProducts: state.product.allProducts,
  isLoading: state.product.isLoading,
  authenticated: state.authentication.authenticated,
  categories: state.category.categories,
});

export default connect(mapStateToProps, actions)(Homepage);
