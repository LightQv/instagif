## Introduction

To end the Web Developer Bootcamp at Wild Code School in Lyon, I had to develop a Full-Stack Responsive App using React-Express-MySQL, in 2 days.
This project also aim to check every prerequisite needed to get the Diploma.

## Concept

Instagif is a Social Media Application based on GIPHY's API.
You can create an account and share your mood with other peoples using Gifs. Also, it's possible to share your feelings towards other user's posts.
The Share Page shows you trending Gifs but you can search for any Gif your want to find one which perfectly match your mood.
The Profile Page shows you every moods you've already shared, how many posts you've liked and which ones.
Finally, it's possible to edit your username, email, change the App Theme (Light, Dark or System) and delete your account with every data's associated.

## Setup

- Clone this repo
- If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
- Run command `npm install`
- Run command `npm run migrate`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

## Configuration

Create `.env` files in /frontend and /backend following `.env.sample` examples.

## Use

- Run Frontend and Backend server with one command : `npm run dev`
- Express server will be accessible at the address set in the /frontend's .env
- React client will be accessible at the address set in the /backend's .env

- Create an account and then Log in to try Instagif.

### Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `view` : Open a new tab with a Prisma Interface to manage the database
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated

### Next Updates

- _Notification_ : In App and Browser Notification for Likes/Reaction/New Post
- _Message_ : Private message between users
- _Moderation_ : Add Moderator status to delete offensive content

### Deployement

Work in progress. Here's some screenshot while it's done.

_Landing Page with User's posts_

![Alt text](https://i.imgur.com/nDN3ASk.png "Landing Page")

_Share a Feeling_

![Alt text](https://i.imgur.com/MdNObZW.png "Share Page")

_My Profile Page_

![Alt text](https://i.imgur.com/xJJo0jK.png "My Profile")

_Settings Page_

![Alt text](https://i.imgur.com/FLjC4nQ.png "Settings")
