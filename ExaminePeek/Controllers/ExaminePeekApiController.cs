using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace ExaminePeek.Controllers
{
	[ApiVersion("1.0")]
	[ApiExplorerSettings(GroupName = "Examine Peek")]
	public  class ExaminePeekApiController : ExaminePeekControllerBase
	{
		public ExaminePeekApiController()
		{
		}

		/// <summary>
		/// Test API call to ensure API routing etc is setup correctly
		/// </summary>
		/// <returns>Returns a simple string of 'Pong'</returns>
		/// <remarks>
		/// Sample request:
		///
		///     GET /umbraco/api/examinepeek/v1/ping
		/// </remarks>
		/// <response code="200">Returns 'Pong'</response>
		[HttpGet("Ping")]
		[ProducesResponseType(typeof(string), 200)]
		public string Ping() => "Pong";
	}
}
