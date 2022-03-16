import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { goalState } from '../Atom';

const Container = styled.div`
width: 1200px;
margin: 20vh auto;
min-height: 100vh;
margin-bottom: 240px;
`;

const Setting = styled.div`
width: 90%;
height: ${props => props.SettingHeight || '90vh'};
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
&:disabled {
    background: linear-gradient(315deg, #cfcfcf, #707070 74%);
    box-shadow: 3px 4px 10px #bbb;
}
`;

const Label = styled.label`
margin-right: 1rem;
`;

const InputRadio = styled.input`
margin-right: 0.4rem;
`;

const InputDate = styled.input`
width: 10rem;
height: 2rem;
padding: 0 1rem;
`;

const Select = styled.select`
width: 8rem;
height: 2rem;
text-align: center;
font-size: 1rem;
`;

const GoalTitle = styled.h4`
margin: 1rem 0 0.4rem 0.8rem;
`;

const Content = styled.div`
width: 95%;
height: 4rem;
display: flex;
align-items: center;
padding-left: 2rem;
border: 1px solid #cfcfcf;
border-radius: 20px;
`;

const Strong = styled.strong`
font-weight: bold;
font-size: 1.1rem;
`;

const Textarea = styled.textarea`
margin-top: 0.5rem;
padding: 1rem;
width: 800px;
height: 80px;
border-radius: 20px;
`;


