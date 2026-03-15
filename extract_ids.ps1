param()
# index.htmlから entry.XXXX を抽出
$htmlPath = "c:\Users\yuuki\OneDrive - 有限会社クローバー調剤薬局\その他\Antigravity\Googleフォーム\googleform_app\index.html"
$html = Get-Content -Path $htmlPath -Raw -Encoding UTF8
$htmlMatches = [regex]::Matches($html, 'entry\.(\d+)')
$htmlIds = @{}
foreach ($item in $htmlMatches) {
    $htmlIds[$item.Value] = $true
}

# Googleフォームの正式なIDリスト
$googleIds = @(
    "entry.1016463931", "entry.1024238102", "entry.1085297195", "entry.1162684626",
    "entry.1174800030", "entry.1187753658", "entry.1270005582", "entry.1331782479",
    "entry.1334172005", "entry.1352973976", "entry.1377007546", "entry.1410519611",
    "entry.1417926586", "entry.1482297776", "entry.1499074801", "entry.1513768206",
    "entry.1565002541", "entry.1570650636", "entry.1703356753", "entry.1740273603",
    "entry.176891203", "entry.1883828617", "entry.1884144230", "entry.1965254761",
    "entry.1981656161", "entry.2037226134", "entry.205915687", "entry.2108592001",
    "entry.2123241029", "entry.2140005991", "entry.268288857", "entry.375838857",
    "entry.413348291", "entry.427826184", "entry.454274385", "entry.622897563",
    "entry.662494497", "entry.668539667", "entry.730294101", "entry.741536227",
    "entry.753925514", "entry.756136423", "entry.854718610", "entry.863779859",
    "entry.893585706", "entry.901416160", "entry.918293202", "entry.948312814",
    "entry.990808607", "entry.998853333"
)

Write-Output "=== IDs in HTML but NOT in Google Form ==="
foreach ($id in ($htmlIds.Keys | Sort-Object)) {
    if ($googleIds -notcontains $id) {
        Write-Output "  INVALID: $id"
    }
}

Write-Output ""
Write-Output "=== IDs in HTML (valid) ==="
foreach ($id in ($htmlIds.Keys | Sort-Object)) {
    if ($googleIds -contains $id) {
        Write-Output "  OK: $id"
    }
}

Write-Output ""
Write-Output "=== IDs in Google Form but NOT in HTML ==="
foreach ($id in $googleIds) {
    if (-not $htmlIds.ContainsKey($id)) {
        Write-Output "  MISSING: $id"
    }
}
