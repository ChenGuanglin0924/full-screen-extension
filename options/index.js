let page = document.getElementById('buttonDiv');
let selectedClassName = 'current';
const presetButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// 对按钮点击事件做出响应，包括标记选中的按钮以及保存选中项
function handleButtonClick(event) {
  // 移除先前选中颜色的样式
  let current = event.target.parentElement.querySelector(`.${selectedClassName}`);
  if (current && current != event.target) {
    current.classList.remove(selectedClassName);
  }

  // 标记按钮为选中状态
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}
// 在页面上为每个提供的颜色添加一个按钮
function constructOptions(buttonColors) {
  chrome.storage.sync.get('color', (data) => {
    let currentColor = data.color;
    // 对于我们提供的每一种颜色...
    for (let buttonColor of buttonColors) {
      // ...创建一个对应颜色的按钮...
      let button = document.createElement('button');
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // ...标记当前选中的颜色...
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // ...注册一个监听按钮点击事件的监听器
      button.addEventListener('click', handleButtonClick);
      page.appendChild(button);
    }
  });
}
// 初始化页面中的颜色选项按钮
constructOptions(presetButtonColors);
