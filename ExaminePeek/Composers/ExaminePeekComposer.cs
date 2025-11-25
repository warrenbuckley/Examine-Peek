using ExaminePeek.Auth;
using ExaminePeek.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi;
using OpenIddict.Validation.AspNetCore;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;
using Umbraco.Cms.Api.Management.OpenApi;
using Umbraco.Cms.Api.Management.Security.Authorization.UserGroup;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace ExaminePeek.Composers
{
	public class ExaminePeekComposer : IComposer
	{
		public void Compose(IUmbracoBuilder builder)
		{
			builder.Services.Configure<SwaggerGenOptions>(opt =>
			{
				// Configure the Swagger generation options
				// Add in a new Swagger API document solely for our own package that can be browsed via Swagger UI
				// Along with having a generated swagger JSON file that we can use to auto generate a TypeScript client
				opt.SwaggerDoc("ExaminePeek", new OpenApiInfo
				{
					Title = "Examine Peek Package API",
					Version = "1.0",
					Contact = new OpenApiContact
					{
						Name = "Warren Buckley",
						Email = "warren@hackmakedo.com",
						Url = new Uri("https://hackmakedo.com")
					}
				});

				// PR: https://github.com/umbraco/Umbraco-CMS/pull/15699
				opt.OperationFilter<MyBackOfficeSecurityRequirementsOperationFilter>();

				// https://learn.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-8.0&tabs=visual-studio#xml-comments
				var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
				var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFilename);
				if (File.Exists(xmlPath))
				{
					opt.IncludeXmlComments(xmlPath);
				}
			});

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

		// PR: https://github.com/umbraco/Umbraco-CMS/pull/15699
		public class MyBackOfficeSecurityRequirementsOperationFilter : BackOfficeSecurityRequirementsOperationFilterBase
		{
			protected override string ApiName => "ExaminePeek";
		}
	}
}
