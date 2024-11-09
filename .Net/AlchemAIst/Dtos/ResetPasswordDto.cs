namespace AlchemAIst.Dtos
{
  public class ResetPasswordDto
  {
    public required string ResetToken { get; set; }
    public required string NewPassword { get; set; }
  }
}
