import frame3 from './pic/frame3.png'; // <-- استيراد الصورة

export const mockPosts = [
    {
        id: 1,
        user: 'David Warner',
        avatar: frame3, // <-- استخدام الصورة المستوردة هنا
        timestamp: 'منذ 5 دقائق',
        text: 'emak gw yg make ni,w nyoba2 tp gabgt di komuk lgsg jerawatan. di emak gw mah fine2 aja ga ngpa2 gw semak gw yg make ni,w nyoba2 tp gabgt di komuk lgsg jerawatan. di emak gw mah fine2 aja ga ngpa2 gw semak gw yg make ni,w nyoba2 tp gabgt di komuk lgsg jerawatan. di emak gw mah fine2 aja ga ngpa2 gw s',
        image: null,
        video: null,
        likes: 15,
        comments: 3,
        isOwnPost: false
    },
    // ... باقي المنشورات تبقى كما هي لأنها تستخدم روابط خارجية
    {
        id: 2,
        user: 'David Warner',
        avatar: 'https://via.placeholder.com/40?text=DW',
        timestamp: 'منذ ساعة',
        text: 'يوم جميل على الشاطئ مع هذا الصديق الوفي!',
        image: 'https://images.unsplash.com/photo-1537151608828-3a30b947941e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        video: null,
        likes:  120,
        comments: 25,
        isOwnPost: false
    },
    //...
];

export const mockComments = {
    // ... محتوى التعليقات يبقى كما هو
};