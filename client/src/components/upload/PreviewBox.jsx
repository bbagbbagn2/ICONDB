import styled from "styled-components";

export default function PreviewBox({ files, onRemoveFile }) {
  return (
    <PreviewArea>
      {files.map((file, index) => (
        <PreviewCard key={index}>
          <RemoveButton onClick={() => onRemoveFile(index)}>x</RemoveButton>
          <PreviewImage src={file.url} alt={file.name} />
          <PreviewName title={file.name}>{file.name}</PreviewName>
        </PreviewCard>
      ))}
    </PreviewArea>
  );
}
const PreviewArea = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
  }
`;

const PreviewCard = styled.div`
  background: #f8fbfc;
  border-radius: 15px;
  padding: 1.5rem;
  position: relative;
  text-align: center;
  border: 2px solid #e5e8eb;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: contain;
  margin-bottom: 0.8rem;
  border-radius: 10px;
  background: white;

  @media (max-width: 768px) {
    height: 100px;
  }
`;

const PreviewName = styled.div`
  font-size: 0.85rem;
  color: #5a6c7d;
  font-weight: 500;
  word-break: break-all;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: none;
  background: #ff6b6b;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;
