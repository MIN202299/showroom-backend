FROM node:lts-alpine3.18

WORKDIR /showroom-backend

# RUN npm install -g yarn

RUN yarn config set registry https://registry.npm.taobao.org/

COPY package.json ./package.json

COPY . .

RUN yarn

RUN npm run build
  
# 删除开发期依赖
RUN rm -rf node_modules
# 安装生产环境依赖
RUN yarn install --production

CMD ["npm", "run", "start:prod"]

EXPOSE 8421
EXPOSE 8422

# docker build -t test-nest .
# docker run --name nest-server -p 3000:3000 --network will-be-remove_custom-net test-nest
# docker container rm nest-server
# docker image rm test-nest