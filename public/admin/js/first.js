$(function () {
  //  渲染列表数据
  var page = 1;
  var pageSize = 5;
  //  页面一加载 就渲染
  render();
  //  添加功能
  //  给添加按钮注册点击事件
  $(".btn_add").on("click",function () {
    $("#addModal").modal('show');
    
  });

  //  表单校验
  $("form").bootstrapValidator({
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'一级分类的名称不能为空'
          }
        }
      }
    },
     //配置小图标的规则
     feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    }
  });
  //  给表单注册校验成功事件 阻止表单的默认提交 改用ajax提交
  $("form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$("form").serialize(),
      success:function (info) {
        // console.log(info);
       
       if(info.success){
          //  成功的时候隐藏模态框
        $("#addModal").modal('hide');
        //  重新渲染第一页
        page=1;
        render();
        //  重置表单
        $("form").data("bootstrapValidator").resetForm(true);
       }
      }
    })
    
  });


  function render() {
    //  发送ajax请求
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize,
      },
      success: function (info) {
        console.log(info);
        $("tbody").html(template("tpl", info));


        //  分页的功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, // 指定bootstrap版本
          size: 'small', // 控件大小
          currentPage: page,//  当前页
          totalPages: Math.ceil(info.total / info.size),//  总页数
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();

          }
        });
      }
    })
  }
})