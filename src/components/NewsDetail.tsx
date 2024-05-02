
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectDataById, selectStarred, toggleStarred } from "../store/dataSlice";
import { IAppState } from "../store/data-state";
import DOMPurify from 'dompurify'
import { AppDispatch } from "../App";

const { DateTime } = require("luxon");

export const NewsDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const item = useSelector((state: IAppState) => selectDataById(state, id!));
    const starred = useSelector(selectStarred);
    const isStarred = starred.includes(item!.objectID);

    const text = (item?.story_text && item?.story_text !=="[dead]") ? item?.story_text : 
    item?.comment_text ? item?.comment_text: '';
    
    return(
        <div>
        <div><strong>{item?.story_title ? item?.story_title: item?.title}</strong></div>
        <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'start', alignItems: 'center'}}>
            <div style={{fontSize: '12px', marginTop: '5px'}}>Posted by {item?.author}</div>
            <span><i style={{ marginLeft: '8px', marginTop: '6px', width: '20px', height: '20px', color: isStarred ? 'orange': 'gray'}} className={`${isStarred ? "fa fa-solid fa-star":"fa fa-light fa-star"}`} title="Edit"></i></span>
            <span style={{ marginLeft: '4px', marginTop: '6px', fontSize: "10px", color: 'gray', cursor: 'pointer' }} onClick={() => dispatch(toggleStarred(item?.objectID))}>{isStarred ? "saved" : "save"}</span>
        </div>
        <div style={{ marginBottom: '10px', fontSize: '12px' }}>{DateTime.fromISO(item?.updated_at).toFormat('dd-MM-yyyy HH:mm')}</div>
        <a style={{ fontSize: '12px'}} href={item?.story_url ? item?.story_url : item?.url}  rel="noreferrer" target="_blank">{item?.story_url}</a>
        <div style={{ marginTop: '30px', fontSize: '14px'}} dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(text)}}/>
        </div>
    )
}