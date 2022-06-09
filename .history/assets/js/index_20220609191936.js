// 定义一个函数，用来获取用户基本信息
function getUserInfo(){
    $.ajax({
        method: 'GET',
        url:'/my/userinfo',
        headers:{
            Authorization: localStorage.getItem("token"),
        },
        success: (res)=>{
            // console.log(res);
            if(res.status !==0) return layer.msg(res.message);
            layer.msg("获取用户信息成功");
            // 调用渲染函数
            renderAvatar(res.data);
        }
    })
}

// 渲染用户信息
const renderAvatar =(user)=>{
    const name=user.nickname||
}

// 获取用户列表
getUserInfo()