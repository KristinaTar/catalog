const fs = require('fs');

async function main() {
    const data = fs.readFileSync('../src/data/goods_FULL.json',
        {encoding: 'utf8', flag: 'r'});
    const filters = {
        diagonal: [],
        brightness: [],
        resolution: [],
        matrixSpeed: [],
        matrixType: [],
        brand: [],
    };

    const goodsData = JSON.parse(data)
    for (const good of goodsData) {
        if (good.description?.diagonal && !filters.diagonal.includes(good.description?.diagonal)) {
            filters.diagonal.push(good.description?.diagonal);
        }
        if (good.description?.brightness && !filters.brightness.includes(good.description?.brightness)) {
            filters.brightness.push(good.description?.brightness);
        }
        if (good.description?.resolution && !filters.resolution.includes(good.description?.resolution)) {
            filters.resolution.push(good.description?.resolution);
        }
        if (good.description?.matrixSpeed && !filters.matrixSpeed.includes(good.description?.matrixSpeed)) {
            filters.matrixSpeed.push(good.description?.matrixSpeed);
        }
        if (good.description?.matrixType && !filters.matrixType.includes(good.description?.matrixType)) {
            filters.matrixType.push(good.description?.matrixType);
        }
        if (good.brand && !filters.brand.includes(good.brand)) {
            filters.brand.push(good.brand);
        }
    }

    filters.diagonal = filters.diagonal.sort((a, b) => a > b ? 1 : -1);
    filters.resolution = filters.resolution.sort((a, b) => a > b ? 1 : -1);
    filters.matrixType = filters.matrixType.sort((a, b) => a > b ? 1 : -1);
    filters.brand = filters.brand.sort((a, b) => a > b ? 1 : -1);

    fs.writeFileSync('./filters.json', JSON.stringify(filters, null, 2));
}

main();

const x = {
    "description": {
        "diagonal": "27\"",
        "brightness": "250 кд/м²",
        "contrast": "2500:1",
        "resolution": "2560x1440 (2K QHD)",
        "matrixSpeed": "1 мс (GtG)",
        "matrixType": "VA"
    },
    "brand": "samsung"
}
