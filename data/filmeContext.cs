using Microsoft.EntityFrameworkCore;
using Apifilme.Models;
namespace Apifilme.Data;
public class FilmeContext : DbContext
{
    public FilmeContext(DbContextOptions<FilmeContext> options)
        : base(options)
    {
    }

    public DbSet<Filme> Filmes { get; set; }
}