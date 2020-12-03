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
    logAnswer: function () {
      let rightTitle = this.title.toLowerCase();
      let userAnswer = this.userAnswer.toLowerCase();
      if (userAnswer != rightTitle) {
        console.log("The Right Title Cheat ===", rightTitle);
        this.error = "that was wrong";
        this.tryOut--;
        this.$emit("minus");

        if (this.tryOut < 1) {
          this.$emit("lives");
        }
      } else {
        this.tryOut = 3;
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
  props: ["score", "lives"],
  methods: {},
});

Vue.component("retry-component", {
  template: "#tmplRetryBoard",
  data: function () {
    return {
      username: null,
      leaderBoard: null,
      submitHighscore: null,
      error: null,
    };
  },
  props: ["score", "died"],
  methods: {
    uploadHighscore: function () {
      self = this;
      if (!this.username) {
        self.error = "You have to pick a username";
      } else {
        let username = this.username;
        axios.post("/uploadHighscore", { username: this.username, score: this.score }).then((result) => {
          self.leaderBoard = result.data.rows;
          self.submitHighscore = true;
        });
      }
    },
  },
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
    died: false,
    score: 0,
  },
  created: function () {},
  mounted: function () {},

  updated: function () {},
  methods: {
    startGame: function () {
      this.getMovie();
      this.init = false;
      this.started = true;
    },

    getMovie: function () {
      self = this;
      this.solution = false;
      axios.get("/getMovie").then((result) => {
        if (result.data.success === false || result.data.overview == "") {
          this.getMovie();
        } else {
          self.title = result.data.title;
          self.description = result.data.overview;
          self.imgPath = result.data.poster_path;
          self.poster = self.imgBaseUrl + self.imgWidth + result.data.poster_path;
          self.message = "Leite mal weiter du hund";
          self.started = true;
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
      this.score -= 50;
    },
    minusLives: function () {
      self = this;
      if (this.lives <= 1) {
        self.lives -= 1;
        self.died = true;
        self.started = null;
        self.solution = false;
      } else {
        self.started = null;
        self.solution = true;
        self.wrong = true;
        self.lives -= 1;
      }
    },

    getConfig: function () {
      axios.get("/getConfig").then((result) => {
        self.imgBaseUrl = result.data.images.secure_base_url;
        self.imgWidth = result.data.images.poster_sizes[4];
      });
    },
  },
});
