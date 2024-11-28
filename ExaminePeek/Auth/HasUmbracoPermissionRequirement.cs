using Microsoft.AspNetCore.Authorization;

namespace ExaminePeek.Auth
{
	public class HasUmbracoPermissionRequirement : IAuthorizationRequirement
	{
		public HasUmbracoPermissionRequirement(string permission) => Permission = permission;
		public string Permission { get; }
	}
}