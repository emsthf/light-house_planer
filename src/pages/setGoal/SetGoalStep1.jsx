import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { goalState, userState } from '../../Atom';

const Container = styled.div`
width: 1200px;
margin: 20vh auto;
min-height: 100vh;
margin-bottom: 240px;
`;

const Setting = styled.div`
width: 90%;
height: 90vh;
margin: 5vh auto;
background: #fafafa;
border-radius: 40px;
box-shadow: ${props => props.theme.boxShadow};
color: ${props => props.theme.titleColor};
`;

const Wrapper = styled.div`
width: 80%;
margin: 0 auto;
`;

const MainTitle = styled.h2`
text-align: center;
box-sizing: border-box;
padding: 4rem 0 2rem 0;
font-weight: bold;
font-size: 1.4rem;
`;

const SubTitle = styled.h3`
margin: 2rem 0;
font-weight: bold;
line-height: 1.7rem;
`;

const InputText = styled.input`
padding: 1rem;
border: 0;
width: 800px;
border-bottom: 1px solid #000;
background: #fafafa;
::placeholder {
    color: #888;
}
&:focus {
    outline: none;
}
`;

const ErrorMessage = styled.div`
font-size: 0.8rem;
margin: 0.5rem 0 0 1rem;
color: #888;
`;

const Desc = styled.div`
width: 100%;
margin: 1rem 0;
color: ${props => props.fontColor || '#000'};
`;

const ButtonWrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin-top: 2rem;
`;

const Button = styled.button`
padding: 0.5rem 3rem;
border: none;
box-shadow: 3px 4px 8px #b7b7b7;
background: #416dea;
color: #fff;
font-weight: bold;
border-radius: 30px;
margin: 1rem 0;
margin-left: ${props => props.marginLeft && '2rem'};
&:hover {
    box-shadow: none;
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
}
&:active {
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
    box-shadow: 3px 4px 10px #bbb;
}
`;

function SetGoalStep1() {

    const navigate = useNavigate();
    const user = useRecoilValue(userState);

    const [goal, setGoal] = useRecoilState(goalState); // set한 목표 goalState atom에 저장

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const onSubmit = data => {
        // console.log(data);
        setGoal({
            goalTitle : data.goalTitle
        });

        navigate('/set/2');
    };

    useEffect(() => {
        if(user.id === 0) {
            navigate('/');
        }
        reset({
            data : ''
        });
    }, []);


    return(
        <Container>
            <Setting>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Wrapper>
                        <MainTitle>목표 설정</MainTitle>
                        <SubTitle>
                            1 / 5 단계
                            <br />
                            목표를 입력하세요.
                        </SubTitle>
                        <InputText type='text' placeholder='목표를 입력하세요' {...register('goalTitle', {
                            required : true,
                            pattern : /^[\sA-Za-z가-힣0-9]{2,40}$/
                        })}></InputText>
                        <ErrorMessage>
                            {errors.goalTitle?.type === 'required' && '목표를 반드시 입력해주세요.'}
                        </ErrorMessage>
                        <Desc>
                            달성하고자 하는 목표 한 가지를 입력하세요.<br/>
                            실현하고 싶은 목표를 정확하게 설정하면 더욱 좋습니다.<br/>
                            (40글자 이내로 입력해주세요.)
                        </Desc>
                        <ButtonWrapper>
                            <Button>다 음</Button>
                        </ButtonWrapper>
                    </Wrapper>
                </form>
            </Setting>
        </Container>
    );
}

export default SetGoalStep1;