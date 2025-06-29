using task_manager_service.DTOs;
using task_manager_service.Interfaces;


namespace task_manager_service.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepo;
        private readonly IJwtHelper _jwtHelper;
        public AuthService(IUserRepository repo, IJwtHelper jwtHelper)
        {
            _userRepo = repo;
            _jwtHelper = jwtHelper;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterDto dto)
        {
            if (await _userRepo.ExistsAsync(dto.Email)) return new AuthResponse { Success = false, Message = "Email exists" };

            var user = new User { Email = dto.Email, PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password) };
            await _userRepo.AddAsync(user);
            var token = _jwtHelper.GenerateToken(user);
            return new AuthResponse { Success = true, Token = token };
        }

        public async Task<AuthResponse> LoginAsync(LoginDto dto)
        {
            var user = await _userRepo.GetByEmailAsync(dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return new AuthResponse { Success = false, Message = "Invalid credentials" };

            var token = _jwtHelper.GenerateToken(user);
            return new AuthResponse { Success = true, Token = token };
        }
    }
}
