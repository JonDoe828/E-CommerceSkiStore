using E_CommerceSkiStore_API.Data;
using E_CommerceSkiStore_API.DTOs;
using E_CommerceSkiStore_API.Entities;
using E_CommerceSkiStore_API.Extensions;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_CommerceSkiStore_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        // GET: api/<BasketController>
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) return NotFound();
            return basket.MapBasketToDto();
        }



        // POST api/<BasketController>
        [HttpPost] //api/basket?productId=3&&quantity=2
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //get basket || create basket
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) basket = CreateBasket();
            //get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found!" });
            //add items
            basket.AddItem(product, quantity);
            //save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket!" });

        }



        // DELETE api/<BasketController>/5
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) return NotFound();

            //remove item or reduce quantity

            basket.RemoveItem(productId, quantity);
            //save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });

        }


        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyrerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }


        private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }

    }
}
