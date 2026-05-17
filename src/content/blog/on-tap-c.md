---
external: false
draft: false
title: "Ôn tập C++"
description: "Ôn tập C++ fundamental"
date: "2024-09-17"
author: "Javier"
slug: "on-tap-c"
status: "Published"
categories:
  - name: "algorithm"
    color: "orange"
readingTime: "12 min read"
---

# Fundamental syntax


### 1. Khai báo biến & kiểu dữ liệu cơ bản


```c++
int a = 5;              // số nguyên
float b = 3.14f;        // số thực đơn
double c = 2.71828;     // số thực đôi
char ch = 'A';          // ký tự
bool ok = true;         // boolean

auto x = 42;            // tự động suy luận kiểu (C++11+)
const int PI = 3.14;    // hằng số
```


---


###  2. Mảng (Array)


```c++
int arr[100];           // mảng 1 chiều
int a[100][100];        // mảng 2 chiều

// Nhập/xuất mảng 1 chiều
int n;
cin >> n;
for (int i = 0; i < n; ++i) cin >> arr[i];
for (int i = 0; i < n; ++i) cout << arr[i] << " ";
```


---


### 3. Vector (STL)


```c++
#include <iostream>
#include <vector>
#include <algorithm> // sort, reverse
using namespace std;

int main() {
    // 1. Khai báo
    vector<int> v;                    // vector rỗng
    vector<int> v2(5);                // 5 phần tử mặc định = 0
    vector<int> v3(5, 100);           // 5 phần tử = 100
    vector<int> v4 = {1, 2, 3};       // khởi tạo nhanh

    // 2. Thêm/xóa phần tử (CRUD)
    v.push_back(10);                 // thêm cuối
    v.pop_back();                    // xoá cuối
    v.insert(v.begin() + 1, 20);     // chèn 20 vào vị trí 1
    v.erase(v.begin());              // xoá phần tử đầu
    v.clear();                       // xoá toàn bộ
    v.resize(10, 99);                // resize thành 10 phần tử, fill 99

    // 3. Truy cập
    cout << v[0];                    // không kiểm tra index
    cout << v.at(1);                 // có kiểm tra index
    cout << v.front();              // phần tử đầu
    cout << v.back();               // phần tử cuối

    // 4. Duyệt vector
    for (int i = 0; i < v.size(); ++i) cout << v[i] << " ";
    for (int x : v) cout << x << " ";             // range-based for
    for (auto it = v.begin(); it != v.end(); ++it) cout << *it << " ";

    // 5. Sắp xếp & xử lý
    sort(v.begin(), v.end());       // sắp xếp tăng dần
    reverse(v.begin(), v.end());    // đảo ngược
    v.erase(unique(v.begin(), v.end()), v.end()); // xoá phần tử trùng

    // 6. Tìm kiếm
    if (find(v.begin(), v.end(), 10) != v.end())
        cout << "Tìm thấy 10";
    else
        cout << "Không có 10";

    // 7. Vector 2 chiều
    vector<vector<int>> matrix(3, vector<int>(4, 0));
    matrix[1][2] = 9;
}
```


---


###  4. String (C++ style)


```c++
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s = "hello";

    // 1. CRUD
    s += " world";                   // nối chuỗi
    s.push_back('!');                // thêm ký tự cuối
    s.pop_back();                   // xoá ký tự cuối
    s.insert(1, "abc");              // chèn "abc" vào vị trí 1
    s.erase(1, 3);                   // xoá 3 ký tự từ vị trí 1
    s.replace(0, 5, "Hi");           // thay thế 5 ký tự đầu bằng "Hi"
    s.clear();                       // xoá toàn bộ chuỗi

    // 2. Truy cập
    char c = s[0];                   // không kiểm tra index
    char d = s.at(1);                // có kiểm tra index
    cout << s.front();               // ký tự đầu
    cout << s.back();                // ký tự cuối

    // 3. Hàm hữu ích
    s = "cpp cheat sheet";
    cout << s.substr(4, 5);          // "cheat"
    cout << s.find("cheat");         // trả về vị trí đầu tiên
    cout << s.rfind("e");            // tìm vị trí cuối cùng của "e"
    cout << s.length();              // độ dài chuỗi
    cout << (s.empty() ? "Rỗng" : "Có dữ liệu");

    // 4. So sánh chuỗi
    string a = "abc", b = "abd";
    if (a == b) cout << "Giống nhau";
    else if (a < b) cout << "a < b";

    // 5. Chuyển đổi
    string str = to_string(123);             // int -> string
    int num = stoi("456");                   // string -> int
    double f = stod("3.14");                 // string -> float

    // 6. Duyệt chuỗi
    for (char ch : s) cout << ch << " ";
    for (int i = 0; i < s.size(); ++i) cout << s[i] << " ";

    // 7. Biến đổi chuỗi
    transform(s.begin(), s.end(), s.begin(), ::toupper); // in hoa
    transform(s.begin(), s.end(), s.begin(), ::tolower); // in thường
    reverse(s.begin(), s.end()); // đảo chuỗi
}
```


