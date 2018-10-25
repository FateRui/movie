$(function () {

    //使用顶级对象作为代理人，防止按钮不响应事件
    $(document).on("mouseenter",".catagroy .tabs li",function () {
        //获取当前li的索引
        var index =$(this).index();
        //首先将本li的背景颜色改变，然后去掉其他li的背景颜色
        $(this).addClass("now").siblings().removeClass("now");
        //接下来，根据index,切换页面
        //首先获取到所有的页面
        //接下来在元素内部查找，以免出现BUG
        // 首先找到根父元素
        var parent =$(this).parent().parent().siblings(".target");

        var pages =parent.find("ul");

        var targetPage =pages.eq(index);
        //自己显示，其他的隐藏
        targetPage.show().siblings().hide();
    });


    /************热门视频**************/
    getData("http://api.douban.com/v2/movie/search?tag=电影&count=10",".hotVideo .target #movie","item-artTemplate",false);

    getData("http://api.douban.com/v2/movie/search?tag=电视剧&count=10",".hotVideo .target #tv","item-artTemplate",true);

    getData("http://api.douban.com/v2/movie/search?tag=综艺&count=10",".hotVideo .target #zy","item-artTemplate",true);

    getData("http://api.douban.com/v2/movie/in_theaters?count=10",".hotVideo #fav_video","fav-artTemplate",false);
    /************结束-------热门视频**************/

    /************动作大片**************/
    getData("http://api.douban.com/v2/movie/search?tag=动作&count=10",".hotMovie .target #action","item-artTemplate",false);

    getData("http://api.douban.com/v2/movie/search?tag=战争&count=10",".hotMovie .target #war","item-artTemplate",true);

    getData("http://api.douban.com/v2/movie/search?tag=犯罪&count=10",".hotMovie .target #fz","item-artTemplate",true);

    getData("http://api.douban.com/v2/movie/in_theaters?count=10&page=10",".hotMovie #fav_movie","fav-artTemplate",false);
    /************结束-------动作大片**************/
    //封装的方法，用于往页面填充数据，为了保证灵活，已不再封装
    function getData(url,selector,templateId,isAdd) {
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
            }
        });
    }

    //接下来，处理三页的数据

    //处理数据，获得需要的数据
    function measureData(data) {
        if (!data) return {};
        if (!data["subjects"]) return {};
        var objectList=new Array();
        var subject =data["subjects"];
        for (let i=0;i<subject.length;i++){
            var object={};
            //获得评分
            object["mark"]=subject[i]["rating"]["average"].toString().length>1?subject[i]["rating"]["average"]:subject[i]["rating"]["average"]+".0";
            object["title"]=subject[i]["title"];
            //获得 id
            object["id"]=subject[i]["id"];
            //获得年份
            object["year"]=subject[i]["year"];
            //获得图片
            object["image"]=subject[i]["images"]["medium"];
            //获得类型
            object["type"]=subject[i]["genres"].join(",");

            objectList.push(object);
        }
        return objectList;
    }
});