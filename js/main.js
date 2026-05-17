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

// ==========================================
// 2. DỮ LIỆU 20 SẢN PHẨM CHO TỪNG TRANG
// ==========================================
var dbProducts = {
    "co": [
        { id: 1, name: "Bộ Cọ Vẽ Art Secret 10 Cây", price: 185000, type: "co-tia", tag: "-24%", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300" },
        { id: 2, name: "Cọ Flat Đầu Bằng Bay Vẽ", price: 45000, type: "co-flat", tag: "-10%", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=300" },
        { id: 3, name: "Cọ Tỉa Đi Nét Lông Chồn", price: 95000, type: "co-tia", tag: "HOT", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=300" },
        { id: 4, name: "Cọ Round Lông Sóc Thân Gỗ", price: 120000, type: "co-ngam", tag: "", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300" },
        { id: 5, name: "Cọ Quạt Tạo Vân Cây Lá", price: 35000, type: "co-flat", tag: "NEW", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=300" },
        { id: 6, name: "Cọ Ngậm Nước Thân Nhựa", price: 75000, type: "co-ngam", tag: "", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=300" }
    ],
    "mau": [
        { id: 1, name: "Màu Nước Holbein Artist 12 Màu", price: 650000, type: "mau-nuoc", tag: "-15%", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300" },
        { id: 2, name: "Màu Nước Dạng Bánh Paul Rubens", price: 320000, type: "mau-nuoc", tag: "SALE", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=300" },
        { id: 3, name: "Bộ Màu Acrylic Marie's 24 Tuýp", price: 145000, type: "mau-acrylic", tag: "", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=300" },
        { id: 4, name: "Màu Thạch Gouache Himi 24 Màu", price: 195000, type: "mau-poster", tag: "HOT", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300" },
        { id: 5, name: "Sơn Dầu Pebeo XL Studio", price: 280000, type: "mau-acrylic", tag: "NEW", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=300" },
        { id: 6, name: "Hộp Chì Khô Faber Castell 36 Màu", price: 210000, type: "mau-chi", tag: "", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=300" }
    ],
    "giay": [
        { id: 1, name: "Giấy Màu Nước Arches 300gsm", price: 240000, type: "giay-300", tag: "BEST", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300" },
        { id: 2, name: "Sổ Vẽ Nabii Aqua Fat 300gsm", price: 95000, type: "giay-300", tag: "-10%", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=300" },
        { id: 3, name: "Sổ Sketch Potentate A5", price: 65000, type: "giay-200", tag: "", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=300" },
        { id: 4, name: "Bản Vẽ Giấy Canson Pháp", price: 115000, type: "giay-200", tag: "", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300" },
        { id: 5, name: "Sổ Klong Vẽ Marker A4", price: 45000, type: "giay-100", tag: "HOT", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=300" },
        { id: 6, name: "Tập Giấy Baohong 100% Cotton", price: 160000, type: "giay-300", tag: "", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=300" }
    ]
};

// Hàm tự tạo ra danh sách 20 sản phẩm từ mảng gốc
function generate20Products(type) {
    var original = dbProducts[type];
    var list = [];
    for (var i = 0; i < 20; i++) {
        var baseItem = original[i % original.length];
        // Tạo biến thể nhỏ về tên và giá để trông giống thật
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
// 3. LOGIC LỌC VÀ SẮP XẾP SẢN PHẨM
// ==========================================
var currentList = [];
var currentSort = "default";

function renderProducts() {
    // 3.1. Lấy danh sách các phân loại đang được check dữ liệu
    var checkedTypes = [];
    $('.filter-checkbox:checked').each(function() {
        checkedTypes.push($(this).val());
    });

    // 3.2. Tiến hành lọc
    var filtered = currentList.filter(function(p) {
        return checkedTypes.indexOf(p.type) !== -1;
    });

    // 3.3. Tiến hành sắp xếp
    if (currentSort === "asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === "new") {
        filtered.sort((a, b) => b.id - a.id); // ID lớn hơn coi như hàng mới hơn
    }

    // 3.4. Cập nhật số lượng hiển thị lên giao diện
    $('#total-products').text(filtered.length);

    // 3.5. Đổ HTML ra màn hình
    var html = "";
    if (filtered.length === 0) {
        html = '<div class="col-xs-12 text-center"><p class="text-muted" style="padding: 40px 0;">Không tìm thấy sản phẩm phù hợp với bộ lọc!</p></div>';
    } else {
        filtered.forEach(function(p) {
            var badgeHtml = p.tag ? '<span class="label label-danger" style="position: absolute; top: 10px; left: 10px; padding: 5px;">' + p.tag + '</span>' : '';
            html += '<div class="col-sm-4 text-center" style="margin-bottom: 30px;">' +
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
    $('#product-container').html(html);
}

// KHỞI CHẠY KHI TẢI TRANG
$(document).ready(function() {
    updateCartBadge();

    // Tự động nhận diện trang dựa vào thẻ body hoặc tiêu đề id
    var pageType = $('#page-identifier').data('page'); 
    if (pageType) {
        currentList = generate20Products(pageType);
        renderProducts();
    }

    // Sự kiện lắng nghe khi bấm Tích/Bỏ tích vào các ô Checkbox bộ lọc
    $('.filter-checkbox').on('change', function() {
        renderProducts();
    });

    // Sự kiện lắng nghe khi bấm vào các tùy chọn sắp xếp giá/mới nhất
    $('.sort-link').on('click', function(e) {
        e.preventDefault();
        currentSort = $(this).data('sort');
        $('.sort-link').css('font-weight', 'normal');
        $(this).css('font-weight', 'bold');
        renderProducts();
    });
});