---


###  5. Hàm & đệ quy


```c++
int add(int a, int b) {
    return a + b;
}

// Đệ quy tính giai thừa
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```


---


###  6. Con trỏ & tham chiếu


```c++
int x = 10;
int* p = &x;            // con trỏ
cout << *p;             // truy cập giá trị

int& ref = x;           // tham chiếu
ref = 20;               // x cũng đổi theo
```


---


###  7. OOP & Class (C++17)


```c++
class Person {
public:
    string name;
    int age;

    Person(string n, int a) : name(n), age(a) {}

    void speak() {
        cout << "Hi, I'm " << name << endl;
    }
};

Person p("Alice", 22);
p.speak();
```


---


###  8. Kế thừa & đa hình


```c++
class Animal {
public:
    virtual void speak() {
        cout << "Animal sound\n";
    }
};

class Dog : public Animal {
public:
    void speak() override {
        cout << "Woof\n";
    }
};

Animal* a = new Dog();
a->speak();  // In ra "Woof" nhờ đa hình
```


# Data structure


 1. STACK (Ngăn xếp – LIFO)


```c++
#include <stack>
stack<int> st;

st.push(10);     // thêm vào đỉnh
st.pop();        // xoá phần tử đỉnh
st.top();        // xem phần tử đỉnh
st.empty();      // true nếu rỗng
st.size();       // số phần tử
```


---


2. QUEUE (Hàng đợi – FIFO)


```c++
#include <queue>
queue<int> q;

q.push(1);       // thêm vào đuôi
q.pop();         // xoá đầu hàng đợi
q.front();       // xem phần tử đầu
q.back();        // xem phần tử cuối
q.empty();       // true nếu rỗng
```


---


3. PRIORITY_QUEUE (Hàng đợi ưu tiên – Max Heap mặc định)


```c++
#include <queue>
priority_queue<int> pq;

pq.push(5); pq.push(1); pq.push(10);
pq.top();         // 10 (lớn nhất)
pq.pop();         // xoá phần tử lớn nhất

// Nếu muốn Min Heap:
priority_queue<int, vector<int>, greater<int>> minpq;
```


---


4. DEQUE (Double Ended Queue – thêm/xoá 2 đầu)


```c++
#include <deque>
deque<int> dq;

dq.push_back(3); dq.push_front(1);
dq.pop_back();   dq.pop_front();
dq.front();      dq.back();
dq[0];           // truy cập ngẫu nhiên
```


---


5. SET / MULTISET (Tập hợp – tự sắp xếp, không trùng / có trùng)


```c++
#include <set>
set<int> s;
s.insert(3); s.insert(1); s.insert(3); // chỉ giữ 1 phần tử
s.erase(1);
s.count(3);             // 1 nếu tồn tại
s.find(3);              // iterator đến 3 hoặc s.end()

// multiset cho phép phần tử trùng
multiset<int> ms;
ms.insert(3); ms.insert(3); // giữ cả 2
ms.erase(ms.find(3));      // chỉ xoá 1 cái
```


---


 6. MAP / MULTIMAP (Ánh xạ key → value)


```c++
#include <map>
map<string, int> mp;
mp["alice"] = 10;
mp["bob"] = 20;
mp.at("bob");               // 20
mp.count("alice");          // 1 nếu tồn tại
mp.erase("alice");

for (auto [k, v] : mp) cout << k << ":" << v << "\n";

// multimap cho phép trùng key
```


---


7. UNORDERED_MAP / UNORDERED_SET (Hash Table)


