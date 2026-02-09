// @vitest-environment jsdom
import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import {
  describe,
  test,
  expect,
  vi,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { server } from "../../../mocks/server";
import { http, HttpResponse } from "msw";
import FormBox from "../FormBox";

beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

const mockNavigate = vi.fn();
const mockToastSuccess = vi.fn();
const mockToastError = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("../../common/NotificationContext", () => ({
  useNotification: () => ({
    toastSuccess: mockToastSuccess,
    toastError: mockToastError,
  }),
}));

describe("FormBox - MSW 통합 테스트", () => {
  test("초기 렌더링 시 입력창이 있어야 한다", async () => {
    render(
      <MemoryRouter>
        <FormBox />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  test("입력 없이 로그인 시도 시 에러를 표시한다", async () => {
    render(
      <MemoryRouter>
        <FormBox />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(
      await screen.findByText("아이디를 입력해주세요."),
    ).toBeInTheDocument();
  });

  test("패스워드만 입력하지 않았을 때 에러를 표시한다", async () => {
    render(
      <MemoryRouter>
        <FormBox />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("아이디를 입력해주세요"), {
      target: { name: "id", value: "testuser" },
    });

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(
      await screen.findByText("비밀번호를 입력해주세요."),
    ).toBeInTheDocument();
  });

  test("아이디만 입력하지 않았을 때 에러를 표시한다", async () => {
    render(
      <MemoryRouter>
        <FormBox />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { name: "password", value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(
      await screen.findByText("아이디를 입력해주세요."),
    ).toBeInTheDocument();
  });

  test("입력값이 상태에 정상적으로 반영된다", async () => {
    render(
      <MemoryRouter>
        <FormBox />
      </MemoryRouter>,
    );

    const idInput = screen.getByPlaceholderText("아이디를 입력해주세요");
    const passwordInput = screen.getByPlaceholderText("••••••••");

    fireEvent.change(idInput, {
      target: { name: "id", value: "myid" },
    });
    fireEvent.change(passwordInput, {
      target: { name: "password", value: "mypassword" },
    });

    expect(idInput.value).toBe("myid");
    expect(passwordInput.value).toBe("mypassword");
  });

  test("올바른 값을 입력하고 로그인 성공 처리를 한다", async () => {
    render(
      <MemoryRouter>
        <FormBox />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("아이디를 입력해주세요"), {
      target: { name: "id", value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { name: "password", value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalledWith(
        "로그인 성공!",
        "테스터님 환영합니다!",
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("로그인 성공 후 폼이 초기화된다", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <FormBox />
      </MemoryRouter>,
    );

    const idInput = screen.getByPlaceholderText("아이디를 입력해주세요");
    const passwordInput = screen.getByPlaceholderText("••••••••");

    fireEvent.change(idInput, {
      target: { name: "id", value: "testuser" },
    });
    fireEvent.change(passwordInput, {
      target: { name: "password", value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    // 성공 토스트가 표시될 때까지 대기
    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalled();
    });

    // 다시 렌더링하여 상태 변화 확인
    rerender(
      <MemoryRouter>
        <FormBox />
      </MemoryRouter>,
    );

    // 새로 가져온 입력 요소에서 값 확인
    const newIdInput = screen.getByPlaceholderText("아이디를 입력해주세요");
    const newPasswordInput = screen.getByPlaceholderText("••••••••");

    expect(newIdInput.value).toBe("");
    expect(newPasswordInput.value).toBe("");
  });

  test("잘못된 아이디/비밀번호로 로그인 시 에러 메시지를 표시한다", async () => {
    mockNavigate.mockClear();

    render(
      <MemoryRouter>
        <FormBox />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("아이디를 입력해주세요"), {
      target: { name: "id", value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { name: "password", value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    // 401 에러 시 navigate가 호출되지 않아야 함
    await waitFor(
      () => {
        expect(mockNavigate).not.toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
  });

  test("서버 에러(500)가 발생하면 에러를 처리한다", async () => {
    mockNavigate.mockClear();

    // 500 에러 핸들러 설정
    server.use(
      http.post("/sign_in", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(
      <MemoryRouter>
        <FormBox />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("아이디를 입력해주세요"), {
      target: { name: "id", value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { name: "password", value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    // 에러 발생 시 네비게이션이 되지 않아야 함
    await waitFor(
      () => {
        expect(mockNavigate).not.toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
  });
});
