# Python 参考实现（独立翻译自 su.js，用于与 PS 实现交叉验证）
import hashlib

DIC = ("yLwVl0zKqws7LgKPRQ84Mdt708T1qQ3Ha7xv3H7NyU84p21BriUWBU43odz3iP4rBL3cD02KZciX"
       "TysVXiV8ngg6vL48rPJyAUw0HurW20xqxv9aYb4M9wK1Ae0wlro510qXeU07kV57fQMc8L6aLgML"
       "wygtc0F10a0Dg70TOoouyFhdysuRMO51yY5ZlOZZLEal1h0t9YQW0Ko7oBwmCAHoic4HYbUyVeU3"
       "sfQ1xtXcPcf1aT303wAQhv66qzW")
STRDE = "RDpbLfCPsJZ7fiv"

def tplink_encode(pwd: str) -> str:
    out = []
    n = max(len(pwd), len(STRDE))
    for i in range(n):
        cl = cr = 0xBB
        if i >= len(pwd):
            cr = ord(STRDE[i])
        elif i >= len(STRDE):
            cl = ord(pwd[i])
        else:
            cl = ord(pwd[i])
            cr = ord(STRDE[i])
        out.append(DIC[(cl ^ cr) % len(DIC)])
    return ''.join(out)

def md5hex(s: str) -> str:
    return hashlib.md5(s.encode('utf-8')).hexdigest()

if __name__ == '__main__':
    for p in ['admin', 'password123', 'a', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 'tplink@2026', '中文测试']:
        print(f'XOR[{p}]={tplink_encode(p)}')
    print('MD5[admin:39ku4U0r]=' + md5hex('admin:39ku4U0r'))
