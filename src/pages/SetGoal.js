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
`;

const Setting = styled.div`
width: 100%;
min-height: 90vh;
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
`;

const SubTitle = styled.h3`
margin: 2rem 0;
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
`;

const ButtonWrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin: 1rem 0;
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

const InputNumber = styled.input`
padding: 0.2rem 0.5rem;
width: 3rem;
border-radius: 20px;
`;

const Content = styled.div`
width: 100%;
height: 2rem;
border: 1px solid #000;
border-radius: 20px;
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

    // const watchCountType = watch('countType');
    // const watchCountNum = watch('totalCount');

    // step3
    const watchStartDay = watch('startDay');
    const watchEndDay = watch('endDay');

    const startDate = new Date(goal.startDay); // 목표 시작일
    const endDate = new Date(goal.endDay); // 목표 종료일
    
    const today = new Date();
    const minDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`; // 선택 가능한 최소 시작일, 오늘
    const endDayMinDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() + 7}`; // 선택 가능한 종료일의 최소 시작일
    const maxDate = `${startDate.getFullYear() + 1}-${startDate.getMonth() + 1}-${startDate.getDate()}`; // 시작일부터 최대 1년 이내 종료일

    const totalTime = new Date(endDate) - new Date(startDate); // 목표 종료일 - 목표 시작일
    const totalDate = (totalTime / 1000 / 60 / 60 / 24) + 1; // 목표 기간(밀리세컨, 초, 분, 시)
    
    const onSubmit = data => {
        // console.log(data);
        setGoal({
            ...goal,
            goalTitle : data.goalTitle,
            totalCount : data.totalCount,
            startDay : data.startDay,
            endDay : data.endDay,
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
        console.log(goal);
        // console.log(totalDate);
    };

    const resetGoal = () => {
        // navigate('/');
        console.log('reset');
    };


    return(
        <Container>
            <Setting>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Wrapper>
                        <MainTitle>목표 설정</MainTitle>
                        {
                            (step && step === '1') && <>
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
                            (step && step === '2') && <>
                                <SubTitle>
                                    2 / 5 단계
                                    <br />
                                    목표 기간을 선택하세요.
                                </SubTitle>
                                <label>
                                    <input type='radio' value='60' {...register('totalCount', { required: true })} /> 60일
                                    {/* <input type='hidden' value='60' {...register('totalCount')} /> */}
                                </label>
                                <label>
                                    <input type='radio' value='' {...register('totalCount', { required: true })} /> 사용자 지정
                                    {/* {watchCountType === 'custom' && 
                                        <InputNumber type='number' {...register('totalCount', {
                                            required: true,
                                            min : 7,
                                            max : 365
                                        })}></InputNumber> 
                                    } */}
                                </label>
                                <ErrorMessage>
                                    {errors.countType?.type === 'required' && '기간을 선택해 주세요.'}
                                    {/* {(watchCountType === 'custom' && watchCountNum < 7) && '목표 기간을 최소 7일 이상으로 지정해 주세요.'}
                                    {(watchCountType === 'custom' && watchCountNum > 365) && '목표 기간을 최대 365일 이하로 지정해 주세요.'} */}
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
                            (step && step === '3') && <>
                                <SubTitle>
                                    3 / 5 단계
                                    <br />
                                    목표 시작일과 종료일을 지정해주세요.
                                </SubTitle>
                                <label>
                                    <input type='date' {...register('startDay' , {
                                        required : true,
                                        min : minDate
                                    })} />
                                </label>
                                <label>
                                    <input type='date' {...register('endDay' , {
                                        required : true,
                                        min : endDayMinDate,
                                        max : maxDate
                                    })} />
                                </label>
                                <ErrorMessage>
                                    {errors.startDay?.type === 'required' && '시작일을 선택해 주세요.'}
                                    {errors.startDay?.type === 'min' && '시작일은 오늘부터 선택 가능합니다.'}<br/>
                                    {errors.endDay?.type === 'required' && '종료일을 선택해 주세요.'}
                                    {errors.endDay?.type === 'min' && '최소 기간은 7일 입니다.'}
                                    {errors.endDay?.type === 'max' && '종료일은 1년 이내로 지정해 주세요.'}
                                    {(watchStartDay && watchEndDay && watchStartDay >= watchEndDay) && '목표 기간을 다시 확인하세요.'}
                                </ErrorMessage>
                                <Desc>
                                    실행 시작일과 종료일의 날짜를 선택하세요.<br/>
                                    최소 기간은 7일 이며 최대 365일까지 가능합니다.
                                </Desc>
                                <ButtonWrapper>
                                    <Button>다 음</Button>
                                </ButtonWrapper>
                            </>
                        }
                        {
                            (step && step === '4') && <>
                                <SubTitle>
                                    4 / 5 단계
                                    <br />
                                    일주일 중 실행할 목표 실천 횟수를 지정해주세요.
                                </SubTitle>
                                <select {...register('weekCount', {required : true})}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='6'>6</option>
                                    <option value='7'>7</option>
                                </select>
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
                            (step && step === '5') && <>
                                <SubTitle>5 / 5 단계</SubTitle>
                                    <h4>나의 목표</h4>
                                    <Content></Content>
                                    <h4>나의 목표 기간</h4>
                                    <Content></Content>
                                    <h4>나의 목표 실행횟수</h4>
                                    <Content></Content>
                                    <h4>나의 목표에 대한 설명</h4>
                                    <Textarea {...register('goalDesc', {required : true})}></Textarea>
                                    <ErrorMessage>
                                    {errors.goalDesc?.type === 'required' && '목표에 대한 구체적인 설명을 입력해주세요.'}
                                    </ErrorMessage>
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