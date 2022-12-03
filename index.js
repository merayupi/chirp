var random = require('random-name')
const readline = require('readline-sync')
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const moment = require('moment');
const delay = require('delay');
const randUserAgent = require('rand-user-agent');
const agent = randUserAgent("desktop", "chrome", "linux");
const fs = require('fs')

const randstr = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
});

const functionRegist = (firstname,lastname,email, kodereff) => new Promise((resolve, reject) => {
    fetch("https://app.viral-loops.com/api/v2/events", {
        method: "POST",    
        headers: {
            "accept": "/",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "sec-ch-ua": '"Chromium";v="107", "Google Chrome";v="107", "Not;A=Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "Windows",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "x-ucid": "LDA6pasedL0eT1H3G83aCbpw7n0",
            "Referer": "https://waitlist.chirpwireless.io/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: JSON.stringify({
            publicToken:"LDA6pasedL0eT1H3G83aCbpw7n0",
            params: {
                event:"registration",
                user: {
                    firstname:firstname,
                    lastname:lastname,
                    email:email,
                    acquiredFrom:"form_widgetV2",
                    extraData:{}
                },
                referrer: {
                    referralCode:kodereff
                },
                refSource:"copy",
                acquiredFrom:"form_widgetV2"
            }
        }),
    })
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
})


const functionVerifemail = (email, domain) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/${domain}/${email}`, {
            method: "get",
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "accept-encoding": "gzip, deflate, br",
                "cookie": `_ga=GA1.2.659238676.1567004853; _gid=GA1.2.273162863.1569757277; embx=%5B%22${email}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=io=tIcarRGNgwqgtn40O${randstr(3)}; surl=${domain}%2F${email}`,
                "upgrade-insecure-requests": 1,
                "user-agent": agent
            }
        })
        .then(res => res.text())
        .then(text => {
            let $ = cheerio.load(text);
            let src = $('#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > div > div > table.jumbotron > tbody > tr > td > div > div > table > tbody > tr > td > table > tbody > tr > td > a');
            let srcc = src.attr('href')
            resolve(srcc);
        })
        .catch(err => reject(err));
});

(async() => {
    console.log(`[ ${moment().format("HH:mm:ss")} ] ` + "========Ngebot chirp By Conny========\n")
    var tanyareff = readline.question(`[ ${moment().format("HH:mm:ss")} ] ` + 'Kode reff : ');
    var jumlah = readline.question(`[ ${moment().format("HH:mm:ss")} ] ` + 'Jumlah reff : ')

    for (var i = 0; i < jumlah; i++) {
        try {
            
            const list = ['jagomail.com', 'playfuny.com', 'xvector.org', 'otpku.com', 'yuinhami.com', 'alvinneo.com', 'saxophonexltd.com','gasssmail.com']
            const list1 = list[Math.floor(Math.random() * list.length)];
            var name = random.first()
            var lastname = random.last()
            var uname = `${name}${lastname}`
            var email = uname + `@` + list1;
            var kodereff = tanyareff;

            console.log('=========================================================================')
            console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `Mencoba reff ke ${i}`)
            console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `coba Regist pake email ${email}`)
            var regist = await functionRegist(name,lastname,email, kodereff)

                if (regist.status == 406){
                    console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `Sukses Regist pake email ${email}`)
                    await delay(700);

                    var stop = false;
                    setTimeout(()=>{ stop = true; }, 20 * 1000);
                    do {
                        linkConfirm = await functionVerifemail(uname, email.split('@')[1]);
                        console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `Wait for veriff link..`)
                        if (stop){
                            break;
                        }
                    } while (!linkConfirm);
                    if(linkConfirm==undefined){
                        console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `Ulang Terlalu lama menunggu otp`)
                        i--;
                    }
                    else{
                        console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `Got the link`)
                        await delay(100);

                        fs.appendFileSync('linkverif.txt', `${linkConfirm}\n`);
                        console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `berhasil export link ke linkverif.txt`)
                        await delay(1000)
                        console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `Sukses reff ke ${i}`)
                        console.log('=========================================================================\n')
                        await delay(2000)
                    }
                }
                else{
                    console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `GAGAL REGIST`)
                    i--
                }
        } catch (error) {
            console.log(error)
            i--
        }
    }

})();