$(function () {
  // 登录注册的切换
  $('#link_reg').click(() => {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  $('#link_login').click(() => {
    $('.login-box').show();
    $('.reg-box').hide();
  });

  // 从 LayUI 中获取 form 对象
  const form = layui.form;

  // 通过 form.verify() 方法自定义校验规则
  form.verify({
    // 自定义一个叫password的校验规则
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: (value) => {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      const pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) return '两次密码不一致';
    },
  });

  // 基本路径
  const baseUrl = "http://www.liulongbin.top:3007";

  // 监听表单提交事件，发送注册请求
  $('#form_reg').submit((e) => {
    // 阻止表单的自动跳转
    e.preventDefault();
    // 发起注册的请求
    $.ajax({
      type:'POST',
      url: baseUrl +'/api/reguser',
      data:{
        username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val(),
      },
      success:(res)=>{
        if(res.status !==0) return layer.msg(res.message);
        layer.msg('注册成功！')
        // 成功注册，模拟点击事件，跳转到登录
        $('#link_login').click();
      }
    })
  });

  // 监听登录表单提交事件，发送登录请求
  $('#form_login').on('click', function(e){
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url:baseUrl + '/api/login',
      data:$(this).serialize(),
      success: (res)
    })
  })

});
