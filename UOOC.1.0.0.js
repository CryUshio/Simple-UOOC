jQuery(function($){
 	console.log("脚本载入成功");

	let cList = []; //chapterList
	let cIndex = 0; //chapterIndex
	let cId = '';
	let sList = {};   //sectionList
	let lock = 0;

	main();

	function main(){
		initial();
	}

	function process(ci){
		console.log('in process');
		cId = cList[ci];
		
		if(lock++ >2){
			 lock = 0;
			 return alert("请按顺序选择课程");
		}
		if(cIndex != 0 && cIndex == cList.length) return console.log("Process end! All thing's done!");
		if(!sList[cId].sl) return main();

		let vId = '#' + sList[cId].sl[sList[cId].si];
		let video = $(vId + ' div.resourcelist.ng-scope');
		if(video.length == 0) return $(vId).children().click();

		lock = 0;
		let vlid = selectVideo(video.children());
		$(video.children()[vlid]).click();
		setTimeout(()=>{
			$('#player_html5_api').trigger('play');//播放
			$("div[class*='vjs-vol-']").click();//静音
			$(".vjs-playback-rate ul[class='vjs-menu-content'] li")[0].click();//变速
			$('#player_html5_api').on({//监听视频结束
                pause: function(){
					$('#player_html5_api').trigger('play');
            	},
                ended: function(){
                    console.log('end')
                    if(sList[cId].si++ == sList[cId].sl.length){
                        cIndex++;
                        $('#' + cList[cIndex]).click()
                        return main()
                    } else {
						setTimeout(()=>{
							console.log("开始播放下一个视频");
							process(ci);
						},500)
                        
                    }
                }
            })
		},500);
	}

    function initial(){
        //章节列表
        let chapter = $("ul.rank-1 li[class='catalogItem ng-scope']");
        for(let i=0;i<chapter.length;i++){
            cList.push($(chapter[i]).attr('id'))
        }
        //console.log(chapterList);

        console.log("监听点击事件");

		let section = $("ul[class='rank-2 ng-scope'] li");
		
        console.log("init")
        chapter.click(function(){
            setChapterIndex($(this).attr('id'));
            cId = cList[cIndex];
            if(!sList[cId]){
                sList[cId] = { si: 0, sl: []};
                section = $("ul[class='rank-2 ng-scope'] li");
                for(let i=0;i<section.length;i++){
                   sList[cId].sl.push($(section[i]).attr('id'));
                }
            }
        })
        section.children("div[class*='complete']").click(function(e){
            setTimeout(()=>{
                console.log('section');
                setSectionIndex($(this).parent().attr('id'));
				setTimeout(()=>{
					process(cIndex);
				},100)
            }, 500)
        })
	}
	
	function setChapterIndex(item){
        for(let i = 0;i < cList.length;i++){
            if(cList[i] == item)
			    return cIndex = i;
        }
    }

	function setSectionIndex(item){
        for(let i = 0;i < sList[cId].sl.length;i++){
            if(sList[cId].sl[i] == item){
			   return sList[cId].si = i;
            }
        }
    }

   	function selectVideo(item){
    	for(let i=0;i<item.length;i++){
        	if($(item[i]).find('span.taskpoint').length != 0)
				return i;
		}
	}

});
