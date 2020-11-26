import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Button from 'components/common/button';
import ListProduct from 'components/layout/ListProduct';
import Dropbox from 'components/common/dropbox';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { updateShowAddProductAction, addOrderItemAction } from '../actions';

class AddProductModal extends Component {
  constructor() {
    super();
    this.state = {
      selected: {},
      note: '',
    };

    this.dropbox = React.createRef();
  }

  toggle = () => {
    this.setState({
      selected: {},
      note: '',
    });
    const { updateShowAddProduct, isShowAddProduct } = this.props;
    updateShowAddProduct(!isShowAddProduct);
  };

  handleSelect = (item) => {
    this.setState({
      selected: item,
    });
  };

  handleChangeNote = (e) => {
    const { value } = e.target;
    this.setState({
      note: value,
    });
  };

  handleAdd = () => {
    const { addOrderItem, order } = this.props;
    const { selected, note } = this.state;

    if (isEmpty(selected)) {
      toast.warn('Please select product');
      return;
    }

    if (this.dropbox.current) {
      const files = this.dropbox.current.getFiles();
      let isDoneUpload = true;

      files.forEach((file) => {
        if (!file.isUploaded || !file.id) {
          isDoneUpload = false;
        }
      });

      if (!isDoneUpload) {
        toast.warn('Files is uploading!');
        return;
      }

      const data = {
        name: selected.name,
        productName: selected.name,
        note,
        attachments: files.map((file) => ({
          id: file.id,
          url: file?.url,
        })),
      };

      addOrderItem(order?.id, data, () => {
        this.toggle();
      });
    }
  };

  render() {
    const { isShowAddProduct, order } = this.props;
    const { selected, note } = this.state;

    return (
      <Modal isOpen={isShowAddProduct} toggle={this.toggle} fade={false} size='lg' className='modal-dialog-centered  modal-no-border order_detail__addproduct'>
        <div className='addproduct'>
          <ModalHeader toggle={this.toggle}>
            Add Product
            <button type='button' className='modal-close' onClick={this.toggle}>
              <CloseIcon width='25px' height='25px' />
            </button>
          </ModalHeader>
          <ModalBody>
            <div className='addproduct__note mb-3'>
              <textarea className='form-control' placeholder='Product Note' onChange={this.handleChangeNote} value={note} rows='3'></textarea>
            </div>
            <div className='addproduct__upload mb-3'>
              <Dropbox className='upload' ref={this.dropbox} orderNumber={order.number} id={`add__product__modal`} />
            </div>

            <div className={`addproduct__content`}>
              <ListProduct selected={selected} onSelect={this.handleSelect} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={this.toggle}>
              Cancel
            </Button>
            <Button color='primary' onClick={this.handleAdd}>
              Add
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = ({ orderDetail }) => ({
  isShowAddProduct: orderDetail.ui.isShowAddProduct,
});

const mapDispatchToProps = {
  updateShowAddProduct: updateShowAddProductAction,
  addOrderItem: addOrderItemAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);
