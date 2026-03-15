const https = require('https');
const querystring = require('querystring');
const fs = require('fs');

const postData = querystring.stringify({
    'entry.2108592001': 'テスト名前',
    'entry.1016463931': 'てすとふりがな',
    'entry.622897563': '09012345678',
    'entry.1417926586': '男性',
    'entry.998853333': '初めてです。',
    'entry.893585706': 'ジェネリック医薬品を希望します',
    'entry.1482297776': 'はい',
    'entry.2140005991': 'いいえ',
    'entry.662494497': 'いいえ',
    'entry.854718610': '体質: いいえ',
    'entry.1377007546': 'いいえ',
    'entry.1740273603': 'なし'
});

const options = {
    hostname: 'docs.google.com',
    path: '/forms/d/e/1FAIpQLScfauLwVGL6s2YI5fgiC3A9qt0ldxerqRwDFvJ_d9Jc90Uvpg/formResponse',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = https.request(options, (res) => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
        fs.writeFileSync('response_test.html', d);
        console.log('Status: ' + res.statusCode);

        // エラーメッセージの抽出
        const jsdom = require('jsdom'); // Cannot assume jsdom exists, fallback to regex

        const matches = d.match(/<div class="[^"]*freebirdFormviewerViewItemsItemErrorMessage[^"]*"[^>]*>(.*?)<\/div>/g);
        if (matches) console.log('Errors found in HTML:', matches.join('\n'));
        else console.log('No specific error classes found. Check response_test.html manually if still 400.');
    });
});
req.write(postData);
req.end();
