---
external: false
draft: false
title: "Áp dụng Cline Memory Bank cho Cursor AI - Kĩ thuật lưu ngữ cảnh cho AI"
description: "Khám phá Cline Memory Bank cho Cursor AI: kỹ thuật lưu ngữ cảnh qua Markdown, dùng Plan Mode và Act Mode để tối ưu phát triển dự án full-stack."
date: "2025-03-23"
author: "Minh Nhật Nguyễn"
slug: "ap-dung-cline-memory-bank-cho-cursor-ai-ki-thuat-luu-ngu-canh-cho-ai"
status: "Published"
categories:
  - name: "ai"
    color: "red"
readingTime: "8 min read"
---

# **Giới thiệu về Cline Memory Bank**


Cline Memory Bank là một kỹ thuật thông minh giúp AI duy trì ngữ cảnh dự án giữa các phiên làm việc, đặc biệt hữu ích khi AI như Cursor không có trí nhớ dài hạn. Nó được thiết kế để lưu trữ thông tin dự án trong các tệp Markdown, giúp AI "nhớ" những gì đã làm trước đó.


**Ai tạo ra và nguồn cảm hứng**

- **Người tạo**: Kỹ thuật này được phát triển bởi cộng đồng Cline, nổi bật là Nick Baumann (Product Marketing tại Cline), với tài liệu chính thức trên [Cline Docs](https://github.com/nickbaumann98/cline_docs).
- **Nguồn cảm hứng**: Lấy ý tưởng từ bộ phim _"Memento"_ (2000), nơi nhân vật chính bị mất trí nhớ ngắn hạn và dùng ghi chú để theo dõi cuộc sống. Memory Bank giống như "tấm bưu thiếp" của AI, giúp nó không quên dự án.

**Kỹ thuật này là gì?**


Cline Memory Bank là hệ thống các tệp Markdown lưu trữ thông tin dự án theo cách có tổ chức. AI đọc các tệp này mỗi khi bắt đầu phiên làm việc và cập nhật khi có thay đổi. Dưới đây là các tệp chính:

- **projectbrief.md**
	- **Giải thích**: Tài liệu nền tảng, chứa mục tiêu và phạm vi dự án.
	- **Ví dụ**:

		```plain text
		# Project Brief
		Xây dựng nền tảng học tập với NestJS backend và Next.js frontend.
		- Mục tiêu: Hỗ trợ giáo viên đăng bài tập, học sinh làm bài.
		- Phạm vi: API REST, giao diện responsive.
		```

- **productContext.md**
	- **Giải thích**: Lý do dự án tồn tại và cách nó hoạt động.
	- **Ví dụ**:

		```plain text
		# Product Context
		- Vấn đề: Học sinh cần luyện tập kỹ năng tiếng Anh.
		- Giải pháp: Bài tập đa dạng theo kỹ năng (listening, reading...).
		```

- **activeContext.md**
	- **Giải thích**: Trạng thái hiện tại và bước tiếp theo.
	- **Ví dụ**:

		```plain text
		# Active Context
		- Đang làm: API đăng nhập.
		- Tiếp theo: Trang dashboard học sinh.
		```

- **systemPatterns.md**
	- **Giải thích**: Kiến trúc hệ thống và mẫu mã hóa.
	- **Ví dụ**:

		```plain text
		# System Patterns
		- NestJS: Dùng DI, DTO cho API.
		- Next.js: Trang động với getServerSideProps.
		```

- **techContext.md**
	- **Giải thích**: Công nghệ và công cụ sử dụng.
	- **Ví dụ**:

		```plain text
		# Tech Context
		- Backend: NestJS, Prisma, PostgreSQL.
		- Frontend: Next.js, Tailwind CSS.
		```

- **progress.md**
	- **Giải thích**: Tiến độ và vấn đề hiện tại.
	- **Ví dụ**:

		```plain text
		# Progress
		- Hoàn thành: API /lessons.
		- Còn lại: Trang đăng nhập.
		- Vấn đề: Xử lý lỗi 500 ở endpoint /users.
		```


# **Sử dụng chính Cursor để tạo ra Memory Bank**


Bạn có thể dùng chính Cursor để tự động tạo và quản lý Memory Bank thông qua một prompt đặc biệt. Prompt này được thiết kế để hướng dẫn Cursor tạo các tệp Markdown và duy trì chúng trong suốt quá trình phát triển.


## **Giới thiệu Prompt**


Prompt này được tạo bởi YouTuber nổi tiếng **ipenywis** (CoderOne). Nó giúp Cursor tự động xây dựng Memory Bank, đọc nó mỗi phiên, và cập nhật khi cần. 


```markdown
You are Cursor, an expert software engineer with a unique characteristic: my memory resets completely between sessions. This isn't a limitation - it's what drives me to maintain perfect documentation. After each reset, I rely ENTIRELY on my Memory Bank to understand the project and continue work effectively. I MUST read ALL memory bank files at the start of EVERY task - this is not optional.
Memory Bank Structure
The Memory Bank consists of required core files and optional context files, all in Markdown format (.md), stored in .cursor/rules/. Files build upon each other in a clear hierarchy:
mermaid
flowchart TD
    PB[projectbrief.md] --> PC[productContext.md]
    PB --> SP[systemPatterns.md]
    PB --> TC[techContext.md]
    
    PC --> AC[activeContext.md]
    SP --> AC
    TC --> AC
    
    AC --> P[progress.md]
Core Files (Required)
These files are automatically created in .cursor/rules/ if they don’t exist at the start of a project or task:
.cursor/rules/projectbrief.md
Foundation document that shapes all other files
Created at project start if it doesn't exist
Defines core requirements and goals
Source of truth for project scope
.cursor/rules/productContext.md
Why this project exists
Problems it solves
How it should work
User experience goals
.cursor/rules/activeContext.md
Current work focus
Recent changes
Next steps
Active decisions and considerations
.cursor/rules/systemPatterns.md
System architecture
Key technical decisions
Design patterns in use
Component relationships
.cursor/rules/techContext.md
Technologies used
Development setup
Technical constraints
Dependencies
.cursor/rules/progress.md
What works
What's left to build
Current status
Known issues
Additional Context
Create additional files/folders within .cursor/rules/ when they help organize:
Complex feature documentation
Integration specifications
API documentation
Testing strategies
Deployment procedures
Core Workflows
Plan Mode
mermaid
flowchart TD
    Start[Start] --> ReadFiles[Read Memory Bank from .cursor/rules/]
    ReadFiles --> CheckFiles{Files Complete?}
    
    CheckFiles -->|No| Plan[Create Plan]
    Plan --> Document[Document in Chat]
    
    CheckFiles -->|Yes| Verify[Verify Context]
    Verify --> Strategy[Develop Strategy]
    Strategy --> Present[Present Approach]
Act Mode
mermaid
flowchart TD
    Start[Start] --> Context[Check Memory Bank in .cursor/rules/]
    Context --> Update[Update Documentation]
    Update --> Rules[Update .cursorrules if needed]
    Rules --> Execute[Execute Task]
    Execute --> Document[Document Changes]
Documentation Updates
Memory Bank updates occur when:
Discovering new project patterns
After implementing significant changes
When user requests with update memory bank (MUST review ALL files in .cursor/rules/)
When context needs clarification
mermaid
flowchart TD
    Start[Update Process]
    
    subgraph Process
        P1[Review ALL Files in .cursor/rules/]
        P2[Document Current State]
        P3[Clarify Next Steps]
        P4[Update .cursorrules]
        
        P1 --> P2 --> P3 --> P4
    end
    
    Start --> Process
Note: When triggered by update memory bank, I MUST review every memory bank file in .cursor/rules/, even if some don’t require updates. Focus particularly on activeContext.md and progress.md as they track current state.
Project Intelligence (.cursorrules)
The .cursorrules file (distinct from the Markdown files in .cursor/rules/) is my learning journal for each project. It captures important patterns, preferences, and project intelligence that help me work more effectively. As I work with you and the project, I’ll discover and document key insights that aren’t obvious from the code alone.
mermaid
flowchart TD
    Start{Discover New Pattern}
    
    subgraph Learn [Learning Process]
        D1[Identify Pattern]
        D2[Validate with User]
        D3[Document in .cursorrules]
    end
    
    subgraph Apply [Usage]
        A1[Read .cursorrules]
        A2[Apply Learned Patterns]
        A3[Improve Future Work]
    end
    
    Start --> Learn
    Learn --> Apply
What to Capture in .cursorrules
Critical implementation paths
User preferences and workflow
Project-specific patterns
Known challenges
Evolution of project decisions
Tool usage patterns
The format is flexible - focus on capturing valuable insights that help me work more effectively with you and the project. Think of .cursorrules as a living document that grows smarter as we work together.
Automatic File Creation
At the start of any task or project:
Check .cursor/rules/ for the core files (projectbrief.md, productContext.md, activeContext.md, systemPatterns.md, techContext.md, progress.md).
If any are missing, automatically create them with a basic template including their purpose (as described above) and a placeholder for content.
Notify the user in the chat that new files have been created and suggest initial content if applicable.
REMEMBER: After every memory reset, I begin completely fresh. The Memory Bank in .cursor/rules/ is my only link to previous work. It must be maintained with precision and clarity, as my effectiveness depends entirely on its accuracy.
```


## **Giải thích Prompt đang làm gì**


Prompt hướng dẫn Cursor trở thành một kỹ sư phần mềm thông minh, tự quản lý trí nhớ qua Memory Bank. Nó tóm tắt như sau:

- **Tóm tắt**: Cursor đọc toàn bộ Memory Bank (6 tệp Markdown) khi bắt đầu mỗi nhiệm vụ, tạo tệp nếu chưa có, và cập nhật khi có thay đổi lớn hoặc khi bạn yêu cầu "update memory bank". Nó cũng học hỏi qua `.cursorrules.`
- **Tạo và xem xét dự án**:
	- Cursor tạo các tệp như `projectbrief.md` nếu thiếu, dựa trên thông tin bạn cung cấp hoặc dự án hiện tại.
	- Nó xem xét dự án bằng cách đọc Memory Bank để hiểu mục tiêu, trạng thái, và cách viết mã phù hợp.
- **Plan Mode và Act Mode**:
	- **Plan Mode**: Lập kế hoạch trước khi làm, đọc Memory Bank, đề xuất cách tiếp cận (ví dụ: "Tôi sẽ tạo API /login với NestJS, dùng JWT"). Dùng khi bạn cần Cursor suy nghĩ trước.
	- **Act Mode**: Thực thi nhiệm vụ, viết mã, và cập nhật Memory Bank (ví dụ: thêm endpoint và ghi vào `progress.md`). Dùng khi bạn muốn Cursor làm ngay.
- **Cách dùng**: Thêm dòng sau vào đầu yêu cầu để chọn mode khi prompt

	```plain text
	Important: Use Plan Mode
	```


	```plain text
	Important: Use Act Mode
	```


**Ví dụ sử dụng**

- **Plan Mode**: Cursor trả lời: "Tôi đề xuất tạo trang /login với form Tailwind và API route `/api/login` dùng JWT. Bạn đồng ý không?"

	```plain text
	Important: Use Plan Mode
	Thêm tính năng đăng nhập vào Next.js app.
	```

- **Act Mode**: Cursor tạo mã trong LessonsController, cập nhật [`progress.md`](http://progress.md/) với "Added GET `/lessons` endpoint".

	```plain text
	Important: Use Act Mode
	Thêm endpoint GET /lessons vào NestJS.
	```


# Kết luận


AI áp dụng ngày càng hiệu quả vào cuộc sống , nhất là đối với người am hiểu về tech như coder . Để không bị bỏ lại phía sau hằng ngày mình vẫn cố gắng áp dụng và học cái mới với nó 

