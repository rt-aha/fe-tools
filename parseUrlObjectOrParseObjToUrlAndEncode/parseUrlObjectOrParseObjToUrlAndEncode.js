function getElement(elementName) {
  return document.getElementById(elementName);
}

// 利用正規表達式解析URL

const fakeUrl = 'name=John&age=25&job=engineer';
const reg = /(\w+)=(\w+)/g;

let result;
let obj = {};

while (result !== null) {
  // 每一次exec執行完都會將指標指向結果的lastindex的下一個index，所以可以遍歷
  // 正規表達式記得寫g，不然會無限迴圈！！！
  result = reg.exec(fakeUrl);

  if (result !== null) {
    obj[result[1]] = result[2];
  }
}

console.log(obj);

// -----------

const parseObjToUrlBtn = getElement('parseObjToUrlBtn');
const urlText = getElement('urlText');
const encodeUrlText = getElement('encodeUrlText');

function parseObjToUrl() {
  const obj = {
    name: 'John',
    age: 25,
    job: 'engineer',
  };

  const objKeys = Object.keys(obj);
  let pureText = '';

  for (let item of objKeys) {
    pureText += item + '=' + obj[item] + '&';
  }

  pureText = pureText.slice(0, -1);

  urlText.innerHTML = pureText;

  const encodePureText = window.encodeURI(pureText);

  encodeUrlText.innerHTML = encodePureText;
}

parseObjToUrlBtn.addEventListener('click', parseObjToUrl);
