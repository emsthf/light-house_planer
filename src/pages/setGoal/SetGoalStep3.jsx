import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { goalState } from '../../Atom';

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
box-shadow: 4px 8px 24px #d7d7d7;
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
&:disabled {
    background: linear-gradient(315deg, #cfcfcf, #707070 74%);
    box-shadow: 3px 4px 10px #bbb;
}
`;

const Label = styled.label`
margin-right: 1rem;
`;

const InputDate = styled.input`
width: 10rem;
height: 2rem;
padding: 0 1rem;
`;

const Strong = styled.strong`
font-weight: bold;
font-size: 1.1rem;
`;


function SetGoalStep3() {

    const navigate = useNavigate();

    const setGoal = useSetRecoilState(goalState);
    const goal = useRecoilValue(goalState);

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() >= 9 ? `${today.getMonth() + 1}` : `0${today.getMonth() + 1}`
    const todayDate = today.getDate() > 9 ? `${today.getDate()}` : `0${today.getDate()}`;
    const minDate = `${todayYear}-${todayMonth}-${todayDate}`; // 선택 가능한 최소 시작일, 오늘
    
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues : {
            startDay : `${todayYear}-${todayMonth}-${todayDate}`
        }
    });
    
    // watch date
    const watchStartDay = watch('startDay');
    const watchEndDay = watch('endDay');
    
    // startDay validation
    const minMaxDate = `${todayYear}-${todayMonth + 1}-${todayDate}`; // 선택 가능한 최대 시작일, 한달 이내
    const startDate = new Date(watchStartDay); // 사용자가 선택한 목표 시작일

    // endDay validation
    const basicEndTime = startDate.getTime() + (60 * 24 * 60 * 60 * 1000); // 60일 * 시 * 분 * 초 * 밀리세컨
    const basicEndDay = new Date(basicEndTime);
    const month = basicEndDay.getMonth() >= 9 ? `${basicEndDay.getMonth() + 1}` : `0${basicEndDay.getMonth() + 1}`;
    const day = basicEndDay.getDate() > 9 ? `${basicEndDay.getDate()}` : `0${basicEndDay.getDate()}`;
    const basicEndDate = `${basicEndDay.getFullYear()}-${month}-${day}`; // 기본 60일 설정 endDay
    
    const endDayMin = new Date(`${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() + 6}`);
    const endDayMinDate = `${endDayMin.getFullYear()}-${endDayMin.getMonth() + 1}-${endDayMin.getDate()}`; // 선택 가능한 종료일의 최소 시작일, 시작일 7일 이후
    const maxDate = `${startDate.getFullYear() + 1}-${startDate.getMonth() + 1}-${startDate.getDate()}`; // 시작일부터 최대 1년 이내 종료일

    const totalTime = new Date(watchEndDay) - new Date(watchStartDay); // 목표 종료일 - 목표 시작일
    const totalDate = (totalTime / 1000 / 60 / 60 / 24) + 1; // 목표 기간(밀리세컨, 초, 분, 시)
    
    const onSubmit = data => {
        // console.log(data);
        setGoal({
            ...goal,
            totalCount : goal.totalCount === '' ? totalDate : goal.totalCount,
            startDay : data.startDay,
            endDay : goal.totalCount === '60' ? basicEndDate : data.endDay,
        });
        
        navigate('/set/4');
    };


    return(
        <Container>
            <Setting>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Wrapper>
                        <MainTitle>목표 설정</MainTitle>
                        {
                            goal.totalCount === '' && <>
                                <SubTitle>
                                    3 / 5 단계
                                    <br />
                                    목표 시작일과 종료일을 지정해주세요.
                                </SubTitle>
                                <Label>
                                    <InputDate type='date' {...register('startDay' , {
                                        required : true,
                                        min : minDate,
                                        max : minMaxDate
                                    })} />
                                </Label>
                                <Label>
                                    <InputDate type='date' {...register('endDay' , {
                                        required : true,
                                        min : endDayMinDate,
                                        max : maxDate
                                    })} />
                                </Label>
                                <ErrorMessage>
                                    {errors.startDay?.type === 'required' && '시작일을 선택해 주세요.'}
                                    {errors.startDay?.type === 'min' && '시작일은 오늘부터 선택 가능합니다.'}
                                    {errors.startDay?.type === 'max' && '시작일은 오늘부터 한달 이내로 설정해주세요.'}<br/>
                                    {errors.endDay?.type === 'required' && '종료일을 선택해 주세요.'}
                                    {errors.endDay?.type === 'min' && '최소 기간은 7일 입니다.'}
                                    {errors.endDay?.type === 'max' && '종료일은 1년 이내로 지정해 주세요.'}
                                    {(watchStartDay && watchEndDay && totalDate < 7) && ' 목표 기간을 다시 확인하세요.'}
                                </ErrorMessage>
                                <Desc>
                                    실행 시작일과 종료일의 날짜를 선택하세요.<br/>
                                    최소 기간은 7일 이며 최대 365일까지 가능합니다.
                                </Desc>
                                <ButtonWrapper>
                                    <Button disabled={totalDate < 7}>다 음</Button>
                                </ButtonWrapper>
                            </>
                        }
                        {
                            goal.totalCount === '60' && <>
                                <SubTitle>
                                    3 / 5 단계
                                    <br />
                                    목표 시작일을 지정해주세요.
                                </SubTitle>
                                <Label>
                                    <InputDate type='date' {...register('startDay' , {
                                        required : true,
                                        min : minDate,
                                        max : minMaxDate
                                    })} />
                                </Label>
                                <ErrorMessage>
                                    {errors.startDay?.type === 'required' && '시작일을 선택해 주세요.'}
                                    {errors.startDay?.type === 'min' && '시작일은 오늘부터 선택 가능합니다.'}
                                    {errors.startDay?.type === 'max' && '시작일은 오늘부터 한달 이내로 설정해주세요.'}
                                </ErrorMessage>
                                <Desc>
                                    기본 60일을 선택하셨습니다.<br/>
                                    실행 시작일의 날짜를 선택하세요.<br/>
                                    목표 종료일 : <Strong>{watchStartDay && basicEndDate}</Strong>
                                </Desc>
                                <ButtonWrapper>
                                    <Button>다 음</Button>
                                </ButtonWrapper>
                            </>
                        }
                    </Wrapper>
                </form>
            </Setting>
        </Container>
    );
}

export default SetGoalStep3;