function SetGoal({step}) {

    const navigate = useNavigate();

    const [goalStep, setGoalStep] = useState(step); // 다음 단계로 이동

    const [goal, setGoal] = useRecoilState(goalState); // set한 목표 goalState atom에 저장

    const { register, watch, handleSubmit, formState: { errors } } = useForm();

    // step3
    const watchStartDay = watch('startDay');
    const watchEndDay = watch('endDay');

    // startDay validation
    const today = new Date();
    const minDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`; // 선택 가능한 최소 시작일, 오늘
    const minMaxDate = `${today.getFullYear()}-${today.getMonth() + 2}-${today.getDate()}`; // 선택 가능한 최대 시작일, 한달 이내
    const watchStartDate = new Date(watchStartDay); // 사용자가 선택한 목표 시작일

    
    // endDay validation
    const basicEndTime = watchStartDate.getTime() + (60 * 24 * 60 * 60 * 1000); // 60일 * 시 * 분 * 초 * 밀리세컨
    const basicEndDay = new Date(basicEndTime);
    const basicEndDate = `${basicEndDay.getFullYear()}-${basicEndDay.getMonth() + 1}-${basicEndDay.getDate()}`; // 기본 60일 설정 endDay
    
    const endDayMin = new Date(`${watchStartDate.getFullYear()}-${watchStartDate.getMonth() + 1}-${watchStartDate.getDate() + 6}`);
    const endDayMinDate = `${endDayMin.getFullYear()}-${endDayMin.getMonth() + 1}-${endDayMin.getDate()}`; // 선택 가능한 종료일의 최소 시작일, 시작일 7일 이후
    const maxDate = `${watchStartDate.getFullYear() + 1}-${watchStartDate.getMonth() + 1}-${watchStartDate.getDate()}`; // 시작일부터 최대 1년 이내 종료일

    const totalTime = new Date(watchEndDay) - new Date(watchStartDay); // 목표 종료일 - 목표 시작일
    const totalDate = (totalTime / 1000 / 60 / 60 / 24) + 1; // 목표 기간(밀리세컨, 초, 분, 시)
    
    const onSubmit = data => {
        // console.log(data);
        setGoal({
            ...goal,
            goalTitle : data.goalTitle,
            totalCount : (data.totalCount === '' && parseInt(step) >= 3) ? totalDate : data.totalCount,
            startDay : data.startDay,
            endDay : (data.totalCount === '60' && parseInt(step) >= 3) ? basicEndDate : data.endDay,
            weekCount : data.weekCount,
            goalDesc : data.goalDesc
        });
        
        if(step === '5') {
            setGoalStep('1');
            navigate('/');
        } else {
            setGoalStep(prev => (parseInt(prev) + 1).toString);
            navigate(`/set/${parseInt(step)+1}`);
        }
        // console.log(totalDate);
    };
    console.log(goal);

    const resetGoal = () => {
        // navigate('/');
        console.log('reset');
    };


    return(
        <Container>
            <Setting SettingHeight={step === '5' ? '115vh' : '90vh'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Wrapper>
                        <MainTitle>목표 설정</MainTitle>
                        {
                            step === '1' && <>
                                <SubTitle>
                                    1 / 5 단계
                                    <br />
                                    목표를 입력하세요.
                                </SubTitle>
                                <InputText type='text' placeholder='목표를 입력하세요' {...register('goalTitle', {
                                    required : true,
                                    pattern : /^[A-Za-z가-힣0-9]{2,40}$/
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
                            </>
                        }
                        {
                            step === '2' && <>
                                <SubTitle>
                                    2 / 5 단계
                                    <br />
                                    목표 기간을 선택하세요.
                                </SubTitle>
                                <Label>
                                    <InputRadio type='radio' value='60' {...register('totalCount', { required: true })} />60일
                                </Label>
                                <Label>
                                    <InputRadio type='radio' value='' {...register('totalCount', { required: true })} />사용자 지정
                                </Label>
                                <ErrorMessage>
                                    {errors.totalCount?.type === 'required' && '기간을 선택해 주세요.'}
                                </ErrorMessage>
                                <Desc>
                                    의사 존 맥스웰은 우리의 뇌가 새로운 행동에 익숙해지는데 걸리는 
                                    최소한의 시간에 관해 이야기합니다.<br/> 새로운 습관에 적응해 자동으로 
                                    실천하기까지는 약 60여일의 시간이 필요합니다.<br/> 기본 60일 또는 원하는 
                                    실천 기간을 선택해주세요.
                                </Desc>
                                <ButtonWrapper>
                                    <Button>다 음</Button>
                                </ButtonWrapper>
                            </>
                        }
                        {
                            (step === '3' && goal.totalCount === '') && <>
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
                            (step === '3' && goal.totalCount === '60') && <>
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
                        {
                            step === '4' && <>
                                <SubTitle>
                                    4 / 5 단계
                                    <br />
                                    일주일 중 실행할 목표 실천 횟수를 지정해주세요.
                                </SubTitle>
                                <Select {...register('weekCount', {required : true})}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='6'>6</option>
                                    <option value='7'>7</option>
                                </Select>
                                <ErrorMessage>
                                    {errors.weekCount?.type === 'required' && '실행 횟수를 선택해 주세요.'}
                                </ErrorMessage>
                                <Desc>
                                    목표 실천을 위한 주간 실행 횟수를 선택하세요.<br/>
                                    매일 매일 실천하거나 주중 원하는 횟수만큼 일정을 완수하세요.
                                </Desc>
                                <ButtonWrapper>
                                    <Button>다 음</Button>
                                </ButtonWrapper>
                            </>
                        }
                        {
                            step === '5' && <>
                                    <SubTitle>5 / 5 단계</SubTitle>
                                    <GoalTitle>- 나의 목표</GoalTitle>
                                    <Content>
                                        <p><Strong>{goal.goalTitle}</Strong></p>
                                    </Content>
                                    <GoalTitle>- 나의 목표 기간</GoalTitle>
                                    <Content>
                                        <p>
                                            {goal.startDay} ~ {goal.endDay} (총 <Strong>{goal.totalCount}</Strong>일)
                                        </p>
                                    </Content>
                                    <GoalTitle>- 나의 목표 실행횟수</GoalTitle>
                                    <Content>
                                        <p>일주일에 <Strong>{goal.weekCount}</Strong>번 실행</p>
                                    </Content>
                                    <GoalTitle>- 나의 목표에 대한 설명</GoalTitle>
                                    <Textarea {...register('goalDesc', {required : true})}></Textarea>
                                    <ErrorMessage>
                                        {errors.goalDesc?.type === 'required' && '목표에 대한 구체적인 설명 또는 실행 방안을 입력해주세요.'}
                                    </ErrorMessage>
                                    <Desc fontColor={'#a9a9a9'}>
                                        직접 설정한 목표의 내용을 확인하세요.<br/>
                                        맞으면 등록, 틀리면 다시 등록하기 버튼을 눌러 목표를 다시 설정해주세요.
                                    </Desc>
                                <ButtonWrapper>
                                    <Button>등 록</Button>
                                    <Button marginLeft type='button' onClick={resetGoal}>다시 등록하기</Button>
                                </ButtonWrapper>
                            </>
                        }
                    </Wrapper>
                </form>
            </Setting>
        </Container>
    );
}

export default SetGoal;