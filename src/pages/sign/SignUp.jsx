import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  width: 1200px;
  margin: 20vh auto;
  min-height: 100vh;
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
width: 90%;
margin: 0 auto;
`;

const Label = styled.label`
display: flex;
flex-direction: column;
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

const InputFile = styled.input``;

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
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
  font-weight: bold;
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

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    return ( 
        <Container>
            <FormWrapper>
                <Title>SIgnUp</Title>
                <Form>
                    <Label>
                        <Input placeholder='이름'></Input>
                    </Label>
                    <Label>
                        <Input placeholder='이메일'></Input>
                    </Label>
                    <Label>
                        <Input placeholder='비밀번호'></Input>
                    </Label>
                    <Label>
                        <Input placeholder='비밀번호 확인'></Input>
                    </Label>
                    <Button>check</Button>
                    <Label>
                        <Input placeholder='전화번호'></Input>
                    </Label>
                    {/* <Label>
                        <InputFile></InputFile>
                    </Label> */}
                    <Button>가입</Button>
                    <Button>reset</Button>
                </Form>
            </FormWrapper>
        </Container>
     );
}

export default SignUp;