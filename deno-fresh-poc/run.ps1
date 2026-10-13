param(
  [ValidateSet("auto", "offline", "online")]
  [string]$Mode = "auto",

  [string]$Proxy = $null,

  [int]$Port = 8000
)

function Normalize-ProxyAddress {
  param([string]$value)

  if (-not $value) { return $null }

  $address = $value.Trim()
  $address = $address -replace '^https?://', ''
  $address = $address.TrimEnd('/')

  if ($address -match '^([^:]+):([0-9]+)$') {
    return "$($matches[1]):$($matches[2])"
  }

  if ($address -match '^[0-9\.]+$' -or $address -match '^[a-zA-Z0-9\.-]+$') {
    return "$address:8080"
  }

  return $address
}

function Read-SavedProxy {
  param([string]$path)
  if (Test-Path $path) {
    return (Get-Content -Path $path -ErrorAction SilentlyContinue | Select-Object -First 1).Trim()
  }
  return $null
}

function Save-Proxy {
  param([string]$path, [string]$value)
  Set-Content -Path $path -Value $value
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

$proxyFile = Join-Path $scriptDir ".last_proxy.txt"

$requestedProxy = if ($Proxy) { Normalize-ProxyAddress $Proxy } else { $null }
$currentProxy = $requestedProxy
if (-not $currentProxy) {
  $currentProxy = 
    if ($env:HTTPS_PROXY) { Normalize-ProxyAddress $env:HTTPS_PROXY } 
    elseif ($env:HTTP_PROXY) { Normalize-ProxyAddress $env:HTTP_PROXY } 
    else { $null }
}

$savedProxy = Read-SavedProxy -path $proxyFile

if ($currentProxy -and $savedProxy -and ($currentProxy -ne $savedProxy)) {
  Write-Host "Detected proxy changed from saved value."
  Write-Host "Saved proxy: $savedProxy"
  Write-Host "Current proxy: $currentProxy"
  Write-Host "Choose an option:"
  Write-Host "  1 - Proxy changed, enter new proxy address"
  Write-Host "  2 - I checked, this is the same proxy and not the cause"

  $choice = Read-Host "Enter 1 or 2"
  while ($choice -notin @('1','2')) {
    $choice = Read-Host "Invalid choice. Enter 1 or 2"
  }

  if ($choice -eq '1') {
    $newProxy = Read-Host "Enter new proxy host or host:port (port 8080 will be applied if missing)"
    $newProxy = Normalize-ProxyAddress $newProxy
    if (-not $newProxy) {
      Write-Error "Invalid proxy value. Aborting."
      exit 1
    }
    $currentProxy = $newProxy
    Save-Proxy -path $proxyFile -value $currentProxy
  } else {
    Save-Proxy -path $proxyFile -value $currentProxy
  }
}

if (-not $savedProxy -and $currentProxy) {
  Save-Proxy -path $proxyFile -value $currentProxy
}

if ($currentProxy) {
  $env:HTTP_PROXY = "http://$currentProxy"
  $env:HTTPS_PROXY = "http://$currentProxy"
  Write-Host "Using proxy: $currentProxy"
}

$denoExe = $null
$envDenoExe = $env:PAIXX_DENO_EXE
if ($envDenoExe -and (Test-Path -LiteralPath $envDenoExe -ErrorAction SilentlyContinue)) {
  $denoExe = $envDenoExe
} else {
  $denoCmd = Get-Command deno -ErrorAction SilentlyContinue
  if ($denoCmd) {
    $denoExe = $denoCmd.Source
  } else {
    $workspaceFallback = Join-Path (Resolve-Path (Join-Path $scriptDir "..\..")) ".tools\deno\deno.exe"
    if (Test-Path -LiteralPath $workspaceFallback -ErrorAction SilentlyContinue) {
      $denoExe = $workspaceFallback
    } else {
      $wingetFallback = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\DenoLand.Deno_Microsoft.Winget.Source_8wekyb3d8bbwe\deno.exe"
      if (Test-Path -LiteralPath $wingetFallback -ErrorAction SilentlyContinue) {
        $denoExe = $wingetFallback
      }
    }
  }
}

if (-not $denoExe) {
  Write-Error "Deno executable not found. Install Deno, set PAIXX_DENO_EXE, or place deno.exe at paixx\.tools\deno\deno.exe."
  exit 1
}

$env:PORT = $Port.ToString()
Write-Host "Running in mode: $Mode"
Write-Host "Project directory: $scriptDir"
Write-Host "Deno executable: $denoExe"
Write-Host "Port: $Port"

switch ($Mode) {
  "offline" {
    & $denoExe run --allow-net --allow-read --allow-env main.ts
    break
  }
  "online" {
    & $denoExe run --allow-net --allow-read --allow-env online.ts
    break
  }
  "auto" {
    & $denoExe run --allow-net --allow-read --allow-env run.ts
    break
  }
}
