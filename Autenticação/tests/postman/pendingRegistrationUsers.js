pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has the required Content-Type header of application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

pm.test("Message field is present in the response", function () {
    const responseData = pm.response.json();
    pm.expect(responseData.message).to.exist;
});

pm.test("Message is a non-empty string", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.message).to.be.a('string').and.to.have.lengthOf.at.least(1, "Message should not be empty");
});

pm.test("Response has the required attributes", function () {
    const responseData = pm.response.json();
    responseData.forEach(function(user) {
        pm.expect(user).to.have.property('firstName');
        pm.expect(user).to.have.property('lastName');
        pm.expect(user).to.have.property('username');
        pm.expect(user).to.have.property('email');
        pm.expect(user).to.have.property('password');
        pm.expect(user).to.have.property('role');
        pm.expect(user).to.have.property('phoneNumber');
        pm.expect(user).to.have.property('nif');
        pm.expect(user).to.have.property('status');
    });
});

pm.test("Check response contains 'Couldn't find users'", function () {
    pm.expect(pm.response.text()).to.include("Couldn't find users");
});

pm.test("Check response contains 'User not authorized to view user registration requests'", function () {
    pm.expect(pm.response.text()).to.include("User not authorized to view user registration requests");
});