```c++
#include <unordered_map>
unordered_map<string, int> ump; // Hash map – truy cập trung bình O(1)

ump["test"] = 1;
ump.find("test"); // nhanh hơn map nếu không cần sắp xếp
```


---


 8. VECTOR – Như mảng động, linh hoạt


```c++
vector<int> v;
v.push_back(1);
v.pop_back();
v.insert(v.begin() + 1, 100);
v.erase(v.begin() + 1);
```


👉 Thích hợp dùng thay cho mảng nếu cần co giãn kích thước.


---


 9. BITSET (dùng cho bài toán nhị phân hoặc tối ưu bộ nhớ)


```c++
#include <bitset>
bitset<8> b("10101010");

b[0];          // bit thấp nhất
b.count();     // số bit 1
b.any();       // có ít nhất 1 bit là 1
b.none();      // tất cả đều là 0
b.flip();      // đảo bit
```


---


10. LIST (danh sách liên kết đôi – ít dùng hơn deque)


```c++
#include <list>
list<int> l;
l.push_back(1);
l.push_front(2);
l.pop_back();
l.pop_front();
```


---


11. TỰ CÀI ĐẶT TREE / LINKED LIST / GRAPH


C++ STL không hỗ trợ `tree` & `graph` sẵn. Thường bạn sẽ:

- **Tree**: tự tạo struct `Node`, khai báo con trái/phải

	```c++
	struct TreeNode {
	    int val;
	    TreeNode* left;
	    TreeNode* right;
	};
	```

- **Graph**: dùng `vector<vector<int>>` hoặc `unordered_map<int, vector<int>>` để mô phỏng adjacency list

	```c++
	int n = 5;
	vector<vector<int>> adj(n); // đồ thị vô hướng
	
	adj[0].push_back(1);
	adj[1].push_back(0);
	```


Để đáp ứng yêu cầu của bạn, mình sẽ cung cấp một cách **cài đặt đầy đủ các cấu trúc dữ liệu** cho **Tree (Cây nhị phân), Linked List (Danh sách liên kết) và Graph (Đồ thị)**, kèm theo các phép **CRUD** (Create, Read, Update, Delete) và các thuật toán **duyệt** phổ biến như **Pre-order**, **In-order**, **Post-order** cho cây nhị phân và **DFS**, **BFS** cho đồ thị.


### 1. **Cài đặt và Duyệt Binary Tree (Cây nhị phân)**


### Cài đặt Node và cây nhị phân:


```c++
#include <iostream>
#include <queue>
using namespace std;

// Cấu trúc cây nhị phân
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Duyệt Pre-order (Root, Left, Right)
void preorder(TreeNode* root) {
    if (root == nullptr) return;
    cout << root->val << " ";   // Root
    preorder(root->left);       // Left
    preorder(root->right);      // Right
}

// Duyệt In-order (Left, Root, Right)
void inorder(TreeNode* root) {
    if (root == nullptr) return;
    inorder(root->left);        // Left
    cout << root->val << " ";   // Root
    inorder(root->right);       // Right
}

// Duyệt Post-order (Left, Right, Root)
void postorder(TreeNode* root) {
    if (root == nullptr) return;
    postorder(root->left);      // Left
    postorder(root->right);     // Right
    cout << root->val << " ";   // Root
}

// Thêm node vào cây nhị phân
TreeNode* insert(TreeNode* root, int val) {
    if (root == nullptr) {
        return new TreeNode(val);
    }

    if (val < root->val) {
        root->left = insert(root->left, val);
    } else if (val > root->val) {
        root->right = insert(root->right, val);
    }

    return root;
}

// Tìm node có giá trị x trong cây
TreeNode* search(TreeNode* root, int x) {
    if (root == nullptr || root->val == x)
        return root;

    if (x < root->val)
        return search(root->left, x);
    else
        return search(root->right, x);
}

// Xoá node có giá trị x trong cây
TreeNode* deleteNode(TreeNode* root, int x) {
    if (root == nullptr) return root;

    // Nếu x < root->val, tìm trong cây con bên trái
    if (x < root->val)
        root->left = deleteNode(root->left, x);
    // Nếu x > root->val, tìm trong cây con bên phải
    else if (x > root->val)
        root->right = deleteNode(root->right, x);
    else {
        // Nếu node chỉ có một con hoặc không có con
        if (root->left == nullptr) {
            TreeNode* temp = root->right;
            delete root;
            return temp;
        }
        else if (root->right == nullptr) {
            TreeNode* temp = root->left;
            delete root;
            return temp;
        }

        // Nếu node có 2 con, tìm phần tử nhỏ nhất trong cây con bên phải
        TreeNode* temp = root->right;
        while (temp && temp->left != nullptr) temp = temp->left;

        root->val = temp->val;
        root->right = deleteNode(root->right, temp->val);
    }
    return root;
}

int main() {
    TreeNode* root = nullptr;
    root = insert(root, 50);
    root = insert(root, 30);
    root = insert(root, 20);
    root = insert(root, 40);
    root = insert(root, 70);
    root = insert(root, 60);
    root = insert(root, 80);

    cout << "Pre-order: ";
    preorder(root);
    cout << endl;

    cout << "In-order: ";
    inorder(root);
    cout << endl;

    cout << "Post-order: ";
    postorder(root);
    cout << endl;

    cout << "Search 40: " << (search(root, 40) ? "Found" : "Not Found") << endl;

    root = deleteNode(root, 20);
    cout << "In-order after delete 20: ";
    inorder(root);
    cout << endl;
}
```


