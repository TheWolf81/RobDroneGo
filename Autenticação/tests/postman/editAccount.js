pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
  });
  
  pm.test("Response status code is 401", function () {
      pm.expect(pm.response.code).to.equal(401);
  });
  
  
  pm.test("Response has the correct Content-Type header", function () {
      pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
  });
  
  
  pm.test("Verify success", function () {
      pm.expect(pm.response.get("Content-Type")).to.include("application/json");
  });
  
  pm.test("Verify failure in Email", function () {
    pm.expect(pm.response.text()).contains("Email already in use");
  });

  pm.test("Verify failure in Phone Number", function () {
    pm.expect(pm.response.text()).contains("Phone number already in use");
  });

  pm.test("Verify failure in NIF", function () {
    pm.expect(pm.response.text()).contains("NIF already in use");
  });

  pm.test("Verify failure in Authorization", function () {
    pm.expect(pm.response.text()).contains("User not authorized to edit account");
  });
  
 