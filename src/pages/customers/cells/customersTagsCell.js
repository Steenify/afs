import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { updateCustmerEditTagAction } from '../actions';

const CustomersTagsCell = ({ tags, id, updateCustmerEditTag }) => {
  const handleOpenEditTags = () => {
    updateCustmerEditTag({
      showEditTag: true,
      userEditTag: id,
    });
  };

  return (
    <div className='customers__tags tags'>
      {map(tags, (tag, index) => {
        return (
          <button type='button' onClick={handleOpenEditTags} key={`customer__tag__${tag.id}__${index.toString()}`} className='tags__item'>
            {tag.name}
          </button>
        );
      })}
      {!tags.length && (
        <button type='button' className='tags__edit' onClick={handleOpenEditTags}>
          <Pencil width='14px' height='14px' className='icon mr-1' /> <span>Edit Tag</span>
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
    tags: item?.tags || [],
    id: data,
  };
};

const mapDispatchToProps = {
  updateCustmerEditTag: updateCustmerEditTagAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersTagsCell);
