var mainWindow=document.querySelector('#wnd');
document.addEventListener('keydown',keyOnDown);
document.addEventListener('keyup',keyOnUp);
var el=document.createElement('textarea');
el.className='output';
//el.readOnly=true;
//el.on
el.onkeydown=()=>false;
//el.onblur=()=>el.focus();
//el.id="ta";
//el.className='';
mainWindow.appendChild(el);

var kbd=document.createElement('div');
kbd.className='key-board';
mainWindow.appendChild(kbd);

function makeRow(parentNode, st){
	var elem=document.createElement('div');
	elem.className='key-row';
	elem.id=st;
	//elem.innerText=st;
	parentNode.appendChild(elem);
	return elem;
}

function changeCharset(parentNode, st,ch){
	var elem=parentNode.querySelector('#'+st);
	elem.innerText=ch;
	elem.dt=ch;
}

function makeButton(parentNode, st, ch){
	var elem=document.createElement('div');
	elem.className='key-button';
	elem.addEventListener('mousedown',buttonOnDown);
	//elem.addEventListener('selectstart',()=>false);
	elem.addEventListener('mouseup',buttonOnUp);
	//elem.addEventListener('mouseup',buttonOnUp);
	elem.addEventListener('mouseleave',buttonOnLeave);
	elem.id=st;
	//elem.onfocus=()=>false;
	elem.onselectstart=()=>false;
	elem.innerText=ch;
	elem.dt=ch;
	parentNode.appendChild(elem);
	return elem;
}
function clearSelection() {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else { // старый IE
      document.selection.empty();
	}
	return false;
  }

function keyOnDown(event){
	//console.log(event);
	
	var targ=document.querySelector('#'+event.code);
	if (targ.dt&&targ.dt.length==1) { //el.value+=''+targ.dt; 
	insertString(el,targ.dt);
} else {keyDoDown(event.code)}
	if(targ) {targ.className='key-button key-button-active';}
}
function keyOnUp(event){
	//console.log(event);
	//el.innerText+=event.keyCode;
	var targ=document.querySelector('#'+event.code);
	if (targ) {targ.className='key-button';}
	keyDoUp(event.code);
	
}

function buttonOnDown(event){
	//el.focus();
	event.preventDefault();
	//console.log(event.target);
	//el.innerText+=event.target.dt;
	if (event.target.dt.length==1) { //el.value+=''+event.target.dt; 
	insertString(el,event.target.dt);} else {keyDoDown(event.target.id, true);}
	event.target.className='key-button key-button-active';
	el.focus();
	//return false;
}
function buttonOnUp(event){
	//console.log(event.target);
	//el.focus();
	keyDoUp(event.target.id, true);
	event.target.className='key-button';
}
function buttonOnLeave(event){
	event.target.className='key-button';
	//return false;
}
var rows=[
'Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal Backspace Home',
'Tab KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Backslash PageUp',
'CapsLock KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Enter PageDown',
'ShiftLeft KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash ShiftRight ArrowUp End',
'App ControlLeft OSLeft AltLeft Space AltRight ContextMenu ControlRight ArrowLeft ArrowDown ArrowRight'
];
var chars=[
	'` 1 2 3 4 5 6 7 8 9 0 - = Backspace Home',
	'Tab Q W E R T Y U I O P [ ] \\ PgUp',
	'CapsLock A S D F G H J K L ; \' Enter PgDn',
	'Shift Z X C V B N M , . / Shift Up End',
	'App Ctrl OS Alt Space Alt Menu Ctrl <- Down ->'
];
var chars_en_down='`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./';
var chars_en_up=  '`1234567890-=QWERTYUIOP[]\\ASDFGHJKL;\'ZXCVBNM,./';
var chars_en_sh=  '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';

var chars_ru_down='`1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.';
var chars_ru_up=  '`1234567890-=ЙЦУКЕНГШЩЗХЪ\\ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ.';
var chars_ru_sh=  '~!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,';

var lang = [{
	down: chars_en_down,
	up: chars_en_up,
	sh: chars_en_sh
},
{
	down: chars_ru_down,
	up: chars_ru_up,
	sh: chars_ru_sh
}];


