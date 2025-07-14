const PERSONAL_CONFIG = {
    // 个人信息
    name: "MIKUSCAT",
    bio: "每天都要爱自己哦",
    email: "mikuscat@linux.do",

    // 头像
    avatar: {
        image: "avatar.jpg",
        alt: "MIKUSCAT的头像"
    },

    // 社交链接
    socialLinks: [
        { name: "Linux.do", url: "https://linux.do/u/mikuscat/summary", icon: "fas fa-rocket" },
        // { name: "博客", url: "#", icon: "fas fa-blog" }, // 已移除
        // { name: "Twitter", url: "#", icon: "fab fa-twitter" } // 已移除
    ],

    // 主题设置
    theme: {
        enableBackgroundImages: true,
        enableTypingEffect: true,
        enableSmoothScrolling: true,
        typingSpeed: 70 // 打字机效果速度
    },

    // 背景图片设置
    backgroundImages: {
        enabled: true,
        images: ["background.png"], // 指定背景图片
        fallbackToGradient: true,
        changeOnRefresh: false, // 刷新时不更换图片
        blurAmount: 10, // 模糊度
        opacity: 0.7 // 透明度
    }
};