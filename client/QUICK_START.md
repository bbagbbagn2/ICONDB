# ⚡ 클라이언트 3분 배포

## 1️⃣ 서버 URL 확인 (필수!)

```
https://your-icondb-server.onrender.com
```

## 2️⃣ 환경변수 생성

```bash
cd client

cat > .env.production << EOF
VITE_API_URL=https://your-icondb-server.onrender.com
VITE_CLIENT_URL=https://your-project.vercel.app
EOF
```

## 3️⃣ 빌드 & 푸시

```bash
npm run build
git add .
git commit -m "Deploy to production"
git push origin main
```

## 4️⃣ Vercel 배포 (가장 쉬움)

1. **[vercel.com](https://vercel.com)** → GitHub 로그인
2. **Add New** → **Project**
3. `icondb-client` 선택
4. **Environment Variables**:
   - `VITE_API_URL` = 서버 URL
   - `VITE_CLIENT_URL` = 클라이언트 URL (배포 후 생성됨)
5. **Deploy**

## ✅ 배포 완료!

```
🎉 https://your-project.vercel.app
```

---

**더 자세한 가이드**: DEPLOYMENT_GUIDE.md 참조
