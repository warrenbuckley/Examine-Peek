using ExaminePeek.PackageMigrations.Migrations;
using Umbraco.Cms.Core.Packaging;

namespace ExaminePeek.PackageMigrations
{
	public class ExaminePeekMigrationPlan : PackageMigrationPlan
	{
		public ExaminePeekMigrationPlan():base("Examine Peek")
		{
		}
		protected override void DefinePlan()
		{
			To<AddUserPermissionToAdmins>("examinepeek.addUserPermissions");
		}
	}
}
