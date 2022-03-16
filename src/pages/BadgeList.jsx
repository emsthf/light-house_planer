import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
width: 1200px;
margin: 15vh auto;
margin-bottom: 240px;
`;

const Wrapper = styled.div`
width: 100%;
`;

const MainTitle = styled.div`
width: 100%;
text-align: center;
font-size: 1.4rem;
font-weight: bold;
margin-bottom: 40px;
`;

const Section = styled.section`
width: 880px;
margin: 0 auto;
/* text-align: center; */
`;

const Title = styled.h3`
margin: 2rem 0 1rem 2rem;
`;

const BadgeWrapper = styled.div`
width: 100%;
min-height: 500px;
padding: 2rem 1rem 4rem 1rem;
box-sizing: border-box;
background: #fafafa;
border-radius: 20px;
box-shadow: 3px 5px 10px #d7d7d7;
display: flex;
flex-wrap: wrap;
margin: 0 auto;
margin-bottom: 4rem;
`;

const Badge = styled.div`
width: 120px;
height: 120px;
background: #fafafa;
box-shadow: 3px 5px 10px #d7d7d7;
border-radius: 50%;
margin: 24px;
position: relative;
&:hover {
    background: rgba(65, 109, 234, 0.1);
}
`;

const BadgeCount = styled.div`
font-size: 0.9rem;
font-weight: bold;
position: absolute;
left: 50%;
bottom: -1.8rem;
transform: translateX(-50%);
`;

function BadgeList() {
    return ( 
        <Container>
            <Wrapper>
                <MainTitle>My Badge</MainTitle>
                <Section>
                    <Title>특별 한정</Title>
                    <BadgeWrapper>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                    </BadgeWrapper>
                </Section>
                <Section>
                    <Title>목표 달성</Title>
                    <BadgeWrapper>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                        <Badge>
                            <BadgeCount>1</BadgeCount>
                        </Badge>
                    </BadgeWrapper>
                </Section>
            </Wrapper>
        </Container>
     );
}

export default BadgeList;