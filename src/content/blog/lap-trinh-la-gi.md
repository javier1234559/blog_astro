---
external: false
draft: false
title: "Lập trình là gì?"
description: "Lập trình là gì? Học lập trình liệu có khó không , bản thân mình mới tiếp cận cũng nghĩ như vậy . Nhưng đó là khi mình chưa biết cách đơn giản hóa nó"
date: "2025-03-06"
author: "Minh Nhật Nguyễn"
slug: "lap-trinh-la-gi"
status: "Published"
categories:
  - name: "beginer"
    color: "default"
  - name: "web-dev"
    color: "brown"
readingTime: "11 min read"
---

Học lập trình liệu có khó không , bản thân mình mới tiếp cận cũng nghĩ như vậy . Nhưng đó là khi mình chưa biết cách đơn giản hóa nó


Ok mình sẽ cùng đi qua các câu hỏi mà mình nghĩ nếu mình mới bắt đầu cũng sẽ đặt câu hỏi tương tự như vậy


Mình có một ví dụ khá hay đó là hãy tưởng tượng bạn có một con robot ngu ngốc. Nó không biết suy nghĩ, không biết đoán, và chỉ làm đúng những gì bạn bảo. Cách duy nhất để khiến nó hoạt động đúng là viết ra một danh sách các bước thực hiện một nhiệm vụ.

- "Cầm bánh lên."
- "Đặt vào đĩa"
- "Đưa cho tôi “

```typescript
function takeCake() {
    openBox();
    if (hasCake) {
        grabCakeWithHand();
    }
    return cake;
}

function placeCakeOnDish(cake) {
    if (!hasDish) {
        getDish();
    }
    place(cake, onDish);
    return dish;
}

function giveToUser(dish) {
    give(dish, toUser);
}

// Run the program:
let cake = takeCake();
let dish = placeCakeOnDish(cake);
giveToUser(dish);
```


**⇒ L**ập trình là nghệ thuật hướng dẫn máy tính làm việc, từ những tác vụ đơn giản như tính toán đến việc xây dựng một hệ thống lưu thông tin dữ liệu va tạo nên những chức năng lớn hỗ trợ con người như phần mềm 


## **Tại sao từ một đoạn mã có thể tạo ra một chương trình?**


Máy tính không hiểu ngôn ngữ con người. Nó chỉ hiểu hai trạng thái: **bật (1) và tắt (0)**, vì về bản chất, đó là cách các linh kiện điện tử hoạt động. Từ trên xuống thì

- **Ngôn ngữ lập trình** là một cách để con người diễn đạt lệnh mà máy có thể hiểu.
- **Biên dịch và thông dịch** giúp chuyển đổi mã nguồn thành mã máy 0 1 như trên
- **Hệ điều hành** cung cấp nền tảng để phần mềm có thể chạy trên phần cứng. Giúp phần cứng hiểu được 0 1 nên làm gì

## **Cách suy nghĩ của một lập trình viên**

- **Chia nhỏ vấn đề:** Bất kỳ vấn đề nào cũng có thể phân tách thành những bước nhỏ hơn.
- **Viết ra quy trình:** Khi làm một việc gì đó, hãy tư duy xem quá trình được tự động hóa như thế nào.
- **Tư duy logic:** Nếu X thì Y, nếu không thì Z.

Một video của TED-Ed khá hay họ giải thích cách làm sao chúng ta có thể tạo nên một thuật toán để giải quyết một thứ gì đó


