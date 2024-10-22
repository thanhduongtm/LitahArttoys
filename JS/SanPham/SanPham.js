/*
Đây là tập tin script chính chứa mã JS.
 */
(function ($) {
    // Đối tượng chính
    var RESHOP = {};

    // Các biến được định nghĩa trước
    var
        $filterGridWrapper = $('.filter__grid-wrapper'), // Bọc cho lưới bộ lọc
        $collectionOfFilterBtn = $('.filter__btn'), // Bộ lọc nút
        $primarySlider = $('#hero-slider'), // Slider chính
        $testimonialSlider = $('#testimonial-slider'), // Slider chứng nhận
        $collectionaClickScroll = $('[data-click-scroll]'), // Cuộn khi click
        $collectionProductSlider = $('.product-slider'), // Slider sản phẩm
        $collectionTabSlider = $('.tab-slider'), // Slider tab
        $collectionInputCounter = $('.input-counter'), // Bộ đếm đầu vào
        $collectionCountDown = $('[data-countdown]'), // Đếm ngược
        $collectionCartModalLink = $('[data-modal="modal"]'), // Liên kết mô-đun giỏ hàng
        $defaultAddressCheckbox = $('#get-address'), // Ô chọn địa chỉ mặc định
        $collectionFormBill = $('[data-bill]'), // Biểu mẫu hóa đơn
        $collectionPostGallery = $('.post-gallery'), // Bộ sưu tập ảnh
        $blogMasonry = $('.blog-m'), // Bố cục blog
        $collectionPostVideo = $('.post-video-block'), // Bộ sưu tập video bài viết
        // Lựa chọn nhiều jQuery cho iframe có chứa "youtube" hoặc "vimeo"
        $collectionEmbedVideo = $('iframe[src*="youtube"]'),
        $productDetailElement = $('#pd-o-initiate'), // Phần tử chi tiết sản phẩm
        $productDetailElementThumbnail = $('#pd-o-thumbnail'), // Hình ảnh thu nhỏ của phần tử chi tiết sản phẩm
        $modalProductDetailElement = $('#js-product-detail-modal'), // Mô-đun chi tiết sản phẩm
        $modalProductDetailElementThumbnail = $('#js-product-detail-modal-thumbnail'), // Hình ảnh thu nhỏ của mô-đun chi tiết sản phẩm
        $shopCategoryToggleSpan = $('.shop-w__category-list .has-list > .js-shop-category-span'), // Dải chuyển đổi danh mục cửa hàng
        $shopGridBtn = $('.js-shop-grid-target'), // Nút lưới cửa hàng
        $shopListBtn = $('.js-shop-list-target'), // Nút danh sách cửa hàng
        $shopPerspectiveRow = $('.shop-p__collection > div'), // Hàng góc cửa hàng
        $shopFilterBtn = $('.js-shop-filter-target'); // Nút bộ lọc cửa hàng



    // Kết nối cuộn lên trên cho tất cả các trang
    RESHOP.initScrollUp = function() {
        $.scrollUp({
            scrollName: 'topScroll',
            scrollText: '<i class="fas fa-long-arrow-alt-up"></i>',
            easingType: 'linear',
            scrollSpeed: 900,
            animation: 'fade',
            zIndex: 100
        });
    };

    // Khởi tạo ScrollSpy
    RESHOP.initScrollSpy = function() {
        var $bodyScrollSpy = $('#js-scrollspy-trigger');
        if ($bodyScrollSpy.length) {
            $bodyScrollSpy.scrollspy({
                target: '#init-scrollspy'
            });
        }
    };

    // Xử lý sự kiện cuộn khi click
    RESHOP.onClickScroll = function() {
        $collectionaClickScroll.on('click', function (e) {
            // Ngăn chặn hành vi mặc định để trang không cuộn hoặc hiển thị id trên thanh trạng thái trình duyệt
            e.preventDefault();
            // Lấy đối tượng đích
            var target = $(this).data('click-scroll');
            // Kiểm tra xem anchor có hash không
            if ($(target).length) {
                $('html').animate({
                    // .offset() là hàm jQuery và nó trả về đối tượng jQuery có thuộc tính top, left, bottom
                    // và trả về khoảng cách tổng từ container html
                    scrollTop: $(target).offset().top
                }, 1000, function () {
                });
            }
        });
    };

    // Kết nối Tooltip cho tất cả các trang
    RESHOP.initTooltip = function() {
    $('[data-tooltip="tooltip"]').tooltip({
        // Giá trị mặc định cho trigger là 'hover focus',
        // vì vậy tooltip sẽ hiển thị sau khi một nút được click,
        // cho đến khi một nút khác được click, vì nút được tập trung.
        trigger : 'hover'
        });
    };

    // Kết nối Modals
    RESHOP.initModal = function() {
        // Kiểm tra xem các anchor này có trên trang không
        if ($collectionCartModalLink.length) {
            $collectionCartModalLink.on('click', function () {
                var getElemId = $(this).data('modal-id');
                $(getElemId).modal({
                    backdrop: 'static',
                    keyboard: false,
                    show: true
                });
            });
        }

    };

    // Địa chỉ thanh toán mặc định
    RESHOP.defaultAddressCheckbox = function() {
        if ($defaultAddressCheckbox.length) {
            $defaultAddressCheckbox.change(function () {
                if (this.checked) {
                    $collectionFormBill.prop("disabled", true);
                    $('#make-default-address').prop("checked", false);
                } else {
                    $collectionFormBill.prop("disabled", false);
                }
            });
        }
    };

    // Giao diện thanh điều hướng của RESHOP
    RESHOP.reshopNavigation = function() {
        $('#navigation').shopNav();
        $('#navigation1').shopNav();
        $('#navigation2').shopNav();
        $('#navigation3').shopNav();
    };

    // Xử lý khi tab được kích hoạt để làm mới slider
    RESHOP.onTabActiveRefreshSlider = function() {
        // Khi hiển thị một tab mới, sự kiện được kích hoạt.
        // Độ chính xác = 2
        $('.tab-list [data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // Lấy ID của tab đang kích hoạt
            var currentID = $(e.target).attr('href');
            // Kích hoạt sự kiện làm mới `tab` đang kích hoạt hiện tại
            $(currentID + '.active').find('.tab-slider').trigger('refresh.owl.carousel');
        });
    };

    // Kết nối slider chính vào trang
    RESHOP.primarySlider = function() {
        if ($primarySlider.length) {
            $primarySlider.owlCarousel({
                items: 1,
                autoplayTimeout: 8000,
                loop: true,
                margin: -1,
                dots: false,
                smartSpeed: 1500,
                rewind: false, // Lùi lại khi đạt đến ranh giới
                nav: false,
                responsive: {
                    992: {
                        dots: true
                    }
                }
            });
        }
    };

    // Kết nối tất cả các slider vào trang
    RESHOP.productSlider = function() {
        // 0 là giá trị falsy, 1 là giá trị truthy
        if ($collectionProductSlider.length) {
            $collectionProductSlider.on('initialize.owl.carousel', function () {
                $(this).closest('.slider-fouc').removeAttr('class');
            }).each(function () {
                var thisInstance = $(this);
                var itemPerLine = thisInstance.data('item');
                thisInstance.owlCarousel({
                    autoplay: false,
                    loop: false,
                    dots: false,
                    rewind: true,
                    smartSpeed: 1500,
                    nav: true,
                    navElement: 'div',
                    navClass: ['p-prev', 'p-next'],
                    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: itemPerLine - 2
                        },
                        991: {
                            items: itemPerLine - 1
                        },
                        1200: {
                            items: itemPerLine
                        }
                    }
                });
            });
        }
    };


    // Kết nối tất cả các slider vào trang
    RESHOP.tabSlider = function() {
        if ($collectionTabSlider.length) {
            $collectionTabSlider.on('initialize.owl.carousel', function () {
                $(this).closest('.slider-fouc').removeAttr('class');
            }).each(function () {
                var thisInstance = $(this);
                var itemPerLine = thisInstance.data('item');
                thisInstance.owlCarousel({
                    autoplay: false,
                    loop: false,
                    dots: false,
                    rewind: true,
                    smartSpeed: 1500,
                    nav: true,
                    navElement: 'div',
                    navClass: ['t-prev', 't-next'],
                    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: itemPerLine - 2
                        },
                        991: {
                            items: itemPerLine - 1
                        },
                        1200: {
                            items: itemPerLine
                        }
                    }
                });
            });
        }
    };

    // Kết nối slider thương hiệu
    RESHOP.brandSlider = function() {
        var $brandSlider = $('#brand-slider');
        // Kiểm tra nếu slider thương hiệu có trên trang
        if ($brandSlider.length) {
            var itemPerLine = $brandSlider.data('item');
            $brandSlider.on('initialize.owl.carousel', function () {
                $(this).closest('.slider-fouc').removeAttr('class');
            }).owlCarousel({
                autoplay: false,
                loop: false,
                dots: false,
                rewind: true,
                nav: true,
                navElement: 'div',
                navClass: ['b-prev', 'b-next'],
                navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3,
                    },
                    991: {
                        items: itemPerLine
                    },
                    1200: {
                        items: itemPerLine
                    }
                }
            });
        }
    };

    // Slider Chứng nhận
    RESHOP.testimonialSlider = function() {
        // Kiểm tra nếu Testimonial-Slider có trên trang
        if ($testimonialSlider.length) {
            $testimonialSlider.on('initialize.owl.carousel', function () {
                $(this).closest('.slider-fouc').removeAttr('class');
            }).owlCarousel({
                items:1,
                autoplay: false,
                loop: false,
                dots: true,
                rewind: false,
                smartSpeed: 1500,
                nav: false
            });
        }
    };

    // Xóa lớp từ phần tử body
    RESHOP.appConfiguration = function() {
        $('body').removeAttr('class');
        $('.preloader').removeClass('is-active');
    };

    // Kết nối plugin lọc Isotope
    RESHOP.isotopeFilter = function() {
        // Kiểm tra nếu bọc lưới bộ lọc có trên trang
        if ($filterGridWrapper.length) {
            $filterGridWrapper.isotope({
                itemSelector:'.filter__item',
                filter: '*'
            });
        }

        // Kiểm tra nếu các nút lọc có trên trang, sau đó gắn sự kiện click
        if ($collectionOfFilterBtn.length) {
            // Gắn sự kiện click cho các nút lọc này
            $collectionOfFilterBtn.on('click',function(){
            // Lấy giá trị của thuộc tính data-filter
            var selectorValue = $(this).attr('data-filter');
            // Khởi tạo plugin Isotope
                $filterGridWrapper.isotope({
                    filter:selectorValue
                });
            $(this).closest('.filter-category-container').find('.js-checked').removeClass('js-checked');
            $(this).addClass('js-checked');
            });
        }
    };

        // Kết nối plugin Countdown
        RESHOP.timerCountDown = function() {
            // Kiểm tra nếu Countdown có trên trang
            if ($collectionCountDown.length) {
                $collectionCountDown.each(function () {
                    var $this = $(this),
                        finalDate = $(this).data('countdown');
                    $this.countdown(finalDate, function (event) {
                        $this.html(event.strftime('<div class="countdown__content"><div><span class="countdown__value">%D</span><span class="countdown__key">Ngày</span></div></div><div class="countdown__content"><div><span class="countdown__value">%H</span><span class="countdown__key">Giờ</span></div></div><div class="countdown__content"><div><span class="countdown__value">%M</span><span class="countdown__key">Phút</span></div></div><div class="countdown__content"><div><span class="countdown__value">%S</span><span class="countdown__key">Giây</span></div></div>'));
                    });
                });
            }
        };


        // Đếm số lượng đầu vào
        RESHOP.initInputCounter = function() {
            // Kiểm tra xem có Đếm số lượng đầu vào trên trang không
            if ($collectionInputCounter.length) {
                // Gắn sự kiện Click cho nút tăng
                $collectionInputCounter.find('.input-counter__plus').on('click',function () {
                    var $input = $(this).parent().find('input');
                    var count = parseInt($input.val()) + 1; // Số + Số
                    $input.val(count).change();
                });
                // Gắn sự kiện Click cho nút giảm
                $collectionInputCounter.find('.input-counter__minus').on('click',function () {
                    var $input = $(this).parent().find('input');
                    var count = parseInt($input.val()) - 1; // Số - Số
                    $input.val(count).change();
                });
                // Sự kiện kích thước giá trị thay đổi
                $collectionInputCounter.find('input').change(function () {
                    var $this = $(this);
                    var min = $this.data('min');
                    var max = $this.data('max');
                    var val = parseInt($this.val());// Giá trị hiện tại
                    // Kiểm tra ràng buộc
                    if (!val) {
                    val = 1;
                    }
                    // Phương thức min() trả về số có giá trị thấp nhất
                    val = Math.min(val,max);
                    // Phương thức max() trả về số có giá trị cao nhất
                    val = Math.max(val,min);
                    // Đặt Giá trị
                    $this.val(val);
                });
            }
        };

        // Thư viện ảnh blog
        RESHOP.blogPostGallery = function() {
            if ($collectionPostGallery.length) {
                $collectionPostGallery.on('initialize.owl.carousel', function () {
                    $(this).closest('.slider-fouc').removeAttr('class');
                }).each(function () {
                    $(this).owlCarousel({
                        items:1,
                        autoplay: false,
                        loop: false,
                        dots: false,
                        rewind: true,
                        smartSpeed: 1500,
                        nav: true,
                        navElement: 'div',
                        navClass: ['post-prev', 'post-next'],
                        navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
                    });
                });
            }
        };

            // Lưới masonry bài đăng blog
            RESHOP.blogPostMasonry = function() {
                if ($blogMasonry.length) {
                    $blogMasonry.find('.blog-m-init').isotope({
                        itemSelector: '.blog-m__element',
                        layoutMode: 'masonry'
                    });
                }
            };
