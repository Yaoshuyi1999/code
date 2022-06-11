$(function() {
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度不能超过 6 个字符！";
        },
    });

    // const layer = layui.layer;
    // 修改的时候，先获取用户原本的信息
    const initUserInfo = () => {
        $.ajax({
                type: "GET",
                url: "/my/userinfo",
                success: (res) => {
                if (res.status !== 0) return layer.msg("获取用户信息失败！");
                // console.log(res);
                // layer.msg('获取用户信息成功！')
                // 填充表单
                form.val("formUserInfo", res.data);
            },
        });
    };

    // 重置表单
    $("#btnReset").click((e)=>{
        e.preventDefault();
        initUserInfo();
    })

    // 更新用户信息
    $(".layui-form").submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success: (res)=>{
                // console.log(res);
                if(res.status!==0) return layer.msg("更新信息失败")
                // 通知父页面，调用更新用户信息
                window.parent.getUserInfo();
                // console.log(window);
            }
        })
    })

    initUserInfo();
})