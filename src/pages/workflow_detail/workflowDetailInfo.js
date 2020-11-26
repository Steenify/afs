import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Form, Spinner, Alert } from 'reactstrap';
import { useParams } from 'react-router-dom';

import Button from 'components/common/button';
import Input from 'components/common/input';

import { updateWorkflowAction } from './actions';
import { PERMITTIONS_CONFIG } from 'configs';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

const WorkflowDetailInfo = (props) => {
  let { id } = useParams();
  const { accountInfo, loadingInfo, handleSubmit, submitting, errorRequest, updateWorkflowAction } = props;

  const canUpdate = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.UPDATE_FLOW);
  const onSubmit = async (values) => {
    await updateWorkflowAction(id, values);
  };

  return (
    <div className='customer_detail__original customer_detail__box customer_detail__form form box'>
      <div className='box__body'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errorRequest && errorRequest.message && <Alert color='danger'>{errorRequest.message}</Alert>}

          <div className='box__sub_title mb-2'>
            <span className=''>General Info:</span>
          </div>
          <Field disabled={!canUpdate} className='form__item' component={Input} name='name' placeholder='Name' />
          <Field disabled={!canUpdate} className='form__item' component={Input} name='description' type='textarea' placeholder={'Description'} />
          {canUpdate && (
            <div className='d-flex mt-2'>
              <Button disabled={submitting} color='primary' type='submit' className='btn-create' containerClassName='ml-auto'>
                &nbsp; {'Save'} &nbsp;
                {loadingInfo && <Spinner size='sm' color='light' />}
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ workflowDetail, auth }) => {
  const {
    data: { workflow },
    ui: { loadingInfo },
  } = workflowDetail;
  return {
    accountInfo: auth.data.accountInfo,
    loadingInfo,
    initialValues: { name: workflow?.name, description: workflow?.description },
  };
};

export default connect(mapStateToProps, { updateWorkflowAction })(
  reduxForm({
    form: 'workflowDetailInfo',
    enableReinitialize: true,
    validate,
  })(WorkflowDetailInfo),
);
