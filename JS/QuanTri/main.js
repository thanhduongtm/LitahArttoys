"use strict";

/* Aside & Navbar: dropdowns */
// Bình luận cho đoạn mã JavaScript

// Sử dụng Array.from để chuyển đổi NodeList thành mảng và lặp qua từng phần tử có class 'dropdown'
Array.from(document.getElementsByClassName('dropdown')).forEach(function (elA) {
  // Thêm sự kiện 'click' cho mỗi phần tử 'dropdown'
  elA.addEventListener('click', function (e) {
      // Kiểm tra nếu phần tử đang được nhấp vào có class 'navbar-item'
      if (e.currentTarget.classList.contains('navbar-item')) {
          // Nếu có, chuyển đổi trạng thái 'active'
          e.currentTarget.classList.toggle('active');
      } else {
          // Nếu không, lấy biểu tượng dropdown và thay đổi giữa 'mdi-plus' và 'mdi-minus'
          var dropdownIcon = e.currentTarget.getElementsByClassName('mdi')[1];
          e.currentTarget.parentNode.classList.toggle('active');
          dropdownIcon.classList.toggle('mdi-plus');
          dropdownIcon.classList.toggle('mdi-minus');
      }
  });
});

/* Aside Mobile toggle */
// Bình luận cho đoạn mã JavaScript

// Sử dụng Array.from để chuyển đổi NodeList thành mảng và lặp qua từng phần tử có class 'mobile-aside-button'
Array.from(document.getElementsByClassName('mobile-aside-button')).forEach(function (el) {
  // Thêm sự kiện 'click' cho mỗi phần tử 'mobile-aside-button'
  el.addEventListener('click', function (e) {
      // Lấy biểu tượng dropdown từ phần tử đang được nhấp vào
      var dropdownIcon = e.currentTarget.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0];
      
      // Chuyển đổi giữa trạng thái mở rộng và thu gọn của thanh bên di động
      document.documentElement.classList.toggle('aside-mobile-expanded');
      
      // Chuyển đổi giữa biểu tượng 'forwardburger' và 'backburger'
      dropdownIcon.classList.toggle('mdi-forwardburger');
      dropdownIcon.classList.toggle('mdi-backburger');
  });
});

/* NavBar menu mobile toggle */
// Bình luận cho đoạn mã JavaScript

// Sử dụng Array.from để chuyển đổi NodeList thành mảng và lặp qua từng phần tử có class '--jb-navbar-menu-toggle'
Array.from(document.getElementsByClassName('--jb-navbar-menu-toggle')).forEach(function (el) {
  // Thêm sự kiện 'click' cho mỗi phần tử '--jb-navbar-menu-toggle'
  el.addEventListener('click', function (e) {
      // Lấy biểu tượng dropdown từ phần tử đang được nhấp vào
      var dropdownIcon = e.currentTarget.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0];
      
      // Lấy ID của phần tử được xác định bởi thuộc tính 'data-target' của phần tử đang nhấp
      var targetId = e.currentTarget.getAttribute('data-target');
      
      // Chuyển đổi giữa trạng thái hiển thị và ẩn của phần tử có ID tương ứng
      document.getElementById(targetId).classList.toggle('active');
      
      // Chuyển đổi giữa biểu tượng 'mdi-dots-vertical' và 'mdi-close'
      dropdownIcon.classList.toggle('mdi-dots-vertical');
      dropdownIcon.classList.toggle('mdi-close');
  });
});

/* Modal: open */
// Bình luận cho đoạn mã JavaScript

// Sử dụng Array.from để chuyển đổi NodeList thành mảng và lặp qua từng phần tử có class '--jb-modal'
Array.from(document.getElementsByClassName('--jb-modal')).forEach(function (el) {
  // Thêm sự kiện 'click' cho mỗi phần tử '--jb-modal'
  el.addEventListener('click', function (e) {
      // Lấy giá trị 'data-target' từ phần tử đang nhấp để xác định ID của modal
      var modalTarget = e.currentTarget.getAttribute('data-target');
      
      // Thêm lớp 'active' cho modal có ID tương ứng để hiển thị
      document.getElementById(modalTarget).classList.add('active');
      
      // Thêm lớp 'clipped' cho thẻ html để tạo hiệu ứng nhòe nền
      document.documentElement.classList.add('clipped');
  });
});

/* Modal: close */
// Bình luận cho đoạn mã JavaScript

// Sử dụng Array.from để chuyển đổi NodeList thành mảng và lặp qua từng phần tử có class '--jb-modal-close'
Array.from(document.getElementsByClassName('--jb-modal-close')).forEach(function (el) {
  // Thêm sự kiện 'click' cho mỗi phần tử '--jb-modal-close'
  el.addEventListener('click', function (e) {
      // Lấy phần tử modal gần nhất cha của phần tử đang nhấp và loại bỏ lớp 'active' để ẩn modal
      e.currentTarget.closest('.modal').classList.remove('active');
      
      // Loại bỏ lớp 'is-clipped' khỏi thẻ html để loại bỏ hiệu ứng nhòe nền
      document.documentElement.classList.remove('is-clipped');
  });
});

/* Notification dismiss */
// Bình luận cho đoạn mã JavaScript

// Sử dụng Array.from để chuyển đổi NodeList thành mảng và lặp qua từng phần tử có class '--jb-notification-dismiss'
Array.from(document.getElementsByClassName('--jb-notification-dismiss')).forEach(function (el) {
  // Thêm sự kiện 'click' cho mỗi phần tử '--jb-notification-dismiss'
  el.addEventListener('click', function (e) {
      // Lấy phần tử notification gần nhất cha của phần tử đang nhấp và thêm lớp 'hidden' để ẩn notification
      e.currentTarget.closest('.notification').classList.add('hidden');
  });
});