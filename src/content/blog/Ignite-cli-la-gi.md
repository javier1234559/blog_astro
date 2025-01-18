---
external: false
draft: false
title: Ignite CLI là gì?
description: Tìm hiểu về Ignite CLI - công cụ phát triển nhanh blockchain ứng dụng dựa trên Cosmos SDK.
date: 2022-11-22
hashtags: ['blockchain']
---

```js title="my-test-file.js"
console.log('Title attribute example')
```

```html
<!-- src/content/index.html -->
<div>File name comment example</div>
```

- **Ignite CLI** (trước đây gọi là Starport) là một công cụ dòng lệnh (**CLI**) hỗ trợ phát triển nhanh các blockchain ứng dụng dựa trên **Cosmos SDK**.
- Nó cung cấp một môi trường scaffold mạnh mẽ, giúp nhà phát triển tập trung vào logic ứng dụng mà không cần lo lắng quá nhiều về cấu trúc cơ bản của blockchain.
- Ignite CLI bổ sung và cải tiến CLI mặc định của Cosmos SDK, giúp tự động hóa nhiều quy trình phát triển.

---

### **Các tính năng nổi bật của Ignite CLI**

1. **Scaffold nhanh**:
    - Tạo nhanh một blockchain mới hoặc các module bên trong blockchain.
    - Tích hợp cấu trúc sẵn sàng để phát triển.
2. **Quản lý code tự động**:
    - Tự động tạo các file liên quan đến module, message, query.
    - Quản lý cấu trúc blockchain theo chuẩn Cosmos SDK.
3. **Tích hợp phát triển**:
    - Hỗ trợ **hot reload** khi phát triển blockchain.
    - Chạy node blockchain và kết nối với mạng cục bộ.
4. **Tương thích với Cosmos SDK**:
    - Dựa trên cấu trúc và khả năng mở rộng của Cosmos SDK.
    - Hỗ trợ tương tác với các module chuẩn như `bank`, `auth`, `staking`, v.v.
5. **Công cụ CLI đơn giản**:
    - Cung cấp các lệnh dễ sử dụng để scaffold module, message, query.
6. **Tích hợp gRPC và REST API**:
    - Tự động mở các endpoint API để dễ dàng tích hợp với các ứng dụng front-end.

---

### **Các lệnh thường gặp trong Ignite CLI**

### **1. Scaffold blockchain**

Tạo một dự án blockchain mới.

```bash
ignite scaffold chain <tên_blockchain>
```

### **2. Scaffold module**

Tạo một module mới trong blockchain.

```bash
ignite scaffold module <tên_module>
```

### **3. Scaffold message**

Thêm một message để xử lý logic giao dịch trong blockchain.

```bash
ignite scaffold message <tên_message> <tham_số_1> <tham_số_2> ...
```

Ví dụ:

```bash
ignite scaffold message say-hello name
```

### **4. Scaffold query**

Thêm một query để lấy dữ liệu từ blockchain.

```bash
ignite scaffold query <tên_query> <tham_số>
```

Ví dụ:

```bash
ignite scaffold query get-hello name
```

### **5. Chạy blockchain**

Build và khởi chạy node blockchain cục bộ.

```bash
ignite chain serve
```

### **6. Thêm giao diện người dùng**

Tích hợp front-end UI cho blockchain (nếu có).

```bash
ignite scaffold vuex
```

### **7. Kiểm tra phiên bản**

Xem phiên bản Ignite CLI đang sử dụng.

```bash
ignite version
```

### **8. Thêm các thành phần khác**

- **Scaffold type**: Thêm type tùy chỉnh.
    
    ```bash
    ignite scaffold type <tên_type> <field_1> <field_2>
    ```
    
- **Scaffold event**: Tạo event để phát hành sự kiện trong blockchain.
    
    ```bash
    ignite scaffold event <tên_event>
    ```
    

# Cấu trúc thư mục Cosmos SDK

### **1. `/app`**

- Đây là thư mục chứa tệp **entry point chính** của blockchain.
- File quan trọng nhất: `app.go`.

### **`app.go`**

- Định nghĩa **cấu trúc của ứng dụng blockchain**.
- Các thành phần chính trong `app.go`:
    - **Module Manager**: Quản lý các module (auth, bank, staking, etc.).
    - **Codec**: Định nghĩa cách mã hóa và giải mã dữ liệu.
    - **Routing**: Xác định logic xử lý giao dịch (gửi, staking, voting).
    - **BeginBlocker & EndBlocker**: Logic chạy ở đầu và cuối mỗi khối.
    - **Genesis State**: Định nghĩa trạng thái khởi tạo của blockchain.

