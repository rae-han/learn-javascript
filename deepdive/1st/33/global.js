// 전역에서 사용할 파일
const statusList = ['PENDING', 'SUCCESS', 'RUNNING'];

const apiStatus = statusList.reduce((acc, key) => {
  acc[[key]] = Symbol(key);
  return acc;
}, {});

module.exports = {
  apiStatus
}