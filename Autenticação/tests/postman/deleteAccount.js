pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
  });
  
  pm.test("Response status code is 401", function () {
      pm.expect(pm.response.code).to.equal(401);
  });
  
  
  pm.test("Response has the correct Content-Type header", function () {
      pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
  });
  
  
  pm.test("Verify that the account has been successfully deleted", function () {
      pm.expect(pm.response.text()).contains("User account deleted successfully");
  });
  
  
  
  