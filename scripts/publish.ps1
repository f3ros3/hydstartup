param (
    [string]$CommitMessage = "Auto-publish updates and production build"
)

$nodeDir = 'C:\Users\feroz\.gemini\antigravity\scratch\node'
$gitExe = 'C:\Users\feroz\.gemini\antigravity\scratch\git\cmd\git.exe'
$env:Path = "$nodeDir;" + $env:Path

Write-Host "========================================="
Write-Host "🚀 1. Building Production Bundle (Vite)..."
Write-Host "========================================="
& "$nodeDir\npm.cmd" run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}

Write-Host "========================================="
Write-Host "📁 2. Syncing dist/ to docs/..."
Write-Host "========================================="
Copy-Item -Path 'dist\*' -Destination 'docs\' -Recurse -Force

# Clean stale assets in docs/assets
$currentJs = (Get-ChildItem 'dist\assets\*.js' | Select-Object -First 1).Name
$currentCss = (Get-ChildItem 'dist\assets\*.css' | Select-Object -First 1).Name

Get-ChildItem 'docs\assets' | ForEach-Object {
    if ($_.Name -ne $currentJs -and $_.Name -ne $currentCss) {
        Write-Host "Removing stale asset: $($_.Name)"
        Remove-Item $_.FullName -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "========================================="
Write-Host "📦 3. Git Add, Commit & Auto-Push..."
Write-Host "========================================="
& $gitExe add -A
& $gitExe commit -m $CommitMessage

Write-Host "Pushing to GitHub origin main..."
& $gitExe push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Published successfully to GitHub and live site!"
} else {
    Write-Warning "Push requires GitHub authentication. Please authenticate once with git or provide a GitHub PAT."
}
