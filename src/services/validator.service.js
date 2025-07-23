import api from './api';
const VALIDATE_API_BASE = `validate/`;

export const validateMatricNumbersInGroup = async ({
  groupId,
  matricNumbers,
}) => {
  const response = await api.post(`${VALIDATE_API_BASE}matric-numbers`, {
    groupId,
    matricNumbers,
  });

  return response;
};
