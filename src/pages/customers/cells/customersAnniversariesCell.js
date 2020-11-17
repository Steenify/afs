import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { updateCustomerEditAnniversariesAction } from '../actions';

const CustomersAnniversariesCell = ({ anniversaries, id, updateCustomerEditAnniversariesAction }) => {
  const handleOpenEditAnniversaries = () => {
    updateCustomerEditAnniversariesAction({
      showEditAnniversaries: true,
      userEditAnniversaries: id,
    });
  };

  return (
    <div className='customers__tags tags'>
      {map(anniversaries, (tag, index) => {
        return (
          tag?.name && (
            <button type='button' onClick={handleOpenEditAnniversaries} key={`customer__tag__${tag.id}__${index.toString()}`} className='tags__item'>
              {tag.name}
            </button>
          )
        );
      })}
      {!anniversaries.length && (
        <button type='button' className='tags__edit' onClick={handleOpenEditAnniversaries}>
          <Pencil width='14px' height='14px' className='icon mr-1' /> <span>Edit anniversaries</span>
        </button>
      )}
    </div>
  );
};

const mapStateToProps = ({ customers }, ownProps) => {
  const { data } = ownProps;
  const { items } = customers.list;
  const item = items[data] || {};
  return {
    anniversaries: item?.anniversaries || [],
    id: data,
  };
};

const mapDispatchToProps = {
  updateCustomerEditAnniversariesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersAnniversariesCell);
