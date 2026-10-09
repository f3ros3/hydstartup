param (
    [string]$CommitMessage = "Publish full crawlable static site, 14 research articles, trust pages, and updated contact email"
)

$nodeDir = 'C:\Users\feroz\.gemini\antigravity\scratch\node'
$gitExe = 'C:\Users\feroz\.gemini\antigravity\scratch\git\cmd\git.exe'
$projectDir = 'C:\Users\feroz\.gemini\antigravity\scratch\hyderabad-startups-portal'

$env:Path = "$nodeDir;" + $env:Path

Write-Host "========================================="
Write-Host "1. Executing Full Production Build & SSG..."
Write-Host "========================================="
& powershell.exe -ExecutionPolicy Bypass -File "$projectDir\scripts\build_all.ps1"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build and SSG generation failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}

Write-Host "========================================="
Write-Host "2. Staging all modified files..."
Write-Host "========================================="
Set-Location $projectDir
& $gitExe add -A

Write-Host "========================================="
Write-Host "3. Creating Git Commit..."
Write-Host "========================================="
& $gitExe commit -m $CommitMessage

Write-Host "========================================="
Write-Host "4. Pushing to GitHub origin main..."
Write-Host "========================================="
& $gitExe push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Published successfully to GitHub and live site!"
} else {
    Write-Warning "Push encountered an issue. Check Git authentication or network status."
}
