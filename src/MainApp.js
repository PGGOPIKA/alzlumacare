import { useSettings } from './SettingsContext';

function MainApp({ onLogout }) {
  const { settings } = useSettings();

  const appClass = `
    main-app
    ${settings.theme === 'High Contrast' ? 'high-contrast' : ''}
    ${settings.theme === 'Large Fonts' ? 'large-fonts' : ''}
  `;

  return (
    <div className={appClass}>
      {/* UI */}
    </div>
  );
}
