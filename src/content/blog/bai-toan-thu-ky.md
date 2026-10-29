---
external: false
draft: false
title: "Bài toán thư ký"
description: "Secretary Problem là một bài toán kinh điển trong lý thuyết dừng tối ưu, xác suất ứng dụng và thống kê"
date: "2026-10-29"
author: "Javier"
slug: "bai-toan-thu-ky"
status: "Published"
categories:
  - name: "math"
    color: "yellow"
  - name: "mindset"
    color: "brown"
readingTime: "9 min read"
---

Hôm nay, mình tình cờ xem được một video Reel nói về _Secretary Problem_, hay còn gọi là bài toán thư ký. Điều khiến mình chú ý là một bài toán xác suất có thể đưa ra một chiến lược giúp chúng ta tăng cơ hội lựa chọn được ứng viên tốt nhất, ngay cả khi không thể biết trước tương lai.


Mình tò mò muốn hiểu ba điều: bài toán thực sự nói về điều gì, con số 37% được tính ra như thế nào, và liệu cách suy nghĩ này có thể áp dụng vào những quyết định ngoài đời hay không.


## 2. Bài toán thư ký là gì?


Hãy tưởng tượng bạn đang tuyển một thư ký và có 100 ứng viên đến phỏng vấn lần lượt.


Bạn có thể đánh giá từng người dựa trên năng lực của họ. Tuy nhiên, có ba giới hạn:

- Bạn phải quyết định ngay sau mỗi buổi phỏng vấn, chọn hoặc từ chối ứng viên đó.
- Một khi đã từ chối, bạn không thể quay lại chọn người đó.
- Mục tiêu của bạn là chọn đúng người giỏi nhất trong cả 100 ứng viên, chứ không chỉ chọn một người đủ tốt.

Vấn đề nằm ở chỗ bạn chưa gặp tất cả ứng viên nên không thể biết người đang phỏng vấn có phải người giỏi nhất hay không. Nếu chọn quá sớm, những người tốt hơn có thể xuất hiện sau đó. Nhưng nếu cứ chờ đợi, bạn có thể bỏ lỡ người giỏi nhất đã gặp trước đó.


Vậy nên chọn vào lúc nào?


Một chiến lược nổi tiếng được đề xuất như sau:

1. **Dành khoảng 37% đầu tiên để quan sát.** Với 100 ứng viên, bạn phỏng vấn khoảng 37 người đầu tiên nhưng không chọn ai.
2. **Ghi nhớ tiêu chuẩn tốt nhất đã gặp.** Những ứng viên đầu tiên giúp bạn hình thành một mốc so sánh.
3. **Bắt đầu lựa chọn từ người thứ 38.** Chọn người đầu tiên tốt hơn tất cả những người đã gặp trước đó.

Chiến lược này không đảm bảo bạn sẽ chọn đúng người giỏi nhất. Nó giúp tối ưu xác suất chọn đúng người đó trong những điều kiện nhất định.


## 3. Công thức này được tạo ra như thế nào?


Để hiểu con số 37%, chúng ta không cần đi quá sâu vào toán học. Chỉ cần hiểu ba ý tưởng nền tảng: xác suất, phép cộng xác suất của nhiều trường hợp và cách tìm giá trị lớn nhất của một hàm số.


### Bước 1. Xác định chiến lược


Gọi:

- (n) là tổng số ứng viên.
- (r) là số ứng viên đầu tiên chỉ dùng để quan sát.
- (P(r)) là xác suất chọn được người giỏi nhất khi áp dụng chiến lược này.

Câu hỏi cần giải quyết là: nên chọn (r) bằng bao nhiêu để (P(r)) lớn nhất?


### Bước 2. Tính xác suất thành công


Công thức xác suất của chiến lược là:


![image.png](/images/blog/81cb13f0d6c7f6565b459d1eec5b9310.png)


Công thức trông khá phức tạp, nhưng có thể hiểu đơn giản qua từng phần:


![image.png](/images/blog/dba2fd726eb0e47238fed66306075ccb.png)


Nói cách khác, công thức này cộng các trường hợp có thể giúp chúng ta chọn đúng người giỏi nhất để tính ra xác suất thành công chung.


### Bước 3. Rút gọn để tìm tỷ lệ tối ưu


Khi số ứng viên đủ lớn, ta có thể dùng tích phân để xấp xỉ tổng trong công thức. Đây là cách chuyển một phép cộng nhiều số hạng thành một biểu thức gọn hơn.


![image.png](/images/blog/b60b75433d4d5ae3bbdc030dac7ad376.png)


Tức là khoảng **36,8%, thường được làm tròn thành 37%**.


Điểm quan trọng ở đây không phải là phải nhớ tất cả công thức. Điều đáng chú ý là con số này được xây dựng từ logic nền tảng của toán học: dùng xác suất để mô hình hóa các trường hợp, dùng tích phân để xấp xỉ phép cộng, rồi dùng đạo hàm để tìm điểm tối ưu.


### Hai điều kiện tiên quyết cần lưu ý


Trước khi áp dụng chiến lược này, cần kiểm tra hai điều kiện quan trọng:

1. **Biết trước tổng số lựa chọn:** bạn cần biết mình sẽ đánh giá bao nhiêu ứng viên, hoặc ít nhất có một quy mô đủ xác định để tính tỷ lệ quan sát.
2. **Không thể quay lại lựa chọn cũ:** một khi đã bỏ qua ứng viên trước đó, bạn không thể quay lại chọn họ.

Ngoài ra, mô hình còn giả định thứ tự ứng viên xuất hiện là ngẫu nhiên và mục tiêu là chọn đúng người tốt nhất. Nếu những giả định này không phù hợp, tỷ lệ 37% có thể không còn tối ưu.


