using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class User
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }

  [BsonElement("username")]
  public string? Username { get; set; }
  [BsonElement("firstname")]
  public required string Firstname { get; set; }
  [BsonElement("lastname")]
  public required string Lastname { get; set; }
  [BsonElement("email")]
  public required string Email { get; set; }

  // Store hashed password
  [BsonElement("passwordHash")]
  public required string PasswordHash { get; set; }

  // Address details
  [BsonElement("address")]
  public UserAddress? Address { get; set; } = new UserAddress();

  // Role information
  [BsonElement("roles")]
  public required string[] Roles { get; set; }

  // Email confirmation fields
  [BsonElement("isConfirmed")]
  public bool IsConfirmed { get; set; } = false;
  [BsonElement("confirmationToken")]
  public string? ConfirmationToken { get; set; }
  [BsonElement("confirmationTokenExpiry")]
  public DateTime? ConfirmationTokenExpiry { get; set; }

  // Password reset fields
  [BsonElement("resetToken")]
  public string? ResetToken { get; set; }
  [BsonElement("resetTokenExpiry")]
  public DateTime? ResetTokenExpiry { get; set; }

  // Timestamps
  [BsonElement("createdAt")]
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  [BsonElement("updatedAt")]
  public DateTime? UpdatedAt { get; set; }
  [BsonElement("lastLoginAt")]
  public DateTime? LastLoginAt { get; set; }

  // Audit fields
  [BsonElement("createdBy")]
  public string? CreatedBy { get; set; }
  [BsonElement("updatedBy")]
  public string? UpdatedBy { get; set; }

  // Security-related fields
  [BsonElement("twoFactorEnabled")]
  public bool TwoFactorEnabled { get; set; } = false;
  [BsonElement("loginAttempts")]
  public int LoginAttempts { get; set; } = 0;
  [BsonElement("lockUntil")]
  public DateTime? LockUntil { get; set; }

  // Profile fields
  [BsonElement("profilePictureUrl")]
  public string? ProfilePictureUrl { get; set; }

  // Preferences and additional metadata
  [BsonElement("preferences")]
  public UserPreferences Preferences { get; set; } = new UserPreferences();
  [BsonElement("metadata")]
  public BsonDocument Metadata { get; set; } = new BsonDocument();

  // Privacy and marketing
  [BsonElement("termsAcceptedAt")]
  public DateTime? TermsAcceptedAt { get; set; }
  [BsonElement("privacyPolicyAcceptedAt")]
  public DateTime? PrivacyPolicyAcceptedAt { get; set; }
  [BsonElement("marketingConsentAt")]
  public DateTime? MarketingConsentAt { get; set; }
}

// User preferences class
public class UserPreferences
{
  [BsonElement("theme")]
  public string? Theme { get; set; } = "light";
  [BsonElement("language")]
  public string? Language { get; set; } = "en";
  [BsonElement("notifications")]
  public bool Notifications { get; set; } = true;

  // Communication preferences
  [BsonElement("receiveEmail")]
  public bool ReceiveEmail { get; set; } = true;
  [BsonElement("receiveSms")]
  public bool ReceiveSms { get; set; } = false;
  [BsonElement("receiveInAppNotifications")]
  public bool ReceiveInAppNotifications { get; set; } = true;
}

// Address class
public class UserAddress
{
  [BsonElement("address1")]
  public string? Address1 { get; set; }
  [BsonElement("address2")]
  public string? Address2 { get; set; }
  [BsonElement("city")]
  public string? City { get; set; }
  [BsonElement("county")]
  public string? County { get; set; }
  [BsonElement("country")]
  public string? Country { get; set; }
  [BsonElement("postalCode")]
  public string? PostalCode { get; set; }
}
