# Competitive Analysis — BJT Master
> Phase 0 Deliverable | Created: 2026-05-10

---

## 1. Tổng quan thị trường

| Khoảng trống | Mô tả |
|---|---|
| **Không có app chuyên BJT** | Tất cả app lớn đang tập trung JLPT — đây là blue ocean |
| **Keigo thực chiến thiếu** | Hầu hết app dạy keigo lý thuyết, không có drill theo tình huống kinh doanh |
| **Mock test BJT không có** | Không app nào có full mock 105 phút chuẩn format BJT |
| **Business context nông** | Vocab "thương mại" nhưng ví dụ vẫn là JLPT-style, không phải cuộc họp/email thật |

---

## 2. Phân tích 6 app benchmark

### 2.1. Bunpro
| | |
|---|---|
| **Nền tảng** | Web + iOS + Android |
| **Giá** | $4/tháng hoặc $30/năm |
| **MAU** | ~50,000 |
| **Core mechanic** | Grammar SRS theo JLPT level N5→N1 |

**✅ Học từ Bunpro:**
- SRS grammar cực kỳ hiệu quả — user gắn kết cao
- Progress path rõ ràng theo level
- AI explain đáp án khi sai (GPT-4 powered)
- Cue → Japanese sentence, không dùng romaji

**❌ Điểm yếu Bunpro:**
- UI đơn điệu, thiếu gamification
- Không có listening
- Không có mock test
- Grammar thuần JLPT, không có business context

**→ BJT Master lấy**: SRS grammar drill + AI explain. Cải thiện: business context + gamification.

---

### 2.2. WaniKani
| | |
|---|---|
| **Nền tảng** | Web + iOS + Android |
| **Giá** | $9/tháng hoặc $89/năm |
| **MAU** | ~200,000 |
| **Core mechanic** | Radical → Kanji → Vocab, 60 level |

**✅ Học từ WaniKani:**
- Mnemonic learning cực kỳ memorable
- Gamification nhẹ nhàng (level up, community)
- Content quality rất cao, curated kỹ
- Review session UX mượt mà

**❌ Điểm yếu WaniKani:**
- Chỉ kanji/vocab, không có grammar/listening/business
- Không liên quan trực tiếp BJT
- Rigid level order — không skip được

**→ BJT Master lấy**: Mnemonic cho keigo (ví dụ: visual trick nhớ 謙譲語Ⅱ vs Ⅰ). Review session UX.

---

### 2.3. Renshuu
| | |
|---|---|
| **Nền tảng** | iOS + Android |
| **Giá** | Free + Premium $6/tháng |
| **MAU** | ~300,000 |
| **Core mechanic** | All-in-one: vocab + grammar + kanji + listening + reading |

**✅ Học từ Renshuu:**
- All-in-one nhất thị trường — user không cần app khác
- Gamification dễ thương (avatar, shrine, crops)
- Community features (forums, study together)
- Cực kỳ nhiều nội dung, flexible

**❌ Điểm yếu Renshuu:**
- UI rối, onboarding phức tạp — new user confused
- Settings quá nhiều → decision fatigue
- Nội dung JLPT, không có BJT/business

**→ BJT Master lấy**: All-in-one approach + nhẹ gamification. Cải thiện: UI đơn giản hơn nhiều.

---

### 2.4. JLPTLord
| | |
|---|---|
| **Nền tảng** | iOS + Android |
| **Giá** | Free + $3/tháng |
| **MAU** | ~100,000 |
| **Core mechanic** | SRS aligned chính xác theo JLPT level, quiz-heavy |

**✅ Học từ JLPTLord:**
- Level tagging chuẩn, user tin tưởng
- Quiz format đơn giản → dễ dùng mỗi ngày
- Load nhanh, offline tốt
- Giá rẻ nhất thị trường

**❌ Điểm yếu JLPTLord:**
- Không có grammar sâu, không có listening
- UI minimal nhưng quá đơn giản (nhàm)
- Không có mock test
- Không có business context

**→ BJT Master lấy**: Level tagging rõ ràng (J5→J1+). Quiz-heavy daily session.

---

### 2.5. Duolingo Max
| | |
|---|---|
| **Nền tảng** | iOS + Android + Web |
| **Giá** | Free + $13/tháng (Max) |
| **MAU** | ~500M total (Japanese course ~20M) |
| **Core mechanic** | Gamification + AI roleplay (Max tier) |

