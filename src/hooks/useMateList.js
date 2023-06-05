import {API_MATES} from 'constants/apiUrls';
import {useState} from 'react';
import useInterceptedAxios from './useInterceptedAxios';
import CODE from 'constants/errorCode';

const initialMateList = {
  totalMates: 0,
  mateList: [],
};

const useMateList = () => {
  const [mateList, setMateList] = useState(initialMateList);
  const jwtAxios = useInterceptedAxios();

  const getMateList = async filters => {
    try {
      const response = await jwtAxios.get(`${API_MATES}`, {
        params: {
          ...filters,
          page: filters.page - 1,
        },
      });
      const data = response?.data;
      if (!data) {
        throw new Error();
      }

      const {totalMates, mateList} = data;

      setMateList({
        totalMates,
        mateList,
      });
    } catch (err) {
      const errorCode = err?.response?.data?.errorCode;
      if (!errorCode) {
        return CODE.UNEXPECTED;
      }

      return errorCode;
    }
  };

  return {mateList, setMateList, getMateList};
};

export default useMateList;
