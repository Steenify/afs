import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import InPageLoading from 'components/common/inPageLoading';
import PageTitle from 'components/common/PageTitle';

import WorkflowDetailInfo from './workflowDetailInfo';
import WorkflowDetailState from './workflowDetailStateList';
import WorkflowDeleteModal from './workflowDeleteModal';

import { getWorkflowDetailAction, resetWorkflowDetailAction } from './actions';
import { PERMITTIONS_CONFIG } from 'configs';

const WorkflowDetail = (props) => {
  let { id } = useParams();
  const { accountInfo, name, ui, getWorkflowDetailAction, resetWorkflowDetailAction } = props;

  const canDelete = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.DELETE_FLOW);

  useEffect(() => {
    getWorkflowDetailAction(id);
    return resetWorkflowDetailAction;
  }, [getWorkflowDetailAction, resetWorkflowDetailAction, id]);

  return (
    <div className='customer_detail'>
      <PageTitle title={name} className='customer_detail__header'>
        {canDelete && <WorkflowDeleteModal id={id} containerClassName='ml-auto mb-4' />}
      </PageTitle>
      <div className='row'>
        <div className='col-lg-6'>
          <WorkflowDetailInfo />
        </div>
        <div className='col-lg-6'>
          <WorkflowDetailState />
        </div>
      </div>
      <InPageLoading isLoading={ui.loading} />
    </div>
  );
};

const mapStateToProps = ({ workflowDetail, auth }) => {
  const {
    ui,
    data: { workflow },
  } = workflowDetail;
  return {
    accountInfo: auth.data.accountInfo,
    ui,
    name: workflow.name,
  };
};

export default connect(mapStateToProps, {
  getWorkflowDetailAction,
  resetWorkflowDetailAction,
})(WorkflowDetail);
