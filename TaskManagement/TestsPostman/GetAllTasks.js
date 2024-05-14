pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});


pm.test("TaskType is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function(task) {
        pm.expect(task.taskType).to.be.a('string').and.to.have.lengthOf.at.least(1, "TaskType should not be empty");
    });
});

pm.test("Code is a non-negative integer", function () {
    const responseData = pm.response.json();
    
    responseData.forEach(function(task) {
        pm.expect(task.code).to.be.a('number').and.to.be.at.least(0);
    });
});

pm.test("Email is in a valid email format", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function(task) {
      pm.expect(task.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });