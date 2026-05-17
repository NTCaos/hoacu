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
            // Đọc mảng Users từ LocalStorage ra, nếu chưa có thì khởi tạo mảng rỗng
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

            // Thực hiện nạp vào mảng dữ liệu
            dbUsers.push(newRecord);
            localStorage.setItem('DATABASE_USERS', JSON.stringify(dbUsers));

            /* Mẹo dành cho công cụ Prettier SQL VSCode:
               Bạn có thể bôi đen đoạn comment SQL dưới đây rồi chạy format
            */
            //-- PRETTIER-SQL-FORMAT-DEMO
            //   INSERT INTO Users (username, email, password) 
            //   VALUES (username, email, password);

            alert("Đăng ký thành công! Dữ liệu tài khoản đã được nạp vào hệ thống.");
            window.location.href = "index.html"; 
        }
    });

    // ==========================================
    // CHỨC NĂNG NÂNG CAO: ĐĂNG NHẬP ĐỐI CHIẾU DATABASE
    // ==========================================
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        var userLogin = $('#loginUser').val().trim();
        var passLogin = $('#loginPass').val();

        // Lấy dữ liệu mảng từ "Database" trình duyệt lên
        var dbUsers = JSON.parse(localStorage.getItem('DATABASE_USERS')) || [];

        // Tìm kiếm bản ghi trùng khớp
        var accountFound = dbUsers.find(user => user.username === userLogin && user.password === passLogin);

        // Đoạn mẫu giả lập log để kích hoạt hiển thị của Prettier SQL extension trong file script
        console.log(`-- Executing query: SELECT * FROM Users WHERE username = '${userLogin}'`);

        // Tài khoản admin cứng dự phòng để test nhanh
        if (userLogin === "admin" && passLogin === "123456") {
            alert("Đăng nhập quyền Quản Trị Viên hệ thống!");
            $('#loginModal').modal('hide');
        } else if (accountFound) {
            alert("Đăng nhập thành công! Chào mừng thành viên: " + accountFound.username);
            $('#loginModal').modal('hide');
        } else {
            alert("Sai tài khoản hoặc mật khẩu! Dữ liệu không khớp với bất kỳ tài khoản nào.");
        }
        this.reset();
    });