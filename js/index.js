$(function () {
    $(".catagroy .tabs").on("mouseenter","li",function () {
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
});