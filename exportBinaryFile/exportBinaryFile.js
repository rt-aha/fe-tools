// 這個 js 會有問題
// 這個檔案模擬api回來的狀況，把 ### 的地方填成符合狀況就可以用了
function getElement(elementName) {
  return document.getElementById(elementName);
}

const exportBtn = getElement('export');

function exportBinaryFile() {
  const ajaxInfo = {
    apiUrl: 'https://', // ###
    payload: {}, // ###
  };

  const config = {
    headers: { Authorization: 'auth' }, // ### 是否有權限
    responseType: 'blob', // 請求格式
  };

  const fileInfo = {
    name: 'fileName', // ### 檔案名稱
    type: 'application/vnd.ms-excel', // ### 檔案格式
  };

  // ### get ? post ?
  const res = axios.post(ajaxInfo.apiUrl, ajaxInfo.payload, config);
  const binaryData = [res.data]; // 陣列中是二進位資料

  const url = window.URL.createObjectURL(new Blob(binaryData, { type }));
  const aElement = document.createElement('a');
  document.body.appendChild(a);
  aElement.setAttribute('style', 'display: none');
  aElement.href = url;
  aElement.download = fileInfo.name;
  aElement.click();
  window.URL.revokeObjectURL(url);
  aElement.remove();
}

exportBtn.addEventListener('click', exportBinaryFile);
