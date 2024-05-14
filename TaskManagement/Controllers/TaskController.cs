using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Model;
using TaskManagement.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.OpenApi.Any;
using Newtonsoft.Json;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskContext _context;

        public TaskController(TaskContext context)
        {
            _context = context;
        }

        // GET: api/Task/GetAll
        // This method is used to get all the tasks
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetTasks()
        {
            var res = await _context.Tasks.ToListAsync();
            if(res.Count == 0){
                return NotFound("No tasks");
            }
            List<TaskDTO> resDTO = new List<TaskDTO>();
            foreach (var task in res)
            {
                resDTO.Add(task.toDto());
            }
            return resDTO;
        }

        // GET: api/Task/GetByStatus
        // This method is used to get all the tasks with a specific status
        [HttpGet("GetByStatus/{status}")]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetTasksByStatus(string status)
        {
            if(status != "requested" && status != "approved" && status != "denied" && status != "planned"){
                return BadRequest("Invalid status");
            }
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:3100/api/users/me");
            string authHeader = Request.Headers["Authorization"].ToString(); // Assuming your token is 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            string token = authHeader.StartsWith("Bearer ") ? authHeader.Substring(7) : authHeader;
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode){
                var resultString = await response.Content.ReadAsStringAsync();
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                dynamic result = JsonConvert.DeserializeObject(resultString);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                var role = (string)result.role;
#pragma warning restore CS8602 // Dereference of a possibly null reference.

            if ( role != "TaskManager" && role != "SystemAdministrator"){
                return Unauthorized("You are not Authorized");
            }
            }else{
                return StatusCode((int)response.StatusCode, "Error calling the user service");
            }
            //convert res to TaskDTO
            var res = await _context.Tasks.Where(task => task.Status == status).ToListAsync();
            if(res.Count == 0){
                return NotFound("No tasks with that status");
            }
            List<TaskDTO> resDTO = new List<TaskDTO>();
            foreach (var task in res)
            {
                resDTO.Add(task.toDto());
            }


            return resDTO;
        }

        // GET: api/Task/GetApproved
        // This method is used to get all the tasks with status approved (for prolog only!!!)
        [HttpGet("GetApproved")]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetApprovedTasks()
        {    
            var res = await _context.Tasks.Where(task => task.Status == "approved").ToListAsync();
            if(res.Count == 0){
                return NotFound("No tasks with that status");
            }
            List<TaskDTO> resDTO = new List<TaskDTO>();
            foreach (var task in res)
            {
                resDTO.Add(task.toDto());
            }
            return resDTO;
        }


        // GET: api/Task/GetByTypeOfDevice
        // This method is used to get all the tasks with a specific type of device
        [HttpGet("GetByTypeOfDevice/{typeOfDevice}")]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetTasksByTypeOfDevice(string typeOfDevice)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:3100/api/users/me");
            string authHeader = Request.Headers["Authorization"].ToString(); // Assuming your token is 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            string token = authHeader.StartsWith("Bearer ") ? authHeader.Substring(7) : authHeader;
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode){
                var resultString = await response.Content.ReadAsStringAsync();
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                dynamic result = JsonConvert.DeserializeObject(resultString);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                var role = (string)result.role;
#pragma warning restore CS8602 // Dereference of a possibly null reference.

                if ( role != "TaskManager" && role != "SystemAdministrator"){
                return Unauthorized("You are not Authorized");
            }
            }else{
                return StatusCode((int)response.StatusCode, "Error calling the user service");
            }
            
            var res = await _context.Tasks.Where(task => task.DeviceType == typeOfDevice).ToListAsync();
            if(res.Count == 0){
                return NotFound("No tasks with that type of device");
            }
            List<TaskDTO> resDTO = new List<TaskDTO>();
            foreach (var task in res)
            {
                resDTO.Add(task.toDto());
            }
            return resDTO;
        }

        // GET: api/Task/GetByEmail
        // This method is used to get all the tasks with a specific email
        [HttpGet("GetByEmail/{email}")]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetTasksByEmail(string email)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:3100/api/users/me");
            string authHeader = Request.Headers["Authorization"].ToString(); // Assuming your token is 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            string token = authHeader.StartsWith("Bearer ") ? authHeader.Substring(7) : authHeader;
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode){
                var resultString = await response.Content.ReadAsStringAsync();
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                dynamic result = JsonConvert.DeserializeObject(resultString);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                var role = (string)result.role;
#pragma warning restore CS8602 // Dereference of a possibly null reference.

                if ( role != "TaskManager" && role != "SystemAdministrator"){
                return Unauthorized("You are not Authorized");
            }
            }else{
                return StatusCode((int)response.StatusCode, "Error calling the user service");
            }
            var res = await _context.Tasks.Where(task => task.Email == email).ToListAsync();
            if(res.Count == 0){
                return NotFound("No tasks with that email");
            }
            List<TaskDTO> resDTO = new List<TaskDTO>();
            foreach (var task in res)
            {
                resDTO.Add(task.toDto());
            }
            return resDTO;
        }

        // POST: api/Task
        // This method is used to create a new task request which means, it's status is requested (locked in this method)
        [HttpPost]
        public async Task<ActionResult<TaskDTO>> PostTask(Model.Task task)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:3100/api/users/me");
            string authHeader = Request.Headers["Authorization"].ToString(); // Assuming your token is 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            string token = authHeader.StartsWith("Bearer ") ? authHeader.Substring(7) : authHeader;
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await client.SendAsync(request);
            string email = "";
            if (response.IsSuccessStatusCode){
                var resultString = await response.Content.ReadAsStringAsync();
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                dynamic result = JsonConvert.DeserializeObject(resultString);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                var role = (string)result.role;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
                email = (string)result.email;

            if ( role != "Client" && role != "SystemAdministrator"){
                return Unauthorized("You are not Authorized");
            }
            }else{
                return StatusCode((int)response.StatusCode, "Error calling the user service");
            }
            
            task.Status = "requested";
            task.Email = email;
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostTask", new { id = task.TaskId }, task);
        }

        // PATCH: api/Task/Approve/5
        // This method is used to approve a task request which means, it's status becomes approved
        [HttpPatch("Approve/{id}")]
        public async Task<IActionResult> ApproveTask(int id)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:3100/api/users/me");
            string authHeader = Request.Headers["Authorization"].ToString(); // Assuming your token is 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            string token = authHeader.StartsWith("Bearer ") ? authHeader.Substring(7) : authHeader;
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode){
                var resultString = await response.Content.ReadAsStringAsync();
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                dynamic result = JsonConvert.DeserializeObject(resultString);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                var role = (string)result.role;
#pragma warning restore CS8602 // Dereference of a possibly null reference.

            if ( role != "TaskManager" && role != "SystemAdministrator"){
                return Unauthorized("You are not Authorized");
            }
            }else{
                return StatusCode((int)response.StatusCode, "Error calling the user service");
            }

            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            task.Status = "approved";
            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TaskExists(id))
            {
                return NotFound();
            }

            return StatusCode(200, "Task approved");
        }

        // PATCH: api/Task/Deny/5
        // This method is used to deny a task request which means, it's status becomes denied
        [HttpPatch("Deny/{id}")]
        public async Task<IActionResult> DenyTask(int id)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:3100/api/users/me");
            string authHeader = Request.Headers["Authorization"].ToString(); // Assuming your token is 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            string token = authHeader.StartsWith("Bearer ") ? authHeader.Substring(7) : authHeader;
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode){
                var resultString = await response.Content.ReadAsStringAsync();
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                dynamic result = JsonConvert.DeserializeObject(resultString);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                var role = (string)result.role;
#pragma warning restore CS8602 // Dereference of a possibly null reference.

            if ( role != "TaskManager" && role != "SystemAdministrator"){
                return Unauthorized("You are not Authorized");
            }
            }else{
                return StatusCode((int)response.StatusCode, "Error calling the user service");
            }

            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            task.Status = "denied";
            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TaskExists(id))
            {
                return NotFound();
            }

            return StatusCode(200, "Task denied");
        }


        // DELETE: api/Task/5   
        // This method is used to delete a task request
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return StatusCode(200, "Task deleted");
        }   


        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.TaskId == id);
        }
    }
}
