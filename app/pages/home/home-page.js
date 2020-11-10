const { fromObject } = require("@nativescript/core");
const axios = require("axios").default;

async function onNavigatingTo(args) {
    const page = args.object;

    let movies;
    await axios.get("https://imdb-api.com/en/API/MostPopularMovies/k_f5uo6934").then((r) => {
        movies = r.data.items;
    }).catch((e) => {
        console.log(e);
    });
    const viewModel = fromObject({
        movies: movies
    });
    page.bindingContext = viewModel;
}
exports.onNavigatingTo = onNavigatingTo;

function onItemTap(args) {
    const id = args.view.id;
    const listView = args.object;
    const page = listView.page;
    page.frame.navigate({
        moduleName: "pages/movie-details/movie-details-page",
        context: {
            c: id,
        },
        animated: true,
        transition: {
            name: "slide",
            duration: 300,
            curve: "ease"
        }
    });
}
exports.onItemTap = onItemTap;
