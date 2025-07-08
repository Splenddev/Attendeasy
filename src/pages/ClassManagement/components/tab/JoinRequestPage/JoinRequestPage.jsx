import React, { useState } from 'react';
import styles from './JoinRequestPage.module.css';
import { toast } from 'react-toastify';
import { ConfirmModal } from '../../../../../components/Modals';

const JoinRequestPage = ({ group, onAction }) => {
  const { joinRequests = [] } = group;
  const [processingId, setProcessingId] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    userId: null,
    action: '',
    name: '',
  });

  const handleConfirm = async () => {
    const { userId, action, name } = modal;
    setModal({ isOpen: false });

    try {
      setProcessingId(userId);
      await onAction(userId, action);
      toast.success(
        `${action === 'approve' ? 'Approved' : 'Rejected'} ${name}'s request.`
      );
    } catch (err) {
      toast.error(err?.message || 'Something went wrong');
    } finally {
      setProcessingId(null);
    }
  };

  const handleActionClick = (userId, action, name) => {
    setModal({
      isOpen: true,
      userId,
      action,
      name,
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Join Requests</h2>
        <div className={styles.meta}>
          <span className={styles.count}>{joinRequests.length}</span> request
          {joinRequests.length !== 1 && 's'}
        </div>
      </div>

      {joinRequests.length === 0 ? (
        <div className={styles.emptyState}>
          <img
            src="/illustrations/empty.svg"
            alt="No join requests"
            className={styles.illustration}
          />
          <h3>No Join Requests</h3>
          <p>
            You're all caught up! Students who want to join your group will
            appear here.
          </p>
          <p>
            Share your group code or link with your classmates so they can join.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {joinRequests.map((req) => {
            const {
              user,
              name = 'Unnamed',
              department = 'Unknown',
              level = 'Unknown',
              avatar,
              requestedAt,
              status = 'pending',
            } = req;

            const isLoading = processingId === user;

            return (
              <div
                key={user}
                className={styles.card}>
                <img
                  src={avatar || '/student-avatar.png'}
                  alt={name}
                  className={styles.avatar}
                />
                <div className={styles.info}>
                  <strong>{name}</strong>
                  <span>{department}</span>
                  <span>{level}</span>
                  <span className={styles.time}>
                    Requested on {new Date(requestedAt).toLocaleString()}
                  </span>
                </div>

                <div className={styles.actions}>
                  {status === 'pending' ? (
                    <>
                      <button
                        className={styles.accept}
                        disabled={isLoading}
                        onClick={() =>
                          handleActionClick(user, 'approve', name)
                        }>
                        {isLoading ? 'Approving...' : 'Accept'}
                      </button>
                      <button
                        className={styles.reject}
                        disabled={isLoading}
                        onClick={() => handleActionClick(user, 'reject', name)}>
                        {isLoading ? 'Rejecting...' : 'Reject'}
                      </button>
                    </>
                  ) : (
                    <span className={`${styles.status} ${status}`}>
                      {status}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmModal
        isOpen={modal.isOpen}
        message={`Are you sure you want to ${modal.action} ${modal.name}'s join request?`}
        onConfirm={handleConfirm}
        onClose={() => setModal({ isOpen: false })}
        actionText={`Yes, ${modal.action === 'approve' ? 'Approve' : 'Reject'}`}
      />
    </div>
  );
};

export default JoinRequestPage;
