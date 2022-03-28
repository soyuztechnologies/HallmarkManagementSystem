// <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
// <html xmlns="http://www.w3.org/1999/xhtml" >
// <head>
// <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
//
// <script language=javascript type="text/javascript">

var IsValid = false;
var IsCaps = false;
var IsShift = false;

var VirtualKey = {
'113':'ौ','119':'ै','101':'ा','114':'ी','116':'ू','121':'ब','117':'ह','105':'ग','111':'द','112':'ज',
'97':'ो','115':'े','100':'्','102':'ि','103':'ु','104':'प','106':'र','107':'क','108':'त',
'122':'','120':'ं','99':'म','118':'न','98':'व','110':'ल','109':'स',
'81':'औ','87':'ऐ','69':'आ','82':'ई','84':'ऊ','89':'भ','85':'ङ','73':'घ','79':'ध','80':'झ',
'65':'ओ','83':'ए','68':'अ','70':'इ','71':'उ','72':'फ','74':'ऱ','75':'ख','76':'थ',
'90':'','88':'ँ','67':'ण','86':'','66':'','78':'ळ','77':'श',
'96':'`','49':'1','50':'2','51':'3','52':'4','53':'5','54':'6','55':'7','56':'8','57':'9','48':'0','45':'-','61':'ृ','92':'ॉ',
'91':'ड','93':'़',
'59':'च','39':'ट',
'44':',','46':'.','47':'य',
'126':'','33':'ऍ','64':'ॅ','35':'्','36':'र्','37':'ज्ञ','94':'त्र','38':'क्ष','42':'श्र','40':'(','41':')','95':'ः','43':'ॠ','124':'ऑ',
'123':'ढ','125':'ञ',
'58':'छ','34':'ठ',
'60':'ष','62':'।','63':'य़',
'32':' '};

var VirtualKeyCaps = {
'113':'ौ','119':'ै','101':'ा','114':'ी','116':'ू','121':'ब','117':'ह','105':'ग','111':'द','112':'ज',
'97':'ो','115':'े','100':'्','102':'ि','103':'ु','104':'प','106':'र','107':'क','108':'त',
'122':'','120':'ं','99':'म','118':'न','98':'व','110':'ल','109':'स',
'81':'औ','87':'ऐ','69':'आ','82':'ई','84':'ऊ','89':'भ','85':'ङ','73':'घ','79':'ध','80':'झ',
'65':'ओ','83':'ए','68':'अ','70':'इ','71':'उ','72':'फ','74':'ऱ','75':'ख','76':'थ',
'90':'','88':'ँ','67':'ण','86':'','66':'','78':'ळ','77':'श',
'96':'','49':'ऍ','50':'ॅ','51':'्','52':'र्','53':'ज्ञ','54':'त्र','55':'क्ष','56':'श्र','57':'(','48':')','45':'ः','61':'ॠ','92':'ऑ',
'91':'ढ','93':'ञ',
'59':'छ','39':'ठ',
'44':'ष','46':'।','47':'य़',
'126':'','33':'1','64':'2','35':'3','36':'4','37':'5','94':'6','38':'7','42':'8','40':'9','41':'0','95':'-','43':'ृ','124':'ॉ',
'123':'ड','125':'़',
'58':'च','34':'ट',
'60':',','62':'.','63':'य',
'32':' '};

var LeftButton = {
'81':'31','87':'51','69':'71','82':'91','84':'111','89':'131','85':'151','73':'171','79':'191','80':'211',
'65':'37','83':'57','68':'77','70':'97','71':'117','72':'137','74':'157','75':'177','76':'197',
'90':'47','88':'67','67':'87','86':'107','66':'127','78':'147','77':'167',
'96':'0','49':'20','50':'40','51':'60','52':'80','53':'100','54':'120','55':'140','56':'160','57':'180','48':'200','189':'220','187':'240','220':'260',
'192':'0','33':'20','64':'40','35':'60','36':'80','37':'100','94':'120','38':'140','42':'160','40':'180','41':'200','95':'220','43':'240','124':'260',
'219':'231','221':'251',
'186':'217','222':'237',
'188':'187','190':'207','191':'227',
'32':' '};

var TopButton = {
'81':'20','87':'20','69':'20','82':'20','84':'20','89':'20','85':'20','73':'20','79':'20','80':'20',
'65':'40','83':'40','68':'40','70':'40','71':'40','72':'40','74':'40','75':'40','76':'40',
'90':'60','88':'60','67':'60','86':'60','66':'60','78':'60','77':'60',
'96':'0','49':'0','50':'0','51':'0','52':'0','53':'0','54':'0','55':'0','56':'0','57':'0','48':'0','189':'0','187':'0','220':'0',
'192':'0','33':'0','64':'0','35':'0','36':'0','37':'0','94':'0','38':'0','42':'0','40':'0','41':'0','95':'0','43':'0','124':'0',
'219':'20','221':'20',
'186':'40','222':'40',
'188':'60','190':'60','191':'60',
'32':' '};

