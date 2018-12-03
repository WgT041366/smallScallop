//判断访问终端
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

// 获取链接数据
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

$(function(){
	console.log( window.location);

	var crowd_name = getQueryString('name');

	// 判断是否为微信
	if (browser.versions.weixin) {
		$('section.loader').css('display','none');
		$("#weixinTip").css("display", "block");
	}
	$("#weixinTip").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $("#weixinTip").css("display", "none");
    });

	// 获取数据
	$.ajax({  
	    data:{page:crowd_name}, 
	    dataType: "json",
	    type: "get",
	    url: "/getJobs",
	    success: function(data){  
	    	// console.log(data.bigoo.bg_img);
	    	if (data.bigoo.bg_img != null) {
	    		$('.center_img').html('<img id="bg_img" src="'+data.bigoo.bg_img+'">')
	    	}
	    	
	        $('#bg_name').text(data.bigoo.bg_title);
	        $('#bg_cont').html(data.bigoo.bg_cont);
	        $('#bg_members').text(data.bigoo.bg_extra);

	        $('section.loader').css('display','none');
	    },
	    error: function(){ 
	    	console.log("未获取数据");
	    }
	});


	
	var ios_href = 'itms-services://?action=download-manifest&url=https://bigoo.io/download/manifest.plist';
	var android_href = 'https://bigoo.io/download/bigoo.apk';

	// 下载币谷
	$('.download').one('click', function(event) {
		/* Act on the event */
		event.preventDefault();

		if (browser.versions.ios) {
			window.location.href = ios_href;
		}else{
			
			window.location.href = android_href;
		}
	});

	// 
	$('#bg_button').one('click', function(event) {
		/* Act on the event */
		event.preventDefault();

		$('#bg_button').css('display','none')
		if (browser.versions.ios) {
			window.location.href = 'bigooAppEnterprise://resolve?domain='+crowd_name;
			$('.bg_download').attr('href',ios_href);
			$('.bg_download').text('下载 iOS 版');
			
		}else{
			window.location.href = 'bigoo://resolve?domain='+crowd_name;
			$('.bg_download').attr('href',android_href);
			$('.bg_download').text('下载 安卓 版');
		}

		$('.bg_download').css('display','block');
	});


})














