import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Badge, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { uniqBy } from 'lodash';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import MenuItem from './MenuItem';

import { ReactComponent as NSComments } from 'assets/img/ns_comments.svg';
import { ReactComponent as NSUpdateStatus } from 'assets/img/ns_update_status.svg';
import { ReactComponent as NSAssigned } from 'assets/img/ns_assigned.svg';
import { ReactComponent as NSUpload } from 'assets/img/ns_upload.svg';
import { ReactComponent as CloseIcon } from 'assets/img/close_white.svg';

import { WEB_ROUTES } from 'configs';

import { getNotificationActionsAction, updateNotificationActionAction, getRecipientsAction } from './action';

const NotificationSettings = (props) => {
  const {
    history,
    notificationSettings: {
      ui: { isLoading },
      data,
    },
    getNotificationActionsAction,
    updateNotificationActionAction,
    getRecipientsAction,
  } = props;

  const { t } = useTranslation();

  const tabs = [
    {
      icon: <NSComments />,
      title: 'Comments',
      description: 'These are notifications for comments feedback on order.',
    },
    {
      icon: <NSUpdateStatus />,
      title: 'Update Status',
      description: 'These are notifications for update status order.',
    },
    {
      icon: <NSAssigned />,
      title: 'Assigned',
      description: 'These are notifications for assigned order for artist.',
    },
    {
      icon: <NSUpload />,
      title: 'Upload',
      description: 'These are notifications for upload new image for artist.',
    },
  ];

  const [actions, setActions] = useState([]);

  const [recipients, setRecipients] = useState([]);

  const [activeTab, setActiveTab] = useState();

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getNotificationActionsAction(null, (e, data) => {
      if (e) {
        toast.error(e.message);

        return;
      }

      setActions((old) => uniqBy([...old, ...data], 'id').filter((a) => !a.disabled));
    });
  }, []);

  return (
    <Layout
      documentTitle={WEB_ROUTES.NOTIFICATION_SETTINGS.title}
      container
      fluid
      onGoBack={() => history.goBack()}
      bottomView={
        <Button
          color='primary'
          type='submit'
          style={{
            height: 38,
            display: 'inline-flex',
            alignItems: 'center',
            minWidth: 110,
            marginTop: 24,
            justifyContent: 'center',
          }}
          onClick={() => {
            const action = actions[activeTab];

            if (action) {
              action.followers = recipients.filter((r) => r.checked);

              console.log('----- BEFORE', action);

              updateNotificationActionAction(action.id, action, (e, data) => {
                if (e) {
                  toast.error(e.message);

                  return;
                }

                console.log('----- AFTER', data);
              });
            }
          }}>
          &nbsp; {t('entity.action.save')} &nbsp;
          {isLoading && <Spinner size='sm' color='light' />}
        </Button>
      }>
      <Breadcrumb
        data={[
          {
            title: t(WEB_ROUTES.SETTINGS.title),
            active: false,
            path: WEB_ROUTES.SETTINGS.path,
          },
          {
            title: t(WEB_ROUTES.NOTIFICATION_SETTINGS.title),
            active: true,
          },
        ]}
      />

      <PageTitle {...WEB_ROUTES.NOTIFICATION_SETTINGS} />

      <div className='row'>
        <div className='col col-12 col-md-5 col-lg-4'>
          {/* <div className='box'> */}
          <Nav className='nav-pills box'>
            {actions.map(({ icon, name, description }, i) => (
              <NavItem key={i} className='cursor-pointer w-100'>
                <NavLink
                  className={[activeTab === i ? 'active' : ''].join(' ').trim()}
                  onClick={() => {
                    toggle(i);
                  }}>
                  <MenuItem title={name} description={description} active={activeTab === `${i}`} />
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          {/* </div> */}
        </div>

        <div className='col col-12 col-md-7 col-lg-8'>
          <div className='box h-100'>
            <div className='row'>
              <div className='col col-12 border-bottom'>
                <h4 className='mb-3'>List of recipients</h4>
              </div>
            </div>

            {actions[activeTab] && (
              <div className='row pt-3'>
                <div className='col col-12 col-lg-6'>
                  <input
                    type='text'
                    placeholder='Search orders'
                    className='search__box form-control'
                    // value=''
                    onChange={(e) => {
                      if (!e.target.value) {
                        setRecipients([]);

                        return;
                      }

                      getRecipientsAction(e.target.value, (e, data) => {
                        if (e) {
                          toast.error(e?.message);

                          return;
                        }

                        setRecipients((old) => [...data].map((d) => ({ ...d, checked: false })));
                      });
                    }}
                  />

                  <div
                    style={{
                      overflowY: 'auto',
                      // maxHeight: 'calc(100vh - 180px - 20rem)',
                    }}>
                    {recipients.map((recipient, i) => (
                      <div className={`d-flex my-4 align-items-center ml-0`} key={i}>
                        <label className='cus-checkbox'>
                          <input
                            className='form-control sr-only'
                            type='checkbox'
                            onChange={() => {
                              const list = [...recipients];

                              const index = list.findIndex((r) => r.id === recipient.id);

                              if (index !== -1) {
                                const item = list[index];

                                item.checked = true;

                                list[index] = item;
                              }

                              setRecipients((old) => list);
                            }}
                            checked={recipient.checked}
                          />
                          <span className='checkmark'></span>
                        </label>
                        <label
                          className='pl-3 checkbox_title mb-0'
                          // htmlFor={code}
                        >{`${recipient.lastName || ''} ${recipient.firstName || ''}`}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='col col-12 col-lg-6'>
                  {(actions[activeTab]?.followers || []).map((follower, i) => (
                    <Badge color='primary' className='d-inline-flex align-items-center mr-2 mb-2' key={i}>
                      <div className='p-2' style={{ fontSize: 17, fontWeight: 400 }}>
                        {`${follower.lastName || ''} ${follower.firstName || ''}`}
                      </div>
                      <CloseIcon />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ notificationSettings }, ownProps) => ({
  ...ownProps,
  notificationSettings,
});

const mapDispatchToProps = {
  getNotificationActionsAction,
  updateNotificationActionAction,
  getRecipientsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettings);
