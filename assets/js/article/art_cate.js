$(function() {
    const form= layui.form

    // 获取文章分类列表
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
                if(res.status !== 0) return layer.msg('获取文章分类失败')
                // 调用 template
                const htmlStr = template("tpl-table", res);
                $("tbody").empty().html(htmlStr);
            },
        });
    };

    // 给添加按钮绑定点击事件
    let indexAdd=null
    $("#btnAddCate").click(() => {
        indexAdd=layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html(),
        });
    });

    // 添加文章分类，通过事件委托
    $('body').on('submit', "#form-add",function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:(res)=>{
                if(res.status!==0) return layer.msg('添加文章分类失败')
                layer.msg('添加文章分类成功')
                // 重新渲染数据列表
                initArtCateList()
                // 关闭弹窗
                layer.close(indexAdd)
            }
        })
    })

    // 通过事件委托方式打开编辑框，进行修改
    let indexEdit = null
    $('tbody').on('click','.btn-edit',function(){
        const id=$(this).attr('data-id')
        // console.log(id);
        indexEdit=layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        })
        // 发起请求获取对应分类的数据
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: (res)=> {
                if(res.status!==0) return layer.msg('获取文章分类信息失败')
                form.val("form-edit", res.data);
            },
        });
    })

    // 通过事件委托，修改数据
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:(res)=>{
                if(res.status!==0) return layer.msg('修改文章分类信息失败')
                layer.msg('修改文章分类成功')
                // 重新渲染页面
                initArtCateList()
                // 关闭弹窗
                layer.close(indexEdit)
            }
        })
    })

    // 删除文章分类
    $('tbody').on("click",'.btn-delete', function(){
        const id=$(this).attr('data-id')
        layer.confirm(
            '确定删除该文章分类吗？',
            {icon:3,title:'提示'},
            (index)=>{
                $.ajax({
                    type:'GET',
                    url:'/my/article/deletecate/'+id,
                    success: (res)=>{
                        if(res.status!==0) return layer.msg('删除文章分类信息失败')
                        layer.msg('删除文章分类成功')
                        // 重新渲染页面
                        initArtCateList()
                        // 关闭弹窗
                        layer.close(index)
                    }
                })
            }
        )
    })
    initArtCateList();
})