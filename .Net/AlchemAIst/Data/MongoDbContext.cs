using MongoDB.Driver;
using Microsoft.Extensions.Options;

public class MongoDbContext
{
  private readonly IMongoDatabase _database;

  public MongoDbContext(IOptions<MongoDbSettings> settings)
  {
    var client = new MongoClient(settings.Value.ConnectionString);
    _database = client.GetDatabase(settings.Value.DatabaseName);
  }

  public IMongoCollection<Person> People => _database.GetCollection<Person>("people");
  public IMongoCollection<Product> Products => _database.GetCollection<Product>("products");
  public IMongoCollection<User> Users => _database.GetCollection<User>("users");

}

public class MongoDbSettings
{
  public required string ConnectionString { get; set; }
  public required string DatabaseName { get; set; }
}
