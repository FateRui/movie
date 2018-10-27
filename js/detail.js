$(function () {

    var id =getId(location.search);

    var url ="https://api.douban.com/v2/movie/subject/"+id;
    $.ajax({url:url,dataType:"jsonp",type:"get",success:function (res) {
            $(".container").html(template("content",{data:res}));
    }});

   function getId(href) {
        href=href.replace("?","");
        return href.split("=")[1];
    }

});