## 4. Các bài toán tối ưu nổi tiếng


Bài toán thư ký là một ví dụ về cách toán học giúp đưa ra quyết định trong điều kiện không chắc chắn. Ngoài ra, còn có nhiều lý thuyết và phương pháp khác được sử dụng để giải quyết các vấn đề tối ưu trong thực tế.


| Lý thuyết hoặc bài toán      | Ý tưởng dễ hiểu                                                                                   | Ứng dụng thực tế                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Secretary Problem**        | Quan sát một phần lựa chọn trước, sau đó chọn ứng viên phù hợp nhất theo một quy tắc.             | Tuyển dụng, bài toán dừng tìm kiếm, nghiên cứu chiến lược lựa chọn.          |
| **Bayesian Decision Theory** | Kết hợp xác suất và mức độ lợi ích, thiệt hại để chọn phương án hợp lý.                           | Đánh giá rủi ro, chẩn đoán, ra quyết định khi thiếu thông tin.               |
| **Game Theory**              | Tính đến việc quyết định của mình có thể ảnh hưởng và bị ảnh hưởng bởi quyết định của người khác. | Đàm phán, cạnh tranh kinh doanh, chiến lược giá.                             |
| **Dynamic Programming**      | Chia một vấn đề lớn thành các quyết định nhỏ liên kết với nhau.                                   | Lập lịch, tìm đường đi, phân bổ nguồn lực.                                   |
| **Reinforcement Learning**   | Học cách hành động thông qua phản hồi và phần thưởng.                                             | AI chơi game, robot, hệ thống điều khiển.                                    |
| **Multi-Armed Bandit**       | Cân bằng giữa thử lựa chọn mới và tiếp tục lựa chọn đang cho kết quả tốt.                         | A/B testing, phân phối quảng cáo, đề xuất nội dung.                          |
| **Information Theory**       | Đo lường thông tin và sự không chắc chắn.                                                         | Nén dữ liệu, truyền thông tin, xây dựng cây quyết định.                      |
| **Causal Inference**         | Tìm hiểu liệu một yếu tố có thực sự gây ra thay đổi hay chỉ xuất hiện cùng lúc.                   | Đánh giá hiệu quả quảng cáo, phân tích tác động của tính năng mới.           |
| **Operations Research**      | Tìm phương án tốt nhất trong những giới hạn về chi phí, thời gian hoặc nguồn lực.                 | Logistics, tối ưu tuyến giao hàng, lập lịch sản xuất.                        |
| **Queueing Theory**          | Phân tích dòng người hoặc công việc phải chờ để được phục vụ.                                     | Thiết kế hệ thống API, trung tâm chăm sóc khách hàng, hàng đợi xử lý tác vụ. |


Các lý thuyết trên không hoàn toàn cùng một loại. Có lý thuyết mô tả cách ra quyết định, có phương pháp tính toán, cũng có nhóm bài toán tập trung vào một vấn đề cụ thể. Điểm chung là chúng cung cấp những mô hình có hệ thống để giải quyết vấn đề thay vì chỉ dựa vào trực giác.


## 5. Góc nhìn của nó trong việc lựa chọn bạn đời


Trong video mình xem, người làm video đề cập đến khả năng áp dụng bài toán thư ký vào việc lựa chọn bạn đời. Tuy nhiên, đây chỉ nên được xem là một cách thử vận dụng ý tưởng, không phải kết luận khoa học về tình yêu hay hôn nhân.


Giả sử bạn bắt đầu cân nhắc chuyện kết hôn trong khoảng tuổi từ 19 đến 28. Nếu mượn tỷ lệ 37% làm một phép so sánh, khoảng 3,3 năm đầu sẽ tương ứng với giai đoạn quan sát và tìm hiểu. Sau giai đoạn đó, bạn có thể dùng những trải nghiệm đã tích lũy để đánh giá những mối quan hệ tiếp theo.


Nhưng phép so sánh này có giới hạn rất lớn. Trong bài toán thư ký, số ứng viên được xác định, thứ tự xuất hiện ngẫu nhiên và mục tiêu là chọn người đứng đầu theo một tiêu chí nhất định. Trong tình cảm, chúng ta không biết mình sẽ gặp bao nhiêu người, tiêu chí phù hợp có thể thay đổi theo thời gian, và một mối quan hệ còn phụ thuộc vào lựa chọn của cả hai phía.


Vì vậy, không thể từ công thức này kết luận rằng nên quan sát đến một độ tuổi cụ thể rồi mới kết hôn. Điều có thể tham khảo là ý tưởng dành thời gian để hiểu bản thân và xác định điều mình coi trọng trước khi đưa ra một quyết định dài hạn.


## 6. Kết luận


Điều mình thấy thú vị ở bài toán thư ký không chỉ là con số 37%, mà còn là cách một vấn đề tưởng chừng phụ thuộc vào may mắn có thể được mô hình hóa bằng toán học.


Từ một câu hỏi đơn giản về thời điểm nên lựa chọn, chúng ta có thể đi từ xác suất, đến xấp xỉ bằng tích phân, rồi tìm giá trị tối ưu bằng đạo hàm. Sau đó, cùng một cách suy nghĩ có thể gợi mở nhiều câu hỏi khác trong tuyển dụng, kinh doanh hay những quyết định cá nhân.


Dĩ nhiên, một mô hình chỉ hữu ích khi những giả định của nó phù hợp với vấn đề thực tế. Hiểu được điều kiện áp dụng cũng quan trọng không kém việc biết công thức.


Đôi khi, điều đáng học không phải là mang một con số từ toán học áp vào mọi quyết định, mà là học cách đặt câu hỏi, xác định giới hạn và tìm kiếm một chiến lược có cơ sở hơn cho những lựa chọn của mình.

