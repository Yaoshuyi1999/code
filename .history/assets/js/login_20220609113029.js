$(function(){
    // 登录注册的切换
    $('#link_reg').click(()=>{
        $('.login-box').hide()
        $('.reg-box').show()
    });
    $('#link_login').click(()=>{
        $('.login-box').show()
        $('.reg-box').hide()
    });

    // 从 LayUI 中获取 form 对象
    const form = layui.form;

    // 通过 form.verify() 方法自定义校验规则
    form.verify({
        // 自定义一个叫password的校验规则
        password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致的规则
        repwd: (value) => {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $(".reg-box [name=password]").val();
            if(pwd !== value) return "两次密码不一致"
        },
    });

    $('#form_reg').submit((e)=>{
        e.
    })
})