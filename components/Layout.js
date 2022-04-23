import styled from "styled-components";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <Wrapper>
            <Container>
                <Sidebar />
                {children}
            </Container>
        </Wrapper>
    );
};

export default Layout;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Container = styled.div`
    border-radius: 15px;
    display: flex;
    width: 75vw;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 4px 4px 13px -2px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 4px 4px 13px -2px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 4px 4px 13px -2px rgba(0, 0, 0, 0.75);
    height: 100vh;

    @media (max-width: 640px) {
        width: 100%;
        height: 100vh;
        mergin: 0;
    }
`;
