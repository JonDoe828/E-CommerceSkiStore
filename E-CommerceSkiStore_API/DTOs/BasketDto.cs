using System.Collections.Generic;

namespace E_CommerceSkiStore_API.DTOs
{
    public class BasketDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }
}
