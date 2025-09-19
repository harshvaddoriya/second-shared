export async function callFacebookPuppeteer(url) {
    const chromium = await import('chrome-aws-lambda');
    const puppeteer = await import('puppeteer-core');

    let browser;
    try {
        browser = await puppeteer.launch({
            args: chromium.args || [],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: true,
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const videos = await page.$$eval('video', els =>
            els.map(v => v.src).filter(Boolean)
        );

        const images = await page.$$eval('img', els =>
            els.map(i => i.src).filter(s => s.includes('scontent'))
        );

        const caption = await page.$eval("div[dir='auto']", el => el.innerText).catch(() => null);

        const media = videos.length ? videos : images;

        return {
            type: videos.length ? 'video' : 'photo',
            caption: caption || null,
            media: media.map(url => ({ url })),
        };
    } catch (err) {
        console.error('Error in Puppeteer:', err);
        throw err;
    } finally {
        if (browser) await browser.close();
    }
}