var ValidButton = {
'81':'1','87':'1','69':'1','82':'1','84':'1','89':'1','85':'1','73':'1','79':'1','80':'1',
'65':'1','83':'1','68':'1','70':'1','71':'1','72':'1','74':'1','75':'1','76':'1',
'90':'1','88':'1','67':'1','86':'1','66':'1','78':'1','77':'1',
'96':'0','49':'0','50':'0','51':'0','52':'0','53':'0','54':'0','55':'0','56':'0','57':'0','48':'0','189':'0','187':'0','220':'0',
'192':'0','33':'0','64':'0','35':'0','36':'0','37':'0','94':'0','38':'0','42':'0','40':'0','41':'0','95':'0','43':'0','124':'0',
'219':'1','221':'1',
'186':'1','222':'1',
'188':'1','190':'1','191':'1',
'32':' ',
'8':'1','9':'1','13':'1','16':'1','20':'1','46':'1' };

function checkCode(evt)
{
	var kcode=0;

	if (document.all)
	{
		var evt=window.event;
		kcode=evt.keyCode;
	}
	else kcode=evt.which;

	if(ValidButton[kcode]){ButtonDown(kcode); IsValid=true;}else{IsValid=false;};
}

function reset()
{
	if(!IsCaps && !IsShift)
	{
		document.getElementById('normal').style.visibility="visible";
		document.getElementById('shift').style.visibility="hidden";
		document.getElementById('caps').style.visibility="hidden";
	}
	else if(IsCaps && !IsShift)
	{
		document.getElementById('normal').style.visibility="hidden";
		document.getElementById('shift').style.visibility="hidden";
		document.getElementById('caps').style.visibility="visible";

		document.getElementById('capsS').style.visibility="visible";
	}
	else if(!IsCaps && IsShift)
	{
		document.getElementById('normal').style.visibility="hidden";
		document.getElementById('shift').style.visibility="visible";
		document.getElementById('caps').style.visibility="hidden";
	}
	else if(IsCaps && IsShift)
	{
		document.getElementById('normal').style.visibility="visible";
		document.getElementById('shift').style.visibility="hidden";
		document.getElementById('caps').style.visibility="hidden";

		document.getElementById('capsS').style.visibility="visible";
	}
}

function restoreCode(evt)
{
	var kcode=0;

	if (document.all)
	{
		var evt=window.event;
		kcode=evt.keyCode;
	}
	else kcode=evt.which;

	ButtonUp(kcode);
}

function writeKeyPressed(evt)
{
	var kcode=0;

	if (document.all)
	{
		var evt=window.event;
		kcode=evt.keyCode;
	}
	else kcode=evt.which;

	InsertChar('k',kcode);

	return false;
};

function InsertChar(mode,c)
{
    var TempStr ='';

	if ( ( c >= 65 && c <= 90 ) && !IsShift )
	{
		IsCaps = true;
	}
	else if ( ( c >= 97 && c <= 122 ) && IsShift )
	{
		IsCaps = true;
	}
	else if ( ( c >= 65 && c <= 90 ) || ( c >= 97 && c <= 122 ) )
	{
		IsCaps = false;
	}
	reset();

	if(!IsCaps && !IsShift)
	{
		TempStr=VirtualKey[c];
	}
	else if(IsCaps && !IsShift)
	{
		TempStr=VirtualKeyCaps[c];
	}
	else if(!IsCaps && IsShift)
	{
		TempStr=VirtualKey[c];
	}
	else if(IsCaps && IsShift)
	{
	    if(mode=='k')
	    {
		    TempStr=VirtualKeyCaps[c];
		}
		else if(mode=='m')
		{
		    TempStr=VirtualKey[c];
		}
		else
		{
		    document.getElementById('txtHindi').value = c+' '+IsCaps+' '+IsShift+' '+mode;
		}
	}

	if(TempStr != undefined)
	document.getElementById('txtHindi').value = document.getElementById('txtHindi').value+TempStr;
	document.getElementById('txtHindi').focus();

//	self.parent.updateText(document.getElementById('txtHindi').value);
}

function ButtonDown(c)
{
	if(c==8)
	{
		document.getElementById('bSpace').style.visibility="visible";
	}
	else if(c==9)
	{
		document.getElementById('tab').style.visibility="visible";
	}
	else if(c==13)
	{
		document.getElementById('enter').style.visibility="visible";
	}
	else if(c==16)
	{
		IsShift=true;
		document.getElementById('ShiftL').style.visibility="visible";
		document.getElementById('ShiftR').style.visibility="visible";
	}
	else if(c==20)
	{
		IsCaps = !IsCaps;
		document.getElementById('capsS').style.visibility="visible";
	}
	else if(c==32)
	{
		document.getElementById('Space').style.visibility="visible";
	}
	else if(c==46)
	{
		document.getElementById('delete').style.visibility="visible";
	}
	else
	{
		document.getElementById('Butt').style.left=LeftButton[c]+'px';
		document.getElementById('Butt').style.top=TopButton[c]+'px';
		document.getElementById('Butt').style.visibility="visible";
	}
	reset();
}

