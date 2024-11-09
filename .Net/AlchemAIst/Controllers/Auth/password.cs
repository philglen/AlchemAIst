using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
using BCrypt.Net;
using System.Threading.Tasks;

using AlchemAIst.Dtos;

namespace AlchemAIst.Controllers.Auth
{
  [ApiController]
  [Route("api/auth/password")]
  public class PasswordController : ControllerBase
  {
    private readonly MongoDbContext _context;

    public PasswordController(MongoDbContext context)
    {
      _context = context;
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
    {
      try
      {
        var user = await _context.Users.Find(u => u.Email == dto.Email).FirstOrDefaultAsync();
        if (user == null)
        {
          // Respond with the same generic message for security
          return Ok(new { message = "If that email address exists in our system, a reset link will be sent to it." });
        }

        // Generate a reset token
        var resetToken = Guid.NewGuid().ToString();
        var resetTokenExpiry = DateTime.UtcNow.AddMinutes(10); // Token expires in 10 minutes

        // Update user document with reset token and expiry
        var updateDefinition = Builders<User>.Update
            .Set(u => u.ResetToken, resetToken)
            .Set(u => u.ResetTokenExpiry, resetTokenExpiry);

        await _context.Users.UpdateOneAsync(
            u => u.Id == user.Id,
            updateDefinition
        );

        // Send the resetToken to the user's email (email-sending code here)

        return Ok(new { message = "If that email address exists in our system, a reset link will be sent to it." });
      }
      catch (Exception ex)
      {
        // Log the exception (use a logging framework or service)
        Console.Error.WriteLine(ex);

        // Return a generic error message
        return StatusCode(500, new { message = "An error occurred while processing your request." });
      }
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
    {
      try
      {
        var user = await _context.Users.Find(u => u.ResetToken == dto.ResetToken && u.ResetTokenExpiry > DateTime.UtcNow).FirstOrDefaultAsync();
        if (user == null)
        {
          return BadRequest(new { message = "Invalid or expired reset token." });
        }

        // Hash the new password
        var newPasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

        // Update the user's password and clear the reset token and expiry
        var updateDefinition = Builders<User>.Update
            .Set(u => u.PasswordHash, newPasswordHash)
            .Set(u => u.ResetToken, null)
            .Set(u => u.ResetTokenExpiry, null);

        await _context.Users.UpdateOneAsync(
            u => u.Id == user.Id,
            updateDefinition
        );

        return Ok(new { message = "Password has been reset successfully." });
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
