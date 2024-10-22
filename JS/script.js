//Sử dụng DOM để đảm bảo toàn bộ cấu trúc HTML đã được tải xong
document.addEventListener("DOMContentLoaded", function () {
    //Lấy danh sách các phần tử có class là "slide" và "dot"
  var slides = document.querySelectorAll(".slide");
  var dots = document.querySelectorAll(".dot");
  var currentSlide = 0; //Biến theo dõi slide hiện tại đang được hiển thị
  var intervalId; //ID được sử dụng để tạo chuyển động tự động của slider

  showSlide(currentSlide);
  startAutoSlide();

//Hiển thị slide tại vị trí được chỉ định
  function showSlide(index) {
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      dots[i].classList.remove("active");
    }
    slides[index].style.display = "block";
    dots[index].classList.add("active");
  }

//Chuyển đổi slide theo hướng được chỉ định
  function changeSlide(n) {
    currentSlide += n;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
  }

  function currentSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
  }

  //Tự chuyển slide theo khoảng thời gian đã định
  function startAutoSlide() {
    intervalId = setInterval(function () {
      changeSlide(1);
    }, 3000); // Thời gian chuyển động là 3 giây
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  //Dừng chuyển động tự động khi di chuột lên slider
  document.querySelector('.slider-container').addEventListener('mouseenter', function() {
    stopAutoSlide();
  });

 //Tự chuyển động khi con trỏ chuột rời khỏi slider
  document.querySelector('.slider-container').addEventListener('mouseleave', function() {
    startAutoSlide();
  });
  
//Gán các hàm quan trọng vào biến toàn cục để có thể sử dụng từ file bên ngoài
  window.changeSlide = changeSlide;
  window.currentSlide = currentSlide;
});
