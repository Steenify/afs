import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Input from 'components/common/input';
import Button from 'components/common/button';
import { Select } from 'components/common/select';
import { ReactComponent as SearchIcon } from 'assets/img/search.svg';
import { Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { actGetUserRoles } from './actions';

const UserSearchBox = ({ style, handleSubmit, onSearch, actGetUserRoles, ...props }) => {
  useEffect(() => {
    actGetUserRoles();
  }, [actGetUserRoles]);

  const onSubmit = (values) => {
    onSearch(values);
  };

  const clearForm = () => {
    props.reset();
    onSearch({});
  };

  const { userRoles } = props;
  const { t } = useTranslation();

  return (
    <form className='search-advance' style={{ ...style }} onSubmit={handleSubmit(onSubmit)}>
      <Row form className='align-items-end'>
        <Col md={4}>
          <Field className='mb-0' component={Input} name='name' label='' placeholder={t('baseApp.userManagement.search.emailUserName') + '...'} />
        </Col>
        <Col md={4}>
          <Field className='mb-0 form-group--role' component={Select} name='role' label='' placeholder={t('baseApp.userManagement.search.role') + '...'} options={userRoles} />
        </Col>
        <Col md={4}>
          <div className='d-flex w-100'>
            <Button
              color='primary'
              style={{
                height: 38,
                paddingLeft: 23,
                paddingRight: 23,
                marginRight: 11,
              }}>
              <SearchIcon className='btn-icon' />
              {t('entity.action.search')}
            </Button>
            <Button onClick={() => clearForm()} style={{ height: 38, paddingLeft: 23, paddingRight: 23 }}>
              {t('entity.action.clear')}
            </Button>
          </div>
        </Col>
      </Row>
    </form>
  );
};

const mapStateToProps = (state, { query = {} }) => {
  return {
    initialValues: {
      ...query,
    },
    userRoles:
      state.user.data.userRoles &&
      state.user.data.userRoles.map((item) => ({
        label: item.name,
        value: item.name,
        desc: item.description,
      })),
  };
};

export default connect(mapStateToProps, { actGetUserRoles })(
  reduxForm({
    form: 'userSearchBox',
  })(UserSearchBox),
);
