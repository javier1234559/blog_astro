---
external: false
draft: false
title: "Pattern thuật toán thường gặp"
description: "Các pattern thuật toán phổ biến trong lập trình"
date: "2025-04-17"
author: "Minh Nhật Nguyễn"
slug: "pattern-thuat-toan-thuong-gap"
status: "Published"
categories:
  - name: "algorithm"
    color: "orange"
readingTime: "18 min read"
---

Thuật toán vốn rất khó và đòi hỏi tư duy , tuy nhiên chúng ta cần xây dựng một nền tảng căn bản cũng như nắm được các pattern phổ biển để giải quyết các vấn đề nhỏ . Rất may mắn nó đã được tổng hợp bởi những người đi trước giúp ta tiếp cận dễ dàng hơn 


## BẢNG TỔNG HỢP CÁC PATTERN GIẢI THUẬT (TỪ DỄ ĐẾN KHÓ)


| STT | Pattern                          | Ý tưởng chính                                        | Thường dùng cho                        |
| --- | -------------------------------- | ---------------------------------------------------- | -------------------------------------- |
| 1   | Brute Force                      | Thử tất cả khả năng có thể                           | Kiểm tra logic cơ bản, bài dễ          |
| 2   | Two Pointers                     | Dùng 2 con trỏ để duyệt tối ưu                       | Mảng, chuỗi có sắp xếp                 |
| 3   | Sliding Window                   | Trượt cửa sổ con (fixed/moving) để tính toán         | Tổng đoạn, subarray thỏa mãn           |
| 4   | Prefix Sum / Difference Array    | Dùng mảng phụ để tính tổng hoặc cập nhật nhanh       | Truy vấn nhiều lần                     |
| 5   | **Fast & Slow Pointer**          | 2 con trỏ với tốc độ khác nhau để phát hiện vòng     | Linked list, số học có vòng            |
| 6   | Binary Search                    | Chia đôi không gian tìm kiếm                         | Tìm phần tử, tối ưu hóa                |
| 7   | Greedy                           | Luôn chọn phương án tốt nhất hiện tại                | Tối ưu cục bộ (nhanh)                  |
| 8   | Backtracking                     | Dò tất cả khả năng, quay lui nếu sai                 | Liệt kê, tổ hợp, sudoku                |
| 9   | Hashing / Frequency Counter      | Dùng map/set để lưu trạng thái                       | Đếm, kiểm tra tồn tại                  |
| 10  | DFS / BFS (Graph Traversal)      | Duyệt đồ thị, ma trận                                | Tìm đường, đếm vùng                    |
| 11  | Recursion                        | Gọi lại chính mình để xử lý phần nhỏ hơn             | Bài toán phân rã, cây                  |
| 12  | Dynamic Programming (DP)         | Ghi nhớ kết quả con để tái sử dụng                   | Dãy con, tối ưu tổ hợp                 |
| 13  | Bit Manipulation                 | Làm việc với bit để xử lý nhanh                      | Subset, mask, XOR                      |
| 14  | Union-Find (Disjoint Set)        | Quản lý các tập rời rạc                              | Liên thông, kết nối                    |
| 15  | Topological Sort                 | Sắp xếp phụ thuộc trong đồ thị có hướng (DAG)        | Lập lịch, xử lý ràng buộc              |
| 16  | Trie / Radix Tree                | Cây tiền tố xử lý chuỗi hiệu quả                     | Tìm kiếm prefix, từ điển               |
| 17  | Segment Tree / Fenwick Tree      | Truy vấn/cập nhật đoạn nhanh                         | Tổng, max, min trên đoạn               |
| 18  | Divide & Conquer                 | Chia bài toán lớn → nhỏ → ghép kết quả               | Merge sort, Closest pair               |
| 19  | Graph Algorithms nâng cao        | Dijkstra, Floyd, Prim, Kruskal...                    | Đường đi ngắn nhất, cây khung nhỏ nhất |
| 20  | Sliding Window + Monotonic Queue | Kết hợp cấu trúc dữ liệu để trượt cửa sổ tối ưu O(n) | Max/min trong sliding window           |
| 21  | Advanced DP                      | Bitmask, Knuth, Convex Hull Trick...                 | Contest, tối ưu phức tạp cao           |


