const controller = require("../controllers/customer.controller");

module.exports = function(app) {
    app.get(
        "/api/customers",
        controller.getCustomers
      );
      app.get(
        "/api/total",
        controller.getCustomersTotalAmountAndCollection
      );
      app.put(
        "/api/customers",
        controller.addCollection
      );
      app.post(
        "/api/customers",
        controller.addCustomer
      );
      app.get(
        "/api/customers/:name",
        controller.getCustomerByName
      );
  

};



