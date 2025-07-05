using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using task_manager_service.DTOs;
using task_manager_service.Interfaces;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepo;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserController(IUserRepository userRepo, IHttpContextAccessor httpContextAccessor)
    {
        _userRepo = userRepo;
        _httpContextAccessor = httpContextAccessor;
    }

    private int GetLoggedInUserId() =>
        int.Parse(_httpContextAccessor.HttpContext.User.FindFirst("userId")?.Value);

    [HttpGet("me")]
    public async Task<IActionResult> GetProfile()
    {
        var user = await _userRepo.GetByIdAsync(GetLoggedInUserId());
        return Ok(new { user.Email, user.Username, user.Address });
    }

    [HttpPut("me")]
    public async Task<IActionResult> UpdateProfile(UpdateUserProfileDto dto)
    {
        var user = await _userRepo.GetByIdAsync(GetLoggedInUserId());
        user.Username = dto.Username;
        user.Address = dto.Address;
        await _userRepo.UpdateAsync(user);
        return Ok();
    }
}
