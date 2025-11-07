using System;
using CadastroUsuariosAPI.Entities;
using Microsoft.EntityFrameworkCore;


namespace CadastroUsuariosAPI.Data;

    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<AppUser> Users { get; set; }
    }
    
