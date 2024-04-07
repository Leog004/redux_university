import React from 'react';
import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({timeStap}) => {
    let timeAgo = '';

    if(timeStap){
        const date = parseISO(timeStap);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timeStap}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}

export default TimeAgo;