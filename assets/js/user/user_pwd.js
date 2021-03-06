const form = layui.form;
// 自定义验证规则
form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验原密码和新密码不能相同
    samePwd: (val) => {
        if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
    },
    // 校验新密码和确认密码必须相同
    rePwd: (val) => {
        if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
    },
});

const layer = layui.layer;

// 更新密码提交
$(".layui-form").submit(function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/my/updatepwd",
        data: $(this).serialize(),
        success: (res) => {
            if (res.status !== 0) return layer.msg("更新密码失败！");
            layer.msg("更新密码成功！");
            // 强制清空token
            localStorage.removeItem('token')
            // 跳转登录页面
            window.parent.location.href='/login.html'
        },
    });
});