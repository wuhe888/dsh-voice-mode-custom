/** Standalone voice settings share the same controller as the settings dialog. */
import * as React from 'react'
import { VoiceSettingsCard } from './settings-form.tsx'
import { t, useLang } from './i18n.ts'

const pageStyles = `
.dsh-voice-settings-page {
  display: flex; flex-direction: column; flex: 1; min-width: 0; min-height: 0;
  box-sizing: border-box; overflow: auto; padding: 28px clamp(24px, 4vw, 48px);
  container: dsh-voice-page / inline-size; scrollbar-gutter: stable both-edges;
}
.dsh-voice-settings-content { flex: none; width: 100%; max-width: 960px; min-width: 0; margin: auto; }
.dsh-voice-settings-page [data-dshvm-settings="card"] > button {
  display: grid !important; grid-template-columns: minmax(0, 1fr) auto; gap: 8px 12px !important;
}
.dsh-voice-settings-page [data-dshvm-settings="card"] > button > span:first-child { display: contents !important; }
.dsh-voice-settings-page [data-dshvm-title] {
  grid-column: 1 / -1; text-align: center; font-size: 15px !important; line-height: 21px !important; font-weight: 700 !important;
}
@media (max-width: 767px) { .dsh-voice-settings-page { padding: 20px; } }
@container dsh-voice-page (max-width: 640px) {
  .dsh-voice-settings-page [data-dshvm-row] { flex-direction: column; align-items: stretch !important; }
  .dsh-voice-settings-page [data-dshvm-row] > span { max-width: 100% !important; }
  .dsh-voice-settings-page [data-dshvm-row] :is(input, select) { max-width: 100%; }
  .dsh-voice-settings-page [role="group"] { flex-wrap: wrap; }
}
@media (pointer: coarse) { .dsh-voice-settings-page :is(input, select) { font-size: 16px !important; } }
`

/**
 * Render the full-page settings entry without creating another settings store.
 * @param props - The controller shared by every voice settings entry.
 * @returns A scrollable, responsive settings page.
 */
export function VoiceSettingsPage({ scope }: Pick<React.ComponentProps<typeof VoiceSettingsCard>, 'scope'>): React.ReactElement {
  useLang()
  return <section className="dsh-voice-settings-page" aria-label={t('stateVoiceMode')}>
    <style>{pageStyles}</style>
    <div className="dsh-voice-settings-content"><VoiceSettingsCard scope={scope} defaultOpen /></div>
  </section>
}

/**
 * The filled microphone glyph used by the composer.
 * @param props - Icon size supplied by its host surface.
 * @returns A decorative microphone icon.
 */
export function VoiceMicrophoneIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
    <path fill="currentColor" d="M17.3 11a.9.9 0 0 0-1.8 0 3.5 3.5 0 0 1-7 0 .9.9 0 0 0-1.8 0 5.3 5.3 0 0 0 4.4 5.2v1.9h-1.7a.9.9 0 0 0 0 1.8h5.2a.9.9 0 0 0 0-1.8h-1.7v-1.9A5.3 5.3 0 0 0 17.3 11Z" />
  </svg>
}

/**
 * An outlined microphone for the sidebar, using the host's 16-unit icon proportions.
 * @param props - Icon size supplied by the sidebar.
 * @returns A decorative microphone icon that inherits the sidebar text color.
 */
export function VoiceSidebarMicrophoneIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return <svg viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
    <rect x={5} y={1.5} width={6} height={9} rx={3} />
    <path d="M2.35 8.675C3.075 11.3 5.2 13.125 8 13.125C10.8 13.125 12.925 11.3 13.65 8.675M8 13.125V15" />
  </svg>
}
