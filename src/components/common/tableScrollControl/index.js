import React, { Component, createRef } from 'react';
import './style.scss';
class TableScrollControl extends Component {
  constructor() {
    super();
    this.scrollbar = createRef();
    this.scrollContainer = createRef();
  }

  componentDidMount() {
    this.hanleUpdate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.hanleUpdate();
    }
  }

  hanleUpdate = () => {
    const { tableRef } = this.props;
    if (tableRef.current && this.scrollbar.current) {
      const tableW = tableRef.current.clientWidth;
      this.scrollbar.current.style.width = tableW + 'px';
    }
  };

  handleScroll = (e) => {
    const { containerRef } = this.props;
    if (this.scrollContainer.current && containerRef.current) {
      const left = this.scrollContainer.current.scrollLeft;
      containerRef.current.scroll({ left: left });
    }
  };

  render() {
    return (
      <div className='scroll_control'>
        <div onScroll={this.handleScroll} ref={this.scrollContainer} className='scroll_control__container'>
          <div ref={this.scrollbar} className='scroll_control__width'></div>
        </div>
      </div>
    );
  }
}

export default TableScrollControl;
