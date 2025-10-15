---
external: false
draft: false
title: "Cách fix lỗi SPA 404 trên vercel"
description: "Cách fix lỗi SPA 404 trên vercel . Hiểu rõ nguyên nhân và config đúng chuẩn"
date: "2025-05-28"
author: "Minh Nhật Nguyễn"
slug: "cach-fix-loi-spa-404-tren-vercel"
status: "Published"
categories:
  - name: "front-end"
    color: "blue"
  - name: "jamstack"
    color: "yellow"
  - name: "bug"
    color: "gray"
readingTime: "2 min read"
---

# Giải thích


Các ứng dụng SPA hoạt động chủ yếu nhờ javascript và chỉ cần 1 file `index.html` có chứa một thẻ `div#root`như sau để chèn component .Toàn bộ UI và routing được dựng bằng **JavaScript phía client**, thường là với **React Router** hoặc tương tự.


```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weebuns Admin Dashboard</title>
    <meta name="description" content="Weebuns Admin Dashboard">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="canonical" href="https://weebuns.blog/admin">
    <script type="module" crossorigin src="/assets/index-6909b530.js"></script>
    <link rel="stylesheet" href="/assets/index-719e1e0b.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```


Nên khi truy cập vào các đường dẫn như `/about` hay `/home` nó cần chờ 


`index.html` được load xong và javascript của Router dom xử lý, tiếp đến mới có thể routing được



Có sự khác biệt khi ta deploy lên server 


Khi bạn **reload** tại một route như `/about` , trình duyệt sẽ gửi một HTTP request **`GET /about`** tới server.


Tuy nhiên, trên Vercel (hoặc bất kỳ static host nào), server sẽ tìm một file vật lý tại


```plain text
/about/index.html
```


(hoặc)


```plain text
/about
```


Nếu không tìm thấy sẽ trả về lỗi `404 NOT FOUND`


# Cách giải quyết


Ta cần đảm bảo được server gửi về `index.html` dù có gọi đến route nào đi nữa thông qua cấu hình `vercel.json` ở cấu hình gốc thư mục project như sau 


```javascript
{
  "rewrites":  [
    {"source": "/(.*)", "destination": "/"}
  ]
}
```


Nghĩa là: bất kỳ request nào đến (dù là `/about`, v.v...)


đều sẽ được **redirect nội bộ (rewrite)** về `/`, tức là file `index.html`Sau đó, **React Router** sẽ xử lý tiếp phần routing phía client.


![image.png](/images/blog/a316086bc21a30f14547bec77c1bb6c6.png)

