import React from 'react';
import GroupFind from '../../components/GroupFind/GroupFind';
import GroupReg from '../../components/GroupReg/GroupReg';

const GroupRegFind = ({ user, fetchGroup }) => {
  return (
    <div className="group-reg-find">
      {user.role === 'student' ? (
        <GroupFind user={user} />
      ) : (
        <GroupReg fetchGroup={fetchGroup} />
      )}
    </div>
  );
};

export default GroupRegFind;
