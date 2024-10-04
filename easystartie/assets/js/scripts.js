const translations = {
    "es": {
        "title": "EasyStartIE - Facilita tu llegada a Irlanda",
        "main_title": "EasyStartIE",
        "description": "Facilitamos tu llegada a Irlanda, ayudándote a gestionar toda tu documentación básica.",
        "explore_services": "Explora Nuestros Servicios",
        "product1_title": "LIP Card",
        "product1_description": "Ayuda con la LIP Card",
        "product2_title": "Bike Card",
        "product2_description": "Tarjeta para uso de bicicletas",
        "product3_title": "Cuenta Bancaria",
        "product3_description": "Apertura de cuenta bancaria",
        "product4_title": "IRP",
        "product4_description": "Registro IRP",
        "ready_title": "¿Listo para comenzar tu nueva vida en Irlanda?",
        "contact_description": "¡Nos encantaría ayudarte! Reserva una cita para discutir cómo podemos facilitarte la gestión de tus trámites.",
        "contact_button_text": "Reserva tu cita",
        "footer_text": "© 2024 EasyStartIE - Todos los derechos reservados"
    },
    "en": {
        "title": "EasyStartIE - Make Your Arrival to Ireland Easier",
        "main_title": "EasyStartIE",
        "description": "We facilitate your arrival in Ireland, helping you manage all your basic documentation.",
        "explore_services": "Explore Our Services",
        "product1_title": "LIP Card",
        "product1_description": "Help with the LIP Card",
        "product2_title": "Bike Card",
        "product2_description": "Card for bike usage",
        "product3_title": "Bank Account",
        "product3_description": "Opening a bank account",
        "product4_title": "IRP",
        "product4_description": "IRP Registration",
        "ready_title": "Ready to start your new life in Ireland?",
        "contact_description": "We’d love to help! Book an appointment to discuss how we can make your process easier.",
        "contact_button_text": "Book your appointment",
        "footer_text": "© 2024 EasyStartIE - All rights reserved"
    },
    "pt": {
        "title": "EasyStartIE - Facilite sua chegada à Irlanda",
        "main_title": "EasyStartIE",
        "description": "Facilitamos sua chegada à Irlanda, ajudando a gerenciar toda a sua documentação básica.",
        "explore_services": "Explore Nossos Serviços",
        "product1_title": "LIP Card",
        "product1_description": "Ajuda com o LIP Card",
        "product2_title": "Bike Card",
        "product2_description": "Cartão para uso de bicicletas",
        "product3_title": "Conta Bancária",
        "product3_description": "Abertura de conta bancária",
        "product4_title": "IRP",
        "product4_description": "Registro IRP",
        "ready_title": "Pronto para começar sua nova vida na Irlanda?",
        "contact_description": "Adoraríamos ajudar! Marque uma consulta para discutir como podemos facilitar o seu processo.",
        "contact_button_text": "Marque sua consulta",
        "footer_text": "© 2024 EasyStartIE - Todos os direitos reservados"
    },
    "zh": {
        "title": "EasyStartIE - 让您轻松抵达爱尔兰",
        "main_title": "EasyStartIE",
        "description": "我们帮助您抵达爱尔兰，协助您处理所有基本文件。",
        "explore_services": "探索我们的服务",
        "product1_title": "LIP卡",
        "product1_description": "LIP卡帮助",
        "product2_title": "自行车卡",
        "product2_description": "自行车使用卡",
        "product3_title": "银行账户",
        "product3_description": "开设银行账户",
        "product4_title": "IRP",
        "product4_description": "IRP注册",
        "ready_title": "准备好开始您的爱尔兰新生活了吗？",
        "contact_description": "我们很乐意帮助您！预约时间讨论我们如何简化您的手续。",
        "contact_button_text": "预约您的时间",
        "footer_text": "© 2024 EasyStartIE - 版权所有"
    }
};

function changeLanguage(language) {
    const texts = translations[language];
    
    document.getElementById('title').textContent = texts.title;
    document.getElementById('main-title').textContent = texts.main_title;
    document.getElementById('description').textContent = texts.description;
    document.getElementById('explore-services').textContent = texts.explore_services;
    document.getElementById('product1_title').textContent = texts.product1_title;
    document.getElementById('product1_description').textContent = texts.product1_description;
    document.getElementById('product2_title').textContent = texts.product2_title;
    document.getElementById('product2_description').textContent = texts.product2_description;
    document.getElementById('product3_title').textContent = texts.product3_title;
    document.getElementById('product3_description').textContent = texts.product3_description;
    document.getElementById('product4_title').textContent = texts.product4_title;
    document.getElementById('product4_description').textContent = texts.product4_description;
    document.getElementById('ready-title').textContent = texts.ready_title;
    document.getElementById('contact-description').textContent = texts.contact_description;
    document.getElementById('contact-button').textContent = texts.contact_button_text;
    document.getElementById('footer_text').textContent = texts.footer_text;
}
