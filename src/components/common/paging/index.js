import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { ReactComponent as ArrowLeft } from 'assets/img/arrowleft.svg';

import './style.scss';

class Paging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.activePage,
    };
  }

  updateActivePage = (currentPage) => {
    this.setState({ currentPage });
    this.props.onSelect(currentPage);
  };

  previousPage = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
    this.props.onSelect(this.state.currentPage - 1);
  };

  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
    this.props.onSelect(this.state.currentPage + 1);
  };

  handleChangePageMobile = (e) => {
    const { value } = e.target;
    this.setState({ currentPage: value });
    this.props.onSelect(value);
  };

  itemsToDisplay = (activePage) => {
    const items = [];
    let item = {};
    let previousItem = {};
    const padSup = Math.floor((this.props.maxButtons - 1) / 2);
    const modulo = (this.props.maxButtons - 1) % 2;
    const padInf = padSup + modulo;
    for (let j = 0; j < this.props.items; j++) {
      item = {};
      if (
        j === 0 ||
        j === this.props.items - 1 ||
        j === activePage - 1 ||
        j === activePage - 2 ||
        (activePage === 1 && j === 1) ||
        (activePage - padInf < j && j < activePage + padSup)
      ) {
        item.display = 'display';
      } else if (previousItem.display === 'disabled') {
        item.display = 'hidden';
      } else {
        item.display = 'disabled';
      }
      items.push(item);
      previousItem = { ...item };
      if (item.display === 'hidden') {
        previousItem.display = 'disabled';
      }
    }
    return items;
  };

  displayPaginationItem = (i) => {
    const { activePage } = this.props;

    return (
      <PaginationItem className={`${activePage === i + 1 && 'active'}`} key={i}>
        <PaginationLink onClick={() => this.updateActivePage(i + 1)}>
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    );
  };
  render() {
    const { activePage, items } = this.props;
    if (!(items > 1)) {
      return null;
    }

    const listItems = [...Array(items).keys()];

    return (
      <div className='paging__table'>
        <div className='paging__desktop'>
          <Pagination>
            <PaginationItem {...(activePage === 1 && { disabled: true })}>
              <PaginationLink onClick={() => this.updateActivePage(1)}>
                ««
              </PaginationLink>
            </PaginationItem>
            <PaginationItem {...(activePage === 1 && { disabled: true })}>
              <PaginationLink previous onClick={this.previousPage} />
            </PaginationItem>
            {this.itemsToDisplay(activePage).map((paginationItem, i) =>
              paginationItem.display === 'display' ? (
                this.displayPaginationItem(i)
              ) : paginationItem.display === 'disabled' ? (
                <PaginationItem disabled key={i}>
                  <PaginationLink href='#'>...</PaginationLink>
                </PaginationItem>
              ) : null,
            )}
            <PaginationItem {...(activePage === items && { disabled: true })}>
              <PaginationLink next onClick={this.nextPage} />
            </PaginationItem>
            <PaginationItem {...(activePage === items && { disabled: true })}>
              <PaginationLink onClick={() => this.updateActivePage(items)}>
                »»
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>

        <div className='paging__mobile'>
          <div className='paging__wrapper'>
            <button
              className='navi prev'
              {...(activePage === 1 && { disabled: true })}
              onClick={this.previousPage}>
              <span className='sr-only'>PREV</span>
              <span className='icon'>
                <ArrowLeft />
              </span>
            </button>
            <select
              value={activePage}
              onChange={this.handleChangePageMobile}
              className='form-control select'>
              {listItems.map((item) => (
                <option key={`option__page__${item}`} value={item + 1}>
                  {item + 1}
                </option>
              ))}
            </select>
            <button
              className='navi next'
              {...(activePage === items && { disabled: true })}
              onClick={this.nextPage}>
              <span className='sr-only'>NEXT</span>
              <span className='icon'>
                <ArrowLeft />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Paging.defaultProps = {
  maxButtons: 8,
};

export default Paging;
