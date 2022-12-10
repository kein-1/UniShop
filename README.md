# UniShop

E-commerce Shopping App built using React, Node.js, PostgreSQL,Express, TailwindCSS, and Stripe API. 

![Alt Text](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)




### Features
- Fully functional e-commerce site that users can add/remove products and checkout once they are complete
- Fully styled landing page with functional Navbar
- Products are displayed in a grid. Users can click each product card for a description of the product 
- Users can add or remove items from their cart. Price and quantity are updated accordingly
- Users can checkout once they are done
- Users can login and register
- If logged in, users have a personalized page with their info and orders  

### What I learned building this 

#### Overall, this project took me a good amount of time. I worked a little bit on the weekdays and spent time on the weekends. It was also tough finding time to work on this between my full time job and my current course (last two assignments in Java and were extremely time consuming)  
It was my first full stack app without any real guidance. A lot of the concepts I had to look up on my own but I think this is the best way to learn rather than watching a tutorial on projects !!

1. <ins> Cookies and Sessions </ins> - Previously I used JWT but for this project I used cookies and sessions. I learned to use sessions to store the user's shopping cart in the backend. Each successful POST request to a cart endpoint I setup will update the shopping cart with the users items
2. <ins> Session object in backend </ins> - By using express-session, it populates the request object with a session field. We can access it using request.session (similar to how app.use(express.json()) parses incoming body fields into a "body" field in the request object and it is accessed through request.body)  
  - Each user has a different cart in the backend since this is managed through the session store by express-session. Express-session stores a different user based on the session id, and thus each session object is different for each user. Ideally we would use a database to store the sessions of each user    
  - Server-side sessions can store a lot more data and is more secure. It communicates with the client side via a string that is sent back from the server. This string is stored as a cookie on the client side     
3. <ins> State management library with Zustand </ins>   
  - I used this so I can share state between components. This is how when a user adds or removes an item, the price and the display in the cart is updated immediately since the state changes => component re-renders. The syntax to setup the store is quite strange but the create function takes in a callback function which uses a set function to change the state  
  - Another import thing I used was the <ins>persist  middleware </ins>. This let me save both the cart quantity and cart price values in local storage. It is retrieved after each subsequent request since the state persists and it is saved in local storage. Read up on the difference between localStorage and sessionStorage  
4. <ins> PostgreSQL </ins> I learned some basic SQL commands with this project. My database consists of users and product items 
5. <ins> Styling with TailwindCSS </ins> - Utilized a combination of DaisyUI and HeadlessUI to help with some of the complicated animation styling. CSS is still tough!
6. <ins> React Router </ins> - Applied React Router (Routes and Links) to render different components based on the URL. This gives the website routing and renders different components based on the URL the site is on


### Things I still need to fix or add 

- Issues with maintaining the cart items if the user cancels the transaction. Currently I have it setup so that the request.session.items (the cart items) will clear once the checkout button is clicked (post request) 
- Custom user page, user authentication and authorization 
- Filters to the products page 
- Setup backend server for orders and order info 


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
