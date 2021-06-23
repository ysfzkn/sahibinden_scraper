
# Docker, Image, Container

FROM node:14
FROM python:3.8.6

WORKDIR /myapp/

COPY . /myapp/
COPY api /myapp/

COPY package*.json /myapp/

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm      

RUN curl -L https://npmjs.org/install.sh | sh

RUN npm install socket.io --save

RUN npm init -y

RUN npm run

#ADD sahibinden.py Scripts

RUN /usr/local/bin/python3 -m pip install --upgrade pip
RUN python3 -m pip install requests beautifulsoup4 pandas lxml openpyxl

EXPOSE 3000

ENTRYPOINT [ "node" ]

CMD [ "test.js" ]