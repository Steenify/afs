import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Badge, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { uniqBy, debounce } from 'lodash';

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

import { getNotificationActionsAction, getNotificationActionAction, updateNotificationActionAction, getRecipientsAction } from './action';

import './style.scss';

const NotificationSettings = (props) => {
  const {
    history,
    notificationSettings: {
      ui: { isLoading },
      data,
    },
    getNotificationActionsAction,
    getNotificationActionAction,
    updateNotificationActionAction,
    getRecipientsAction,
  } = props;

  const { t } = useTranslation();

  const [actions, setActions] = useState([]);

  const [search, setSearch] = useState('');

  const [recipients, setRecipients] = useState([]);

  const [selectedRecipients, setSelectedRecipients] = useState([]);

  const [activeTab, setActiveTab] = useState();

  const [messageDefault, setMessageDefault] = useState('');

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setRecipients((old) => []);
      setSelectedRecipients((old) => []);
      setSearch('');
    }
  };

  const debounceGetRecipientsAction = useCallback(debounce(getRecipientsAction, 800), [getRecipientsAction]);

  useEffect(() => {
    getNotificationActionsAction(null, (e, data) => {
      if (e) {
        toast.error(e.message);

        return;
      }

      setActions((old) => uniqBy([...old, ...data], 'id').filter((a) => !a.disabled));

      if (data && data.length !== 0) {
        setActiveTab(0);
      }
    });
  }, []);

  useEffect(() => {
    if (!search) {
      setRecipients([]);

      return;
    }

    debounceGetRecipientsAction(search, (e, data) => {
      if (e) {
        toast.error(e?.message);

        return;
      }

      setRecipients((old) =>
        [...data].map((d) => {
          const hasEffected = selectedRecipients.find((r) => r.userId === d.userId);

          if (hasEffected) return hasEffected;

          return { ...d, checked: false };
        }),
      );
    });
  }, [search]);

  useEffect(() => {
    if (actions[activeTab]?.id) {
      getNotificationActionAction(actions[activeTab]?.id, (e, data) => {
        const followers = data.followers || [];

        const cloneList = [...selectedRecipients];

        const newList = followers
          .map((f) => {
            if (cloneList.find((r) => r.userId === f.userId)) {
              return null;
            }

            return { ...f, checked: true };
          })
          .filter(Boolean);

        setSelectedRecipients((old) => [...old, ...cloneList, ...newList]);

        setMessageDefault(actions[activeTab]?.messageDefault || '');
      });
    }
  }, [activeTab]);

  const onSave = () => {
    const action = actions[activeTab];

    if (action) {
      action.followers = selectedRecipients.filter((r) => r.checked);

      action.messageDefault = messageDefault;

      console.log('----- BEFORE', action);

      updateNotificationActionAction(action.id, action, (e, data) => {
        if (e) {
          toast.error(e.message);

          return;
        }

        console.log('----- AFTER', data);

        const action = actions[activeTab]?.name || '';
        toast.success(`${action} ${action ? 'setting' : 'Setting'} is updated.`.trim());
      });
    }
  };

  const onRemoveRecipient = (recipient) => {
    console.log('----- WILL REMOVE', recipient);

    const list = [...selectedRecipients];

    const index = list.findIndex((r) => r.userId === recipient.userId);

    if (index !== -1) {
      const item = list[index];

      item.checked = false;

      list[index] = item;
    }

    setSelectedRecipients((old) => list);
  };

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
          onClick={onSave}>
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

      <div className='row mt-3'>
        <div className='col col-12 col-md-5 col-lg-4'>
          {/* <div className='box'> */}
          <Nav className='nav-pills box'>
            {actions.map(({ icon, name, description }, i) => (
              <NavItem key={i} className='cursor-pointer w-100'>
                <NavLink
                  className={['notification-action', activeTab === i ? 'active' : ''].join(' ').trim()}
                  onClick={() => {
                    toggle(i);
                  }}>
                  <MenuItem className='notification-action-item' title={name} description={description} active={activeTab === i} />
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          {/* </div> */}
        </div>

        {actions[activeTab] && (
          <div className='col col-12 col-md-7 col-lg-8'>
            <div className='box h-100'>
              <div className='row'>
                <div className='col col-12 border-bottom'>
                  <h4 className='mb-3'>Notification Content</h4>
                </div>
              </div>

              <div className='row pt-3'>
                <div className='col col-12 border-bottom'>
                  <div className='form-group'>
                    <input className='form-control' value={messageDefault} onChange={(e) => setMessageDefault(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className='row mt-3'>
                <div className='col col-12 border-bottom'>
                  <h4 className='mb-3'>List of recipients</h4>
                </div>
              </div>

              <div className='row pt-3'>
                <div className='col col-12 col-lg-6'>
                  <input
                    type='text'
                    placeholder='Search orders'
                    className='search__box form-control'
                    // value=''
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
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
                            onChange={(e) => {
                              const list = [...selectedRecipients];

                              const index = list.findIndex((r) => r.userId === recipient.userId);

                              if (index !== -1) {
                                const item = list[index];

                                item.checked = e.target.checked;

                                list[index] = item;
                              } else {
                                list.push({
                                  ...recipient,
                                  checked: e.target.checked,
                                });
                              }

                              const newRecipients = [...recipients];
                              const item = newRecipients[i];
                              if (item) {
                                item.checked = e.target.checked;

                                newRecipients[i] = item;
                              }

                              setRecipients((old) => newRecipients);

                              setSelectedRecipients((old) => list);
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
                  {selectedRecipients.map(
                    (follower, i) =>
                      follower.checked && (
                        <Badge color='primary' className='d-inline-flex align-items-center mr-2 mb-2' key={i}>
                          <div className='p-2' style={{ fontSize: 17, fontWeight: 400 }}>
                            {`${follower.lastName || ''} ${follower.firstName || ''}`}
                          </div>
                          <CloseIcon className='cursor-pointer' onClick={() => onRemoveRecipient(follower)} />
                        </Badge>
                      ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
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
  getNotificationActionAction,
  updateNotificationActionAction,
  getRecipientsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettings);