function ButtonUp(c)
{
	if(c==16)
	{
		IsShift=false;
	}

	reset();

	document.getElementById('Butt').style.visibility="hidden";
	document.getElementById('Space').style.visibility="hidden";
	document.getElementById('bSpace').style.visibility="hidden";
	document.getElementById('delete').style.visibility="hidden";
	document.getElementById('enter').style.visibility="hidden";
	document.getElementById('tab').style.visibility="hidden";
	if(!IsShift)
	{
		document.getElementById('ShiftL').style.visibility="hidden";
		document.getElementById('ShiftR').style.visibility="hidden";
	}
	if(!IsCaps)
	{
		document.getElementById('capsS').style.visibility="hidden";
	}

	document.getElementById('txtHindi').focus();
}

function Shift()
{
	if(document.getElementById('normal').style.visibility=="visible")
	{
		document.getElementById('normal').style.visibility="hidden";
		document.getElementById('shift').style.visibility="visible";
	}
	else
	{
		document.getElementById('normal').style.visibility="visible";
		document.getElementById('shift').style.visibility="hidden";
	}
}

// </script>
// </head>
//
// <body>
//
// <span id="Butt" style="z-index:1;position:absolute; top:0px; left:0px; visibility:hidden"><img id="shade" src="images/btn.gif" /></span>
// <span id="Space" style="z-index:1;position:absolute; top:81px; left:82px; visibility:hidden"><img src="images/space.gif" /></span>
// <span id="bSpace" style="z-index:1;position:absolute; top:0px; left:280px; visibility:hidden"><img src="images/bs.gif" /></span>
// <span id="delete" style="z-index:1;position:absolute; top:20px; left:270px; visibility:hidden"><img src="images/del.gif" /></span>
// <span id="enter" style="z-index:1; position:absolute; top:40px; left:256px; visibility:hidden; width: 40px;"><img src="images/enter.gif" /></span>
// <span id="tab" style="z-index:1;position:absolute; top:20px; left:0px; visibility:hidden"><img src="images/tab.gif" /></span>
// <span id="capsS" style="z-index:1; position:absolute; top:40px; left:0px; visibility:hidden; width: 40px;"><img src="images/caps.gif" /></span>
// <span id="ShiftL" style="z-index:1; position:absolute; top:60px; left:0px; visibility:hidden; width: 40px;"><img src="images/lshift.gif" /></span>
// <span id="ShiftR" style="z-index:1; position:absolute; top:61px; left:247px; visibility:hidden; width: 40px;"><img src="images/rshift.gif" /></span>
//
// <div style="z-index:0;position:absolute; top:0px; left:0px;">
// <img src="images/Base_kbd.gif" border="0" usemap="#Map" />
// <map name="Map" id="Map">
// <area shape="rect" coords="280,0,300,19" onclick="alert('Back Space - Not Implemented!');" />
// <area shape="rect" coords="271,20,300,39" onclick="alert('Delete - Not Implemented!');" />
// <area shape="rect" coords="257,40,300,59" onclick="alert('Enter - Not Implemented!');" />
// <area shape="rect" coords="-6,61,46,80" onmousedown="IsShift=!IsShift;reset();"/>
// <area shape="rect" coords="247,61,300,79" onmousedown="IsShift=!IsShift;reset();"/>
//
// <area shape="rect" coords="81,82,196,99" onmousedown="InsertChar('m',32)" onmouseup="ButtonUp(32)"/>
// </map>
// </div>
// <div id="normal" style="z-index:1;position:absolute; top:0px; left:0px; visibility:visible">
// <img src="images/Hindi_normal.gif" border="0" usemap="#Map2" />
// <map name="Map2" id="Map2">
// <area shape="rect" coords="0,0,20,19" onmousedown="ButtonDown(96);" onmouseup="ButtonUp(96)"/>
// <area shape="rect" coords="20,0,40,19" onmousedown="ButtonDown(49);InsertChar('m',49)" onmouseup="ButtonUp(49)"/>
// <area shape="rect" coords="40,0,60,19" onmousedown="ButtonDown(50);InsertChar('m',50)" onmouseup="ButtonUp(50)"/>
// <area shape="rect" coords="60,0,80,19" onmousedown="ButtonDown(51);InsertChar('m',51)" onmouseup="ButtonUp(51)"/>
// <area shape="rect" coords="80,0,100,19" onmousedown="ButtonDown(52);InsertChar('m',52)" onmouseup="ButtonUp(52)"/>
// <area shape="rect" coords="100,0,120,19" onmousedown="ButtonDown(53);InsertChar('m',53)" onmouseup="ButtonUp(53)"/>
// <area shape="rect" coords="120,0,140,19" onmousedown="ButtonDown(54);InsertChar('m',54)" onmouseup="ButtonUp(54)"/>
// <area shape="rect" coords="140,0,160,19" onmousedown="ButtonDown(55);InsertChar('m',55)" onmouseup="ButtonUp(55)"/>
// <area shape="rect" coords="160,0,180,19" onmousedown="ButtonDown(56);InsertChar('m',56)" onmouseup="ButtonUp(56)"/>
// <area shape="rect" coords="180,0,200,19" onmousedown="ButtonDown(57);InsertChar('m',57)" onmouseup="ButtonUp(57)"/>
// <area shape="rect" coords="200,0,220,19" onmousedown="ButtonDown(48);InsertChar('m',48)" onmouseup="ButtonUp(48)"/>
// <area shape="rect" coords="220,0,240,19" onmousedown="ButtonDown(189);InsertChar('m',45)" onmouseup="ButtonUp(189)"/>
// <area shape="rect" coords="240,0,260,19" onmousedown="ButtonDown(187);InsertChar('m',61)" onmouseup="ButtonUp(187)"/>
// <area shape="rect" coords="260,0,280,19" onmousedown="ButtonDown(220);InsertChar('m',92)" onmouseup="ButtonUp(220)"/>
//
// <area shape="rect" coords="31,20,51,39" onmousedown="ButtonDown(81);InsertChar('m',113)" onmouseup="ButtonUp(81)"/>
// <area shape="rect" coords="51,20,71,39" onmousedown="ButtonDown(87);InsertChar('m',119)" onmouseup="ButtonUp(87)"/>
// <area shape="rect" coords="71,20,91,39" onmousedown="ButtonDown(69);InsertChar('m',101)" onmouseup="ButtonUp(69)"/>
// <area shape="rect" coords="91,20,111,39" onmousedown="ButtonDown(82);InsertChar('m',114)" onmouseup="ButtonUp(82)"/>
// <area shape="rect" coords="111,20,131,39" onmousedown="ButtonDown(84);InsertChar('m',116)" onmouseup="ButtonUp(84)"/>
// <area shape="rect" coords="131,20,151,39" onmousedown="ButtonDown(89);InsertChar('m',121)" onmouseup="ButtonUp(89)"/>
// <area shape="rect" coords="151,20,171,39" onmousedown="ButtonDown(85);InsertChar('m',117)" onmouseup="ButtonUp(85)"/>
// <area shape="rect" coords="171,20,191,39" onmousedown="ButtonDown(73);InsertChar('m',105)" onmouseup="ButtonUp(73)"/>
// <area shape="rect" coords="191,20,211,39" onmousedown="ButtonDown(79);InsertChar('m',111)" onmouseup="ButtonUp(79)"/>
// <area shape="rect" coords="211,20,231,39" onmousedown="ButtonDown(80);InsertChar('m',112)" onmouseup="ButtonUp(80)"/>
// <area shape="rect" coords="231,20,251,39" onmousedown="ButtonDown(219);InsertChar('m',91)" onmouseup="ButtonUp(219)"/>
// <area shape="rect" coords="251,20,271,39" onmousedown="ButtonDown(221);InsertChar('m',93)" onmouseup="ButtonUp(221)"/>
//
// <area shape="rect" coords="0,20,30,41" onclick="alert('Tab - Not Implemented!');" />
// <area shape="rect" coords="271,20,281,39" onclick="alert('Delete - Not Implemented!');" />
//
// <area shape="rect" coords="37,40,57,59" onmousedown="ButtonDown(65);InsertChar('m',97)" onmouseup="ButtonUp(65)"/>
// <area shape="rect" coords="57,40,77,59" onmousedown="ButtonDown(83);InsertChar('m',115)" onmouseup="ButtonUp(83)"/>
// <area shape="rect" coords="77,40,97,59" onmousedown="ButtonDown(68);InsertChar('m',100)" onmouseup="ButtonUp(68)"/>
// <area shape="rect" coords="97,40,117,59" onmousedown="ButtonDown(70);InsertChar('m',102)" onmouseup="ButtonUp(70)"/>
// <area shape="rect" coords="117,40,137,59" onmousedown="ButtonDown(71);InsertChar('m',103)" onmouseup="ButtonUp(71)"/>
// <area shape="rect" coords="137,40,157,59" onmousedown="ButtonDown(72);InsertChar('m',104)" onmouseup="ButtonUp(72)"/>
// <area shape="rect" coords="157,40,177,59" onmousedown="ButtonDown(74);InsertChar('m',106)" onmouseup="ButtonUp(74)"/>
// <area shape="rect" coords="177,40,197,59" onmousedown="ButtonDown(75);InsertChar('m',107)" onmouseup="ButtonUp(75)"/>
// <area shape="rect" coords="197,40,217,59" onmousedown="ButtonDown(76);InsertChar('m',108)" onmouseup="ButtonUp(76)"/>
// <area shape="rect" coords="217,40,237,59" onmousedown="ButtonDown(186);InsertChar('m',59)" onmouseup="ButtonUp(186)"/>
// <area shape="rect" coords="237,40,257,59" onmousedown="ButtonDown(222);InsertChar('m',39)" onmouseup="ButtonUp(222)"/>
//
// <area shape="rect" coords="0,40,38,61" onmousedown="IsCaps=!IsCaps;reset();"/>
// <area shape="rect" coords="257,40,285,59" onclick="alert('Enter - Not Implemented!');" />
//
// <area shape="rect" coords="47,61,67,80" onmousedown="ButtonDown(90);" onmouseup="ButtonUp(90)"/>
// <area shape="rect" coords="67,61,87,80" onmousedown="ButtonDown(88);InsertChar('m',120)" onmouseup="ButtonUp(88)"/>
// <area shape="rect" coords="87,61,107,80" onmousedown="ButtonDown(67);InsertChar('m',99)" onmouseup="ButtonUp(67)"/>
// <area shape="rect" coords="107,61,127,80" onmousedown="ButtonDown(86);InsertChar('m',118)" onmouseup="ButtonUp(86)"/>
// <area shape="rect" coords="127,61,147,80" onmousedown="ButtonDown(66);InsertChar('m',98)" onmouseup="ButtonUp(66)"/>
// <area shape="rect" coords="147,61,167,80" onmousedown="ButtonDown(78);InsertChar('m',110)" onmouseup="ButtonUp(78)"/>
// <area shape="rect" coords="167,61,187,80" onmousedown="ButtonDown(77);InsertChar('m',109)" onmouseup="ButtonUp(77)"/>
// <area shape="rect" coords="187,61,207,80" onmousedown="ButtonDown(188);InsertChar('m',44)" onmouseup="ButtonUp(188)"/>
// <area shape="rect" coords="207,61,227,80" onmousedown="ButtonDown(190);InsertChar('m',46)" onmouseup="ButtonUp(190)"/>
// <area shape="rect" coords="227,61,247,80" onmousedown="ButtonDown(191);InsertChar('m',47)" onmouseup="ButtonUp(191)"/>
//
// <area shape="rect" coords="-6,61,46,80" onmousedown="IsShift=!IsShift;reset();"/>
// <area shape="rect" coords="247,59,281,83" onmousedown="IsShift=!IsShift;reset();"/>
//
// </map>
// </div>
//
// <div id="shift" style="z-index:1;position:absolute; top:0px; left:0px; visibility:hidden">
// <img src="images/Hindi_shift.gif" border="0" usemap="#Map3" />
// <map name="Map3" id="Map3">
//
// <area shape="rect" coords="0,0,20,19" onmousedown="ButtonDown(126);" onmouseup="ButtonUp(126)"/>
// <area shape="rect" coords="20,0,40,19" onmousedown="ButtonDown(33);InsertChar('m',33)" onmouseup="ButtonUp(33)"/>
// <area shape="rect" coords="40,0,60,19" onmousedown="ButtonDown(64);InsertChar('m',64)" onmouseup="ButtonUp(64)"/>
// <area shape="rect" coords="60,0,80,19" onmousedown="ButtonDown(35);InsertChar('m',35)" onmouseup="ButtonUp(35)"/>
// <area shape="rect" coords="80,0,100,19" onmousedown="ButtonDown(36);InsertChar('m',36)" onmouseup="ButtonUp(36)"/>
// <area shape="rect" coords="100,0,120,19" onmousedown="ButtonDown(37);InsertChar('m',37)" onmouseup="ButtonUp(37)"/>
// <area shape="rect" coords="120,0,140,19" onmousedown="ButtonDown(94);InsertChar('m',94)" onmouseup="ButtonUp(94)"/>
// <area shape="rect" coords="140,0,160,19" onmousedown="ButtonDown(38);InsertChar('m',38)" onmouseup="ButtonUp(38)"/>
// <area shape="rect" coords="160,0,180,19" onmousedown="ButtonDown(42);InsertChar('m',42)" onmouseup="ButtonUp(42)"/>
// <area shape="rect" coords="180,0,200,19" onmousedown="ButtonDown(40);InsertChar('m',40)" onmouseup="ButtonUp(40)"/>
// <area shape="rect" coords="200,0,220,19" onmousedown="ButtonDown(41);InsertChar('m',41)" onmouseup="ButtonUp(41)"/>
// <area shape="rect" coords="220,0,240,19" onmousedown="ButtonDown(95);InsertChar('m',95)" onmouseup="ButtonUp(95)"/>
// <area shape="rect" coords="240,0,260,19" onmousedown="ButtonDown(43);InsertChar('m',43)" onmouseup="ButtonUp(43)"/>
// <area shape="rect" coords="260,0,280,19" onmousedown="ButtonDown(124);InsertChar('m',124)" onmouseup="ButtonUp(124)"/>
//
// <area shape="rect" coords="31,20,51,39" onmousedown="ButtonDown(81);InsertChar('m',81)" onmouseup="ButtonUp(81)"/>
// <area shape="rect" coords="51,20,71,39" onmousedown="ButtonDown(87);InsertChar('m',87)" onmouseup="ButtonUp(87)"/>
// <area shape="rect" coords="71,20,91,39" onmousedown="ButtonDown(69);InsertChar('m',69)" onmouseup="ButtonUp(69)"/>
// <area shape="rect" coords="91,20,111,39" onmousedown="ButtonDown(82);InsertChar('m',82)" onmouseup="ButtonUp(82)"/>
// <area shape="rect" coords="111,20,131,39" onmousedown="ButtonDown(84);InsertChar('m',84)" onmouseup="ButtonUp(84)"/>
// <area shape="rect" coords="131,20,151,39" onmousedown="ButtonDown(89);InsertChar('m',89)" onmouseup="ButtonUp(89)"/>
// <area shape="rect" coords="151,20,171,39" onmousedown="ButtonDown(85);InsertChar('m',85)" onmouseup="ButtonUp(85)"/>
// <area shape="rect" coords="171,20,191,39" onmousedown="ButtonDown(73);InsertChar('m',73)" onmouseup="ButtonUp(73)"/>
// <area shape="rect" coords="191,20,211,39" onmousedown="ButtonDown(79);InsertChar('m',79)" onmouseup="ButtonUp(79)"/>
// <area shape="rect" coords="211,20,231,39" onmousedown="ButtonDown(80);InsertChar('m',80)" onmouseup="ButtonUp(80)"/>
// <area shape="rect" coords="231,20,251,39" onmousedown="ButtonDown(219);InsertChar('m',123)" onmouseup="ButtonUp(219)"/>
// <area shape="rect" coords="251,20,271,39" onmousedown="ButtonDown(221);InsertChar('m',125)" onmouseup="ButtonUp(221)"/>
//
// <area shape="rect" coords="0,20,30,41" onclick="alert('Tab - Not Implemented!');" />
// <area shape="rect" coords="271,20,281,39" onclick="alert('Delete - Not Implemented!');" />
//
// <area shape="rect" coords="37,40,57,59" onmousedown="ButtonDown(65);InsertChar('m',65)" onmouseup="ButtonUp(65)"/>
// <area shape="rect" coords="57,40,77,59" onmousedown="ButtonDown(83);InsertChar('m',83)" onmouseup="ButtonUp(83)"/>
// <area shape="rect" coords="77,40,97,59" onmousedown="ButtonDown(68);InsertChar('m',68)" onmouseup="ButtonUp(68)"/>
// <area shape="rect" coords="97,40,117,59" onmousedown="ButtonDown(70);InsertChar('m',70)" onmouseup="ButtonUp(70)"/>
// <area shape="rect" coords="117,40,137,59" onmousedown="ButtonDown(71);InsertChar('m',71)" onmouseup="ButtonUp(71)"/>
// <area shape="rect" coords="137,40,157,59" onmousedown="ButtonDown(72);InsertChar('m',72)" onmouseup="ButtonUp(72)"/>
// <area shape="rect" coords="157,40,177,59" onmousedown="ButtonDown(74);InsertChar('m',74)" onmouseup="ButtonUp(74)"/>
// <area shape="rect" coords="177,40,197,59" onmousedown="ButtonDown(75);InsertChar('m',75)" onmouseup="ButtonUp(75)"/>
// <area shape="rect" coords="197,40,217,59" onmousedown="ButtonDown(76);InsertChar('m',76)" onmouseup="ButtonUp(76)"/>
// <area shape="rect" coords="217,40,237,59" onmousedown="ButtonDown(186);InsertChar('m',58)" onmouseup="ButtonUp(186)"/>
// <area shape="rect" coords="237,40,257,59" onmousedown="ButtonDown(222);InsertChar('m',34)" onmouseup="ButtonUp(222)"/>
//
// <area shape="rect" coords="0,40,38,61" onmousedown="IsCaps=!IsCaps;reset();"/>
// <area shape="rect" coords="257,40,285,59" onclick="alert('Enter - Not Implemented!');" />
//
// <area shape="rect" coords="47,61,67,80" onmousedown="ButtonDown(90);" onmouseup="ButtonUp(90)"/>
// <area shape="rect" coords="67,61,87,80" onmousedown="ButtonDown(88);InsertChar('m',88)" onmouseup="ButtonUp(88)"/>
// <area shape="rect" coords="87,61,107,80" onmousedown="ButtonDown(67);InsertChar('m',67)" onmouseup="ButtonUp(67)"/>
// <area shape="rect" coords="107,61,127,80" onmousedown="ButtonDown(86);InsertChar('m',86)" onmouseup="ButtonUp(86)"/>
// <area shape="rect" coords="127,61,147,80" onmousedown="ButtonDown(66);InsertChar('m',66)" onmouseup="ButtonUp(66)"/>
// <area shape="rect" coords="147,61,167,80" onmousedown="ButtonDown(78);InsertChar('m',78)" onmouseup="ButtonUp(78)"/>
// <area shape="rect" coords="167,61,187,80" onmousedown="ButtonDown(77);InsertChar('m',77)" onmouseup="ButtonUp(77)"/>
// <area shape="rect" coords="187,61,207,80" onmousedown="ButtonDown(188);InsertChar('m',60)" onmouseup="ButtonUp(188)"/>
// <area shape="rect" coords="207,61,227,80" onmousedown="ButtonDown(190);InsertChar('m',62)" onmouseup="ButtonUp(190)"/>
// <area shape="rect" coords="227,61,247,80" onmousedown="ButtonDown(191);InsertChar('m',63)" onmouseup="ButtonUp(191)"/>
//
// <area shape="rect" coords="-6,61,46,80" onmousedown="IsShift=!IsShift;reset();"/>
// <area shape="rect" coords="247,59,281,83" onmousedown="IsShift=!IsShift;reset();"/>
//
// </map>
// </div>
//
// <div id="caps" style="z-index:1;position:absolute; top:0px; left:0px; visibility:hidden">
// <img src="images/Hindi_shift.gif" border="0" usemap="#Map4" />
// <map name="Map4" id="Map4">
// <area shape="rect" coords="0,0,20,19" onmousedown="ButtonDown(96);" onmouseup="ButtonUp(96)"/>
// <area shape="rect" coords="20,0,40,19" onmousedown="ButtonDown(33);InsertChar('m',49)" onmouseup="ButtonUp(33)"/>
// <area shape="rect" coords="40,0,60,19" onmousedown="ButtonDown(64);InsertChar('m',50)" onmouseup="ButtonUp(64)"/>
// <area shape="rect" coords="60,0,80,19" onmousedown="ButtonDown(35);InsertChar('m',51)" onmouseup="ButtonUp(35)"/>
// <area shape="rect" coords="80,0,100,19" onmousedown="ButtonDown(36);InsertChar('m',52)" onmouseup="ButtonUp(36)"/>
// <area shape="rect" coords="100,0,120,19" onmousedown="ButtonDown(37);InsertChar('m',53)" onmouseup="ButtonUp(37)"/>
// <area shape="rect" coords="120,0,140,19" onmousedown="ButtonDown(94);InsertChar('m',54)" onmouseup="ButtonUp(94)"/>
// <area shape="rect" coords="140,0,160,19" onmousedown="ButtonDown(38);InsertChar('m',55)" onmouseup="ButtonUp(38)"/>
// <area shape="rect" coords="160,0,180,19" onmousedown="ButtonDown(42);InsertChar('m',56)" onmouseup="ButtonUp(42)"/>
// <area shape="rect" coords="180,0,200,19" onmousedown="ButtonDown(40);InsertChar('m',57)" onmouseup="ButtonUp(40)"/>
// <area shape="rect" coords="200,0,220,19" onmousedown="ButtonDown(41);InsertChar('m',48)" onmouseup="ButtonUp(41)"/>
// <area shape="rect" coords="220,0,240,19" onmousedown="ButtonDown(95);InsertChar('m',45)" onmouseup="ButtonUp(95)"/>
// <area shape="rect" coords="240,0,260,19" onmousedown="ButtonDown(43);InsertChar('m',61)" onmouseup="ButtonUp(43)"/>
// <area shape="rect" coords="260,0,280,19" onmousedown="ButtonDown(124);InsertChar('m',92)" onmouseup="ButtonUp(124)"/>
//
// <area shape="rect" coords="31,20,51,39" onmousedown="ButtonDown(81);InsertChar('m',81)" onmouseup="ButtonUp(81)"/>
// <area shape="rect" coords="51,20,71,39" onmousedown="ButtonDown(87);InsertChar('m',87)" onmouseup="ButtonUp(87)"/>
// <area shape="rect" coords="71,20,91,39" onmousedown="ButtonDown(69);InsertChar('m',69)" onmouseup="ButtonUp(69)"/>
// <area shape="rect" coords="91,20,111,39" onmousedown="ButtonDown(82);InsertChar('m',82)" onmouseup="ButtonUp(82)"/>
// <area shape="rect" coords="111,20,131,39" onmousedown="ButtonDown(84);InsertChar('m',84)" onmouseup="ButtonUp(84)"/>
// <area shape="rect" coords="131,20,151,39" onmousedown="ButtonDown(89);InsertChar('m',89)" onmouseup="ButtonUp(89)"/>
// <area shape="rect" coords="151,20,171,39" onmousedown="ButtonDown(85);InsertChar('m',85)" onmouseup="ButtonUp(85)"/>
// <area shape="rect" coords="171,20,191,39" onmousedown="ButtonDown(73);InsertChar('m',73)" onmouseup="ButtonUp(73)"/>
// <area shape="rect" coords="191,20,211,39" onmousedown="ButtonDown(79);InsertChar('m',79)" onmouseup="ButtonUp(79)"/>
// <area shape="rect" coords="211,20,231,39" onmousedown="ButtonDown(80);InsertChar('m',80)" onmouseup="ButtonUp(80)"/>
// <area shape="rect" coords="231,20,251,39" onmousedown="ButtonDown(219);InsertChar('m',91)" onmouseup="ButtonUp(219)"/>
// <area shape="rect" coords="251,20,271,39" onmousedown="ButtonDown(221);InsertChar('m',93)" onmouseup="ButtonUp(221)"/>
//
// <area shape="rect" coords="0,20,30,41" onclick="alert('Tab - Not Implemented!');" />
// <area shape="rect" coords="271,20,281,39" onclick="alert('Delete - Not Implemented!');" />
//
// <area shape="rect" coords="37,40,57,59" onmousedown="ButtonDown(65);InsertChar('m',65)" onmouseup="ButtonUp(65)"/>
// <area shape="rect" coords="57,40,77,59" onmousedown="ButtonDown(83);InsertChar('m',83)" onmouseup="ButtonUp(83)"/>
// <area shape="rect" coords="77,40,97,59" onmousedown="ButtonDown(68);InsertChar('m',68)" onmouseup="ButtonUp(68)"/>
// <area shape="rect" coords="97,40,117,59" onmousedown="ButtonDown(70);InsertChar('m',70)" onmouseup="ButtonUp(70)"/>
// <area shape="rect" coords="117,40,137,59" onmousedown="ButtonDown(71);InsertChar('m',71)" onmouseup="ButtonUp(71)"/>
// <area shape="rect" coords="137,40,157,59" onmousedown="ButtonDown(72);InsertChar('m',72)" onmouseup="ButtonUp(72)"/>
// <area shape="rect" coords="157,40,177,59" onmousedown="ButtonDown(74);InsertChar('m',74)" onmouseup="ButtonUp(74)"/>
// <area shape="rect" coords="177,40,197,59" onmousedown="ButtonDown(75);InsertChar('m',75)" onmouseup="ButtonUp(75)"/>
// <area shape="rect" coords="197,40,217,59" onmousedown="ButtonDown(76);InsertChar('m',76)" onmouseup="ButtonUp(76)"/>
// <area shape="rect" coords="217,40,237,59" onmousedown="ButtonDown(186);InsertChar('m',59)" onmouseup="ButtonUp(186)"/>
// <area shape="rect" coords="237,40,257,59" onmousedown="ButtonDown(222);InsertChar('m',39)" onmouseup="ButtonUp(222)"/>
//
// <area shape="rect" coords="0,40,38,61" onmousedown="IsCaps=!IsCaps;reset();"/>
// <area shape="rect" coords="257,40,285,59" onclick="alert('Enter - Not Implemented!');" />
//
// <area shape="rect" coords="47,61,67,80" onmousedown="ButtonDown(90);" onmouseup="ButtonUp(90)"/>
// <area shape="rect" coords="67,61,87,80" onmousedown="ButtonDown(88);InsertChar('m',88)" onmouseup="ButtonUp(88)"/>
// <area shape="rect" coords="87,61,107,80" onmousedown="ButtonDown(67);InsertChar('m',67)" onmouseup="ButtonUp(67)"/>
// <area shape="rect" coords="107,61,127,80" onmousedown="ButtonDown(86);InsertChar('m',86)" onmouseup="ButtonUp(86)"/>
// <area shape="rect" coords="127,61,147,80" onmousedown="ButtonDown(66);InsertChar('m',66)" onmouseup="ButtonUp(66)"/>
// <area shape="rect" coords="147,61,167,80" onmousedown="ButtonDown(78);InsertChar('m',78)" onmouseup="ButtonUp(78)"/>
// <area shape="rect" coords="167,61,187,80" onmousedown="ButtonDown(77);InsertChar('m',77)" onmouseup="ButtonUp(77)"/>
// <area shape="rect" coords="187,61,207,80" onmousedown="ButtonDown(188);InsertChar('m',44)" onmouseup="ButtonUp(188)"/>
// <area shape="rect" coords="207,61,227,80" onmousedown="ButtonDown(190);InsertChar('m',46)" onmouseup="ButtonUp(190)"/>
// <area shape="rect" coords="227,61,247,80" onmousedown="ButtonDown(191);InsertChar('m',47)" onmouseup="ButtonUp(191)"/>
//
// <area shape="rect" coords="-6,61,46,80" onmousedown="IsShift=!IsShift;reset();"/>
// <area shape="rect" coords="247,59,281,83" onmousedown="IsShift=!IsShift;reset();"/>
//
// </map>
// </div>
//
// //<div style="z-index:1;position:absolute; top:103px; left:0px;">
// //<input type="text" id="txtHindi"name="txtHindi" style="width:295px; height:30px;"/></div>
//
// <script>
// if(navigator.appName!= "Mozilla")
// {
//     document.getElementById('txtHindi').onkeydown=checkCode;
//     document.getElementById('txtHindi').onkeypress=writeKeyPressed;
//     document.getElementById('txtHindi').onkeyup=restoreCode;
// }
// else
// {
//     document.addEventListener("onkeydown",checkCode,true);
//     document.addEventListener("onkeypress",writeKeyPressed,false);
//     document.addEventListener("onkeyup",restoreCode,true);
// }
// </script>
//
// </body>
// </html>
