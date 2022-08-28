// 以用户偏好的颜色初始化按钮
let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// 当点击按钮，将 setPageBackgroundColor 函数注入到当前页面
changeColor.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor
  });
});

// 该函数的主体会作为内容脚本在当前页面内被执行
function setPageBackgroundColor() {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
