<#
================================================================================
  TP-Link 路由器远程重启脚本（SLP 新界面，适用于 TL-ER3220G 等）
  接口分析依据：/web-static/js/su/su.js、data/proxy.js、login.htm、firmware_reboot.htm

  流程：
    1) POST http://<router>/   {"method":"do","user_management":{"get_encrypt_info":null}}
       -> 获取 nonce / encrypt_type（决定密码加密方式）
    2) 密码加密：
       - encrypt_type 含 "3"  -> MD5(密码 + ':' + nonce)，登录体带 encrypt_type:"3"
       - 否则                 -> TP-Link XOR 字典加密（securityEncode）
    3) POST http://<router>/   {"method":"do","login":{"username":"..","password":".."}}
       -> 返回 stok（会话令牌）
    4) 仅当指定 -RebootNow：
       POST http://<router>/stok=<stok>/ds   {"method":"do","system":{"reboot":null}}
       -> 触发路由器重启

  安全设计：
    - 默认【只登录验证，绝不重启】。只有显式加 -RebootNow 才发送重启指令。
    - 密码支持三种方式：-Password 参数 / -PasswordFile 加密文件(DPAPI) / 交互输入。
    - 密码绝不硬编码、绝不输出到屏幕。

  示例：
    # 1) 只验证登录（安全，不重启）
    .\Router-Reboot.ps1
    # 2) 立即重启（显式授权）
    .\Router-Reboot.ps1 -RebootNow
    # 3) 带密码参数（避免交互输入）
    .\Router-Reboot.ps1 -Password '你的密码' -RebootNow
    # 4) 使用 DPAPI 加密密码文件（供定时任务无人值守使用）
    #    生成密码文件（只需执行一次）：
    #      Read-Host -AsSecureString | ConvertFrom-SecureString | Out-File -Encoding ascii .\router-pwd.bin
    .\Router-Reboot.ps1 -PasswordFile .\router-pwd.bin -RebootNow
================================================================================
#>
[CmdletBinding()]
param(
    [string]$Router      = "10.0.0.1",
    [string]$Username    = "admin",
    [string]$Password,
    [string]$PasswordFile,
    [switch]$RebootNow,
    [switch]$Quiet
)

$ErrorActionPreference = 'Stop'
$ProgressPreference    = 'SilentlyContinue'

function Write-Log {
    param([string]$Msg)
    if (-not $Quiet) { Write-Host $Msg }
}

# ---- 1) TP-Link XOR 字典加密（encrypt_type 不含 '3' 时使用） ------------------
function Get-TPLinkXorPwd {
    param([string]$Pwd)
    $strDe = "RDpbLfCPsJZ7fiv"
    $dic   = "yLwVl0zKqws7LgKPRQ84Mdt708T1qQ3Ha7xv3H7NyU84p21BriUWBU43odz3iP4rBL3cD02KZciXTysVXiV8ngg6vL48rPJyAUw0HurW20xqxv9aYb4M9wK1Ae0wlro510qXeU07kV57fQMc8L6aLgMLwygtc0F10a0Dg70TOoouyFhdysuRMO51yY5ZlOZZLEal1h0t9YQW0Ko7oBwmCAHoic4HYbUyVeU3sfQ1xtXcPcf1aT303wAQhv66qzW"
    $len1 = $Pwd.Length
    $len2 = $strDe.Length
    $lenDict = $dic.Length
    $len  = [Math]::Max($len1, $len2)
    $out  = New-Object System.Text.StringBuilder
    for ($i = 0; $i -lt $len; $i++) {
        $cl = 0xBB; $cr = 0xBB
        if ($i -ge $len1) {
            $cr = [int][char]$strDe[$i]
        } elseif ($i -ge $len2) {
            $cl = [int][char]$Pwd[$i]
        } else {
            $cl = [int][char]$Pwd[$i]
            $cr = [int][char]$strDe[$i]
        }
        [void]$out.Append($dic[($cl -bxor $cr) % $lenDict])
    }
    return $out.ToString()
}

# ---- 2) MD5（encrypt_type 含 '3' 时使用：MD5(密码:nonce)） -------------------
function Get-MD5Hex {
    param([string]$Text)
    $md5  = [System.Security.Cryptography.MD5]::Create()
    $hash = $md5.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($Text))
    return ([System.BitConverter]::ToString($hash)).Replace('-', '').ToLower()
}

