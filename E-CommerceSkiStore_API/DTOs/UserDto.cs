using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_CommerceSkiStore_API.Entities;

namespace E_CommerceSkiStore_API.DTOs
{
    public class UserDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public BasketDto Basket { get; set; }
    }
}