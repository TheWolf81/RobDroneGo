pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});

pm.test("Verify that the Task has been denied", function () {
    pm.expect(pm.response.text()).contains("Task denied");
});