$nodeDir = 'C:\Users\feroz\.gemini\antigravity\scratch\node'
$projectDir = 'C:\Users\feroz\.gemini\antigravity\scratch\hyderabad-startups-portal'

$env:Path = "$nodeDir;" + $env:Path
Set-Location $projectDir

Write-Host "Removing old node_modules..."
Remove-Item -Path "$projectDir\node_modules" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Running clean npm install..."
& "$nodeDir\npm.cmd" install

Write-Host "npm install finished with code: $LASTEXITCODE"
