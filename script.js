/* ==========================================================================
   Kuaizai Intelligence - Language Switcher
   Default: zh-CN. Toggle button in header switches between zh-CN and en.
   Persists preference in localStorage.
   ========================================================================== */

(function () {
    'use strict';

    var STORAGE_KEY = 'kuaizai.lang';

    // Translation dictionary. Keys correspond to data-i18n attributes in HTML.
    var translations = {
        'zh-CN': {
            'page.title': '快哉智能（澄迈）科技有限责任公司',
            'page.description': '快哉智能（澄迈）科技有限责任公司 - AI 时代的应用工厂，自研 iOS/Android 原生应用矩阵，提供 AI 智能体、企业数字化与开发者工具链解决方案。',

            'brand.cn': '快哉智能',
            'brand.en': 'Kuaizai Intelligence',

            'nav.about': '关于',
            'nav.services': '业务',
            'nav.contact': '联系',

            'hero.eyebrow': '快哉智能（澄迈）科技有限责任公司',
            'hero.title': 'AI 时代的应用工厂',
            'hero.subtitle': '自研原生应用矩阵，构建 AI 智能体与企业级数字化解决方案。立足海南自贸港,服务全球用户。',
            'hero.founded': '成立于 2026 年 4 月',
            'hero.location': '注册于海南澄迈',

            'about.title': '关于我们',
            'about.p1': '快哉智能（澄迈）科技有限责任公司成立于 2026 年 4 月 22 日，注册于海南省澄迈县老城经济开发区，是一家专注于 AI 原生应用与企业数字化解决方案的科技公司。',
            'about.p2': '我们以"小团队、高密度、长周期"的方式运营，相信优秀的软件应当由克制而专注的团队打造。我们的核心能力覆盖 iOS 与 Android 原生开发、大语言模型应用工程、以及面向政府与连锁机构的企业级方案。',
            'about.p3': '公司依托海南自由贸易港的政策优势，立足中国，服务全球。',

            'about.fact1.k': '成立日期',
            'about.fact1.v': '2026 年 4 月 22 日',
            'about.fact2.k': '注册资本',
            'about.fact2.v': '人民币 100,000 元',
            'about.fact3.k': '注册地',
            'about.fact3.v': '海南省澄迈县老城镇',
            'about.fact4.k': '法定代表人',
            'about.fact4.v': '李柏宏（CEO）',

            'services.title': '业务范围',
            'services.lead': '我们围绕四条主线持续投入，每一条都由独立的产品与交付能力支撑。',
            'services.s1.title': 'APP 工厂',
            'services.s1.titleEn': 'Mobile App Development',
            'services.s1.body': '自研 iOS / Android 原生应用矩阵，覆盖健康管理、AI 工具、生活效率等场景。坚持原生优先，追求长期可维护与极致体验。',
            'services.s2.title': 'AI 智能体',
            'services.s2.titleEn': 'AI Agent Solutions',
            'services.s2.body': '基于大语言模型的智能体应用与企业级 AI 咨询，从原型到生产环境的全链路工程能力。',
            'services.s3.title': '企业数字化',
            'services.s3.titleEn': 'Enterprise Digital Solutions',
            'services.s3.body': '面向政府机构与连锁经营企业，提供数字化转型咨询与定制化系统交付。',
            'services.s4.title': '技术工具链',
            'services.s4.titleEn': 'Developer Tooling',
            'services.s4.body': '面向 AI 时代开发者的效率工具，将内部生产力沉淀为可复用的产品。',

            'contact.title': '联系我们',
            'contact.email.title': '业务邮箱',
            'contact.address.title': '公司地址',
            'contact.address.body': '海南省澄迈县老城镇南海大道1237号3栋10层1009房<br>邮编 571924',
            'contact.legal.title': '法定代表人',
            'contact.legal.body': '李柏宏 / Baihong Li<br>Chief Executive Officer',

            'footer.brand.cn': '快哉智能（澄迈）科技有限责任公司',
            'footer.brand.en': 'Kuaizai Intelligence (Chengmai) Technology Co., Ltd.',
            'footer.uscc': '统一社会信用代码',
            'footer.address': '地址：海南省澄迈县老城镇南海大道1237号3栋10层1009房',
            'footer.email': '邮箱',
            'footer.privacy': '隐私政策',
            'footer.terms': '服务条款',
            'footer.icp': '备案号：申请中 / ICP Filing in progress',
            'footer.copyright': '© 2026 快哉智能（澄迈）科技有限责任公司 保留所有权利',

            // Legal pages
            'legal.privacy.title': '隐私政策',
            'legal.terms.title': '服务条款',
            'legal.effective': '生效日期：2026 年 5 月 2 日',
            'legal.back': '← 返回首页',

            'privacy.intro': '快哉智能（澄迈）科技有限责任公司（以下简称"我们"或"本公司"）尊重并保护所有用户的个人隐私权。本隐私政策说明我们如何收集、使用、存储和保护您在使用我们的网站及产品时所提供的信息。',
            'privacy.s1.t': '一、我们收集的信息',
            'privacy.s1.b': '我们仅收集为提供服务所必需的信息，主要包括：（1）您主动提供的信息，例如您通过邮件与我们联系时留下的姓名和邮箱地址；（2）自动收集的技术信息，例如设备型号、操作系统、浏览器类型、IP 地址、访问时间等日志数据；（3）使用我们的应用产品时，根据各产品的具体隐私说明所收集的功能性数据。',
            'privacy.s2.t': '二、信息的使用目的',
            'privacy.s2.b': '我们使用收集到的信息用于：（1）提供、维护与改进我们的产品和服务；（2）回应您的咨询与服务请求；（3）保障账号与服务安全，防范欺诈与滥用；（4）履行法律法规所要求的义务。',
            'privacy.s3.t': '三、第三方共享',
            'privacy.s3.b': '我们不会向任何第三方出售您的个人信息。仅在以下情形下，我们可能共享必要的信息：（1）获得您明确同意；（2）为完成支付、托管、分析等服务所必需，且第三方受保密义务约束；（3）应法律法规、司法机关或行政部门的合法要求。',
            'privacy.s4.t': '四、Cookie 与同类技术',
            'privacy.s4.b': '本网站使用 Cookie 与本地存储以记住您的语言偏好等设置。您可通过浏览器设置禁用 Cookie，但部分功能可能因此无法正常使用。',
            'privacy.s5.t': '五、您的权利',
            'privacy.s5.b': '您有权访问、更正或删除我们持有的关于您的个人信息，并可随时撤回此前给予的同意。如需行使上述权利，请通过下方联系方式与我们联系。',
            'privacy.s6.t': '六、信息安全',
            'privacy.s6.b': '我们采取符合行业标准的技术与管理措施保护您的信息，包括传输加密、访问控制与最小化收集原则。但请您理解，互联网环境并非绝对安全。',
            'privacy.s7.t': '七、政策更新',
            'privacy.s7.b': '我们可能不时更新本隐私政策。重大变更将在本页面公示，并视情况以适当方式通知您。',
            'privacy.s8.t': '八、联系我们',
            'privacy.s8.b': '如对本政策有任何疑问，请通过 liber@kuaizaiai.com 与我们联系，或邮寄至：海南省澄迈县老城镇南海大道1237号3栋10层1009房。',

            'terms.intro': '欢迎访问快哉智能（澄迈）科技有限责任公司（以下简称"本公司"）的网站及使用本公司所提供的产品和服务。请您在使用前仔细阅读本服务条款。一旦使用，即视为您已接受本条款的全部内容。',
            'terms.s1.t': '一、服务说明',
            'terms.s1.b': '本公司通过本网站及旗下移动应用产品向用户提供软件服务、信息服务及相关支持。具体功能与服务内容以各产品页面或单独的产品协议为准。',
            'terms.s2.t': '二、用户责任',
            'terms.s2.b': '您承诺以合法目的使用本公司服务，不得利用服务从事任何违反法律法规或公序良俗的活动，不得对服务进行反向工程、未经授权的访问、干扰或破坏。',
            'terms.s3.t': '三、知识产权',
            'terms.s3.b': '本网站及本公司产品中所包含的全部内容，包括但不限于文字、图标、界面设计、源代码、商标和标识，均归本公司或相应权利人所有，受中华人民共和国法律及相关国际公约保护。未经书面授权，您不得以任何方式复制、改编、传播或商业使用上述内容。',
            'terms.s4.t': '四、免责声明',
            'terms.s4.b': '本公司在合理范围内努力保障服务的可用性、稳定性与准确性，但不对因不可抗力、网络故障、第三方原因或您自身操作所导致的损失承担责任。本服务按"现状"提供，本公司在法律允许的最大范围内不作任何明示或默示的担保。',
            'terms.s5.t': '五、服务变更与终止',
            'terms.s5.b': '本公司保留根据业务需要修改、暂停或终止全部或部分服务的权利。对于重大变更，我们将通过适当方式告知用户。',
            'terms.s6.t': '六、争议解决',
            'terms.s6.b': '本条款的订立、执行与解释，以及与之相关的争议解决，均适用中华人民共和国法律。如发生争议，双方应友好协商解决；协商不成的，任何一方均可向本公司所在地有管辖权的人民法院提起诉讼。',
            'terms.s7.t': '七、生效与变更',
            'terms.s7.b': '本条款自上述生效日期起施行。本公司可根据需要不时修订本条款，修订后的条款将在本网站公示后生效。',
            'terms.s8.t': '八、联系方式',
            'terms.s8.b': '如对本条款有任何疑问，请通过 liber@kuaizaiai.com 与我们联系。'
        },

        'en': {
            'page.title': 'Kuaizai Intelligence (Chengmai) Technology Co., Ltd.',
            'page.description': 'Kuaizai Intelligence (Chengmai) Technology Co., Ltd. — The App Factory of the AI Era. We build native iOS/Android applications, AI agent solutions, enterprise digitalization, and developer tooling.',

            'brand.cn': '快哉智能',
            'brand.en': 'Kuaizai Intelligence',

            'nav.about': 'About',
            'nav.services': 'Services',
            'nav.contact': 'Contact',

            'hero.eyebrow': 'Kuaizai Intelligence (Chengmai) Technology Co., Ltd.',
            'hero.title': 'The App Factory of the AI Era',
            'hero.subtitle': 'We build a portfolio of native mobile applications and ship AI agent and enterprise digitalization solutions. Headquartered in the Hainan Free Trade Port, serving users worldwide.',
            'hero.founded': 'Founded April 2026',
            'hero.location': 'Registered in Chengmai, Hainan',

            'about.title': 'About Us',
            'about.p1': 'Kuaizai Intelligence (Chengmai) Technology Co., Ltd. was incorporated on April 22, 2026, in the Laocheng Economic Development Zone of Chengmai County, Hainan Province. We focus on AI-native applications and enterprise digitalization.',
            'about.p2': 'We operate as a small, high-density team with a long-term horizon. We believe great software is built by focused craftspeople. Our core competencies span native iOS and Android development, applied LLM engineering, and enterprise-grade solutions for government and chain businesses.',
            'about.p3': 'Headquartered in the Hainan Free Trade Port, we serve customers in China and worldwide.',

            'about.fact1.k': 'Founded',
            'about.fact1.v': 'April 22, 2026',
            'about.fact2.k': 'Registered Capital',
            'about.fact2.v': 'RMB 100,000',
            'about.fact3.k': 'Registered Office',
            'about.fact3.v': 'Laocheng, Chengmai, Hainan',
            'about.fact4.k': 'Legal Representative',
            'about.fact4.v': 'Baihong Li (CEO)',

            'services.title': 'What We Do',
            'services.lead': 'Four focused business lines, each backed by dedicated product and delivery capability.',
            'services.s1.title': 'Mobile App Development',
            'services.s1.titleEn': 'APP 工厂',
            'services.s1.body': 'A portfolio of native iOS and Android applications spanning health, AI productivity tools, and lifestyle. We are native-first and optimize for long-term maintainability and quality of experience.',
            'services.s2.title': 'AI Agent Solutions',
            'services.s2.titleEn': 'AI 智能体',
            'services.s2.body': 'Applied LLM products and enterprise AI consulting, with end-to-end engineering capability from prototype to production.',
            'services.s3.title': 'Enterprise Digital Solutions',
            'services.s3.titleEn': '企业数字化',
            'services.s3.body': 'Digital transformation consulting and bespoke system delivery for government agencies and multi-location chain businesses.',
            'services.s4.title': 'Developer Tooling',
            'services.s4.titleEn': '技术工具链',
            'services.s4.body': 'Productivity tools for the AI-era developer. We turn our internal leverage into reusable products.',

            'contact.title': 'Contact',
            'contact.email.title': 'Email',
            'contact.address.title': 'Office',
            'contact.address.body': 'Room 1009, 10/F, Building 3, No.1237 Nanhai Avenue,<br>Laocheng Town, Chengmai County,<br>Hainan Province, China 571924',
            'contact.legal.title': 'Legal Representative',
            'contact.legal.body': 'Baihong Li / 李柏宏<br>Chief Executive Officer',

            'footer.brand.cn': '快哉智能（澄迈）科技有限责任公司',
            'footer.brand.en': 'Kuaizai Intelligence (Chengmai) Technology Co., Ltd.',
            'footer.uscc': 'Unified Social Credit Code',
            'footer.address': 'Address: Room 1009, 10/F, Bldg 3, No.1237 Nanhai Ave, Laocheng Town, Chengmai County, Hainan, China',
            'footer.email': 'Email',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Service',
            'footer.icp': 'ICP Filing in progress',
            'footer.copyright': '© 2026 Kuaizai Intelligence (Chengmai) Technology Co., Ltd. All rights reserved.',

            // Legal pages
            'legal.privacy.title': 'Privacy Policy',
            'legal.terms.title': 'Terms of Service',
            'legal.effective': 'Effective Date: May 2, 2026',
            'legal.back': '← Back to Home',

            'privacy.intro': 'Kuaizai Intelligence (Chengmai) Technology Co., Ltd. ("we", "us", or "the Company") respects and protects the privacy of all users. This Privacy Policy explains how we collect, use, store and protect the information you provide when using our website and products.',
            'privacy.s1.t': '1. Information We Collect',
            'privacy.s1.b': 'We only collect information necessary to provide our services, including: (1) information you actively provide, such as the name and email address you supply when contacting us; (2) technical information collected automatically, such as device model, operating system, browser type, IP address and access timestamps; (3) functional data collected by individual application products, as detailed in each product\'s separate privacy notice.',
            'privacy.s2.t': '2. How We Use Information',
            'privacy.s2.b': 'We use the information collected to: (1) provide, maintain and improve our products and services; (2) respond to your inquiries and service requests; (3) ensure account and service security and prevent fraud or abuse; (4) comply with applicable laws and regulations.',
            'privacy.s3.t': '3. Sharing with Third Parties',
            'privacy.s3.b': 'We do not sell your personal information to any third party. We may share necessary information only when: (1) we have your explicit consent; (2) it is required to deliver payment, hosting or analytics services, and the third party is bound by confidentiality; (3) it is required by law, judicial authorities or competent administrative bodies.',
            'privacy.s4.t': '4. Cookies and Similar Technologies',
            'privacy.s4.b': 'This website uses cookies and local storage to remember preferences such as your selected language. You may disable cookies via your browser settings, though some features may not function properly as a result.',
            'privacy.s5.t': '5. Your Rights',
            'privacy.s5.b': 'You have the right to access, correct or delete the personal information we hold about you, and to withdraw any consent you have previously given. To exercise these rights, please contact us using the details below.',
            'privacy.s6.t': '6. Information Security',
            'privacy.s6.b': 'We implement industry-standard technical and organizational measures to protect your information, including transport encryption, access controls and a principle of minimal collection. However, please understand that no method of transmission over the internet is absolutely secure.',
            'privacy.s7.t': '7. Updates to This Policy',
            'privacy.s7.b': 'We may update this Privacy Policy from time to time. Material changes will be posted on this page and, where appropriate, communicated through other reasonable means.',
            'privacy.s8.t': '8. Contact Us',
            'privacy.s8.b': 'If you have any questions about this Policy, please contact us at liber@kuaizaiai.com, or by post to Room 1009, 10/F, Building 3, No.1237 Nanhai Avenue, Laocheng Town, Chengmai County, Hainan Province, China.',

            'terms.intro': 'Welcome to the website of Kuaizai Intelligence (Chengmai) Technology Co., Ltd. ("the Company"). Please read these Terms of Service carefully before using our website and products. By using our services, you agree to be bound by these Terms in full.',
            'terms.s1.t': '1. Services',
            'terms.s1.b': 'The Company provides software services, information services and related support through this website and its mobile application products. Specific features and content are governed by the relevant product page or any separate product agreement.',
            'terms.s2.t': '2. User Responsibilities',
            'terms.s2.b': 'You agree to use our services only for lawful purposes and not to use them for any activity that violates applicable laws, regulations or public morals. You shall not reverse-engineer, gain unauthorized access to, interfere with, or damage the services.',
            'terms.s3.t': '3. Intellectual Property',
            'terms.s3.b': 'All content on this website and within the Company\'s products, including but not limited to text, icons, interface design, source code, trademarks and logos, is owned by the Company or its respective rights holders and is protected by the laws of the People\'s Republic of China and applicable international treaties. You may not reproduce, adapt, distribute or commercially exploit such content without prior written authorization.',
            'terms.s4.t': '4. Disclaimer of Warranties',
            'terms.s4.b': 'The Company uses commercially reasonable efforts to maintain the availability, stability and accuracy of its services, but is not liable for losses arising from force majeure, network failures, third-party causes or your own actions. The services are provided "as is", and to the maximum extent permitted by law the Company disclaims all warranties, express or implied.',
            'terms.s5.t': '5. Changes and Termination',
            'terms.s5.b': 'The Company reserves the right to modify, suspend or discontinue all or part of its services as required by business needs. Material changes will be communicated to users through appropriate channels.',
            'terms.s6.t': '6. Governing Law and Disputes',
            'terms.s6.b': 'These Terms, their performance and interpretation, and any dispute arising from them, shall be governed by the laws of the People\'s Republic of China. The parties shall first attempt to resolve disputes amicably. Failing that, either party may bring proceedings before the people\'s court with jurisdiction at the Company\'s registered office.',
            'terms.s7.t': '7. Effectiveness and Updates',
            'terms.s7.b': 'These Terms take effect on the Effective Date stated above. The Company may revise these Terms from time to time; revised Terms become effective upon publication on this website.',
            'terms.s8.t': '8. Contact',
            'terms.s8.b': 'For any questions about these Terms, please contact us at liber@kuaizaiai.com.'
        }
    };

    function getPreferredLang() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'zh-CN' || saved === 'en') return saved;
        } catch (e) { /* ignore */ }
        return 'zh-CN';
    }

    function applyLang(lang) {
        var dict = translations[lang];
        if (!dict) return;

        document.documentElement.setAttribute('lang', lang);

        // Translate all elements with data-i18n
        var nodes = document.querySelectorAll('[data-i18n]');
        nodes.forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var value = dict[key];
            if (typeof value !== 'string') return;

            if (el.tagName === 'TITLE') {
                document.title = value;
            } else if (el.tagName === 'META') {
                el.setAttribute('content', value);
            } else {
                el.innerHTML = value;
            }
        });

        // Update toggle button label: shows the language you would switch TO
        var toggle = document.getElementById('lang-toggle');
        if (toggle) {
            toggle.textContent = (lang === 'zh-CN') ? 'EN' : '中';
            toggle.setAttribute('aria-label', (lang === 'zh-CN') ? 'Switch to English' : '切换到中文');
        }

        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    }

    function init() {
        var initial = getPreferredLang();
        applyLang(initial);

        var toggle = document.getElementById('lang-toggle');
        if (toggle) {
            toggle.addEventListener('click', function () {
                var current = document.documentElement.getAttribute('lang') || 'zh-CN';
                var next = (current === 'zh-CN') ? 'en' : 'zh-CN';
                applyLang(next);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
