// 定义一个函数，用来获取用户基本信息
function getUserInfo(){
    $.ajax({
        method: 'GET',
        url:'/my/user'
    })
})

// 获取用户列表
getUserInfo()