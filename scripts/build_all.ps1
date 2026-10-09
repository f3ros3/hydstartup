$ErrorActionPreference = 'Stop'

$nodeDir = 'C:\Users\feroz\.gemini\antigravity\scratch\node'
$projectDir = 'C:\Users\feroz\.gemini\antigravity\scratch\hyderabad-startups-portal'

$env:Path = "$nodeDir;" + $env:Path

Write-Host "========================================="
Write-Host "1. Building Client Bundle with Vite..."
Write-Host "========================================="
Set-Location $projectDir
& "$nodeDir\npm.cmd" run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "Vite build failed!"
    exit $LASTEXITCODE
}

Write-Host "========================================="
Write-Host "2. Running Static Site Generator (SSG)..."
Write-Host "========================================="
& "$nodeDir\node.exe" "$projectDir\scripts\generate_static_site.mjs"

if ($LASTEXITCODE -ne 0) {
    Write-Error "SSG generation failed!"
    exit $LASTEXITCODE
}

Write-Host "========================================="
Write-Host "3. Syncing to docs/ for deployment..."
Write-Host "========================================="
Copy-Item -Path "$projectDir\dist\*" -Destination "$projectDir\docs\" -Recurse -Force

Write-Host "========================================="
Write-Host "✅ Full static site and client application built successfully!"
Write-Host "========================================="
