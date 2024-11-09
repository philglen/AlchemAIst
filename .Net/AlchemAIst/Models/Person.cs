using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

public class Person
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]

  public required string Id { get; set; }

  [BsonElement("firstname")]
  public required string Firstname { get; set; }

  [BsonElement("lastname")]
  public required string Lastname { get; set; }

  [BsonElement("dob")]
  public required DateTime Dob { get; set; }

  [BsonElement("email")]
  public string? Email { get; set; }

  [BsonElement("tel")]
  public string? Tel { get; set; }

  [JsonPropertyName("_id")]
  public string _id => Id; // Read-only property for JSON output
}
