using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Umbraco.Cms.Core.Security.Authorization;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Services.AuthorizationStatus;

namespace ExaminePeek.Auth
{
	public class HasUmbracoPermissionHandler : AuthorizationHandler<HasUmbracoPermissionRequirement>
	{
		private readonly IAuthorizationHelper _authorizationHelper;
		private readonly IUserService _userService;
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly IContentPermissionService _contentPermissionService;

		public HasUmbracoPermissionHandler(IAuthorizationHelper authorizationHelper, IUserService userService, IHttpContextAccessor httpContextAccessor, IContentPermissionService contentPermissionService)
		{
			_authorizationHelper = authorizationHelper ?? throw new ArgumentNullException(nameof(authorizationHelper));
			_userService = userService ?? throw new ArgumentNullException(nameof(userService));
			_httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
			_contentPermissionService = contentPermissionService ?? throw new ArgumentNullException(nameof(contentPermissionService));
		}

		protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, HasUmbracoPermissionRequirement requirement)
		{
			if (context.User.Identity?.IsAuthenticated is false)
			{
				context.Fail();
				return;
			}
				
			var umbracoUser = _authorizationHelper.GetUmbracoUser(context.User);
			var httpContext = _httpContextAccessor.HttpContext;
			
			var documentKey = httpContext?.GetRouteValue("key")?.ToString();
			if (Guid.TryParse(documentKey, out var parsedKey))
			{
				var checkPermission =  await _contentPermissionService.AuthorizeAccessAsync(umbracoUser, parsedKey, requirement.Permission);
				if (checkPermission == ContentAuthorizationStatus.Success)
				{
					context.Succeed(requirement);
					return;
				}
				
				context.Fail();
				return;
			}
			
			var checkRootPermission = await _contentPermissionService.AuthorizeRootAccessAsync(umbracoUser, requirement.Permission);
			if (checkRootPermission == ContentAuthorizationStatus.Success)
			{
				context.Succeed(requirement);
				return;
			}
			
			context.Fail();
		}
	}
}