### **Ví dụ code** (một phần của `app.go`):

```go
func NewApp(...) *App {
    // Khởi tạo codec
    codec := MakeCodec()

    // Module Manager quản lý module
    moduleManager := module.NewManager(
        auth.NewAppModule(...),
        bank.NewAppModule(...),
        staking.NewAppModule(...),
    )

    // Router định tuyến giao dịch
    router := baseapp.NewRouter()
    router.AddRoute(bank.RouterKey, bankHandler)

    return &App{
        BaseApp: baseapp.NewBaseApp(...),
        Codec:   codec,
        ModuleManager: moduleManager,
    }

```

---

### **2. `/cmd`**

- Chứa các lệnh CLI để chạy và quản lý blockchain.

### Các tệp chính:

1. **`main.go`**:
    - Entry point khởi động ứng dụng.
    - Chứa hàm `main()` để chạy node blockchain hoặc client CLI.
    
    **Ví dụ**:
    
    ```go
    func main() {
        rootCmd := cmd.NewRootCmd()
        if err := rootCmd.Execute(); err != nil {
            os.Exit(1)
        }
    }
    
    ```
    
2. **`root.go`**:
    - Định nghĩa các lệnh chính (CLI command), ví dụ:
        - `start`: Chạy node blockchain.
        - `init`: Khởi tạo chain với tệp `genesis.json`.
        - `keys`: Quản lý tài khoản và khóa cá nhân.
        - `query`: Truy vấn dữ liệu blockchain.

---

### **3. `/x`**

- Thư mục **module** – phần quan trọng nhất để mở rộng blockchain.
- Các module chứa logic riêng (gửi tiền, staking, governance, v.v.).
- **`/x/<module_name>`**: Mỗi module có cấu trúc riêng.

### Cấu trúc thư mục module:

```
/x/<module_name>
    ├── keeper/
    │   └── keeper.go     // Logic xử lý dữ liệu của module
    ├── types/
    │   ├── keys.go       // Định nghĩa các khóa dữ liệu
    │   ├── messages.go   // Định nghĩa các loại message (Msg)
    │   └── params.go     // Tham số module (config)
    ├── genesis.go        // Logic khởi tạo module
    ├── handler.go        // Xử lý transaction (Msg)
    ├── module.go         // Đăng ký module vào Cosmos SDK
    └── query.proto       // API gRPC để query dữ liệu
```

### **Chức năng từng file trong một module:**

- **`keeper/keeper.go`**:
    - Chứa các hàm để đọc/ghi dữ liệu từ bộ nhớ blockchain (store).
    - Keeper giống như "bộ quản lý" dữ liệu.
    
    **Ví dụ**:
    
    ```go
    func (k Keeper) GetBalance(ctx sdk.Context, addr sdk.AccAddress) sdk.Coin {
        return k.store.GetBalance(addr)
    }
    ```
    
- **`types/`**:
    - Chứa định nghĩa các kiểu dữ liệu, thông báo (Msg), và tham số của module.
    - **Msg**: Các giao dịch trong module.
    - **Params**: Các cấu hình, ví dụ như phí giao dịch tối thiểu.
- **`genesis.go`**:
    - Định nghĩa trạng thái ban đầu khi blockchain khởi chạy (Genesis State).
- **`module.go`**:
    - Giao diện giữa module và Cosmos SDK.
    - Xác định các hàm như:
        - `InitGenesis`: Khởi tạo trạng thái ban đầu.
        - `ExportGenesis`: Lưu trạng thái để khởi động lại chain.
- **`handler.go`**:
    - Logic xử lý các giao dịch của module (MsgHandler).

---

### **4. `/config`**

- Chứa các tệp cấu hình blockchain.
- **Các file quan trọng**:
    - `app.toml`: Cấu hình node (đồng thuận, tốc độ khối, etc.).
    - `config.toml`: Cấu hình mạng (cổng giao tiếp, P2P).
    - `genesis.json`: Trạng thái ban đầu của blockchain.

---

### **5. `/proto`**

- Định nghĩa các tệp **Protocol Buffers (protobuf)** để sinh code cho gRPC và REST API.
- Các file `.proto` mô tả cấu trúc dữ liệu, request, và response của blockchain.

---

### **6. `/testutil`**

- Chứa các tiện ích để kiểm thử blockchain.
- Gồm các test case (unit test, integration test) cho module.

---

### **7. `/scripts`**

