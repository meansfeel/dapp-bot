import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Welcome": "Welcome",
          "Connect Wallet": "Connect Wallet",
          "Performance Report": "Performance Report",
          // ... 其他翻译
        }
      },
      zh: {
        translation: {
          "Welcome": "欢迎",
          "Connect Wallet": "连接钱包",
          "Performance Report": "性能报告",
          // ... 其他翻译
        }
      }
    },
    lng: "zh", // 默认语言
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
