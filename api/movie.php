<?php
	header("Content-Type:application/json");
	//如果不是GET请求，返回
	if(!$_SERVER["REQUEST_METHOD"]=="GET") return;
	
	if(!isset($_GET["tag"])) return;
	
	$type =$_GET["tag"];
	
	if(isset($_GET["callback"])) $callback =$_GET["callback"];
	
	//根据名字查找数据
	$fileList =array(
					"喜剧"=>"xiju.json",
					"爱情"=>"aiqing.json",
					"剧情"=>"juqing.json",
					"战争"=>"zhanzheng.json",
					"动作"=>"dongzuo.json",
					"犯罪"=>"fanzui.json",
					"动画"=>"donghua.json",
					"冒险"=>"maoxian.json",
					"奇幻"=>"qihuan.json",
					"科幻"=>"kehuan.json",
					"电影"=>"dianying.json",
					"电视剧"=>"dianshiju.json",
					"综艺"=>"zongyi.json",
					"综合1"=>"zonghe1.json",
					"综合2"=>"zonghe2.json",
					"综合3"=>"zonghe2.json"
					);
	
	$filePath =@$fileList[$type];
	
	if(!file_exists($filePath)){
		if($callback)
		{
			echo $callback.'('.json_encode(array("message"=>"该栏目未收录")).');';
		}
		else {
			echo json_encode(array("message"=>"该栏目未收录"));
		}
		
	}else {
		
		if(isset($callback))
		{
			echo @$callback.'('.file_get_contents($filePath).');';
		}
		else {
			echo file_get_contents($filePath);
		}
}
	
?>