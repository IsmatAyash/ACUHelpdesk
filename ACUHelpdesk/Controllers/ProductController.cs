﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ACUHelpdesk.Models;
using ACUHelpdesk.ViewModels;

namespace ACUHelpdesk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ACUContext _context;

        public ProductController(ACUContext context)
        {
            _context = context;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products
                                 .Where(p => p.Tier == 2 && p.ProductDescriptionAR != null && !String.IsNullOrEmpty(p.ProductDescriptionAR)).Take(100)
                                 .Select(x => new
                                 {
                                     Label = x.ProductCode + " " + x.ProductDescriptionAR,
                                     Value = x.Id,
                                     Children = _context.Products
                                                        .Where(c => c.ParentID == x.Id && c.Tier == 3 && c.ProductDescriptionAR != null && !String.IsNullOrEmpty(c.ProductDescriptionAR))
                                                        .Select(y => new 
                                                        {
                                                             Label = y.ProductCode + " " + y.ProductDescriptionAR,
                                                             Value = y.Id
                                                         }).ToList()
                                 }).ToListAsync();
            return Ok(products);
        }

        // GET: pass a negotiation id to get products with checked true or false
        [HttpGet("{negId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct(int? negId)
        {
            var products = await _context.Products
                                   .Where(p => (p.Tier == 2 || p.Tier == 3) && p.ProductDescriptionAR != null && !String.IsNullOrEmpty(p.ProductDescriptionAR))
                                   .Select(x => new Products
                                   {
                                       Label = x.ProductCode + " " + x.ProductDescriptionAR,
                                       Value = x.Id,
                                       Checked = false,
                                       ParentID = x.ParentID,
                                       ProductCode = x.ProductCode,
                                       Tier = x.Tier
                                   }).ToListAsync();
            if (negId != null)
            {
                var checkedProds = _context.NegotiationProducts.Where(p => p.NegotiationId == negId).ToArray();
                int index = -1;
                foreach (var np in checkedProds)
                {
                    index = products.FindIndex(obj => obj.Value == np.ProductId);
                    if (index != -1)
                        products[index].Checked = true;
                }
            }
            var prods = products.Where(p => p.Tier == 2)
                     .Select(x => new
                     {
                         Label = x.Label,
                         Value = x.Value,
                         Checked = x.Checked,
                         Children = products
                                    .Where(c => c.ParentID == x.Value && c.Tier == 3)
                                        .Select(y => new
                                        {
                                            Label = y.Label,
                                            Value = y.Value,
                                            Checked = y.Checked
                                        }).ToList()
                     }).ToList();

            return Ok(prods);
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
