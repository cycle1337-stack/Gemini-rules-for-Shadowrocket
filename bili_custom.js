let obj = JSON.parse($response.body);

if ($request.url.includes("resource/show/tab")) {
    // 1. 顶部标签页精简：强制只保留 直播、推荐、热门
    if (obj.data && obj.data.top_left) {
        obj.data.top_left = obj.data.top_left.filter(item => 
            ["直播", "推荐", "热门"].includes(item.name)
        );
    }
    
    [span_1](start_span)// 2. 找回消息图标：精准保留“消息”，剔除“游戏中心”和“皮肤”
    if (obj.data && obj.data.top) {
        obj.data.top = obj.data.top.filter(item => 
            item.name === "消息" || item.tab_id === "消息"
        );
    }

    [span_2](start_span)// 3. 彻底干掉“更多”按钮和右上角活动入口
    if (obj.data) {
        obj.data.top_more = [];
    }
}

$done({body: JSON.stringify(obj)});
