import React from 'react';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { actUpdateUser } from 'pages/user_management/actions';

const UserStatusCell = (props) => {
  const { t } = useTranslation();
  const { actUpdateUser, activated } = props;

  const handleStatus = () => {
    const params = { ...props };
    params['activated'] = !activated;
    actUpdateUser(params);
  };

  return (
    <div>
      <button onClick={handleStatus} style={{ background: 'none', border: 'none' }}>
        {activated ? (
          <Badge color='success' pill>
            {t('baseApp.userManagement.activated')}
          </Badge>
        ) : (
          <Badge color='danger' pill>
            {t('baseApp.userManagement.deactivated')}
          </Badge>
        )}
      </button>
    </div>
  );
};

const mapStateToProps = ({ user }, ownProps) => {
  const { data } = ownProps;
  const { items } = user.list;
  const item = items[data] || {};
  return item;
};

const mapDispatchToProps = {
  actUpdateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStatusCell);
