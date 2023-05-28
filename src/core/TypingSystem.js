export default class TypingSystem {
  /* *** */
  /**
   * @author Dalufishe
   * @description Typing System, the main algorithms of SpeedTyping.com.
   */
  /* *** */

  /**@property */

  article; // :string
  full_article = []; // :{char: string}[]
  full_words_array = [];
  head_article = []; // :{char: string, correct: boolean, correct_char: string}[]
  head_words_array = [];
  tail_article = []; // :{char: string}[]
  tail_words_array = [];

  spanning; // sec
  time_pass = 0; // sec
  time_remaining; // sec

  word_count;
  correct_word_count = 0;

  wpm = 0; // w/m
  accuracy = 0; // %

  legal_key =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-'\" ";
  current_input; // :string

  is_start = false;

  start_time;

  /**@constructor */

  constructor({
    article = "The default article what really happened to Steve Job in 2011",
    spanning = 60,
  }) {
    this.article = article;
    this.full_article = article.split("").map((char) => {
      return {
        char,
      };
    });

    this.full_words_array = this.full_article
      .map(({ char }) => char)
      .join("")
      .split(/ +/gu);

    this.word_count = this.full_words_array.length;

    this.head_article = [];
    this.tail_article = [...this.full_article];
    this.spanning = this.time_remaining = spanning;
  }

  /**@method */

  //$ 主要方法
  // 開始測驗
  start_race(handleKeyDownWithLegalKey = () => {}, endCallback = () => {}) {
    // 開始時間
    this.start_time = Date.now();
    // 狀態為開始
    this.is_start = true;
    // 獲取用戶輸入
    this.get_user_input(true, handleKeyDownWithLegalKey);
    // 倒數計時
    this.countdown_timer(1000, () => {
      // time
      this.set_time_remaining();
      this.set_time_pass();
      // words
      this.set_correct_word_count();
      this.set_word_per_minite();
      this.set_accuracy();
    });
    // 結束計時
    setTimeout(() => {
      this.end_race(endCallback);
    }, this.spanning * 1000);
  }

  // 結束測驗
  end_race(cb = () => {}) {
    // 狀態為結束
    this.is_start = false;
    // 不再獲取數據
    this.get_user_input(false);
    // 結束倒計時
    clearInterval(this.#countdown_timer_interval);
    cb(this);
  }

  // 內部方法，用於記憶
  #_handleKeyDownWithLegalKey;
  #_handleKeyDown;

  //$ 工具方法

  // 設置時間
  set_time(time) {
    this.spanning = this.time_remaining = time;
  }

  // 獲取使用者輸入，並作為開關
  get_user_input(enable = true, handleKeyDownWithLegalKey) {
    if (enable) {
      if (handleKeyDownWithLegalKey)
        this.#_handleKeyDownWithLegalKey = handleKeyDownWithLegalKey;
      // the method which controls this.user_input & this.current_input
      this.#_handleKeyDown = (evt) => {
        handleKeyDown(evt, this.#_handleKeyDownWithLegalKey);
      };
      document.addEventListener("keydown", this.#_handleKeyDown);
    } else {
      document.removeEventListener("keydown", this.#_handleKeyDown);
    }
    // 處理按鍵輸入
    const handleKeyDown = (evt, handleKeyDownWithLegalKey) => {
      const key = evt.key;
      // 處理後退鍵
      if (key === "Backspace") {
        this.current_input = key;
        this.control_article_head_tail(0);
        this.set_words_array();
        handleKeyDownWithLegalKey(this);
      }

      if (this.legal_key.includes(key)) {
        // 輸入合法字

        this.current_input = key;
        this.control_article_head_tail();
        this.set_words_array();
        // callback : handleKeyDownWithLegalKey
        handleKeyDownWithLegalKey(this);
      } else {
        // 輸入非法字
      }
    };
  }

  #tempdel = [];

  // 控制頭(已鍵入) 尾(未鍵入) 交互
  control_article_head_tail(type = 1) {
    const head = this.head_article;
    const tail = this.tail_article;

    // 鍵入字 add
    if (type === 1) {
      head.push({});
      const last_head = head[head.length - 1];
      const first_tail = tail[0];

      last_head.char = this.current_input;
      last_head.correct_char = first_tail.char;

      // 打對字，並標示為正確
      if (this.is_current_input_correct()) {
        last_head.correct = true;
      }
      // 打錯字，並標示為錯誤
      else {
        last_head.correct = false;
      }

      if (last_head.char === " " && head[head.length - 2]?.char != " ") {
        this.#tempdel.push(
          tail.splice(0, tail.findIndex(({ char }) => char === " ") + 1)
        );
      } else {
        tail.shift();
      }
    }
    // 刪除字 remove
    if (type === 0) {
      const last_head = head?.[head.length - 1] || null;
      // 若有文字可刪除
      if (last_head) {
        if (last_head.char === " " && head[head.length - 2]?.char != " ") {
          tail.unshift(...this.#tempdel[this.#tempdel.length - 1]);
          this.#tempdel.pop();
          head.pop();
        } else {
          tail.unshift({
            char: last_head.correct_char,
          });
          head.pop();
        }
      }
    }
  }

  // 判斷輸入是否正確
  is_current_input_correct() {
    const first_tail = this.tail_article[0];
    const last_head = this.head_article[this.head_article.length - 1];
    const second_last_head = this.head_article[this.head_article.length - 2];

    if (this.current_input === first_tail.char) {
      if (
        // 連續空格
        second_last_head?.char == " " &&
        last_head?.char == " "
      ) {
        return false;
      }
      if (
        // 可以沒打完，但不能跳過
        this.head_article
          .map(({ char }) => char)
          .join("")
          .split(/ /gu)
          .filter((char) => char == "").length >
        this.head_article
          .map(({ correct_char }) => correct_char)
          .join("")
          .split(/ /gu)
          .filter((char) => char == "").length
      ) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  #countdown_timer_interval;

  countdown_timer(interval, cb) {
    this.#countdown_timer_interval = setInterval(() => {
      cb();
    }, interval);
  }

  set_time_remaining() {
    this.time_remaining -= 1;
  }

  set_time_pass() {
    this.time_pass += 1;
  }

  set_words_array() {
    const head = this.head_article;
    const tail = this.tail_article;

    this.head_words_array = head
      .map(({ char }) => char)
      .join("")
      .split(/ /gu)
      .filter((char) => char != "");

    this.tail_words_array = tail
      .map(({ char }) => char)
      .join("")
      .split(/ +/gu)
      .filter((char) => char != "");
  }

  // "bug"
  set_correct_word_count() {
    this.correct_word_count = this.head_words_array.filter(
      (word, index) => word === this.full_words_array[index]
    ).length;
  }

  set_word_per_minite() {
    let wpm = this.correct_word_count / (this.time_pass / 60);
    if (wpm === Infinity || NaN) {
      wpm = 0;
    }

    this.wpm = wpm;
  }

  set_accuracy() {
    let accuracy =
      (this.correct_word_count / this.head_words_array.length) * 100;
    accuracy = Number(accuracy.toFixed(1)) || 0;
    this.accuracy = accuracy;
  }
}
