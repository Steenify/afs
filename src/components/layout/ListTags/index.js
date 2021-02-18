import React, { Component } from 'react';
import { filter } from 'lodash';

class ListTags extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  handleChangeText = (e) => {
    const { value } = e.target;
    this.setState({
      text: value,
    });
  };

  render() {
    const { text } = this.state;
    const { onSave, tagItems, placeholder, tags, orderStatusCount } = this.props;

    const totalCount = tagItems.reduce((total = 0, current) => {
      return (total += orderStatusCount[current.id] || 0);
    }, 0);

    let filteredTags = tagItems;
    if (text) {
      filteredTags = filter(tagItems, (t) => (t?.value || '').toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1);
    }

    return (
      <div className='order__info p-3 list_artist_assign order__filter inside_popover'>
        <div className='order__artist '>
          <div className='search mb-3'>
            <input type='text' placeholder={placeholder} value={text} onChange={this.handleChangeText} className='form-control search__input search__box' />
          </div>
          <div className='list list_status  mb-3'>
            <button onClick={() => onSave('')} key={`list__status_option__all`} className={`status ${!tags.length && 'active'}`}>
              All
              <span className='number'>{totalCount || 0}</span>
            </button>
            {filteredTags.map(({ value = '', id = '' }) => {
              return (
                <button
                  onClick={() => onSave(value)}
                  key={`list__productAction_option__${id}`}
                  className={`status ${tags?.includes(value) && 'active'}`}
                  style={{ whiteSpace: 'normal', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
                  {value}
                  {orderStatusCount[id] && <span className='number'>{orderStatusCount[id]}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

ListTags.defaultProps = {
  placeholder: 'Product name',
};

export default ListTags;
