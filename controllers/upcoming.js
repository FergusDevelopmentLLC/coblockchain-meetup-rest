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
                ical.fromURL('http://api.meetup.com/Colorado-Springs-Blockchain-Crypto-Entrepreneurs/upcoming.ical', {}, function(err, csbcedata) {
                  meetups['Colorado-Springs-Blockchain-Crypto-Entrepreneurs'] = getNextEventFor(csbcedata);
                  ical.fromURL('http://api.meetup.com/Denver-Crypto-Group/upcoming.ical', {}, function(err, dcgdata) {
                    meetups['Denver-Crypto-Group'] = getNextEventFor(dcgdata);
                    ical.fromURL('http://api.meetup.com/Colorado-Springs-Blockchain-Crypto-Entrepreneurs/upcoming.ical', {}, function(err, csbcedata) {
                      meetups['Colorado-Springs-Blockchain-Crypto-Entrepreneurs'] = getNextEventFor(csbcedata);
                      ical.fromURL('http://api.meetup.com/Ethereum-Denver/upcoming.ical', {}, function(err, ededata) {
                        meetups['Ethereum-Denver'] = getNextEventFor(ededata);
                        ical.fromURL('http://api.meetup.com/rmbchain/upcoming.ical', {}, function(err, rmbdata) {
                          meetups['rmbchain'] = getNextEventFor(rmbdata);
                          res.status(200).json(meetups);
                        });
                      });
                    });
                  });
                });
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
