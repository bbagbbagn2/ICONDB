import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/common/Header";
import SearchBox from "../components/SearchBox";
import TopButton from "../components/TopButton";
import axios from "axios";

export default function App() {
  let { keyword } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      url: "/tag_search",
      data: {
        Hashtag: keyword,
      },
    }).then((res) => {
      setData(res.data);
    });
  }, [keyword]);

  return (
    <>
      <Header />
      <SearchingPage>
        <SearchBox width="60vw" fontSize="40px" />
        <h1>Your Results : {keyword}</h1>
        <ImageListWrapper>
          {data.length === 0 ? (
            <h1>no results</h1>
          ) : (
            data.map((list, idx) => (
              <div key={idx}>
                <Link to={"/post/" + list.content_id}>
                  <IconContainer>
                    <IconList
                      src={
                        "https://webservicegraduationproject.s3.amazonaws.com/img/" +
                        list.filename
                      }
                      alt="no_img"
                      width="260"
                    />
                    <ShowTitle>
                      <Text>Show Detail</Text>
                    </ShowTitle>
                  </IconContainer>
                </Link>
              </div>
            ))
          )}
        </ImageListWrapper>
        <TopButton />
      </SearchingPage>
    </>
  );
}

const SearchingPage = styled.div`
  position: absolute;
  top: 55px;
  left: 20%;

  display: grid;
  place-content: center;
  padding-top: 50px;
`;

const ImageListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
  gap: 5px;
`;

const IconContainer = styled.div`
  height: 260px;

  display: inline-block;

  background-color: #ffffff;
  border: 3px solid #9ed1d9;
  border-radius: 10px;
`;

const IconList = styled.img`
  height: 260px;

  border-radius: 10px;
`;

const ShowTitle = styled.div`
  position: relative;
  top: -264px;
  bottom: 0;
  left: 0;
  width: 260px;
  height: 260px;

  background-color: #9ed1d9;

  opacity: 0;
  transition: 0.5s ease;
  &:hover {
    opacity: 0.9;
  }
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: fit-content;

  text-align: center;

  font-size: 16px;

  transform: translate(-50%, -50%);
`;
