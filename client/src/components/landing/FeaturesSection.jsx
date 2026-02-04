import styled from "styled-components";

export default function FeaturesSection() {
  const features = [
    {
      icon: "🎁",
      title: "100% 무료",
      desc: "모든 아이콘을 무료로 다운로드하고 상업적으로도 사용 가능합니다",
    },
    {
      icon: "⚡",
      title: "빠른 검색",
      desc: "필요한 아이콘을 키워드로 빠르게 찾고 바로 다운로드하세요",
    },
    {
      icon: "🎨",
      title: "다양한 스타일",
      desc: "라인, 솔리드, 듀오톤 등 다양한 스타일의 아이콘을 제공합니다",
    },
    {
      icon: "📱",
      title: "SVG & PNG",
      desc: "벡터 SVG와 고해상도 PNG 파일을 모두 지원합니다",
    },
  ];

  return (
    <Section>
      <FeaturesContainer>
        <SectionTitle>왜 ICONDB일까요?</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesContainer>
    </Section>
  );
}

const Section = styled.section`
  background: linear-gradient(135deg, #9ed1d9, #7bc4ce);
  margin: 3rem 0;
  padding: 3rem 2rem;

  @media screen and (max-width: 768px) {
    margin: 3rem auto;
  }
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 3rem;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(158, 209, 217, 0.2);
  }

  h3 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    color: #5a6c7d;
    line-height: 1.8;
  }

  @media (max-width: 480px) {
    padding: 2rem;

    h3 {
      font-size: 1.3rem;
    }
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f5a282, #ffb89e);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 1.5rem;
`;
