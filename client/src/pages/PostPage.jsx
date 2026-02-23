import { Helmet } from "react-helmet";
import Header from "../components/common/Header";
import PostContainer from "../components/PostPage/PostContainer";

export default function App() {
  return (
    <>
      <Helmet>
        <title>아이콘 상세 - ICONDB</title>
        <meta name="description" content="아이콘 상세 정보를 확인하세요." />
      </Helmet>
      <Header />
      <PostContainer />
    </>
  );
}
