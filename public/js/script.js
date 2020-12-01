new Vue({
  el: "#main",
  data: {
    message: "Welcome to the Quiz",
    greetee: "World",
    basicUrl: "https://api.themoviedb.org/3/movie/",
    movieId: parseInt(Math.random() * (25000 - 1 + 1), 10) + 1,
    title: null,
    description: null,
    Apikey: null,
  },
  created: function () {
    console.log("created");
  },
  mounted: function () {
    console.log("mounted");
    self = this;
    axios.get("/getMovie").then((result) => {
      console.log("this is the result", result.data);
      self.title = result.data.title;
      self.description = result.data.overview;
    });
  },

  updated: function () {
    console.log("updated");
  },
  methods: {
    clicker: function () {
      console.log("clicked!!");
      this.greetee = "Kitty";
    },
    addCologne: function () {
      this.cities.push({
        name: "Cologne",
        country: "Germany",
      });
    },
  },
});