**✅ Học từ Duolingo:**
- Gamification #1 thị trường — streak, hearts, gems, leagues
- AI roleplay (Duolingo Max) cực kỳ engaging
- Onboarding 5 sao — user set goal ngay từ đầu
- Notifications convert cực tốt

**❌ Điểm yếu Duolingo:**
- Không sâu cho JLPT/BJT — kiến thức mỏng
- Gamification đôi khi override mục tiêu học thật
- Không có test simulation
- Không phù hợp user muốn pass kỳ thi thật

**→ BJT Master lấy**: Onboarding flow + streak + notification UX. KHÔNG lấy: gamification override learning.

---

### 2.6. Todaii
| | |
|---|---|
| **Nền tảng** | iOS + Android |
| **Giá** | Free + $5/tháng |
| **MAU** | ~80,000 |
| **Core mechanic** | Real Japanese news với JLPT tagging + furigana toggle |

**✅ Học từ Todaii:**
- Real content = authentic Japanese
- Furigana toggle — killer feature cho intermediate learner
- JLPT difficulty tag trên từng bài
- Reading comprehension questions hay

**❌ Điểm yếu Todaii:**
- Reading only, không có listening/vocab drill
- Nội dung news không phù hợp business exam context
- SRS không có

**→ BJT Master lấy**: Furigana toggle. Authentic business text (email, báo cáo thay vì news). Reading comprehension format.

---

## 3. Feature Comparison Matrix

| Feature | Bunpro | WaniKani | Renshuu | JLPTLord | Duolingo | Todaii | **BJT Master** |
|---------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| BJT/Business content | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Keigo drill (business) | ❌ | ❌ | ⚠️ | ❌ | ❌ | ❌ | ✅ |
| Mock test (timed) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| SRS system | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| Listening practice | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ |
| AI explanation | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Furigana toggle | ❌ | ✅ | ⚠️ | ❌ | ❌ | ✅ | ✅ |
| Offline mode | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| Multi-language UI | ❌ | ❌ | ⚠️ | ❌ | ✅ | ❌ | ✅ JP/EN/VI |
| Gamification | ⚠️ | ⚠️ | ✅ | ❌ | ✅ | ❌ | ✅ |
| Score prediction | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ J5→J1+ |

---

## 4. Pricing Benchmarks

| App | Free tier | Monthly | Annual | Note |
|-----|-----------|---------|--------|------|
| Bunpro | Limited | $4 | $30 | Best value |
| JLPTLord | Limited | $3 | — | Cheapest |
| Renshuu | Generous | $6 | — | |
| Todaii | Limited | $5 | — | |
| WaniKani | 3 levels | $9 | $89 | Premium positioning |
| Duolingo Max | Full game | $13 | $84 | |
| **BJT Master** | 5 câu/ngày | **$9** | **$69** | Recommend |

**Rationale giá $9/$69**:
- Thấp hơn WaniKani & Duolingo Max (positioning: accessible)
- Cao hơn JLPTLord & Todaii (positioning: premium content)
- Annual discount 36% → incentive chuyển từ monthly sang annual

---

## 5. UX Patterns nên adopt

| Pattern | Học từ app nào | Implement như thế nào |
|---------|---------------|-----------------------|
| Goal setting trong onboarding | Duolingo | Chọn target J-level + ngày thi + phút/ngày → Home widget |
| SRS daily queue | Bunpro + WaniKani | Dashboard "Today: X keigo, Y vocab, Z grammar cần ôn" |
| Streak + micro-celebration | Duolingo | Confetti nhỏ khi đúng liên tiếp 5 câu. Streak fire icon |
| Furigana toggle | Todaii + WaniKani | Toggle trong Reading screen, nhớ preference |
| Level badge | JLPTLord | J5/J4/J3/J2/J1/J1+ badge màu sắc khác nhau |
| Review session UX | WaniKani | Swipe card, immediate feedback, không back-button |
| AI explain | Bunpro | Bottom sheet overlay, không rời khỏi practice screen |

---

## 6. Positioning Statement

> **BJT Master** là app duy nhất được thiết kế chuyên biệt cho kỳ thi BJT — cung cấp keigo drill thực chiến, mock test full 105 phút chuẩn format, và AI tutor phân tích điểm yếu — dành cho người đi làm cần business Japanese thực dụng.

**vs JLPT apps**: BJT Master không cố trở thành app JLPT. Chúng ta own khoảng trống BJT.  
**vs General apps**: Mọi nội dung đều có business context — không có câu ví dụ về "học sinh đi trường".
