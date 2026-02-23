# 🎯 배포 체크리스트

## ✅ 서버 배포 전 확인

### Supabase 설정

- [ ] Supabase 프로젝트 생성 완료
- [ ] Project URL 복사됨
- [ ] Anon Key 복사됨
- [ ] `icondb` 스토리지 버킷 생성 및 Public 설정
- [ ] SQL 스키마 실행 완료 (users, content, follows, likes)

### 코드 준비

- [ ] `.env.example`이 올바르게 작성됨
- [ ] `package.json` 의존성 설치됨 (`npm install`)
- [ ] 로컬 테스트 완료 (`npm run dev`)
- [ ] Git 커밋 완료

### 배포 플랫폼 선택

- [ ] Render 계정 생성 (권장)
- [ ] 또는 Railway 계정 생성
- [ ] 또는 Fly.io 계정 생성

### 환경변수 설정

- [ ] `NODE_ENV=production`
- [ ] `SUPABASE_URL` 설정
- [ ] `SUPABASE_ANON_KEY` 설정
- [ ] `SUPABASE_BUCKET=icondb`
- [ ] `SESSION_SECRET` 강력한 비밀번호 설정
- [ ] `CLIENT_URL` 클라이언트 URL 설정

---

## ✅ 클라이언트 배포 전 확인

### 코드 준비

- [ ] `.env.production` 생성됨
- [ ] `VITE_API_URL` 서버 URL 입력
- [ ] `npm run build` 성공
- [ ] 빌드 파일 생성됨 (`dist/` 폴더)

### Vercel 배포 (권장)

- [ ] Vercel 계정 생성
- [ ] GitHub 연결
- [ ] 환경변수 설정
- [ ] 자동 배포 설정

### 또는 Netlify 배포

- [ ] Netlify 계정 생성
- [ ] GitHub 연결
- [ ] 빌드 명령어: `npm run build`
- [ ] 배포 폴더: `dist`

---

## ✅ 배포 후 확인

### 서버 테스트

```bash
# 1. 서버 상태 확인
curl https://your-server-url/

# 응답:
# {
#   "message": "ICONDB Server is running on port 5000",
#   "environment": "production"
# }

# 2. 인증 테스트
curl -X POST https://your-server-url/get_auth \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 클라이언트 테스트

- [ ] 홈페이지 로딩 확인
- [ ] 로그인 페이지 접근 가능
- [ ] API 호출 성공 (콘솔 확인)
- [ ] 이미지 업로드 테스트
- [ ] 검색 기능 테스트

### 모니터링 설정

- [ ] Sentry 또는 Rollbar 설정 (에러 추적)
- [ ] Google Analytics 설정 (방문자 추적)
- [ ] 배포 플랫폼 알림 설정

---

## 🔄 배포 후 유지보수

### 정기 확인사항

- [ ] 서버 로그 확인 (주 1회)
- [ ] 에러 추적 서비스 확인 (주 1회)
- [ ] 데이터베이스 백업 (주 1회)
- [ ] 의존성 업데이트 (월 1회)

### 문제 발생 시

1. 배포 플랫폼 로그 확인
2. Supabase 상태 확인
3. 환경변수 재설정
4. 로컬에서 재현 시도

---

## 📞 참고 링크

- Supabase: https://supabase.com
- Render: https://render.com
- Vercel: https://vercel.com
- Netlify: https://netlify.com
- Railway: https://railway.app
- Fly.io: https://fly.io

---

**모든 항목이 체크되었다면 배포 완료! 🎉**
