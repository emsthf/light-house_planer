import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Loader = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px solid ${(props) => props.theme.textColor};
  border-top: 10px solid #fc0202;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function LoadingSpiner() {
  return (
    <Container>
      <Loader />
    </Container>
  );
}

export default LoadingSpiner;
