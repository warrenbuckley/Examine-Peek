using Microsoft.AspNetCore.Authorization;
using NPoco.Expressions;
using System.Security.Claims;
using Umbraco.Cms.Core.Security.Authorization;

namespace ExaminePeek.Authorization
{
	public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
	{
		private readonly IAuthorizationHelper _authorizationHelper;

		public MinimumAgeHandler(IAuthorizationHelper authorizationHelper)
		{
			_authorizationHelper = authorizationHelper;
		}
		
		protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinimumAgeRequirement requirement)
		{

			//var umbUser = _authorizationHelper.GetUmbracoUser(context.User);
			var user = context.User.Identity.IsAuthenticated;

			var foo = context.Resource;
			
			var dateOfBirthClaim = context.User.FindFirst(
				c => c.Type == ClaimTypes.DateOfBirth && c.Issuer == "http://contoso.com");

			if (dateOfBirthClaim is null)
			{
				// 404s as opposed to 401 with auth issue ?!
				context.Fail();
				return Task.CompletedTask;
			}

			var dateOfBirth = Convert.ToDateTime(dateOfBirthClaim.Value);
			int calculatedAge = DateTime.Today.Year - dateOfBirth.Year;
			if (dateOfBirth > DateTime.Today.AddYears(-calculatedAge))
			{
				calculatedAge--;
			}

			if (calculatedAge >= requirement.MinimumAge)
			{
				context.Succeed(requirement);
			}

			return Task.CompletedTask;
		}
	}
}