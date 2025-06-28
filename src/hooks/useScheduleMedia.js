import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteScheduleMedia } from '../services/schedule.media.service';

export const useScheduleMedia = ({ scheduleId, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (mediaId) => {
    if (!scheduleId) return toast.error('Invalid schedule ID');
    if (!mediaId) return toast.error('Invalid media ID');
    setDeleting(true);
    try {
      await deleteScheduleMedia(scheduleId, mediaId);
      toast.success('Deleted');
      onDeleted?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return {
    deleting,
    handleDelete,
  };
};
