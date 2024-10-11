/**
 *
 * BrandsShop
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet"; // Import Helmet for managing meta tags

import actions from '../../actions';
import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class BrandsShop extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts('brand', slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.filterProducts('brand', slug);
    }
  }

  // Function to convert slug to title case
  formatBrandName(slug) {
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  }

  render() {
    const { products, isLoading, authenticated, updateWishlist } = this.props;
    const brandName = this.formatBrandName(this.props.match.params.slug); // Convert slug to title case

    return (
      <div className='brands-shop'>
        <Helmet>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="icon" href="/images/favicon2.ico" />

          {/* Avoid cache storing in the browser */}
          <meta httpEquiv='cache-control' content='no-cache' />
          <meta httpEquiv='expires' content='0' />
          <meta httpEquiv='pragma' content='no-cache' />

          {/* Title */}
          <title>{`${brandName} Laptops, Desktops, Printers & More in Nairobi, Kenya | Young Computer Store`}</title>

          {/* Meta Description */}
          <meta name="description"
                content={`Explore a wide range of products from ${brandName} at Young Computer Store, your go-to shop for affordable electronics in Nairobi, Kenya.`} />

          {/* Meta Keywords */}
          <meta name="keywords"
                content={`wholesale ${brandName}, affordable ${brandName}, electronics, laptops, desktops, printers, tablets, Young Computer Store, Nairobi`} />

          {/* Open Graph tags for social media */}
          <meta property="og:title" content={`Young Computer Store - ${brandName} Laptops, Desktops, Printers & More!`} />
          <meta property="og:description" content={`Shop the best deals on ${brandName} products at Young Computer Store, the leading electronics wholesaler in Nairobi.`} />
          <meta property="og:image" content="URL to an image for social sharing" />
          <meta property="og:url" content="https://youngcomputers.co.ke" />
          <meta property="og:type" content="website" />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`Young Computer Store - ${brandName} Laptops, Desktops, Printers & More!`} />
          <meta name="twitter:description" content={`Find great deals on ${brandName} products at Young Computer Store, your top choice in Nairobi.`} />
          <meta name="twitter:image" content="URL to an image for Twitter sharing" />
        </Helmet>
        {isLoading ? (
          <LoadingIndicator />
        ) : products.length > 0 ? (
          <ProductList
            products={products}
            authenticated={authenticated}
            updateWishlist={updateWishlist}
          />
        ) : (
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

export default connect(mapStateToProps, actions)(BrandsShop);
