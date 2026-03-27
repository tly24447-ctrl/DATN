// Supported language keys
export type LanguageCode = 'vi' | 'en';

// The structure of your UI strings
export interface LanguageResource {
  auth: {
    login: string;
    signUp: string;
    email: string;
    password: string;
    error: string;
    or: string;
    google: string;
    noAccount: string;
    hasAccount: string;
    processing: string;
  };
  home: {
    newArrivalsTitle: string;
    newArrivalsSub: string;
    bestSellersTitle: string;
    bestSellersSub: string;
    curatedCollection: string; // New
    viewAll: string;           // New
    viewAllProducts: string;   // New
  };
  checkout: {
    vietqrTitle: string;
    vietqrSub: string;
    amount: string;
    content: string;
    waitingStatus: string;
  };
  genres: {
    title: string;
    subtitle: string;
    allGenres: string;
  };
  banner: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    shopNow: string;
    viewBestSellers: string;
    statBooks: string;
    statReaders: string;
    statRating: string;
    bookOfWeek: string;
    featuredTitle: string;
  };
  footer: {
    defaultMission: string;
    categoriesTitle: string;
    supportTitle: string;
    address: string;
    newsletterTitle: string;
    newsletterSub: string;
    newsletterPlaceholder: string;
    freeShipping: string;
    freeShippingSub: string;
    securePayment: string;
    securePaymentSub: string;
    easyReturns: string;
    easyReturnsSub: string;
    rightsReserved: string;
    privacyPolicy: string;
    termsOfService: string;
    shippingPolicy: string;
  };
  common: {
    searchPlaceholder: string;
    loading: string;
    noResults: string;
  };
  userMenu: {
    account: string;
    signedInAs: string;
    myProfile: string;
    myOrders: string;
    signOut: string;
  };
  product: {
    outOfStock: string;
    byAuthor: string;
    sold: string;
    paperback: string;
    hardcover: string;
    ebook: string;
  };
  details: {
    shop: string;
    books: string;
    save: string;
    inStock: string;
    outOfStock: string;
    copiesLeft: string;
    description: string;
    noDescription: string;
    addedToCart: string;
    addToCart: string;
    specifications: string;
    publisher: string;
    published: string;
    pages: string;
    language: string;
    authenticity: string;
    genuine: string;
    fastDelivery: string;
    deliverySub: string;
    reviews: string;
    writeReview: string;
    updateReview: string;
    reviewPlaceholder: string;
    reviewAutoSave: string;
    yourReview: string;
    noComment: string;
    noReviewsYet: string;
    beFirst: string;
    ratingUpdated: string;
    ratingSuccess: string;
    ratingFailed: string;
    userVotedPrefix: string;
    userVotedSuffix: string;
  };
  suggestions: {
    title: string;
    subtitle: string;
  };
}

// The store containing all languages
export type LanguageStore = Record<LanguageCode, LanguageResource>;

