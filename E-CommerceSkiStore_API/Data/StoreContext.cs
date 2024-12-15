using Microsoft.EntityFrameworkCore;
using E_CommerceSkiStore_API.Entities;

namespace E_CommerceSkiStore_API.Data
{
    public class StoreContext : DbContext
    {
        public DbSet<Product> Products{  get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public StoreContext(DbContextOptions options) : base(options)
        {

        }
        
        
        
    }
}
