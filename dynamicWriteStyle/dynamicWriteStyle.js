const addCSS = (function() {
  const style = document.createElement('style');
  style.setAttribute('data-custom', 'trans');
  const head = document.head || document.getElementsByTagName('head')[0];
  //這裡必須顯示設定style元素的type屬性為text/css，否則在ie中不起作用
  style.type = 'text/css';

  return function(cssText) {
    if (style.styleSheet) {
      //IE
      const func = function() {
        try {
          //防止IE中stylesheet數量超過限制而發生錯誤
          style.styleSheet.cssText = cssText;
        } catch (e) {
          console.log(e);
        }
      };
      //如果當前styleSheet還不能用，則放到非同步中則行
      if (style.styleSheet.disabled) {
        setTimeout(func, 10);
      } else {
        func();
      }
    } else {
      const textNode = document.createTextNode(cssText);
      style.textContent = '';
      style.appendChild(textNode);
    }

    head.appendChild(style); //把建立的style元素插入到head中
  };
})();

console.log(addCSS('.hihi{color: #fff}'));