- Chứa các script tiện ích, ví dụ:
    - Script khởi tạo node (localnet).
    - Script để reset trạng thái blockchain.

---

### **8. `/docs`**

- Chứa tài liệu về dự án, mô tả cách sử dụng và mở rộng blockchain.

---

### **Tóm tắt vai trò của từng thư mục**

| Thư mục | Chức năng |
| --- | --- |
| `/app` | Entry point và cấu trúc chính của blockchain. |
| `/cmd` | Các lệnh CLI để quản lý và khởi chạy blockchain. |
| `/x` | Module logic (mở rộng tính năng blockchain). |
| `/config` | Các tệp cấu hình cho node và mạng. |
| `/proto` | Định nghĩa giao diện API (protobuf). |
| `/testutil` | Các tiện ích kiểm thử. |
| `/scripts` | Script tiện ích cho môi trường phát triển. |
| `/docs` | Tài liệu mô tả cách dùng và phát triển blockchain. |

# Một số khái niệm cần biết trong code base Cosmos

# Protobuf là gì ?

💡 Source : https://tvd12.com/posts/protobuf

**Protobuf (Protocol Buffers)** là một cơ chế mã hóa dữ liệu nhị phân (binary) do Google phát triển, dùng để:

1. **Định nghĩa cấu trúc dữ liệu** (message types) và **dịch vụ** (services) trong tệp `.proto`.
2. **Mã hóa dữ liệu** thành dạng nhị phân nhỏ gọn, hiệu suất cao.
3. **Sinh mã nguồn** (code generation) từ tệp `.proto` sang các ngôn ngữ lập trình như Go, Python, Java, v.v.

---

### **Tại sao dùng Protobuf?**

1. **Hiệu suất cao**: Dữ liệu nhị phân nhỏ gọn hơn JSON/XML.
2. **Tính nhất quán**: Kiểm soát kiểu dữ liệu chặt chẽ.
3. **Hỗ trợ đa ngôn ngữ**: Sinh mã nguồn cho nhiều ngôn ngữ.
4. **Tích hợp với gRPC**: Hỗ trợ giao tiếp giữa các dịch vụ.

---

### **Ví dụ**

### 1. **Định nghĩa `.proto`**

Tạo tệp `person.proto`:

```
syntax = "proto3";

message Person {
  string name = 1;
  int32 age = 2;
  repeated string hobbies = 3;
}
```

### 2. **Sinh mã nguồn**

Dùng `protoc` để sinh mã Go:

```
protoc --go_out=. person.proto
```

Kết quả: Tệp `person.pb.go` được sinh ra, chứa struct `Person` trong Go.

`protoc` sẽ sinh ra tệp `person.pb.go` với nội dung như sau (đã rút gọn):

```go
package main

type Person struct {
    Name    string   `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
    Age     int32    `protobuf:"varint,2,opt,name=age,proto3" json:"age,omitempty"`
    Hobbies []string `protobuf:"bytes,3,rep,name=hobbies,proto3" json:"hobbies,omitempty"`
}

func (m *Person) Reset()         { *m = Person{} }
func (m *Person) String() string { return proto.CompactTextString(m) }
func (*Person) ProtoMessage()    {}
```

### 3. **Sử dụng trong Go**

Tạo tệp `main.go`:

```go
package main

import (
    "fmt"
    "log"
    "github.com/golang/protobuf/proto"
    . "./" // Import struct Person từ person.pb.go
)

