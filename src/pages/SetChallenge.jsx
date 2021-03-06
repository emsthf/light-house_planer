import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 850px;
  margin: 20vh auto;
  min-height: 100vh;
  margin-bottom: 240px;
  @media screen and (max-width: 1350px) {
    padding: 0px 200px;
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    padding: 0px 20px;
  }
`;

const Setting = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 5vh auto;
  background: #fafafa;
  border-radius: 40px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.titleColor};
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
  margin: 2rem 0 1rem 0;
  font-weight: bold;
  line-height: 1.7rem;
`;

const InputText = styled.input`
  padding: 1rem;
  border: 0;
  width: 100%;
  border-bottom: 1px solid #000;
  background: #fafafa;
  ::placeholder {
    color: #888;
  }
  &:focus {
    outline: none;
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

const Select = styled.select`
  width: 8rem;
  height: 2rem;
  text-align: center;
  font-size: 1rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem 0 0 1rem;
  color: #888;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  width: 100%;
  height: 80px;
  border-radius: 20px;
`;

const InputFile = styled.input``;

const ImageThumbnail = styled.img`
  margin-top: 1rem;
  width: 400px;
  height: auto;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
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
  margin-left: ${(props) => props.marginLeft && "2rem"};
  &:hover {
    box-shadow: none;
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
  }
  &:active {
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
    box-shadow: 3px 4px 10px #bbb;
  }
`;

function SetChallenge() {
  const [img, setImg] = useState("");

  const navigate = useNavigate();

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth =
    today.getMonth() >= 9 ? `${today.getMonth() + 1}` : `0${today.getMonth() + 1}`;
  const todayDate = today.getDate() > 9 ? `${today.getDate()}` : `0${today.getDate()}`;
  const minDate = `${todayYear}-${todayMonth}-${todayDate}`; // ?????? ????????? ?????? ?????????, ??????

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDay: `${todayYear}-${todayMonth}-${todayDate}`,
    },
  });

  // watch date
  const watchStartDay = watch("startDay");
  const watchEndDay = watch("endDay");

  // startDay validation
  const minMaxDate = `${todayYear}-${todayMonth + 1}-${todayDate}`; // ?????? ????????? ?????? ?????????, ?????? ??????
  const startDate = new Date(watchStartDay); // ???????????? ????????? ?????? ?????????

  // endDay validation
  const endDayMin = new Date(
    `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() + 6}`
  );
  const endDayMinDate = `${endDayMin.getFullYear()}-${
    endDayMin.getMonth() + 1
  }-${endDayMin.getDate()}`; // ?????? ????????? ???????????? ?????? ?????????, ????????? 7??? ??????

  const endDayTime = startDate.getTime() + 179 * 24 * 60 * 60 * 1000;
  const customEndDay = new Date(endDayTime);
  const endMonth =
    customEndDay.getMonth() >= 9
      ? `${customEndDay.getMonth() + 1}`
      : `0${customEndDay.getMonth() + 1}`;
  const endDate =
    customEndDay.getDate() > 9
      ? `${customEndDay.getDate()}`
      : `0${customEndDay.getDate()}`;
  const maxDate = `${customEndDay.getFullYear()}-${endMonth}-${endDate}`; // ??????????????? ?????? 180??? ?????? ?????????

  const totalTime = new Date(watchEndDay) - new Date(watchStartDay); // ?????? ????????? - ?????? ?????????
  const totalDate = totalTime / 1000 / 60 / 60 / 24 + 1; // ?????? ??????(????????????, ???, ???, ???)

  const readFile = (e) => {
    const reader = new FileReader(); // ?????? ???????????? ??????
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      setImg(reader.result); // ????????????1
    };
  };

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(
        // "http://localhost:8082/api/challenge",
        "http://springbootlhchallenge-env.eba-am3tqpey.us-east-1.elasticbeanstalk.com/api/challenge",
        {
          challengeTitle: data.title,
          startDay: data.startDay,
          endDay: data.endDay,
          period: totalDate,
          weekCount: data.weekCount,
          challengeDesc: data.desc,
        }
      )
      .then(navigate("/admin"))
      .catch((Error) => console.log(Error));
  };

  return (
    <Container>
      <Setting>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <MainTitle>????????? ??????</MainTitle>
            <SubTitle>????????????</SubTitle>
            <InputText
              type="text"
              placeholder="??????????????? ???????????????"
              {...register("title", {
                required: true,
                pattern: /^[\sA-Za-z???-???0-9]{2,40}$/,
              })}
            ></InputText>
            <ErrorMessage>
              {errors.title?.type === "required" && "????????? ????????? ??????????????????."}
            </ErrorMessage>
            <SubTitle>??? ???</SubTitle>
            <Label>
              <InputDate
                type="date"
                {...register("startDay", {
                  required: true,
                  min: minDate,
                  max: minMaxDate,
                })}
              />
            </Label>
            <Label>
              <InputDate
                type="date"
                {...register("endDay", {
                  required: true,
                  min: endDayMinDate,
                  max: maxDate,
                })}
              />
            </Label>
            <ErrorMessage>
              {errors.startDay?.type === "required" && "???????????? ????????? ?????????."}
              {errors.startDay?.type === "min" && "???????????? ???????????? ?????? ???????????????."}
              {errors.startDay?.type === "max" &&
                "???????????? ???????????? ?????? ????????? ??????????????????."}
              <br />
              {errors.endDay?.type === "required" && "???????????? ????????? ?????????."}
              {errors.endDay?.type === "min" && "?????? ????????? 7??? ?????????."}
              {errors.endDay?.type === "max" && "???????????? 180??? ????????? ????????? ?????????."}
              {watchStartDay &&
                watchEndDay &&
                totalDate < 7 &&
                " ?????? ????????? ?????? ???????????????."}
            </ErrorMessage>
            <SubTitle>?????? ?????? ??????</SubTitle>
            <Select {...register("weekCount", { required: true })}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </Select>
            <ErrorMessage>
              {errors.weekCount?.type === "required" && "?????? ????????? ????????? ?????????."}
            </ErrorMessage>
            <SubTitle>?????? ??? ?????? ??????</SubTitle>
            <Textarea {...register("desc", { required: true })}></Textarea>
            <ErrorMessage>
              {errors.desc?.type === "required" &&
                "???????????? ????????? ?????? ????????? ??????????????????."}
            </ErrorMessage>
            <SubTitle>????????? ??????</SubTitle>
            <InputFile
              type="file"
              accept="image/*"
              {...register("img")}
              onChange={(e) => {
                readFile(e);
              }}
            ></InputFile>
            <br />
            {img && <ImageThumbnail src={img} alt="thumbnail" />}
            <ButtonWrapper>
              <Button>??? ???</Button>
            </ButtonWrapper>
          </Wrapper>
        </form>
      </Setting>
    </Container>
  );
}

export default SetChallenge;