export const resources: Record<LanguageCode, LanguageResource> = {
  en: {
    suggestions: {
      title: "Customers also bought",
      subtitle: "Based on purchase history from other readers",
    },
    details: {
      shop: "Shop",
      books: "Books",
      save: "SAVE",
      inStock: "IN STOCK",
      outOfStock: "OUT OF STOCK",
      copiesLeft: "copies left",
      description: "Description",
      noDescription: "No description available for this title.",
      addedToCart: "Added to Cart!",
      addToCart: "Add to Cart",
      specifications: "Technical Specifications",
      publisher: "Publisher",
      published: "Published",
      pages: "Pages",
      language: "Language",
      authenticity: "Authenticity",
      genuine: "100% Genuine",
      fastDelivery: "Fast Delivery Available.",
      deliverySub: "Orders placed before 2 PM ship the same day.",
      reviews: "Customer Reviews",
      writeReview: "Write a review",
      updateReview: "Update your review",
      reviewPlaceholder: "Share your thoughts about this book...",
      reviewAutoSave: "* Your comment will be saved automatically when you click outside the box.",
      yourReview: "Your Review",
      noComment: "No written comment provided.",
      noReviewsYet: "No reviews yet.",
      beFirst: "Be the first to rate this book!",
      ratingUpdated: "Your rating has been updated!",
      ratingSuccess: "Thank you for your rating!",
      ratingFailed: "Could not update rating",
      userVotedPrefix: "You rated this",
      userVotedSuffix: "stars. Click to change?",
    },
    product: {
      outOfStock: "OUT OF STOCK",
      byAuthor: "by",
      sold: "sold",
      paperback: "Paperback",
      hardcover: "Hardcover",
      ebook: "E-book",
    },
    userMenu: {
      account: "Account",
      signedInAs: "Signed in as",
      myProfile: "My Profile",
      myOrders: "View My Orders",
      signOut: "Sign Out",
    },
    auth: {
      login: "Log In",
      signUp: "Sign Up",
      email: "Email",
      password: "Password",
      error: "Authentication failed. Please check your credentials.",
      or: "Or",
      google: "Continue with Google",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      processing: "Processing...",
    },
    home: {
      newArrivalsTitle: "New Arrivals",
      newArrivalsSub: "Check out our latest additions to the collection.",
      bestSellersTitle: "Weekly Bestsellers",
      bestSellersSub: "Our most-loved titles this week. See what everyone is reading.",
      curatedCollection: "Curated Collection",
      viewAll: "View All",
      viewAllProducts: "View All Products"
    },
    checkout: {
      vietqrTitle: "Payment via VietQR",
      vietqrSub: "Use VCB Digibank or any Banking app to scan",
      amount: "Amount:",
      content: "Content:",
      waitingStatus: "System is waiting for transfer confirmation...",
    },
    genres: {
      title: "Explore by Genre",
      subtitle: "Find exactly what you're looking for",
      allGenres: "All Genres",
    },
    banner: {
      badge: "New Season, New Stories",
      title: "Unlock Your Next",
      titleAccent: "Great Adventure.",
      description: "Explore thousands of titles from world-renowned authors. From gripping thrillers to heart-warming romances, your perfect story is waiting to be discovered.",
      shopNow: "Shop Now",
      viewBestSellers: "View Best Sellers",
      statBooks: "Books Sold",
      statReaders: "Happy Readers",
      statRating: "Avg Rating",
      bookOfWeek: "Book of the Week",
      featuredTitle: "The Midnight Library",
    },
    footer: {
      defaultMission: "Curating stories that inspire, educate, and transport you. From timeless classics to modern masterpieces, find your next adventure here.",
      categoriesTitle: "Shop Categories",
      supportTitle: "Customer Support",
      address: "298 Cau Dien Street, Bac Tu Liem District, Hanoi City",
      newsletterTitle: "Join Our Reader List",
      newsletterSub: "Get 10% off your first order",
      newsletterPlaceholder: "Your email address",
      freeShipping: "Free Shipping",
      freeShippingSub: "On all orders over $50",
      securePayment: "Secure Payment",
      securePaymentSub: "100% protected transactions",
      easyReturns: "Easy Returns",
      easyReturnsSub: "30-day money-back guarantee",
      rightsReserved: "All rights reserved. Built for bibliophiles.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      shippingPolicy: "Shipping Policy"
    },
    common: {
      searchPlaceholder: "Search by title, author...",
      loading: "Loading...",
      noResults: "No results found.",
    }
  },
  vi: {
    suggestions: {
      title: "Khách hàng cũng đã mua",
      subtitle: "Dựa trên lịch sử mua sắm của các độc giả khác",
    },
    details: {
      shop: "Cửa hàng",
      books: "Sách",
      save: "GIẢM",
      inStock: "CÒN HÀNG",
      outOfStock: "HẾT HÀNG",
      copiesLeft: "cuốn còn lại",
      description: "Mô tả sản phẩm",
      noDescription: "Chưa có mô tả cho tựa sách này.",
      addedToCart: "Đã thêm vào giỏ!",
      addToCart: "Thêm vào giỏ",
      specifications: "Thông số kỹ thuật",
      publisher: "Nhà xuất bản",
      published: "Năm XB",
      pages: "Số trang",
      language: "Ngôn ngữ",
      authenticity: "Độ tin cậy",
      genuine: "Chính hãng 100%",
      fastDelivery: "Giao hàng nhanh.",
      deliverySub: "Đơn hàng trước 14h sẽ được giao trong ngày.",
      reviews: "Đánh giá từ khách hàng",
      writeReview: "Viết đánh giá",
      updateReview: "Cập nhật đánh giá",
      reviewPlaceholder: "Chia sẻ cảm nghĩ của bạn về cuốn sách này...",
      reviewAutoSave: "* Bình luận sẽ tự động lưu khi bạn nhấn ra ngoài vùng nhập.",
      yourReview: "Đánh giá của bạn",
      noComment: "Người dùng không để lại lời nhắn.",
      noReviewsYet: "Chưa có đánh giá nào.",
      beFirst: "Hãy là người đầu tiên đánh giá cuốn sách này!",
      ratingUpdated: "Đã cập nhật đánh giá của bạn!",
      ratingSuccess: "Cảm ơn bạn đã đánh giá!",
      ratingFailed: "Không thể cập nhật đánh giá",
      userVotedPrefix: "Bạn đã chấm",
      userVotedSuffix: "sao. Click để đổi?",
    },
    product: {
      outOfStock: "HẾT HÀNG",
      byAuthor: "tác giả",
      sold: "đã bán",
      paperback: "Sách bìa mềm",
      hardcover: "Sách bìa cứng",
      ebook: "Sách điện tử",
    },
    userMenu: {
      account: "Tài khoản",
      signedInAs: "Đăng nhập với",
      myProfile: "Hồ sơ của tôi",
      myOrders: "Đơn hàng của tôi",
      signOut: "Đăng xuất",
    },
    auth: {
      login: "Đăng nhập",
      signUp: "Đăng ký",
      email: "Email",
      password: "Mật khẩu",
      error: "Xác thực thất bại. Vui lòng kiểm tra lại thông tin.",
      or: "Hoặc",
      google: "Tiếp tục với Google",
      noAccount: "Chưa có tài khoản?",
      hasAccount: "Đã có tài khoản?",
      processing: "Đang xử lý...",
    },
    home: {
      newArrivalsTitle: "Sản phẩm mới",
      newArrivalsSub: "Khám phá những cuốn sách mới nhất vừa cập bến.",
      bestSellersTitle: "Sách bán chạy tuần này",
      bestSellersSub: "Những tựa sách được yêu thích nhất. Xem mọi người đang đọc gì.",
      curatedCollection: "Bộ sưu tập chọn lọc",
      viewAll: "Xem tất cả",
      viewAllProducts: "Xem tất cả sản phẩm"
    },
    checkout: {
      vietqrTitle: "Thanh toán qua VietQR",
      vietqrSub: "Sử dụng ứng dụng VCB Digibank hoặc Ngân hàng bất kỳ để quét mã",
      amount: "Số tiền:",
      content: "Nội dung:",
      waitingStatus: "Hệ thống đang chờ xác nhận chuyển khoản...",
    },
    genres: {
      title: "Khám phá theo thể loại",
      subtitle: "Tìm chính xác những gì bạn đang tìm kiếm",
      allGenres: "Tất cả thể loại",
    },
    banner: {
      badge: "Mùa mới, Những câu chuyện mới",
      title: "Mở ra hành trình",
      titleAccent: "Kỳ thú tiếp theo.",
      description: "Khám phá hàng ngàn tựa sách từ các tác giả lừng danh thế giới. Từ những bộ phim tâm lý gay cấn đến những câu chuyện tình lãng mạn, câu chuyện hoàn hảo của bạn đang chờ đón.",
      shopNow: "Mua sắm ngay",
      viewBestSellers: "Xem sách bán chạy",
      statBooks: "Sách đã bán",
      statReaders: "Độc giả hài lòng",
      statRating: "Đánh giá TB",
      bookOfWeek: "Sách của tuần",
      featuredTitle: "Thư viện nửa đêm",
    },
    footer: {
      defaultMission: "Tuyển chọn những câu chuyện truyền cảm hứng và tri thức. Từ những tác phẩm kinh điển đến hiện đại, hãy tìm thấy hành trình tiếp theo của bạn tại đây.",
      categoriesTitle: "Danh mục cửa hàng",
      supportTitle: "Hỗ trợ khách hàng",
      address: "298 đường Cầu Diễn, phường Tây Tựu, quận Bắc Từ Liêm, TP. Hà Nội",
      newsletterTitle: "Đăng ký nhận tin",
      newsletterSub: "Giảm ngay 10% cho đơn hàng đầu tiên",
      newsletterPlaceholder: "Địa chỉ email của bạn",
      freeShipping: "Miễn phí vận chuyển",
      freeShippingSub: "Cho mọi đơn hàng trên 500k",
      securePayment: "Thanh toán bảo mật",
      securePaymentSub: "Giao dịch được bảo vệ 100%",
      easyReturns: "Đổi trả dễ dàng",
      easyReturnsSub: "Hoàn tiền trong vòng 30 ngày",
      rightsReserved: "Bảo lưu mọi quyền. Được xây dựng cho người yêu sách.",
      privacyPolicy: "Chính sách bảo mật",
      termsOfService: "Điều khoản dịch vụ",
      shippingPolicy: "Chính sách vận chuyển"
    },
    common: {
      searchPlaceholder: "Tìm kiếm theo tên sách, tác giả...",
      loading: "Đang tải...",
      noResults: "Không tìm thấy kết quả.",
    }
  },
};