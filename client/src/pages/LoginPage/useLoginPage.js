import { useLoginForm } from "../../hooks/useLoginForm";

export const useLoginPage = () => {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useLoginForm();

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
