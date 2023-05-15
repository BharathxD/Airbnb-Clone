# Airbnb Clone

![Airbnb Logo](./public/images/logo.svg)

This is a full stack Airbnb clone.

## Why is the NextAuth Handler Route is in Pages folder?

The NextAuth handler route is located in the "pages" folder for convenience and simplicity. Although it is possible to initialize NextAuth in a route handler such as an API router (e.g., App Router), the recommended approach for advanced initialization is to use the page router.

To learn more about the route handler initialization in NextAuth, you can refer to the NextAuth documentation on [Route Handlers](https://next-auth.js.org/configuration/initialization#route-handlers-app). Additionally, for advanced initialization techniques, you can explore the documentation section on [Advanced Initialization](https://next-auth.js.org/configuration/initialization#advanced-initialization).

```bash
    npm i --save @next-auth/prisma-adapter @prisma/client next-auth
```

```bash
    npm i --save-dev prisma
```

## To generate Discord OAuth Client and Secret Access Keys, follow these steps

1. Navigate to the GitHub Developers settings page.

2. Click on the `New OAuth App` button.

3. Fill in the required information:

   - Application name: Choose a name for your application.
   - `Homepage URL`: `http://localhost:3000`.
   - `Authorization Callback URL`: `http://localhost:3000/api/auth.callback/google`.
   - Click on `Register application` to create your Discord OAuth app.

4. Once the app is created, you will see the "Client ID" and "Client Secret" under the app's settings. These are your Discord OAuth Client and Secret Access Keys, respectively.