## Brute Force


### 1. Đặc điểm:

- **Ý tưởng**: Duyệt tất cả cặp `(i, j)` có thể → kiểm tra tổng.
- **Độ phức tạp**: `O(n^2)` → chậm nếu `n` lớn.
- **Dễ cài**, nhưng **không tối ưu**.

**Ví dụ 1: Có 2 phần tử cộng lại thành** **`target`** **không?**


```c++
bool twoSum(vector<int>& nums, int target) {
    int n = nums.size();
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if (nums[i] + nums[j] == target)
                return true;
        }
    }
    return false;
}
```


## **Two Pointers**


### 1. Đặc điểm

- Dùng khi ta cần quét một mảng/chuỗi một cách tối ưu.
- Thay vì lặp 2 vòng for (O(n²)), dùng 2 biến trỏ vào 2 vị trí để tăng hiệu suất lên O(n).
- Áp dụng tốt nhất khi dữ liệu **đã được sắp xếp**.

### 2. Dạng phổ biến

- Tìm **2 phần tử có tổng bằng K**. (Bài Two Sum trong leetcode)
- Xử lý **duplicate trong mảng đã sort**.
- Di chuyển con trỏ **nhanh – chậm** để xử lý chuỗi con, reverse, lọc theo điều kiện.

---


### 3. Ví dụ minh họa


**Ví dụ 1: Có 2 phần tử cộng lại thành** **`target`** **không?**


```c++
bool hasPairSum(vector<int>& arr, int target) {
    sort(arr.begin(), arr.end());
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        if (sum < target) left++;
        else right--;
    }
    return false;
}
```


**Ví dụ 2: Xóa phần tử trùng trong mảng đã sắp xếp**


```c++
int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int j = 0;
    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] != nums[j]) nums[++j] = nums[i];
    }
    return j + 1;
}
```


**Ví dụ 3: Reverse một chuỗi**


```c++
void reverseString(vector<char>& s) {
    int l = 0, r = s.size() - 1;
    while (l < r) swap(s[l++], s[r--]);
}
```


## **Sliding Window**


### 1. Đặc điểm

- Dùng khi cần xử lý **subarray**, **substring**, hoặc đoạn liên tiếp trong mảng/chuỗi.
- Tối ưu hơn so với nested loop bằng cách trượt một cửa sổ có kích thước cố định hoặc động trên dãy số.
- Có hai loại:
	- **Fixed-size window** (cửa sổ cố định)
	- **Variable-size window** (cửa sổ động)

### 2. Dạng phổ biến

- Tìm tổng lớn nhất của subarray dài `k`.
- Đếm số lượng chuỗi con thỏa điều kiện (như không chứa ký tự trùng, <= K loại ký tự,...).
- Tìm chuỗi con dài nhất/thỏa mãn điều kiện.
- Tối ưu subarray có tổng nhỏ/lớn hơn X.

### 3. Ví dụ minh họa


**Fixed Window (Cửa sổ cố định)**


**Ví dụ 1: Tổng lớn nhất của đoạn con có độ dài** **`k`**


```c++
int maxSumSubarray(vector<int>& nums, int k) {
    int n = nums.size();
    int windowSum = 0;

    // Tính tổng đoạn đầu tiên
    for (int i = 0; i < k; ++i)
        windowSum += nums[i];

    int maxSum = windowSum;

    // Trượt cửa sổ
    for (int i = k; i < n; ++i) {
        windowSum += nums[i] - nums[i - k];  // thêm phần mới, bỏ phần cũ
        maxSum = max(maxSum, windowSum);
    }

    return maxSum;
}
```


---


Dynamic Window (Cửa sổ động)


Dạng này cửa sổ có kích thước thay đổi, thường được sử dụng khi cần tìm dãy con **ngắn nhất/dài nhất** thỏa mãn một điều kiện nào đó.


**Ví dụ:** Tìm dãy con ngắn nhất có tổng >= target.


