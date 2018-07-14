$(function () {
  //  页面一加载就发送ajax请求
  var page = 1;
  var pageSize = 5;

  render();

  //  启用与禁用功能
  var id;
  var isDelete;

  $("tbody").on("click",".btn",function(){

    //  显示模态框
    $("#userModal").modal('show');

    //  获取id
    id = $(this).parent().data("id");

    //  isDelete 
    isDelete = $(this).hasClass("btn-success")?1:0;
    
  });
  $(".btn_confirm").on("click",function(){

    //  发送ajax请求
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:id,
        isDelete:isDelete,
      },
      success:function(info){
        if(info.success){
          //  隐藏模态框
          $("#userModal").modal("hide");
          
          render();
        }
      }
    })
    
  })




  function render() {
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:page,
        pageSize:pageSize,
      },
      success:function(info){
        console.log(info);
        //  让数据和模板绑定
        var html = template("tpl",info);
        $("tbody").html(html);

        //  分页的功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3, // 指定bootstrap版本
          size:'small', // 控件大小
          currentPage:page,//  当前页
          totalPages:Math.ceil(info.total/info.size),//  总页数
          onPageClicked:function(a,b,c,p){
            page= p;
            render();
            
          }
        });
      }
    })
  }
})