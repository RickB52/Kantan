# Seed Data Index — BJT Master
> Created: 2026-05-10 | Phase 0 Deliverable

## Tổng quan

| File | Section | Số câu | Level range | Format |
|------|---------|--------|-------------|--------|
| [06-seed-questions-reading.json](./06-seed-questions-reading.json) | B3 Reading (読解) | 30 | J4–J1+ | JSON |
| [07-seed-questions-keigo.json](./07-seed-questions-keigo.json) | A2 Keigo Quiz | 20 | J4–J1+ | JSON |
| [08-seed-questions-vocab-lr.json](./08-seed-questions-vocab-lr.json) | A1 Vocab + B2 LR | 20+10 | J4–J1+ | JSON |
| **Tổng** | | **80 câu** | | |

---

## Phân bổ theo section

```
Reading B3 (30 câu)
├── 語彙・文法 (vocab/grammar fill-in)  : 10 câu  [R-GV-001 → R-GV-010]
├── 表現読解 (short passage)             : 10 câu  [R-EX-001 → R-EX-010]
└── 総合読解 (long passage, 2Q each)    : 10 câu  [R-CO-001 → R-CO-003, 2Q/passage]

Keigo A2 (20 câu)
├── 尊敬語・謙譲語・丁寧語基本          : 5 câu  [K-001 → K-005]
├── ウチ・ソト原則                       : 3 câu  [K-004, K-012, K-015]
├── 謙譲語Ⅰ vs Ⅱ phân biệt            : 4 câu  [K-003, K-006, K-007, K-009]
├── よくある誤用 (common errors)         : 4 câu  [K-010, K-011, K-019, K-020]
└── Tình huống thực tế                   : 4 câu  [K-013, K-014, K-016, K-018]

Vocabulary A1 (20 câu)     [V-001 → V-020]
├── 組織・人事   : V-001, V-002, V-015
├── 会議・交渉   : V-003, V-006, V-011
├── 財務・経営   : V-004, V-005, V-009, V-012, V-017, V-020
├── IT・PM       : V-007, V-008, V-016
├── 法務・契約   : V-010, V-013, V-019
└── マーケ       : V-018

LR B2 (10 câu)            [LR-001 → LR-010]
├── グラフ読解 (charts)  : LR-001 → LR-006
├── 複合 (compound)      : LR-007, LR-009, LR-010
└── 照合 (matching)      : LR-008
```

---

## Level distribution

| Level | Reading | Keigo | Vocab | LR | Total |
|-------|---------|-------|-------|----|-------|
| J4 | 3 | 2 | 4 | 0 | 9 |
| J3 | 8 | 4 | 7 | 3 | 22 |
| J2 | 8 | 5 | 5 | 3 | 21 |
| J1 | 7 | 5 | 3 | 3 | 18 |
| J1+ | 4 | 4 | 1 | 1 | 10 |
| **Total** | **30** | **20** | **20** | **10** | **80** |

---

## Cấu trúc JSON mỗi câu hỏi

```json
{
  "id": "R-GV-001",          // prefix: R=Reading, K=Keigo, V=Vocab, LR=LR
  "type": "vocab_grammar",   // vocab_grammar | expression_reading | comprehensive_reading
                              // keigo_quiz | vocab_flashcard | listening_reading
  "level": "J3",             // J5 | J4 | J3 | J2 | J1 | J1+
  "topic": "接続詞",          // sub-topic label
  "instruction": "...",      // instruction text shown to user
  "passage": "...",          // reading passage (null if none)
  "question": "...",         // question text
  "choices": ["A", "B", "C", "D"],  // always 4 choices
  "answer_index": 0,         // 0-based index of correct answer
  "explanation_ja": "...",   // Japanese explanation (AI tutor uses this)
  "explanation_vi": "..."    // Vietnamese explanation
}
```

---

## Cách dùng cho dev

### Seed vào DB (sau khi setup schema)

```bash
# Via admin API
POST /api/v1/admin/questions/bulk-import
Content-Type: application/json
Body: contents of seed files

# Via script
node scripts/seed-questions.ts --file docs/phase0/06-seed-questions-reading.json
```

### Map sang DB schema

| JSON field | DB column (questions table) |
|-----------|----------------------------|
| `id` | `external_id` (unique) |
| `type` | `question_type` |
| `level` | `level` (enum) |
| `topic` | `topic` |
| `passage` | `passage_ja` |
| `question` | `question_ja` |
| `choices[]` | → `question_choices` table (4 rows) |
| `answer_index` | `question_choices.is_correct = true` |
| `explanation_ja` | `explanation_ja` |
| `explanation_vi` | `explanation_vi` |

---

## Copyright note

> Tất cả 80 câu hỏi là **nội dung gốc** được soạn theo format BJT, không sao chép từ tài liệu có bản quyền.
> Tham chiếu nguồn: 文化庁「敬語の指針」(2007) framework cho Keigo; cấu trúc đề theo official BJT format.
> Risk R-01 (copyright) đã được giảm thiểu.
