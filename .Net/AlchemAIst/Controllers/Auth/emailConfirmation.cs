using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
using System.Threading.Tasks;

using AlchemAIst.Dtos;

namespace AlchemAIst.Controllers.Auth
{
  [ApiController]
  [Route("api/auth/email")]
  public class EmailConfirmationController : ControllerBase
  {
    private readonly MongoDbContext _context;

    public EmailConfirmationController(MongoDbContext context)
    {
      _context = context;
    }

    [HttpPost("send-confirmation")]
    public async Task<IActionResult> SendConfirmationEmail(SendConfirmationDto dto)
    {
      // Email confirmation logic here
      var user = await _context.Users.Find(u => u.Email == dto.Email).FirstOrDefaultAsync();
      if (user == null || user.IsConfirmed)
        return BadRequest(new { message = "User not found or already confirmed." });

      // Generate confirmation token and save it to the database, then send email
      // Logic here...
      return Ok(new { message = "Confirmation email sent." });
    }

    [HttpPost("confirm")]
    public async Task<IActionResult> ConfirmEmail(ConfirmEmailDto dto)
    {
      // Confirm email logic here
      var user = await _context.Users.Find(u => u.ConfirmationToken == dto.Token && u.Email == dto.Email).FirstOrDefaultAsync();
      if (user == null)
        return BadRequest(new { message = "Invalid or expired token." });

      // Update user status to confirmed
      // Logic here...
      return Ok(new { message = "Email confirmed successfully." });

    }
  }
}