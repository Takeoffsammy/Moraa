opt.fg = getComputedStyle(document.body).getPropertyValue("--fg").trim();
opt.mg = "rgba(45, 90, 190, 0.5)";
opt.date = new Date().toISOString().slice(0, 10);
seq = {
  plots: [],
  dates: [
    "2020-04-23",
    "2020-11-30",
    "2021-06-30",
    "2022-01-31",
    "2022-08-31",
    "2023-03-31",
    "2023-10-31",
    "2024-05-31",
    "2024-12-31",
    "2025-07-31",
    "2026-02-28"
  ],
  tokens: {
    create: function (list) {
      Object.keys(list).forEach(function (cat) {
        let prc = " (" + list[cat].prc + "%)";
        // settings
        let supply = {
          name: cat,
          text: [],
          x: seq.dates,
          y: list[cat].rel,
          stackgroup: "supply",
          line: { color: list[cat].col },
          hovertemplate: "%{x}" + "<br>" + "%{y}" + prc
        };
        // repeat last value of short dataset
        let diff = supply.x.length - supply.y.length;
        if (diff > 0) {
          let last = supply.y[supply.y.length - 1];
          for (let i = 0; i < diff; i++) {
            supply.y.push(last);
          }
        }
        // output
        seq.plots.push(supply);
      });
    },
    list: {
      "Launchpad Sale": { col: "#005b5c", prc: "10", rel: [100000000] },
      "Seed Sale": {
        col: "#ff3798",
        prc: "2",
        rel: [0, 0, 2900000, 11600000, 17400000, 20000000]
      },
      "Private Sale": {
        col: "#dc71fd",
        prc: "5",
        rel: [0, 0, 5600000, 22400000, 33600000, 44800000, 50000000]
      },
      "Strategic Sale": {
        col: "#58feca",
        prc: "0.67",
        rel: [0, 2233333, 6700000]
      },
      Team: {
        col: "#7750ff",
        prc: "15",
        rel: [
          0,
          0,
          21400000,
          42800000,
          64200000,
          85600000,
          128400000,
          150000000
        ]
      },
      Advisors: {
        col: "#4243ff",
        prc: "2.11",
        rel: [0, 0, 7100000, 14200000, 21150000]
      },
      "Foundation Reserve": {
        col: "#285cfe",
        prc: "40.22",
        rel: [
          91100000,
          154900000,
          208300000,
          272800000,
          315800000,
          358800000,
          402150000
        ]
      },
      "Mining Reserve": {
        col: "#33a2fe",
        prc: "25",
        rel: [
          0,
          0,
          25195200,
          54705600,
          84494400,
          114004800,
          143793600,
          173443200,
          203371200,
          232881600,
          250000000
        ]
      }
    }
  },
  events: {
    create: function (list) {
      Object.keys(list).forEach(function (cat) {
        let event = {
          name: cat,
          mode: "markers",
          type: "scatter",
          marker: {
            symbol: list[cat].sym || "diamond"
          },
          line: { color: list[cat].col },
          x: [],
          y: [],
          text: [],
          labels: []
        };

        let relList = document.getElementById(cat);
        let fragment = new DocumentFragment();
        let releases = list[cat].rel;
        for (let i = 0; i < releases.length; i++) {
          let ev = releases[i];
          event.text.push(ev.t);
          event.x.push(ev.x);
          event.y.push(list[cat].y);
          //
          let uri = undefined;
          if (ev.url) {
            uri = ev.url.charAt(0) == "/" ? ev.url : "//medium.com/p/" + ev.url;
          }
          event.labels.push(uri);
          // append links to blogroll
          if (relList && !ev.f) {
            let item = document.createElement("li");
            let link = document.createElement("a");
            link.innerText = ev.t;
            link.href = uri;
            item.append(link);
            fragment.appendChild(item);
          }
        }

        // alphabetize
        Array.from(fragment.children)
          .sort((a, b) => a.textContent.localeCompare(b.textContent))
          .forEach((li) => relList.appendChild(li));

        seq.plots.push(event);
      });
    },
    list: {
      Development: {
        col: "#ffffff",
        sym: "arrow-bar-up",
        y: 0,
        rel: [
          // private
          { x: "2018-07-01", t: "Cartesi Core's Whitepaper" },
          { x: "2018-12-01", t: "Computation Reproducibility" },
          { x: "2019-04-01", t: "Computation Verifiability" },
          { x: "2019-07-01", t: "Cartesi Core Open-sourced" },
          { x: "2019-10-01", t: "Decentralized Tournament Infrastructure" },
          { x: "2020-01-01", t: "First Dapp" },
          { x: "2020-04-01", t: "SDK Documentation" },
          { x: "2020-07-01", t: "PoS Prototype" },
          // public
          {
            x: "2020-12-27",
            url: "4a59c5ef173d",
            t: "CTSI Reserve Mining and Staking"
          },
          { x: "2021-06-01", t: "Noether PoS staking delegation Testnet" },
          { x: "2021-04-01", t: "Cartesi Labs" },
          {
            x: "2021-06-01",
            url: "4a49af15d6b9",
            t: "State Fold and Transaction Manager"
          },
          {
            x: "2021-09-30",
            url: "3e8b4c712876",
            t: "Mainnet Beta: Noether's Delegated Staking System"
          },
          { x: "2021-12-29", url: "e07f358207d6", t: "Cartesi Rollups Alpha" },
          { x: "2022-03-07", url: "684403806352", t: "Visual Rebranding" },
          { x: "2022-03-09", url: "fc5b8b8dda4c", t: "New Roadmap" },
          {
            x: "2022-03-27",
            url: "//reddit.com/r/cartesi/comments/ts1e66",
            t: "Rollups Examples 0.4.1"
          },
          { x: "2022-04-29", url: "351a65a411e4", t: "Rollups Alpha 0.2.0" },
          { x: "2022-06-15", url: "a8c2682c809c", t: "Milestone II"},
          {
            x: "2022-06-28", url: "//twitter.com/BingXOfficial/status/1541724605089456130?s=20&t=CUdni_zIbMDm1pQOAjW_9g", t: "BingX"},
          
          {
            x: "2022-06-29", url: "//twitter.com/cartesiproject/status/1542158011438858241", t: "Ethereum Business Readiness Report 22"},
          
          { x: "2022-07-11", url: "95e902838dad", t: "Rollups Alpha 0.4.0"}
        ]
      },
      Events: {
        col: "#808080",
        sym: "arrow-bar-down",
        y: 0,
        rel: [
          // Partnerships
          { x: "", url: "//ldcap.com", t: "LD Capital" },
          { x: "", url: "//snzholding.com", t: "SNZ" },
          { x: "", url: "//sosv.com", t: "SOSV" },
          { x: "", url: "//chinaccelerator.com", t: "Chinaccelerator" },
          {
            x: "",
            url:
              "//launchpad.binance.com/en/lottery/b135073088dd4ce7ae8c40a52a99628d",
            t: "Binance Launchpad"
          },
          { x: "", url: "//bigbangangels.com", t: "Big Bang Angels" },
          { x: "", url: "//artesianinvest.com", t: "Artesian" },
          { x: "", url: "//coinix.capital", t: "coinIX" },
          { x: "", url: "//dlab.vc", t: "dlab" },

          // Integrations / Partnerships
          { x: "2022-02-10", url: "dacedd879740", t: "Aetheras" },
          { x: "2021-02-25", url: "dc5a4658ea45", t: "Avalanche" },
          { x: "2022-01-14", url: "e89c2e41caea", t: "Bancor" },
          { x: "2020-10-01", url: "f31b58afa04e", t: "BGA" },
          { x: "2020-04-22", url: "a150bec40e0e", t: "Binance" },
          {
            x: "2021-04-05",
            url: "//bitboycrypto.com/tag/cartesi",
            t: "BitBoy"
          },
          { x: "2021-06-18", url: "57b2a601a898", t: "Bithumb" },
          { x: "2021-09-29", url: "d4518134af7", t: "Blockscope" },
          { x: "2021-05-07", url: "e149899ea151", t: "Coinbase" },
          { x: "2020-09-01", url: "56e304023da5", t: "CoinOne" },
          { x: "2021-12-10", url: "//coinsbit.io", t: "Coinsbit" },
          { x: "2021-05-20", url: "3922218cb006", t: "Crypto.com" },
          { x: "2022-03-02", url: "516f5ca85f3b", t: "CV Labs" },
          { x: "2022-03-01", url: "//t.co/OVhBKEEul4", t: "DigiFinex" },
          { x: "2021-02-10", url: "af0fcba26b59", t: "Elrond" },
          {
            x: "2021-10-04",
            url: "d5e4983b2599",
            t: "Enterprise Ethereum Alliance"
          },
          { x: "2021-09-27", url: "2be367d074af", t: "Everstake" },
          { x: "2021-09-28", url: "92ff872cf276", t: "HashQuark" },
          { x: "2021-05-07", url: "aea958ac3584", t: "Huobi" },
          { x: "2021-11-19", url: "2bb8c57e0879", t: "iMe" },
          { x: "2021-10-26", url: "31ae54c87939", t: "Immunefi" },
          { x: "2021-04-07", url: "462747f2af5", t: "IMPA" },

          { x: "2021-03-18", url: "cfb01ee687ea", t: "Injective Protocol" },
          { x: "2022-02-09", url: "//t.co/eTw4Kcmo4C", t: "INPETU" },
          { x: "2021-03-24", url: "fcb65f8299cd", t: "IOTA" },
          { x: "2021-12-02", url: "1ffe25a1fe3a", t: "IoTeX" },
          { x: "2021-09-01", url: "f8e203ce5ac2", t: "Knit Finance" },
          { x: "2021-07-30", url: "5e2a530e469e", t: "Kraken" },
          { x: "2021-09-23", url: "635cfe3197f6", t: "KuCoin" },
          { x: "2021-03-04", url: "76b661f3171e", t: "Messari" },
          { x: "2021-01-04", url: "b6441a758a6e", t: "MyCointainer" },
          { x: "2022-01-24", url: "//t.co/dQBatXtZiY", t: "Newton" },
          { x: "2021-06-01", url: "f738e10b0e88", t: "NOWPayments" },
          { x: "2021-06-10", url: "16b157ca2733", t: "Poloniex" },
          {
            x: "2022-02-07",
            url: "//bit.ly/3opw6qT",
            t: "Portuguese Blockchain Alliance"
          },
          { x: "2021-04-06", url: "1c767b7df406", t: "Polygon" },
          { x: "2021-04-06", url: "1c767b7df406", t: "Quickswap" },
          { x: "2021-07-15", url: "38b0d82d98a", t: "Revolut" },
          { x: "2021-09-09", url: "f3a424a58973", t: "RockX" },
          { x: "2022-02-15", url: "//t.co/ohUxdPNtec", t: "Scalac" },
          {
            x: "2021-12-28",
            url:
              "//youtube.com/playlist?list=PLzMcBGfZo4-msMNfRJT5cLSge23P5bqUx",
            t: "Tech with Tim"
          },
          { x: "2021-03-23", url: "eaad160f6fe5", t: "Travala" },
          { x: "2022-01-17", url: "da55db4897ec", t: "Vauld" },
          { x: "2020-05-25", url: "495698e0b9c3", t: "WazirX" },
          { x: "2022-02-03", url: "//webchefs.pl", t: "Webchefs" },
          { x: "2022-03-19", url: "//t.co/vsc5qbAd4v", t: "Dappsy" },
          {
            x: "2022-03-23",
            url: "//bybit.com/trade/usdt/CTSIUSDT",
            t: "Bybit"
          },
          {
            x: "2022-03-21",
            url: "//phemex.com/announcements/nfts-galore-new-listings",
            t: "Phemex"
          },
          { x: "2022-03-28", url: "//t.co/9KwYh32ulm", t: "BitKeep" },
          { x: "2022-03-28", url: "//t.co/R3NL8HeCcD", t: "Bitstamp" },
          {
            x: "2022-04-05",
            url: "//reddit.com/r/cartesi/comments/twwxrh",
            t: "StrikeX"
          },
          { x: "2022-04-08", url: "//t.co/29v5uGfStQ", t: "WhiteBit" },
          {
            x: "2022-04-11",
            url: "//reddit.com/r/cartesi/comments/u1w40n",
            t: "Droidex"
          },
          { x: "2022-04-20", url: "//t.co/IMXJDeJNN5", t: "BitPanda" },
          {
            x: "2022-05-03",
            url:
              "//twitter.com/cartesiproject/status/1521474678044381186?s=20&t=HWx1Kx3XiwdtcG3akfzQnA",
            t: "Mercado Bitcoin"
          },
          {
            x: "2022-05-23",
            url: "//twitter.com/eToroTeam/status/1529073739480064002",
            t: "eToro"
          },
          {
            x: "2022-05-24",
            url:
              "//twitter.com/exolix_com/status/1529468647109959681?s=20&t=rsGUhQH2FmjwELlJ7UoGDA",
            t: "Exolix"
          },
          {
            x: "2022-05-25",
            url: "//twitter.com/kriptomat/status/1529423146373287936",
            t: "Kriptomat"
          },
          {
            x: "2022-06-09",
            url: "//reddit.com/r/XTExchange/comments/v8kf6o",
            t: "XT Exchange"
          },
          
          
          {
            x: "2022-07-09",
            url: "//twitter.com/Pexpay_official/status/1545742683779567617",
            t: "PexPay"
          },
          // webinar for timeline, not a partner
          {
            x: "2022-02-16",
            url: "//members.cryptovalley.swiss/events/79225",
            t: "Crypto Valley virtual series",
            f: 1
          },
          {
            x: "2022-02-18",
            url: "//youtube.com/watch?v=xEmEPB63Q-U",
            t: "Blockchain Gaming Alliance",
            f: 1
          },
          {
            x: "2022-02-25",
            url: "//t.co/AvnUVzSquw",
            t: "Discord Mandarin AMA",
            f: 1
          },
          {
            x: "2022-03-10",
            url: "//t.co/fbm0oQWUy0",
            t: "Web3 Wire Gleam Giveaway",
            f: 1
          },
          {
            x: "2022-03-11",
            url: "//ethereum.rio",
            t: "ETHRio bootcamp",
            f: 1
          },
          {
            x: "2022-03-13",
            url: "//schedule.sxsw.com/2022/events/PP117190",
            t: "SXSW The Rise of Headless Brands",
            f: 1
          },
          { x: "2022-03-29", url: "//ethdubaiconf.org", t: "ETHDubai", f: 1 },
          {
            x: "2022-04-14",
            url: "//reddit.com/r/cartesi/comments/tximnz",
            t: "Coffee with Cartesi",
            f: 1
          },
          {
            x: "2022-04-12",
            url: "//t.co/CPXzj6NAFR",
            t: "Paris NFT Day",
            f: 1
          },
          {
            x: "2022-04-21",
            url: "//reddit.com/r/cartesi/comments/u75ulq",
            t: "Le Book Connections",
            f: 1
          },

          //{ x: "2022-04-26", url: "//twitter.com/TheCryptoMewtwo/status/1518697535379963904?s=20&t=5Mv0iKc-JH1um24DFhsVyg", t: "BasedSpace", f:1},
          {
            x: "2022-04-28",
            url: "//reddit.com/r/cartesi/comments/ubklup",
            t: "WhiteBIT",
            f: 1
          },
          {
            x: "2022-05-12",
            url:
              "//twitter.com/talentrepublic_/status/1522395741255127040?s=20&t=JQLbkKe4Q2sDfWX9cgFcjg",
            t: "Talent Republic",
            f: 1
          },
          {
            x: "2022-05-18",
            url:
              "https://mobile.twitter.com/cartesiproject/status/1526487663749959680",
            t: "Terra/LUNA, Algorithms, DeFi & Web3",
            f: 1
          },
          {
            x: "2022-05-19",
            url: "//twitter.com/BasedSpace/status/1526988429845839874",
            t: "Based Space",
            f: 1
          },
          {
            x: "2022-05-26",
            url:
              "https://www.reddit.com/r/cartesi/comments/uvznj0/ama_with_cryptocoinscoach_thursday_26th_may/",
            t: "AMA Crypto Coins Coach",
            f: 1
          },
          {
            x: "2022-06-15",
            url: "//twitter.com/cartesiproject/status/1534880478989209600",
            t: "Ape Dubai",
            f: 1
          },
          {
            x: "2022-06-22",
            url: "//twitter.com/cartesiproject/status/1539549448522518530",
            t: "Coffee with Cartesi",
            f: 1
          },
        ]
      }
    }
  },
  stock: function (symbol) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState != 4) return;
      if (this.status == 200) {
        let candle = JSON.parse(this.responseText);
        console.log(candle);
        if (candle.t == null) return;

        // add crypto price data
        let x = [];
        candle.t.forEach(function (part, idx) {
          let time = new Date(this[idx] * 1000);
          x[idx] =
            time.getFullYear() +
            "-" +
            (time.getMonth() + 1) +
            "-" +
            time.getDate();
        }, candle.t);

        let price = {
          name: symbol,
          type: "candlestick",
          yaxis: "y3",
          x: x,
          close: candle.c,
          high: candle.h,
          low: candle.l,
          open: candle.o
        };

        seq.plots.splice(0, 0, price);

        Plotly.redraw("CTSI");
      }
    };

    //finnhub.io/docs/api#stock-candles
    let api = "//finnhub.io/api/v1/crypto/candle?symbol=" + symbol;
    api +=
      "&resolution=D&from=1577854800&to=1767243600&token=buc1n3n48v6oa2u4d5mg";
    xhr.open("GET", api, true);
    xhr.send();
  },
  template: {
    hovermode: "closest",
    xaxis: {
      range: ["2020-01", "2022-07"],
      color: opt.mg,
      tickcolor: opt.fg,
      showgrid: false,
      type: "date",
      rangeslider: { visible: false }
    },
    yaxis: {
      color: opt.mg,
      tickcolor: opt.fg,
      fixedrange: true,
      showgrid: false,
      ticks: "inside",
      side: "right",
      title:
        '<a href="//messari.io/asset/cartesi/profile/supply-schedule">Token Release</a>',
      autorange: true
    },
    yaxis3: {
      color: opt.mg,
      tickcolor: opt.fg,
      fixedrange: true,
      showgrid: false,
      ticks: "inside",
      side: "left",
      title: '<a href="//explorer.cartesi.io/">CTSI Price (USD)</a>',
      overlaying: "y"
      //anchor:"x1",
      //scaleanchor:"y1",
    },
    shapes: [
      {
        type: "line",
        x0: opt.date,
        y0: 0,
        x1: opt.date,
        yref: "paper",
        y1: 1,
        line: {
          color: opt.mg,
          width: 1,
          dash: "dot"
        }
      }
    ],

    legend: {
      x: 0.01,
      y: 1.0,
      bgcolor: opt.mg,
      font: {
        color: opt.fg
      }
    },
    plot_bgcolor: "transparent",
    paper_bgcolor: "transparent",
    color: opt.mg,
    scrollZoom: true,
    margin: {
      autoexpand: false,
      l: 50,
      r: 50,
      t: 25,
      b: 50
    }
  },
  init: function () {
    // static
    seq.tokens.create(seq.tokens.list);
    seq.events.create(seq.events.list);
    Plotly.newPlot("CTSI", seq.plots, seq.template, { responsive: true });
    // dynamic
    seq.stock("BINANCE:CTSIUSDT");
    //seq.stock("COINBASE:CTSI-USD");
  }
};

seq.init();

document.getElementById("CTSI").on("plotly_click", function (data) {
  // launch url after two clicks
  for (var i = 0; i < data.points.length; i++) {
    let point = data.points[i];
    console.log("point", point);
    if (point.data.type == "scatter") {
      let uri = point.data.labels[point.pointIndex];
      console.log("uri", uri);
      if (uri != undefined) {
        if (uri == point.data.link) {
          point.data.link = null;
          window.open(uri);
          return;
        } else {
          point.data.link = uri;
        }
      }
    }
  }
  //console.log(data, pts);
});