param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$projectDirectory = $PSScriptRoot
$url = 'http://localhost:5177'
$running = $false
try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3
    if ($response.Content -notmatch 'Rital Events') { throw 'Le port 5177 est utilise par une autre application.' }
    $running = $true
} catch {
    if ($_.Exception.Message -match 'autre application') { throw }
}
if (-not $running) {
    $vitePath = Join-Path $projectDirectory 'node_modules\vite\bin\vite.js'
    if (-not (Test-Path -LiteralPath $vitePath)) { throw 'Les dependances sont absentes. Executer npm.cmd install dans le dossier du projet.' }
    $launchArguments = '"' + $vitePath + '" --host 127.0.0.1 --port 5177 --strictPort'
    $localProcess = Start-Process -FilePath (Get-Command node.exe).Source -ArgumentList $launchArguments -WorkingDirectory $projectDirectory -WindowStyle Hidden -RedirectStandardOutput (Join-Path $projectDirectory 'local-server.log') -RedirectStandardError (Join-Path $projectDirectory 'local-server-error.log') -PassThru
    $localProcess.Id | Set-Content -LiteralPath (Join-Path $projectDirectory '.local-server.pid')
    for ($attempt = 0; $attempt -lt 30; $attempt++) {
        Start-Sleep -Milliseconds 500
        try {
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
            if ($response.StatusCode -eq 200 -and $response.Content -match 'Rital Events') { $running = $true; break }
        } catch {}
        if ($localProcess.HasExited) { break }
    }
    if (-not $running) { throw 'Le site ne repond pas encore. Consulter local-server-error.log.' }
}
Write-Host "Rital Events est disponible sur $url"
if (-not $NoBrowser) { Start-Process $url }
