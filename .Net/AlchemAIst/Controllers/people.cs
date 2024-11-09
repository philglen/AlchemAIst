using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace AlchemAIst.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/people")]
  public class PeopleController : ControllerBase
  {
    private readonly MongoDbContext _context;

    public PeopleController(MongoDbContext context)
    {
      _context = context;
    }

    // GET: api/people
    [HttpGet]
    public async Task<IActionResult> GetPeople()
    {
      try
      {
        var data = await _context.People.Find(_ => true).ToListAsync();

        return Ok(data);
      }
      catch (Exception ex)
      {
        // Log the exception (use a logging framework or service)
        Console.Error.WriteLine(ex);

        // Return a generic error message
        return StatusCode(500, new { message = "An error occurred while processing your request." });
      }
    }

    // GET: api/people/{personId}
    [HttpGet("{personId}")]
    public async Task<IActionResult> GetPersonById(string personId)
    {
      try
      {
        // Convert the string personId to an ObjectId if necessary
        var filter = Builders<Person>.Filter.Eq("_id", personId);
        var person = await _context.People.Find(filter).FirstOrDefaultAsync();

        if (person == null)
        {
          return NotFound();
        }

        return Ok(person);
      }
      catch (Exception ex)
      {
        // Log the exception (use a logging framework or service)
        Console.Error.WriteLine(ex);

        // Return a generic error message
        return StatusCode(500, new { message = "An error occurred while processing your request." });
      }
    }
  }
}