```c++
#include <vector>
#include <climits>

int minSubArrayLen(int target, vector<int>& nums) {
    int left = 0, sum = 0, minLength = INT_MAX;
    for (int right = 0; right < nums.size(); right++) {
        sum += nums[right];
        while (sum >= target) {
            minLength = min(minLength, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    return minLength == INT_MAX ? 0 : minLength;
}
```


## **Prefix Sum**


### 1. Đặc điểm

- Dùng để **tính tổng đoạn con nhanh**, từ chỉ số `L` đến `R` trong mảng.
- Thay vì tính tổng từ `L` đến `R` mỗi lần, ta **tiền xử lý** một mảng cộng dồn (`prefix[]`) để truy xuất tổng đoạn trong O(1).

### 2. Ý tưởng chính

- Tạo mảng `prefix[]` sao cho:
	- `prefix[0] = 0`
	- `prefix[i] = prefix[i-1] + a[i-1]`
- Tổng đoạn từ `a[L] → a[R]` chính là:

	👉 `prefix[R+1] - prefix[L]`


### 3. Ví dụ minh họa


**Ví dụ: Tính tổng các đoạn truy vấn nhanh**


```c++
vector<int> buildPrefixSum(const vector<int>& a) {
    int n = a.size();
    vector<int> prefix(n + 1, 0); // prefix[0] = 0
    for (int i = 0; i < n; ++i)
        prefix[i + 1] = prefix[i] + a[i];
    return prefix;
}

// Truy vấn tổng từ index L đến R
int rangeSum(const vector<int>& prefix, int L, int R) {
    return prefix[R + 1] - prefix[L];
}
```


Ví dụ gọi:


```c++
vector<int> nums = {2, 3, 7, 1, 8};
auto prefix = prefixSum(nums);
int sum = rangeSum(prefix, 1, 3);  // = 3 + 7 + 1 = 11
```


## **Difference Array**


### 1. Đặc điểm

- Dùng để **update nhanh nhiều phần tử liên tiếp** trong mảng.
- Thay vì cộng từng phần tử một, ta dùng mảng `diff[]` để **lưu thay đổi tương đối**.

### 2. Ý tưởng chính

- Tạo `diff[]` từ mảng ban đầu `a[]`:
	- `diff[0] = a[0]`
	- `diff[i] = a[i] - a[i-1]` (với i > 0)
- Khi cần cộng `+val` cho đoạn từ `L → R`, chỉ cần:
	- `diff[L] += val`
	- `diff[R+1] -= val`
- Sau khi cập nhật xong, dùng **Prefix Sum của** **`diff[]`** để khôi phục lại mảng gốc đã update.

### 3. Ví dụ minh họa


Cho mảng ban đầu , hãy tăng giá trị 1 đoạn lên cùng lúc 


```c++
// Cho mảng size 5, ban đầu là [0, 0, 0, 0, 0]
// Thực hiện các truy vấn sau:
// +3 từ index 1 đến 3 → [0, 3, 3, 3, 0]
// +2 từ index 2 đến 4 → [0, 3, 5, 5, 2]

// 1. Tạo mảng hiệu từ mảng gốc
vector<int> buildDiff(const vector<int>& nums) {
    int n = nums.size();
    vector<int> diff(n);
    diff[0] = nums[0];
    for (int i = 1; i < n; ++i)
        diff[i] = nums[i] - nums[i - 1];
    return diff;
}

// 2. Cập nhật đoạn [l..r] lên thêm val
void updateRange(vector<int>& diff, int l, int r, int val) {
    diff[l] += val;
    if (r + 1 < diff.size())
        diff[r + 1] -= val;
}

// 3. Khôi phục lại mảng từ mảng hiệu
vector<int> rebuildArray(const vector<int>& diff) {
    int n = diff.size();
    vector<int> result(n);
    result[0] = diff[0];
    for (int i = 1; i < n; ++i)
        result[i] = result[i - 1] + diff[i];
    return result;
}
```


Ví dụ gọi


