# 指定基础镜像
FROM nginx:latest

# 将项目静态文件复制到nginx的网站根目录
COPY dist /usr/share/nginx/html/

# 暴露3070端口
EXPOSE 3070

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]