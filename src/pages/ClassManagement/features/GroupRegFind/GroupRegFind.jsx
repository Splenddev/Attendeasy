import React from 'react';
import GroupFind from '../../components/GroupFind/GroupFind';
import GroupReg from '../../components/GroupReg/GroupReg';

const GroupRegFind = ({ user, fetchGroup, setNavTitle }) => {
  if (!user) return <p>nothing</p>;
  return (
    <div className="group-reg-find">
      {user.role === 'student' ? (
        <GroupFind
          user={user}
          setNavTitle={setNavTitle}
        />
      ) : (
        <GroupReg fetchGroup={fetchGroup} />
      )}
    </div>
  );
};

export default GroupRegFind;
