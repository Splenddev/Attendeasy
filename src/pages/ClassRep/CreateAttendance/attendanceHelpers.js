import { select } from '../../../utils/helpers';
import { list } from '../../../utils/contants';

export const selectOneStudent = (setValue, name, getValues) =>
  select('selectOne', setValue, name, list, getValues);

export const selectAllStudents = (setValue, getValues) =>
  select('select-all', setValue, null, list, getValues);
