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
      <div className="homepage" style={{ backgroundColor: "#f9f9f9", paddingBottom: "40px" }}>
        {isLoading ? (
          <ShimmerContainer height={300} width="100%" />
        ) : (
          <CarouselComponent categories={categories} />
        )}

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
            justifyContent: "center",
            padding: "20px",
            borderRadius: "20px",
            marginTop: "30px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              padding: "30px 40px",
              borderRadius: "20px",
              maxWidth: "800px",
              width: "100%",
              textAlign: "left",
            }}
          >
            <h1
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: "3.5rem",
                marginBottom: "1rem",
                lineHeight: "1.4",
              }}
            >
              <span style={{ color: "#fff", fontSize: "2rem", fontWeight: "500", marginBottom: "0.5rem", lineHeight: "1.4"}}>Welcome to</span><br />
              <span style={{ color: "#fff", fontSize: "3.5rem", fontWeight: "600", marginBottom: "1rem"}}>Young Computer Systems</span>
            </h1>
            <p
              style={{
                color: "#fff",
                fontWeight: "400",
                fontSize: "1.25rem",
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
                margin: 0,
              }}
            >
              Your one stop for all things computing
            </p>
          </div>
        </div>

        {isLoading ? (
          <ShimmerContainer height={400} width="100%" />
        ) : (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "30px",
              marginTop: "40px",
              marginBottom: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <FlashSaleComponent products={flashSaleProducts} />
          </div>
        )}

        <Row className="flex-row">
          {isLoading ? (
            <Col xs="12" className="mb-3 mt-5 p-0">
              <ShimmerContainer height={300} width="100%" />
            </Col>
          ) : (
            todayTopPicks.length > 0 && (
              <Col xs="12" className="mb-3 mt-5 p-0">
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    padding: "30px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                >
                  <TodayDeals products={todayTopPicks} />
                </div>
              </Col>
            )
          )}

          {isLoading ? (
            <Col xs="12" className="mb-3 mt-4">
              <ShimmerContainer height={300} width="100%" />
            </Col>
          ) : (
            onOfferProducts.length > 0 && (
              <Col xs="12" className="mb-3 mt-4">
                <h2 style={{ fontWeight: 700, fontSize: "1.75rem" }}>On Offer</h2>
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    padding: "20px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  }}
                >
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
                </div>
              </Col>
            )
          )}

          {isLoading ? (
            <Col xs="12" className="mb-3 mt-5">
              <ShimmerContainer height={300} width="100%" />
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

          {isLoading ? (
            <Col xs="12" className="mb-3 mt-5">
              <ShimmerContainer height={300} width="100%" />
            </Col>
          ) : (
            bestSellers.length > 0 && (
              <Col xs="12" className="mb-3 mt-5">
                <FeaturedProductsComponent
                  products={bestSellers}
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

const mapStateToProps = (state) => {
  return {
    allProducts: state.product.allProducts,
    products: state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,
    brands: state.brand.storeBrands || [],
  };
};

export default connect(mapStateToProps, actions)(Homepage);
