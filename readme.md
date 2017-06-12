C# / ASP.NET Windows Authentication with Webpack + Express + Http-Proxy
=======================

### Startup
* Open the C# project in Visual Studio and run it.
* Navigate to `.\csharp-windows-auth\Content` in PowerShell/Command Prompt and execute `npm install`.
* Run `npm run dev` to start up the webpack build and express server.
* Using your browser or a REST tool (Postman, etc.), navigate to `http://localhost:7071/api/userDetails` and you should see your Active Directory groups.