```c++
vector<int> nums = {0, 0, 0, 0, 0};              // mảng gốc
auto diff = buildDiff(nums);                    // tạo mảng hiệu

updateRange(diff, 1, 3, 100);                    // +100 vào đoạn [1..3]
updateRange(diff, 0, 0, 50);                     // +50 vào phần tử đầu

auto result = rebuildArray(diff);               // khôi phục mảng kết quả

for (int x : result) cout << x << " ";
// Output: 50 100 100 100 0
```


## **Fast & Slow Pointer**


### 1. Đặc điểm

- Dùng hai con trỏ di chuyển với tốc độ **khác nhau** trên dãy hoặc cấu trúc dữ liệu (thường là linked list hoặc chuỗi).
- Dễ dàng phát hiện **chu kỳ**, hoặc tìm điểm giữa, hoặc phát hiện vòng lặp.
- Còn gọi là kỹ thuật “**Tortoise and Hare**”.

### 2. Dạng phổ biến

- Kiểm tra **linked list có vòng lặp** không.
- Tìm **điểm giữa** linked list.
- Tìm **vị trí bắt đầu chu kỳ**.
- Áp dụng trong một số bài toán chuỗi/chu trình với số.

---


### 3. Ví dụ minh họa


**Ví dụ 1: Linked List có vòng lặp hay không**


```c++
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
```


**Ví dụ 2: Tìm middle node của Linked List**


Giải thích: Con trỏ nhanh gấp 2 lần , nên khi con trỏ nhanh đến cuối mảng thì con trỏ chậm đang ở giữa


```c++
ListNode* middleNode(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}
```


## **Binary Search**


### 1. Đặc điểm

- Chỉ dùng khi **dữ liệu đã được sắp xếp**. (Điều này bắt buộc)
- Tìm kiếm bằng cách chia đôi liên tục, mỗi lần loại bỏ nửa còn lại.
- Độ phức tạp: `O(log n)` – rất tối ưu cho mảng lớn.

### 2. Dạng phổ biến

- Tìm kiếm **một phần tử cụ thể** trong mảng.
- Tìm **first position / last position** của một phần tử.
- Tìm **giá trị lớn nhất/nhỏ nhất** thỏa mãn điều kiện nào đó (binary search on answer).
- Tối ưu hóa các bài toán có tính **đơn điệu** (càng tăng càng thỏa mãn).

---


### 3. Ví dụ minh họa


**Ví dụ 1: Tìm phần tử trong mảng đã sắp xếp**


```c++
int binarySearch(vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}
```


**Ví dụ 2: Tìm giá trị nhỏ nhất thỏa mãn điều kiện**


```c++
int findMinSatisfyCondition(int l, int r) {
    int ans = -1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (check(mid)) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return ans;
}
```


## **Greedy (Thuật toán tham lam)**


### 1. Đặc điểm

- Luôn chọn **phương án tốt nhất tại thời điểm hiện tại** với hy vọng rằng điều đó dẫn đến kết quả tối ưu toàn cục.
- Không quay lui, không xét toàn bộ khả năng.
- **Nhanh, đơn giản**, nhưng **không luôn đúng** nếu không thỏa điều kiện bài toán.

---


### 2. Khi nào dùng được?

- Bài toán **chỉ có 1 tiêu chí rõ ràng**, có thể chọn "tốt nhất" một cách rõ ràng.
- Hoặc bài toán đã được **chứng minh là tối ưu khi dùng Greedy**.
- **Không phù hợp** nếu có nhiều tiêu chí mâu thuẫn hoặc có ràng buộc phức tạp.

---


### 3. Dạng phổ biến

- **Đổi tiền (coin change)** trong hệ thống chuẩn.
- **Activity Selection**: Chọn số lượng hoạt động nhiều nhất không trùng nhau.
- **Huffman coding**, **Minimum Spanning Tree (Prim/Kruskal)**.
- **Bài toán khoảng thời gian, sắp xếp lịch**.

---


### 4. Ví dụ minh họa


### **Bài toán đổi tiền (chuẩn)**


