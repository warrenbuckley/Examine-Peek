# Define the project file and configuration
$projectFile = "./ExaminePeek/ExaminePeek.csproj"
$configuration = "Release"
$outputDirectory = "./build.out"
$version = "1.0.0"

# Clean the project (Removes the old build nuget packages)
dotnet clean $projectFile --configuration $configuration --output $outputDirectory

# Set the version of the C# assembly and the NuGet package
dotnet msbuild $projectFile /p:Version=$version

# Build the project
dotnet build $projectFile --configuration $configuration --output $outputDirectory

# Check if the build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Output "Build successful."
} else {
    Write-Output "Build failed."
    exit $LASTEXITCODE
}