import React from 'react';
import GroupFind from '../../components/GroupFind/GroupFind';
import GroupReg from '../../components/GroupReg/GroupReg';

const GroupRegFind = ({ user }) => {
  return (
    <div className="group-reg-find">
      {user.role === 'student' ? <GroupFind user={user} /> : <GroupReg />}
    </div>
  );
};

export default GroupRegFind;
