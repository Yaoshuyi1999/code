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
            // 
        }
    })
}

// 渲染用户信息
const renderAvatar =(user)=>{

}

// 获取用户列表
getUserInfo()