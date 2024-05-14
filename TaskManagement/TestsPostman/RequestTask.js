pm.test("Response status code is 201", function () {
    pm.expect(pm.response.code).to.equal(201);
});


pm.test("Task ID is a non-negative integer", function () {
    const responseData = pm.response.json();
    pm.expect(responseData.taskId).to.be.a('number');
});

pm.test("Device type is a non-empty string", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.deviceType).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
});