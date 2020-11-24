import { request } from 'utils/request';

const WORKFLOW_API = '/api/flows';

export const getWorkflowListService = (params) =>
  request({
    url: WORKFLOW_API,
    method: 'GET',
    params,
  });

export const deleteWorkflowService = (id) =>
  request({
    url: `${WORKFLOW_API}/${id}`,
    method: 'DELETE',
  });

export const createWorkflowService = (data) =>
  request({
    url: `${WORKFLOW_API}/view-by-state`,
    method: 'POST',
    data,
  });

export const updateWorkflowService = (id, data) =>
  request({
    url: `${WORKFLOW_API}/${id}`,
    method: 'PUT',
    data,
  });

export const getWorkflowDetailService = (id) =>
  request({
    url: `${WORKFLOW_API}/${id}/view-by-state`,
    method: 'GET',
  });

export const updateWorkflowStateZapierService = (id, data) =>
  request({
    url: `${WORKFLOW_API}/${id}/view-by-state/states`,
    method: 'PUT',
    data,
  });

export const createWorkflowStateZapierService = (id, data) =>
  request({
    url: `${WORKFLOW_API}/${id}/view-by-state/states`,
    method: 'PUT',
    data,
  });

export const deleteWorkflowStateZapierService = ({ flowId, stateId }) =>
  request({
    url: `${WORKFLOW_API}/${flowId}/view-by-state/states/${stateId}`,
    method: 'DELETE',
  });

export const deleteWorkflowTransitionZapierService = ({ flowId, transitionId }) =>
  request({
    url: `${WORKFLOW_API}/${flowId}/view-by-state/transitions/${transitionId}`,
    method: 'DELETE',
  });
