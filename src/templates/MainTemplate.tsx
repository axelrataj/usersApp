import styled, { ThemeProvider } from "styled-components";
import Header from "components/Header/Header";
import { ThemeConfig } from "theme/ThemeConfig";
import { ChildrenType } from "types/types";
import GlobalStyle from "theme/GlobalStyle";

interface TemplateInterface {
  children?: ChildrenType;
}
 
const ContainerStyled = styled.div`
`;

const MainStyled = styled.main`
  position: relative;
`;

const MainTemplate = ({ children }: TemplateInterface) => {
  return (
    <>
      <ThemeProvider theme={ThemeConfig}>
        <GlobalStyle />
        <MainStyled>
          <Header />
          <ContainerStyled>
            {children}
          </ContainerStyled>
        </MainStyled>
      </ThemeProvider>
    </>
  );
};

export default MainTemplate;
