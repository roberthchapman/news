import { useDispatch, useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import { selectDisplayMode, setDisplayMode } from "../store/dataSlice";
import { useLocation } from "react-router";

export const Header = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const location = useLocation();

    const displayMode = useSelector(selectDisplayMode);
    return(
    <StyledHeader>
        <StyledLetter>Y</StyledLetter>
        <StyledHeading>Hacker News</StyledHeading>
        {location.pathname === "/" && <>
        <span style={{ color: displayMode === "latest" ? 'orange': theme.color, fontSize: '12px',
        fontWeight: displayMode === "latest" ? 'bold': '', cursor: 'pointer', marginLeft: '20px'}} onClick={() => dispatch(setDisplayMode("latest"))}>latest</span>
        <span>|</span>
        <span style={{ color: displayMode === "starred" ? 'orange': theme.color, fontSize: '12px',
        fontWeight: displayMode === "starred" ? 'bold': '',cursor: 'pointer'}} onClick={() => dispatch(setDisplayMode("starred"))}>starred</span>
        </>}
    </StyledHeader>
    )
};

const StyledHeader = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: start;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    color: ${({theme}) => theme.color};
`

const StyledLetter = styled.div`
    background-color: orange;
    color: white; 
    height: 20px;
    width: 20px;
    text-align: center;
    vertical-align: center;
`

const StyledHeading = styled.div`
    font-weight: bold;
`