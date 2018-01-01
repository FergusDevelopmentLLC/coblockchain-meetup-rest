const ical = require('ical');

module.exports = {

  getUpcommingMeetups: async (req, res, next) => {
    var meetups = {};
    ical.fromURL('http://api.meetup.com/Ethereum-Boulder/upcoming.ical', {}, function(err, ebData) {
      meetups['Ethereum-Boulder'] = getNextEventFor(ebData);
      ical.fromURL('http://api.meetup.com/Boulder-Blockchain/upcoming.ical', {}, function(err, bbdata) {
        meetups['Boulder-Blockchain'] = getNextEventFor(bbdata);
        ical.fromURL('http://api.meetup.com/Colorado-Government-Blockchain-Professionals/upcoming.ical', {}, function(err, cbpdata) {
          meetups['Colorado-Government-Blockchain-Professionals'] = getNextEventFor(cbpdata);
          ical.fromURL('http://api.meetup.com/Hyperledger-Denver/upcoming.ical', {}, function(err, hdata) {
            meetups['Hyperledger-Denver'] = getNextEventFor(hdata);
            ical.fromURL('http://api.meetup.com/Women-in-BlockChain-MeetUp/upcoming.ical', {}, function(err, wibcdata) {
              meetups['Women-in-BlockChain-MeetUp'] = getNextEventFor(wibcdata);
              ical.fromURL('http://api.meetup.com/Bitcoin-and-Beer/upcoming.ical', {}, function(err, babdata) {
                meetups['Bitcoin-and-Beer'] = getNextEventFor(babdata);
                res.status(200).json(meetups);
              });
            });
          });
        });
      });
    });
  }
};

function getNextEventFor(data) {
  var i = 0;
  for (var k in data){
    if (data.hasOwnProperty(k)) {
      var ev = data[k]
      if(ev.type == 'VEVENT') {
        if(i < 1) { return ev; }
        i++;
      }
    }
  }
  return 'No upcoming meetups scheduled.';
}
