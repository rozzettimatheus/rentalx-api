# image
FROM node

# dir for saving all fils
WORKDIR /usr/app

# cp dependencies
COPY package.json ./

# command to install dependencies
RUN npm install

# copy all to dir above
COPY . .

# export port
EXPOSE 3333

# command to start server
CMD ["npm", "run", "dev"]
