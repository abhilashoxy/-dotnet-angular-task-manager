using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_manager_service.DTOs;
using task_manager_service.Interfaces;

namespace task_manager_service.Controllers
{

    [ApiController, Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService) => _authService = authService;

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            return Ok(await _authService.RegisterAsync(dto));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
            => Ok(await _authService.LoginAsync(dto));
    }


}