### 2. **Cài đặt và Duyệt Linked List (Danh sách liên kết)**


### Cài đặt Node và danh sách liên kết:


```c++
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// Thêm node vào đầu danh sách
void insertAtHead(Node*& head, int val) {
    Node* newNode = new Node(val);
    newNode->next = head;
    head = newNode;
}

// Thêm node vào cuối danh sách
void insertAtTail(Node*& head, int val) {
    Node* newNode = new Node(val);
    if (head == nullptr) {
        head = newNode;
        return;
    }
    Node* temp = head;
    while (temp->next) temp = temp->next;
    temp->next = newNode;
}

// Xoá node đầu danh sách
void deleteAtHead(Node*& head) {
    if (head == nullptr) return;
    Node* temp = head;
    head = head->next;
    delete temp;
}

// Duyệt danh sách
void display(Node* head) {
    Node* temp = head;
    while (temp) {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;
}

// Tìm kiếm phần tử trong danh sách
bool search(Node* head, int key) {
    Node* temp = head;
    while (temp) {
        if (temp->data == key) return true;
        temp = temp->next;
    }
    return false;
}

int main() {
    Node* head = nullptr;

    insertAtHead(head, 1);
    insertAtTail(head, 2);
    insertAtTail(head, 3);
    insertAtTail(head, 4);

    cout << "Linked List: ";
    display(head);

    cout << "Search 3: " << (search(head, 3) ? "Found" : "Not Found") << endl;

    deleteAtHead(head);
    cout << "Linked List after deleting head: ";
    display(head);
}
```


### 3. **Cài đặt và Duyệt Graph (Đồ thị)**


### Cài đặt đồ thị sử dụng adjacency list:


```c++
#include <iostream>
#include <vector>
#include <queue>
#include <stack>
using namespace std;

class Graph {
private:
    int V;
    vector<vector<int>> adj;

public:
    Graph(int v) : V(v) {
        adj.resize(v);
    }

    // Thêm cạnh vào đồ thị
    void addEdge(int v, int w) {
        adj[v].push_back(w);
        adj[w].push_back(v); // Vì đồ thị vô hướng
    }

    // Duyệt theo chiều sâu (DFS)
    void DFS(int v) {
        vector<bool> visited(V, false);
        stack<int> s;
        s.push(v);

        while (!s.empty()) {
            int node = s.top();
            s.pop();
            if (!visited[node]) {
                cout << node << " ";
                visited[node] = true;
            }

            for (int neighbor : adj[node]) {
                if (!visited[neighbor]) {
                    s.push(neighbor);
                }
            }
        }
        cout << endl;
    }

    // Duyệt theo chiều rộng (BFS)
    void BFS(int v) {
        vector<bool> visited(V, false);
        queue<int> q;
        q.push(v);
        visited[v] = true;

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            cout << node << " ";

            for (int neighbor : adj[node]) {
                if (!visited[neighbor]) {
                    q.push(neighbor);
                    visited[neighbor] = true;
                }
            }
        }
        cout << endl;
    }
};

int main() {
    Graph g(5);

    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);

    cout << "DFS starting from vertex 0: ";
    g.DFS(0);

    cout << "BFS starting from vertex 0: ";
    g.BFS(0);
}
```

