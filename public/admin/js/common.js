/* 
ajax有6个全局事件
  ajaxStart()
  ajaxSend()
  ajaxSuceess()
  ajaxError()
  ajaxComplete()
  ajaxStop()
*/
//$("div").click(function(){})
$(document).ajaxStart(function () {
  //ajax请求之前
  NProgress.start();
});

$(document).ajaxStop(function () {

  setTimeout(function () {
    //ajax请求之后
    NProgress.done();
  }, 500);

});



//二级菜单显示与隐藏效果
$(".second").prev().on("click", function () {
  $(this).next().slideToggle();
});


//侧边栏的显示与隐藏
$(".icon_menu").on("click", function () {
  $(".lt_aside").toggleClass("active");
  $("body").toggleClass("active");
});

//退出功能
//1. 给退出图标注册点击事件
//2. 让退出 模块框显示出来

//不要在事件内部注册事件
$(".icon_logout").on("click", function () {
  $("#logoutModal").modal("show");


});

//给退出按钮注册事件
$(".btn_logout").on("click", function () {
  
  //先发送ajax请求，告诉服务，我要退出，服务告诉你退出成功了，再跳转到login页面
  $.ajax({
    type: 'get',
    url: '/employee/employeeLogout',
    success: function(info){
      if(info.success) {
        location.href = "login.html";
      }
    }
  });
  
});

