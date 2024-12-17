// 获取当前时间
export function getDataTime ()  {
    const date = new Date(Date.now());  
    const year = date.getFullYear();  
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const day = String(date.getDate()).padStart(2, '0');  
    const hours = String(date.getHours()).padStart(2, '0');  
    const minutes = String(date.getMinutes()).padStart(2, '0');  
    const seconds = String(date.getSeconds()).padStart(2, '0');  
    // 格式化输出  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  
}