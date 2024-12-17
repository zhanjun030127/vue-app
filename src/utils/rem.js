function setRem() {  
  const defaultWidth = 1920; // 默认宽度  
  const defaultFontSize = 192; // 默认字体大小  

  const getWidth = window.innerWidth; // 获取当前窗口宽度  
  let currentScale = getWidth / defaultWidth; // 根据默认宽度计算比例  

  // 防止缩放太小  
  if (getWidth < 1440) {  
    currentScale = 1440 / defaultWidth;  
  
  }  

  // 根据比例计算当前字体大小  
  const currentFontSize = currentScale * defaultFontSize;  
  document.documentElement.style.fontSize = currentFontSize + 'px';  
}  

// 初始化时调用设置字体大小  
setRem();  

// 防抖函数限制函数调用频率  
function debounce(func, wait) {  
  let timeout;  
  return function executedFunction(...args) {  
    const later = () => {  
      clearTimeout(timeout);  
      func(...args);  
    };  
    clearTimeout(timeout);  
    timeout = setTimeout(later, wait);  
  };  
}  

// 在窗口调整大小时使用防抖函数  
window.onresize = debounce(() => {  
  setRem();  
}, 100);