import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  width: 1200px;
  margin: 20vh auto;
  margin-bottom: 240px;
`;

const FormWrapper = styled.div`
width: 100%;
`;

const Title = styled.h2`
text-align: center;
font-size: 1.4rem;
font-weight: bold;
`;

const Form = styled.form`
width: 80%;
margin: 0 auto;
`;

const Label = styled.label`
display: flex;
align-items: center;
flex-direction: column;
margin: 2rem 0;
font-size: 0.8rem;
color: #888;
`;

const Input = styled.input`
padding: 1rem;
border: 0;
width: 500px;
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

const InputFile = styled.input``;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const Button = styled.button`
  padding: ${props => props.padding || '0.5rem 3rem'};
  border: none;
  box-shadow: 3px 4px 8px #b7b7b7;
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
  border-radius: 30px;
  margin: 1rem 0;
  margin-left: ${(props) => props.marginLeft && "2rem"};
  &:hover {
    box-shadow: none;
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
  }
  &:active {
    box-shadow: none;
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
    box-shadow: 3px 4px 10px #bbb;
  }
`;

function SignUp() {

    const [user, setUser] = useState({});

    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();

    const onSubmit = data => {
        setUser({
            name : data.name,
            email: data.email,
            password: data.password,
            phone: data.phone
        });
        console.log(user);
    };

    const resetForm = () => {
        reset({
            name : '',
            email: '',
            password: '',
            passwordConfirm: '',
            phone: ''
        })
    }

    return ( 
        <Container>
            <FormWrapper>
                <Title>SIgnUp</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Label>
                        <Input type='text' placeholder='이름' {...register('name', {
                            required : true,
                            // pattern : /^[A-Za-z0-9]{4,20}$/
                        })}></Input>
                        <ErrorMessage>
                            {errors.name?.type === 'required' && '이름을 입력해주세요.'}
                        </ErrorMessage>
                    </Label>
                    <Label>
                        <Input type='text' placeholder='이메일' {...register('email', {
                            required: true,
                            // pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                        })}></Input>
                        <ErrorMessage>
                            {errors.email?.type === 'required' && '이메일을 입력해주세요.'}
                        </ErrorMessage>
                    </Label>
                    <Label>
                        <Input type='password' placeholder='비밀번호' {...register('password', {
                            required: true,
                            // pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                        })}></Input>
                        <ErrorMessage>
                            {errors.password?.type === 'required' && '비밀번호를 입력해주세요.'}
                        </ErrorMessage>
                    </Label>
                    <Label>
                        <Input type='password' placeholder='비밀번호 확인' {...register('passwordConfirm', {
                            required: true,
                            // pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                        })}></Input>
                        <ErrorMessage>
                            {errors.passwordConfirm?.type === 'required' && '비밀번호를 다시 입력해주세요.'}
                            {getValues('password') !== getValues('passwordConfirm') && '비밀번호를 다시 확인해주세요.'}
                        </ErrorMessage>
                        <Button padding={'0.5rem 1.1rem'}>check</Button>
                    </Label>
                    <Label>
                        <Input type='text' placeholder='전화번호' {...register('phone', {
                            required: true,
                            // pattern: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
                        })}></Input>
                        <ErrorMessage>
                            {errors.phone?.type === 'required' && '전화번호를 입력해주세요.'}
                        </ErrorMessage>
                    </Label>
                    <Label>
                        <InputFile type='file' accept='image/*'></InputFile>
                    </Label>
                    <ButtonWrapper>
                        <Button>가입</Button>
                        <Button marginLeft onClick={resetForm}>reset</Button>
                    </ButtonWrapper>
                </Form>
            </FormWrapper>
        </Container>
     );
}

export default SignUp;