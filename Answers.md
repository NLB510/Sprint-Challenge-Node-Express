Mention two parts of Express that you learned about this week.
 * Express is a javascript framework that works on top of Node.js runtime for building network applications. 
 * Express makes many complicated networking processes easier by abstracting a lot of it away via methods, middleware, and routing. 


Describe Middleware?
  * Middleware are functions that can intercept network requests and responses and perform operations on them. They can then either return a response on move on to the next operation in the queue. 

Describe a Resource?
  * Resources are anything that can be considered data that would be important to a client. That could be a list of users, the number pictures saved, etc…

What can the API return to help clients know if a request was successful?
  * The API could return status codes, such as 200 or 204 to let a client know a request was successful. 

How can we partition our application into sub-applications?
  * We can partition our application into sub-applications via express routers. An application with a larger 