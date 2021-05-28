const mongoose = require('mongoose');
const Product =require('./models/product');

const products = [
    {
        name: 'Iphone 12',
        img: 'https://static.toiimg.com/thumb/msid-78716090,width-1200,height-900,resizemode-4/.jpg',
        price: 75000,
        desc: 'The iPhone 12 costs more than its predecessors but has a crisp new HDR OLED screen. It offers nearly all the feaures of the iPhone 12 Pro, minus some camera capabilities, but should be a good enough package for most users. Apple has returned to a flat aluminium frame but the iPhone 12 promises to be more durable thanks to its Ceramic Shield material on the front and IP68 rating. You get the A14 Bionic SoC which makes everyday use extremely smooth and responsive, but the device does get a bit warm when stressed. Battery life is good, but not great, and you will be able to get through a full day. The iPhone 12 is relatively light and easy to handle. iOS 14 has some new customisation options and privacy features. You get two rear cameras - a wide-angle and an ultra-wide-angle one, which both have 12-megapixel sensors. Night mode now works across all cameras including the front one, and still shots as well as videos are remarkably sharp and detailed in the daytime as well as at night.',
    },
    {
        name: 'Macbook Air',
        img: 'https://images.macrumors.com/article-new/2020/11/macbook-air-m1-unboxing.jpg',
        price: 125000,
        desc: 'Apple MacBook Air 2020 is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i3 processor and it comes with 8GB of RAM. The Apple MacBook Air 2020 packs 256GB of SSD storage.Graphics are powered by Integrated Graphics Processor. Connectivity options include Wi-Fi 802.11 a/b/g/n/ac, Bluetooth and it comes with Headphone and Mic Combo Jack ports',
    },
    {
        name: 'Air Pods',
        img: 'https://5.imimg.com/data5/SZ/ZW/II/SELLER-55185391/apple-airpods-2-500x500.jpg',
        price: 13000,
        desc: 'rPods will forever change the way you use headphones. Whenever you pull your AirPods out of the charging case, they instantly turn on and connect to your iPhone, Apple Watch, iPad, or Mac.1 Audio automatically plays as soon as you put them in your ears and pauses when you take them out. To adjust the volume, change the song, make a call, or even get directions, just double-tap to activate Siri.',
    },
    {
        name: 'Ipad Pro',
        img: 'https://images.macrumors.com/t/EImZrqoPGcvNaP5inkN0AF0ejns=/1600x/https://images.macrumors.com/article-new/2020/11/ipad-pro-display-apple-pencil.jpg',
        price: 70000,
        desc: 'Apple iPad Pro 12.9-inch (2021) Wi-Fi tablet was launched on 20th April 2021. The tablet comes with a 12.90-inch touchscreen display with a resolution of 2732x2048 pixels at a pixel density of 264 pixels per inch (ppi). Apple iPad Pro 12.9-inch (2021) Wi-Fi is powered by an octa-core Apple M1 processor. It comes with 8GB of RAM. As far as the cameras are concerned, the Apple iPad Pro 12.9-inch (2021) Wi-Fi on the rear packs 12-megapixel camera. It sports a 12-megapixel camera on the front for selfies. Apple iPad Pro 12.9-inch (2021) Wi-Fi is based on iPadOS 14 and packs 128GB of inbuilt storage. The Apple iPad Pro 12.9-inch (2021) Wi-Fi measures 280.60 x 214.90 x 6.40mm (height x width x thickness) and weighs 682.00 grams. It was launched in Silver and Space Grey colours. Connectivity options on the Apple iPad Pro 12.9-inch (2021) Wi-Fi include USB Type-C and Wi-Fi. Sensors on the tablet include ambient light sensor, barometer, gyroscope, and accelerometer.',
    }
]

const seedDB = async () => {
    await Product.insertMany(products);
    console.log('DB seeded!');
}

module.exports= seedDB;
