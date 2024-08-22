[CmdletBinding(DefaultParameterSetName = "ListNPK")]
param (
	[Parameter(ParameterSetName = "ListFiles", Mandatory)]
	[switch]$ListFiles,

	[Parameter(ParameterSetName = "Extract", Mandatory)]
	[switch]$Extract,

	[Parameter()]
	[string]$GameFolderPath = "D:\Games\Steam\steamapps\common\Once Human",

	[Parameter()]
	[string]$QuickBmsPath = "quickbms.exe",

	[Parameter()]
	[string]$PvrTexToolCliPath = "PVRTexToolCLI.exe"
)

switch ($PSCmdlet.ParameterSetName) {
	"ListNPK" {
		Get-ChildItem -Path $GameFolderPath -Recurse -Filter "*.npk" | Resolve-Path -Relative -RelativeBasePath $GameFolderPath
	}

	"ListFiles" {
		$data = @{}

		Get-ChildItem -Path $GameFolderPath -Recurse -Filter "*.npk" | ForEach-Object {
			$npkFile = $_.FullName
			$files = & $QuickBmsPath -l OnceHuman.bms $_.FullName | ForEach-Object {
				$_ -split '\s+' | Select-Object -Index 3
			}
			$data[$npkFile] = $files
		}

		$data | ConvertTo-Json | Out-File ../data/files.json
	}

	"Extract" {
		# TODO: Implement
	}
}