# ---- 3) 构建 SLP 请求体（等价于前端 JSON.stringify + encodeURIComponent 字符串值）---
function New-SuJsonBody {
    param([hashtable]$Action)
    $out = @{ method = 'do' }
    foreach ($k in $Action.Keys) {
        $v = $Action[$k]
        if ($null -eq $v) {
            $out[$k] = $null
        } elseif ($v -is [hashtable]) {
            $inner = @{}
            foreach ($ik in $v.Keys) {
                $iv = $v[$ik]
                if ($null -eq $iv) { $inner[$ik] = $null }
                else { $inner[$ik] = [uri]::EscapeDataString([string]$iv) }
            }
            $out[$k] = $inner
        } else {
            $out[$k] = [uri]::EscapeDataString([string]$v)
        }
    }
    return ($out | ConvertTo-Json -Compress -Depth 5)
}

# ---- 4) 密码获取 --------------------------------------------------------------
function Resolve-Password {
    if ($Password) { return $Password }
    if ($PasswordFile) {
        if (-not (Test-Path -LiteralPath $PasswordFile)) { throw "密码文件不存在: $PasswordFile" }
        $ss = Get-Content -LiteralPath $PasswordFile -Raw | ConvertTo-SecureString
        $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($ss)
        try { return [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
        finally { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
    }
    $ss = Read-Host -Prompt '请输入路由器管理密码' -AsSecureString
    $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($ss)
    try { return [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
    finally { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
}

# ---- 5) 主流程 -----------------------------------------------------------------
try {
    $base   = "http://$Router"
    $pwd    = Resolve-Password
    $headers = @{ 'Content-Type' = 'application/json; charset=UTF-8' }

    # 5.1 获取加密参数
    Write-Log "[1/3] 获取加密参数 nonce/encrypt_type ..."
    $bodyInfo = '{"method":"do","user_management":{"get_encrypt_info":null}}'
    $r = Invoke-WebRequest -Uri "$base/" -Method Post -Body $bodyInfo -Headers $headers -UseBasicParsing -TimeoutSec 10
    $info = $r.Content | ConvertFrom-Json
    if ($info.error_code -ne 0) { throw "get_encrypt_info 失败: error_code=$($info.error_code)" }
    $nonce = $info.nonce
    $encryptType = $info.encrypt_type

    # 5.2 按 encrypt_type 选择加密方式（兼容数组 ["3"] 或字符串 "3"）
    $encTypes = @($info.encrypt_type)
    if ($encTypes -contains '3') {
        $encPwd = Get-MD5Hex "$pwd`:$nonce"
        $loginPayload = @{ login = @{ username = $Username; password = $encPwd; encrypt_type = '3' } }
        Write-Log "    密码方式: MD5(密码:nonce)  [encrypt_type=3]"
    } else {
        $encPwd = Get-TPLinkXorPwd $pwd
        $loginPayload = @{ login = @{ username = $Username; password = $encPwd } }
        Write-Log "    密码方式: TP-Link XOR 字典加密  [-3]"
    }
    $loginBody = New-SuJsonBody $loginPayload

    # 5.3 登录
    Write-Log "[2/3] 登录 $Username@$Router ..."
    $r2 = Invoke-WebRequest -Uri "$base/" -Method Post -Body $loginBody -Headers $headers -UseBasicParsing -TimeoutSec 10
    $login = $r2.Content | ConvertFrom-Json
    if ($login.error_code -ne 0) {
        throw "登录失败: error_code=$($login.error_code) （可能是密码错误或账号被锁定） body=$($r2.Content)"
    }
    $stok = $login.stok
    if (-not $stok) { throw "登录响应中没有 stok: $($r2.Content)" }
    Write-Log "    登录成功, stok=$stok"

    # 5.4 重启（仅显式授权时）
    if ($RebootNow) {
        Write-Log "[3/3] 发送重启指令 ..."
        $rebootBody = '{"method":"do","system":{"reboot":null}}'
        $r3 = Invoke-WebRequest -Uri "$base/stok=$stok/ds" -Method Post -Body $rebootBody -Headers $headers -UseBasicParsing -TimeoutSec 10
        $reboot = $r3.Content | ConvertFrom-Json
        if ($reboot.error_code -ne 0) {
            throw "重启指令返回异常: error_code=$($reboot.error_code) body=$($r3.Content)"
        }
        Write-Log "    重启指令已发送，路由器正在重启（约 1-2 分钟恢复）"
        Write-Host "RESULT=REBOOT_OK"
        exit 0
    } else {
        Write-Log "[3/3] 未指定 -RebootNow，仅验证登录，不执行重启。"
        Write-Host "RESULT=LOGIN_OK"
        Write-Host "DRY_RUN=TRUE (如需重启请加 -RebootNow)"
        exit 0
    }
}
catch {
    Write-Host "RESULT=ERROR"
    Write-Host "错误: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
