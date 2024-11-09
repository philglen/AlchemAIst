using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Product
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public required string Id { get; set; }

  [BsonElement("name")]
  public required string Name { get; set; }

  [BsonElement("description")]
  public required string Description { get; set; }

  [BsonElement("price")]
  public required int Price { get; set; }

  [BsonElement("personId")]
  public required string PersonId { get; set; }

  [BsonElement("imageUrl")]
  public string? ImageUrl { get; set; }

}