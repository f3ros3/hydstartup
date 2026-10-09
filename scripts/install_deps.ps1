$nodeDir = 'C:\Users\feroz\.gemini\antigravity\scratch\node'
$projectDir = 'C:\Users\feroz\.gemini\antigravity\scratch\hyderabad-startups-portal'

$env:Path = "$nodeDir;" + $env:Path
Set-Location $projectDir

Write-Host "Reinstalling React & React-DOM..."
& "$nodeDir\npm.cmd" install react@18.3.1 react-dom@18.3.1 --force

Write-Host "npm install completed with code: $LASTEXITCODE"
