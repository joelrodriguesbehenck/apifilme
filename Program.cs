using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuração do DbContext com SQLite
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=filmes.db";
builder.Services.AddDbContext<FilmeContext>(options =>
    options.UseSqlite(connectionString));

var app = builder.Build();

// Aplica as migrações automaticamente ao iniciar a aplicação
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<FilmeContext>();
    db.Database.Migrate();
}

// Habilita arquivos estáticos da pasta wwwroot
app.UseDefaultFiles();
app.UseStaticFiles();

// Rotas da API - CRUD com EF Core e SQLite

// 1. Listar todos os filmes (200 OK)
app.MapGet("/api/filmes", async (FilmeContext db) =>
{
    var lista = await db.Filmes.ToListAsync();
    return Results.Ok(lista);
});

// 2. Buscar filme por ID (200 OK ou 404 NotFound)
app.MapGet("/api/filmes/{id:int}", async (int id, FilmeContext db) =>
{
    var filme = await db.Filmes.FindAsync(id);
    return filme is not null ? Results.Ok(filme) : Results.NotFound();
});

// 3. Cadastrar novo filme (201 Created)
app.MapPost("/api/filmes", async (FilmeEntrada entrada, FilmeContext db) =>
{
    var novoFilme = new Filme(
        0,
        entrada.Titulo,
        entrada.Genero,
        entrada.Ano,
        entrada.Nota
    );

    db.Filmes.Add(novoFilme);
    await db.SaveChangesAsync();

    return Results.Created($"/api/filmes/{novoFilme.Id}", novoFilme);
});

// 4. Atualizar filme existente (200 OK ou 404 NotFound)
app.MapPut("/api/filmes/{id:int}", async (int id, FilmeEntrada entrada, FilmeContext db) =>
{
    var filme = await db.Filmes.FindAsync(id);
    if (filme is null)
    {
        return Results.NotFound();
    }

    filme.Titulo = entrada.Titulo;
    filme.Genero = entrada.Genero;
    filme.Ano = entrada.Ano;
    filme.Nota = entrada.Nota;

    await db.SaveChangesAsync();

    return Results.Ok(filme);
});

// 5. Excluir filme (204 NoContent ou 404 NotFound)
app.MapDelete("/api/filmes/{id:int}", async (int id, FilmeContext db) =>
{
    var filme = await db.Filmes.FindAsync(id);
    if (filme is null)
    {
        return Results.NotFound();
    }

    db.Filmes.Remove(filme);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();

// DTO para entrada de dados
public record FilmeEntrada(
    string Titulo,
    string Genero,
    int Ano,
    double Nota
);