👉 [https://youtu.be/6hfOvs8pY1k?si=Vy6hn2wcMry1iRmM](https://youtu.be/6hfOvs8pY1k?si=Vy6hn2wcMry1iRmM)


Hãy tưởng tượng chúng ta đang lập trình một con robot có thể làm bánh theo yêu cầu.


Một robot hoạt động theo nguyên tắc:

1. **Nhận lệnh** (Input).
2. **Thực hiện hành động từng bước** (Process).
3. **Hoàn thành nhiệm vụ** (Output).

Robot này sẽ có **các thành phần sau**:

- **Cánh tay** để lấy bánh.
- **Cảm biến** để kiểm tra xem có bánh hay không.
- Khi tạo xong có thể điều chỉnh cho nó có cảm biến hay không

Mã giả trông như sau


```typescript
class Robot {
  hasArm = true; // Robot luôn có cánh tay để nhặt bánh

  constructor(name, hasSensor = true) {
    this.name = name;
    this.hasSensor = hasSensor; // Có thể có hoặc không có cảm biến
  }

  // Kiểm tra xem có bánh hay không (chỉ thực hiện nếu có cảm biến)
  checkCake() {
    if (!this.hasSensor) {
      return AssumeCake(); // Giả định có bánh
    }
    return Math.random() < 0.8; // 80% cơ hội tìm thấy bánh do cảm biến trả về
  }

  // Lấy bánh bằng cánh tay
  takeCake() {
    if (this.checkCake()) {
	    FoundCake(); // Phát hiện bánh
      return "🍰"; // Trả về bánh
    }
    NoCake(); // Không tìm thấy bánh
    return null;
  }

  // Đặt bánh lên đĩa
  placeCakeOnDish(cake) {
    if (!cake) {
      NoCakeToPlace(); // Không có bánh để đặt
      return null;
    }
    PutOnDish(); // Đặt bánh lên đĩa
    return `🍽️ ${cake}`;
  }

  // Đưa đĩa bánh cho người dùng
  giveToUser(dish) {
    if (!dish) {
      NothingToGive(); // Không có gì để đưa
      return;
    }
    ServeDish(dish); // Đưa bánh cho người dùng
  }

  // Thực hiện toàn bộ quy trình phục vụ bánh
  serveCake() {
    let cake = this.takeCake();
    let dish = this.placeCakeOnDish(cake);
    this.giveToUser(dish);
  }
}

// Tạo robot có cảm biến
const robotWithSensor = new Robot("RoboChef", true);
// Tạo robot không có cảm biến
const robotWithoutSensor = new Robot("OldSchoolBot", false);

// Chạy chương trình
robotWithSensor.serveCake();
robotWithoutSensor.serveCake();
```


Một mã lập trình thực tế kiểu . Ở đây mình ví dụ bằng `javascript`


```javascript
// Định nghĩa class Robot
class Robot {
  constructor(name, hasSensor = true) {
    this.name = name;
    this.hasArm = true;   // Robot luôn có cánh tay để nhặt bánh
    this.hasSensor = hasSensor; // Có thể có hoặc không có cảm biến
  }

  // Kiểm tra xem có bánh hay không (chỉ dùng nếu có cảm biến)
  checkCake() {
    if (!this.hasSensor) {
      console.log(`${this.name}: I have no sensor, so I will just assume there is cake! 🤖`);
      return true; // Nếu không có cảm biến, luôn giả định là có bánh
    }
    
    console.log(`${this.name}: Scanning for cake...`);
    return Math.random() > 0.2; // 80% cơ hội có bánh
  }

  // Lấy bánh bằng cánh tay
  takeCake() {
    if (this.checkCake()) {
      console.log(`${this.name}: Found cake! Picking it up... 🍰`);
      return "🍰"; // Trả về bánh
    } else {
      console.log(`${this.name}: No cake found! ❌`);
      return null;
    }
  }

  // Đặt bánh lên đĩa
  placeCakeOnDish(cake) {
    if (!cake) {
      console.log(`${this.name}: No cake to place!`);
      return null;
    }
    console.log(`${this.name}: Placing the cake on the dish... 🍽️`);
    return `🍽️ ${cake}`;
  }

  // Đưa đĩa bánh cho người dùng
  giveToUser(dishWithCake) {
    if (!dishWithCake) {
      console.log(`${this.name}: I have nothing to give!`);
      return;
    }
    console.log(`${this.name}: Here is your dessert! 🥳 => ${dishWithCake}`);
  }

  // Chạy toàn bộ quy trình
  serveCake() {
    const cake = this.takeCake();
    const dishWithCake = this.placeCakeOnDish(cake);
    this.giveToUser(dishWithCake);
  }
}

// Tạo robot có cảm biến
const roboChef = new Robot("RoboChef", true);
roboChef.serveCake();

// Tạo robot không có cảm biến
const oldSchoolBot = new Robot("OldSchoolBot", false);
oldSchoolBot.serveCake();
```


Như bạn có thể thấy chỉ cần chia nhỏ vấn đề ra , mỗi vấn đề ta tìm hiểu làm sao để biểu diễn nó trong ngôn ngữ lập trình chúng ta có thể tạo nên một chương trình như ý muốn


## **Bài học vỡ lòng: Thành phần cơ bản của một chương trình**


Một chương trình thường được xây dựng từ những khối cơ bản:

- **Biến (Variables)** – Lưu trữ dữ liệu.
- **Dữ liệu và kiểu dữ liệu (Data Types)** – Quy định cách dữ liệu được xử lý.
- **Cấu trúc điều kiện (If-Else)** – Ra quyết định.
- **Vòng lặp (Loops)** – Lặp lại một tác vụ.
- **Hàm (Functions)** – Đóng gói một đoạn mã để tái sử dụng.
- Hay một số phần nâng cao một chút như :
	- Thư viện : Một chương trình hay gặp đã được đóng gói , chỉ cần tải và sử dụng
	- Khái niệm về OOP , Design pattern : Cái này là một lĩnh vực nâng cao , nó là cách tổ chức code dễ dùng hơn , dễ hiểu hơn . Giống như việc mình tạo ra class Robot vậy , gom tất cả logic liên quan vào nó thì chỉ lần gọi serveCake() là nó chạy như ý mà mình không cần quan tâm bên trong nhiều nữa
	- Cấu trúc dữ liệu và thuật toán : Cái này giống như là cách bạn nghĩ ra một cách giải quyết vấn đề thông minh hơn vậy . Bạn cho con Robot một cái đĩa nhỏ và chỉ nó sắp xếp nó ngăn nắp nó sẽ giao nhiều cake hơn cho bạn

Dù với ngôn ngữ nào thì chúng cũng đều cần tối thiểu những thành phần này để biểu diễn nên logic của một chương trình .  


Nó sẽ thường khó khăn cho ai mới học ngôn ngữ lập trình đầu tiên , nhưng về sau các ngôn ngữ khá sẽ đều tương tự nên chúng ta thường không học lại quá nhiều 


Nó thường sẽ được tổng hợp lại với Từ khóa “Language + CheatSheet” 


👉 [https://quickref.me/python](https://quickref.me/python)


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a6db9e62-19fc-439b-bd8b-1e09a1fdac77/2877319e-3d58-4a12-96b2-5f7450ffaa77/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCACXVV6%2F20250307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250307T122919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjXHlUm0pdT8gDzlaAihf8JJ52BBwuvl9nSNKta23MOAIgXFPf0T6ON0jGi9CayXp%2BiDwkkaISIXsIFbLg%2FxxlXdQq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDECa3Kw7ybv4aZhYbSrcA3jVOoHrsk0gxzccm8SYX2Yvupo0wDeATQMqjw68gjpmvx5EBM4MQsx12EYuaBZCjQlTBGdxt%2BEZ32VWnxFEMG4%2BUAwLa%2Bd5QpLoKXzTDcuVXhPknlH9azC10Vt6%2B75KNPnFSPAtPqcbAjFaUS6usoPTGcWP0RROr1vEY0qo3Pcy9w576QqfMA4KQ9Hk00LbCm7Qzj51zrpF8Jwx9GyzbGjvv3D5KAFOxCypGlmg%2BQdKlt6BnIGXz06EFZhHix63OpbGgwy1NScwoWoRDOjk6Aa%2Fz%2BwmoS6Y7GovIRK3aKLEgVHouO3ahNxEbzX6tk4YWnzs%2BWxMOT%2BzNchSWj0nW8ys92PiTWaBGLrl9MCFTFi9zAG%2BfG5gSkD%2FvpQuA3qPvitOgKGRtdn%2BLPMvNhMi9eanTtiL6IvHsElw%2ByC7TM7juflIc9cUXZLSsqfGIoucYbj0%2Fu20hq0SwG%2FjdE2GpZSpZJjbHfzJMKuM27xXOKvR8fDyp%2BWBmsY5%2BnFxM6wlFgNOiaJSufPkJAuooq60TfQV3XHubPxxwC79A9liJK9Knsw%2BPbOLdhbgQyQvOvJvbVIzGgAILCl3%2FJEUlAMbapWO%2Fhla0yDJSg%2Fdki%2FicTgEv6xtQH36mZ1NXBJcMLapq74GOqUBd3WcSmJK94CBjG3dPxVhlJPuRQXvcPpQlGHgGVIF1VhqRho14sp8ttnRKn%2FjMgsvbI8iX1kn7tmOqKD9f9ozPGL609aNTF785WHDdi0AfwdbGQsqRRAEODZugaGXKCu9WsY%2FaUoo8%2FGSM2r7czA%2Bhr%2BAsj56Y9fNVkMVtKxXIeHKgyDE9QcjKIajzIkUOovU3z%2Bz5DB45xoXRPRT3e%2FkKy0vvGdi&X-Amz-Signature=b314948e3cf1f39a38211e4ff0971e6618b688d8bef752890399be63c5488e90&X-Amz-SignedHeaders=host&x-id=GetObject)


Ngôn ngữ đầu tiên của mình học chính là C . Một ngôn ngữ giúp xây dựng nền tảng cho các ngôn ngữ hiện đại khác hiện nay. Đó là lý do nó thường được dạy đầu tiên nếu học lập trình ở các trường đại học .


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a6db9e62-19fc-439b-bd8b-1e09a1fdac77/6029e7d0-8cc3-41d1-9ea6-680a68a6b712/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCACXVV6%2F20250307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250307T122919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjXHlUm0pdT8gDzlaAihf8JJ52BBwuvl9nSNKta23MOAIgXFPf0T6ON0jGi9CayXp%2BiDwkkaISIXsIFbLg%2FxxlXdQq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDECa3Kw7ybv4aZhYbSrcA3jVOoHrsk0gxzccm8SYX2Yvupo0wDeATQMqjw68gjpmvx5EBM4MQsx12EYuaBZCjQlTBGdxt%2BEZ32VWnxFEMG4%2BUAwLa%2Bd5QpLoKXzTDcuVXhPknlH9azC10Vt6%2B75KNPnFSPAtPqcbAjFaUS6usoPTGcWP0RROr1vEY0qo3Pcy9w576QqfMA4KQ9Hk00LbCm7Qzj51zrpF8Jwx9GyzbGjvv3D5KAFOxCypGlmg%2BQdKlt6BnIGXz06EFZhHix63OpbGgwy1NScwoWoRDOjk6Aa%2Fz%2BwmoS6Y7GovIRK3aKLEgVHouO3ahNxEbzX6tk4YWnzs%2BWxMOT%2BzNchSWj0nW8ys92PiTWaBGLrl9MCFTFi9zAG%2BfG5gSkD%2FvpQuA3qPvitOgKGRtdn%2BLPMvNhMi9eanTtiL6IvHsElw%2ByC7TM7juflIc9cUXZLSsqfGIoucYbj0%2Fu20hq0SwG%2FjdE2GpZSpZJjbHfzJMKuM27xXOKvR8fDyp%2BWBmsY5%2BnFxM6wlFgNOiaJSufPkJAuooq60TfQV3XHubPxxwC79A9liJK9Knsw%2BPbOLdhbgQyQvOvJvbVIzGgAILCl3%2FJEUlAMbapWO%2Fhla0yDJSg%2Fdki%2FicTgEv6xtQH36mZ1NXBJcMLapq74GOqUBd3WcSmJK94CBjG3dPxVhlJPuRQXvcPpQlGHgGVIF1VhqRho14sp8ttnRKn%2FjMgsvbI8iX1kn7tmOqKD9f9ozPGL609aNTF785WHDdi0AfwdbGQsqRRAEODZugaGXKCu9WsY%2FaUoo8%2FGSM2r7czA%2Bhr%2BAsj56Y9fNVkMVtKxXIeHKgyDE9QcjKIajzIkUOovU3z%2Bz5DB45xoXRPRT3e%2FkKy0vvGdi&X-Amz-Signature=60e4f65ca77e07806f562d50384f76ea813bb47cf93e44ecdd4f762d323a1329&X-Amz-SignedHeaders=host&x-id=GetObject)


