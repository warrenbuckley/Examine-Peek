using Asp.Versioning;
using Examine;
using Examine.Search;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Infrastructure.Examine;

namespace ExaminePeek.Controllers
{
	[ApiVersion("1.0")]
	[ApiExplorerSettings(GroupName = "Examine Peek")]
	public  class ExaminePeekApiController : ExaminePeekControllerBase
	{
		private readonly IExamineManager _examineManager;

		public ExaminePeekApiController(IExamineManager examineManager)
		{
			_examineManager = examineManager;
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

		/// <summary>
		/// Show the stored data in Examine for a given content node based on its key
		/// </summary>
		/// <param name="key" example="7222e75b-9396-4cc9-bedb-149ca12c846d">The GUID/Key of the Content Node in Umbraco</param>
		/// <returns>Returns the Examine record for the given content node</returns>
		/// <remarks>
		/// Sample request:
		///
		///     GET /umbraco/api/examinepeek/v1/record/7222e75b-9396-4cc9-bedb-149ca12c846d
		/// </remarks>
		/// <response code="200">Returns the Examine record for the given content node</response>
		/// <response code="404">Unable to find Umbraco's Examine External Index</response>
		/// <response code="400">KABOOM! We have more than one entry for the GUID/key in Examine. How that happen!?</response>
		/// <response code="204">No entry exists in Examine for the given content node</response>
		[HttpGet("Record/{key:guid}")]
		[ProducesResponseType(typeof(ISearchResult), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		public IActionResult ReadRecordFromExamine(Guid key)
		{
			// Try and get the external index
			if (_examineManager.TryGetIndex(Umbraco.Cms.Core.Constants.UmbracoIndexes.ExternalIndexName, out var externalIndex) == false)
			{
				// Return some response to say we can't find the index
				return NotFound("Umbraco External Examine Index not found");
			}

			// Using a lucene query to find the record based on the key
			// Remember the value needs to be escaped/wrapped in quotes for an exact match
			// __Key:"7222e75b-9396-4cc9-bedb-149ca12c846d"
			var searcher = externalIndex.Searcher;
			var query = searcher
				.CreateQuery()
				.NativeQuery($"{UmbracoExamineFieldNames.NodeKeyFieldName}:\"{key.ToString()}\"");

			// Should only return ONE result
			// If we have more than one result then something is wrong
			// Total Results will let us know for some ODD reason we match another record
			var results = query.Execute(new QueryOptions(0, 1));
			if (results.TotalItemCount > 1)
			{
				// KABOOM !
				BadRequest("KABOOM! More than one result found for the given key. How on earth did that happen?!");
			}
			else if (results.TotalItemCount == 0)
			{
				// Return No Content
				return NoContent();
			}

			// Return the Examine item and its fields 
			// Then the WebComponent Dialog UI can display them
			return Ok(results.FirstOrDefault());
		}
	}
}
