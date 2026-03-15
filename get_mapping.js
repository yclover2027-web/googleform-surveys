const https = require('https');
const fs = require('fs');
https.get('https://docs.google.com/forms/d/e/1FAIpQLScfauLwVGL6s2YI5fgiC3A9qt0ldxerqRwDFvJ_d9Jc90Uvpg/viewform', (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
        const match = data.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*(.*?);\s*<\/script>/);
        if (match && match[1]) {
            const parsed = JSON.parse(match[1]);
            const items = parsed[1][1];
            let output = '--- CORRECT ID MAPPINGS ---\n';
            items.forEach(item => {
                try {
                    if (Array.isArray(item[4]) && Array.isArray(item[4][0])) {
                        const title = typeof item[1] === 'string' ? item[1].replace(/\n/g, ' ') : '';
                        const id = item[4][0][0];
                        output += `entry.${id} : ${title}\n`;
                    }
                } catch (e) { }
            });
            fs.writeFileSync('c:\\Users\\yuuki\\OneDrive - 有限会社クローバー調剤薬局\\その他\\Antigravity\\Googleフォーム\\id_mapping.txt', output);
            console.log("Saved to id_mapping.txt");
        }
    });
});
