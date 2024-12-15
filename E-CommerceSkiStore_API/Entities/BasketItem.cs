﻿using System.ComponentModel.DataAnnotations.Schema;

namespace E_CommerceSkiStore_API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //navigation properties
        public int ProductId { get; set; }
        public Product Product { get; set; }

        //fully definition
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}