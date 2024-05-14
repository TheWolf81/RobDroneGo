
pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});


pm.test("Response has the required fields", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function(item) {
        pm.expect(item).to.include.all.keys('taskId', 'taskType', 'code', 'status', 'email', 'deviceType', 'description', 'location1', 'location2');
    });
});

pm.test("TaskType is a non-empty string", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function(item) {
        pm.expect(item.taskType).to.be.a('string').and.to.have.lengthOf.at.least(1, "TaskType should not be empty");
    });
});

pm.test("Email is in a valid email format", function () {
    const responseData = pm.response.json();
    
    responseData.forEach(function(task) {
        pm.expect(task.email).to.match(/^.+@.+\..+$/);
    });
});

pm.test("Code is a non-negative integer", function () {
    const responseData = pm.response.json();
    
    responseData.forEach(function(task) {
      pm.expect(task.code).to.be.a('number').and.to.be.at.least(0);
    });
  });