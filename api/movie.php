<?php
	header("Content-Type:application/json");
	//如果不是GET请求，返回
	if(!$_SERVER["REQUEST_METHOD"]=="GET") return;
	
	if(!isset($_GET["tag"])) return;
	
	$type =$_GET["tag"];
	
	if(isset($_GET["callback"])) $callback =$_GET["callback"];
	
	//根据名字查找数据
	$fileList =array(
					"xiju"=>"xiju.json",
					"aiqing"=>"aiqing.json",
					"juqing"=>"juqing.json",
					"zhanzheng"=>"zhanzheng.json",
					"dongzuo"=>"dongzuo.json",
					"fanzui"=>"fanzui.json",
					"donghua"=>"donghua.json",
					"maoxian"=>"maoxian.json",
					"qihuan"=>"qihuan.json",
					"kehuan"=>"kehuan.json",
					"dianying"=>"dianying.json",
					"dianshiju"=>"dianshiju.json",
					"zongyi"=>"zongyi.json",
					"zonghe1"=>"zonghe1.json",
					"zonghe2"=>"zonghe2.json",
					"zonghe3"=>"zonghe3.json",
					"zonghe4"=>"zonghe4.json"
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