/**
 *
 * EditProduct
 *
 */

import React from 'react';

import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap';

import {ROLES} from '../../../constants';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';
import Editor from 'react-simple-wysiwyg';

const taxableSelect = [
  {value: 1, label: 'Yes'},
  {value: 0, label: 'No'}
];

const EditProduct = props => {
  const {
    user,
    product,
    productChange,
    formErrors,
    brands,
    categories,
    updateProduct,
    deleteProduct,
    activateProduct
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateProduct();
  };

  return (
    <div className='edit-product'>
      {console.log('EditProduct props', props)}
      <div className='d-flex flex-row mx-0 mb-3'>
        <label className='mr-1'>Product link </label>
        <Link to={`/product/${product.slug}`} className='default-link'>
          {product.slug}
        </Link>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Product Name'}
              value={product.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['sku']}
              label={'Sku'}
              name={'sku'}
              placeholder={'Product Sku'}
              value={product.sku}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['slug']}
              label={'Slug'}
              name={'slug'}
              placeholder={'Product Slug'}
              value={product.slug}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <h6>Description</h6>
            <Editor
              value={product.description}
              onChange={e => {
                productChange('description', e.target.value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['quantity']}
              label={'Quantity'}
              name={'quantity'}
              decimals={false}
              placeholder={'Product Quantity'}
              value={product.quantity}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Price'}
              name={'price'}
              min={1}
              placeholder={'Product Price'}
              value={product.price}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['taxable']}
              label={'Taxable'}
              multi={false}
              name={'taxable'}
              value={[product.taxable ? taxableSelect[0] : taxableSelect[1]]}
              options={taxableSelect}
              handleSelectChange={value => {
                productChange('taxable', value.value);
              }}
            />
          </Col>
          {user.role === ROLES.Admin && (
            <>
              <Col xs='12' md='12'>
                <SelectOption
                  error={formErrors['brand']}
                  label={'Select Brand'}
                  multi={false}
                  value={product.brand}
                  options={brands}
                  handleSelectChange={value => {
                    productChange('brand', value);
                  }}
                />
              </Col>
              <Col xs='12' md='12'>
                <SelectOption
                  error={formErrors['categories']}
                  label={'Select Category'}
                  multi={true}
                  // Mapping product categories to format compatible with SelectOption
                  value={product.categories.map(category => ({
                    value: category._id,
                    label: category.name,
                  }))}
                  options={categories}
                  handleSelectChange={selectedCategories => {
                    // Updating the product's categories to match the selected values
                    const updatedCategories = selectedCategories.map(option => ({
                      _id: option.value,
                      name: option.label,
                    }));
                    productChange('categories', updatedCategories);
                  }}
                />
              </Col>
            </>
          )}
          <Col xs='12' md='12' className='mt-3 mb-2'>
            <Switch
              id={`enable-product-${product._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={product?.isActive}
              toggleCheckboxChange={value => {
                productChange('isActive', value);
                activateProduct(product._id, value);
              }}
            />
            <Switch md='12' className='my-2'
                    id={'featured-product'}
                    name={'featured'}
                    label={'Featured?'}
                    checked={product.featured}
                    toggleCheckboxChange={value => productChange('featured', value)}
            />
            <Switch md='12' className='my-2'
                    id={'onOffer-product'}
                    name={'onOffer'}
                    label={'On Offer?'}
                    checked={product.onOffer}
                    toggleCheckboxChange={value => productChange('onOffer', value)}
            />
            {product?.onOffer && (
              <Input
                type={'number'}
                error={formErrors['offerPrice']}
                label={'Offer Price'}
                name={'offerPrice'}
                min={1}
                placeholder={'Product Offer Price'}
                value={product?.offerPrice}
                onInputChange={(name, value) => {
                  productChange(name, value);
                }}
              />
            )}
          </Col>
        </Row>
        <hr/>
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteProduct(product._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
