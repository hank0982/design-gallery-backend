## Welcome to Design Gallery

### Step 1 Clone repo for backend
  Check if you have NodeJS installed in your environment by typing ```node --version``` in your terminal: current project is built in NodeJS >= v14.X.X. If not, please download the latest NodeJS from [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
  
  After intstallation of NodeJS, run the following scripts to clone the repo and install the essential libraries.
  ```zsh
    git clone https://github.com/hank0982/design-gallery-backend.git
    cd design-gallery-backend
    npm i
    touch .env
    echo "MONGODB_URL=<XXX_MONGODB_CREDENTIAL>" > .env
  ```
### Step 2 Clone repo for frontend 
Check if you have AngularCLI installed in your environment by typing ```ng --version``` in your terminal and you should see the following messages: current project is built in AngularJS >= 12.1.0.
```

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 12.1.0
Node: 14.17.1
Package Manager: npm 7.19.0
OS: darwin x64

Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.1201.0 (cli-only)
@angular-devkit/core         12.1.0 (cli-only)
@angular-devkit/schematics   12.1.0 (cli-only)
@schematics/angular          12.1.0 (cli-only)
```
If not, please run ```npm install -g @angular/cli``` to install the latest angular cli tool.
After installation, run the following script to set up your frontend environment.
```zsh
git clone https://github.com/hank0982/design-gallery-frontend.git
cd design-gallery-frontend
npm i
```


### Step 3 Start a local web server
  Inside the design-gallery-backend project folder, run the following scripts to run a development server.
  ```zsh
    npm run start:dev
  ```
  Now go to [https://localhost:3000/api](https://localhost:3000/api) and you will see the API documentation.
  
  Or go to [https://localhost:3000/](https://localhost:3000/) to see the pre-built frontend.
 
### Step 4 Start a local frontend server
  Inside the design-gallery-frontend project folder, run the following scripts to run a development frontend envionment.
  ```zsh
    npm start
  ```
  Head to [https://localhost:4200](https://localhost:4200) and you will see the design gallery.
  

 
