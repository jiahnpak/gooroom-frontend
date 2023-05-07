const {useState} = require('react');

const useCheckAll = dataList => {
  // 체크박스 관리를 위한 state
  const [checkedList, setCheckedList] = useState([]);

  /**
   * 전체선택 체크박스의 change 이벤트를 관리한다.
   * @param {boolean} checked - 체크 여부
   */
  const onCheckAll = checked => {
    if (checked) {
      // 전체선택 클릭 시 checkedList에 모든 약관의 id를 넣음
      const idArray = [];
      dataList.forEach(data => idArray.push(data.id));
      setCheckedList(idArray);
    } else {
      // 전체선택 해제 시 checkedList를 비움
      setCheckedList([]);
    }
  };

  /**
   * 개별 체크박스의 change 이벤트를 관리한다.
   * @param {boolean} checked - 체크 여부
   * @param {number} id - 클릭된 체크박스의 dataList.id
   */
  const onCheckElement = (checked, id) => {
    if (checked) {
      // checkedList에 id를 추가
      setCheckedList(prev => [...prev, id]);
    } else {
      // checkedList에서 id를 삭제
      setCheckedList(checkedList.filter(el => el !== id));
    }
  };

  return [checkedList, onCheckAll, onCheckElement];
};

export default useCheckAll;
