
/*-- Format:  yyyy/mm/dd --*/
export function dateBuilder (d){
    let days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let day = days[d.getDay()];
    let month = d.getMonth() + 1;  // getMonth() is zero-based
    let date = d.getDate();
    let year = d.getFullYear();
    return `${year}/${month}/${date} ${day}`
}

/*-- Format:  yyyy-mm-dd --*/
export function dateFormater (d){
    let year = d.getFullYear();
    let month = d.getMonth() + 1 > 9 ?  d.getMonth() + 1 : '0' + (d.getMonth() + 1); 
    let date = d.getDate();
    return `${year}-${month}-${date}`
}

/*-- Format:   hh-mm-ss --*/
export function hourMinuteFormater (d){
    let hour = d.getHours() > 9 ?  d.getHours()  : '0' + d.getHours(); 
    let minute = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
    if(hour > 12){
        const transhour = hour % 12
        return transhour === 0 ? `上午${hour}:${minute}` : `下午${transhour}:${minute}`;
    }
    else{
        return hour%12 === 0 ? `下午${hour}:${minute}` : `上午${hour}:${minute}`;
    }
}

