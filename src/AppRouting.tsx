import { News } from './components/News';
import { Header } from './components/Header';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import { NewsDetail } from './components/NewsDetail';

export const AppRouting = () => {
    
    return(
    <PageWrapper>
      <TopLine/>
      <InnerPage>
      <Header/>
      <Routes>
        <Route path="/" element={<News />} />
        <Route path={routes.storyDetail(":id")} element={<NewsDetail />} />
      </Routes>
      </InnerPage>
      <BottomLine/>
    </PageWrapper>
    )
}

const PageWrapper = styled.div`
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 background-color: ${({theme}) => theme.backgroundColor};
 color: ${({theme}) => theme.color};
`

const InnerPage = styled.div`
 margin-top: 50px;
 margin-left: 50px;
 background-color: ${({theme}) => theme.backgroundColor};
`

const TopLine = styled.div`
position: absolute;
top: 0px;
left: 0px;
height: 3px;
width: 100%;
background-color: orange;
`

const BottomLine = styled.div`
height: 3px;
width: 100%;
background-color: orange;
margin-top: 20px;
`