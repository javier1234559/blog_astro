---
external: false
draft: false
title: "Các prompt tạo ảnh inforphic đẹp"
date: "2026-06-20"
author: "Javier"
slug: "cac-prompt-tao-anh-inforphic-dep"
status: "Published"
readingTime: "7 min read"
---

# TLDR


Các dùng rất đơn giản chỉ cần thay đổi nội dung và chọn style vào template sau → mở 1 chat hoàn toàn mới trên gemini chọn tạo ảnh và paste prompt đầy đủ


![image.png](/images/blog/ee0c4c81fc3606cea4b2e6b9e88c67b4.png)


```json
ROLE

You are an expert educational infographic designer specializing in creating highly memorable, visually structured sketchnotes.



CONTENT

{{CONTENT}}



PROMPT

Transform the content above into this style

{{STYLE_PROMPT}}
```


| Style             | Cảm giác                   | Layout                        | Mức doodle | Phù hợp                                                 |
| ----------------- | -------------------------- | ----------------------------- | ---------- | ------------------------------------------------------- |
| **SketchFrame** ⭐ | Whiteboard + Editorial     | Panel chữ nhật rõ ràng        | Trung bình | Tóm tắt kiến thức, cheat sheet                          |
| **Canvas Notes**  | Notebook cao cấp, tối giản | Panel mềm, nhiều khoảng trắng | Ít         | Tài liệu học, PDF, ghi chú đẹp                          |
| **Marker Atlas**  | Mind map + Sketchnote      | Cụm ý tưởng liên kết tự do    | Nhiều hơn  | Chủ đề có nhiều mối quan hệ, quy trình, tư duy hệ thống |


# SketchFrame Style


![image.png](/images/blog/3d2388fd56da4348469a2a9d136c3a4e.png)


```json
# Overall Design Settings

## Tone

"Hand-drawn, educational, editorial, highly structured, visually engaging, easy to scan, friendly but professional."

---

# Visual Identity

## Background Color

"#F8F6F2" (warm off-white paper)

## Primary Text Color

"#1F1F1F"

## Outline Color

"#111111"

## Highlight Palette

* Mint Green: "#8FCF9C"
* Soft Peach: "#F4B183"
* Coral Red: "#E87A72"
* Pale Yellow: "#F3D97A"
* Soft Blue: "#A9CCE3"
* Light Gray: "#ECECEC"

Use highlights only for labels, headers, emphasis blocks, and key takeaways.

---

# Layout Structure

* Large centered title at the top.
* Content divided into modular rectangular panels.
* Every panel enclosed with thick black borders.
* Panels connected with arrows or connector lines.
* Reading order flows naturally from left-to-right, then top-to-bottom.
* Maintain generous whitespace between sections.

Hierarchy:

* Title
* Major Section Headers
* Supporting Boxes
* Icons
* Short Bullet Points

Avoid long paragraphs.

---

# Illustration Style Features

* Hand-drawn doodle aesthetic.
* Sketch-style stick figures.
* Simple icons.
* Speech bubbles.
* Thought bubbles.
* Flow arrows.
* Minimal decorative elements.

Rendering:

* Flat 2D.
* Marker pen appearance.
* Slight imperfections to simulate real sketching.
* Uneven line weights acceptable.

---

# Typography

## Heading

* Hand-lettered uppercase.
* Bold marker style.
* Black outline.
* Slightly imperfect alignment.

## Body

* Clean handwritten print.
* Short phrases only.
* High readability.
* Monochrome black text.

Avoid serif fonts.

---

# Information Design

Prioritize:

* Lists over paragraphs.
* Callout boxes.
* Numbered sections.
* Comparison blocks.
* Cause → Effect arrows.
* Before / After examples.
* Visual grouping.

Represent every concept visually whenever possible.

---

# Iconography

Preferred icons:

* Person doodles
* Question marks
* Light bulbs
* Documents
* Speech bubbles
* Arrows
* Check marks
* Warning symbols
* Charts
* Magnifying glasses

Icons should be monochrome with thick outlines.

---

# Composition Rules

* Maximum information density without feeling cluttered.
* Each panel communicates exactly one idea.
* Color is only used for emphasis.
* Thick black outlines define all major regions.
* Consistent spacing and alignment throughout.

---

# Categories

Tags:

* Sketchnote
* Whiteboard Infographic
* Hand-drawn
* Educational
* Editorial
* Doodle Style
* Visual Thinking
* Process Map
* Information Design
* Marker Illustration
```


# Canvas Notes


![image.png](/images/blog/d4acd244a767be4928f318bd0c7c2e44.png)


