---
external: false
draft: false
title: "Ứng dụng AI trong công việc - Cách dùng Codex và Github cực dễ"
date: "2026-08-23"
author: "Javier"
slug: "ung-dung-ai-trong-cong-viec-cach-dung-codex-va-github-cuc-de"
status: "Published"
categories:
  - name: "jamstack"
    color: "yellow"
readingTime: "6 min read"
---

Bạn không biết code nhưng muốn tự làm một website đơn giản để phục vụ công việc?


Trong video này, mình sẽ hướng dẫn bạn đi từ một folder trống đến một website hoàn chỉnh, sau đó đưa website lên GitHub và publish để có thể truy cập trực tiếp trên Internet.


Bạn không cần bắt đầu bằng việc học cả một framework hay hiểu hết code. Mục tiêu đầu tiên chỉ đơn giản là: **tạo được một website và hiểu được workflow cơ bản khi làm việc với Codex.**


## 1. Chuẩn bị môi trường


Trước khi bắt đầu, chúng ta cần chuẩn bị một vài tài khoản và công cụ. Mình đã gom toàn bộ link cần thiết bên dưới để bạn không phải tự tìm từng thứ.


### Tài khoản

- **ChatGPT:** [https://chatgpt.com/](https://chatgpt.com/)
- **GitHub:** [https://github.com/](https://github.com/)

### Phần mềm

- **Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **GitHub CLI:** [https://cli.github.com/](https://cli.github.com/)
- **Codex:** [https://openai.com/codex/](https://openai.com/codex/)

Đối với Github cli thì cần cài thông qua Terminal. Mở giao diện Window Search tìm “PowerShell”


![image.png](/images/blog/3649e79f0ebe21f09cb7440ddde3d54e.png)


### Đăng nhập


Sau khi cài đặt xong:


```plain text
Codex → Login bằng ChatGPT
```


Đăng nhập GitHub CLI , chỉ cần theo hướng dẫn nhập code là được:


```bash
gh auth login
```


![image.png](/images/blog/a2363c4a190820c37852772c243b47f2.png)


Cuối cùng kiểm tra trạng thái:


```bash
gh auth status
```


![image.png](/images/blog/7cc541bbb568ed7d4e72205ff48ab7cd.png)


Nếu mọi thứ đã sẵn sàng, chúng ta có thể bắt đầu.


Nếu bạn mới làm quen với những công cụ này, mình khuyên bạn mở [**trang hướng dẫn từng bước**](https://chatgpt.com/g/g-p-6a1538a57688819195ffee8efb091cfe-content/c/LINK_H%C6%AF%E1%BB%9ANG_D%E1%BA%AAN) và làm lần lượt theo đó.


## 2. Hiểu nhanh Codex và GitHub


Trước khi bắt đầu build, bạn chỉ cần hiểu hai thứ.


**Codex** là công cụ giúp bạn làm việc với code bằng cách đưa yêu cầu bằng ngôn ngữ tự nhiên. Thay vì phải tự viết từng dòng code, bạn có thể mô tả thứ mình muốn xây dựng và Codex sẽ làm việc với các file trong project để thực hiện yêu cầu đó.


**GitHub** là nơi chúng ta lưu trữ project. Code sẽ nằm trên máy tính của bạn trong quá trình làm việc, sau đó chúng ta có thể push project lên GitHub để lưu trữ và sử dụng cho những bước tiếp theo.


Bạn chưa cần học sâu về Git hay GitHub ở đây. Chỉ cần nhớ:

- **Codex:** giúp bạn xây dựng và chỉnh sửa project.
- **GitHub:** lưu trữ project của bạn.

## 3. Tạo website đầu tiên


Bây giờ hãy tạo một folder mới trên Desktop, ví dụ:


```plain text
codex-folder
```


Folder này sẽ chứa toàn bộ file code của website.


Sau đó mở folder bằng Codex.


Việc này khá quan trọng vì Codex cần một project để làm việc. Bạn có thể hình dung folder này giống như một chiếc hộp chứa toàn bộ những thứ tạo nên website của mình.


Khi project đã được mở, chúng ta thử một yêu cầu rất đơn giản.


Copy prompt dưới đây và đưa cho Codex:


```plain text
Create a simple Hello World website.
```


Codex sẽ tạo các file cần thiết cho website.


Sau khi hoàn thành, hãy mở website trên trình duyệt để kiểm tra kết quả.


Nếu bạn nhìn thấy trang Hello World, vậy là bạn vừa hoàn thành website đầu tiên của mình.


Điều quan trọng ở bước này không phải là website đẹp hay phức tạp. Mục đích chỉ là giúp bạn hiểu workflow:


**Tạo folder → mở bằng Codex → đưa prompt → Codex tạo code → mở website để kiểm tra.**


## 4. Đưa project lên GitHub


Sau khi website chạy được trên máy, chúng ta có thể đưa project lên GitHub.


Nếu GitHub CLI đã được đăng nhập và kết nối với Git, bạn có thể để Codex hỗ trợ thực hiện những thao tác cần thiết.


Mục tiêu ở bước này là tạo một repository cho project và push code lên đó.


Sau khi hoàn thành, mở GitHub và kiểm tra repository của bạn.


Bạn sẽ thấy những file mà Codex vừa tạo đang được lưu trên GitHub.


Đến đây, workflow cơ bản đã hình thành:


**Folder → Codex → Website → GitHub**


![image.png](/images/blog/dc4670ba3c6a07a41bf1414dc629a26b.png)


## 5. Bắt đầu xây dựng website thật


Ok, giờ mới bắt đầu thú vị.


Thay vì chỉ tạo một trang Hello World, chúng ta sẽ dùng Codex để tạo một landing page hoàn chỉnh.


Mình đã chuẩn bị sẵn một prompt để bạn không phải tự nghĩ prompt từ đầu.


```javascript
Hãy giúp tôi tạo một html/css/js landingpage cho 1 trung tâm tiếng anh đẹp , design bay bổng on scroll bằng gsap
```


Chỉ cần copy prompt, mở lại project bằng Codex và paste vào.


Prompt sẽ mô tả những gì chúng ta muốn website có, sau đó Codex sẽ dựa vào yêu cầu đó để xây dựng giao diện và các file cần thiết.


Ở bước này, bạn không cần cố đọc và hiểu từng dòng code mà Codex tạo ra.


Hãy tập trung vào kết quả:

- Giao diện có đúng với yêu cầu không?
- Các section có đầy đủ không?
- Website có chạy bình thường không?

Nếu có phần nào chưa đúng, bạn có thể tiếp tục nói cho Codex biết mình muốn sửa gì.


Đây cũng chính là một workflow quan trọng khi làm việc với AI coding tools:


**Yêu cầu → Generate → Kiểm tra → Feedback → Sửa → Kiểm tra lại.**


![image.png](/images/blog/998bbb524942bde5e40a7f5e6fc3dcb7.png)


## 6. Push website lên GitHub


Sau khi landing page đã hoàn thành, chúng ta tiếp tục đưa project lên GitHub.


Bạn có thể yêu cầu Codex hỗ trợ:


```plain text
Push this project to GitHub.
```


Codex sẽ thực hiện các thao tác cần thiết dựa trên project hiện tại. nếu các bạn follow đúng như cách của mình để chuẩn bị kết nối tốt cho Github CLI


Sau đó mở repository trên GitHub và kiểm tra xem code đã được push thành công hay chưa.


![image.png](/images/blog/3e56ef784ee54ef4e6bd8c1dd0eedb62.png)


## 7. Publish website với GitHub Pages


Có code trên GitHub vẫn chưa có nghĩa là mọi người đã có thể truy cập website của bạn.


Bước cuối cùng là publish website bằng GitHub Pages.


Trong repository của bạn, vào:


**Settings → Pages**


Sau đó chọn source phù hợp và bật GitHub Pages theo hướng dẫn trong video.


Khi deployment hoàn thành, GitHub sẽ cung cấp cho bạn một đường link để truy cập website.


Mở đường link đó trên trình duyệt.


Nếu website xuất hiện, vậy là xong.


🎉 **Bạn vừa đi từ một folder trống đến một website được publish online bằng Codex.**


![image.png](/images/blog/0d5ce67b16cc601d6efd6c23cab68439.png)


## Kết Luận


Hi vọng video này sẽ có ích cho những ai muốn ứng dụng Codex để tự tạo một website phục vụ công việc. Từ những kiến thức cơ bản này, bạn có thể tiếp tục làm rất nhiều thứ khác trong công việc hằng ngày của bản thân 👍

