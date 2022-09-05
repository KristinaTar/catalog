const https = require('https');
const fs = require('fs');

const URL1 = "https://search.rozetka.com.ua/ua/search/api/v6/?front-type=xl&country=UA&lang=ua&section_id=80089&page=";
const URL2 = "&text=%D0%BC%D0%BE%D0%BD%D1%96%D1%82%D0%BE%D1%80%D0%B8";

async function main() {
    let goods = [];
    for (let i = 0; i < 20; i++) {
        const data = await getData(URL1 + i + URL2);
        let json = JSON.parse(data);
        goods = goods.concat(json.data.goods);
    }

    console.log(goods.length);

    let collectedGoods = goods.map((good) => ({
        id: good.id,
        title: good.title,
        href: good.href,
        description: good.description_fields && {
            diagonal: good.description_fields["21362"]?.go_value,
            brightness: good.description_fields["21363"]?.go_value,
            contrast: good.description_fields["21364"]?.go_value,
            resolution: good.description_fields["21368"]?.go_value,
            matrixType: good.description_fields["22050"]?.go_value,
        },
        comments: good?.comments_amount,
        comments_mark: good?.comments_mark,
        price: good?.price,
        image: good?.image_main,
        brand: good?.brand,
    }));

    collectedGoods = collectedGoods.filter(
        (good) => good.description != null
        && good.description.diagonal != null
        && good.description.brightness != null
        && good.description.contrast != null
        && good.description.resolution != null
        && good.description.matrixType != null
    );

    // remove duplicates
    const ids = [];
    const finalGoods = [];
    for (let i = 0; i < collectedGoods.length; i++) {

        if (!ids.includes(collectedGoods[i].id)) {
            finalGoods.push(collectedGoods[i]);

            ids.push(collectedGoods[i].id);
        }
    }
    console.log(`finalGoods: ${finalGoods.length}`);

    fs.writeFileSync('./goods.json', JSON.stringify(finalGoods, null, 2));
}

const getData = function (url) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, response => {
            const body = [];
            response.on("data", chunk => body.push(chunk));
            response.on("end", () => resolve(body.join("")));
        });
        request.on("error", err => reject(err));
    });
};

main();


const x = {
    "id": 250707941,
    "title": "Монітор 27\" Samsung Odyssey G5 LC27G55T Black (LC27G55TQWIXCI)",
    "href": "https://hard.rozetka.com.ua/ua/samsung_lc27g55tqwixci/p250707941/",
    "docket": "",
    "is_docket": false,
    "description_fields": {
        "21362": {
            "opt_id": 21362,
            "o_title": "Діагональ дисплея",
            "go_value": "27\""
        },
        "21363": {
            "opt_id": 21363,
            "o_title": "Яскравість дисплея",
            "go_value": "250 кд/м²"
        },
        "21364": {
            "opt_id": 21364,
            "o_title": "Контрастність дисплея",
            "go_value": "2500:1"
        },
        "21368": {
            "opt_id": 21368,
            "o_title": "Максимальна роздільна здатність дисплея",
            "go_value": "2560x1440 (2K QHD)"
        },
        "21385": {
            "opt_id": 21385,
            "o_title": "Час реакції матриці",
            "go_value": "1 мс (GtG)"
        },
        "22050": {
            "opt_id": 22050,
            "o_title": "Тип матриці",
            "go_value": "VA"
        },
        "22056": {
            "opt_id": 22056,
            "o_title": "Особливості",
            "go_value": "Безрамковий (Сinema screen), Flicker-Free, Вигнутий екран"
        },
        "23522": {
            "opt_id": 23522,
            "o_title": "Інтерфейси",
            "go_value": "HDMI х 2, DisplayPort"
        }
    },
    "category_id": 80089,
    "comments_amount": 52,
    "comments_mark": 4.2,
    "merchant_id": 1,
    "old_price": 11499,
    "pl_bonus_charge_pcs": 0,
    "pl_use_instant_bonus": 0,
    "price": 11499,
    "price_pcs": "310.78",
    "sell_status": "available",
    "status": "available",
    "seller_id": 5,
    "state": "new",
    "image_main": "https://content.rozetka.com.ua/goods/images/big_tile/7347577.jpg",
    "images": {
        "main": "https://content.rozetka.com.ua/goods/images/big_tile/7347577.jpg",
        "hover": "https://content2.rozetka.com.ua/goods/images/big_tile/7347580.jpg",
        "preview": "https://content.rozetka.com.ua/goods/images/preview/7347577.jpg"
    },
    "parent_category_id": 80253,
    "brand": "samsung",
    "brand_id": 12,
    "producer_id": 12,
    "discount": 0,
    "stars": "84%",
    "groups": {
        "block": null,
        "color": null,
        "prices": null
    },
    "is_groups_title": false,
    "config": {
        "bonus": true,
        "brand": false,
        "buy_button": true,
        "compare_button": true,
        "description": true,
        "gift": false,
        "image": true,
        "old_price": true,
        "pictograms": true,
        "price": true,
        "promo_price": false,
        "rating": true,
        "status": true,
        "tags": true,
        "title": true,
        "variables": true,
        "wishlist_button": true,
        "promo_code": false,
        "hide_rating_review": false,
        "show_supermarket_price": false
    }
};
