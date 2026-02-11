import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ThemeProvider, Button } from "@material-ui/core";
import ImageUploader from "react-images-uploading";
import styled from "styled-components";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

import { theme } from "../components/theme";
import Header from "../components/common/Header";
import ImageContainer from "../components/ImageContainer";
import StyledInput from "../components/StyledInput";
import StyledButton from "../components/StyledButton";
import ProfileHeader from "../components/profile/ProfileHeader";

export default function ProfilePage() {
  // let { user } = useParams();
  // const [profiledata, setProfileData] = useState({
  //   profilename: "Anonymous.png",
  //   nickname: "Anonymous",
  // });
  // const [followed, setFollowed] = useState(false);
  // const [sign, setSign] = useState(null);

  // //프로필 정보
  // const [profileContent, setProfileContent] = useState([]);
  // const [profileLiked, setProfileLiked] = useState([]);
  // const [profileFollow, setProfileFollow] = useState([]);
  // const [profileFollower, setProfileFollower] = useState([]);

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       const [auth, content, liked, following, follower, profile] =
  //         await Promise.all([
  //           axios.post("/get_auth"),
  //           axios.post("/get_usercontent", { id: user }),
  //           axios.post("/get_userlike", { id: user }),
  //           axios.post("/get_Following", { id: user }),
  //           axios.post("/get_Follower", { id: user }),
  //           axios.post("/get_profile", { user }),
  //         ]);

  //       setSign(auth.data);
  //       setProfileContent(content.data);
  //       setProfileLiked(liked.data);
  //       setProfileFollow(following.data);
  //       setProfileFollower(follower.data);
  //       setProfileData(profile.data[0]);
  //     } catch (error) {
  //       console.error("Failed to fetch profile data:", error);
  //     }
  //   };

  //   fetchProfileData();
  // }, [user]);

  // useEffect(() => {
  //   axios.post("/get_auth").then((res) => {
  //     setSign(res.data);
  //     if (res.data) {
  //       axios
  //         .post("/check_followed", {
  //           id: user,
  //         })
  //         .then((res) => {
  //           setFollowed(res.data === "followed");
  //         });
  //       resizingHandler();
  //       window.addEventListener("resize", resizingHandler);
  //       return () => {
  //         window.removeEventListener("resize", resizingHandler);
  //       };
  //     }
  //   });

  //   axios
  //     .post("/get_usercontent", {
  //       id: user,
  //     })
  //     .then((res) => {
  //       setProfileContent(res.data);
  //     });

  //   axios
  //     .post("/get_userlike", {
  //       id: user,
  //     })
  //     .then((res) => {
  //       setProfileLiked(res.data);
  //     });

  //   axios
  //     .post("/get_Following", {
  //       id: user,
  //     })
  //     .then((res) => {
  //       setProfileFollow(res.data);
  //       console.log(res.data);
  //     });

  //   axios
  //     .post("/get_Follower", {
  //       id: user,
  //     })
  //     .then((res) => {
  //       setProfileFollower(res.data);
  //     });
  // }, [user]);

  // useEffect(() => {
  //   axios
  //     .post("/get_profile", {
  //       user: user,
  //     })
  //     .then((res) => {
  //       setProfileData(res.data[0]);
  //     });
  // }, [user]);

  // const [isMobile, setisMobile] = useState(false);
  // const resizingHandler = () => {
  //   setisMobile(window.innerWidth <= 600);
  // };

  // useEffect(() => {
  //   resizingHandler();
  //   window.addEventListener("resize", resizingHandler);
  //   return () => {
  //     window.removeEventListener("resize", resizingHandler);
  //   };
  // }, []);

  // const onFollowHandler = () => {
  //   if (sign === null) {
  //     alert("로그인 후 사용 가능한 서비스 입니다.");
  //     window.location.href = "/sign_in";
  //   } else {
  //     axios({
  //       method: "post",
  //       url: "/setFollow",
  //       data: {
  //         id: user,
  //       },
  //     }).then((res) => {
  //       setFollowed(res.data);
  //     });
  //   }
  // };

  // //프로필 업로드
  // const [images, setImages] = useState([]);
  // const [nickname, updateNickname] = useState();
  // const onNicknameHandler = (e) => {
  //   updateNickname(e.currentTarget.value);
  // };
  // const maxNumber = 1;
  // const onChange = (imageList) => {
  //   setImages(imageList);
  // };
  // const onError = (errors) => {
  //   if (errors) alert("이미지는 1개까지만 첨부할 수 있습니다");
  // };

  // const insert_content = () => {
  //   if (images.length > 0) {
  //     const formData = new FormData();
  //     formData.append("img", images[0].file);
  //     axios({
  //       method: "post",
  //       url: "/update_profile_img",
  //       header: { "content-type": "multipart/form-data" },
  //       data: formData,
  //     }).then((res) => {
  //       alert(res.data);
  //       if (res.data === "success") window.location.href = "/profile/" + user;
  //     });
  //   }

  //   if (nickname.length > 0) {
  //     axios
  //       .post("/update_profile_nickname", {
  //         nickname: nickname,
  //       })
  //       .then((res) => {
  //         alert(res.data);
  //         if (res.data === "success") window.location.href = "/profile/" + user;
  //       });
  //   }
  // };

  return (
    // <>
    //   <Header />
    //   <UserPage columns={isMobile ? "1fr" : "400px 1fr"}>
    //     <ProfilePage>
    //       <ImageUploader
    //         value={images}
    //         onChange={onChange}
    //         maxNumber={maxNumber}
    //         dataURLKey="data_url"
    //         onError={onError}
    //       >
    //         {({ imageList, onImageUpdate }) => (
    //           <>
    //             {imageList.length === 0 && (
    //               <ImageContainer
    //                 src={
    //                   "https://webservicegraduationproject.s3.amazonaws.com/userprofile/" +
    //                   profiledata.profilename
    //                 }
    //                 alt=""
    //                 width="60%"
    //                 borderRadius="50%"
    //               />
    //             )}
    //             {imageList.map((image, index) => (
    //               <ImageContainer
    //                 key={index}
    //                 src={image["data_url"]}
    //                 alt=""
    //                 width="60%"
    //                 borderRadius="50%"
    //               />
    //             ))}
    //             <h1>{profiledata.nickname}</h1>
    //             {sign === user ? (
    //               <>
    //                 <StyledInput
    //                   placeholder={profiledata.nickname}
    //                   onChange={onNicknameHandler}
    //                 />
    //                 <StyledButton
    //                   width="90%"
    //                   text="Edit Profile"
    //                   onClick={() => onImageUpdate(0)}
    //                 />
    //                 <StyledButton
    //                   width="90%"
    //                   text="Update"
    //                   onClick={insert_content}
    //                 />
    //               </>
    //             ) : (
    //               <ThemeProvider theme={theme}>
    //                 {!followed ? (
    //                   <Button
    //                     variant="outlined"
    //                     color="primary"
    //                     onClick={onFollowHandler}
    //                   >
    //                     <AddIcon fontSize="small" />
    //                     &nbsp;Follow
    //                   </Button>
    //                 ) : (
    //                   <Button
    //                     variant="outlined"
    //                     color="secondary"
    //                     onClick={onFollowHandler}
    //                   >
    //                     <CheckIcon fontSize="small" />
    //                     &nbsp;Following
    //                   </Button>
    //                 )}
    //               </ThemeProvider>
    //             )}
    //           </>
    //         )}
    //       </ImageUploader>
    //     </ProfilePage>

    //     <FavoritePage>
    //       <div>
    //         <h2>My Icon List</h2>
    //         <MyList>
    //           {profileContent.map((list, idx) => (
    //             <div key={idx}>
    //               <Link to={"/post/" + list.content_id}>
    //                 <IconList
    //                   src={
    //                     "https://webservicegraduationproject.s3.amazonaws.com/img/" +
    //                     list.filename
    //                   }
    //                   alt="no_img"
    //                   width="100"
    //                 />
    //               </Link>
    //             </div>
    //           ))}
    //         </MyList>
    //       </div>
    //       <div>
    //         <h2>Liked Icon List</h2>
    //         <MyList>
    //           {profileLiked.map((list, idx) => (
    //             <div key={idx}>
    //               <Link to={"/post/" + list.content_id}>
    //                 <IconList
    //                   src={
    //                     "https://webservicegraduationproject.s3.amazonaws.com/img/" +
    //                     list.filename
    //                   }
    //                   alt="no_img"
    //                   width="100"
    //                 />
    //               </Link>
    //             </div>
    //           ))}
    //         </MyList>
    //       </div>
    //       <div>
    //         <h2>Following</h2>
    //         <MyList>
    //           {profileFollow.map((list, idx) => (
    //             <div key={idx}>
    //               <Link to={"/profile/" + list.id}>
    //                 <IconList
    //                   src={
    //                     "https://webservicegraduationproject.s3.amazonaws.com/userprofile/" +
    //                     list.profilename
    //                   }
    //                   alt="no_img"
    //                   width="100"
    //                   height="100"
    //                 />
    //               </Link>
    //             </div>
    //           ))}
    //         </MyList>
    //       </div>
    //       <div>
    //         <h2>Follower</h2>
    //         <MyList>
    //           {profileFollower.map((list, idx) => (
    //             <div key={idx}>
    //               <Link to={"/profile/" + list.id}>
    //                 <IconList
    //                   src={
    //                     "https://webservicegraduationproject.s3.amazonaws.com/userprofile/" +
    //                     list.profilename
    //                   }
    //                   alt="no_img"
    //                   width="100"
    //                   height="100"
    //                 />
    //               </Link>
    //             </div>
    //           ))}
    //         </MyList>
    //       </div>
    //     </FavoritePage>
    //   </UserPage>
    // </>
    <>
      <Header></Header>
      <ProfileHeader></ProfileHeader>
    </>
  );
}

const UserPage = styled.div`
  padding-top: 60px;
  width: 100vw;
  height: 90vh;

  display: grid;

  grid-template-columns: ${(props) => props.columns || "1fr"};
`;

const FavoritePage = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  padding: 10px;
`;
