# golf-scoreboard

## Project setup
Must first create src/firebaseConfig.js that exports a configured `fb` firebase object like so:
```
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "KEY",
    authDomain: "DOMAIN",
    projectId: "ID",
    storageBucket: "BUCKET",
    messagingSenderId: "ID",
    appId: "ID",
    measurementId: "ID"
};

// Initialize Firebase
var fb = firebase.initializeApp(firebaseConfig); 
export default fb;
```
(I should probably make a mock for this or something huh)


Then
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
