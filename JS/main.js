$(document).ready(function(){
    // 1. Kỹ thuật: Smooth Scrolling cho Menu & Nút up-arrow
    $("nav a[href^='#'], footer a[href^='#']").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function(){
                window.location.hash = hash;
            });
        }
    });

    // 2. Kỹ thuật: Xử lý Modal Form trong Pricing
    // Tự động checked vào dịch vụ tương ứng khi bấm button ở panel Pricing
    $('.btn-order').on('click', function() {
        // Xóa hết check cũ
        $('input[name="serviceCb"]').prop('checked', false);
        // Lấy data-service từ button được click
        var serviceType = $(this).data('service');
        // Tick vào checkbox tương ứng
        $('#cb-' + serviceType).prop('checked', true);
    });

    // Validate Modal Form khi submit
    $('#pricingForm').on('submit', function(e) {
        e.preventDefault();
        var isValid = true;
        
        // Kiểm tra Email định dạng hợp lệ
        var email = $('#pEmail').val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#errPEmail').text("Email không hợp lệ!");
            isValid = false;
        } else {
            $('#errPEmail').text("");
        }

        // Kiểm tra phải chọn ít nhất 1 checkbox
        if ($('input[name="serviceCb"]:checked').length === 0) {
            $('#errPCheckbox').text("Vui lòng chọn ít nhất 1 dịch vụ!");
            isValid = false;
        } else {
            $('#errPCheckbox').text("");
        }

        if (isValid) {
            alert("Gửi đăng ký dịch vụ thành công!");
            $('#orderModal').modal('hide');
            this.reset();
        }
    });

    // 3. Kỹ thuật: Validate Contact Form (index.html)
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        var isValid = true;

        // Name: Bắt buộc, Không chứa ký tự số
        var name = $('#cName').val();
        var nameRegex = /\d/; // Biểu thức tìm số
        if(name.trim() === "" || nameRegex.test(name)) {
            $('#errName').text("Tên không được rỗng và không chứa chữ số!");
            isValid = false;
        } else {
            $('#errName').text("");
        }

        // Email: Bắt buộc
        var cEmail = $('#cEmail').val();
        if(cEmail.trim() === "") {
            $('#errEmail').text("Email bắt buộc phải nhập!");
            isValid = false;
        } else {
            $('#errEmail').text("");
        }

        // Nội dung: Độ dài tối thiểu 20
        var msg = $('#cMessage').val();
        if(msg.length < 20) {
            $('#errMessage').text("Nội dung phải dài ít nhất 20 ký tự!");
            isValid = false;
        } else {
            $('#errMessage').text("");
        }

        if(isValid) {
            alert("Thông tin liên hệ của bạn đã được gửi!");
            this.reset(); // Xóa form sau khi gửi
        }
    });
});