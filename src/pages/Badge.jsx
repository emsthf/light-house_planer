import React from 'react';
import styled from 'styled-components';

const BadgeBox = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 10px 30px;
  position: relative;
  cursor: pointer;
  &:hover {
    background: #fafafa;
  }
`;

const Img = styled.img`
width: 100%;
height: auto;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

function Badge({badge, setId}) {

    const findBadgeName = (badge) => {
        if(badge.badgeName === "100") {
          return (
            <BadgeBox key={badge.id} onClick={() => setId(`${badge.id}`)} layoutId={`${badge.id}`}>
              <Img src='../assets/images/badge100.png ' alt='goal badge' />
            </BadgeBox>
          )
        } else if(badge.badgeName === "90") {
          return (
            <BadgeBox key={badge.id} onClick={() => setId(`${badge.id}`)} layoutId={`${badge.id}`}>
              <Img src='../assets/images/badge90.png ' alt='goal badge' />
            </BadgeBox>
          )
        } else if(badge.badgeName === "80") {
          return (
            <BadgeBox key={badge.id} onClick={() => setId(`${badge.id}`)} layoutId={`${badge.id}`}>
              <Img src='../assets/images/badge80.png ' alt='goal badge' />
            </BadgeBox>
          )
        } else if(badge.badgeName.includes("Special")) {
            return (
              <BadgeBox key={badge.id} onClick={() => setId(`${badge.id}`)} layoutId={`${badge.id}`}>
                <Img src='../assets/images/special_reward.png ' alt='goal badge' />
              </BadgeBox>
            )
          }
      }

    return ( 
        <>
            {findBadgeName(badge)}
        </>
     );
}

export default Badge;