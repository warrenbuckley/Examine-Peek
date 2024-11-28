using ExaminePeek.Auth;
using Microsoft.AspNetCore.Authorization;

namespace ExaminePeek.Extensions
{
	public static class PolicyBuilderExtensions
	{
		public static void RequireUmbracoPermission(this AuthorizationPolicyBuilder builder, string permission)
		{
			builder.Requirements.Add(new HasUmbracoPermissionRequirement(permission));
		}
	}
}