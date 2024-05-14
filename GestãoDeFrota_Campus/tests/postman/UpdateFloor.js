pm.test("Response status code is 401", function () {
    pm.response.to.have.status(401);
});

pm.test("response is ok", function () {
    pm.response.to.have.status(200);
});


pm.test("Response body contains the error message 'Invalid State'", function () {
    const responseData = pm.response.text();
    pm.expect(responseData).to.include("Invalid State");
});

pm.test("Response body contains the error message 'Floor id does not exist'", function () {
    const responseData = pm.response.text();
    pm.expect(responseData).to.include("Floor id does not exist");
});

pm.test("Verify that the response body contains the expected fields", function () {
    const floorDTO = pm.response.json().floorDTO;
    pm.expect(floorDTO).to.have.property('DomainId');
    pm.expect(floorDTO).to.have.property('building_id');
    pm.expect(floorDTO).to.have.property('floorNumber');
    pm.expect(floorDTO).to.have.property('description');
    pm.expect(floorDTO).to.have.property('area');
    pm.expect(floorDTO).to.have.property('name');
    pm.expect(floorDTO).to.have.property('floorMap');
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});