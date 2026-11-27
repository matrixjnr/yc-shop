import React, { useState } from 'react';
import {Row, Col, Spinner} from 'reactstrap';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';
import Editor from 'react-simple-wysiwyg';
import {ROLES} from "../../../constants";

const taxableSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
];

const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';

const AddProduct = (props) => {
  const {
    user,
    productFormData,
    formErrors,
    productChange,
    addProduct,
    brands,
    categories
  } = props;

  // Loading state to manage form submission
  const [isSubmitting, setSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    // Set loading state
    setSubmitting(true);

    try {
      await addProduct();
    } catch (error) {
      // Errors are surfaced through the redux notification system.
    } finally {
      setSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className='add-product'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Product Name'}
              value={productFormData.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <SelectOption
              disabled={user.role === ROLES.Merchant}
              error={formErrors['brand']}
              name={'brand'}
              label={'Select Brand'}
              value={
                user.role === ROLES.Merchant ? brands[1] : productFormData.brand
              }
              options={brands}
              handleSelectChange={(value) => {
                productChange('brand', value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <SelectOption
              disabled={user.role === ROLES.Merchant}
              error={formErrors['categories']}
              name={'category'}
              label={'Select Category'}
              value={productFormData.category}
              options={categories}
              handleSelectChange={(value) => {
                productChange('category', value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <h6>Description</h6>
            <Editor
              value={productFormData.description}
              name='description'
              onChange={(e) => {
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
              value={productFormData.quantity}
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
              value={productFormData.price}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['taxable']}
              label={'Taxable'}
              name={'taxable'}
              options={taxableSelect}
              value={productFormData.taxable}
              handleSelectChange={(value) => {
                productChange('taxable', value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'file'}
              error={formErrors['image']}
              name={'image'}
              label={'Product image'}
              accept={IMAGE_ACCEPT}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
            {productFormData.image && productFormData.image.name && (
              <small className='text-muted'>
                Selected: {productFormData.image.name}
              </small>
            )}
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-product'}
              name={'isActive'}
              label={'Active?'}
              checked={productFormData.isActive}
              toggleCheckboxChange={(value) => productChange('isActive', value)}
            />
            <Switch
              id={'featured-product'}
              name={'featured'}
              label={'Featured?'}
              checked={productFormData.featured}
              toggleCheckboxChange={(value) => productChange('featured', value)}
            />
            <Switch
              id={'onOffer-product'}
              name={'onOffer'}
              label={'On Offer?'}
              checked={productFormData.onOffer}
              toggleCheckboxChange={(value) => productChange('onOffer', value)}
            />
            {productFormData.onOffer && (
              <Input
                type={'number'}
                error={formErrors['offerPrice']}
                label={'Offer Price'}
                name={'offerPrice'}
                min={1}
                placeholder={'Product Offer Price'}
                value={productFormData.offerPrice}
                onInputChange={(name, value) => {
                  productChange(name, value);
                }}
              />
            )}
          </Col>
        </Row>
        <hr />
        <div className='add-product-actions'>
          <Button
            type='submit'
            text={
              isSubmitting ? (
                <>
                  <Spinner /> Saving...
                </>
              ) : (
                'Add Product'
              )
            }
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
