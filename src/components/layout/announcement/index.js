import React from 'react';
import { reduce } from 'lodash';
import { connect } from 'react-redux';
import Ticker from 'react-ticker';

import { ReactComponent as Close } from 'assets/img/close_white.svg';

import { setShowAnnouncement } from 'store/actions';

import './style.scss';

const Announcement = ({ data, showAnnouncement, setShowAnnouncementAction }) => {
  if (!showAnnouncement) {
    return null;
  }

  let text = reduce(
    data,
    (total, item) => {
      return `${total} ${item?.value} |`;
    },
    '',
  );

  text = text.slice(0, -1);

  return (
    <div className='announcement'>
      <div className='announcement__container'>
        <div className='announcement__text'>
          <Ticker offset='run-in' mode='smooth'>
            {() => <>{text}</>}
          </Ticker>
        </div>
        <button type='button' className='announcement__cta' onClick={() => setShowAnnouncementAction(false)}>
          <div className='icon'>
            <Close width='30px' height='30px' />
          </div>
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    showAnnouncement: global.ui.showAnnouncement,
  };
};

const mapDispatchToProps = {
  setShowAnnouncementAction: setShowAnnouncement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Announcement);