//var chars_ru_down='`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./';
//var chars_en_up=  '`1234567890-=QWERTYUIOP[]\\ASDFGHJKL;\'ZXCVBNM,./';
//var chars_en_sh=  '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';
function change(ch){
	rows.forEach((it, i)=>{
		//var row=makeRow(kbd,'row'+i);
		it.split(' ').forEach((jt,j)=>{
			let chr=chars[i].split(' ')[j];
			if (chr.length==1){
				chr=ch[chars_en_up.indexOf(chr)];
			}
			changeCharset(kbd,jt,chr);
		});
	});	
}
var cps=0;
function insertString(el, ins){
	var res;
	el.focus();
	var st=el.value;
	var ss=el.selectionStart;
	var se=el.selectionEnd;

	res=st.substring(0,ss)+ins+st.substring(se); 
	//el.selectionStart=ss+1; 
	//el.selectionEnd=ss+1;
	el.value=res;
/*	console.log(el.value);
	console.log(el.selectionStart);
	console.log(el.selectionEnd);
	console.log(ss);
	console.log(ss);*/
	el.selectionStart=ss+1; 
	el.selectionEnd=ss+1;
//	console.log(el.selectionStart);
//	console.log(el.selectionEnd);
	//?
	return res;	
}
function backSpaceString(el){
	var res;
	el.focus(); // hack for Chrome
	var st=el.value;
	var ss=el.selectionStart;
	var se=el.selectionEnd;
	if (ss==se){
		res=st.substring(0,ss-1)+st.substring(se); 
		el.value=res;
		el.selectionStart=ss-1; el.selectionEnd=ss-1;
	} else {
		res=st.substring(0,ss)+st.substring(se); 
		el.value=res;
		el.selectionStart=ss; el.selectionEnd=ss;	
	}
	return res;	
}

function moveCursor(el, sh){
	el.focus(); // hack for Chrome

	if (shiftState) {
		if (el.selectionStart+sh>=0){
			el.selectionStart+=sh;
			el.selectionEnd=el.selectionStart;
		}
	} else {
		if (el.selectionStart <= el.selectionEnd){
			if (el.selectionEnd+sh>=0){
				el.selectionEnd+=sh;
			}
		}
	}
//	el.blur();
}

var down='down';
var up='up';
var sh='sh';
var cur=down;
var currentLang=0;
function change_(mode){
	cur=mode;
	if (mode=="down") {change(lang[currentLang].down); return;}
	if (mode=="up") {change(lang[currentLang].up); return;}
	if (mode=="sh") {change(lang[currentLang].sh); return;}
}

var shiftState=true;
function keyDoUp(code, virtual){
	let sls=el.selectionStart;
	switch(code){
		//case 'Backspace': backSpaceString(el); break;//el.value=el.value.substring(0,el.selectionStart-1)+el.value.substring(el.selectionStart); el.selectionStart=sls-1; el.selectionEnd=sls-1; break;
		case 'ShiftLeft': if (virtual) {
			 shiftState==false?change_(down):change_(sh); 
			 shiftState=!shiftState;
		} else{
			shiftState=true; change_(down)}; break;

		case 'CapsLock': cps=(cps+1)%2; cps==0?change_(down):change_(up); break;
		case 'App': currentLang=(currentLang+1)%2; change_(cur); break;
		//case 'Enter': break;
		//case 'Space': insertString(el, ' '); break;
		//case 'Tab': insertString(el,'\t'); break;
		//case 'ArrowLeft': moveCursor(el, -1); break;
	//	case 'ArrowRight': moveCursor(el, 1); break;
		default:;
	}
	el.focus();
}
function keyDoDown(code, virtual){
	switch(code){
		case 'Backspace': backSpaceString(el); break;
		case 'ShiftLeft': if (!virtual) {shiftState=false;  change_(sh);} break;
		case 'Enter': insertString(el, '\n'); break;
		case 'Space': insertString(el, ' '); break;
		case 'Tab': insertString(el,'\t'); break;
		case 'ArrowLeft': moveCursor(el, -1); break;
		case 'ArrowRight': moveCursor(el, 1); break;
		default:;
	}
	el.focus();
}
rows.forEach((it, i)=>{
	var row=makeRow(kbd,'row'+i);
	it.split(' ').forEach((jt,j)=>{
		makeButton(row,jt,chars[i].split(' ')[j]);
	});
});
change(chars_en_down);



