#!/usr/bin/env pwsh
$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
$BoxPath = Split-Path -Parent $ScriptPath
$ContentPath = Resolve-Path -Path "../gettext-content"
# step 1 build box 
Set-Location $BoxPath
Remove-Item -Recurse -Path .\build
npm run build
# step 2 build content
Set-Location $ContentPath
npm run build
# step 3 copy content file to box
Copy-Item -Recurse -Path .\build\* (Join-Path $BoxPath "build/")
# step 4 package electron
Set-Location $BoxPath
Remove-Item -Recurse -Path .\dist
npm run pack
# Write-Output $BoxPath
# Write-Output $(Get-Location).Path
