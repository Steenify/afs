import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Paging extends React.Component {
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

  displayPaginationItem = (i) => (
    <PaginationItem key={i}>
      <PaginationLink onClick={() => this.updateActivePage(i + 1)}>
        {i + 1}
      </PaginationLink>
    </PaginationItem>
  );

  render() {
    const { activePage, items } = this.props;
    return (
      <div>
        {items > 0 && (
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
        )}
      </div>
    );
  }
}
