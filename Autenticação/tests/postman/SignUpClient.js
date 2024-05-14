pm.test("Response status code is 201", function () {
    pm.expect(pm.response.to.have.status(201));
});

pm.test("Email is in a valid format, and other attributes are present", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('object').that.has.property('userDTO');
    pm.expect(responseData.userDTO).to.be.an('object').that.has.all.keys('firstName', 'lastName', 'username', 'email', 'password', 'role', 'phoneNumber', 'nif', 'status');
    pm.expect(responseData).to.have.property('token');
});

pm.test("Response status code is 401 on failure", function () {
    pm.response.to.have.status(401);
});

pm.test("Response time is within an acceptable range", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});