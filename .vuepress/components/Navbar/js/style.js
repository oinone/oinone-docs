// 媒体响应
const pcDesignWidth = 1920;
const mobileDesignWidth = 375;
const designFont = 16;
let rootFontSize = 0;
let rootFontSizeLocked = false;

const getClientWidth = () => document.documentElement.clientWidth;

const getDesignWidth = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return isMobile ? mobileDesignWidth : pcDesignWidth;
}

const getRootFontSize = () => {
    if (rootFontSizeLocked) {
        return designFont;
    } else {
        const targetW = getClientWidth();
        const designW = getDesignWidth();
        const targetFont = (targetW / designW) * designFont;
        rootFontSize = targetFont;
        return targetFont;
    }
}

const adjustRootFontSize = () => {
    const fz = getRootFontSize();
    console.log(`Calculated font-size: ${fz}px`); // 添加日志查看计算结果
    document.documentElement.style.fontSize = fz + 'px';
}

window.addEventListener('resize', adjustRootFontSize);
window.addEventListener('load', adjustRootFontSize);
adjustRootFontSize();

const init = function () {
    // 为链接添加点击事件监听
    var wechatLink = document.querySelector('a[href="https://work.weixin.qq.com/kfid/kfcc96fe71e3c539df2"]');
    if (wechatLink) {
        wechatLink.addEventListener('click', function () {
            var weixinIcon = document.querySelector('.bar-wechat .bar-img-bg .bar-wechat-info');
            if (weixinIcon) {
                // 停止动画并隐藏元素
                weixinIcon.classList.remove('pulse-animation');
                weixinIcon.style.opacity = '0';
            }
        });
    }

    // 表单弹窗事件
    var formBackground = document.querySelector('.from-background');
    var phoneNumberInput = document.querySelector('.identity-form');
    var phoneNumberInputPopup = document.getElementById('phoneNum2');

    // 弹窗按钮绑定点击事件
    var openButtons = document.querySelectorAll('.identity-form-btn, .silder-consult, .banner-advisory, .btn-t, .btn1, .btn.btn-outline-primary, .bar-chat');
    openButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            if (formBackground) {
                formBackground.style.display = 'flex';
                if (phoneNumberInputPopup && phoneNumberInput) {
                    phoneNumberInputPopup.value = phoneNumberInput.value;
                }
            }
        });
    });

    // 获取关闭表单的按钮并为其绑定点击事件
    var closeButton = document.querySelector('.form-close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            if (formBackground) {
                formBackground.style.display = 'none'; // 隐藏表单
            }
        });
    }

    // 监听头部透明度变化
    var head = document.querySelector('.head');
    var banner = document.getElementById('banner');

    function checkPosition() {
        if (head && banner) {
            var bannerRect = banner.getBoundingClientRect();
            var headBottom = head.getBoundingClientRect().bottom;
            var bannerQuarter = bannerRect.top + (bannerRect.height * 0.2);

            if (headBottom > bannerQuarter) {
                head.classList.remove('head-transparent');
            } else {
                head.classList.add('head-transparent');
            }
        }
    }

    window.addEventListener('scroll', checkPosition);
    checkPosition();

    // 菜单控制器
    var navItems = document.querySelectorAll('.nav-item.dropdown');
    navItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
            event.stopPropagation();
            var isActive = this.classList.contains('active');
            navItems.forEach(function (i) {
                if (i !== item) {
                    i.classList.remove('active');
                    var subMenus = i.querySelectorAll('.dropdown-menu');
                    subMenus.forEach(function (subMenu) {
                        subMenu.classList.remove('submenu-active');
                    });
                }
            });
            if (!isActive) {
                this.classList.add('active');
            } else {
                this.classList.remove('active');
            }
        });

        var subMenuToggles = item.querySelectorAll('.sub-menu-toggle');
        subMenuToggles.forEach(function (toggle) {
            toggle.addEventListener('click', function (event) {
                event.stopPropagation();
                var target = document.querySelector(toggle.getAttribute('data-target'));
                if (target) {
                    var isSubActive = target.classList.contains('submenu-active');
                    var subMenus = item.querySelectorAll('.dropdown-menu');
                    subMenus.forEach(function (subMenu) {
                        if (subMenu !== target) {
                            subMenu.classList.remove('submenu-active');
                        }
                    });
                    if (!isSubActive) {
                        target.classList.add('submenu-active');
                    } else {
                        target.classList.remove('submenu-active');
                    }
                }
            });
        });
    });

    // 取消移动端链接跳转行为
    var navLinks = document.querySelectorAll('.nav-link.dropdown-toggle');
    if (window.innerWidth < 768) {
        navLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
            });
        });
    }

    document.addEventListener('click', function () {
        navItems.forEach(function (item) {
            item.classList.remove('active');
            var subMenus = item.querySelectorAll('.dropdown-menu');
            subMenus.forEach(function (subMenu) {
                subMenu.classList.remove('submenu-active');
            });
        });
    });

    // 视频异步加载
    var videoBackground = document.querySelector('.video-background');
    var videoCloseBtn = document.querySelector('.video-close');
    var videoContainerBtn = document.querySelector('.video-container .btn.btn-t');
    var video = document.querySelector('video');
    var bannerBtns = document.querySelectorAll('.banner-btn');

    bannerBtns.forEach(function (bannerBtn) {
        bannerBtn.addEventListener('click', function () {
            if (videoBackground) {
                videoBackground.style.display = 'flex';
                loadVideo(); // 调用加载视频的函数
            }
        });
    });

    if (videoCloseBtn) {
        videoCloseBtn.addEventListener('click', function () {
            if (videoBackground) {
                videoBackground.style.display = 'none';
            }
        });
    }

    if (videoContainerBtn) {
        videoContainerBtn.addEventListener('click', function () {
            if (videoBackground) {
                videoBackground.style.display = 'none';
            }
        });
    }

    function loadVideo() {
        if (video && !video.src) { // 检查视频源是否已设置
            var source = document.createElement('source'); // 创建新的source元素
            source.setAttribute('src', 'https://pamirs.oss-cn-hangzhou.aliyuncs.com/welcome/assets/shushi-68ada8c1.mp4');
            source.setAttribute('type', 'video/mp4');
            video.appendChild(source); // 将source元素添加到video中
            video.load(); // 加载视频
        }
        if (video) {
            video.play(); // 播放视频
        }
    }

    // 多表单提交事件
    var formFields = [
        { id: 'custCompanyName', names: ['custCompanyName1', 'custCompanyName2'] },
        { id: 'custName', names: ['custName1', 'custName2'] },
        { id: 'phoneNum', names: ['phoneNum1', 'phoneNum2'] },
        { id: 'custJob', names: ['custJob1', 'custJob2'] }
    ];

    formFields.forEach(function (field) {
        field.names.forEach(function (name) {
            var element = document.getElementById(name);
            if (element) {
                element.addEventListener('input', function (e) {
                    recordInput(field.id, e.target.value);
                });
            }
        });
    });

    window.handleSubmit = function (formNumber) {
        var custCompanyName = document.getElementById('custCompanyName' + formNumber).value.trim();
        var custName = document.getElementById('custName' + formNumber).value.trim();
        var phoneNum = document.getElementById('phoneNum' + formNumber).value.trim();
        var custJob = document.getElementById('custJob' + formNumber).value.trim();

        // 新增的验证规则
        var chineseCharRegex = /^[\u4e00-\u9fa5]+$/;
        var forbiddenKeywords = ['大学', '学院', '院校', '公司名称', '学校', '个人', '保密', '其他'];
        var isValidCompanyName = chineseCharRegex.test(custCompanyName) &&
            custCompanyName.length >= 2 &&
            !forbiddenKeywords.some(function (keyword) { return custCompanyName.includes(keyword); });
        if (!isValidCompanyName) {
            alert('公司名称填写错误，请正确填写公司名称');
            return;
        }

        var isValidCustName = chineseCharRegex.test(custName) && custName.length >= 1;
        if (!isValidCustName) {
            alert('联系人请正确填写中文联系人称呼');
            return;
        }

        var keywords = getURLParameter('keywords');
        if (keywords) {
            custName += keywords;
        }

        if (!custName || !phoneNum) {
            alert('联系人和手机号为必填项，请填写完整！');
            return;
        }

        var phoneRegex = /^(?!(\d)\1{10})\d{11}$/;
        if (!phoneRegex.test(phoneNum)) {
            alert('请输入有效的11位手机号码！');
            return;
        }

        var formData = {
            custCompanyName: custCompanyName,
            custName: custName,
            phoneNum: phoneNum,
            custJob: custJob,
            custServeType: 'PROGRA'
        };

        var headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        headers.append('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8');
        headers.append('Connection', 'keep-alive');
        headers.append('Content-Type', 'application/json');

        fetch('/pamirs/welcome', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                operationName: null,
                query: `
                  mutation {
                    pamirsCustomerServeMutation {
                      create(
                        data: {
                          custName: "${formData.custName}"
                          phoneNum: "${formData.phoneNum}"
                          custCompanyName: "${formData.custCompanyName}"
                          custJob: "${formData.custJob}"
                          concern: ""
                          custServeType: "${formData.custServeType}"
                        }
                      ) {
                        id
                        custName
                        phoneNum
                        custCompanyName
                        custJob
                        concern
                        custServeType
                        createDate
                        writeDate
                        createUid
                        writeUid
                      }
                    }
                  }
                `
            })
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('服务器响应错误');
                }
                return response.json();
            })
            .then(function (data) {
                console.log('提交成功:', data);
                alert('提交成功！');
                clearForm(formNumber);
            })
            .catch(function (error) {
                console.error('提交失败:', error);
                alert('提交失败，请稍后再试！');
            });
    }

    function getURLParameter(name) {
        var params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    function clearForm(formNumber) {
        document.getElementById('custCompanyName' + formNumber).value = '';
        document.getElementById('custName' + formNumber).value = '';
        document.getElementById('phoneNum' + formNumber).value = '';
        document.getElementById('custJob' + formNumber).value = '';
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export default {}