import { ForeignKeyConstraintError } from 'sequelize';
import { FilterResponseBodyFormat } from '../interfaces/filter-response-body-format';

/**
 * Function that will process an error
 * when a foreign key is invalid or not found
 *
 * params:
 * - `exception`: {@link ForeignKeyConstraintError}
 */
export const handleSequelizeForeignKeyConstraintError = (
  exception: ForeignKeyConstraintError,
): FilterResponseBodyFormat => {
  console.log(exception);

  return {
    status: 404,
    message: 'Invalid Foreign Key',
    code: 'NotFoundById',
    success: false,
  };
};
