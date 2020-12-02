Vue.component("movie-information", {
  template: "#tmplMovieInfo",
  data: function () {
    return {};
  },
  props: ["title", "description", "imgBaseUrl", "poster"],
  methods: {},
});

Vue.component("movie-poster", {
  template: "#tmplMoviePoster",
  data: function () {
    return {};
  },
  props: ["title", "description", "imgBaseUrl", "poster", "message"],
  methods: {},
});

new Vue({
  el: "#main",
  data: {
    message: "Welcome to the Quiz",
    greetee: "World",
    basicUrl: "https://api.themoviedb.org/3/movie/",
    title: null,
    description: null,
    imgBaseUrl: "https://image.tmdb.org/t/p/",
    imgWidth: "w500",
    imgPath: null,
    poster: null,
  },
  created: function () {
    console.log("created");
  },
  mounted: function () {
    console.log("mounted");
  },

  updated: function () {
    console.log("updated");
  },
  methods: {
    getMovie: function () {
      console.log("getting the movie");
      self = this;
      axios.get("/getMovie").then((result) => {
        console.log("success?", result.data.success);

        if (result.data.success === false) {
          this.getMovie();
        } else {
          console.log("das klickresultat", result);
          self.title = result.data.title;
          self.description = result.data.overview;
          self.imgPath = result.data.poster_path;
          self.poster = self.imgBaseUrl + self.imgWidth + result.data.poster_path;
          self.message = "Leite mal weiter du hund";

          console.log("the poster man", self.poster);
          console.log("the self base imgURL man", self.imgBaseUrl);
        }
      });
    },
    getConfig: function () {
      axios.get("/getConfig").then((result) => {
        console.log("this is the config", result);

        self.imgBaseUrl = result.data.images.secure_base_url;
        self.imgWidth = result.data.images.poster_sizes[4];
        console.log("this should be the baseURL", result.data.images.poster_sizes[4]);
      });
    },
  },
});
