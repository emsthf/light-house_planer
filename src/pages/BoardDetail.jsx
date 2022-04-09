import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 1200px;
  margin: 20vh auto;
  min-height: 100vh;
  margin-bottom: 240px;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
width: 100%;
height: 52px;
text-align: center;
`;

const Title = styled.h3`
font-size: 1.4rem;
margin-bottom: 0.5rem;
`;

const InfoWrapper = styled.div`
display: flex;
justify-content: right;
font-size: 0.9rem;
color: #888;
`;

const Info = styled.div`
margin-left: 2rem;
`;

const ContentWrapper = styled.div`
width: 100%;
`;

const Content = styled.div`
width: 100%;
min-height: 50vh;
border: 1px dotted #aaa;
margin: 1rem 0;
padding: 2rem;
box-sizing: border-box;
`;

const Comment = styled.div`
width: 100%;
min-height: 10vh;
border: 1px dotted #aaa;
margin: 0.4rem 0;
box-sizing: border-box;
display: flex;
align-items: center;
`;

const CommentForm = styled.form`
width: 90%;
margin: 0 auto;
display: flex;
align-items: center;
`;

const Label = styled.label`
margin-right: 1rem;
`;

const Textarea = styled.textarea`
width: 80%;
min-height: 2rem;
padding: 0.2rem;
resize: none;
background: ${props => props.background || '#eaeaea'};
border: none;
border-bottom: ${props => props.borderBottom || 'none'};
`;

const ButtonWrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin-top: 2rem;
`;

const Button = styled.button`
padding: ${props => props.padding || '0.5rem 2rem'};
border: none;
box-shadow: ${props => props.theme.boxShadow};
background: ${(props) => props.backgroundColor || "#416dea"};
color: #fff;
border-radius: ${props => props.borderRadius || '30px'};
margin: 1rem;
&:hover {
    box-shadow: none;
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
}
&:active {
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
    box-shadow: 2px 3px 10px #888;
}
`;


function BoardDetail() {

    const {id} = useParams();

    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8081/api/post/${id}`)
        .then(Response => {
            setPost(Response.data)
        }).catch(Error => console.log(Error));
    }, []);

    return ( 
        <Container>
            <Wrapper>
                <TitleWrapper>
                    <Title>{post.title}</Title>
                    <InfoWrapper>
                        <Info>작성자</Info>
                        <Info>작성일자</Info>
                        <Info>조회수</Info>
                    </InfoWrapper>
                </TitleWrapper>
                <ContentWrapper>
                    <Content>
                        {post.content}
                    </Content>
                    <Comment>
                        <CommentForm>
                            <Label>아이디</Label>
                            <Textarea readOnly></Textarea>
                            <Button
                                padding={'0.4rem 1rem'}
                                borderRadius={'10px'}
                                backgroundColor={"#373737"}
                                hoverColor={"linear-gradient(315deg, #8e8e8e, #373737 74%)"}
                            >수정</Button>
                        </CommentForm>
                    </Comment>
                        <CommentForm>
                            <Label>아이디</Label>
                            <Textarea 
                                borderBottom={'1px solid #888'}
                                background={'#efefef'}
                            ></Textarea>
                            <Button
                                padding={'0.4rem 1rem'}
                                borderRadius={'10px'}
                                backgroundColor={"#373737"}
                                hoverColor={"linear-gradient(315deg, #8e8e8e, #373737 74%)"}
                            >작성</Button>
                        </CommentForm>
                </ContentWrapper>
                <ButtonWrapper>
                    <Link to='/board'>
                        <Button>글 목록</Button>
                    </Link>
                    <Button>수정</Button>
                    <Button backgroundColor={"#373737"}>삭제</Button>
                </ButtonWrapper>
            </Wrapper>
        </Container>
     );
}

export default BoardDetail;