## Sự phát triển của xu hướng lập trình qua các giai đoạn

1. **Lập trình thủ tục (Procedural - C, Pascal)**
	- Code được tổ chức thành các hàm gọi lẫn nhau, tập trung vào luồng điều khiển.
	- Dễ hiểu, trực quan nhưng dễ rối khi dự án lớn, khó tái sử dụng và mở rộng.

	```javascript
	#include <stdio.h>
	
	void sayHello() {
	    printf("Hello, World!\n");
	}
	
	int main() {
	    sayHello();
	    return 0;
	}
	```

2. **Lập trình hướng đối tượng (OOP - C++, Java, Python, C#)**
	- Dữ liệu và hành vi được đóng gói trong các đối tượng, giúp tổ chức tốt hơn.
	- Giải quyết vấn đề quản lý code nhưng có thể phức tạp do kế thừa và phụ thuộc chéo.

	```javascript
	class Robot:
	    def __init__(self, name):
	        self.name = name
	
	    def greet(self):
	        print(f"Hello, I am {self.name}!")
	
	robo = Robot("Robo1")
	robo.greet()
	```

3. **Lập trình hướng chức năng (Functional - Lisp, Haskell, Scala, JavaScript - FP)**
	- Hạn chế trạng thái và tác dụng phụ, ưu tiên hàm thuần túy, giúp dễ kiểm soát luồng dữ liệu.
	- Hiệu quả trong xử lý song song, nhưng khó tiếp cận nếu quen với tư duy OOP.

	```javascript
	const add = (a, b) => a + b;
	console.log(add(2, 3)); // 5
	```

4. **Lập trình hướng module (Modular - ES Modules, CommonJS, Rust, Go)**
	- Chia code thành các module độc lập, dễ quản lý và tái sử dụng.
	- Tránh sự rối rắm của OOP và giúp tổ chức code chặt chẽ hơn.

	**📂 math_utils.py**


	```python
	def add(a, b):
	    return a + b
	```


	**📂 main.py**


	```python
	from math_utils import add
	
	print(add(3, 4))  # 7
	```

5. **Lập trình hướng thành phần (Component-based - React, Vue, Svelte, Web Components)**
	- Mọi thứ được chia nhỏ thành các thành phần có thể tái sử dụng và kết hợp.
	- Giúp xây dựng UI và hệ thống lớn dễ dàng hơn, đặc biệt là trong web và mobile.

	```javascript
	function Button({ label }) {
	  return <button>{label}</button>;
	}
	
	export default Button;
	```

6. **Lập trình hướng AI (AI-driven development - Wasp, LangChain, Haystack, AutoGPT)**
	- Sử dụng AI để tự động hóa quy trình phát triển, giảm lượng code thủ công.
	- Tích hợp AI vào ứng dụng dễ dàng bằng cách chỉ định các hành vi thông qua **prompt** hoặc **cấu hình đơn giản**.
	- Dẫn đến mô hình phát triển **prompt-driven** thay vì code-driven.

	```javascript
	from langchain.chat_models import ChatOpenAI
	
	llm = ChatOpenAI(model_name="gpt-4")
	response = llm.predict("Summarize this article in one paragraph.")
	print(response)
	```


	Phương pháp này rất tiềm năng , nhưng vẫn đang phát triển , có thể nó là xu hướng nếu tương lai AI trở nên nhẹ và ít tốn kém hơn


# **Hành trình tự học lập trình như thế nào**


Khi tìm tới blog này chắc hẳn bạn cũng là người mới tiếp xúc với lập trình , các bạn có thể có những mục đích khác nhau và thường sẽ không biết bắt đầu từ đâu , học từ nguồn nào . 


Bạn rất may mắn vì mình đã cố đúc kết những kinh nghiệm cá nhân để viết bài này


### **1. Xác Định Rõ Mình Học Để Làm Gì?**

- Học để **đi làm** hay để **thỏa mãn đam mê**?
- Học để **tự làm sản phẩm**, startup, hay chỉ để biết code?
- Xác định **công nghệ cần học**, không lan man theo trend.

### **2. Cách Học Duy Nhất: Tò Mò, Thử Sai, Và Xây Dựng**

- **Không có lộ trình hoàn hảo**, chỉ có **bắt tay vào làm**.
- Viết code, debug, gặp lỗi → **Chính quá trình này giúp bạn giỏi lên**.
- **Không học xong rồi mới làm**, mà **làm để học**.

### **3. Đam Mê Chỉ Tồn Tại Khi Bạn Được Làm Điều Bạn Thích**

- Chọn một **dự án cá nhân thú vị**, bắt tay vào xây dựng.
- Học **top-down**: Tìm cách **làm được sản phẩm trước**, sau đó mới tối ưu.
- 

## **9. Lời khuyên cho người mới bắt đầu**

- Hãy hỏi "Tại sao?" với mọi thứ bạn học.
- Tìm kiếm mentor hoặc cộng đồng.
- Làm nhiều hơn là học.
- Hiểu rằng code chỉ là một phần của việc giải quyết vấn đề.
