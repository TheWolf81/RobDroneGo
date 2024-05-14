pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});


pm.test("Response has the required fields", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData).to.include.all.keys('firstName', 'lastName', 'username', 'email', 'phoneNumber', 'nif');
});

pm.test("Email is in a valid format", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData.email).to.be.a('string').and.to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email format is not valid");
});



pm.test("Response status code is 401", function () {
    pm.expect(pm.response.code).to.equal(401);
});

pm.test("Response has the required field - message", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.message).to.exist;
});


pm.test("Message is a non-empty string", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData.message).to.be.a('string').and.to.have.lengthOf.at.least(1, "Message should not be empty");
});

pm.test("Content-Type header is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});


pm.test("Nif is in a valid format and follows the specific pattern", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.nif).to.match(/^\d{9}$/);
});

pm.test("Response contains 'No authorization token was found'", function () {
    pm.expect(pm.response.text()).to.include("No authorization token was found");
});

