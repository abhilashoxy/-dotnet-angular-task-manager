using task_manager_service.DTOs;

namespace task_manager_service.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(RegisterDto dto);
        Task<AuthResponse> LoginAsync(LoginDto dto);
    }
}
