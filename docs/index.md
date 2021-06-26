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
  

 ### Techincal introduction to our project
 AngularJS as frontend (FE) will fetch the data from NestJS as backend (BE) via APIs. Upon receiving requests from AngularJS, NestJS will submit a query to MongoDB to fetch the data and return it to AngularJS (FE).

#### NestJS project structure
Check out [NestJS documentation](https://docs.nestjs.com/) for more details.
 ```
├── src
│   ├── common-dto                       
│   │   └── **/*.dto.ts
│   ├── enums 
│   │   └── **/*.enum.ts
│   ├── modules // Feature modules
│   │   ├── module-name
│   │   |   ├── dtos
│   │   |   |   └── **/*.dto.ts
│   │   |   ├── module-name.controller.spec.ts
│   │   |   ├── module-name.controller.ts
│   │   |   ├── module-name.module.ts
│   │   |   ├── module-name.service.spec.ts
│   │   |   └── module-name.service..ts
│   │   ├── module-name2
│   │   └── ...
│   ├── schemas
│   │   └── **/*.schema.ts
│   ├── utils
│   │   └── **/*.util.ts
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.spec.ts
│   └── app.service.ts
├── dist (or build)                    // ignore it when you see it (compiler and uglifier will compile our typescript codes to vanilla javascript files and store them in this folder)
├── node_modules                       // libraries, do not modify its contents
├── test                               // end-to-end testing files
├── README.md
├── package.json                       // package.json will specify all the libraries we used and scripts that we can use to run our projects
├── tsconfig.json                      // tsconfig.json provide linting support for the repository
└── .gitignore
```

#### Controller? 
Controllers are responsible for handling incoming requests and returning responses to the client. We can specify our routing and accepted HTTP methods in the controller files to handle the frontend's requests. The following controller codes will generate the ```api/designs``` endpoint and expose the POST method to allow the frontend to create a new design.
```typescript
@ApiTags('Designs')
@Controller('api/designs')
export class DesignController {

  @Post()
  async create(@Body() createDesignDto: CreateDesignDto) {
    const response = await this.designService.create(createDesignDto);
    return response;
  }
}
```
![image](https://user-images.githubusercontent.com/16849947/123510416-f26f5180-d6ad-11eb-9a62-ce57a8d6a766.png)

#### Services?
Services are usually responsible for data storage and retrieval and are designed to be used by the controllers. When we get the requests from controllers, services will execute the complex business logic, communicate with the database and return the results to the controller. When the above controller gets users' requests to create a design, it calls ``designService.create`` function to further process it. The following design service asks MongoDB to create a document and store the data from CreateDesignDTO.
```
@Injectable()
export class DesignService {
  constructor(
    @InjectModel(Design.name) private designModel: Model<DesignDocument>,
  ) {}

  async create(createDesignDto: CreateDesignDto) {
    const payload = classToPlain(createDesignDto);
    return await this.designModel.create(payload);
  }
}
```




