import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from 'components/common/button';

import WorkflowState from './workflowState';
import { ReactComponent as DownArrow } from 'assets/img/down-arrow.svg';
import { getEmailTemplatesAction, addNewStateAction } from './actions';
import { PERMITTIONS_CONFIG } from 'configs';

const WorkflowDetailStateList = (props) => {
  const { accountInfo, states, getEmailTemplatesAction, addNewStateAction } = props;

  useEffect(() => {
    getEmailTemplatesAction();
  }, [getEmailTemplatesAction]);

  const stateOptions = useMemo(() => (states || []).map((s) => ({ ...s, label: s.name, value: s.stateId || s.id })), [states]);

  const canUpdate = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.UPDATE_FLOW);

  return (
    <div>
      {states?.map?.((state, index) => {
        const _id = state.stateId || state.id;
        const formName = `workflowStateForm_${_id || _.uniqueId('new')}`;
        return (
          <div key={`${formName}`}>
            <WorkflowState state={state} index={index} stateOptions={stateOptions} form={formName} />
            <div className='d-flex flex-column align-items-center'>
              {_id && (
                <>
                  {!canUpdate && index < states?.length - 1 && <DownArrow height='24px' className='m-2' />}
                  {canUpdate && (
                    <>
                      <DownArrow height='24px' className='m-2' />
                      {index === states?.length - 1 && (
                        <Button className='btn-create' onClick={addNewStateAction}>
                          Add State
                        </Button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
      {(!states || states.length === 0) && canUpdate && (
        <div className='d-flex flex-column align-items-center'>
          <Button className='btn-create' onClick={addNewStateAction}>
            Add State
          </Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ workflowDetail, auth }) => {
  const {
    data: { workflow },
  } = workflowDetail;
  return {
    accountInfo: auth.data.accountInfo,
    states: workflow.states,
  };
};

export default connect(mapStateToProps, { getEmailTemplatesAction, addNewStateAction })(WorkflowDetailStateList);
