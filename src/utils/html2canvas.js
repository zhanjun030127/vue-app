import html2canvas from 'html2canvas'; 

export function gethtml2canvas(element) {
    html2canvas(element).then((canvas) => {  
        // 将生成的 canvas 转为图片  
        const dataURL = canvas.toDataURL();  
        
        // 创建一个链接下载图片  
        const link = document.createElement('a');  
        link.href = dataURL;  
        link.download = 'screenshot.png'; // 指定下载的文件名  
        link.click(); // 自动点击下载  
      });  
}