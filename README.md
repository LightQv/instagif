## Introduction

To end the Web Developer Bootcamp at Wild Code School in Lyon, I had to develop a Full-Stack Responsive App using React-Express-MySQL, in 2 days.
This project also aim to check every prerequisite needed to get the Diploma.
I then improved it over my free time.

## Concept

Instagif is a Social Media Application based on GIPHY's API.  
You can create an account and share your mood with other peoples using Gifs. Also, it's possible to share your feelings towards other user's posts.  
The Home Page shows you every posts by date in descending order. Once you're logged in, you can choose beetween display every posts or only those of the users you're following.  
The Search Page allows you to search for any other user.  
The Share Page shows you trending Gifs but you can search for any Gif your want to find one which perfectly matches your mood.  
The Profile Page shows you every moods you've already shared, how many posts you've liked, which ones, how many users are following your account and how many account you're following.  
Finally, it's possible to edit your username, email, upload a profile picture, change the App Theme (Light, Dark or System) and delete your account with every data's associated.

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

![Alt text](https://i.imgur.com/TlgmcPZ.png "Landing Page")
![Alt text](https://i.imgur.com/Va5zW7G.png "Landing Page")

_Search for a User_

![Alt text](https://i.imgur.com/9ztDp9T.png "Search Page")

_Share a Feeling_

![Alt text](https://i.imgur.com/yZiqmIc.png "Share Page")
![Alt text](https://i.imgur.com/MWrEpUd.png "Share Page")

_My Profile Page_

![Alt text](https://i.imgur.com/vGSetBo.png "My Profile")
![Alt text](https://i.imgur.com/vF4FRQa.png "My Profile")

_Edit Page_

![Alt text](https://i.imgur.com/4tFtgub.png "Edit Page")

_Settings Page_

![Alt text](https://i.imgur.com/yi1kw8Y.png "Settings")

_Forgot Password Page_

![Alt text](https://i.imgur.com/5R4Qi5C.png "Forgot Password")
