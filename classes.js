class KeyboardApp {
    constructor (parentNode){
        this.shiftState = true;
        this.capsLockState = 0;
        this.currentLang = +getCurrentLang();

        this.mainWindow=document.querySelector('#wnd'); //

        this.el = makeElement (mainWindow, 'textarea', 'output'); //
        this.el.onkeydown = () => false;

        this.keyboard = makeKeyboard(mainWindow); //

        document.addEventListener('keydown',keyOnDown);
        document.addEventListener('keyup',keyOnUp);

        rows.forEach((it, i)=>{
            var row=makeRow(keyboard,'row'+i);
            it.split(' ').forEach((jt,j)=>{
                makeButton(row, jt, chars[i][j]);
            });
        });

        //change(chars_en_down, keyboard);
        change_(cur, keyboard);
    }
}