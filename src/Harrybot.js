class Harrybot {
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  color = [
    0x00c09a,
    0x008369,
    0x00d166,
    0x008e44,
    0x0099e1,
    0x006798,
    0xa652bb,
    0x712f8f,
    0xfd0061,
    0xbc0057,
    0xf8c300,
    0xcc7900,
    0xf93a2f,
    0xa62019,
    0x91a6a6,
    0x969c9f,
    0x597e8d,
    0x4e6f7b,
  ];
  randomColor = this.color[this.randomInt(0, this.color.length)];
  hexColor = [
    "#00c09a",
    "#008369",
    "#00d166",
    "#008e44",
    "#0099e1",
    "#006798",
    "#a652bb",
    "#712f8f",
    "#fd0061",
    "#bc0057",
    "#f8c300",
    "#cc7900",
    "#f93a2f",
    "#a62019",
    "#91a6a6",
    "#969c9f",
    "#597e8d",
    "#4e6f7b",
  ];
  randomHexColor = this.hexColor[this.randomInt(0, this.hexColor.length)];
  toString(num) {
    return num.toString();
  }
  toInt(num) {
    if (isNaN(num)) {
      return "MUST BE A NUMBER IDIOT!!!!!";
    } else return num.parInt();
  }
}

module.exports = Harrybot;
