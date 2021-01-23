//百度地图API功能
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        //console.log(r.point.lng + "," + r.point.lat); //经纬度
        getAddress(r.point.lng, r.point.lat);
    } else {
        alert('failed' + this.getStatus());
    }
}, {
    enableHighAccuracy: true
})
var province;
var city;
var detail;
var LOCATION;
var hour_temp_chart = echarts.init(document.getElementById('hour_temp'));
var hour_temp_option = {
    title: {
        text: ''
    },
    tooltip: {},
    legend: {
        data: ['温度', '相对湿度']
    },
    xAxis: {
        data: []
    },
    dataZoom: [{
        type: "slider",
        realtime: true,
        start: 0,
        end: 25,
        xAxisIndex: [0],
    }, ],
    yAxis: {},
    series: [{
        name: '温度',
        type: 'line',
        data: []
    }, {
        name: '相对湿度',
        type: 'bar',
        data: []
    }]
};
var LOCATION;
var daily_temp_chart1 = echarts.init(document.getElementById('daily_temp1'));
var daily_temp_option1 = {
    title: {
        text: ''
    },
    tooltip: {},
    legend: {
        data: ['最低温度', '最高温度', '相对湿度']
    },
    xAxis: {
        data: []
    },
    dataZoom: [{
        type: "slider",
        realtime: true,
        start: 0,
        end: 50,
        xAxisIndex: [0],
    }, ],
    yAxis: {},
    series: [{
        name: '最低温度',
        type: 'line',
        data: []
    }, {
        name: '最高温度',
        type: 'line',
        data: []
    }, {
        name: '相对湿度',
        type: 'bar',
        data: []
    }]
};
var daily_temp_chart2 = echarts.init(document.getElementById('daily_temp2'));
var daily_temp_option2 = {
    title: {
        text: ''
    },
    tooltip: {},
    legend: {
        data: ['最低温度', '最高温度', '相对湿度']
    },
    xAxis: {
        data: []
    },
    dataZoom: [{
        type: "slider",
        realtime: true,
        start: 0,
        end: 50,
        xAxisIndex: [0],
    }, ],
    yAxis: {},
    series: [{
        name: '最低温度',
        type: 'line',
        data: []
    }, {
        name: '最高温度',
        type: 'line',
        data: []
    }, {
        name: '相对湿度',
        type: 'bar',
        data: []
    }]
};

function sear() {
    LOCATION = document.getElementById("loc").value;
    weanow(LOCATION);
    weahourly(LOCATION);
    weadaily(LOCATION);
}

function getAddress(lng, lat) {
    var myGeo = new BMap.Geocoder();
    myGeo.getLocation(new BMap.Point(lng, lat), function(result) {
        if (result) {
            province = result.addressComponents.province;
            city = result.addressComponents.city;
            detail = result.address;
            LOCATION = result.addressComponents.city;
            if (province == city) {
                document.getElementById("myloc").innerText = province;
            } else {
                document.getElementById("myloc").innerText = province + city;
            }
            weanow(LOCATION);
            weahourly(LOCATION);
            weadaily(LOCATION);
        }
    });

}
var jsonpCallback = function(data) {
    var weather = data.results[0];
    // console.log(weather.location.path);
    // console.log(data);
    document.getElementById("now_city").innerHTML = weather.location.name;
    document.getElementById("now_temp_num").innerHTML = weather.now.temperature + "°C";
    document.getElementById("now_weath_text").innerHTML = weather.now.text;
    document.getElementById("now_weath_img").src = "white\\" + weather.now.code + "@1x.png";
    document.getElementById("now_update").innerHTML = "更新时间为：<br/\>" + weather.last_update.split('T')[0] + " " + weather.last_update.split('T')[1].split('+')[0];
    document.getElementById("now_wind").innerHTML = "今日风向为：" + weather.now.wind_direction + "风" + "<br/\>" + "风力等级为：" + weather.now.wind_scale + "级" + "<br/\>" + "风速为：" + weather.now.wind_speed + "km/h";
    document.getElementById("now_feel").innerHTML = "体感温度为：" + weather.now.feels_like + "°C" + "<br/\>" + "相对湿度为：" + weather.now.humidity + "%";
}

