let inkeepWidget;

const defaultConfig = {
  chatButtonType: "ICON_TEXT",
  baseSettings: {
    apiKey: "YOUR_API_KEY",
    integrationId: "YOUR_INTEGRATION_ID",
    organizationId: "YOUR_ORGANIZATION_ID",
    primaryBrandColor: "#26D6FF", // your brand color, widget color scheme is derived from this
    organizationDisplayName: "Inkeep",
    // ...optional settings
  },
  modalSettings: {
    // optional settings
  },
  searchSettings: {
    // optional settings
  },
  aiChatSettings: {
    // optional settings
    botAvatarSrcUrl: "/img/logo.svg", // use your own bot avatar
    quickQuestions: [
      "Example question 1?",
      "Example question 2?",
      "Example question 3?",
    ],
  },
};

// Deep merge object, this way or use your own library approach
const deepMergeObjects = (obj1, obj2) => {
  const merged = { ...obj1 };

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (typeof obj2[key] === "object" && !Array.isArray(obj2[key])) {
        if (typeof merged[key] === "object" && !Array.isArray(merged[key])) {
          merged[key] = deepMergeObjects(merged[key], obj2[key]);
        } else {
          merged[key] = { ...obj2[key] };
        }
      } else {
        merged[key] = obj2[key];
      }
    }
  }

  return merged;
};

const initialConfigAdditive = JSON.parse(
  localStorage.getItem("_ikp_config_additive") || "{}"
);

const baseWidgetConfig = {
  componentType: "ChatButton",
  // optional -- for syncing UI color mode
  colorModeSync: {
    observedElement: document.documentElement,
    isDarkModeCallback: (el) => {
      return el.getAttribute("data-theme") === "dark";
    },
    colorModeAttribute: "data-theme",
  },
};

inkeepWidget = Inkeep().embed({
  ...baseWidgetConfig,
  properties: deepMergeObjects(defaultConfig, initialConfigAdditive),
});

window.addEventListener("storage", () => {
  const configAdditive = JSON.parse(
    localStorage.getItem("_ikp_config_additive") || "{}"
  );

  const updatedConfig = deepMergeObjects(defaultConfig, configAdditive);

  inkeepWidget.render({ baseWidgetConfig, ...updatedConfig });
});
