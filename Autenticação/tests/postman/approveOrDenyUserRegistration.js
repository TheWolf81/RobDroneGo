pm.test("Response status code is 200", function () {
    pm.expect(pm.response.to.have.status(200));
});

pm.test("Response status code is 401 on failure", function () {
    pm.response.to.have.status(401);
});

pm.test("Response time is within an acceptable range", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

pm.test("Email is in a valid format", function () {
    pm.expect(pm.response.json().email).to.be.a('string').and.to.match(/^.+@.+\..+$/);
});

pm.test("NIF is a non-empty string", function () {
    pm.expect(pm.response.json().nif).to.be.a('string').and.to.have.lengthOf.at.least(1, "NIF should be a non-empty string");
});

pm.test("Response has all parameters", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.have.property('firstName');
    pm.expect(responseData).to.have.property('lastName');
    pm.expect(responseData).to.have.property('username');
    pm.expect(responseData).to.have.property('email');
    pm.expect(responseData).to.have.property('password');
    pm.expect(responseData).to.have.property('role');
    pm.expect(responseData).to.have.property('phoneNumber');
    pm.expect(responseData).to.have.property('nif');
    pm.expect(responseData).to.have.property('status');
});

pm.test("Response status code is 401 on failure", function () {
    pm.response.to.have.status(401);
});

pm.test("Check response contains 'This request has already been processed'", function () {
    pm.expect(pm.response.text()).to.include("This request has already been processed");
});

pm.test("Check response contains 'User not authorized to handle user registration requests'", function () {
    pm.expect(pm.response.text()).to.include("User not authorized to handle user registration requests");
});

pm.test("Check response contains 'Couldn't find user'", function () {
    pm.expect(pm.response.text()).to.include("Couldn't find user");
});
