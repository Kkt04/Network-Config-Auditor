# 🚀 Network Security Auditor — Backend

A backend service that dynamically scans WiFi networks, detects router types, fetches configurations, and analyzes them for security vulnerabilities.  
Supports **OpenWRT**, **Cisco**, **MikroTik**, and generic routers.

---

## 📌 Overview

The **Network Security Auditor** backend performs:

- WiFi network scanning  
- Router detection  
- Configuration extraction (SSH, HTTP, LuCI API)  
- Security vulnerability analysis  
- Security scoring and recommendations

The system automatically adapts to routers based on available protocols (HTTP, HTTPS, SSH, Telnet).

---

## 🏗️ Architecture

### Main Server (`server.js`)

- Express.js REST API (Port **3000**)
- CORS enabled
- Organized into three route groups:
  - `/api/scan` – Network scanning
  - `/api/network` – WiFi + router analysis
  - `/api/analyze` – Config-file analysis

---

## 📁 Backend Folder Structure
backend/
├── server.js                    # Main Express server
├── src/
│   ├── routes/
│   │   ├── network.js          # WiFi scanning & router analysis routes
│   │   ├── scan.js             # Network scanning routes
│   │   └── analyze.js          # Config file analysis routes
│   ├── services/
│   │   ├── wifiScanner.js      # WiFi network detection
│   │   ├── routerDetector.js   # Router detection & config fetching
│   │   ├── analyzer.js         # Router security analysis engine
│   │   └── sshClient.js        # SSH client module
│   └── utils/
│       └── helpers.js          # Utility functions


---

## 🔑 Key Features

### 1️⃣ Dynamic WiFi Network Detection
**File:** `src/services/wifiScanner.js`  
Supports:

- macOS (Airport CLI scanning)
- node-wifi for cross-platform scanning
- Detects:
  - SSID
  - Signal strength (RSSI)
  - Security type (WPA2, WPA3, etc.)
  - Channel
  - Currently connected network

---

### 2️⃣ Router Detection & Config Fetching
**File:** `src/services/routerDetector.js`  

Capabilities:

- Detect router gateway using `default-gateway`
- Ping router to verify connection
- Identify services:
  - SSH (22)
  - HTTP (80)
  - HTTPS (443)
  - Telnet (23)
- Detect router type:
  - OpenWRT
  - Cisco
  - MikroTik
  - Generic routers

---

### 3️⃣ Security Analysis Engine
**File:** `src/services/analyzer.js`  

The engine:

- Detects weak credentials  
- Flags insecure services (HTTP, Telnet)  
- Checks firewall rules  
- Analyzes ACLs  
- Computes security score (0–100)  
- Generates human-readable recommendations  

---

## 🔌 API Endpoints

### **Network Routes** – `/api/network`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/scan` | Scan for nearby WiFi networks |
| POST | `/analyze` | Detect router & analyze configuration |
| GET | `/current` | Get current WiFi connection details |
| POST | `/connect` | Connect to a WiFi network |

---

### **Config Analyzer Routes** – `/api/analyze`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Analyze uploaded config file |
| POST | `/analyze-text` | Analyze raw text configuration |

---

## 🔌 OpenWRT Support (Fully Implemented)

### ✔ 1. LuCI HTTP API (Primary Method)
**Function:** `fetchOpenWRTConfigHTTP()`

- Tries:
  - `https://router/cgi-bin/luci/...`
  - `http://router/cgi-bin/luci/...`
- Uses **Basic Auth**
- Collects configuration from endpoints:
  - `/cgi-bin/luci/admin/ubus`
  - `/cgi-bin/luci/admin/network/network`
  - `/cgi-bin/luci/admin/network/firewall`
  - `/cgi-bin/luci/admin/system/system`
- Parses JSON or HTML fallback

---

### ✔ 2. SSH-Based OpenWRT Configuration Fetch (Secondary Method)
Executes OpenWRT-specific commands:

uci show
uci show network
uci show firewall
uci show wireless
cat /etc/config/network
cat /etc/config/firewall
cat /etc/config/wireless
cat /etc/config/system
ubus call system board
ubus call network.interface dump

---

### ✔ 3. OpenWRT Detection Flow


Detect Router
↓
Try HTTP(S) LuCI API
├── Success → Return config
└── Fail → Try SSH
↓
Try UCI & UBUS commands
↓
If all fail → fallback to generic router detection

---

### ✔ 4. Authentication
Attempts:

- User-provided username/password
- Common OpenWRT users: `root`, `admin`
- Basic Auth for LuCI
- SSH password login

---

## 🔄 Complete Workflow (WiFi → Router → Analysis)


User selects WiFi
↓
Detect router IP
↓
Detect router services (SSH/HTTP/HTTPS)
↓
Try OpenWRT LuCI → Try SSH → Try other router types
↓
Extract configuration
↓
Run security analysis
↓
Return score + issues + recommendations

---

## 🛠️ Technologies Used

### Core
- **Express** – Web server  
- **Axios** – HTTP requests  
- **node-ssh** – SSH client  
- **node-wifi** – WiFi scanning  
- **default-gateway** – Detect router IP  
- **ping** – Router availability check  

### OpenWRT-Specific
- LuCI HTTP API  
- UCI (Unified Configuration Interface)  
- UBUS (system bus)  
- `/etc/config/*` file parsing  

---

## 🎯 Improvements & Optimizations

- ⏱️ **Timeout system**
  - 30s total router detection timeout
  - 5s per SSH credential attempt
  - 2s per HTTP request

- 💾 **Fallback Mode**
  - Generates a sample config if router cannot be accessed
  - Ensures response **always** returns

- 🧹 **Clean Logs**
  - Only important events logged
  - Failed SSH attempts suppressed unless necessary

- 🌐 **Multi-Router Protocol Support**
  - OpenWRT (LuCI + SSH)
  - Cisco (SSH)
  - MikroTik (API)
  - Generic HTTP routers

---

## 📊 OpenWRT Support Summary

| Feature | Status |
|---------|--------|
| LuCI HTTP API | ✅ Fully working |
| UCI Commands (SSH) | ✅ Fully working |
| UBUS System Calls | ✅ Fully working |
| Config File Parsing | ✅ Fully working |
| HTTP Basic Auth | ✅ Working |
| Multiple LuCI Endpoints | ✅ Working |

---

## 🚀 How to Use with OpenWRT

1. Ensure router is reachable (same WiFi)
2. Enable:
   - **LuCI Web Interface**
   - **SSH Access**
3. Provide admin/root credentials
4. Backend automatically:
   - Detects OpenWRT
   - Attempts LuCI → SSH → fallback

---

## 📝 Notes

- OpenWRT implementation is **production-ready**
- Works on macOS, Linux, and Windows (with scanning limitations)
- Always returns results (via fallback config mode)
- Supports multi-phase router detection for better accuracy

---

## 📄 License

This project is under MIT License.  
Feel free to modify, distribute, or contribute.


