jQuery(function($) {
  console.log("脚本载入成功");

  let cList = []; //chapterList
  let cIndex = 0; //chapterIndex
  let cId = '';
  let sList = []; //sectionList
  let si = 0; //sectionIndex
  let ssi = 0;
  let lock = 0;

  main();

  function main() {
    initial();
  }

  async function process(ci) {
    console.log('in process');
    cId = cList[ci];

    if (lock++ > 2) {
      lock = 0;
      return alert("请按顺序选择课程");
    }
    if (cIndex != 0 && cIndex == cList.length) return console.log("Process end! All thing's done!");

    let vId = '#' + sList[si];  //section 1.1
    let video = '';
    if($(vId + ' ul').length == 0) return $(vId).children().click(); //未展开
    if($(vId + ' ul').children().length != 0){ //三级课程 1.1.1
      $($(vId + ' ul').children()[ssi]).children().click();
      await sleep(500);
      video = $($($(vId + ' ul').children()[ssi]).children()[1]);
    }else{
      video = $(vId + ' div.resourcelist.ng-scope');
    }

    lock = 0;
    let vlid = selectVideo(video.children());
    $(video.children()[vlid]).click();
    setTimeout(() => {
      $('#player_html5_api').trigger('play'); //播放
      $("div.vjs-volume-menu-button").click(); //静音
      $(".vjs-playback-rate ul[class='vjs-menu-content'] li")[0].click(); //变速
      $('#player_html5_api').on({ //监听视频结束
        pause: function() {
          $('#player_html5_api').trigger('play');
        },
        ended: function() {
          console.log('end')
          if($(vId + ' ul').children().length != 0 && ++ssi < $(vId + ' ul').children().length){
            return process(ci);
          }
          if($(vId + ' ul').children().length != 0 && ssi == $(vId + ' ul').children().length){
            ssi = 0;
            return process(ci);
          }
          if (++si == sList.length) {
            console.log("开始播放下一章");
            si = 0;
            cIndex++;
            $('#' + cList[cIndex]).children().click();
            setTimeout(()=>{
              $('#' + sList[si]).children("div[class*='complete']").click();
              return;
            }, 1000)
          } else {
            setTimeout(() => {
              console.log("开始播放下一个视频");
              process(ci);
            }, 1000)
          }
        }
      })
    }, 1000);
  }

  function initial() {
    //章节列表
    let chapter = $("ul.rank-1 li[class='catalogItem ng-scope']");
    for (let i = 0; i < chapter.length; i++) {
      cList.push($(chapter[i]).attr('id'))
    }
    //console.log(chapterList);

    console.log("监听点击事件");

    console.log("init")


    chapter.children("div").click(function() {
      let section = '';
      sList = [];  //新章节section
      setTimeout(()=>{
        setChapterIndex($(this).parent().attr('id'));
        section = $("ul[class='rank-2 ng-scope'] li");
        for (let i = 0; i < section.length; i++) {
          sList.push($(section[i]).attr('id'));
        }
        if (!section || section.length == 0) return;

        setTimeout(()=>{
          section.children("div[class*='complete']").click(function(e) {
            console.log('section');
            setSectionIndex($(this).parent().attr('id'));
            setTimeout(() => { process(cIndex) }, 1000);
          })
        }, 200)
      },100)
    })

  }

  function setChapterIndex(item) {
    for (let i = 0; i < cList.length; i++) {
      if (cList[i] == item)
        return cIndex = i;
    }
  }

  function setSectionIndex(item) {
    for (let i = 0; i < sList.length; i++) {
      if (sList[i] == item) {
        return si = i;
      }
    }
  }

  function selectVideo(item) {
    for (let i = 0; i < item.length; i++) {
      if ($(item[i]).find('span.taskpoint').length != 0)
        return i;
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

});
