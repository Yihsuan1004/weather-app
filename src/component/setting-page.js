import React from 'react';

export const SettingPage= () =>{
    return (
        <div>
            <div className="setting-page">
                <div className="title">
                    設定
                </div>
                <div>
                    <div className="sub-title">
                        選擇地區
                    </div>
                    <select>
                        <option>台北市</option>
                        <option>新北市</option>
                    </select>
                    <div className="btn-container">
                        <button className="back-btn">返回</button>
                        <button className="save-btn">儲存</button>
                    </div>
                </div>
            </div>
            <div className="body-wrap"></div>
        </div>
        
    )
}