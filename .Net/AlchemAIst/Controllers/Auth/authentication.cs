using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
using BCrypt.Net;
using System.Threading.Tasks;

using AlchemAIst.Dtos;

namespace AlchemAIst.Controllers.Auth
{
  [ApiController]
  [Route("api/auth")]
  public class AuthController : ControllerBase
  {
    private readonly MongoDbContext _context;
    private readonly JwtService _jwtService;

    public AuthController(MongoDbContext context, JwtService jwtService)
    {
      _context = context;
      _jwtService = jwtService;
    }

    // Registration endpoint
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegistrationDto dto)
    {
      try
      {
        // Check if the user already exists
        var existingUser = await _context.Users.Find(u => u.Email == dto.Email).FirstOrDefaultAsync();
        if (existingUser != null) return BadRequest("User already exists");

        // Generate password hash
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var roles = dto.Roles ?? ["User"]; // Default to ["User"] if no role is provided
                                           // Create a new user object with the hashed password
        var newUser = new User
        {
          Username = dto.Username,
          PasswordHash = passwordHash,  // Store hashed password
          Firstname = dto.Firstname,
          Lastname = dto.Lastname,
          Email = dto.Email,
          Roles = roles,
          ResetToken = null,
          ResetTokenExpiry = null,
        };

        // Insert new user into MongoDB
        await _context.Users.InsertOneAsync(newUser);
        return Ok(new { message = "User registered successfully" });
      }
      catch (Exception ex)
      {
        // Log the exception (use a logging framework or service)
        Console.Error.WriteLine(ex);

        // Return a generic error message
        return StatusCode(500, new { message = "An error occurred while processing your request." });
      }
    }

    // Login endpoint
    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto dto)
    {
      try
      {
        var user = await _context.Users.Find(u => u.Email == dto.Email).FirstOrDefaultAsync();
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
          return Unauthorized(new { message = "Invalid username or password." });

        var token = _jwtService.GenerateJwtToken(user);
        return Ok(new { Token = token });
      }
      catch (Exception ex)
      {
        // Log the exception (use a logging framework or service)
        Console.Error.WriteLine(ex);

        // Return a generic error message
        return StatusCode(500, new { messaage = "An error occurred while processing your request." });
      }
    }

    // Token refresh endpoint
    [HttpPost("refresh")]
    public IActionResult RefreshToken()
    {
      try
      {
        // Token refresh logic
        return Ok(new { message = "Token refreshed successfully" }); // Temporary return statement
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
