import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { useParams } from 'react-router-dom';
import { Form, Alert } from 'reactstrap';

import { Select } from 'components/common/select';
import Input from 'components/common/input';
import Button from 'components/common/button';

import { ReactComponent as Close } from 'assets/img/close.svg';
import { PERMITTIONS_CONFIG, WORKFLOW_STATE_TYPE, WORKFLOW_TRANSITION_ACTION_TYPE } from 'configs';
import { updateWorkflowStateZapierAction, createWorkflowStateZapierAction, deleteWorkflowStateZapierAction, deleteWorkflowTransitionZapierAction, removeNewStateAction } from './actions';

const stateTypes = Object.keys(WORKFLOW_STATE_TYPE).map((key) => ({ value: key, label: key }));
const transitionActionTypes = Object.keys(WORKFLOW_TRANSITION_ACTION_TYPE).map((key) => ({ value: key, label: key }));

const validate = (values) => {
  const errors = {};
  const { name, type, transitions } = values;
  if (!name) {
    errors.name = 'Required';
  }
  if (!type) {
    errors.type = 'Required';
  }
  if (transitions && transitions.length > 0) {
    const keys = Object.keys(WORKFLOW_TRANSITION_ACTION_TYPE);
    const countCheck = {};
    keys.forEach((k) => (countCheck[k] = 0));
    transitions.forEach((t) => (countCheck[t.actionType] += 1));
    keys.forEach((k) => {
      if (countCheck[k] > 1) {
        errors.transitions = { _error: 'Duplicated action type' };
      }
    });
  }
  return errors;
};

