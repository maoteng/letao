
$(function () {
  //  渲染商品列表
  var page = 1;
  var pageSize = 2;

  var imgs = [];  //  用于存放上传的图片并返回来的结果

  render();


  //  点击添加商品 显示模态框
  $(".btn_add").on("click", function () {
    //2.1 显示模态框
    $("#addModal").modal('show');


    //2.2 发送ajax请求，获取到二级分类的数据
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);
        $(".dropdown-menu").html(template("tpl2", info));
      }
    })
  });

  // 给dropdown-menu下的a注册点击事件（委托）
  $(".dropdown-menu").on("click", "a", function () {
    //  获取到当前a的文本的内容
    $(".dropdown-text").text($(this).text());

    //  获取到id
    $("[name='brandId']").val( $(this).data("id"));

    //  修改categoryId的校验状态，通过
    $("form").data("bootstrapValidator").updateStatus("brandId", "VALID");

  });


  //  图片上传功能
  $("#fileupload").fileupload({
    done:function (e,data) {
      if(imgs.length==3){
        return;
      }
      // console.log(data.result);
      //  好处:确定已经上传了几张图片
      //  添加商品的时候通过$(form).serialize() 可以获取到8个参数         
      imgs.push(data.result);// 把图片上传的结果存放到数组中
      //  图片上传成功 
      //  1.新增一张图片到img_box中
      $('<img src="'+ data.result.picAddr +'" width="100" height="100" alt="">').appendTo(".img_box")
      
      if(imgs.length === 3){
        //  让图片校验通过
        $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");

      }else{
        //  让图片的校验不通过
        $("form").data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
      }
    }
  })



  //  表单校验
    //5. 表单校验
    $("form").bootstrapValidator({
      fields: {
        brandId: {
          validators: {
            notEmpty: {
              message: '请选择二级分类'
            }
          }
        },
        proName: {
          validators: {
            notEmpty: {
              message: '请输入商品的名称'
            }
          }
        },
        proDesc: {
          validators: {
            notEmpty: {
              message: '请输入商品的描述'
            }
          }
        },
        num: {
          validators: {
            notEmpty: {
              message: '请输入商品的库存'
            },
            //  正则校验
            regexp:{
              regexp:/^[1-9]\d{0,4}$/,
              message: '请输入正确的库存(1-99999)'
            }
          }
        },
        
        size: {
          validators: {
            notEmpty: {
              message: '请输入商品的尺码'
            },
            regexp:{
              regexp:/^\d{2}-\d{2}$/,
              message: '请输入正确的尺码(xx-xx)'
            }
          }
        },
        oldPrice: {
          validators: {
            notEmpty: {
              message: '请输入商品的原价'
            }
          }
        },
        price: {
          validators: {
            notEmpty: {
              message: '请输入商品的价格'
            }
          }
        },
        brandLogo:{
          validators: {
            notEmpty: {
              message: '请上传三张图片'
            }
          }
        },
  
      },
      //配置不做校验的类型
      excluded: [],
      //配置小图标的规则
      feedbackIcons: {
        valid: 'glyphicon glyphicon-thumbs-up',
        invalid: 'glyphicon glyphicon-thumbs-down',
        validating: 'glyphicon glyphicon-refresh'
      }
    });



  //  给表单注册校验成功的时候
  $("form").on("success.form.bv", function(e){
    e.preventDefault();
    var param = $("form").serialize();
    param += "&picName1="+imgs[0].picName +"&picAddr1="+imgs[0].picAddr;
    param += "&picName2="+imgs[1].picName +"&picAddr2="+imgs[1].picAddr;
    param += "&picName3="+imgs[2].picName +"&picAddr3="+imgs[2].picAddr;

    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: param,
      success:function(info){
        if(info.success) {
          //隐藏模态框
          $("#addModal").modal('hide');
          //重新渲染第一页
          page = 1;
          render();
          //重置表单的样式
          $("form").data("bootstrapValidator").resetForm(true);

          $(".dropdown-text").text("请选择二级分类");
          $(".img_box img").remove();
        }
      }
    });
  });



  function render() {
    //  发送ajax请求
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        $("tbody").html(template("tpl", info));

        //  分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,// 必须指定
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),//  总页数

          itemTexts: function (type,page,current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return "第"+ page + "页";
            }
          },
          tooltipTitles: function (type,page,current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return "第"+ page + "页";
            }
          },

          useBootstrapTooltip:true,
          bootstrapTooltipOptions: {
            placement:"bottom"
          },
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    });
  }

});