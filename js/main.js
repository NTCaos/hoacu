// ==========================================================================
// 1. QUẢN LÝ ĐĂNG NHẬP & ĐỒNG BỘ TRẠNG THÁI HỆ THỐNG KHI TẢI TRANG
// ==========================================================================
$(document).ready(function() {
    // Kiểm tra trạng thái Đăng nhập từ LocalStorage
    var loggedInUser = localStorage.getItem('ARTDOOR_USER');
    if (loggedInUser) {
        $('#nav-guest').hide();
        $('#nav-user').show();
        $('#user-display-name').text(loggedInUser);
    } else {
        $('#nav-guest').show();
        $('#nav-user').hide();
    }

    // Sự kiện xử lý Form Đăng nhập
    // Sử dụng $(document).on để ăn cả vào các form tải động nếu có
    $(document).on('submit', '#loginForm', function (e) {
        e.preventDefault();
        var username = $('#loginUser').val();
        var password = $('#loginPass').val();

        if (username.trim() !== "" && password.trim() !== "") {
            localStorage.setItem('ARTDOOR_USER', username);
            $('#loginModal').modal('hide');
            alert('Đăng nhập thành công! Chào mừng ' + username + ' quay trở lại.');
            window.location.reload();
        }
    });

    // Sự kiện xử lý nút Đăng xuất
    $(document).on('click', '#btn-logout', function (e) {
        e.preventDefault();
        localStorage.removeItem('ARTDOOR_USER');
        alert('Đã đăng xuất tài khoản thành công.');
        window.location.reload();
    });

    // Gọi cập nhật số lượng giỏ hàng trên badge ngay khi mở trang
    updateCartBadge();
});

// ==========================================================================
// 2. QUẢN LÝ GIỎ HÀNG CHUẨN (ĐỒNG BỘ LOCALSTORAGE)
// ==========================================================================

// Cập nhật số lượng hiển thị trên icon Giỏ hàng
function updateCartBadge() {
    var cart = JSON.parse(localStorage.getItem('ARTDOOR_CART')) || [];
    var totalQty = 0;
    cart.forEach(item => totalQty += item.quantity);
    
    var badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = totalQty;
    }
}

// Thêm sản phẩm chi tiết vào Giỏ hàng (Đã sửa lỗi đồng bộ dữ liệu)
function addToCartDetailed(id, name, price, img) {
    var cart = JSON.parse(localStorage.getItem('ARTDOOR_CART')) || [];
    
    // Kiểm tra xem sản phẩm đã có trong giỏ chưa (kiểm tra cả id và loại)
    var existingItem = cart.find(item => item.id === id && item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1; // Nếu có rồi thì tăng số lượng lên 1
    } else {
        // Nếu chưa có, đẩy đối tượng sản phẩm đầy đủ thuộc tính vào mảng
        cart.push({ id: id, name: name, price: price, img: img, quantity: 1 });
    }
    
    localStorage.setItem('ARTDOOR_CART', JSON.stringify(cart));
    updateCartBadge(); // Cập nhật ngay con số hiển thị trên Header
    alert('Đã thêm sản phẩm "' + name + '" vào giỏ hàng thành công!');
}

