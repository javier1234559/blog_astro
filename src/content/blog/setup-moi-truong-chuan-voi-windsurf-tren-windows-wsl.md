---
external: false
draft: false
title: "Setup môi trường chuẩn với Windsurf trên Windows + WSL"
description: "Setup môi trường chuẩn với Windsurf trên Windows + WSL"
date: "2025-09-07"
author: "Minh Nhật Nguyễn"
slug: "setup-moi-truong-chuan-voi-windsurf-tren-windows-wsl"
status: "Published"
categories:
  - name: "linux"
    color: "default"
readingTime: "2 min read"
---

Khi làm việc trong **WSL (Windows Subsystem for Linux)**, nhiều dev đã quen gõ `code .` để mở Visual Studio Code. Nhưng nếu bạn dùng **Windsurf** thay cho VS Code, thì mặc định lệnh `code .` sẽ không chạy.


Trong bài này mình sẽ hướng dẫn chi tiết cách cấu hình WSL để dùng `code .` hoặc alias `wf .` mở thư mục hiện tại trong **Windsurf trên Windows**.


## 1. Kiểm tra Windsurf đã cài trên Windows


Trước hết cần chắc chắn Windsurf đã cài sẵn trong Windows. Theo mặc định (nếu cài bằng [Chocolatey](https://chocolatey.org/)):


```shell
C:\Users\<username>\AppData\Local\Programs\Windsurf\Windsurf.exe
```


Có thể kiểm tra bằng lệnh 


```shell
Get-ChildItem "C:\Users\<username>\AppData\Local\Programs\Windsurf\" -Recurse -Filter "Windsurf.exe"
```



Trong WSL, đường dẫn này sẽ là:


```shell
/mnt/c/Users/<username>/AppData/Local/Programs/Windsurf/Windsurf.exe
```


👉 Đây chính là binary mà ta sẽ gọi từ WSL.


---


## 2. Tạo thư mục chứa script


Trong WSL, tạo `~/bin` để chứa script cá nhân (nếu chưa có):


```bash
mkdir -p ~/bin
```


## 3. Viết script launcher cho Windsurf


Tạo file `code` trong `~/bin`:


```bash
nano ~/bin/code
```


Dán nội dung sau:


```bash
#!/bin/bash
# Convert Linux path -> Windows path
CURRENT_PATH=$(wslpath -w "$(pwd)")

# Call Windsurf.exe from Windows
# Suppress logs and run in background
/mnt/c/Users/<username>/AppData/Local/Programs/Windsurf/Windsurf.exe "$CURRENT_PATH" >/dev/null 2>&1 &
```


👉 Giải thích nhanh:

- `wslpath -w "$(pwd)"` chuyển path Linux hiện tại sang path Windows.
- `>/dev/null 2>&1 &` giúp ẩn log và chạy ở background, không chiếm terminal.

Lưu file (Ctrl+O, Enter, Ctrl+X).


Cấp quyền chạy:


```bash
chmod +x ~/bin/code
```


---


## 4. Add `~/bin` vào PATH


Đảm bảo `~/bin` nằm trong PATH để gọi được `code` từ bất kỳ đâu.


Mở `~/.bashrc` hoặc `~/.zshrc`:


```bash
nano ~/.bashrc
```


Thêm dòng cuối:


```bash
export PATH=$HOME/bin:$PATH
```


Rồi reload:


```bash
source ~/.bashrc
```


---


## 5. (Tuỳ chọn) Thêm alias `wf`


Nếu bạn thích có lệnh ngắn hơn, thêm alias:


```bash
echo 'alias wf="code"' >> ~/.bashrc
source ~/.bashrc
```


---


## 6. Test


Trong WSL:


```bash
cd ~/projects/hobby/lyrics-terminal
code .
```


hoặc:


```bash
wf .
```


👉 Windsurf trên Windows sẽ mở đúng project bạn đang đứng trong WSL.

