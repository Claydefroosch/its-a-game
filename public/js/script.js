Vue.component("movie-information", {
  template: "#tmplMovieInfo",
  data: function () {
    return {};
  },
  props: ["title", "description", "imgBaseUrl", "imgURL"],
  methods: {},
});

new Vue({
  el: "#main",
  data: {
    message: "Welcome to the Quiz",
    greetee: "World",
    basicUrl: "https://api.themoviedb.org/3/movie/",
    movieId: parseInt(Math.random() * (25000 - 1 + 1), 10) + 1,
    title: null,
    description: null,
    imgBaseUrl: null,
    imgWidth: null,
    imgPath: null,
    imgURL: null,
  },
  created: function () {
    console.log("created");
    axios.get("/getConfig").then((result) => {
      console.log("this is the config", result);

      self.imgBaseUrl = result.data.images.secure_base_url;
      self.imgWidth = result.data.images.poster_sizes[4];
      console.log("this should be the baseURL", self.imgBaseUrl);
    });
  },
  mounted: function () {
    console.log("mounted");
  },

  updated: function () {
    console.log("updated");
  },
  methods: {
    clicker: function () {
      console.log("clicked!!");
      this.greetee = "Kitty";
    },
    getMovie: function () {
      console.log("getting the movie");
      self = this;
      axios.get("/getMovie").then((result) => {
        console.log("das klickresultat", result);
        self.title = result.data.title;
        self.description = result.data.overview;
        self.imgPath = result.data.poster_path;
        self.imgURL = self.imgBaseUrl + self.imgWidth + result.data.poster_path;
      });
    },
  },
});