// Bài đăng trên blog
RESHOP.blogPostVideo = function() {
    if ($collectionPostVideo.length) {
        $collectionPostVideo.on('click',function (e) {
            e.preventDefault();
            var $this = $(this);
            //Tìm ngay lập tức .bp__video class
            var myVideo = $this.find('.post-video')[0];
            // Thêm sự kiện kết thúc
            $(myVideo).on('ended',function () {
                $this.removeClass('process');// Thêm biểu tượng phát
            });
            // Tạm dừng
            if (myVideo.paused) {
                // Phát video
                myVideo.play();
                $(this).addClass('process');
                if ($(this).hasClass('pause')) {
                    $(this).removeClass('pause');
                }
            } // nếu người dùng nhấp lại vào dấu trừ, chỉ cần tạm dừng video và thêm biểu tượng dấu +
            else {
                myVideo.pause();
                $(this).addClass('pause');
            }
        });
    }
};

// đoạn mã bên dưới liên quan đến việc nhúng video trong bài đăng blog
RESHOP.blogPostEmbedVideo = function() {
    if ($collectionEmbedVideo.length) {
        $collectionEmbedVideo.parent().fitVids();
    }
};




// Chi tiết sản phẩm ban đàu
RESHOP.productDetailInit = function() {
  if ($productDetailElement.length && $productDetailElementThumbnail.length) {

      var ELEVATE_ZOOM_OBJ = {
          borderSize: 1,
          autoWidth:true,
          zoomWindowWidth: 540,
          zoomWindowHeight: 540,
          zoomWindowOffetx: 10,
          borderColour: '#e9e9e9',
          cursor: 'pointer'
      };
        //  tạo một slider (trình chiếu hình ảnh) cho chi tiết sản phẩm trên trang web.
      $productDetailElement.on('init', function () {
          $(this).closest('.slider-fouc').removeClass('slider-fouc');
      });

      $productDetailElement.slick({
          slidesToShow: 1,// Hiển thị một slide tại mỗi lần trình chiếu.
          slidesToScroll: 1,//Chuyển đến một slide mỗi lần di chuyển.
          infinite:false,//Không cho phép lăn vô hạn qua các slide.
          arrows: false,// Ẩn các nút điều hướng (next, prev).
          dots: false,//Ẩn các chấm chỉ đường.
          fade: true,//Sử dụng hiệu ứng làm mờ giữa các slide.
          asNavFor: $productDetailElementThumbnail // Liên kết với một carousel khác ($productDetailElementThumbnail) để đồng bộ hóa hiển thị và điều hướng giữa chúng.
      });
      // khởi tạo plugin Elevate Zoom cho hình ảnh đầu tiên trong slider (carousel)
      $('#pd-o-initiate .slick-current img').elevateZoom(ELEVATE_ZOOM_OBJ);

      // Sự kiện trước khi chuyển slide
      $productDetailElement.on('beforeChange', function(event, slick, currentSlide, nextSlide){
          // Lấy hình ảnh slide tiếp theo
          var $img = $(slick.$slides[nextSlide]).find('img');
          // Xóa các phần tử thu phóng cũ
          $('.zoomWindowContainer,.zoomContainer').remove();
          // Khởi động lại plugin thu phóng nâng cao cho hình ảnh trang chiếu tiếp theo
          $($img).elevateZoom(ELEVATE_ZOOM_OBJ);
      });

        // Khởi tạo plugin Lightgallery
        $productDetailElement.lightGallery({
            selector: '.pd-o-img-wrap', // lightgallery-core
            download: false, // lightgallery-core
            thumbnail: false, // Thumbnails
            autoplayControls: false, // Autoplay-plugin
            actualSize: false, // Zoom-plugin: Enable actual pixel icon
            hash: false, // Hash-plugin
            share: false // share-plugin
        });

    // Ảnh xem trước (Thumbnail)
    // Kích hoạt sau lần khởi tạo đầu tiên
    $productDetailElementThumbnail.on('init', function () {
        $(this).closest('.slider-fouc').removeAttr('class');
    });

    $productDetailElementThumbnail.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        arrows: true,
        dots: false,
        focusOnSelect: true,
        asNavFor: $productDetailElement,
        prevArrow: '<div class="pt-prev"><i class="fas fa-angle-left"></i>',
        nextArrow: '<div class="pt-next"><i class="fas fa-angle-right"></i>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });
}
};

    // Khởi tạo Modal Chi tiết Sản phẩm
    RESHOP.modalProductDetailInit = function() {
        if ($modalProductDetailElement.length && $modalProductDetailElementThumbnail.length) {
            $modalProductDetailElement.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                arrows: false,
                dots: false,
                fade: true,
                asNavFor: $modalProductDetailElementThumbnail
            });

            $modalProductDetailElementThumbnail.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                arrows: true,
                dots: false,
                focusOnSelect: true,
                asNavFor: $modalProductDetailElement,
                prevArrow: '<div class="pt-prev"><i class="fas fa-angle-left"></i>',
                nextArrow: '<div class="pt-next"><i class="fas fa-angle-right"></i>',
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });
            // Hook vào sự kiện hiển thị của Bootstrap và kích thước lại sự kiện 'resize' thủ công
            // để Slick tính lại các chiều rộng
            $('#quick-look').on('shown.bs.modal', function () {
                $modalProductDetailElement.resize();
            });
        }
    };

    // Chức năng Mở/Đóng Danh mục Cửa hàng
    RESHOP.shopCategoryToggle = function() {
        if ($shopCategoryToggleSpan.length) {
            $shopCategoryToggleSpan.on('click', function () {
                $(this).toggleClass('is-expanded');
                $(this).next('ul').stop(true, true).slideToggle();
            });
        }
    };

    // Thay đổi Góc nhìn Cửa hàng
    RESHOP.shopPerspectiveChange = function() {
        if ($shopGridBtn.length && $shopListBtn.length)   {
            $shopGridBtn.on('click',function () {
                $(this).addClass('is-active');
                $shopListBtn.removeClass('is-active');
                $shopPerspectiveRow.removeClass('is-list-active');
                $shopPerspectiveRow.addClass('is-grid-active');
            });
            $shopListBtn.on('click',function () {
                $(this).addClass('is-active');
                $shopGridBtn.removeClass('is-active');
                $shopPerspectiveRow.removeClass('is-grid-active');
                $shopPerspectiveRow.addClass('is-list-active');
            });
        }
    };

    // Cài đặt Bộ lọc bên cửa hàng
    RESHOP.shopSideFilter = function() {
        if ($shopFilterBtn.length) {
            $shopFilterBtn.on('click',function () {
                // Thêm lớp Active
                $(this).toggleClass('is-active');
                // Lấy giá trị của thuộc tính data-side
                var target = $(this).attr('data-side');
                // Mở cửa sổ bên
                $(target).toggleClass('is-open');
            });
        }
    };

    // Hiển thị Modal Tin tức
    RESHOP.showNewsletterModal = function() {
        if ($('#newsletter-modal').length) {
            setTimeout(function () {
                // Mở modal thủ công
                $('#newsletter-modal').modal({
                    backdrop: 'static',
                    keyboard: false,
                    show: true
                });
            }, 5000);
        }
    };

        // Kiểm tra mọi thứ bao gồm cả các phần tử DOM và hình ảnh đã được tải
        $(window).on('load', function () {
            RESHOP.showNewsletterModal();
            if ($primarySlider.length) {
                // Chạy slider khi mọi thứ đã được tải
                $primarySlider.data('owl.carousel').options.autoplay = true;
                $primarySlider.trigger('refresh.owl.carousel');
            }
        });

        // Các hàm khởi tạo sau khi trang đã được tải
        RESHOP.initScrollUp();
        RESHOP.initTooltip();
        RESHOP.initModal();
        RESHOP.defaultAddressCheckbox();
        RESHOP.initScrollSpy();
        RESHOP.onClickScroll();
        RESHOP.reshopNavigation();
        RESHOP.primarySlider();
        RESHOP.productSlider();
        RESHOP.tabSlider();
        RESHOP.onTabActiveRefreshSlider();
        RESHOP.brandSlider();
        RESHOP.testimonialSlider();
        RESHOP.appConfiguration();
        RESHOP.isotopeFilter();
        RESHOP.timerCountDown();
        RESHOP.initInputCounter();
        RESHOP.blogPostGallery();
        RESHOP.blogPostVideo();
        RESHOP.blogPostEmbedVideo();
        RESHOP.blogPostMasonry();
        RESHOP.productDetailInit();
        RESHOP.modalProductDetailInit();
        RESHOP.shopCategoryToggle();
        RESHOP.shopPerspectiveChange();
        RESHOP.shopSideFilter();
})(jQuery);