```json
# Overall Design Settings

## Tone

"Minimal hand-drawn, educational, calm, editorial, highly readable, modern notebook aesthetic, clean and thoughtfully organized."

---

# Visual Identity

## Background Color

"#FAF8F4" (soft notebook paper)

## Primary Text Color

"#222222"

## Outline Color

"#222222"

## Highlight Palette

* Sage Green: "#9CC9A3"
* Warm Apricot: "#F2BE8E"
* Dusty Blue: "#AFCFE8"
* Butter Yellow: "#F6E08A"
* Soft Gray: "#EAEAEA"

Use colors sparingly for labels, highlights, and section titles.

---

# Layout Structure

* Large centered title.
* Rounded rectangular modules with medium-weight outlines.
* Spacious grid layout.
* Limited connector arrows.
* Clear visual breathing room.
* Left-to-right and top-to-bottom reading flow.

Hierarchy:

* Title
* Main Topics
* Supporting Cards
* Icons
* Bullet Lists

Avoid visual clutter.

---

# Illustration Style Features

* Soft hand-drawn notebook aesthetic.
* Minimal doodles.
* Small supporting icons.
* Light sketch annotations.
* Occasional arrows.
* Very limited decorative elements.

Rendering:

* Flat 2D.
* Fine marker strokes.
* Subtle imperfections.
* Consistent line quality.

---

# Typography

## Heading

* Bold handwritten uppercase.
* Slight marker texture.
* Clean alignment.

## Body

* Neat handwritten print.
* Short concise phrases.
* Excellent readability.

Avoid serif fonts.

---

# Information Design

Prioritize:

* Bullet lists.
* Compact callout cards.
* Small comparison layouts.
* Sequential numbering.
* Visual grouping.
* Key takeaway boxes.

Prefer clarity over density.

---

# Iconography

Preferred icons:

* Simple people
* Books
* Notes
* Arrows
* Check marks
* Magnifying glasses
* Documents
* Light bulbs

Icons should remain monochrome and minimal.

---

# Composition Rules

* Balanced whitespace.
* Moderate information density.
* Every module contains one focused concept.
* Accent colors remain secondary.
* Consistent margins and alignment.

---

# Categories

Tags:

* Notebook Style
* Minimal Sketchnote
* Educational
* Editorial
* Hand-drawn
* Study Notes
* Information Design
* Clean Doodle
* Marker Illustration
```


# Marker Atlas


![image.png](/images/blog/640891fc1bf1b7479bfe7bccf1ef8940.png)


```json
# Marker Atlas

# Overall Design Settings

## Tone

"Expressive hand-drawn, educational, editorial, visually connected, idea-driven, engaging, structured but organic."

---

# Visual Identity

## Background Color

"#F8F6F2"

## Primary Text Color

"#1F1F1F"

## Outline Color

"#111111"

## Highlight Palette

* Mint Green: "#8FCF9C"
* Coral Red: "#E87A72"
* Pale Yellow: "#F3D97A"
* Soft Blue: "#A9CCE3"
* Lavender Gray: "#D8D5E8"

Use colors only to reinforce relationships and emphasize concepts.

---

# Layout Structure

* Prominent centered title.
* Mixed panel and cluster layout.
* Major concepts grouped into visual islands.
* Rich network of arrows and connectors.
* Cause-and-effect paths clearly illustrated.
* Reading flow remains intuitive while allowing exploration.

Hierarchy:

* Title
* Core Concepts
* Relationship Clusters
* Supporting Notes
* Icons
* Short Labels

Avoid long paragraphs.

---

# Illustration Style Features

* Dynamic sketchnote aesthetic.
* Marker-drawn diagrams.
* Doodle figures.
* Callout bubbles.
* Flow arrows.
* Mind-map inspired connectors.
* Minimal decorative fillers.

Rendering:

* Flat 2D.
* Marker pen texture.
* Natural imperfections.
* Slightly varied line weights.

---

# Typography

## Heading

* Bold uppercase marker lettering.
* Slightly uneven placement.
* Thick outline.

## Body

* Clean handwritten style.
* Compact wording.
* High legibility.

Avoid serif fonts.

---

# Information Design

Prioritize:

* Relationship maps.
* Cause → Effect flows.
* Comparison blocks.
* Step-by-step sequences.
* Before / After visuals.
* Clustered information.
* Visual memory cues.

Represent links between concepts whenever possible.

---

# Iconography

Preferred icons:

* People
* Light bulbs
* Question marks
* Documents
* Charts
* Check marks
* Warning symbols
* Magnifying glasses
* Arrows
* Speech bubbles

Icons should be monochrome with bold outlines.

---

# Composition Rules

* High information density without chaos.
* Visual pathways guide the reader naturally.
* Each cluster represents one major idea.
* Colors emphasize relationships, not decoration.
* Consistent spacing and visual rhythm throughout.

---

# Categories

Tags:

* Sketchnote
* Visual Thinking
* Mind Map
* Whiteboard Infographic
* Hand-drawn
* Educational
* Editorial
* Process Mapping
* Information Design
* Marker Illustration
```

