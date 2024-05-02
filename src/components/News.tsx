
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewsItem } from "./NewsItem";
import { useTheme } from "styled-components";
import { IParams, fetchDataAsync, selectData, selectDisplayMode, selectPage, selectStarred, setPage, toggleStarred } from "../store/dataSlice";
import { AppDispatch } from "../App";

export const News = () => {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();

    const data = useSelector(selectData);
    const page = useSelector(selectPage);
    const displayMode = useSelector(selectDisplayMode);
    const starred = useSelector(selectStarred);

    const showMore = () => {
        dispatch(setPage(page + 1));
    }

    useEffect(() => {
        const params: IParams = {page: page, pageSize: 12};
        dispatch(fetchDataAsync(params));
    }, [page, dispatch])

    return(
        <div>
            {data && data.length > 0 && 
            <div style={{backgroundColor: theme.backgroundColor}}>{data.filter(f => displayMode === "latest" || starred.includes(f.objectID)).map((x, i) => 
            <NewsItem key={i+1} item={x} itemNumber={i+1} starred={starred} toggleStarred={() => dispatch(toggleStarred(x.objectID))}/>)}
            <input type="button" style={{ border: 0, height: '30px', marginLeft: '50px', backgroundColor: 'orange', color: 'white', outline: 'none'}} value="show more" onClick={showMore}/>
            </div>}
        </div>
    )
}