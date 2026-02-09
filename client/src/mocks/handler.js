import { http, HttpResponse } from "msw";

export const handlers = [
  // POST /sign_in 요청을 가로챔
  http.post("/sign_in", async ({ request }) => {
    const { formData } = await request.json();

    // 특정 아이디로 로그인 시 성공 응답
    if (formData.id === "testuser" && formData.password === "password123") {
      return HttpResponse.json(
        {
          name: "테스터",
          token: "fake-jwt-token",
        },
        { status: 200 },
      );
    }

    // 그 외에는 로그인 실패 응답
    return new HttpResponse(null, { status: 401 });
  }),
];
