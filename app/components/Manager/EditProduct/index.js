/**
 *
 * EditProduct
 *
 */

import React, {useState} from 'react';

import {Link} from 'react-router-dom';
import {Row, Col, Spinner} from 'reactstrap';

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

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';

const isSelectedFile = value =>
  Boolean(value && typeof value === 'object' && value.name && value.size !== undefined);

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
    activateProduct,
    removeProductImage
  } = props;

  const [isSubmitting, setSubmitting] = useState(false);
  const [imageError, setImageError] = useState('');

  const handleImageChange = (name, file) => {
    if (!file) {
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setImageError('Only JPG, PNG, WEBP or GIF images are allowed.');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError('Image must be 5 MB or smaller.');
      return;
    }

    setImageError('');
    productChange(name, file);
  };

  const clearSelectedImage = () => {
    setImageError('');
    productChange('image', null);

    // Allow selecting the same file again after clearing it.
    const input = document.querySelector('.edit-product input[type="file"][name="image"]');
    if (input) {
      input.value = '';
    }
  };

  const handleRemoveImage = async () => {
    if (!window.confirm('Remove the current product image?')) {
      return;
    }

    setImageError('');
    await removeProductImage(product._id);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSubmitting(true);

    try {
      await updateProduct();
    } finally {
      const input = document.querySelector('.edit-product input[type="file"][name="image"]');
      if (input) {
        input.value = '';
      }
      setSubmitting(false);
    }
  };

  return (
    <div className='edit-product'>
      <div className='d-flex flex-row mx-0 mb-3'>
        <label className='mr-1'>Product link </label>
        <Link to={`/product/${product.slug}`} className='default-link'>
          {product.slug}
        </Link>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Row className='mb-3'>
          <Col xs='12' md='6'>
            <h6>Product image</h6>
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{maxWidth: '220px', maxHeight: '220px', objectFit: 'contain'}}
              />
            ) : (
              <p className='text-muted'>No image uploaded.</p>
            )}
          </Col>
          <Col xs='12' md='6'>
            <Input
              type='file'
              name='image'
              label='Replace image'
              accept={IMAGE_ACCEPT}
              error={imageError ? [imageError] : null}
              onInputChange={handleImageChange}
            />
            {isSelectedFile(product.image) && (
              <div className='d-flex align-items-center mt-2'>
                <span className='mr-2'>New: {product.image.name}</span>
                <Button
                  size='sm'
                  variant='danger'
                  text='Clear'
                  onClick={clearSelectedImage}
                />
              </div>
            )}
            {product.imageUrl && (
              <div className='mt-2'>
                <Button
                  size='sm'
                  variant='danger'
                  text='Remove image'
                  onClick={handleRemoveImage}
                />
              </div>
            )}
          </Col>
        </Row>

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
                  value={product.categories.map(category => ({
                    value: category._id,
                    label: category.name,
                  }))}
                  options={categories}
                  handleSelectChange={selectedCategories => {
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
            text={isSubmitting ? <><Spinner size='sm'/> Saving...</> : 'Save'}
            disabled={isSubmitting}
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
