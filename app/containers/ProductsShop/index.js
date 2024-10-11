/**
 *
 * ProductsShop
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { Helmet } from "react-helmet";

class ProductsShop extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts(slug);
  }

  render() {
    const { products, isLoading, authenticated, updateWishlist } = this.props;

    const displayProducts = products && products.length > 0;

    return (
      <div className='products-shop'>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="icon" href="/images/favicon2.ico" />

          {/* Avoid cache storing in the browser */}
          <meta httpEquiv='cache-control' content='no-cache' />
          <meta httpEquiv='expires' content='0' />
          <meta httpEquiv='pragma' content='no-cache' />

          {/* Title */}
          <title>Young Computer Store | Shop New and Refurbished Laptops, Desktops, Printers & More!</title>

          {/* Meta Description */}
          <meta name="description"
                content="Discover unbeatable deals at Young Computer Store in Nairobi, Kenya. We offer a wide range of wholesale electronics including laptops, desktops, monitors, printers (new and refurbished), and tablets from top brands like HP, Dell, Lenovo, Canon, Modio, Huawei, iPads, and Samsung." />

          {/* Meta Keywords */}
          <meta name="keywords"
                content="wholesale laptops, laptops Nairobi, refurbished laptops, new laptops, monitors, desktops, printers, HP laptops, Dell laptops, Lenovo laptops, Canon printers, Modio tablets, Huawei tablets, iPads, MacBooks, Samsung phones, Samsung tablets, office electronics" />

          {/* Open Graph tags for social media */}
          <meta property="og:title" content="Young Computer Store" />
          <meta property="og:description"
                content="Shop a wide range of new and refurbished laptops, desktops, printers, and tablets at Young Computer Store, your leading wholesaler in Nairobi." />
          <meta property="og:image" content="URL to an image for social sharing" />
          <meta property="og:url" content="https://youngcomputers.co.ke" />
          <meta property="og:type" content="website" />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Young Computer Store" />
          <meta name="twitter:description"
                content="Find cheap wholesale laptops, desktops, and more at Young Computer Store, your best choice in Nairobi." />
          <meta name="twitter:image" content="URL to an image for Twitter sharing" />
        </Helmet>
        {isLoading && <LoadingIndicator />}
        {displayProducts && (
          <ProductList
            products={products}
            authenticated={authenticated}
            updateWishlist={updateWishlist}
          />
        )}
        {!isLoading && !displayProducts && (
          <NotFound message='No products found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(ProductsShop);
