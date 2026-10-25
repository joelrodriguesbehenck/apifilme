public class Filme
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Genero { get; set; } = string.Empty;
    public int Ano { get; set; }
    public double Nota { get; set; }

    public Filme() { }

    public Filme(int id, string titulo, string genero, int ano, double nota)
    {
        Id = id;
        Titulo = titulo;
        Genero = genero;
        Ano = ano;
        Nota = nota;
    }
}
