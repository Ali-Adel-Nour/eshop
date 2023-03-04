# eshop
API with Nodejs - Express
User registration: The API must have a user registration endpoint that accepts user details such as name, email, and password. Once the user submits the form, the API generates a unique JWT token that will be used for all subsequent API requests.



User authentication: When the user logs in, the API verifies their credentials and sends back a new JWT token. This token must be used for all subsequent requests to access protected routes.



Protected routes: The API must have endpoints that can only be accessed by authenticated users. These routes will be protected by verifying the JWT token in the request headers. If the token is valid, the API will allow the user to perform the requested action, such as adding items to their cart or completing a purchase.
