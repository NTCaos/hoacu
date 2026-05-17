// ==========================================
    // CHỨC NĂNG NÂNG CAO: ĐĂNG KÝ CÓ LƯU TRỮ VÀO "DATABASE LOCAL"
    // ==========================================
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        var isValid = true;

        var username = $('#regUser').val().trim();
        var email = $('#regEmail').val().trim();
        var password = $('#regPass').val();
        var confirmPassword = $('#regConfirmPass').val();

        // 1. Kiểm tra tài khoản (User)
        if(username.length < 5) {
            $('#errRegUser').text("Tên đăng nhập bắt buộc phải từ 5 ký tự trở lên!");
            isValid = false;
        } else {
            $('#errRegUser').text("");
        }

        // 2. Kiểm tra Email bằng Regex
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email === "") {
            $('#errRegEmail').text("Vui lòng không để trống ô Email!");
            isValid = false;
        } else if(!emailRegex.test(email)) {
            $('#errRegEmail').text("Định dạng Email không hợp lệ (Ví dụ đúng: artdoor@gmail.com)!");
            isValid = false;
        } else {
            $('#errRegEmail').text("");
        }

        // 3. Kiểm tra Mật khẩu
        if(password.length < 6) {
            $('#errRegPass').text("Mật khẩu bảo mật phải có độ dài ít nhất là 6 ký tự!");
            isValid = false;
        } else {
            $('#errRegPass').text("");
        }

        // 4. Kiểm tra Mật khẩu nhập lại
        if(confirmPassword !== password || confirmPassword === "") {
            $('#errRegConfirmPass').text("Xác nhận mật khẩu chưa khớp hoàn toàn với mật khẩu đã nhập ở trên!");
            isValid = false;
        } else {
            $('#errRegConfirmPass').text("");
        }

        // 5. Kiểm tra điều khoản
        if(!$('#regTerm').is(':checked')) {
            $('#errRegTerm').text("Bạn phải tích chọn đồng ý với điều khoản dịch vụ để tiếp tục!");
            isValid = false;
        } else {
            $('#errRegTerm').text("");
        }

        // NẾU FORM HỢP LỆ -> TIẾN HÀNH LƯU VÀO DATABASE GIẢ LẬP
        if(isValid) {
            var dbUsers = JSON.parse(localStorage.getItem('DATABASE_USERS')) || [];

            // Kiểm tra xem trùng tên tài khoản không
            var isExist = dbUsers.some(user => user.username === username);
            if(isExist) {
                $('#errRegUser').text("Tên tài khoản này đã có người sử dụng trong Database!");
                return;
            }

            // Tạo cấu trúc một bản ghi (Record) dữ liệu mới
            var newRecord = {
                username: username,
                email: email,
                password: password,
                createdAt: new Date().toISOString()
            };

            dbUsers.push(newRecord);
            localStorage.setItem('DATABASE_USERS', JSON.stringify(dbUsers));

            //-- PRETTIER-SQL-FORMAT-DEMO
            //   INSERT INTO Users (username, email, password) 
            //   VALUES (username, email, password);

            alert("Đăng ký thành công! Dữ liệu tài khoản đã được nạp vào hệ thống.");
            window.location.href = "index.html"; 
        }
    });

    // ==========================================
    // CHỨC NĂNG NÂNG CAO: ĐĂNG NHẬP ĐỐI CHIẾU DATABASE VÀ CẬP NHẬT TRẠNG THÁI
    // ==========================================
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        var userLogin = $('#loginUser').val().trim();
        var passLogin = $('#loginPass').val();

        var dbUsers = JSON.parse(localStorage.getItem('DATABASE_USERS')) || [];
        var accountFound = dbUsers.find(user => user.username === userLogin && user.password === passLogin);

        console.log(`-- Executing query: SELECT * FROM Users WHERE username = '${userLogin}'`);

        if (userLogin === "admin" && passLogin === "123456") {
            alert("Đăng nhập quyền Quản Trị Viên hệ thống!");
            localStorage.setItem('CURRENT_USER', 'admin'); // Lưu trạng thái đăng nhập admin
            checkLoginStatus(); // Cập nhật lại thanh menu ngay lập tức
            $('#loginModal').modal('hide');
        } else if (accountFound) {
            alert("Đăng nhập thành công! Chào mừng thành viên: " + accountFound.username);
            localStorage.setItem('CURRENT_USER', accountFound.username); // Lưu trạng thái đăng nhập user
            checkLoginStatus(); // Cập nhật lại thanh menu ngay lập tức
            $('#loginModal').modal('hide');
        } else {
            alert("Sai tài khoản hoặc mật khẩu! Dữ liệu không khớp với bất kỳ tài khoản nào.");
        }
        this.reset();
    });

    // ==========================================
    // HÀM TỰ ĐỘNG KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP ĐỂ ĐỔI GIAO DIỆN MENU
    // ==========================================
    function checkLoginStatus() {
        var currentUser = localStorage.getItem('CURRENT_USER');
        if (currentUser) {
            // Đang có người dùng đăng nhập: Ẩn nút "Đăng nhập" thô, hiện menu dropdown chào mừng
            $('#nav-guest').hide();
            $('#nav-user').show();
            $('#user-display-name').text(currentUser);
        } else {
            // Không có ai đăng nhập hoặc vừa đăng xuất: Hiện lại nút "Đăng nhập"
            $('#nav-guest').show();
            $('#nav-user').hide();
        }
    }

    // Chạy kích hoạt hàm này ngay khi trình duyệt vừa load xong file JS
    checkLoginStatus();

    // SỰ KIỆN KHI NGƯỜI DÙNG NHẤN NÚT ĐĂNG XUẤT TÀI KHOẢN
    $('#btn-logout').on('click', function(e) {
        e.preventDefault();
        if(confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống ArtDoor không?")) {
            localStorage.removeItem('CURRENT_USER'); // Xóa sạch dấu vết session cũ
            alert("Đã đăng xuất tài khoản thành công!");
            window.location.reload(); // Tải lại trang để cập nhật menu sạch sẽ về trạng thái ban đầu
        }
    });