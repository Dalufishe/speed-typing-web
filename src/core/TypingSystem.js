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
  head_article = []; // :{char: string, correct: boolean, correct_char: string}[]
  tail_article = []; // :{char: string}[]

  spanning; // sec
  time_remaining; // sec
  wpm; // w/m
  accurarcy; // %

  legal_key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 ";
  user_input = []; // :string[]
  current_input; // :string

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
    this.head_article = [];
    this.tail_article = [...this.full_article];

    this.spanning = spanning;
  }

  /**@method */

  //$ 主要方法

  // 開始測驗
  start_race(handleKeyDownWithLegalKey = () => {}) {
    this.get_user_input(true, handleKeyDownWithLegalKey);
    setTimeout(() => {
      this.end_race();
    }, this.spanning * 1000);
  }

  // 結束測驗
  end_race() {
    this.get_user_input(false);
  }

  // 內部方法，用於記憶
  #_handleKeyDownWithLegalKey;
  #_handleKeyDown;

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
        this.user_input.push(key);
        this.current_input = key;
        this.control_article_head_tail(0);
      }

      if (this.legal_key.includes(key)) {
        // 輸入合法字
        this.user_input.push(key);
        this.current_input = key;
        this.control_article_head_tail();

        // callback : handleKeyDownWithLegalKey
        handleKeyDownWithLegalKey(this);
      } else {
        // 輸入非法字
      }
    };
  }

  // 控制頭(已鍵入) 尾(未鍵入) 交互
  control_article_head_tail(type = 1) {
    const head = this.head_article;
    const tail = this.tail_article;
    // 鍵入字 add
    if (type === 1) {
      head.push({});
      const last_head = head[head.length - 1];
      const first_tail = tail[0];
      // 打對字，將打過的字擠到右側，並標示為正確
      if (this.is_current_input_correct()) {
        last_head.char = this.current_input;
        last_head.correct = true;
        last_head.correct_char = first_tail.char;
        tail.shift();
      }
      // 打錯字，將打過的字擠到右側，並標示為錯誤
      else {
        last_head.char = this.current_input;
        last_head.correct = false;
        last_head.correct_char = first_tail.char;
        tail.shift();
      }
    }
    // 刪除字 remove
    if (type === 0) {
      const last_head = head?.[head.length - 1] || null;
      // 若有文字可刪除
      if (last_head) {
        tail.unshift({
          char: last_head.correct_char,
        });
        head.pop();
      }
    }
  }

  //$ 工具方法

  // 判斷輸入是否正確
  is_current_input_correct() {
    if (this.current_input === this.tail_article[0].char) {
      return true;
    } else {
      return false;
    }
  }
}