**Đề bài**: Cho mảng các mệnh giá `coins = {1, 5, 10, 20, 50, 100}` và một số tiền `amount`. Tìm số lượng đồng ít nhất để tạo ra `amount`.


**Ý tưởng Greedy**:

- Luôn chọn đồng xu lớn nhất ≤ `amount`, trừ đi, lặp lại đến khi hết tiền.

```c++
int minCoins(vector<int>& coins, int amount) {
    sort(coins.rbegin(), coins.rend()); // Sắp giảm dần
    int count = 0;
    for (int coin : coins) {
        while (amount >= coin) {
            amount -= coin;
            count++;
        }
    }
    return amount == 0 ? count : -1; // Nếu không chia hết thì trả -1
}

int main() {
    vector<int> coins = {1, 5, 10, 20, 50, 100};
    int amount = 135;
    cout << minCoins(coins, amount); // Output: 3 (100 + 20 + 10 + 5)
}
```


**Fractional Knapsack Problem**


Bài toán: Có n món đồ, mỗi món có value và weight. Túi có trọng lượng tối đa W.


Mỗi món **có thể lấy 1 phần** → chọn món sao cho tổng giá trị **lớn nhất**.


Greedy Idea:

- Tính **value / weight** cho từng món.
- **Sort giảm dần** theo tỉ lệ này.
- Chọn món có tỉ lệ cao nhất trước → **tối ưu value theo từng đơn vị cân nặng**.
- Lưu ý chỉ dành cho món đồ có thể chia nhỏ ra được thì value/weight mới tối ưu . Nếu không sẽ dễ sai

```c++
struct Item {
    int value, weight;
};

// Hàm so sánh theo value/weight giảm dần
bool cmp(Item a, Item b) {
    double r1 = (double)a.value / a.weight;
    double r2 = (double)b.value / b.weight;
    return r1 > r2;
}

double fractionalKnapsack(int W, vector<Item> items) {
    sort(items.begin(), items.end(), cmp);

    double totalValue = 0.0;

    for (auto& item : items) {
        if (W >= item.weight) {
            W -= item.weight;
            totalValue += item.value;
        } else {
            totalValue += item.value * ((double)W / item.weight);
            break;
        }
    }

    return totalValue;
}
```


**Merge Intervals**


Bài toán: Cho danh sách các khoảng [start, end]. Gộp lại các khoảng bị chồng lặp nhau.


Greedy Idea:

- Sort theo `start` tăng dần.
- Duyệt từng interval:
	- Nếu nó **chồng** lên cái cuối cùng ta đã merge → merge lại (`max end`).
	- Ngược lại thì thêm vào danh sách kết quả.

```c++
vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());  // Sort theo start

    vector<vector<int>> merged;

    for (auto& interval : intervals) {
        if (merged.empty() || merged.back()[1] < interval[0]) {
            merged.push_back(interval);
        } else {
            merged.back()[1] = max(merged.back()[1], interval[1]);
        }
    }

    return merged;
}
```


## **Backtracking**


### 1. Đặc điểm

- Dùng khi cần **tìm tất cả các tổ hợp / cấu hình hợp lệ**.
- Là phương pháp thử sai có tổ chức (try → fail → undo → thử cái khác).
- Rất hay dùng trong:
	- Sinh tổ hợp, hoán vị
	- Sudoku, N-Queens, Maze solving
	- Partition problem

### 2. Kỹ thuật chính

- Thường là đệ quy.
- Mỗi bước: chọn 1 lựa chọn → gọi đệ quy → **backtrack** (undo bước chọn).
- Dùng thêm `used[]`, `visited[]` hoặc `set` để kiểm soát.

### 3. Ví dụ minh họa


**Tìm tất cả hoán vị Permutations của mảng số không trùng lặp**

- Duyệt qua từng phần tử chưa dùng.
- Gắn vào kết quả tạm thời `path`.
- Đánh dấu là đã dùng (`used[i] = true`).
- Gọi đệ quy → tiếp tục thử phần tiếp theo.
- Khi quay lui: **bỏ chọn** phần tử → `used[i] = false`.

