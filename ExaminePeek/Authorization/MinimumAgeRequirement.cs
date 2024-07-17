using Microsoft.AspNetCore.Authorization;

namespace ExaminePeek.Authorization
{
	public class MinimumAgeRequirement : IAuthorizationRequirement
	{
		public MinimumAgeRequirement(int minimumAge) => MinimumAge = minimumAge;
		public int MinimumAge { get; }
	}
}