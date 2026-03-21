import React from "react";
import {
  Form,
  InputGroup,
  Label,
  Input,
  PasswordStrength,
  StrengthText,
  ErrorText,
  SignupButton,
} from "../SignupPage.styles";
import {
  LABELS,
  PLACEHOLDERS,
  PASSWORD_STRENGTH,
} from "../SignupPage.constants";

/**
 * 순수 UI 컴포넌트 - 회원가입 폼
 * 모든 상태를 Props로 받아서 렌더링만 담당
 */
export default function SignupFormBox({
  formData = { name: "", id: "", password: "", confirmPassword: "" },
  passwordStrength = "",
  errors = {},
  onChange,
  onSubmit,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <InputGroup>
        <Label htmlFor="name">{LABELS.NAME}</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder={PLACEHOLDERS.NAME}
          value={formData.name}
          onChange={onChange}
          $hasError={!!errors.name}
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="id">{LABELS.ID}</Label>
        <Input
          type="text"
          id="id"
          name="id"
          placeholder={PLACEHOLDERS.ID}
          value={formData.id}
          onChange={onChange}
          $hasError={!!errors.id}
        />
        {errors.id && <ErrorText>{errors.id}</ErrorText>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="password">{LABELS.PASSWORD}</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder={PLACEHOLDERS.PASSWORD}
          value={formData.password}
          onChange={onChange}
          $hasError={!!errors.password}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <PasswordStrength $strength={passwordStrength}>
          <div />
        </PasswordStrength>
        {passwordStrength && (
          <StrengthText $strength={passwordStrength}>
            {passwordStrength === PASSWORD_STRENGTH.WEAK &&
              PASSWORD_STRENGTH.WEAK_TEXT}
            {passwordStrength === PASSWORD_STRENGTH.MEDIUM &&
              PASSWORD_STRENGTH.MEDIUM_TEXT}
            {passwordStrength === PASSWORD_STRENGTH.STRONG &&
              PASSWORD_STRENGTH.STRONG_TEXT}
          </StrengthText>
        )}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="confirmPassword">{LABELS.CONFIRM_PASSWORD}</Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder={PLACEHOLDERS.CONFIRM_PASSWORD}
          value={formData.confirmPassword}
          onChange={onChange}
          $hasError={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <ErrorText>{errors.confirmPassword}</ErrorText>
        )}
      </InputGroup>

      <SignupButton type="submit">{LABELS.SIGNUP_BUTTON}</SignupButton>
    </Form>
  );
}