```c++
void backtrack(vector<int>& nums, vector<bool>& used, vector<int>& path, vector<vector<int>>& res) {
    if (path.size() == nums.size()) {
        res.push_back(path);
        return;
    }

    for (int i = 0; i < nums.size(); i++) {
        if (used[i]) continue;

        used[i] = true;
        path.push_back(nums[i]);

        backtrack(nums, used, path, res);

        path.pop_back();       // undo
        used[i] = false;
    }
}

vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    vector<bool> used(nums.size(), false);
    backtrack(nums, used, path, res);
    return res;
}
```


##  **Hashing / Frequency Counter**


### 1. Đặc điểm

- Dùng `unordered_map` / `map` để **đếm tần suất**, kiểm tra tồn tại, hoặc truy cập nhanh theo key.
- Thường dùng để giảm thời gian từ `O(n²)` xuống `O(n)`.

### 2. Dạng phổ biến

- Tìm phần tử xuất hiện nhiều nhất / duy nhất.
- Kiểm tra 2 chuỗi có phải hoán vị.
- Subarray với tổng = k.
- Tìm số lần xuất hiện các phần tử.

### 3. Ví dụ minh họa


**Tìm phần tử xuất hiện nhiều nhất**


```c++
int mostFrequentElement(vector<int>& nums) {
    unordered_map<int, int> freq;
    for (int num : nums)
        freq[num]++;

    int maxFreq = 0, res = nums[0];
    for (auto& [num, count] : freq) {
        if (count > maxFreq) {
            maxFreq = count;
            res = num;
        }
    }

    return res;
}
```


## **Depth-First Search (DFS)**


### 1. Đặc điểm

- **Đi sâu đến tận cùng** trước khi quay lui.
- Dùng **stack (ngầm)** trong đệ quy hoặc **explicit stack**.
- Dùng cho: tìm đường, đếm thành phần liên thông, backtracking, cây...

---


### 2. Dạng phổ biến

- Tìm số lượng thành phần liên thông trong đồ thị.
- Tìm đường đi từ A đến B.
- Kiểm tra chu trình trong đồ thị.
- Áp dụng trong cây: Preorder, Inorder, Postorder.

---


### 3. Ví dụ minh họa: **Đếm số thành phần liên thông**


```c++
void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}

int countConnectedComponents(int n, vector<vector<int>>& edges) {
    vector<vector<int>> adj(n);
    for (auto& edge : edges) {
        adj[edge[0]].push_back(edge[1]);
        adj[edge[1]].push_back(edge[0]); // undirected
    }

    vector<bool> visited(n, false);
    int count = 0;
    for (int i = 0; i < n; ++i) {
        if (!visited[i]) {
            dfs(i, adj, visited);
            count++;
        }
    }

    return count;
}
```


## **Breadth-First Search (BFS)**


### 1. Đặc điểm

- **Tìm kiếm theo từng lớp (layer)**.
- Dùng **queue**.
- Tìm đường đi ngắn nhất (unweighted graph), kiểm tra 2 điểm có kết nối, v.v...

---


### 2. Dạng phổ biến

- Tìm đường đi ngắn nhất trong ma trận hoặc đồ thị không trọng số.
- Lan truyền (virus, lửa cháy...).
- Kiểm tra đồ thị hai phía (bipartite).
- Level-order traversal của cây.

---


### 3. Ví dụ minh họa: **Tìm đường đi ngắn nhất trong đồ thị không trọng số**


```c++
int bfsShortestPath(int n, vector<vector<int>>& edges, int start, int end) {
    vector<vector<int>> adj(n);
    for (auto& edge : edges) {
        adj[edge[0]].push_back(edge[1]);
        adj[edge[1]].push_back(edge[0]);
    }

    vector<bool> visited(n, false);
    queue<pair<int, int>> q; // (node, distance)
    q.push({start, 0});
    visited[start] = true;

    while (!q.empty()) {
        auto [node, dist] = q.front(); q.pop();
        if (node == end) return dist;

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push({neighbor, dist + 1});
            }
        }
    }

    return -1; // không tìm thấy
}
```

