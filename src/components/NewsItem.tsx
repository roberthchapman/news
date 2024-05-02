import styled, { useTheme } from "styled-components";
import { INewsItemData } from "../models/newsItemData"
import { getTimeAgo, getWebDomain } from "../helpers/helper";
import { MinorText } from "./Text";
import { useNavigate } from "react-router";
import routes from "../routes";
import { toggleStarred } from "../store/dataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../App";

interface IProps {
    item: INewsItemData;
    itemNumber: number;
    starred: string[];
    toggleStarred: (id: string) => void;
}

export const NewsItem = ({item, itemNumber, starred}: IProps) => {

    const isStarred = starred.includes(item.objectID);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();

    const openStory = (id: string) => {
        navigate(routes.storyDetail(item.objectID));
    }

    const onClick = (e: any) => {
        e.stopPropagation();
        dispatch(toggleStarred(item.objectID))
    }

    return(
        <div onClick={() => openStory(item.objectID)} style={{ cursor: "pointer"}}>
        <RowOneDiv>
            <span style={{ width: '50px', fontSize: '12px', color: 'gray'}}>{`${itemNumber}.`}</span>
            <span style={{ fontSize: '12px', color: theme.color}}><strong>{item.story_title ? item.story_title: item.title}</strong></span>
            <MinorText style={{ color: 'gray', marginLeft: '10px', fontSize: '10px'}}>{`(${getWebDomain(item.story_url)})`}</MinorText>
        </RowOneDiv>
        <RowTwoDiv>
            <span style={{ width: '50px'}}></span>
            <MinorText>{`${item.points ? item.points: 0} point${item.points !== 1 ? 's': ''} by ${item.author} 
            ${getTimeAgo(item.updated_at ? item.updated_at: item.created_at)} ago | ${item.num_comments ? item.num_comments: 0} comments | `}</MinorText> 
            <span><i style={{ marginLeft: '8px', width: '20px', height: '20px', color: isStarred ? 'orange': 'gray'}} className={`${isStarred ? "fa fa-solid fa-star":"fa fa-light fa-star"}`} title="Edit"></i></span>
            <span style={{ marginLeft: '4px', fontSize: "10px", color: 'gray' }} onClick={onClick}>{starred.includes(item.objectID) ? "saved" : "save"}</span>
        </RowTwoDiv>
        </div>
    )
}

const RowOneDiv = styled.div`
display: flex;
flex-flow: row nowrap;
justify-content: start;
align-items: center;
`;

const RowTwoDiv = styled.div`
display: flex;
flex-flow: row nowrap;
justify-content: start;
align-items: center;
height: 10px;
margin-bottom: 10px;
`;