// Khai báo biến toàn cục quản lý số lượng sản phẩm giỏ hàng (Yêu cầu nâng cao)
var cartCount = 0;

function addToCart() {
    cartCount++;
    // Cập nhật số lượng lên badge của menu
    $('#cart-badge').text(cartCount);
    alert("Đã thêm sản phẩm họa cụ vào giỏ hàng thành công!");
}

$(document).ready(function(){
    // 1. CHỨC NĂNG: Smooth Scrolling (Cuộn mượt khi nhấn menu)
    $("nav a[href^='#'], footer a[href^='#']").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    // 2. CHỨC NĂNG: Điều khiển Modal Bảng Giá Combo
    $('.btn-order').on('click', function() {
        // Reset sạch các lựa chọn cũ
        $('input[name="serviceCb"]').prop('checked', false);
        // Đọc dữ liệu định danh từ nút bấm được kích hoạt
        var targetCombo = $(this).data('service');
        // Kích hoạt tích sẵn vào checkbox tương ứng trong form popup
        $('#cb-' + targetCombo).prop('checked', true);
    });

    // RÀNG BUỘC KIỂM TRA (VALIDATION) FORM ĐẶT MUA TRÊN MODAL
    $('#pricingForm').on('submit', function(e) {
        e.preventDefault();
        var isValid = true;

        var name = $('#pName').val().trim();
        var phone = $('#pPhone').val().trim();
        var email = $('#pEmail').val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Bắt buộc nhập đầy đủ tất cả dữ liệu chữ
        if(name === "" || phone === "" || email === "") {
            alert("Vui lòng không để trống bất kỳ trường thông tin liên lạc nào!");
            isValid = false;
            return;
        }

        // Kiểm tra định dạng Email hợp lệ
        if (!emailRegex.test(email)) {
            $('#errPEmail').text("Định dạng email của bạn nhập không hợp lệ (Ví dụ: abc@gmail.com)!");
            isValid = false;
        } else {
            $('#errPEmail').text("");
        }

        // Bắt buộc chọn ít nhất 1 hộp dịch vụ họa cụ
        if ($('input[name="serviceCb"]:checked').length === 0) {
            $('#errPCheckbox').text("Bắt buộc phải tích chọn ít nhất một Combo sản phẩm bạn muốn đặt mua!");
            isValid = false;
        } else {
            $('#errPCheckbox').text("");
        }

        if (isValid) {
            alert("Hệ thống ArtDoor đã ghi nhận đơn đặt hàng của bạn! Chúng tôi sẽ gọi lại hỗ trợ ngay.");
            $('#orderModal').modal('hide');
            this.reset();
        }
    });

    // 3. RÀNG BUỘC KIỂM TRA (VALIDATION) FORM LIÊN HỆ DƯỚI ĐÁY TRANG
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        var isValid = true;

        // Tên: Không chứa số
        var name = $('#cName').val().trim();
        var containsNumber = /\d/; 
        if(name === "" || containsNumber.test(name)) {
            $('#errName').text("Họ tên không được rỗng và tuyệt đối không được chứa chữ số!");
            isValid = false;
        } else {
            $('#errName').text("");
        }

        // Email: Bắt buộc
        var email = $('#cEmail').val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email === "") {
            $('#errEmail').text("Vui lòng nhập địa chỉ Email bắt buộc!");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            $('#errEmail').text("Email không đúng định dạng!");
            isValid = false;
        } else {
            $('#errEmail').text("");
        }

        // Tin nhắn: Phải dài từ 20 kí tự trở lên
        var msg = $('#cMessage').val().trim();
        if(msg.length < 20) {
            $('#errMessage').text("Nội dung tin nhắn gửi tới ArtDoor phải dài tối thiểu từ 20 ký tự trở lên để đảm bảo rõ nghĩa!");
            isValid = false;
        } else {
            $('#errMessage').text("");
        }

        if(isValid) {
            alert("Lời nhắn phản hồi của bạn đã gửi thành công!");
            this.reset();
        }
    });
});