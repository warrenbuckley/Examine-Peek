using Microsoft.AspNetCore.Authorization;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Security.Authorization;
using Umbraco.Cms.Core.Services;
using Umbraco.Extensions;

namespace ExaminePeek.Auth
{
	public class HasUmbracoPermissionHandler : AuthorizationHandler<HasUmbracoPermissionRequirement>
	{
		private readonly IAuthorizationHelper _authorizationHelper;
		private readonly IUserService _userService;

		public HasUmbracoPermissionHandler(IAuthorizationHelper authorizationHelper, IUserService userService)
		{
			_authorizationHelper = authorizationHelper;
			_userService = userService;
		}
		
		protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasUmbracoPermissionRequirement requirement)
		{
			var umbracoUser = _authorizationHelper.GetUmbracoUser(context.User);
			umbracoUser.
			var permissions = umbracoUser.GetPermissions(Constants.System.RootString, _userService);
			var hasPermission = permissions.Contains(requirement.Permission);

			if (hasPermission)
			{
				context.Succeed(requirement);
				return Task.CompletedTask;
			}
			
			context.Fail();
			return Task.CompletedTask;
		}
	}
}