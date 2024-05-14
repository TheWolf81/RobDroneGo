pm.test("response is ok", function () {
    pm.response.to.have.status(201);
});

pm.test("Response status code is 401", function () {
    pm.response.to.have.status(401);
});


pm.test("Response time is within an acceptable range", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Response body contains the error message 'Invalid State'", function () {
    const responseData = pm.response.text();
    pm.expect(responseData).to.include("Invalid State");
});

pm.test("Response body contains the floorDTO object", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.have.property('floorDTO');
});

pm.test("floorDTO object has the required properties", function () {
    const floorDTO = pm.response.json().floorDTO;
    pm.expect(floorDTO).to.have.property('DomainId');
    pm.expect(floorDTO).to.have.property('building_id');
    pm.expect(floorDTO).to.have.property('floorNumber');
    pm.expect(floorDTO).to.have.property('description');
    pm.expect(floorDTO).to.have.property('area');
    pm.expect(floorDTO).to.have.property('name');
    pm.expect(floorDTO).to.have.property('floorMap');
});