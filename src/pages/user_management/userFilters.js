import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Select } from 'components/common/select';

import { updateUserFilterAction, actGetUserRoles } from './actions';

const UserFilters = (props) => {
  const { t } = useTranslation();
  const { updateUserFilterAction, name, role, userRoles, actGetUserRoles } = props;

  const handleChangeText = (e) => {
    handleSearchTextAPI(e.target.value);
  };

  const handleSearchTextAPI = debounce((value) => {
    updateUserFilterAction({
      name: value,
      page: 0,
    });
  }, 1000);

  const onRoleChange = (role) => {
    updateUserFilterAction({ role });
  };

  useEffect(() => {
    updateUserFilterAction({ name, page: 0 });
    actGetUserRoles();
  }, [actGetUserRoles, updateUserFilterAction, name]);

  return (
    <div className='user__filters'>
      <div className='filter__main'>
        <div className='filter__text'>
          <input type='text' defaultValue={name} placeholder={t('baseApp.userManagement.search.emailUserName') + '...'} className='search__box form-control' onChange={handleChangeText} />
        </div>
        <div className='filter__text ml-md-3'>
          <Select isClearable className='mb-0' placeholder={t('baseApp.userManagement.search.role') + '...'} input={{ value: role, onChange: onRoleChange }} options={userRoles} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    name: user.filter.name,
    role: user.filter.role,
    userRoles:
      user.userRoles &&
      user.userRoles.map((item) => ({
        label: item.name,
        value: item.name,
        desc: item.description,
      })),
  };
};

const mapDispatchToProps = {
  updateUserFilterAction,
  actGetUserRoles,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFilters);