// ==========================================================================
// 3. DỮ LIỆU SẢN PHẨM MOCKUP (20 SẢN PHẨM MỖI LOẠI)
// ==========================================================================
var dbProducts = {
    "co": [
        { id: 1, name: "Bộ Cọ Vẽ Art Secret Thân Gỗ 10 Cây", price: 185000, type: "co", tag: "-24%", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300" },
        { id: 2, name: "Bộ Cọ Silicon Định Hình Di Chì", price: 55000, type: "co", tag: "-24%", img: "https://images.unsplash.com/photo-1606159068539-43f36b99d1b2?q=80&w=300" },
        { id: 3, name: "Bộ Bay Vẽ Mỹ Thuật Đắp Màu Acrylic", price: 45000, type: "phu-kien", tag: "-24%", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=300" },
        { id: 4, name: "Cọ Flat Đầu Bằng Lông Heo Coarse", price: 35000, type: "co", tag: "", img: "https://images.unsplash.com/photo-1599687349514-46b509ef8fe1?q=80&w=300" }
    ],
    "mau": [
        { id: 1, name: "Màu Nước Holbein Artist 12 Màu Tuýp", price: 660000, type: "mau-nuoc", tag: "-15%", img: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=300" },
        { id: 2, name: "Màu Nước Dạng Bánh Nén Paul Rubens", price: 315000, type: "mau-nuoc", tag: "SALE", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=300" },
        { id: 3, name: "Bộ Màu Acrylic Marie's 24 Màu", price: 145000, type: "mau-acrylic", tag: "NEW", img: "https://images.unsplash.com/photo-1629949009765-40ea34e15763?q=80&w=300" },
        { id: 4, name: "Màu Thạch Gouache Himi 24 Màu Hộp Nhựa", price: 195000, type: "mau-poster", tag: "HOT", img: "https://images.unsplash.com/photo-1569172119333-195517b11388?q=80&w=300" }
    ],
    "giay": [
        { id: 1, name: "Tập Giấy Vẽ Màu Nước Arches 300gsm", price: 240000, type: "giay-300", tag: "BEST", img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=300" },
        { id: 2, name: "Sổ Vẽ Nabii Aqua Fat 300gsm A5", price: 95000, type: "giay-300", tag: "-10%", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300" },
        { id: 3, name: "Sổ Sketch Potentate Gáy Lò Xo A5", price: 65000, type: "giay-200", tag: "", img: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=300" },
        { id: 4, name: "Bản Vẽ Giấy Klong Cao Cấp 160gsm", price: 45000, type: "giay-100", tag: "HOT", img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=300" }
    ]
};

function generate20Products(type) {
    var original = dbProducts[type];
    var list = [];
    if (!original) return list;
    for (var i = 0; i < 20; i++) {
        var baseItem = original[i % original.length];
        var priceOffset = (i % 3 === 0) ? 10000 : (i % 3 === 1 ? -5000 : 0);
        list.push({
            id: i + 1,
            name: baseItem.name + " (Series " + (i + 1) + ")",
            price: baseItem.price + priceOffset,
            type: baseItem.type,
            tag: i % 7 === 0 ? "SALE" : baseItem.tag,
            img: baseItem.img
        });
    }
    return list;
}

// ==========================================
// 4. LOGIC LỌC, SẮP XẾP VÀ TÌM KIẾM
// ==========================================
var currentList = [];
var currentSort = "default";
var currentSearchKeyword = ""; 

function renderProducts() {
    // 4.1. Lọc theo Checkbox Phân loại
    var checkedTypes = [];
    $('.filter-checkbox:checked').each(function() {
        checkedTypes.push($(this).val());
    });

    var filtered = currentList;
    if (checkedTypes.length > 0) {
        filtered = filtered.filter(function(p) {
            return checkedTypes.indexOf(p.type) !== -1;
        });
    }

    // 4.2. Lọc theo Từ khóa tìm kiếm
    if (currentSearchKeyword.trim() !== "") {
        filtered = filtered.filter(function(p) {
            return p.name.toLowerCase().indexOf(currentSearchKeyword.toLowerCase()) !== -1;
        });
    }

    // 4.3. Sắp xếp danh sách
    if (currentSort === "asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === "new") {
        filtered.sort((a, b) => b.id - a.id);
    }

    // 4.4. Cập nhật số lượng hiển thị trên bộ lọc
    var totalBadge = document.getElementById('total-products');
    if (totalBadge) totalBadge.innerText = filtered.length;

    // 4.5. Hiển thị danh sách ra màn hình (ĐÃ FIX: Thay đổi hàm gọi nút chọn mua)
    var html = "";
    if (filtered.length === 0) {
        html = '<div class="col-xs-12 text-center"><p class="text-muted" style="padding: 40px 0; font-size:16px;">Không tìm thấy sản phẩm phù hợp!</p></div>';
    } else {
        filtered.forEach(function(p) {
            var badgeHtml = p.tag ? '<span class="label label-danger" style="position: absolute; top: 10px; left: 10px; padding: 5px;">' + p.tag + '</span>' : '';
            
            // Ép chuỗi an toàn, xử lý dấu nháy đơn trong tên sản phẩm nếu có
            var safeName = p.name.replace(/'/g, "\\'");

            html += '<div class="col-sm-3 text-center" style="margin-bottom: 30px;">' +
                        '<div class="thumbnail" style="position: relative; min-height: 340px;">' +
                            badgeHtml +
                            '<img src="' + p.img + '" alt="' + p.name + '" style="height: 160px; width:100%; object-fit: cover;">' +
                            '<div class="caption">' +
                                '<h5 style="height: 36px; overflow: hidden; font-size:13px;"><strong>' + p.name + '</strong></h5>' +
                                '<p style="color: #d9534f; font-weight: bold;">' + p.price.toLocaleString('vi-VN') + 'đ</p>' +
                                // ĐÃ SỬA: Gọi chuẩn hàm addToCartDetailed kèm tham số chi tiết
                                '<button class="btn btn-danger btn-sm" onclick="addToCartDetailed(' + p.id + ', \'' + safeName + '\', ' + p.price + ', \'' + p.img + '\')">Chọn Mua</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
        });
    }
    var container = document.getElementById('product-container');
    if (container) container.innerHTML = html;
}

// Xử lý sự kiện Tìm kiếm toàn cục
function handleSearch() {
    var searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    var keyword = searchInput.value.trim();
    if (keyword === "") {
        alert("Vui lòng nhập từ khóa để tìm kiếm!");
        return;
    }

    var pageIdentifier = document.getElementById('page-identifier');
    
    if (!pageIdentifier) {
        // NẾU ĐANG Ở TRANG CHỦ: Chuyển hướng kết quả sang trang danh mục cọ vẽ để render dữ liệu
        window.location.href = 'category-co.html?search=' + encodeURIComponent(keyword);
    } else {
        // NẾU ĐANG Ở TRANG DANH MỤC: Thực hiện tìm kiếm trực tiếp, reset các bộ lọc checkbox
        currentSearchKeyword = keyword;
        $('.filter-checkbox').prop('checked', false);
        renderProducts();
    }
}

// KHỞI ĐỘNG CÁC SỰ KIỆN KHI TRANG SẴN SÀNG
$(document).ready(function() {
    var pageIdentifier = $('#page-identifier');
    if (pageIdentifier.length > 0) {
        
        // KIỂM TRA QUERY STRING ĐỂ XỬ LÝ TÌM KIẾM TỪ TRANG CHỦ SANG
        var urlParams = new URLSearchParams(window.location.search);
        var searchParam = urlParams.get('search');

        if (searchParam) {
            currentSearchKeyword = searchParam;
            $('#search-input').val(searchParam); 
            
            // Gộp dữ liệu của cả 3 danh mục để thực hiện tìm kiếm diện rộng
            var allProducts = [];
            allProducts = allProducts.concat(generate20Products('co'));
            allProducts = allProducts.concat(generate20Products('mau'));
            allProducts = allProducts.concat(generate20Products('giay'));
            currentList = allProducts;

            $('.filter-checkbox').prop('checked', false);
            $('h2:first').text('KẾT QUẢ TÌM KIẾM: "' + searchParam + '"');
            $('.breadcrumb .active').text('Tìm kiếm');
            
        } else {
            // NẾU KHÔNG CÓ TÌM KIẾM, TẢI DANH MỤC LÊN BÌNH THƯỜNG DỰA VÀO DATA-PAGE
            var pageType = pageIdentifier.data('page');
            currentList = generate20Products(pageType);
        }

        renderProducts();
    }

    // Sự kiện Thay đổi Checkbox bộ lọc phân loại bên trái
    $('.filter-checkbox').on('change', function() {
        renderProducts();
    });

    // Sự kiện Click liên kết Sắp xếp (Giá tăng/giảm...)
    $('.sort-link').on('click', function(e) {
        e.preventDefault();
        currentSort = $(this).data('sort');
        $('.sort-link').css('font-weight', 'normal');
        $(this).css('font-weight', 'bold');
        renderProducts();
    });

    // Sự kiện nhấn nút Enter tại ô Tìm kiếm dữ liệu
    $('#search-input').on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            handleSearch();
        }
    });
});