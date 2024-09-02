import { DatabaseError } from 'sequelize/types';
import { FilterResponseBodyFormat } from '../interfaces/filter-response-body-format';

export const handleSequelizeDatabaseError = async (
  exception: DatabaseError,
): Promise<FilterResponseBodyFormat> => {
  return generateErrorBody(exception.name, exception.message);
};

const generateErrorBody = (
  code: string,
  message: string,
): FilterResponseBodyFormat => {
  return {
    code,
    message,
    status: 409,
    success: false,
  };
};
