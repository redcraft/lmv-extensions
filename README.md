#Viewer Extensions


##Description

This example demonstrates adding new functionality to Autodesk Large Model Viewer (LMV) using extensions. Extensions can be enabled during the Viewer loading process or later. Both scenarios are covered in this example. When the application starts, the Extension Manager (Viewer extension) is loaded automatically and is added to the Viewer toolbar as a '+' button. Click this button to open a list of other available extensions that you can enable/disable at any time. 

Each dynamic extension provided by the Extension Manager provides a great example of adding a new functionality to the Viewer. To see the extension source code, you may click the “Source” button or just view the source code of this example.

##Source code and deployment

To run the application, you need to have Node.js installed on your machine. Navigate to the application folder and call 'npm install' to get the application dependencies. You can then execute 'node server.js' to run your application. The application can be accessed from localhost:3000.

To make a quick deployment of this application to Heroku you may use the button below.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

##Credits

This example is based on an application created by [Philippe Leefsma](https://github.com/leefsmp). The original application can be found [here](https://github.com/Developer-Autodesk/ng-gallery).