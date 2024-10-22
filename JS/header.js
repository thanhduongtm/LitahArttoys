let searchForm = document.querySelector('.search-form');

document.querySelector('#search').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}

function showLoginOptions() {
    var loginOptions = document.getElementById("loginOptions");

    // Hiển thị hoặc ẩn mô-đun đăng nhập khi nhấp vào biểu tượng đăng nhập
    if (loginOptions.style.display === "block") {
        loginOptions.style.display = "none";
    } else {
        loginOptions.style.display = "block";
    }
}

// Đóng mô-đun đăng nhập khi nhấp ra ngoài mô-đun
document.addEventListener("click", function (event) {
    var loginOptions = document.getElementById("loginOptions");
    var loginIcon = document.getElementById("login");

    if (event.target !== loginIcon && event.target.closest(".login-options") !== loginOptions) {
        loginOptions.style.display = "none";
    }
});

