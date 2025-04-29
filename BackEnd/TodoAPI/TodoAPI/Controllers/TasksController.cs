using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Models;
using TodoAPI.Data;

namespace TodoAPI.Controllers
{        
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;



        public TasksController(AppDbContext context)
        {
           _context = context;
        }

       [HttpGet]
       public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
       {
          return await _context.Tasks.ToListAsync();
       }

       [HttpPost]
       public async Task<ActionResult<TaskItem>> CreateTask(TaskItem task)
       {
          _context.Tasks.Add(task);
          await _context.SaveChangesAsync();
          return CreatedAtAction(nameof(GetTasks), task);
       }
       
    }
}
