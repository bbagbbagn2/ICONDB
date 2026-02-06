import styled from "styled-components";

export default function UploadCardBox({ children }) {
  return <UploadCard>{children}</UploadCard>;
}

const UploadCard = styled.div`
  background: white;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  padding: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;
