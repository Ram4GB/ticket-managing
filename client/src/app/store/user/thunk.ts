import ENDPOINT from '../../const/endpoint';
import instance from '../../libs/axios';
import { AppThunk } from '../../libs/store';
import handleError from '../../utils/handle-error';
import { setLoading, setUserList } from './actions';

export const fetchUserList = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await instance.get(ENDPOINT.userList());
      if (result.status !== 200) {
        handleError(result.data);
      }
      dispatch(setUserList(result.data));
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};
