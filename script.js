const ads = [
    {
        id: "realty",
        title: "Продається 1-кімнатна квартира біля метро",
        category: "Нерухомість",
        categoryCode: "realty",
        daysAgo: 3,
        image: "assets/img/apartment.svg",
        imageAlt: "Світла кімната квартири з великим вікном",
        city: "Київ, Шевченківський район",
        description: "Світла квартира площею 42 м², 5 поверх із 9. Поруч метро, супермаркет, школа та парк. Є меблі й побутова техніка.",
        price: "68 000 $"
    },
    {
        id: "room",
        title: "Здам кімнату біля університету",
        category: "Нерухомість",
        categoryCode: "realty",
        daysAgo: 20,
        image: "assets/img/apartment.svg",
        imageAlt: "Кімната у квартирі біля університету",
        city: "Київ, Голосіївський район",
        description: "Окрема кімната в квартирі поруч із університетом. Є меблі, інтернет і зручне транспортне сполучення.",
        price: "6 500 грн/міс."
    },
    {
        id: "electronics",
        title: "Продам ноутбук Lenovo ThinkPad E14",
        category: "Електроніка",
        categoryCode: "electronics",
        daysAgo: 8,
        image: "assets/img/laptop.svg",
        imageAlt: "Відкритий ноутбук на дерев'яному столі",
        city: "Львів",
        description: "Ноутбук у хорошому стані, екран 14 дюймів, процесор Intel Core i5, 16 ГБ оперативної пам’яті та SSD на 512 ГБ. У комплекті зарядний пристрій.",
        price: "19 500 грн"
    },
    {
        id: "other",
        title: "Продам міський велосипед Trek FX",
        category: "Інше",
        categoryCode: "other",
        daysAgo: 18,
        image: "assets/img/bicycle.svg",
        imageAlt: "Міський велосипед із багажником",
        city: "Київ, Подільський район",
        description: "Легкий алюмінієвий велосипед для міських поїздок. Справні гальма, нові покришки, є задній багажник.",
        price: "8 500 грн"
    }
];

console.log("script.js підключено");

const categoryToShow = "Нерухомість";

// Скорочує довгі назви оголошень до заданої кількості символів.
const shorten = (text, n) => text.length > n ? text.slice(0, n) + "…" : text;

// Виводить оголошення вибраної категорії та позначає застарілі записи.
function showAdsByCategory(items, category) {
    console.log(`Оголошення категорії «${category}»:`);
    let matchingCount = 0;

    for (const ad of items) {
        if (ad.category === category) {
            matchingCount += 1;
            const ageLabel = ad.daysAgo > 14 ? "застаріле" : "актуальне";
            console.log(`${shorten(ad.title, 40)} — ${ageLabel} (${ad.daysAgo} дн.)`);
        }
    }

    console.log(`Знайдено оголошень: ${matchingCount}`);
}

showAdsByCategory(ads, categoryToShow);

const listingsList = document.querySelector("#listings-list");
const listingsCount = document.querySelector("#listings-count");

// Створює картки з даних оголошень і підраховує актуальні записи.
function renderListings(items) {
    if (!listingsList || !listingsCount) {
        return;
    }

    listingsList.querySelectorAll(".ad-card").forEach((card) => card.remove());
    let activeCount = 0;

    for (const ad of items) {
        const card = document.createElement("article");
        card.classList.add("ad-card");
        card.id = ad.id;
        card.dataset.daysAgo = String(ad.daysAgo);

        if (ad.daysAgo > 14) {
            card.classList.add("outdated");
        } else {
            activeCount += 1;
        }

        const image = document.createElement("img");
        image.src = ad.image;
        image.alt = ad.imageAlt;

        const title = document.createElement("h3");
        title.textContent = ad.title;

        const categoryLine = document.createElement("p");
        categoryLine.classList.add("ad-category");
        const categoryBadge = document.createElement("span");
        categoryBadge.classList.add("category-badge", `category-badge--${ad.categoryCode}`);
        categoryBadge.textContent = ad.category;
        categoryLine.append(categoryBadge);

        card.append(image, title, categoryLine);

        if (card.classList.contains("outdated")) {
            const status = document.createElement("p");
            status.classList.add("ad-status");
            status.textContent = "Застаріле оголошення";
            card.append(status);
        }

        for (const [label, value] of [
            ["Місто:", ad.city],
            ["Опис:", ad.description],
            ["Ціна:", ad.price]
        ]) {
            const paragraph = document.createElement("p");
            const strong = document.createElement("strong");
            strong.textContent = label;
            paragraph.append(strong, document.createTextNode(` ${value}`));
            card.append(paragraph);
        }

        const age = document.createElement("p");
        age.classList.add("ad-date");
        age.textContent = `Опубліковано ${ad.daysAgo} дн. тому`;
        card.append(age);

        listingsList.append(card);
    }

    listingsCount.textContent = `Актуальних оголошень: ${activeCount}`;
}

renderListings(ads);
