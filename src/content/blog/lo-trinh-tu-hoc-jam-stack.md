---
external: false
draft: false
title: "Lộ trình tự học Jamstack - kiến trúc xây dựng web hiện đại"
description: "Lộ trình tự học Jamstack"
date: "2025-03-06"
author: "Minh Nhật Nguyễn"
slug: "lo-trinh-tu-hoc-jam-stack"
status: "Published"
categories:
  - name: "jamstack"
    color: "yellow"
readingTime: "12 min read"
---

Xin chào mọi người 👋 , đây là lần đầu mình viết blog nên sẽ không tránh khỏi sai sót rất mong nhận được sự góp ý từ mọi người . Mình viết series này mục đính muốn chia sẽ lại hành trình mình thử nghiệm và tự tìm hiểu về jamstack thông qua việc làm project , mong sẽ lưu lại kiến thức gì đó cho bản thân cũng như mọi người cùng hiểu về công nghệ này . 


Ok vậy thì để làm việc với một cái gì đó thì chúng ta cần hiểu định nghĩa của nó trước . Bắt đầu với câu hỏi rất dĩ nhiên như bên dưới 😅


# JAM Stack là cái gì vậy ?


Theo định nghĩa tại : [https://snipcart.com/blog/jamstack](https://snipcart.com/blog/jamstack)

> The Jamstack is an architecture where a website is delivered statically, such as serving HTML from static hosting or CDN (content delivery network), but providing dynamic content and an interactive experience through [JavaScript](https://snipcart.com/blog/javascript-beginner-intro-exercises). The term itself represents the JAM in a website: JavaScript, APIs, and Markup.

Theo định nghĩa ở trên thì jamstack là một kiến trúc sử dụng 3 thứ đã có trong tên gọi của nó là Javascript , Api và Markup để xây dựng nên website . Nó có phần phá vỡ đi định nghĩa ban đầu về SSG , cung cấp cho trang web có thể động hơn thông qua việc sử dụng javascript chạy ở client và tương tác với api để dynamic các nội dung động


Thuật ngữ này được đặt ra bởi Mathias Biilmann, người đồng sáng lập Netlify.


![image.png](/images/blog/47907f16b5bcde4d665b1798097841c7.png)


# Điểm qua sự khác biệt của nó so với kiến trúc truyền thống


Ok hãy cùng nhìn lại xem sự khác biệt của nó so với kiến trúc của nó so với kiến trúc truyền thống như nào đã nhé 


**Kiến trúc truyền thống (Monolithic Architecture):**

- Các trang web thường dựa vào **máy chủ backend** để xử lý và render nội dung động.
- Mỗi lần người dùng truy cập, trang web phải thực hiện các bước:
	- Gửi request đến server.
	- Server xử lý request, kết nối với cơ sở dữ liệu, và trả lại HTML được render.
- Điều này dẫn đến phụ thuộc nặng vào backend, tốc độ tải trang bị ảnh hưởng bởi số lượng người dùng và tài nguyên máy chủ.

**Kiến trúc Jamstack (Decoupled Architecture):**

- Jamstack tách biệt backend khỏi frontend.
- **Frontend (HTML tĩnh)** được dựng trước (pre-built) và lưu trữ trên các CDN.
- Các nội dung động được cung cấp thông qua **API** và JavaScript chạy trên trình duyệt.

### **Điểm khác biệt chính:**


| Đặc điểm              | Kiến trúc truyền thống               | Jamstack                                |
| --------------------- | ------------------------------------ | --------------------------------------- |
| **Phụ thuộc backend** | Cao                                  | Thấp hoặc không cần                     |
| **Tốc độ tải trang**  | Chậm khi server bị quá tải           | Nhanh nhờ CDN và file tĩnh              |
| **Khả năng mở rộng**  | Hạn chế (dựa vào server)             | Dễ dàng (CDN có khả năng scale tự động) |
| **Bảo mật**           | Dễ bị tấn công (do nhiều điểm yếu)   | Ít điểm yếu (file tĩnh và API độc lập)  |
| **Chi phí vận hành**  | Cao (máy chủ mạnh, bảo trì phức tạp) | Thấp hơn (chỉ cần hosting CDN)          |


![image.png](/images/blog/16222dd1472efe2974a5357b90f7c5ce.png)


# Những lợi ích khi sử dụng Jamstack


Ta có thể kể đến lợi ích khi sử dụng kiến trúc này như 

1. **Giảm độ phức tạp của hệ thống:**
	- Jamstack loại bỏ sự phụ thuộc vào server-side rendering, giảm thiểu các lỗi tiềm năng trong quá trình xử lý backend.
2. **Bảo mật cao hơn:**
	- Vì không có máy chủ trực tiếp xử lý request, Jamstack giảm thiểu nguy cơ tấn công như SQL Injection hay DDoS.
	- Các API được bảo vệ riêng lẻ và có thể kiểm soát chặt chẽ.
3. **Khả năng mở rộng vượt trội:**
	- Khi lưu trữ trên CDN, các file tĩnh có thể được phân phối trên toàn cầu, giúp website chịu tải tốt hơn với lượng truy cập lớn.
4. **Hiệu suất vượt trội:**
	- Tốc độ tải trang nhanh do nội dung được phục vụ trực tiếp từ CDN mà không cần xử lý server-side.
5. **Chi phí hợp lý:**
	- Với Jamstack, chúng ta chỉ cần trả phí hosting tĩnh (như Netlify, Vercel) thay vì phải duy trì server backend , thường thì sẽ nhiều bên cung cấp miễn phí
6. Phát triển nhanh hơn
	- Việc tích hợp sẽ nhanh chóng hơn khi sử dụng các dịch vụ thường gặp như xác thực (Auth0, Firebase), quản trị nội dung (Contentful, Prismic), hệ thống bán hàng (Snipcart, Shopify), và thanh toán (Stripe, PayPal). Điều này giúp rút ngắn thời gian phát triển, giảm khối lượng công việc cần thiết và tăng khả năng tập trung vào xây dựng trải nghiệm người dùng

# Bất lợi của nó là gì ?


Tuy Jamstack có nhiều lợi ích, nhưng nó vẫn tồn tại một số nhược điểm khiến nó không thể thay thế được kiến trúc truyền thống như

1. **Không phù hợp với mọi loại dự án:**
	- Với các ứng dụng yêu cầu xử lý phức tạp, nhiều tính năng realtime (như ứng dụng ngân hàng, quản lý dữ liệu lớn), Jamstack có thể không phải là lựa chọn tối ưu.
2. **Phụ thuộc vào bên thứ ba:**
	- Hầu hết các tính năng động trong Jamstack phụ thuộc vào các API và dịch vụ bên thứ ba (như Auth0, Firebase), điều này có thể gây ra rủi ro khi các dịch vụ này gặp sự cố.
3. **Chi phí API tăng cao:**
	- Nếu ứng dụng của có lượng truy cập lớn, chi phí sử dụng các API trả phí có thể tăng đáng kể.
4. **Đòi hỏi kỹ năng phát triển frontend tốt:**
	- Cần kiến thức về JavaScript, các framework frontend (React, Vue, Svelte) và cách tối ưu trải nghiệm người dùng.

Yeah , không giải pháp nào là hoàn hảo cả nếu vậy thì


# Tiêu chí lựa chọn kiến trúc này là gì ?


Jamstack đặc biệt phù hợp cho các đặc thù website tương đối đơn giản , yêu cầu tốc độ tải nhanh và thường gặp như 

- **Thương mại điện tử:** Các website bán lẻ nhỏ hoặc trung bình, sử dụng các dịch vụ như Snipcart hoặc Shopify cho giỏ hàng và thanh toán.
- **Blog chia sẻ kiến thức hoặc SEO:** Website chia sẻ bài viết, tin tức, và tài liệu với mục tiêu tối ưu SEO để thu hút người đọc.
- **Trang SaaS và phần mềm tải xuống:** Các trang cung cấp phần mềm hoặc dịch vụ, có thể bao gồm tài liệu hướng dẫn, bản demo, hoặc tùy chọn đăng ký.
- **Website giới thiệu doanh nghiệp và dịch vụ:** Các công ty nhỏ, startup, hoặc doanh nghiệp địa phương có thể sử dụng Jamstack để giới thiệu dịch vụ, sản phẩm và cung cấp thông tin liên hệ.
- **Trang đích cho chiến dịch quảng cáo (Landing Pages):** Các trang đích được tối ưu cho chiến dịch quảng cáo, dễ dàng chỉnh sửa và triển khai nhanh chóng.

Ví dụ:

- **Tăng trưởng website thương mại điện tử:** Một cửa hàng bán quần áo trực tuyến đơn giản có thể sử dụng Jamstack để tải trang nhanh chóng và dễ dàng tích hợp với API thanh toán.
- **Blog về công nghệ:** Một blog chia sẻ các bài viết về công nghệ có thể sử dụng Jamstack để cung cấp các bài viết tĩnh, SEO-friendly và dễ dàng tối ưu hóa tốc độ.

Một số loại trang web không nên triển khai bằng kiến trúc này có thể kể đến như

- **Ứng dụng real-time:** Những trang web yêu cầu tính năng tương tác thời gian thực, như chat trực tuyến, hoặc các trang web theo dõi dữ liệu liên tục (ví dụ: các ứng dụng giao dịch chứng khoán hoặc các trò chơi trực tuyến).
- **Phần mềm quản lý đặc thù:** Những ứng dụng cần xử lý dữ liệu phức tạp và yêu cầu sự liên kết sâu với cơ sở dữ liệu lớn, ví dụ như hệ thống quản lý học viên, bệnh nhân, hoặc các công cụ ERP.
- **Trang web có logic backend phức tạp:** Các trang yêu cầu xử lý nhiều dữ liệu động hoặc tích hợp phức tạp với các dịch vụ backend

Ví dụ:

- **Ứng dụng giao dịch chứng khoán:** Các trang web giao dịch chứng khoán yêu cầu xử lý giao dịch trực tiếp, đồng bộ dữ liệu tức thì từ thị trường và cập nhật liên tục trạng thái của các tài sản và giao dịch. Jamstack, với cấu trúc tĩnh, không thể đáp ứng yêu cầu này, vì không có khả năng xử lý logic phức tạp hoặc các tác vụ dữ liệu động liên tục. Việc sử dụng các API hoặc hệ thống backend phức tạp là cần thiết trong trường hợp này.
- **Hệ thống ERP (Enterprise Resource Planning):** Các công ty cần một hệ thống quản lý tài chính, nhân sự và sản xuất có nhiều logic backend sẽ gặp khó khăn khi triển khai trên Jamstack. Những hệ thống này yêu cầu khả năng tương tác liên tục với backend để cập nhật và đồng bộ dữ liệu giữa các phòng ban và tránh xung đột trong thông tin

Ok vậy nghĩa là kiến trúc này theo quan điểm của mình vẫn có lợi thế nhất định và phù hợp với những dạng website đơn giản , đây có thể là lựa chọn dành cho usecase mọi người cần xây dựng website nhanh chóng và thường gặp như landing page , hay website bán hàng đơn giản thay vì phải xây dựng lại Backend từ đầu


# Làm sao để bắt đầu ?


Để bắt đầu xây dựng một dự án với kiến trúc Jamstack, chúng ta sẽ đi qua những thành phần cốt lõi của nó 


### 1. **Chọn công cụ dựng trang tĩnh (Static Site Generator - SSG):**


Đây là công cụ giúp tạo ra các trang web tĩnh, được tối ưu để hoạt động nhanh và hiệu quả. Một số SSG phổ biến hiện nay bao gồm 👉

- **Astro**: Linh hoạt và tối ưu hiệu suất cho việc tạo trang web tĩnh.
- **Next.js**: Một metaframework của ReactJS hỗ trợ SSR và SSG, phát triển bởi Vercel mà chắc mọi người đều biết.
- **SvelteKit**: Framework dựa trên Svelte, hỗ trợ cả SSR và SSG.
- **Nuxt**: Framework cho Vue.js, hỗ trợ cả SSG và SSR.

Ngoài ra còn những cái tên khác như Hugo, Remix, Gatsby, 11ty, RedwoodJS, BlitzJS ... Nói sao ta frontend bây giờ nhiều biến thể quá, mình cũng không dùng hết được 🤣.


Mọi người có thể xem thêm tại đây: [Jamstack Generators](https://jamstack.org/generators/) 📚.


### 2. **Sử dụng API (Application Programming Interface):**


Một trong những đặc điểm của Jamstack là việc sử dụng các API bên ngoài để xử lý các tác vụ động. Dưới đây là một số dịch vụ phổ biến mà mọi người có thể tích hợp vào dự án của mình:

- **Headless CMS**: Các hệ thống quản lý nội dung headless frontend, theo tìm hiểu của mình cũng có rất nhiều nhưng nổi bật có thể kể đến ví dụ như:
	- **Prismic**, **Contentful**, **Sanity**: Headless CMS Saas nhưng họ cũng có những gói miễn phí đủ để trải nghiệm dịch vụ của họ.
	- **Directus**, **PayloadCMS**, **Ghost**, **Strapi**: Cũng là Headless CMS nhưng opensource dành cho ai muốn lựa chọn self-host.
	- **WordPress + GraphQL**: Vẫn là opensource quốc dân nhưng có thể hỗ trợ headless với GraphQL hoặc Restful.

	Mọi người có thể xem thêm tại đây: [Jamstack Headless CMS](https://jamstack.org/headless-cms/) 🔍.

- **Authentication**: Các dịch vụ giúp xác thực người dùng, ví dụ:
	- **Firebase Auth**, **Auth0**.
- **Thanh toán**: Các dịch vụ hỗ trợ thanh toán trực tuyến, ví dụ:
	- **Stripe**
- **Thương mại điện tử**: Các nền tảng hỗ trợ xây dựng cửa hàng trực tuyến, ví dụ:
	- **Shopify**, **MedusaJS**, **VueStorefront**, **Snipcart**.
- **Tìm kiếm**: Công cụ giúp tối ưu hóa tìm kiếm trên website, ví dụ:
	- **Algolia**, **Bonsai**, **Clouds**.
- **Comment**: Các dịch vụ bình luận giúp tăng tính tương tác, ví dụ:
	- **SlickComment**, **Disqus**, **Utteranc.es**, **Isso-comments.de**.

### 3. **Tích hợp JavaScript để thêm chức năng động:**


Mọi người có thể sử dụng JavaScript thuần hoặc các UI Framework như **ReactJS**, **VueJS** để xây dựng các tính năng động và tương tác với các API.


Ví dụ: sử dụng API của **Sanity** để hiển thị danh sách các bài blog mới nhất, hoặc tạo các chức năng động khác như tìm kiếm, đăng nhập, v.v.


### 4. **Chọn dịch vụ lưu trữ:**


Một số dịch vụ hosting static website nổi tiếng mà mình biết như:

- **Netlify**: Cung cấp tính năng CI/CD, hỗ trợ form submission, serverless functions và hosting miễn phí.
- **Vercel**: Tối ưu cho các ứng dụng Next.js, cung cấp khả năng triển khai nhanh chóng.
- **Cloudflare Pages**: Cung cấp dịch vụ CDN mạnh mẽ và miễn phí, tối ưu hóa tốc độ tải trang và bảo mật.

Kết bài : Phần này mình chỉ liệt kê những khái niệm mà mình tìm hiểu được về nó thôi . Công nhận là viết blog với tâm lí sợ sai nên cũng khá kĩ hehe , nếu có sai sót gì mong được mọi người góp ý bên dưới nhen


[embed](https://minhnhtnguynjavier.substack.com/embed)


# Tham khảo 

- [https://snipcart.com/blog/jamstack](https://snipcart.com/blog/jamstack)
- [https://jamstackvietnam.com/blog/jamstack-universe/khi-nao-nen-su-dung-jamstack-va-khi-nao-thi-khong](https://jamstackvietnam.com/blog/jamstack-universe/khi-nao-nen-su-dung-jamstack-va-khi-nao-thi-khong)
- [https://jamstack.org/](https://jamstack.org/)
