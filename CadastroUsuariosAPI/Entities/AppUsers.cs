namespace CadastroUsuariosAPI.Entities
{
    public class AppUser
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Nome { get; set; }
        public required string Email { get; set; }
       
    }
}