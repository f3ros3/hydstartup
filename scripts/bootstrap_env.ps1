$ErrorActionPreference = 'Stop'
$scratch = 'C:\Users\feroz\.gemini\antigravity\scratch'
$gitDir = Join-Path $scratch 'git'
$gitZip = Join-Path $scratch 'mingit.zip'
$nodeDir = Join-Path $scratch 'node'
$nodeZip = Join-Path $scratch 'node.zip'
$tempNode = Join-Path $scratch 'temp_node'

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

if (-not (Test-Path "$gitDir\cmd\git.exe")) {
    Write-Host 'Downloading MinGit...'
    Invoke-WebRequest -Uri 'https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/MinGit-2.44.0-64-bit.zip' -OutFile $gitZip
    Write-Host 'Extracting MinGit...'
    Expand-Archive -Path $gitZip -DestinationPath $gitDir -Force
    Remove-Item $gitZip -Force -ErrorAction SilentlyContinue
}

if (-not (Test-Path "$nodeDir\node.exe")) {
    Write-Host 'Downloading Node.js portable...'
    Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip' -OutFile $nodeZip
    Write-Host 'Extracting Node.js...'
    Expand-Archive -Path $nodeZip -DestinationPath $tempNode -Force
    Copy-Item "$tempNode\node-v20.18.0-win-x64\*" $nodeDir -Recurse -Force
    Remove-Item $tempNode, $nodeZip -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host 'Verification:'
& "$gitDir\cmd\git.exe" --version
& "$nodeDir\node.exe" -v
& "$nodeDir\npm.cmd" -v
