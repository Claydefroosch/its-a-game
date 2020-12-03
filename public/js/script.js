Vue.component("welcome-component", {
  template: "#tmplWelcome",
  data: function () {
    return {};
  },
  props: ["title", "description", "imgBaseUrl", "poster", "init"],
  methods: {
    startButton: function () {
      this.$emit("clicked");
    },
  },
});

Vue.component("movie-question", {
  template: "#tmplMovieQuestion",
  data: function () {
    return {
      userAnswer: "",
      error: null,
      tryOut: 3,
    };
  },
  props: ["title", "description", "imgBaseUrl", "poster", "started"],
  methods: {
    submitAnswer: function () {},
    logAnswer: function () {
      let rightTitle = this.title.toLowerCase();
      let userAnswer = this.userAnswer.toLowerCase();
      if (userAnswer != rightTitle) {
        console.log("your answer is wrong");
        console.log(rightTitle);
        this.error = "that was wrong";
        this.tryOut--;
        if (this.tryOut < 1) {
          console.log("no more tries left");
          this.$emit("minus");
        }
      } else {
        console.log("this was right");
        console.log(userAnswer);
        this.$emit("submit");
      }
    },
  },
});

Vue.component("movie-solution", {
  template: "#tmplMovieSolution",
  data: function () {
    return {};
  },
  props: ["title", "description", "imgBaseUrl", "poster", "message", "solution", "right", "wrong"],
  methods: {
    nextMovie: function () {
      this.$emit("nexttitle");
    },
  },
});

Vue.component("score-board", {
  template: "#tmplScoreBoard",
  data: function () {
    return {};
  },
  props: ["score"],
  methods: {},
});

new Vue({
  el: "#main",
  data: {
    init: true,
    basicUrl: "https://api.themoviedb.org/3/movie/",
    title: null,
    description: "loading...",
    imgBaseUrl: "https://image.tmdb.org/t/p/",
    imgWidth: "w500",
    imgPath: null,
    poster: null,
    started: false,
    solution: false,
    right: false,
    wrong: false,
    lives: 3,
    score: 0,
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
    startGame: function () {
      this.getMovie();
      this.init = false;
      this.started = true;
    },

    getMovie: function () {
      console.log("getting the movie");
      self = this;
      this.solution = false;
      axios.get("/getMovie").then((result) => {
        console.log("success?", result.data.success);

        if (result.data.success === false || result.data.overview == "") {
          this.getMovie();
        } else {
          console.log("das klickresultat", result);
          self.title = result.data.title;
          self.description = result.data.overview;
          self.imgPath = result.data.poster_path;
          self.poster = self.imgBaseUrl + self.imgWidth + result.data.poster_path;
          self.message = "Leite mal weiter du hund";
          self.started = true;

          console.log("the poster man", self.poster);
          console.log("the self base imgURL man", self.imgBaseUrl);
        }
      });
    },
    showSolution: function () {
      this.started = null;
      this.solution = true;
      this.right = true;
      this.wrong = false;
      this.score += 100;
    },

    minusPoints: function () {
      this.started = null;
      this.solution = true;

      this.wrong = true;
      this.score -= 50;
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
