using E_CommerceSkiStore_API.Data;
using Microsoft.AspNetCore.Mvc;
using E_CommerceSkiStore_API.Entities;
using Microsoft.EntityFrameworkCore;

namespace E_CommerceSkiStore_API.Controllers
{
    [ApiController]
    [Route("E-CommerceSkiStore_API/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task <ActionResult<List<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
            
        }
        [HttpGet("{id}")]
        public async Task <ActionResult<Product>> GetProduct(int id)
        { 
            return await _context.Products.FindAsync(id);      
        }
    }
}