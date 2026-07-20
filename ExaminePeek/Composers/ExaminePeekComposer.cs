using ExaminePeek.Auth;
using ExaminePeek.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using OpenIddict.Validation.AspNetCore;
using Umbraco.Cms.Api.Common.OpenApi;
using Umbraco.Cms.Api.Management.OpenApi;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace ExaminePeek.Composers
{
	public class ExaminePeekComposer : IComposer
	{
		public void Compose(IUmbracoBuilder builder)
		{
			builder.AddBackOfficeOpenApiDocument(
				"ExaminePeek",
				document => document
					.WithTitle("Examine Peek Package API")
					.WithBackOfficeAuthentication()
			);

			builder.Services.AddSingleton<IAuthorizationHandler, HasUmbracoPermissionHandler>();
			builder.Services.Configure<AuthorizationOptions>(opt =>
			{	
				opt.AddPolicy("HasExaminePeekPermission", policyBuilder =>
				{
					policyBuilder.AuthenticationSchemes.Add(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);
					policyBuilder.RequireUmbracoPermission("ExaminePeek.Enabled");
				});
			});
		}
	}
}
