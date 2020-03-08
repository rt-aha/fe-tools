const uploadInput = document.getElementById('file');
const imgDOM = document.getElementById('img');
uploadInput.addEventListener('change', handleFileChange);

function handleFileChange(event) {
  console.log(event);

  for (let f of event.target.files) {
    const file = f;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      const targetResult = e.target.result;

      // 給圖片目標、最大寬度、最大高度和一個callback
      compress(targetResult, 500, 500, base64String => {
        donwloadImg(base64String, `img${Date.now() + ''}`);
      });
    };
  }
}

// 壓縮圖片
// 邏輯:
// 如果如果圖片寬度或高度大於最大寬高 -->
// 按照比例重新設定寬高 -->
// 利用canvas重繪 -->
// 利用canvas.toDataURL()輸出圖片

function compress(imgBase64Data, maxWidth, maxHeight, callback) {
  // 建立一個圖片物件和Canvas
  const img = new Image();
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  // 圖片連結為
  img.src = imgBase64Data;
  // 讀取完圖片後
  img.onload = () => {
    // 圖片原始尺寸
    const originWidth = img.width;
    const originHeight = img.height;

    // 設定目標初始化尺寸
    let targetWidth = originWidth;
    let targetHeight = originHeight;

    // 若原始寬度大於最大寬度，或原始高度大於最大高度
    if (originWidth > maxWidth || originHeight > maxHeight) {
      // 且原始寬高比大於最大寬高比
      if (originWidth / originHeight > maxWidth / maxHeight) {
        // 如上傳圖的寬度大於最大寬，設定目標寬等於最大寬
        // 高度按照寬度比例縮放
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        // 高度大於寬度，以高度為基準，按高度比例縮放
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }

    // 設定canvas寬高
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除canvas並重繪(壓縮)
    context.clearRect(0, 0, targetWidth, targetHeight);
    context.drawImage(img, 0, 0, targetWidth, targetHeight);

    // canvas生成base64資料
    const base64String = canvas.toDataURL('image/png', 1.0);
    callback(base64String);
  };
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
    null
  );
  // 觸發事件
  aElement.dispatchEvent(event);
}

// canvas.toDataURL()
// arg1 type, default: image/jpeg
// arg2 encoderOptions, range 0~1