const WorkflowState = (props) => {
  let { id } = useParams();
  const {
    accountInfo,
    state,
    index,
    stateOptions,
    errorRequest,
    handleSubmit,
    emailTemplates,
    updateWorkflowStateZapierAction,
    createWorkflowStateZapierAction,
    deleteWorkflowStateZapierAction,
    deleteWorkflowTransitionZapierAction,
    removeNewStateAction,
  } = props;

  const canUpdate = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.UPDATE_FLOW);
  const isCreatingFlow = !state.stateId;

  const [updating, setUpdating] = useState(state.updating);

  const onSubmit = (values) => {
    const messageTemplates = (values.messageTemplates || []).map((template) => {
      const temp = emailTemplates.find((et) => et.id === template);
      return { id: temp.id, name: temp.name };
    });
    const transitions = isCreatingFlow
      ? [
          { actionType: 'CANCEL', state: { name: values.name } },
          { actionType: 'REJECT', state: { name: values.name } },
        ]
      : (values.transitions || [])
          .map((transition) => {
            const temp = stateOptions.find((op) => op.stateId === transition.state);
            if (!temp) return null;
            return {
              ...transition,
              state: { id: temp.stateId, name: temp.name },
            };
          })
          .filter((item) => item);
    const params = { ...values, messageTemplates, transitions };
    console.log('🚀 ~ file: workflowState.js ~ line 27 ~ onSubmit ~ params', params);
    if (!isCreatingFlow) {
      updateWorkflowStateZapierAction(id, params, () => setUpdating(false));
    } else {
      createWorkflowStateZapierAction({ id, index, data: params });
    }
  };

  const onDeleteState = () => {
    if (!isCreatingFlow) {
      deleteWorkflowStateZapierAction({ flowId: id, stateId: state.stateId });
    } else {
      removeNewStateAction(index);
    }
  };

  if (!updating) {
    return (
      <div className='box'>
        <div className='box__body'>
          <div className='row'>
            <div className='col-1 d-flex align-items-center justify-content-center'>
              <h5 className='mb-0'>{index + 1}</h5>
            </div>
            <div className='col-md-8 col-10 d-flex align-items-center'>
              <div>
                <div className='box__sub_title'>{state.name}</div>
                <div>{state.description}</div>
              </div>
            </div>
            <div className='col-md-3 d-flex align-items-center justify-content-end'>
              {canUpdate && (
                <>
                  <Button color='primary' className='btn-create' onClick={() => setUpdating(true)}>
                    Edit
                  </Button>
                  <Close width='25px' height='25px' className='ml-2 icon cursor-pointer' onClick={onDeleteState} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTransitions = ({ fields, meta: { error } }) => {
    const onDeleteTransition = (index) => {
      const { transitionId } = state.transitions[index];
      deleteWorkflowTransitionZapierAction({ flowId: id, transitionId });
    };
    return (
      <div>
        {fields.map((transition, index) => (
          <div className='mb-2' key={`${index}`}>
            <div className='row'>
              <div className='col-md-4'>
                <Field className='form__item mb-2' component={Select} name={`${transition}.actionType`} placeholder='Action Type' options={transitionActionTypes} />
              </div>
              <div className='col-md-7'>
                <Field className='form__item mb-2' component={Select} name={`${transition}.state`} placeholder='State' options={stateOptions} />
              </div>
              <div className='col-md-1 d-flex align-items-center justify-content-end'>
                <Close width='25px' height='25px' className='mb-2 icon cursor-pointer' onClick={() => onDeleteTransition(index)} />
              </div>
            </div>
          </div>
        ))}
        {fields.length < 5 && (
          <Button className='btn-small' onClick={() => fields.push({})}>
            Add transition
          </Button>
        )}
        {error && (
          <span className='error mt-1 d-block' style={{ color: 'red' }}>
            {error}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className='box'>
      <div className='box__body'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errorRequest && errorRequest.message && <Alert color='danger'>{errorRequest.message}</Alert>}
          <div className='row'>
            <div className='col-1 d-flex align-items-center justify-content-center'>
              <h5 className='mb-0'>{index + 1}</h5>
            </div>
            <div className='col-8 d-flex align-items-center' />
            <div className='col-3 d-flex align-items-center justify-content-end'>
              <Close width='25px' height='25px' className='ml-2 icon cursor-pointer' onClick={onDeleteState} />
            </div>
          </div>
          <div className='box__device' />
          <div className='box__sub_title mb-2'>
            <span className=''>General Info</span>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <Field className='form__item' component={Input} name='name' placeholder={'Name'} />
              <Field className='form__item' component={Input} name='component' placeholder={'UI Component'} />
              <Field className='form__item' component={Select} name='type' placeholder='Type' options={stateTypes} />
            </div>
            <div className='col-lg-6'>
              <Field className='form__item' component={Input} name='description' type='textarea' placeholder={'Description'} />
            </div>
          </div>
          <div className='box__sub_title mb-2 d-flex align-items-center'>
            <span className=''>Deliverable?</span>
            <label className='cus-checkbox ml-2'>
              <Field className='form-control sr-only' component={'input'} type='checkbox' name='isDeliverable' />
              <span className='checkmark'></span>
            </label>
          </div>
          <div className='box__sub_title mb-2'>
            <span className=''>Message Templates</span>
          </div>
          <Field className='form__item' component={Select} multi name='messageTemplates' placeholder='Message Templates' options={emailTemplates} />

          {!isCreatingFlow && (
            <>
              <div className='box__sub_title mb-2'>
                <span className=''>Transitions</span>
              </div>
              <FieldArray name='transitions' component={renderTransitions} />
            </>
          )}
          <div className='box__device' />
          <div className='row'>
            <div className='col d-flex align-items-center justify-content-end'>
              <Button className='btn-small' onClick={() => setUpdating(false)}>
                Cancel
              </Button>
              <Button className='btn-create ml-2' type='submit'>
                Save
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ workflowDetail, auth }, { state }) => {
  const {
    data: { emailTemplates },
  } = workflowDetail;
  const initialValues = {
    ...state,
    messageTemplates: (state.messageTemplates || []).map((item) => item.id),
    transitions: (state.transitions || []).map((item) => ({ ...item, state: item.state.id })),
  };
  return {
    accountInfo: auth.data.accountInfo,
    emailTemplates,
    initialValues,
  };
};

export default connect(mapStateToProps, {
  updateWorkflowStateZapierAction,
  createWorkflowStateZapierAction,
  deleteWorkflowStateZapierAction,
  removeNewStateAction,
  deleteWorkflowTransitionZapierAction,
})(
  reduxForm({
    enableReinitialize: true,
    destroyOnUnmount: false,
    keepDirtyOnReinitialize: true,
    validate,
  })(WorkflowState),
);
