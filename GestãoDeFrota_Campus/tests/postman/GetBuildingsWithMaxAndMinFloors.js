pm.test("Response status code is 401", function () {
    pm.response.to.have.status(401);
});

pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});


pm.test("Validate the buildingDTOs array", function () {
  const responseData = pm.response.json();
  
  pm.expect(responseData).to.be.an('object');
  pm.expect(responseData.buildingDTOs).to.exist.and.to.be.an('array');
});

pm.test("Each buildingDTO object has the required properties", function () {
    const responseData = pm.response.json();
    
    responseData.buildingDTOs.forEach(function(building) {
        pm.expect(building).to.have.property('domain_id').that.is.a('string');
        pm.expect(building).to.have.property('code').that.is.a('string');
        pm.expect(building).to.have.property('description').that.is.a('string');
        pm.expect(building).to.have.property('max_length').that.is.a('number');
        pm.expect(building).to.have.property('max_width').that.is.a('number');
    });
});

pm.test("Response body contains the error message 'Invalid range'", function () {
    const responseData = pm.response.text();
    pm.expect(responseData).to.include("Invalid range");
});