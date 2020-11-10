const fromObject = require("tns-core-modules/data/observable").fromObject;
const axios = require("axios").default;

async function onNavigatingTo(args) {
    const page = args.object;
    const context = page.navigationContext;
    const mTitle = page.getViewById("title");
    const mAppTitle = page.getViewById("apptitle");
    const mType = page.getViewById("type");
    const mYear = page.getViewById("year");
    const mDetails = page.getViewById("details");
    await axios.get("https://imdb-api.com/en/API/Wikipedia/k_f5uo6934/" + context.c).then((response) => {
        // mImage.src = response.data.image;
        mTitle.text = response.data.title;
        mAppTitle.text = response.data.fullTitle;
        mYear.text = response.data.year;
        mType.text = response.data.type;
        mDetails.text = response.data.plotShort.plainText;
        // console.log(response.data.plotShort.plainText);
    }).catch(function (error) {
        console.log(error);
    })
}
exports.onNavigatingTo = onNavigatingTo;

function onBackButtonTap(args) {
    const view = args.object;
    const page = view.page;

    page.frame.goBack();
}

exports.onBackButtonTap = onBackButtonTap;