var jsonpCallback1 = function(data) {
    var weather = data.results[0];
    // console.log(data);
    for (var i = 0; i < 24; i += 3) {
        hour_temp_option.xAxis.data[i / 3] = weather.hourly[i].time.split('T')[1].split('+')[0];
        hour_temp_option.series[0].data[i / 3] = weather.hourly[i].temperature;
        hour_temp_option.series[1].data[i / 3] = weather.hourly[i].humidity;
        document.getElementById("hour_" + (i / 3)).innerHTML = ""
        document.getElementById("hour_" + (i / 3)).innerHTML += weather.location.name + "<br/\>";
        document.getElementById("hour_" + (i / 3)).innerHTML += weather.hourly[i].time.split('T')[1].split('+')[0] + "<br/\>";
        document.getElementById("hour_" + (i / 3)).innerHTML += weather.hourly[i].temperature + "°C" + "<br/\>";
        document.getElementById("hour_" + (i / 3)).innerHTML += weather.hourly[i].wind_direction + "风 " + weather.hourly[i].wind_speed + "km/h" + "<br/\>";
        document.getElementById("hour_" + (i / 3)).innerHTML += weather.hourly[i].text + "<br/\>";
        document.getElementById("hour_" + (i / 3)).innerHTML += "<img src = '" + "white\\" + weather.hourly[i].code + "@1x.png" + "'>" + "<br/\>";
        hour_temp_chart.setOption(hour_temp_option);
    }
}
var jsonpCallback2 = function(data) {
    var weather = data.results[0];
    // console.log(data);
    document.getElementById("now_today").innerHTML = "白天：" + weather.daily[0].text_day + "<br/\>夜间：" + weather.daily[0].text_night + "<br/\>温度范围：" + weather.daily[0].low + "~" + weather.daily[0].high + "°C";
    for (var i = 1; i < 7; i++) {
        daily_temp_option1.xAxis.data[i - 1] = weather.daily[i].date;
        daily_temp_option1.series[0].data[i - 1] = weather.daily[i].low;
        daily_temp_option1.series[1].data[i - 1] = weather.daily[i].high;
        daily_temp_option1.series[2].data[i - 1] = weather.daily[i].humidity;
        document.getElementById("day_" + i).innerHTML = ""
        document.getElementById("day_" + i).innerHTML += weather.location.name + "<br/\>";
        if (i == 1) {
            document.getElementById("day_" + i).innerHTML += "明天" + "<br/\>";
        } else if (i == 2) {
            document.getElementById("day_" + i).innerHTML += "后天" + "<br/\>";
        } else {
            document.getElementById("day_" + i).innerHTML += weather.daily[i].date + "<br/\>";
        }
        document.getElementById("day_" + i).innerHTML += weather.daily[i].low + "~" + weather.daily[i].high + "°C" + "<br/\>";
        document.getElementById("day_" + i).innerHTML += weather.daily[i].wind_direction + "风 " + weather.daily[i].wind_speed + "km/h" + "<br/\>";
        document.getElementById("day_" + i).innerHTML += "白天：" + weather.daily[i].text_day + "<br/\>";
        document.getElementById("day_" + i).innerHTML += "<img src = '" + "white\\" + weather.daily[i].code_day + "@1x.png" + "'>" + "<br/\>";
        document.getElementById("day_" + i).innerHTML += "夜间：" + weather.daily[i].text_night + "<br/\>";
        document.getElementById("day_" + i).innerHTML += "<img src = '" + "white\\" + weather.daily[i].code_night + "@1x.png" + "'>" + "<br/\>";
        daily_temp_chart1.setOption(daily_temp_option1);
    }
    for (var i = 7; i < 15; i++) {
        daily_temp_option2.xAxis.data[i - 7] = weather.daily[i].date;
        daily_temp_option2.series[0].data[i - 7] = weather.daily[i].low;
        daily_temp_option2.series[1].data[i - 7] = weather.daily[i].high;
        daily_temp_option2.series[2].data[i - 7] = weather.daily[i].humidity;
        document.getElementById("day_" + i).innerHTML = ""
        document.getElementById("day_" + i).innerHTML += weather.location.name + "<br/\>";
        document.getElementById("day_" + i).innerHTML += weather.daily[i].date + "<br/\>";
        document.getElementById("day_" + i).innerHTML += weather.daily[i].low + "~" + weather.daily[i].high + "°C" + "<br/\>";
        document.getElementById("day_" + i).innerHTML += weather.daily[i].wind_direction + "风 " + weather.daily[i].wind_speed + "km/h" + "<br/\>";
        document.getElementById("day_" + i).innerHTML += "白天：" + weather.daily[i].text_day + "<br/\>";
        document.getElementById("day_" + i).innerHTML += "<img src = '" + "white\\" + weather.daily[i].code_day + "@1x.png" + "'>" + "<br/\>";
        document.getElementById("day_" + i).innerHTML += "夜间：" + weather.daily[i].text_night + "<br/\>";
        document.getElementById("day_" + i).innerHTML += "<img src = '" + "white\\" + weather.daily[i].code_night + "@1x.png" + "'>" + "<br/\>";
        daily_temp_chart2.setOption(daily_temp_option2);
    }
}

