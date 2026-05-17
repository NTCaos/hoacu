// ==========================================
// 1. QUẢN LÝ GIỎ HÀNG (ĐỒNG BỘ LOCALSTORAGE)
// ==========================================
var cartCount = parseInt(localStorage.getItem('CART_COUNT')) || 0;

function updateCartBadge() {
    var badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = cartCount;
    }
}

function addToCart() {
    cartCount++;
    localStorage.setItem('CART_COUNT', cartCount);
    updateCartBadge();
    alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
}

// ĐỒNG BỘ SỐ LƯỢNG KHI TẢI TRANG
function updateCartBadge() {
    var cart = JSON.parse(localStorage.getItem('ARTDOOR_CART')) || [];
    var totalQty = 0;
    cart.forEach(item => totalQty += item.quantity);
    
    var badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = totalQty;
    }
}

// HÀM CHỌN MUA: Lưu đầy đủ thông tin sản phẩm vào Giỏ hàng
function addToCartDetailed(id, name, price, img) {
    var cart = JSON.parse(localStorage.getItem('ARTDOOR_CART')) || [];
    
    // Kiểm tra sản phẩm đã tồn tại trong giỏ chưa
    var existingItem = cart.find(item => item.id === id && item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1; // Nếu có rồi thì tăng số lượng lên 1
    } else {
        cart.push({ id: id, name: name, price: price, img: img, quantity: 1 });
    }
    
    localStorage.setItem('ARTDOOR_CART', JSON.stringify(cart));
    updateCartBadge();
    alert('Đã thêm "' + name + '" vào giỏ hàng thành công!');
}

// ==========================================
// 2. DỮ LIỆU SẢN PHẨM CHUẨN ĐÚNG LOẠI
// ==========================================
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
// 3. LOGIC LỌC, SẮP XẾP VÀ TÌM KIẾM
// ==========================================
var currentList = [];
var currentSort = "default";
var currentSearchKeyword = ""; 

function renderProducts() {
    // 3.1. Lọc theo Checkbox Phân loại
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

    // 3.2. Lọc theo Từ khóa tìm kiếm
    if (currentSearchKeyword.trim() !== "") {
        filtered = filtered.filter(function(p) {
            return p.name.toLowerCase().indexOf(currentSearchKeyword.toLowerCase()) !== -1;
        });
    }

    // 3.3. Sắp xếp danh sách
    if (currentSort === "asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === "new") {
        filtered.sort((a, b) => b.id - a.id);
    }

    // 3.4. Cập nhật số lượng
    var totalBadge = document.getElementById('total-products');
    if (totalBadge) totalBadge.innerText = filtered.length;

    // 3.5. Hiển thị ra màn hình
    var html = "";
    if (filtered.length === 0) {
        html = '<div class="col-xs-12 text-center"><p class="text-muted" style="padding: 40px 0; font-size:16px;">Không tìm thấy sản phẩm phù hợp với từ khóa "' + currentSearchKeyword + '"!</p></div>';
    } else {
        filtered.forEach(function(p) {
            var badgeHtml = p.tag ? '<span class="label label-danger" style="position: absolute; top: 10px; left: 10px; padding: 5px;">' + p.tag + '</span>' : '';
            html += '<div class="col-sm-3 text-center" style="margin-bottom: 30px;">' +
                        '<div class="thumbnail" style="position: relative; min-height: 340px;">' +
                            badgeHtml +
                            '<img src="' + p.img + '" alt="' + p.name + '" style="height: 160px; width:100%; object-fit: cover;">' +
                            '<div class="caption">' +
                                '<h5 style="height: 36px; overflow: hidden; font-size:13px;"><strong>' + p.name + '</strong></h5>' +
                                '<p style="color: #d9534f; font-weight: bold;">' + p.price.toLocaleString('vi-VN') + 'đ</p>' +
                                '<button class="btn btn-danger btn-sm" onclick="addToCart()">Chọn Mua</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
        });
    }
    var container = document.getElementById('product-container');
    if (container) container.innerHTML = html;
}

// Hàm Xử lý khi nhấn nút Kính Lúp / Nhấn Enter
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
        // NẾU ĐANG Ở TRANG CHỦ: Vẫn dùng tạm file category-co.html để làm giao diện KẾT QUẢ TÌM KIẾM
        window.location.href = 'category-co.html?search=' + encodeURIComponent(keyword);
    } else {
        // NẾU ĐANG Ở TRANG DANH MỤC: Tiến hành tìm kiếm, bỏ tích các bộ lọc loại sản phẩm để tìm cho chính xác
        currentSearchKeyword = keyword;
        $('.filter-checkbox').prop('checked', false);
        renderProducts();
    }
}

// KHỞI CHẠY KHI TẢI TRANG
$(document).ready(function() {
    updateCartBadge();

    var pageIdentifier = $('#page-identifier');
    if (pageIdentifier.length > 0) {
        
        // KIỂM TRA XEM CÓ LỆNH TÌM KIẾM TỪ TRANG CHỦ ĐẨY QUA KHÔNG?
        var urlParams = new URLSearchParams(window.location.search);
        var searchParam = urlParams.get('search');

        if (searchParam) {
            /* TÍNH NĂNG TÌM KIẾM TOÀN CỤC */
            currentSearchKeyword = searchParam;
            $('#search-input').val(searchParam); 
            
            // 1. Gộp toàn bộ dữ liệu Cọ + Màu + Giấy lại thành một danh sách lớn để tìm
            var allProducts = [];
            allProducts = allProducts.concat(generate20Products('co'));
            allProducts = allProducts.concat(generate20Products('mau'));
            allProducts = allProducts.concat(generate20Products('giay'));
            currentList = allProducts;

            // 2. Tự động bỏ tích các ô lọc bên trái để tìm kiếm không bị che khuất
            $('.filter-checkbox').prop('checked', false);

            // 3. Đổi tiêu đề giao diện trang Cọ thành "KẾT QUẢ TÌM KIẾM" cho hợp lý
            $('h2:first').text('KẾT QUẢ TÌM KIẾM: "' + searchParam + '"');
            $('.breadcrumb .active').text('Tìm kiếm');
            
        } else {
            /* NẾU KHÔNG CÓ TÌM KIẾM, LOAD DANH MỤC BÌNH THƯỜNG */
            var pageType = pageIdentifier.data('page');
            currentList = generate20Products(pageType);
        }

        renderProducts();
    }

    // Sự kiện Checkbox
    $('.filter-checkbox').on('change', function() {
        renderProducts();
    });

    // Sự kiện Sắp xếp
    $('.sort-link').on('click', function(e) {
        e.preventDefault();
        currentSort = $(this).data('sort');
        $('.sort-link').css('font-weight', 'normal');
        $(this).css('font-weight', 'bold');
        renderProducts();
    });

    // Sự kiện ấn Enter ô tìm kiếm
    $('#search-input').on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            handleSearch();
        }
    });
});