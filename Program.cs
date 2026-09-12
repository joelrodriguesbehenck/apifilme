var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

var filmes = new List<Filme>
{
    new Filme(1, "Titanic", "Drama", 1997, 9.2),
    new Filme(2, "Os Mercenários", "Ação", 2010, 8.7)
};


app.MapGet("/", () => "API de Filmes está funcionando!");


app.MapGet("/api/filmes", () =>
{
    return Results.Ok(filmes);
});


app.MapGet("/api/filmes/{id}", (int id) =>
{
    var filme = filmes.FirstOrDefault(f => f.Id == id);

    if (filme == null)
    {
        return Results.NotFound();
    }

    return Results.Ok(filme);
});


app.MapPost("/api/filmes", (FilmeEntrada entrada) =>
{
    var novoId = filmes.Count == 0 ? 1 : filmes.Max(f => f.Id) + 1;

    var novoFilme = new Filme(
        novoId,
        entrada.Titulo,
        entrada.Genero,
        entrada.Ano,
        entrada.Nota
    );

    filmes.Add(novoFilme);

    return Results.Created($"/api/filmes/{novoFilme.Id}", novoFilme);
});


app.MapPut("/api/filmes/{id}", (int id, FilmeEntrada entrada) =>
{
    var indice = filmes.FindIndex(f => f.Id == id);

    if (indice == -1)
    {
        return Results.NotFound();
    }

    var filmeAtualizado = new Filme(
        id,
        entrada.Titulo,
        entrada.Genero,
        entrada.Ano,
        entrada.Nota
    );

    filmes[indice] = filmeAtualizado;

    return Results.Ok(filmeAtualizado);
});


app.MapDelete("/api/filmes/{id}", (int id) =>
{
    var filme = filmes.FirstOrDefault(f => f.Id == id);

    if (filme == null)
    {
        return Results.NotFound();
    }

    filmes.Remove(filme);

    return Results.NoContent();
});

app.Run();

record Filme(
    int Id,
    string Titulo,
    string Genero,
    int Ano,
    double Nota
);


record FilmeEntrada(
    string Titulo,
    string Genero,
    int Ano,
    double Nota
);

