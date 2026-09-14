import { afterEach, describe, expect, it, vi } from 'vitest';

async function setup(host = 'topperfume.cn', robots = 'index,follow', saved: string | null = null) {
  vi.resetModules();
  let stored = saved;
  const appendChild = vi.fn();
  const reload = vi.fn();
  const browser: any = { location: { hostname: host, reload }, localStorage: { getItem: () => stored, setItem: (_: string, value: string) => { stored = value; } }, dispatchEvent: vi.fn() };
  vi.stubGlobal('window', browser);
  vi.stubGlobal('document', { querySelector: () => ({ getAttribute: () => robots }), head: { appendChild }, createElement: () => ({}), cookie: '_ga=old; _ga_4BX79STS9F=old' });
  const consent = await import('../client/src/lib/consent');
  return { consent, browser, appendChild, reload };
}
afterEach(() => vi.unstubAllGlobals());
describe('basic analytics consent without network requests', () => {
  it('does not load, queue analytics or track before consent or after rejection', async () => {
    const { consent, browser, appendChild } = await setup();
    consent.initializeAnalytics();
    expect(consent.canTrack()).toBe(false);
    expect(browser.dataLayer).toBeUndefined();
    consent.chooseConsent('denied');
    expect(appendChild).not.toHaveBeenCalled();
  });
  it('loads exactly once after opt-in, with advertising denied and manual pageviews', async () => {
    const { consent, browser, appendChild } = await setup();
    consent.chooseConsent('granted'); consent.initializeAnalytics();
    expect(appendChild).toHaveBeenCalledTimes(1);
    expect(browser.dataLayer[0]).toEqual(['consent', 'default', expect.objectContaining({ analytics_storage: 'denied' })]);
    expect(browser.dataLayer[1]).toEqual(['consent', 'update', expect.objectContaining({ analytics_storage: 'granted', ad_user_data: 'denied', ad_personalization: 'denied' })]);
    expect(browser.dataLayer[3][2].send_page_view).toBe(false);
    expect(JSON.stringify(browser.dataLayer)).not.toMatch(/debug_mode|debug_event/);
  });
  it('withdrawal disables collection before reloading with a saved rejection', async () => {
    const { consent, browser, reload } = await setup('topperfume.cn', 'index,follow', 'granted');
    consent.initializeAnalytics(); consent.chooseConsent('denied');
    expect(consent.canTrack()).toBe(false);
    expect(browser['ga-disable-G-4BX79STS9F']).toBe(true);
    expect(reload).toHaveBeenCalledTimes(1);
  });
  it.each([['localhost','index,follow'], ['example.vercel.app','index,follow'], ['topperfume.cn','noindex,nofollow']])('never loads in guarded environment %s %s', async (host, robots) => {
    const { consent, appendChild } = await setup(host, robots, 'granted');
    consent.initializeAnalytics();
    expect(appendChild).not.toHaveBeenCalled();
    expect(consent.canTrack()).toBe(false);
  });
  it('storage failure cannot preserve a prior grant after withdrawal', async () => {
    const { consent, browser } = await setup('topperfume.cn','index,follow','granted');
    consent.initializeAnalytics();
    browser.localStorage.setItem = () => { throw new Error('blocked'); };
    consent.chooseConsent('denied');
    expect(consent.canTrack()).toBe(false);
    expect(browser['ga-disable-G-4BX79STS9F']).toBe(true);
  });
});
