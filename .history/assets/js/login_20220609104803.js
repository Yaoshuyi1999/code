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

    
})