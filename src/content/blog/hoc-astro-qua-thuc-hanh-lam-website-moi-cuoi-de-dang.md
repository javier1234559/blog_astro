---
external: false
draft: false
title: "Học Astro Qua Thực Hành: Làm Website Mời Cười Dễ Dàng"
description: "Học Astro Qua Thực Hành: Làm Website Mời Cười Dễ Dàng"
date: "2025-03-06"
author: "Minh Nhật Nguyễn"
slug: "hoc-astro-qua-thuc-hanh-lam-website-moi-cuoi-de-dang"
status: "Published"
categories:
  - name: "jamstack"
    color: "yellow"
  - name: "front-end"
    color: "blue"
readingTime: "15 min read"
---

Hi mọi người , blog này mình sẽ tiếp tục series tìm hiểu JAM stack của mình . Chắc hẳn trong daily research của mọi người cũng có nghe nhiều người nhắc đến framework Astro và nó được lựa chọn để xây dựng các blog cá nhân. Vậy thì framework này có gì đặc biệt , ta sẽ cùng tìm hiểu trong bài viết này nhé


# **Astro là gì?**


Ngó thử vào định nghĩa trong trang docs chính thức của họ [https://docs.astro.build](https://docs.astro.build/en/concepts/why-astro/)  ta có thể thấy được định nghĩa như thế này

> **Astro** is the web framework for building **content-driven websites** like blogs, marketing, and e-commerce. Astro is best-known for pioneering a new [frontend architecture](https://docs.astro.build/en/concepts/islands/) to reduce JavaScript overhead and complexity compared to other frameworks. If you need a website that loads fast and has great SEO, then Astro is for you.

Tóm lại đây là là một web framework hạn chế javascript nhất có thể và phù hợp cho các web dạng content bằng việc mặc định build thành các file tĩnh


### Các tính năng nổi bật của Astro có thể kể đến như

- **Biên dịch tĩnh (Static Site Generation)**: Tạo các trang HTML tĩnh ở build-time, giúp cải thiện hiệu suất và tăng khả năng phân phối.
- **Hỗ trợ Server Rendering (SSR)**: Khi cần, bạn có thể sử dụng render động để phục vụ các nội dung tùy chỉnh.
- **Template directives**: Các directive mạnh mẽ như `client:load`, `server:defer`, và `class:list` giúp quản lý hành vi component dễ dàng hơn. (Phần này quan trọng)
- **Tích hợp CSS & JavaScript hiện đại**: Hỗ trợ nạp động (lazy-loading), chuyển đổi CSS (CSS transitions), và quản lý kiểu dáng trực tiếp trong component.
- **Hệ sinh thái mạnh mẽ**: Cộng đồng phát triển sôi động với nhiều plugin, tích hợp dễ dàng với các công cụ phổ biến như Tailwind CSS, Markdown, và các CMS.

Astro phù hợp với các dự án như:

- Blog cá nhân hoặc công ty.
- Trang marketing tập trung vào tốc độ tải và SEO.
- Website thương mại điện tử với nội dung tĩnh và sản phẩm.
- Portfolio hoặc landing page yêu cầu giao diện tối ưu và hiệu suất cao.

Ok tiếp theo chúng ta sẽ  cùng đi qua các khái niệm cơ bản của Astro 


# Astro component


Đây là đơn vị xây dựng cơ bản của một ứng dụng Astro.js

- Mỗi file `.astro` có thể là một trang hoặc một phần giao diện.
- Hỗ trợ viết HTML, CSS, và JavaScript/TypeScript trong cùng một file.
- Tích hợp trực tiếp với React, Vue, Svelte, và các framework UI khác.
- Biên dịch thành HTML tĩnh, cải thiện tốc độ và SEO.

Cấu trúc 1 Astro component gồm 2 phần chính:

- **Component Script (Frontmatter)**: Được đặt trong dấu `--` ở đầu file, để xử lý logic, khai báo biến, hoặc import dữ liệu.
- **Component Template**: Phần dưới, chứa HTML + JavaScript expressions để tạo nội dung động.

**Ví dụ Cấu Trúc:**


```plain text
---
// Component Script
import data from '../data/example.json';
const { title } = Astro.props;
---
<!-- Component Template -->
<h1>{title}</h1>
<p>Dynamic content from {data.name}</p>
```


### **Component Script**


Astro sử dụng code fence (`---`) để xác định phần script của component, tương tự như frontmatter trong Markdown. Phần script này cho phép ta:

- Import các component khác trong Astro.
- Import các component từ framework khác, như React.
- Tải dữ liệu, như file JSON.
- Lấy dữ liệu từ API hoặc cơ sở dữ liệu.
- Tạo biến để sử dụng trong template.

Có thể hiểu đơn giản phần này ta có thể viết các mã js tiền xử lý trước khi truyền xuống template để build thành file tĩnh


Ví dụ 


```shell
---
import SomeAstroComponent from '../components/SomeAstroComponent.astro';
import SomeReactComponent from '../components/SomeReactComponent.jsx';
import someData from '../data/pokemon.json';

// Sau đó ta có thể dùng như này `<X title="Hello, World" />` 
const { title } = Astro.props;

const data = await fetch('SOME_SECRET_API_URL/users').then(r => r.json());
---
<!-- Your template here! -->
```


### Components Template


Phần template nằm dưới code fence (`---`) và quyết định HTML mà component của ta sẽ xuất ra.

- Nếu ta viết HTML thuần, component sẽ hiển thị HTML đó khi được sử dụng trong các trang Astro.
- Template hỗ trợ các biểu thức JavaScript, thẻ `<style>` và `<script>` của Astro, các component import sẵn, và các directive đặc biệt của Astro.
- Dữ liệu và giá trị được định nghĩa trong script có thể được sử dụng để tạo HTML động.

Ví dụ:


```shell
---
import Banner from '../components/Banner.astro';
import Avatar from '../components/Avatar.astro';
import ReactPokemonComponent from '../components/ReactPokemonComponent.jsx';
const myFavoritePokemon = [/* ... */];
const { title } = Astro.props;
---

<!-- 1. Dùng component khác -->
<Banner />
<h1>Hello world!</h1>

<!-- 2. Sử dụng props và các biến khác từ phần script của component: -->
<p>{title}</p>

<!-- 3. Trì hoãn việc render component và cung cấp nội dung tải dự phòng: -->
<Avatar server:defer>
  <svg slot="fallback" class="generic-avatar" transition:name="avatar">...</svg>
</Avatar>

<!-- 4. Bao gồm các component từ framework UI khác với directive `client:` để hydrate: -->
<ReactPokemonComponent client:visible />
<ReactPokemonComponent client:load />
<ReactPokemonComponent client:only />
<ReactPokemonComponent client:only="react" />

<!-- 5. Kết hợp HTML với các biểu thức JavaScript, tương tự như JSX: -->
<ul>
  {myFavoritePokemon.map((data) => <li>{data.name}</li>)}
</ul>

<!-- 6. Sử dụng template directive để xây dựng class names từ nhiều chuỗi hoặc thậm chí là các object! -->
<p class:list={["add", "dynamic", {classNames: true}]} />
```


Có thể trong template ở trên bạn sẽ gặp vài syntax khó hiểu , đúng vậy chúng được gọi là **`Template directives`** 


Template directives là các thuộc tính đặc biệt trong HTML, có thể sử dụng trong file `.astro` và một số file `.mdx`. Chúng được dùng để điều khiển hành vi của các phần tử hoặc component.

- **Mục đích**:
	- Giúp ta tận dụng được các tính năng biên dịch tiện lợi (ví dụ: `class:list` thay vì `class`).
	- Ra lệnh cho Astro compiler thực hiện các tác vụ đặc biệt (như hydrate với `client:load`).
- **Quy tắc**:
	1. Phải có dấu hai chấm `:` trong tên (ví dụ: `client:load`).
	2. Phải hiển thị rõ với trình biên dịch (không ẩn trong thuộc tính khác như `{...attr}`).
	3. Một số directive có thể nhận giá trị tùy chỉnh (như mảng hoặc đối tượng).

### **Các Directive Thường Gặp trong Astro**


Astro directives là các thuộc tính đặc biệt được sử dụng trên các thẻ HTML hoặc component để điều khiển cách chúng hoạt động trong trình duyệt hoặc trên server. Dưới đây là một số directive phổ biến:

1. **`client:load`**
	- Kích hoạt hydration ngay sau khi trang tải xong.
	- Dùng để thêm JavaScript tương tác vào các component trên client.

	```plain text
	<MyComponent client:load />
	```

2. **`client:visible`**
	- Chỉ hydrate component khi nó xuất hiện trong khung nhìn của người dùng (lazy load).
	- Giúp tối ưu hiệu năng bằng cách trì hoãn tải các component không cần thiết.

	```plain text
	<MyComponent client:visible />
	```

3. **`client:idle`**
	- Kích hoạt hydration khi trình duyệt ở trạng thái "nhàn rỗi" (idle).
	- Thích hợp cho các component ít quan trọng và không cần tải ngay lập tức.

	```plain text
	<MyComponent client:idle={{timeout: 500}} />
	```

4. **`client:only`**
	- Chỉ tải và hydrate một component từ framework UI cụ thể như React, Vue, hoặc Svelte.
	- Thường dùng khi ta muốn component chỉ được render bởi framework UI.

	```plain text
	<ReactComponent client:only="react" />
	```

5. **`server:defer`**
	- Trì hoãn việc render một component đến khi dữ liệu hoặc nội dung sẵn sàng, không làm chậm quá trình tải trang.
	- Có thể cung cấp nội dung fallback trong thời gian chờ. Thường sẽ dùng cho hiển thị avatar

	```plain text
	<MyComponent server:defer>
	  <p slot="fallback">Đang tải...</p>
	</MyComponent>
	```

6. **`set:html`**
	- Dùng để chèn nội dung HTML trực tiếp từ một chuỗi.
	- Chú ý: Không nên sử dụng với nội dung không tin cậy để tránh lỗi bảo mật XSS.

	```plain text
	<div set:html={rawHtmlContent}></div>
	```

7. **`class:list`**
	- Tạo danh sách các class CSS một cách động từ chuỗi, mảng hoặc đối tượng.
	- Hữu ích khi ta cần thêm hoặc loại bỏ class dựa trên trạng thái.

	```plain text
	<div class:list={["class1", { active: isActive }]}></div>
	```


> 💡 Chi tiết tại : [https://docs.astro.build/en/basics/astro-components/](https://docs.astro.build/en/basics/astro-components/)


# Pages


Tiếp theo, chúng ta sẽ tìm hiểu cách tạo các endpoint cơ bản trong Astro. Hệ thống routing của Astro sử dụng cấu trúc file tương tự như Next.js (đặc biệt giống với Next.js phiên bản 12). Mỗi endpoint được định nghĩa thông qua một file nằm trong thư mục `/pages`.


Astro mặc định hỗ trợ các định dạng file sau:

- [`.astro`](https://docs.astro.build/en/basics/astro-pages/#astro-pages): Sử dụng cú pháp đặc trưng của Astro.
- [`.md`](https://docs.astro.build/en/basics/astro-pages/#markdownmdx-pages): Tạo nội dung bằng Markdown.
- `.mdx`: Hỗ trợ Markdown kết hợp với JSX (yêu cầu cài đặt [MDX Integration](https://docs.astro.build/en/guides/integrations-guide/mdx/#installation)).
- [`.html`](https://docs.astro.build/en/basics/astro-pages/#html-pages): Tạo các trang sử dụng HTML thuần.
- `.js`/`.ts`: Được sử dụng như các [endpoint](https://docs.astro.build/en/guides/endpoints/) để xử lý logic phía server.

Ngoài ra, bạn có thể nhập nội dung Markdown vào các trang như cách thông thường để tận dụng sự đơn giản và hiệu quả của định dạng này.



Ví dụ


```shell
│   └── pages
│       ├── html.html
│       ├── index.astro
│       ├── javascript.js
│       ├── jsx-mardown.mdx
│       ├── markdown.md
│       └── typescript.ts
```


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a6db9e62-19fc-439b-bd8b-1e09a1fdac77/a3c44666-8b75-4bc3-bca5-fb51cd402ca9/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLTEQAVO%2F20250306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250306T104953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFS%2Bualyg49pu9pJa2rZm46I0LuB47Ve%2FE7hJEeWppL2AiBw1quqBpiBVLoFlCFcgnCNTLduTe8UFrktFg%2BKPuBs3Sr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMkcFqM5XX77td%2BQZ%2FKtwDG7o1N4vB4QlkATcTsaN0%2Bg18jxk0NA46TfY01IB67CwfJ8cRwxDoQlx3ErVO08eTuItmLGQmxAvAfR0MyLm9sezikPyEs%2BOqoV5C7UHdkY%2B38A5fdRccGZomTJoYrwg8m7UP6qqIavERWtRdk1hYHN03095j8tiQGu%2BVRPcoxxt2G50xeu4ZaHrVqnF7WvT5JH9tKLdXIUm48UUx80DhmD79UMaKR6qGsyXZP%2BC7iucb55OHVBMkLcrJxIUZ1wBPXyIgD%2BtH6ieR3lq0Zu9yLzHVAsPCVyneS%2BHT6PzX58hz8XeKFhl6C7SQkeJhvAhqFe6GxgCHVUWsNCq%2BBmcxjjp%2B2e5tg6sskzc9opJM0hX0DWkbYK1FPQqrelsRU3iAlKKkv3TZtMfrZSl%2BFxi54%2FoDT9zMjSY4t3e1Ikf7%2FvwIiitoP0HEQWQ5nF7fkf2SxYNkGvbm7UOOR80Yox7TWdKtHPr3cLKFUyy6khVCo9IxqVlj4xgmLfrkY%2F4dxe%2BgJML9tmHOIv2jjEnDFcFA2B2NkoNaqg66Gp%2BxT7JWcn%2FQi3pdstGapWiI9TKfo%2BbW1qQ1gR75NjZP5R9VWZkvF5lkhT3rjxYaa3cu4A7NgPFCNHRNxPrBEhztaDIwjfKlvgY6pgE8tHhdAKq51kC5X5LOQsG%2F7HRL%2Bh6%2Bq5Sk57hlDsBpP9dohvZ6eMFEGvz4%2FFGS6Xwzpl3d7fYjeA0Ul7iVoYyTczLJaO7kDkDT4IUL%2BBW%2BAl2FocJG%2FGWTa5EFpRCf2P7mfsu5yvT4Cd2HYnfhaKnTTqqfE2hOO8DFN7nWgz9%2FSx4kchhRkwrrYdb7w12Ri3j133vELXF2iLA%2BAGFPH6ryfligcpAp&X-Amz-Signature=19b519231e396a838eaaed5d7f0b45a99d9392b250abcb28e6d5bf7e4891e2d6&X-Amz-SignedHeaders=host&x-id=GetObject)


Thì ta sẽ được 



![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a6db9e62-19fc-439b-bd8b-1e09a1fdac77/d12204e7-8188-498c-bd23-8f93c852b16f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLTEQAVO%2F20250306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250306T104953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFS%2Bualyg49pu9pJa2rZm46I0LuB47Ve%2FE7hJEeWppL2AiBw1quqBpiBVLoFlCFcgnCNTLduTe8UFrktFg%2BKPuBs3Sr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMkcFqM5XX77td%2BQZ%2FKtwDG7o1N4vB4QlkATcTsaN0%2Bg18jxk0NA46TfY01IB67CwfJ8cRwxDoQlx3ErVO08eTuItmLGQmxAvAfR0MyLm9sezikPyEs%2BOqoV5C7UHdkY%2B38A5fdRccGZomTJoYrwg8m7UP6qqIavERWtRdk1hYHN03095j8tiQGu%2BVRPcoxxt2G50xeu4ZaHrVqnF7WvT5JH9tKLdXIUm48UUx80DhmD79UMaKR6qGsyXZP%2BC7iucb55OHVBMkLcrJxIUZ1wBPXyIgD%2BtH6ieR3lq0Zu9yLzHVAsPCVyneS%2BHT6PzX58hz8XeKFhl6C7SQkeJhvAhqFe6GxgCHVUWsNCq%2BBmcxjjp%2B2e5tg6sskzc9opJM0hX0DWkbYK1FPQqrelsRU3iAlKKkv3TZtMfrZSl%2BFxi54%2FoDT9zMjSY4t3e1Ikf7%2FvwIiitoP0HEQWQ5nF7fkf2SxYNkGvbm7UOOR80Yox7TWdKtHPr3cLKFUyy6khVCo9IxqVlj4xgmLfrkY%2F4dxe%2BgJML9tmHOIv2jjEnDFcFA2B2NkoNaqg66Gp%2BxT7JWcn%2FQi3pdstGapWiI9TKfo%2BbW1qQ1gR75NjZP5R9VWZkvF5lkhT3rjxYaa3cu4A7NgPFCNHRNxPrBEhztaDIwjfKlvgY6pgE8tHhdAKq51kC5X5LOQsG%2F7HRL%2Bh6%2Bq5Sk57hlDsBpP9dohvZ6eMFEGvz4%2FFGS6Xwzpl3d7fYjeA0Ul7iVoYyTczLJaO7kDkDT4IUL%2BBW%2BAl2FocJG%2FGWTa5EFpRCf2P7mfsu5yvT4Cd2HYnfhaKnTTqqfE2hOO8DFN7nWgz9%2FSx4kchhRkwrrYdb7w12Ri3j133vELXF2iLA%2BAGFPH6ryfligcpAp&X-Amz-Signature=e60cfa9a439bc88cfc4d38c54feadcb42510a80ea9d5cf548774cde54d5a7c9e&X-Amz-SignedHeaders=host&x-id=GetObject)


Tuy nhiên với định dạng file `ts/js` thì được dùng để chỉ định endpoint . Thường đây sẽ là nơi định nghĩa các function tương tự như các file được đặt bên trong folder `/api` bên nextjs vậy 


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a6db9e62-19fc-439b-bd8b-1e09a1fdac77/5ebb7259-25cf-4edb-ac03-ff37fff1e50b/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLTEQAVO%2F20250306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250306T104953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFS%2Bualyg49pu9pJa2rZm46I0LuB47Ve%2FE7hJEeWppL2AiBw1quqBpiBVLoFlCFcgnCNTLduTe8UFrktFg%2BKPuBs3Sr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMkcFqM5XX77td%2BQZ%2FKtwDG7o1N4vB4QlkATcTsaN0%2Bg18jxk0NA46TfY01IB67CwfJ8cRwxDoQlx3ErVO08eTuItmLGQmxAvAfR0MyLm9sezikPyEs%2BOqoV5C7UHdkY%2B38A5fdRccGZomTJoYrwg8m7UP6qqIavERWtRdk1hYHN03095j8tiQGu%2BVRPcoxxt2G50xeu4ZaHrVqnF7WvT5JH9tKLdXIUm48UUx80DhmD79UMaKR6qGsyXZP%2BC7iucb55OHVBMkLcrJxIUZ1wBPXyIgD%2BtH6ieR3lq0Zu9yLzHVAsPCVyneS%2BHT6PzX58hz8XeKFhl6C7SQkeJhvAhqFe6GxgCHVUWsNCq%2BBmcxjjp%2B2e5tg6sskzc9opJM0hX0DWkbYK1FPQqrelsRU3iAlKKkv3TZtMfrZSl%2BFxi54%2FoDT9zMjSY4t3e1Ikf7%2FvwIiitoP0HEQWQ5nF7fkf2SxYNkGvbm7UOOR80Yox7TWdKtHPr3cLKFUyy6khVCo9IxqVlj4xgmLfrkY%2F4dxe%2BgJML9tmHOIv2jjEnDFcFA2B2NkoNaqg66Gp%2BxT7JWcn%2FQi3pdstGapWiI9TKfo%2BbW1qQ1gR75NjZP5R9VWZkvF5lkhT3rjxYaa3cu4A7NgPFCNHRNxPrBEhztaDIwjfKlvgY6pgE8tHhdAKq51kC5X5LOQsG%2F7HRL%2Bh6%2Bq5Sk57hlDsBpP9dohvZ6eMFEGvz4%2FFGS6Xwzpl3d7fYjeA0Ul7iVoYyTczLJaO7kDkDT4IUL%2BBW%2BAl2FocJG%2FGWTa5EFpRCf2P7mfsu5yvT4Cd2HYnfhaKnTTqqfE2hOO8DFN7nWgz9%2FSx4kchhRkwrrYdb7w12Ri3j133vELXF2iLA%2BAGFPH6ryfligcpAp&X-Amz-Signature=8b37ac109aa1a1ddb8a63451ca35ca820b141cdf6be77d4f06c23dc97b8587ca&X-Amz-SignedHeaders=host&x-id=GetObject)


Kết quả 


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a6db9e62-19fc-439b-bd8b-1e09a1fdac77/3a8e69f6-ee44-4282-988b-7ad518c4e99c/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLTEQAVO%2F20250306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250306T104953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFS%2Bualyg49pu9pJa2rZm46I0LuB47Ve%2FE7hJEeWppL2AiBw1quqBpiBVLoFlCFcgnCNTLduTe8UFrktFg%2BKPuBs3Sr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMkcFqM5XX77td%2BQZ%2FKtwDG7o1N4vB4QlkATcTsaN0%2Bg18jxk0NA46TfY01IB67CwfJ8cRwxDoQlx3ErVO08eTuItmLGQmxAvAfR0MyLm9sezikPyEs%2BOqoV5C7UHdkY%2B38A5fdRccGZomTJoYrwg8m7UP6qqIavERWtRdk1hYHN03095j8tiQGu%2BVRPcoxxt2G50xeu4ZaHrVqnF7WvT5JH9tKLdXIUm48UUx80DhmD79UMaKR6qGsyXZP%2BC7iucb55OHVBMkLcrJxIUZ1wBPXyIgD%2BtH6ieR3lq0Zu9yLzHVAsPCVyneS%2BHT6PzX58hz8XeKFhl6C7SQkeJhvAhqFe6GxgCHVUWsNCq%2BBmcxjjp%2B2e5tg6sskzc9opJM0hX0DWkbYK1FPQqrelsRU3iAlKKkv3TZtMfrZSl%2BFxi54%2FoDT9zMjSY4t3e1Ikf7%2FvwIiitoP0HEQWQ5nF7fkf2SxYNkGvbm7UOOR80Yox7TWdKtHPr3cLKFUyy6khVCo9IxqVlj4xgmLfrkY%2F4dxe%2BgJML9tmHOIv2jjEnDFcFA2B2NkoNaqg66Gp%2BxT7JWcn%2FQi3pdstGapWiI9TKfo%2BbW1qQ1gR75NjZP5R9VWZkvF5lkhT3rjxYaa3cu4A7NgPFCNHRNxPrBEhztaDIwjfKlvgY6pgE8tHhdAKq51kC5X5LOQsG%2F7HRL%2Bh6%2Bq5Sk57hlDsBpP9dohvZ6eMFEGvz4%2FFGS6Xwzpl3d7fYjeA0Ul7iVoYyTczLJaO7kDkDT4IUL%2BBW%2BAl2FocJG%2FGWTa5EFpRCf2P7mfsu5yvT4Cd2HYnfhaKnTTqqfE2hOO8DFN7nWgz9%2FSx4kchhRkwrrYdb7w12Ri3j133vELXF2iLA%2BAGFPH6ryfligcpAp&X-Amz-Signature=a2357587ac67f1886bd1af17fd3f29b6c1e92654727373a05dd8de14d84b044a&X-Amz-SignedHeaders=host&x-id=GetObject)


> 💡 Chi tiết có thể xem tại : [https://docs.astro.build/en/basics/astro-pages/](https://docs.astro.build/en/basics/astro-pages/)


# Layouts


Đây là thành phần quan trọng hỗ trợ tái sử dụng để tạo cấu trúc giao diện chung như header, thanh điều hướng, footer.

- **Đặc điểm chính**:
	- Bao gồm các thẻ cấu thành trang hoàn chỉnh html như  (`<html>`, `<head>`, `<body>`).
	- Chúng ta có thể sử dụng `<slot />` để chèn nội dung riêng của từng trang.
	- Có thể nhận props, import các thành phần khác, và bao gồm các script phía client.
- **Yêu cầu cấu trúc**:
	- `<html>` phải là thành phần cha của tất cả các thành phần khác trong layout đầy đủ.
	- `<style>` và `<script>` phải nằm trong thẻ `<html>`. Thay vì đặt ngắn gọn bên ngoài như pages hay astro component khác
- **Vị trí đặt file**: Thường đặt trong `src/layouts`, nhưng có thể đặt ở bất kỳ đâu hoặc cùng vị trí với các trang, sử dụng tiền tố `_` để phân biệt.

Cách sử dụng `<slot/>` 
Ví dụ


```html
---
import BaseHead from '../components/BaseHead.astro';
import Footer from '../components/Footer.astro';
const { title } = Astro.props;
---
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
     <slot name="meta" />
  </head>
  <body>
    <nav>
      <a href="#">Home</a>
      <a href="#">Posts</a>
      <a href="#">Contact</a>
    </nav>
<!-- transition:animate="fade là một directive đặc biệt để tạo tạo animation chuyển trang mà mình sẽ giới thiệu sau-->
		 <main id="main" transition:animate="fade"> 
      <slot name="main" />
    </main>
    <Footer />
  </body>
  <style>
    h1 {
      font-size: 2rem;
    }
  </style>
</html>
```


```shell
---
import PageMeta from "../components/PageMeta.astro";
import PageLayout from "../layouts/PageLayout.astro";
import Intro from "../components/Intro.astro";
import siteMetadata from "@/content/sideMetaData";
import StackedImage from "@/components/StackedImage.astro";
import ImageStack from "@/components/feature/ImageStack";
import ProgressScroll from "../components/feature/ProgressScroll";

const metaData = {
  title: 'Home',
  description: siteMetadata.description
};

---

<PageLayout>
  <PageMeta slot="meta" {...metaData}/>
  <main slot="main" class="px-6 py-12 max-w-7xl mx-auto min-h-[80vh] flex items-center">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <Intro />
      <ImageStack client:only="react" />
    </div>
  </main>
</PageLayout>
```


Có 2 cách đặt layout thường gặp


**Cấu trúc tổ chức file:**
Ví dụ


```shell
src/
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── about.astro
```


Chúng ta cũng có thể đặt layout cùng vị trí với các trang bên trong thư mục `/pages`, sử dụng tiền tố `_` để ẩn file này và ngăn nó không trở thành một route theo cơ chế mặc định của astro


Ví dụ


```shell
src/pages/
├── index.astro
├── _BaseLayout.astro
```


> 💡 Chi tiết tại : [https://docs.astro.build/en/basics/layouts/](https://docs.astro.build/en/basics/layouts/)


# Build một website blog cá nhân với astro


Chúng ta sẽ bắt đầu với một template đơn giản để học luôn ha. Nhưng để hiểu rõ hơn thì bạn nên vào đây [setup manual](https://docs.astro.build/en/install-and-setup/) sẽ hiểu rõ về `astro.config.mjs` hơn



```shell
npm create astro@latest -- --template basics
```


Sau khi chạy lệnh trên xong ta tiếp tục yes để tải các packages cần thiết


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a6db9e62-19fc-439b-bd8b-1e09a1fdac77/28e0c42d-0dc6-4126-bb12-fe3d48ecb510/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655ICOWDJ%2F20250306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250306T104953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDRPskrmI57YMLU5LsPl90mgMhi3P8bxlqK%2F2IzUHOX1gIgZiEn4887Jse6%2F3J%2F%2BmMGNj4ecyXzuy%2BPcQkrTnJiMEkq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDCkR7odM7TK%2FZfz4ayrcA4y5742lg2weydhs1AQ3wMOjeId9xBNnTrCJnfPW33uLXSra85%2B7oZm%2Fd%2BigIuYzagpY37470iK7SrWSmW1tb7n85n7S6oZIQYWG%2BnfixUXrinyZlcN5NPBEBKyLKA502XNH5XMysPNyC%2BR8ZLCOkE7dvbQwTbK6abFxBEq%2Boxmm7wZm9leZVQzkLL1YQaHNw6kzDnKL45PBXyI1Ghlgy1uHsJhfItvSzaeaUY1KyxweYyqEREUougWvhE2jfNssbTgSsCHjnh9E1dU7qPRlmYlCwA8KimR9FiypjwcPKViJZuTJ%2BVM4FV%2BkQMi6g2KNzH7XiRjAM%2B49Lo0skRDSppTaiJ0ukJWYKsAd0A58nZ24nKYr7S4B3yresJQZs%2FJNiSxZXwdSeNuQyV56M7VIRRIndGYbLrYCXmymzcmmRciprlOCO14yXSi7vq42Kp7aK6ZlesXfJ%2FemTQSmPcICNsaZoh975yKsyWW23y0vSN8Cz7DB%2BAVt2D60HxPlEsnT5o0ShGFj2Mbfbmsgzm7O1EbvtZNqP6l6%2ByCkp3p6DCOcjlZJfyEv5awhCo89tAyzbDmFX%2BmKP415nsW8w88QhswFX%2BLzy8G8zViAp57yH4YOxnuT8gm9qUUfqAjOMP7xpb4GOqUB6nikmLmlOSEGz71ANa%2BYEHWWNzr1Afdx4sKkPVYnah7AHDD9od%2FslpvL0YF7P3q3e2NN6Hl1IVzaV6hHY78Yy0WQdUVZwz%2BYoSVcEEBIXDS9PypBtDjqRroSod7kzxumQwrZ7rNwpGL5IiByx%2BcYQtaRBJQBCMnQ9UYsvmek4%2BJKywsyPC0UXiw4uy37RvFR4OtOiTFHIMr5dC5NPO48RaLLxH78&X-Amz-Signature=4d1350dd8bcfd79be18403a1d12f5bcab9287fa7f23f36c0d99f2e3445ac9c3a&X-Amz-SignedHeaders=host&x-id=GetObject)


Mình tổ chức thư mục trông như thế này 


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a6db9e62-19fc-439b-bd8b-1e09a1fdac77/5d35104c-2d88-4ee7-ac2b-b3d8121d0cce/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655ICOWDJ%2F20250306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250306T104953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDRPskrmI57YMLU5LsPl90mgMhi3P8bxlqK%2F2IzUHOX1gIgZiEn4887Jse6%2F3J%2F%2BmMGNj4ecyXzuy%2BPcQkrTnJiMEkq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDCkR7odM7TK%2FZfz4ayrcA4y5742lg2weydhs1AQ3wMOjeId9xBNnTrCJnfPW33uLXSra85%2B7oZm%2Fd%2BigIuYzagpY37470iK7SrWSmW1tb7n85n7S6oZIQYWG%2BnfixUXrinyZlcN5NPBEBKyLKA502XNH5XMysPNyC%2BR8ZLCOkE7dvbQwTbK6abFxBEq%2Boxmm7wZm9leZVQzkLL1YQaHNw6kzDnKL45PBXyI1Ghlgy1uHsJhfItvSzaeaUY1KyxweYyqEREUougWvhE2jfNssbTgSsCHjnh9E1dU7qPRlmYlCwA8KimR9FiypjwcPKViJZuTJ%2BVM4FV%2BkQMi6g2KNzH7XiRjAM%2B49Lo0skRDSppTaiJ0ukJWYKsAd0A58nZ24nKYr7S4B3yresJQZs%2FJNiSxZXwdSeNuQyV56M7VIRRIndGYbLrYCXmymzcmmRciprlOCO14yXSi7vq42Kp7aK6ZlesXfJ%2FemTQSmPcICNsaZoh975yKsyWW23y0vSN8Cz7DB%2BAVt2D60HxPlEsnT5o0ShGFj2Mbfbmsgzm7O1EbvtZNqP6l6%2ByCkp3p6DCOcjlZJfyEv5awhCo89tAyzbDmFX%2BmKP415nsW8w88QhswFX%2BLzy8G8zViAp57yH4YOxnuT8gm9qUUfqAjOMP7xpb4GOqUB6nikmLmlOSEGz71ANa%2BYEHWWNzr1Afdx4sKkPVYnah7AHDD9od%2FslpvL0YF7P3q3e2NN6Hl1IVzaV6hHY78Yy0WQdUVZwz%2BYoSVcEEBIXDS9PypBtDjqRroSod7kzxumQwrZ7rNwpGL5IiByx%2BcYQtaRBJQBCMnQ9UYsvmek4%2BJKywsyPC0UXiw4uy37RvFR4OtOiTFHIMr5dC5NPO48RaLLxH78&X-Amz-Signature=e86d1e60011f9112230ef0523a9788641f9a8019c66cedd55f57974261963149&X-Amz-SignedHeaders=host&x-id=GetObject)


Mình chỉ làm một trang duy nhất thôi nên sẽ đặt là `index.astro`


Còn đây là cấu trúc một trang web mình đã chia thành nhiều astro component để dễ main


```bash
---
import Layout from "../layouts/Layout.astro";
import TimeLine from "@/components/section/TimeLine";
import Gift from "@/components/section/Gift.astro";
import MasonryGallery from "@/components/section/MasonryGallery";
import Schedule from "@/components/section/Schedule.astro";
import Hero from "@/components/section/Hero.astro";
import FamilyIntroduction from "@/components/section/FamilyIntroduction.astro";
---
<Layout>
  <Hero />
  <FamilyIntroduction />
  <Schedule />
  <TimeLine client:only="react" />
  <MasonryGallery client:only="react"/>
  <Gift />
</Layout>
```


Đối với Layout.astro , mình chỉ đơn giản define slot và các cấu trúc dùng chung như footer hoặc head


```bash
---
import FloatingButton from "@/components/feature/FloatingButton";
import '../styles/globals.css'
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>Wedding Page</title>
  </head>
  <body>
    <slot />
    <footer class="bg-secondary text-primary text-center py-4">
      <p>&copy; 2025 Lễ Cưới của Anh Tuấn & Thu Hương. All rights reserved.</p>
    </footer>
    <FloatingButton client:only="react" />
  </body>
</html>
```


`Hero.astro` thì chỉ là một html được tách ra các mỗi file đều có style và script riêng như vue vậy


```bash
<section class="wedding-section">
  <div class="container mx-auto text-center">
    <h1 id="wedding-title" class="text-5xl font-bold opacity-0">Lễ Cưới của Anh Tuấn & Thu Hương</h1>
    <p id="wedding-subtitle" class="mt-4 text-lg opacity-0">Hân hạnh mời bạn tham dự lễ cưới của chúng tôi</p>
  </div>
</section>

<style>
  .wedding-section {
  ...
</style>

<script >
  .....
</script>
```


`FamilyIntroduction.astro` ở đây mình có thể import một thẻ card `tsx` vì bên trong thẻ này có dùng lib hiệu ứng mà mình muốn chạy ở client nên sẽ define rõ **`directives`** cho nó là `client:load`


```bash
---
import IntroductionCard from "./IntroductionCard";

const introductions = [
  {
    id: 1,
    type: "Đàng Trai",
    name: "Anh Tuấn",
    description: "Chú rể với nụ cười ấm áp và trái tim chân thành.",
    images: ["/image4.jpeg", "/image2.jpeg", "/image3.jpeg"],
  },
  {
    id: 2,
    type: "Đàng Gái",
    name: "Thu Hương",
    description: "Cô dâu xinh đẹp với nụ cười rạng ngời.",
    images: ["/image4.jpeg", "/image2.jpeg", "/image3.jpeg"],
  },
];
---

<section class="py-10 text-center">
  <h2 class="text-3xl font-bold mb-6">Giới thiệu Đàng Trai & Đàng Gái</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    {
      introductions.map((intro) => (
        <IntroductionCard
          client:load
          type={intro.type}
          name={intro.name}
          description={intro.description}
          images={intro.images}
        />
      ))
    }
  </div>
</section>
```


Tương tự với `Schedule.astro` mình có một component `CountDownTimer` mình xây dựng bằng react component nên define rõ **`directives`** cho nó là `client:only="react"` . Ở đây theo docs khuyến khích nên define rõ tên client framework được nhúng vào đây để tối ưu tốt hơn


```bash
---
import CountDownTimer from "@/components/feature/CountDownTimer";

const locations = [
  {
    id: 1,
    title: "Nhà Trai",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.946389584555!2d105.79567821549968!3d21.022814738509624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1736346587235!5m2!1sen!2s",
    time: "15/01/2025 - 9:00 AM",
    countdownId: "countdown-groom",
  },
  {
    id: 2,
    title: "Nhà Gái",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.946389584555!2d105.79567821549968!3d21.022814738509624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1736346587235!5m2!1sen!2s",
    time: "15/01/2025 - 11:00 AM",
    countdownId: "countdown-bride",
  },
];

// Tính toán thời gian cho CountDownTimer
const currentDay = new Date();
const nextDay = new Date();
nextDay.setDate(currentDay.getDate() + 1);
const ISOString = nextDay.toISOString();
---

<section class="py-10 bg-gray-100">
  <h2 class="text-3xl font-bold text-center mb-6">Lịch trình và Địa điểm</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    {
      locations.map((location) => (
        <div class="p-6 bg-white shadow rounded" >
          <h3 class="text-2xl font-bold mb-4">{location.title}</h3>
          <p>Hôn lễ tổ chức tại:</p>
          <iframe
            src={location.mapUrl}
            class="w-full h-64 my-4 rounded"
            style="border:0;"
            allowfullscreen="false"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <p>Thời gian: {location.time}</p>
          <CountDownTimer date={ISOString} client:only="react" />
          <div id={location.countdownId} class="mt-2 text-red-500 font-bold"></div>
        </div>
      ))
    }
  </div>
</section>
```


À có điều thú vị khi phát triển với astro , họ có sẵn một tool bar để check những lỗi tìm ẩn ảnh hưởng đến SEO  của  trang web 


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a6db9e62-19fc-439b-bd8b-1e09a1fdac77/3d64ac9b-3fc7-437e-94f9-99d046e5dacb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655ICOWDJ%2F20250306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250306T104953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDRPskrmI57YMLU5LsPl90mgMhi3P8bxlqK%2F2IzUHOX1gIgZiEn4887Jse6%2F3J%2F%2BmMGNj4ecyXzuy%2BPcQkrTnJiMEkq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDCkR7odM7TK%2FZfz4ayrcA4y5742lg2weydhs1AQ3wMOjeId9xBNnTrCJnfPW33uLXSra85%2B7oZm%2Fd%2BigIuYzagpY37470iK7SrWSmW1tb7n85n7S6oZIQYWG%2BnfixUXrinyZlcN5NPBEBKyLKA502XNH5XMysPNyC%2BR8ZLCOkE7dvbQwTbK6abFxBEq%2Boxmm7wZm9leZVQzkLL1YQaHNw6kzDnKL45PBXyI1Ghlgy1uHsJhfItvSzaeaUY1KyxweYyqEREUougWvhE2jfNssbTgSsCHjnh9E1dU7qPRlmYlCwA8KimR9FiypjwcPKViJZuTJ%2BVM4FV%2BkQMi6g2KNzH7XiRjAM%2B49Lo0skRDSppTaiJ0ukJWYKsAd0A58nZ24nKYr7S4B3yresJQZs%2FJNiSxZXwdSeNuQyV56M7VIRRIndGYbLrYCXmymzcmmRciprlOCO14yXSi7vq42Kp7aK6ZlesXfJ%2FemTQSmPcICNsaZoh975yKsyWW23y0vSN8Cz7DB%2BAVt2D60HxPlEsnT5o0ShGFj2Mbfbmsgzm7O1EbvtZNqP6l6%2ByCkp3p6DCOcjlZJfyEv5awhCo89tAyzbDmFX%2BmKP415nsW8w88QhswFX%2BLzy8G8zViAp57yH4YOxnuT8gm9qUUfqAjOMP7xpb4GOqUB6nikmLmlOSEGz71ANa%2BYEHWWNzr1Afdx4sKkPVYnah7AHDD9od%2FslpvL0YF7P3q3e2NN6Hl1IVzaV6hHY78Yy0WQdUVZwz%2BYoSVcEEBIXDS9PypBtDjqRroSod7kzxumQwrZ7rNwpGL5IiByx%2BcYQtaRBJQBCMnQ9UYsvmek4%2BJKywsyPC0UXiw4uy37RvFR4OtOiTFHIMr5dC5NPO48RaLLxH78&X-Amz-Signature=de1f4dfe4d93796edf56c5d9bc6345d629da3ac5bc26c84e4a7e28aa8ece58cf&X-Amz-SignedHeaders=host&x-id=GetObject)


Họ cảnh báo mình không nên dùng tại chữ image bên trong alt attribute và nên dùng component `Image` cả astro để tối ưu ảnh 


```javascript
{images.map((image) => (
            <div
              key={image.id}
              className="image-item relative overflow-hidden group rounded-lg mb-4 break-inside-avoid"
            >
              <img
                src={image.imageUrl}
                alt={image.alt}
                className="w-full h-auto rounded-lg transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
          ))}
```


Mình sẽ sửa lại như sau 


```javascript
{images.map((image) => (
            <div
              key={image.id}
              className="image-item relative overflow-hidden group rounded-lg mb-4 break-inside-avoid"
            >
              <Image
                src={image.imageUrl}
                alt={image.alt}
                width={300} // Add appropriate width
                height={200} // Add appropriate height
                class="w-full h-auto rounded-lg transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
          ))}
```


Để tránh blog quá dài nên mình chỉ liệt kê những phần đáng chú ý khi mình làm project này thôi heh

- Project demo này mình host tại [https://wedding-astro.vercel.app/](https://wedding-astro.vercel.app/)

Cám ơn mọi người đã đọc tới đây 😄 , nếu có ai nào cũng muốn kiếm partner làm side project giống mình thì vào đây hen [https://discord.gg/URazSDvMm5](https://discord.gg/URazSDvMm5)

