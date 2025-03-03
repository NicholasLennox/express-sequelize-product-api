# Products API with Sequelize

Class demo for our integration of sequelize into our API.

I will update the code with commnets and so on as the day goes - maybe on the weekend.

Our plan going forward is to make our responses a bit more consistent for bad requests and have a more general error handler.

Then we can start including more models and relationships and see how we can cater for related models in our routes.

## Additions from class 03/03

There were three main changes we made today:
- Added filtering, ordering, and pagination to our get all products endpoint.
    - This was taken from lesson 1.3 and the sequelize documentation.
    - [Operators](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators), [ordering](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#ordering), and [pagination](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination)
- Error handling middleware with consistency
    - Our biggest problem was repetition in our error handling logic. To solve that we created a global error handling middleware in `app.js` where we filter the types of errors thrown and crafts various responses based on the type of error.
    - To help with consistent response formats, we use a package called [jsend](https://www.npmjs.com/package/jsend) to easily show if a response was a success, failure, or an error state.
    - We also used a popular package called [http-errors](https://www.npmjs.com/package/http-errors) to create error objects for our custom failure states (400, 404, etc.).
    - This resulted in our errors being created and handled by simply calling `next(createError(status, message))` in our routes and services and it is all handled in one place (`app.js`) leading to better maintainability and extendability. 
- Added an order model with the ability to make a new order
    - Our order model has a M:M relationship with products. An order contains many products, and a product can be present in many orders.
    - Our payload simply contains the `invoiceEmail` and a list of `productIds` that are part of the order.
    - Our order has a total price (sum of all the prices of the products in the order) which needs to be calculated in the service (business logic)
    - What this feature shows is something that is not part of the basic CRUD and more aligned with real-world processes that software is developed for. Ofcourse its very basic (since we dont do anything with stock or allow users to purchase multiple of the same product) and will be build on and refactored as we move forward.