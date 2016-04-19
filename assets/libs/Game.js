var Game = {
    _win : null,
    _running :null,
    _cAnimation : null,
    _uAnimation : null,
    _btn1 : null,
    _btn2 : null,
    _btn3 : null,
    _btnStart: null,
    _computerResult : null,
    _userResult : null,
    _resultLabel : null,
    _level : 'easy', //1 0.3 简单， 2 0.5 一般, 3 0.7 困难
    
    init : function(win){
        this._win = win;
        this._running = false;
        this._cAnimation = win.find("c-animation");
        this._uAnimation = win.find("u-animation");
        this._btn1 = win.find("s-btn1");
        this._btn2 = win.find("s-btn2");
        this._btn3 = win.find("s-btn3");
        this._btnStart = win.find("s-btn-start");
        this._resultLabel = win.find("result-label");
    },
    setLevel : function(level){
        this._level = level;
    },
    play : function(){
        this._running = true;
        this.playShowBtn();
        this._cAnimation.play();
    },
    compare : function(userResult){
        this._userResult = userResult;
        this.compute();
        this._running = false;
        this.showResult();
    },
    compute : function(){
        console.log("level: " + this._level);
        //计算机赢的概率
        var _l;
        if(Config.level[this._level]){
            _l = (Config.level[this._level])[0];
        }else{
            _l = (Config.level[Config.defaultLevel])[0];
        }
        //平局的概率
        var _m;
        if(Config.level[this._level]){
            _m = (Config.level[this._level])[1];
        }else{
            _m = (Config.level[Config.defaultLevel])[1];
        }
        var random = Math.random();
        console.log("random :" + random);
        //计算机赢
        if(random <= _l){
            this._computerResult = this._userResult + 1;
            if(this._computerResult > Config.type.paper){
                this._computerResult = Config.type.scissors;
            }
        }
        //平局
        else if(random <= _l + _m){
            this._computerResult = this._userResult;
        }else{
            this._computerResult = this._userResult - 1;
            if(this._computerResult < Config.type.scissors){
                this._computerResult = Config.type.paper;
            }
        }
        console.log("_computerResult :" + this._computerResult);
    },
    isPlaying : function(){
        return this._running;
    },
    playShowBtn : function(){
        this._btn1.setVisible(true);
        this._btn2.setVisible(true);
        this._btn3.setVisible(true);
        this._btnStart.setVisible(false);
        this._uAnimation.setVisible(false);
        this._resultLabel.setVisible(false);
    },
    showResult : function(){
        this._btn1.setVisible(false);
        this._btn2.setVisible(false);
        this._btn3.setVisible(false);
        this._btnStart.setVisible(true);
        this._cAnimation.playRange(this._computerResult, this._computerResult);
        this._cAnimation.stop();
        this._uAnimation.setVisible(true);
        this._uAnimation.playRange(this._userResult, this._userResult);
        this._uAnimation.stop();
        // 0 1 2     0<1  1<2  2<0
        var resultMinus = this._userResult - this._computerResult;
        var txt = "";
        if( resultMinus == 1 || resultMinus == -2){
            txt = "You win!";
        }else if(resultMinus == 0){
            txt = "Draw game!";
        }else{
            txt = "You lose!";
        }
        this._resultLabel.setText(txt);
        this._resultLabel.setVisible(true);
    }
}