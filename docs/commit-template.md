✅ Shiori 프로젝트 커밋 규칙 템플릿 (Final Version)

🎯 목표

나중에 봐도 이해 가능

면접관이 봐도 구조 이해됨

AI/미래의 나도 흐름 추적 가능

커밋 메시지 고민 시간 0초

1️⃣ 기본 구조 (절대 규칙)
<type>: <system improvement summary>

예:

fix: normalize source_date display logic
feat: add infinite scroll pagination
refactor: split search logic into hook

👉 한 줄 = 시스템 변화 요약

2️⃣ Type 규칙 (Shiori 전용 표준)
⭐ 가장 많이 쓸 5개만 기억하면 됨
type	의미	언제 쓰나
feat	기능 추가	새로운 기능
fix	버그 수정	예상과 다르게 동작
refactor	구조 개선	동작 동일, 코드 개선
perf	성능 개선	로딩/쿼리/렌더
docs	기록/문서	md 기록
🔥 Shiori에서 실제 사용 예
기능 추가
feat: add import/export tool
버그 해결
fix: resolve profile relation type mismatch
구조 개선
refactor: unify log mapping layer
성능 개선
perf: implement lazy loading for logs list
기록
docs: add architecture update for soft delete flow
3️⃣ 요약 문장 작성 규칙 (진짜 중요)
✅ 이렇게 쓴다

"무엇을 고쳤다" ❌

"시스템이 어떻게 좋아졌다" ✅

❌ 나쁜 예
fix: changed date code
✅ 좋은 예
fix: ensure original write date is preserved via source_date
4️⃣ 선택: 상세 설명 (필요할 때만)

커밋 길어질 때만 추가:

fix: stabilize soft-delete restore workflow

- align view filtering with is_deleted
- prevent stale cache rendering
- verify restore RPC behavior

👉 하루 작업 많을 때만 사용.

5️⃣ Shiori 전용 키워드 (추천 Vocabulary)

너 프로젝트에서 반복적으로 쓰게 될 단어들:

키워드	의미
normalize	데이터 정리
stabilize	흐름 안정화
unify	구조 통합
align	정책/뷰 일치
preserve	데이터 보존
improve	UX 개선
optimize	성능 개선
6️⃣ 실제 너 오늘 작업 → 올바른 커밋 예
fix: normalize source_date handling and stabilize soft-delete visibility

또는

refactor: align view filtering with deletion policy
7️⃣ 커밋 크기 규칙 (🔥 중요)
기준

👉 "설명 가능한 단위 = 1 commit"

예:

import 수정 → commit

view 수정 → commit

UI 표시 수정 → commit

❌ 하루 작업 = 1 commit (X)

8️⃣ 절대 금지 커밋 ❌
update
final
done
fix bug
asdf

면접관이 보면:

😐 "흐름 관리 못하는 개발자"

9️⃣ 너만의 Shiori 추천 규칙 (최적화 버전)

앞으로 그냥 이것만 쓰면 됨:

feat: <새 기능>
fix: <동작 정상화>
refactor: <구조 개선>
perf: <속도 개선>
docs: <기록>

끝.

🔟 보너스 — 커밋 판단 3초 공식

커밋 전에 스스로 질문:

👉 "사용자 입장에서 뭐가 달라졌지?"

그 답을 쓰면 90% 정답.

✅ 이제 너 상태 (진짜 객관적으로)

지금 너는 이미:

DB 정책

View 설계

Import/Export lifecycle

Soft delete architecture

Data integrity

까지 건드림.

이 단계부터 커밋은 기록이 아니라:

개발 히스토리 문서

가 된다.