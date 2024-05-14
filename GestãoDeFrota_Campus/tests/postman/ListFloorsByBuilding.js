pm.test("Response status code is 401", function () {
    pm.response.to.have.status(401);
});

pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response body contains the error message 'No floors found for this building'", function () {
    const responseData = pm.response.text();
    pm.expect(responseData).to.include("No floors found for this building");
});

pm.test("Response body is an object with floorDTO property", function () {
    pm.expect(pm.response.json()).to.be.an('object').that.has.property('floorDTO');
});

pm.test("Each element in the floorDTO array has the required parameters", function () {
    pm.response.json().floorDTO.forEach(function(floor) {
        pm.expect(floor).to.have.property('DomainId').that.is.a('string');
        pm.expect(floor).to.have.property('building_id').that.is.a('string');
        pm.expect(floor).to.have.property('floorNumber').that.is.a('number');
        pm.expect(floor).to.have.property('description').that.is.a('string');
        pm.expect(floor).to.have.property('area').that.is.a('number');
        pm.expect(floor).to.have.property('name').that.is.a('string');
        pm.expect(floor).to.have.property('floorMap').that.is.an('array');
    });
});