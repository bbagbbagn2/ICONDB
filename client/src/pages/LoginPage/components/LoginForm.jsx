import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  InputGroup,
  Label,
  Input,
  ErrorText,
  FormError,
  LoginButton,
  Spinner,
} from "../LoginPage.styles";
import { LABELS } from "../LoginPage.constants";

/**
 * 순수 UI 컴포넌트 - 로그인 폼
 * 모든 상태를 Props로 받아서 렌더링만 담당
 * 완전히 테스트 가능하고 재사용 가능
 */
export default function LoginForm({
  formData = { id: "", password: "" },
  errors = {},
  isLoading = false,
  onChange,
  onSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {/* 아이디 입력 */}
      <InputGroup>
        <Label htmlFor="id">{LABELS.ID}</Label>
        <Input
          id="id"
          type="text"
          name="id"
          placeholder="아이디를 입력해주세요"
          value={formData.id}
          onChange={onChange}
          $hasError={!!errors.id}
          aria-label="사용자 아이디"
          aria-invalid={!!errors.id}
          aria-describedby={errors.id ? "id-error" : undefined}
          disabled={isLoading}
          required
        />
        {errors.id && (
          <ErrorText id="id-error" role="alert">
            {errors.id}
          </ErrorText>
        )}
      </InputGroup>

      {/* 비밀번호 입력 */}
      <InputGroup>
        <Label htmlFor="password">{LABELS.PASSWORD}</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={onChange}
          $hasError={!!errors.password}
          aria-label="비밀번호"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          disabled={isLoading}
          required
        />
        {errors.password && (
          <ErrorText id="password-error" role="alert">
            {errors.password}
          </ErrorText>
        )}
      </InputGroup>

      {/* 폼 전체 에러 (인증 실패 등) */}
      {errors.form && <FormError role="alert">{errors.form}</FormError>}

      {/* 로그인 버튼 */}
      <LoginButton
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        aria-label={isLoading ? "로그인 중입니다" : "로그인"}
      >
        {isLoading ? (
          <>
            <Spinner aria-hidden="true" />
            {LABELS.LOGGING_IN}
          </>
        ) : (
          LABELS.LOGIN_BUTTON
        )}
      </LoginButton>
    </Form>
  );
}

LoginForm.propTypes = {
  formData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
  isLoading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
