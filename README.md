# FTPimageViewer-Client

## React Native & Expo Go installation
```
npm i -g expo-cli
expo init project_name
cd project_name
npm start
```

### dotenv problem solve
```
npm cache clean --force npm start -- --reset-cache
```
or
```
react-native start "--reset-cache"
```

## .env example
```
SOCKET_SERVER_URL = http://example.com:3000
AUTH_TOKEN = "..." #565 characters
```
