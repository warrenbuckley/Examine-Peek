using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Routing;

namespace ExaminePeek.Controllers
{
	[ApiController]
	[BackOfficeRoute("examinepeek/api/v{version:apiVersion}")]
	[Authorize(Policy = "HasExaminePeekPermission")]
	[MapToApi("ExaminePeek")]
	public class ExaminePeekControllerBase : ControllerBase
	{
	}
}
