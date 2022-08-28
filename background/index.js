let color = '#3aa757';
chrome.runtime.onInstalled.addListener(() => {
  console.log('插件已被安装');
  chrome.storage.sync.set({ color });
  console.log('默认背景颜色设置为%cgreen', `color: ${color}`);
});
