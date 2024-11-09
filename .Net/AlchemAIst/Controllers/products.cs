using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace AlchemAIst.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/products/{personId}")]
  public class ProductsController : ControllerBase
  {
    private readonly MongoDbContext _context;

    public ProductsController(MongoDbContext context)
    {
      _context = context;
    }

    // GET: api/products/{personId}
    [HttpGet]
    public async Task<IActionResult> GetProductsForPerson(string personId)
    {
      try
      {
        var objectId = new ObjectId(personId); // Convert string to ObjectId if needed
        var filter = Builders<Product>.Filter.Eq("personId", objectId.ToString());
        var products = await _context.Products.Find(filter).ToListAsync();

        if (products == null || !products.Any())
        {
          return NotFound();
        }

        return Ok(products);
      }
      catch (Exception ex)
      {
        // Log the exception (use a logging framework or service)
        Console.Error.WriteLine(ex);

        // Return a generic error message
        return StatusCode(500, new { message = "An error occurred while processing your request." });
      }
    }

    // GET: api/products/{personId}/{productId}
    [HttpGet("{productId}")]
    public async Task<IActionResult> GetProductForPerson(string personId, string productId)
    {
      try
      {
        // Filter by both personId and productId if necessary
        var filter = Builders<Product>.Filter.And(
            Builders<Product>.Filter.Eq("PersonId", personId),
            Builders<Product>.Filter.Eq("Id", productId)
        );
        var product = await _context.Products.Find(filter).FirstOrDefaultAsync();

        if (product == null)
        {
          return NotFound();
        }

        return Ok(product);
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
