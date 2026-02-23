# 🎨 ICONDB - 아이콘 관리 및 공유 플랫폼

쉽고 빠른 배포를 위해 완전히 재설계된 프로젝트입니다.

## 📚 프로젝트 구조

```
ICONDB/
├── client/                    # React + Vite (프론트엔드)
│   ├── src/
│   │   ├── stores/           # Zustand 전역 상태
│   │   ├── config/           # API 설정
│   │   └── pages/
│   ├── .env.example          # 환경변수 템플릿
│   └── vite.config.js
│
├── server/                    # Express + Supabase (백엔드)
│   ├── src/
│   │   ├── supabase.js       # Supabase 클라이언트
│   │   ├── supabase_multer.js # 파일 업로드 (Storage)
│   │   └── session.js
│   ├── .env.example          # 환경변수 템플릿
│   ├── Dockerfile            # Docker 설정
│   └── QUICK_START.md        # 빠른 시작 가이드
│
├── DEPLOYMENT_CHECKLIST.md   # 배포 체크리스트
└── README.md                 # 이 파일
```

---

## 🚀 빠른 시작 (5분)

### 1️⃣ 서버 배포

**[server/QUICK_START.md](server/QUICK_START.md) 참조**

```bash
# 또는 server/DEPLOYMENT_GUIDE.md 참조
```

### 2️⃣ 클라이언트 배포

```bash
cd client

# 의존성 설치
npm install

# .env.production 생성 (서버 URL 입력)
cp .env.example .env.production

# 빌드
npm run build

# 결과: dist/ 폴더 → Vercel/Netlify에 배포
```

---

## 🔄 아키텍처

### 데이터베이스: Supabase (PostgreSQL)

- ✅ 무료 계층 포함
- ✅ 원클릭 배포
- ✅ 자동 백업
- ✅ 실시간 기능

### 파일 저장소: Supabase Storage

- ✅ 무료 1GB
- ✅ CDN 포함
- ✅ 권한 관리 자동

### API 서버: Render / Railway / Fly.io

- ✅ 무료 계층 지원
- ✅ Docker 지원
- ✅ 자동 배포

### 프론트엔드: Vercel / Netlify

- ✅ 무료 배포
- ✅ 자동 HTTPS
- ✅ 홍위 최적화

---

## 📦 기술 스택

### 서버

- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Auth**: Express Session

### 클라이언트

- **Framework**: React 18 + Vite
- **State Management**: Zustand
- **Styling**: Styled Components
- **HTTP Client**: Axios

---

## ✨ 주요 기능

- 🔐 사용자 인증 (회원가입, 로그인)
- 📤 아이콘 업로드 (SVG, PNG, JPEG)
- 🔍 키워드 & 태그 검색
- 👥 팔로우/언팔로우
- ❤️ 좋아요 기능
- 🎨 SVG 에디터 통합

---

## 🔧 로컬 개발

### 서버

```bash
cd server
npm install
cp .env.example .env

# .env 파일에 Supabase 정보 입력
# SUPABASE_URL=...
# SUPABASE_ANON_KEY=...

npm run dev
# → http://localhost:5000
```

### 클라이언트

```bash
cd client
npm install

# .env.development 생성
VITE_API_URL=http://localhost:5000

npm run dev
# → http://localhost:3000
```

---

## 📖 배포 가이드

| 플랫폼       | 서버                | 클라이언트 | 비용              |
| ------------ | ------------------- | ---------- | ----------------- |
| **Render**   | ✅ 무료 (0.5CPU)    | -          | 무료              |
| **Railway**  | ✅ 무료 ($5 크레딧) | -          | 무료              |
| **Vercel**   | -                   | ✅ 무료    | 무료              |
| **Netlify**  | -                   | ✅ 무료    | 무료              |
| **Supabase** | DB/Storage          | -          | 무료 (5 프로젝트) |

---

## 🎯 배포 옵션 추천

### 프론트엔드 개발자에게 가장 쉬운 방법:

1. **Supabase 프로젝트 생성** (2분)
2. **Render에 배포** (3분)
3. **Vercel에 배포** (3분)

**총 8분!**

자세한 가이드: **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)**

---

## 🔐 보안

- ✅ HTTPS 자동 설정
- ✅ CORS 보안
- ✅ SQL Injection 방지 (Supabase RLS)
- ✅ 안전한 세션 관리
- ✅ 파일 업로드 검증

---

## 📊 성능

- 페이지 로드: < 2초
- API 응답: < 500ms
- 이미지 로드: < 1초 (CDN)
- 데이터베이스: 자동 최적화

---

## 🐛 문제 해결

### "VITE_API_URL not found"

```bash
# .env.production 생성
VITE_API_URL=https://your-server-url
```

### "Supabase connection error"

- Supabase URL 확인
- 계정에서 프로젝트 활성화 확인
- 환경변수 재설정

### "Storage upload failed"

- Storage 버킷이 Public인지 확인
- 버킷 이름이 `icondb`인지 확인

---

## 📚 추가 문서

- [서버 배포 가이드](server/DEPLOYMENT_GUIDE.md)
- [서버 빠른 시작](server/QUICK_START.md)
- [배포 체크리스트](DEPLOYMENT_CHECKLIST.md)

---

## 📞 지원

문제 발생 시:

1. [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) 확인
2. 로그 확인: 배포 플랫폼 대시보드
3. Supabase 문서: https://supabase.com/docs
4. Express 문서: https://expressjs.com

---

## 📄 라이선스

MIT

---

**Happy coding! 🚀**