function weanow(LOCATION) {
    //加密获得signature的方式直接白嫖官方的demo了......
    var UID = "P86nFIQqy_FcwK9P7"; //我的公钥
    var KEY = "S85D0hc7e2xBTkazb"; //我的密钥
    // var UID = "PSezKSGBaLlr7-EP6"; //我的公钥
    // var KEY = "SJXwPupqny1G_bgzK"; //我的密钥
    var API = "http://api.seniverse.com/v3/weather/now.json";
    var ts = Math.floor((new Date()).getTime() / 1000);
    var str = "ts=" + ts + "&uid=" + UID;
    // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串（raw）进行加密
    // 并将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
    var sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64);
    sig = encodeURIComponent(sig);
    str = str + "&sig=" + sig;
    var url = API + "?location=" + LOCATION + "&" + str + "&callback=jsonpCallback";
    // console.log(url);
    $(function() { //判断城市是否存在
        var Url = url;
        // console.log(Url); //测试用
        $.ajax({
            url: Url,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            statusCode: {
                404: function() {
                    alert("您所输入的城市不存在！");
                }
            }
        });

    });
    // 向 HTML 中动态插入 script 标签，通过 JSONP 的方式进行调用
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = url;
    $('body').append(newScript);
}

function weahourly(LOCATION) {
    //加密获得signature的方式直接白嫖官方的demo了......
    var UID = "P86nFIQqy_FcwK9P7"; //我的公钥
    var KEY = "S85D0hc7e2xBTkazb"; //我的密钥
    // var UID = "PSezKSGBaLlr7-EP6"; //我的公钥
    // var KEY = "SJXwPupqny1G_bgzK"; //我的密钥
    var API = "http://api.seniverse.com/v3/weather/hourly.json";
    var ts = Math.floor((new Date()).getTime() / 1000);
    var str = "ts=" + ts + "&uid=" + UID;
    // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串（raw）进行加密
    // 并将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
    var sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64);
    sig = encodeURIComponent(sig);
    str = str + "&sig=" + sig;
    var url = API + "?location=" + LOCATION + "&" + str + "&callback=jsonpCallback1";
    // console.log(url);
    $(function() { //判断城市是否存在
        var Url = url;
        // console.log(Url); //测试用
        $.ajax({
            url: Url,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            statusCode: {
                404: function() {
                    alert("您所输入的城市不存在！");
                }
            }
        });

    });
    // 向 HTML 中动态插入 script 标签，通过 JSONP 的方式进行调用
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = url;
    $('body').append(newScript);
}

function weadaily(LOCATION) {
    //加密获得signature的方式直接白嫖官方的demo了......
    var UID = "P86nFIQqy_FcwK9P7"; //我的公钥
    var KEY = "S85D0hc7e2xBTkazb"; //我的密钥
    // var UID = "PSezKSGBaLlr7-EP6"; //我的公钥
    // var KEY = "SJXwPupqny1G_bgzK"; //我的密钥
    var API = "http://api.seniverse.com/v3/weather/daily.json";
    var ts = Math.floor((new Date()).getTime() / 1000);
    var str = "ts=" + ts + "&uid=" + UID;
    // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串（raw）进行加密
    // 并将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
    var sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64);
    sig = encodeURIComponent(sig);
    str = str + "&sig=" + sig;
    var url = API + "?location=" + LOCATION + "&" + str + "&callback=jsonpCallback2";
    // console.log(url);
    $(function() { //判断城市是否存在
        var Url = url;
        // console.log(Url); //测试用
        $.ajax({
            url: Url,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            statusCode: {
                404: function() {
                    alert("您所输入的城市不存在！");
                }
            }
        });

    });
    // 向 HTML 中动态插入 script 标签，通过 JSONP 的方式进行调用
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = url;
    $('body').append(newScript);
}