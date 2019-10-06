function getElement(elementName) {
  return document.getElementById(elementName);
}
const qrCode = getElement('qrCode');
const qrcodeLink = getElement('qrcodeLink');
const covertToQrcodeBtn = getElement('covertToQrcodeBtn');
const downloadQrcodeImgBtn = getElement('downloadQrcodeImgBtn');

// ---------- 生成 qrcode ----------

function convertLinkToQrCode() {
  const getUrl = qrcodeLink.value;

  new QRCode(qrCode, {
    text: getUrl,
    width: 150,
    height: 150,
    name: 'testQr',
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  });
}

covertToQrcodeBtn.addEventListener('click', convertLinkToQrCode);

// ---------- 下載處理圖片 ----------
function convertImageToBase64(image, imgType) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const originWidth = image.width;
  const originHeight = image.height;

  let targetWidth = originWidth;
  let targetHeight = originHeight;

  if (originWidth > 150 || originHeight > 150) {
    if (originWidth / originHeight > maxWidth / maxHeight) {
      targetWidth = maxWidth;
      targetHeight = Math.round(maxWidth * (originHeight / originWidth));
    } else {
      targetHeight = maxHeight;
      targetWidth = Math.round(maxHeight * (originWidth / originHeight));
    }
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  context.clearRect(0, 0, targetWidth, targetHeight);
  context.drawImage(image, 0, 0, targetWidth, targetHeight);
  return canvas.toDataURL(imgType, 1.0);
}

function handleImgType(type) {
  // 如果type是jpg要改為jpeg，i是大小寫不拘
  type = type.toLowerCase().replace(/jpg/i, 'jpeg');

  // 驗證型別
  const possibleImgType = ['png', 'jpeg', 'bmp', 'gif'];
  const isImgTypeValidate = possibleImgType.includes(type);
  if (!isImgTypeValidate) {
    throw new Error('圖片類型錯誤');
  }

  return 'image/' + type;
}

function donwloadImg(data, filename) {
  // 建立一個a物件並設定屬性
  const aElement = document.createElement('a');
  aElement.href = data;
  aElement.download = filename;

  // 建立一個事件
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,
  );
  // 觸發事件
  aElement.dispatchEvent(event);
}

function downloadQrImage() {
  const imgInfo = {
    element: getElement('qrCode').childNodes[1], // <img> DOM
    type: 'png', // 圖檔類型 e.g. png
    dataType: '', // e.g. image/png
    name: 'qrcode', // 圖檔名字
    base64: '', // base64 格式
    stream: '', // stream 格式
  };

  // 轉為可處理格式
  imgInfo.dataType = handleImgType(imgInfo.type);
  // 將圖轉為base64
  const base64String = convertImageToBase64(imgInfo.element, imgInfo.dataType);
  // 將圖片型別轉為 image/octet-stream
  imgInfo.stream = imgInfo.base64.replace(
    imgInfo.dataType,
    'image/octet-stream',
  );
  // 下載圖片
  donwloadImg(imgInfo.stream, `${imgInfo.name}.${imgInfo.type}`);
}

downloadQrcodeImgBtn.addEventListener('click', downloadQrImage);