func main() {
    // Tạo đối tượng Person
    person := &Person{
        Name:    "John",
        Age:     30,
        Hobbies: []string{"Reading", "Swimming"},
    }

    // Mã hóa thành nhị phân
    data, err := proto.Marshal(person)
    if err != nil {
        log.Fatal("Encoding failed:", err)
    }

    // In ra dữ liệu nhị phân (dạng hex)
    fmt.Printf("Encoded data (hex): %x\n", data)

    // Giải mã nhị phân
    newPerson := &Person{}
    err = proto.Unmarshal(data, newPerson)
    if err != nil {
        log.Fatal("Decoding failed:", err)
    }

    // In ra đối tượng đã giải mã
    fmt.Println("Decoded person:", newPerson)
}
```

### **Cấu trúc thư mục**

```
myapp/
├── person.proto
├── person.pb.go
└── main.go
```

### 4. **Chạy ứng dụng**

```
go run main.go person.pb.go
```

---

### **Kết quả**

Khi chạy ứng dụng, kết quả sẽ như sau:

```
Encoded data (hex): 0a044a6f686e101e1a0752656164696e671a085377696d6d696e67
Decoded person: name:"John" age:30 hobbies:"Reading" hobbies:"Swimming"
```

- **Encoded data (hex)**: Dữ liệu nhị phân của đối tượng `Person` đã được mã hóa.
- **Decoded person**: Đối tượng `Person` đã được giải mã từ dữ liệu nhị phân.

---

### **Giải thích chi tiết**

### a. **File `person.pb.go`**

- Được sinh ra từ `person.proto` bằng lệnh `protoc`.
- Chứa định nghĩa struct `Person` và các phương thức cần thiết để làm việc với Protobuf.

### b. **Hàm `proto.Marshal`**

- Mã hóa đối tượng `Person` thành dữ liệu nhị phân.
- Cần file `person.pb.go` để biết cấu trúc của `Person`.

### c. **Hàm `proto.Unmarshal`**

- Giải mã dữ liệu nhị phân thành đối tượng `Person`.
- Cần file `person.pb.go` để biết cách tạo đối tượng `Person`.

# **State Machine Replication (SMR) là gì?**

**State Machine Replication (SMR)** là một kỹ thuật cho phép nhiều bản sao (replicas) của một state machine hoạt động đồng bộ và nhất quán trong một hệ thống phân tán. Mục tiêu chính của SMR là:

1. **Đảm bảo tính nhất quán**: Tất cả các bản sao phải có cùng state sau khi xử lý cùng một chuỗi các sự kiện (events).
2. **Chịu lỗi (Fault Tolerance)**: Hệ thống vẫn hoạt động chính xác ngay cả khi một số bản sao bị lỗi.

---

### **2. Các thành phần chính của State Machine Replication**

### a. **State Machine (Máy trạng thái)**

- Một state machine có thể tồn tại trong một số trạng thái (states) hữu hạn và chuyển đổi giữa các trạng thái dựa trên các sự kiện (events).

### b. **Replicas (Bản sao)**

- Các bản sao là các phiên bản của state machine chạy trên các node khác nhau trong hệ thống phân tán.

### c. **Consensus Algorithm (Thuật toán đồng thuận)**

- Đảm bảo rằng tất cả các bản sao đồng ý về thứ tự các sự kiện (events) và state cuối cùng.

---

### **3. Cách State Machine Replication hoạt động**

### a. **Nhận và xử lý sự kiện**

1. Khi một sự kiện (event) được gửi đến hệ thống, nó sẽ được chuyển đến tất cả các bản sao.
2. Các bản sao sử dụng một **thuật toán đồng thuận** (ví dụ: Tendermint trong Cosmos SDK) để đồng ý về thứ tự của các sự kiện.

### b. **Áp dụng sự kiện vào state machine**

1. Sau khi thứ tự các sự kiện được xác định, mỗi bản sao sẽ áp dụng các sự kiện vào state machine của nó.
2. Vì tất cả các bản sao nhận cùng một chuỗi sự kiện và áp dụng chúng theo cùng một thứ tự, state của chúng sẽ luôn nhất quán.

### c. **Chịu lỗi**

- Nếu một số bản sao bị lỗi, các bản sao còn lại vẫn có thể tiếp tục hoạt động và duy trì tính nhất quán của hệ thống.

---

### **4. Ví dụ về State Machine Replication**

Giả sử bạn có một hệ thống với 3 bản sao (Replica A, Replica B, Replica C) và một state machine quản lý số dư tài khoản.

### a. **State ban đầu**

- Tài khoản X: 100 token
- Tài khoản Y: 50 token

### b. **Sự kiện**

- X gửi 10 token cho Y.

### c. **Xử lý sự kiện**

1. Sự kiện được gửi đến tất cả các bản sao.
2. Các bản sao sử dụng thuật toán đồng thuận để đồng ý về thứ tự của sự kiện.
3. Mỗi bản sao áp dụng sự kiện vào state machine của nó:
    - Trừ 10 token từ tài khoản X.
    - Cộng 10 token vào tài khoản Y.

### d. **State mới**

- Tài khoản X: 90 token
- Tài khoản Y: 60 token

---

### **5. State Machine Replication trong Blockchain**

Blockchain là một ứng dụng điển hình của State Machine Replication:

- **State**: Dữ liệu hiện tại của blockchain (ví dụ: số dư tài khoản, hợp đồng thông minh).
- **Transactions**: Các sự kiện làm thay đổi state.
- **Consensus Algorithm**: Đảm bảo rằng tất cả các node đồng ý về thứ tự của các transactions.

### Ví dụ trong Cosmos SDK:

- **Tendermint**: Thuật toán đồng thuận được sử dụng trong Cosmos SDK để đảm bảo rằng tất cả các node đồng ý về thứ tự của các transactions.
- **Modules**: Mỗi module (ví dụ: `bank`, `staking`) là một state machine độc lập, được quản lý bởi các Keepers.

---

### **6. Ví dụ cụ thể trong Cosmos SDK**

Giả sử bạn có một blockchain với module `bank` để quản lý số dư tài khoản.

### a. **State ban đầu**

- Tài khoản A: 100 token
- Tài khoản B: 50 token

### b. **Transaction**

- A gửi 10 token cho B.

### c. **Xử lý transaction**

1. Transaction được gửi đến blockchain.
2. Tendermint Core sử dụng thuật toán đồng thuận để đồng ý về thứ tự của transaction.
3. Transaction được áp dụng vào state machine:
    - Handler của module `bank` gọi Keeper để cập nhật state.
    - Keeper trừ 10 token từ tài khoản A và cộng 10 token vào tài khoản B.

### d. **State mới**

- Tài khoản A: 90 token
- Tài khoản B: 60 token

---

### **7. Tóm lại**

- **State Machine Replication (SMR)** là một kỹ thuật để đảm bảo rằng nhiều bản sao của một state machine có thể duy trì trạng thái nhất quán trong hệ thống phân tán.
- Trong blockchain, SMR được sử dụng để đảm bảo rằng tất cả các node đồng ý về thứ tự của các transactions và state cuối cùng.
- **Cosmos SDK** sử dụng SMR kết hợp với thuật toán đồng thuận Tendermint để xây dựng các ứng dụng blockchain an toàn và nhất quán.

# **Các module mặc định của Cosmos SDK**

Cosmos SDK cung cấp nhiều **module mặc định** để xây dựng các ứng dụng blockchain. Dưới đây là một số module quan trọng:

### **3.1. `auth`**

- **Chức năng**: Quản lý tài khoản và xác thực giao dịch.
- **Chi tiết**:
    - Định nghĩa cấu trúc tài khoản (`BaseAccount`).
    - Xác thực chữ ký và quản lý phí giao dịch.

### **3.2. `bank`**

- **Chức năng**: Quản lý số dư token và chuyển token giữa các tài khoản.
- **Chi tiết**:
    - Cung cấp các message types như `MsgSend`, `MsgMultiSend`.
    - Quản lý tổng cung token.

### **3.3. `staking`**

- **Chức năng**: Quản lý staking (đặt cọc) và validators.
- **Chi tiết**:
    - Cho phép người dùng stake token để trở thành validator.
    - Quản lý phần thưởng và phạt (slashing) cho validators.

### **3.4. `distribution`**

- **Chức năng**: Quản lý phân phối phần thưởng từ staking và phí giao dịch.
- **Chi tiết**:
    - Phân phối phần thưởng cho validators và delegators.
    - Quản lý quỹ cộng đồng (community pool).

### **3.5. `gov`**

- **Chức năng**: Quản lý quản trị on-chain (on-chain governance).
- **Chi tiết**:
    - Cho phép người dùng đề xuất và bỏ phiếu cho các thay đổi trên blockchain.
    - Quản lý các đề xuất và kết quả bỏ phiếu.

### **3.6. `mint`**

- **Chức năng**: Quản lý việc đúc (mint) token mới.
- **Chi tiết**:
    - Đúc token mới dựa trên các quy tắc lạm phát được định nghĩa trước.
    - Phân phối token mới cho các validators và delegators.

### **3.7. `params`**

- **Chức năng**: Quản lý các tham số (parameters) của blockchain.
- **Chi tiết**:
    - Cho phép thay đổi các tham số như phí giao dịch, tỷ lệ lạm phát, v.v.

### **3.8. `crisis`**

- **Chức năng**: Phát hiện và xử lý các tình huống khủng hoảng (crisis) trên blockchain.
- **Chi tiết**:
    - Cung cấp cơ chế để phát hiện và xử lý các lỗi nghiêm trọng.

### **3.9. `evidence`**

- **Chức năng**: Quản lý các bằng chứng (evidence) về hành vi xấu của validators.
- **Chi tiết**:
    - Xử lý các bằng chứng như double-sign và phạt validators vi phạm.

### **3.10. `upgrade`**

- **Chức năng**: Quản lý nâng cấp (upgrade) blockchain.
- **Chi tiết**:
    - Cho phép nâng cấp phần mềm blockchain mà không cần hard fork.

# **Các bước tạo một module mới trong Cosmos SDK**