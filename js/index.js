$(function () {

    //轮播图
    bannerListFn(
        $(".banner"),
        $(".img-btn-list"),
        $(".left-btn"),
        $(".right-btn"),
        4000,
        true
    );

    var perPosY=0;
    $(window).scroll(function () {
        //兼容safari firefox chrome
        var top =document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;
        if (top>400){
            $(".header").hide();
        }
        else
        {
            $(".header").show();
        }
        perPosY =top;
    });

    $(".search").click(function () {
        console.log($(".search_value").val());
    });

    //封装tab 切换方法
    function tabsSwitch(callback){
        //使用顶级对象作为代理人，防止按钮不响应事件
        //第一次使用，触发事件
        callback("#####","#####",0);
        $(document).on("mouseenter",".catagroy .tabs li",function () {
            //首先将本li的背景颜色改变，然后去掉其他li的背景颜色
            $(this).addClass("now").siblings().removeClass("now");
            //接下来根据 $(this)身上的data-id 找到要显示的元素
            var parent =$(this).parents(".catagroy").eq(0);
            var targetPage = parent.find($(this).attr("data-id"));

            //根据元素进行切换
            targetPage.show().siblings().hide();
            //进行回调,返回插件根元素 id ,当前切换元素的显示的元素id,当前显示元素的序号
            callback(parent.attr("id"),targetPage.attr("id"),targetPage.index());
        });
    }
    /*******进行优化，使用懒加载插件********/


    tabsSwitch(function () {
        var typeList ={
            "movie":"dianying", "tv":"dianshiju", "zy":"zongyi", "action":"dongzuo", "war":"zhanzheng",
            "fz":"fanzui", "fun":"xiju", "story":"juqing", "love":"aiqing", "animate":"donghua",
            "risk":"maoxian", "queer":"qihuan", "science":"kehuan",
            "fav_video":"zonghe1","fav_movie":"zonghe2","fav_funs":"zonghe3","fav_animate":"zonghe4"
        };
        //首先判断是不是第一次加载
        if (arguments[0]=="#####"){
            getData("http://www.alixiaoshuo.top/api/movie.php?tag=dianying","#hotVideo  #movie","item-artTemplate",false);
            getData("http://www.alixiaoshuo.top/api/movie.php?tag=dongzuo","#hotMovie  #action","item-artTemplate",false);
            getData("http://www.alixiaoshuo.top/api/movie.php?tag=xiju","#hotFuns  #fun","item-artTemplate",false);
            getData("http://www.alixiaoshuo.top/api/movie.php?tag=donghua","#hotAnimate  #animate","item-artTemplate",false);
            getData("http://www.alixiaoshuo.top/api/movie.php?tag=zonghe1","#hotVideo #fav_video","fav-artTemplate",false);
            getData("http://www.alixiaoshuo.top/api/movie.php?tag=zonghe2","#hotMovie #fav_movie","fav-artTemplate",false);
            getData("http://www.alixiaoshuo.top/api/movie.php?tag=zonghe3","#hotFuns #fav_funs","fav-artTemplate",false);
            getData("http://www.alixiaoshuo.top/api/movie.php?tag=zonghe4","#hotAnimate #fav_animate","fav-artTemplate",false);
        }
        else
        {
            var baseUrl ="http://www.alixiaoshuo.top/api/movie.php?tag=";
            var url =baseUrl+typeList[arguments[1]];
            var selector ="#"+arguments[0]+" #"+arguments[1];
            getData(url,selector,"item-artTemplate",false);

            $("img.lazy").lazyload({
                placeholder:"images/loading.gif",
                threshold: window.screen.height
            });
        }
    });

    //这里是用来让图片放大的方法
    var float_img =$("#float_img");
    $(document).on("mouseenter",".mini_img",function () {
        //首先获取本身图片赋值给maxImg 下面的img
        float_img.find("img").attr("src",$(this).attr("src"));
        //接下来设置位置
        var thisX =$(this).position().left;
        var thisY =$(this).position().top;
        var targetX =thisX-float_img.width()-20;
        var targetY =thisY+$(this).height()/2-float_img.height()/2;
        float_img.css({left:targetX+"px",top:targetY+"px"});

        float_img.stop(true,true).fadeIn();
    });
    $(document).on("mouseleave",".mini_img",function () {
        float_img.stop(true,true).fadeOut();
    });


    //这里是点击电影，显示详情的方法
    
    $(document).on("click",".details",function () {
        var target =$("#float_details");
        var that =$(this);
        target.stop().slideDown(function () {
            target.find(".content").attr("src","detail.html?id="+that.attr("data-id"));
        });
    });

    $("#float_details .close").on("click",function () {
        var parent =$(this).parent();
        parent.stop().slideUp(function () {
            parent.find(".content").attr("src","");
        });
    });

    //封装的方法，用于往页面填充数据，为了保证灵活，已不再封装
    function getData(url,selector,templateId,isAdd) {
        //在这里进行阻止调用
        if (window[url]) return;
        $.ajax({url:url,
            dataType:"jsonp",
            type:"get",
            success:function (res) {
                if (isAdd){
                    $(selector).append(template(templateId,{data:measureData(res)}));
                }
                else
                {
                    $(selector).html(template(templateId,{data:measureData(res)}));
                }
                $("img.lazy").lazyload({
                    placeholder:"images/loading.gif",
                    threshold: window.screen.height
                });
                window[url]=true;
            }
        });
    }


    //处理数据，获得需要的数据
    function measureData(data) {
        if (!data) return {};
        if (!data["subjects"]) return {};
        var objectList=new Array();
        var subject =data["subjects"];
        for (var i=0;i<subject.length;i++){
            var object={};
            //获得评分
            object["mark"]=subject[i]["rating"]["average"].toString().length>1?subject[i]["rating"]["average"]:subject[i]["rating"]["average"]+".0";
            object["title"]=subject[i]["title"];
            //获得 id
            object["id"]=subject[i]["id"];
            //获得年份
            object["year"]=subject[i]["year"];
            //获得图片
            object["image"]=measureImagePath(subject[i]["images"]["medium"]);
            //获得类型
            object["type"]=subject[i]["genres"].join(",");

            objectList.push(object);
        }
        return objectList;
    }

    function measureImagePath(url) {
        var rootPath ="http://www.alixiaoshuo.top/public/";
        var lastPath =url.split("/").pop();
        return rootPath+lastPath;
    }
});