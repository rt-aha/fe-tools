function getElement(elementName) {
  return document.getElementById(elementName);
}

const spanText = getElement('spanText');
const copySpanTextBtn = getElement('copySpanTextBtn');
const inputText = getElement('inputText');
const copyInputTextBtn = getElement('copyInputTextBtn');

function handleCopyText(toCopyValue) {
  const inputElement = document.createElement('input');

  document.body.appendChild(inputElement);
  inputElement.value = toCopyValue;
  inputElement.select();

  if (document.execCommand('Copy')) {
    console.log('COPY SUCCESS');
  } else {
    console.log('COPY FAIL');
  }

  inputElement.style.display = 'none';
}

function copySpanText() {
  const value = spanText.innerHTML;
  handleCopyText(value);
}

function copyInputText() {
  const value = inputText.value;
  handleCopyText(value);
}

copySpanTextBtn.addEventListener('click', copySpanText);
copyInputTextBtn.addEventListener('click', copyInputText);
