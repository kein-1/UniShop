# UniShop

E-commerce Shopping App built using React, Node.js, PostgreSQL, and Express. Styled using TailwindCSS



### Supplementary NPM Packages

- JWT - User authentication/Authorization
- Nodemon - Automatically refreshes the back-end server
- Morgan - Backend logging for requests
- Cors - Solves cross-origin issues when connecting front-end and back-end
- Dotenv - Saving and accessing environment variables
- Bcrypt - Password hashing for users
- Express-async-errors - Removes the need to try/catch every backend request in an async function. Automatically sends the error to the express error handling middleware once the error is detected
- ESlint + Prettier - Runs a combination of ESlint + Prettier 
- DaisyUI and HeadlessUI - Both are Tailwind CSS packages that I used to help style my project. The shopping cart sliding concept was taken from TailwindUI
- Express-sessions - Express middleware to handle sessions and cookies 
- Zustand - My first time using a state management tool such as Zustand. I wanted to use something to share state across components. I considered other tools such as Redux but ultimately decided to use Zustand because of its simple iterface and its cute bear. The website for it is also amazing 
 - React-Router-Dom - Gives routing capabilites on the website 


### What I learned building this 

#### Overall, this project took me a good amount of time. I worked on it a little bit each day. It was my first full stack app without any real guidance. A lot of the concepts I had to look up on my own but I think this is the best way to learn rather than watching a tutorial on projects.  

1. <ins> Cookies and Sessions </ins> - Previously I used JWT but for this project I used cookies and sessions. I learned to use sessions to store the user's shopping cart in the backend. Each successful POST request to a cart endpoint I setup will update the shopping cart with the users items
2. <ins> Session object in backend </ins> - Each user has a different cart in the backend since this is managed through the session store by express-session. Ideally we would use a database to store the sessions of each user
  a. Server-side sessions can store a lot more data and is more secure. It communicates with the client side via a string that is sent back from the server. This string is stored as a cookie on the client side 
3. <ins> State management library with Zustand </ins> - I used this so I can share state between components. This is how when a user adds or removes an item, the price and the display in the cart is updated immediately since the state changes => component re-renders
4. <ins> PostgreSQL </ins>. I learned some SQL and basic commands with this project. My database consists of users and product items 
5. <ins> Styling with TailwindCSS </ins> - Utilized a combination of DaisyUI and HeadlessUI to help with some of the complicated animation styling. CSS is still tough!
6. <ins> React Router </ins> - Applied React Router (Routes and Links) to render different components based on the URL. This gives the website routing and renders different components based on the URL the site is on